import { AppProps } from 'next/app';
import React from 'react';
import Layout from '../components/Layout';
import '../styles/global.css';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Layout>
    <Component {...pageProps} />
  </Layout>
);

export default MyApp;
