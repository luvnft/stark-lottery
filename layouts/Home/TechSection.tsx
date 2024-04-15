import PrimaryCard from '@/components/Card/PrimaryCard';
import { Box, Text, Image, HStack, Flex, Center } from '@chakra-ui/react';
import React from 'react';
interface TechProps {
  image: string;
  title: string;
  content: string;
}
const TechSection = () => {
  const ListTech: TechProps[] = [
    {
      image: '/assets/arts/contract.svg',
      title: 'Smart contracts',
      content:
        'Our smart contracts are verified and open source. They eliminate the risk of manipulation by third parties. Trust and transparency are core to Lott3ry',
    },
    {
      image: '/assets/arts/game.svg',
      title: 'VRF',
      content:
        'A provably fair and verifiable random number generator (RNG) that enables smart contracts to access random values without compromising or usability',
    },
  ];
  return (
    <>
      <Box position="relative" py={12}>
        <Text variant="title" mb={8}>
          Technologies we use
        </Text>
        <HStack
          flexWrap={{ md: 'nowrap', base: 'wrap' }}
          justifyContent="center"
          gap={6}
        >
          {ListTech.map(item => (
            <PrimaryCard
              key={item.title}
              style={{
                width: '380px',
                height: '400px',
              }}
            >
              <Center>
                <Image src={item.image} />
              </Center>

              <Flex flexDirection="column" gap={4} mt={8}>
                <Text fontSize="1.5rem" fontWeight={800}>
                  {item.title}
                </Text>
                <Text textAlign="left">{item.content}</Text>
              </Flex>
            </PrimaryCard>
          ))}
        </HStack>
        {/* <Box
          position="absolute"
          bottom={0}
          right="-80%"
          height="full"
          width="full"
          background=" radial-gradient(40.8% 32.43% at 50% 50%, rgba(17, 155, 245, 0.5) 0%, rgba(10, 90, 143, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected "
        /> */}
      </Box>
    </>
  );
};

export default TechSection;
