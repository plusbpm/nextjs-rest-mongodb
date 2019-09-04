import { stringify } from 'query-string';
import fetch from 'isomorphic-unfetch';

class Inquiry {
  constructor(client, options, initialState) {
    this.client = client;
    this.method = options.method;
    this.options = options;
    this.state = {
      canceled: false,
      data: null,
      error: null,
      isLoading: false,
      number: null,
      ...initialState,
    };
    this.stateChangeHandlers = [];
  }

  getUrl = (endpoint = '/', query) => {
    const queryString = stringify(query);
    const questionSign = /\?/.test(endpoint) || queryString.length === 0 ? '' : '?';
    return `${this.client.apiRoot}${endpoint}${questionSign}${queryString}`;
  };

  getState = () => {
    const { number, ...rest } = this.state;
    return rest;
  };

  patchState = patch => {
    this.state = { ...this.state, ...patch };
    this.stateChangeHandlers.forEach(handler => handler(this.state));
  };

  getAbortSignal = () => {
    if (typeof AbortController === 'undefined') return undefined;

    if (this.abortController && !this.abortController.signal.aborted) {
      return this.abortController.signal;
    }

    this.abortController = new AbortController();
    return this.abortController.signal;
  };

  send = options => {
    const number = this.client.getNextInquiryNumber();
    this.abort();
    const { endpoint, query, ...fetchOptions } = {
      ...this.options,
      ...options,
      method: this.method,
      signal: this.getAbortSignal(),
    };
    const url = this.getUrl(endpoint, query);

    this.patchState({ options, number, isLoading: true, canceled: false, error: null });

    return fetch(url, fetchOptions)
      .then(response => {
        if (response.ok) return response.json();
        return response.text().then(details => {
          const error = new Error(response.statusText);
          error.code = response.status;
          error.details = details;
          return Promise.reject(error);
        });
      })
      .then(data => ({ data, error: null }))
      .catch(error => ({
        error: {
          code: error.code || 500,
          message: error.message,
          details: error.details || error.stack,
        },
      }))
      .then(results => {
        if (number === this.state.number) this.patchState({ ...results, isLoading: false });
      });
  };

  abort = () => {
    if (this.abortController) {
      this.abortController.abort();
    }
  };

  cancel = () => {
    this.abort();
    if (this.state.isLoading) {
      this.patchState({
        canceled: true,
        error: new Error('Canceled'),
        isLoading: false,
        number: this.client.getNextInquiryNumber(),
      });
    }
  };

  onStateChange = handler => {
    const index = this.stateChangeHandlers.indexOf(handler);
    if (index === -1) this.stateChangeHandlers.push(handler);
  };

  offStateChange = handler => {
    const index = this.stateChangeHandlers.indexOf(handler);
    if (index !== -1) this.stateChangeHandlers.splice(index, 1);
  };
}

export default Inquiry;
