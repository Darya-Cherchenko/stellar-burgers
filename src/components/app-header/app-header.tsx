import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { getUserSelector } from '../../services/slices/UserAuthSlice';

export const AppHeader: FC = () => {
  const { user } = useSelector((state) => state.user);

  return <AppHeaderUI userName={user ? user.name : ''} />;
};
