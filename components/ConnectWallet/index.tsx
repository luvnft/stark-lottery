import {
  Box,
  Button,
  Text,
  Icon,
  useDisclosure,
  HStack,
} from '@chakra-ui/react';
import { useConnect } from '@starknet-react/core';
import { useDispatch } from 'react-redux';

import wallets from '@/config/wallet';
import { setChainId } from '@/redux/user/user-slice';
import ModalConnectWallet from './ModalConnectWallet';

import WalletIcon from '@/public/assets/icons/general/wallet.svg';
import BtnConnectWallet from './BtnConnectWallet';
const ConnectWallet = () => {
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
          variant="walletConnect"
          onClick={() => {
            onOpen();
          }}
        >
          <HStack>
            <Icon as={WalletIcon} h={5} w={5} />
            <Text
              sx={{
                display: { md: 'block', base: 'none' },
              }}
            >
              Connect Wallet
            </Text>
          </HStack>
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
      </Box>
    </>
  );
};

export default ConnectWallet;
