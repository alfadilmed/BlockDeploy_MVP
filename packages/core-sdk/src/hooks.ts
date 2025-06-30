'use client'; // Les hooks doivent être utilisables dans les Client Components

import {
  useAccount,
  useConnect,
  useDisconnect,
  useBalance,
  type Connector,
} from 'wagmi';
import { BDPY_TOKEN_ADDRESS } from './config';
import type { AccountInfo } from './types'; // AccountInfo n'est plus directement la structure retournée

// Nouvelle structure pour le retour du hook principal
export interface UseBlockDeployWalletReturn {
  account: {
    address?: `0x${string}`;
    chainId?: number;
    isConnected: boolean;
    isConnecting: boolean;
    isReconnecting: boolean;
    isDisconnected: boolean;
    status: 'connected' | 'connecting' | 'reconnecting' | 'disconnected';
  };
  nativeBalance?: {
    decimals: number;
    formatted: string;
    symbol: string;
    value: bigint;
  };
  bdpyBalance?: {
    decimals: number;
    formatted: string;
    symbol: string;
    value: bigint;
  };
  isLoadingBdpyBalance: boolean;
  connect: (args: { connector: Connector; chainId?: number }) => void;
  disconnect: () => void;
  connectors: readonly Connector[];
  errorConnecting?: Error | null;
  isConnectingTo: (connectorId: string) => boolean; // Pour vérifier si on se connecte à un connecteur spécifique
}

export function useBlockDeployWallet(): UseBlockDeployWalletReturn {
  const { address, chainId, isConnected, isConnecting, isDisconnected, isReconnecting, status } = useAccount();
  const { connect, connectors, error: errorConnecting, pendingConnector, variables } = useConnect();
  const { disconnect } = useDisconnect();

  const { data: nativeBalance } = useBalance({
    address: address,
    chainId: chainId,
  });

  const { data: bdpyTokenBalance, isLoading: isLoadingBdpyBalance } = useBalance({
    address: address,
    token: BDPY_TOKEN_ADDRESS,
    chainId: chainId,
    query: {
      enabled: !!BDPY_TOKEN_ADDRESS && !!address && status === 'connected',
    },
  });

  const isConnectingTo = (connectorId: string): boolean => {
    return isConnecting && pendingConnector?.id === connectorId;
  };

  return {
    account: {
      address,
      chainId,
      isConnected,
      isConnecting,
      isReconnecting,
      isDisconnected,
      status,
    },
    nativeBalance: nativeBalance
      ? {
          decimals: nativeBalance.decimals,
          formatted: nativeBalance.formatted,
          symbol: nativeBalance.symbol,
          value: nativeBalance.value,
        }
      : undefined,
    bdpyBalance: bdpyTokenBalance
      ? {
          decimals: bdpyTokenBalance.decimals,
          formatted: bdpyTokenBalance.formatted,
          symbol: bdpyTokenBalance.symbol,
          value: bdpyTokenBalance.value,
        }
      : undefined,
    isLoadingBdpyBalance,
    connect: (args) => connect(args),
    disconnect: () => disconnect(),
    connectors,
    errorConnecting: errorConnecting instanceof Error ? errorConnecting : null,
    isConnectingTo,
  };
}

// Reste du fichier (useBlockDeploySendTransaction) inchangé pour l'instant
import { useSendTransaction } from 'wagmi';
import { type SendTransactionMutate } from 'wagmi/query';

export function useBlockDeploySendTransaction() {
  const {
    data: hash,
    isPending: isSendingTransaction,
    sendTransactionAsync,
    error: transactionError,
  } = useSendTransaction();

  const sendBlockDeployTransaction: SendTransactionMutate<any, any> = (args) => {
    // @ts-ignore TODO: Fix type for SendTransactionMutate
    return sendTransactionAsync(args);
  };

  return {
    sendTransaction: sendBlockDeployTransaction,
    isSendingTransaction,
    transactionHash: hash,
    transactionError,
  };
}
