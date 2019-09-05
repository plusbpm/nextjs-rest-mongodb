import React from 'react';
import App from 'next/app';

import { createClient, Provider } from '../src/restClient';

export default class MyApp extends App {
  constructor(props) {
    super(props);
    this.restClient = createClient({ initialState: props.cachedData });
  }

  static async getInitialProps({ Component, ctx }) {
    const restClient = createClient();

    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps({ ...ctx, restClient })
      : {};

    return { pageProps, cachedData: restClient.getResults() };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Provider restClient={this.restClient}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </Provider>
    );
  }
}
