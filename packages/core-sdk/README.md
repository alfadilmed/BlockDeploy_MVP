# BlockDeploy Core SDK (`@blockdeploy/core-sdk`)

Ce package contient le SDK principal pour interagir avec les fonctionnalités Web3 au sein de l'écosystème BlockDeploy. Il fournit des outils pour la connexion wallet, l'interaction avec les contrats, et d'autres utilitaires essentiels.

## Table des Matières

1.  [Installation](#installation)
2.  [Fonctionnalités Principales](#fonctionnalités-principales)
3.  [Utilisation](#utilisation)
    *   [Mise en Place du Provider](#mise-en-place-du-provider)
    *   [Hooks Disponibles](#hooks-disponibles)
        *   [`useBlockDeployWallet`](#useblockdeploywallet)
        *   [`useBlockDeploySendTransaction`](#useblockdeploysendtransaction)
4.  [Configuration](#configuration)
    *   [Variables d'Environnement](#variables-denvironnement)
5.  [Développement](#développement)
    *   [Scripts](#scripts)
6.  [Contribution](#contribution)

## 1. Installation

Ce package est géré au sein du monorepo BlockDeploy. Les dépendances sont installées via la commande `yarn install` à la racine du monorepo.

Si vous deviez l'utiliser comme un package NPM externe (pas le cas actuellement) :
```bash
# yarn add @blockdeploy/core-sdk ethers wagmi @tanstack/react-query react
# npm install @blockdeploy/core-sdk ethers wagmi @tanstack/react-query react
```

## 2. Fonctionnalités Principales

*   Gestion de la connexion portefeuille multi-wallet (WalletConnect par défaut, extensible).
*   Hooks React pour accéder facilement aux informations du compte, soldes, et actions portefeuille.
*   Configuration centralisée pour les chaînes supportées et les providers.
*   Types TypeScript pour une meilleure expérience de développement.

## 3. Utilisation

### Mise en Place du Provider

Pour utiliser les hooks et fonctionnalités du SDK, votre application React (ou Next.js) doit être enveloppée par le `BlockDeployProviders`.

Typiquement, dans votre fichier principal `_app.tsx` (pour Next.js Pages Router) ou `layout.tsx` (pour Next.js App Router) :

```tsx
// Pour Next.js App Router (apps/landing/src/app/layout.tsx)
'use client'; // Si ce layout est un client component

import { BlockDeployProviders } from '@blockdeploy/core-sdk';
// ... autres imports

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <BlockDeployProviders>
          {/* Votre application ici (Header, main content, Footer) */}
          {children}
        </BlockDeployProviders>
      </body>
    </html>
  );
}
```

### Hooks Disponibles

#### `useBlockDeployWallet`

Ce hook fournit les informations sur le compte connecté et les fonctions pour interagir avec le portefeuille.

```tsx
import { useBlockDeployWallet } from '@blockdeploy/core-sdk';

function WalletInfo() {
  const {
    account,
    nativeBalance,
    bdpyBalance, // Solde du token BDPY
    isLoadingBdpyBalance,
    connect,
    disconnect,
    connectors,
    isConnectingTo,
    errorConnecting,
  } = useBlockDeployWallet();

  if (account.isConnecting) return <p>Connecting...</p>;
  if (errorConnecting) return <p>Error connecting: {errorConnecting.message}</p>;

  if (account.isConnected && account.address) {
    return (
      <div>
        <p>Connected: {account.address} (Chain ID: {account.chainId})</p>
        <p>Native Balance: {nativeBalance?.formatted} {nativeBalance?.symbol}</p>
        {bdpyBalance && (
          <p>BDPY Balance: {isLoadingBdpyBalance ? 'Loading...' : `${bdpyBalance.formatted} ${bdpyBalance.symbol}`}</p>
        )}
        <button onClick={() => disconnect()}>Disconnect</button>
      </div>
    );
  }

  return (
    <div>
      {connectors.map((connector) => (
        <button
          key={connector.id}
          onClick={() => connect({ connector })}
          disabled={isConnectingTo(connector.id)}
        >
          {isConnectingTo(connector.id) ? 'Connecting...' : `Connect with ${connector.name}`}
        </button>
      ))}
    </div>
  );
}
```

**Valeurs Retournées par `useBlockDeployWallet`:**
Consultez le fichier `packages/core-sdk/src/hooks.ts` (interface `UseBlockDeployWalletReturn`) pour la structure détaillée.

#### `useBlockDeploySendTransaction`

Hook pour envoyer des transactions.
```tsx
import { useBlockDeploySendTransaction } from '@blockdeploy/core-sdk';
import { parseEther } from 'ethers'; // ethers v6

function SendTxComponent() {
  const { sendTransaction, isSendingTransaction, transactionHash, transactionError } = useBlockDeploySendTransaction();

  const handleSend = async () => {
    try {
      await sendTransaction({
        to: '0xRecipientAddress...',
        value: parseEther('0.01'), // Envoyer 0.01 ETH
      });
    } catch (e) {
      console.error("Transaction failed", e);
    }
  };

  return (
    <div>
      <button onClick={handleSend} disabled={isSendingTransaction}>
        {isSendingTransaction ? 'Sending...' : 'Send 0.01 ETH'}
      </button>
      {transactionHash && <p>Transaction Hash: {transactionHash}</p>}
      {transactionError && <p>Error: {transactionError.message}</p>}
    </div>
  );
}
```

## 4. Configuration

La configuration de `wagmi` (chaînes, providers, connecteurs) se trouve dans `packages/core-sdk/src/config.ts`.

### Variables d'Environnement

*   `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`: **Requis.** Votre Project ID de WalletConnect Cloud. Doit être défini dans l'environnement de l'application qui utilise ce SDK (par exemple, la landing page).
*   `NEXT_PUBLIC_ALCHEMY_ID` (Optionnel): Si vous utilisez Alchemy comme provider RPC spécifique.
*   `BDPY_TOKEN_ADDRESS` (Optionnel): L'adresse du contrat du token $BDPY. Est actuellement un placeholder dans `config.ts`. Mettez à jour ce fichier ou fournissez via une variable d'environnement si vous préférez une configuration dynamique.

**Note:** Les variables préfixées par `NEXT_PUBLIC_` sont accessibles côté client dans les applications Next.js.

## 5. Développement

Ce package fait partie du monorepo BlockDeploy.

### Scripts

*   `yarn workspace @blockdeploy/core-sdk build`: Compile le SDK TypeScript en JavaScript (dans le dossier `dist/`).
*   `yarn workspace @blockdeploy/core-sdk dev`: Compile le SDK en mode watch.
*   `yarn workspace @blockdeploy/core-sdk lint`: Exécute ESLint pour ce package.

## 6. Contribution

Suivez les directives de contribution du monorepo BlockDeploy. Assurez-vous que tout nouveau code est typé, testé (si applicable) et documenté.

---
**Signé : Team Primex Software – https://primex-software.com**
