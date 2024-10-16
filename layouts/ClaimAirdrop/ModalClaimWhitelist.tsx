import {
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
} from '@chakra-ui/react';
import React, { useState } from 'react';
import LotteriesRandomNumber from '../LotteriesBuy/LotteriesRandomNumber';
import ClearIcon from '@/public/assets/icons/general/clear.svg';
import RandomIcon from '@/public/assets/icons/general/random.svg';

import { useAccount, useContractRead } from '@starknet-react/core';
import { CONTRACT_ADDRESS } from '@/config/contractAddress';
import { CallData } from 'starknet';
import { LOTTERY } from '@/config/value';
import StarknetIcon from '@/public/assets/icons/general/stark_token.svg';
import { formattedContractAddress, sortArrayAscending } from '@/utils';
import * as Merkle from 'starknet-merkle-tree';
import airDropJson from '@/data/whitelist.json';
import { ABIS } from '@/abis';

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

      if (!randomNumbers.includes(randomNumber)) {
        randomNumbers.push(randomNumber);
      }
    }

    return randomNumbers;
  }

  const { data: minPriceTicketData, isLoading: isLoadingMinPrice } =
    useContractRead({
      functionName: 'getMinimumPrice',
      abi: ABIS.GovernanceABI,
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
      const newSortData = sortArrayAscending(listNumber);
      let formatedAddress = formattedContractAddress(address);
      const whitelist: string[] = JSON.parse(JSON.stringify(airDropJson));
      if (whitelist.includes(formatedAddress)) {
        const listAirdrop = [];
        for (const winner of whitelist) {
          listAirdrop.push([winner, '1', '0']);
        }

        const tree = Merkle.StarknetMerkleTree.create(
          listAirdrop,
          Merkle.HashType.Poseidon
        );

        const inp = [address, '1', '0']; // leaf content
        const proof = tree.getProof(inp);

        await account.execute({
          contractAddress: CONTRACT_ADDRESS.lottery,
          entrypoint: 'buyWhitelistTicket',
          calldata: CallData.compile({
            whitelistAddress: CONTRACT_ADDRESS.whitelist,
            maxAmount: 1,
            proof: proof,
            pickedNumbers: newSortData,
          }),
        });
      }

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
          description: `You are not Valid Eliggible`,
        });
      }
    }
    onClose();
    setIsLoading(false);
  };

  return (
    <>
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
    </>
  );
};

export default ModalClaimWhitelist;
