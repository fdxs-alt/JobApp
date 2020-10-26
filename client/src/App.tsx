import React, { useState, useEffect } from 'react';
import Routes from './Routes/Routes';
import { setToken } from './AccessToken';
import isAuth, { isOwner } from './Graphql/isAuth';
import Spinner from './components/Spinner';
const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(process.env.REACT_APP_BASE_URL + '/refresh', {
      method: 'POST',
      credentials: 'include',
    }).then(async (response) => {
      const data = await response.json();
      setToken(data.accessToken);

      if (data.accessToken.length === 0) {
        isAuth(false);
      } else {
        isAuth(true);
        if (data.isOwner) isOwner(true);
      }
      setLoading(false);
    });
  }, []);

  if (loading) return <Spinner size={100} loading={loading} />;
  else return <Routes />;
};

export default App;
