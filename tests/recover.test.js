/* eslint-disable jest/expect-expect */

import { Selector, RequestMock, RequestLogger } from 'testcafe';
import config from '../src/config.js';

const recoverParams = {
  username: 'testuser',
  password: 'testpassword',
  appId: config.appId,
  recoveryCode: '1234',
};
const successMessage = 'MFA deactivated.';

const initEndpoint = config.pryvServiceInfoUrl;
const recoverEndpoint = `https://${recoverParams.username}.pryv.me/mfa/recover`;

// ---------- Requests loggers ----------

const recoverLogger = RequestLogger(recoverEndpoint, {
  logRequestBody: true,
  stringifyRequestBody: true,
});

// ---------- Requests mocks ----------

const initMock = RequestMock()
  .onRequestTo(initEndpoint)
  .respond({ api: 'https://{username}.pryv.me/' }, 200, { 'Access-Control-Allow-Origin': '*' });

const recoverMock = RequestMock()
  .onRequestTo(recoverEndpoint)
  .respond({ message: successMessage }, 200, { 'Access-Control-Allow-Origin': '*' });

fixture('MFA deactivation with recovery code')
  .page('http://localhost:8080/#/deactivate')
  .requestHooks(recoverLogger, initMock, recoverMock);

test('MFA recover', async testController => {
  await testController
    // Catch eventual unexpected errors that pop as window.alert
    .setNativeDialogHandler((type, text, url) => {
      throw new Error(text);
    })
    // Check to use recovery code
    .click('#checkbox')
    // Fill the deactivation form
    .typeText('#username', recoverParams.username)
    .typeText('#password', recoverParams.password)
    .typeText('#recoveryCode', recoverParams.recoveryCode)
    .click('#submitButton')
    // Recover call was performed
    .expect(recoverLogger.contains(record =>
      record.request.method === 'post' &&
      record.request.body.includes(JSON.stringify(recoverParams)),
    )).ok()
    .expect(Selector('#alert').innerText).contains(successMessage);
});
