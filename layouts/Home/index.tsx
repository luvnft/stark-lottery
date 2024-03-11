'use client';
import { Box, Button, Center, Flex, Icon, Text } from '@chakra-ui/react';
import React from 'react';
import NumberIcon from '@/public/assets/arts/number.svg';
import Link from 'next/link';
const HomePage = () => {
  return (
    <Center height="100vh">
      <Box
        bg="primary.gray.200"
        width={{ lg: '600px', md: '500px', base: 'full' }}
        padding={6}
        borderRadius="2xl"
        py={8}
      >
        <Flex flexDirection="column" gap={3} alignItems="center">
          <Icon as={NumberIcon} height={24} width="auto" />
          <Text fontSize="3xl" fontWeight="bold">
            Lottery "6 out of 45 "
          </Text>
          <Text fontSize="lg" fontWeight="bold">
            Jackpot 500 STRK
          </Text>
          <Text color="primary.gray.400">Draw #1</Text>
          <Text color="primary.gray.400">In 3days</Text>
          <Link
            href={`/lotteries/lot1`}
            style={{
              width: '100%',
            }}
          >
            <Button variant="gradient_1">Ticket Price 0.5 STRK</Button>
          </Link>
        </Flex>
      </Box>
    </Center>
  );
};

export default HomePage;
