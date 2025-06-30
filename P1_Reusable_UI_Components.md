```markdown
# Composants UI Réutilisables - Module P1 : Landing Page

**Document élaboré par : Team Primex Software**
**Site Web : https://primex-software.com**
**Version : 1.0**

---
**Signé : Team Primex Software – https://primex-software.com**
---

## Table des Matières

1.  [Introduction](#1-introduction)
2.  [Principes de Conception des Composants](#2-principes-de-conception-des-composants)
3.  [Liste des Composants (Catégorisée)](#3-liste-des-composants-catégorisée)
    *   [3.1 Atomes (Atoms)](#31-atomes-atoms)
    *   [3.2 Molécules (Molecules)](#32-molécules-molecules)
    *   [3.3 Organismes (Organisms)](#33-organismes-organisms)
    *   [3.4 Layouts](#34-layouts)
4.  [Conventions de Nommage et d'Organisation](#4-conventions-de-nommage-et-dorganisation)

## 1. Introduction

Ce document liste les composants UI (Interface Utilisateur) réutilisables prévus pour le développement du Module P1 (Landing Page et Pages Publiques) de BlockDeploy. L'objectif est de créer une bibliothèque de composants cohérente, flexible et maintenable, inspirée par les principes de l'Atomic Design. Cela permettra d'accélérer le développement, d'assurer une identité visuelle homogène et de faciliter les évolutions futures.

## 2. Principes de Conception des Composants

*   **Réutilisabilité :** Chaque composant doit être conçu pour être utilisé dans différents contextes avec un minimum de modifications.
*   **Personnalisation via Props :** Les variations d'un composant (couleur, taille, contenu) doivent être gérées via des propriétés (props) clairement définies.
*   **Accessibilité (a11y) :** Les composants doivent respecter les standards d'accessibilité web (ARIA, navigation clavier, contrastes).
*   **Responsivité :** Les composants doivent s'adapter correctement à différentes tailles d'écran.
*   **Isolation :** Les composants ne doivent pas avoir de dépendances cachées à leur contexte d'utilisation (éviter les marges externes excessives, par exemple).
*   **Testabilité :** Chaque composant doit être facilement testable de manière isolée.

## 3. Liste des Composants (Catégorisée)

### 3.1 Atomes (Atoms)

Composants UI fondamentaux, non divisibles.

*   **`Button`**
    *   Description : Bouton cliquable standard.
    *   Props : `variant` (primary, secondary, text, outline), `size` (sm, md, lg), `href` (pour liens stylisés comme des boutons), `onClick`, `disabled`, `isLoading`, `iconLeft`, `iconRight`, `children` (texte du bouton).
*   **`Logo`**
    *   Description : Affiche le logo de BlockDeploy.
    *   Props : `variant` (couleur, monochrome), `size`.
*   **`Icon`**
    *   Description : Affiche une icône SVG.
    *   Props : `name` (nom de l'icône), `size`, `color`, `className`.
*   **`Input`**
    *   Description : Champ de saisie de texte.
    *   Props : `type` (text, email, password), `placeholder`, `value`, `onChange`, `disabled`, `error`, `label`, `iconLeft`, `iconRight`.
*   **`Textarea`**
    *   Description : Champ de saisie de texte multi-lignes.
    *   Props : `placeholder`, `value`, `onChange`, `disabled`, `error`, `label`, `rows`.
*   **`Label`**
    *   Description : Étiquette pour les champs de formulaire.
    *   Props : `htmlFor`, `children`.
*   **`Link`**
    *   Description : Lien hypertexte stylisé. Utilise `next/link`.
    *   Props : `href`, `children`, `variant` (standard, nav, footer), `className`.
*   **`Typography` / `Text`**
    *   Description : Composant pour afficher du texte avec différents styles sémantiques (h1-h6, p, caption, etc.).
    *   Props : `as` (h1, p, span), `variant` (body1, body2, caption), `color`, `fontWeight`.
*   **`Badge` / `Tag`**
    *   Description : Petit élément pour afficher un statut ou une catégorie.
    *   Props : `colorScheme`, `variant` (solid, outline), `children`.
*   **`Spinner` / `Loader`**
    *   Description : Indicateur de chargement.
    *   Props : `size`, `color`.
*   **`Divider`**
    *   Description : Ligne de séparation visuelle.
    *   Props : `orientation` (horizontal, vertical), `variant` (solid, dashed).

### 3.2 Molécules (Molecules)

Groupes de plusieurs atomes formant des unités fonctionnelles simples.

*   **`FormControl`**
    *   Description : Regroupe `Label`, `Input`/`Textarea`, et message d'erreur/aide.
    *   Props : `label`, `errorMessage`, `helpText`, `children` (le champ de saisie).
*   **`NavLinks`**
    *   Description : Ensemble de liens de navigation pour le Header ou le Footer.
    *   Props : `links` (tableau d'objets {text, href}), `orientation` (horizontal, vertical).
*   **`FeatureCard`**
    *   Description : Carte pour présenter une fonctionnalité avec icône, titre et description.
    *   Props : `icon`, `title`, `description`, `linkHref`.
*   **`BlogPostCard`**
    *   Description : Carte pour afficher un aperçu d'article de blog (image, titre, extrait, métadonnées).
    *   Props : `imageUrl`, `title`, `excerpt`, `author`, `date`, `linkHref`.
*   **`TestimonialCard`**
    *   Description : Carte pour afficher un témoignage client (citation, auteur, entreprise).
    *   Props : `quote`, `authorName`, `authorTitle`, `authorImage`.
*   **`PricingCard`**
    *   Description : Carte pour afficher les détails d'un plan tarifaire.
    *   Props : `planName`, `price`, `featuresList` (tableau de strings), `ctaText`, `ctaHref`, `isFeatured`.
*   **`SearchBar`** (pour Blog/Documentation)
    *   Description : Champ de recherche avec bouton.
    *   Props : `onSubmit`, `placeholder`.
*   **`SocialLinks`**
    *   Description : Ensemble d'icônes de réseaux sociaux cliquables.
    *   Props : `platforms` (tableau d'objets {name, href}).
*   **`CTABanner`**
    *   Description : Bannière avec un titre, un texte et un ou plusieurs boutons d'appel à l'action.
    *   Props : `title`, `text`, `primaryCta` {text, href}, `secondaryCta` {text, href}.
*   **`Modal`**
    *   Description : Fenêtre modale pour afficher du contenu superposé (ex: formulaire de contact rapide, confirmation).
    *   Props : `isOpen`, `onClose`, `title`, `children`, `size` (sm, md, lg).

### 3.3 Organismes (Organisms)

Sections plus complexes de l'interface, composées de molécules et/ou d'atomes.

*   **`Header`**
    *   Description : En-tête principal du site.
    *   Contient : `Logo`, `NavLinks`, `Button` (CTA principal).
    *   Props : `variant` (transparent, solid), `isSticky`.
*   **`Footer`**
    *   Description : Pied de page principal du site.
    *   Contient : `Logo`, `NavLinks` (multiples colonnes), `SocialLinks`, texte de copyright, liens vers pages légales.
*   **`HeroSection`**
    *   Description : Section d'introduction principale sur la page d'accueil.
    *   Contient : `Typography` (titre, sous-titre), `Button` (CTA), visuel (image/vidéo).
*   **`FeaturesListSection`**
    *   Description : Section listant plusieurs fonctionnalités.
    *   Contient : Titre de section, grille de `FeatureCard`.
*   **`PricingTableSection`**
    *   Description : Section affichant les différents plans tarifaires.
    *   Contient : Titre de section, sélecteur de périodicité (si applicable), grille de `PricingCard`.
*   **`TestimonialSliderSection`**
    *   Description : Section affichant des témoignages sous forme de carrousel.
    *   Contient : Titre de section, carrousel de `TestimonialCard`.
*   **`BlogListSection`**
    *   Description : Section affichant les derniers articles de blog.
    *   Contient : Titre de section, grille de `BlogPostCard`.
*   **`ContactFormSection`**
    *   Description : Section contenant le formulaire de contact complet.
    *   Contient : Titre, description, `FormControl` pour chaque champ, `Button` de soumission.
*   **`FAQSection`**
    *   Description : Section affichant une liste de questions-réponses, souvent avec des accordéons.
    *   Contient : Titre, liste d'items `AccordionItem` (molécule).

### 3.4 Layouts

Composants aidant à structurer la mise en page globale.

*   **`PageLayout`**
    *   Description : Structure de base pour chaque page (inclut `Header`, `Footer`, et un slot pour le contenu principal).
    *   Props : `title` (pour la balise `<title>`), `description` (pour meta description), `children`.
*   **`SectionContainer`**
    *   Description : Conteneur standard pour une section de page (gère le padding, la largeur max).
    *   Props : `className`, `children`, `as` (div, section, article).
*   **`Grid`**
    *   Description : Composant générique pour créer des mises en page en grille (basé sur CSS Grid ou Flexbox).
    *   Props : `columns`, `gap`, `children`.

## 4. Conventions de Nommage et d'Organisation

*   **Nommage des Fichiers de Composants :** `PascalCase.tsx` (ex: `Button.tsx`, `FeatureCard.tsx`).
*   **Organisation :** Les composants seront organisés dans le dossier `/components` en suivant la structure Atomic Design (atoms, molecules, organisms, layout) comme décrit dans `P1_Frontend_Architecture.md`.
*   **Exports :** Chaque composant sera exporté depuis un fichier `index.ts` dans son dossier respectif pour des imports simplifiés (ex: `import { Button } from '@/components/atoms';`).

---
**Signé : Team Primex Software – https://primex-software.com**
```
