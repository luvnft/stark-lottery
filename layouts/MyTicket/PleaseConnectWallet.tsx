'use client';
import BtnConnectWallet from '@/components/ConnectWallet/BtnConnectWallet';
import ModalConnectWallet from '@/components/ConnectWallet/ModalConnectWallet';
import wallets from '@/config/wallet';

import { setChainId } from '@/redux/user/user-slice';
import {
  Box,
  Button,
  Center,
  Flex,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import Image from 'next/image';
import React from 'react';

const PleaseConnectWallet = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Center margin="auto" minH="80vh">
      <Flex
        flexDirection="column"
        gap={4}
        padding={8}
        bg="#0A1450"
        borderRadius="3xl"
        width="fit-content"
        alignItems="center"
      >
        <Box>
          <Image
            src="/assets/arts/wallet_image.png"
            height={240}
            width={240}
            alt=""
          />
        </Box>
        <Text variant="title">Wallet not connected</Text>
        <Text color="#7A8CFF">Connect to a wallet to see your tickets</Text>
        <Button variant="primary" onClick={() => onOpen()}>
          Connect
        </Button>
        <ModalConnectWallet isOpen={isOpen} onClose={onClose} />
      </Flex>
    </Center>
  );
};

export default PleaseConnectWallet;
