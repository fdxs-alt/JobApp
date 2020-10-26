import { TokenRefreshLink } from 'apollo-link-token-refresh';
import { getToken, setToken } from '../AccessToken';
import JwtDecode from 'jwt-decode';
import isAuthenticated, { isOwner } from './isAuth';

const link = new TokenRefreshLink({
  accessTokenField: 'accessToken',
  isTokenValidOrUndefined: () => {
    const token = getToken();
    if (!token) return true;
    try {
      const { exp } = JwtDecode(token);
      return Date.now() <= exp * 1000;
    } catch (error) {
      return false;
    }
  },
  fetchAccessToken: () => {
    return fetch(process.env.REACT_APP_BASE_URL + '/refresh', {
      method: 'POST',
      credentials: 'include',
    });
  },
  handleFetch: (accessToken: string) => {
    setToken(accessToken);
    const data = JwtDecode(accessToken) as any;
    if (data!.isOwner) isOwner(true);
  },
  handleError: (err: Error) => {
    isAuthenticated(false);
  },
});
export default link;
