import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import isAuth from '../Graphql/isAuth';
import { useQuery } from '@apollo/client';
import { IS_AUTH } from '../Graphql/Queries';
const NotAccessableWhenLogged: React.FC<{
  component: React.FC;
  path: string;
  exact?: boolean;
}> = (props) => {
  const { data } = useQuery(IS_AUTH);

  return data.isAuthenticated ? (
    <Redirect to="/" />
  ) : (
    <Route path={props.path} exact={props.exact} component={props.component} />
  );
};

export default NotAccessableWhenLogged;
