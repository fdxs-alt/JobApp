import React from 'react';
import Navbar from './Navbar';
import { GET_USER } from '../../Graphql/Queries';
import { useQuery, useMutation } from '@apollo/client';
import EmployerNavbar from './EmployerNavbar';
import { LOGOUT } from '../../Graphql/AuthMutations';
import { setToken } from '../../AccessToken';
import isAuthenticated, { isOwner } from '../../Graphql/isAuth';
import { useHistory } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { size } from '../../DefaultValues/HardCoded';
import Spinner from '../Spinner';

type Response = {
  getUser: {
    id: number;
    email: string;
    confirmed: boolean;
    hasCompany: boolean;
    fullName: string;
    companyName: string;
  };
};

const Navbars = () => {
  const history = useHistory();
  const [logout, { client }] = useMutation(LOGOUT);
  const { data, loading } = useQuery<Response>(GET_USER);

  const isLaptopOrSmallDevice = useMediaQuery({
    query: '(max-width: 1200px)',
  });

  const handleClick = async (): Promise<void> => {
    await logout();
    isAuthenticated(false);
    isOwner(false);
    setToken('');
    client.clearStore();
    history.push('/login');
  };

  if (loading) return <Spinner size={100} loading={loading} />;
  else
    return (
      <>
        {data?.getUser.hasCompany ? (
          <EmployerNavbar
            handleClick={handleClick}
            smallMenu={isLaptopOrSmallDevice}
          />
        ) : (
          <Navbar
            fullName={data?.getUser.fullName}
            handleClick={handleClick}
            smallMenu={isLaptopOrSmallDevice}
          />
        )}
      </>
    );
};

export default Navbars;
