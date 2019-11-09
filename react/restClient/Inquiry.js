import { stringify } from 'query-string';
import fetch from 'isomorphic-unfetch';
import get from 'lodash/get';

class Inquiry {
  constructor(client, options, { sendOptions, lastSendOptions, ...initialState } = {}) {
    this.client = client;
    this.options = { ...sendOptions, ...options };
    this.lastSendOptions = lastSendOptions;
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
    const root = /^(https?)?:?\/\//.test(endpoint) ? '' : this.client.apiRoot;
    return `${root}${endpoint}${questionSign}${queryString}`;
  };

  getState = () => {
    const { number, ...state } = this.state;
    return { ...state, sendOptions: this.options, lastSendOptions: this.lastSendOptions };
  };

  reset = () => {
    this.abort();
    this.patchState({
      canceled: false,
      data: null,
      error: null,
      isLoading: false,
    });
  };

  patchState = patch => {
    this.state = { ...this.state, ...patch };
    const copyStateChangeHandlers = [...this.stateChangeHandlers];
    copyStateChangeHandlers.forEach(handler => handler(this.state));
  };

  get = (path, defaultValue) => get(this.getState(), path, defaultValue);

  getAbortSignal = () => {
    if (typeof AbortController === 'undefined') return undefined;

    if (this.abortController && !this.abortController.signal.aborted) {
      return this.abortController.signal;
    }

    this.abortController = new AbortController();
    return this.abortController.signal;
  };

  send = options => {
    const number = this.client.getNextInqueryNumber();
    this.abort();
    this.lastSendOptions = options;

    const { endpoint, query, throwErrors, ...fetchOptions } = {
      ...this.options,
      ...options,
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
          error.details = /^\s*</.test(details) ? undefined : details;
          return Promise.reject(error);
        });
      })
      .then(data => ({ data, error: null }))
      .catch(error => ({
        error: {
          code: error.code || 500,
          message: error.message,
          details: error.details,
        },
      }))
      .then(results => {
        if (number === this.state.number) this.patchState({ ...results, isLoading: false });
        if (throwErrors && results.error) {
          const error = new Error(results.error.message);
          error.code = results.error.code;
          error.statusCode = results.error.code;
          throw error;
        }
      });
  };

  resend = () => this.send(this.lastSendOptions);

  abort = () => {
    if (this.abortController) {
      this.abortController.abort();
    }
  };

  cancel = () => {
    this.abort();
    if (!this.state.isLoading) return;
    this.patchState({
      canceled: true,
      error: new Error('Canceled'),
      isLoading: false,
      number: this.client.getNextInqueryNumber(),
    });
  };

  cleanError = () => this.patchState({ error: null });

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
