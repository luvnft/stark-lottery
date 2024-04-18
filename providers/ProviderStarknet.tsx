import { Chain, mainnet, sepolia } from '@starknet-react/chains';
import {
  InjectedConnector,
  StarknetConfig,
  jsonRpcProvider,
} from '@starknet-react/core';
import React, { PropsWithChildren } from 'react';

import { ArgentMobileConnector } from 'starknetkit/argentMobile';

const ProviderStarknet = ({ children }: PropsWithChildren) => {
  const connectors = [
    new InjectedConnector({ options: { id: 'argentX', name: 'Argent' } }), // Suggest Injected Conenctor
    new InjectedConnector({ options: { id: 'braavos', name: 'Braavos' } }),
    new ArgentMobileConnector(), // Mobile Scan Argent Working - Display Type Modal
  ];
  function rpc(chain: Chain) {
    return {
      nodeUrl: `https://starknet-mainnet.g.alchemy.com/v2/d9queTbdIieL2dGfWalpnShIHLRtHczH`,
    };
  }

  const provider = jsonRpcProvider({ rpc });
  return (
    <StarknetConfig
      chains={[mainnet]}
      provider={provider}
      connectors={connectors}
    >
      {children}
    </StarknetConfig>
  );
};

export default ProviderStarknet;
