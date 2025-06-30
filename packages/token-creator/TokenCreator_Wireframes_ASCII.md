```markdown
# Wireframes ASCII - Module : Token Creator

**Document élaboré par : Team Primex Software**
**Site Web : https://primex-software.com**
**Version : 1.0**

---
**Signé : Team Primex Software – https://primex-software.com**
---

## Table des Matières

1.  [Introduction](#1-introduction)
2.  [Flux Utilisateur Général](#2-flux-utilisateur-général)
3.  [Wireframe : Page de Création de Token](#3-wireframe--page-de-création-de-token)
    *   [Section 1 : Informations de Base du Token](#section-1--informations-de-base-du-token)
    *   [Section 2 : Fonctionnalités Optionnelles](#section-2--fonctionnalités-optionnelles)
    *   [Section 3 : Sélection du Réseau et Propriétaire](#section-3--sélection-du-réseau-et-propriétaire)
    *   [Section 4 : Actions et Déploiement](#section-4--actions-et-déploiement)
    *   [Section 5 : Aperçu du Code (Optionnel / Onglet)](#section-5--aperçu-du-code-optionnel--onglet)
    *   [Section 6 : Statut du Déploiement](#section-6--statut-du-déploiement)

## 1. Introduction

Ce document présente des wireframes sous forme de texte ASCII pour l'interface utilisateur (UI) du module Token Creator. Ces wireframes visent à définir la structure générale, la disposition des éléments et le flux de l'utilisateur pour la création d'un token ERC-20.

## 2. Flux Utilisateur Général

1.  **Accès au Token Creator :** L'utilisateur navigue vers la page du Token Creator depuis la plateforme BlockDeploy.
2.  **Configuration du Token :** L'utilisateur remplit un formulaire avec les détails de son token (nom, symbole, supply, etc.) et sélectionne les fonctionnalités optionnelles.
3.  **Sélection du Réseau :** L'utilisateur choisit le réseau blockchain pour le déploiement.
4.  **Préparation du Contrat :** L'utilisateur clique sur un bouton pour que le backend prépare le contrat (génération du code, compilation en bytecode/ABI).
5.  **(Optionnel) Aperçu du Code :** L'utilisateur peut visualiser le code Solidity généré.
6.  **Déploiement :** L'utilisateur initie le déploiement, ce qui déclenche une demande de signature et de confirmation de transaction dans son wallet connecté.
7.  **Confirmation :** L'utilisateur voit le statut du déploiement et, en cas de succès, l'adresse du contrat et un lien vers l'explorateur de blocs.

## 3. Wireframe : Page de Création de Token

```
+------------------------------------------------------------------------------+
| BlockDeploy - Token Creator                                                  |
| [Breadcrumb: Accueil > Token Creator]                                        |
+------------------------------------------------------------------------------+

+------------------------------------------------------------------------------+
| Titre Principal: "Créez Votre Token ERC-20 en Quelques Étapes Simples"         |
| Sous-titre: "Personnalisez et déployez votre propre cryptomonnaie sans coder."|
+------------------------------------------------------------------------------+

+------------------------------------------------------------------------------+
| Section 1: Informations de Base du Token                                     |
|                                                                              |
|   +----------------------------------------------------------------------+   |
|   | [Label] Nom du Token (ex: My Awesome Token)                          |   |
|   | [Input Text: tokenName] [Infobulle: ?]                               |   |
|   +----------------------------------------------------------------------+   |
|                                                                              |
|   +----------------------------------------------------------------------+   |
|   | [Label] Symbole du Token (ex: MAT)                                   |   |
|   | [Input Text: tokenSymbol] [Infobulle: ?]                             |   |
|   +----------------------------------------------------------------------+   |
|                                                                              |
|   +----------------------------------------------------------------------+   |
|   | [Label] Supply Initiale (Nombre total de tokens à créer)             |   |
|   | [Input Number: initialSupply] [Infobulle: ?]                         |   |
|   +----------------------------------------------------------------------+   |
|                                                                              |
|   +----------------------------------------------------------------------+   |
|   | [Label] Décimales (Standard: 18)                                     |   |
|   | [Input Number: decimals (défaut 18)] [Infobulle: ?]                  |   |
|   +----------------------------------------------------------------------+   |
+------------------------------------------------------------------------------+

+------------------------------------------------------------------------------+
| Section 2: Fonctionnalités Optionnelles                                      |
|                                                                              |
|   +----------------------------------------------------------------------+   |
|   | [Checkbox/Switch: isMintable] [Label] Permettre la création (Mint)   |   |
|   |                                 de nouveaux tokens après déploiement ? |   |
|   |                                 (contrôlé par le propriétaire)       |   |
|   |                                 [Infobulle: ?]                       |   |
|   +----------------------------------------------------------------------+   |
|                                                                              |
|   +----------------------------------------------------------------------+   |
|   | [Checkbox/Switch: isBurnable] [Label] Permettre aux détenteurs de    |   |
|   |                                 détruire (Burn) leurs tokens ?       |   |
|   |                                 [Infobulle: ?]                       |   |
|   +----------------------------------------------------------------------+   |
|                                                                              |
|   | ... (Autres features futures: Pausable, Taxes, etc.) ...             |   |
+------------------------------------------------------------------------------+

+------------------------------------------------------------------------------+
| Section 3: Sélection du Réseau et Propriétaire                               |
|                                                                              |
|   +----------------------------------------------------------------------+   |
|   | [Label] Réseau de Déploiement                                        |   |
|   | [Select: network (Options: Sepolia, Goerli, Mainnet - grisé)]        |   |
|   | [Message: "Connectez votre wallet pour voir les réseaux supportés"]  |   |
|   +----------------------------------------------------------------------+   |
|                                                                              |
|   +----------------------------------------------------------------------+   |
|   | [Label] Adresse du Propriétaire du Contrat                           |   |
|   | [Input Text: ownerAddress (auto-rempli si wallet connecté, sinon msg)]|   |
|   | [Message: "Sera l'adresse de votre wallet connecté au moment du déploiement."] |
|   +----------------------------------------------------------------------+   |
+------------------------------------------------------------------------------+

+------------------------------------------------------------------------------+
| Section 4: Actions et Déploiement                                            |
|                                                                              |
|   [Bouton: "Préparer le Contrat"] (Activé si formulaire valide)             |
|   [Indicateur de chargement pendant la préparation...]                     |
|                                                                              |
|   --- Si préparation réussie: ---                                          |
|   [Message: "Contrat prêt pour le déploiement."]                           |
|   [Optionnel: Affichage Bytecode/ABI (pour utilisateurs avancés)]          |
|   [Bouton: "Déployer avec [WalletConnect/MetaMask]"]                       |
|   [Message d'avertissement sur les frais de gas]                           |
|                                                                              |
+------------------------------------------------------------------------------+

+------------------------------------------------------------------------------+
| Section 5: Aperçu du Code Solidity (Optionnel / Peut être un onglet/modal)   |
|                                                                              |
|   [Titre: "Aperçu du Code Solidity Généré"]                                  |
|   +----------------------------------------------------------------------+   |
|   | [Text Area (read-only) ou Bloc de code avec coloration syntaxique]   |   |
|   | pragma solidity ^0.8.20;                                             |   |
|   | contract MyAwesomeToken is ERC20, Ownable { ... }                    |   |
|   | ... (code généré basé sur les options) ...                           |   |
|   +----------------------------------------------------------------------+   |
|   [Bouton: "Copier le Code"]                                               |
|   [Bouton: "Télécharger le Fichier .sol"] (via API get-source-code)      |
|                                                                              |
+------------------------------------------------------------------------------+

+------------------------------------------------------------------------------+
| Section 6: Statut du Déploiement (Apparaît après clic sur "Déployer")        |
|                                                                              |
|   --- Si déploiement en cours ---                                          |
|   [Message: "Déploiement en cours... Veuillez confirmer dans votre wallet."] |
|   [Message: "Transaction en attente de confirmation sur la blockchain..."] |
|   [Lien: "Voir la transaction sur [Explorateur Etherscan/etc.] (txHash)"]  |
|                                                                              |
|   --- Si déploiement réussi ---                                            |
|   [Message Succès: "Félicitations! Votre token a été déployé avec succès."] |
|   [Label] Adresse du Contrat: [0x123abc...] [Bouton Copier]                |
|   [Lien: "Voir le contrat sur [Explorateur Etherscan/etc.]"]               |
|   [Bouton: "Ajouter le token à MetaMask"] (si possible)                    |
|   [Bouton: "Créer un autre token"]                                         |
|                                                                              |
|   --- Si déploiement échoué ---                                            |
|   [Message Erreur: "Le déploiement a échoué."]                             |
|   [Détail de l'erreur (si disponible, ex: "Transaction rejetée par l'utilisateur.")] |
|   [Bouton: "Réessayer"]                                                    |
|                                                                              |
+------------------------------------------------------------------------------+

+------------------------------------------------------------------------------+
| Footer de la Page / Plateforme                                               |
+------------------------------------------------------------------------------+
```

---
**Signé : Team Primex Software – https://primex-software.com**
```
