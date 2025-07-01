# BlockDeploy Core SDK (`@blockdeploy/core-sdk`)

Ce package contient le SDK principal pour interagir avec les fonctionnalités Web3 au sein de l'écosystème BlockDeploy. Il fournit des outils pour la connexion wallet, l'interaction avec les contrats, et d'autres utilitaires essentiels.

## Table des Matières

1.  [Installation](#installation)
2.  [Fonctionnalités Principales](#fonctionnalités-principales)
3.  [Utilisation](#utilisation)
    *   [Mise en Place du Provider](#mise-en-place-du-provider)
    *   [Hooks Disponibles](#hooks-disponibles)
        *   [`useBlockDeployWallet`](#useblockdeploywallet)
        *   [`useBdpTokenBalance`](#usebdptokenbalance)
        *   [`useDeployToken`](#usedeploytoken)
        *   [`useBlockDeployContractRead`](#useblockdeploycontractread) (et autres placeholders)
        *   [`useBlockDeploySendTransaction`](#useblockdeploysendtransaction)
4.  [Artefacts de Contrat](#artefacts-de-contrat)
5.  [Configuration](#configuration)
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
Consultez `packages/core-sdk/src/hooks.ts` (interface `UseBlockDeployWalletReturn`) pour la structure détaillée.


#### `useBdpTokenBalance`

Hook dédié pour récupérer le solde du token $BDPY pour une adresse donnée (par défaut l'adresse connectée).

```tsx
import { useBdpTokenBalance } from '@blockdeploy/core-sdk';

function BdpyBalanceInfo() {
  const { account } = useBlockDeployWallet(); // Pour obtenir l'adresse si non passée au hook
  const { balance, isLoading, isError, error } = useBdpTokenBalance({ address: account.address });
  // ou simplement useBdpTokenBalance() pour le compte connecté.

  if (isLoading) return <p>Chargement du solde $BDPY...</p>;
  if (isError) return <p>Erreur de chargement du solde $BDPY: {error?.message}</p>;

  return (
    <p>
      Solde $BDPY : {balance ? `${balance.formatted} ${balance.symbol}` : 'Non disponible'}
    </p>
  );
}
```
**Arguments Optionnels pour `useBdpTokenBalance`:**
*   `address?: 0x${string}`: L'adresse pour laquelle récupérer le solde. Par défaut, l'adresse du portefeuille connecté.
*   `chainId?: number`: L'ID de la chaîne sur laquelle vérifier le solde. Par défaut, la chaîne du portefeuille connecté.

**Valeurs Retournées :**
*   `balance?: { decimals, formatted, symbol, value }`: Informations sur le solde du token $BDPY.
*   `isLoading: boolean`: État de chargement.
*   `isError: boolean`: Si une erreur est survenue.
*   `error: Error | null`: L'objet d'erreur.


#### `useDeployToken`

Hook pour déployer un nouveau contrat (par exemple, un token ERC-20).

```tsx
import { useDeployToken, minimalERC20Abi, minimalERC20Bytecode, DeployTokenArgs } from '@blockdeploy/core-sdk';
import { parseUnits } from 'ethers'; // Ou un utilitaire viem

function DeployComponent() {
  const {
    deployToken,
    deployTxHash,
    isDeploying,
    isConfirming,
    isConfirmed,
    contractAddress,
    deployError,
    confirmationError
  } = useDeployToken();

  const handleDeploy = async () => {
    const name = "My Test Token";
    const symbol = "MTT";
    const initialSupplyRaw = "1000000"; // Unités entières
    const decimals = 18; // Assurez-vous que le bytecode est compilé pour ces décimales

    // Convertir la supply avec les décimales
    const initialSupplyWithDecimals = parseUnits(initialSupplyRaw, decimals);

    const args: DeployTokenArgs = {
      name,
      symbol,
      initialSupply: initialSupplyWithDecimals,
      contractAbi: minimalERC20Abi,
      contractBytecode: minimalERC20Bytecode, // REMPLACER PAR UN VRAI BYTECODE EN PRODUCTION
    };
    await deployToken(args);
  };

  return (
    <div>
      <button onClick={handleDeploy} disabled={isDeploying || isConfirming}>
        {isDeploying ? 'Déploiement...' : (isConfirming ? 'Confirmation...' : 'Déployer Token')}
      </button>
      {deployTxHash && <p>Hash de Transaction : {deployTxHash}</p>}
      {contractAddress && <p>Contrat Déployé : {contractAddress}</p>}
      {deployError && <p>Erreur de déploiement : {deployError.message}</p>}
      {confirmationError && <p>Erreur de confirmation : {confirmationError.message}</p>}
      {isConfirmed && contractAddress && <p>Déploiement confirmé !</p>}
    </div>
  );
}
```
**Arguments pour `deployToken(args: DeployTokenArgs)`:**
*   `name: string`: Nom du token.
*   `symbol: string`: Symbole du token.
*   `initialSupply: bigint`: Supply initiale (déjà ajustée avec les décimales).
*   `contractAbi: Abi`: ABI du contrat à déployer.
*   `contractBytecode: 0x${string}`: Bytecode du contrat à déployer.

**Valeurs Retournées :**
*   `deployToken: (args: DeployTokenArgs) => Promise<void>`: Fonction pour initier le déploiement.
*   `deployTxHash?: 0x${string}`: Hash de la transaction de déploiement.
*   `isDeploying: boolean`: Vrai si la transaction est en cours d'envoi au portefeuille / en attente de signature.
*   `deployError?: Error | null`: Erreur lors de l'initiation du déploiement.
*   `isConfirming: boolean`: Vrai pendant que la transaction est minée.
*   `isConfirmed: boolean`: Vrai quand la transaction est confirmée.
*   `confirmationError?: Error | null`: Erreur lors de la phase de confirmation.
*   `contractAddress?: 0x${string}`: Adresse du contrat déployé.
*   `receipt?: TransactionReceipt`: Reçu complet de la transaction.


#### `useBlockDeployContractRead` (Implémentation de Base)

Hook pour lire des données d'un smart contract.
```tsx
import { useBlockDeployContractRead, minimalERC20Abi } from '@blockdeploy/core-sdk';

function TokenName({ contractAddress }) {
  const { data: name, isLoading, error } = useBlockDeployContractRead({
    address: contractAddress,
    abi: minimalERC20Abi,
    functionName: 'name',
    enabled: !!contractAddress, // Exécuter seulement si l'adresse est fournie
  });

  if (isLoading) return <p>Chargement du nom...</p>;
  if (error) return <p>Erreur: {error.message}</p>;
  return <p>Nom du Token: {String(name)}</p>;
}
```
Consultez `packages/core-sdk/src/types.ts` (interface `ContractReadOptions`) et `contracts.ts` pour plus de détails. Les placeholders pour `useBlockDeployContractWrite` et `useBlockDeployContractEvent` existent aussi.


#### `useBlockDeploySendTransaction`

Hook pour envoyer des transactions simples (transfert d'ETH par exemple).
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

## 4. Artefacts de Contrat

Le SDK exporte également des ABIs et (placeholders de) bytecodes pour certains contrats standards.

*   **`minimalERC20Abi`**: ABI pour un contrat ERC-20 de base.
*   **`minimalERC20Bytecode`**: **Placeholder de bytecode** pour un contrat ERC-20.
    **ATTENTION : Ce bytecode est un placeholder et DOIT être remplacé par un bytecode réel et compilé pour que la fonctionnalité de déploiement de token (`useDeployToken`) soit opérationnelle.** Un avertissement est émis dans la console si ce placeholder est utilisé.

Ces artefacts se trouvent dans `packages/core-sdk/src/contracts/abis/MinimalERC20.ts`.

## 5. Configuration

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
