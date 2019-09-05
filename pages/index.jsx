import React from 'react';
import Head from 'next/head';

import Button from '@material-ui/core/Button';

import { useInquiry } from '../src/restClient';

const Home = () => {
  const homeInq = useInquiry('home');
  const { canceled, data, error, isLoading } = homeInq.getState();

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
      <Button type="button" variant="contained" color="primary" onClick={() => homeInq.send()}>
        Отправить
      </Button>
      <Button
        type="button"
        variant="contained"
        color="primary"
        onClick={() => homeInq.send({ endpoint: '/test2', query: {} })}
      >
        Отправить еще
      </Button>
      <Button type="button" variant="contained" color="primary" onClick={() => homeInq.cancel()}>
        Отменить
      </Button>
    </div>
  );
};

Home.getInitialProps = async ({ restClient }) => {
  await restClient.getInquiry('home', { endpoint: '/test' }).send();
  return {};
};

export default Home;
