import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { CONFIRM } from '../../Graphql/AuthMutations';
import { useHistory, useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import SearchBar from '../../components/FilterComponents/SearchBar';
import {
  Container,
  ConfirmMessage,
  ErrorMessage,
} from '../../styles/AuthStyles';

const Confirm = () => {
  const [confirm, { loading, error, data }] = useMutation(CONFIRM);
  const history = useHistory();
  const query: { token: string } = useParams();
  const token = query.token;

  useEffect(() => {
    if (token === undefined) history.push('/');
    const confirmUser = async (token: any) => {
      try {
        await confirm({ variables: { token } });
        setTimeout(() => history.push('/'), 2000);
      } catch (error) {
        setTimeout(() => history.push('/'), 2000);
      }
    };
    confirmUser(token);
    // eslint-disable-next-line
  }, []);
  if (loading) return <Spinner size={100} loading={loading} />;
  return (
    <>
      <SearchBar />
      <Container>
        {data && (
          <ConfirmMessage>
            Account has been confirmed successfully
          </ConfirmMessage>
        )}
        {error && <ErrorMessage>{error.message}</ErrorMessage>}
      </Container>
    </>
  );
};

export default Confirm;
