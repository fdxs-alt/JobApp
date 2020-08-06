import React, { useEffect } from 'react';
import { parse } from 'query-string';
import { useMutation } from '@apollo/client';
import { CONFIRM } from '../Graphql/AuthMutations';
import { Redirect, useHistory } from 'react-router-dom';
const Confirm = () => {
  const [confirm, { loading, error }] = useMutation(CONFIRM);
  const history = useHistory();
  const query = parse(window.location.search);
  const token = { token: query?.token };
  useEffect(() => {
    if (token.token === undefined) history.push('/');
    const confirmUser = async (token: any) => {
      try {
        await confirm({ variables: token });
      } catch (error) {
        setTimeout(() => history.push('/'), 2000);
      }
    };
    confirmUser(token);
  }, []);
  if (loading) return null;
  return (
    <div>
      {!error && !loading && <div>User has been confirmed successfully </div>}
      {error && error.message}
    </div>
  );
};

export default Confirm;
