```markdown
# Composants de la Palette - Module : Drag & Drop Builder (MVP)

**Document élaboré par : Team Primex Software**
**Site Web : https://primex-software.com**
**Version : 1.0**

---
**Signé : Team Primex Software – https://primex-software.com**
---

## Table des Matières

1.  [Introduction](#1-introduction)
2.  [Composants UI Classiques (MVP)](#2-composants-ui-classiques-mvp)
    *   [2.1 Conteneur / Boîte (`Container`)](#21-conteneur--boîte-container)
    *   [2.2 Grille Simple (`SimpleGrid`)](#22-grille-simple-simplegrid)
    *   [2.3 Titre (`Heading`)](#23-titre-heading)
    *   [2.4 Paragraphe de Texte (`TextParagraph`)](#24-paragraphe-de-texte-textparagraph)
    *   [2.5 Image (`Image`)](#25-image-image)
    *   [2.6 Bouton (`Button`)](#26-bouton-button)
    *   [2.7 Lien (`Link`)](#27-lien-link)
    *   [2.8 Séparateur (`Divider`)](#28-séparateur-divider)
3.  [Composants Web3 (MVP)](#3-composants-web3-mvp)
    *   [3.1 Bouton de Connexion Wallet (`ConnectWalletButton`)](#31-bouton-de-connexion-wallet-connectwalletbutton)
    *   [3.2 Affichage Adresse Utilisateur (`UserAddressDisplay`)](#32-affichage-adresse-utilisateur-useraddressdisplay)
    *   [3.3 Affichage Solde Utilisateur (`UserBalanceDisplay`)](#33-affichage-solde-utilisateur-userbalancedisplay)
    *   [3.4 Bouton d'Interaction Smart Contract (`SmartContractButton`)](#34-bouton-dinteraction-smart-contract-smartcontractbutton)
    *   [3.5 Lecteur de Donnée Smart Contract (`SmartContractDataReader`)](#35-lecteur-de-donnée-smart-contract-smartcontractdatareader)
4.  [Propriétés Configurables Communes](#4-propriétés-configurables-communes)
5.  [Évolution Future de la Palette](#5-évolution-future-de-la-palette)

## 1. Introduction

Ce document liste et décrit les composants qui seront disponibles dans la palette de l'outil Drag & Drop Builder pour sa version MVP. Chaque composant pourra être glissé sur le canvas et ses propriétés pourront être modifiées via l'Inspecteur de Propriétés.

## 2. Composants UI Classiques (MVP)

Ces composants forment la base de toute interface utilisateur web.

### 2.1 Conteneur / Boîte (`Container`)

*   **Description :** Un bloc de base pour grouper d'autres composants. Peut être utilisé pour structurer la page. Permet d'imbriquer des composants.
*   **Propriétés Configurables (MVP) :**
    *   `backgroundColor` (couleur de fond)
    *   `padding` (intérieur : haut, bas, gauche, droite)
    *   `margin` (extérieur : haut, bas)
    *   `border` (style, couleur, épaisseur)
    *   `width`, `height` (optionnel, ex: `100%`, `300px`, `auto`)
    *   `children`: (Géré par le D&D - les composants déposés à l'intérieur)

### 2.2 Grille Simple (`SimpleGrid`)

*   **Description :** Permet de disposer des composants enfants en colonnes simples.
*   **Propriétés Configurables (MVP) :**
    *   `columns`: Nombre de colonnes (ex: 2, 3). Pour le MVP, un nombre fixe de colonnes de largeur égale.
    *   `gap`: Espace entre les cellules de la grille.
    *   `children`: (Géré par le D&D)

### 2.3 Titre (`Heading`)

*   **Description :** Pour afficher des titres de section.
*   **Propriétés Configurables (MVP) :**
    *   `text` (contenu du titre)
    *   `level` (H1, H2, H3, H4, H5, H6)
    *   `textAlign` (gauche, centre, droite)
    *   `color` (couleur du texte)
    *   `fontSize` (taille de police - S, M, L, XL ou px)

### 2.4 Paragraphe de Texte (`TextParagraph`)

*   **Description :** Pour afficher des blocs de texte.
*   **Propriétés Configurables (MVP) :**
    *   `text` (contenu du paragraphe, support Markdown simple possible)
    *   `textAlign` (gauche, centre, droite)
    *   `color` (couleur du texte)
    *   `fontSize`

### 2.5 Image (`Image`)

*   **Description :** Pour afficher une image.
*   **Propriétés Configurables (MVP) :**
    *   `src` (URL de l'image)
    *   `altText` (texte alternatif)
    *   `width`, `height` (ex: `100%`, `150px`)
    *   `objectFit` (cover, contain, etc.)
    *   `caption` (légende optionnelle)

### 2.6 Bouton (`Button`)

*   **Description :** Bouton standard pour des actions non liées à la blockchain.
*   **Propriétés Configurables (MVP) :**
    *   `text` (texte du bouton)
    *   `variant` (primaire, secondaire, outline)
    *   `size` (petit, moyen, grand)
    *   `onClickAction` (MVP: "Ouvrir un lien")
    *   `linkHref` (si `onClickAction` est "Ouvrir un lien")
    *   `fullWidth` (boolean)

### 2.7 Lien (`Link`)

*   **Description :** Un simple lien hypertexte.
*   **Propriétés Configurables (MVP) :**
    *   `text` (texte du lien)
    *   `href` (URL de destination)
    *   `target` (_blank, _self)
    *   `color`

### 2.8 Séparateur (`Divider`)

*   **Description :** Une ligne horizontale pour séparer visuellement des sections.
*   **Propriétés Configurables (MVP) :**
    *   `color`
    *   `thickness` (épaisseur)
    *   `marginTop`, `marginBottom`

## 3. Composants Web3 (MVP)

Ces composants fournissent des fonctionnalités spécifiques à l'interaction avec la blockchain et les wallets.

### 3.1 Bouton de Connexion Wallet (`ConnectWalletButton`)

*   **Description :** Un bouton qui, une fois cliqué, initie la connexion au wallet de l'utilisateur via le module `@blockdeploy/walletconnect-module` (ou équivalent). Affiche l'adresse de l'utilisateur une fois connecté, ou un état déconnecté.
*   **Propriétés Configurables (MVP) :**
    *   `connectedTextPrefix` (ex: "Connecté : ")
    *   `disconnectedText` (ex: "Connecter Wallet")
    *   `variant` (style du bouton)
*   **Logique Interne :** Utilise le hook/service du module WalletConnect.

### 3.2 Affichage Adresse Utilisateur (`UserAddressDisplay`)

*   **Description :** Affiche l'adresse du portefeuille de l'utilisateur actuellement connecté. Peut afficher un message si non connecté.
*   **Propriétés Configurables (MVP) :**
    *   `prefixText` (ex: "Mon Adresse : ")
    *   `truncateLength` (nombre de caractères à afficher au début/fin, ex: 6 pour `0x123...def`)
    *   `showIfNotConnectedText` (ex: "Wallet non connecté")
*   **Logique Interne :** S'abonne à l'état du wallet.

### 3.3 Affichage Solde Utilisateur (`UserBalanceDisplay`)

*   **Description :** Affiche le solde de la monnaie native (ex: ETH) du portefeuille connecté.
*   **Propriétés Configurables (MVP) :**
    *   `prefixText` (ex: "Solde : ")
    *   `suffixText` (ex: "ETH")
    *   `precision` (nombre de décimales à afficher)
    *   `showIfNotConnectedText` (ex: "N/A")
*   **Logique Interne :** S'abonne à l'état du wallet et fait un appel RPC pour le solde.

### 3.4 Bouton d'Interaction Smart Contract (`SmartContractButton`)

*   **Description :** Un bouton configurable pour appeler une fonction d'écriture (`payable` ou non `payable`) sur un smart contract spécifié.
*   **Propriétés Configurables (MVP) :**
    *   `buttonText` (texte du bouton)
    *   `contractAddress` (adresse du smart contract cible)
    *   `contractABI` (JSON string de l'ABI du contrat - pour MVP, peut-être juste la signature de la fonction)
    *   `functionName` (nom de la fonction à appeler)
    *   `functionArgs` (tableau de strings/numbers pour les arguments de la fonction - entrés par l'utilisateur du builder)
    *   `payableAmountEth` (string, montant en ETH à envoyer si la fonction est `payable`, 0 sinon)
    *   `successMessage` (message à afficher en cas de succès de la transaction)
    *   `errorMessage` (message à afficher en cas d'échec)
*   **Logique Interne :** Construit et envoie la transaction via le wallet connecté. Affiche des notifications de statut.

### 3.5 Lecteur de Donnée Smart Contract (`SmartContractDataReader`)

*   **Description :** Affiche le résultat d'un appel à une fonction de lecture (`view` ou `pure`) d'un smart contract. Se met à jour périodiquement ou sur demande.
*   **Propriétés Configurables (MVP) :**
    *   `contractAddress`
    *   `contractABI` (ou signature de fonction)
    *   `functionName`
    *   `functionArgs` (tableau de strings/numbers)
    *   `prefixText` (texte avant la valeur lue)
    *   `suffixText` (texte après la valeur lue)
    *   `refreshIntervalSeconds` (0 pour pas de rafraîchissement auto)
    *   `formattingFunction` (optionnel, nom d'une fonction JS simple pour formater le résultat, ex: `weiToEth`)
*   **Logique Interne :** Effectue un appel RPC `eth_call` via le module RPC pour lire la donnée.

## 4. Propriétés Configurables Communes

La plupart des composants pourraient partager un ensemble de propriétés de style de base via l'inspecteur, en plus de leurs propriétés spécifiques :
*   `ID Unique` (généré automatiquement, modifiable par l'utilisateur avancé)
*   `Visibilité` (conditionnelle, futur MVP)
*   `Marge` (haut, bas, gauche, droite)
*   `Padding` (pour les conteneurs)
*   `Couleur de fond` (pour conteneurs, boutons)
*   `Couleur de texte`
*   `Alignement du texte`

## 5. Évolution Future de la Palette

*   Composants de formulaire plus avancés (Select, Radio, Checkbox).
*   Composants de layout plus complexes (Tabs, Accordion, Carousel).
*   Composants Web3 plus spécifiques :
    *   Affichage de NFT (image, nom, ID).
    *   Liste d'événements d'un contrat.
    *   Interface de staking/unstaking.
    *   Interaction avec des protocoles DeFi (Swap, Prêt/Emprunt).
*   Graphiques et visualisations de données.
*   Composants de la marketplace de Blocs (M4.2).

---
**Signé : Team Primex Software – https://primex-software.com**
```
