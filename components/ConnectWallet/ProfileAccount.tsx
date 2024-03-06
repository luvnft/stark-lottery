import { useAuth } from '@/hooks/useAuth';
import { logout, setUserLoading } from '@/redux/user/user-slice';
import { ellipseMiddle } from '@/utils';
import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { useBalance, useDisconnect } from '@starknet-react/core';
import React from 'react';
import { useDispatch } from 'react-redux';

const ProfileAccount = () => {
  const { user } = useAuth();
  const { isLoading, data } = useBalance({
    address: user ? user : undefined,
    watch: true,
  });
  const { disconnect } = useDisconnect();
  const dispatch = useDispatch();
  return (
    <>
      <Menu placement="bottom-end">
        <MenuButton as={Button}>{ellipseMiddle(user || '')}</MenuButton>
        <MenuList color="primary.gray.700">
          <MenuItem>Your Account</MenuItem>
          <MenuItem>History</MenuItem>
          <MenuItem
            onClick={async () => {
              dispatch(setUserLoading(true));
              await dispatch(logout());
              await disconnect();
              dispatch(setUserLoading(false));
            }}
          >
            Logout
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

export default ProfileAccount;
