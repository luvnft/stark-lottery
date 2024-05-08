import FAQItem from '@/components/Card/FAQItem';
import { LOTTERY } from '@/config/value';
import { Box, Flex, Text, TextProps } from '@chakra-ui/react';
import React from 'react';
export interface ContentProps {
  content: string;
  type: 'text' | 'link' | 'list';
  sx?: TextProps;
}
interface FAQProps {
  title: string;
  content: ContentProps[];
}
const FAQ = () => {
  const listFAQ: FAQProps[] = [
    {
      title: 'How do I play StarkPot 6/45 Lottery?',
      content: [
        {
          content:
            'To play StarkPot 6/45, each player must purchase a ticket priced at 1 $STRK. Players select 6 numbers out of a pool of 45. If your selected numbers match the numbers drawn, you win a prize based on how many numbers you match',
          type: 'text',
        },
      ],
    },
    {
      title: 'What are the rules for the StarkPot 6/45 Lottery?',
      content: [
        {
          content: 'Players must be 18 years or older to participate.',
          type: 'text',
        },
        {
          content: `Each ticket costs ${LOTTERY.price_ticket} $STRK.`,
          type: 'text',
          sx: { fontWeight: 'bold' },
        },
        {
          content:
            'Players select 6 numbers from a pool of 45 numbers.WIN BIG!.',
          type: 'text',
        },
      ],
    },
    {
      title: 'What are the prize tiers for the StarkPot 6/45 Lottery?',
      content: [
        {
          content:
            'Prizes are awarded based on the number of matching numbers:',
          type: 'text',
        },
        { content: '3 numbers match = Secure 3 $STRK', type: 'list' },
        { content: '4 numbers match = Grab 30 $STRK', type: 'list' },
        { content: '5 numbers match = Take home 1000 $STRK', type: 'list' },
        {
          content: '6 numbers match = Jackpot starts at 5000 STRK++++',
          type: 'list',
        },
        {
          content:
            'For pools that close with no winner, 15% of the user’s pools will be added to the prize pool for the next lottery.',
          type: 'text',
        },
      ],
    },
    {
      title: 'When and how can I claim my prize?',
      content: [
        {
          content:
            'Winners can claim their prizes within 7 days from the time the winning numbers are announced. To claim your prize, follow the instructions provided on the StarkPot lottery platform. Ensure you have access to your wallet and are ready to provide any required verification to process your claim.',
          type: 'text',
        },
      ],
    },
    {
      title: 'What happens if no one wins?',
      content: [
        {
          content: `If a drawing concludes with no winners, 15% of the stakes collected from that round are added to the prize pool for the next drawing. This increases the next round's prizes, offering players larger potential wins.`,
          type: 'text',
        },
      ],
    },
    {
      title: 'Is there a deadline for purchasing tickets?',
      content: [
        {
          content: `The first lottery draw will commence on Monday, around 00:00 UTC. We will announce the winning numbers on Thursday at 00:00 UTC, followed by another draw.`,
          type: 'text',
        },
        {
          content: `A new lottery round always begins at 00:00 UTC on Mondays and Thursdays.`,
          type: 'text',
        },
        {
          content: `The draw for the winning numbers takes place at 00:00 AM UTC on Thursdays and Saturdays.`,
          type: 'text',
          sx: { fontWeight: 'bold' },
        },
        {
          content: `We take a day off on Sunday for some interesting events 👀 So make sure to join in our community 👇`,
          type: 'text',
        },
        { content: `https://discord.gg/4HGfyxbkEd`, type: 'link' },
      ],
    },
    {
      title:
        'What payment methods are accepted for purchasing lottery tickets?',
      content: [
        {
          content:
            'Tickets for the StarkPot 6/45 Lottery can be purchased using $STRK.',
          type: 'text',
        },
      ],
    },
  ];
  return (
    <Box>
      <Text mb={10} variant="title">
        FAQ
      </Text>
      <Flex flexDir="column" gap={6}>
        {listFAQ.map((item, index) => (
          <>
            <FAQItem
              key={`${index}-${item.title}-${item.content}`}
              id={index + 1}
              title={item.title}
              content={item.content}
            />
          </>
        ))}
      </Flex>
      <Text
        textAlign="center"
        fontSize="lg"
        my={4}
        fontWeight="bold"
        color="#7A8CFF"
      >
        Remember to play responsibly and good luck!
      </Text>
    </Box>
  );
};

export default FAQ;
