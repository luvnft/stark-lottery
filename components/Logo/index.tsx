import React from 'react';
import LogoIcon from '@/public/assets/logo/logo.svg';
import StarkText from '@/public/assets/logo/stark.svg';
import PotText from '@/public/assets/logo/pot.svg';

import { Flex, HStack, Icon } from '@chakra-ui/react';
const LogoLong = () => {
  return (
    <HStack gap={1}>
      <Icon as={LogoIcon} height={10} w={10} />
      <Flex
        flexDirection="column"
        gap={1}
        display={{ md: 'flex', base: 'none' }}
      >
        <StarkText />
        <PotText />
      </Flex>
    </HStack>
  );
};

export default LogoLong;
