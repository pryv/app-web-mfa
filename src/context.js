// @flow

import Pryv from './business/pryv.js';

type QueryParameters = {
  pryvApiEndpoint: string,
  pryvServiceInfoUrl: string,
}

class Context {
  appId: string;
  apiEndpoint: string;
  serviceInfoUrl: string;
  pryv: Pryv;

  constructor (queryParams: QueryParameters) {
    this.appId = 'pryv-app-web-mfa';
    this.apiEndpoint = queryParams.pryvApiEndpoint;
    this.serviceInfoUrl = queryParams.pryvServiceInfoUrl || 'https://reg.pryv.me/service/info';
  }

  async init () {
    if (this.apiEndpoint != null) {
      this.serviceInfoUrl = this.apiEndpoint + '/service/info';
    }
    this.pryv = new Pryv(this.serviceInfoUrl);
    await this.pryv.init();
  }
}

export default Context;
