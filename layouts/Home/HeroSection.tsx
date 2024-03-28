import { Box, Center, Text, Image, Button, Flex } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import JackPotIcon from '@/public/assets/arts/jackpot.svg';
const HeroSection = () => {
  return (
    <>
      <Center py={14}>
        <Flex flexDirection="column" gap={6}>
          <Text>INTRODUCING LOTTERY</Text>
          <Text fontSize="64px" fontWeight="800">
            Fully automated blockchain lottery.
          </Text>
          <Text fontWeight="600">
            Lott3ry offers decentralised, open and fair lottery using
            next-generation on-chain randomness.
          </Text>
          <Link href="/lotteries">
            <Button variant="primary">Try Now</Button>
          </Link>
        </Flex>
        <Box position="relative">
          <Box position="relative" height="600px" w="600px">
            {/* <Image src="/assets/arts/jackpot.svg" height="full" width="full" /> */}
            <JackPotIcon />
            <Box
              position="absolute"
              top={0}
              zIndex={-10}
              height="full"
              width="full"
              background="radial-gradient(40.8% 32.43% at 50% 50%, rgba(17, 155, 245, 0.5) 0%, rgba(10, 90, 143, 0) 100%) "
            />
          </Box>

          <Image
            src="/assets/arts/token_fly.svg"
            position="absolute"
            top={24}
            zIndex={-1}
            transform="rotate(-25deg)"
            height="200px"
            width="200px"
          />
          <Image
            src="/assets/arts/token_fly.svg"
            position="absolute"
            height="253px"
            width="253px"
            transform="rotate(30deg)"
            bottom={5}
            right={'-5'}
          />
        </Box>
      </Center>
    </>
  );
};

export default HeroSection;
