import { Box, Button, Flex, HStack, Icon, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import StrkIcon from '@/public/assets/icons/general/stark_token.svg';
import PrimaryCard from '@/components/Card/PrimaryCard';

import Link from 'next/link';
import { convertBigIntsToNumbers } from '@/utils';
import { useReadContract } from '@starknet-react/core';
import { LotteryProps } from '../Lotteries';

import TimeReminder from '@/components/TimeReminder';
import { convertHex } from '@/utils/convertHex';
import Image from 'next/image';
import { ABIS } from '@/abis';
import { CONTRACT_ADDRESS } from '@/config/contractAddress';
const IntroSection = () => {
  const [currentLottery, setCurrentLottery] = useState<LotteryProps>();
  const { data: currentLotteryData, isLoading: isCurrentLotteryLoading } =
    useReadContract({
      functionName: 'getCurrentLottery',
      abi: ABIS.LotteryABI,
      args: [],
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
            width: { lg: '50%', md: '400px', base: '95%' },
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
          <Box
            position="relative"
            height="full"
            width="full"
            display="flex"
            justifyContent="center"
          >
            <Box
              backgroundImage={`radial-gradient(closest-side, ${convertHex(
                '#E3FF74',
                1
              )} ,${convertHex('#E37C39', 1)})`}
              height={400}
              width={400}
              borderRadius="100%"
              position="absolute"
              zIndex={-2}
              filter="blur(320px)"
            />
            <Image
              alt="ticket Jack"
              src="/assets/arts/ticket/ticket_win.svg"
              width={200}
              height={200}
              priority
            />
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
        <Box my={5}>
          {currentLottery?.state == 1 &&
            new Date(currentLottery.startTime * 1000) < new Date() && (
              <>
                {new Date(currentLottery.drawTime * 1000) > new Date() ? (
                  <Link href={`/lotteries/buy`}>
                    <Button variant="primary" width="full">
                      Get Your Ticket Now
                    </Button>
                  </Link>
                ) : (
                  <Text textAlign="center" color="#FAA632" fontWeight="bold">
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
        </Box>
      </Flex>
    </Box>
  );
};

export default IntroSection;
