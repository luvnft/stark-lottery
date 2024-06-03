import React, { useState } from 'react';
import ShopCartIcon from '@/public/assets/icons/general/shop_cart.svg';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  Icon,
  IconButton,
  useDisclosure,
  Text,
  Checkbox,
  useToast,
  Center,
} from '@chakra-ui/react';

import { useCart } from '@/hooks/useCart';
import CartItem from './CartItem';
import StarknetIcon from '@/public/assets/icons/general/stark_token.svg';
import EmptyCart from '@/public/assets/icons/general/empty_cart.svg';

import { useAccount, useContractRead } from '@starknet-react/core';
import ABIGovernance from '@/abi/governance.json';
import { Call, CallData, uint256 } from 'starknet';

import { CONTRACT_ADDRESS } from '@/config/contractAddress';
import { LOTTERY } from '@/config/value';
const CartControl = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { cart, clearTicketCart, updateTicketsCart } = useCart();

  const { account } = useAccount();
  const [isLoading, setIsLoading] = useState(false);

  const [listSelect, setListSelect] = useState<number[][]>([]);
  const toast = useToast({
    position: 'top-right',
    duration: 6000,
  });
  function isSelected(arrayCheck: number[][], numbers: number[]) {
    if (arrayCheck.length == 0) return false;
    return arrayCheck.some(item => {
      return item.every((num, index) => num === numbers[index]);
    });
  }
  const handleSelectNumber = (listValue: number[]) => {
    if (!isSelected(listSelect, listValue)) {
      setListSelect(prev => [...prev, listValue]);
    } else {
      const newArr = listSelect.filter(item =>
        item.some((num, index) => {
          if (num !== listValue[index]) {
            return true;
          }
        })
      );

      setListSelect(newArr);
    }
  };
  const handleSelectAll = () => {
    if (listSelect.length == cart.length) {
      setListSelect([]);
    } else {
      setListSelect(cart);
    }
  };
  const handleClearCart = async () => {
    if (listSelect.length == cart.length) {
      await clearTicketCart();
      setListSelect([]);
    } else {
      const newArr = cart.filter(item => !isSelected(listSelect, item));
      await updateTicketsCart(newArr);
      setListSelect(newArr);
    }
  };
  const { data: minPriceTicketData, isLoading: isLoadingMinPrice } =
    useContractRead({
      functionName: 'getMinimumPrice',
      abi: ABIGovernance,
      args: [CONTRACT_ADDRESS.lottery],
      address: CONTRACT_ADDRESS.governance,
    });

  const handleBuyTicket = async () => {
    try {
      if (isLoadingMinPrice || !account) {
        return;
      }
      setIsLoading(true);
      let listExecute: Call[] = listSelect.map(item => {
        return {
          contractAddress: CONTRACT_ADDRESS.lottery,
          entrypoint: 'buyTicket',
          calldata: CallData.compile({
            pickedNumbers: [...item],
          }),
        };
      });

      await account.execute([
        {
          contractAddress: CONTRACT_ADDRESS.strk,
          entrypoint: 'approve',
          calldata: CallData.compile({
            spender: CONTRACT_ADDRESS.governance,
            amount: uint256.bnToUint256(
              Number(minPriceTicketData) * listSelect.length
            ),
          }),
        },
        ...listExecute,
      ]);

      toast({
        status: 'success',
        description: `You  Buy success Ticket !`,
      });

      handleClearCart();
    } catch (error: any) {
      if (error.message === 'User abort') {
        toast({
          status: 'error',
          description: `You Rejected Buy Ticket`,
        });
      }
    }
    setIsLoading(false);
  };

  return (
    <>
      <IconButton
        variant="icon_btn"
        onClick={onOpen}
        icon={<Icon as={ShopCartIcon} />}
        aria-label=""
        sx={{
          _after: {
            content: `'${cart.length}'`,
            position: 'absolute',
            height: 3,
            width: 3,
            padding: 1,
            fontSize: 'xs',
            fontWeight: 'bold',
            borderRadius: 'full',
            bg: 'red',
            top: '0',
            right: '0',
            transition: 'opacity 0.3s linear',
          },
        }}
      />
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent background="primary.game.300">
          <DrawerCloseButton />
          <DrawerHeader>
            <Text>
              {`Your Cart: ${cart.length} ${cart.length > 1 ? 'tickets' : 'ticket'}`}
            </Text>

            {cart.length > 0 && (
              <Button
                onClick={handleSelectAll}
              >{`${listSelect.length == cart.length ? 'Deselect All' : 'Select All'}`}</Button>
            )}
          </DrawerHeader>

          <DrawerBody>
            {cart.length ? (
              <Flex flexDirection="column" gap={6}>
                {cart.map((item, index) => (
                  <>
                    <HStack gap={3} key={`${index}-CartItems`}>
                      <Checkbox
                        isChecked={isSelected(listSelect, item)}
                        onChange={() => handleSelectNumber(item)}
                      ></Checkbox>
                      <CartItem listNum={item} />
                    </HStack>
                  </>
                ))}
              </Flex>
            ) : (
              <>
                <Center flexDirection="column" height="full" width="full">
                  <Icon
                    as={EmptyCart}
                    color="white"
                    h={32}
                    width={32}
                    opacity={0.6}
                  />
                  <Text fontWeight="bold">{`You haven't add ticket`}</Text>
                </Center>
              </>
            )}
          </DrawerBody>

          <DrawerFooter as={Flex} flexDirection="column" gap={4}>
            <Button
              mr={3}
              color="white"
              width="full"
              variant="buy_ticket"
              onClick={handleBuyTicket}
              rightIcon={<Icon as={StarknetIcon} h={5} w={5} />}
              isLoading={isLoading}
              isDisabled={listSelect.length == 0}
            >
              {`Buy Tickets | ${LOTTERY.price_ticket * listSelect.length}`}
            </Button>
            <Button
              width="full"
              variant="primary"
              minH={12}
              bg="primary.game.100"
              onClick={handleClearCart}
              isDisabled={listSelect.length == 0}
            >
              {`Clear ${listSelect.length == cart.length ? 'All' : ` ${listSelect.length} Tickets`} `}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CartControl;
