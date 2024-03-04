import { HStack, Text } from '@chakra-ui/react';
import React from 'react';
import ListSocial from '../Social/ListSocial';

const Footer = () => {
  return (
    <HStack justifyContent="space-between" py={6}>
      <Text color="primary.gray.500" fontSize="sm">
        © 2024 Lottery StarkArcade. All rights reserved.
      </Text>
      <ListSocial />
    </HStack>
  );
};

export default Footer;
