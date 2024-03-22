import { useAuth } from '@/hooks/useAuth';
import { logout, setUserLoading } from '@/redux/user/user-slice';
import { ellipseMiddle } from '@/utils';
import { Button, Icon, Text } from '@chakra-ui/react';
import { useDisconnect } from '@starknet-react/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import LogoutIcon from '@/public/assets/icons/general/logout.svg';
const ProfileAccount = () => {
  const { user } = useAuth();

  const { disconnect } = useDisconnect();
  const dispatch = useDispatch();
  return (
    <>
      <Button
        bg="#1b266b"
        variant="primary"
        borderRadius="32px"
        cursor="pointer"
        gap={4}
        onClick={async () => {
          dispatch(setUserLoading(true));
          await dispatch(logout());
          await disconnect();
          dispatch(setUserLoading(false));
        }}
      >
        <Text>{ellipseMiddle(user || '', 8, 6)}</Text>
        <Icon as={LogoutIcon} h={5} w={5} />
      </Button>
    </>
  );
};

export default ProfileAccount;
