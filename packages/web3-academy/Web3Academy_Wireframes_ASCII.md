```markdown
# Wireframes ASCII - Module : Web3 Academy

**Document élaboré par : Team Primex Software**
**Site Web : https://primex-software.com**
**Version : 1.0**

---
**Signé : Team Primex Software – https://primex-software.com**
---

## Table des Matières

1.  [Introduction](#1-introduction)
2.  [Wireframe : Page d'Accueil de la Web3 Academy](#2-wireframe--page-daccueil-de-la-web3-academy)
3.  [Wireframe : Page de Détail d'un Cours](#3-wireframe--page-de-détail-dun-cours)
4.  [Wireframe : Vue d'une Leçon](#4-wireframe--vue-dune-leçon)

## 1. Introduction

Ce document présente des wireframes textuels (ASCII) pour les interfaces utilisateur clés du module Web3 Academy. Ces wireframes illustrent la disposition générale des éléments et le flux de navigation pour l'apprenant.

## 2. Wireframe : Page d'Accueil de la Web3 Academy

**URL : `blockdeploy.com/academy`**

```
+------------------------------------------------------------------------------+
| Header BlockDeploy (Logo, Navigation Globale, Profil Utilisateur)            |
+------------------------------------------------------------------------------+
| TopBar Academy: [Titre: "Web3 Academy"] [SearchBar: "Rechercher un cours..."]|
+------------------------------------------------------------------------------+
|                                                                              |
| Section Bannière (Optionnel):                                                |
|   "Développez vos compétences Web3 avec BlockDeploy Academy"                 |
|   [CTA: "Voir tous les cours"]                                               |
|                                                                              |
| Filtres (Optionnel MVP - sur le côté ou en haut):                            |
|   [Filtre par Niveau: Débutant | Intermédiaire | Avancé]                    |
|   [Filtre par Catégorie/Tags: Blockchain | NFT | DeFi | BlockDeploy Tools]   |
|                                                                              |
| Grille/Liste de Cours (`CourseList`):                                        |
|                                                                              |
|   +----------------------------------------------------------------------+   |
|   | [CourseCard 1]                                                       |   |
|   | [Image Couverture]                                                   |   |
|   | Titre: "Introduction à la Blockchain"                                |   |
|   | Desc: "Comprenez les fondations de la technologie blockchain..."     |   |
|   | Niveau: Débutant | Tags: [Blockchain] [Fondamentaux]                |   |
|   | [Bouton: "Commencer ce cours"]                                       |   |
|   +----------------------------------------------------------------------+   |
|                                                                              |
|   +----------------------------------------------------------------------+   |
|   | [CourseCard 2]                                                       |   |
|   | [Image Couverture]                                                   |   |
|   | Titre: "Créer son Token ERC-20 avec BlockDeploy"                     |   |
|   | Desc: "Tutoriel pas-à-pas pour lancer votre propre token..."         |   |
|   | Niveau: Intermédiaire | Tags: [BlockDeploy] [Token] [ERC20]          |   |
|   | [Bouton: "Commencer ce cours"]                                       |   |
|   +----------------------------------------------------------------------+   |
|                                                                              |
|   ... (autres CourseCards) ...                                               |
|                                                                              |
| [Pagination si nombreux cours]                                               |
|                                                                              |
+------------------------------------------------------------------------------+
| Footer BlockDeploy                                                           |
+------------------------------------------------------------------------------+
```

## 3. Wireframe : Page de Détail d'un Cours

**URL : `blockdeploy.com/academy/courses/{courseSlug}`**

```
+------------------------------------------------------------------------------+
| Header BlockDeploy                                                           |
+------------------------------------------------------------------------------+
| Breadcrumbs: [Academy > {{Nom du Cours}}]                                    |
+------------------------------------------------------------------------------+
|                                                                              |
| +-------------------------------------+ +------------------------------------+
| | Colonne Gauche (Info Cours)         | | Colonne Droite (Curriculum)        |
| |                                     | |                                    |
| | [Image Couverture du Cours]         | | Titre du Cours:                    |
| |                                     | |   "{{course.title}}"               |
| | Auteur: {{course.author}}           | |                                    |
| | Niveau: {{course.level}}            | | Description Longue:                |
| | Tags: [tag1] [tag2]                 | |   {{course.longDescription}}       |
| | Dernière MàJ: {{course.updatedAt}}  | |                                    |
| |                                     | | Objectifs d'Apprentissage:         |
| | [UserProgressIndicator (Global)]    | |   - {{objectif 1}}               |
| | [Bouton: "Commencer / Continuer"]   | |   - {{objectif 2}}               |
| |                                     | |                                    |
| |                                     | | Curriculum du Cours:               |
| |                                     | |   +------------------------------+ |
| |                                     | |   | Module 1: {{module1.title}}  | |
| |                                     | |   |  [ModuleAccordion/ListItem]  | |
| |                                     | |   |  - Leçon 1.1 (Lien) [✓]     | |
| |                                     | |   |  - Leçon 1.2 (Lien) [  ]    | |
| |                                     | |   +------------------------------+ |
| |                                     | |   | Module 2: {{module2.title}}  | |
| |                                     | |   |  [ModuleAccordion/ListItem]  | |
| |                                     | |   |  - Leçon 2.1 (Lien) [  ]    | |
| |                                     | |   +------------------------------+ |
| |                                     | |   ...                            | |
| |                                     | |                                    |
+-------------------------------------+ +------------------------------------+
|                                                                              |
+------------------------------------------------------------------------------+
| Footer BlockDeploy                                                           |
+------------------------------------------------------------------------------+
```
*Note : `[✓]` représente une coche pour une leçon complétée (MVP optionnel).*

## 4. Wireframe : Vue d'une Leçon

**URL : `blockdeploy.com/academy/courses/{courseSlug}/{lessonSlug}`**

```
+------------------------------------------------------------------------------+
| Header BlockDeploy                                                           |
+------------------------------------------------------------------------------+
| Breadcrumbs: [Academy > {{Nom Cours}} > {{Nom Module}} > {{Nom Leçon}}]      |
+------------------------------------------------------------------------------+
|                                                                              |
| +-----------------------------------+ +--------------------------------------+
| | Sidebar Navigation Cours (Gauche) | | Contenu Leçon (Centre/Droite)        |
| |                                   | |                                      |
| | Titre du Cours                    | | Titre de la Leçon:                   |
| |   Module 1                        | |   "{{lesson.title}}"                 |
| |    - Leçon 1.1 (active)           | |                                      |
| |    - Leçon 1.2                    | | Auteur: {{lesson.author}}            |
| |   Module 2                        | | Temps estimé: {{lesson.readTime}} min|
| |    - Leçon 2.1                    | |                                      |
| |    - Leçon 2.2                    | | --- Début Contenu Markdown ---       |
| | ... (scrollable) ...              | |                                      |
| |                                   | |   ## Sous-titre de la Leçon        |
| | [UserProgressIndicator (Cours)]   | |                                      |
| |                                   | |   Texte explicatif, paragraphes...   |
| |                                   | |                                      |
| |                                   | |   ![Image d'illustration ALT TEXT](/path/image.jpg) |
| |                                   | |                                      |
| |                                   | |   `Bloc de code exemple`             |
| |                                   | |                                      |
| |                                   | |   [Possible vidéo intégrée Youtube/Vimeo] |
| |                                   | |                                      |
| |                                   | | --- Fin Contenu Markdown ---         |
| |                                   | |                                      |
| |                                   | | (Optionnel MVP)                      |
| |                                   | | +----------------------------------+ |
| |                                   | | | QuizComponent pour cette leçon   | |
| |                                   | | | - Question 1... [Options]        | |
| |                                   | | | [Bouton Valider Quiz]            | |
| |                                   | | +----------------------------------+ |
| |                                   | |                                      |
| |                                   | | +----------------------------------+ |
| |                                   | | | LessonNavigation:                | |
| |                                   | | | [< Leçon Précédente] [Suivante >] | |
| |                                   | | +----------------------------------+ |
| |                                   | |                                      |
| |                                   | | [Bouton "Marquer comme Lu/Terminé"]  |
| |                                   | | (Optionnel MVP)                      |
| +-----------------------------------+ +--------------------------------------+
|                                                                              |
+------------------------------------------------------------------------------+
| Footer BlockDeploy                                                           |
+------------------------------------------------------------------------------+
```

---
**Signé : Team Primex Software – https://primex-software.com**
```
