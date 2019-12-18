// @flow

const request = require('superagent');

class Pryv {
  serviceInfoUrl: string;
  apiUrl: (string) => string;

  constructor (serviceInfoUrl: string) {
    this.serviceInfoUrl = serviceInfoUrl;
  }

  async init (): Promise<void> {
    const res = await request
      .get(this.serviceInfoUrl);
    this.apiUrl = (username) => res.api.replace('{username}', username);
  }

  async login (username: string, password: string, appId: string): Promise<string> {
    const res = await request
      .post(`${this.apiUrl(username)}/auth/login`)
      .send({
        username: username,
        password: password,
        appId: appId,
      });
    return res.body.token;
  }

  async fetchProfile (username: string, personalToken: string): Promise<mixed> {
    const res = await request
      .get(`${this.apiUrl(username)}/profile/private`)
      .set('Authorization', personalToken);
    const pryvProfile = res.body.profile;
    return pryvProfile.mfa;
  }

  async checkAccess (username: string, token: string): Promise<void> {
    await request
      .get(`${this.apiUrl(username)}/access-info`)
      .set('Authorization', token);
  }

  async mfaActivate (username: string, personalToken: string): Promise<string> {
    const res = await request
      .post(`${this.apiUrl(username)}/mfa/activate`)
      .set('Authorization', personalToken);
    return res.body.mfaToken;
  }

  async mfaConfirm (username: string, mfaToken: string): Promise<Array<string>> {
    const res = await request
      .post(`${this.apiUrl(username)}/mfa/confirm`)
      .set('Authorization', mfaToken);
    return res.body.recoveryCodes;
  }

  async mfaChallenge (username: string, mfaToken: string): Promise<void> {
    await request
      .post(`${this.apiUrl(username)}/mfa/challenge`)
      .set('Authorization', mfaToken);
  }

  async mfaVerify (username: string, mfaToken: string): Promise<string> {
    const res = await request
      .post(`${this.apiUrl(username)}/mfa/verify`)
      .set('Authorization', mfaToken);
    return res.body.token;
  }

  async mfaDeactivate (username: string, personalToken: string): Promise<void> {
    await request
      .post(`${this.apiUrl(username)}/mfa/deactivate`)
      .set('Authorization', personalToken);
  }

  async mfaRecover (username: string, password: string, appId: string, code: string): Promise<void> {
    await request
      .post(`${this.apiUrl(username)}/auth/login`)
      .send({
        username: username,
        password: password,
        appId: appId,
        recoveryCode: code,
      });
  }
}

module.exports = Pryv;
