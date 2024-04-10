import { useDispatch } from 'react-redux';
import { useTypedSelector } from './useTypedSelector';
import { addToCart, clearCart, updateCart } from '@/redux/cart/cart-slice';

export const useCart = () => {
  const cart = useTypedSelector(state => state.cart.data);
  const dispatch = useDispatch();

  const addTicketToCart = async (listNum: number[]) => {
    dispatch(addToCart({ listNum }));
    // saveItemToLocal('cart', [...cart, listNum]);
  };
  const clearTicketCart = async () => {
    dispatch(clearCart());
    // removeItemFromLocal('cart');
  };
  const updateTicketsCart = async (listNum: number[][]) => {
    dispatch(updateCart({ listNum }));
    // saveItemToLocal('cart', [...listNum]);
  };

  return { cart, addTicketToCart, clearTicketCart, updateTicketsCart };
};
