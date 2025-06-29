```markdown
# Spécification du Format des Blocs - Module : Blocs Marketplace

**Document élaboré par : Team Primex Software**
**Site Web : https://primex-software.com**
**Version : 1.0**

---
**Signé : Team Primex Software – https://primex-software.com**
---

## Table des Matières

1.  [Introduction](#1-introduction)
2.  [Objectifs du Format de Bloc](#2-objectifs-du-format-de-bloc)
3.  [Structure Générale d'un Bloc](#3-structure-générale-dun-bloc)
    *   [3.1 Fichier Manifest (`manifest.json`)](#31-fichier-manifest-manifestjson)
    *   [3.2 Fichier de Contenu du Bloc (`block.json`)](#32-fichier-de-contenu-du-bloc-blockjson)
    *   [3.3 Fichier d'Aperçu (`preview.png` ou `.jpg`)](#33-fichier-daperçu-previewpng-ou-jpg)
    *   [3.4 (Optionnel) README du Bloc (`README.md`)](#34-optionnel-readme-du-bloc-readmemd)
4.  [Détail du `manifest.json`](#4-détail-du-manifestjson)
5.  [Détail du `block.json`](#5-détail-du-blockjson)
6.  [Props Configurables d'un Bloc](#6-props-configurables-dun-bloc)
7.  [Exemple de Structure de Dossier pour un Bloc](#7-exemple-de-structure-de-dossier-pour-un-bloc)
8.  [Validation et Compatibilité](#8-validation-et-compatibilité)
9.  [Évolution Future](#9-évolution-future)

## 1. Introduction

Ce document définit le format standardisé pour un "Bloc" au sein de la Blocs Marketplace de BlockDeploy. Un Bloc est une collection de composants et de configurations, réutilisable et importable dans le Drag & Drop Builder. Ce format assure la cohérence, la découvrabilité et la compatibilité des blocs.

## 2. Objectifs du Format de Bloc

*   **Autocontenu :** Un bloc doit contenir toutes les informations nécessaires pour être affiché dans la marketplace et utilisé dans le builder.
*   **Standardisé :** Faciliter la création, le partage et la validation des blocs.
*   **Compatible :** Le contenu du bloc doit être directement utilisable par le Drag & Drop Builder (basé sur le `Schema_Export_Design.md` de celui-ci).
*   **Riche en Métadonnées :** Fournir suffisamment d'informations pour la recherche, le filtrage et l'affichage dans la marketplace.
*   **Extensible :** Permettre l'ajout de nouvelles fonctionnalités ou types de contenu à l'avenir.

## 3. Structure Générale d'un Bloc

Pour le MVP (stockage interne), chaque bloc sera représenté par un dossier. Ce dossier contiendra plusieurs fichiers :

### 3.1 Fichier Manifest (`manifest.json`)

*   Contient les métadonnées du bloc (nom, description, auteur, catégorie, image d'aperçu, etc.).
*   Utilisé par la marketplace pour afficher les informations du bloc dans la galerie et la page de détail.

### 3.2 Fichier de Contenu du Bloc (`block.json`)

*   Contient la structure JSON réelle du bloc, c'est-à-dire l'arborescence des composants et leurs propriétés.
*   Ce fichier doit être **strictement conforme au schéma défini dans `Schema_Export_Design.md`** du module Drag & Drop Builder, comme s'il s'agissait d'un design exporté par le builder lui-même (potentiellement avec un seul `rootComponent` représentant le bloc).

### 3.3 Fichier d'Aperçu (`preview.png` ou `.jpg`)

*   Une image représentant visuellement le bloc. Affichée dans la `BlockCard` et la `BlockDetailView` de la marketplace.
*   Le chemin vers cette image sera spécifié dans le `manifest.json`.

### 3.4 (Optionnel) README du Bloc (`README.md`)

*   Un fichier Markdown optionnel pour une description plus détaillée, des instructions d'utilisation spécifiques ou des notes pour les développeurs.

## 4. Détail du `manifest.json`

Ce fichier contient les métadonnées descriptives du bloc.

```json
{
  "id": "primex-hero-section-web3-v1", // Identifiant unique du bloc (namespace-nom-version)
  "name": "Hero Section Web3 Connect", // Nom lisible du bloc
  "version": "1.0.0", // Version sémantique du bloc
  "description": "Une section d'accueil moderne avec un titre, un texte descriptif et un bouton de connexion wallet.",
  "author": "Primex Software", // Auteur du bloc
  "license": "MIT", // Licence sous laquelle le bloc est distribué (pour blocs internes ou futurs blocs communautaires)
  "category": "Hero Sections", // Catégorie principale pour le filtrage (ex: Headers, Footers, Sections de Contenu, Interactions Web3)
  "tags": ["hero", "web3", "connect wallet", "landing page", "introduction"], // Mots-clés pour la recherche
  "previewImageUrl": "preview.png", // Chemin relatif (depuis la racine du dossier du bloc) vers l'image d'aperçu
  "blockJsonPath": "block.json", // Chemin relatif vers le fichier de contenu du bloc
  "primexVerified": true, // Boolean, indique si le bloc est vérifié/approuvé par Primex (pour futurs blocs communautaires)
  "requiredModules": ["@blockdeploy/walletconnect-module"], // Optionnel: liste des modules BlockDeploy dont ce bloc dépend pour fonctionner correctement
  "configurableProps": [ // Optionnel: décrit les props du bloc qui peuvent être facilement modifiées par l'utilisateur dans le D&D Builder
    {
      "propName": "titleText", // Nom de la prop interne au block.json (ex: rootComponent.children[0].props.text)
      "label": "Titre Principal", // Label affiché dans l'inspecteur du D&D Builder
      "type": "string", // Type de la prop (string, number, boolean, color, etc.)
      "defaultValue": "Bienvenue sur Notre Plateforme Web3!"
    },
    {
      "propName": "descriptionText",
      "label": "Texte de Description",
      "type": "string",
      "defaultValue": "Connectez votre wallet pour commencer."
    },
    {
      "propName": "buttonBackgroundColor",
      "label": "Couleur de Fond du Bouton",
      "type": "color",
      "defaultValue": "#007bff"
    }
  ],
  "lastUpdatedAt": "2024-07-28T10:00:00Z", // Date de dernière mise à jour du bloc
  "createdAt": "2024-07-28T09:00:00Z" // Date de création du bloc
}
```

*   **`id`**: Un slug unique et stable.
*   **`previewImageUrl`**: Le chemin est relatif à la racine du dossier du bloc.
*   **`blockJsonPath`**: Le chemin est relatif à la racine du dossier du bloc.
*   **`configurableProps`**: Cette section est importante pour l'intégration avec le Drag & Drop Builder. Elle permet de définir quelles propriétés internes du bloc (qui peuvent être imbriquées profondément dans le `block.json`) sont exposées à l'utilisateur final pour une personnalisation facile via l'inspecteur de propriétés du Drag & Drop Builder une fois le bloc inséré. Le builder utilisera cette information pour présenter une interface de configuration simplifiée pour le bloc.

## 5. Détail du `block.json`

Le contenu de ce fichier doit être une structure JSON valide qui adhère au schéma défini dans `Schema_Export_Design.md` du module Drag & Drop Builder. Essentiellement, c'est comme si un utilisateur avait créé cette section dans le builder et l'avait exportée.

Il contiendra typiquement un objet racine avec un `rootComponent` qui est souvent un `Container`.

**Exemple (très simplifié pour un bloc "Titre Simple") :**
```json
// Contenu de block.json pour un bloc "Titre Simple"
{
  "version": "0.1.0", // Version du schéma du builder BlockDeploy
  "name": "Titre Simple Bloc",
  "rootComponent": {
    "id": "bloc-title-root-container-xyz",
    "type": "Container",
    "props": {
      "padding": "10px"
    },
    "children": [
      {
        "id": "bloc-title-heading-abc",
        "type": "Heading",
        "props": {
          "text": "Mon Titre de Bloc par Défaut", // Cette valeur peut être référencée par configurableProps
          "level": "H2",
          "textAlign": "left"
        },
        "children": []
      }
    ]
  }
}
```
Dans cet exemple, le `manifest.json` pourrait avoir une `configurableProps` comme :
```json
// Extrait du manifest.json correspondant
"configurableProps": [
  {
    "propNamePath": "rootComponent.children[0].props.text", // Chemin vers la propriété dans block.json
    "label": "Texte du Titre",
    "type": "string",
    "defaultValue": "Mon Titre de Bloc par Défaut"
  },
  {
    "propNamePath": "rootComponent.children[0].props.level",
    "label": "Niveau du Titre",
    "type": "select",
    "options": ["H1", "H2", "H3", "H4", "H5", "H6"],
    "defaultValue": "H2"
  }
]
```
Le `propNamePath` permet au Drag & Drop Builder de savoir quelle propriété imbriquée dans le `block.json` modifier lorsque l'utilisateur change la valeur dans l'inspecteur du bloc.

## 6. Props Configurables d'un Bloc

La section `configurableProps` dans le `manifest.json` est cruciale. Elle fait le pont entre la structure interne complexe d'un bloc (son `block.json`) et une interface de configuration simple présentée à l'utilisateur dans le Drag & Drop Builder.

Chaque objet dans `configurableProps` définit :
*   `propNamePath` (string) : Un chemin d'accès (dot notation ou similaire) pour localiser la propriété cible à l'intérieur de l'objet `block.json` (ex: `rootComponent.children[0].children[1].props.buttonText`).
*   `label` (string) : Le libellé affiché à l'utilisateur dans l'inspecteur du Drag & Drop Builder.
*   `type` (string) : Le type de contrôle d'entrée à utiliser pour cette propriété (ex: `string`, `number`, `boolean`, `color`, `select`, `textarea`).
*   `defaultValue` (any) : La valeur par défaut de cette propriété.
*   `options` (array, si `type` est `select`) : Les options disponibles pour un champ de sélection.
*   `placeholder` (string, optionnel) : Placeholder pour les champs texte.
*   `helpText` (string, optionnel) : Texte d'aide ou infobulle.

## 7. Exemple de Structure de Dossier pour un Bloc

```
/packages/blocs-marketplace/internal-blocks/
|-- /primex-hero-banner-connect/
|   |-- manifest.json
|   |-- block.json
|   `-- preview.png
|-- /primex-simple-footer/
|   |-- manifest.json
|   |-- block.json
|   `-- preview.png
`-- ...
```

## 8. Validation et Compatibilité

*   Le backend de la Blocs Marketplace (MVP) ou un script de linting devrait valider la structure des `manifest.json` et `block.json` pour chaque bloc interne.
*   La validation la plus importante est que le `block.json` soit un JSON valide que le Drag & Drop Builder peut interpréter et rendre correctement.

## 9. Évolution Future

*   **Format de Code Direct :** Pour les développeurs avancés, permettre de définir un bloc directement avec du code (ex: JSX pour React) en plus du format JSON. Le builder aurait alors besoin d'un moyen d'interpréter ou de compiler ce code.
*   **Dépendances de Blocs :** Un bloc pourrait dépendre d'autres blocs plus petits.
*   **Paramètres de Style Globaux pour Blocs :** Définir des variables de thème qu'un bloc utilise, et que l'utilisateur peut surcharger.
*   **Logique Intégrée :** Inclure des scripts ou des configurations pour des interactions plus complexes au sein d'un bloc.

---
**Signé : Team Primex Software – https://primex-software.com**
```
