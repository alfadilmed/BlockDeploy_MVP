```markdown
# Module : Blocs Marketplace (M4.2 - Structure)

**Document élaboré par : Team Primex Software**
**Site Web : https://primex-software.com**
**Version du Module : 0.1.0 (MVP Structure)**

---
**Signé : Team Primex Software – https://primex-software.com**
---

## Table des Matières

1.  [Description et Objectifs](#1-description-et-objectifs)
    *   [1.1 Qu'est-ce qu'un "Bloc" ?](#11-quest-ce-quun-bloc)
    *   [1.2 Cas d'Usage](#12-cas-dusage)
2.  [Fonctionnalités Clés (MVP Structure & Soumission Interne)](#2-fonctionnalités-clés-mvp-structure--soumission-interne)
3.  [Architecture Envisagée](#3-architecture-envisagée)
    *   [3.1 Frontend](#31-frontend)
    *   [3.2 Backend](#32-backend)
    *   [3.3 Interaction avec le Drag & Drop Builder](#33-interaction-avec-le-drag--drop-builder)
4.  [Format d'un Bloc Publiable (Détaillé dans Bloc_Definition_Format.md)](#4-format-dun-bloc-publiable-détaillé-dans-bloc_definition_formatmd)
5.  [Points d'API Backend (Détaillés dans API_Endpoints_BlocsMarketplace.md)](#5-points-dapi-backend-détaillés-dans-api_endpoints_blocsmarketplacemd)
6.  [Composants Frontend Clés (Détaillés dans Frontend_Components_BlocsMarketplace.md)](#6-composants-frontend-clés-détaillés-dans-frontend_components_blocsmarketplacemd)
7.  [Wireframes / Flux UI (Détaillés dans BlocsMarketplace_Wireframes_ASCII.md)](#7-wireframes--flux-ui-détaillés-dans-blocsmarketplace_wireframes_asciimd)
8.  [Technologies Utilisées (Prévision)](#8-technologies-utilisées-prévision)
9.  [Dépendances et Intégrations](#9-dépendances-et-intégrations)
10. [Structure du Module (`packages/blocs-marketplace`)](#10-structure-du-module-packagesblocs-marketplace)
11. [Tests (Stratégie Initiale)](#11-tests-stratégie-initiale)
12. [Considérations Futures (Post-MVP)](#12-considérations-futures-post-mvp)
13. [Contribution](#13-contribution)

## 1. Description et Objectifs

Le module **Blocs Marketplace** de BlockDeploy a pour but de créer un espace où les développeurs et les designers peuvent publier, partager, et potentiellement vendre/acheter des "Blocs" réutilisables. Ces Blocs sont des ensembles de composants pré-configurés, voire des sections de page entières, conçus pour être importés et utilisés dans le Drag & Drop Builder (M4.1).

L'objectif de ce milestone (M4.2) est de définir la **structure** de cette marketplace, les formats de données, les API de base, et les interfaces utilisateur minimales, en se concentrant sur la soumission interne de blocs par l'équipe Primex pour commencer.

### 1.1 Qu'est-ce qu'un "Bloc" ?

Un "Bloc" dans ce contexte est :
*   Une **collection de un ou plusieurs composants** du Drag & Drop Builder.
*   Avec des **propriétés et des styles pré-configurés**.
*   Peut inclure une logique simple ou des configurations Web3 spécifiques (ex: un bloc "Carte de Profil NFT" qui lit les données d'un contrat NFT).
*   Représenté par un **schéma JSON** compatible avec (ou une extension de) `Schema_Export_Design.md` du Drag & Drop Builder.
*   Accompagné de **métadonnées** (nom, description, auteur, tags, image de prévisualisation).

### 1.2 Cas d'Usage

*   **Accélérer la création de pages :** Les utilisateurs du Drag & Drop Builder peuvent importer des Blocs complexes (ex: Hero Section, Grille de Tarifs, Pied de Page) au lieu de les reconstruire à chaque fois.
*   **Partage de bonnes pratiques :** Les designers et développeurs peuvent partager des Blocs bien conçus et optimisés.
*   **Monétisation (Futur) :** Les créateurs de Blocs pourraient vendre leurs créations.
*   **Standardisation :** Proposer des Blocs officiels BlockDeploy pour des cas d'usage Web3 courants.

## 2. Fonctionnalités Clés (MVP Structure & Soumission Interne)

*   **Définition du Format d'un Bloc :** Spécification claire de la structure JSON d'un Bloc et de ses métadonnées (voir `Bloc_Definition_Format.md`).
*   **Backend pour Stocker les Blocs :**
    *   API pour la soumission de nouveaux Blocs (pour MVP, accessible en interne/admin par l'équipe Primex).
    *   API pour lister et récupérer les Blocs disponibles.
*   **Frontend pour Afficher les Blocs :**
    *   Interface simple pour naviguer et visualiser les Blocs disponibles.
    *   Affichage des détails d'un Bloc (preview, description, auteur).
*   **Intégration avec le Drag & Drop Builder (Conceptuelle pour MVP Structure) :**
    *   Le Drag & Drop Builder devra pouvoir, à terme, importer un Bloc depuis la marketplace (ex: via un bouton "Insérer Bloc depuis Marketplace" qui ouvre une modale de sélection). Pour ce milestone, nous documentons où cette intégration se fera.

## 3. Architecture Envisagée

### 3.1 Frontend (`packages/blocs-marketplace/frontend/`)

*   Interface React/Next.js pour afficher la liste des blocs, les détails d'un bloc.
*   (Futur Admin) Interface pour la soumission et la gestion des blocs.
*   Communication avec le backend pour récupérer les données des blocs.

### 3.2 Backend (`packages/blocs-marketplace/backend/`)

*   API RESTful (Node.js/Express ou Fastify) pour gérer les Blocs.
*   Base de données (MongoDB ou PostgreSQL) pour stocker les métadonnées des Blocs et leur structure JSON.
*   (Optionnel MVP) Stockage des assets liés aux Blocs (ex: images de prévisualisation) sur un service de stockage d'objets (AWS S3, Google Cloud Storage) ou CDN.

### 3.3 Interaction avec le Drag & Drop Builder

*   Le Drag & Drop Builder (module M4.1) aura une fonctionnalité (future) pour parcourir la Blocs Marketplace.
*   Lorsqu'un utilisateur choisit un Bloc, le JSON du Bloc est récupéré via l'API de la Blocs Marketplace.
*   Ce JSON est ensuite injecté/fusionné dans la structure de la page en cours d'édition dans le Drag & Drop Builder.

## 4. Format d'un Bloc Publiable (Détaillé dans `Bloc_Definition_Format.md`)

Voir le document `Bloc_Definition_Format.md`.

## 5. Points d'API Backend (Détaillés dans `API_Endpoints_BlocsMarketplace.md`)

Voir le document `API_Endpoints_BlocsMarketplace.md`. Pour le MVP, focus sur la lecture et la soumission interne/admin.

## 6. Composants Frontend Clés (Détaillés dans `Frontend_Components_BlocsMarketplace.md`)

Voir le document `Frontend_Components_BlocsMarketplace.md`.

## 7. Wireframes / Flux UI (Détaillés dans `BlocsMarketplace_Wireframes_ASCII.md`)

Voir le document `BlocsMarketplace_Wireframes_ASCII.md`.

## 8. Technologies Utilisées (Prévision)

*   **Frontend :** React, Next.js, TypeScript, TailwindCSS.
*   **Backend :** Node.js (avec Express/Fastify), TypeScript.
*   **Base de Données :** MongoDB (pour sa flexibilité avec les documents JSON) ou PostgreSQL.
*   **Stockage d'Assets :** AWS S3 ou équivalent (pour images de preview des blocs).

## 9. Dépendances et Intégrations

*   **Interne (BlockDeploy) :**
    *   **Drag & Drop Builder (M4.1) :** La Blocs Marketplace est une source de contenu pour le D&D Builder. La structure des Blocs doit être compatible.
    *   `@blockdeploy/ui-components` (Futur) : Pour les composants UI de la marketplace elle-même.
    *   `@blockdeploy/auth-module` (Futur) : Pour l'authentification des soumissionnaires de Blocs.
*   **Externe :** Aucune dépendance externe majeure spécifique à la marketplace pour la structure MVP, au-delà du stack technique habituel.

## 10. Structure du Module (`packages/blocs-marketplace`)
```
/packages/blocs-marketplace/
|-- /backend/
|   |-- /src/
|   |   |-- /api/                # Routes et contrôleurs API
|   |   |-- /services/         # Logique métier (gestion des blocs, validation)
|   |   |-- /models/           # Modèles de données pour la BDD
|   |   `-- ...
|   `-- package.json
|-- /frontend/
|   |-- /components/           # Composants React (BlocCard, BlocDetailView, etc.)
|   |-- /pages/                # Pages Next.js (liste des blocs, détail d'un bloc)
|   |-- /services/             # Services frontend (appels API backend)
|   `-- package.json
|-- /shared/                   # Types et interfaces (ex: structure d'un Bloc avec métadonnées)
|   `-- package.json
|-- BlocsMarketplace_Module_README.md # Ce fichier
|-- Bloc_Definition_Format.md
|-- API_Endpoints_BlocsMarketplace.md
|-- Frontend_Components_BlocsMarketplace.md
|-- BlocsMarketplace_Wireframes_ASCII.md
`-- package.json
```

## 11. Tests (Stratégie Initiale)

*   **Backend :**
    *   Tests unitaires pour les services de gestion des Blocs.
    *   Tests d'intégration pour les API (création, lecture de Blocs).
    *   Validation du format des Blocs soumis.
*   **Frontend :**
    *   Tests unitaires pour les composants d'affichage des Blocs.
    *   Tests d'intégration pour le flux de navigation et d'affichage des détails d'un Bloc.

## 12. Considérations Futures (Post-MVP)

*   **Soumission par des Tiers :** Processus de revue et de validation pour les Blocs soumis par la communauté.
*   **Système de Notation et Commentaires :** Pour les Blocs.
*   **Blocs Payants :** Intégration de mécanismes de paiement (potentiellement via smart contracts) pour les créateurs de Blocs.
*   **Gestion des Versions des Blocs.**
*   **Catégorisation et Recherche Avancée :** Filtres plus fins, recherche par mot-clé.
*   **Statistiques d'Utilisation des Blocs.**
*   **Licences pour les Blocs.**

## 13. Contribution

*   Suivre les conventions de BlockDeploy.
*   Assurer la compatibilité des Blocs avec le Drag & Drop Builder.
*   Maintenir une documentation claire pour le format des Blocs.

La Blocs Marketplace sera une fonctionnalité intégrée à la plateforme BlockDeploy, accessible via `https://app.blockdeploy.io`.
Pour le développement local, le frontend de la marketplace est généralement lancé conjointement avec le Drag & Drop Builder et la plateforme principale.

---
**Signé : Team Primex Software – https://primex-software.com**
```
