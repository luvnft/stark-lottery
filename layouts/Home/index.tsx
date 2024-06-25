'use client';
import { Box, Container, Icon } from '@chakra-ui/react';
import React from 'react';

import HeroSection from './HeroSection';
import TechSection from './TechSection';
import RuleSection from './RuleSection';
import FAQ from './FAQ';
import IntroSection from './IntroSection';
import FadeInVisible from '@/components/animations/FadeInVisible';
const HomePage = () => {
  return (
    <>
      <FadeInVisible>
        <Box
          bg="#2C0A47"
          py={{ md: '100px', base: '50px' }}
          bgImage={`url('/assets/arts/home/hero_art.svg')`}
          bgRepeat="no-repeat"
          bgSize="cover"
        >
          <Container maxWidth="container.xl">
            <IntroSection />
          </Container>
        </Box>
      </FadeInVisible>

      <FadeInVisible>
        <Box position="relative">
          <Container maxWidth="container.xl">
            <HeroSection />
          </Container>
        </Box>
      </FadeInVisible>
      <FadeInVisible>
        <Box
          bg="#2C0A47"
          bgImage={`url('/assets/arts/home/tech_art.svg')`}
          bgRepeat="no-repeat"
          bgSize="cover"
        >
          <Container maxWidth="container.xl" overflow="hidden">
            <TechSection />
          </Container>
        </Box>
      </FadeInVisible>

      <FadeInVisible>
        <Container maxWidth="container.xl" overflow="hidden">
          <RuleSection />
        </Container>
        <Container maxWidth="container.xl" overflow="hidden">
          <FAQ />
        </Container>
      </FadeInVisible>
    </>
  );
};

export default HomePage;
