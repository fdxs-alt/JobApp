import { TokenRefreshLink } from 'apollo-link-token-refresh';
import { getToken, setToken } from '../AccessToken';
import JwtDecode from 'jwt-decode';

const link = new TokenRefreshLink({
  accessTokenField: 'accessToken',
  isTokenValidOrUndefined: () => {
    const token = getToken();
    if (!token) return true;
    try {
      const { exp } = JwtDecode(token);
      return Date.now() >= exp * 1000;
    } catch (error) {
      return false;
    }
  },
  fetchAccessToken: () => {
    return fetch('http://localhost:5000/refresh', {
      method: 'POST',
      credentials: 'include',
    });
  },
  handleFetch: (accessToken: string) => setToken(accessToken),
  handleError: (err: Error) => {
    console.log('Token invalid', err);
  },
});
export default link;
