import React, { useState } from "react";
import Head from "next/head"; //Head component
import "../styles.css";
import { AppProps } from "next/app";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";

const RecordMyDay = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Head>
            <meta charSet="utf-8"></meta>
            <title>RecordMyDay</title>
          </Head>
          <Component {...pageProps} />
        </Hydrate>
      </QueryClientProvider>
    </>
  );
};

export default RecordMyDay;
