'use client';
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  HStack,
  Icon,
  Skeleton,
  Text,
} from '@chakra-ui/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import StarknetIcon from '@/public/assets/icons/general/stark_token.svg';
import LineIcon from '@/public/assets/icons/general/line.svg';
import { useReadContract } from '@starknet-react/core';

import { CONTRACT_ADDRESS } from '@/config/contractAddress';
import {
  convertBigIntsToNumbers,
  convertTimestampToFormattedDate,
} from '@/utils';
import { LOTTERY } from '@/config/value';
import { convertHex } from '@/utils/convertHex';
import { ABIS } from '@/abis';
export interface LotteryProps {
  amountOfTickets: number;
  drawTime: number;
  startTime: number;
  drawnNumbers: number[];
  id: number;
  jackpot: number;
  jackpotWinners: number;
  minimumPrice: number;
  state: 0 | 1 | 2; // o close , 1 open , 2 drawing
  totalValue: number;
}
const Lotteries = () => {
  const [currentLottery, setCurrentLottery] = useState<LotteryProps>();
  const { data: currentLotteryData, isLoading: isCurrentLotteryLoading } =
    useReadContract({
      functionName: 'getCurrentLottery',
      abi: ABIS.LotteryABI,
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
    <Box backgroundImage={`url('/assets/arts/buy/buy_bg_art.svg')`}>
      <Container maxWidth="container.xl">
        <Center
          margin="auto"
          gap={10}
          minH="90vh"
          flexWrap={{ md: 'nowrap', base: 'wrap' }}
        >
          <Box borderRadius="32px" overflow="hidden">
            <Image
              src="/assets/arts/buy/buy_art.png"
              height={450}
              width={800}
              priority
              alt=" Ticket Art Lotteries"
            />
          </Box>

          <Flex
            flexGrow={1}
            flexDirection="column"
            bg={convertHex('#4C1F5880', 0.7)}
            padding={8}
            borderRadius="2xl"
          >
            <Center position="relative">
              <Button
                variant="lotteryNumber"
                isActive={false}
                bg="gradient.100"
                zIndex={1}
                borderRadius="3xl"
                boxShadow=" 0px 4px 4px 0px #00000040"
                height="80px"
                width="80px"
              >
                <Text
                  fontSize="48px!important"
                  fontWeight="bold"
                  color="white!important"
                >
                  6
                </Text>
              </Button>
              <Button
                variant="lotteryNumber"
                isActive={true}
                borderRadius="3xl"
                height="80px"
                width="80px"
                _before={{
                  content: '""',
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '3xl',
                  padding: '2px',
                  background: 'gradient.100',
                  ' -webkit-mask':
                    ' linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  '  -webkit-mask-composite': 'xor',
                  ' mask-composite': 'exclude',
                }}
              >
                <Text fontSize="48px!important" fontWeight="bold">
                  45
                </Text>
              </Button>
            </Center>
            <Text fontSize="3xl" fontWeight="bold" mt={8}>
              {` Lottery "6 out of 45"`}
            </Text>

            <HStack justifyContent="space-between" mt={4} mb={8}>
              <Flex flexDirection="column" gap={1}>
                <Text fontSize="lg">Jackpot</Text>
                <HStack>
                  <Text fontSize="lg" fontWeight="bold">
                    {LOTTERY.jackpot}
                  </Text>
                  <Icon as={StarknetIcon} height={6} width={6} />
                </HStack>
              </Flex>
              <Box>
                <Icon as={LineIcon} height="50px" />
              </Box>
              <Flex flexDirection="column" alignItems="center" gap={1}>
                {isCurrentLotteryLoading ? (
                  <>
                    <Skeleton>Draw # 1234</Skeleton>
                    <Skeleton>............</Skeleton>
                  </>
                ) : (
                  <>
                    <Text>Draw # {currentLottery?.id}</Text>
                    <Text fontWeight={700}>
                      {currentLottery &&
                        convertTimestampToFormattedDate(
                          currentLottery.drawTime as any
                        )}
                    </Text>
                  </>
                )}
              </Flex>
            </HStack>

            <Flex flexDirection="column" gap={2}>
              {isCurrentLotteryLoading ? (
                <>
                  <Skeleton>Ticket Sold : ####</Skeleton>
                  <Skeleton>StartTime: ####</Skeleton>
                </>
              ) : (
                <>
                  {currentLottery && currentLottery?.amountOfTickets != 0 && (
                    <Text fontWeight="bold">
                      Ticket Sold: {currentLottery.amountOfTickets}
                    </Text>
                  )}
                  {(currentLottery?.startTime as any) &&
                    currentLottery?.state == 1 && (
                      <Text
                        textAlign="center"
                        color="#FAA632"
                        fontWeight="bold"
                        my={4}
                      >
                        {` StartTime:
                ${convertTimestampToFormattedDate(
                  currentLottery.startTime as any
                )}`}
                      </Text>
                    )}

                  {currentLottery?.state == 1 &&
                    new Date(currentLottery.startTime * 1000) < new Date() && (
                      <>
                        {new Date(currentLottery.drawTime * 1000) >
                        new Date() ? (
                          <Link href={`/lotteries/buy`}>
                            <Button variant="primary" width="full" bg="#FFD761">
                              Ticket price {LOTTERY.price_ticket} STRK
                            </Button>
                          </Link>
                        ) : (
                          <Text
                            textAlign="center"
                            color="#FAA632"
                            fontWeight="bold"
                          >
                            Sale End - Wait Draw
                          </Text>
                        )}
                      </>
                    )}

                  {currentLottery?.state == 0 && (
                    <Text textAlign="center" color="#FAA632" fontWeight="bold">
                      Lottery Closed
                    </Text>
                  )}
                  {currentLottery?.state == 2 && (
                    <Text textAlign="center" color="#FAA632" fontWeight="bold">
                      Lottery Drawing
                    </Text>
                  )}
                </>
              )}
            </Flex>
          </Flex>
        </Center>
      </Container>
    </Box>
  );
};

export default Lotteries;
