import { Button, Flex, Text } from '@chakra-ui/react';
import React from 'react';

interface LotteriesRandomNumberProps {
  listNumber: number[];
  handleSelectNumber: (value: number) => void;
}
const LotteriesRandomNumber = ({
  listNumber,
  handleSelectNumber,
}: LotteriesRandomNumberProps) => {
  return (
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
  );
};

export default LotteriesRandomNumber;
