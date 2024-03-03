import { Box, Container, HStack, Text } from '@chakra-ui/react';
import React from 'react';
import ListPageItem from './ListPageItem';
import BtnConnectWallet from '../ConnectWallet/BtnConnectWallet';

const Header = () => {
  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      borderBottom="0.064rem solid"
      borderBottomColor="primary.gray.300"
      bg="white"
    >
      <Container maxWidth="container.xl">
        <HStack justifyContent="space-between" py={6}>
          <Text> Logo Decolgen</Text>
          <ListPageItem />
          <BtnConnectWallet />
        </HStack>
      </Container>
    </Box>
  );
};

export default Header;
