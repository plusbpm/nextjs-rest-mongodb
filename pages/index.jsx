import React from 'react';
import Head from 'next/head';

import { useInquiry } from '../src/restClient';

const Home = () => {
  const inq = useInquiry('home', { endpoint: '/test' });
  const { canceled, data, error, isLoading } = inq.getState();
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      isLoading - {isLoading.toString()}
      <br />
      data: {JSON.stringify(data)}
      <br />
      error: {JSON.stringify(error && error.message)}
      <br />
      error details: {JSON.stringify(error && error.details)}
      <br />
      canceled: {JSON.stringify(canceled)}
      <br />
      <br />
      <button type="button" onClick={() => inq.send()}>
        Send
      </button>
      <button type="button" onClick={() => inq.send({ endpoint: '/test2', query: {} })}>
        Send2
      </button>
      <button type="button" onClick={() => inq.cancel()}>
        Cancel
      </button>
    </div>
  );
};

Home.getInitialProps = async ({ restClient }) => {
  await restClient.getInquiry('home', { endpoint: '/test' }).send();
  return {};
};

export default Home;
