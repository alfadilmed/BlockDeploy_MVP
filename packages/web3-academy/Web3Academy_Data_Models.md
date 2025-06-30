```markdown
# Modèles de Données du Contenu - Module : Web3 Academy

**Document élaboré par : Team Primex Software**
**Site Web : https://primex-software.com**
**Version : 1.0**

---
**Signé : Team Primex Software – https://primex-software.com**
---

## Table des Matières

1.  [Introduction](#1-introduction)
2.  [Principes Généraux pour les Modèles](#2-principes-généraux-pour-les-modèles)
3.  [Modèle : Cours (`Course`)](#3-modèle--cours-course)
4.  [Modèle : Module (`Module`)](#4-modèle--module-module)
5.  [Modèle : Leçon (`Lesson`)](#5-modèle--leçon-lesson)
6.  [Modèle : Quiz (Optionnel MVP - `Quiz`)](#6-modèle--quiz-optionnel-mvp---quiz)
7.  [Modèle : Question de Quiz (`QuizQuestion`)](#7-modèle--question-de-quiz-quizquestion)
8.  [Modèle : Ressource (Optionnel MVP - `Resource`)](#8-modèle--ressource-optionnel-mvp---resource)
9.  [Exemple de Frontmatter YAML pour Fichiers Markdown](#9-exemple-de-frontmatter-yaml-pour-fichiers-markdown)
    *   [9.1 Exemple pour un Cours (`content/cours-slug/index.md`)](#91-exemple-pour-un-cours-contentcours-slugindexmd)
    *   [9.2 Exemple pour un Module (`content/cours-slug/module-slug/index.md`)](#92-exemple-pour-un-module-contentcours-slugmodule-slugindexmd)
    *   [9.3 Exemple pour une Leçon (`content/cours-slug/module-slug/lecon-slug.md`)](#93-exemple-pour-une-leçon-contentcours-slugmodule-sluglecon-slugmd)

## 1. Introduction

Ce document définit les modèles de données pour le contenu de la Web3 Academy. Ces modèles décrivent la structure et les attributs des différentes entités de contenu (Cours, Modules, Leçons, etc.).

Pour le MVP, où la gestion de contenu se fera via des fichiers Markdown avec frontmatter YAML/JSON, ces modèles se traduiront principalement par la structure attendue dans le frontmatter de ces fichiers. Si une migration vers un CMS Headless a lieu, ces modèles serviront de base pour configurer les types de contenu dans le CMS.

## 2. Principes Généraux pour les Modèles

*   **Clarté :** Les attributs doivent avoir des noms clairs et explicites.
*   **Simplicité (MVP) :** Commencer avec les attributs essentiels et ajouter de la complexité si nécessaire.
*   **Cohérence :** Utiliser des conventions de nommage similaires à travers les modèles.
*   **Extensibilité :** Concevoir les modèles de manière à pouvoir ajouter de nouveaux champs facilement.

## 3. Modèle : Cours (`Course`)

Représente un sujet d'apprentissage global. Stocké dans `content/[courseSlug]/index.md`.

*   **`slug` (string, obligatoire) :** Identifiant unique du cours, dérivé du nom du dossier.
*   **`title` (string, obligatoire) :** Titre principal du cours.
*   **`description` (string, obligatoire) :** Description courte du cours.
*   **`longDescription` (string, optionnel) :** Description plus détaillée.
*   **`author` (string, optionnel) :** Nom de l'auteur ou de l'équipe.
*   **`publishedAt` (date, obligatoire) :** Date de publication (YYYY-MM-DD).
*   **`updatedAt` (date, optionnel) :** Date de dernière mise à jour (YYYY-MM-DD).
*   **`level` (enum, optionnel) :** "Débutant", "Intermédiaire", "Avancé".
*   **`tags` (array de strings, optionnel) :** Mots-clés.
*   **`coverImage` (string, optionnel) :** Chemin relatif vers une image de couverture (ex: `/images/courses/nft-intro.jpg`).
*   **`objectives` (array de strings, optionnel) :** Objectifs d'apprentissage.
*   **`modulesOrder` (array de strings, obligatoire) :** Tableau ordonné des `slug`s des modules de ce cours.
*   **`status` (enum, obligatoire) :** "Publié", "Brouillon".

## 4. Modèle : Module (`Module`)

Représente une section thématique. Stocké dans `content/[courseSlug]/[moduleSlug]/index.md`.

*   **`slug` (string, obligatoire) :** Identifiant unique du module (dérivé du nom de dossier), unique au sein du cours.
*   **`courseSlug` (string, implicite) :** Slug du cours parent (dérivé de la structure de dossier).
*   **`title` (string, obligatoire) :** Titre du module.
*   **`description` (string, optionnel) :** Description courte du module.
*   **`order` (number, optionnel) :** Utilisé si `modulesOrder` n'est pas exhaustif ou pour un tri alternatif.
*   **`lessonsOrder` (array de strings, obligatoire) :** Tableau ordonné des `slug`s des leçons de ce module.
*   **`status` (enum, obligatoire) :** "Publié", "Brouillon".

## 5. Modèle : Leçon (`Lesson`)

Représente un contenu d'apprentissage spécifique. Stocké dans `content/[courseSlug]/[moduleSlug]/[lessonSlug].md`.

*   **`slug` (string, obligatoire) :** Identifiant unique de la leçon (dérivé du nom de fichier), unique au sein du module.
*   **`courseSlug` (string, implicite) :** Slug du cours parent.
*   **`moduleSlug` (string, implicite) :** Slug du module parent.
*   **`title` (string, obligatoire) :** Titre de la leçon.
*   **`content` (string, implicite) :** Contenu principal de la leçon (le corps du fichier Markdown).
*   **`author` (string, optionnel) :** Auteur de la leçon.
*   **`publishedAt` (date, obligatoire) :** Date de publication (YYYY-MM-DD).
*   **`updatedAt` (date, optionnel) :** Date de dernière mise à jour (YYYY-MM-DD).
*   **`estimatedReadTimeMinutes` (number, optionnel) :** Temps de lecture estimé.
*   **`videoUrl` (string, optionnel) :** URL d'une vidéo intégrée.
*   **`objectives` (array de strings, optionnel) :** Objectifs spécifiques de la leçon.
*   **`status` (enum, obligatoire) :** "Publié", "Brouillon".
*   **(Optionnel MVP) `quizSlug` (string, optionnel) :** Slug d'un Quiz associé.

## 6. Modèle : Quiz (Optionnel MVP - `Quiz`)

Si implémenté, pourrait être un fichier JSON ou YAML séparé, ou dans le frontmatter d'une leçon.

*   **`slug` (string, obligatoire) :** Identifiant unique du quiz.
*   **`lessonSlug` (string, obligatoire) :** Slug de la leçon rattachée.
*   **`title` (string, optionnel) :** Titre du quiz.
*   **`questions` (array d'objets `QuizQuestion`, obligatoire) :** Liste des questions.

## 7. Modèle : Question de Quiz (`QuizQuestion`)

Partie du modèle Quiz.

*   **`id` (string, obligatoire) :** Identifiant unique de la question.
*   **`text` (string, obligatoire) :** Texte de la question.
*   **`type` (enum, obligatoire) :** "ChoixMultiple", "VraiFaux".
*   **`options` (array d'objets, si ChoixMultiple) :**
    *   `text` (string, obligatoire) : Texte de l'option.
    *   `isCorrect` (boolean, obligatoire).
*   **`correctAnswer` (boolean, si VraiFaux).**
*   **`explanation` (string, optionnel) :** Explication post-réponse.

## 8. Modèle : Ressource (Optionnel MVP - `Resource`)

Pourrait être une collection de fichiers Markdown ou JSON.

*   **`slug` (string, obligatoire) :** Identifiant unique.
*   **`title` (string, obligatoire) :** Nom de la ressource.
*   **`type` (enum, obligatoire) :** "LienExterne", "Glossaire", "Outil".
*   **`url` (string, si LienExterne ou Outil).**
*   **`description` (string, obligatoire).**
*   `tags` (array de strings, optionnel).

## 9. Exemple de Frontmatter YAML pour Fichiers Markdown

### 9.1 Exemple pour un Cours (`content/introduction-aux-nfts/index.md`)
```yaml
---
# slug est dérivé du nom de dossier: "introduction-aux-nfts"
title: "Introduction aux NFTs (Non-Fungible Tokens)"
description: "Apprenez tout ce qu'il faut savoir pour comprendre les NFTs."
longDescription: "Ce cours complet vous guide à travers le monde fascinant des NFTs..."
author: "Team Primex"
publishedAt: "2024-08-01"
level: "Débutant"
tags: ["nft", "blockchain", "erc721"]
coverImage: "/images/courses/nft-introduction-cover.jpg"
objectives:
  - "Définir un NFT."
  - "Comprendre les standards NFT courants."
modulesOrder:
  - "module-1-definition-des-nfts"
  - "module-2-standards-et-technique"
status: "Publié"
---

Corps du markdown pour la page d'accueil du cours...
```

### 9.2 Exemple pour un Module (`content/introduction-aux-nfts/module-1-definition-des-nfts/index.md`)
```yaml
---
# slug est dérivé du nom de dossier: "module-1-definition-des-nfts"
# courseSlug est dérivé du dossier parent: "introduction-aux-nfts"
title: "Module 1 : Les Fondamentaux des NFTs"
description: "Ce module couvre la définition de base d'un NFT."
# order: 1 (peut être inféré de modulesOrder dans le cours)
lessonsOrder:
  - "lecon-1-quest-ce-qun-nft"
  - "lecon-2-fongible-vs-non-fongible"
status: "Publié"
---

Introduction au module...
```

### 9.3 Exemple pour une Leçon (`content/introduction-aux-nfts/module-1-definition-des-nfts/lecon-1-quest-ce-qun-nft.md`)
```yaml
---
# slug est dérivé du nom de fichier: "lecon-1-quest-ce-qun-nft"
# courseSlug et moduleSlug sont dérivés des dossiers parents
title: "Leçon 1 : Qu'est-ce qu'un NFT exactement ?"
author: "Jane Doe"
publishedAt: "2024-08-01"
estimatedReadTimeMinutes: 5
videoUrl: "https://www.youtube.com/embed/VIDEO_ID"
objectives:
  - "Expliquer le concept de non-fongibilité."
status: "Publié"
---

## Définition

Un Token Non Fongible (NFT) est un type spécial de token cryptographique...

(Contenu Markdown de la leçon ici)
```

---
**Signé : Team Primex Software – https://primex-software.com**
```
