```markdown
# Format de Définition d'un Bloc - Module : Blocs Marketplace

**Document élaboré par : Team Primex Software**
**Site Web : https://primex-software.com**
**Version : 1.0**

---
**Signé : Team Primex Software – https://primex-software.com**
---

## Table des Matières

1.  [Introduction](#1-introduction)
2.  [Objectifs du Format](#2-objectifs-du-format)
3.  [Structure Globale d'un Bloc (JSON)](#3-structure-globale-dun-bloc-json)
    *   [3.1 Section Métadonnées (`metadata`)](#31-section-métadonnées-metadata)
    *   [3.2 Section Contenu du Bloc (`content`)](#32-section-contenu-du-bloc-content)
4.  [Détail des Métadonnées (`metadata`)](#4-détail-des-métadonnées-metadata)
5.  [Détail du Contenu du Bloc (`content`)](#5-détail-du-contenu-du-bloc-content)
6.  [Exemple Complet d'un Fichier `bloc.json`](#6-exemple-complet-dun-fichier-blocjson)
7.  [Validation et Versioning](#7-validation-et-versioning)
8.  [Considérations pour l'Importation dans le Drag & Drop Builder](#8-considérations-pour-limportation-dans-le-drag--drop-builder)

## 1. Introduction

Ce document définit le format standardisé pour un "Bloc" publiable sur la Blocs Marketplace de BlockDeploy. Un Bloc est essentiellement un ensemble de composants pré-configurés et de leurs propriétés, conçu pour être facilement importé et utilisé dans le Drag & Drop Builder.

Le format principal d'un Bloc sera un fichier JSON (par exemple, `bloc.json`) qui contient à la fois les métadonnées descriptives du Bloc et la structure de son contenu.

## 2. Objectifs du Format

*   **Standardisation :** Assurer que tous les Blocs partagent une structure commune.
*   **Intégrabilité :** Faciliter l'importation et le rendu des Blocs dans le Drag & Drop Builder.
*   **Descriptif :** Permettre aux utilisateurs de la marketplace de comprendre rapidement ce que fait un Bloc et à quoi il ressemble.
*   **Extensibilité :** Pouvoir ajouter de nouveaux champs de métadonnées ou de nouvelles capacités aux Blocs à l'avenir.

## 3. Structure Globale d'un Bloc (JSON)

Un fichier `bloc.json` aura la structure de haut niveau suivante :

```json
{
  "blocApiVersion": "1.0", // Version de l'API/format de ce schéma de Bloc
  "metadata": {
    // ... voir Section 3.1 ...
  },
  "content": {
    // ... voir Section 3.2 ...
    // Structure compatible avec Schema_Export_Design.md du Drag & Drop Builder
  }
}
```

*   **`blocApiVersion` (string, obligatoire) :** Version du schéma de définition de ce Bloc. Permet de gérer les évolutions du format.
*   **`metadata` (object, obligatoire) :** Contient toutes les informations descriptives sur le Bloc.
*   **`content` (object, obligatoire) :** Contient la définition réelle des composants du Bloc, en utilisant une structure compatible avec (ou identique à) la section `rootComponent` du `Schema_Export_Design.md` du Drag & Drop Builder.

## 4. Détail des Métadonnées (`metadata`)

La section `metadata` contient les informations suivantes :

```json
"metadata": {
  "id": "primex-hero-section-v1", // Identifiant unique du Bloc (ex: namespace-nom-version)
  "name": "Hero Section Moderne avec CTA", // Nom lisible du Bloc
  "version": "1.0.2", // Version sémantique de ce Bloc spécifique (indépendante de blocApiVersion)
  "author": "Primex Software", // Nom du créateur ou de l'organisation
  "authorUrl": "https://primex-software.com", // Lien vers le site de l'auteur (optionnel)
  "description": "Une section d'accueil impactante avec un titre, un sous-titre, une image de fond et un bouton d'appel à l'action principal. Parfait pour les landing pages.", // Description détaillée
  "tags": ["hero", "landing page", "cta", "marketing", "web3"], // Tableau de mots-clés pour la recherche/catégorisation
  "category": "Layout/Sections", // Catégorie principale (ex: Sections, Web3 Components, Forms, Navigation)
  "previewImageUrl": "https://cdn.primex-software.com/blocs/previews/hero-section-v1.jpg", // URL d'une image de prévisualisation du Bloc
  "createdAt": "2024-07-28T10:00:00Z", // Date de création du Bloc
  "lastModifiedAt": "2024-07-28T11:30:00Z", // Date de dernière modification
  "license": "MIT", // (Optionnel) Licence sous laquelle le Bloc est partagé
  "compatibility": { // (Optionnel) Informations de compatibilité
    "builderVersionMin": "0.1.0" // Version minimale du Drag & Drop Builder requise
  },
  "dependencies": [ // (Optionnel) Liste des dépendances si le bloc utilise des assets externes spécifiques non standards
    // { "type": "font", "name": "Roboto", "url": "https://fonts.google.com/..." }
  ],
  "usageInstructions": "Déposez ce bloc en haut de votre page. Personnalisez le texte du titre, le sous-titre, l'image de fond et le lien du bouton CTA via l'inspecteur de propriétés." // (Optionnel)
}
```

## 5. Détail du Contenu du Bloc (`content`)

La section `content` doit être directement compatible avec la structure attendue par le Drag & Drop Builder pour un ensemble de composants. Elle est essentiellement un `ComponentNode` (ou un tableau de `ComponentNode` si le Bloc peut représenter plusieurs éléments de haut niveau, bien qu'un seul `rootComponent` pour le Bloc soit plus simple pour commencer).

La structure de `content` sera donc :
```json
"content": {
  // Ceci est un ComponentNode, tel que défini dans Schema_Export_Design.md
  // Il peut s'agir d'un simple composant ou d'un conteneur avec des enfants.
  "id": "bloc-root-uuid-...", // ID racine spécifique à cette instance de bloc (sera regénéré à l'import)
  "type": "Container", // Ou le type du composant racine du bloc
  "props": {
    // Propriétés pré-configurées pour ce conteneur/composant racine
    "padding": "40px 0"
  },
  "children": [
    {
      "id": "bloc-heading-uuid-...",
      "type": "Heading",
      "props": {
        "text": "Titre par Défaut du Bloc",
        "level": "H2",
        "textAlign": "center"
      },
      "children": []
    },
    {
      "id": "bloc-paragraph-uuid-...",
      "type": "TextParagraph",
      "props": {
        "text": "Contenu textuel par défaut pour ce bloc. Personnalisez-moi !",
        "textAlign": "center"
      },
      "children": []
    }
    // ... autres composants imbriqués formant le Bloc
  ]
}
```
**Important :** Les `id` des composants à l'intérieur de la section `content` sont relatifs au Bloc. Lors de l'importation d'un Bloc dans le Drag & Drop Builder, ces IDs devront probablement être **regénérés** (ou préfixés) pour éviter les collisions avec les IDs des composants déjà présents sur le canvas de l'utilisateur.

## 6. Exemple Complet d'un Fichier `bloc.json`

```json
{
  "blocApiVersion": "1.0",
  "metadata": {
    "id": "primex-simple-cta-banner-v1.0.0",
    "name": "Bannière CTA Simple",
    "version": "1.0.0",
    "author": "Primex Software",
    "authorUrl": "https://primex-software.com",
    "description": "Une bannière simple avec un titre et un bouton d'appel à l'action, idéale pour les fins de section.",
    "tags": ["cta", "banner", "marketing", "button"],
    "category": "Marketing/CTA",
    "previewImageUrl": "https://cdn.primex-software.com/blocs/previews/simple-cta-banner-v1.jpg",
    "createdAt": "2024-07-28T15:00:00Z",
    "lastModifiedAt": "2024-07-28T15:10:00Z",
    "license": "MIT",
    "compatibility": {
      "builderVersionMin": "0.1.0"
    }
  },
  "content": {
    "id": "cta-banner-root", // Cet ID sera probablement ignoré ou remplacé à l'import
    "type": "Container",
    "props": {
      "backgroundColor": "#F8F9FA",
      "padding": "30px",
      "textAlign": "center", // Appliqué au conteneur, les enfants peuvent surcharger
      "borderRadius": "8px"
    },
    "children": [
      {
        "id": "cta-heading",
        "type": "Heading",
        "props": {
          "text": "Prêt à Commencer ?",
          "level": "H3",
          "color": "#212529",
          "marginBottom": "15px"
        },
        "children": []
      },
      {
        "id": "cta-button",
        "type": "Button",
        "props": {
          "text": "Contactez-Nous",
          "variant": "primary",
          "size": "large",
          "onClickAction": "OpenLink", // Supposons que le composant Button a cette prop
          "linkHref": "/contact"
        },
        "children": []
      }
    ]
  }
}
```

## 7. Validation et Versioning

*   **`blocApiVersion` :** Permet au Drag & Drop Builder de savoir comment interpréter le schéma du Bloc. Si le builder rencontre une version qu'il ne supporte pas, il peut refuser l'import ou tenter une migration.
*   **`metadata.version` :** Version sémantique du Bloc lui-même (ex: 1.0.0, 1.0.1, 1.1.0). Permet aux utilisateurs de savoir s'ils utilisent la dernière version d'un Bloc.
*   Le backend de la Blocs Marketplace devra valider la structure JSON des Blocs soumis par rapport à ce schéma (et à `Schema_Export_Design.md` pour la section `content`).

## 8. Considérations pour l'Importation dans le Drag & Drop Builder

*   **Regénération des IDs :** Comme mentionné, les `id` des `ComponentNode` dans la section `content` du Bloc doivent être uniques au sein du design de l'utilisateur. Le builder devra donc probablement assigner de nouveaux IDs lors de l'importation.
*   **Gestion des Dépendances :** Si un Bloc déclare des dépendances (ex: polices spécifiques, icônes), le builder ou l'environnement de rendu final devra s'assurer qu'elles sont disponibles.
*   **Fusion des Styles/Props :** L'utilisateur pourra modifier les propriétés des composants d'un Bloc importé, comme n'importe quel autre composant.

---
**Signé : Team Primex Software – https://primex-software.com**
```
