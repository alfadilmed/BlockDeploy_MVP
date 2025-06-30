```markdown
# Module : Token Creator dApp (M2.1)

**Document élaboré par : Team Primex Software**
**Site Web : https://primex-software.com**
**Version du Module : 0.1.0 (MVP)**

---
**Signé : Team Primex Software – https://primex-software.com**
---

## Table des Matières

1.  [Description](#1-description)
2.  [Fonctionnalités Clés (MVP)](#2-fonctionnalités-clés-mvp)
3.  [Architecture](#3-architecture)
    *   [3.1 Frontend](#31-frontend)
    *   [3.2 Backend](#32-backend)
    *   [3.3 Smart Contract Templates](#33-smart-contract-templates)
4.  [Points d'API Backend (Détaillés dans API_Endpoints_TokenCreator.md)](#4-points-dapi-backend-détaillés-dans-api_endpoints_tokencreatormd)
5.  [Principaux Composants Frontend (Détaillés dans Frontend_Components_TokenCreator.md)](#5-principaux-composants-frontend-détaillés-dans-frontend_components_tokencreatormd)
6.  [Flux de Déploiement (Détaillé dans DeploymentFlow_TokenCreator.md)](#6-flux-de-déploiement-détaillé-dans-deploymentflow_tokencreatormd)
7.  [Wireframes / Flux Utilisateur (Détaillés dans TokenCreator_Wireframes_ASCII.md)](#7-wireframes--flux-utilisateur-détaillés-dans-tokencreator_wireframes_asciimd)
8.  [Technologies Utilisées](#8-technologies-utilisées)
9.  [Dépendances](#9-dépendances)
    *   [9.1 Internes (BlockDeploy)](#91-internes-blockdeploy)
    *   [9.2 Externes](#92-externes)
10. [Structure du Module (`packages/token-creator`)](#10-structure-du-module-packagestoken-creator)
11. [Installation et Lancement (Développement)](#11-installation-et-lancement-développement)
12. [Tests (Stratégie Initiale)](#12-tests-stratégie-initiale)
13. [Contribution](#13-contribution)

## 1. Description

Le module **Token Creator** est une dApp (Application Décentralisée) au sein de la plateforme BlockDeploy. Son objectif principal est de permettre aux utilisateurs de **créer et déployer facilement des tokens fongibles conformes au standard ERC-20** (et équivalents sur d'autres chaînes EVM compatibles) sans nécessiter de compétences en programmation Solidity.

Cette version MVP (Minimum Viable Product) se concentre sur les fonctionnalités essentielles pour générer un token standard avec quelques options de base, le déployer sur un réseau de test, et obtenir le code source généré.

## 2. Fonctionnalités Clés (MVP)

*   **Configuration de base du Token ERC-20 :**
    *   Nom du Token (e.g., "My Cool Token")
    *   Symbole du Token (e.g., "MCT")
    *   Nombre Total de Tokens (Initial Supply)
    *   Nombre de Décimales (généralement 18)
*   **Sélection du Propriétaire (Owner) :** L'adresse qui déploie le contrat sera initialement le propriétaire du contrat et recevra la totalité de l'offre initiale.
*   **Fonctionnalités Optionnelles (via cases à cocher) :**
    *   **Mintable :** Permettre au propriétaire du contrat de créer (minter) de nouveaux tokens après le déploiement initial, augmentant ainsi la supply totale.
    *   **Burnable :** Permettre aux détenteurs de tokens (y compris le propriétaire) de détruire (brûler) leurs propres tokens, réduisant ainsi la supply totale.
    *   **Pausable (NON MVP, Futur) :** Permettre au propriétaire de mettre en pause toutes les transferts de tokens en cas d'urgence.
    *   **Taxes sur Transaction (NON MVP, Futur) :** Configurer des frais sur les transferts.
*   **Génération du Code Source Solidity :** Basée sur les options choisies par l'utilisateur, en utilisant des templates OpenZeppelin sécurisés.
*   **Préparation au Déploiement :**
    *   Le backend génère le bytecode et l'ABI du contrat configuré.
*   **Déploiement via Wallet Utilisateur :**
    *   Le frontend reçoit le bytecode et l'ABI.
    *   L'utilisateur initie le déploiement en signant la transaction de création de contrat via son wallet connecté (en utilisant le module WalletConnect de BlockDeploy).
    *   Support initial pour les réseaux de test EVM (ex: Sepolia, Goerli).
*   **Affichage des Informations Post-Déploiement :** Adresse du contrat déployé, lien vers l'explorateur de blocs.

## 3. Architecture

### 3.1 Frontend (`packages/token-creator/frontend/`)

*   Interface utilisateur construite en React/Next.js.
*   Formulaires pour la configuration du token.
*   Communication avec le backend pour préparer le déploiement et récupérer le code source.
*   Interaction avec le wallet de l'utilisateur (via `@blockdeploy/walletconnect-module`) pour le déploiement.
*   Affichage de l'état du processus de création et de déploiement.

### 3.2 Backend (`packages/token-creator/backend/`)

*   API RESTful (probablement Node.js/Express ou Fastify).
*   Endpoints pour :
    *   Recevoir les paramètres du token du frontend.
    *   Générer le code Solidity à partir des templates en fonction des options.
    *   Compiler le code Solidity en bytecode et ABI (en utilisant `solc-js`).
    *   Retourner le bytecode, l'ABI, et le code source au frontend.
*   **Ne gère PAS les clés privées des utilisateurs ni le déploiement direct.** Le backend prépare uniquement les données du contrat.

### 3.3 Smart Contract Templates (`packages/token-creator/backend/templates/`)

*   Fichiers `.sol.template` basés sur les contrats OpenZeppelin (ERC20, ERC20Burnable, Ownable, etc.).
*   Utilisation de placeholders (ex: `{{TOKEN_NAME}}`, `{{#if IS_MINTABLE}} ... {{/if}}`) que le backend remplacera dynamiquement.
*   Le MVP se concentrera sur un template principal `ERC20_Base.sol.template` qui pourra inclure dynamiquement les modules `Mintable` et `Burnable`.

## 4. Points d'API Backend (Détaillés dans `API_Endpoints_TokenCreator.md`)

Voir le document `API_Endpoints_TokenCreator.md` pour la spécification détaillée des routes, des payloads et des réponses.

## 5. Principaux Composants Frontend (Détaillés dans `Frontend_Components_TokenCreator.md`)

Voir le document `Frontend_Components_TokenCreator.md` pour la liste et la description des composants React.

## 6. Flux de Déploiement (Détaillé dans `DeploymentFlow_TokenCreator.md`)

Voir le document `DeploymentFlow_TokenCreator.md` pour une explication du pipeline complet.

## 7. Wireframes / Flux Utilisateur (Détaillés dans `TokenCreator_Wireframes_ASCII.md`)

Voir le document `TokenCreator_Wireframes_ASCII.md` pour la représentation visuelle du parcours utilisateur.

## 8. Technologies Utilisées

*   **Frontend :** React, Next.js, TypeScript, Ethers.js, TailwindCSS (ou autre solution de style du monorepo).
*   **Backend :** Node.js (avec Express/Fastify), TypeScript, `solc-js` (pour la compilation Solidity).
*   **Smart Contracts :** Solidity, Contrats OpenZeppelin.
*   **Partagé (`shared/`) :** TypeScript pour les types et interfaces communs au frontend et backend.

## 9. Dépendances

### 9.1 Internes (BlockDeploy)

*   `@blockdeploy/walletconnect-module` (M1.2) : Pour la connexion et l'interaction avec le wallet utilisateur.
*   `@blockdeploy/rpc-api-generator` (M1.2 - pour l'accès RPC via le proxy BlockDeploy) : Pour interagir avec la blockchain (ex: estimer le gas, vérifier le statut de la transaction).
*   `@blockdeploy/ui-components` (Futur) : Bibliothèque de composants UI partagés de BlockDeploy.

### 9.2 Externes

*   **Frontend :** `ethers` (ou `viem`), `react`, `next`.
*   **Backend :** `express` (ou `fastify`), `solc`, `mustache` (ou autre moteur de templating pour les .sol.template), `@openzeppelin/contracts` (pour référencer les versions et interfaces lors de la génération).
*   **Développement :** `jest`, `testing-library/react`, `hardhat` (pour tester les templates de contrat isolément).

## 10. Structure du Module (`packages/token-creator`)

```
/packages/token-creator/
|-- /backend/
|   |-- /src/
|   |   |-- /api/              # Routes et contrôleurs API
|   |   |-- /services/         # Logique métier (génération, compilation)
|   |   |-- /templates/        # Templates Solidity (ex: ERC20_Base.sol.template)
|   |   `-- ...
|   |-- Dockerfile
|   `-- package.json
|-- /frontend/
|   |-- /components/           # Composants React spécifiques au Token Creator
|   |-- /hooks/                # Hooks React spécifiques
|   |-- /pages/                # Pages Next.js pour le Token Creator
|   |-- /services/             # Services frontend (appels API backend)
|   `-- package.json
|-- /shared/                   # Types et interfaces partagés (TypeScript)
|   `-- package.json
|-- TokenCreator_Module_README.md      # Ce fichier
|-- API_Endpoints_TokenCreator.md
|-- Frontend_Components_TokenCreator.md
|-- DeploymentFlow_TokenCreator.md
|-- TokenCreator_Wireframes_ASCII.md
|-- Solidity_Template_ERC20_Mintable_Burnable.sol.template # Déplacé dans backend/src/templates/
`-- package.json               # Dépendances et scripts globaux au module (si nécessaire)
```
*(Note: Le fichier `Solidity_Template_ERC20_Mintable_Burnable.sol.template` sera localisé dans `packages/token-creator/backend/src/templates/`)*

## 11. Installation et Lancement (Développement)

(Instructions spécifiques au monorepo BlockDeploy)

```bash
# Depuis la racine du monorepo
# Installer toutes les dépendances (si pas déjà fait)
yarn install

# Lancer le backend du Token Creator
yarn workspace @blockdeploy/token-creator-backend dev

# Lancer le frontend de la plateforme BlockDeploy (qui intègre le Token Creator)
yarn workspace @blockdeploy/platform dev # ou le nom du package frontend principal
```
Le Token Creator est une application principale de la plateforme BlockDeploy, accessible sur `https://app.blockdeploy.io/token-creator` (ou une route similaire).
Lors du développement local, le frontend est généralement celui de la plateforme globale qui appelle le backend spécifique du Token Creator.

## 12. Tests (Stratégie Initiale)

*   **Backend :**
    *   Tests unitaires pour les services de génération de code et de compilation.
    *   Tests d'intégration pour les endpoints API (avec des mocks pour `solc-js`).
*   **Frontend :**
    *   Tests unitaires pour les composants UI et les hooks.
    *   Tests d'intégration pour le flux de configuration et l'interaction avec le backend mocké.
*   **Smart Contract Templates :** Des tests Solidity (avec Hardhat/Foundry) pour chaque variation de template générable afin de s'assurer de leur validité et sécurité avant de les utiliser comme base.

## 13. Contribution

*   Suivre les conventions de code et de commit du projet BlockDeploy.
*   S'assurer que les templates Solidity utilisent les versions les plus récentes et sécurisées d'OpenZeppelin.
*   Documenter toute nouvelle fonctionnalité ou modification majeure.
*   Écrire des tests pour le nouveau code.

---
**Signé : Team Primex Software – https://primex-software.com**
```
