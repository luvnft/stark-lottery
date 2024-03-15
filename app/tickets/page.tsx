import MyTicketPage from '@/layouts/MyTicket';
import { Metadata } from 'next';
import React from 'react';
export const metadata: Metadata = {
  title: 'Ticket Page | StarkArcade',
};
const TicketsPage = () => {
  return <MyTicketPage />;
};

export default TicketsPage;
