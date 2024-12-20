import React from 'react';
import WinHandIcon from '@/public/assets/arts/ticket/ticket_win.svg';
import { Box, Center, Flex, HStack, Icon, Text } from '@chakra-ui/react';
import StrkIcon from '@/public/assets/icons/general/stark_token.svg';
import { WIN_PRICE } from '@/config/value';
interface IWinGuessProps {
  guess: string;
  price: string;
}
const LotteriesWork = () => {
  const ListRewardWin: IWinGuessProps[] = [
    {
      guess: '3',
      price: WIN_PRICE.match_3,
    },
    {
      guess: '4',
      price: WIN_PRICE.match_4,
    },
    {
      guess: '5',
      price: WIN_PRICE.match_5,
    },
    {
      guess: '6',
      price: `JP ${WIN_PRICE.match_6}`,
    },
  ];
  return (
    <Box padding={6} bg="card" borderRadius="2xl">
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
          minW={{ md: '400px', base: 'full' }}
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
              <Text color="#FFD761">{item.guess}</Text>
              <HStack>
                <Text color="#FAA632">{item.price} </Text>
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
