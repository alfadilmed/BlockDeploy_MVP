```markdown
# Structure des Hooks WalletConnect - Module WalletConnect

**Document élaboré par : Team Primex Software**
**Site Web : https://primex-software.com**
**Version : 1.0**

---
**Signé : Team Primex Software – https://primex-software.com**
---

## Table des Matières

1.  [Introduction](#1-introduction)
2.  [Hook Principal : `useWalletConnect`](#2-hook-principal--usewalletconnect)
    *   [2.1 Objectif](#21-objectif)
    *   [2.2 État Géré (State)](#22-état-géré-state)
    *   [2.3 Fonctions Exposées (Actions)](#23-fonctions-exposées-actions)
    *   [2.4 Événements Gérés](#24-événements-gérés)
3.  [Exemple d'Utilisation (Pseudo-code)](#3-exemple-dutilisation-pseudo-code)
4.  [Structure de Fichier Envisagée](#4-structure-de-fichier-envisagée)
5.  [Considérations Techniques](#5-considérations-techniques)

## 1. Introduction

Ce document décrit la structure et la signature envisagées pour le hook principal `useWalletConnect.ts` (ou un service équivalent avec une façade React) au sein du module WalletConnect. Ce hook servira d'interface principale pour les dApps de BlockDeploy souhaitant intégrer la fonctionnalité de connexion via WalletConnect.

L'objectif est de fournir une API simple, robuste et réactive pour gérer le cycle de vie de la connexion WalletConnect.

## 2. Hook Principal : `useWalletConnect`

### 2.1 Objectif

Le hook `useWalletConnect` a pour but de :
*   Encapsuler la complexité de l'initialisation et de la gestion du client WalletConnect v2.
*   Fournir un état réactif concernant la connexion (statut, adresse, chainId).
*   Exposer des méthodes simples pour initier la connexion, la déconnexion, et demander des signatures.
*   Gérer les événements importants émis par le client WalletConnect (changement de compte, de réseau, déconnexion).

### 2.2 État Géré (State)

Le hook exposera les informations d'état suivantes :

*   `isConnected: boolean`: Indique si une session WalletConnect est active.
*   `isConnecting: boolean`: Indique si une tentative de connexion est en cours.
*   `address: string | null`: L'adresse du compte connecté (format hexadécimal, ex: `0x...`). `null` si non connecté.
*   `chainId: number | null`: L'ID de la chaîne du réseau connecté. `null` si non connecté.
*   `error: Error | string | null`: Contient une erreur si une opération a échoué.
*   `provider: ethers.providers.Web3Provider | viem.PublicClient | null`: Le provider Ethers.js ou Viem une fois la connexion établie, pour des interactions plus avancées. (Le type exact dépendra de la librairie choisie).
*   `signClient: SignClient | null`: Instance du client WalletConnect Sign (pourrait être interne et non directement exposé).
*   `web3Modal: Web3Modal | null`: Instance du Web3Modal (pourrait être interne).

### 2.3 Fonctions Exposées (Actions)

Le hook exposera les fonctions suivantes :

*   `connect: () => Promise<void>`:
    *   Initialise le client WalletConnect si ce n'est pas déjà fait.
    *   Ouvre le Web3Modal pour permettre à l'utilisateur de scanner le QR code ou de choisir un wallet.
    *   Gère l'établissement de la session.
    *   Met à jour l'état `address`, `chainId`, `isConnected`, `provider`.
*   `disconnect: () => Promise<void>`:
    *   Met fin à la session WalletConnect active.
    *   Réinitialise l'état (`address`, `chainId` à `null`, `isConnected` à `false`).
*   `signMessage: (message: string) => Promise<string>`:
    *   Demande au wallet connecté de signer un message (format UTF-8).
    *   Retourne la signature en cas de succès.
    *   Lève une erreur en cas d'échec ou de refus.
*   `sendTransaction: (transaction: Deferrable<TransactionRequest>) => Promise<TransactionResponse>` (Pourrait être dans une phase ultérieure au MVP) :
    *   Demande au wallet connecté de signer et d'envoyer une transaction.
    *   Nécessite une intégration plus poussée avec Ethers.js ou Viem.
    *   Retourne le hash de la transaction.

### 2.4 Événements Gérés

Le hook écoutera et réagira en interne aux événements suivants du client WalletConnect :

*   `session_proposal`: Géré lors du processus de connexion.
*   `session_update`: Pour mettre à jour les informations de session (ex: namespaces).
*   `session_extend`: Pour gérer l'extension de la durée de vie de la session.
*   `session_ping`: Pour répondre aux pings du wallet.
*   `session_delete`: Lorsque la session est supprimée (par le wallet ou la dApp), met à jour l'état `isConnected`.
*   `session_event`: Pour les événements émis par le wallet, notamment :
    *   `chainChanged`: Met à jour `chainId`.
    *   `accountsChanged`: Met à jour `address`. Si le tableau d'adresses est vide, cela peut signifier une déconnexion partielle du compte.
*   `modal_close`: Lorsque l'utilisateur ferme le modal sans se connecter.
*   `modal_error`: En cas d'erreur du modal.

## 3. Exemple d'Utilisation (Pseudo-code)

```typescript
// Dans un composant React de la dApp
import React, { useEffect } from 'react';
import { useWalletConnect } from '@blockdeploy/walletconnect-module'; // Chemin d'exemple

const WalletButton: React.FC = () => {
  const {
    connect,
    disconnect,
    signMessage,
    isConnected,
    isConnecting,
    address,
    chainId,
    error,
  } = useWalletConnect();

  useEffect(() => {
    if (error) {
      console.error("WalletConnect Error:", error);
      // Afficher une notification à l'utilisateur
    }
  }, [error]);

  const handleSign = async () => {
    try {
      const signature = await signMessage("Welcome to BlockDeploy!");
      alert(`Message signed: ${signature}`);
    } catch (e) {
      alert(`Sign message failed: ${e.message}`);
    }
  };

  if (isConnected && address) {
    return (
      <div>
        <p>Connected: {`${address.slice(0, 6)}...${address.slice(-4)}`}</p>
        <p>Chain ID: {chainId}</p>
        <button onClick={handleSign} disabled={isConnecting}>
          Sign Welcome Message
        </button>
        <button onClick={disconnect} disabled={isConnecting}>
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button onClick={connect} disabled={isConnecting}>
      {isConnecting ? 'Connecting...' : 'Connect with WalletConnect'}
    </button>
  );
};

export default WalletButton;

// Pour utiliser ce hook, le composant parent doit être enveloppé
// dans un <WalletConnectProvider> qui initialiserait le client et le contexte.
// Exemple:
// <WalletConnectProvider options={{ projectId: 'YOUR_PROJECT_ID', metadata: {...} }}>
//   <App />
// </WalletConnectProvider>
```

## 4. Structure de Fichier Envisagée

```
/packages/walletconnect-module/ (ou /lib/walletconnect/)
|-- /core/
|   |-- client.ts        // Initialisation et configuration du SignClient de WalletConnect et Web3Modal
|   |-- eventManager.ts  // Gestion centralisée des abonnements aux événements WC
|   `-- sessionManager.ts// Logique de persistance et de restauration de session
|
|-- /hooks/
|   |-- useWalletConnect.ts // Le hook décrit dans ce document
|   `-- index.ts
|
|-- /contexts/ (si une approche par contexte est choisie pour le provider)
|   `-- WalletConnectContext.tsx // Contexte et Provider React
|
|-- /types/
|   `-- index.ts           // Définitions TypeScript
|
`-- index.ts               // Export principal du module
```

## 5. Considérations Techniques

*   **Initialisation du Client :** Le client WalletConnect (SignClient/Web3Modal) devra être initialisé une seule fois au niveau racine de l'application (par exemple, dans `_app.tsx` pour Next.js) via un composant Provider si l'approche contexte est utilisée. Ce Provider mettra à disposition l'instance du client et l'état global via le hook `useWalletConnect`.
*   **Gestion des Erreurs :** Le hook devra gérer les erreurs de manière robuste et les exposer via l'état `error` pour que les dApps puissent réagir.
*   **Asynchronicité :** Toutes les opérations interagissant avec le wallet (connect, disconnect, signMessage) sont asynchrones et devront être gérées avec `async/await`. L'état `isConnecting` aidera à gérer l'UI pendant ces opérations.
*   **Dépendances Externes :** Le hook dépendra des SDKs de WalletConnect v2 et potentiellement d'Ethers.js ou Viem pour la création du provider.
*   **Testabilité :** La logique du hook devra être conçue pour être testable, en mockant les dépendances externes comme le client WalletConnect.

---
**Signé : Team Primex Software – https://primex-software.com**
```
