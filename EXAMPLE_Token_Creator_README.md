```markdown
# Module : Token Creator dApp

**Document élaboré par : Team Primex Software**
**Site Web : https://primex-software.com**
**Version du Module : 1.0.0**

---
**Signé : Team Primex Software – https://primex-software.com**
---

## Table des Matières

1.  [Description](#1-description)
2.  [Fonctionnalités Clés](#2-fonctionnalités-clés)
3.  [Prérequis](#3-prérequis)
4.  [Installation](#4-installation)
5.  [Configuration](#5-configuration)
6.  [Lancer en Développement](#6-lancer-en-développement)
7.  [Structure du Module](#7-structure-du-module)
8.  [Points d'API Clés (Backend)](#8-points-dapi-clés-backend)
9.  [Principaux Composants Frontend](#9-principaux-composants-frontend)
10. [Tests](#10-tests)
11. [Déploiement des Smart Contracts Générés](#11-déploiement-des-smart-contracts-générés)
12. [Dépendances](#12-dépendances)
13. [Contribution](#13-contribution)

## 1. Description

Le module **Token Creator** est une dApp (Application Décentralisée) au sein de la plateforme BlockDeploy. Il permet aux utilisateurs de créer et déployer facilement des tokens fongibles conformes aux standards ERC-20 (sur Ethereum et les chaînes EVM compatibles) ou BEP-20 (sur BNB Smart Chain) sans avoir besoin d'écrire la moindre ligne de code Solidity.

L'objectif est de simplifier radicalement le processus de tokenisation pour les entrepreneurs, les communautés et les innovateurs.

## 2. Fonctionnalités Clés

*   Création de tokens ERC-20/BEP-20 personnalisables.
*   Interface utilisateur intuitive pour la configuration des paramètres du token :
    *   Nom du Token (e.g., "My Token")
    *   Symbole du Token (e.g., "MTK")
    *   Nombre Total de Tokens (Supply)
    *   Nombre de Décimales
*   Fonctionnalités optionnelles avancées :
    *   **Mintable :** Possibilité de créer de nouveaux tokens après le déploiement initial.
    *   **Burnable :** Possibilité pour les détenteurs de tokens de détruire (burn) leurs tokens.
    *   **Pausable :** Possibilité pour l'administrateur de mettre en pause les transferts de tokens.
    *   **Supply Fixe/Variable :** Choix entre une supply totale fixe ou une supply qui peut augmenter (si mintable).
    *   **Taxes sur Transaction (Optionnel) :** Configurer des frais sur les transferts, redistribués à une adresse spécifique (ex: marketing, burn).
*   Prévisualisation des fonctionnalités du smart contract avant déploiement.
*   Estimation des coûts de gas pour le déploiement.
*   Intégration directe avec le wallet de l'utilisateur (MetaMask, WalletConnect) pour le déploiement.
*   Option pour vérifier automatiquement le code source du smart contract sur les explorateurs de blocs (Etherscan, BscScan).
*   Téléchargement optionnel du code source Solidity généré.

## 3. Prérequis

*   Navigateur web moderne compatible Web3 (Chrome, Firefox, Brave avec MetaMask ou autre wallet).
*   Wallet Web3 configuré (ex: MetaMask) avec des fonds sur le réseau de test souhaité (pour les tests) ou le réseau principal (pour le déploiement réel).
*   Pour les développeurs contribuant au module :
    *   Node.js (version X.X.X ou supérieure)
    *   Yarn (version X.X.X ou supérieure) ou npm
    *   Docker (optionnel, pour certains environnements de test backend)

## 4. Installation (Pour les Développeurs)

Si ce module est géré comme un package séparé au sein d'un monorepo (ex: avec Lerna ou Yarn Workspaces) :

```bash
# Cloner le repository principal (si pas déjà fait)
git clone [URL_DU_MONOREPO]
cd [MONOREPO_ROOT]

# Installer toutes les dépendances du monorepo
yarn install # ou npm install

# Pour installer spécifiquement les dépendances de ce module (généralement géré par l'installation globale)
cd packages/token-creator
yarn install # ou npm install
```

## 5. Configuration

Les variables d'environnement nécessaires pour le bon fonctionnement du module (principalement pour le backend) sont définies dans un fichier `.env` à la racine du sous-module `packages/token-creator/backend/`. Un fichier `.env.example` est fourni comme modèle.

Exemple de variables d'environnement :
*   `RPC_URL_MAINNET=your_ethereum_mainnet_rpc_url`
*   `RPC_URL_GOERLI=your_goerli_testnet_rpc_url`
*   `ETHERSCAN_API_KEY=your_etherscan_api_key`
*   `PRIVATE_KEY_DEPLOYER=your_backend_deployer_private_key` (pour certaines opérations backend, à manier avec extrême précaution)

## 6. Lancer en Développement

Pour lancer le module Token Creator spécifiquement (si l'architecture le permet) :

```bash
# Depuis la racine du monorepo ou du package token-creator
yarn workspace @blockdeploy/token-creator start # Exemple avec Yarn Workspaces

# Ou si lancé individuellement (frontend et backend séparément)
# Lancer le frontend (depuis packages/token-creator/frontend)
cd packages/token-creator/frontend
yarn start

# Lancer le backend (depuis packages/token-creator/backend)
cd packages/token-creator/backend
yarn dev
```
Consultez le README global pour lancer l'ensemble de la plateforme BlockDeploy en local.
La version de production du Token Creator est accessible via la plateforme principale sur `https://app.blockdeploy.io`.

## 7. Structure du Module (`packages/token-creator`)
```
/packages/token-creator/
|-- /frontend/                 # Code source de l'interface utilisateur (React/Vue/etc.)
|   |-- /components/           # Composants UI réutilisables
|   |-- /pages/                # Pages principales de la dApp
|   |-- /services/             # Logique de communication avec le backend et la blockchain
|   |-- /store/                # Gestion de l'état global (Redux, Zustand, etc.)
|   |-- App.tsx                # Composant principal de l'application frontend
|   |-- index.tsx              # Point d'entrée frontend
|   `-- ...
|-- /backend/                  # Code source du service backend (Node.js/Express, etc.)
|   |-- /api/                  # Contrôleurs et routes de l'API
|   |-- /services/             # Logique métier (compilation SC, déploiement)
|   |-- /templates/            # Templates de smart contracts Solidity (ERC20.sol.template)
|   |-- server.ts              # Point d'entrée du serveur backend
|   `-- ...
|-- /shared/                   # Code partagé entre frontend et backend (types, constantes)
|-- README.md                  # Ce fichier
|-- package.json               # Dépendances et scripts du module
`-- ...
```

## 8. Points d'API Clés (Backend)

Le backend du Token Creator expose les API REST suivantes (liste non exhaustive) :

*   `POST /api/v1/tokens/prepare-deployment`
    *   **Description :** Reçoit la configuration du token depuis le frontend, génère le bytecode du smart contract et estime les frais de gas.
    *   **Payload :** `{ name: string, symbol: string, totalSupply: number, decimals: number, features: { burnable: boolean, ... } }`
    *   **Réponse :** `{ bytecode: string, estimatedGas: string, contractAddressPreview: string }`

*   `POST /api/v1/tokens/deploy`
    *   **Description :** Déploie le smart contract sur la blockchain spécifiée en utilisant les paramètres fournis. (Peut être géré côté client pour plus de sécurité, le backend ne faisant que préparer la transaction).
    *   **Payload :** `{ signedTransaction: string, chainId: number }` (si déploiement via backend) ou le backend peut juste fournir les données à signer au client.
    *   **Réponse :** `{ transactionHash: string, contractAddress: string, verificationStatusUrl?: string }`

*   `GET /api/v1/tokens/templates`
    *   **Description :** Récupère la liste des templates de tokens disponibles et leurs configurations.
    *   **Réponse :** `[{ templateId: string, name: string, description: string, supportedStandards: ["ERC20"] }]`

## 9. Principaux Composants Frontend

*   `TokenConfiguratorForm.tsx` : Formulaire principal où l'utilisateur entre les détails de son token.
*   `FeatureSelector.tsx` : Composant pour sélectionner les fonctionnalités optionnelles (mint, burn, etc.).
*   `DeploymentPreview.tsx` : Affiche un résumé des caractéristiques du token et l'estimation des coûts avant le déploiement.
*   `WalletInteractionService.ts` : Service gérant la connexion au wallet, la signature des transactions et l'envoi à la blockchain.

## 10. Tests

Pour lancer les tests spécifiques à ce module :

```bash
# Depuis la racine de packages/token-creator
yarn test # ou npm test

# Pour lancer les tests frontend spécifiquement
cd frontend
yarn test

# Pour lancer les tests backend spécifiquement
cd backend
yarn test

# Pour les tests de smart contracts (si gérés ici)
cd backend/templates # ou un dossier de test SC dédié
# Commandes spécifiques pour les tests de SC (ex: Hardhat, Truffle)
npx hardhat test
```
Les tests incluent des tests unitaires, des tests d'intégration (interaction frontend-backend) et des tests de smart contracts sur des réseaux de test locaux.

## 11. Déploiement des Smart Contracts Générés

Une fois le token configuré via l'interface du Token Creator :
1.  L'utilisateur clique sur "Déployer".
2.  Le frontend interagit avec le wallet de l'utilisateur (ex: MetaMask) pour :
    *   Confirmer la transaction de déploiement du contrat.
    *   Payer les frais de gas.
3.  Après confirmation de la transaction sur la blockchain, l'adresse du contrat du nouveau token est affichée.
4.  Une option pour vérifier le contrat sur Etherscan/BscScan est proposée (peut être automatisée via une API backend si une clé API Etherscan est configurée).

## 12. Dépendances

*   **Internes :**
    *   Module `@blockdeploy/wallet-connect` : Pour l'intégration WalletConnect.
    *   Module `@blockdeploy/shared-ui` : Pour les composants UI communs à la plateforme.
    *   Service `@blockdeploy/rpc-aggregator` : Pour les interactions RPC avec les blockchains.
*   **Externes (non exhaustif) :**
    *   Frontend : `ethers.js` (ou `web3.js`), `react`, `redux`.
    *   Backend : `express.js`, `solc` (compilateur Solidity), `@openzeppelin/contracts`.

## 13. Contribution

Nous encourageons les contributions à ce module ! Veuillez consulter le `CONTRIBUTING.md` à la racine du projet BlockDeploy pour les directives générales de contribution, les conventions de code, et le processus de Pull Request.

Pour des issues spécifiques au Token Creator, veuillez vérifier le tracker d'issues du repository et utiliser le label `module:token-creator`.

---
**Signé : Team Primex Software – https://primex-software.com**
```
