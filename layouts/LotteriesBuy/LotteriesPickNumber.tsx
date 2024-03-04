import {
  Box,
  Button,
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
  return (
    <Box
      padding={6}
      background="primary.gray.200"
      borderRadius="2xl"
      display="flex"
      flexDirection="column"
      gap={5}
    >
      <HStack justifyContent="space-between">
        <Text fontWeight="bold" fontSize="lg">
          Ticket
        </Text>
        <HStack gap={4}>
          <IconButton
            icon={<Icon as={RandomIcon} h={8} w={8} />}
            aria-label=""
          />
          <IconButton
            icon={<Icon as={ClearIcon} h={8} w={8} />}
            aria-label=""
          />
        </HStack>
      </HStack>
      <Text>Pick 6 number</Text>
      <Progress
        value={listNumber.length}
        size="lg"
        colorScheme="pink"
        max={6}
        borderRadius="2xl"
      />
      <Flex gap={5} flexWrap="wrap">
        {Array.from({ length: 45 }).map((_, index) => {
          const active = listNumber.includes(index + 1);
          return (
            <Button
              variant="lotteryNumber"
              bg={active ? 'gradient.100' : undefined}
              color={active ? 'white' : undefined}
              _hover={{}}
              key={index + 1}
              onClick={() => {
                handleSelectNumber(index + 1);
              }}
            >
              {index + 1}
            </Button>
          );
        })}
      </Flex>
      {listNumber.length == 6 && (
        <Button variant="gradient_1">Buy Ticket | 0.5 STRK</Button>
      )}
    </Box>
  );
};

export default LotteriesPickNumber;
