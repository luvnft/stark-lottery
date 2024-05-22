import { Chain, mainnet, sepolia } from '@starknet-react/chains';
import {
  InjectedConnector,
  StarknetConfig,
  jsonRpcProvider,
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
  function rpc(chain: Chain) {
    return {
      // nodeUrl: `https://starknet-mainnet.g.alchemy.com/v2/d9queTbdIieL2dGfWalpnShIHLRtHczH`,
      // nodeUrl:
      //   'https://starknet-mainnet.infura.io/v3/7d290a76648a4bac93e5f98aa0d463ce',
      nodeUrl: 'https://starknet-mainnet.public.blastapi.io/rpc/v0_7',
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
