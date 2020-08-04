import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import isAuth from '../Graphql/isAuth';

const NotAccessableWhenLogged: React.FC<{
  component: React.FC;
  path: string;
  exact?: boolean;
}> = (props) => {
  return isAuth() ? (
    <Redirect to="/" />
  ) : (
    <Route path={props.path} exact={props.exact} component={props.component} />
  );
};

export default NotAccessableWhenLogged;
