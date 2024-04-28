import MyTicketPage from '@/layouts/MyTicket';
import { Metadata } from 'next';
import React from 'react';
export const metadata: Metadata = {
  title: 'Your Tickets Page | StarkArcade',
};
const TicketsPage = () => {
  return <MyTicketPage />;
};

export default TicketsPage;
