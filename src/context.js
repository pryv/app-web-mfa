// @flow

import Pryv from './business/pryv.js';

type QueryParameters = {
  pryvServiceInfoUrl: string,
}

class Context {
  appId: string;
  serviceInfoUrl: string;
  pryv: Pryv;

  constructor (queryParams: QueryParameters) {
    this.appId = 'pryv-app-web-mfa';
    this.serviceInfoUrl = queryParams.pryvServiceInfoUrl || 'https://reg.pryv.me/service/info';
  }

  async init () {
    this.pryv = new Pryv(this.serviceInfoUrl);
    await this.pryv.init();
  }
}

export default Context;
