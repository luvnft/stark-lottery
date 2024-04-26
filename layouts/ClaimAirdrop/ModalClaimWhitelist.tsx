import {
  Box,
  Button,
  HStack,
  Icon,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Progress,
  useToast,
  Text,
  ModalCloseButton,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import LotteriesRandomNumber from '../LotteriesBuy/LotteriesRandomNumber';
import ClearIcon from '@/public/assets/icons/general/clear.svg';
import RandomIcon from '@/public/assets/icons/general/random.svg';
import ABIGovernance from '@/abi/governance.json';

import { useAccount, useContractRead } from '@starknet-react/core';
import { CONTRACT_ADDRESS } from '@/config/contractAddress';
import { CallData, uint256 } from 'starknet';
import { LOTTERY } from '@/config/value';
import StarknetIcon from '@/public/assets/icons/general/stark_token.svg';
import { sortArrayAscending } from '@/utils';
import * as Merkle from 'starknet-merkle-tree';
// TODO  NOTE Model Claim Whitelist Ticket
interface IProps {
  isOpen: boolean;
  onClose: () => void;
}
const ModalClaimWhitelist = ({ isOpen, onClose }: IProps) => {
  const [listNumber, setListNumber] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { address, account } = useAccount();
  const toast = useToast({
    position: 'top-right',
    duration: 6000,
  });
  const handleSelectNumber = (value: number) => {
    if (listNumber.includes(value)) {
      const newArr = listNumber.filter(x => x != value);

      setListNumber(newArr);
    } else {
      if (listNumber.length != 6) {
        setListNumber(prev => [...prev, value]);
      }
    }
  };
  function getRandomNumbers() {
    const minNumber = 1;
    const maxNumber = 45;
    const numberOfNumbers = 6;

    const randomNumbers: number[] = [];

    while (randomNumbers.length < numberOfNumbers) {
      const randomNumber =
        Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;

      // Ensure the generated number is not already in the array
      if (!randomNumbers.includes(randomNumber)) {
        randomNumbers.push(randomNumber);
      }
    }

    return randomNumbers;
  }
  const { data: minPriceTicketData, isLoading: isLoadingMinPrice } =
    useContractRead({
      functionName: 'getMinimumPrice',
      abi: ABIGovernance,
      args: [CONTRACT_ADDRESS.lottery],
      address: CONTRACT_ADDRESS.governance,
      watch: true,
    });

  const handleBuyWhitelistTicket = async () => {
    try {
      if (isLoadingMinPrice || !account || !address) {
        return;
      }
      setIsLoading(true);
      // const newSortData = listNumber.sort((a, b) => a - b);
      console.log('RUn');
      const newSortData = sortArrayAscending(listNumber);
      const airdrop: Merkle.InputForMerkle[] = [
        [
          '0x69b49c2cc8b16e80e86bfc5b0614a59aa8c9b601569c7b80dde04d3f3151b79',
          '256',
          '0',
        ],
        [
          '0x3cad9a072d3cf29729ab2fad2e08972b8cfde01d4979083fb6d15e8e66f8ab1',
          '25',
          '0',
        ],
        [
          '0x27d32a3033df4277caa9e9396100b7ca8c66a4ef8ea5f6765b91a7c17f0109c',
          '56',
          '0',
        ],
        [
          '0x7e00d496e324876bbc8531f2d9a82bf154d1a04a50218ee74cdd372f75a551a',
          '26',
          '0',
        ],
        [
          '0x53c615080d35defd55569488bc48c1a91d82f2d2ce6199463e095b4a4ead551',
          '56',
          '0',
        ],
      ];
      const tree = Merkle.StarknetMerkleTree.create(
        airdrop,
        Merkle.HashType.Poseidon
      );
      const inp = [
        '0x69b49c2cc8b16e80e86bfc5b0614a59aa8c9b601569c7b80dde04d3f3151b79',
        '256',
        '0',
      ]; // leaf content
      const proof = tree.getProof(inp);

      console.log('Proof', proof);
      await account.execute([
        {
          contractAddress: CONTRACT_ADDRESS.eth,
          entrypoint: 'approve',
          calldata: CallData.compile({
            spender: CONTRACT_ADDRESS.governance,
            amount: uint256.bnToUint256(Number(minPriceTicketData)),
          }),
        },
        {
          contractAddress: CONTRACT_ADDRESS.lottery,
          entrypoint: 'buyWhitelistTicket',

          calldata: CallData.compile({
            whitelistAddress: address,
            maxAmount: uint256.bnToUint256(1),
            proof: proof,
            pickedNumbers: newSortData,
          }),
        },
      ]);

      toast({
        status: 'success',
        description: `You  Buy success Ticket !`,
      });

      setListNumber([]);
    } catch (error: any) {
      if (error.message === 'User abort') {
        toast({
          status: 'error',
          description: `You Rejected Claim Ticket`,
        });
      } else {
        toast({
          status: 'error',
          description: `You not Valid Eliggible`,
        });
      }
    }
    setIsLoading(false);
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl" isCentered>
      <ModalOverlay />

      <ModalContent borderRadius="lg" overflow="hidden">
        <ModalBody bg="card">
          <HStack gap={4} justifyContent="flex-end">
            <IconButton
              onClick={async () => {
                const value = getRandomNumbers();
                await setListNumber(() => value);
              }}
              variant="icon_btn"
              icon={<Icon as={RandomIcon} />}
              aria-label=""
              content="Random Number"
            >
              Random Number
            </IconButton>
            <IconButton
              variant="icon_btn"
              icon={<Icon as={ClearIcon} />}
              aria-label=""
              onClick={() => {
                setListNumber([]);
              }}
            />
          </HStack>
          <Text color="note">Pick Your 6 number</Text>
          <Progress
            value={listNumber.length}
            size="sm"
            variant="pick_progress"
            bg="#192678"
            max={6}
            borderRadius="2xl"
          />
          <LotteriesRandomNumber
            listNumber={listNumber}
            handleSelectNumber={handleSelectNumber}
          />
          <HStack
            width="full"
            justifyContent="center"
            textAlign="center"
            gap={6}
            my={8}
          >
            <Button
              isDisabled={listNumber.length == 6 && address ? false : true}
              width={{ md: 'auto', base: 'full' }}
              variant="buy_ticket"
              isLoading={isLoadingMinPrice || isLoading}
              onClick={async () => {
                await handleBuyWhitelistTicket();
              }}
              rightIcon={<Icon as={StarknetIcon} h={5} w={5} />}
            >
              Claim Ticket | {LOTTERY.price_ticket}
            </Button>
            <Button variant="primary" minH={12} onClick={onClose}>
              Cancel
            </Button>
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalClaimWhitelist;
