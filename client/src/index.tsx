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
import isAuthenticated, { isOwner, length } from './Graphql/isAuth';
import { TableProvider } from './context/TableProvider';
import { JobProvider } from './context/JobOfferProvider';
import { isEqual } from 'lodash';
const links = ApolloLink.from([
  AuthLink,
  RefreshTokenLink,
  (uploadLink as unknown) as ApolloLink,
]);

const client = new ApolloClient({
  link: links,
  cache: new InMemoryCache({
    typePolicies: {
      allUsersOffers: {
        keyFields: ['id'],
      },
      Query: {
        fields: {
          getAllJobOfferImages: {
            merge(existing: any, incoming: any) {
              return { ...incoming };
            },
          },
          allUsersOffers: {
            merge: false,
          },
          getAllInfo: {
            merge(existing: any, incoming: any, { args }) {
              let result: any;
              if (args?.cursor === 0) {
                result = {
                  __typename: 'ResponseTable',
                  hasMore: incoming.hasMore,
                  info: [...incoming.info],
                };
              }
              if (existing) {
                if (existing?.hasMore)
                  result = {
                    __typename: 'ResponseTable',
                    hasMore: incoming.hasMore,
                    info: isEqual(existing.info, incoming.info)
                      ? [...incoming.info]
                      : [...existing.info, ...incoming.info],
                  };
                if (!incoming.hasMore && !existing.hasMore)
                  result = {
                    __typename: 'ResponseTable',
                    hasMore: existing.hasMore,
                    info: isEqual(existing.info, incoming.info)
                      ? [...incoming.info]
                      : [...existing.info],
                  };
              }

              length(result.info.length);

              return result;
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
