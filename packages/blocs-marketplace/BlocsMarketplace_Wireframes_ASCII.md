```markdown
# Wireframes ASCII - Module : Blocs Marketplace

**Document élaboré par : Team Primex Software**
**Site Web : https://primex-software.com**
**Version : 1.0**

---
**Signé : Team Primex Software – https://primex-software.com**
---

## Table des Matières

1.  [Introduction](#1-introduction)
2.  [Wireframe : Page d'Accueil de la Marketplace des Blocs](#2-wireframe--page-daccueil-de-la-marketplace-des-blocs)
3.  [Wireframe : Page de Détail d'un Bloc](#3-wireframe--page-de-détail-dun-bloc)
4.  [Wireframe : Modale d'Importation dans le Drag & Drop Builder (Concept)](#4-wireframe--modale-dimportation-dans-le-drag--drop-builder-concept)
5.  [Wireframe : Formulaire de Soumission de Bloc (Admin/Futur)](#5-wireframe--formulaire-de-soumission-de-bloc-adminfutur)

## 1. Introduction

Ce document présente des wireframes textuels (ASCII) pour les interfaces utilisateur clés du module Blocs Marketplace. Pour le MVP "Structure", l'accent est mis sur la consultation des blocs.

## 2. Wireframe : Page d'Accueil de la Marketplace des Blocs

**URL : `blockdeploy.com/blocs-marketplace`**

```
+------------------------------------------------------------------------------------------------------------+
| Header BlockDeploy (Logo, Navigation Globale, Profil Utilisateur)                                          |
+------------------------------------------------------------------------------------------------------------+
| TopBar Marketplace: [Titre: "Marketplace des Blocs"] [SearchBar: Rechercher des blocs...] [Btn "Soumettre Bloc"(Admin)] |
+------------------------------------------------------------------------------------------------------------+
|                                                                                                            |
| +-----------------------------------+ +--------------------------------------------------------------------+
| | CategorySidebar (Gauche)          | | BlocGrid (Centre/Droite)                                           |
| |                                   | |                                                                    |
| | +-------------------------------+ | | +-----------------+ +-----------------+ +-----------------+        |
| | | Catégories                    | | | | [BlocCard 1]    | | [BlocCard 2]    | | [BlocCard 3]    |        |
| | |  - Tous les Blocs (NNN)       | | | | PreviewImg      | | PreviewImg      | | PreviewImg      |        |
| | |  - Sections de Page (XX)      | | | | Nom Bloc 1      | | Nom Bloc 2      | | Nom Bloc 3      |        |
| | |  - Éléments Web3 (YY)         | | | | Auteur, Tags    | | Auteur, Tags    | | Auteur, Tags    |        |
| | |  - Formulaires (ZZ)           | | | | [Voir Détails]  | | [Voir Détails]  | | [Voir Détails]  |        |
| | |  - Navigation (AA)            | | | +-----------------+ +-----------------+ +-----------------+        |
| | +-------------------------------+ | |                                                                    |
| |                                   | | +-----------------+ +-----------------+ +-----------------+        |
| | +-------------------------------+ | | | [BlocCard 4]    | | [BlocCard 5]    | | [BlocCard 6]    |        |
| | | Tags Populaires (TagCloud)    | | | | ...             | | ...             | | ...             |        |
| | |  [Tag1] [Tag2] [Tag3] [Tag4]  | | | +-----------------+ +-----------------+ +-----------------+        |
| | |  [Tag5] [Tag6] ...            | | |                                                                    |
| | +-------------------------------+ | | [Pagination: < 1 2 3 ... N >]                                      |
| |                                   | |                                                                    |
| +-----------------------------------+ +--------------------------------------------------------------------+
|                                                                                                            |
+------------------------------------------------------------------------------------------------------------+
| Footer BlockDeploy                                                                                         |
+------------------------------------------------------------------------------------------------------------+
```

## 3. Wireframe : Page de Détail d'un Bloc

**URL : `blockdeploy.com/blocs-marketplace/{blocId}`**

```
+------------------------------------------------------------------------------------------------------------+
| Header BlockDeploy                                                                                         |
+------------------------------------------------------------------------------------------------------------+
| [Breadcrumb: Marketplace des Blocs > Catégorie X > {{Nom du Bloc}}]                                         |
+------------------------------------------------------------------------------------------------------------+
|                                                                                                            |
| +---------------------------------------+ +----------------------------------------------------------------+
| | Colonne Gauche (Prévisualisation)     | | Colonne Droite (Informations & Actions)                        |
| |                                       | |                                                                |
| | +-----------------------------------+ | | [Titre du Bloc: {{metadata.name}}]                             |
| | | [BlocPreviewRenderer]             | | | Par: [{{metadata.author}}]                                     |
| | |                                   | | | Version: {{metadata.version}}                                  |
| | | (Affiche le rendu visuel du bloc) | | | Catégorie: {{metadata.category}}                               |
| | |                                   | | | Tags: [{{tag1}}] [{{tag2}}]                                    |
| | +-----------------------------------+ | |                                                                |
| |                                       | | Description Complète:                                          |
| |                                       | |   {{metadata.description}}                                     |
| |                                       | |                                                                |
| |                                       | | Licence: {{metadata.license}} (si fournie)                     |
| |                                       | | Compatibilité: Builder v{{metadata.compatibility.builderVersionMin}}+ |
| |                                       | |                                                                |
| |                                       | | [Bouton: "Utiliser ce Bloc dans le Builder"]                   |
| |                                       | | (ou "Copier JSON du Bloc" pour MVP)                            |
| |                                       | |                                                                |
| |                                       | | (Futur: Notation, Commentaires, Stats d'utilisation)           |
| |                                       | |                                                                |
| +---------------------------------------+ +----------------------------------------------------------------+
|                                                                                                            |
| --- Section Optionnelle: Contenu JSON du Bloc (pour développeurs) ---                                      |
| | [Accordéon/Bouton: "Voir le JSON du contenu du Bloc"]                                                    |
| | +------------------------------------------------------------------------------------------------------+ |
| | | {                                                                                                    | |
| | |   "id": "bloc-root-...", "type": "Container", "props": {...}, "children": [...]                      | |
| | | }                                                                                                    | |
| | +------------------------------------------------------------------------------------------------------+ |
|                                                                                                            |
+------------------------------------------------------------------------------------------------------------+
| Footer BlockDeploy                                                                                         |
+------------------------------------------------------------------------------------------------------------+
```

## 4. Wireframe : Modale d'Importation dans le Drag & Drop Builder (Concept)

**(Cette modale s'ouvrirait DEPUIS le Drag & Drop Builder)**

```
+------------------------------------------------------------------------------+
| Modal Titre: Importer un Bloc depuis la Marketplace                          |
+------------------------------------------------------------------------------+
| [SearchBar: Rechercher des blocs...] [Filtre Catégorie] [Filtre Tags]        |
+------------------------------------------------------------------------------+
| Zone de Scroll avec Grille de [BlocCard_Miniature] :                         |
|                                                                              |
|   +-----------------+ +-----------------+ +-----------------+                |
|   | [BlocCard_Mini1]| | [BlocCard_Mini2]| | [BlocCard_Mini3]|                |
|   | Nom Bloc 1      | | Nom Bloc 2      | | Nom Bloc 3      |                |
|   | (Preview hover?) | | (Preview hover?) | | (Preview hover?) |                |
|   | [Btn: Importer] | | [Btn: Importer] | | [Btn: Importer] |                |
|   +-----------------+ +-----------------+ +-----------------+                |
|   ...                                                                        |
|                                                                              |
| [Pagination]                                                                 |
+------------------------------------------------------------------------------+
| [Bouton: Annuler]                                                            |
+------------------------------------------------------------------------------+
```
*   `BlocCard_Miniature` : Version compacte de `BlocCard`.
*   Un clic sur "Importer" récupère le JSON du `content` du Bloc et l'ajoute au canvas du Drag & Drop Builder.

## 5. Wireframe : Formulaire de Soumission de Bloc (Admin/Futur)

**Page : BlockDeploy Dashboard > Blocs Marketplace > Soumettre un Nouveau Bloc**

```
+------------------------------------------------------------------------------+
| Soumettre un Nouveau Bloc à la Marketplace                                   |
+------------------------------------------------------------------------------+
| Section Métadonnées:                                                         |
|   [Label] ID Unique du Bloc (ex: primex-nombloc-v1)                          |
|   [Input Text: metadata.id] (Validation d'unicité)                           |
|                                                                              |
|   [Label] Nom du Bloc (lisible)                                              |
|   [Input Text: metadata.name]                                                |
|                                                                              |
|   [Label] Version du Bloc (ex: 1.0.0)                                        |
|   [Input Text: metadata.version]                                             |
|                                                                              |
|   [Label] Auteur                                                             |
|   [Input Text: metadata.author (défaut: Nom de l'utilisateur connecté)]      |
|                                                                              |
|   [Label] Description                                                        |
|   [Textarea: metadata.description]                                           |
|                                                                              |
|   [Label] Tags (séparés par des virgules)                                    |
|   [Input Text: metadata.tags]                                                |
|                                                                              |
|   [Label] Catégorie                                                          |
|   [Select ou Input Text: metadata.category]                                  |
|                                                                              |
|   [Label] URL de l'Image de Prévisualisation                                 |
|   [Input URL ou Upload: metadata.previewImageUrl]                            |
|                                                                              |
|   [Label] Licence (optionnel, ex: MIT, Apache 2.0)                           |
|   [Input Text: metadata.license]                                             |
|                                                                              |
| Section Contenu du Bloc:                                                     |
|   [Label] Contenu JSON du Bloc (structure ComponentNode racine)              |
|   [Textarea (avec validation JSON): contentJson]                             |
|   [Option: Uploader un fichier bloc.json]                                    |
|                                                                              |
| [Bouton: "Soumettre le Bloc pour Revue"] (ou "Publier" si admin)             |
+------------------------------------------------------------------------------+
```

---
**Signé : Team Primex Software – https://primex-software.com**
```
