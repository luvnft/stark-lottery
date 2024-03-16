'use client';
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  HStack,
  Icon,
  Text,
} from '@chakra-ui/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import StarknetIcon from '@/public/assets/icons/general/stark_token.svg';
import LineIcon from '@/public/assets/icons/general/line.svg';
import { useAccount, useContractRead } from '@starknet-react/core';
import ABILottery from '@/abi/lotteries645.json';
import { CONTRACT_ADDRESS } from '@/config/contractAddress';
import {
  convertBigIntsToNumbers,
  convertTimestampToFormattedDate,
} from '@/utils';
interface LotteryProps {
  amountOfTickets: number;
  drawTime: number;
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
      <Center
        margin="auto"
        gap={10}
        minH="90vh"
        flexWrap={{ md: 'nowrap', base: 'wrap' }}
      >
        <Image
          src="/assets/arts/lotteries_art.png"
          height={450}
          width={800}
          alt={''}
        />
        <Flex
          flexGrow={1}
          flexDirection="column"
          bg="#0A1450"
          padding={10}
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
            Lottery "6 out of 45 "
          </Text>

          <HStack justifyContent="space-between" mt={4} mb={8}>
            <Flex flexDirection="column">
              <Text fontSize="lg">Jackpot</Text>
              <HStack>
                <Text fontSize="lg" fontWeight="bold">
                  500
                </Text>
                <Icon as={StarknetIcon} height={6} width={6} />
              </HStack>
            </Flex>
            <Box>
              <Icon as={LineIcon} height="50px" />
            </Box>
            <Flex flexDirection="column" alignItems="center">
              <Text>Draw #{currentLottery?.id}</Text>
              <Text fontWeight={700}>
                <>
                  {currentLottery &&
                    convertTimestampToFormattedDate(
                      currentLottery.drawTime as any
                    )}
                </>
              </Text>
            </Flex>
          </HStack>
          {currentLottery?.state == 1 && (
            <Link href={`/lotteries/buy`}>
              <Button variant="primary" width="full">
                Ticket price 0.4 STRK
              </Button>
            </Link>
          )}
          {currentLottery?.state == 0 && (
            <Text textAlign="center">Lottery Closed</Text>
          )}
          {currentLottery?.state == 2 && (
            <Text textAlign="center">Lottery Drawing</Text>
          )}
        </Flex>
      </Center>
    </Container>
  );
};

export default Lotteries;
