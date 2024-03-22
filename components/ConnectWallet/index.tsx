import { Box, Button, Text, Icon, useDisclosure } from '@chakra-ui/react';
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
          variant="primary"
          onClick={() => {
            onOpen();
          }}
          bg="#1B266B"
          borderRadius="32px"
          gap={4}
          role="group"
          color="#E4E8FF"
          transition="ease-in-out .3s"
          _hover={{
            bg: 'gradient.100',
          }}
        >
          <Icon as={WalletIcon} h={6} w={6} />
          <Text
            sx={{
              display: { md: 'block', base: 'none' },
            }}
          >
            Connect to a wallet
          </Text>
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
