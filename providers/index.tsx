'use client';
import { PropsWithChildren } from 'react';
import ProviderChakra from './ProviderChakra';
import ProviderScript from './ProviderScript';
import ProviderStarknet from './ProviderStarknet';

export default ({ children }: PropsWithChildren) => {
  return (
    <>
      <ProviderStarknet>
        <ProviderChakra>{children}</ProviderChakra>
      </ProviderStarknet>
      <ProviderScript />
    </>
  );
};
