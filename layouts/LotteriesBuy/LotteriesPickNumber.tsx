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
} from '@chakra-ui/react';
import React, { useState } from 'react';
import ClearIcon from '@/public/assets/icons/general/clear.svg';
import RandomIcon from '@/public/assets/icons/general/random.svg';
import StarknetIcon from '@/public/assets/icons/general/stark_token.svg';
const LotteriesPickNumber = () => {
  const [listNumber, setListNumber] = useState<number[]>([]);
  const handleSelectNumber = (value: number) => {
    if (listNumber.includes(value)) {
      const newArr = listNumber.filter(x => x != value);
      console.log('New Arr', newArr);
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
            onClick={() => {
              const value = getRandomNumbers();
              console.log('das', value);
              setListNumber(value);
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
        {listNumber.length == 6 && (
          <Button
            variant="buy_ticket"
            rightIcon={<Icon as={StarknetIcon} h={5} w={5} />}
          >
            Buy Ticket | 0.5
          </Button>
        )}
      </Center>
    </Box>
  );
};

export default LotteriesPickNumber;
