import { createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getToken } from '../AccessToken';

const httpLink = createHttpLink({
  uri: 'http://localhost:5000/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = getToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export default authLink.concat(httpLink);
