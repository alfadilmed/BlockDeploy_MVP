# Guide Utilisateur : BlockDeploy Token Creator

Bienvenue dans le guide utilisateur pour la dApp Token Creator de BlockDeploy ! Cet outil vous permet de créer vos propres tokens ERC-20 personnalisés sur des blockchains compatibles EVM, sans écrire une seule ligne de code.

**Statut Actuel : Version Alpha**
Cette application est en phase de test. Utilisez-la avec prudence, de préférence sur des réseaux de test (comme Sepolia). Vos retours sont essentiels pour nous aider à l'améliorer.

## Table des Matières
1.  [Prérequis](#1-prérequis)
2.  [Accéder au Token Creator](#2-accéder-au-token-creator)
3.  [Connecter votre Portefeuille](#3-connecter-votre-portefeuille)
4.  [Configurer votre Token](#4-configurer-votre-token)
    *   [Nom du Token](#nom-du-token)
    *   [Symbole du Token](#symbole-du-token)
    *   [Supply Initiale](#supply-initiale)
    *   [Décimales](#décimales)
5.  [Déployer votre Token](#5-déployer-votre-token)
6.  [Après le Déploiement](#6-après-le-déploiement)
    *   [Détails du Token Déployé](#détails-du-token-déployé)
    *   [Voir sur l'Explorateur](#voir-sur-lexplorateur)
    *   [Copier l'Adresse du Contrat](#copier-ladresse-du-contrat)
7.  [Historique des Tokens Déployés](#7-historique-des-tokens-déployés)
8.  [Points Importants & Limitations Actuelles](#8-points-importants--limitations-actuelles)
9.  [Support et Feedback](#9-support-et-feedback)

---

## 1. Prérequis

*   **Un portefeuille Web3 :** Comme MetaMask, Trust Wallet, ou tout autre portefeuille compatible WalletConnect.
*   **Fonds pour le Gas :** Vous aurez besoin de la cryptomonnaie native du réseau sur lequel vous déployez (ex: ETH de test pour Sepolia) pour payer les frais de transaction (gas).
*   **Navigateur Web :** Un navigateur moderne comme Chrome, Firefox, Brave, ou Edge.

## 2. Accéder au Token Creator

Rendez-vous sur l'application Token Creator de BlockDeploy.
*   **URL (Staging/Démo) :** `[URL_STAGING_TOKEN_CREATOR]` (Cette URL sera fournie une fois le déploiement effectif).
*   Si vous utilisez une version locale, elle est généralement accessible sur `http://localhost:3001` (ou le port configuré).

## 3. Connecter votre Portefeuille

En haut à droite de l'application, vous trouverez un bouton "Connect Wallet".
1.  Cliquez sur ce bouton.
2.  Choisissez votre méthode de connexion :
    *   **Browser Wallet :** Si vous utilisez une extension comme MetaMask.
    *   **WalletConnect :** Pour connecter un portefeuille mobile en scannant un QR code ou via deeplinking.
3.  Suivez les instructions de votre portefeuille pour approuver la connexion à BlockDeploy.
Une fois connecté, votre adresse de portefeuille (raccourcie) s'affichera en haut à droite.

## 4. Configurer votre Token

Remplissez les champs du formulaire "Configurer votre Token" :

### Nom du Token
*   **Description :** Le nom complet de votre token (ex: "Mon Super Token", "BlockDeploy Governance Token").
*   **Validation :** Requis, maximum 50 caractères.
*   **Exemple :** `My Awesome Token`

### Symbole du Token
*   **Description :** L'abréviation ou le ticker de votre token (ex: "MST", "BDPYG").
*   **Validation :** Requis, caractères alphanumériques uniquement, maximum 11 caractères.
*   **Exemple :** `MAT`

### Supply Initiale
*   **Description :** La quantité totale de tokens qui seront créés et envoyés à votre adresse lors du déploiement. Entrez ce nombre en unités entières (sans tenir compte des décimales ici).
*   **Validation :** Nombre positif.
*   **Exemple :** `1000000` (pour 1 million de tokens)

### Décimales
*   **Description :** Le nombre de décimales que votre token utilisera. Cela définit la divisibilité de votre token. La valeur standard et recommandée pour la plupart des tokens ERC-20 est 18.
*   **Validation :** Nombre entier entre 0 et 18.
*   **Exemple :** `18`

## 5. Déployer votre Token

1.  Assurez-vous que votre portefeuille est connecté et que vous avez sélectionné le bon réseau (ex: Sepolia pour les tests).
2.  Vérifiez attentivement toutes les informations que vous avez entrées.
3.  Cliquez sur le bouton "Vérifier & Déployer Token".
4.  Une transaction sera initiée et votre portefeuille vous demandera de la confirmer. Vérifiez les détails de la transaction (notamment les frais de gas estimés).
5.  Confirmez la transaction dans votre portefeuille.

Le formulaire affichera des messages indiquant l'état du déploiement :
*   "Envoi au wallet..." / "Préparation du déploiement..."
*   "Confirmation en cours..." (une fois la transaction soumise au réseau)
*   Un message d'erreur si quelque chose se passe mal.
*   Un message de succès avec l'adresse du contrat de votre nouveau token une fois le déploiement confirmé.

**Note sur le Bytecode :** Actuellement, le Token Creator utilise un bytecode pré-défini pour un contrat ERC-20 standard. Assurez-vous que ce bytecode correspond à vos attentes (il est basé sur OpenZeppelin ERC20 avec un constructeur pour nom, symbole, supply initiale et propriétaire).

## 6. Après le Déploiement

Une fois le déploiement réussi, une section "Détails de votre Token Déployé" apparaîtra :

### Détails du Token Déployé
*   **Adresse du Contrat :** L'adresse unique de votre smart contract de token sur la blockchain.
*   **Nom, Symbole, Décimales, Supply Totale :** Ces informations sont lues directement depuis votre contrat sur la blockchain pour confirmation.

### Voir sur l'Explorateur
Cliquez sur ce bouton pour ouvrir un explorateur de blocs (comme Etherscan pour Sepolia) directement sur la page de votre nouveau contrat de token. Vous pourrez y voir toutes les transactions, le code du contrat (s'il est vérifié), etc.

### Copier l'Adresse du Contrat
Cliquez sur ce bouton pour copier l'adresse de votre contrat de token dans votre presse-papiers. Vous en aurez besoin pour ajouter le token à votre portefeuille ou l'utiliser dans d'autres dApps.

## 7. Historique des Tokens Déployés

Sous le formulaire de création, vous trouverez une section "Vos Tokens Déployés Récemment". Cette liste affiche les tokens que vous avez déployés en utilisant le même navigateur et la même adresse de portefeuille.
*   Les informations affichées incluent le nom, le symbole, l'adresse, l'ID de la chaîne et la date de déploiement.
*   Un lien vers l'explorateur est également fourni pour chaque token.
*   Cet historique est stocké localement dans votre navigateur.

## 8. Points Importants & Limitations Actuelles

*   **Version Alpha :** Des bugs peuvent être présents. Utilisez à vos risques et périls, surtout si vous interagissez avec des fonds réels (non recommandé en phase Alpha).
*   **Réseaux de Test :** Il est fortement recommandé d'utiliser cette dApp sur des réseaux de test comme Sepolia pendant la phase Alpha.
*   **Bytecode du Contrat :** Le contrat déployé est un ERC-20 standard basé sur OpenZeppelin. Pour des fonctionnalités plus avancées (mintable après déploiement, burnable par les utilisateurs, taxes, etc.), des mises à jour futures du Token Creator seront nécessaires ou vous devrez utiliser des outils de développement de smart contracts plus avancés.
*   **Vérification du Contrat :** La vérification automatique du code source de votre contrat sur les explorateurs de blocs n'est pas encore implémentée. Vous devrez le faire manuellement si vous le souhaitez.

## 9. Support et Feedback

Vos retours sont cruciaux pour nous !
*   **Discord :** `[Lien Discord Placeholder]`
*   **Email :** `support@blockdeploy.io`
*   Utilisez le bouton "Feedback" présent dans l'application.

Merci d'utiliser BlockDeploy Token Creator !
---
**Signé : Team Primex Software – https://primex-software.com**
