import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  getConstructorSelector,
  addOrderRequest,
  addNullOrderModalData,
  addModalData,
  clearConstructor
} from '../../services/slices/ConstructorSlice';
import { useSelector, useDispatch } from '../../services/store';
import { isAuthorizedSelector } from '../../services/slices/UserAuthSlice';
import { useNavigate } from 'react-router-dom';
import { orderBurgerApi, refreshToken } from '@api';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { ingredients, bun, orderRequest, orderModalData } = useSelector(
    getConstructorSelector
  );
  const isAuthorized = useSelector(isAuthorizedSelector);

  const constructorItems = {
    bun,
    ingredients,
    orderRequest,
    orderModalData
  };

  const onOrderClick = () => {
    if (isAuthorized) {
      const ingIDs: string[] = [];
      ingredients.forEach((ingredient) => {
        ingIDs.push(ingredient._id);
      });

      if (bun) {
        ingIDs.push(bun._id);
        ingIDs.push(bun._id);
      }

      dispatch(addOrderRequest(true));
      refreshToken()
        .then(() => {
          orderBurgerApi(ingIDs)
            .then((data) => {
              dispatch(addModalData(data.order));
              dispatch(addOrderRequest(false));
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      navigate('/login');
    }
  };
  const closeOrderModal = () => {
    dispatch(addOrderRequest(false));
    dispatch(addNullOrderModalData());
    dispatch(clearConstructor());
    navigate('/');
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
