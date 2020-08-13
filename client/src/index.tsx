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
import isAuthenticated, { isOwner } from './Graphql/isAuth';
import { TableProvider } from './context/TableProvider';
import { JobProvider } from './context/JobOfferProvider';

const links = ApolloLink.from([RefreshTokenLink, AuthLink]);

const client = new ApolloClient({
  link: links,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          isAuthenticated: {
            read() {
              return isAuthenticated();
            },
          },
          isOwner: {
            read() {
              return isOwner();
            },
          },
        },
      },
    },
  }),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <JobProvider>
      <TableProvider>
        <ThemeProvider theme={Theme}>
          <GlobalStyles />
          <App />
        </ThemeProvider>
      </TableProvider>
    </JobProvider>
  </ApolloProvider>,

  document.getElementById('root'),
);
