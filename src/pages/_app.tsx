import "../styles/globals.css";
import Layout from "../layouts/default";
import type { AppProps } from "next/app";
import Head from "next/head";
import 'react-calendar/dist/Calendar.css';
import {AnimatePresence} from 'framer-motion'

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <Head>
        <title>TravelFlow</title>
      </Head>
      <Layout>
        <AnimatePresence exitBeforeEnter>

        <Component {...pageProps} key={router.route} />
        </AnimatePresence>
      </Layout>
    </>
  );
}

export default MyApp;
