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
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';

import { getIngredientsThunk } from '../../services/slices/IngredientsSlice';
import {
  AppHeader,
  IngredientDetails,
  Modal,
  OrderInfo,
  UserUnAuthorized,
  UserAuthorized
} from '@components';
import {
  checkUser,
  getUserStateSelector,
  getUserThunk
} from '../../services/slices/UserAuthSlice';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userLoading = useSelector(getUserStateSelector).isLoading;
  const backgroundLocation = location.state?.background;

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
      <Routes>
        <Route path='*' element={<NotFound404 />} />
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={<UserUnAuthorized component={<Login />} />}
        />
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
        <Route
          path='/feed/:number'
          element={
            <Modal title={''}>
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
        >
          {' '}
        </Route>
        <Route
          path='/profile/orders/:number'
          element={
            <UserAuthorized
              component={
                <Modal title={''}>
                  <OrderInfo />
                </Modal>
              }
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
