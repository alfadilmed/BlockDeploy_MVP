// Configuration et Providers
export { wagmiConfig, blockDeployWagmiConfig, chains, BDPY_TOKEN_ADDRESS, erc20AbiMinimal } from './config';
export { BlockDeployProviders, blockDeployQueryClient } from './providers';

// Hooks
export { useBlockDeployWallet } from './hooks';
export { useBdpTokenBalance } from './hooks'; // Exporter le nouveau hook
export { useBlockDeploySendTransaction } from './hooks'; // Exemple d'autre hook

// Types
export * from './types';
export type { ContractReadOptions, ContractWriteOptions, ContractEventOptions } from './types'; // Ré-exporter explicitement pour clarté

// Contract Interaction Hooks (Placeholders)
export {
  useBlockDeployContractRead,
  useBlockDeployContractWrite,
  useBlockDeployContractEvent,
  useDeployToken,
  // Launchpad Hooks
  useCreateLaunchpad,
  useLaunchpadBuy,
  useLaunchpadStatus,
  useLaunchpadOwnerActions // Exporter le nouveau hook pour les actions propriétaire
} from './contracts';
export type { DeployTokenArgs, CreateLaunchpadArgs, LaunchpadBuyArgs, LaunchpadOwnerActionParams } from './contracts';

// ABIs et Bytecodes (pourraient être dans un sous-export si nombreux)
export { minimalERC20Abi, minimalERC20Bytecode } from './contracts/abis/MinimalERC20';
export { simpleLaunchpadAbi, simpleLaunchpadBytecode } from './contracts/abis/SimpleLaunchpad';

// Utilitaires
export * from './utils';

// Potentiellement, des connecteurs spécifiques si vous les personnalisez
// export * from './connectors';

// Version du SDK (peut être utile)
export const CORE_SDK_VERSION = '0.1.0';
