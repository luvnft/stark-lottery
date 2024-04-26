'use client';
import {
  Button,
  Center,
  Container,
  Icon,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import VectorIcon2 from '@/public/assets/arts/vector/vec-2.svg';
import VectorIcon3 from '@/public/assets/arts/vector/vec-3.svg';
import PrimaryCard from '@/components/Card/PrimaryCard';
import { useAuth } from '@/hooks/useAuth';
import ModalConnectWallet from '@/components/ConnectWallet/ModalConnectWallet';
import ModalClaimWhitelist from './ModalClaimWhitelist';
const ClaimAirdropPage = () => {
  const { user } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenModalClaim,
    onOpen: onOpenModalClaim,
    onClose: onCLoseModalClaim,
  } = useDisclosure();
  return (
    <>
      {' '}
      <Container maxWidth="container.xl">
        <Center flexDirection="column" minH="100vh" position="relative">
          <Icon
            as={VectorIcon3}
            position="absolute"
            right={0}
            bottom={'-100px'}
            transform="rotate(180deg)"
            zIndex={-1}
            height={{ md: '444px', base: 'auto' }}
            width={{ md: '545px', base: '250px' }}
            sx={{
              path: {
                fill: 'url(#gradient_3)',
              },
            }}
          />

          <Icon
            as={VectorIcon2}
            position="absolute"
            left={30}
            top={'-100px'}
            zIndex={-1}
            height={{ md: '444px', base: 'auto' }}
            width={{ md: '545px', base: '250px' }}
            sx={{
              path: {
                fill: 'url(#gradient_2)',
              },
            }}
          />

          <PrimaryCard
            style={{
              width: '600px',
              padding: 12,
              _hover: {},
            }}
          >
            <Text fontSize="2xl" fontWeight="bold">
              Verify to
            </Text>
            <Text fontSize="xx-large" fontWeight="800">
              Claim your Ticket rewards
            </Text>
            <Text color="note" textAlign="left" my={8}>
              Please Note: This page is meant to verify your eligibility to
              receive starkpot ticket. Your rewards will be sent to your
              connected wallet on Mainnet launch after you claim.
            </Text>
            <Button
              variant="primary"
              onClick={() => {
                if (user) {
                  onOpenModalClaim();
                } else {
                  onOpen();
                }
              }}
            >
              Check eligibile and claim
            </Button>
          </PrimaryCard>
        </Center>
      </Container>
      <ModalConnectWallet isOpen={isOpen} onClose={onClose} />
      <ModalClaimWhitelist
        isOpen={isOpenModalClaim}
        onClose={onCLoseModalClaim}
      />
    </>
  );
};

export default ClaimAirdropPage;
