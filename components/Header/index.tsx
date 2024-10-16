import { Box, Container, HStack } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import ListPageItem from './ListPageItem';
import Link from 'next/link';
import ConnectWallet from '../ConnectWallet';
import { useAuth } from '@/hooks/useAuth';
import { useAccount, useConnect } from '@starknet-react/core';
import { useDispatch } from 'react-redux';
import ProfileAccount from '../ConnectWallet/ProfileAccount';
import { setChainId, setUser } from '@/redux/user/user-slice';

import LogoLong from '../Logo';
import PageDrawer from '../PageDrawer';
import ProfileDrawer from '../ConnectWallet/ProfileDrawer';

const Header = () => {
  const { user, isLoading, chainId } = useAuth();
  const { address, status } = useAccount();
  const { connect, connectors } = useConnect();

  const dispatch = useDispatch();
  useEffect(() => {
    if (address && address != user) {
      dispatch(setUser(address));
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
        <HStack justifyContent="space-between" py={{ md: 6, base: 4 }}>
          <Link href="/">
            <LogoLong />
          </Link>

          <ListPageItem
            sx={{
              display: { lg: 'flex', base: 'none' },
              fontWeight: 'bold',
              fontSize: 'lg',
              gap: 3,
            }}
          />

          <Box
            sx={{
              display: { md: 'block', base: 'none' },
            }}
          >
            {address ? <ProfileAccount /> : <ConnectWallet />}
          </Box>

          <HStack
            sx={{
              display: { lg: 'none', base: 'flex' },
            }}
            gap={6}
          >
            <ProfileDrawer />
            <PageDrawer />
          </HStack>
        </HStack>
      </Container>
    </Box>
  );
};

export default Header;
