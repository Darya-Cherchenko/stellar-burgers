import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { Preloader } from '@ui';

type protectedRouteProps = {
  onlyUnAuth?: boolean;
  component: React.JSX.Element;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  component
}: protectedRouteProps): React.JSX.Element => {
  const location = useLocation();
  const { isAuthorized, user } = useSelector((state) => state.user);

  if (!isAuthorized) {
    return <Preloader />;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state ?? { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return component;
};

export const UserUnAuthorized = ({
  component
}: {
  component: React.JSX.Element;
}): React.JSX.Element => <ProtectedRoute onlyUnAuth component={component} />;

export const UserAuthorized = ({
  component
}: {
  component: React.JSX.Element;
}): React.JSX.Element => <ProtectedRoute component={component} />;
