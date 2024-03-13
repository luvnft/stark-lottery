import { Container, HStack, Text } from '@chakra-ui/react';
import React from 'react';
import ListSocial from '../Social/ListSocial';

const Footer = () => {
  return (
    <Container maxWidth="container.2xl" background="primary.game.300">
      <HStack justifyContent="center" py={6} width="full" flexWrap="wrap">
        <Text color="#E4E8FF">© 2024 Stark Lottery. All rights reserved.</Text>
      </HStack>
    </Container>
  );
};

export default Footer;
