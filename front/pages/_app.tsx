import React from "react";
import PropTypes from "prop-types";
import Head from "next/head"; //Head component
import "../styles.css";
import wrapper from "../store/configureStore";
import { AppProps } from "next/app";

const RecordMyDay = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8"></meta>
        <title>RecordMyDay</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
};

RecordMyDay.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(RecordMyDay);
