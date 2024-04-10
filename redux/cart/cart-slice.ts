import { createSlice } from '@reduxjs/toolkit';

interface InitialStateCartProps {
  data: number[][];
}

const initialState: InitialStateCartProps = {
  data: [],
};
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.data = [...state.data, action.payload.listNum];
    },
    updateCart: (state, action) => {
      state.data = action.payload.listNum;
    },
    clearCart: state => {
      state.data = [];
    },
  },
});

export const { addToCart, updateCart, clearCart } = cartSlice.actions;
