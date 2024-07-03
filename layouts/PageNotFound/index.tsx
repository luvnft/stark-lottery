'use client';
import { Button, Container, Icon, Text, VStack } from '@chakra-ui/react';
import React from 'react';

import NotFoundIcon from '@/public/assets/arts/notfound/404.svg';
import { useRouter } from 'next/navigation';
const PageNotFound = () => {
  const router = useRouter();
  return (
    <Container
      maxWidth="container.xl"
      background={`url('/assets/arts/notfound/404_art.jpeg')`}
      minH="90vh"
    >
      <VStack
        flexDirection="column"
        gap={6}
        py="auto"
        h="full"
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
    </Container>
  );
};

export default PageNotFound;
