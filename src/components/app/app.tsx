import {
  ConstructorPage,
  Feed,
  Login,
  NotFound404,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { useEffect } from 'react';
import { Route, Routes, useLocation, useMatch } from 'react-router-dom';
import { useDispatch } from '../../services/store';

import { getIngredientsThunk } from '../../services/slices/IngredientsSlice';
import {
  AppHeader,
  IngredientDetails,
  Modal,
  OrderInfo,
  UserUnAuthorized,
  UserAuthorized
} from '@components';
import { checkUser, getUserThunk } from '../../services/slices/UserAuthSlice';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const bgLocation = location.state?.background;
  const profileMatch = useMatch('/profile/orders/:number')?.params.number;
  const feedMatch = useMatch('/feed/:number')?.params.number;
  const orderNum = profileMatch || feedMatch;

  useEffect(() => {
    dispatch(getUserThunk())
      .unwrap()
      .catch(() => {})
      .finally(() => dispatch(checkUser()));
    dispatch(getIngredientsThunk());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={bgLocation || location}>
        <Route path='*' element={<NotFound404 />} />
        <Route path='/' element={<ConstructorPage />} />
        <Route
          path='/login'
          element={<UserUnAuthorized component={<Login />} />}
        />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/register'
          element={<UserUnAuthorized component={<Register />} />}
        />
        <Route
          path='/forgot-password'
          element={<UserUnAuthorized component={<ForgotPassword />} />}
        />
        <Route
          path='/reset-password'
          element={<UserUnAuthorized component={<ResetPassword />} />}
        />
        <Route
          path='/profile'
          element={<UserAuthorized component={<Profile />} />}
        />
        <Route
          path='/profile/orders'
          element={<UserAuthorized component={<ProfileOrders />} />}
        />
      </Routes>
      {bgLocation && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal title={`#${orderNum && orderNum.padStart(6, '0')}`}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента'>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <UserAuthorized
                component={
                  <Modal title={`#${orderNum && orderNum.padStart(6, '0')}`}>
                    <OrderInfo />
                  </Modal>
                }
              />
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
