'use client';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Scrollbar from '@/components/Scrollbar';
import { Box } from '@chakra-ui/react';
import React, { PropsWithChildren } from 'react';

const DefaultLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Scrollbar height="100vh">
        <Header />
        <Box flexGrow={1}>{children}</Box>
        <Footer />
      </Scrollbar>
    </>
  );
};

export default DefaultLayout;
