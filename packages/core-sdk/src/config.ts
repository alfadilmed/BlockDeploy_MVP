import { http, createConfig } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { walletConnect } from 'wagmi/connectors';

// TODO: Remplacer par le vrai Project ID obtenu depuis WalletConnect Cloud
const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'YOUR_WALLETCONNECT_PROJECT_ID';

if (walletConnectProjectId === 'YOUR_WALLETCONNECT_PROJECT_ID') {
  console.warn(
    'Attention: Le projectId de WalletConnect est un placeholder. ' +
    'Veuillez fournir un NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID via les variables d\'environnement.'
  );
}

export const wagmiConfig = createConfig({
  chains: [sepolia], // Configurez ici les chaînes supportées. Sepolia pour les tests.
  connectors: [
    walletConnect({
      projectId: walletConnectProjectId,
      metadata: {
        name: 'BlockDeploy',
        description: 'BlockDeploy Platform - Connect your wallet',
        url: 'https://blockdeploy.io', // URL de votre dApp
        icons: ['https://blockdeploy.io/favicon.ico'], // URL de l'icône de votre dApp
      },
      // showQrModal: true, // Par défaut à true. Mettre à false si vous gérez le modal QR vous-même.
    }),
    // Vous pouvez ajouter d'autres connecteurs ici (MetaMask, Coinbase Wallet, etc.)
    // Par exemple, pour le connecteur injecté (MetaMask) :
    // injected({ shimDisconnect: true }),
  ],
  transports: {
    [sepolia.id]: http(), // Utilisez http() pour le transport par défaut (Alchemy, Infura via leurs URLs RPC)
    // Pour des providers spécifiques :
    // [sepolia.id]: http(`https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`),
  },
  ssr: true, // Important pour Next.js pour éviter les erreurs d'hydratation
});

// Définition des chaînes pour une utilisation ultérieure si besoin
export const chains = {
  sepolia,
  // mainnet, // etc.
};

// Adresse du token $BDPY (placeholder, à remplacer par la vraie adresse)
// TODO: Obtenir la vraie adresse du token $BDPY
export const BDPY_TOKEN_ADDRESS: `0x${string}` | undefined = undefined; // Exemple: '0x...';
if (!BDPY_TOKEN_ADDRESS) {
    console.warn('Adresse du token $BDPY non définie dans core-sdk/src/config.ts');
}

// ABI minimal pour ERC20 (pour lire le solde et les décimales)
export const erc20AbiMinimal = [
  {
    "constant": true,
    "inputs": [{"name": "_owner", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"name": "balance", "type": "uint256"}],
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [{"name": "", "type": "uint8"}],
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "symbol",
    "outputs": [{"name": "", "type": "string"}],
    "type": "function"
  }
] as const; // `as const` est important pour que wagmi infère correctement les types d'ABI strictes
