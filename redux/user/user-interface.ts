/* eslint-disable no-unused-vars */
export interface IUser {
  address: string;
}

export interface IInitialState {
  user: string | null;
  isLoading: boolean;
  chainId: number | null;
}
