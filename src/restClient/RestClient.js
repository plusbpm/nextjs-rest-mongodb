import Inquiry from './Inquiry';
import invariant from '../util/invariant';

class RestClient {
  constructor(options) {
    const { apiRoot, initialState = {} } = options || {};
    this.apiRoot = apiRoot || '';
    this.inquiries = {};
    this.initialState = initialState;
    this.lastInquiryNumber = 0;
  }

  getInquiry = (id, sendOptions = {}) => {
    invariant(typeof id === 'string', "First argument 'id' is missing.");
    invariant(id.length > 0, "First argument 'id' is empty.");
    const inquiry =
      this.inquiries[id] ||
      (this.inquiries[id] = new Inquiry(this, sendOptions, this.initialState[id]));
    return inquiry;
  };

  getNextInquiryNumber = () => {
    this.lastInquiryNumber += 1;
    return this.lastInquiryNumber;
  };

  extractCacheData = () => {
    return Object.keys(this.inquiries).reduce(
      (acc, key) => ({
        ...acc,
        [key]: this.inquiries[key].getState(),
      }),
      {},
    );
  };
}

export default RestClient;
