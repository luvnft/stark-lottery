'use client';
import { Box, Container } from '@chakra-ui/react';
import React from 'react';

import HeroSection from './HeroSection';
import TechSection from './TechSection';
import RuleSection from './RuleSection';
import FAQ from './FAQ';
import IntroSection from './IntroSection';
import FadeInVisible from '@/components/animations/FadeInVisible';
import { Image } from '@chakra-ui/react';
const HomePage = () => {
  return (
    <>
      <FadeInVisible>
        <Box
          bg="#2C0A47"
          py={{ md: '100px', base: '50px' }}
          bgImage={`url('/assets/arts/home/hero_art.svg')`}
          position="relative"
          bgRepeat="no-repeat"
          bgSize="cover"
          overflow={{ md: 'visible', base: 'hidden' }}
        >
          <Image
            bottom={0}
            left={{ lg: '-2%', md: -100, base: -50 }}
            position="absolute"
            zIndex={1}
            height={{ xl: '700px', md: '400px', base: '180px' }}
            alt="Planet 1"
            src="/assets/arts/home/3d-rocket.svg"
          />

          <Image
            bottom={{ md: -100, base: 0 }}
            right={0}
            position="absolute"
            zIndex={1}
            height={{ xl: '500px', md: '400px', base: '200px' }}
            alt="Planet 1"
            src="/assets/arts/home/astronaut.svg"
          />
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
      </FadeInVisible>
    </>
  );
};

export default HomePage;
