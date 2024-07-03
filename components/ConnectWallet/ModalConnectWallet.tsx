import { setChainId } from '@/redux/user/user-slice';
import {
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  Text,
  ModalOverlay,
  Box,
} from '@chakra-ui/react';
import { useConnect } from '@starknet-react/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import BtnConnectWallet from './BtnConnectWallet';
import wallets from '@/config/wallet';
import { convertHex } from '@/utils/convertHex';
interface IProps {
  isOpen: boolean;
  onClose: () => void;
}
export default function ModalConnectWallet({ isOpen, onClose }: IProps) {
  const { connect, connectors } = useConnect();

  const dispatch = useDispatch();
  const connectWallet = async (connectorIndex: number) => {
    await connect({ connector: connectors[connectorIndex] });
    await dispatch(setChainId(connectorIndex));
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        bg={convertHex('#4C1F5880', 0.5)}
        borderRadius="32px"
        margin={{ md: 0, base: 4 }}
        _before={{
          content: '""',
          position: 'absolute',
          inset: 0,
          zIndex: -1,
          borderRadius: '32px',
          padding: '2px',
          background: 'gradient.100',
          ' -webkit-mask':
            ' linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          '  -webkit-mask-composite': 'xor',
          ' mask-composite': 'exclude',
        }}
        position="relative"
      >
        <HStack
          justifyContent="space-between"
          position="relative"
          padding={{ md: 8, base: 6 }}
        >
          <Text fontWeight="extrabold" fontSize="2xl">
            Connect Wallet
          </Text>
          <ModalCloseButton
            _hover={{
              bg: '#E4E8FF',
            }}
            position="relative"
            top={0}
            right={0}
          />
        </HStack>

        <ModalBody padding={0}>
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
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
