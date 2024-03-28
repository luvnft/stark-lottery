import React from 'react';
import WinHandIcon from '@/public/assets/arts/ticket_win.svg';
import { Box, Center, Flex, HStack, Icon, Text } from '@chakra-ui/react';
import StrkIcon from '@/public/assets/icons/general/stark_token.svg';
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
    <Box padding={6} bg="#0A1450" borderRadius="2xl">
      <Text mb={8} fontSize="2xl" fontWeight="extrabold">
        What you can win
      </Text>
      <Flex
        justifyContent="space-between"
        flexWrap={{ md: 'nowrap', base: 'wrap' }}
      >
        <Box
          as={Center}
          width="full"
          justifyContent={{ md: 'flex-start', base: 'center' }}
        >
          <Icon
            as={WinHandIcon}
            height={{ md: '320px', base: '240px' }}
            width="auto"
          />
        </Box>
        <Flex
          flexDirection="column"
          gap={5}
          minW={{ md: '400px', base: '300px' }}
        >
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
              key={`ticket-guess-${index}`}
              justifyContent="space-between"
            >
              <Text>{item.guess}</Text>
              <HStack>
                <Text color="#7A8CFF">{item.price} </Text>
                <Icon as={StrkIcon} h={6} w={6} />
              </HStack>
            </HStack>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
};

export default LotteriesWork;
