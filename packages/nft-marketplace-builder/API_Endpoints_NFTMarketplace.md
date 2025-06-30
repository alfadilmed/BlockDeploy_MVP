```markdown
# API Endpoints - Module : NFT Marketplace Builder

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
    *   [3.1 Administration de la Marketplace](#31-administration-de-la-marketplace)
        *   [3.1.1 `POST /api/v1/nft-mp/admin/prepare-marketplace`](#311-post-apiv1nft-mpadminprepare-marketplace)
    *   [3.2 Gestion des Collections NFT](#32-gestion-des-collections-nft)
        *   [3.2.1 `POST /api/v1/nft-mp/admin/prepare-collection`](#321-post-apiv1nft-mpadminprepare-collection)
    *   [3.3 Interaction avec la Marketplace (Lecture/Indexation - Futur)](#33-interaction-avec-la-marketplace-lectureindexation---futur)
4.  [Authentification et Autorisation](#4-authentification-et-autorisation)
5.  [Gestion des Erreurs](#5-gestion-des-erreurs)
6.  [Considérations Futures](#6-considérations-futures)

## 1. Introduction

Ce document décrit les points d'API (API endpoints) exposés par le backend du module NFT Marketplace Builder. Ces API servent principalement à :
1.  Aider les administrateurs de marketplace à préparer les smart contracts (marketplace et collections NFT) avant leur déploiement.
2.  (Futur) Fournir des données indexées pour un affichage rapide et efficace des marketplaces générées.

Comme pour le Token Creator, le backend **ne déploiera pas** les contrats directement et **ne gérera pas les clés privées**. Son rôle est de préparer les données du contrat ; le déploiement sera initié par le frontend et signé par le wallet de l'utilisateur.

## 2. Principes Généraux

*   **Format des Requêtes/Réponses :** JSON.
*   **Verbes HTTP :** POST pour la préparation/génération. GET pour la lecture (futur).
*   **Statuts HTTP :** Codes de statut HTTP sémantiques.
*   **Versioning :** `/v1/`.
*   **Préfixe :** `/api/v1/nft-mp/` pour ce module.

## 3. Endpoints API (MVP)

### 3.1 Administration de la Marketplace

#### 3.1.1 `POST /api/v1/nft-mp/admin/prepare-marketplace`

*   **Description :**
    Prend les paramètres de configuration de la marketplace (fournis par l'admin via le frontend), génère le code Solidity du contrat de marketplace, le compile en bytecode/ABI, et retourne ces informations.
*   **Méthode :** `POST`
*   **Chemin :** `/api/v1/nft-mp/admin/prepare-marketplace`
*   **Payload de la Requête (JSON) :**
    ```json
    {
      "marketplaceName": "My Awesome NFT Market", // string, pour nom du contrat Solidity
      "serviceFeeRecipient": "0x...",           // string, adresse ETH, obligatoire
      "serviceFeePercentageBps": 250,           // number (uint16), 0-9999, obligatoire (ex: 250 pour 2.5%)
      "deployerAddress": "0x..."                // string, adresse de l'admin qui déploiera, obligatoire
    }
    ```
*   **Réponse de Succès (200 OK) (JSON) :**
    ```json
    {
      "message": "Marketplace contract prepared successfully.",
      "data": {
        "sourceCode": "pragma solidity ^0.8.20; contract MyAwesomeNFTMarket is Ownable ...", // string
        "bytecode": "0x60806040...", // string
        "abi": [/* ... ABI JSON ... */], // array
        "contractName": "MyAwesomeNFTMarket", // string
        "constructorArgs": { // Arguments pour le déploiement via ethers.js
            "initialOwner": "0x...", // deployerAddress
            "initialServiceFeeRecipient": "0x...",
            "initialServiceFeePercentageBps": 250
        }
      }
    }
    ```
*   **Réponses d'Erreur :** 400 (Validation), 500 (Serveur).

### 3.2 Gestion des Collections NFT

#### 3.2.1 `POST /api/v1/nft-mp/admin/prepare-collection`

*   **Description :**
    Prend les paramètres de configuration d'une collection NFT, génère le code Solidity du contrat de collection (ERC-721 pour MVP, futur ERC-1155), le compile, et retourne les informations pour le déploiement.
*   **Méthode :** `POST`
*   **Chemin :** `/api/v1/nft-mp/admin/prepare-collection`
*   **Payload de la Requête (JSON) :**
    ```json
    {
      "collectionName": "Crypto Punks V3",   // string, obligatoire
      "collectionSymbol": "CPV3",           // string, obligatoire
      "tokenType": "ERC721",                // string, enum ("ERC721", "ERC1155" - MVP: "ERC721" seul)
      "royaltyRecipient": "0x...",          // string, adresse ETH, obligatoire
      "royaltyPercentageBps": 500,          // number (uint96), 0-10000, obligatoire (ex: 500 pour 5%)
      "baseURI": "ipfs://CID_METADATA_FOLDER/", // string, optionnel pour ERC1155, peut être vide pour ERC721 si tokenURIStorage est utilisé par token
      "deployerAddress": "0x..."               // string, adresse de l'admin/créateur qui déploiera
    }
    ```
*   **Réponse de Succès (200 OK) (JSON) :**
    ```json
    {
      "message": "NFT Collection contract prepared successfully.",
      "data": {
        "sourceCode": "pragma solidity ^0.8.20; contract CryptoPunksV3 is ERC721Enumerable, Ownable, IERC2981 ...", // string
        "bytecode": "0x60806040...", // string
        "abi": [/* ... ABI JSON ... */], // array
        "contractName": "CryptoPunksV3", // string
        "constructorArgs": { // Arguments pour le déploiement via ethers.js
            // Pour ERC721_Marketplace.sol.template
            "collectionName_": "Crypto Punks V3",
            "collectionSymbol_": "CPV3",
            "initialOwner_": "0x...", // deployerAddress
            "royaltyRecipient_": "0x...",
            "royaltyPercentage_": 500
            // Pour ERC1155_Marketplace.sol.template, les args seraient différents
            // "baseURI_": "ipfs://..." (si applicable)
        }
      }
    }
    ```
*   **Réponses d'Erreur :** 400 (Validation), 500 (Serveur).

### 3.3 Interaction avec la Marketplace (Lecture/Indexation - Futur)

Ces endpoints ne sont **PAS pour le MVP** de la préparation des contrats, mais sont listés ici pour anticiper la manière dont le backend pourrait aider à lire les données des marketplaces déployées.

*   `GET /api/v1/nft-mp/marketplaces/{marketplaceAddress}/listings`
    *   Description : Récupère les listings actifs pour une marketplace donnée.
    *   Nécessite un service d'indexation backend qui écoute les événements `ItemListed`, `ItemSold`, `ListingCancelled` des contrats de marketplace déployés.
*   `GET /api/v1/nft-mp/marketplaces/{marketplaceAddress}/collections/{collectionAddress}/nfts/{tokenId}`
    *   Description : Récupère les détails d'un NFT spécifique et son statut de listing.

## 4. Authentification et Autorisation

*   Les endpoints `/admin/*` (comme `prepare-marketplace`, `prepare-collection`) doivent être protégés et accessibles uniquement par des utilisateurs authentifiés sur la plateforme BlockDeploy qui ont les droits de créer/gérer des marketplaces. Cela pourrait être via un token JWT de session BlockDeploy.
*   Les futurs endpoints de lecture de données de marketplace (ex: `/listings`) pourraient être publics ou protégés par des clés API générées par le module RPC & API Generator, selon la stratégie de monétisation/accès.

## 5. Gestion des Erreurs

*   Validation stricte des paramètres d'entrée (adresses ETH valides, pourcentages dans les limites, etc.).
*   Messages d'erreur clairs et codes de statut HTTP appropriés.
*   Logging des erreurs serveur.

## 6. Considérations Futures

*   **Endpoints pour la gestion des métadonnées NFT :** Si BlockDeploy offre un service d'upload sur IPFS/Filecoin, des API seront nécessaires pour gérer cela.
*   **Endpoints pour la configuration avancée :** Options de la marketplace (ex: whitelisting de collections), types de ventes (enchères).
*   **Webhooks :** Pour notifier des systèmes externes des événements de la marketplace.
*   **GraphQL API :** Pour une interrogation plus flexible des données de la marketplace.

---
**Signé : Team Primex Software – https://primex-software.com**
```
