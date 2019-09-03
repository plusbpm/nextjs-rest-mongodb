import React from 'react';
import Head from 'next/head';

import { useGetInquiry } from '../src/client';

const Home = () => {
  const inq = useGetInquiry('home', {
    endpoint: '/api/test',
    query: { asd: 2 },
    // noAutosend: true,
  });
  const { canceled, data, error, isLoading, number } = inq.getState();
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      isLoading - {isLoading.toString()}
      <br />
      data: {JSON.stringify(data)}
      <br />
      error: {JSON.stringify(error && { msg: error.message })}
      <br />
      canceled: {JSON.stringify(canceled)}
      <br />
      number: {JSON.stringify(number)}
      <br />
      <br />
      <button type="button" onClick={() => inq.send()}>
        Send
      </button>
      <button type="button" onClick={() => inq.send({ endpoint: '/api/test2', query: {} })}>
        Send2
      </button>
      <button type="button" onClick={() => inq.cancel()}>
        Cancel
      </button>
    </div>
  );
};

export default Home;
