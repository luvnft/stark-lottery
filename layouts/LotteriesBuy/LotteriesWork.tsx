import React from 'react';
import WinHandIcon from '@/public/assets/arts/give_ticket.svg';
import { Box, Flex, HStack, Icon, Text } from '@chakra-ui/react';
interface IWinGuessProps {
  guess: string;
  price: string;
}
const LotteriesWork = () => {
  const ListRewardWin: IWinGuessProps[] = [
    {
      guess: '2',
      price: '0.5',
    },
    {
      guess: '3',
      price: '1.5',
    },
    {
      guess: '4',
      price: '15',
    },
    {
      guess: '5',
      price: '500',
    },
    {
      guess: '6',
      price: 'Jackpot (3000)',
    },
  ];
  return (
    <Box padding={6} bg="primary.gray.200" borderRadius="2xl">
      <Text mb={8} fontSize="2xl" fontWeight="extrabold">
        What you can win
      </Text>
      <Flex justifyContent="space-between">
        <Box>
          <Icon as={WinHandIcon} height="320px" width="auto" />
        </Box>
        <Flex flexDirection="column" gap={5} minW="400px">
          <HStack
            justifyContent="space-between"
            width="full"
            fontWeight="bold"
            fontSize="2xl"
          >
            <Text>Guessed</Text>
            <Text>Price</Text>
          </HStack>
          {ListRewardWin.map((item, index) => (
            <HStack
              width="full"
              fontWeight="bold"
              color="primary.gray.500"
              key={`ticket-guess-${index}`}
              justifyContent="space-between"
            >
              <Text>{item.guess}</Text>
              <Text>{item.price}</Text>
            </HStack>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
};

export default LotteriesWork;
