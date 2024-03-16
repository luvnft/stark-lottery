import { useAuth } from '@/hooks/useAuth';
import { logout, setUserLoading } from '@/redux/user/user-slice';
import { ellipseMiddle } from '@/utils';
import { HStack, Icon, Text } from '@chakra-ui/react';
import { useBalance, useDisconnect } from '@starknet-react/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import LogoutIcon from '@/public/assets/icons/general/logout.svg';
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
      <HStack
        bg="#1b266b"
        paddingX={6}
        py={3}
        borderRadius="2xl"
        cursor="pointer"
        onClick={async () => {
          dispatch(setUserLoading(true));
          await dispatch(logout());
          await disconnect();
          dispatch(setUserLoading(false));
        }}
      >
        <Text>{ellipseMiddle(user || '')}</Text>
        <Icon as={LogoutIcon} h={5} w={5} />
      </HStack>
      {/* <Menu placement="bottom-end">
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
      </Menu> */}
    </>
  );
};

export default ProfileAccount;
