import {
  Box,
  Button,
  Text,
  Icon,
  useDisclosure,
  ButtonProps,
} from '@chakra-ui/react';
import { useConnect } from '@starknet-react/core';
import { useDispatch } from 'react-redux';

import wallets from '@/config/wallet';
import { setChainId } from '@/redux/user/user-slice';
import ModalConnectWallet from './ModalConnectWallet';

import WalletIcon from '@/public/assets/icons/general/wallet.svg';
import BtnConnectWallet from './BtnConnectWallet';
const ConnectWallet = ({ sx }: { sx?: ButtonProps }) => {
  const { connect, connectors } = useConnect();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch();
  const connectWallet = async (connectorIndex: number) => {
    await connect({ connector: connectors[connectorIndex] });
    await dispatch(setChainId(connectorIndex));
    onClose();
  };

  return (
    <>
      <Box>
        <Button
          variant="primary"
          onClick={() => {
            onOpen();
          }}
          bg="#1B266B"
          borderRadius={{ md: '32px', base: '12px' }}
          gap={4}
          role="group"
          color="#E4E8FF"
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
