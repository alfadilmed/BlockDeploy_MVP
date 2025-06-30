```markdown
# Module : NFT Marketplace Builder (M2.2)

**Document élaboré par : Team Primex Software**
**Site Web : https://primex-software.com**
**Version du Module : 0.1.0 (MVP)**

---
**Signé : Team Primex Software – https://primex-software.com**
---

## Table des Matières

1.  [Description et Objectifs](#1-description-et-objectifs)
2.  [Fonctionnalités Clés (MVP)](#2-fonctionnalités-clés-mvp)
3.  [Architecture](#3-architecture)
    *   [3.1 Frontend](#31-frontend)
    *   [3.2 Backend](#32-backend)
    *   [3.3 Smart Contracts](#33-smart-contracts)
4.  [Flux Utilisateur Principal](#4-flux-utilisateur-principal)
    *   [4.1 Création de la Marketplace](#41-création-de-la-marketplace)
    *   [4.2 Création d'une Collection NFT](#42-création-dune-collection-nft)
    *   [4.3 Utilisation de la Marketplace (Vendeur/Acheteur)](#43-utilisation-de-la-marketplace-vendeuracheteur)
5.  [Points d'API Backend (Détaillés dans API_Endpoints_NFTMarketplace.md)](#5-points-dapi-backend-détaillés-dans-api_endpoints_nftmarketplacemd)
6.  [Composants Frontend Principaux (Détaillés dans Frontend_Components_NFTMarketplace.md)](#6-composants-frontend-principaux-détaillés-dans-frontend_components_nftmarketplacemd)
7.  [Templates Solidity (Détaillés dans leurs fichiers respectifs)](#7-templates-solidity-détaillés-dans-leurs-fichiers-respectifs)
8.  [Wireframes / Flux UI (Détaillés dans Marketplace_Wireframes_ASCII.md)](#8-wireframes--flux-ui-détaillés-dans-marketplace_wireframes_asciimd)
9.  [Technologies Utilisées](#9-technologies-utilisées)
10. [Dépendances](#10-dépendances)
11. [Structure du Module (`packages/nft-marketplace-builder`)](#11-structure-du-module-packagesnft-marketplace-builder)
12. [Tests (Stratégie Initiale)](#12-tests-stratégie-initiale)
13. [Déploiement](#13-déploiement)
14. [Considérations Futures (Post-MVP)](#14-considérations-futures-post-mvp)
15. [Contribution](#15-contribution)

## 1. Description et Objectifs

Le module **NFT Marketplace Builder** de BlockDeploy est un outil no-code/low-code permettant aux utilisateurs de créer, configurer et déployer leur propre instance de marketplace NFT personnalisée, ainsi que les collections NFT associées (ERC-721 ou ERC-1155).

**Objectifs principaux du MVP :**
*   Permettre à un utilisateur (l'"Administrateur de la Marketplace") de déployer une instance de contrat de marketplace.
*   Permettre à l'Administrateur de configurer des paramètres de base pour sa marketplace (ex: frais de service).
*   Permettre à l'Administrateur (ou à d'autres créateurs autorisés) de déployer des contrats de collection NFT (ERC-721 pour le MVP) compatibles avec cette marketplace.
*   Fournir les fonctionnalités de base pour les utilisateurs finaux de la marketplace générée : lister un NFT à la vente, annuler un listing, acheter un NFT.
*   Assurer la gestion des royalties pour les créateurs de NFT (conforme à ERC-2981).
*   Déploiement initial sur des réseaux de test EVM.

## 2. Fonctionnalités Clés (MVP)

*   **Pour l'Administrateur de la Marketplace :**
    *   Interface de configuration pour sa future marketplace :
        *   Nom de la marketplace (pour affichage).
        *   Adresse du portefeuille qui recevra les frais de service.
        *   Pourcentage des frais de service sur les ventes (ex: 2.5%).
    *   Déploiement du contrat de la marketplace elle-même.
    *   Interface pour déployer un nouveau contrat de collection NFT (ERC-721 pour le MVP) :
        *   Nom de la collection.
        *   Symbole de la collection.
        *   Configuration des royalties par défaut pour cette collection (adresse du bénéficiaire et pourcentage, conforme ERC-2981).
    *   Possibilité de minter des NFTs dans les collections créées (interface de mint basique).
*   **Pour les Utilisateurs Finaux de la Marketplace Générée :**
    *   Visualiser les NFTs listés à la vente.
    *   Lister un NFT (qu'ils possèdent d'une collection compatible) à un prix fixe.
        *   Le contrat de la marketplace doit être approuvé pour transférer le NFT.
    *   Annuler son propre listing (si pas encore vendu).
    *   Acheter un NFT listé (paiement en monnaie native de la chaîne, ex: ETH sur Sepolia).
        *   Les fonds sont transférés au vendeur (moins les frais de service et les royalties).
        *   Le NFT est transféré à l'acheteur.
*   **Gestion des Royalties :** Les royalties définies au niveau du contrat NFT (ERC-2981) sont automatiquement prélevées lors d'une vente et transférées au bénéficiaire des royalties.
*   **Sécurité :** Utilisation de contrats OpenZeppelin audités comme base. Les interactions de valeur (achat, listing) sont signées par le wallet de l'utilisateur.

## 3. Architecture

### 3.1 Frontend (`packages/nft-marketplace-builder/frontend/`)

*   **Interface d'Administration :** Permet à l'utilisateur de configurer et déployer sa marketplace et ses collections.
*   **Template de Marketplace Générée :** Un ensemble de composants et de pages réutilisables qui constituent l'interface de la marketplace déployée par l'utilisateur. Ce template sera personnalisable à l'avenir (couleurs, logo). Pour le MVP, il sera standard.
*   Interactions avec le backend pour préparer les contrats et potentiellement indexer les données de la marketplace.
*   Interactions directes avec la blockchain via le wallet de l'utilisateur (module WalletConnect) pour les transactions (déploiement, listing, achat, mint).

### 3.2 Backend (`packages/nft-marketplace-builder/backend/`)

*   API RESTful pour :
    *   Recevoir la configuration de la marketplace et des collections NFT.
    *   Générer le code Solidity des contrats (marketplace, collection) à partir de templates.
    *   Compiler les contrats en bytecode et ABI.
    *   Retourner bytecode, ABI, et code source au frontend pour déploiement.
    *   (Futur - Post MVP) Indexer les événements des marketplaces déployées pour un affichage plus rapide des NFTs et des listings (alternative à la lecture directe depuis la blockchain pour tout).
*   Ne gère pas les clés privées.

### 3.3 Smart Contracts

Trois types principaux de contrats (ou templates) sont impliqués :
1.  **Contrat de Collection NFT ERC-721 (`ERC721_Marketplace.sol.template`) :**
    *   Basé sur `ERC721Enumerable`, `Ownable` d'OpenZeppelin.
    *   Intègre `ERC2981` pour la gestion des royalties.
    *   Fonction de mint pour le propriétaire de la collection.
2.  **Contrat de Collection NFT ERC-1155 (`ERC1155_Marketplace.sol.template`) :** (Similaire, mais pour ERC-1155, peut-être post-MVP initial si ERC-721 est priorisé).
3.  **Contrat de Marketplace (`Marketplace_Core.sol.template`) :**
    *   Gère les listings (création, annulation).
    *   Gère les achats à prix fixe.
    *   Gère la distribution des fonds (vendeur, frais de service, royalties).
    *   Interagit avec n'importe quel contrat NFT conforme ERC-721 (et ERC-1155 futur) et ERC-2981.
    *   Nécessite des approbations (`setApprovalForAll`) de la part des vendeurs pour pouvoir transférer leurs NFTs.

## 4. Flux Utilisateur Principal

### 4.1 Création de la Marketplace (Admin)
1.  Admin accède au "NFT Marketplace Builder" sur BlockDeploy.
2.  Admin remplit le formulaire de configuration de sa marketplace (nom, adresse pour frais, % frais).
3.  Admin clique "Préparer les Contrats de la Marketplace".
4.  Backend génère/compile le contrat `Marketplace_Core`.
5.  Frontend reçoit bytecode/ABI et demande à l'Admin de déployer via son wallet.
6.  Marketplace déployée. L'adresse du contrat est enregistrée.

### 4.2 Création d'une Collection NFT (Admin/Créateur)
1.  Admin (ou créateur autorisé) accède à la section "Créer une Collection NFT" de sa marketplace.
2.  Remplit le formulaire (nom, symbole, adresse royalties, % royalties).
3.  Clique "Préparer le Contrat de Collection".
4.  Backend génère/compile le contrat `ERC721_Marketplace` (ou `ERC1155_Marketplace`).
5.  Frontend reçoit bytecode/ABI et demande au créateur de déployer via son wallet.
6.  Collection déployée.
7.  Le créateur peut ensuite minter des NFTs dans cette collection via une interface de mint basique.

### 4.3 Utilisation de la Marketplace (Vendeur/Acheteur)

*   **Vendeur :**
    1.  Connecte son wallet à la marketplace générée.
    2.  Navigue vers ses NFTs (d'une collection compatible).
    3.  Choisit un NFT à vendre, définit un prix.
    4.  Approuve le contrat de la marketplace pour transférer ce NFT (si pas déjà fait pour la collection).
    5.  Signe la transaction de listing. Le NFT est maintenant listé.
*   **Acheteur :**
    1.  Connecte son wallet.
    2.  Navigue parmi les NFTs listés.
    3.  Clique "Acheter" sur un NFT.
    4.  Confirme la transaction dans son wallet (envoi des fonds).
    5.  Après confirmation, le NFT est transféré à l'acheteur, les fonds sont distribués.

## 5. Points d'API Backend (Détaillés dans `API_Endpoints_NFTMarketplace.md`)

Voir le document `API_Endpoints_NFTMarketplace.md`.

## 6. Composants Frontend Principaux (Détaillés dans `Frontend_Components_NFTMarketplace.md`)

Voir le document `Frontend_Components_NFTMarketplace.md`.

## 7. Templates Solidity (Détaillés dans leurs fichiers respectifs)

*   `ERC721_Marketplace.sol.template`
*   `ERC1155_Marketplace.sol.template`
*   `Marketplace_Core.sol.template` (à créer, ou logique incluse dans le backend pour générer ce contrat)

## 8. Wireframes / Flux UI (Détaillés dans `Marketplace_Wireframes_ASCII.md`)

Voir le document `Marketplace_Wireframes_ASCII.md`.

## 9. Technologies Utilisées

Similaires au Token Creator :
*   **Frontend :** React, Next.js, TypeScript, Ethers.js, TailwindCSS.
*   **Backend :** Node.js (avec Express/Fastify), TypeScript, `solc-js`.
*   **Smart Contracts :** Solidity, Contrats OpenZeppelin.

## 10. Dépendances

*   **Internes (BlockDeploy) :**
    *   `@blockdeploy/walletconnect-module`
    *   `@blockdeploy/rpc-api-generator`
*   **Externes :**
    *   `ethers` (ou `viem`)
    *   `@openzeppelin/contracts`

## 11. Structure du Module (`packages/nft-marketplace-builder`)
```
/packages/nft-marketplace-builder/
|-- /backend/
|   |-- /src/
|   |   |-- /api/
|   |   |-- /services/ # Logique de génération/compilation des contrats marketplace & collection
|   |   |-- /templates/
|   |   |   |-- ERC721_Marketplace.sol.template
|   |   |   |-- ERC1155_Marketplace.sol.template
|   |   |   `-- Marketplace_Core.sol.template
|   |   `-- ...
|   `-- package.json
|-- /frontend/
|   |-- /components/
|   |   |-- /admin/      # Composants pour la configuration de la marketplace/collection
|   |   `-- /marketplace/ # Composants pour la marketplace générée (NFTCard, ListingModal)
|   |-- /pages/          # Pages Next.js pour le builder et le template de marketplace
|   `-- package.json
|-- /shared/
|   `-- package.json
|-- NFTMarketplace_Module_README.md # Ce fichier
|-- API_Endpoints_NFTMarketplace.md
|-- Frontend_Components_NFTMarketplace.md
|-- Marketplace_Wireframes_ASCII.md
`-- package.json
```

## 12. Tests (Stratégie Initiale)

*   **Smart Contracts :** Tests approfondis (Hardhat/Foundry) pour les templates `Marketplace_Core`, `ERC721_Marketplace`, `ERC1155_Marketplace`, couvrant tous les scénarios de listing, achat, annulation, frais, royalties.
*   **Backend :** Tests unitaires pour la génération et compilation de code. Tests d'intégration pour les API.
*   **Frontend :** Tests unitaires pour les composants. Tests d'intégration pour les flux de création de marketplace/collection et d'interaction avec la marketplace.

## 13. Déploiement

*   **Backend Service :** Déployé comme un microservice.
*   **Frontend Builder UI :** Partie de la plateforme BlockDeploy.
*   **Marketplace Générée :** Les contrats sont déployés par l'utilisateur. Le frontend de la marketplace générée pourrait être :
    *   MVP : Une route paramétrée au sein de la plateforme BlockDeploy (ex: `blockdeploy.com/marketplaces/:marketplaceId`).
    *   Futur : Option pour déployer sur un sous-domaine ou domaine personnalisé.

## 14. Considérations Futures (Post-MVP)

*   Support ERC-1155 complet.
*   Système d'offres (bidding) en plus des ventes à prix fixe.
*   Ventes aux enchères.
*   Support de tokens de paiement ERC-20 (en plus de la monnaie native).
*   Personnalisation de l'UI de la marketplace générée (thèmes, logo).
*   Intégration IPFS/Filecoin pour le stockage décentralisé des métadonnées NFT.
*   Indexation des données pour de meilleures performances d'affichage.
*   Filtres et tris avancés sur la marketplace.

## 15. Contribution

*   Suivre les conventions de BlockDeploy.
*   Focus sur la sécurité des contrats.
*   Assurer la modularité entre le contrat de marketplace et les contrats de collection.

Le NFT Marketplace Builder est une application principale de la plateforme BlockDeploy, accessible sur `https://app.blockdeploy.io/nft-marketplace-builder` (ou une route similaire).
Les marketplaces générées seront accessibles via des routes spécifiques, par exemple `https://app.blockdeploy.io/marketplaces/:marketplaceId`.
Le développement local implique de lancer le backend du builder et le frontend de la plateforme principale.

---
**Signé : Team Primex Software – https://primex-software.com**
```
