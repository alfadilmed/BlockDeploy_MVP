```markdown
# Wireframes ASCII - Module : NFT Marketplace Builder

**Document élaboré par : Team Primex Software**
**Site Web : https://primex-software.com**
**Version : 1.0**

---
**Signé : Team Primex Software – https://primex-software.com**
---

## Table des Matières

1.  [Introduction](#1-introduction)
2.  [Flux 1 : Création/Configuration d'une Marketplace (Admin)](#2-flux-1--créationconfiguration-dune-marketplace-admin)
3.  [Flux 2 : Création d'une Collection NFT (Admin/Créateur)](#3-flux-2--création-dune-collection-nft-admincréateur)
4.  [Flux 3 : Interface de la Marketplace Générée (Utilisateur Final)](#4-flux-3--interface-de-la-marketplace-générée-utilisateur-final)
    *   [4.1 Page d'Accueil Marketplace](#41-page-daccueil-marketplace)
    *   [4.2 Page Détail NFT](#42-page-détail-nft)
    *   [4.3 Modal de Listing NFT](#43-modal-de-listing-nft)
    *   [4.4 Profil Utilisateur / Mes NFTs](#44-profil-utilisateur--mes-nfts)

## 1. Introduction

Ce document présente des wireframes textuels (ASCII) pour les interfaces utilisateur clés du module NFT Marketplace Builder. Il couvre à la fois l'interface d'administration (pour créer la marketplace et les collections) et l'interface de la marketplace générée (pour les acheteurs et vendeurs).

## 2. Flux 1 : Création/Configuration d'une Marketplace (Admin)

**Page : BlockDeploy Dashboard > NFT Marketplace Builder > Créer/Gérer Marketplace**

```
+------------------------------------------------------------------------------+
| BlockDeploy - NFT Marketplace Builder - Ma Marketplace                       |
+------------------------------------------------------------------------------+
| [Tabs: Paramètres | Collections | Déploiement | Aperçu (grisé)]              |
+------------------------------------------------------------------------------+

Onglet "Paramètres":
+------------------------------------------------------------------------------+
| Titre: Paramètres de Votre Marketplace                                       |
|                                                                              |
|   [Label] Nom de la Marketplace (pour affichage et nom du contrat)           |
|   [Input Text: marketplaceName]                                              |
|                                                                              |
|   [Label] Adresse du Bénéficiaire des Frais de Service                       |
|   [Input Text: serviceFeeRecipientAddress (ETH Address)]                     |
|   [Message: "Cette adresse recevra les frais de service prélevés."]          |
|                                                                              |
|   [Label] Pourcentage des Frais de Service (0.01% à 99.99%)                  |
|   [Input Number: serviceFeePercentageBps (ex: 250 pour 2.5%)] [Infobulle: ?] |
|                                                                              |
|   [Bouton: "Sauvegarder les Paramètres"]                                     |
+------------------------------------------------------------------------------+

Onglet "Déploiement":
+------------------------------------------------------------------------------+
| Titre: Déploiement du Contrat de Marketplace                                 |
|                                                                              |
|   [Résumé des paramètres ci-dessus (read-only)]                            |
|                                                                              |
|   [Label] Votre Adresse de Déploiement (Propriétaire du contrat)             |
|   [Text: userWalletAddress (auto-rempli via WalletConnect)]                  |
|                                                                              |
|   [Bouton: "Préparer le Contrat de Marketplace"] (Activé si params OK)       |
|   [Spinner si préparation en cours...]                                       |
|                                                                              |
|   --- Si préparation OK ---                                                  |
|   [Message: "Contrat de marketplace prêt."]                                  |
|   [Bouton: "Déployer la Marketplace avec [Wallet]"]                          |
|   [Statut Déploiement: En attente / En cours / Succès / Échec]               |
|   [Si Succès: Adresse du Contrat Marketplace: 0xABC...] [Lien Explorateur]   |
+------------------------------------------------------------------------------+
```

## 3. Flux 2 : Création d'une Collection NFT (Admin/Créateur)

**Page : BlockDeploy Dashboard > NFT Marketplace Builder > Ma Marketplace > Collections > Créer Collection**

```
+------------------------------------------------------------------------------+
| Titre: Créer une Nouvelle Collection NFT                                     |
+------------------------------------------------------------------------------+
| [Label] Nom de la Collection                                                 |
| [Input Text: collectionName]                                                 |
|                                                                              |
| [Label] Symbole de la Collection                                             |
| [Input Text: collectionSymbol]                                               |
|                                                                              |
| [Label] Type de Token                                                        |
| [Select: tokenType (Options: ERC-721 - MVP)]                                 |
|                                                                              |
| [Label] Adresse du Bénéficiaire des Royalties                                |
| [Input Text: royaltyRecipientAddress (ETH Address)]                          |
|                                                                              |
| [Label] Pourcentage des Royalties (0.01% à 100.00%)                          |
| [Input Number: royaltyPercentageBps (ex: 500 pour 5%)]                       |
|                                                                              |
| [Label] Base URI pour les Métadonnées (Optionnel)                            |
| [Input Text: baseURI (ex: ipfs://CID/.../ )] [Infobulle: ?]                  |
|                                                                              |
| [Bouton: "Sauvegarder et Préparer le Contrat"]                               |
| [Spinner si préparation en cours...]                                       |
|                                                                              |
| --- Si préparation OK ---                                                  |
| [Message: "Contrat de collection prêt."]                                     |
| [Bouton: "Déployer la Collection avec [Wallet]"]                             |
| [Statut Déploiement: ...]                                                    |
| [Si Succès: Adresse du Contrat Collection: 0xXYZ...] [Lien Explorateur]      |
|                                                                              |
| --- Après déploiement de la collection ---                                   |
| [Titre: Gérer la Collection "{{collectionName}}"]                            |
| [Bouton: "Minter un NFT dans cette Collection"]                              |
|   +----------------------------------------------------------------------+   |
|   | Modal/Formulaire "Minter un NFT":                                    |   |
|   |   [Label] Adresse du Destinataire                                    |   |
|   |   [Input: toAddress]                                                 |   |
|   |   [Label] Token URI (lien vers métadonnées JSON)                     |   |
|   |   [Input: tokenURI]                                                  |   |
|   |   [Bouton: "Minter NFT"]                                               |   |
|   +----------------------------------------------------------------------+   |
+------------------------------------------------------------------------------+
```

## 4. Flux 3 : Interface de la Marketplace Générée (Utilisateur Final)

**URL exemple: `blockdeploy.com/marketplaces/MaSuperMarketplace`**

### 4.1 Page d'Accueil Marketplace

```
+------------------------------------------------------------------------------+
| Header: [Nom de MaSuperMarketplace] [Lien: Explorer] [Lien: Mes Actifs] [Connect Wallet Btn] |
+------------------------------------------------------------------------------+
| Hero/Banner: "Bienvenue sur MaSuperMarketplace !"                            |
| [Champ de Recherche NFT (Futur)] [Filtres (Futur)]                           |
+------------------------------------------------------------------------------+
| Grille de NFTs Listés à la Vente:                                            |
|                                                                              |
|   +-----------------+  +-----------------+  +-----------------+  +-----------------+ |
|   | [NFTCard 1]     |  | [NFTCard 2]     |  | [NFTCard 3]     |  | [NFTCard 4]     | |
|   | Img NFT         |  | Img NFT         |  | Img NFT         |  | Img NFT         | |
|   | Nom NFT         |  | Nom NFT         |  | Nom NFT         |  | Nom NFT         | |
|   | Prix: X ETH     |  | Prix: Y ETH     |  | Prix: Z ETH     |  | Prix: W ETH     | |
|   | [Acheter/Détails] |  | [Acheter/Détails] |  | [Acheter/Détails] |  | [Acheter/Détails] | |
|   +-----------------+  +-----------------+  +-----------------+  +-----------------+ |
|                                                                              |
| [Pagination (Futur)]                                                         |
+------------------------------------------------------------------------------+
| Footer: [Liens utiles, Copyright]                                            |
+------------------------------------------------------------------------------+
```

### 4.2 Page Détail NFT

**URL exemple: `.../MaSuperMarketplace/assets/{collectionAddr}/{tokenId}`**

```
+------------------------------------------------------------------------------+
| Header Marketplace                                                           |
+------------------------------------------------------------------------------+
| [Breadcrumb: Explorer > Collection X > NFT Y]                                |
+------------------------------------------------------------------------------+
| Colonne Gauche:                           | Colonne Droite:                  |
|   +-------------------------------------+   +------------------------------+   |
|   | [Image/Média Principal du NFT]      |   | [Nom du NFT]                 |   |
|   |                                     |   |                              |   |
|   +-------------------------------------+   | Collection: [Nom Collection] |   |
|                                           |   | Propriétaire: [0xAddr...]    |   |
| Description:                              |   +------------------------------+   |
|   [Texte de description du NFT]         |   |                              |   |
|                                           |   | --- Si Listé à la Vente ---  |   |
| Attributs/Propriétés:                     |   | Prix: [XX.X ETH]             |   |
|   - Trait 1: Valeur A                     |   | [Bouton: "Acheter Maintenant"] |   |
|   - Trait 2: Valeur B                     |   |                              |   |
|                                           |   | --- Si possédé par user ---  |   |
| Historique (Futur):                       |   | [Bouton: "Lister à la Vente"]|   |
|   - Listé par 0x... le ... pour X ETH     |   | [Bouton: "Annuler Listing"]  |   |
|   - Acheté par 0x... le ...               |   |   (si déjà listé)          |   |
|                                           |   +------------------------------+   |
+------------------------------------------------------------------------------+
| Footer Marketplace                                                           |
+------------------------------------------------------------------------------+
```

### 4.3 Modal de Listing NFT

**(Apparaît après clic sur "Lister à la Vente" sur la page détail ou "Mes Actifs")**

```
+------------------------------------------------------------------------------+
| Modal Titre: Lister votre NFT "{{Nom NFT}}" à la Vente                       |
+------------------------------------------------------------------------------+
| [Aperçu miniature de l'NFT]                                                  |
|                                                                              |
| [Label] Prix de Vente (en ETH/monnaie native)                                |
| [Input Number: listingPrice]                                                 |
|                                                                              |
| --- Si ERC1155 ---                                                           |
| [Label] Quantité à Vendre (max: X)                                           |
| [Input Number: quantityToList]                                               |
|                                                                              |
| Résumé des Frais (calculés dynamiquement):                                   |
|   - Frais de Service Marketplace (X%): Y ETH                                 |
|   - Royalties Créateur (Z%): W ETH                                           |
|   - Vous recevrez (environ): (Prix - Frais - Royalties) ETH                  |
|                                                                              |
| [Message: "Vous devrez approuver ce contrat pour gérer vos NFTs (si 1ère fois)."] |
|                                                                              |
| [Bouton: "Étape 1: Approuver le Contrat"] (si approbation nécessaire)        |
| [Message: "Approbation en cours..." / "Approbation réussie!"]              |
|                                                                              |
| [Bouton: "Étape 2: Lister Maintenant"] (activé après approbation si besoin)  |
| [Message: "Listing en cours... Confirmez dans votre wallet."]                |
+------------------------------------------------------------------------------+
| [Bouton: Annuler]                                                            |
+------------------------------------------------------------------------------+
```

### 4.4 Profil Utilisateur / Mes NFTs

**URL exemple: `.../MaSuperMarketplace/profil/{userAddress}` ou `/mes-actifs`**

```
+------------------------------------------------------------------------------+
| Header Marketplace                                                           |
+------------------------------------------------------------------------------+
| Titre: Mes Actifs NFT sur {{Nom de MaSuperMarketplace}}                        |
| Adresse: [userWalletAddress]                                                 |
+------------------------------------------------------------------------------+
| [Tabs: NFTs Possédés | NFTs Listés | NFTs Vendus (Futur) | Offres (Futur)]   |
+------------------------------------------------------------------------------+

Onglet "NFTs Possédés":
| Grille de NFTs possédés par l'utilisateur (non listés ou listés par lui):    |
|                                                                              |
|   +-----------------+  +-----------------+  +-----------------+               |
|   | [NFTCard 1]     |  | [NFTCard 2]     |  | [NFTCard 3]     |               |
|   | Img NFT         |  | Img NFT         |  | Img NFT         |               |
|   | Nom NFT         |  | Nom NFT         |  | Nom NFT         |               |
|   | [Lister à la Vente] |  | [Voir Détails]  |  | [Lister à la Vente] |       |
|   | (si listé: Prix)  |  |                 |  | (si listé: Prix)  |       |
|   +-----------------+  +-----------------+  +-----------------+               |
+------------------------------------------------------------------------------+
| Footer Marketplace                                                           |
+------------------------------------------------------------------------------+
```

---
**Signé : Team Primex Software – https://primex-software.com**
```
