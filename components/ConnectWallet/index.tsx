import {
  Box,
  Button,
  Text,
  Icon,
  useDisclosure,
  ButtonProps,
} from '@chakra-ui/react';

import ModalConnectWallet from './ModalConnectWallet';

import WalletIcon from '@/public/assets/icons/general/wallet.svg';

const ConnectWallet = ({ sx }: { sx?: ButtonProps }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box>
        <Button
          variant="primary"
          onClick={() => {
            onOpen();
          }}
          borderRadius={{ md: '32px', base: '12px' }}
          gap={4}
          role="group"
          width={{ md: '220px', base: '80px' }}
          {...sx}
        >
          <Icon as={WalletIcon} h={6} width={6} />
          <Text
            sx={{
              display: { md: 'block', base: 'none' },
            }}
          >
            Connect Wallet
          </Text>
        </Button>

        <ModalConnectWallet isOpen={isOpen} onClose={onClose} />
      </Box>
    </>
  );
};

export default ConnectWallet;
