import { stringify } from "query-string";
import fetch from "isomorphic-unfetch";

class Inquiry {
  constructor(client, params = {}, initialState) {
    this.client = client;
    this.params = params;
    this.state = {
      data: null,
      error: null,
      isLoading: false,
      number: null,
      stale: false,
      ...initialState
    };
    this.stateChangeHandlers = [];
  }

  getUrl = () => {
    const { endpoint, query } = this.params;
    const queryString = stringify(query);
    const questionSign =
      /\?/.test(endpoint) || queryString.length === 0 ? "" : "?";
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

  send = () => {
    const { method, options = {} } = this.params;
    const url = this.getUrl();
    const number = this.client.getNextInquiryNumber();
    this.patchState({ number, isLoading: true });

    return fetch(url, { method, options })
      .then(response => {
        if (!response.ok) {
          const error = new Error(response.statusText);
          error.response = response;
          return Promise.reject(error);
        }

        return response.json();
      })
      .then(data => ({ data, error: null }))
      .catch(error => ({ data: null, error }))
      .then(results => {
        if (number === this.state.number)
          this.patchState({ ...results, isLoading: false });
      });
  };

  cancel = () => {
    if (!this.state.isLoading) return;
    this.patchState({
      number: this.client.getNextInquiryNumber(),
      isLoading: false
    });
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
