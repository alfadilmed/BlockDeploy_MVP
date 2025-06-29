```markdown
# Composants Frontend Clés - Module : Blocs Marketplace

**Document élaboré par : Team Primex Software**
**Site Web : https://primex-software.com**
**Version : 1.0**

---
**Signé : Team Primex Software – https://primex-software.com**
---

## Table des Matières

1.  [Introduction](#1-introduction)
2.  [Composants Principaux (MVP Structure)](#2-composants-principaux-mvp-structure)
    *   [2.1 `MarketplaceLayout`](#21-marketplacelayout)
    *   [2.2 `BlocCard`](#22-bloccard)
    *   [2.3 `BlocGrid`](#23-blocgrid)
    *   [2.4 `BlocDetailView`](#24-blocdetailview)
    *   [2.5 `CategorySidebar`](#25-categorysidebar)
    *   [2.6 `TagCloud`](#26-tagcloud)
    *   [2.7 `SearchBar`](#27-searchbar)
    *   [2.8 `BlocPreviewRenderer`](#28-blocpreviewrenderer)
3.  [Composants d'Administration (Futur - Soumission par Tiers)](#3-composants-dadministration-futur---soumission-par-tiers)
    *   [3.1 `BlocSubmissionForm`](#31-blocsubmissionform)
    *   [3.2 `MyBlocsDashboard`](#32-myblocsdashboard)
4.  [Gestion de l'État Frontend](#4-gestion-de-létat-frontend)
5.  [Intégration avec le Drag & Drop Builder](#5-intégration-avec-le-drag--drop-builder)

## 1. Introduction

Ce document décrit les principaux composants React (ou équivalent) pour l'interface utilisateur du module Blocs Marketplace. Pour le MVP axé sur la structure, l'accent est mis sur les composants permettant de naviguer et de visualiser les Blocs. Les composants de soumission par des tiers sont mentionnés pour l'avenir.

Ces composants seront situés dans `packages/blocs-marketplace/frontend/components/`.

## 2. Composants Principaux (MVP Structure)

### 2.1 `MarketplaceLayout`

*   **Description :** Layout principal pour la Blocs Marketplace.
*   **Contient :** Header (avec titre "Blocs Marketplace", recherche, filtres, lien "Soumettre un Bloc" - admin/futur), `CategorySidebar` (optionnel), la zone principale pour `BlocGrid` ou `BlocDetailView`, Footer.
*   **Props :** `children`.

### 2.2 `BlocCard`

*   **Description :** Affiche un aperçu d'un Bloc dans une liste ou une grille.
*   **Contient :**
    *   Image de prévisualisation du Bloc (`metadata.previewImageUrl`).
    *   Nom du Bloc (`metadata.name`).
    *   Auteur du Bloc (`metadata.author`).
    *   Courte description (`metadata.description` tronquée).
    *   Tags (`metadata.tags`).
    *   Catégorie (`metadata.category`).
    *   (Futur) Notation, nombre de téléchargements/utilisations.
    *   Lien vers la `BlocDetailView`.
*   **Props :** `blocMetadata` (objet contenant les métadonnées d'un bloc, sans le `content`).

### 2.3 `BlocGrid`

*   **Description :** Affiche une grille responsive de `BlocCard`.
*   **Contient :** Plusieurs instances de `BlocCard`, gestion de la pagination si de nombreux blocs.
*   **Props :** `blocs` (tableau de `blocMetadata`), `isLoading` (boolean), `paginationInfo`.

### 2.4 `BlocDetailView`

*   **Description :** Page ou section affichant les détails complets d'un Bloc sélectionné.
*   **Contient :**
    *   Toutes les métadonnées du Bloc (nom, auteur, description complète, version, licence, etc.).
    *   Une prévisualisation plus grande ou interactive du Bloc (via `BlocPreviewRenderer`).
    *   Bouton "Utiliser ce Bloc" ou "Ajouter au Builder" (logique d'intégration avec le Drag & Drop Builder).
    *   (Futur) Section de commentaires, notation, informations sur les versions.
    *   (Optionnel) Affichage brut du JSON du `content` du Bloc pour les utilisateurs avancés.
*   **Props :** `blocData` (l'objet Bloc complet, incluant `metadata` et `content`).

### 2.5 `CategorySidebar`

*   **Description :** Barre latérale affichant les catégories de Blocs disponibles pour filtrer la `BlocGrid`.
*   **Contient :** Liste de liens de catégories.
*   **Props :** `categories` (tableau de strings ou objets `{name, count}`), `selectedCategory`, `onSelectCategory`.

### 2.6 `TagCloud` (ou `TagFilter`)

*   **Description :** Affiche les tags populaires ou permet de filtrer par tags.
*   **Contient :** Liste de tags cliquables.
*   **Props :** `tags` (tableau de strings ou objets `{name, count}`), `selectedTags`, `onSelectTag`.

### 2.7 `SearchBar`

*   **Description :** Champ de recherche simple pour trouver des Blocs par nom, description, ou tags.
*   **Contient :** Input text, bouton de soumission/icône de recherche.
*   **Props :** `onSearchSubmit` (function).

### 2.8 `BlocPreviewRenderer`

*   **Description :** Un composant spécialisé capable de prendre la section `content` (JSON) d'un Bloc et de la rendre visuellement. Ce composant réutilise la logique de rendu du Drag & Drop Builder lui-même, mais en mode "lecture seule" et potentiellement dans un iframe ou un conteneur isolé pour des raisons de style et de sécurité.
*   **Props :** `blocContent` (l'objet JSON `content` du Bloc).
*   **Logique :**
    *   Parcourt la structure `ComponentNode` du `blocContent`.
    *   Utilise un mapping `type -> ReactComponent` (similaire au `CanvasNode` du D&D Builder) pour afficher les composants réels.
    *   Applique les `props` stockées dans le JSON du Bloc aux composants rendus.
    *   Doit gérer les styles de manière isolée pour ne pas être affecté par les styles de la page de la marketplace.

## 3. Composants d'Administration (Futur - Soumission par Tiers)

Ces composants seraient utilisés dans une section d'administration de la marketplace, non prioritaire pour le MVP "Structure".

### 3.1 `BlocSubmissionForm`

*   **Description :** Formulaire permettant aux développeurs/designers de soumettre un nouveau Bloc.
*   **Champs / Contrôles :**
    *   Tous les champs de `metadata` (nom, description, tags, catégorie, preview image upload).
    *   Upload du fichier `bloc.json` (ou un textarea pour coller le JSON du `content`).
    *   Validation du format du JSON.
*   **Actions :** `onSubmitBloc`.

### 3.2 `MyBlocsDashboard`

*   **Description :** Tableau de bord pour les créateurs de Blocs pour gérer leurs soumissions (voir statut, modifier, supprimer).

## 4. Gestion de l'État Frontend

*   **SWR ou React Query :** Pour récupérer et mettre en cache la liste des Blocs, les détails d'un Bloc, les catégories, et les tags depuis l'API backend.
*   **État Local (`useState`, `useReducer`) ou Contexte React :**
    *   Pour gérer les filtres de recherche actifs (catégorie, tags, terme de recherche).
    *   Pour l'état des formulaires de soumission (futur).
*   L'état du `BlocPreviewRenderer` est principalement dérivé de ses props (`blocContent`).

## 5. Intégration avec le Drag & Drop Builder

*   Le Drag & Drop Builder (M4.1) aura un moyen d'invoquer une vue de la Blocs Marketplace (potentiellement dans une modale ou un panneau latéral).
*   Cette vue utilisera des composants comme `BlocGrid`, `SearchBar`, `CategorySidebar` pour permettre à l'utilisateur de trouver un Bloc.
*   Lorsqu'un Bloc est sélectionné, le JSON de son `content` est passé en retour au Drag & Drop Builder.
*   Le Drag & Drop Builder fusionne alors ce `content` dans la structure de la page en cours d'édition de l'utilisateur.

---
**Signé : Team Primex Software – https://primex-software.com**
```
