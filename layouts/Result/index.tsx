'use client';
import {
  convertBigIntsToNumbers,
  convertTimestampToFormattedDate,
} from '@/utils';
import { useContractRead } from '@starknet-react/core';
import React, { useEffect, useState } from 'react';

import { CONTRACT_ADDRESS } from '@/config/contractAddress';
import { LotteryProps } from '../Lotteries';
import EmptyIcon from '@/public/assets/arts/empty.svg';
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  HStack,
  Icon,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { resultDataFrom1To8 } from '@/config/dataResultContract';
import { convertHex } from '@/utils/convertHex';
import { ABIS } from '@/abis';
const ResultPage = () => {
  const [currentLottery, setCurrentLottery] = useState<LotteryProps>();
  const [listResult, setListResult] = useState<any>(resultDataFrom1To8);

  const { data: resultData, isLoading: isLoadingResultData } = useContractRead({
    functionName: 'getLotteryByIds',
    abi: ABIS.LotteryABI,
    args: [
      [
        ...Array.from(
          {
            length: currentLottery ? currentLottery.id - 8 : 0,
          },
          function (_, k) {
            return k + 8;
          }
        ),
      ],
    ],
    address: CONTRACT_ADDRESS.lottery,
  });

  const { data: currentLotteryDataNew, isLoading: isCurrentLotteryLoadingNew } =
    useContractRead({
      functionName: 'getCurrentLottery',
      abi: ABIS.LotteryABI,
      address: CONTRACT_ADDRESS.lottery,
    });

  useEffect(() => {
    if (!isLoadingResultData && resultData) {
      const temp: any = resultData;

      if (temp) {
        convertBigIntsToNumbers(temp);
        setListResult((prev: any) => {
          if (prev) {
            return [...prev, ...temp];
          }
          return temp;
        });
      }
    }
  }, [isLoadingResultData]);
  useEffect(() => {
    if (!isCurrentLotteryLoadingNew && currentLotteryDataNew) {
      const temp: any = currentLotteryDataNew;

      if (temp) {
        convertBigIntsToNumbers(temp);
        setCurrentLottery(() => temp);
      }
    }
  }, [isCurrentLotteryLoadingNew]);
  return (
    <Box
      backgroundImage={`url('/assets/arts/other_art.svg')`}
      backgroundRepeat="no-repeat"
      backgroundPosition="center"
      backgroundSize="cover"
    >
      <Container maxWidth="container.xl" minH="90vh">
        {isLoadingResultData ? (
          <Spinner size="lg" />
        ) : (
          <>
            {listResult && listResult.length ? (
              <>
                <Text textAlign="center" variant="title" my={5}>
                  Result Page
                </Text>
                <Flex flexDirection="column" gap={10}>
                  {listResult
                    .map((data: any) => (
                      <>
                        {data.id != 1 && (
                          <HStack
                            key={data.id}
                            minH="100px"
                            gap={{ md: 8, base: 6 }}
                            padding={6}
                            bg={convertHex('#4C1F5880', 0.5)}
                            borderRadius="3xl"
                            justifyContent="space-between"
                            flexWrap={{ md: 'nowrap', base: 'wrap' }}
                          >
                            <HStack gap={2}>
                              <Text variant="title" fontSize="lg">
                                Lottery: #{data.id}
                              </Text>
                            </HStack>

                            <Box>
                              <Text color="#FAA632" fontWeight="medium">
                                {convertTimestampToFormattedDate(
                                  data.drawTime as any
                                )}
                              </Text>
                            </Box>
                            <HStack
                              gap={8}
                              flexWrap={{ md: 'nowrap', base: 'wrap' }}
                            >
                              {data.drawnNumbers.length ? (
                                <>
                                  {data.drawnNumbers.map(
                                    (dataPicked: number) => (
                                      <Button
                                        key={`${dataPicked} - ${data.id}`}
                                        variant="lotteryNumber"
                                        isActive={true}
                                      >
                                        <Text>{dataPicked}</Text>
                                      </Button>
                                    )
                                  )}
                                </>
                              ) : (
                                <>
                                  <Text>Result Not Available</Text>
                                </>
                              )}
                            </HStack>
                          </HStack>
                        )}
                      </>
                    ))
                    .reverse()}
                </Flex>
              </>
            ) : (
              <Center minH="90vh">
                <Flex
                  flexDirection="column"
                  padding={8}
                  px={10}
                  bg={convertHex('#4C1F5880', 0.5)}
                  alignItems="center"
                  borderRadius="3xl"
                >
                  <Icon as={EmptyIcon} height="240px" width="240px" />
                  <Text mt={6} fontSize="2xl" fontWeight="bold" mb={3}>
                    Empty Data Result
                  </Text>
                  <Text color="#FAA632">
                    It appears that no results were found!
                  </Text>
                </Flex>
              </Center>
            )}
          </>
        )}
      </Container>
    </Box>
  );
};

export default ResultPage;
