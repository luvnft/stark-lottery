import { Box, Center, Text, Image, Button, Flex, Icon } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import JackPotIcon from '@/public/assets/arts/jackpot.svg';
const HeroSection = () => {
  return (
    <>
      <Center py={14} flexWrap={{ lg: 'nowrap', base: 'wrap-reverse' }}>
        <Flex flexDirection="column" gap={6}>
          <Text>INTRODUCING LOTTERY</Text>
          <Text
            fontSize={{ lg: '64px', md: '48px', base: '32px' }}
            fontWeight="800"
          >
            Fully automated blockchain lottery.
          </Text>
          <Text fontWeight="600">
            Lottery offers decentralised, open and fair lottery using
            next-generation on-chain randomness.
          </Text>
          <Link href="/lotteries">
            <Button variant="primary">Try Now</Button>
          </Link>
        </Flex>
        <Box position="relative">
          <Box
            position="relative"
            height={{ lg: '600px', base: 'full' }}
            w={{ lg: '600px', base: 'full' }}
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
            top={{ md: 24, base: 10 }}
            zIndex={-1}
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
            bottom={5}
            right={{ lg: 0, base: 10 }}
          />
        </Box>
      </Center>
    </>
  );
};

export default HeroSection;
