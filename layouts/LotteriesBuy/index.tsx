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
import { useContractRead } from '@starknet-react/core';
import {
  convertBigIntsToNumbers,
  convertTimestampToFormattedDate,
} from '@/utils';
import { useAuth } from '@/hooks/useAuth';

const LotteriesBuyPage = () => {
  const [currentLottery, setCurrentLottery] = useState<LotteryProps>();

  const { user } = useAuth();
  const { data: currentLotteryData, isLoading: isCurrentLotteryLoading } =
    useContractRead({
      functionName: 'getCurrentLottery',
      abi: ABILottery,
      address: CONTRACT_ADDRESS.lottery_new,
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
      {user ? (
        <Flex flexDirection="column" gap={5}>
          <HStack
            width="full"
            justifyContent={{ md: 'space-between', base: 'flex-start' }}
            flexWrap={{ md: 'nowrap', base: 'wrap' }}
          >
            <Link href="/lotteries">
              <HStack fontWeight="800">
                <Icon as={ArrowIcon} height={8} w={8} />

                <Text fontSize="xl">{`Lottery "6 out of 45"`}</Text>
              </HStack>
            </Link>
            <Flex
              flexDirection="column"
              alignItems="flex-end"
              alignSelf="end"
              width={{ md: 'auto', base: 'full' }}
            >
              <HStack>
                <Text fontWeight="bold" fontSize="xl">
                  {` Jackpot
                  ${
                    !isCurrentLotteryLoading
                      ? Math.trunc(Number(currentLottery?.jackpot) / 1e18)
                      : 'Loading...'
                  }`}
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
              {currentLottery?.amountOfTickets && (
                <Text fontWeight="bold">
                  Ticket Sold: {currentLottery.amountOfTickets}
                </Text>
              )}
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
