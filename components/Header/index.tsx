import { Box, Container, HStack, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import ListPageItem from './ListPageItem';
import Link from 'next/link';
import ConnectWallet from '../ConnectWallet';
import { useAuth } from '@/hooks/useAuth';
import { useAccount, useConnect } from '@starknet-react/core';
import { useDispatch } from 'react-redux';
import ProfileAccount from '../ConnectWallet/ProfileAccount';
import { setChainId, setUser } from '@/redux/user/user-slice';
import { saveUserToStorage } from '@/redux/user/user-helper';

const Header = () => {
  const { user, isLoading, chainId } = useAuth();
  const { address, status } = useAccount();
  const { connect, connectors } = useConnect();

  const dispatch = useDispatch();
  useEffect(() => {
    if (address && address != user) {
      dispatch(setUser(address));
      saveUserToStorage(address);
    }
  }, [address]);

  useEffect(() => {
    if (chainId != null) {
      dispatch(setChainId(chainId));
    }
  }, []);

  useEffect(() => {
    const handleReConenct = async () => {
      if (user && status === 'disconnected' && chainId != null) {
        await connect({ connector: connectors[chainId] });
      }
    };
    handleReConenct();
  }, [isLoading, address, chainId]);
  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      bg="primary.game.100"
      borderBottom="0.064rem solid"
      borderBottomColor="primary.game.300"
      zIndex={9}
    >
      <Container maxWidth="container.xl">
        <HStack justifyContent="space-between" py={6}>
          <Link href="/">
            <Text> Logo Decolgen</Text>
          </Link>

          <ListPageItem
            sx={{
              display: { md: 'flex', base: 'none' },
              fontWeight: 'bold',
              fontSize: 'lg',
            }}
          />
          {user ? <ProfileAccount /> : <ConnectWallet />}
        </HStack>
      </Container>
    </Box>
  );
};

export default Header;
