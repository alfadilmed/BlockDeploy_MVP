```markdown
# API Endpoints - Module : DAO Builder

**Document élaboré par : Team Primex Software**
**Site Web : https://primex-software.com**
**Version : 1.0**

---
**Signé : Team Primex Software – https://primex-software.com**
---

## Table des Matières

1.  [Introduction](#1-introduction)
2.  [Principes Généraux](#2-principes-généraux)
3.  [Endpoints API (MVP)](#3-endpoints-api-mvp)
    *   [3.1 Création et Configuration de DAO](#31-création-et-configuration-de-dao)
        *   [3.1.1 `POST /api/v1/dao-builder/prepare-dao-contracts`](#311-post-apiv1dao-builderprepare-dao-contracts)
        *   [3.1.2 `POST /api/v1/dao-builder/daos`](#312-post-apiv1dao-builderdaos)
    *   [3.2 Gestion des Propositions (Off-chain metadata)](#32-gestion-des-propositions-off-chain-metadata)
        *   [3.2.1 `POST /api/v1/dao-builder/daos/{daoContractAddress}/proposals`](#321-post-apiv1dao-builderdaosdaocontractaddressproposals)
        *   [3.2.2 `GET /api/v1/dao-builder/daos/{daoContractAddress}/proposals`](#322-get-apiv1dao-builderdaosdaocontractaddressproposals)
        *   [3.2.3 `GET /api/v1/dao-builder/daos/{daoContractAddress}/proposals/{proposalIdOnChain}`](#323-get-apiv1dao-builderdaosdaocontractaddressproposalsproposalidonchain)
    *   [3.3 Informations sur les DAOs (Publiques)](#33-informations-sur-les-daos-publiques)
        *   [3.3.1 `GET /api/v1/dao-builder/daos`](#331-get-apiv1dao-builderdaos)
        *   [3.3.2 `GET /api/v1/dao-builder/daos/{daoContractAddressOrInternalId}`](#332-get-apiv1dao-builderdaosdaocontractaddressorinternalid)
    *   [3.4 Gestion des Votes (Cache/Info - Optionnel MVP)](#34-gestion-des-votes-cacheinfo---optionnel-mvp)
        *   [3.4.1 `POST /api/v1/dao-builder/daos/{daoContractAddress}/proposals/{proposalIdOnChain}/record-vote-intent`](#341-post-apiv1dao-builderdaosdaocontractaddressproposalsproposalidonchainrecord-vote-intent)
4.  [Authentification et Autorisation](#4-authentification-et-autorisation)
5.  [Gestion des Erreurs](#5-gestion-des-erreurs)
6.  [Considérations Futures](#6-considérations-futures)

## 1. Introduction

Ce document décrit les points d'API (API endpoints) exposés par le backend du module DAO Builder. Ces API ont pour rôle de :
*   Aider les créateurs de DAO à configurer et préparer les smart contracts (Token, Governor, Timelock, Treasury) avant leur déploiement.
*   Stocker et servir les métadonnées off-chain associées aux DAOs et à leurs propositions (ex: nom de la DAO, descriptions des propositions).
*   Faciliter la découverte des DAOs créées via la plateforme.
*   (Optionnel pour MVP / Futur) Mettre en cache ou relayer certaines informations on-chain pour améliorer l'expérience utilisateur.

Le backend **ne déploie pas** les contrats et **ne gère pas les clés privées**. Le déploiement et les actions de gouvernance (proposer, voter, exécuter) sont initiés par le frontend et signés par le wallet de l'utilisateur.

## 2. Principes Généraux

*   **Format :** JSON pour requêtes/réponses.
*   **Verbes HTTP :** POST pour création/modification, GET pour lecture.
*   **Statuts HTTP :** Sémantiques.
*   **Versioning :** `/v1/`.
*   **Préfixe :** `/api/v1/dao-builder/`.

## 3. Endpoints API (MVP)

### 3.1 Création et Configuration de DAO

#### 3.1.1 `POST /api/v1/dao-builder/prepare-dao-contracts`

*   **Description :**
    Prend les paramètres de configuration de la DAO fournis par l'utilisateur. Génère le code Solidity pour tous les contrats nécessaires (Token de Gouvernance, Governor, Timelock, Treasury), les compile en bytecode/ABI, et retourne ces informations pour le déploiement guidé via le frontend.
*   **Méthode :** `POST`
*   **Chemin :** `/api/v1/dao-builder/prepare-dao-contracts`
*   **Payload de la Requête (JSON) :**
    ```json
    {
      "daoName": "MyCoolDAO", // string, pour affichage et nommage des contrats
      "deployerAddress": "0xUSER_DEPLOYING_ADDRESS", // string, obligatoire
      "governanceToken": {
        "createNew": true, // boolean
        "name": "MyCoolDAO Token", // string, si createNew is true
        "symbol": "MCDT", // string, si createNew is true
        "initialSupplySmallestUnit": "1000000000000000000000000", // string (BigNumber), si createNew is true
        "initialSupplyRecipient": "0xUSER_DEPLOYING_ADDRESS", // string, si createNew is true
        // "isMintableByOwner": false, // boolean, optionnel, si createNew is true
        // "decimals": 18, // number, optionnel, si createNew is true (défaut 18)
        "existingTokenAddress": null // string, adresse si createNew is false (doit être ERC20Votes compatible)
      },
      "governorSettings": {
        "votingDelayBlocks": 1, // number (ex: 1 block sur testnet, ~1 jour sur mainnet)
        "votingPeriodBlocks": 7200, // number (ex: 7200 blocks ~ 1 jour sur testnet, ~1 semaine sur mainnet)
        "proposalThresholdSmallestUnit": "1000000000000000000", // string (BigNumber), 0 pour aucun seuil
        "quorumNumeratorPercentage": 4 // number (ex: 4 pour 4%)
      },
      "timelockSettings": {
        "minDelaySeconds": 86400 // number (ex: 1 jour en secondes)
        // proposers et executors seront configurés lors du déploiement (Governor, etc.)
      }
      // Treasury n'a pas de paramètres de construction spécifiques autres que son owner (Timelock)
    }
    ```
*   **Réponse de Succès (200 OK) (JSON) :**
    ```json
    {
      "message": "DAO contracts prepared successfully.",
      "contractsToDeploy": [ // Ordre de déploiement suggéré
        {
          "type": "GovernanceToken", // Si governanceToken.createNew était true
          "contractName": "MyCoolDAOToken",
          "sourceCode": "...", "bytecode": "0x...", "abi": [/*...*/],
          "constructorArgs": { /* ... args pour GovernanceToken ... */ }
        },
        {
          "type": "TimelockController",
          "contractName": "MyCoolDAOTimelock", // Nom généré
          "sourceCode": "...", "bytecode": "0x...", "abi": [/*...*/], // Peut utiliser celui d'OZ directement
          "constructorArgs": { "minDelay": 86400, "proposers": [], "executors": [], "admin": "0xUSER_DEPLOYING_ADDRESS" }
        },
        {
          "type": "DAOGovernor",
          "contractName": "MyCoolDAOGovernor",
          "sourceCode": "...", "bytecode": "0x...", "abi": [/*...*/],
          "constructorArgs": {
             "_name": "MyCoolDAO Governor",
             "_token": "{{ADDRESS_OF_DEPLOYED_GOVERNANCE_TOKEN}}", // Placeholder
             "_timelock": "{{ADDRESS_OF_DEPLOYED_TIMELOCK_CONTROLLER}}", // Placeholder
             /* ... autres args ... */
             "_initialOwner": "0xUSER_DEPLOYING_ADDRESS"
          }
        },
        {
          "type": "SimpleTreasury",
          "contractName": "MyCoolDAOTreasury",
          "sourceCode": "...", "bytecode": "0x...", "abi": [/*...*/],
          "constructorArgs": { "initialOwner": "{{ADDRESS_OF_DEPLOYED_TIMELOCK_CONTROLLER}}" } // Placeholder
        }
      ],
      "deploymentPlan": [ // Instructions pour le frontend sur l'ordre et les dépendances d'adresses
        { "step": 1, "contractType": "GovernanceToken", "outputs": ["governanceTokenAddress"] },
        { "step": 2, "contractType": "TimelockController", "outputs": ["timelockAddress"], "inputs": {"admin": "deployerAddress"} },
        { "step": 3, "contractType": "DAOGovernor", "outputs": ["governorAddress"], "inputs": {"_token": "governanceTokenAddress", "_timelock": "timelockAddress"} },
        { "step": 4, "contractType": "SimpleTreasury", "outputs": ["treasuryAddress"], "inputs": {"initialOwner": "timelockAddress"} },
        { "step": 5, "action": "SetupRoles", "details": "Grant PROPOSER_ROLE on Timelock to Governor. Grant EXECUTOR_ROLE on Timelock to address(0). Revoke deployer's ADMIN_ROLE on Timelock, making Timelock its own admin." },
        { "step": 6, "action": "TransferTreasuryOwnership", "details": "Transfer ownership of Treasury to Timelock (if not done by constructor arg)." } // Redondant si constructor arg est utilisé
      ]
    }
    ```
*   **Réponses d'Erreur :** 400 (Validation), 500 (Serveur).

#### 3.1.2 `POST /api/v1/dao-builder/daos`

*   **Description :**
    Après que l'utilisateur ait déployé tous les contrats avec succès via son wallet, le frontend appelle cet endpoint pour enregistrer la nouvelle DAO (avec les adresses de ses contrats déployés et ses métadonnées) dans la base de données de BlockDeploy.
*   **Méthode :** `POST`
*   **Chemin :** `/api/v1/dao-builder/daos`
*   **Payload de la Requête (JSON) :**
    ```json
    {
      "daoName": "MyCoolDAO",
      "description": "Une DAO pour financer des projets open source.", // Optionnel
      "logoUrl": "https://example.com/dao_logo.png", // Optionnel
      "category": "Grants", // Optionnel
      "contracts": {
        "governanceTokenAddress": "0xTOKEN_ADDRESS", // Obligatoire
        "governorAddress": "0xGOVERNOR_ADDRESS", // Obligatoire
        "timelockAddress": "0xTIMELOCK_ADDRESS", // Obligatoire
        "treasuryAddress": "0xTREASURY_ADDRESS"  // Obligatoire
      },
      "governanceSettingsSnapshot": { /* ... un rappel des settings du governor ... */ },
      "networkChainId": 11155111 // number, Chain ID où la DAO est déployée
    }
    ```
*   **Réponse de Succès (201 Created) (JSON) :**
    ```json
    {
      "message": "DAO registered successfully.",
      "daoId": "DAO_INTERNAL_UUID_456", // ID interne BlockDeploy
      "daoContractAddress": "0xGOVERNOR_ADDRESS" // Adresse principale pour identifier la DAO on-chain
    }
    ```

### 3.2 Gestion des Propositions (Off-chain metadata)

#### 3.2.1 `POST /api/v1/dao-builder/daos/{daoContractAddress}/proposals`

*   **Description :**
    Permet à un utilisateur de soumettre les métadonnées (titre, description) d'une proposition qui a été (ou va être) créée on-chain sur le contrat Governor. L'ID de la proposition on-chain (`proposalIdOnChain`) est requis pour lier les métadonnées.
*   **Méthode :** `POST`
*   **Chemin :** `/api/v1/dao-builder/daos/{daoContractAddress}/proposals`
*   **Payload de la Requête (JSON) :**
    ```json
    {
      "proposalIdOnChain": "0xPROPOSAL_ID_HASH_ON_CHAIN", // string, obligatoire
      "title": "Proposition: Financer le projet X", // string, obligatoire
      "description": "Détails de la proposition...", // string (Markdown?), obligatoire
      "proposerAddress": "0xUSER_WHO_PROPOSED_ON_CHAIN" // string, obligatoire
      // "targets": ["0x..."], "values": ["0"], "calldatas": ["0x..."] // Optionnel: stocker pour affichage
    }
    ```
*   **Réponse de Succès (201 Created) (JSON) :**
    ```json
    {
      "message": "Proposal metadata submitted successfully.",
      "proposalInternalId": "PROP_UUID_789",
      "proposalIdOnChain": "0xPROPOSAL_ID_HASH_ON_CHAIN"
    }
    ```

#### 3.2.2 `GET /api/v1/dao-builder/daos/{daoContractAddress}/proposals`

*   **Description :** Récupère la liste des métadonnées des propositions pour une DAO donnée.
*   **Méthode :** `GET`
*   **Chemin :** `/api/v1/dao-builder/daos/{daoContractAddress}/proposals`
*   **Query Params :** `status=active` (pending, executed, defeated, etc.), `page=1`, `limit=10`
*   **Réponse de Succès (200 OK) (JSON) :**
    ```json
    {
      "proposals": [
        {
          "proposalInternalId": "PROP_UUID_789",
          "proposalIdOnChain": "0x...",
          "title": "...", "description": "...", "proposerAddress": "0x...",
          "submittedAt": "timestamp",
          "onChainState": "Active" // (Pourrait être enrichi par le frontend ou un service d'indexation)
        }
      ],
      "pagination": { /* ... */ }
    }
    ```

#### 3.2.3 `GET /api/v1/dao-builder/daos/{daoContractAddress}/proposals/{proposalIdOnChain}`

*   **Description :** Récupère les métadonnées d'une proposition spécifique.
*   **Méthode :** `GET`
*   **Réponse de Succès (200 OK) (JSON) :** Similaire à un objet dans la liste ci-dessus.

### 3.3 Informations sur les DAOs (Publiques)

#### 3.3.1 `GET /api/v1/dao-builder/daos`

*   **Description :** Liste toutes les DAOs enregistrées sur la plateforme BlockDeploy.
*   **Méthode :** `GET`
*   **Query Params :** `category=Grants`, `page=1`, `limit=10`, `sortBy=creationDate`
*   **Réponse de Succès (200 OK) (JSON) :**
    ```json
    {
      "daos": [
        {
          "daoId": "DAO_INTERNAL_UUID_456",
          "daoName": "MyCoolDAO",
          "logoUrl": "...",
          "description": "...",
          "governorAddress": "0x...",
          "networkChainId": 11155111
        }
      ],
      "pagination": { /* ... */ }
    }
    ```

#### 3.3.2 `GET /api/v1/dao-builder/daos/{daoContractAddressOrInternalId}`

*   **Description :** Récupère les détails d'une DAO spécifique.
*   **Méthode :** `GET`
*   **Réponse de Succès (200 OK) (JSON) :** Similaire à un objet de la liste ci-dessus, mais avec plus de détails (ex: `contracts` addresses, `governanceSettingsSnapshot`).

### 3.4 Gestion des Votes (Cache/Info - Optionnel MVP)

Le vote réel se fait on-chain. Ces endpoints sont pour l'UI afin d'afficher des intentions ou des informations agrégées si un indexeur n'est pas encore prêt.

#### 3.4.1 `POST /api/v1/dao-builder/daos/{daoContractAddress}/proposals/{proposalIdOnChain}/record-vote-intent`

*   **Description :** (Optionnel MVP) Permet à un utilisateur de signaler son intention de vote ou de cacher un vote (si le vote on-chain est anonyme mais qu'on veut un décompte off-chain). Utilité limitée si les votes sont publics on-chain. Plus utile pour des systèmes de vote off-chain type Snapshot.org. **Probablement hors scope MVP.**
*   **Méthode :** `POST`

## 4. Authentification et Autorisation

*   **Création de DAO (`/prepare-dao-contracts`, `/daos`) :** Requiert une authentification utilisateur BlockDeploy.
*   **Soumission de métadonnées de proposition :** Requiert une authentification utilisateur, et le backend pourrait vérifier (via un appel RPC simple) que `proposerAddress` est bien le `msg.sender` authentifié.
*   **Endpoints de lecture publics (`GET /daos`, `GET /daos/{id}/proposals`) :** Peuvent être ouverts.

## 5. Gestion des Erreurs

*   Validation des entrées.
*   Codes HTTP et messages d'erreur clairs.

## 6. Considérations Futures

*   **Intégration TheGraph :** Pour lire les données on-chain (propositions, votes, trésorerie) de manière efficace au lieu de multiples appels RPC directs depuis le frontend ou le backend. Les API backend serviraient alors de proxy/cache pour TheGraph.
*   **Notifications :** Webhooks ou notifications push pour les nouvelles propositions, début/fin de périodes de vote.
*   **Gestion des rôles du Timelock :** API pour faciliter la configuration des rôles `PROPOSER_ROLE`, `EXECUTOR_ROLE`, `ADMIN_ROLE` du Timelock après le déploiement, si le frontend ne le gère pas entièrement.
*   **Snapshot.org Integration :** Pour les DAOs préférant un vote off-chain "gasless".

---
**Signé : Team Primex Software – https://primex-software.com**
```
