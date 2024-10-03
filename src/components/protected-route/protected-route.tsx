import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { Preloader } from '@ui';

type protectedRouteProps = {
  authorized: boolean;
  component: React.JSX.Element;
};

export const ProtectedRoute = ({
  authorized = false,
  component
}: protectedRouteProps): React.JSX.Element => {
  const location = useLocation();
  const { isAuthorized, user } = useSelector((state) => state.user);

  if (!isAuthorized) {
    return <Preloader />;
  }

  if (authorized && user) {
    const { from } = location.state ?? { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  if (!authorized && !user) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return component;
};

export const UserAuthorized = ({
  component
}: {
  component: React.JSX.Element;
}): React.JSX.Element => <ProtectedRoute authorized component={component} />;
