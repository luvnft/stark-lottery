import { Box, Center, Text, Image, Button, Flex, Icon } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import JackPotIcon from '@/public/assets/arts/home/whale.svg';
const HeroSection = () => {
  return (
    <>
      <Center py={14} flexWrap={{ lg: 'nowrap', base: 'wrap' }} gap={8}>
        <Box position="relative">
          <Box
            position="relative"
            height={{ lg: '360px', base: 'full' }}
            w={{ lg: '360px', base: 'full' }}
          >
            <Icon
              as={JackPotIcon}
              aria-label="jackpot"
              height="full"
              w="full"
            />
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
            alt="token left"
            src="/assets/arts/token_fly.svg"
            position="absolute"
            bottom={{ md: -10, base: 10 }}
            zIndex={1}
            transform="rotate(-25deg)"
            height={{ lg: '200px', md: '150px', base: '80px' }}
            width={{ lg: '200px', md: '150px', base: '80px' }}
          />
          <Image
            alt="token"
            src="/assets/arts/token_fly.svg"
            position="absolute"
            height={{ lg: '200px', md: '150px', base: '80px' }}
            width={{ lg: '200px', md: '150px', base: '80px' }}
            transform="rotate(30deg)"
            top={{ md: -10, base: 5 }}
            zIndex={-1}
            right={{ lg: 0, base: 10 }}
          />
        </Box>
        <Flex
          flexDirection="column"
          gap={6}
          maxW={{ md: '600px', base: 'full' }}
        >
          <Text>INTRODUCING STARKPOT V2</Text>
          <Text
            fontSize={{ lg: '64px', md: '48px', base: '32px' }}
            fontWeight="800"
          >
            Fully On-chain Prediction Game.
          </Text>
          <Text fontWeight="600">
            StarkPot offers decentralised, open and fair prediction game using
            next-generation on-chain randomness.
          </Text>
          <Link href="/lotteries">
            <Button variant="primary" bg="#FFD761">
              Predict to win!
            </Button>
          </Link>
        </Flex>
      </Center>
    </>
  );
};

export default HeroSection;
