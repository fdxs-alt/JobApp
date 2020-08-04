import React, { useState, useEffect } from 'react';
import Routes from './Routes/Routes';
import { setToken } from './AccessToken';
import isAuth from './Graphql/isAuth';
const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/refresh', {
      method: 'POST',
      credentials: 'include',
    }).then(async (response) => {
      const data = await response.json();
      console.log(data);
      setToken(data.accessToken);
      if (data.accessToken.length === 0) {
        isAuth(false);
      } else {
        isAuth(true);
      }
      setLoading(false);
    });
  }, []);

  if (loading) return null;
  else return <Routes />;
};

export default App;
