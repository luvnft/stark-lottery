export const LOTTERY = {
  price_ticket: 1,
  jackpot: `5000+`,
};
export const WIN_PRICE = {
  match_3: `3`,
  match_4: `30`,
  match_5: `1000`,
  match_6: `5000+`,
};

export enum RPC_PROVIDER {
  MAINET = 'https://starknet-mainnet.public.blastapi.io/rpc/v0_7',
  TESTNET = 'https://starknet-sepolia.public.blastapi.io/rpc/v0_7',
  // TESTNET = 'https://free-rpc.nethermind.io/sepolia-juno/v0_7',
  // TESTNET = 'https://starknet-sepolia.reddio.com/rpc/v0_7',
}

// Example: 1 FRI => 10**-18 STRK
export function formatBalance(qty: bigint, decimals: number) {
  const balance = String('0').repeat(decimals) + qty.toString();
  const rightCleaned = balance.slice(-decimals).replace(/(\d)0+$/gm, '$1');
  const leftCleaned = BigInt(
    balance.slice(0, balance.length - decimals)
  ).toString();
  return leftCleaned + '.' + rightCleaned;
}
