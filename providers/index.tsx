'use client';
import { PropsWithChildren } from 'react';
import ProviderChakra from './ProviderChakra';
import ProviderScript from './ProviderScript';
import ProviderStarknet from './ProviderStarknet';

export default ({ children }: PropsWithChildren) => {
  return (
    <>
      <ProviderChakra>
        <ProviderStarknet>{children}</ProviderStarknet>
      </ProviderChakra>
      <ProviderScript />
    </>
  );
};
