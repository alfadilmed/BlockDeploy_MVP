```markdown
# Module : WalletConnect

**Document élaboré par : Team Primex Software**
**Site Web : https://primex-software.com**
**Version du Module : 1.0.0**

---
**Signé : Team Primex Software – https://primex-software.com**
---

## Table des Matières

1.  [Description et Objectifs](#1-description-et-objectifs)
2.  [Fonctionnalités (MVP et Futures)](#2-fonctionnalités-mvp-et-futures)
    *   [2.1 MVP](#21-mvp)
    *   [2.2 Futures](#22-futures)
3.  [Technologies Utilisées](#3-technologies-utilisées)
4.  [Structure du Module](#4-structure-du-module)
5.  [Intégration Prévue](#5-intégration-prévue)
6.  [Composants Clés / Services](#6-composants-clés--services)
7.  [Séquence d'Interaction Utilisateur (ASCII)](#7-séquence-dinteraction-utilisateur-ascii)
8.  [Installation (pour contributeurs)](#8-installation-pour-contributeurs)
9.  [Tests](#9-tests)
10. [Contribution](#10-contribution)

## 1. Description et Objectifs

Le module **WalletConnect** a pour objectif de fournir une méthode standardisée et sécurisée permettant aux utilisateurs de connecter leurs wallets mobiles à la plateforme BlockDeploy et à ses dApps. Il s'agit d'un composant crucial pour l'interaction avec la blockchain, notamment pour les utilisateurs qui préfèrent gérer leurs actifs via des applications mobiles dédiées plutôt que des extensions de navigateur.

**Objectifs principaux :**
*   **Interopérabilité :** Permettre la connexion avec une large gamme de wallets mobiles supportant le protocole WalletConnect.
*   **Expérience Utilisateur Fluide :** Offrir un processus de connexion simple et intuitif via QR code ou deeplinking.
*   **Sécurité :** S'appuyer sur le protocole WalletConnect v2, qui offre des améliorations en termes de sécurité et de flexibilité par rapport à la v1.
*   **Modularité :** Concevoir le module comme un service ou un ensemble de hooks facilement intégrables par les autres dApps de BlockDeploy.
*   **Gestion de Session :** Maintenir l'état de la connexion et permettre la déconnexion.

## 2. Fonctionnalités (MVP et Futures)

### 2.1 MVP (Minimum Viable Product)

*   **Initialisation du client WalletConnect v2 :** Configuration avec l'ID de projet requis (ProjectID de WalletConnect Cloud).
*   **Affichage du QR Code :** Génération et affichage d'un QR code pour la connexion via wallet mobile.
*   **Gestion de la Connexion :**
    *   Établissement de la session avec le wallet.
    *   Récupération de l'adresse du compte connecté et du Chain ID.
*   **Gestion de la Déconnexion :** Permettre à l'utilisateur de mettre fin à la session WalletConnect.
*   **Persistance de Session (Basique) :** Tenter de restaurer une session active au rechargement de la page (via localStorage).
*   **Signature de Message Simple :** Capacité de demander au wallet connecté de signer un message textuel (UTF-8).
*   **Changement de Compte/Réseau (Notification) :** Détecter et notifier l'application si l'utilisateur change de compte ou de réseau dans son wallet.

### 2.2 Futures

*   **Support Deeplinking avancé :** Pour une redirection plus fluide vers les wallets mobiles.
*   **Signature de Transactions Complexes :** Faciliter la signature de différents types de transactions requises par les dApps de BlockDeploy.
*   **Gestion Multi-chaînes Améliorée :** Gestion plus fine des changements de réseaux et des permissions par chaîne.
*   **Interface Utilisateur Personnalisable :** Options pour adapter l'apparence du modal de connexion.
*   **Notifications d'Événements Wallet :** Système d'événements plus riche pour informer les dApps des actions du wallet.

## 3. Technologies Utilisées

*   **WalletConnect v2 SDK :**
    *   `@walletconnect/web3modal` (ou `@walletconnect/modal` si une UI custom est préférée) : Pour l'interface utilisateur du modal de connexion.
    *   `@walletconnect/sign-client` (ou les clients spécifiques aux providers ethers/viem) : Pour la logique de communication du protocole.
*   **JavaScript/TypeScript :** Langage de développement principal.
*   **Ethers.js (v5/v6) ou Viem :** Librairie pour interagir avec la blockchain une fois la connexion établie (formater les demandes de signature, etc.).
*   **React (v18+) / Next.js :** Contexte dans lequel ce module sera principalement utilisé au sein de BlockDeploy. Le module lui-même sera agnostique au framework autant que possible, mais des wrappers/hooks React seront fournis.

## 4. Structure du Module

Ce module sera principalement un ensemble de services et de hooks frontend. Il ne nécessite pas de backend propre.

**Arborescence envisagée (dans `packages/walletconnect-module` ou `lib/walletconnect`) :**
```
/walletconnect-module/
|-- /core/                     # Logique principale de WalletConnect
|   |-- client.ts              # Initialisation et gestion du client WalletConnect
|   |-- session.ts             # Gestion des sessions (connexion, déconnexion, persistance)
|   `-- utils.ts               # Fonctions utilitaires
|
|-- /hooks/                    # Hooks React pour une intégration facile
|   |-- useWalletConnect.ts    # Hook principal gérant l'état et les actions
|   `-- index.ts
|
|-- /providers/                # (Optionnel) Wrapper de provider Ethers/Viem
|   `-- WalletConnectProvider.ts
|
|-- /types/                    # Définitions TypeScript spécifiques
|   `-- index.ts
|
|-- index.ts                   # Point d'entrée principal du module
`-- README.md                  # Ce fichier
```

## 5. Intégration Prévue

Le module WalletConnect sera conçu pour être facilement importé et utilisé par toutes les dApps du frontend de BlockDeploy qui nécessitent une interaction avec le wallet de l'utilisateur.

**Exemple d'utilisation via le hook `useWalletConnect` :**
```typescript
import { useWalletConnect } from '@blockdeploy/walletconnect-module'; // Chemin d'exemple

function MyDApp() {
  const { connect, disconnect, address, chainId, signMessage, isConnected, provider } = useWalletConnect();

  if (!isConnected) {
    return <button onClick={connect}>Connect with WalletConnect</button>;
  }

  return (
    <div>
      <p>Connected: {address} on Chain ID: {chainId}</p>
      <button onClick={() => signMessage("Hello BlockDeploy!")}>Sign Message</button>
      <button onClick={disconnect}>Disconnect</button>
      {/* Utiliser le provider pour des interactions plus complexes */}
    </div>
  );
}
```

## 6. Composants Clés / Services

*   **`WalletConnectClient` (dans `core/client.ts`) :**
    *   Responsable de l'initialisation du client Sign ou Web3Modal.
    *   Gère la configuration (ProjectID, métadonnées de la dApp).
    *   Expose les méthodes pour s'abonner aux événements du modal et du client.
*   **`useWalletConnect` (Hook - dans `hooks/useWalletConnect.ts`) :**
    *   Encapsule la logique de connexion, déconnexion, gestion d'état (adresse, chainId, statut de connexion).
    *   Fournit des fonctions simplifiées pour interagir avec le wallet (ex: `signMessage`, `sendTransaction` - future).
    *   Gère la persistance de la session.
*   **`Web3Modal` (UI Component - fourni par WalletConnect) :**
    *   Le modal qui affiche le QR code et les options de connexion. Son apparence peut être personnalisée via des thèmes.

## 7. Séquence d'Interaction Utilisateur (ASCII)

1.  **Utilisateur clique sur "Connect Wallet" sur une dApp BlockDeploy.**
    ```
    [BlockDeploy dApp Page]
        +---------------------+
        | ... contenu dApp ...|
        | [Connect Wallet Btn]|
        +---------------------+
    ```
2.  **Le `useWalletConnect.connect()` est appelé, le Web3Modal s'affiche.**
    ```
    [BlockDeploy dApp Page (Modal Overlay)]
        +-----------------------------------+
        |        Connect your Wallet        |
        |                                   |
        |      [   QR CODE DISPLAY   ]      |
        |                                   |
        | [Copy to clipboard] [Mobile Wallets] |
        +-----------------------------------+
    ```
3.  **Utilisateur scanne le QR Code avec son wallet mobile OU sélectionne un wallet (si deeplink configuré).**
    ```
    [Mobile Wallet App]
        +-----------------------------------+
        |      Approve Connection to        |
        |      "BlockDeploy Platform" ?     |
        |                                   |
        |      [Cancel]      [Approve]      |
        +-----------------------------------+
    ```
4.  **Connexion établie. Modal se ferme. La dApp se met à jour avec l'adresse/chainId.**
    ```
    [BlockDeploy dApp Page]
        +------------------------------------------+
        | Welcome, [0x123...abc] (Chain: 1)        |
        | ... contenu dApp interactif ...          |
        | [Sign Message Btn] [Disconnect Btn]      |
        +------------------------------------------+
    ```
5.  **Utilisateur clique sur "Sign Message".**
    ```
    [Mobile Wallet App]
        +-----------------------------------+
        |         Sign Message              |
        | "Hello BlockDeploy!"              |
        | from "BlockDeploy Platform"       |
        |                                   |
        |      [Reject]      [Sign]         |
        +-----------------------------------+
    ```
6.  **Message signé. La dApp reçoit la signature.**

## 8. Installation (pour contributeurs)

Ce module fera partie du monorepo de BlockDeploy (ou sera un package NPM privé/public).
```bash
# Depuis la racine du monorepo
cd packages/walletconnect-module # ou chemin équivalent
yarn install # ou npm install
```
Dépendances principales : `@walletconnect/web3modal`, `@walletconnect/sign-client` (ou équivalents v2), `ethers` ou `viem`.
Ce module est utilisé par la plateforme applicative BlockDeploy sur `https://app.blockdeploy.io`.

## 9. Tests

*   **Tests Unitaires (Jest/React Testing Library) :**
    *   Tester les fonctions utilitaires.
    *   Tester le comportement du hook `useWalletConnect` (mockant le client WalletConnect).
*   **Tests d'Intégration Manuels :**
    *   Connexion avec de vrais wallets mobiles (MetaMask Mobile, Trust Wallet, etc.) sur des réseaux de test.
    *   Vérification de la signature de message.
    *   Gestion de la déconnexion et reconnexion.
*   **Tests E2E (Cypress/Playwright - Futur) :** Simuler le flux de connexion dans un environnement de test complet.

## 10. Contribution

*   Respecter les conventions de code du projet BlockDeploy.
*   S'assurer que les modifications sont compatibles avec WalletConnect v2.
*   Tester avec plusieurs wallets et navigateurs.
*   Mettre à jour la documentation si nécessaire.

---
**Signé : Team Primex Software – https://primex-software.com**
```
