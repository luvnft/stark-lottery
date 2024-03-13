'use client';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Box } from '@chakra-ui/react';
import React, { PropsWithChildren } from 'react';

const DefaultLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <Box minH="90vh" py={4}>
        {children}
      </Box>
      <Footer />
    </>
  );
};

export default DefaultLayout;
