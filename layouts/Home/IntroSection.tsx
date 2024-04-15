import { Box, Button, Flex, HStack, Icon, Image, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import StrkIcon from '@/public/assets/icons/general/stark_token.svg';
import PrimaryCard from '@/components/Card/PrimaryCard';
import GradientText from '@/components/Text/GradientText';
import Link from 'next/link';
import {
  convertBigIntsToNumbers,
  convertTimestampToFormattedDate,
} from '@/utils';
import { useContractRead } from '@starknet-react/core';
import { LotteryProps } from '../Lotteries';
import { CONTRACT_ADDRESS } from '@/config/contractAddress';
import ABILottery from '@/abi/lotteries645.json';

const IntroSection = () => {
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
    <Box position="relative">
      <Image
        bottom={-5}
        right={10}
        position="absolute"
        zIndex={{ md: 1, base: 0 }}
        alt="Planet 1"
        src="/assets/arts/planet_1.png"
      />
      <Image
        bottom={-16}
        left={48}
        alt="Planet 2"
        position="absolute"
        src="/assets/arts/planet_2.png"
      />
      <Image
        alt="Planet 3"
        top={0}
        left={24}
        zIndex={{ md: 1, base: -1 }}
        position="absolute"
        src="/assets/arts/planet_3.png"
      />
      <Flex
        flexDirection="column"
        width="full"
        justifyContent="center"
        alignItems="center"
      >
        <Text fontSize="3xl" mb={6} fontWeight="800">
          The StarkPot
        </Text>
        <PrimaryCard
          style={{
            pt: 8,
            px: 24,
            _hover: {},
          }}
          styleBorder={{
            padding: 2,
          }}
        >
          <HStack justifyContent="center">
            <GradientText
              content={`
                  ${
                    !isCurrentLotteryLoading
                      ? Math.trunc(Number(currentLottery?.jackpot) / 1e18)
                      : 'Loading...'
                  }`}
              sx={{
                fontSize: '3rem',
                fontWeight: 'bold',
                bg: 'linear-gradient(180deg, #0575FA 0%, #11E6F9 100%)',
              }}
            />
            <Icon as={StrkIcon} h={10} w={10} />
          </HStack>
          <Text fontSize="2xl" fontWeight="bold">
            In Prizes!
          </Text>
          <Box position="relative" height="full" width="full">
            <Box
              position="absolute"
              top={0}
              left={0}
              height={{ md: '320px', base: 'full' }}
              width={{ md: '320px', base: 'full' }}
              background="radial-gradient(40.8% 32.43% at 50% 50%, rgba(17, 155, 245, 0.5) 20%, rgba(10, 90, 143, 0) 100%) "
            />
            <Image alt="ticket Jack" src="/assets/arts/ticket/ticket_win.svg" />
          </Box>
        </PrimaryCard>

        {(currentLottery?.startTime as any) && currentLottery?.state == 1 && (
          <Text textAlign="center" color="#7A8CFF" fontWeight="bold" my={4}>
            {` StartTime:
                ${convertTimestampToFormattedDate(
                  currentLottery.startTime as any
                )}`}
          </Text>
        )}
        {currentLottery?.state == 1 && (
          <>
            {new Date(currentLottery.drawTime * 1000) > new Date() ? (
              <Link href={`/lotteries/buy`}>
                <Button variant="primary" width="full">
                  Get Your Ticket Now
                </Button>
              </Link>
            ) : (
              <Text textAlign="center" color="#7A8CFF" fontWeight="bold">
                Sale End - Wait Draw
              </Text>
            )}
          </>
        )}

        {currentLottery?.state == 0 && (
          <Text textAlign="center" color="#7A8CFF" fontWeight="bold">
            Lottery Closed
          </Text>
        )}
        {currentLottery?.state == 2 && (
          <Text textAlign="center" color="#7A8CFF" fontWeight="bold">
            Lottery Drawing
          </Text>
        )}
      </Flex>
    </Box>
  );
};

export default IntroSection;
