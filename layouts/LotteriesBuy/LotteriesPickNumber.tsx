import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Icon,
  IconButton,
  Progress,
  Text,
  useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import ClearIcon from '@/public/assets/icons/general/clear.svg';
import RandomIcon from '@/public/assets/icons/general/random.svg';
import StarknetIcon from '@/public/assets/icons/general/stark_token.svg';
import ABIGovernance from '@/abi/governance.json';
import ABIEth from '@/abi/ETH.json';

import { useAccount, useContractRead } from '@starknet-react/core';
import { CONTRACT_ADDRESS } from '@/config/contractAddress';
import { CallData, uint256 } from 'starknet';
const LotteriesPickNumber = () => {
  const [listNumber, setListNumber] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { address, account } = useAccount();
  const toast = useToast({
    position: 'top-right',
    duration: 6000,
  });
  const handleSelectNumber = (value: number) => {
    if (listNumber.includes(value)) {
      const newArr = listNumber.filter(x => x != value);

      setListNumber(newArr);
    } else {
      if (listNumber.length != 6) {
        setListNumber(prev => [...prev, value]);
      }
    }
  };

  function getRandomNumbers() {
    const minNumber = 1;
    const maxNumber = 45;
    const numberOfNumbers = 6;

    const randomNumbers: number[] = [];

    while (randomNumbers.length < numberOfNumbers) {
      const randomNumber =
        Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;

      // Ensure the generated number is not already in the array
      if (!randomNumbers.includes(randomNumber)) {
        randomNumbers.push(randomNumber);
      }
    }

    return randomNumbers;
  }
  /**
   *  Get Minimum Price from governance => lottery address
   *  Check allowance of ETH contract => spender = lottery address , owner = current user adress
   * If allow result < minimum price => Call the approve of ETH contract => spender = governance address
   *  Call Buy Ticket from contract lottery
   * */
  const { data: minPriceTicketData, isLoading: isLoadingMinPrice } =
    useContractRead({
      functionName: 'getMinimumPrice',
      abi: ABIGovernance,
      args: [CONTRACT_ADDRESS.lottery],
      address: CONTRACT_ADDRESS.governance,
      watch: true,
    });

  const { data: allowceData, isLoading: isLoadingAllowce } = useContractRead({
    functionName: 'allowance',
    abi: ABIEth,
    args: [address as string, CONTRACT_ADDRESS.governance],
    address: CONTRACT_ADDRESS.eth,
    watch: true,
  });

  const handleBuyTicket = async () => {
    try {
      if (isLoadingAllowce || isLoadingMinPrice || !account) {
        return;
      }
      setIsLoading(true);
      if (Number(allowceData) < Number(minPriceTicketData)) {
        const newSortData = listNumber.sort((a, b) => a - b);

        const mutation = await account.execute([
          {
            contractAddress: CONTRACT_ADDRESS.eth,
            entrypoint: 'approve',
            calldata: CallData.compile({
              spender: CONTRACT_ADDRESS.governance,
              amount: uint256.bnToUint256(Number(minPriceTicketData)),
            }),
          },

          {
            contractAddress: CONTRACT_ADDRESS.lottery,
            entrypoint: 'buyTicket',

            calldata: CallData.compile({
              pickedNumbers: newSortData,
            }),
          },
        ]);
        console.log('Now', mutation);
        toast({
          status: 'success',
          description: `You  Buy success Ticket !`,
        });
      } else {
        const newSortData = listNumber.sort((a, b) => a - b);
        await account.execute([
          {
            contractAddress: CONTRACT_ADDRESS.lottery,
            entrypoint: 'buyTicket',
            calldata: CallData.compile({
              pickedNumbers: [...newSortData],
            }),
          },
        ]);
      }

      setListNumber([]);
    } catch (error: any) {
      if (error.message === 'User abort') {
        toast({
          status: 'error',
          description: `You Rejected Buy Ticket`,
        });
      }
    }
    setIsLoading(false);
  };
  return (
    <Box
      padding={{ md: 8, base: 6 }}
      background="#0A1450"
      borderRadius="32px"
      display="flex"
      flexDirection="column"
      gap={5}
    >
      <HStack justifyContent="space-between">
        <Text variant="title">Ticket</Text>
        <HStack gap={4}>
          <IconButton
            onClick={async () => {
              const value = getRandomNumbers();
              await setListNumber(() => value);
            }}
            bg="#1B266B"
            _hover={{
              opacity: 0.7,
            }}
            icon={<Icon as={RandomIcon} h={8} w={8} color="white" />}
            aria-label=""
          />
          <IconButton
            bg="#1B266B"
            _hover={{ opacity: 0.7 }}
            icon={<Icon as={ClearIcon} h={8} w={8} color="white" />}
            aria-label=""
            onClick={() => {
              setListNumber([]);
            }}
          />
        </HStack>
      </HStack>
      <Text color="#7A8CFF">Pick 6 number</Text>
      <Progress
        value={listNumber.length}
        size="sm"
        variant="pick_progress"
        bg="#192678"
        max={6}
        borderRadius="2xl"
      />
      <Flex gap={{ md: 8, base: 8 }} flexWrap="wrap" my={6}>
        {Array.from({ length: 45 }).map((_, index) => {
          const active = listNumber.includes(index + 1);
          return (
            <Button
              variant="lotteryNumber"
              isActive={active}
              key={index + 1}
              onClick={() => {
                handleSelectNumber(index + 1);
              }}
            >
              <Text>{index + 1}</Text>
            </Button>
          );
        })}
      </Flex>
      <Center>
        {address ? (
          <>
            {listNumber.length == 6 && address && (
              <Button
                variant="buy_ticket"
                isLoading={isLoadingAllowce || isLoadingMinPrice || isLoading}
                onClick={async () => {
                  await handleBuyTicket();
                }}
                rightIcon={<Icon as={StarknetIcon} h={5} w={5} />}
              >
                Buy Ticket | 0.5
              </Button>
            )}
          </>
        ) : (
          <Box fontWeight="bold">Plese Connect To Buy Ticket</Box>
        )}
      </Center>
    </Box>
  );
};

export default LotteriesPickNumber;
