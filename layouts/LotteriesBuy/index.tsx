'use client';
import { Container, Flex, HStack, Icon, Text } from '@chakra-ui/react';
import React from 'react';

import LotteriesWork from './LotteriesWork';
import LotteriesPickNumber from './LotteriesPickNumber';
import StarkNetToken from '@/public/assets/icons/general/stark_token.svg';
import ArrowIcon from '@/public/assets/icons/general/arrow.svg';
import Link from 'next/link';
import { useAccount } from '@starknet-react/core';
import { useAuth } from '@/hooks/useAuth';
import PleaseConnectWallet from '../MyTicket/PleaseConnectWallet';
const LotteriesBuyPage = () => {
  const { user, isLoading, chainId } = useAuth();
  return (
    <Container maxWidth="container.xl">
      {user ? (
        <Flex flexDirection="column" gap={5}>
          <HStack
            width="full"
            justifyContent={{ md: 'space-between', base: 'flex-end' }}
            flexWrap={{ md: 'nowrap', base: 'wrap' }}
          >
            <HStack fontWeight="800">
              <Link
                href="/lotteries"
                style={{
                  height: '2rem',
                  width: '2rem',
                }}
              >
                <Icon as={ArrowIcon} height={8} w={8} />
              </Link>
              <Text fontSize="xl">Lottery "6 out of 45"</Text>
            </HStack>
            <Flex flexDirection="column" alignItems="flex-end" minW="500px">
              <HStack>
                <Text fontWeight="bold" fontSize="xl">
                  Jackpot 3000
                </Text>
                <Icon as={StarkNetToken} h={6} w={6} />
              </HStack>

              <Text as="span" color="#7A8CFF">
                Draw #65 · Mar 5, 2024 12:00 AM
              </Text>
            </Flex>
          </HStack>
          <LotteriesPickNumber />
          <LotteriesWork />
        </Flex>
      ) : (
        <PleaseConnectWallet />
      )}
    </Container>
  );
};

export default LotteriesBuyPage;
