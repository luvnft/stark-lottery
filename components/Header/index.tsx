import { Box, Container, HStack, Text } from '@chakra-ui/react';
import React from 'react';
import ListPageItem from './ListPageItem';
import BtnConnectWallet from '../ConnectWallet/BtnConnectWallet';
import Link from 'next/link';

const Header = () => {
  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      borderBottom="0.064rem solid"
      borderBottomColor="primary.gray.300"
      bg="white"
      zIndex="9"
    >
      <Container maxWidth="container.xl">
        <HStack justifyContent="space-between" py={6}>
          <Link href="/">
            <Text> Logo Decolgen</Text>
          </Link>

          <ListPageItem />
          <BtnConnectWallet />
        </HStack>
      </Container>
    </Box>
  );
};

export default Header;
