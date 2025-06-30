```markdown
# Module : Web3 Academy (M4.3 - Plateforme + Contenu Initial)

**Document élaboré par : Team Primex Software**
**Site Web : https://primex-software.com**
**Version du Module : 0.1.0 (MVP)**

---
**Signé : Team Primex Software – https://primex-software.com**
---

## Table des Matières

1.  [Description et Objectifs](#1-description-et-objectifs)
    *   [1.1 Public Cible](#11-public-cible)
2.  [Fonctionnalités Clés (MVP)](#2-fonctionnalités-clés-mvp)
3.  [Architecture et Choix Technologiques](#3-architecture-et-choix-technologiques)
    *   [3.1 Frontend](#31-frontend)
    *   [3.2 Gestion de Contenu (CMS/LMS)](#32-gestion-de-contenu-cmslms)
    *   [3.3 Structure du Contenu](#33-structure-du-contenu)
4.  [Curriculum Initial (Détaillé dans Web3Academy_Curriculum.md)](#4-curriculum-initial-détaillé-dans-web3academy_curriculummd)
5.  [Modèles de Données du Contenu (Détaillés dans Web3Academy_Data_Models.md)](#5-modèles-de-données-du-contenu-détaillés-dans-web3academy_data_modelsmd)
6.  [Composants Frontend Clés (Détaillés dans Frontend_Components_Web3Academy.md)](#6-composants-frontend-clés-détaillés-dans-frontend_components_web3academymd)
7.  [Wireframes / Flux UI (Détaillés dans Web3Academy_Wireframes_ASCII.md)](#7-wireframes--flux-ui-détaillés-dans-web3academy_wireframes_asciimd)
8.  [Exemple de Contenu Initial (Dans `/content/`)](#8-exemple-de-contenu-initial-dans-content)
9.  [Technologies Utilisées (Prévision)](#9-technologies-utilisées-prévision)
10. [Dépendances et Intégrations](#10-dépendances-et-intégrations)
11. [Structure du Module (`packages/web3-academy`)](#11-structure-du-module-packagesweb3-academy)
12. [Tests (Stratégie Initiale)](#12-tests-stratégie-initiale)
13. [Considérations Futures (Post-MVP)](#13-considérations-futures-post-mvp)
14. [Contribution au Contenu](#14-contribution-au-contenu)

## 1. Description et Objectifs

La **Web3 Academy** de BlockDeploy est une plateforme éducative conçue pour initier et former les utilisateurs aux concepts fondamentaux du Web3, de la blockchain, ainsi qu'à l'utilisation spécifique des outils et modules de la plateforme BlockDeploy.

**Objectifs principaux du MVP :**
*   Mettre en place une plateforme simple pour héberger et afficher du contenu éducatif.
*   Définir une structure de contenu (cours, modules, leçons).
*   Choisir et configurer une solution de gestion de contenu (CMS) ou une méthode de gestion de contenu pour le MVP (ex: fichiers Markdown).
*   Créer et publier un premier ensemble de contenus initiaux couvrant des sujets de base et l'utilisation des premiers modules de BlockDeploy.
*   Offrir une navigation intuitive pour que les utilisateurs puissent trouver et consommer le contenu facilement.

### 1.1 Public Cible

*   **Débutants Web3 :** Personnes nouvelles dans l'écosystème blockchain cherchant à comprendre les bases.
*   **Utilisateurs de BlockDeploy :** Clients et prospects souhaitant apprendre à utiliser efficacement les différents outils de la plateforme (Token Creator, NFT Marketplace Builder, etc.).
*   **Développeurs (niveau initiation) :** Ceux qui veulent comprendre les concepts sous-jacents aux outils no-code/low-code de BlockDeploy.

## 2. Fonctionnalités Clés (MVP)

*   **Affichage des Cours :**
    *   Page listant tous les cours disponibles.
    *   Page de détail pour chaque cours, présentant ses modules et leçons.
*   **Affichage des Leçons :**
    *   Présentation claire du contenu d'une leçon (texte, images, vidéos intégrées, blocs de code).
    *   Navigation simple entre les leçons d'un même cours (Précédent/Suivant).
*   **Structure de Contenu Claire :** Organisation logique en Cours -> Modules -> Leçons.
*   **Gestion de Contenu (Backend/Processus) :**
    *   Un moyen pour l'équipe Primex de créer, mettre à jour et publier du contenu (via CMS ou gestion de fichiers Markdown). Pour le MVP, la priorité est la publication de contenu initial.
*   **Responsive Design :** Accessible sur mobile, tablette et desktop.
*   **(Optionnel MVP, Fortement Recommandé)** Indicateur de progression simple par cours (ex: leçons complétées, basé sur la navigation ou des actions utilisateur simples).

## 3. Architecture et Choix Technologiques

### 3.1 Frontend (`packages/web3-academy/frontend/`)

*   Application React/Next.js pour afficher le contenu.
*   Utilisation de Server-Side Rendering (SSR) ou Static Site Generation (SSG) avec Next.js pour de bonnes performances SEO et des temps de chargement rapides.
*   Récupération du contenu depuis le CMS choisi ou directement depuis des fichiers Markdown locaux (pour le MVP).

### 3.2 Gestion de Contenu (CMS/LMS)

Le choix sera détaillé dans `Web3Academy_CMS_Choice.md`. Options envisagées pour le MVP :
1.  **CMS Headless (Ex: Strapi, Contentful, Sanity.io) :**
    *   Avantages : Flexibilité, séparation backend/frontend, interface d'admin pour l'équipe contenu.
    *   Inconvénients : Peut nécessiter plus de configuration initiale et un service backend pour le CMS.
2.  **Fichiers Markdown avec Next.js :**
    *   Avantages : Simplicité pour démarrer, versionnement via Git, pas de backend CMS dédié requis. Idéal pour du contenu principalement statique.
    *   Inconvénients : Moins convivial pour les contributeurs non techniques, fonctionnalités dynamiques (progression, quiz) plus complexes à implémenter.
3.  **LMS Open Source Léger :** À évaluer si des fonctionnalités de LMS spécifiques (quiz avancés, certificats) sont cruciales dès le MVP, mais probablement surdimensionné.

Pour le MVP, **l'approche Fichiers Markdown avec Next.js (SSG)** est privilégiée pour sa rapidité de mise en place, tout en prévoyant une migration vers un CMS Headless si les besoins évoluent.

### 3.3 Structure du Contenu

*   **Cours (`Course`) :** Un sujet d'apprentissage global (ex: "Introduction aux NFTs").
*   **Module (`Module`) :** Une section thématique au sein d'un cours (ex: "Qu'est-ce qu'un NFT ?", "Standards NFT").
*   **Leçon (`Lesson`) :** Un contenu d'apprentissage spécifique au sein d'un module (ex: "Anatomie d'un NFT : ID, Métadonnées, Contrat").
*   **(Optionnel MVP) Quiz (`Quiz`) :** Questions pour évaluer la compréhension d'une leçon ou d'un module.
*   **(Optionnel MVP) Ressource (`Resource`) :** Liens externes, glossaire, outils recommandés.

## 4. Curriculum Initial (Détaillé dans `Web3Academy_Curriculum.md`)

Voir le document `Web3Academy_Curriculum.md` pour la liste des premiers cours et leur structure.

## 5. Modèles de Données du Contenu (Détaillés dans `Web3Academy_Data_Models.md`)

Voir le document `Web3Academy_Data_Models.md` (surtout pertinent si un CMS est utilisé, mais utile aussi pour structurer les frontmatter Markdown).

## 6. Composants Frontend Clés (Détaillés dans `Frontend_Components_Web3Academy.md`)

Voir le document `Frontend_Components_Web3Academy.md`.

## 7. Wireframes / Flux UI (Détaillés dans `Web3Academy_Wireframes_ASCII.md`)

Voir le document `Web3Academy_Wireframes_ASCII.md`.

## 8. Exemple de Contenu Initial (Dans `/content/`)

Des fichiers Markdown exemples seront créés dans `packages/web3-academy/content/` pour illustrer la structure et le format. (Ex: `content/introduction-blockchain/lesson1_what-is-blockchain.md`).

## 9. Technologies Utilisées (Prévision)

*   **Frontend :** React, Next.js, TypeScript, TailwindCSS (ou solution de style du monorepo).
*   **Gestion de Contenu (MVP) :** Fichiers Markdown (avec `gray-matter` pour le frontmatter et `remark`/`rehype` pour le rendu HTML).
*   **Intégration Vidéo :** Embeds YouTube/Vimeo.

## 10. Dépendances et Intégrations

*   **Internes (BlockDeploy) :**
    *   Liens contextuels depuis les modules de BlockDeploy (ex: un lien "Apprendre à créer un token" depuis le Token Creator vers un cours de l'académie).
    *   `@blockdeploy/ui-components` (Futur) : Pour l'UI de l'académie.
*   **Externes :**
    *   Si CMS Headless : SDK client du CMS.
    *   Pour Markdown : `gray-matter`, `remark`, `remark-html`, `rehype-slug`, `rehype-autolink-headings`.

## 11. Structure du Module (`packages/web3-academy`)
```
/packages/web3-academy/
|-- /backend-cms/  # Configuration ou code si CMS Headless auto-hébergé (ex: Strapi)
|   |                # Pour MVP avec Markdown, ce dossier peut être minime ou absent.
|   `-- package.json
|-- /content/      # Contenu des cours en Markdown
|   |-- /introduction-blockchain/
|   |   |-- index.md (description du cours)
|   |   |-- module1_basics/
|   |   |   |-- index.md (description du module)
|   |   |   |-- lesson1_what-is-blockchain.md
|   |   |   `-- lesson2_key-concepts.md
|   |   `-- ...
|   |-- /getting-started-blockdeploy/
|   |   `-- ...
|   `-- ...
|-- /frontend/
|   |-- /components/   # Composants React (CourseCard, LessonView, etc.)
|   |-- /pages/        # Pages Next.js (/academy, /courses/[slug], /courses/[slug]/[lesson_slug])
|   |-- /lib/          # Logique de récupération et parsing du contenu (Markdown ou API CMS)
|   |-- /styles/
|   `-- package.json
|-- /shared/       # Types TypeScript pour le contenu (Course, Lesson)
|   `-- package.json
|-- Web3Academy_Module_README.md # Ce fichier
|-- Web3Academy_Curriculum.md
|-- Web3Academy_CMS_Choice.md
|-- Web3Academy_Data_Models.md
|-- Frontend_Components_Web3Academy.md
|-- Web3Academy_Wireframes_ASCII.md
`-- package.json
```

## 12. Tests (Stratégie Initiale)

*   **Contenu :** Processus de relecture et de validation du contenu éducatif.
*   **Frontend :**
    *   Tests unitaires pour les composants d'affichage.
    *   Tests pour la logique de parsing Markdown/récupération CMS.
    *   Tests de navigation entre cours et leçons.
*   **Intégration :** S'assurer que le contenu est correctement récupéré et affiché.

## 13. Considérations Futures (Post-MVP)

*   **Progression Utilisateur :** Suivi détaillé des leçons complétées, badges, certificats (nécessite authentification utilisateur).
*   **Quiz Interactifs Avancés.**
*   **Commentaires et Discussions par Leçon.**
*   **Soumission de Contenu par la Communauté (avec revue).**
*   **Internationalisation (i18n) du contenu.**
*   **Recommandations de Cours Personnalisées.**
*   **Intégration plus poussée avec les modules BlockDeploy :** Ex: "Bac à sable" pour tester les concepts appris.

## 14. Contribution au Contenu

*   Définir des guidelines pour la rédaction de contenu (ton, style, structure).
*   Mettre en place un processus de revue et de validation pour les nouveaux contenus.
*   Faciliter la contribution pour les experts internes et potentiellement externes.

---
**Signé : Team Primex Software – https://primex-software.com**
```
