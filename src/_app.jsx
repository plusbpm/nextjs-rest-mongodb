import React from "react";
import App from "next/app";

import { createClient, Provider } from "../src/client";

const apiRoot = process.env.API_ROOT;

export default class MyApp extends App {
  constructor(props) {
    super(props);
    this.restClient = createClient({
      apiRoot,
      initialState: props.cacheData
    });
  }

  static async getInitialProps({ Component, ctx }) {
    const client = createClient({ apiRoot });

    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps({ ...ctx, client })
      : {};

    return { pageProps, cacheData: client.extractCacheData() };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Provider client={this.restClient}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </Provider>
    );
  }
}
