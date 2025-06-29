```markdown
# Module : DAO Builder (M3.2)

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
    *   [4.1 Création d'une DAO](#41-création-dune-dao)
    *   [4.2 Création d'une Proposition](#42-création-dune-proposition)
    *   [4.3 Vote sur une Proposition](#43-vote-sur-une-proposition)
    *   [4.4 Exécution d'une Proposition (via Timelock)](#44-exécution-dune-proposition-via-timelock)
5.  [Points d'API Backend (Détaillés dans API_Endpoints_DAOBuilder.md)](#5-points-dapi-backend-détaillés-dans-api_endpoints_daobuildermd)
6.  [Composants Frontend Principaux (Détaillés dans Frontend_Components_DAOBuilder.md)](#6-composants-frontend-principaux-détaillés-dans-frontend_components_daobuildermd)
7.  [Templates Solidity (Détaillés dans leurs fichiers respectifs)](#7-templates-solidity-détaillés-dans-leurs-fichiers-respectifs)
8.  [Wireframes / Flux UI (Détaillés dans DAOBuilder_Wireframes_ASCII.md)](#8-wireframes--flux-ui-détaillés-dans-daobuilder_wireframes_asciimd)
9.  [Technologies Utilisées](#9-technologies-utilisées)
10. [Dépendances et Intégrations](#10-dépendances-et-intégrations)
11. [Structure du Module (`packages/dao-builder`)](#11-structure-du-module-packagesdao-builder)
12. [Tests (Stratégie Initiale)](#12-tests-stratégie-initiale)
13. [Déploiement](#13-déploiement)
14. [Considérations de Sécurité](#14-considérations-de-sécurité)
15. [Considérations Futures (Post-MVP)](#15-considérations-futures-post-mvp)
16. [Contribution](#16-contribution)

## 1. Description et Objectifs

Le module **DAO Builder** de BlockDeploy vise à démocratiser la création et la gestion d'Organisations Autonomes Décentralisées (DAO). Il fournit une interface no-code/low-code permettant aux utilisateurs de configurer, déployer et interagir avec leur propre DAO basée sur des smart contracts éprouvés.

**Objectifs principaux du MVP :**
*   Permettre à un utilisateur ("Créateur de DAO") de configurer les paramètres clés de sa DAO.
*   Permettre de déployer un ensemble de contrats interopérables :
    *   Un token de gouvernance (ERC20Votes) - soit en créant un nouveau, soit en utilisant un token existant.
    *   Un contrat de gouvernance (inspiré d'OpenZeppelin Governor) pour gérer les propositions et les votes.
    *   Un contrat Timelock pour l'exécution différée et sécurisée des propositions adoptées.
    *   Une trésorerie simple (contrôlée par la DAO via le Timelock) pour détenir des fonds.
*   Fournir une interface pour les membres de la DAO pour :
    *   Voir les propositions.
    *   Créer de nouvelles propositions (si seuil de tokens détenus atteint).
    *   Voter sur les propositions actives.
    *   Visualiser l'état de la trésorerie (balance ETH et tokens ERC20).
*   Déploiement initial sur des réseaux de test EVM.

### 1.1 Cas d'Usage

*   **Gouvernance de Projets Communautaires :** Permettre aux détenteurs de tokens de voter sur les décisions clés d'un projet.
*   **Gestion de Trésoreries Collectives :** Allouer des fonds pour des subventions, des investissements ou des dépenses opérationnelles.
*   **Clubs d'Investissement Décentralisés.**
*   **Gouvernance de Protocoles DeFi (versions plus avancées).**

## 2. Fonctionnalités Clés (MVP)

*   **Pour le Créateur de DAO :**
    *   Interface de configuration de la DAO :
        *   Nom de la DAO.
        *   **Token de Gouvernance :**
            *   Option 1 : Créer un nouveau token (Nom, Symbole, Supply initiale pour le créateur). Ce token sera un ERC20Votes.
            *   Option 2 : Utiliser un token ERC-20 existant (nécessite que ce token implémente les checkpoints ERC20Votes ou soit wrappé). Pour MVP, on peut se concentrer sur la création d'un nouveau token.
        *   **Paramètres de Gouvernance (pour le contrat Governor) :**
            *   Délai de vote (Voting Delay) : Période après la soumission d'une proposition avant que le vote ne commence.
            *   Période de vote (Voting Period) : Durée pendant laquelle les votes sont acceptés.
            *   Seuil de Proposition (Proposal Threshold) : Nombre minimum de tokens de gouvernance qu'un utilisateur doit détenir pour créer une proposition.
            *   Quorum : Pourcentage minimum de la supply totale de tokens votants qui doit participer pour qu'une proposition soit valide.
        *   **Paramètres du Timelock :**
            *   Délai minimum d'exécution (Min Delay) : Temps d'attente après qu'une proposition soit adoptée et mise en file d'attente avant de pouvoir être exécutée.
            *   Adresses des Proposers (qui peuvent créer des propositions via le Timelock - typiquement le Governor).
            *   Adresses des Exécuteurs (qui peuvent exécuter les propositions - peut être `address(0)` pour tout le monde, ou restreint).
    *   Préparation et déploiement des contrats (Token, Governor, Timelock, Treasury) via son wallet.
    *   Configuration initiale des rôles (ex: le Governor est Proposer sur le Timelock, le Timelock est Owner de la Treasury).
*   **Pour les Membres de la DAO :**
    *   Tableau de bord de la DAO :
        *   Affichage des paramètres clés de la DAO.
        *   Liste des propositions (actives, passées, en attente d'exécution).
    *   Création de Proposition :
        *   Formulaire pour soumettre une nouvelle proposition (titre, description, actions à exécuter - ex: transférer des fonds de la trésorerie).
        *   Vérification du seuil de tokens de l'utilisateur.
    *   Vote sur Proposition :
        *   Interface pour voter (Pour, Contre, Abstention) sur une proposition active.
        *   Nécessite que l'utilisateur ait délégué ses votes à lui-même ou à un autre (mécanisme ERC20Votes).
        *   Le poids du vote est basé sur la balance de tokens au moment du snapshot de la proposition.
    *   Visualisation de la Trésorerie :
        *   Affichage de la balance en ETH et des principaux tokens ERC-20 détenus par le contrat Treasury.
    *   Mise en file d'attente et Exécution des Propositions (par tout membre, après la période de vote et le délai du Timelock).

## 3. Architecture

### 3.1 Frontend (`packages/dao-builder/frontend/`)

*   **Interface d'Administration de DAO :** Pour la création et configuration.
*   **Interface de Participation à la DAO :** Tableau de bord, propositions, vote.
*   Communication avec le backend pour la préparation des contrats et la gestion des métadonnées (propositions, DAOs listées).
*   Interaction directe avec les smart contracts via le wallet pour les actions on-chain (déploiement, vote, création de proposition, exécution).

### 3.2 Backend (`packages/dao-builder/backend/`)

*   API RESTful pour :
    *   Recevoir la configuration de la DAO.
    *   Générer le code Solidity des contrats à partir de templates.
    *   Compiler les contrats en bytecode et ABI.
    *   Retourner bytecode/ABI au frontend.
    *   Stocker et servir les informations descriptives des DAOs et des propositions (titre, description - données off-chain).
    *   (Futur - Post MVP) Indexer les événements des contrats de gouvernance (via TheGraph ou un indexeur custom) pour un affichage plus rapide et riche des données de vote. Pour le MVP, beaucoup de lectures se feront directement depuis la blockchain via le frontend.

### 3.3 Smart Contracts

1.  **Token de Gouvernance (`GovernanceToken.sol.template`) :**
    *   Basé sur `ERC20Votes` d'OpenZeppelin. Permet le snapshot des balances et la délégation de vote.
2.  **Contrôleur Timelock (`TimelockController.sol` - directement d'OpenZeppelin ou un template simple) :**
    *   Gère l'exécution différée des actions. Est propriétaire des contrats qu'il contrôle (ex: Treasury).
3.  **Gouverneur (`DAO_Governor.sol.template`) :**
    *   Basé sur la suite `Governor` d'OpenZeppelin (ex: `Governor`, `GovernorSettings`, `GovernorTimelockControl`, `GovernorVotes`, `GovernorVotesQuorumFraction`, `GovernorCountingSimple`).
    *   Prend les décisions basées sur les votes et les transmet au Timelock.
4.  **Trésorerie (`SimpleTreasury.sol.template`) :**
    *   Contrat simple pour détenir des fonds (ETH, ERC20).
    *   Seul le Timelock (agissant pour la DAO) peut initier des transferts depuis la trésorerie.

## 4. Flux Utilisateur Principal

### 4.1 Création d'une DAO
1.  Créateur accède au "DAO Builder" sur BlockDeploy.
2.  Remplit le formulaire de configuration (nom DAO, paramètres token, gouvernance, timelock).
3.  Clique "Préparer les Contrats de la DAO".
4.  Backend génère/compile les 4 contrats.
5.  Frontend reçoit bytecode/ABI. Créateur déploie les contrats via son wallet (Token, puis Timelock, puis Governor, puis Treasury). L'ordre est important pour passer les adresses aux constructeurs. Le frontend guidera ce processus.
6.  Configuration des rôles post-déploiement (ex: assigner le rôle de PROPOSER du Timelock au Governor, transférer l'ownership de la Treasury au Timelock). Ces actions sont aussi initiées par le créateur via son wallet.

### 4.2 Création d'une Proposition
1.  Membre de la DAO (avec assez de tokens) accède au tableau de bord de la DAO.
2.  Clique "Créer une Proposition".
3.  Remplit le formulaire (titre, description, actions à exécuter - ex: `transfer(beneficiary, amount)` sur le contrat Treasury).
4.  Soumet la proposition (transaction on-chain vers le contrat Governor). Les métadonnées (titre/desc) sont aussi envoyées au backend BlockDeploy.

### 4.3 Vote sur une Proposition
1.  Membre accède à une proposition active.
2.  S'il ne l'a pas fait, il doit d'abord déléguer ses droits de vote (ERC20Votes `delegate(self)`).
3.  Choisit Pour, Contre, ou Abstention.
4.  Signe la transaction de vote via son wallet (vers le contrat Governor).

### 4.4 Exécution d'une Proposition (via Timelock)
1.  Si une proposition est adoptée (quorum atteint, votes > contre) et que la période de vote est terminée.
2.  N'importe qui peut appeler la fonction `queue` sur le contrat Governor pour envoyer la proposition au Timelock.
3.  Après l'écoulement du `minDelay` du Timelock.
4.  N'importe qui peut appeler la fonction `execute` sur le contrat Governor (ou directement sur le Timelock) pour exécuter les actions de la proposition.

## 5. Points d'API Backend (Détaillés dans `API_Endpoints_DAOBuilder.md`)

Voir le document `API_Endpoints_DAOBuilder.md`.

## 6. Composants Frontend Principaux (Détaillés dans `Frontend_Components_DAOBuilder.md`)

Voir le document `Frontend_Components_DAOBuilder.md`.

## 7. Templates Solidity (Détaillés dans leurs fichiers respectifs)

*   `Solidity_Template_GovernanceToken.sol.template`
*   `Solidity_Template_DAOGovernor.sol.template`
*   `Solidity_Template_SimpleTreasury.sol.template` (le Timelock sera celui d'OpenZeppelin, configuré).

## 8. Wireframes / Flux UI (Détaillés dans `DAOBuilder_Wireframes_ASCII.md`)

Voir le document `DAOBuilder_Wireframes_ASCII.md`.

## 9. Technologies Utilisées

Similaires aux modules précédents.
*   **Smart Contracts :** Forte dépendance sur OpenZeppelin Contracts (Governor, ERC20Votes, TimelockController).

## 10. Dépendances et Intégrations

*   **Internes (BlockDeploy) :**
    *   `@blockdeploy/walletconnect-module`
    *   `@blockdeploy/rpc-api-generator`
    *   `@blockdeploy/token-creator` (pour l'option "utiliser un token existant" si ce token est un ERC20Votes).
*   **Externes :**
    *   `ethers` (ou `viem`)
    *   `@openzeppelin/contracts`

## 11. Structure du Module (`packages/dao-builder`)
```
/packages/dao-builder/
|-- /backend/
|   |-- /src/
|   |   |-- /api/
|   |   |-- /services/ # Logique de génération SC, gestion métadonnées DAO/propositions
|   |   |-- /templates/
|   |   |   |-- GovernanceToken.sol.template
|   |   |   |-- DAO_Governor.sol.template
|   |   |   `-- SimpleTreasury.sol.template
|   |   `-- ...
|   `-- package.json
|-- /frontend/
|   |-- /components/
|   |   |-- /admin/      # Composants pour la création/configuration de DAO
|   |   `-- /governance/ # Composants pour l'interface de la DAO (propositions, vote)
|   |-- /pages/
|   `-- package.json
|-- /shared/
|   `-- package.json
|-- DAOBuilder_Module_README.md # Ce fichier
|-- API_Endpoints_DAOBuilder.md
|-- Frontend_Components_DAOBuilder.md
|-- DAOBuilder_Wireframes_ASCII.md
`-- package.json
```

## 12. Tests (Stratégie Initiale)

*   **Smart Contracts :** Tests très approfondis (Hardhat/Foundry) du cycle de vie complet d'une DAO : déploiement, création de proposition, vote, mise en file d'attente, exécution, gestion de la trésorerie. Tester différents scénarios de vote et de quorum.
*   **Backend :** Tests unitaires et d'intégration pour les API.
*   **Frontend :** Tests unitaires pour les composants. Tests d'intégration pour les flux de création de DAO et d'interaction avec la gouvernance.

## 13. Déploiement

*   **Backend Service :** Déployé comme un microservice.
*   **Frontend DAO Builder UI :** Partie de la plateforme BlockDeploy.
*   **Contrats de DAO :** Déployés par les utilisateurs sur la blockchain de leur choix.

## 14. Considérations de Sécurité

*   **Audit des Contrats Templates :** Les templates et surtout leur assemblage/configuration doivent être sécurisés. S'appuyer fortement sur les audits d'OpenZeppelin pour les composants de base.
*   **Ordre de Déploiement et Configuration des Rôles :** Crucial pour la sécurité de la DAO. Le frontend doit guider l'utilisateur très clairement. Par exemple, le `TimelockController` doit être l'owner de la `Treasury`, et le `Governor` doit être le seul `PROPOSER` sur le `Timelock` (en dehors de l'admin initial du Timelock).
*   **Interface de Proposition :** S'assurer que les actions proposées (targets, calldatas) sont correctement formées et présentées à l'utilisateur pour éviter des propositions malveillantes.

## 15. Considérations Futures (Post-MVP)

*   Intégration avec TheGraph pour l'indexation des données de vote et de trésorerie.
*   Support pour des modules de vote plus complexes (ex: vote quadratique, conviction voting).
*   Gestionnaire de trésorerie plus avancé (intégration Gnosis Safe).
*   Outils de discussion et de débat off-chain liés aux propositions.
*   Templates de DAO spécialisés (ex: DAO d'investissement, DAO de subvention).
*   Support pour l'import et la gestion de DAOs existantes non créées via BlockDeploy.

## 16. Contribution

*   Respecter les conventions de BlockDeploy.
*   Focus sur la sécurité et la robustesse des mécanismes de gouvernance.
*   Assurer la clarté des interfaces pour des processus complexes.

---
**Signé : Team Primex Software – https://primex-software.com**
```
