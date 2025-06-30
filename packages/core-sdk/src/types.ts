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

import { Abi, ExtractAbiFunctionNames } from 'wagmi';

// D'autres types pourront être ajoutés ici, par exemple pour les transactions, les contrats, etc.

/**
 * Options de base pour lire un contrat intelligent.
 * @template TAbi L'ABI du contrat.
 * @template TFunctionName Le nom de la fonction à appeler.
 */
export interface ContractReadOptions<
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends ExtractAbiFunctionNames<TAbi, 'pure' | 'view'> = ExtractAbiFunctionNames<TAbi, 'pure' | 'view'>,
> {
  address: `0x${string}`;
  abi: TAbi;
  functionName: TFunctionName;
  args?: unknown[]; // Les arguments de la fonction, seront typés plus précisément par wagmi
  chainId?: number; // Pour spécifier une chaîne différente de celle connectée
  // Autres options de wagmi (blockNumber, cacheTime, etc.) peuvent être ajoutées ici
}

/**
 * Options de base pour écrire sur un contrat intelligent.
 * @template TAbi L'ABI du contrat.
 * @template TFunctionName Le nom de la fonction à appeler.
 */
export interface ContractWriteOptions<
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends ExtractAbiFunctionNames<TAbi, 'nonpayable' | 'payable'> = ExtractAbiFunctionNames<TAbi, 'nonpayable' | 'payable'>,
> {
  address: `0x${string}`;
  abi: TAbi;
  functionName: TFunctionName;
  args?: unknown[]; // Les arguments de la fonction
  value?: bigint; // Pour les fonctions payable
  chainId?: number; // Pour forcer une chaîne spécifique pour la transaction
  // Autres options de wagmi (gas, nonce, etc.) peuvent être ajoutées ici
}

/**
 * Options de base pour écouter les événements d'un contrat.
 * @template TAbi L'ABI du contrat.
 * @template TEventName Le nom de l'événement à écouter.
 */
export interface ContractEventOptions<
  TAbi extends Abi | readonly unknown[] = Abi,
  TEventName extends string | undefined = undefined, // wagmi peut inférer les noms d'événements
> {
  address: `0x${string}`;
  abi: TAbi;
  eventName?: TEventName;
  listener: (logs: any[]) => void; // Type de log plus précis à définir
  chainId?: number;
  // Autres options de wagmi (filters, etc.)
}
