import PageNotFound from '@/layouts/PageNotFound';
import { Metadata } from 'next';
import React from 'react';
export const metadata: Metadata = {
  title: 'Page Not Found | StarkArcade',
};
const NotFoundPage404 = () => {
  return <PageNotFound />;
};

export default NotFoundPage404;
