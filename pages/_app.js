import React from 'react';
import { Provider } from 'react-redux';
import Head from 'next/head';
import PropTypes from 'prop-types';

import withReduxStore from '../lib/with-redux-store';
import Wrapper from '../components/layout';

const MyApp = (props) => {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = window.document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  });

  const { Component, pageProps, store } = props;
  return (
    <React.Fragment>
      <Head>
        <title>Factly</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
      </Head>
      <Provider store={store}>
        <Wrapper Component={Component} pageProps={pageProps} />
      </Provider>
    </React.Fragment>
  );
};

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.element,
  store: PropTypes.object.isRequired,
};

MyApp.defaultProps = {
  pageProps: null,
};

export default withReduxStore(MyApp);
