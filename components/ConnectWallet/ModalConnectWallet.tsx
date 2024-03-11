import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import React from 'react';
interface IProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}
export default function ModalConnectWallet({
  isOpen,
  onClose,
  children,
}: IProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent bg="white" borderRadius="lg" margin={{ md: 0, base: 4 }}>
        <ModalHeader
          textAlign="center"
          py={{ md: 8, base: 6 }}
          fontWeight="extrabold"
          fontSize="2xl"
        >
          Connect Wallet
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody padding={0}>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
}
