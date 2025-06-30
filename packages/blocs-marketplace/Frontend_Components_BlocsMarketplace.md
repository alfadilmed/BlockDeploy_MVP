```markdown
# Composants Frontend Clés - Module : Blocs Marketplace

**Document élaboré par : Team Primex Software**
**Site Web : https://primex-software.com**
**Version : 1.1 (Mise à jour pour M5.3)**

---
**Signé : Team Primex Software – https://primex-software.com**
---

## Table des Matières

1.  [Introduction](#1-introduction)
2.  [Composants de Consultation Publique](#2-composants-de-consultation-publique)
    *   [2.1 `MarketplaceLayout`](#21-marketplacelayout)
    *   [2.2 `BlocCard`](#22-bloccard)
    *   [2.3 `BlocGrid`](#23-blocgrid)
    *   [2.4 `BlocDetailView`](#24-blocdetailview)
    *   [2.5 `CategorySidebar`](#25-categorysidebar)
    *   [2.6 `TagCloud`](#26-tagcloud)
    *   [2.7 `SearchBar`](#27-searchbar)
    *   [2.8 `BlocPreviewRenderer`](#28-blocpreviewrenderer)
    *   [2.9 `AcquireBlocButtonMock`](#29-acquireblocbuttonmock)
3.  [Composants de Soumission et Gestion (Utilisateur/Admin)](#3-composants-de-soumission-et-gestion-utilisateuradmin)
    *   [3.1 `BlocSubmissionForm`](#31-blocsubmissionform)
    *   [3.2 `MySubmittedBlocsList`](#32-mysubmittedblocslist)
    *   [3.3 `AdminModerationQueue`](#33-adminmoderationqueue)
    *   [3.4 `AdminBlocReviewModal`](#34-adminblocreviewmodal)
4.  [Composants d'Intégration avec le Drag & Drop Builder](#4-composants-dintégration-avec-le-drag--drop-builder)
    *   [4.1 `ImportBlocFromMarketplaceModal`](#41-importblocfrommarketplacemodal)
5.  [Gestion de l'État Frontend](#5-gestion-de-létat-frontend)

## 1. Introduction

Ce document décrit les principaux composants React (ou équivalent) pour l'interface utilisateur du module Blocs Marketplace. Cette version 1.1 (M5.3) étend les composants initiaux pour inclure la soumission de blocs par les utilisateurs et la modération par les administrateurs, ainsi que l'intégration avec le Drag & Drop Builder.

## 2. Composants de Consultation Publique

Ces composants sont largement les mêmes que ceux définis pour la structure M4.2, avec quelques ajouts ou précisions.

### 2.1 `MarketplaceLayout`

*   **Description :** Layout principal.
*   **Contient maintenant :** Lien/bouton "Soumettre un Bloc" (visible si utilisateur authentifié avec droits de soumission).

### 2.2 `BlocCard`

*   **Description :** Aperçu d'un Bloc.
*   **Contient maintenant :** Indication de licence (Gratuit, Payant) et prix simulé si payant. Bouton d'action contextuel ("Voir Détails", "Obtenir" si payant et non acquis, "Utiliser" si gratuit ou acquis).

### 2.3 `BlocGrid`

*   Inchangé par rapport à M4.2.

### 2.4 `BlocDetailView`

*   **Description :** Détails complets d'un Bloc.
*   **Contient maintenant :**
    *   Information de licence et prix (simulé) plus proéminente.
    *   `AcquireBlocButtonMock` si le bloc est payant et non encore "acquis" par l'utilisateur.
    *   Bouton "Utiliser ce Bloc dans le Builder" (si gratuit ou "acquis").

### 2.5 `CategorySidebar`

*   Inchangé.

### 2.6 `TagCloud`

*   Inchangé.

### 2.7 `SearchBar`

*   Inchangé.

### 2.8 `BlocPreviewRenderer`

*   Inchangé.

### 2.9 `AcquireBlocButtonMock`

*   **Description :** Bouton spécifique pour les Blocs payants (simulés).
*   **Logique :** Au clic, appelle l'API `POST /api/v1/blocs-marketplace/blocs/{blocId}/acquire-mock`. Met à jour l'état local/utilisateur pour indiquer que le bloc est "débloqué". Affiche un message de confirmation.
*   **Props :** `blocId`, `priceInfo`, `isAcquired` (pour changer son état/texte).

## 3. Composants de Soumission et Gestion (Utilisateur/Admin)

### 3.1 `BlocSubmissionForm`

*   **Description :** Formulaire permettant aux utilisateurs authentifiés de soumettre un nouveau Bloc.
*   **Champs / Contrôles :**
    *   Tous les champs de `metadata` requis par `Bloc_Definition_Format.md` (nom, description, tags, catégorie, URL preview image - ou upload).
    *   Upload du fichier `bloc.json` (ou textarea pour coller le `content` JSON).
    *   Sélection du type de licence (`licenseType`: "Free", "PaidUsage").
    *   Si "PaidUsage", champs pour `price.amount` et `price.currency` (limité à "_MOCK" pour MVP).
*   **Actions :** `onSubmitBloc` (appelle `POST /api/v1/blocs-marketplace/blocs/submit`).
*   **Feedback :** Affiche les messages de succès ou d'erreur de la soumission.

### 3.2 `MySubmittedBlocsList` (pour les créateurs de blocs)

*   **Description :** Tableau de bord où un utilisateur peut voir les blocs qu'il a soumis et leur statut (En attente de validation, Approuvé, Rejeté).
*   **Contient :** Liste d'items, chacun avec nom du bloc, statut, date de soumission, et potentiellement le motif de rejet.
*   **Logique :** Appelle une future API `GET /api/v1/blocs-marketplace/users/me/submitted-blocs`.

### 3.3 `AdminModerationQueue` (pour les admins BlockDeploy)

*   **Description :** Interface pour les administrateurs pour voir et traiter les soumissions de Blocs en attente.
*   **Contient :** Tableau/liste des blocs soumis avec statut "PendingReview". Chaque item aura des boutons "Approuver" / "Rejeter".
*   **Logique :** Appelle `GET /api/v1/blocs-marketplace/admin/submissions`.

### 3.4 `AdminBlocReviewModal` (pour les admins BlockDeploy)

*   **Description :** Modale affichée lorsqu'un admin clique pour réviser un bloc soumis.
*   **Contient :**
    *   Affichage de toutes les métadonnées du bloc soumis.
    *   `BlocPreviewRenderer` pour visualiser le bloc.
    *   Lien pour télécharger/voir le JSON `content` soumis.
    *   Champs pour l'admin :
        *   Option pour ajuster/finaliser le `blocId` public.
        *   Champ pour le motif de rejet (si rejet).
        *   Notes internes.
    *   Boutons "Approuver la Soumission" et "Rejeter la Soumission".
*   **Logique :** Appelle les API `/approve` ou `/reject`.

## 4. Composants d'Intégration avec le Drag & Drop Builder

### 4.1 `ImportBlocFromMarketplaceModal`

*   **Description :** Modale affichée à l'intérieur du Drag & Drop Builder lorsque l'utilisateur souhaite importer un Bloc.
*   **Contient :**
    *   Une version embarquée de l'interface de consultation de la marketplace : `SearchBar`, `CategorySidebar`, `TagCloud`, `BlocGrid`.
    *   Les `BlocCard` dans cette modale auront un bouton "Importer ce Bloc" (ou "Aperçu et Importer").
*   **Logique :**
    *   Lorsqu'un bloc est sélectionné pour import :
        *   Vérifie la licence et le statut "acquis" (via `localStorage` ou API `/unlocked-blocs` si payant).
        *   Si autorisé, récupère le JSON complet du bloc (`GET /api/v1/blocs-marketplace/blocs/{blocId}`).
        *   Passe le `content` JSON du bloc au D&D Builder pour injection.
    *   Si un bloc payant n'est pas acquis, le bouton "Importer" est remplacé par "Acquérir sur la Marketplace" (qui pourrait ouvrir la page du bloc dans un nouvel onglet ou une modale d'acquisition simulée).

## 5. Gestion de l'État Frontend

*   **SWR / React Query :** Toujours utilisé pour la récupération et le caching des données de la marketplace.
*   **État Utilisateur Authentifié :** Un contexte global (`AuthContext` ou similaire) fournira l'état d'authentification de l'utilisateur et ses rôles (pour afficher/cacher les UI d'admin ou de soumission).
*   **État Local (`localStorage` ou Contexte) :** Pour suivre les blocs "acquis" (simulé pour MVP).
*   **État des Formulaires :** Géré localement dans les composants de formulaire (ex: `BlocSubmissionForm`) ou avec une librairie de gestion de formulaires (React Hook Form, Formik).

---
**Signé : Team Primex Software – https://primex-software.com**
```
