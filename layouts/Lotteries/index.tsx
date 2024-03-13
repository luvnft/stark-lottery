'use client';
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  HStack,
  Icon,
  Text,
} from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import StarknetIcon from '@/public/assets/icons/general/stark_token.svg';
import LineIcon from '@/public/assets/icons/general/line.svg';

const Lotteries = () => {
  return (
    <Container maxWidth="container.xl">
      <Center
        margin="auto"
        gap={10}
        minH="90vh"
        flexWrap={{ md: 'nowrap', base: 'wrap' }}
      >
        <Image
          src="/assets/arts/lotteries_art.png"
          height={450}
          width={800}
          alt={''}
        />
        <Flex
          flexGrow={1}
          flexDirection="column"
          bg="#0A1450"
          padding={10}
          borderRadius="2xl"
        >
          <Text fontSize="3xl" fontWeight="bold">
            Lottery "6 out of 45 "
          </Text>

          <HStack justifyContent="space-between" mt={4} mb={8}>
            <Flex flexDirection="column">
              <Text fontSize="lg">Jackpot</Text>
              <HStack>
                <Text>500 </Text>
                <Icon as={StarknetIcon} height={6} width={6} />
              </HStack>
            </Flex>
            <Box>
              <Icon as={LineIcon} height="50px" />
            </Box>
            <Flex flexDirection="column" alignItems="center">
              <Text>Draw #01</Text>
              <Text fontWeight={700}>Mar 10, 2024 8:00 AM</Text>
            </Flex>
          </HStack>

          <Link href={`/lotteries/lot1`}>
            <Button variant="primary">Ticket price 0.4 STRK</Button>
          </Link>
        </Flex>
      </Center>
    </Container>
  );
};

export default Lotteries;
