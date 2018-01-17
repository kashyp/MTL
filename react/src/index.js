/*eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import './styles/styles.css'; //Webpack can import CSS files too!
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import registerServiceWorker from './registerServiceWorker';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const httpLink = new HttpLink({ uri: 'http://localhost:3010/graphql' });

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

render(
  <ApolloProvider client={client}>
    <LocaleProvider locale={enUS}>
      <Router history={browserHistory} routes={routes} />
    </LocaleProvider>
  </ApolloProvider>,
  document.getElementById('app')
);
