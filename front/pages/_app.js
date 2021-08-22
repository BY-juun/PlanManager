import React from 'react';
import PropTypes from 'prop-types'
import Head from 'next/head'; //Head component
import '../styles.css'
import wrapper from '../store/configureStore';

const planManger = ({ Component }) => {
    return (
        <>
            <Head>
                <meta charSet="utf-8"></meta>
                <title>planManger</title>
            </Head>
            <Component />
        </>
    );
}

planManger.propTypes = {
    Component: PropTypes.elementType.isRequired,
}

export default wrapper.withRedux(planManger);