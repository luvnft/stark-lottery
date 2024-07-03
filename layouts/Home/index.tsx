'use client';
import { Box, Container, Icon } from '@chakra-ui/react';
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
        >
          <Image
            bottom={0}
            left={0}
            position="absolute"
            zIndex={1}
            height={{ lg: '500px', md: '200px', base: '80px' }}
            alt="Planet 1"
            src="/assets/arts/home/3d-rocket.svg"
          />

          <Image
            bottom={-100}
            right={0}
            position="absolute"
            zIndex={1}
            // height={{ lg: '500px', md: '200px', base: '80px' }}
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
