import { Address } from 'wagmi';

export interface AccountInfo {
  address?: Address;
  isConnected: boolean;
  isConnecting: boolean;
  isDisconnected: boolean;
  chainId?: number;
  balance?: {
    decimals: number;
    formatted: string;
    symbol: string;
    value: bigint;
  };
}

// D'autres types pourront être ajoutés ici, par exemple pour les transactions, les contrats, etc.
// export interface TransactionArgs { ... }
// export interface ContractReadArgs { ... }
// export interface ContractWriteArgs { ... }
