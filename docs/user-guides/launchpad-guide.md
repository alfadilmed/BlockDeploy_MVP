# Guide Utilisateur : BlockDeploy Launchpad dApp

Bienvenue dans le guide utilisateur pour la dApp Launchpad de BlockDeploy ! Cet outil vous permet de créer vos propres levées de fonds décentralisées (ICO/IDO) pour des tokens ERC-20, et de participer aux ventes créées par d'autres.

**Statut Actuel : Version Alpha**
Cette application est en phase de test. Utilisez-la avec prudence, de préférence sur des réseaux de test (comme Sepolia) et avec des tokens de test. Vos retours sont essentiels.

## Table des Matières
1.  [Prérequis](#1-prérequis)
2.  [Accéder à la dApp Launchpad](#2-accéder-à-la-dapp-launchpad)
3.  [Connecter votre Portefeuille](#3-connecter-votre-portefeuille)
4.  [Créer un Launchpad (pour les porteurs de projet)](#4-créer-un-launchpad-pour-les-porteurs-de-projet)
    *   [Accéder au Formulaire de Création](#accéder-au-formulaire-de-création)
    *   [Remplir les Informations du Launchpad](#remplir-les-informations-du-launchpad)
    *   [Déployer le Contrat Launchpad](#déployer-le-contrat-launchpad)
    *   [Action Post-Déploiement Importante : Financer le Contrat Launchpad](#action-post-déploiement-importante--financer-le-contrat-launchpad)
5.  [Visualiser et Participer à un Launchpad (pour les acheteurs)](#5-visualiser-et-participer-à-un-launchpad-pour-les-acheteurs)
    *   [Accéder à un Launchpad Spécifique](#accéder-à-un-launchpad-spécifique)
    *   [Comprendre les Informations Affichées](#comprendre-les-informations-affichées)
    *   [Acheter des Tokens](#acheter-des-tokens)
6.  [Gérer votre Launchpad (pour les propriétaires)](#6-gérer-votre-launchpad-pour-les-propriétaires)
    *   [Retirer les Fonds ETH Récoltés](#retirer-les-fonds-eth-récoltés)
    *   [Retirer les Tokens Invendus](#retirer-les-tokens-invendus)
7.  [Points Importants & Limitations Actuelles](#7-points-importants--limitations-actuelles)
8.  [Support et Feedback](#8-support-et-feedback)

---

## 1. Prérequis

*   **Un portefeuille Web3 :** MetaMask, Trust Wallet, ou compatible WalletConnect.
*   **Pour les créateurs de Launchpad :**
    *   L'adresse d'un token ERC-20 déjà déployé que vous souhaitez vendre.
    *   Suffisamment de tokens ERC-20 à transférer au contrat Launchpad une fois celui-ci déployé.
    *   ETH de test (ex: Sepolia ETH) pour payer les frais de déploiement du contrat Launchpad.
*   **Pour les acheteurs :**
    *   ETH (ou la monnaie de paiement du Launchpad, actuellement ETH) pour acheter les tokens.
    *   ETH de test pour les frais de gas de la transaction d'achat.

## 2. Accéder à la dApp Launchpad

*   **URL (Staging/Démo) :** `[URL_STAGING_LAUNCHPAD]` (URL à fournir après déploiement).
*   Version locale : `http://localhost:3002` (ou le port configuré).

## 3. Connecter votre Portefeuille

Comme pour le Token Creator, utilisez le bouton "Connect Wallet" en haut à droite pour connecter votre portefeuille via une extension de navigateur ou WalletConnect.

## 4. Créer un Launchpad (pour les porteurs de projet)

### Accéder au Formulaire de Création
Sur la page d'accueil de la dApp Launchpad, cliquez sur le bouton "Créer un Launchpad".

### Remplir les Informations du Launchpad
Le formulaire vous demandera :
*   **Adresse du Token ERC-20 à vendre :** L'adresse du contrat de votre token ERC-20.
*   **Prix par Token (en ETH) :** Le prix d'un token entier dans la vente. Par exemple, si 1 ETH doit acheter 1000 de vos tokens, le prix par token est 0.001 ETH.
*   **Quantité de Tokens à Vendre :** Le nombre total de vos tokens (en unités entières, sans les décimales) que vous mettez à disposition pour cette vente.
*   **Deadline de la Vente :** La date et l'heure exactes de fin de la vente.

Remplissez tous les champs avec attention. Des validations vous aideront à éviter les erreurs courantes.

### Déployer le Contrat Launchpad
1.  Assurez-vous que votre portefeuille est connecté avec l'adresse qui deviendra propriétaire du Launchpad.
2.  Vérifiez les informations.
3.  Cliquez sur "Créer le Launchpad".
4.  Confirmez la transaction de déploiement dans votre portefeuille.

Le formulaire affichera l'état du déploiement. Une fois réussi, l'adresse de votre nouveau contrat Launchpad sera affichée, ainsi qu'un lien pour y accéder.

### Action Post-Déploiement Importante : Financer le Contrat Launchpad
Une fois votre contrat Launchpad déployé à une adresse `0xABC...`, vous **DEVEZ transférer manuellement** la "Quantité de Tokens à Vendre" (que vous avez configurée) depuis votre portefeuille (ou celui qui détient ces tokens) vers l'adresse `0xABC...` de votre contrat Launchpad.
**Sans cette étape, les acheteurs ne pourront pas recevoir de tokens, et la vente échouera pour eux.**

## 5. Visualiser et Participer à un Launchpad (pour les acheteurs)

### Accéder à un Launchpad Spécifique
Chaque launchpad a une URL unique basée sur son adresse de contrat, par exemple : `[URL_STAGING_LAUNCHPAD]/launchpad/0xContractAddress...`.

### Comprendre les Informations Affichées
La page du launchpad affiche :
*   **Token à vendre :** Symbole et adresse du token.
*   **Prix :** Prix par token en ETH.
*   **Deadline :** Un compte à rebours jusqu'à la fin de la vente.
*   **Progression :** Une barre indiquant combien de tokens ont été vendus par rapport au total.
*   **ETH Récoltés :** Le montant total d'ETH collecté.
*   **Statut :** Si la vente est active ou terminée.

### Acheter des Tokens
1.  Assurez-vous que votre portefeuille est connecté et que vous avez de l'ETH pour l'achat et les frais de gas.
2.  Dans le widget "Participer" :
    *   Entrez la **quantité de tokens** (unités entières) que vous souhaitez acheter.
    *   Le coût estimé en ETH s'affichera.
3.  Cliquez sur "Acheter [Symbole du Token]".
4.  Confirmez la transaction dans votre portefeuille (qui inclura le montant d'ETH à envoyer).
Une fois la transaction confirmée, vous recevrez les tokens dans votre portefeuille. Un message de succès s'affichera.

## 6. Gérer votre Launchpad (pour les propriétaires)

Si vous êtes le propriétaire du Launchpad (l'adresse qui l'a déployé) et que la vente est terminée (deadline passée) :

### Retirer les Fonds ETH Récoltés
*   Un bouton "Retirer les Fonds (ETH)" sera actif.
*   Cliquez dessus et confirmez la transaction dans votre portefeuille pour transférer les ETH récoltés vers votre adresse.

### Retirer les Tokens Invendus
*   Un bouton "Retirer Tokens Invendus" sera actif s'il reste des tokens non vendus.
*   Cliquez dessus et confirmez la transaction pour récupérer les tokens restants.

## 7. Points Importants & Limitations Actuelles

*   **Version Alpha :** Prudence, utilisez sur réseaux de test.
*   **Transfert Manuel des Tokens :** Le créateur DOIT transférer les tokens au contrat Launchpad.
*   **Bytecode :** La dApp utilise un bytecode de contrat Launchpad défini dans le SDK. Assurez-vous qu'il est correct et audité si vous l'utilisez pour des fonds réels.
*   **Pas de KYC/Whitelist (MVP) :** Cette version n'inclut pas de mécanismes de KYC ou de whitelist.
*   **Prix Fixe en ETH :** Les ventes sont à prix fixe et en ETH uniquement pour ce MVP.

## 8. Support et Feedback

*   **Discord :** `[Lien Discord Placeholder]`
*   **Email :** `support@blockdeploy.io`
*   Utilisez le bouton "Feedback" présent dans l'application.

Merci d'utiliser BlockDeploy Launchpad !
---
**Signé : Team Primex Software – https://primex-software.com**
