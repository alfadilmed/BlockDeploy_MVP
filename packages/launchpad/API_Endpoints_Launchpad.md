```markdown
# API Endpoints - Module : Launchpad

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
    *   [3.1 Gestion des Ventes (Project Owner)](#31-gestion-des-ventes-project-owner)
        *   [3.1.1 `POST /api/v1/launchpad/sales/prepare-contracts`](#311-post-apiv1launchpadsalesprepare-contracts)
        *   [3.1.2 `POST /api/v1/launchpad/sales/{saleId}/whitelist/update`](#312-post-apiv1launchpadsalessaleidwhitelistupdate)
        *   [3.1.3 `GET /api/v1/launchpad/sales/by-owner`](#313-get-apiv1launchpadsalesby-owner)
    *   [3.2 Découverte et Informations sur les Ventes (Public/Investisseurs)](#32-découverte-et-informations-sur-les-ventes-publicinvestisseurs)
        *   [3.2.1 `GET /api/v1/launchpad/sales`](#321-get-apiv1launchpadsales)
        *   [3.2.2 `GET /api/v1/launchpad/sales/{saleIdOrContractAddress}`](#322-get-apiv1launchpadsalessaleidorcontractaddress)
        *   [3.2.3 `GET /api/v1/launchpad/sales/{saleIdOrContractAddress}/is-whitelisted/{userAddress}`](#323-get-apiv1launchpadsalessaleidorcontractaddressis-whitelisteduseraddress)
4.  [Authentification et Autorisation](#4-authentification-et-autorisation)
5.  [Gestion des Erreurs](#5-gestion-des-erreurs)
6.  [Considérations Futures](#6-considérations-futures)

## 1. Introduction

Ce document décrit les points d'API (API endpoints) exposés par le backend du module Launchpad. Ces API ont pour rôle de :
*   Permettre aux propriétaires de projets (Project Owners) de configurer les détails de leur vente de tokens et de préparer les smart contracts associés (vente, vesting).
*   Gérer les données off-chain relatives aux ventes (descriptions, liens, statut de la whitelist pour le MVP).
*   Fournir aux investisseurs les informations nécessaires pour découvrir et évaluer les ventes.

Le backend **ne gère pas les clés privées** et **ne déploie pas les contrats**. Le déploiement est initié par le frontend et signé par le wallet du Project Owner. Les interactions d'achat sont également directes entre l'investisseur et le smart contract de vente.

## 2. Principes Généraux

*   **Format :** JSON pour requêtes/réponses.
*   **Verbes HTTP :** POST pour création/modification, GET pour lecture.
*   **Statuts HTTP :** Sémantiques.
*   **Versioning :** `/v1/`.
*   **Préfixe :** `/api/v1/launchpad/`.

## 3. Endpoints API (MVP)

### 3.1 Gestion des Ventes (Project Owner)

#### 3.1.1 `POST /api/v1/launchpad/sales/prepare-contracts`

*   **Description :**
    Prend les paramètres de configuration de la vente et du vesting (optionnel) fournis par le Project Owner. Génère le code Solidity des contrats, les compile en bytecode/ABI, et retourne ces informations pour le déploiement via le frontend. Enregistre également les méta-informations de la vente (description, etc.) dans la base de données BlockDeploy.
*   **Méthode :** `POST`
*   **Chemin :** `/api/v1/launchpad/sales/prepare-contracts`
*   **Payload de la Requête (JSON) :**
    ```json
    {
      "saleDetails": { // Informations pour le contrat de vente
        "saleContractName": "MyProjectSale", // string, pour nom du contrat Solidity
        "tokenBeingSoldAddress": "0xERC20_TOKEN_ADDRESS", // string, obligatoire
        "tokenPriceInWeiPerSmallestUnit": "1000000000", // string (BigNumber), prix en WEI pour la plus petite unité du token vendu
        "totalTokensForSaleInSmallestUnit": "500000000000000000000000", // string (BigNumber)
        "saleStartTimeUnix": 1672531200, // number (timestamp), obligatoire
        "saleEndTimeUnix": 1675209600,   // number (timestamp), obligatoire
        "minInvestmentWei": "100000000000000000",  // string (BigNumber) (0.1 ETH)
        "maxInvestmentWei": "1000000000000000000", // string (BigNumber) (1 ETH)
        "fundCollectionWalletAddress": "0xPROJECT_OWNER_FUNDS_WALLET", // string, obligatoire
        "deployerAddress": "0xUSER_DEPLOYING_ADDRESS" // string, obligatoire
      },
      "projectInfo": { // Informations off-chain sur le projet/vente
        "projectName": "My Awesome Project",
        "projectLogoUrl": "https://example.com/logo.png",
        "projectWebsite": "https://example.com",
        "projectDescription": "Une brève description du projet.",
        "tokenDescription": "Informations sur l'utilité du token."
        // ... autres champs: twitter, telegram, etc.
      },
      "vestingDetails": [ // Tableau optionnel pour les calendriers de vesting
        {
          "vestingContractName": "TeamVestingContract", // string
          "beneficiaryAddress": "0xTEAM_MEMBER_WALLET", // string
          "vestingStartTimeUnix": 1672531200, // number
          "cliffDurationSeconds": 2592000, // 30 jours en secondes
          "vestingDurationSeconds": 10368000, // 120 jours en secondes après cliff
          "totalVestingAmountSmallestUnit": "10000000000000000000000" // string (BigNumber)
        }
        // ... autres calendriers de vesting
      ],
      "whitelistRequired": true // boolean
    }
    ```
*   **Réponse de Succès (201_Created) (JSON) :**
    ```json
    {
      "message": "Sale and vesting contracts prepared successfully. Sale created with ID: SALE_UUID_123",
      "saleId": "SALE_UUID_123", // ID interne BlockDeploy pour cette vente
      "saleContractData": {
        "sourceCode": "pragma solidity ... contract MyProjectSale ...",
        "bytecode": "0x...",
        "abi": [/* ... */],
        "contractName": "MyProjectSale",
        "constructorArgs": { /* ... args pour TokenSale ... */ }
      },
      "vestingContractsData": [ // Tableau, un par `vestingDetails` fourni
        {
          "sourceCode": "pragma solidity ... contract TeamVestingContract ...",
          "bytecode": "0x...",
          "abi": [/* ... */],
          "contractName": "TeamVestingContract",
          "constructorArgs": { /* ... args pour TokenVesting ... */ }
        }
      ],
      "deploymentInstructions": "Deploy the Sale Contract first. Then, if applicable, deploy Vesting Contracts and fund them with tokens."
    }
    ```
*   **Réponses d'Erreur :** 400 (Validation), 401/403 (Non autorisé), 500 (Serveur).

#### 3.1.2 `POST /api/v1/launchpad/sales/{saleId}/whitelist/update`

*   **Description :**
    Permet au Project Owner d'ajouter ou de supprimer des adresses de la whitelist pour une vente spécifique. Pour le MVP, cela met à jour une simple liste en base de données. Le contrat de vente lira cette information (via un oracle ou une fonction signée par le backend - design à affiner pour la vérification on-chain par le smart contract).
    *Alternative MVP plus simple :* Le contrat de vente a une fonction `updateWhitelistBatch` appelable uniquement par son owner. Le backend n'intervient pas directement avec le contrat pour ça, il ne fait que stocker la liste pour info.
    *Ce endpoint gère la liste off-chain.*
*   **Méthode :** `POST`
*   **Chemin :** `/api/v1/launchpad/sales/{saleId}/whitelist/update`
*   **Payload de la Requête (JSON) :**
    ```json
    {
      "addressesToAdd": ["0xADDR1...", "0xADDR2..."], // array de strings
      "addressesToRemove": ["0xADDR3..."] // array de strings
    }
    ```
*   **Réponse de Succès (200 OK) (JSON) :**
    ```json
    {
      "message": "Whitelist updated successfully for sale ID: SALE_UUID_123",
      "updatedCount": 3
    }
    ```
*   **Réponses d'Erreur :** 400, 401/403, 404 (Sale non trouvée), 500.

#### 3.1.3 `GET /api/v1/launchpad/sales/by-owner`

*   **Description :** Récupère la liste des ventes créées par l'utilisateur authentifié (Project Owner).
*   **Méthode :** `GET`
*   **Chemin :** `/api/v1/launchpad/sales/by-owner`
*   **Réponse de Succès (200 OK) (JSON) :**
    ```json
    {
      "sales": [
        {
          "saleId": "SALE_UUID_123",
          "projectName": "My Awesome Project",
          "tokenBeingSoldAddress": "0x...",
          "saleStartTimeUnix": 1672531200,
          "saleEndTimeUnix": 1675209600,
          "status": "PendingDeployment | Active | Ended | Finalized", // Statut géré par le backend
          "saleContractAddress": "0xSALE_CONTRACT_ADDR" // (si déployé)
        }
        // ... autres ventes
      ]
    }
    ```

### 3.2 Découverte et Informations sur les Ventes (Public/Investisseurs)

#### 3.2.1 `GET /api/v1/launchpad/sales`

*   **Description :** Récupère une liste paginée des ventes de tokens (actives, futures, passées).
*   **Méthode :** `GET`
*   **Chemin :** `/api/v1/launchpad/sales`
*   **Query Params :** `status=active` (upcoming, past), `page=1`, `limit=10`, `sortBy=startTime`
*   **Réponse de Succès (200 OK) (JSON) :**
    ```json
    {
      "sales": [ /* ... liste similaire à /by-owner mais avec plus de détails publics ... */ ],
      "pagination": { "currentPage": 1, "totalPages": 5, "totalSales": 50 }
    }
    ```

#### 3.2.2 `GET /api/v1/launchpad/sales/{saleIdOrContractAddress}`

*   **Description :** Récupère les détails complets d'une vente spécifique en utilisant son ID interne BlockDeploy ou son adresse de contrat.
*   **Méthode :** `GET`
*   **Chemin :** `/api/v1/launchpad/sales/{saleIdOrContractAddress}`
*   **Réponse de Succès (200 OK) (JSON) :**
    ```json
    {
      "saleId": "SALE_UUID_123",
      "projectInfo": { /* ... */ },
      "saleDetails": { /* ... incluant prix, caps, dates, adresse du contrat de vente ... */ },
      "vestingInfoAvailable": true, // boolean
      // Potentiellement des stats on-chain si le backend les indexe :
      "onChainStats": {
        "tokensSold": "12000000000000000000000", // string (BigNumber)
        "fundsRaisedWei": "1200000000000000000", // string (BigNumber)
        "participants": 150 // number
      }
    }
    ```
*   **Réponses d'Erreur :** 404 (Non trouvée).

#### 3.2.3 `GET /api/v1/launchpad/sales/{saleIdOrContractAddress}/is-whitelisted/{userAddress}`

*   **Description :** Vérifie si une adresse utilisateur spécifique est whitelistée pour une vente donnée (basé sur la liste off-chain gérée par le backend pour le MVP).
*   **Méthode :** `GET`
*   **Chemin :** `/api/v1/launchpad/sales/{saleIdOrContractAddress}/is-whitelisted/{userAddress}`
*   **Réponse de Succès (200 OK) (JSON) :**
    ```json
    {
      "isWhitelisted": true,
      "userAddress": "0xUSER_ADDRESS"
    }
    ```
*   **Réponses d'Erreur :** 404.

## 4. Authentification et Autorisation

*   Endpoints sous `/admin/*` ou nécessitant la création/modification de données de vente (ex: `prepare-contracts`, `whitelist/update`, `by-owner`) : Requiert une authentification du Project Owner (ex: JWT de session BlockDeploy). L'autorisation vérifie que l'utilisateur est bien le propriétaire de la vente qu'il tente de modifier.
*   Endpoints publics (ex: `GET /sales`, `GET /sales/{id}`) : Peuvent être ouverts ou nécessiter une clé API BlockDeploy de base pour un accès général.
*   `is-whitelisted` : Pourrait être public ou nécessiter une simple clé API pour éviter les abus.

## 5. Gestion des Erreurs

*   Validation des entrées (adresses, timestamps, montants).
*   Codes de statut HTTP sémantiques.
*   Messages d'erreur clairs.

## 6. Considérations Futures

*   **Endpoints pour la gestion du cycle de vie de la vente par le Owner :**
    *   `POST /api/v1/launchpad/sales/{saleId}/start-prematurely` (si les conditions sont remplies)
    *   `POST /api/v1/launchpad/sales/{saleId}/finalize` (pour déclencher des actions post-vente si nécessaire côté backend)
*   **Endpoints pour les statistiques de vente en temps réel :** (via indexation d'événements blockchain).
*   **Endpoints pour la gestion des calendriers de vesting par le Project Owner :** (ex: voir les tokens réclamés).
*   **Webhooks :** Pour notifier des changements de statut de vente ou des participations importantes.

---
**Signé : Team Primex Software – https://primex-software.com**
```
