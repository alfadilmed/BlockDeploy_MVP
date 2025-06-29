```markdown
# Composants Frontend Principaux - Module : DAO Builder

**Document élaboré par : Team Primex Software**
**Site Web : https://primex-software.com**
**Version : 1.0**

---
**Signé : Team Primex Software – https://primex-software.com**
---

## Table des Matières

1.  [Introduction](#1-introduction)
2.  [Catégories de Composants](#2-catégories-de-composants)
3.  [Composants de Création et Configuration de DAO (Admin UI)](#3-composants-de-création-et-configuration-de-dao-admin-ui)
    *   [3.1 `DAOBuilderLayout`](#31-daobuilderlayout)
    *   [3.2 `DAOCreationForm`](#32-daocreationform)
    *   [3.3 `TokenConfigSubForm`](#33-tokenconfigsubform)
    *   [3.4 `GovernorSettingsSubForm`](#34-governorsettingssubform)
    *   [3.5 `TimelockSettingsSubForm`](#35-timelocksettingssubform)
    *   [3.6 `DAOContractsDeploymentStepper`](#36-daocontractsdeploymentstepper)
4.  [Composants d'Interface de Gouvernance (Member UI)](#4-composants-dinterface-de-gouvernance-member-ui)
    *   [4.1 `DAODashboardLayout`](#41-daodashboardlayout)
    *   [4.2 `ProposalList`](#42-proposallist)
    *   [4.3 `ProposalCard`](#43-proposalcard)
    *   [4.4 `ProposalCreateModal`](#44-proposalcreatemodal)
    *   [4.5 `ProposalDetailView`](#45-proposaldetailview)
    *   [4.6 `VoteCastingInterface`](#46-votecastinginterface)
    *   [4.7 `TreasuryOverview`](#47-treasuryoverview)
    *   [4.8 `DelegateVoteButton`](#48-delegatevotebutton)
5.  [Composants Partagés/Utilitaires](#5-composants-partagésutilitaires)
6.  [Gestion de l'État Frontend](#6-gestion-de-létat-frontend)

## 1. Introduction

Ce document décrit les principaux composants React (ou équivalent) pour l'interface utilisateur du module DAO Builder. Ces composants permettent aux utilisateurs de créer, configurer, déployer et interagir avec des Organisations Autonomes Décentralisées (DAO).

Ils seront situés dans `packages/dao-builder/frontend/components/`.

## 2. Catégories de Composants

*   **Admin UI :** Interface pour le créateur de la DAO, pour définir les paramètres et initier le déploiement des contrats.
*   **Member UI :** Interface pour les membres de la DAO (détenteurs de tokens de gouvernance) pour participer à la gouvernance (voir les propositions, voter, créer des propositions).

## 3. Composants de Création et Configuration de DAO (Admin UI)

### 3.1 `DAOBuilderLayout`

*   **Description :** Layout principal pour la section "DAO Builder" au sein de BlockDeploy.
*   **Contient :** Navigation (ex: "Créer une DAO", "Mes DAOs"), et le contenu spécifique à l'étape de création ou de gestion.

### 3.2 `DAOCreationForm`

*   **Description :** Formulaire principal, potentiellement en plusieurs étapes (wizard), pour configurer une nouvelle DAO.
*   **Contient :** `TokenConfigSubForm`, `GovernorSettingsSubForm`, `TimelockSettingsSubForm`, un résumé, et des actions de progression.
*   **Champs Généraux :**
    *   Input pour "Nom de la DAO" (public).
    *   Textarea pour "Description de la DAO" (public).
    *   Input pour "Logo de la DAO" (URL ou upload).
*   **État Géré :** Toutes les configurations de la DAO en cours de création.

### 3.3 `TokenConfigSubForm`

*   **Description :** Sous-formulaire pour la configuration du token de gouvernance.
*   **Champs / Contrôles :**
    *   Options : "Créer un nouveau token" OU "Utiliser un token ERC20Votes existant".
    *   **Si Nouveau Token :**
        *   Input "Nom du Token".
        *   Input "Symbole du Token".
        *   Input "Supply Initiale" (et à qui l'attribuer, ex: le créateur, la future trésorerie).
        *   Checkbox "Mintable par le Owner/DAO ?" (pour future augmentation de supply).
        *   (Décimales par défaut à 18).
    *   **Si Token Existant :**
        *   Input "Adresse du Contrat Token".
        *   Validation de la compatibilité ERC20Votes (via appel RPC `supportsInterface` ou lecture simple).
*   **État Géré :** Configuration du token.

### 3.4 `GovernorSettingsSubForm`

*   **Description :** Sous-formulaire pour les paramètres du contrat Governor.
*   **Champs / Contrôles :**
    *   Input (nombre de blocs) "Délai de Vote (Voting Delay)". Infobulle expliquant.
    *   Input (nombre de blocs) "Période de Vote (Voting Period)". Infobulle.
    *   Input (nombre de tokens) "Seuil de Proposition". Infobulle.
    *   Input (pourcentage) "Quorum Requis (%)". Infobulle.
*   **État Géré :** Paramètres du Governor.

### 3.5 `TimelockSettingsSubForm`

*   **Description :** Sous-formulaire pour les paramètres du contrat TimelockController.
*   **Champs / Contrôles :**
    *   Input (secondes/jours) "Délai Minimum d'Exécution (Min Delay)". Infobulle.
    *   (Pour MVP, les rôles Proposer/Executor seront configurés par défaut : Governor pour Proposer, `address(0)` pour Executor).
*   **État Géré :** Paramètres du Timelock.

### 3.6 `DAOContractsDeploymentStepper`

*   **Description :** Composant qui guide l'utilisateur à travers le processus de déploiement en plusieurs étapes des contrats de la DAO (Token, Timelock, Governor, Treasury) et la configuration des rôles.
*   **Contient :**
    *   Affichage de l'étape actuelle.
    *   Bouton "Préparer le contrat X" (appelle l'API backend).
    *   Bouton "Déployer le contrat X avec [Wallet]" (interagit avec le wallet).
    *   Bouton "Configurer les Rôles" (pour les transactions de configuration post-déploiement).
    *   Feedback visuel sur le statut de chaque déploiement/transaction.
*   **Logique :** Utilise le `deploymentPlan` retourné par l'API `prepare-dao-contracts` pour orchestrer les étapes.

## 4. Composants d'Interface de Gouvernance (Member UI)

Ces composants sont pour une DAO spécifique, une fois qu'elle est déployée et que l'utilisateur y navigue.

### 4.1 `DAODashboardLayout`

*   **Description :** Layout principal pour la page d'une DAO spécifique.
*   **Contient :** Nom de la DAO, logo, navigation interne (Propositions, Trésorerie, Paramètres de la DAO), bouton de connexion wallet.
*   **Props :** `daoData` (infos sur la DAO : adresses contrats, nom, etc.).

### 4.2 `ProposalList`

*   **Description :** Affiche une liste de propositions pour la DAO.
*   **Contient :** `ProposalCard` multiples, filtres (Actives, Passées, Annulées, etc.), pagination.
*   **Props :** `proposals` (tableau de données de propositions), `filters`.

### 4.3 `ProposalCard`

*   **Description :** Affiche un résumé d'une proposition.
*   **Contient :** Titre, ID, statut (Active, Réussie, Échouée, etc.), dates clés (fin du vote, exécutable à partir de), nombre de votes Pour/Contre/Abstention (barre de progression), lien vers le détail.
*   **Props :** `proposalData`.

### 4.4 `ProposalCreateModal` (ou page dédiée)

*   **Description :** Formulaire permettant aux membres éligibles de créer une nouvelle proposition de gouvernance.
*   **Champs / Contrôles :**
    *   Input "Titre de la Proposition".
    *   Textarea (Markdown?) "Description / Motivation".
    *   **Section Actions à Exécuter :**
        *   Interface pour ajouter une ou plusieurs actions (Target Address, Value (ETH), Calldata/Function Signature).
        *   Pour MVP, cela pourrait être simplifié à des types d'actions prédéfinis (ex: "Transférer des fonds de la trésorerie", où l'utilisateur ne remplit que le bénéficiaire et le montant).
*   **Actions :** Bouton "Soumettre la Proposition" (interagit avec le contrat Governor via wallet, et envoie les métadonnées au backend BlockDeploy).
*   **Logique :** Vérifie si l'utilisateur connecté a le seuil de tokens requis pour proposer.

### 4.5 `ProposalDetailView`

*   **Description :** Affiche les détails complets d'une proposition.
*   **Contient :**
    *   Titre, description complète.
    *   Proposeur, dates clés (création, début/fin vote, statut actuel).
    *   Actions à exécuter (targets, values, calldatas décodées si possible).
    *   Résultats du vote en temps réel (ou après snapshot) : Pour, Contre, Abstention (nombre de votes et %).
    *   Quorum (atteint/non atteint).
    *   `VoteCastingInterface` (si la proposition est active).
    *   Boutons d'action contextuels : "Mettre en file d'attente" (si adoptée), "Exécuter" (si en file d'attente et délai passé), "Annuler" (si possible).
*   **Props :** `proposalIdOnChain`, `daoContractAddress`.

### 4.6 `VoteCastingInterface`

*   **Description :** Section permettant à un utilisateur de voter sur une proposition active.
*   **Contient :**
    *   Boutons "Voter Pour", "Voter Contre", "Voter Abstention".
    *   Affichage du poids de vote de l'utilisateur (balance de tokens au moment du snapshot).
    *   Message si l'utilisateur a déjà voté ou s'il n'a pas de droit de vote.
    *   Bouton `DelegateVoteButton` si l'utilisateur n'a pas encore délégué ses votes.
*   **Actions :** `onCastVote(support)` (interagit avec le contrat Governor via wallet).

### 4.7 `TreasuryOverview`

*   **Description :** Affiche un aperçu de la trésorerie de la DAO.
*   **Contient (MVP) :**
    *   Balance en ETH du contrat Treasury.
    *   Liste des principaux tokens ERC-20 détenus et leurs balances.
    *   (Futur) Historique des transactions entrantes/sortantes.
*   **Logique :** Lit les balances directement depuis la blockchain (via RPC).

### 4.8 `DelegateVoteButton`

*   **Description :** Bouton permettant à un utilisateur de déléguer ses droits de vote ERC20Votes à lui-même (nécessaire pour pouvoir voter) ou à une autre adresse.
*   **Logique :** Appelle la fonction `delegate(address)` du contrat de token de gouvernance.
*   **Affichage :** Montre l'adresse de délégation actuelle si elle existe.

## 5. Composants Partagés/Utilitaires

*   `AddressDisplay`: Affiche une adresse ETH avec lien vers explorateur et option de copie.
*   `MarkdownRenderer`: Pour afficher les descriptions de propositions.
*   `TransactionStatusNotifier`: Affiche des notifications pour les transactions en cours/réussies/échouées.

## 6. Gestion de l'État Frontend

*   **Admin UI (Création DAO) :** État local complexe géré par `DAOCreationForm` (potentiellement avec `useReducer` ou une mini-librairie d'état de formulaire).
*   **Member UI (Interaction DAO) :**
    *   SWR ou React Query pour charger les données des DAOs, listes de propositions, détails de propositions, et balances de trésorerie. Ces librairies gèrent le cache, la revalidation, etc.
    *   `WalletContext` (de `@blockdeploy/walletconnect-module`) pour les informations du wallet.
    *   État local pour les interactions de vote, création de proposition.

---
**Signé : Team Primex Software – https://primex-software.com**
```
