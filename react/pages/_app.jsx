import React from 'react';
import Head from 'next/head';
import App from 'next/app';
import Router from 'next/router';

import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';

import AppProvider from '../appProvider';
import { createClient } from '../restClient';
import theme from '../material-ui/theme';

export default class MyApp extends App {
  constructor(props) {
    super(props);
    this.restClient = createClient({ initialState: props.cachedData });
  }

  static async getInitialProps({ Component, ctx }) {
    const { cookie } = ctx.req ? ctx.req.headers : {};
    const restClient = createClient({ globalSendOptions: { headers: { cookie } } });

    const userInquery = restClient.getInquery('user', { endpoint: '/user' });
    if (!userInquery.get('data')) await userInquery.send();

    const pageProps =
      (Component.getInitialProps && (await Component.getInitialProps({ ...ctx, restClient }))) ||
      {};
    const cachedData = restClient.getInqueriesMap({ results: true });

    return { pageProps, cachedData };
  }

  state = {
    nextRoutingOccur: false,
  };

  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
    Router.events.on('routeChangeStart', this.handleStartRouterChanges);
    Router.events.on('routeChangeComplete', this.handleStopRouterChanges);
    Router.events.on('routeChangeError', this.handleStopRouterChanges);
  }

  componentWillUnmount() {
    Router.events.off('routeChangeStart', this.handleRouterChanges);
    Router.events.off('routeChangeComplete', this.handleStopRouterChanges);
    Router.events.off('routeChangeError', this.handleStopRouterChanges);
  }

  handleStartRouterChanges = () => {
    this.setState({ nextRoutingOccur: true });
  };

  handleStopRouterChanges = () => {
    this.setState({ nextRoutingOccur: false });
  };

  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Head />
        <AppProvider restClient={this.restClient} nextRoutingOccur={this.state.nextRoutingOccur}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </AppProvider>
      </>
    );
  }
}
