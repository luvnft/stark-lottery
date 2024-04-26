import Result from '@/layouts/Result';
import { Metadata } from 'next';
import React from 'react';
export const metadata: Metadata = {
  title: 'Lotteries Results | StarkArcade',
  description: 'StarkArcade Lotteries Results Page',
};
const ResultPage = () => {
  return <Result />;
};

export default ResultPage;
