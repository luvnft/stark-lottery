import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Icon,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import MenuIcon from '@/public/assets/icons/general/menu.svg';
import { useAuth } from '@/hooks/useAuth';
import ListPageItem from '../Header/ListPageItem';
import ProfileAccount from '../ConnectWallet/ProfileAccount';
import ConnectWallet from '../ConnectWallet';
// Hamburger Active Product
const PageDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, isLoading, chainId } = useAuth();
  return (
    <>
      <IconButton
        onClick={onOpen}
        aria-label=""
        icon={<Icon as={MenuIcon} h={10} w={10} color="white" />}
        height={10}
        w={10}
        bg=""
      />
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="primary.game.100">
          <DrawerCloseButton />

          <DrawerBody py={10}>
            <ListPageItem
              sx={{
                width: 'full',
                flexDirection: 'column',
                alignItems: 'flex-end',
                onClick: () => onClose(),
              }}
            />
            <Box mt={8}>
              {user ? (
                <ProfileAccount
                  sx={{
                    width: 'full',
                  }}
                />
              ) : (
                <ConnectWallet
                  sx={{
                    width: 'full',
                  }}
                />
              )}
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default PageDrawer;
