import { Container, HStack, Text } from '@chakra-ui/react';
import React from 'react';

const Footer = () => {
  return (
    <Container maxWidth="container.2xl" background="#081041">
      <HStack justifyContent="center" py={6} width="full" flexWrap="wrap">
        <Text color="#E4E8FF">© 2024 Stark Lottery. All rights reserved.</Text>
      </HStack>
    </Container>
  );
};

export default Footer;
