```markdown
# Module : RPC & API Generator

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
3.  [Technologies Utilisées (Envisagées)](#3-technologies-utilisées-envisagées)
4.  [Architecture et Structure du Module](#4-architecture-et-structure-du-module)
    *   [4.1 Composants Principaux](#41-composants-principaux)
    *   [4.2 Arborescence Envisagée](#42-arborescence-envisagée)
5.  [Points d'API Exposés (MVP)](#5-points-dapi-exposés-mvp)
6.  [Flux de Données (Diagramme/Description)](#6-flux-de-données-diagrammedescription)
    *   [6.1 Flux Requête RPC via Proxy](#61-flux-requête-rpc-via-proxy)
    *   [6.2 Flux Génération/Utilisation Clé API BlockDeploy](#62-flux-générationutilisation-clé-api-blockdeploy)
7.  [Intégration Prévue](#7-intégration-prévue)
8.  [Scalabilité et Sécurité](#8-scalabilité-et-sécurité)
9.  [Installation (pour contributeurs)](#9-installation-pour-contributeurs)
10. [Tests](#10-tests)
11. [Contribution](#11-contribution)

## 1. Description et Objectifs

Le module **RPC & API Generator** vise à fournir deux services essentiels pour la plateforme BlockDeploy et ses utilisateurs :

1.  **RPC Proxy Managé :** Offrir des endpoints RPC (Remote Procedure Call) fiables et managés pour interagir avec diverses blockchains (Ethereum, Polygon, BNB Chain, etc.). Cela permet aux utilisateurs et aux dApps de BlockDeploy de ne pas dépendre exclusivement de RPC publics parfois instables ou limités, et de simplifier la configuration multi-chaînes.
2.  **Gestion de Clés API BlockDeploy :** Permettre aux utilisateurs (et potentiellement aux services internes) de générer et gérer des clés API pour accéder de manière programmatique à certaines fonctionnalités de la plateforme BlockDeploy (ex: créer un token via API, lancer un déploiement, etc. - fonctionnalités futures).

**Objectifs principaux :**
*   **Fiabilité RPC :** Fournir un accès stable aux nœuds blockchain.
*   **Simplification :** Faciliter l'accès multi-chaînes via des endpoints BlockDeploy.
*   **Contrôle d'Accès :** Mettre en place un système d'authentification (via clés API BlockDeploy) pour les endpoints RPC managés et les API de la plateforme.
*   **Monitoring (Futur) :** Permettre le suivi de l'utilisation des endpoints RPC et des clés API.
*   **Sécurité :** Protéger les accès et prévenir les abus.
*   **Scalabilité :** Concevoir une architecture capable de supporter une charge croissante.

## 2. Fonctionnalités (MVP et Futures)

### 2.1 MVP (Minimum Viable Product)

*   **Proxy RPC de Base :**
    *   Redirection des appels RPC vers un fournisseur externe (ex: Infura, Alchemy, Ankr) pour au moins une blockchain EVM de test (ex: Goerli/Sepolia).
    *   Endpoint unique exposé par BlockDeploy qui route vers le fournisseur externe en fonction du Chain ID (passé en paramètre ou dans le chemin).
    *   Pas de gestion de clé API utilisateur pour le RPC Proxy dans le MVP (accès ouvert ou clé globale interne).
*   **Génération de Clé API BlockDeploy (Mock/Simple) :**
    *   Interface utilisateur (simple) pour qu'un utilisateur authentifié sur BlockDeploy puisse "générer" une clé API factice (chaîne de caractères aléatoire).
    *   Stockage basique de cette clé (peut être en mémoire ou base de données simple pour le MVP).
    *   Un endpoint d'API BlockDeploy (ex: `/api/v1/blockdeploy/ping` ou `/api/v1/blockdeploy/me`) protégé par cette clé API factice pour tester le mécanisme d'authentification.
*   **Documentation de base** pour utiliser le proxy RPC (endpoint et chainId) et l'API mockée.

### 2.2 Futures

*   **Gestion Complète des Clés API BlockDeploy :**
    *   Interface utilisateur pour créer, lister, révoquer des clés API.
    *   Permissions granulaires associées aux clés (quels services/endpoints sont accessibles).
    *   Statistiques d'utilisation par clé.
*   **Authentification pour RPC Proxy :** Utilisation des clés API BlockDeploy pour accéder aux endpoints RPC managés.
*   **Rate Limiting et Quotas :** Sur les endpoints RPC et les API BlockDeploy.
*   **Support Multi-Chaînes Étendu pour RPC Proxy :** Intégration de plusieurs blockchains (mainnets et testnets).
*   **Load Balancing / Failover :** Pour les connexions aux nœuds blockchain (si BlockDeploy gère ses propres nœuds ou plusieurs fournisseurs).
*   **Caching :** Pour les requêtes RPC fréquentes et non sensibles au temps.
*   **Tableau de Bord Utilisateur :** Pour visualiser l'utilisation RPC/API, gérer les clés, configurer les alertes.
*   **API Programmatique Complète pour BlockDeploy :** Exposer toutes les fonctionnalités des dApps via des API sécurisées.

## 3. Technologies Utilisées (Envisagées)

*   **Backend (API Gateway / RPC Proxy) :**
    *   **Langage/Framework :** Node.js avec Express/Fastify, ou Go (pour la performance).
    *   **Base de Données (pour clés API, logs, etc.) :** PostgreSQL, MongoDB, ou Redis (pour rate limiting, caching).
*   **Proxying (si service dédié) :** Nginx, Envoy, ou solution custom en Node.js/Go.
*   **Frontend (Interface de gestion des clés API) :** React/Next.js (s'intègre à la plateforme BlockDeploy existante).
*   **Fournisseurs RPC Externes (pour le MVP et potentiellement au-delà) :** Infura, Alchemy, Ankr, QuickNode.
*   **Authentification :** JWT (JSON Web Tokens) ou mécanismes similaires pour sécuriser les API de gestion de BlockDeploy.

## 4. Architecture et Structure du Module

### 4.1 Composants Principaux

1.  **API Gateway / Management Service (Backend) :**
    *   Expose les endpoints pour la gestion des clés API BlockDeploy (`/api/v1/blockdeploy/apikeys/...`).
    *   Gère l'authentification des utilisateurs pour accéder à ces fonctions de gestion.
    *   Interagit avec la base de données pour stocker/récupérer les clés et les permissions.
2.  **RPC Proxy Service (Backend) :**
    *   Expose les endpoints RPC publics de BlockDeploy (ex: `https://rpc.blockdeploy.com/:chainId`).
    *   Valide les requêtes (et les clés API dans le futur).
    *   Route les requêtes RPC vers le nœud blockchain approprié (fournisseur externe ou nœud interne).
    *   Gère le rate limiting et le logging.
3.  **Interface Utilisateur (Frontend) :**
    *   Section dans le tableau de bord BlockDeploy pour la gestion des clés API (création, visualisation, révocation).

### 4.2 Arborescence Envisagée

Ce module aura une composante backend significative et une petite partie frontend.

**Backend (`packages/rpc-api-generator/backend` ou `services/rpc-api-service`):**
```
/rpc-api-generator-backend/
|-- /src/
|   |-- /api/                     # Contrôleurs pour l'API de gestion des clés BlockDeploy
|   |   |-- routes/
|   |   |   `-- apiKeyRoutes.ts
|   |   `-- controllers/
|   |       `-- apiKeyController.ts
|   |-- /proxy/                   # Logique du proxy RPC
|   |   |-- rpcHandler.ts         # Gère les requêtes RPC
|   |   `-- chainRegistry.ts      # Configuration des chaînes supportées et leurs RPC sources
|   |-- /middleware/              # Middlewares Express/Fastify (auth, rate-limit)
|   |   |-- authMiddleware.ts
|   |   `-- rateLimitMiddleware.ts
|   |-- /services/                # Logique métier
|   |   |-- apiKeyService.ts      # CRUD pour les clés API
|   |   `-- rpcRoutingService.ts  # Logique de routage RPC
|   |-- /config/                  # Configuration (DB, chaînes, fournisseurs RPC)
|   |   `-- index.ts
|   |-- /models/                  # Modèles de données (si ORM/ODM)
|   |   `-- ApiKeyModel.ts
|   |-- app.ts                    # Initialisation de l'application Express/Fastify
|   `-- server.ts                 # Démarrage du serveur
|-- /tests/
|-- Dockerfile
|-- package.json
`-- README.md                   # Ce fichier (ou un lien vers celui-ci)
```

**Frontend (partie du dashboard BlockDeploy, ex: `packages/dashboard/src/features/api-keys`):**
```
/dashboard/src/features/api-keys/
|-- /components/
|   |-- ApiKeyList.tsx
|   |-- CreateApiKeyModal.tsx
|   `-- ApiKeyRow.tsx
|-- /services/
|   `-- apiKeyApiService.ts    # Fonctions pour appeler le backend de gestion des clés
|-- index.tsx                  # Page principale de gestion des clés API
`-- ...
```

## 5. Points d'API Exposés (MVP)

**Pour le RPC Proxy (Backend) :**
*   `POST https://rpc.blockdeploy.com/{chainId}` (ou `https://rpc.blockdeploy.com/`, avec chainId dans le corps de la requête JSON-RPC)
    *   **Description :** Endpoint recevant les requêtes JSON-RPC standard.
    *   **{chainId} :** L'ID de la chaîne cible (ex: 1 pour Ethereum Mainnet, 5 pour Goerli).
    *   **Corps de la requête :** Payload JSON-RPC standard (ex: `{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}`).
    *   **Réponse :** Réponse JSON-RPC standard du nœud blockchain.
    *   **Authentification MVP :** Aucune ou clé globale interne.

**Pour la Gestion des Clés API BlockDeploy (Backend - API interne à BlockDeploy) :**
*   `POST /api/v1/blockdeploy/apikeys` (Protégé par l'authentification utilisateur BlockDeploy)
    *   **Description :** Génère une nouvelle clé API (factice pour le MVP) pour l'utilisateur authentifié.
    *   **Payload :** `{ name: string }` (un nom descriptif pour la clé).
    *   **Réponse :** `{ apiKey: string, name: string, createdAt: date }`.
*   `GET /api/v1/blockdeploy/apikeys` (Protégé par l'authentification utilisateur BlockDeploy)
    *   **Description :** Liste les clés API (factices) de l'utilisateur.
    *   **Réponse :** `[{ apiKey: "********" (masquée), name: string, createdAt: date }]`.
*   `DELETE /api/v1/blockdeploy/apikeys/{keyName}` (Protégé par l'authentification utilisateur BlockDeploy)
    *   **Description :** Supprime une clé API (factice).
*   `GET /api/v1/blockdeploy/me` (Protégé par une clé API BlockDeploy générée)
    *   **Description :** Endpoint de test pour vérifier la validité d'une clé API BlockDeploy.
    *   **Header Requis :** `Authorization: Bearer VOTRE_CLE_API_BLOCKDEPLOY` ou `X-API-Key: VOTRE_CLE_API_BLOCKDEPLOY`.
    *   **Réponse :** `{ message: "API Key valid", userDetails: { ... } }` (ou juste un pong).

## 6. Flux de Données (Diagramme/Description)

### 6.1 Flux Requête RPC via Proxy (MVP)

```
Utilisateur/dApp --(JSON-RPC Request on rpc.blockdeploy.com/{chainId})--> [BlockDeploy RPC Proxy Service]
                                                                                |
                                                                                1. Analyse {chainId}
                                                                                2. Récupère l'URL du fournisseur RPC externe pour ce chainId (ex: Infura URL pour Goerli)
                                                                                3. Transfère la requête JSON-RPC
                                                                                |
                                                                                v
                                                                    [Fournisseur RPC Externe (Infura/Alchemy)]
                                                                                |
                                                                                4. Traite la requête
                                                                                |
                                                                                v
Utilisateur/dApp <--(JSON-RPC Response)-- [BlockDeploy RPC Proxy Service] <--(JSON-RPC Response)-- [Fournisseur RPC Externe]
```

### 6.2 Flux Génération/Utilisation Clé API BlockDeploy (MVP)

**Génération :**
```
Utilisateur (sur Dashboard BlockDeploy) --(1. Clique "Générer Clé API")--> [Frontend Dashboard]
                                                                                |
                                                                                2. Appel API POST /api/v1/blockdeploy/apikeys (avec token auth utilisateur)
                                                                                |
                                                                                v
                                                                    [BlockDeploy API Management Service]
                                                                                |
                                                                                3. Génère clé factice, la stocke (ou pas pour MVP strict)
                                                                                4. Retourne la clé au Frontend
                                                                                |
                                                                                v
Utilisateur <--(5. Affiche la clé générée)-- [Frontend Dashboard]
```

**Utilisation (Test) :**
```
Développeur/Script --(1. Appel GET /api/v1/blockdeploy/me avec Header X-API-Key)--> [BlockDeploy API Management Service]
                                                                                              |
                                                                                              2. Valide la clé API (factice)
                                                                                              3. Retourne une réponse de succès/échec
                                                                                              |
                                                                                              v
Développeur/Script <--(4. Reçoit la réponse)--
```

## 7. Intégration Prévue

*   **RPC Proxy :**
    *   Utilisé par les dApps de BlockDeploy (Token Creator, NFT Marketplace Builder, etc.) pour leurs interactions blockchain par défaut.
    *   Peut être exposé aux utilisateurs avancés de BlockDeploy comme un service.
*   **API BlockDeploy :**
    *   Initialement pour des tests et usages internes.
    *   Futur : permettra l'automatisation et l'intégration de BlockDeploy dans des workflows externes.

## 8. Scalabilité et Sécurité

*   **Scalabilité (Futur) :**
    *   Le service RPC Proxy peut être stateless et donc facilement scalable horizontalement.
    *   Utilisation de load balancers.
    *   Choix de technologies performantes (Go, Node.js avec Fastify).
    *   Considérer des solutions de type "serverless" pour certaines parties.
*   **Sécurité :**
    *   Protection des endpoints de gestion des clés API par authentification robuste.
    *   Validation et sanitation des entrées pour toutes les API.
    *   HTTPS partout.
    *   Rate limiting pour prévenir les abus.
    *   Stockage sécurisé des clés API (hashées si possible, bien que leur nature soit d'être utilisées directement).
    *   Pour le RPC Proxy : ne jamais exposer de clés privées ou d'informations sensibles des nœuds.

## 9. Installation (pour contributeurs)

Le backend sera un service Node.js/Go.
```bash
# Depuis la racine du monorepo
cd services/rpc-api-service # ou chemin équivalent
yarn install # ou npm install / go mod download

# Variables d'environnement (pour .env)
# RPC_PROVIDER_GOERLI_URL=https://goerli.infura.io/v3/YOUR_INFURA_ID
# DATABASE_URL=... (si DB utilisée)
# JWT_SECRET=... (pour l'auth des API de gestion)

yarn dev # ou go run main.go
```

## 10. Tests

*   **Tests Unitaires :**
    *   Tester la logique de routage du proxy.
    *   Tester les services de génération/validation de clés API (même si mockées).
*   **Tests d'Intégration :**
    *   Envoyer une requête RPC réelle via le proxy vers un testnet et vérifier la réponse.
    *   Tester le cycle de vie complet d'une clé API BlockDeploy (génération, utilisation sur endpoint mock, suppression).
*   **Tests de Charge (Futur) :** Pour le RPC Proxy.

## 11. Contribution

*   Respecter les conventions de code.
*   Prioriser la sécurité lors de l'ajout de nouvelles fonctionnalités.
*   Documenter les nouveaux endpoints API (format OpenAPI/Swagger).
*   Assurer la compatibilité multi-chaînes lors de l'ajout de nouvelles chaînes au proxy.

---
**Signé : Team Primex Software – https://primex-software.com**
```
