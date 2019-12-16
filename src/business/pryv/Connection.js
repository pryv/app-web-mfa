// @flow

const request = require('superagent');

class Connection {
  token: ?string;
  username: string;
  apiUrl: string;

  constructor (settings: Object, username: string, token: ?string) {
    this.username = username;
    this.apiUrl = `${settings.get('api:url')}/${username}`;
    this.token = token;
  }

  async login (req: express$Request): Promise<string> {
    const res = await request
      .post(`${this.apiUrl}/auth/login`)
      .send(req.body);
    this.token = res.body.token;
    return this.token || res.body.mfaToken;
  }

  async fetchProfile (req: express$Request): Promise<mixed> {
    const res = await request
      .get(`${this.apiUrl}/profile/private`)
      .set('Authorization', this.token);
    const pryvProfile = res.body.profile;
    return pryvProfile.mfa;
  }

  async checkAccess (req: express$Request): Promise<void> {
    await request
      .get(`${this.apiUrl}/access-info`)
      .set('Authorization', this.token);
  }

  async activate (personalToken: string): Promise<string> {
    const res = await request
      .post(`${this.apiUrl}/mfa/activate`)
      .set('Authorization', personalToken);
    return res.body.mfaToken;
  }

  async confirm (mfaToken: string): Promise<Array<string>> {
    const res = await request
      .post(`${this.apiUrl}/mfa/confirm`)
      .set('Authorization', mfaToken);
    return res.body.recoveryCodes;
  }

  async challenge (mfaToken: string): Promise<void> {
    await request
      .post(`${this.apiUrl}/mfa/challenge`)
      .set('Authorization', mfaToken);
  }

  async verify (mfaToken: string): Promise<string> {
    const res = await request
      .post(`${this.apiUrl}/mfa/verify`)
      .set('Authorization', mfaToken);
    return res.body.token;
  }
}

module.exports = Connection;
