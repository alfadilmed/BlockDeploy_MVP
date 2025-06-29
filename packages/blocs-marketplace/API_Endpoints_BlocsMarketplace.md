```markdown
# API Endpoints - Module : Blocs Marketplace

**Document élaboré par : Team Primex Software**
**Site Web : https://primex-software.com**
**Version : 1.0**

---
**Signé : Team Primex Software – https://primex-software.com**
---

## Table des Matières

1.  [Introduction](#1-introduction)
2.  [Principes Généraux](#2-principes-généraux)
3.  [Endpoints API (MVP Structure & Soumission Interne)](#3-endpoints-api-mvp-structure--soumission-interne)
    *   [3.1 Gestion des Blocs (Admin/Interne pour MVP)](#31-gestion-des-blocs-admininterne-pour-mvp)
        *   [3.1.1 `POST /api/v1/blocs-marketplace/blocs`](#311-post-apiv1blocs-marketplaceblocs)
    *   [3.2 Consultation des Blocs (Public)](#32-consultation-des-blocs-public)
        *   [3.2.1 `GET /api/v1/blocs-marketplace/blocs`](#321-get-apiv1blocs-marketplaceblocs)
        *   [3.2.2 `GET /api/v1/blocs-marketplace/blocs/{blocId}`](#322-get-apiv1blocs-marketplaceblocsblocid)
    *   [3.3 Catégories et Tags (Optionnel MVP)](#33-catégories-et-tags-optionnel-mvp)
        *   [3.3.1 `GET /api/v1/blocs-marketplace/categories`](#331-get-apiv1blocs-marketplacecategories)
        *   [3.3.2 `GET /api/v1/blocs-marketplace/tags`](#332-get-apiv1blocs-marketplacetags)
4.  [Authentification et Autorisation](#4-authentification-et-autorisation)
5.  [Gestion des Erreurs](#5-gestion-des-erreurs)
6.  [Considérations Futures](#6-considérations-futures)

## 1. Introduction

Ce document décrit les points d'API (API endpoints) exposés par le backend du module Blocs Marketplace. Pour le MVP (axé sur la structure et la soumission interne), ces API se concentreront sur la capacité de l'équipe Primex à ajouter des Blocs et sur la capacité des utilisateurs (via le Drag & Drop Builder ou une interface de marketplace) à les consulter.

## 2. Principes Généraux

*   **Format :** JSON pour requêtes/réponses.
*   **Verbes HTTP :** POST pour création, GET pour lecture.
*   **Statuts HTTP :** Sémantiques (200, 201, 400, 404, 500).
*   **Versioning :** `/v1/`.
*   **Préfixe :** `/api/v1/blocs-marketplace/`.

## 3. Endpoints API (MVP Structure & Soumission Interne)

### 3.1 Gestion des Blocs (Admin/Interne pour MVP)

#### 3.1.1 `POST /api/v1/blocs-marketplace/blocs`

*   **Description :**
    Permet à un administrateur (ou à un service interne) de soumettre un nouveau Bloc à la marketplace. Le payload de la requête sera le JSON complet du Bloc, tel que défini dans `Bloc_Definition_Format.md`.
*   **Méthode :** `POST`
*   **Chemin :** `/api/v1/blocs-marketplace/blocs`
*   **Authentification :** Requise (Admin BlockDeploy).
*   **Payload de la Requête (JSON) :**
    ```json
    // Contenu complet du fichier bloc.json (voir Bloc_Definition_Format.md)
    {
      "blocApiVersion": "1.0",
      "metadata": {
        "id": "primex-hero-banner-v1", // Doit être unique
        "name": "Bannière Héroïque Dynamique",
        "version": "1.0.0",
        "author": "Primex Software Internal Team",
        // ... autres métadonnées
        "previewImageUrl": "https://example.com/preview.png"
      },
      "content": {
        // ... structure ComponentNode racine du bloc ...
      }
    }
    ```
*   **Réponse de Succès (201 Created) (JSON) :**
    ```json
    {
      "message": "Bloc submitted successfully.",
      "blocId": "primex-hero-banner-v1", // L'ID unique du bloc soumis/créé
      "marketplaceEntryId": "internal_db_uuid_12345" // ID de l'entrée en base de données
    }
    ```
*   **Réponses d'Erreur :**
    *   `400 Bad Request`: Si le format du Bloc est invalide, si des champs requis manquent, ou si l'ID du bloc existe déjà.
    *   `401 Unauthorized / 403 Forbidden`: Si l'utilisateur n'est pas un admin.
    *   `500 Internal Server Error`: Erreur serveur.

### 3.2 Consultation des Blocs (Public)

#### 3.2.1 `GET /api/v1/blocs-marketplace/blocs`

*   **Description :**
    Récupère une liste paginée des Blocs disponibles sur la marketplace. Permet des filtres basiques.
*   **Méthode :** `GET`
*   **Chemin :** `/api/v1/blocs-marketplace/blocs`
*   **Authentification :** Optionnelle ou via une clé API publique de BlockDeploy.
*   **Query Params (Optionnels) :**
    *   `page` (number, défaut: 1)
    *   `limit` (number, défaut: 10, max: 50)
    *   `sortBy` (string, ex: `createdAt`, `name`, `popularity` - futur. Défaut: `createdAt`)
    *   `sortOrder` (string, `asc` ou `desc`. Défaut: `desc`)
    *   `category` (string, ex: "Layout/Sections")
    *   `tags` (string, tags séparés par des virgules, ex: "hero,cta")
    *   `author` (string)
*   **Réponse de Succès (200 OK) (JSON) :**
    ```json
    {
      "blocs": [ // Tableau d'objets Blocs (seulement les métadonnées pour la liste)
        {
          "id": "primex-hero-banner-v1",
          "name": "Bannière Héroïque Dynamique",
          "version": "1.0.0",
          "author": "Primex Software Internal Team",
          "description": "Une section d'accueil impactante...",
          "tags": ["hero", "cta"],
          "category": "Layout/Sections",
          "previewImageUrl": "https://example.com/preview.png",
          "lastModifiedAt": "2024-07-28T15:10:00Z"
        }
        // ... autres blocs
      ],
      "pagination": {
        "currentPage": 1,
        "totalPages": 5,
        "totalBlocs": 48,
        "limit": 10
      }
    }
    ```

#### 3.2.2 `GET /api/v1/blocs-marketplace/blocs/{blocId}`

*   **Description :**
    Récupère les détails complets d'un Bloc spécifique, y compris sa section `content` (la structure JSON des composants). L'`{blocId}` est l'identifiant unique du bloc (ex: `primex-hero-banner-v1`).
*   **Méthode :** `GET`
*   **Chemin :** `/api/v1/blocs-marketplace/blocs/{blocId}`
*   **Authentification :** Optionnelle ou via une clé API publique de BlockDeploy.
*   **Réponse de Succès (200 OK) (JSON) :**
    ```json
    // Contenu complet du fichier bloc.json pour le {blocId} demandé
    {
      "blocApiVersion": "1.0",
      "metadata": {
        "id": "primex-hero-banner-v1",
        "name": "Bannière Héroïque Dynamique",
        // ... toutes les métadonnées ...
      },
      "content": {
        // ... la structure ComponentNode complète du bloc ...
      }
    }
    ```
*   **Réponses d'Erreur :**
    *   `404 Not Found`: Si aucun Bloc avec cet `blocId` n'est trouvé.

### 3.3 Catégories et Tags (Optionnel MVP)

Pour aider à la navigation et au filtrage, des endpoints pour lister les catégories et tags existants peuvent être utiles.

#### 3.3.1 `GET /api/v1/blocs-marketplace/categories`

*   **Description :** Récupère une liste de toutes les catégories de Blocs utilisées.
*   **Réponse de Succès (200 OK) (JSON) :**
    ```json
    {
      "categories": ["Layout/Sections", "Marketing/CTA", "Web3/Interactions", "Forms"]
    }
    ```

#### 3.3.2 `GET /api/v1/blocs-marketplace/tags`

*   **Description :** Récupère une liste de tous les tags utilisés, potentiellement avec leur fréquence.
*   **Réponse de Succès (200 OK) (JSON) :**
    ```json
    {
      "tags": [
        { "name": "hero", "count": 15 },
        { "name": "cta", "count": 22 },
        { "name": "web3", "count": 10 }
      ]
    }
    ```

## 4. Authentification et Autorisation

*   **`POST /blocs` :** Requiert une authentification d'administrateur BlockDeploy. Les permissions exactes seront définies via un système de rôles interne.
*   **`GET /blocs`, `GET /blocs/{blocId}`, `GET /categories`, `GET /tags` :** Peuvent être publics ou nécessiter une clé API BlockDeploy standard (non-admin) pour limiter les abus et tracer l'utilisation. Pour un MVP axé sur l'intégration avec le D&D Builder, ils pourraient être publics dans un premier temps au sein de l'écosystème BlockDeploy.

## 5. Gestion des Erreurs

*   Validation des données pour la soumission de Blocs (conformité au `Bloc_Definition_Format.md`).
*   Codes HTTP et messages d'erreur clairs.

## 6. Considérations Futures

*   **`PUT /api/v1/blocs-marketplace/blocs/{blocId}` :** Pour mettre à jour un Bloc existant (admin ou auteur du Bloc).
*   **`DELETE /api/v1/blocs-marketplace/blocs/{blocId}` :** Pour supprimer un Bloc (admin ou auteur).
*   **Endpoints pour la soumission par des tiers :** Incluant la gestion du statut (en attente de revue, approuvé, rejeté).
*   **Endpoints pour les notations et commentaires.**
*   **Endpoints pour la gestion des Blocs payants et des transactions.**
*   **Recherche Full-Text :** `GET /api/v1/blocs-marketplace/search?query=...`
*   **Statistiques :** `GET /api/v1/blocs-marketplace/blocs/{blocId}/stats` (nombre de vues, d'utilisations).

---
**Signé : Team Primex Software – https://primex-software.com**
```
