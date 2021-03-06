// @flow

const request = require('superagent');

class Pryv {
  serviceInfoUrl: string;
  apiUrl: string;
  apiEndpoint: (string, string) => URL;

  constructor (serviceInfoUrl: string) {
    this.serviceInfoUrl = serviceInfoUrl;
  }

  async init (): Promise<void> {
    const res = await request
      .get(this.serviceInfoUrl);
    this.apiUrl = res.body.api;
    this.apiEndpoint = (username, path) => {
      return new URL(
        path || '',
        this.apiUrl.replace('{username}', username),
      );
    };
  }

  async login (username: string, password: string, appId: string): Promise<{token?: string, mfaToken?: string}> {
    try {
      const res = await request
        .post(this.apiEndpoint(username, '/auth/login'))
        .send({
          username: username,
          password: password,
          appId: appId,
        });
      return { token: res.body.token };
    } catch (err) {
      if (err.response != null && err.response.status === 302 &&
          err.response.body != null && err.response.body.mfaToken != null) {
        return { mfaToken: err.response.body.mfaToken };
      } else {
        throw err;
      }
    }
  }

  async fetchProfile (username: string, personalToken: string): Promise<mixed> {
    const res = await request
      .get(this.apiEndpoint(username, '/profile/private'))
      .set('Authorization', personalToken);
    const pryvProfile = res.body.profile;
    return pryvProfile.mfa;
  }

  async checkAccess (username: string, token: string): Promise<void> {
    await request
      .get(this.apiEndpoint(username, '/access-info'))
      .set('Authorization', token);
  }

  async mfaActivate (username: string, personalToken: string, phone: number): Promise<string> {
    try {
      const res = await request
        .post(this.apiEndpoint(username, '/mfa/activate'))
        .send({
          phone_number: phone,
        })
        .set('Authorization', personalToken);
      return res.body.mfaToken;
    } catch (err) {
      if (err.response != null && err.response.body != null && err.response.body.mfaToken != null) {
        return err.response.body.mfaToken;
      } else {
        throw err;
      }
    }
  }

  async mfaConfirm (username: string, mfaToken: string, code: string): Promise<Array<string>> {
    const res = await request
      .post(this.apiEndpoint(username, '/mfa/confirm'))
      .send({
        code: code,
      })
      .set('Authorization', mfaToken);
    return res.body.recoveryCodes;
  }

  async mfaChallenge (username: string, mfaToken: string): Promise<void> {
    await request
      .post(this.apiEndpoint(username, '/mfa/challenge'))
      .set('Authorization', mfaToken);
  }

  async mfaVerify (username: string, mfaToken: string, code: string): Promise<string> {
    const res = await request
      .post(this.apiEndpoint(username, '/mfa/verify'))
      .send({
        code: code,
      })
      .set('Authorization', mfaToken);
    return res.body.token;
  }

  async mfaDeactivate (username: string, personalToken: string): Promise<string> {
    const res = await request
      .post(this.apiEndpoint(username, '/mfa/deactivate'))
      .set('Authorization', personalToken);
    return res.body.message;
  }

  async mfaRecover (username: string, password: string, appId: string, code: string): Promise<string> {
    const res = await request
      .post(this.apiEndpoint(username, '/mfa/recover'))
      .send({
        username: username,
        password: password,
        appId: appId,
        recoveryCode: code,
      });
    return res.body.message;
  }
}

module.exports = Pryv;
