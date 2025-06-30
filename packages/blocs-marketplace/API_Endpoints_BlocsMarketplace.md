```markdown
# API Endpoints - Module : Blocs Marketplace

**Document élaboré par : Team Primex Software**
**Site Web : https://primex-software.com**
**Version : 1.1 (Mise à jour pour M5.3)**

---
**Signé : Team Primex Software – https://primex-software.com**
---

## Table des Matières

1.  [Introduction](#1-introduction)
2.  [Principes Généraux](#2-principes-généraux)
3.  [Endpoints API](#3-endpoints-api)
    *   [3.1 Gestion des Blocs (Soumission et Modération)](#31-gestion-des-blocs-soumission-et-modération)
        *   [3.1.1 `POST /api/v1/blocs-marketplace/blocs/submit`](#311-post-apiv1blocs-marketplaceblocssubmit)
        *   [3.1.2 `GET /api/v1/blocs-marketplace/admin/submissions`](#312-get-apiv1blocs-marketplaceadminsubmissions)
        *   [3.1.3 `POST /api/v1/blocs-marketplace/admin/submissions/{submissionId}/approve`](#313-post-apiv1blocs-marketplaceadminsubmissionssubmissionidapprove)
        *   [3.1.4 `POST /api/v1/blocs-marketplace/admin/submissions/{submissionId}/reject`](#314-post-apiv1blocs-marketplaceadminsubmissionssubmissionidreject)
    *   [3.2 Consultation des Blocs (Public)](#32-consultation-des-blocs-public)
        *   [3.2.1 `GET /api/v1/blocs-marketplace/blocs`](#321-get-apiv1blocs-marketplaceblocs)
        *   [3.2.2 `GET /api/v1/blocs-marketplace/blocs/{blocId}`](#322-get-apiv1blocs-marketplaceblocsblocid)
    *   [3.3 Catégories et Tags](#33-catégories-et-tags)
        *   [3.3.1 `GET /api/v1/blocs-marketplace/categories`](#331-get-apiv1blocs-marketplacecategories)
        *   [3.3.2 `GET /api/v1/blocs-marketplace/tags`](#332-get-apiv1blocs-marketplacetags)
    *   [3.4 Acquisition Simulée de Blocs (MVP)](#34-acquisition-simulée-de-blocs-mvp)
        *   [3.4.1 `POST /api/v1/blocs-marketplace/blocs/{blocId}/acquire-mock`](#341-post-apiv1blocs-marketplaceblocsblocidacquire-mock)
        *   [3.4.2 `GET /api/v1/blocs-marketplace/users/me/unlocked-blocs`](#342-get-apiv1blocs-marketplaceusersmeunlocked-blocs)
4.  [Authentification et Autorisation](#4-authentification-et-autorisation)
5.  [Gestion des Erreurs](#5-gestion-des-erreurs)
6.  [Considérations Futures](#6-considérations-futures)

## 1. Introduction

Ce document décrit les points d'API (API endpoints) exposés par le backend du module Blocs Marketplace. Cette version 1.1 (M5.3) étend les API initiales pour inclure la soumission de blocs par des utilisateurs (authentifiés) et un flux de modération simple pour les administrateurs, ainsi qu'une simulation d'acquisition de blocs.

## 2. Principes Généraux

*   **Format :** JSON pour requêtes/réponses.
*   **Verbes HTTP :** POST pour création/action, GET pour lecture, PUT/PATCH pour mise à jour (futur).
*   **Statuts HTTP :** Sémantiques (200, 201, 202, 400, 401, 403, 404, 500).
*   **Versioning :** `/v1/`.
*   **Préfixe :** `/api/v1/blocs-marketplace/`.

## 3. Endpoints API

### 3.1 Gestion des Blocs (Soumission et Modération)

#### 3.1.1 `POST /api/v1/blocs-marketplace/blocs/submit`

*   **Description :**
    Permet à un utilisateur authentifié de soumettre un nouveau Bloc pour revue. Le Bloc est initialement créé avec un statut "PendingReview".
*   **Méthode :** `POST`
*   **Chemin :** `/api/v1/blocs-marketplace/blocs/submit`
*   **Authentification :** Requise (Utilisateur BlockDeploy).
*   **Payload de la Requête (JSON) :**
    ```json
    // Contenu complet du fichier bloc.json (voir Bloc_Definition_Format.md)
    {
      "blocApiVersion": "1.0",
      "metadata": { // L'ID ici peut être suggéré par l'utilisateur mais le backend pourrait le finaliser/préfixer pour unicité.
        "id_suggestion": "user-cool-feature-v1", 
        "name": "Fonctionnalité Cool par Utilisateur",
        "version": "1.0.0",
        // author sera automatiquement l'utilisateur authentifié
        "description": "Description de la fonctionnalité.",
        "tags": ["feature", "cool", "user-submitted"],
        "category": "User/Community",
        "previewImageUrl": "https://example.com/user-preview.png", // Peut être un upload séparé géré par le frontend
        "licenseType": "Free", // ou "PaidUsage"
        "licenseName": "MIT",  // optionnel
        "price": null // ou { "amount": 5, "currency": "USD_MOCK" }
      },
      "content": {
        // ... structure ComponentNode racine du bloc ...
      }
    }
    ```
*   **Réponse de Succès (202 Accepted) (JSON) :**
    ```json
    {
      "message": "Bloc submitted successfully and is pending review.",
      "submissionId": "submission_uuid_98765", // ID de suivi pour cette soumission
      "blocData": { // Les données du bloc tel que reçu, potentiellement avec un ID de bloc temporaire/final
          "id": "user-primex-cool-feature-v1", // ID finalisé par le backend
          "name": "Fonctionnalité Cool par Utilisateur",
          "status": "PendingReview"
      }
    }
    ```
*   **Réponses d'Erreur :** 400, 401.

#### 3.1.2 `GET /api/v1/blocs-marketplace/admin/submissions`

*   **Description :**
    (Admin uniquement) Récupère une liste paginée des Blocs soumis et en attente de validation, ou d'autres statuts.
*   **Méthode :** `GET`
*   **Chemin :** `/api/v1/blocs-marketplace/admin/submissions`
*   **Authentification :** Requise (Admin BlockDeploy).
*   **Query Params (Optionnels) :**
    *   `status` (string, ex: `PendingReview`, `Approved`, `Rejected`. Défaut: `PendingReview`)
    *   `page`, `limit`, `sortBy`, `sortOrder`
*   **Réponse de Succès (200 OK) (JSON) :**
    ```json
    {
      "submissions": [
        {
          "submissionId": "submission_uuid_98765",
          "blocId": "user-primex-cool-feature-v1",
          "blocName": "Fonctionnalité Cool par Utilisateur",
          "authorId": "user_id_abc",
          "submittedAt": "timestamp",
          "status": "PendingReview",
          "previewImageUrl": "..."
        }
      ],
      "pagination": { /* ... */ }
    }
    ```

#### 3.1.3 `POST /api/v1/blocs-marketplace/admin/submissions/{submissionId}/approve`

*   **Description :**
    (Admin uniquement) Approuve une soumission de Bloc. Le statut du Bloc passe à "Approved" et il devient publiquement listable.
*   **Méthode :** `POST`
*   **Chemin :** `/api/v1/blocs-marketplace/admin/submissions/{submissionId}/approve`
*   **Authentification :** Requise (Admin BlockDeploy).
*   **Payload de la Requête (JSON) :** (Optionnel)
    ```json
    {
      "finalBlocId": "primex-community-cool-feature-v1", // L'admin peut ajuster/confirmer l'ID public final
      "notes": "Excellent bloc, bien documenté." // Notes internes
    }
    ```
*   **Réponse de Succès (200 OK) (JSON) :**
    ```json
    {
      "message": "Bloc submission approved and published.",
      "blocId": "primex-community-cool-feature-v1"
    }
    ```
*   **Réponses d'Erreur :** 401/403, 404 (Submission non trouvée).

#### 3.1.4 `POST /api/v1/blocs-marketplace/admin/submissions/{submissionId}/reject`

*   **Description :**
    (Admin uniquement) Rejette une soumission de Bloc. Le statut du Bloc passe à "Rejected".
*   **Méthode :** `POST`
*   **Chemin :** `/api/v1/blocs-marketplace/admin/submissions/{submissionId}/reject`
*   **Authentification :** Requise (Admin BlockDeploy).
*   **Payload de la Requête (JSON) :**
    ```json
    {
      "rejectionReason": "Le format du bloc n'est pas conforme ou la prévisualisation est manquante.", // Obligatoire
      "internalNotes": "Demander au soumissionnaire de revoir X et Y."
    }
    ```
*   **Réponse de Succès (200 OK) (JSON) :**
    ```json
    {
      "message": "Bloc submission rejected.",
      "submissionId": "submission_uuid_98765"
    }
    ```

### 3.2 Consultation des Blocs (Public)

#### 3.2.1 `GET /api/v1/blocs-marketplace/blocs`

*   **Description :**
    Récupère une liste paginée des Blocs **approuvés** et publiquement disponibles.
*   **Méthode :** `GET`
*   **Chemin :** `/api/v1/blocs-marketplace/blocs`
*   **Query Params :** Mêmes que dans la v1.0 (page, limit, sortBy, sortOrder, category, tags, author).
*   **Réponse de Succès (200 OK) (JSON) :**
    Identique à la v1.0, mais ne liste que les blocs avec statut "Approved".

#### 3.2.2 `GET /api/v1/blocs-marketplace/blocs/{blocId}`

*   **Description :**
    Récupère les détails complets d'un Bloc spécifique **approuvé**.
*   **Méthode :** `GET`
*   **Chemin :** `/api/v1/blocs-marketplace/blocs/{blocId}`
*   **Réponse de Succès (200 OK) (JSON) :**
    Identique à la v1.0, mais ne retourne que si le bloc est "Approved".
*   **Réponses d'Erreur :** 404 si non trouvé ou non approuvé.

### 3.3 Catégories et Tags

Les endpoints `GET /categories` et `GET /tags` restent inchangés par rapport à la v1.0 mais ne reflètent que les Blocs approuvés.

### 3.4 Acquisition Simulée de Blocs (MVP)

Ces endpoints sont pour la simulation de "l'acquisition" de blocs payants, sans transaction réelle.

#### 3.4.1 `POST /api/v1/blocs-marketplace/blocs/{blocId}/acquire-mock`

*   **Description :**
    Permet à un utilisateur authentifié de marquer un bloc payant (simulé) comme "acquis". Ceci est une opération mock pour le MVP.
*   **Méthode :** `POST`
*   **Chemin :** `/api/v1/blocs-marketplace/blocs/{blocId}/acquire-mock`
*   **Authentification :** Requise (Utilisateur BlockDeploy).
*   **Réponse de Succès (200 OK) (JSON) :**
    ```json
    {
      "message": "Bloc marked as acquired (mock).",
      "blocId": "{blocId}",
      "userId": "user_id_current"
    }
    ```
*   **Réponses d'Erreur :** 401, 404 (Bloc non trouvé ou non payant).

#### 3.4.2 `GET /api/v1/blocs-marketplace/users/me/unlocked-blocs`

*   **Description :**
    Récupère la liste des IDs de Blocs que l'utilisateur authentifié a "acquis" (via le mock).
*   **Méthode :** `GET`
*   **Chemin :** `/api/v1/blocs-marketplace/users/me/unlocked-blocs`
*   **Authentification :** Requise (Utilisateur BlockDeploy).
*   **Réponse de Succès (200 OK) (JSON) :**
    ```json
    {
      "unlockedBlocIds": ["blocId1-payant", "blocId7-premium"]
    }
    ```

## 4. Authentification et Autorisation

*   **Soumission (`/blocs/submit`) et acquisition mock (`/acquire-mock`, `/unlocked-blocs`) :** Requiert une authentification utilisateur BlockDeploy standard.
*   **Modération (`/admin/*`) :** Requiert une authentification utilisateur avec un rôle "Admin" BlockDeploy.
*   **Consultation publique (`GET /blocs`, `GET /blocs/{id}`, etc.) :** Peut être publique ou nécessiter une clé API de base.

## 5. Gestion des Erreurs

*   Codes HTTP sémantiques.
*   Messages d'erreur clairs en JSON : `{"error": "CodeErreur", "message": "Description de l'erreur"}`.

## 6. Considérations Futures

*   Endpoints pour que les créateurs gèrent leurs propres blocs soumis (éditer, dépublier).
*   Webhooks pour notifier les créateurs du statut de leurs soumissions.
*   Intégration avec un vrai système de paiement et de gestion des licences.
*   API pour les statistiques de Blocs (vues, imports, revenus).

---
**Signé : Team Primex Software – https://primex-software.com**
```
