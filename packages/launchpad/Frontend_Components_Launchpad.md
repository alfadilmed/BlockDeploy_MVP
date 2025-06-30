```markdown
# Composants Frontend Principaux - Module : Launchpad

**Document élaboré par : Team Primex Software**
**Site Web : https://primex-software.com**
**Version : 1.0**

---
**Signé : Team Primex Software – https://primex-software.com**
---

## Table des Matières

1.  [Introduction](#1-introduction)
2.  [Catégories de Composants](#2-catégories-de-composants)
3.  [Composants d'Administration de Vente (Project Owner UI)](#3-composants-dadministration-de-vente-project-owner-ui)
    *   [3.1 `LaunchpadAdminLayout`](#31-launchpadadminlayout)
    *   [3.2 `SaleCreationForm`](#32-salecreationform)
    *   [3.3 `VestingScheduleForm`](#33-vestingscheduleform)
    *   [3.4 `WhitelistManagementTable`](#34-whitelistmanagementtable)
    *   [3.5 `SaleDeploymentActions`](#35-saledeploymentactions)
    *   [3.6 `SaleAdminDashboard`](#36-saleadmindashboard)
4.  [Composants d'Interface Investisseur (Investor UI)](#4-composants-dinterface-investisseur-investor-ui)
    *   [4.1 `LaunchpadInvestorLayout`](#41-launchpadinvestorlayout)
    *   [4.2 `SaleCard`](#42-salecard)
    *   [4.3 `SaleGrid`](#43-salegrid)
    *   [4.4 `SaleDetailView`](#44-saledetailview)
    *   [4.5 `InvestmentModal`](#45-investmentmodal)
    *   [4.6 `UserVestingClaims`](#46-uservestingclaims)
5.  [Composants Partagés](#5-composants-partagés)
    *   [5.1 `CountdownTimer`](#51-countdowntimer)
    *   [5.2 `ProgressBar`](#52-progressbar)
6.  [Gestion de l'État Frontend](#6-gestion-de-létat-frontend)

## 1. Introduction

Ce document décrit les principaux composants React (ou équivalent) pour l'interface utilisateur du module Launchpad. Ces composants sont divisés en deux catégories principales :
1.  **Composants d'Administration :** Utilisés par les propriétaires de projets pour créer, configurer et gérer leurs ventes de tokens.
2.  **Composants d'Interface Investisseur :** Utilisés par les investisseurs pour découvrir, évaluer et participer aux ventes de tokens.

Ces composants seront situés dans `packages/launchpad/frontend/components/`.

## 2. Catégories de Composants

*   **Admin UI :** Interface permettant à un Project Owner de définir les paramètres de sa vente, de gérer la whitelist, de déployer les contrats et de suivre la progression.
*   **Investor UI :** Interface publique où les investisseurs peuvent voir les ventes, se connecter avec leur wallet et acheter des tokens.

## 3. Composants d'Administration de Vente (Project Owner UI)

### 3.1 `LaunchpadAdminLayout`

*   **Description :** Layout principal pour la section d'administration du Launchpad au sein de BlockDeploy.
*   **Contient :** Navigation spécifique à l'admin (ex: "Créer une Vente", "Mes Ventes"), et affiche les formulaires/tableaux de bord appropriés.

### 3.2 `SaleCreationForm`

*   **Description :** Formulaire multi-étapes ou long pour configurer tous les aspects d'une nouvelle vente de tokens.
*   **Sections / Champs :**
    *   **Informations sur le Projet/Vente :** Nom du projet, logo, description, site web, liens sociaux (données off-chain).
    *   **Détails du Token :** Adresse du token ERC-20 à vendre, prix du token, total à vendre (hard cap).
    *   **Paramètres de la Vente :** Dates/heures de début et fin, min/max investissement par utilisateur, adresse du portefeuille de collecte des fonds.
    *   **Whitelisting :** Option pour activer/désactiver, méthode d'upload de la liste d'adresses (CSV).
    *   **Token de Paiement :** (MVP: Monnaie native, ex: ETH. Futur: Sélection ERC-20).
*   **Actions :** `onSaveDraft`, `onProceedToVesting` (si applicable), `onProceedToDeploymentPrep`.

### 3.3 `VestingScheduleForm`

*   **Description :** Formulaire (potentiellement répétable) pour configurer un calendrier de vesting pour une allocation de tokens (ex: équipe, advisors).
*   **Champs / Contrôles :**
    *   Nom du calendrier (ex: "Vesting Équipe").
    *   Adresse du bénéficiaire.
    *   Montant total des tokens à vester.
    *   Date/heure de début du vesting.
    *   Durée du cliff (en jours/mois).
    *   Durée totale du vesting après le cliff (en jours/mois).
    *   (Optionnel) Fréquence de déblocage (linéaire continu par défaut).
*   **Actions :** `onAddSchedule`, `onRemoveSchedule`.

### 3.4 `WhitelistManagementTable`

*   **Description :** Interface pour visualiser, ajouter, et supprimer des adresses de la whitelist d'une vente.
*   **Contient :** Tableau des adresses whitelistées, champ d'ajout d'adresse, bouton de suppression, option d'upload CSV.
*   **Actions :** `onAddAddress`, `onRemoveAddress`, `onUploadWhitelist` (appellent l'API backend).

### 3.5 `SaleDeploymentActions`

*   **Description :** Section affichée après la configuration complète d'une vente (et du vesting si applicable), permettant le déploiement des contrats.
*   **Contient :**
    *   Résumé des configurations.
    *   Bouton "Préparer les Contrats".
    *   Feedback sur la préparation (bytecode/ABI si affiché).
    *   Bouton "Déployer le Contrat de Vente avec [Wallet]".
    *   (Si vesting) Bouton "Déployer le Contrat de Vesting pour [Bénéficiaire] avec [Wallet]".
    *   Instructions claires sur l'ordre de déploiement et le financement du contrat de vente avec les tokens.
    *   Affichage du statut de déploiement et des adresses des contrats.

### 3.6 `SaleAdminDashboard`

*   **Description :** Tableau de bord pour une vente déployée, visible par le Project Owner.
*   **Contient :**
    *   Statistiques clés : Fonds levés, tokens vendus, nombre de participants, temps restant.
    *   Lien vers le contrat de vente sur l'explorateur.
    *   Fonctions d'administration :
        *   Bouton "Retirer les Fonds Collectés" (après la fin de la vente).
        *   Bouton "Récupérer les Tokens Invendus" (après la fin de la vente).
        *   Gestion de la whitelist (lien vers `WhitelistManagementTable`).
    *   Liste des participants et leurs contributions.

## 4. Composants d'Interface Investisseur (Investor UI)

### 4.1 `LaunchpadInvestorLayout`

*   **Description :** Layout principal pour la section publique du Launchpad.
*   **Contient :** Header (avec logo BlockDeploy/Launchpad, filtres de recherche de ventes, bouton de connexion wallet), Footer.

### 4.2 `SaleCard`

*   **Description :** Affiche un aperçu d'une vente de token dans une liste ou grille.
*   **Contient :**
    *   Logo et nom du projet.
    *   Symbole du token et prix.
    *   Dates de début/fin ou statut (À Venir, Actif, Terminé).
    *   Barre de progression des fonds levés / tokens vendus.
    *   Bouton "Voir Détails" ou "Participer".
*   **Props :** `saleData` (objet contenant les infos de la vente).

### 4.3 `SaleGrid`

*   **Description :** Affiche une grille de `SaleCard`.
*   **Contient :** `SaleCard` multiples, filtres (par statut, par chaîne - futur), pagination.
*   **Props :** `sales` (tableau de données de ventes).

### 4.4 `SaleDetailView`

*   **Description :** Page ou section affichant les informations complètes d'une vente.
*   **Contient :**
    *   Informations détaillées sur le projet (description, site web, réseaux sociaux).
    *   Détails du token (nom, symbole, adresse du contrat, utilité).
    *   Conditions de la vente (prix, dates, caps, min/max investissement, whitelist).
    *   Progression de la vente (barre de progression, fonds levés, participants).
    *   Section de participation (`InvestmentModal` ou section intégrée).
    *   FAQ spécifique à la vente.
*   **Props :** `saleId` ou `saleContractAddress`.

### 4.5 `InvestmentModal` (ou section dans `SaleDetailView`)

*   **Description :** Interface permettant à un investisseur de participer à une vente active.
*   **Contient :**
    *   Affichage du statut de whitelist de l'utilisateur (si applicable).
    *   Input pour le montant d'investissement (en monnaie native).
    *   Calcul du nombre de tokens à recevoir.
    *   Affichage du solde de monnaie native du wallet.
    *   Vérification des limites min/max d'investissement.
    *   Bouton "Acheter des Tokens" (déclenche interaction wallet).
    *   Feedback sur la transaction (en cours, succès, échec).
*   **Nécessite :** Connexion wallet, `saleData`.

### 4.6 `UserVestingClaims` (dans un profil utilisateur ou tableau de bord investisseur)

*   **Description :** Affiche les calendriers de vesting auxquels l'utilisateur connecté est bénéficiaire.
*   **Contient (par calendrier) :**
    *   Nom du token.
    *   Montant total à vester.
    *   Montant déjà réclamé.
    *   Montant actuellement réclamable.
    *   Prochain déblocage (date et montant).
    *   Bouton "Réclamer les Tokens" (interagit avec le contrat de vesting).
*   **Props :** `userAddress`.

## 5. Composants Partagés

### 5.1 `CountdownTimer`

*   **Description :** Affiche un compte à rebours jusqu'à une date/heure spécifique.
*   **Utilisation :** Début/fin de vente.
*   **Props :** `targetTimestamp`.

### 5.2 `ProgressBar`

*   **Description :** Affiche une barre de progression.
*   **Utilisation :** Progression de la vente (fonds levés / hard cap).
*   **Props :** `currentValue`, `maxValue`, `label`.

## 6. Gestion de l'État Frontend

*   **Admin UI :**
    *   État local pour les formulaires complexes (`SaleCreationForm`, `VestingScheduleForm`).
    *   Contexte React (`LaunchpadAdminContext`) pour partager l'état de la vente en cours de création/modification, les résultats des appels API backend.
*   **Investor UI :**
    *   SWR ou React Query pour récupérer et mettre en cache les listes de ventes et les détails des ventes.
    *   Contexte React (`WalletContext` via `@blockdeploy/walletconnect-module`).
    *   État local pour les modales d'investissement, les montants saisis.

---
**Signé : Team Primex Software – https://primex-software.com**
```
