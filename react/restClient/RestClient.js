import lodashKeys from 'lodash/keys';
import pick from 'lodash/pick';
import mapValues from 'lodash/mapValues';
import uniq from 'lodash/uniq';

import Inquiry from './Inquiry';
import invariant from '../../shared/util/invariant';

const mapResultsFunc = inquery => inquery.getState();

class RestClient {
  constructor(options) {
    const { apiRoot, initialState, globalSendOptions } = options || {};
    this.apiRoot = apiRoot || '';
    this.inqueries = {};
    this.globalSendOptions = globalSendOptions || {};
    this.initialState = initialState || {};
    this.lastInqueryNumber = 0;
  }

  getInquery = (id, sendOptions = {}) => {
    invariant(typeof id === 'string', "First argument 'id' is missing.");
    invariant(id.length > 0, "First argument 'id' is empty.");
    const { [id]: currentState, ...nextInitialState } = this.initialState;
    this.initialState = nextInitialState;
    const inquiry =
      this.inqueries[id] ||
      (this.inqueries[id] = new Inquiry(
        this,
        { ...this.globalSendOptions, ...sendOptions },
        currentState,
      ));
    return inquiry;
  };

  getNextInqueryNumber = () => {
    this.lastInqueryNumber += 1;
    return this.lastInqueryNumber;
  };

  getInqueriesMap = options => {
    const { ids, mapFunc, results } = options || {};
    const originalIds = ids || [];
    const allUniqKeys = uniq(lodashKeys(this.initialState).concat(originalIds));
    allUniqKeys.forEach(this.getInquery);

    const inqueriesMap =
      originalIds.length > 0 ? pick(this.inqueries, originalIds) : { ...this.inqueries };

    const withFunc = mapFunc || (results ? mapResultsFunc : undefined);
    return withFunc ? mapValues(inqueriesMap, withFunc) : inqueriesMap;
  };

  cleanErrors = () => {
    const mapFunc = inquery => inquery.cleanError();
    this.getInqueriesMap({ mapFunc });
  };
}

export default RestClient;
