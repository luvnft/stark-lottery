'use client';
import {
  convertBigIntsToNumbers,
  convertTimestampToFormattedDate,
} from '@/utils';
import { useContractRead } from '@starknet-react/core';
import React, { useEffect, useState } from 'react';
import ABILottery from '@/abi/lotteries645.json';
import { CONTRACT_ADDRESS } from '@/config/contractAddress';
import { LotteryProps } from '../Lotteries';
import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Spinner,
  Text,
} from '@chakra-ui/react';
const ResultPage = () => {
  const [currentLottery, setCurrentLottery] = useState<LotteryProps>();
  const [listResult, setListResult] = useState<any>();
  const { data: currentLotteryData, isLoading: isCurrentLotteryLoading } =
    useContractRead({
      functionName: 'getCurrentLottery',
      abi: ABILottery,
      address: CONTRACT_ADDRESS.lottery,
      watch: true,
    });

  const { data: resultData, isLoading: isLoadingResultData } = useContractRead({
    functionName: 'getLotteryByIds',
    abi: ABILottery,
    args: [
      [
        ...Array.from(
          { length: currentLottery ? currentLottery.id - 1 : 0 },
          function (v, k) {
            return k + 1;
          }
        ),
      ],
    ],
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
  useEffect(() => {
    if (!isLoadingResultData && resultData) {
      const temp: any = resultData;

      if (temp) {
        convertBigIntsToNumbers(temp);
        setListResult(() => temp);
      }
    }
  }, [isLoadingResultData]);

  return (
    <>
      <Container maxWidth="container.xl" minH="90vh">
        <Text textAlign="center" variant="title" my={5}>
          Result Page
        </Text>
        {isLoadingResultData ? (
          <Spinner size="lg" />
        ) : (
          <>
            {listResult && listResult.length ? (
              <Flex flexDirection="column" gap={10}>
                {listResult
                  .map((data: any) => (
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
                        <Text as="span" color="#7A8CFF">
                          {data.id === 5 && 'Closed Beta Test'}
                          {data.id < 5 && 'Internal Testing '}
                        </Text>
                      </HStack>

                      <Box>
                        <Text color="#7A8CFF" fontWeight="medium">
                          {convertTimestampToFormattedDate(
                            data.drawTime as any
                          )}
                        </Text>
                      </Box>
                      <HStack gap={8} flexWrap={{ md: 'nowrap', base: 'wrap' }}>
                        {data.drawnNumbers.length ? (
                          <>
                            {data.drawnNumbers.map((dataPicked: number) => (
                              <Button
                                key={`${dataPicked} - ${data.id}`}
                                variant="lotteryNumber"
                                isActive={true}
                              >
                                <Text>{dataPicked}</Text>
                              </Button>
                            ))}
                          </>
                        ) : (
                          <>
                            <Text>Result Not Available</Text>
                          </>
                        )}
                      </HStack>
                    </HStack>
                  ))
                  .reverse()}
              </Flex>
            ) : (
              <Text>Empty Data</Text>
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default ResultPage;
