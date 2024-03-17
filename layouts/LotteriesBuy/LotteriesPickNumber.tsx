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
import React, { useMemo, useState } from 'react';
import ClearIcon from '@/public/assets/icons/general/clear.svg';
import RandomIcon from '@/public/assets/icons/general/random.svg';
import StarknetIcon from '@/public/assets/icons/general/stark_token.svg';
import ABIGovernance from '@/abi/governance.json';
import ABIEth from '@/abi/ETH.json';
import ABILotteries from '@/abi/lotteries645.json';
import {
  useAccount,
  useContract,
  useContractRead,
  useContractWrite,
} from '@starknet-react/core';
import { CONTRACT_ADDRESS } from '@/config/contractAddress';
const LotteriesPickNumber = () => {
  const [listNumber, setListNumber] = useState<number[]>([]);

  const { address } = useAccount();
  const toast = useToast();
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

  // contract Eth
  const { contract: contractEth } = useContract({
    abi: ABIEth,
    address: CONTRACT_ADDRESS.eth,
  });
  const { contract: contractLotteries } = useContract({
    abi: ABILotteries,
    address: CONTRACT_ADDRESS.lottery,
  });

  const callsApprove = useMemo(() => {
    if (!address || !contractEth || !minPriceTicketData) return [];
    return contractEth?.populateTransaction['approve']!(
      CONTRACT_ADDRESS.governance,
      minPriceTicketData
    );
  }, [address, contractEth?.populateTransaction]);

  const callBuyTicket = useMemo(() => {
    if (!address || !contractLotteries || listNumber.length < 6) return [];

    const newSortData = listNumber.sort((a, b) => a - b);

    return contractLotteries?.populateTransaction['buyTicket']!(newSortData);
  }, [
    address,
    contractLotteries?.populateTransaction,
    listNumber,
    contractEth?.populateTransaction,
  ]);
  const {
    writeAsync: writeApprove,
    data: dataApprove,
    isPending: isPendingApprove,
  } = useContractWrite({
    calls: callsApprove,
  });
  const {
    writeAsync: writeBuyTicket,
    data: dataBuyTicket,
    isPending: isPendingBuyTicket,
  } = useContractWrite({ calls: callBuyTicket });

  const handleBuyTicket = async () => {
    try {
      if (isLoadingAllowce || isLoadingMinPrice) {
        return;
      }
      console.log('dsa');
      if (Number(allowceData) < Number(minPriceTicketData)) {
        await writeApprove();
      } else {
        await writeBuyTicket();
      }
    } catch (error) {}

    setListNumber([]);
  };
  return (
    <Box
      padding={6}
      background="#0A1450"
      borderRadius="2xl"
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
            icon={<Icon as={RandomIcon} h={8} w={8} />}
            aria-label=""
          />
          <IconButton
            icon={<Icon as={ClearIcon} h={8} w={8} />}
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
      <Flex gap={{ md: 8, base: 6 }} flexWrap="wrap" my={6}>
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
                isLoading={
                  isPendingBuyTicket ||
                  isLoadingAllowce ||
                  isLoadingMinPrice ||
                  isPendingApprove
                }
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
