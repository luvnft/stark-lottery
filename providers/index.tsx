/* eslint-disable import/no-anonymous-default-export */
'use client';
import { PropsWithChildren } from 'react';
import ProviderChakra from './ProviderChakra';
import ProviderScript from './ProviderScript';
import ProviderStarknet from './ProviderStarknet';

// eslint-disable-next-line react/display-name
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
