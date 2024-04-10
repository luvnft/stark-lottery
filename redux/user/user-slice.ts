import { createSlice } from '@reduxjs/toolkit';

import { IInitialState } from './user-interface';

const initialState: IInitialState = {
  user: null,
  isLoading: false,
  chainId: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUserLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    setChainId: (state, action) => {
      state.chainId = action.payload;
    },
    logout: state => {
      state.user = null;
      state.chainId = null;
      state.isLoading = false;
    },
  },
});
export const { setUser, setUserLoading, setChainId, logout } =
  userSlice.actions;
