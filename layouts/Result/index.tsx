'use client';
import {
  convertBigIntsToNumbers,
  convertTimestampToFormattedDate,
} from '@/utils';
import { useContractRead } from '@starknet-react/core';
import React, { useEffect, useState } from 'react';
import ABILottery from '@/abi/lotteries645.json';
import ABILotteryNew from '@/abi/new_lotteries645.json';
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
const ResultPage = () => {
  const [currentLottery, setCurrentLottery] = useState<LotteryProps>();
  const [listResult, setListResult] = useState<any>();

  const { data: resultData, isLoading: isLoadingResultData } = useContractRead({
    functionName: 'getLotteryByIds',
    abi: ABILottery,
    args: [
      [
        ...Array.from({ length: 5 }, function (v, k) {
          return k + 1;
        }),
      ],
    ],
    address: CONTRACT_ADDRESS.lottery,
    watch: true,
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

  const { data: currentLotteryDataNew, isLoading: isCurrentLotteryLoadingNew } =
    useContractRead({
      functionName: 'getCurrentLottery',
      abi: ABILotteryNew,
      address: CONTRACT_ADDRESS.lottery_new,
      watch: true,
    });

  const { data: resultDataNew, isLoading: isLoadingResultDataNew } =
    useContractRead({
      functionName: 'getLotteryByIds',
      abi: ABILotteryNew,
      args: [
        [
          ...Array.from(
            {
              length: currentLottery ? currentLottery.id - 6 : 0,
            },
            function (_, k) {
              return k + 6;
            }
          ),
        ],
      ],
      address: CONTRACT_ADDRESS.lottery_new,
      watch: true,
    });

  useEffect(() => {
    if (!isCurrentLotteryLoadingNew && currentLotteryDataNew) {
      const temp: any = currentLotteryDataNew;

      if (temp) {
        convertBigIntsToNumbers(temp);
        setCurrentLottery(() => temp);
      }
    }
  }, [isCurrentLotteryLoadingNew]);
  useEffect(() => {
    if (!isLoadingResultDataNew && resultDataNew) {
      const temp: any = resultDataNew;

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
  }, [isLoadingResultDataNew]);
  console.log('Now Result', listResult);
  return (
    <>
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
                            bg="#0A1450"
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
                              <Text color="#7A8CFF" fontWeight="medium">
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
                  <HStack
                    minH="100px"
                    gap={{ md: 8, base: 6 }}
                    padding={6}
                    bg="#0A1450"
                    borderRadius="3xl"
                    justifyContent="space-between"
                    flexWrap={{ md: 'nowrap', base: 'wrap' }}
                  >
                    <HStack gap={2}>
                      <Text variant="title" fontSize="lg">
                        Lottery: #1
                      </Text>
                    </HStack>

                    <Box>
                      <Text color="#7A8CFF" fontWeight="medium">
                        {convertTimestampToFormattedDate(1712793600)}
                      </Text>
                    </Box>
                    <HStack gap={8} flexWrap={{ md: 'nowrap', base: 'wrap' }}>
                      {[23, 30, 22, 18, 28, 13].map((dataPicked: number) => (
                        <Button
                          key={`${dataPicked} `}
                          variant="lotteryNumber"
                          isActive={true}
                        >
                          <Text>{dataPicked}</Text>
                        </Button>
                      ))}
                    </HStack>
                  </HStack>
                </Flex>
              </>
            ) : (
              <Center minH="90vh">
                <Flex
                  flexDirection="column"
                  padding={8}
                  px={10}
                  bg="#0A1450"
                  alignItems="center"
                  borderRadius="3xl"
                >
                  <Icon as={EmptyIcon} height="240px" width="240px" />
                  <Text mt={6} fontSize="2xl" fontWeight="bold" mb={3}>
                    Empty Data Result
                  </Text>
                  <Text color="#7A8CFF">
                    It appears that no results were found!
                  </Text>
                </Flex>
              </Center>
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default ResultPage;
