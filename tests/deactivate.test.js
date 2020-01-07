/* eslint-disable jest/expect-expect */

import { Selector, RequestMock, RequestLogger } from 'testcafe';
import config from '../src/config.js';

const loginParams = {
  username: 'testuser',
  password: 'testpassword',
  appId: config.appId,
};
const personalToken = 'personalToken';
const mfaToken = 'mfaToken';
const mfaCode = '1234';
const successMessage = 'MFA deactivated.';

const initEndpoint = config.pryvServiceInfoUrl;
const loginEndpoint = `https://${loginParams.username}.pryv.me/auth/login`;
const challengeEndpoint = `https://${loginParams.username}.pryv.me/mfa/challenge`;
const verifyEndpoint = `https://${loginParams.username}.pryv.me/mfa/verify`;
const deactivateEndpoint = `https://${loginParams.username}.pryv.me/mfa/deactivate`;

// ---------- Requests loggers ----------

const loginLogger = RequestLogger(loginEndpoint, {
  logRequestBody: true,
  stringifyRequestBody: true,
});

const challengeLogger = RequestLogger(challengeEndpoint, {
  logRequestHeaders: true,
});

const verifyLogger = RequestLogger(verifyEndpoint, {
  logRequestBody: true,
  stringifyRequestBody: true,
  logRequestHeaders: true,
});

const deactivateLogger = RequestLogger(deactivateEndpoint, {
  logRequestHeaders: true,
});

// ---------- Requests mocks ----------

const initMock = RequestMock()
  .onRequestTo(initEndpoint)
  .respond({ api: 'https://{username}.pryv.me/' }, 200, { 'Access-Control-Allow-Origin': '*' });

const loginMock = RequestMock()
  .onRequestTo(loginEndpoint)
  .respond({ mfaToken: mfaToken }, 302, { 'Access-Control-Allow-Origin': '*' });

const challengeMock = RequestMock()
  .onRequestTo(challengeEndpoint)
  .respond({}, 200, { 'Access-Control-Allow-Origin': '*' });

const verifyMock = RequestMock()
  .onRequestTo(verifyEndpoint)
  .respond({ token: personalToken }, 200, { 'Access-Control-Allow-Origin': '*' });

const deactivateMock = RequestMock()
  .onRequestTo(deactivateEndpoint)
  .respond({ message: successMessage }, 200, { 'Access-Control-Allow-Origin': '*' });

fixture('MFA deactivation')
  .page('http://localhost:8080/#/deactivate')
  .requestHooks(loginLogger, challengeLogger, verifyLogger, deactivateLogger,
    initMock, loginMock, challengeMock, verifyMock, deactivateMock);

test('Login, MFA challenge, MFA verify and then MFA deactivate', async testController => {
  await testController
    // Catch eventual unexpected errors that pop as window.alert
    .setNativeDialogHandler((type, text, url) => {
      throw new Error(text);
    })
    // Fill the deactivation form
    .typeText('#username', loginParams.username)
    .typeText('#password', loginParams.password)
    .click('#submitButton')
    // Login call was performed
    .expect(loginLogger.contains(record =>
      record.request.method === 'post' &&
      record.request.body.includes(JSON.stringify(loginParams)),
    )).ok()
    // Challenge call was performed
    .expect(challengeLogger.contains(record =>
      record.request.method === 'post' &&
      record.request.headers.authorization === mfaToken,
    )).ok()
    // A dialog asks the user for the MFA verification code
    .typeText('#mfaCode', mfaCode)
    .click('#deactivateMFA')
    // Verify call was performed
    .expect(verifyLogger.contains(record =>
      record.request.method === 'post' &&
      record.request.body.includes(`"code":"${mfaCode}"`) &&
      record.request.headers.authorization === mfaToken,
    )).ok()
    // Deactivate call was performed
    .expect(deactivateLogger.contains(record =>
      record.request.method === 'post' &&
      record.request.headers.authorization === personalToken,
    )).ok()
    .expect(Selector('#alert').innerText).contains(successMessage);
});
