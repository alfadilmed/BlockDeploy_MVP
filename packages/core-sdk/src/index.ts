// Configuration et Providers
export { wagmiConfig, blockDeployWagmiConfig, chains, BDPY_TOKEN_ADDRESS, erc20AbiMinimal } from './config';
export { BlockDeployProviders, blockDeployQueryClient } from './providers';

// Hooks
export { useBlockDeployWallet } from './hooks';
export { useBlockDeploySendTransaction } from './hooks'; // Exemple d'autre hook

// Types
export * from './types';

// Utilitaires
export * from './utils';

// Potentiellement, des connecteurs spécifiques si vous les personnalisez
// export * from './connectors';

// Version du SDK (peut être utile)
export const CORE_SDK_VERSION = '0.1.0';
