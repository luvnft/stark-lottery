import Lotteries from '@/layouts/Lotteries';
import { Metadata } from 'next';
import React from 'react';
export const metadata: Metadata = {
  title: 'Lotteries | StarkArcade',
};
const LotteriesPage = () => {
  return <Lotteries />;
};

export default LotteriesPage;
