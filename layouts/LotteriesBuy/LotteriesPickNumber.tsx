import {
  Box,
  Button,
  Center,
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
import CartAdd from '@/public/assets/icons/general/add_cart.svg';
import StarknetIcon from '@/public/assets/icons/general/stark_token.svg';
import ABIGovernance from '@/abi/governance.json';

import { useAccount, useContractRead } from '@starknet-react/core';
import { CONTRACT_ADDRESS } from '@/config/contractAddress';
import { CallData, uint256 } from 'starknet';
import { LOTTERY } from '@/config/value';
import CartControl from '@/components/Cart';

import { sortArrayAscending } from '@/utils';
import { useCart } from '@/hooks/useCart';
import LotteriesRandomNumber from './LotteriesRandomNumber';
const LotteriesPickNumber = () => {
  const [listNumber, setListNumber] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { address, account } = useAccount();
  const { addTicketToCart } = useCart();

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
      args: [CONTRACT_ADDRESS.lottery_new],
      address: CONTRACT_ADDRESS.governance,
      watch: true,
    });

  const handleBuyTicket = async () => {
    try {
      if (isLoadingMinPrice || !account) {
        return;
      }
      setIsLoading(true);
      // const newSortData = listNumber.sort((a, b) => a - b);
      const newSortData = sortArrayAscending(listNumber);

      await account.execute([
        {
          contractAddress: CONTRACT_ADDRESS.eth,
          entrypoint: 'approve',
          calldata: CallData.compile({
            spender: CONTRACT_ADDRESS.governance,
            amount: uint256.bnToUint256(Number(minPriceTicketData)),
          }),
        },

        {
          contractAddress: CONTRACT_ADDRESS.lottery_new,
          entrypoint: 'buyTicket',

          calldata: CallData.compile({
            pickedNumbers: newSortData,
          }),
        },
      ]);

      toast({
        status: 'success',
        description: `You  Buy success Ticket !`,
      });

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
            variant="icon_btn"
            icon={<Icon as={RandomIcon} />}
            aria-label=""
          />
          <IconButton
            variant="icon_btn"
            icon={<Icon as={ClearIcon} />}
            aria-label=""
            onClick={() => {
              setListNumber([]);
            }}
          />
          <CartControl />
        </HStack>
      </HStack>
      <Text color="note">Pick Your 6 number</Text>
      <Progress
        value={listNumber.length}
        size="sm"
        variant="pick_progress"
        bg="#192678"
        max={6}
        borderRadius="2xl"
      />
      <LotteriesRandomNumber
        listNumber={listNumber}
        handleSelectNumber={handleSelectNumber}
      />

      <Center>
        {address ? (
          <>
            {listNumber.length == 6 && address && (
              <HStack gap={2} flexWrap="wrap">
                <Button
                  width={{ md: 'auto', base: 'full' }}
                  variant="buy_ticket"
                  isLoading={isLoadingMinPrice || isLoading}
                  onClick={async () => {
                    await handleBuyTicket();
                  }}
                  rightIcon={<Icon as={StarknetIcon} h={5} w={5} />}
                >
                  Buy Ticket | {LOTTERY.price_ticket}
                </Button>
                <Button
                  variant="primary"
                  minH={12}
                  width={{ md: 'auto', base: 'full' }}
                  borderRadius="8px"
                  leftIcon={<Icon as={CartAdd} h={5} w={5} color="white" />}
                  onClick={async () => {
                    const newSortData = sortArrayAscending(listNumber);
                    await addTicketToCart(newSortData);
                    setListNumber([]);
                  }}
                >
                  Add To Cart
                </Button>
              </HStack>
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
