import React from 'react';
import Navbar from '../components/Navbar';
import { GET_USER } from '../Graphql/Queries';
import { useQuery, useMutation } from '@apollo/client';
import EmployerNavbar from '../components/EmployerNavbar';
import { LOGOUT } from '../Graphql/AuthMutations';
import { setToken } from '../AccessToken';
import isAuthenticated, { isOwner } from '../Graphql/isAuth';
import { useHistory } from 'react-router-dom';
const Navbars = () => {
  const history = useHistory();
  const [logout, { client }] = useMutation(LOGOUT);
  const { data, loading } = useQuery(GET_USER);
  const handleClick = async (): Promise<void> => {
    await logout();
    isAuthenticated(false);
    isOwner(false);
    setToken('');
    client.clearStore();
    history.push('/login');
  };
  if (loading) return null;
  else
    return (
      <>
        {data?.getUser.hasCompany ? (
          <EmployerNavbar handleClick={handleClick} />
        ) : (
          <Navbar fullName={data?.getUser.fullName} handleClick={handleClick} />
        )}
      </>
    );
};

export default Navbars;
