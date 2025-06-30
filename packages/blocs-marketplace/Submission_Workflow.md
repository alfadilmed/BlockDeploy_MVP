```markdown
# Workflow de Soumission des Blocs - Module : Blocs Marketplace

**Document élaboré par : Team Primex Software**
**Site Web : https://primex-software.com**
**Version : 1.0**

---
**Signé : Team Primex Software – https://primex-software.com**
---

## Table des Matières

1.  [Introduction](#1-introduction)
2.  [Objectifs du Workflow de Soumission](#2-objectifs-du-workflow-de-soumission)
3.  [Prérequis pour les Soumissionnaires](#3-prérequis-pour-les-soumissionnaires)
4.  [Étapes du Workflow de Soumission](#4-étapes-du-workflow-de-soumission)
    *   [Étape 1 : Création et Préparation du Bloc](#étape-1--création-et-préparation-du-bloc)
    *   [Étape 2 : Soumission du Bloc via la Plateforme BlockDeploy](#étape-2--soumission-du-bloc-via-la-plateforme-blockdeploy)
    *   [Étape 3 : Revue et Validation par l'Équipe Primex (MVP)](#étape-3--revue-et-validation-par-léquipe-primex-mvp)
    *   [Étape 4 : Publication du Bloc](#étape-4--publication-du-bloc)
    *   [Étape 5 : Gestion Post-Publication (Mises à jour, Retrait - Futur)](#étape-5--gestion-post-publication-mises-à-jour-retrait---futur)
5.  [Critères de Validation (MVP Initial)](#5-critères-de-validation-mvp-initial)
6.  [Communication avec le Soumissionnaire](#6-communication-avec-le-soumissionnaire)
7.  [Considérations Futures](#7-considérations-futures)

## 1. Introduction

Ce document décrit le processus (workflow) par lequel un développeur ou designer tiers ("Soumissionnaire") peut soumettre un "Bloc" réutilisable à la Blocs Marketplace de BlockDeploy. Pour le MVP, ce processus impliquera une revue manuelle par l'équipe Primex Software.

## 2. Objectifs du Workflow de Soumission

*   **Qualité :** S'assurer que les Blocs publiés sont de bonne qualité, fonctionnels et sécurisés.
*   **Cohérence :** Garantir que les Blocs respectent le format défini (`Bloc_Definition_Format.md`).
*   **Clarté :** Fournir un processus clair et compréhensible pour les soumissionnaires.
*   **Sécurité :** Éviter la publication de Blocs malveillants ou de mauvaise qualité qui pourraient nuire aux utilisateurs du Drag & Drop Builder.

## 3. Prérequis pour les Soumissionnaires

*   Avoir un compte utilisateur sur la plateforme BlockDeploy (pour authentification et suivi des soumissions - futur). Pour le MVP de soumission interne, cette étape est gérée par l'équipe Primex.
*   Avoir lu et compris le guide `Create_Your_Block.md` et le `Bloc_Definition_Format.md`.
*   Avoir testé son Bloc, idéalement en l'important localement dans une instance du Drag & Drop Builder (si un tel outil de test local est fourni ou si le format est simple à simuler).

## 4. Étapes du Workflow de Soumission

### Étape 1 : Création et Préparation du Bloc

1.  **Conception du Bloc :** Le soumissionnaire conçoit un ensemble de composants et de configurations qu'il souhaite packager en tant que Bloc.
2.  **Création du Fichier `bloc.json` :** Le soumissionnaire crée le fichier JSON principal de son Bloc, en respectant scrupuleusement le `Bloc_Definition_Format.md`. Cela inclut :
    *   `blocApiVersion`
    *   `metadata` (id unique, nom, version, auteur, description, tags, catégorie, previewImageUrl, etc.)
    *   `content` (la structure JSON des composants du Bloc, compatible avec `Schema_Export_Design.md`)
3.  **Préparation de l'Image de Prévisualisation :** Le soumissionnaire crée une image de prévisualisation claire et représentative de son Bloc (respectant des dimensions et un format spécifiés par Primex). L'URL de cette image sera incluse dans `metadata.previewImageUrl`. Pour le MVP, cette image pourrait être uploadée séparément lors de la soumission.
4.  **Tests Locaux (Recommandé) :** Le soumissionnaire teste son Bloc pour s'assurer qu'il se rend correctement et que les fonctionnalités (notamment Web3) sont opérationnelles.

### Étape 2 : Soumission du Bloc via la Plateforme BlockDeploy

1.  **Accès au Formulaire de Soumission :**
    *   L'utilisateur (authentifié sur BlockDeploy) navigue vers la section "Blocs Marketplace" > "Soumettre un Bloc".
    *   Pour le MVP de soumission interne, cette interface sera réservée aux administrateurs Primex.
2.  **Remplissage du Formulaire (`BlocSubmissionForm`) :**
    *   La plupart des champs de `metadata` (nom, description, tags, catégorie, etc.) sont saisis dans le formulaire.
    *   Le soumissionnaire uploade son fichier `bloc.json` (ou colle le contenu JSON de la section `content` si les métadonnées sont saisies via le formulaire).
    *   Le soumissionnaire uploade l'image de prévisualisation (ou fournit une URL publique).
    *   Sélection du type de licence (Gratuit MIT, Payant - simulé pour MVP). Si "Payant", un champ de prix indicatif peut être présent.
3.  **Validation Côté Client :** Le formulaire effectue des validations de base (champs requis, format de l'URL de l'image, structure JSON du `bloc.json` si uploadé).
4.  **Envoi de la Soumission :**
    *   Le frontend envoie les données au backend via l'API `POST /api/v1/blocs-marketplace/blocs` (ou un endpoint spécifique pour les soumissions en attente).
    *   Le statut initial du Bloc soumis est "En attente de validation" (`PendingReview`).

### Étape 3 : Revue et Validation par l'Équipe Primex (MVP)

1.  **Notification à l'Équipe Primex :** Le système backend notifie l'équipe d'administration de BlockDeploy d'une nouvelle soumission de Bloc.
2.  **Accès à l'Interface de Modération :** Les administrateurs Primex accèdent à une interface listant les Blocs en attente de validation.
3.  **Examen du Bloc :** L'équipe Primex examine :
    *   **Conformité au Format :** Le `bloc.json` est-il valide par rapport au `Bloc_Definition_Format.md` ?
    *   **Qualité et Utilité :** Le Bloc est-il bien conçu, utile, et apporte-t-il une valeur ajoutée ?
    *   **Sécurité :** Le Bloc ne contient-il pas de code ou de configurations manifestement malveillantes ou dangereuses (surtout pour les Blocs avec des interactions Web3) ? Cette vérification est manuelle et basée sur l'expertise.
    *   **Prévisualisation :** L'image de preview est-elle correcte et de bonne qualité ?
    *   **Métadonnées :** Le nom, la description, les tags sont-ils clairs et appropriés ?
    *   **Test (Optionnel mais recommandé) :** L'équipe Primex peut tenter d'importer le Bloc dans une instance de test du Drag & Drop Builder.
4.  **Décision de Validation :**
    *   **Approuvé :** Si le Bloc est conforme, l'administrateur change son statut à "Approuvé" (`Approved`).
    *   **Rejeté :** Si le Bloc pose problème, l'administrateur change son statut à "Rejeté" (`Rejected`) et fournit un motif de rejet.

### Étape 4 : Publication du Bloc

1.  **Blocs Approuvés :** Une fois qu'un Bloc est "Approuvé", il devient visible publiquement sur la Blocs Marketplace.
2.  **Indexation :** Le backend s'assure que le nouveau Bloc est correctement indexé pour la recherche et le filtrage.

### Étape 5 : Gestion Post-Publication (Mises à jour, Retrait - Futur)

*   **Mises à Jour :** Les soumissionnaires pourront soumettre de nouvelles versions de leurs Blocs. Un processus de validation similaire s'appliquera.
*   **Retrait :** Les soumissionnaires pourront demander le retrait de leurs Blocs, ou l'équipe Primex pourra dépublier des Blocs obsolètes ou problématiques.

## 5. Critères de Validation (MVP Initial)

Pour le MVP, les critères de validation par l'équipe Primex seront axés sur :
*   **Fonctionnalité de base :** Le Bloc s'importe-t-il et se rend-il correctement (visuellement) ?
*   **Clarté des métadonnées.**
*   **Absence de contenu manifestement inapproprié ou malveillant.**
*   **Respect du format JSON défini.**
*   **Utilité générale pour les utilisateurs de BlockDeploy.**

## 6. Communication avec le Soumissionnaire

*   **MVP :** Étant donné que les soumissions sont internes ou gérées manuellement pour commencer, la communication sera directe.
*   **Futur (pour soumissions externes) :**
    *   Emails de notification (Soumission reçue, Approuvé, Rejeté avec motif).
    *   Tableau de bord pour le soumissionnaire pour suivre le statut de ses Blocs.

## 7. Considérations Futures

*   **Validation Automatisée :** Scripts pour valider automatiquement la structure JSON, la taille des images, etc.
*   **Sandbox de Test :** Un environnement où les soumissionnaires peuvent tester leurs Blocs avant de les soumettre formellement.
*   **Système de Feedback Détaillé :** Pour les rejets, fournir des indications précises au soumissionnaire.
*   **Niveaux de Validation :** Différents niveaux de "badge" pour les Blocs (ex: "Validé par la Communauté", "Certifié Primex").

---
**Signé : Team Primex Software – https://primex-software.com**
```
