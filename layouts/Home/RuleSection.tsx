import {
  Box,
  HStack,
  Text,
  Image,
  Button,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';

const RuleSection = () => {
  const List = [
    'Players choose any combination of numbers from a specific set',
    'Prizes are won based on how many of your chosen numbers match the winning numbers',
    'If a player matches all numbers, he will win the guaranteed jackpot',
    'The draw only happens if at least one ticket is sold, otherwise the draw is rescheduled.',
  ];
  return (
    <Box py="100px">
      <Text mb={10} variant="title">
        Three classic lottery games with simple rules
      </Text>
      <HStack gap="40px">
        <Image src="/assets/arts/rule-art.svg" height="600px" width="600px" />
        <Box>
          <UnorderedList>
            {List.map((item, index) => (
              <ListItem key={`rule-${index}`}>{item}</ListItem>
            ))}
          </UnorderedList>
          <Link href="/lotteries">
            <Button mt={10} variant="primary">
              Buy Now
            </Button>
          </Link>
        </Box>
      </HStack>
    </Box>
  );
};

export default RuleSection;
