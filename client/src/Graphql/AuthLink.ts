import { createHttpLink, ApolloLink } from '@apollo/client';
import { getToken } from '../AccessToken';
import { createUploadLink } from 'apollo-upload-client';
export const httpLink = createHttpLink({
  uri: 'http://localhost:5000/graphql',
  credentials: 'include',
});

export const AuthLink = new ApolloLink((operation, forward) => {
  const token = getToken();
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : '',
    },
  });

  return forward(operation);
});

export const uploadLink = createUploadLink({
  uri: 'http://localhost:5000/graphql',
  credentials: 'include',
});
