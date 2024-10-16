import { ABIS } from '@/abis';
import { CONTRACT_ADDRESS } from '@/config/contractAddress';
import { formatBalance, RPC_PROVIDER } from '@/config/value';

import { useEffect, useState } from 'react';
import { Contract, Provider } from 'starknet';

interface IProps {
  address: string | null;
  token?: string;
  provider?: string;
}
export const useBalanceCustom = ({
  address,
  token = CONTRACT_ADDRESS.strk,
  provider = RPC_PROVIDER.MAINET,
}: IProps) => {
  const [balance, setBalance] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchBalance = async () => {
    const contractBalance = new Contract(
      ABIS.ErcSierraABI.abi,
      token,
      new Provider({ nodeUrl: provider })
    );
    if (!address) return;
    setIsLoading(true);
    const initialValue = await contractBalance.balanceOf(address);
    const formatBalanceData = parseFloat(formatBalance(initialValue, 18));
    setBalance(() => formatBalanceData);
    setIsLoading(false);
    return formatBalanceData;
  };

  useEffect(() => {
    const handleLoadBlance = async () => {
      if (address) {
        await fetchBalance();
      }
    };
    handleLoadBlance();
  }, [address]);
  return {
    isLoading,
    balance,
    fetchBalance,
  };
};
