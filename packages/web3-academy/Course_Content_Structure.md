```markdown
# Structure du Contenu des Cours - Module : Web3 Academy

**Document élaboré par : Team Primex Software**
**Site Web : https://primex-software.com**
**Version : 1.0**

---
**Signé : Team Primex Software – https://primex-software.com**
---

## Table des Matières

1.  [Introduction](#1-introduction)
2.  [Philosophie de Contenu](#2-philosophie-de-contenu)
3.  [Structure Générale d'un Cours](#3-structure-générale-dun-cours)
    *   [3.1 Métadonnées d'un Cours (Frontmatter)](#31-métadonnées-dun-cours-frontmatter)
    *   [3.2 Organisation en Modules/Sections](#32-organisation-en-modulessections)
    *   [3.3 Structure d'une Leçon](#33-structure-dune-leçon)
4.  [Types de Contenu de Leçon (MDX)](#4-types-de-contenu-de-leçon-mdx)
    *   [4.1 Texte (Markdown)](#41-texte-markdown)
    *   [4.2 Images](#42-images)
    *   [4.3 Vidéos Embarquées (Embed)](#43-vidéos-embarquées-embed)
    *   [4.4 Blocs de Code](#44-blocs-de-code)
    *   [4.5 Quiz (MVP : format simple)](#45-quiz-mvp--format-simple)
    *   [4.6 Exercices Interactifs (MVP : concept)](#46-exercices-interactifs-mvp--concept)
    *   [4.7 Composants React Personnalisés (via MDX)](#47-composants-react-personnalisés-via-mdx)
5.  [Exemple de Structure de Fichier (MDX)](#5-exemple-de-structure-de-fichier-mdx)
    *   [5.1 Fichier Principal du Cours (`index.mdx`)](#51-fichier-principal-du-cours-indexmdx)
    *   [5.2 Fichier d'une Leçon (`01-lesson-title.mdx`)](#52-fichier-dune-leçon-01-lesson-titlemdx)
6.  [Gestion du Contenu et Versioning](#6-gestion-du-contenu-et-versioning)
7.  [Considérations pour l'Accessibilité](#7-considérations-pour-laccessibilité)

## 1. Introduction

Ce document définit la structure et le format des contenus pédagogiques pour la Web3 Academy de BlockDeploy. L'objectif est d'assurer la cohérence, la maintenabilité et la richesse des supports de cours. Pour le MVP, nous privilégierons MDX (Markdown avec composants React) pour la création de contenu, stocké dans le dépôt Git.

## 2. Philosophie de Contenu

*   **Clarté et Précision :** Expliquer des concepts complexes de manière simple.
*   **Pratique :** Mettre l'accent sur l'application concrète, notamment avec les outils BlockDeploy.
*   **Modulaire :** Organiser le contenu en petites leçons digestes.
*   **Progressif :** Structurer les cours par niveaux de difficulté (Débutant, Intermédiaire, Avancé).
*   **Engageant :** Utiliser divers types de médias et d'interactions.

## 3. Structure Générale d'un Cours

Un cours est une collection de modules (ou sections), qui sont eux-mêmes une collection de leçons.

### 3.1 Métadonnées d'un Cours (Frontmatter)

Chaque cours sera défini par un fichier principal (ex: `index.mdx` dans un dossier dédié au cours) qui contiendra des métadonnées en en-tête (format YAML Frontmatter).

```yaml
---
title: "Introduction au Développement Web3 avec BlockDeploy"
description: "Apprenez les bases du Web3 et découvrez comment BlockDeploy simplifie la création de dApps."
level: "Débutant" # Débutant, Intermédiaire, Avancé
author: "Team Primex Software" # Ou nom de l'auteur spécifique
authorGithub: "primex-software" # Optionnel: lien profil GitHub auteur
lastUpdated: "2024-07-29"
coverImageUrl: "/images/courses/intro-web3-blockdeploy-cover.jpg" # Chemin relatif dans /public
tags: ["web3", "blockchain", "débutant", "blockdeploy", "smart contracts"]
durationEstimate: "2 heures" # Estimation du temps pour compléter le cours
learningObjectives:
  - "Comprendre les concepts fondamentaux du Web3."
  - "Savoir initialiser un projet simple avec BlockDeploy."
  - "Déployer un token ERC-20 en utilisant le Token Creator."
modules: # Ordre des modules/sections dans le cours
  - title: "Module 1: Les Fondamentaux du Web3"
    lessons: # Ordre des leçons dans ce module
      - "01-quest-ce-que-le-web3"
      - "02-blockchain-et-cryptomonnaies"
      - "03-introduction-aux-smart-contracts"
  - title: "Module 2: Découverte de BlockDeploy"
    lessons:
      - "01-presentation-blockdeploy"
      - "02-configurer-son-environnement"
  - title: "Module 3: Tutoriel Pratique - Votre Premier Token ERC-20"
    lessons:
      - "01-utiliser-le-token-creator"
      - "02-parametres-avances"
      - "03-deploiement-et-verification"
---

# {{title}} (Contenu principal de la page d'accueil du cours)

Bienvenue dans ce cours ! {{description}}

## Ce que vous allez apprendre :
<ul>
  {learningObjectives.map(obj => <li>{obj}</li>)}
</ul>

## Modules du cours :
{/* Logique pour lister les modules et leçons avec liens */}
```

### 3.2 Organisation en Modules/Sections

*   Un cours est divisé en modules logiques (ou sections).
*   Chaque module est une collection de leçons.
*   La structure est définie dans les métadonnées du cours (`modules` et `lessons` arrays).

### 3.3 Structure d'une Leçon

Chaque leçon est un fichier MDX séparé (ex: `01-quest-ce-que-le-web3.mdx`).
Elle contient également des métadonnées en frontmatter :

```yaml
---
title: "Qu'est-ce que le Web3 ?"
moduleId: "module-1-fondamentaux" # Pour lier au module parent
lessonId: "01-quest-ce-que-le-web3" # Identifiant unique de la leçon
estimatedReadTime: "10 minutes"
videoUrl: "https://youtube.com/embed/VIDEO_ID_WEB3_INTRO" # Optionnel
quizAvailable: true # booléen, si un quiz est associé à cette leçon
interactiveExercise: "erc20-deploy-exercise" # Optionnel, ID d'un exercice interactif
---

## {{title}}

Contenu principal de la leçon en Markdown/MDX...

<VideoPlayer url={frontmatter.videoUrl} /> {/* Exemple de composant MDX */}

{/* ... autre contenu ... */}

{frontmatter.quizAvailable && <Quiz lessonId={frontmatter.lessonId} />}
{frontmatter.interactiveExercise && <ExerciseLoader exerciseId={frontmatter.interactiveExercise} />}
```

## 4. Types de Contenu de Leçon (MDX)

MDX permet d'utiliser du Markdown standard ainsi que d'importer et d'utiliser des composants React.

### 4.1 Texte (Markdown)

*   Titres (`#`, `##`, etc.)
*   Paragraphes
*   Listes (à puces, numérotées)
*   Emphase (gras, italique)
*   Liens
*   Citations (`>`)
*   Tableaux

### 4.2 Images

*   Syntaxe Markdown standard : `![Texte alternatif](/chemin/vers/image.jpg "Titre image")`
*   Chemins relatifs au dossier `/public` de l'application Next.js.
*   Utilisation d'un composant React `<OptimizedImage src="..." alt="..." />` pour l'optimisation via `next/image` est recommandée.

### 4.3 Vidéos Embarquées (Embed)

*   Utilisation d'un composant React `<VideoPlayer url="URL_VIDEO" />` pour intégrer des lecteurs vidéo (YouTube, Vimeo, etc.) de manière responsive et contrôlée.
    *   Le composant gérera l'iframe et les options du lecteur.

### 4.4 Blocs de Code

*   Syntaxe Markdown pour les blocs de code avec coloration syntaxique :
    ````markdown
    ```javascript
    console.log("Hello, Web3!");
    ```
    ````
*   Support pour Solidity, JavaScript, TypeScript, JSON, Shell, etc.
*   Option "Copier le code" sur les blocs.

### 4.5 Quiz (MVP : format simple)

*   Un quiz peut être défini en JSON/YAML dans les métadonnées de la leçon ou dans un fichier séparé lié.
*   Un composant React `<Quiz data={quizData} />` sera utilisé pour afficher et gérer le quiz.
*   **Structure d'un Quiz (JSON/YAML) :**
    ```yaml
    questions:
      - id: "q1"
        text: "Quelle est la principale caractéristique d'une blockchain ?"
        type: "single-choice" # Ou "multiple-choice", "true-false"
        options:
          - { id: "a", text: "Centralisée" }
          - { id: "b", text: "Décentralisée et immuable" }
          - { id: "c", text: "Modifiable par l'administrateur" }
        correctOptionIds: ["b"]
        explanation: "La décentralisation et l'immuabilité sont des piliers de la blockchain."
      - id: "q2"
        # ... autre question
    ```
*   **Fonctionnalités MVP du composant Quiz :**
    *   Afficher les questions et options.
    *   Permettre la sélection de réponse(s).
    *   Bouton "Valider" ou "Voir les Réponses".
    *   Afficher si la réponse est correcte/incorrecte.
    *   Afficher l'explication.
    *   (Futur) Score et suivi de progression.

### 4.6 Exercices Interactifs (MVP : concept)

*   **Objectif :** Permettre à l'utilisateur d'interagir avec un smart contract sur un réseau de test directement depuis la leçon.
*   **Format :**
    *   Description de l'exercice et des étapes à suivre.
    *   Un composant React `<InteractiveExercise exerciseId="EXERCISE_ID" />` qui pourrait :
        *   Afficher un extrait de code Solidity (lecture seule).
        *   Fournir des champs pour entrer des paramètres pour une fonction de contrat.
        *   Avoir des boutons "Lire depuis le Contrat" ou "Écrire sur le Contrat" qui interagissent avec un contrat de test déployé (via le module WalletConnect et RPC).
        *   Afficher les résultats ou les logs de transaction.
*   **Exemple d'exercice pour "Créer un token ERC-20 avec BlockDeploy" :**
    *   Guider l'utilisateur pour ouvrir le Token Creator dans un autre onglet.
    *   Demander de configurer un token avec des paramètres spécifiques.
    *   Demander de copier l'adresse du contrat déployé sur testnet et de la coller dans un champ de l'exercice.
    *   L'exercice pourrait alors tenter de lire le `name()` et `symbol()` du contrat pour valider.

### 4.7 Composants React Personnalisés (via MDX)

MDX permet d'importer et d'utiliser n'importe quel composant React. Cela ouvre la voie à :
*   Des infobulles personnalisées (`<Tooltip text="...">...</Tooltip>`).
*   Des alertes/messages d'information (`<Callout type="info">...</Callout>`).
*   Des diagrammes interactifs.
*   Des simulateurs simples.

## 5. Exemple de Structure de Fichier (MDX)

### 5.1 Fichier Principal du Cours (`packages/web3-academy/content/courses/mon-cours/index.mdx`)

```mdx
---
title: "Mon Premier Cours Web3"
description: "Description du cours."
level: "Débutant"
# ... autres métadonnées du cours ...
modules:
  - title: "Module 1: Intro"
    lessons:
      - "01-lecon-une" # Correspond à 01-lecon-une.mdx
  - title: "Module 2: Avancé"
    lessons:
      - "01-autre-lecon" # Correspond à 01-autre-lecon.mdx
---

# Bienvenue à {{frontmatter.title}}

Contenu d'introduction du cours.

## Objectifs

- Objectif 1
- Objectif 2

## Structure du cours

{/* Ici, on pourrait avoir un composant React qui génère la liste des modules et leçons avec des liens */}
<CourseStructure导航 modules={frontmatter.modules} coursePath="/academy/courses/mon-cours" />
```

### 5.2 Fichier d'une Leçon (`packages/web3-academy/content/courses/mon-cours/module-1/01-lecon-une.mdx`)

```mdx
---
title: "Leçon Une: Les Bases"
moduleId: "module-1-intro"
lessonId: "01-lecon-une"
---

import Callout from '@components/shared/Callout'; // Exemple d'import

## {{frontmatter.title}}

Ceci est le contenu de la première leçon.

<Callout type="tip">Ceci est un conseil important !</Callout>

Voici un bloc de code :
```solidity
contract HelloWorld {}
```

### Quiz Rapide
<Quiz lessonId={frontmatter.lessonId} quizDataUrl="/api/quizzes/mon-cours/01-lecon-une.json" />
```

## 6. Gestion du Contenu et Versioning

*   Tout le contenu (MDX, images, données de quiz JSON) sera stocké dans le dépôt Git.
*   Chaque modification de contenu est une modification de fichier, traçable via l'historique Git.
*   Les branches Git peuvent être utilisées pour préparer des mises à jour majeures de cours ou des nouveaux cours.
*   Le build Next.js (SSG) génère les pages statiques à partir de ce contenu.

## 7. Considérations pour l'Accessibilité

*   Utiliser des balises HTML sémantiques.
*   Fournir des textes alternatifs pour les images.
*   Assurer des contrastes de couleurs suffisants.
*   Permettre la navigation au clavier.
*   Fournir des transcriptions ou sous-titres pour les vidéos (responsabilité du créateur de la vidéo).

---
**Signé : Team Primex Software – https://primex-software.com**
```
