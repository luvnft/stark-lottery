'use client';
import BtnConnectWallet from '@/components/ConnectWallet/BtnConnectWallet';
import ModalConnectWallet from '@/components/ConnectWallet/ModalConnectWallet';
import wallets from '@/config/wallet';
import { useAuth } from '@/hooks/useAuth';
import { Container } from '@chakra-ui/react';

import React from 'react';

import PleaseConnectWallet from './PleaseConnectWallet';
import ABITicket from '@/abi/ticket.json';
import { useAccount, useContractRead } from '@starknet-react/core';
import { CONTRACT_ADDRESS } from '@/config/contractAddress';
const MyTicketPage = () => {
  const { user, isLoading, chainId } = useAuth();
  const { address } = useAccount();
  const { data: dataTicket, isLoading: isLoadingTicket } = useContractRead({
    functionName: 'getUserTickets',
    abi: ABITicket,
    args: [address as string],
    address: CONTRACT_ADDRESS.ticket,
    watch: true,
  });
  console.log('Data TIcket', dataTicket);
  return (
    <>
      <Container maxWidth="container.xl">
        {user ? <>dsa</> : <PleaseConnectWallet />}
      </Container>
    </>
  );
};

export default MyTicketPage;
