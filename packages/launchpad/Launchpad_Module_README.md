```markdown
# Module : Launchpad (M3.1)

**Document élaboré par : Team Primex Software**
**Site Web : https://primex-software.com**
**Version du Module : 0.1.0 (MVP)**

---
**Signé : Team Primex Software – https://primex-software.com**
---

## Table des Matières

1.  [Description et Objectifs](#1-description-et-objectifs)
    *   [1.1 Cas d'Usage](#11-cas-dusage)
2.  [Fonctionnalités Clés (MVP)](#2-fonctionnalités-clés-mvp)
3.  [Architecture](#3-architecture)
    *   [3.1 Frontend](#31-frontend)
    *   [3.2 Backend](#32-backend)
    *   [3.3 Smart Contracts](#33-smart-contracts)
4.  [Flux Utilisateur Principal](#4-flux-utilisateur-principal)
    *   [4.1 Création d'une Vente (Project Owner)](#41-création-dune-vente-project-owner)
    *   [4.2 Participation à une Vente (Investor)](#42-participation-à-une-vente-investor)
5.  [Points d'API Backend (Détaillés dans API_Endpoints_Launchpad.md)](#5-points-dapi-backend-détaillés-dans-api_endpoints_launchpadmd)
6.  [Composants Frontend Principaux (Détaillés dans Frontend_Components_Launchpad.md)](#6-composants-frontend-principaux-détaillés-dans-frontend_components_launchpadmd)
7.  [Templates Solidity (Détaillés dans leurs fichiers respectifs)](#7-templates-solidity-détaillés-dans-leurs-fichiers-respectifs)
8.  [Wireframes / Flux UI (Détaillés dans Launchpad_Wireframes_ASCII.md)](#8-wireframes--flux-ui-détaillés-dans-launchpad_wireframes_asciimd)
9.  [Technologies Utilisées](#9-technologies-utilisées)
10. [Dépendances et Intégrations](#10-dépendances-et-intégrations)
11. [Structure du Module (`packages/launchpad`)](#11-structure-du-module-packageslaunchpad)
12. [Tests (Stratégie Initiale)](#12-tests-stratégie-initiale)
13. [Déploiement](#13-déploiement)
14. [Considérations de Sécurité](#14-considérations-de-sécurité)
15. [Considérations Futures (Post-MVP)](#15-considérations-futures-post-mvp)
16. [Contribution](#16-contribution)

## 1. Description et Objectifs

Le module **Launchpad** de BlockDeploy est une plateforme no-code/low-code permettant aux projets de lancer des ventes initiales de tokens (IDO - Initial DEX Offering, ou plus généralement Initial Token Sale) de manière simplifiée et sécurisée. Il vise à outiller les créateurs de projets avec les outils nécessaires pour configurer, déployer et gérer une vente de tokens, et à offrir aux investisseurs une interface claire pour y participer.

**Objectifs principaux du MVP :**
*   Permettre à un "Project Owner" de configurer une vente de tokens ERC-20 à prix fixe.
*   Générer et permettre le déploiement (via wallet du Project Owner) d'un smart contract de vente sécurisé.
*   Permettre aux investisseurs de découvrir les ventes actives et d'y participer en envoyant la monnaie native de la chaîne (ex: ETH sur Sepolia).
*   Gérer une whitelist simple pour la participation à la vente (pour le MVP, la vérification sera basique).
*   Permettre au Project Owner de retirer les fonds collectés et les tokens invendus après la vente.
*   Optionnellement, permettre la configuration et le déploiement d'un contrat de vesting pour les tokens (ex: pour l'équipe, les advisors).

### 1.1 Cas d'Usage

*   **Projets Web3 en phase de démarrage :** Cherchant à lever des fonds et à distribuer leurs tokens à une communauté initiale.
*   **Communautés :** Voulant lancer un token utilitaire ou de gouvernance.
*   **Créateurs de contenu/jeux :** Désirant tokeniser leur économie.

## 2. Fonctionnalités Clés (MVP)

*   **Pour le Project Owner (Admin de la Vente) :**
    *   Interface de configuration de la vente :
        *   Adresse du token ERC-20 à vendre (doit exister et être approuvé pour le contrat de vente).
        *   Token de paiement (MVP: monnaie native de la chaîne, ex: ETH).
        *   Prix fixe du token (ex: 1 TOKEN = 0.001 ETH).
        *   Montant total de tokens à vendre (Hard Cap pour la vente).
        *   Montant minimum et maximum d'investissement par participant.
        *   Dates et heures de début et de fin de la vente.
        *   Adresse du portefeuille pour recevoir les fonds collectés.
        *   Option de Whitelisting : une liste d'adresses autorisées à participer (gestion manuelle ou via un simple upload CSV pour le MVP).
    *   Préparation et déploiement du contrat de vente via son wallet.
    *   Tableau de bord simple pour suivre la progression de la vente (fonds levés, tokens vendus).
    *   Fonction pour retirer les fonds et les tokens invendus après la fin de la vente.
    *   (Optionnel MVP) Configuration et déploiement d'un contrat de vesting associé.
*   **Pour l'Investisseur :**
    *   Liste des ventes actives et futures.
    *   Page de détail pour chaque vente (informations sur le projet, token, conditions de vente).
    *   Interface de participation :
        *   Connexion du wallet.
        *   Saisie du montant d'investissement (en monnaie native).
        *   Achat des tokens (transaction signée via wallet).
        *   Affichage du solde de tokens achetés.
    *   Vérification de l'éligibilité à la whitelist (si activée).

## 3. Architecture

### 3.1 Frontend (`packages/launchpad/frontend/`)

*   **Interface d'Administration :** Pour les Project Owners (configuration, déploiement, gestion).
*   **Interface Utilisateur :** Pour les investisseurs (découverte des ventes, participation).
*   Communication avec le backend pour la préparation des contrats et la gestion des données off-chain (ex: liste des ventes, détails des projets).
*   Interaction directe avec les smart contracts (vente, token, vesting) via le wallet de l'utilisateur pour les opérations on-chain (achat, réclamation, etc.).

### 3.2 Backend (`packages/launchpad/backend/`)

*   API RESTful pour :
    *   Recevoir la configuration de la vente du Project Owner.
    *   Générer le code Solidity des contrats (vente, vesting) à partir de templates.
    *   Compiler les contrats en bytecode et ABI.
    *   Retourner bytecode/ABI au frontend pour déploiement.
    *   Stocker et servir les informations descriptives des ventes (nom du projet, description, liens, etc. - données off-chain).
    *   Gérer la liste des adresses whitelistées pour une vente (pour le MVP, stockage simple).
*   Ne gère pas les clés privées ni les déploiements directs de contrats de vente.

### 3.3 Smart Contracts

1.  **Contrat de Vente de Tokens (`TokenSale_FixedPrice.sol.template`) :**
    *   Gère la logique de la vente à prix fixe.
    *   Détient les tokens à vendre (après approbation et transfert par le Project Owner).
    *   Reçoit les paiements (ETH).
    *   Distribue les tokens aux acheteurs.
    *   Permet le retrait des fonds et des tokens invendus.
    *   Gère les dates de début/fin, caps, whitelist.
2.  **Contrat de Vesting de Tokens (`TokenVesting.sol.template`) :**
    *   Permet de bloquer des tokens pour des bénéficiaires spécifiques.
    *   Gère un calendrier de déblocage (cliff, période de vesting, distribution par tranches).
    *   Fonction de réclamation des tokens débloqués par les bénéficiaires.

## 4. Flux Utilisateur Principal

### 4.1 Création d'une Vente (Project Owner)
1.  Owner accède au "Launchpad" sur BlockDeploy et choisit "Créer une Vente".
2.  Remplit le formulaire de configuration de la vente.
3.  Télécharge la liste des adresses pour la whitelist (si applicable).
4.  Clique "Préparer les Contrats".
5.  Backend génère/compile les contrats (Vente, Vesting optionnel).
6.  Frontend reçoit bytecode/ABI. Owner approuve le transfert des tokens à vendre vers l'adresse qui sera celle du futur contrat de vente (ou le contrat de vente sera capable de les pull si approuvé).
7.  Owner déploie le contrat de Vente (et Vesting) via son wallet.
8.  La vente est listée sur la plateforme Launchpad.

### 4.2 Participation à une Vente (Investor)
1.  Investisseur explore les ventes sur le Launchpad.
2.  Sélectionne une vente, consulte les détails.
3.  Connecte son wallet.
4.  Si la vente est active et qu'il est whitelisté (si applicable), il saisit le montant qu'il souhaite investir.
5.  Clique "Acheter des Tokens".
6.  Confirme la transaction dans son wallet (envoi d'ETH).
7.  Après confirmation, les tokens lui sont transférés (ou sont réclamables si la vente le prévoit ainsi).

## 5. Points d'API Backend (Détaillés dans `API_Endpoints_Launchpad.md`)

Voir le document `API_Endpoints_Launchpad.md`.

## 6. Composants Frontend Principaux (Détaillés dans `Frontend_Components_Launchpad.md`)

Voir le document `Frontend_Components_Launchpad.md`.

## 7. Templates Solidity (Détaillés dans leurs fichiers respectifs)

*   `Solidity_Template_TokenSale.sol.template`
*   `Solidity_Template_TokenVesting.sol.template`

## 8. Wireframes / Flux UI (Détaillés dans `Launchpad_Wireframes_ASCII.md`)

Voir le document `Launchpad_Wireframes_ASCII.md`.

## 9. Technologies Utilisées

Similaires aux modules précédents :
*   **Frontend :** React, Next.js, TypeScript, Ethers.js, TailwindCSS.
*   **Backend :** Node.js (avec Express/Fastify), TypeScript, `solc-js`.
*   **Smart Contracts :** Solidity, Contrats OpenZeppelin (ou principes inspirés).

## 10. Dépendances et Intégrations

*   **Internes (BlockDeploy) :**
    *   `@blockdeploy/walletconnect-module` : Essentiel pour toutes les interactions wallet.
    *   `@blockdeploy/rpc-api-generator` : Pour les appels RPC.
    *   `@blockdeploy/token-creator` : Les tokens créés avec ce module doivent être facilement utilisables dans le Launchpad.
*   **Externes :**
    *   `ethers` (ou `viem`)
    *   `@openzeppelin/contracts`

## 11. Structure du Module (`packages/launchpad`)
```
/packages/launchpad/
|-- /backend/
|   |-- /src/
|   |   |-- /api/                # Routes et contrôleurs API
|   |   |-- /services/           # Logique métier (génération SC, gestion whitelist)
|   |   |-- /templates/
|   |   |   |-- TokenSale_FixedPrice.sol.template
|   |   |   `-- TokenVesting.sol.template
|   |   `-- ...
|   `-- package.json
|-- /frontend/
|   |-- /components/
|   |   |-- /admin/            # Composants pour la création/gestion de vente
|   |   `-- /investor/         # Composants pour la participation aux ventes
|   |-- /pages/                # Pages Next.js pour le Launchpad
|   |-- /hooks/                # Hooks spécifiques au Launchpad
|   `-- package.json
|-- /shared/                   # Types et interfaces partagés
|   `-- package.json
|-- Launchpad_Module_README.md # Ce fichier
|-- API_Endpoints_Launchpad.md
|-- Frontend_Components_Launchpad.md
|-- Launchpad_Wireframes_ASCII.md
`-- package.json
```

## 12. Tests (Stratégie Initiale)

*   **Smart Contracts :** Tests approfondis (Hardhat/Foundry) pour les templates de Vente et de Vesting, couvrant tous les scénarios (achat, whitelist, caps, retraits, réclamations vesting).
*   **Backend :** Tests unitaires pour la génération de code et la gestion des données de vente. Tests d'intégration pour les API.
*   **Frontend :** Tests unitaires pour les composants. Tests d'intégration pour les flux de création de vente et de participation.

## 13. Déploiement

*   **Backend Service :** Déployé comme un microservice.
*   **Frontend Launchpad UI :** Partie de la plateforme BlockDeploy.
*   **Contrats de Vente/Vesting :** Déployés par les Project Owners sur la blockchain de leur choix (testnet pour MVP).

## 14. Considérations de Sécurité

*   **Audit des Contrats Templates :** Bien que basés sur des principes éprouvés, les templates finaux doivent être revus pour la sécurité.
*   **Gestion des Approbations :** Le Project Owner doit approuver le contrat de vente pour qu'il puisse transférer les tokens ERC-20. Ce flux doit être clair pour l'utilisateur.
*   **Protection contre la Sybil Attack pour Whitelist (Futur) :** Pour le MVP, la whitelist est simple. Des mécanismes plus robustes (KYC, preuve d'humanité) sont des considérations futures.
*   **Pas de Clés Privées au Backend.**

## 15. Considérations Futures (Post-MVP)

*   Différents types de ventes (enchères, FCFS avec différentes phases).
*   Support de tokens de paiement ERC-20 (en plus de la monnaie native).
*   Intégration KYC/AML plus poussée.
*   Mécanismes de distribution de tokens plus complexes (ex: réclamation post-vente au lieu de transfert direct).
*   Tableaux de bord analytiques plus détaillés pour les Project Owners.
*   Fonctionnalités de communication/marketing pour les ventes.

## 16. Contribution

*   Suivre les conventions de BlockDeploy.
*   Prioriser la sécurité et la clarté des contrats et des interfaces.
*   Documenter toute nouvelle fonctionnalité.

---
**Signé : Team Primex Software – https://primex-software.com**
```
