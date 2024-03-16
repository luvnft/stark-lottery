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
    new InjectedConnector({ options: { id: 'argentX', name: 'Argent' } }), // Suggest Injected Conenctor
    new InjectedConnector({ options: { id: 'braavos', name: 'Braavos' } }),
    new ArgentMobileConnector(), // Mobile Scan Argent Working - Display Type Modal
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
