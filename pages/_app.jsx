import React from 'react';
import Head from 'next/head';
import App, { Container } from 'next/app';

import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';

import { createClient, Provider as RestProvider } from '../src/restClient';
import theme from '../src/material-ui/theme';

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

  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Head>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <RestProvider restClient={this.restClient}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </RestProvider>
      </Container>
    );
  }
}
