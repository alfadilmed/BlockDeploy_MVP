```markdown
# API Endpoints - Module : Token Creator

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
    *   [3.1 `POST /api/v1/token-creator/prepare-contract`](#31-post-apiv1token-creatorprepare-contract)
    *   [3.2 `POST /api/v1/token-creator/get-source-code`](#32-post-apiv1token-creatorget-source-code)
4.  [Authentification et Autorisation](#4-authentification-et-autorisation)
5.  [Gestion des Erreurs](#5-gestion-des-erreurs)
6.  [Considérations Futures](#6-considérations-futures)

## 1. Introduction

Ce document décrit les points d'API (API endpoints) exposés par le backend du module Token Creator. Ces API permettent au frontend de soumettre les configurations de token souhaitées par l'utilisateur, de générer le code Solidity correspondant, de le compiler en bytecode et ABI, et de préparer les informations nécessaires au déploiement.

**Important :** Pour des raisons de sécurité et de décentralisation, le backend du Token Creator **ne déploiera pas** les contrats directement et **ne gérera pas les clés privées** des utilisateurs. Son rôle est de préparer les données du contrat ; le déploiement effectif sera initié par le frontend et signé par le wallet de l'utilisateur.

## 2. Principes Généraux

*   **Format des Requêtes/Réponses :** JSON.
*   **Verbes HTTP :** Utilisation sémantique des verbes HTTP (POST pour la création/préparation).
*   **Statuts HTTP :** Utilisation des codes de statut HTTP appropriés (200, 201, 400, 500, etc.).
*   **Versioning :** Les API sont versionnées (ex: `/v1/`).

## 3. Endpoints API (MVP)

### 3.1 `POST /api/v1/token-creator/prepare-contract`

*   **Description :**
    Prend les paramètres de configuration du token fournis par l'utilisateur (via le frontend), sélectionne et remplit le template Solidity approprié, compile le contrat en bytecode et ABI, et retourne ces informations ainsi que le code source généré.
*   **Méthode :** `POST`
*   **Chemin :** `/api/v1/token-creator/prepare-contract`
*   **Payload de la Requête (JSON) :**
    ```json
    {
      "tokenName": "My Test Token", // string, obligatoire
      "tokenSymbol": "MTT",        // string, obligatoire, généralement 3-5 caractères
      "initialSupply": "1000000",   // string (pour gérer les grands nombres), obligatoire
      "decimals": 18,               // number (uint8), obligatoire, défaut à 18
      "ownerAddress": "0x...",     // string, adresse de l'utilisateur qui déploiera, obligatoire
      "features": {
        "isMintable": true,         // boolean, optionnel, défaut à false
        "isBurnable": false         // boolean, optionnel, défaut à false
        // "isPausable": false,     // Futur
        // "hasTaxes": false        // Futur
      },
      "license": "MIT"              // string, optionnel, défaut à "MIT"
    }
    ```
*   **Réponse de Succès (200 OK) (JSON) :**
    ```json
    {
      "message": "Contract prepared successfully.",
      "data": {
        "sourceCode": "pragma solidity ^0.8.20; contract MyTestToken is ERC20, Ownable ...", // string, code Solidity généré
        "bytecode": "0x608060405234801561001057600080fd5b50610...", // string, bytecode du contrat compilé
        "abi": [/* ... ABI JSON ... */], // array, ABI du contrat compilé
        "contractName": "MyTestToken", // string, nom du contrat principal (ex: MyTestToken)
        "constructorArgs": { // Arguments à passer au constructeur lors du déploiement via ethers.js
            "tokenName": "My Test Token",
            "tokenSymbol": "MTT",
            "initialSupply": "1000000000000000000000000", // initialSupply ajusté avec les décimales
            "initialOwner": "0x..." // ownerAddress fourni
        },
        "estimatedGas": "1500000" // string, estimation du gas pour le déploiement (optionnel, peut être mieux géré côté client)
      }
    }
    ```
*   **Réponses d'Erreur :**
    *   `400 Bad Request`: Si les paramètres de la requête sont invalides (champs manquants, types incorrects, etc.). Le corps de la réponse contiendra des détails sur l'erreur.
        ```json
        {
          "error": "Validation Error",
          "details": {
            "tokenName": "tokenName is required"
          }
        }
        ```
    *   `500 Internal Server Error`: Si une erreur survient lors de la génération du code, de la compilation, ou autre erreur serveur.
        ```json
        {
          "error": "Internal Server Error",
          "message": "Failed to compile Solidity contract."
        }
        ```

### 3.2 `POST /api/v1/token-creator/get-source-code`

*   **Description :**
    Permet à l'utilisateur de récupérer uniquement le code source Solidity généré pour une configuration donnée, sans nécessairement compiler ou préparer le bytecode. Utile pour une prévisualisation du code.
*   **Méthode :** `POST`
*   **Chemin :** `/api/v1/token-creator/get-source-code`
*   **Payload de la Requête (JSON) :**
    Identique au payload de `/prepare-contract`.
    ```json
    {
      "tokenName": "My Preview Token",
      "tokenSymbol": "MPT",
      "initialSupply": "50000",
      "decimals": 18,
      "ownerAddress": "0x...", // Peut être optionnel ici si seul le code est voulu
      "features": {
        "isMintable": false,
        "isBurnable": true
      },
      "license": "MIT"
    }
    ```
*   **Réponse de Succès (200 OK) (JSON) :**
    ```json
    {
      "message": "Source code generated successfully.",
      "data": {
        "sourceCode": "pragma solidity ^0.8.20; contract MyPreviewToken is ERC20, ERC20Burnable, Ownable ...", // string
        "contractName": "MyPreviewToken"
      }
    }
    ```
*   **Réponses d'Erreur :** Similaires à `/prepare-contract`.

## 4. Authentification et Autorisation

*   Pour le MVP, ces endpoints pourraient être ouverts ou protégés par une simple clé API globale pour le service backend lui-même (non spécifique à l'utilisateur).
*   **Futur :** L'accès à ces API pourrait être lié à l'authentification de l'utilisateur sur la plateforme BlockDeploy (via JWT ou session) et potentiellement à des plans d'abonnement ou des quotas d'utilisation.

## 5. Gestion des Erreurs

*   Le backend doit valider soigneusement tous les paramètres d'entrée.
*   Les messages d'erreur doivent être clairs et utiles pour le débogage par le frontend.
*   Utiliser des codes de statut HTTP sémantiques.
*   Logger les erreurs serveur pour diagnostic.

## 6. Considérations Futures

*   **Endpoint pour Lister les Templates :** `GET /api/v1/token-creator/templates` pour permettre au frontend de découvrir dynamiquement les types de tokens/contrats disponibles.
*   **Validation Avancée des Paramètres :** Vérifier la longueur du symbole, les conflits de noms potentiels (via des services externes ?), etc.
*   **Support pour d'Autres Standards de Tokens :** ERC721, ERC1155 (seront gérés par leurs modules respectifs, mais pourraient partager une infrastructure backend).
*   **Gestion des Versions de `solc` :** Permettre de choisir ou d'afficher la version du compilateur Solidity utilisée.
*   **Sauvegarde des Configurations :** Permettre aux utilisateurs de sauvegarder leurs configurations de token pour une utilisation ultérieure.

---
**Signé : Team Primex Software – https://primex-software.com**
```
