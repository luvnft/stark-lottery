'use client';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Box, Container } from '@chakra-ui/react';
import React, { PropsWithChildren } from 'react';

const DefaultLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <Container maxWidth="container.xl">
        <Box minH="90vh" py={4}>
          {children}
        </Box>
        <Footer />
      </Container>
    </>
  );
};

export default DefaultLayout;
