'use client';
import { Button, Center, Container, Icon, Text } from '@chakra-ui/react';
import React from 'react';

import NotFoundIcon from '@/public/assets/arts/404.svg';
import { useRouter } from 'next/navigation';
const PageNotFound = () => {
  const router = useRouter();
  return (
    <Container maxWidth="container.xl">
      <Center my={36} flexDirection="column" gap={6}>
        <Icon as={NotFoundIcon} h={215} w="auto" />
        <Text color="#7A8CFF">
          We can’t seem to find a page you’re looking for.
        </Text>

        <Button onClick={() => router.push('/')} variant="primary">
          Back To Home
        </Button>
      </Center>
    </Container>
  );
};

export default PageNotFound;
