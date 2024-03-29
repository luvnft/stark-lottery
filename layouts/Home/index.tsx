'use client';
import { Box, Container, Icon } from '@chakra-ui/react';
import React from 'react';
import VectorIcon1 from '@/public/assets/arts/vector/vec-1.svg';
import VectorIcon4 from '@/public/assets/arts/vector/vec-4.svg';
import HeroSection from './HeroSection';
import TechSection from './TechSection';
import RuleSection from './RuleSection';
import FAQ from './FAQ';
const HomePage = () => {
  return (
    <>
      <Box position="relative">
        <Icon
          as={VectorIcon1}
          position="absolute"
          left={0}
          zIndex={-1}
          height={{ md: '444px', base: 'auto' }}
          width={{ md: '545px', base: '250px' }}
          sx={{
            path: {
              fill: 'url(#gradient_1)',
            },
          }}
        />
        <Container maxWidth="container.xl">
          <HeroSection />
        </Container>
        <Icon
          as={VectorIcon4}
          position="absolute"
          right={25}
          bottom={0}
          zIndex={-1}
          height="432px"
          width="437px"
          sx={{
            path: {
              fill: 'url(#gradient_1)',
            },
          }}
        />
      </Box>

      <Box bg="#081041">
        <Container maxWidth="container.xl" overflow="hidden">
          <TechSection />
        </Container>
      </Box>

      <Container maxWidth="container.xl" overflow="hidden">
        <RuleSection />
      </Container>
      <Container maxWidth="container.xl" overflow="hidden">
        <FAQ />
      </Container>
    </>
  );
};

export default HomePage;
