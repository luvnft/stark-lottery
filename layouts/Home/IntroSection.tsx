import { Box, Button, Flex, HStack, Icon, Image, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import StrkIcon from '@/public/assets/icons/general/stark_token.svg';
import PrimaryCard from '@/components/Card/PrimaryCard';

import Link from 'next/link';
import { convertBigIntsToNumbers } from '@/utils';
import { useContractRead } from '@starknet-react/core';
import { LotteryProps } from '../Lotteries';
import { CONTRACT_ADDRESS } from '@/config/contractAddress';
import ABILottery from '@/abi/lotteries645.json';
import TimeReminder from '@/components/TimeReminder';
import { convertHex } from '@/utils/convertHex';

const IntroSection = () => {
  const [currentLottery, setCurrentLottery] = useState<LotteryProps>();
  const { data: currentLotteryData, isLoading: isCurrentLotteryLoading } =
    useContractRead({
      functionName: 'getCurrentLottery',
      abi: ABILottery,
      address: CONTRACT_ADDRESS.lottery,
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
      {/* <Image
        bottom={{ lg: -5, base: 20 }}
        right={{ lg: 10, base: 0 }}
        position="absolute"
        zIndex={1}
        height={{ lg: 'auto', md: '200px', base: '80px' }}
        alt="Planet 1"
        src="/assets/arts/planet_1.png"
      /> */}

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
            px: { lg: 24, md: 12, base: 4 },
            _hover: {},
          }}
        >
          <HStack justifyContent="center">
            <Text
              fontSize={{ md: '3rem', base: '2rem' }}
              fontWeight="bold"
              variant="gradient_text"
            >
              {!isCurrentLotteryLoading
                ? Math.trunc(Number(currentLottery?.jackpot) / 1e18)
                : 'Loading...'}
            </Text>
            <Icon
              as={StrkIcon}
              h={{ md: 10, base: 6 }}
              w={{ md: 10, base: 6 }}
            />
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
          {(currentLottery?.drawTime as any) && currentLottery?.state == 1 && (
            <>
              {new Date(currentLottery.startTime * 1000) > new Date() ? (
                <>
                  <Box zIndex={2} width="full">
                    <Text
                      variant="gradient_text"
                      fontSize="xl"
                      fontWeight="bold"
                    >
                      Open Sale
                    </Text>
                    <TimeReminder
                      targetDate={currentLottery.startTime * 1000}
                    />
                  </Box>
                </>
              ) : (
                <>
                  <Text variant="gradient_text" fontSize="xl" fontWeight="bold">
                    Sale End
                  </Text>
                  <Box zIndex={2} width="full">
                    <TimeReminder targetDate={currentLottery.drawTime * 1000} />
                  </Box>
                </>
              )}
            </>
          )}
        </PrimaryCard>

        {currentLottery?.state == 1 &&
          new Date(currentLottery.startTime * 1000) < new Date() && (
            <>
              {new Date(currentLottery.drawTime * 1000) > new Date() ? (
                <Link href={`/lotteries/buy`}>
                  <Button variant="primary" width="full" my={5}>
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
