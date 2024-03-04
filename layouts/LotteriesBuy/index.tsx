'use client';
import { Box, Flex, HStack, Icon, Text } from '@chakra-ui/react';
import React from 'react';
import NumberIcon from '@/public/assets/arts/number.svg';
import LotteriesWork from './LotteriesWork';
import LotteriesPickNumber from './LotteriesPickNumber';
const LotteriesBuyPage = () => {
  return (
    <>
      <Flex flexDirection="column" gap={5}>
        <HStack width="full" justifyContent="space-between">
          <HStack>
            <Icon as={NumberIcon} height={12} width="auto" />
            <Text fontSize="xl" fontWeight="bold">
              Lottery "6 out of 45"
            </Text>
          </HStack>
          <Flex flexDirection="column" alignItems="flex-end" minW="500px">
            <Text fontWeight="bold" fontSize="lg">
              Jackpot 3000 STRK
            </Text>
            <Text as="span" color="primary.gray.400">
              Draw #65 · Mar 5, 2024 12:00 AM
            </Text>
          </Flex>
        </HStack>
        <LotteriesPickNumber />
        <LotteriesWork />
      </Flex>
    </>
  );
};

export default LotteriesBuyPage;
