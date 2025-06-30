```markdown
# Composants Frontend Clés - Module : Web3 Academy

**Document élaboré par : Team Primex Software**
**Site Web : https://primex-software.com**
**Version : 1.0**

---
**Signé : Team Primex Software – https://primex-software.com**
---

## Table des Matières

1.  [Introduction](#1-introduction)
2.  [Composants Principaux (MVP)](#2-composants-principaux-mvp)
    *   [2.1 `AcademyLayout`](#21-academylayout)
    *   [2.2 `CourseCard`](#22-coursecard)
    *   [2.3 `CourseList`](#23-courselist)
    *   [2.4 `CourseDetailView`](#24-coursedetailview)
        *   [2.4.1 `ModuleAccordion` (ou `ModuleListItem`)](#241-moduleaccordion-ou-modulelistitem)
    *   [2.5 `LessonView`](#25-lessonview)
        *   [2.5.1 `LessonContentRenderer`](#251-lessoncontentrenderer)
        *   [2.5.2 `LessonNavigation`](#252-lessonnavigation)
    *   [2.6 `Breadcrumbs`](#26-breadcrumbs)
    *   [2.7 (Optionnel MVP) `QuizComponent`](#27-optionnel-mvp--quizcomponent)
    *   [2.8 (Optionnel MVP) `UserProgressIndicator`](#28-optionnel-mvp--userprogressindicator)
3.  [Gestion de l'État Frontend](#3-gestion-de-létat-frontend)
4.  [Interactions et Récupération de Données](#4-interactions-et-récupération-de-données)

## 1. Introduction

Ce document décrit les principaux composants React (ou équivalent) pour l'interface utilisateur du module Web3 Academy. L'objectif est de créer une expérience d'apprentissage claire, navigable et engageante.

Ces composants seront situés dans `packages/web3-academy/frontend/components/`.

## 2. Composants Principaux (MVP)

### 2.1 `AcademyLayout`

*   **Description :** Layout principal pour toutes les pages de la Web3 Academy.
*   **Contient :**
    *   Header spécifique à l'académie (ou le header global de BlockDeploy) avec titre "Web3 Academy", lien vers la liste des cours, potentiellement une barre de recherche de cours.
    *   Zone de contenu principal pour afficher `CourseList`, `CourseDetailView`, ou `LessonView`.
    *   Footer spécifique à l'académie ou le footer global.
*   **Props :** `children`.

### 2.2 `CourseCard`

*   **Description :** Affiche un aperçu d'un cours dans une liste ou une grille.
*   **Contient :**
    *   Image de couverture du cours (`course.coverImage`).
    *   Titre du cours (`course.title`).
    *   Description courte (`course.description`).
    *   Niveau de difficulté (`course.level`).
    *   Tags (`course.tags`).
    *   (Optionnel MVP) Indicateur de progression si l'utilisateur est connecté.
    *   Lien vers la page du cours (`CourseDetailView`).
*   **Props :** `course` (objet contenant les métadonnées d'un cours).

### 2.3 `CourseList`

*   **Description :** Affiche une liste ou une grille de `CourseCard`.
*   **Contient :** Plusieurs instances de `CourseCard`, potentiellement des filtres par niveau/tags (futur MVP), pagination.
*   **Props :** `courses` (tableau d'objets `course`), `isLoading` (boolean).

### 2.4 `CourseDetailView`

*   **Description :** Page affichant les détails d'un cours sélectionné, y compris son curriculum (modules et leçons).
*   **Contient :**
    *   Titre du cours, description longue, image de couverture.
    *   Objectifs d'apprentissage du cours.
    *   Auteur, date de publication/mise à jour.
    *   Liste des modules du cours, chacun affichant ses leçons (utilisant `ModuleAccordion` ou `ModuleListItem`).
    *   (Optionnel MVP) Indicateur de progression global pour le cours.
    *   Bouton "Commencer le cours" ou "Continuer le cours".
*   **Props :** `courseData` (objet complet du cours avec ses modules et leçons ordonnés).

#### 2.4.1 `ModuleAccordion` (ou `ModuleListItem`)

*   **Description :** Composant utilisé dans `CourseDetailView` pour afficher un module et ses leçons. Peut être un accordéon qui se déplie pour montrer les leçons, ou un simple item de liste.
*   **Contient :**
    *   Titre du module.
    *   Liste des leçons du module (titre de la leçon, lien vers la `LessonView`).
    *   (Optionnel MVP) Indicateur de complétion pour chaque leçon/module.
*   **Props :** `moduleData` (objet module avec sa liste de leçons ordonnées).

### 2.5 `LessonView`

*   **Description :** Affiche le contenu d'une leçon spécifique.
*   **Contient :**
    *   `Breadcrumbs` pour la navigation (ex: Academy > Nom du Cours > Nom du Module > Nom de la Leçon).
    *   Titre de la leçon.
    *   `LessonContentRenderer` pour afficher le contenu principal.
    *   (Optionnel) Intégration vidéo si `lesson.videoUrl` est fourni.
    *   `LessonNavigation` pour aller à la leçon précédente/suivante.
    *   (Optionnel MVP) `QuizComponent` si un quiz est associé.
    *   (Optionnel MVP) Bouton "Marquer comme terminé".
*   **Props :** `lessonData` (objet leçon complet), `navigationPaths` (pour précédent/suivant).

#### 2.5.1 `LessonContentRenderer`

*   **Description :** Responsable du rendu du contenu Markdown (ou autre format) de la leçon en HTML.
*   **Logique :** Utilise `remark`/`rehype` (ou `next-mdx-remote`) pour parser et transformer le Markdown. Gère la coloration syntaxique pour les blocs de code.
*   **Props :** `markdownContent` (string).

#### 2.5.2 `LessonNavigation`

*   **Description :** Affiche des liens/boutons pour naviguer vers la leçon précédente et la leçon suivante au sein du même cours.
*   **Contient :** Bouton "Leçon Précédente", Bouton "Leçon Suivante".
*   **Props :** `previousLesson` (objet {title, slug}), `nextLesson` (objet {title, slug}). Désactivé si pas de leçon précédente/suivante.

### 2.6 `Breadcrumbs`

*   **Description :** Composant de navigation affichant le chemin hiérarchique de la page actuelle.
*   **Contient :** Une série de liens (ex: "Web3 Academy" > "Cours X" > "Module Y" > "Leçon Z").
*   **Props :** `pathSegments` (tableau d'objets `{ label, href }`).

### 2.7 (Optionnel MVP) `QuizComponent`

*   **Description :** Affiche un quiz simple associé à une leçon.
*   **Contient :**
    *   Affichage de la question (`QuizQuestion.text`).
    *   Options de réponse (pour type ChoixMultiple).
    *   Bouton de soumission de réponse.
    *   Feedback (correct/incorrect, explication).
*   **Props :** `quizData` (objet Quiz avec ses questions).

### 2.8 (Optionnel MVP) `UserProgressIndicator`

*   **Description :** Affiche visuellement la progression de l'utilisateur dans un cours ou une leçon.
*   **Contient :** Barre de progression, pourcentage, ou coches.
*   **Logique (MVP simple) :** Pourrait être basé sur les leçons visitées (stockées dans `localStorage`) plutôt qu'un suivi backend complet.
*   **Props :** `totalItems`, `completedItems`.

## 3. Gestion de l'État Frontend

*   **Récupération de Données (SWR/React Query ou `getStaticProps`/`getServerSideProps` de Next.js) :**
    *   Chargement de la liste des cours.
    *   Chargement des détails d'un cours spécifique (incluant ses modules et leçons).
    *   Chargement du contenu d'une leçon.
*   **État Local (`useState`, `useReducer`) :**
    *   Pour les états d'UI (ex: ouverture d'un accordéon de module, état d'un quiz).
*   **Contexte React (React Context API) :**
    *   Potentiellement pour un `AcademyContext` qui pourrait gérer des préférences utilisateur globales pour l'académie ou le suivi de progression simplifié (si fait côté client pour MVP).
*   **`localStorage` (pour progression MVP) :**
    *   Stocker un ensemble de `lessonSlug`s que l'utilisateur a "terminés" (ex: en cliquant sur un bouton "Marquer comme terminé" ou en naviguant jusqu'à la fin).

## 4. Interactions et Récupération de Données

*   **Page d'Accueil de l'Académie (`/academy`) :** Récupère la liste de tous les cours publiés (métadonnées uniquement) et les affiche via `CourseList` et `CourseCard`.
*   **Page de Cours (`/academy/courses/[courseSlug]`) :** Récupère les données complètes du cours spécifié, y compris la liste ordonnée de ses modules et les titres/slugs de leurs leçons. Affiche via `CourseDetailView`.
*   **Page de Leçon (`/academy/courses/[courseSlug]/[lessonSlug]`) :** Récupère le contenu complet de la leçon spécifiée. Affiche via `LessonView`.
*   Si l'approche Markdown est utilisée, la récupération de données se fait via la lecture des fichiers `.md` du système de fichiers au moment de la construction (`getStaticProps`) ou à la demande (`getServerSideProps` si le contenu change souvent, mais SSG est préférable pour la performance).

---
**Signé : Team Primex Software – https://primex-software.com**
```
