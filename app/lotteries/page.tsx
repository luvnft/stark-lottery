import Lotteries from '@/layouts/Lotteries';
import { Metadata } from 'next';
import React from 'react';
export const metadata: Metadata = {
  title: 'Lotteries Buy | StarkArcade',
  description: 'StarkArcade Lotteries',
};
const LotteriesPage = () => {
  return <Lotteries />;
};

export default LotteriesPage;
