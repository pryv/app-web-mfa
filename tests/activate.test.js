/* eslint-disable jest/expect-expect */

import { Selector, RequestMock, RequestLogger } from 'testcafe';
import config from '../src/config.js';

const loginParams = {
  username: 'testuser',
  password: 'testpassword',
  appId: config.appId,
};
const phoneNumber = '4791234567';
const personalToken = 'personalToken';
const mfaToken = 'mfaToken';
const mfaCode = '1234';

const initEndpoint = config.pryvServiceInfoUrl;
const loginEndpoint = `https://${loginParams.username}.pryv.me/auth/login`;
const activateEndpoint = `https://${loginParams.username}.pryv.me/mfa/activate`;
const confirmEndpoint = `https://${loginParams.username}.pryv.me/mfa/confirm`;

// ---------- Requests loggers ----------

const loginLogger = RequestLogger(loginEndpoint, {
  logRequestBody: true,
  stringifyRequestBody: true,
});

const activateLogger = RequestLogger(activateEndpoint, {
  logRequestBody: true,
  stringifyRequestBody: true,
  logRequestHeaders: true,
});

const confirmLogger = RequestLogger(confirmEndpoint, {
  logRequestBody: true,
  stringifyRequestBody: true,
  logRequestHeaders: true,
});

// ---------- Requests mocks ----------

const initMock = RequestMock()
  .onRequestTo(initEndpoint)
  .respond({ api: 'https://{username}.pryv.me/' }, 200, { 'Access-Control-Allow-Origin': '*' });

const loginMock = RequestMock()
  .onRequestTo(loginEndpoint)
  .respond({ token: personalToken }, 200, { 'Access-Control-Allow-Origin': '*' });

const activateMock = RequestMock()
  .onRequestTo(activateEndpoint)
  .respond({ mfaToken: mfaToken }, 302, { 'Access-Control-Allow-Origin': '*' });

const confirmMock = RequestMock()
  .onRequestTo(confirmEndpoint)
  .respond({ recoveryCodes: ['1234', '5678'] }, 200, { 'Access-Control-Allow-Origin': '*' });

fixture('MFA activation')
  .page('http://localhost:8080/#/activate')
  .requestHooks(loginLogger, activateLogger, confirmLogger,
    initMock, loginMock, activateMock, confirmMock);

test('Login, MFA activate and then MFA confirm', async testController => {
  await testController
    // Catch eventual unexpected errors that pop as window.alert
    .setNativeDialogHandler((type, text, url) => {
      throw new Error(text);
    })
    // Fill the activation form
    .typeText('#username', loginParams.username)
    .typeText('#password', loginParams.password)
    .typeText('#phone', phoneNumber)
    .click('#submitButton')
    // Login call was performed
    .expect(loginLogger.contains(record =>
      record.request.method === 'post' &&
      record.request.body.includes(JSON.stringify(loginParams)),
    )).ok()
    // Activate call was performed
    .expect(activateLogger.contains(record =>
      record.request.method === 'post' &&
      record.request.body.includes(`"phone_number":"${phoneNumber}"`) &&
      record.request.headers.authorization === personalToken,
    )).ok()
    // A dialog asks the user for the MFA verification code
    .typeText('#mfaCode', mfaCode)
    .click('#confirmMfa')
    // Confirm call was performed
    .expect(confirmLogger.contains(record =>
      record.request.method === 'post' &&
      record.request.body.includes(`"code":"${mfaCode}"`) &&
      record.request.headers.authorization === mfaToken,
    )).ok()
    .expect(Selector('#recovery').innerText).contains('[ "1234", "5678" ]')
    .expect(Selector('#alert').innerText).contains('MFA activated.');
});
