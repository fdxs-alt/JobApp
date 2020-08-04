import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import Theme from './styles/Theme';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
} from '@apollo/client';
import AuthLink from './Graphql/AuthLink';
import RefreshTokenLink from './Graphql/RefreshTokenLink';

const links = ApolloLink.from([RefreshTokenLink, AuthLink]);
const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  credentials: 'include',
  link: links,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      <App />
    </ThemeProvider>
  </ApolloProvider>,

  document.getElementById('root'),
);
