import FAQItem from '@/components/Card/FAQItem';
import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
interface FAQProps {
  title: string;
  content: string[];
}
const FAQ = () => {
  //update content faq
  // fix my ticket
  // update UX
  const listFAQ: FAQProps[] = [
    {
      title: 'How do I play StarkPot 6/45 Lottery?',
      content: [
        'To play StarkPot 6/45, each player must purchase a ticket priced at 0.5 $STRK. Players select 6 numbers out of a pool of 45. If your selected numbers match the numbers drawn, you win a prize based on how many numbers you match',
      ],
    },
    {
      title: 'How do I play StarkPot 6/45 Lottery?',
      content: [
        'Players must be 18 years or older to participate.',
        'Each ticket costs 0.5 $STRK.',
        'Players select 6 numbers from a pool of 45 numbers.',
        'The draw for the winning numbers happens at 9:00 AM UTC on Tuesdays, Fridays, and Sundays.',
        'A new lottery round begins at 10:00 AM UTC on Tuesdays, Fridays, and Sundays.',
      ],
    },
    {
      title: 'What are the prize tiers for the StarkPot 6/45 Lottery?',
      content: [
        'Prizes are awarded based on the number of matching numbers:',
        '2 numbers match = 0.5 $STRK.',
        '3 numbers match = 1.5 $STRK.',
        '4 numbers match = 15 $STRK.',
        '5 numbers match = 500 $STRK.',
        '6 numbers match = 3000 $STRK.',
        'For pools that close with no winner, 15% of the user’s pools will be added to the prize pool for the next lottery.',
      ],
    },
    {
      title: 'When and how can I claim my prize?',
      content: [
        'Winners can claim their prizes within 7 days from the time the winning numbers are announced. To claim your prize, follow the instructions provided on the StarkPot lottery platform. Ensure you have access to your wallet and are ready to provide any required verification to process your claim.',
      ],
    },
    {
      title: 'What happens if no one wins?',
      content: [
        `If a drawing concludes with no winners, 15% of the stakes collected from that round are added to the prize pool for the next drawing. This increases the next round's prizes, offering players larger potential wins.`,
      ],
    },
    {
      title: 'Is there a deadline for purchasing tickets?',
      content: [
        `Yes, the deadline to purchase tickets for each drawing is just before the draw time at 9:00 AM UTC on Tuesdays, Fridays, and Sundays. The sales for the next round begin immediately after the previous draw at 10:00 AM UTC.`,
      ],
    },
    {
      title:
        'What payment methods are accepted for purchasing lottery tickets?',
      content: [
        'Tickets for the StarkPot 6/45 Lottery can be purchased using $STRK. ',
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
          <FAQItem id={index + 1} title={item.title} content={item.content} />
        ))}
      </Flex>
    </Box>
  );
};

export default FAQ;
