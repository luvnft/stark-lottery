'use client';
import { Box, Button, Container, Icon, Text, VStack } from '@chakra-ui/react';
import React from 'react';

import NotFoundIcon from '@/public/assets/arts/notfound/404.svg';
import { useRouter } from 'next/navigation';
const PageNotFound = () => {
  const router = useRouter();
  return (
    <Box
      // maxWidth="container.xl"
      minH="90vh"
      _after={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `url('/assets/arts/notfound/404_art.jpeg')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        opacity: 0.2,
        zIndex: -1,
      }}
    >
      <VStack
        flexDirection="column"
        gap={6}
        py="auto"
        h="100vh"
        zIndex={10}
        alignItems="center"
        justifyContent="center"
      >
        <Icon as={NotFoundIcon} h={215} w="auto" />
        <Text color="#FAA632">
          We can’t seem to find a page you’re looking for.
        </Text>

        <Button onClick={() => router.push('/')} variant="primary">
          Back To Home
        </Button>
      </VStack>
    </Box>
  );
};

export default PageNotFound;
