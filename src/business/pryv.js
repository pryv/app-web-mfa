// @flow

const request = require('superagent');

class Pryv {
  serviceInfoUrl: string;
  apiUrl: string;
  token: string;

  constructor (serviceInfoUrl: string) {
    this.serviceInfoUrl = serviceInfoUrl;
  }

  async init (): Promise<void> {
    const res = await request
      .get(this.serviceInfoUrl);
    this.apiUrl = res.api;
  }

  async login (username: string, password: string, appId: string): Promise<string> {
    const res = await request
      .post(`${this.apiUrl}/auth/login`)
      .send({
        username: username,
        password: password,
        appId: appId,
      });
    this.token = res.body.token;
    return res.body.token || res.body.mfaToken;
  }

  async fetchProfile (): Promise<mixed> {
    const res = await request
      .get(`${this.apiUrl}/profile/private`)
      .set('Authorization', this.token);
    const pryvProfile = res.body.profile;
    return pryvProfile.mfa;
  }

  async checkAccess (): Promise<void> {
    await request
      .get(`${this.apiUrl}/access-info`)
      .set('Authorization', this.token);
  }

  async mfaActivate (personalToken: string): Promise<string> {
    const res = await request
      .post(`${this.apiUrl}/mfa/activate`)
      .set('Authorization', personalToken);
    return res.body.mfaToken;
  }

  async mfaConfirm (mfaToken: string): Promise<Array<string>> {
    const res = await request
      .post(`${this.apiUrl}/mfa/confirm`)
      .set('Authorization', mfaToken);
    return res.body.recoveryCodes;
  }

  async mfaChallenge (mfaToken: string): Promise<void> {
    await request
      .post(`${this.apiUrl}/mfa/challenge`)
      .set('Authorization', mfaToken);
  }

  async mfaVerify (mfaToken: string): Promise<string> {
    const res = await request
      .post(`${this.apiUrl}/mfa/verify`)
      .set('Authorization', mfaToken);
    return res.body.token;
  }
}

module.exports = Pryv;
