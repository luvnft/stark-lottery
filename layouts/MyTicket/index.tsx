'use client';

import { useAuth } from '@/hooks/useAuth';
import { Box, Button, Container, Flex, HStack, Text } from '@chakra-ui/react';

import React, { useEffect, useState } from 'react';

import PleaseConnectWallet from './PleaseConnectWallet';
import ABITicket from '@/abi/ticket.json';
import { useAccount, useContractRead } from '@starknet-react/core';
import { CONTRACT_ADDRESS } from '@/config/contractAddress';

interface TicketUserProps {
  lotteryAddress: string;
  lotteryId: number;
  payOut: number;
  pickedNumbers: number[];
  ticketId: number;
  user: string;
}
const MyTicketPage = () => {
  const { user, isLoading, chainId } = useAuth();
  const { address } = useAccount();
  const [listMyLotteries, setListMyLotteries] = useState<number[]>([]); // List ticket get from contract lottery
  const [listMyTickets, setListMyTickets] = useState<TicketUserProps[]>();
  const { data: dataTicket, isLoading: isLoadingTicket } = useContractRead({
    functionName: 'getUserTickets',
    abi: ABITicket,
    args: [address as string],
    address: CONTRACT_ADDRESS.ticket,
    watch: true,
  });
  const flatArrayTicket = (inputArray: any) => {
    if (!inputArray) {
      return;
    }

    const value: number[] = [];
    inputArray.forEach((element: BigInt) => {
      value.push(Number(element));
    });

    return value;
  };
  const { data: dataMyTicket, isLoading: isLoadingMyTicket } = useContractRead({
    functionName: 'getTicketByIds',
    abi: ABITicket,
    args: [listMyLotteries || []],
    address: CONTRACT_ADDRESS.ticket,
    watch: true,
  });

  useEffect(() => {
    if (!isLoadingTicket) {
      const dataFlat = flatArrayTicket(dataTicket);
      if (dataFlat) {
        setListMyLotteries(() => dataFlat);
      }
    }
  }, [isLoadingTicket]);

  useEffect(() => {
    if (!isLoadingMyTicket && dataMyTicket) {
      const temp: any = dataMyTicket;

      if (temp) {
        convertBigIntsToNumbers(temp);
        setListMyTickets(() => temp);
      }
    }
  }, [isLoadingMyTicket]);
  function convertBigIntsToNumbers(obj: any) {
    for (const key in obj) {
      if (
        typeof obj[key] === 'bigint' &&
        key !== 'user' &&
        key !== 'lotteryAddress'
      ) {
        obj[key] = Number(obj[key]);
      } else if (Array.isArray(obj[key])) {
        obj[key] = obj[key].map((item: any) =>
          typeof item === 'bigint' ? Number(item) : item
        );
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        convertBigIntsToNumbers(obj[key]);
      }
    }
  }

  return (
    <>
      <Container maxWidth="container.xl">
        {user ? (
          <>
            <Text variant="title">Your Ticket</Text>
            <Flex flexDirection="column" gap={10}>
              {listMyTickets?.length &&
                listMyTickets.map(data => (
                  <HStack gap={{ md: 8, base: 6 }}>
                    {data.pickedNumbers.map(dataPicked => (
                      <Button variant="lotteryNumber" isActive={true}>
                        <Text>{dataPicked}</Text>
                      </Button>
                    ))}
                  </HStack>
                ))}
            </Flex>
          </>
        ) : (
          <PleaseConnectWallet />
        )}
      </Container>
    </>
  );
};

export default MyTicketPage;
