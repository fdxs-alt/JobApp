import React, { useEffect } from 'react';
import { parse } from 'query-string';
import { useMutation } from '@apollo/client';
import { CONFIRM } from '../../Graphql/AuthMutations';
import { useHistory } from 'react-router-dom';
import Spinner from '../../components/Spinner';
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
    // eslint-disable-next-line
  }, []);
  if (loading) return <Spinner size={100} loading={loading} />;
  return (
    <div>
      {!error && !loading && <div>User has been confirmed successfully </div>}
      {error && error.message}
    </div>
  );
};

export default Confirm;
