// @flow

import Pryv from './business/pryv.js';
import config from './config.js';

type QueryParameters = {
  pryvServiceInfoUrl: string,
}

class Context {
  appId: string;
  serviceInfoUrl: string;
  pryv: Pryv;

  constructor (queryParams: QueryParameters) {
    this.appId = config.appId;
    this.serviceInfoUrl = queryParams.pryvServiceInfoUrl || config.pryvServiceInfoUrl;
  }

  async init () {
    this.pryv = new Pryv(this.serviceInfoUrl);
    await this.pryv.init();
  }
}

export default Context;
