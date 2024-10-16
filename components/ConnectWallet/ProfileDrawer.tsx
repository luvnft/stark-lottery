import { useAuth } from '@/hooks/useAuth';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  HStack,
  Icon,
  Skeleton,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import React from 'react';
import ConnectWallet from '.';

import LogoutIcon from '@/public/assets/icons/general/logout.svg';
import {
  useBalance,
  useContractRead,
  useDisconnect,
} from '@starknet-react/core';
import { CONTRACT_ADDRESS } from '@/config/contractAddress';
import { useDispatch } from 'react-redux';
import { ellipseMiddle } from '@/utils';
import CopyClipBoard from '../CopyClipBoard/CopyClipBoard';
import Link from 'next/link';
import { logout, setUserLoading } from '@/redux/user/user-slice';
import { ABIS } from '@/abis';

const ProfileDrawer = () => {
  const { user } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { disconnect } = useDisconnect();
  const { isLoading: isLoadingBalance, data: dataBalance } = useBalance({
    token: CONTRACT_ADDRESS.strk,
    address: user?.toLowerCase(),
    enabled: !!user,
  });

  const dispatch = useDispatch();

  const { data: dataPoint, isLoading: isLoadingPoint } = useContractRead({
    functionName: 'getUserPoint',
    abi: ABIS.PointABI,
    args: [user ? user : ''],
    address: CONTRACT_ADDRESS.userpoint,
    watch: true,
  });
  return (
    <>
      {user ? (
        <Avatar
          onClick={onOpen}
          name={user ? user : ''}
          src="https://bit.ly/broken-link"
        />
      ) : (
        <ConnectWallet
          sx={{
            minW: '80px',
          }}
        />
      )}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="primary.game.100">
          <DrawerCloseButton />

          <DrawerBody py={10} display="flex" flexDirection="column" gap={6}>
            <HStack
              bg="#1b266b"
              padding={4}
              fontWeight="800"
              borderRadius="8px"
            >
              <HStack width="fit-content" borderRight="2px solid" pr={2}>
                <Text>Your Point:</Text>
                <Box>
                  {!isLoadingPoint ? (
                    dataPoint?.toString()
                  ) : (
                    <Skeleton>00</Skeleton>
                  )}
                </Box>
              </HStack>
              <HStack width="fit-content">
                <Text>STRK:</Text>
                <Box>
                  {dataBalance && !isLoadingBalance ? (
                    parseFloat(dataBalance.formatted).toFixed(2)
                  ) : (
                    <Skeleton>0.00</Skeleton>
                  )}
                </Box>
              </HStack>
            </HStack>
            <HStack>
              <Text>{ellipseMiddle(user || '', 8, 8)}</Text>
              <CopyClipBoard aria-label="copy icon" context={user || ''} />
            </HStack>

            <Link href="/tickets"> My Tickets</Link>
            <Text opacity={0.5} userSelect="none">
              History
            </Text>
            <Text opacity={0.5} userSelect="none">
              LeaderBoard
            </Text>
            <Divider />

            <HStack
              onClick={async () => {
                dispatch(setUserLoading(true));
                await dispatch(logout());
                await disconnect();
                onClose();
                dispatch(setUserLoading(false));
              }}
            >
              <Text fontSize="lg">Logout</Text>
              <Icon as={LogoutIcon} h={4} w={4} />
            </HStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ProfileDrawer;
