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
import { uploadLink, AuthLink } from './Graphql/AuthLink';
import RefreshTokenLink from './Graphql/RefreshTokenLink';
import isAuthenticated, { isOwner } from './Graphql/isAuth';
import { TableProvider } from './context/TableProvider';
import { JobProvider } from './context/JobOfferProvider';
import { concatPagination } from '@apollo/client/utilities';

const links = ApolloLink.from([
  AuthLink,
  RefreshTokenLink,
  (uploadLink as unknown) as ApolloLink,
]);

const client = new ApolloClient({
  link: links,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getAllJobOfferImages: {
            merge(existing = [], incoming: any) {
              return { ...incoming };
            },
          },
          getAllInfo: {
            merge(existing = {}, incoming: any) {
              return {
                __typename: 'ResponseTable',
                hasMore: incoming.hasMore,
                info: existing.info
                  ? [...existing.info, ...incoming.info]
                  : [...incoming.info],
              };
            },
            read(existing: any[]) {
              return existing;
            },
          },
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
