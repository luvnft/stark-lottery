import LotteriesBuyPage from '@/layouts/LotteriesBuy';
import { Metadata } from 'next';
import React from 'react';
export const metadata: Metadata = {
  title: 'Lotteries  Buy | StarkArcade',
};
const LotteryDetail = () => {
  return <LotteriesBuyPage />;
};

export default LotteryDetail;
