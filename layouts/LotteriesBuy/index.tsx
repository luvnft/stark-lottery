'use client';
import { Container, Flex, HStack, Icon, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import LotteriesWork from './LotteriesWork';
import LotteriesPickNumber from './LotteriesPickNumber';
import StarkNetToken from '@/public/assets/icons/general/stark_token.svg';
import ArrowIcon from '@/public/assets/icons/general/arrow.svg';
import Link from 'next/link';
import ABILottery from '@/abi/lotteries645.json';
import { CONTRACT_ADDRESS } from '@/config/contractAddress';

import PleaseConnectWallet from '../MyTicket/PleaseConnectWallet';
import { LotteryProps } from '../Lotteries';
import { useAccount, useContractRead } from '@starknet-react/core';
import {
  convertBigIntsToNumbers,
  convertTimestampToFormattedDate,
} from '@/utils';
const LotteriesBuyPage = () => {
  const [currentLottery, setCurrentLottery] = useState<LotteryProps>();
  const { address } = useAccount();
  const { data: currentLotteryData, isLoading: isCurrentLotteryLoading } =
    useContractRead({
      functionName: 'getCurrentLottery',
      abi: ABILottery,
      address: CONTRACT_ADDRESS.lottery,
      watch: true,
    });
  useEffect(() => {
    if (!isCurrentLotteryLoading && currentLotteryData) {
      const temp: any = currentLotteryData;

      if (temp) {
        convertBigIntsToNumbers(temp);
        setCurrentLottery(() => temp);
      }
    }
  }, [isCurrentLotteryLoading]);
  return (
    <Container maxWidth="container.xl">
      {address ? (
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
                Draw #{currentLottery?.id} ·{' '}
                <>
                  {currentLottery &&
                    convertTimestampToFormattedDate(
                      currentLottery.drawTime as any
                    )}
                </>
              </Text>
            </Flex>
          </HStack>
          {currentLottery &&
          currentLottery?.state == 1 &&
          new Date(currentLottery.drawTime * 1000) > new Date() ? (
            <LotteriesPickNumber />
          ) : (
            <Text>Waiting To Open Sale</Text>
          )}

          <LotteriesWork />
        </Flex>
      ) : (
        <PleaseConnectWallet />
      )}
    </Container>
  );
};

export default LotteriesBuyPage;
