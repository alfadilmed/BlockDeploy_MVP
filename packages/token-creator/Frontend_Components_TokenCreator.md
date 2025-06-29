```markdown
# Composants Frontend Principaux - Module : Token Creator

**Document élaboré par : Team Primex Software**
**Site Web : https://primex-software.com**
**Version : 1.0**

---
**Signé : Team Primex Software – https://primex-software.com**
---

## Table des Matières

1.  [Introduction](#1-introduction)
2.  [Principes de Conception](#2-principes-de-conception)
3.  [Composants Principaux (MVP)](#3-composants-principaux-mvp)
    *   [3.1 `TokenCreatorLayout`](#31-tokencreatorlayout)
    *   [3.2 `TokenConfigurationForm`](#32-tokenconfigurationform)
    *   [3.3 `FeatureToggleSwitch`](#33-featuretoggleswitch)
    *   [3.4 `NetworkSelector`](#34-networkselector)
    *   [3.5 `SourceCodePreview`](#35-sourcecodepreview)
    *   [3.6 `DeploymentPane`](#36-deploymentpane)
    *   [3.7 `DeploymentStatusModal`](#37-deploymentstatusmodal)
4.  [Gestion de l'État Frontend](#4-gestion-de-létat-frontend)
5.  [Interactions et Flux de Données](#5-interactions-et-flux-de-données)

## 1. Introduction

Ce document décrit les principaux composants React (ou équivalent selon le framework frontend choisi pour BlockDeploy) qui constitueront l'interface utilisateur du module Token Creator pour sa version MVP. L'objectif est de créer une expérience utilisateur intuitive et guidée pour la création et le déploiement de tokens ERC-20.

Ces composants seront développés dans `packages/token-creator/frontend/components/`.

## 2. Principes de Conception

*   **Clarté et Simplicité :** L'interface doit être facile à comprendre, même pour les utilisateurs peu familiers avec les concepts de la blockchain.
*   **Guidage Utilisateur :** Fournir des infobulles, des messages d'aide, et des validations claires.
*   **Feedback Immédiat :** L'utilisateur doit voir l'impact de ses choix (ex: aperçu du code, estimation des frais).
*   **Modularité :** Composants bien définis et réutilisables si possible.
*   **Responsivité :** L'interface doit être utilisable sur différentes tailles d'écran.

## 3. Composants Principaux (MVP)

### 3.1 `TokenCreatorLayout`

*   **Description :** Composant de layout principal pour la page du Token Creator. Il pourrait inclure un titre de page, une brève introduction, et organiser les différentes sections.
*   **Contient :** `TokenConfigurationForm`, `SourceCodePreview` (optionnel, peut-être un onglet), `DeploymentPane`.
*   **Props :** `title` (string).

### 3.2 `TokenConfigurationForm`

*   **Description :** Le formulaire principal où l'utilisateur définit les caractéristiques de son token.
*   **Champs / Contrôles :**
    *   `Input` pour "Nom du Token" (ex: "My Token"). Validation : requis, longueur max.
    *   `Input` pour "Symbole du Token" (ex: "MTK"). Validation : requis, longueur max (ex: 5 chars), caractères alphanumériques.
    *   `Input` (type number) pour "Supply Initiale". Validation : requis, nombre positif.
    *   `Input` (type number, ou select) pour "Décimales". Validation : requis, nombre entier (0-18), défaut à 18.
    *   `FeatureToggleSwitch` (ou Checkbox) pour "Mintable".
    *   `FeatureToggleSwitch` (ou Checkbox) pour "Burnable".
    *   (Futur : Switches pour Pausable, Taxes, etc.)
*   **État Géré :** Valeurs des champs du formulaire, erreurs de validation.
*   **Actions :** `onSubmit` (déclenche la préparation du contrat via appel API backend), `onFieldChange`.

### 3.3 `FeatureToggleSwitch`

*   **Description :** Un composant simple (probablement basé sur un composant UI générique de BlockDeploy) pour activer/désactiver une fonctionnalité optionnelle du token.
*   **Contient :** Un label descriptif (ex: "Permettre la création de nouveaux tokens (Mintable)"), un interrupteur (switch/checkbox).
*   **Props :** `label` (string), `isChecked` (boolean), `onChange` (function), `tooltip` (string, pour explication de la feature).

### 3.4 `NetworkSelector`

*   **Description :** Permet à l'utilisateur de choisir le réseau blockchain sur lequel il souhaite déployer son token (pour le MVP, principalement des testnets).
*   **Contient :** Un `Select` ou des boutons radio.
*   **Options MVP :** Sepolia, Goerli (ou autres testnets EVM pertinents).
*   **État Géré :** Réseau sélectionné.
*   **Actions :** `onNetworkChange`. Doit interagir avec le module WalletConnect pour s'assurer que le wallet de l'utilisateur est connecté au bon réseau avant le déploiement.

### 3.5 `SourceCodePreview` (Optionnel pour MVP, ou affichage simple)

*   **Description :** Affiche un aperçu du code Solidity qui sera généré en fonction des options choisies par l'utilisateur.
*   **Contient :** Un visualiseur de code (avec coloration syntaxique si possible, ex: `react-syntax-highlighter`). Bouton "Copier le code".
*   **Props :** `sourceCode` (string).
*   **Logique :** Se met à jour dynamiquement lorsque l'utilisateur modifie les options dans `TokenConfigurationForm` (via un appel à `/api/v1/token-creator/get-source-code`). Pour le MVP, cela pourrait être un simple textarea non modifiable.

### 3.6 `DeploymentPane`

*   **Description :** Section qui gère le processus de déploiement une fois le token configuré.
*   **Contient :**
    *   Affichage de l'adresse du propriétaire (récupérée du wallet connecté).
    *   Sélection du réseau (`NetworkSelector`).
    *   Bouton "Préparer le Déploiement" :
        *   Appelle l'API backend `/api/v1/token-creator/prepare-contract`.
        *   Affiche un indicateur de chargement.
        *   En cas de succès, affiche les informations de bytecode/ABI (pour info) et active le bouton "Déployer".
    *   Bouton "Déployer avec [Nom du Wallet]" (activé après préparation réussie) :
        *   Utilise les données (bytecode, constructorArgs) reçues du backend.
        *   Interagit avec le module `@blockdeploy/walletconnect-module` (ou équivalent) pour demander à l'utilisateur de signer et d'envoyer la transaction de création de contrat.
    *   Affichage du statut du déploiement (en cours, succès, échec).
    *   En cas de succès : Affiche l'adresse du contrat déployé et un lien vers l'explorateur de blocs.
*   **État Géré :** Statut de préparation, données du contrat préparé (bytecode, abi, constructorArgs), statut de déploiement, adresse du contrat, hash de la transaction, erreurs.

### 3.7 `DeploymentStatusModal` (ou section dans `DeploymentPane`)

*   **Description :** Affiche des informations détaillées pendant et après le processus de déploiement.
*   **Contenu :**
    *   Messages de statut (ex: "En attente de signature...", "Transaction en cours...", "Déploiement réussi !").
    *   Liens vers l'explorateur de transactions/contrats.
    *   Messages d'erreur en cas d'échec.
*   **Props :** `isOpen` (boolean), `onClose` (function), `status` (enum: PENDING, SUBMITTED, CONFIRMED, FAILED), `txHash` (string), `contractAddress` (string), `error` (string).

## 4. Gestion de l'État Frontend

*   **État Local des Composants :** `useState` et `useReducer` pour la plupart des besoins (ex: valeurs des formulaires, état de chargement d'un bouton).
*   **Contexte React (React Context API) :**
    *   Un `TokenCreatorContext` pourrait être utilisé pour gérer l'état global du processus de création de token (configuration actuelle, statut de préparation, résultat du déploiement) et le partager entre les composants (`TokenConfigurationForm`, `DeploymentPane`, `SourceCodePreview`).
    *   Interaction avec un `WalletContext` (fourni par `@blockdeploy/walletconnect-module`) pour obtenir les informations du wallet connecté (adresse, chainId, fonction de signature).
*   **Bibliothèques d'État Global (Zustand, Redux) :** Probablement pas nécessaires pour le MVP de ce module spécifique, sauf si la complexité de l'état partagé devient très élevée.

## 5. Interactions et Flux de Données

1.  **Utilisateur remplit `TokenConfigurationForm`**.
2.  À chaque changement pertinent, `SourceCodePreview` (si dynamique) peut appeler le backend (`/get-source-code`) pour mettre à jour l'aperçu.
3.  Utilisateur sélectionne le réseau via `NetworkSelector`.
4.  Utilisateur clique sur "Préparer le Déploiement" dans `DeploymentPane`.
    *   Le frontend envoie les données de configuration au backend (`/prepare-contract`).
    *   Le backend répond avec bytecode, ABI, constructorArgs.
5.  Le bouton "Déployer" est activé. `DeploymentPane` affiche les infos.
6.  Utilisateur clique sur "Déployer".
    *   Le frontend utilise le module WalletConnect et Ethers.js pour construire et envoyer la transaction de création de contrat, en utilisant le bytecode et les constructorArgs.
    *   L'utilisateur signe la transaction via son wallet.
7.  `DeploymentPane` / `DeploymentStatusModal` affiche le statut de la transaction et le résultat.

---
**Signé : Team Primex Software – https://primex-software.com**
```
