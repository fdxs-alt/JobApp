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
      setToken(data.accessToken);
      setLoading(false);
      isAuth(true);
    });
  }, []);

  if (loading) return <h1>Loading</h1>;
  else return <Routes />;
};

export default App;
