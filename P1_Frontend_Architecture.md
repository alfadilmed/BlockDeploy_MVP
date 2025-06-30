```markdown
# Architecture Frontend - Module P1 : Landing Page et Pages Publiques

**Document élaboré par : Team Primex Software**
**Site Web : https://primex-software.com**
**Version : 1.0**

---
**Signé : Team Primex Software – https://primex-software.com**
---

## Table des Matières

1.  [Introduction](#1-introduction)
2.  [Stack Technique](#2-stack-technique)
3.  [Philosophie d'Architecture](#3-philosophie-darchitecture)
4.  [Arborescence des Fichiers (Détaillée)](#4-arborescence-des-fichiers-détaillée)
5.  [Gestion de l'État (State Management)](#5-gestion-de-létat-state-management)
6.  [Routing](#6-routing)
7.  [Styling](#7-styling)
8.  [Optimisations et Performance](#8-optimisations-et-performance)
9.  [Intégration CMS Headless (Optionnelle)](#9-intégration-cms-headless-optionnelle)
10. [Bonnes Pratiques et Conventions](#10-bonnes-pratiques-et-conventions)

## 1. Introduction

Ce document décrit l'architecture frontend proposée pour le Module P1 (Landing Page et Pages Publiques) de la plateforme BlockDeploy. L'objectif est de mettre en place une base solide, performante, maintenable et évolutive.

## 2. Stack Technique

*   **Framework Principal :** **Next.js (v13+ avec App Router ou Pages Router)**
    *   *Justification :* Excellent pour le SEO grâce au SSR/SSG, routage basé sur le système de fichiers intuitif, optimisation des images, API routes intégrées, vaste communauté et écosystème React. L'App Router offre des layouts imbriqués et des Server Components pour une granularité fine.
*   **Langage :** **TypeScript**
    *   *Justification :* Typage statique pour une meilleure robustesse du code, auto-complétion améliorée, refactoring plus sûr, et une meilleure maintenabilité à long terme.
*   **Librairie UI :** **React (v18+)**
    *   *Justification :* Standard de l'industrie, composante principale de Next.js, vaste écosystème de bibliothèques et d'outils.
*   **Styling :** **Tailwind CSS (v3+)**
    *   *Justification :* Utility-first CSS framework pour un développement rapide et cohérent des UI, personnalisable, et génère un CSS optimisé en production.
    *   **Optionnel :** CSS Modules ou Styled Components pour des composants très spécifiques si Tailwind n'est pas adapté.
*   **Gestionnaire de Paquets :** **Yarn (v1 ou v3+)** ou **npm**
    *   *Justification :* Gestion efficace des dépendances. Yarn Berry (v2+) offre Plug'n'Play pour des installations plus rapides et fiables.
*   **Linting & Formatting :**
    *   **ESLint :** Pour l'analyse statique du code et l'application des règles de codage.
    *   **Prettier :** Pour le formatage automatique du code, assurant une cohérence stylistique.
    *   **Husky & lint-staged :** Pour exécuter les linters et formatters avant chaque commit.
*   **Tests :**
    *   **Jest :** Framework de test JavaScript.
    *   **React Testing Library :** Pour tester les composants React en simulant l'interaction utilisateur.
*   **Gestion de Contenu (Optionnel) :**
    *   **CMS Headless :** Strapi, Contentful, Sanity.io, ou Storyblok.
    *   *Justification :* Permettre aux équipes non techniques de gérer le contenu (blog, sections marketing) sans intervention des développeurs.

## 3. Philosophie d'Architecture

*   **Atomic Design (Inspiration) :** Organiser les composants en atomes (ex: Button, Input), molécules (ex: SearchForm), organismes (ex: Header), templates et pages pour favoriser la réutilisabilité et la maintenabilité.
*   ** séparation des préoccupations (Separation of Concerns) :** Isoler la logique métier, la logique d'affichage, et la gestion de l'état autant que possible.
*   **Performance First :** Optimiser les temps de chargement (Lazy Loading, optimisation des images, code splitting).
*   **Accessibilité (a11y) :** Suivre les standards WCAG pour rendre le site accessible à tous.
*   **SEO-Friendly :** Utiliser les fonctionnalités de Next.js (SSR/SSG, `next/head`, sitemap) pour un référencement optimal.

## 4. Arborescence des Fichiers (Détaillée)

Basée sur Next.js avec le **Pages Router** (plus commun pour les sites majoritairement statiques/SSG comme une landing page, mais adaptable à l'App Router).

```
/p1-landing-pages/
|
|-- /components/                 # Composants React réutilisables
|   |-- /atoms/                  # Plus petits composants (Button, Logo, Input, Tag)
|   |-- /molecules/              # Combinaison d'atomes (SearchBar, FeatureCard, NavLinks)
|   |-- /organisms/              # Sections plus larges (Header, Footer, HeroSection, PricingTable)
|   |-- /layout/                 # Composants de structure de page (PageLayout, SectionContainer)
|   `-- /icons/                  # Icônes SVG en tant que composants React
|
|-- /constants/                  # Constantes globales (URLs, clés API publiques, textes fixes)
|   `-- index.ts
|
|-- /contexts/                   # Contextes React pour la gestion d'état global léger
|   `-- ThemeContext.tsx         # Exemple pour un thème light/dark
|
|-- /hooks/                      # Hooks React personnalisés
|   `-- useMediaQuery.ts         # Exemple
|
|-- /lib/                        # Fonctions utilitaires et helpers
|   |-- analytics.ts             # Fonctions pour Google Analytics
|   |-- cms.ts                   # Fonctions pour interagir avec le CMS Headless (si utilisé)
|   `-- utils.ts                 # Utilitaires divers
|
|-- /pages/                      # Fichiers correspondant aux routes de l'application
|   |-- /api/                    # API Routes Next.js (ex: /api/contact pour le formulaire)
|   |   `-- contact.ts
|   |-- /blog/                   # Pages du blog
|   |   |-- index.tsx            # Liste des articles (/blog)
|   |   `-- [slug].tsx           # Page d'un article de blog (/blog/mon-article)
|   |-- _app.tsx                 # Composant racine de l'application (global layout, providers)
|   |-- _document.tsx            # Personnalisation du HTML (balises <head>, <html>, <body>)
|   |-- index.tsx                # Page d'accueil (/)
|   |-- features.tsx             # Page des fonctionnalités (/features)
|   |-- pricing.tsx              # Page des tarifs (/pricing)
|   |-- about.tsx                # Page À Propos (/about)
|   |-- contact.tsx              # Page de contact (/contact)
|   |-- privacy-policy.tsx       # Politique de confidentialité (/privacy-policy)
|   |-- terms-of-service.tsx     # Conditions d'utilisation (/terms-of-service)
|   `-- 404.tsx                  # Page d'erreur 404 personnalisée
|
|-- /public/                     # Fichiers statiques servis tels quels
|   |-- /fonts/                  # Fichiers de polices auto-hébergées
|   |-- /images/                 # Images, logos, illustrations
|   |-- favicon.ico
|   `-- sitemap.xml              # (Peut être généré dynamiquement)
|
|-- /styles/                     # Fichiers de style globaux
|   |-- globals.css              # Styles globaux, import de Tailwind
|   `-- themes.css               # Variables CSS pour thèmes (si nécessaire)
|
|-- /content/                    # Contenu local en Markdown (si pas de CMS)
|   |-- /blog/                   # Articles de blog en .md ou .mdx
|   `-- /pages/                  # Contenu pour certaines pages
|
|-- /tests/                      # Fichiers de test
|   |-- /__mocks__/              # Mocks pour les tests
|   |-- /components/             # Tests pour les composants
|   |-- /pages/                  # Tests pour les pages
|   |-- /hooks/                  # Tests pour les hooks
|   `-- setupTests.ts            # Configuration globale des tests Jest
|
|-- .env.development             # Variables d'environnement pour le développement
|-- .env.production              # Variables d'environnement pour la production
|-- .env.example                 # Modèle pour les variables d'environnement
|-- .eslintrc.json               # Configuration ESLint
|-- .gitignore
|-- .prettierrc.json             # Configuration Prettier
|-- next.config.js               # Configuration Next.js (plugins, redirects, etc.)
|-- package.json
|-- postcss.config.js            # Configuration PostCSS (requis par Tailwind)
|-- tailwind.config.js           # Configuration Tailwind CSS (thème, plugins)
`-- tsconfig.json                # Configuration TypeScript
```

## 5. Gestion de l'État (State Management)

Pour la Landing Page et les pages publiques (P1), une gestion d'état complexe n'est généralement pas nécessaire.
*   **État Local des Composants :** `useState` et `useReducer` de React pour la majorité des besoins.
*   **React Context API :** Pour des états globaux simples comme le thème (light/dark), ou l'état d'un menu mobile.
*   **Bibliothèques plus complexes (Zustand, Redux Toolkit) :** Seront évitées pour P1 sauf si un besoin impérieux se présente, afin de maintenir la légèreté. Elles seront plutôt considérées pour les dApps du P2.

## 6. Routing

Géré par Next.js via le système de fichiers dans le dossier `/pages`. Le routage dynamique sera utilisé pour les pages de blog (`/blog/[slug].tsx`).

## 7. Styling

*   **Tailwind CSS :** Approche principale. Configuration dans `tailwind.config.js` pour personnaliser le thème (couleurs, polices, espacements) selon l'identité visuelle de BlockDeploy.
*   **CSS Global :** Dans `styles/globals.css` pour les styles de base et l'import de Tailwind.
*   **CSS Modules :** Envisagé pour des composants très spécifiques nécessitant un scoping CSS strict, si Tailwind s'avère moins pratique pour un cas d'usage particulier.

## 8. Optimisations et Performance

*   **Images :** Utilisation du composant `next/image` pour l'optimisation automatique (redimensionnement, format WebP, lazy loading).
*   **Lazy Loading :** Pour les composants et sections non visibles au premier chargement (`next/dynamic` pour les composants).
*   **Code Splitting :** Géré automatiquement par Next.js par page.
*   **Minification :** HTML, CSS, JS minifiés en production par Next.js.
*   **Caching :** Utilisation des stratégies de caching de Next.js (ISR - Incremental Static Regeneration pour le blog si CMS, ou SSG pour les pages statiques).
*   **Bundle Analysis :** Utilisation de `@next/bundle-analyzer` pour inspecter la taille des bundles JavaScript et identifier les optimisations possibles.

## 9. Intégration CMS Headless (Optionnelle)

Si un CMS Headless est utilisé (ex: pour le blog) :
*   Des fonctions de récupération de données seront créées dans `/lib/cms.ts` (utilisant `fetch` ou un client SDK du CMS).
*   `getStaticProps` ou `getServerSideProps` (ou les équivalents App Router) seront utilisés dans les pages Next.js pour récupérer le contenu au moment du build ou à la requête.
*   Des webhooks pourront être configurés depuis le CMS pour déclencher des rebuilds de la partie statique du site (ISR).

## 10. Bonnes Pratiques et Conventions

*   **Nommage :** Composants en PascalCase (`MyComponent.tsx`), fichiers de fonctions/hooks en camelCase (`useCustomHook.ts`).
*   **Organisation des Imports :** Groupés et triés (peut être automatisé avec un plugin Prettier ou ESLint).
*   **Commentaires :** Documenter le code complexe, les props des composants (JSDoc/TSDoc).
*   **Git Flow :** Utilisation de branches de fonctionnalités (`feature/ma-nouvelle-feature`), Pull Requests pour revue de code.
*   **Tests :** Viser une couverture de test raisonnable pour les composants critiques et la logique métier.

---
**Signé : Team Primex Software – https://primex-software.com**
```
