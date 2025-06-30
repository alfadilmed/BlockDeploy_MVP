```markdown
# Composants Frontend Principaux - Module : NFT Marketplace Builder

**Document élaboré par : Team Primex Software**
**Site Web : https://primex-software.com**
**Version : 1.0**

---
**Signé : Team Primex Software – https://primex-software.com**
---

## Table des Matières

1.  [Introduction](#1-introduction)
2.  [Catégories de Composants](#2-catégories-de-composants)
3.  [Composants d'Administration/Configuration (Builder UI)](#3-composants-dadministrationconfiguration-builder-ui)
    *   [3.1 `MarketplaceConfiguratorLayout`](#31-marketplaceconfiguratorlayout)
    *   [3.2 `MarketplaceSettingsForm`](#32-marketplacesettingsform)
    *   [3.3 `CollectionCreateForm`](#33-collectioncreateform)
    *   [3.4 `CollectionDeployActions`](#34-collectiondeployactions)
    *   [3.5 `MarketplaceDeployActions`](#35-marketplacedeployactions)
    *   [3.6 `MintNFTForm`](#36-mintnftform)
4.  [Composants de la Marketplace Générée (Template UI)](#4-composants-de-la-marketplace-générée-template-ui)
    *   [4.1 `MarketplaceLayout`](#41-marketplacelayout)
    *   [4.2 `NFTCard`](#42-nftcard)
    *   [4.3 `NFTGrid`](#43-nftgrid)
    *   [4.4 `NFTDetailView`](#44-nftdetailview)
    *   [4.5 `ListNFTModal`](#45-listnftmodal)
    *   [4.6 `BuyNFTButton`](#46-buynftbutton)
    *   [4.7 `CancelListingButton`](#47-cancellistingbutton)
    *   [4.8 `UserCollectionNFTs`](#48-usercollectionnfts)
5.  [Gestion de l'État Frontend](#5-gestion-de-létat-frontend)

## 1. Introduction

Ce document décrit les principaux composants React (ou équivalent) pour l'interface utilisateur du module NFT Marketplace Builder. Ces composants se divisent en deux catégories principales :
1.  **Composants d'Administration/Configuration :** Utilisés par l'administrateur pour créer et configurer sa marketplace et ses collections NFT.
2.  **Composants de la Marketplace Générée :** Composants qui formeront le template de la marketplace accessible aux acheteurs et vendeurs.

Ces composants seront situés dans `packages/nft-marketplace-builder/frontend/components/`.

## 2. Catégories de Composants

*   **Builder UI :** Interface permettant à un utilisateur BlockDeploy de définir les paramètres de SA propre marketplace et des collections NFT associées.
*   **Template UI :** Interface de la marketplace NFT qui sera effectivement utilisée par les acheteurs et les vendeurs. Cette interface est générée/configurée par le Builder UI.

## 3. Composants d'Administration/Configuration (Builder UI)

### 3.1 `MarketplaceConfiguratorLayout`

*   **Description :** Layout principal pour la section "NFT Marketplace Builder" au sein de BlockDeploy. Organise les étapes de création et de gestion.
*   **Contient :** Navigation (ex: "Paramètres Marketplace", "Mes Collections"), et affiche les formulaires/actions appropriés.

### 3.2 `MarketplaceSettingsForm`

*   **Description :** Formulaire permettant à l'administrateur de définir les paramètres de sa marketplace.
*   **Champs / Contrôles :**
    *   Input pour "Nom de la Marketplace" (pour affichage, nom du contrat Solidity).
    *   Input pour "Adresse du Bénéficiaire des Frais de Service".
    *   Input (number/slider) pour "Pourcentage des Frais de Service (BPS)".
*   **Actions :** `onSaveSettings` (pourrait appeler le backend pour `prepare-marketplace`).

### 3.3 `CollectionCreateForm`

*   **Description :** Formulaire pour définir les paramètres d'une nouvelle collection NFT.
*   **Champs / Contrôles :**
    *   Input pour "Nom de la Collection".
    *   Input pour "Symbole de la Collection".
    *   Select pour "Type de Token" (MVP: ERC721, Futur: ERC1155).
    *   Input pour "Adresse du Bénéficiaire des Royalties".
    *   Input (number/slider) pour "Pourcentage des Royalties (BPS)".
    *   Input pour "Base URI" (optionnel, pour ERC1155 ou ERC721 avec URI commun).
*   **Actions :** `onSaveCollectionSettings` (pourrait appeler backend pour `prepare-collection`).

### 3.4 `CollectionDeployActions`

*   **Description :** Section affichée après la configuration d'une collection, permettant de lancer son déploiement.
*   **Contient :**
    *   Bouton "Préparer le Contrat de Collection".
    *   Feedback sur la préparation (bytecode/ABI si affiché).
    *   Bouton "Déployer la Collection avec [Wallet]".
    *   Affichage du statut de déploiement et de l'adresse du contrat.

### 3.5 `MarketplaceDeployActions`

*   **Description :** Section affichée après la configuration de la marketplace, permettant son déploiement.
*   **Contient :**
    *   Bouton "Préparer le Contrat de Marketplace".
    *   Feedback.
    *   Bouton "Déployer la Marketplace avec [Wallet]".
    *   Affichage du statut et de l'adresse du contrat.

### 3.6 `MintNFTForm` (dans la gestion d'une collection déployée)

*   **Description :** Formulaire simple permettant à l'owner d'une collection de minter de nouveaux NFTs.
*   **Champs / Contrôles (pour ERC721) :**
    *   Input pour "Adresse du Destinataire".
    *   Input pour "Token URI" (lien vers les métadonnées JSON sur IPFS ou ailleurs).
*   **Actions :** Bouton "Minter le NFT" (interagit avec le contrat de collection via wallet).

## 4. Composants de la Marketplace Générée (Template UI)

Ces composants formeront l'interface de la marketplace que les utilisateurs finaux verront (ex: `blockdeploy.com/marketplaces/MaSuperMarketplace`).

### 4.1 `MarketplaceLayout`

*   **Description :** Layout principal pour une instance de marketplace générée.
*   **Contient :** Header (avec nom de la marketplace, liens de navigation "Explorer", "Mes NFTs", bouton de connexion wallet), Footer. Le contenu principal (grille de NFTs, détail NFT) est affiché dynamiquement.
*   **Props :** `marketplaceConfig` (nom, etc.).

### 4.2 `NFTCard`

*   **Description :** Affiche un aperçu d'un NFT listé ou non.
*   **Contient :**
    *   Image/Vidéo du NFT (depuis métadonnées).
    *   Nom du NFT.
    *   Nom de la Collection.
    *   Prix (si listé).
    *   Bouton "Acheter" ou "Voir Détails".
*   **Props :** `nftMetadata`, `listingInfo` (optionnel).

### 4.3 `NFTGrid`

*   **Description :** Affiche une grille de `NFTCard`.
*   **Contient :** `NFTCard` multiples, filtres (optionnel MVP), pagination (optionnel MVP).
*   **Props :** `nfts` (tableau de données NFT/listing).

### 4.4 `NFTDetailView`

*   **Description :** Page ou section affichant les détails complets d'un NFT.
*   **Contient :**
    *   Grande image/vidéo du NFT.
    *   Nom, description, attributs (depuis métadonnées).
    *   Informations sur la collection.
    *   Propriétaire actuel.
    *   Historique des transactions (futur).
    *   Si listé : Prix, bouton "Acheter".
    *   Si possédé par l'utilisateur connecté : Bouton "Lister à la Vente" ou "Annuler Listing".
*   **Props :** `nftId`, `collectionAddress`, `marketplaceAddress`.

### 4.5 `ListNFTModal`

*   **Description :** Modale permettant à un propriétaire de NFT de le lister à la vente.
*   **Champs / Contrôles :**
    *   Input pour "Prix de Vente" (en monnaie native).
    *   (Pour ERC1155) Input pour "Quantité à Vendre".
    *   Résumé des frais (service fee, royalties estimées).
*   **Actions :** Bouton "Approuver le Contrat" (si nécessaire), Bouton "Lister l'Objet".

### 4.6 `BuyNFTButton`

*   **Description :** Bouton pour initier l'achat d'un NFT listé.
*   **Logique :**
    *   Vérifie la connexion du wallet.
    *   Demande confirmation à l'utilisateur via son wallet pour la transaction d'achat (envoi des fonds).
*   **Props :** `listingId`, `price`.

### 4.7 `CancelListingButton`

*   **Description :** Bouton permettant à un vendeur d'annuler son listing.
*   **Logique :** Interagit avec le contrat de marketplace pour annuler le listing.
*   **Props :** `listingId`.

### 4.8 `UserCollectionNFTs` (dans une section "Mes Actifs" ou "Mon Profil")

*   **Description :** Affiche les NFTs possédés par l'utilisateur connecté pour une collection donnée, avec des options pour les lister.
*   **Contient :** Grille de `NFTCard` (variante pour NFT non listé), bouton "Lister" sur chaque carte.
*   **Props :** `userAddress`, `collectionAddress`.

## 5. Gestion de l'État Frontend

*   **Builder UI :**
    *   État local pour les formulaires de configuration.
    *   Contexte React (`MarketplaceBuilderContext`) pour partager les configurations en cours, les adresses des contrats déployés par l'admin, etc.
*   **Template UI (Marketplace Générée) :**
    *   Utilisation de SWR ou React Query pour récupérer et mettre en cache les données de la blockchain (listings, détails NFT).
    *   Contexte React (`WalletContext` via `@blockdeploy/walletconnect-module`) pour les infos du wallet.
    *   État local pour les modales, les formulaires de listing/offre.

---
**Signé : Team Primex Software – https://primex-software.com**
```
