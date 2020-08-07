import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { IS_AUTH, IS_OWNER } from '../Graphql/Queries';
const OwnerRoutes: React.FC<{
  component: React.FC;
  path: string;
  exact?: boolean;
}> = (props) => {
  const authData = useQuery(IS_AUTH);
  const ownerData = useQuery(IS_OWNER);

  if (authData.loading || ownerData.loading) return null;
  return authData.data.isAuthenticated && ownerData.data.isOwner ? (
    <Route path={props.path} exact={props.exact} component={props.component} />
  ) : (
    <Redirect to="/" />
  );
};

export default OwnerRoutes;
