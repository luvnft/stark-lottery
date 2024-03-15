'use client';
import BtnConnectWallet from '@/components/ConnectWallet/BtnConnectWallet';
import ModalConnectWallet from '@/components/ConnectWallet/ModalConnectWallet';
import wallets from '@/config/wallet';
import { useAuth } from '@/hooks/useAuth';
import { setChainId } from '@/redux/user/user-slice';
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useConnect } from '@starknet-react/core';
import Image from 'next/image';
import React from 'react';
import { useDispatch } from 'react-redux';
import { connect } from 'starknetkit';

const PleaseConnectWallet = () => {
  const { user, isLoading, chainId } = useAuth();
  const { connect, connectors } = useConnect();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const connectWallet = async (connectorIndex: number) => {
    await connect({ connector: connectors[connectorIndex] });
    await dispatch(setChainId(connectorIndex));
    onClose();
  };
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
        <ModalConnectWallet isOpen={isOpen} onClose={onClose}>
          <Box px={2} pb={4}>
            {wallets.map(wallet => (
              <BtnConnectWallet
                key={`connect-${wallet.label}`}
                onClick={async () => {
                  await connectWallet(wallet.index);
                }}
                icon={wallet.icon}
                label={wallet.label}
              />
            ))}
          </Box>
        </ModalConnectWallet>
      </Flex>
    </Center>
  );
};

export default PleaseConnectWallet;
