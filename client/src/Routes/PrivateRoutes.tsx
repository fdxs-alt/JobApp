import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { IS_AUTH } from '../Graphql/Queries';

type AuthQueryResponse = {
  isAuthenticated: boolean;
};

const PrivateRoutes: React.FC<{
  component: React.FC;
  path: string;
  exact?: boolean;
}> = (props) => {
  const { data } = useQuery<AuthQueryResponse>(IS_AUTH);

  return data!.isAuthenticated ? (
    <Route path={props.path} exact={props.exact} component={props.component} />
  ) : (
    <Redirect to="/" />
  );
};

export default PrivateRoutes;
