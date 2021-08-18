import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

import wrapper from '../store/configureStore';

const PlanManager = ({ Component }) => (
  <>
    <Head>
      <title>NodeBird</title>
      <link rel="shortcut icon" href="/favicon.ico" />
    </Head>
    <Component />
  </>
);

PlanManager.propTypes = {
  Component: PropTypes.elementType.isRequired,
};


export default wrapper.withRedux(PlanManager);