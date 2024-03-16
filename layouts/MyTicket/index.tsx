'use client';

import { useAuth } from '@/hooks/useAuth';
import {
  Button,
  Container,
  Flex,
  HStack,
  Spinner,
  Text,
} from '@chakra-ui/react';

import React, { useEffect, useState } from 'react';

import PleaseConnectWallet from './PleaseConnectWallet';
import ABITicket from '@/abi/ticket.json';
import { useAccount, useContractRead } from '@starknet-react/core';
import { CONTRACT_ADDRESS } from '@/config/contractAddress';
import { convertBigIntsToNumbers } from '@/utils';

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
      console.log('Why', temp);
      if (temp) {
        convertBigIntsToNumbers(temp);
        setListMyTickets(() => temp);
      }
    }
  }, [isLoadingMyTicket, dataMyTicket]);

  return (
    <>
      <Container maxWidth="container.xl">
        {user ? (
          <>
            <Text variant="title" py={10}>
              Your Ticket
            </Text>
            {isLoadingMyTicket ? (
              <>
                <Spinner size="lg" />
              </>
            ) : (
              <Flex flexDirection="column" gap={10}>
                {listMyTickets?.length !== 0 && listMyTickets ? (
                  <>
                    {listMyTickets.map(data => (
                      <HStack
                        gap={{ md: 8, base: 6 }}
                        padding={6}
                        bg="#0A1450"
                        borderRadius="3xl"
                        justifyContent="space-between"
                      >
                        <Text variant="title" fontSize="lg">
                          Lottery: #{data.lotteryId}
                        </Text>
                        <Text variant="title" fontSize="lg">
                          TicketID: #{data.ticketId}
                        </Text>
                        <HStack gap={8}>
                          {data.pickedNumbers.map(dataPicked => (
                            <Button variant="lotteryNumber" isActive={true}>
                              <Text>{dataPicked}</Text>
                            </Button>
                          ))}
                        </HStack>
                      </HStack>
                    ))}
                  </>
                ) : (
                  <> You Have't Ticket</>
                )}
              </Flex>
            )}
          </>
        ) : (
          <PleaseConnectWallet />
        )}
      </Container>
    </>
  );
};

export default MyTicketPage;
