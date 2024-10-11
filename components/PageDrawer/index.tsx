import {
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

import ListPageItem from '../Header/ListPageItem';

// Hamburger Active Product
const PageDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        onClick={onOpen}
        aria-label=""
        icon={<Icon as={MenuIcon} h={8} w={8} color="white" />}
        height={10}
        w={10}
        bg=""
      />
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="primary.game.100">
          <DrawerCloseButton />

          <DrawerBody py={16}>
            <ListPageItem
              sx={{
                width: 'full',
                flexDirection: 'column',
                alignItems: 'flex-end',
                onClick: () => onClose(),
              }}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default PageDrawer;
