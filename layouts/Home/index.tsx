'use client';
import { Box, Container, Icon } from '@chakra-ui/react';
import React from 'react';
import VectorIcon1 from '@/public/assets/arts/vector/vec-1.svg';
import VectorIcon4 from '@/public/assets/arts/vector/vec-4.svg';
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
          bg="#081041"
          bgImage={`url('/assets/arts/intro_bg.png')`}
          py="240px"
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
      </FadeInVisible>
      <FadeInVisible>
        <Box bg="#081041">
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
