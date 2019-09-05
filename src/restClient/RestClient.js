import Inquiry from './Inquiry';
import invariant from '../util/invariant';

class RestClient {
  constructor(options) {
    const { apiRoot, initialState, globalSendOptions } = options || {};
    this.apiRoot = apiRoot || '';
    this.inquiries = {};
    this.globalSendOptions = globalSendOptions || {};
    this.initialState = initialState || {};
    this.lastInquiryNumber = 0;
  }

  getInquiry = (id, sendOptions = {}) => {
    invariant(typeof id === 'string', "First argument 'id' is missing.");
    invariant(id.length > 0, "First argument 'id' is empty.");
    const { [id]: currentState, ...nextInitialState } = this.initialState;
    this.initialState = nextInitialState;
    const inquiry =
      this.inquiries[id] ||
      (this.inquiries[id] = new Inquiry(
        this,
        { ...this.globalSendOptions, ...sendOptions },
        currentState,
      ));
    return inquiry;
  };

  getNextInquiryNumber = () => {
    this.lastInquiryNumber += 1;
    return this.lastInquiryNumber;
  };

  getResults = () => {
    const keys = [...Object.keys(this.inquiries), ...Object.keys(this.initialState)];
    return keys.reduce(
      (acc, key) => ({
        ...acc,
        [key]: this.inquiries[key] ? this.inquiries[key].getState() : this.initialState[key],
      }),
      {},
    );
  };
}

export default RestClient;
