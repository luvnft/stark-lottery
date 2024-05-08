import { useAuth } from '@/hooks/useAuth';
import { logout, setUserLoading } from '@/redux/user/user-slice';
import { ellipseMiddle } from '@/utils';
import {
  Avatar,
  Box,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Skeleton,
  Text,
} from '@chakra-ui/react';
import {
  useBalance,
  useContractRead,
  useDisconnect,
} from '@starknet-react/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import LogoutIcon from '@/public/assets/icons/general/logout.svg';
import ABIPoint from '@/abi/point.json';
import { CONTRACT_ADDRESS } from '@/config/contractAddress';
import CopyClipBoard from '../CopyClipBoard/CopyClipBoard';
import Link from 'next/link';
const ProfileAccount = () => {
  const { user } = useAuth();

  const { disconnect } = useDisconnect();
  const { isLoading: isLoadingBalance, data: dataBalance } = useBalance({
    token: CONTRACT_ADDRESS.strk,
    address: user ? user : '',
    watch: true,
  });

  const dispatch = useDispatch();

  const { data: dataPoint, isLoading: isLoadingPoint } = useContractRead({
    functionName: 'getUserPoint',
    abi: ABIPoint,
    args: [user ? user : ''],
    address: CONTRACT_ADDRESS.userpoint,
    watch: true,
  });

  return (
    <>
      <HStack>
        <HStack
          bg="#1b266b"
          padding={4}
          fontWeight="800"
          borderRadius="8px"
          display={{ xl: 'flex', md: 'none' }}
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
        <Menu variant="profile">
          <MenuButton>
            <Avatar name={user ? user : ''} src="https://bit.ly/broken-link" />
          </MenuButton>
          <MenuList>
            <MenuItem
              display={{
                xl: 'none',
                md: 'flex',
              }}
            >
              <HStack
                bg="#1b266b"
                padding={4}
                fontWeight="800"
                borderRadius="8px"
              >
                <HStack width="fit-content">
                  <Text>Your Point:</Text>
                  <Box>
                    {dataPoint && !isLoadingPoint ? (
                      dataPoint.toString()
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
            </MenuItem>
            <MenuItem onClick={e => e.preventDefault()}>
              <Text>{ellipseMiddle(user || '', 8, 8)}</Text>
              <CopyClipBoard aria-label="copy icon" context={user || ''} />
            </MenuItem>

            <MenuItem>
              <Link href="/tickets"> My Tickets</Link>
            </MenuItem>
            <MenuItem isDisabled>History</MenuItem>
            <MenuItem isDisabled>LeaderBoard</MenuItem>

            <MenuDivider />

            <MenuItem
              onClick={async () => {
                dispatch(setUserLoading(true));
                await dispatch(logout());
                await disconnect();
                dispatch(setUserLoading(false));
              }}
            >
              <Text fontSize="lg">Logout</Text>
              <Icon as={LogoutIcon} h={4} w={4} />
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </>
  );
};

export default ProfileAccount;
