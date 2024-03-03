import { goerli, sepolia } from '@starknet-react/chains';
import {
  InjectedConnector,
  StarknetConfig,
  publicProvider,
} from '@starknet-react/core';
import React, { PropsWithChildren } from 'react';
import { ArgentMobileConnector } from 'starknetkit/argentMobile';

const ProviderStarknet = ({ children }: PropsWithChildren) => {
  const connectors = [
    new InjectedConnector({ options: { id: 'argentX', name: 'Argent' } }),
    new InjectedConnector({ options: { id: 'braavos', name: 'Braavos' } }),
    new ArgentMobileConnector(),
  ];

  return (
    <StarknetConfig
      chains={[sepolia, goerli]}
      provider={publicProvider()}
      connectors={connectors}
    >
      {children}
    </StarknetConfig>
  );
};

export default ProviderStarknet;
