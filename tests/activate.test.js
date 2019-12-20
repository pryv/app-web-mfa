/* eslint-disable jest/expect-expect */

import { Selector, RequestMock, RequestLogger } from 'testcafe';

const loginEndpoint = 'https://testuser.pryv.me/auth/login';
const activateEndpoint = 'https://testuser.pryv.me/mfa/activate';
const confirmEndpoint = 'https://testuser.pryv.me/mfa/confirm';

// ---------- Requests loggers ----------

const loginLogger = RequestLogger(loginEndpoint, {
  logRequestBody: true,
});

const activateLogger = RequestLogger(activateEndpoint, {
  logRequestBody: true,
});

const confirmLogger = RequestLogger(confirmEndpoint, {
  logRequestBody: true,
});

// ---------- Requests mocks ----------

const loginMock = RequestMock()
  .onRequestTo(loginEndpoint)
  .respond({ token: 'personalToken' }, 200, { 'Access-Control-Allow-Origin': '*' });

const activateMock = RequestMock()
  .onRequestTo(activateEndpoint)
  .respond({ mfaToken: 'mfaToken' }, 302, { 'Access-Control-Allow-Origin': '*' });

const confirmMock = RequestMock()
  .onRequestTo(confirmEndpoint)
  .respond({ recoveryCodes: ['1234', '5678'] }, 200, { 'Access-Control-Allow-Origin': '*' });

fixture('MFA activation')
  .page('http://localhost:8080/activate')
  .requestHooks(loginLogger, activateLogger, confirmLogger,
    loginMock, activateMock, confirmMock);

test('Login, MFA activate and then MFA confirm', async testController => {
  await testController
    // Catch eventual unexpected errors that pop as window.alert
    .setNativeDialogHandler((type, text, url) => {
      throw new Error(text);
    })
    // Fill the activation form
    .typeText('#username', 'testuser')
    .typeText('#password', 'testpassword')
    .typeText('#phone', '1234')
    .click('#submitButton')
    // Service-info call was performed ?
    // Login call was performed
    .expect(loginLogger.contains(record =>
      record.request.method === 'post' &&
      record.request.body.username === 'testuser' &&
      record.request.body.password === 'testpassword' &&
      record.request.body.appId === 'app-web-mfa',
    )).ok()
    // Activate call was performed
    .expect(activateLogger.contains(record =>
      record.request.method === 'post' &&
      record.request.body.phone === '1234' &&
      record.request.headers.authorization === 'personalToken',
    )).ok()
    // A dialog asks the user for the MFA verification code
    .typeText('#mfaCode', '1234')
    .click('#confirmMfa')
    // Confirm call was performed
    .expect(confirmLogger.contains(record =>
      record.request.method === 'post' &&
      record.request.body.code === '1234' &&
      record.request.headers.authorization === 'mfaToken',
    )).ok()
    .expect(Selector('#recovery').textContent).contains("['1234', '5678']");
});
