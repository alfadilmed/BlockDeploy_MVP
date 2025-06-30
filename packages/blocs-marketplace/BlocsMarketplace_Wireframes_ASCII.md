```markdown
# Wireframes ASCII - Module : Blocs Marketplace (M5.3 - Fonctionnel)

**Document élaboré par : Team Primex Software**
**Site Web : https://primex-software.com**
**Version : 1.1 (Mise à jour pour M5.3)**

---
**Signé : Team Primex Software – https://primex-software.com**
---

## Table des Matières

1.  [Introduction](#1-introduction)
2.  [Wireframe : Page d'Accueil de la Marketplace (Mise à jour)](#2-wireframe--page-daccueil-de-la-marketplace-mise-à-jour)
3.  [Wireframe : Page de Détail d'un Bloc (Mise à jour)](#3-wireframe--page-de-détail-dun-bloc-mise-à-jour)
4.  [Wireframe : Formulaire de Soumission de Bloc](#4-wireframe--formulaire-de-soumission-de-bloc)
5.  [Wireframe : Interface de Modération des Blocs (Admin)](#5-wireframe--interface-de-modération-des-blocs-admin)
6.  [Wireframe : Modale d'Importation dans le Drag & Drop Builder (Mise à jour)](#6-wireframe--modale-dimportation-dans-le-drag--drop-builder-mise-à-jour)

## 1. Introduction

Ce document met à jour les wireframes textuels (ASCII) pour le module Blocs Marketplace, en intégrant les fonctionnalités de soumission par des tiers (simulée pour l'aspect externe), la modération, et l'interaction avec le Drag & Drop Builder.

## 2. Wireframe : Page d'Accueil de la Marketplace (Mise à jour)

**URL : `blockdeploy.com/blocs-marketplace`**
Le TopBar inclut maintenant un bouton "Soumettre un Bloc" si l'utilisateur est authentifié et a les droits.

```
+------------------------------------------------------------------------------------------------------------+
| Header BlockDeploy (Logo, Navigation Globale, Profil Utilisateur)                                          |
+------------------------------------------------------------------------------------------------------------+
| TopBar Marketplace: [Titre: "Marketplace des Blocs"] [SearchBar] [Btn "Soumettre un Bloc" (si auth/role)]   |
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
| | | ...                           | | | | Licence: Gratuit| | Licence: Payant | | ...             |        |
| | |                               | | | | Prix: --        | | Prix: 5 U(mock) | |                 |        |
| | |                               | | | | [Voir Détails]  | | [Voir Détails]  | | [Voir Détails]  |        |
| | +-------------------------------+ | | +-----------------+ +-----------------+ +-----------------+        |
| | (Reste de la sidebar inchangée)   | | (Pagination inchangée)                                             |
| +-----------------------------------+ +--------------------------------------------------------------------+
|                                                                                                            |
+------------------------------------------------------------------------------------------------------------+
| Footer BlockDeploy                                                                                         |
+------------------------------------------------------------------------------------------------------------+
```

## 3. Wireframe : Page de Détail d'un Bloc (Mise à jour)

**URL : `blockdeploy.com/blocs-marketplace/{blocId}`**
Le bouton d'action principal est contextuel (Gratuit, Payant non acquis, Payant acquis).

```
+------------------------------------------------------------------------------------------------------------+
| Header BlockDeploy                                                                                         |
+------------------------------------------------------------------------------------------------------------+
| [Breadcrumb: Marketplace > Catégorie > {{Nom du Bloc}}]                                                    |
+------------------------------------------------------------------------------------------------------------+
|                                                                                                            |
| +---------------------------------------+ +----------------------------------------------------------------+
| | Colonne Gauche (Prévisualisation)     | | Colonne Droite (Informations & Actions)                        |
| |                                       | |                                                                |
| | +-----------------------------------+ | | [Titre du Bloc: {{metadata.name}}]                             |
| | | [BlocPreviewRenderer]             | | | Par: [{{metadata.author}}]  Version: {{metadata.version}}      |
| | +-----------------------------------+ | | Catégorie: {{metadata.category}} Tags: [tag1] [tag2]           |
| |                                       | |                                                                |
| |                                       | | Description Complète: {{metadata.description}}                 |
| |                                       | |                                                                |
| |                                       | | Licence: {{metadata.licenseType}} ({{metadata.licenseName}})   |
| |                                       | | --- Si metadata.licenseType == "PaidUsage" ---                 |
| |                                       | | Prix: {{metadata.price.amount}} {{metadata.price.currency}}    |
| |                                       | |                                                                |
| |                                       | | --- Bouton d'Action Principal (Contextuel) ---                 |
| |                                       | | [IF Gratuit OU Payant ET Acquis:]                              |
| |                                       | |   [Bouton: "Utiliser ce Bloc dans le Builder"]                 |
| |                                       | | [ELSE IF Payant ET Non Acquis:]                                |
| |                                       | |   [Bouton: "Obtenir pour {{prix}} (Simulé)"] (`AcquireBlocButtonMock`)|
| |                                       | |                                                                |
| |                                       | | (Futur: Notation, Commentaires)                                |
| +---------------------------------------+ +----------------------------------------------------------------+
|                                                                                                            |
+------------------------------------------------------------------------------------------------------------+
| Footer BlockDeploy                                                                                         |
+------------------------------------------------------------------------------------------------------------+
```

## 4. Wireframe : Formulaire de Soumission de Bloc

**URL : `blockdeploy.com/blocs-marketplace/submit` (Nécessite authentification)**

```
+------------------------------------------------------------------------------+
| Header BlockDeploy                                                           |
+------------------------------------------------------------------------------+
| Titre: Soumettre un Nouveau Bloc à la Marketplace                            |
| [Info: "Partagez vos créations avec la communauté BlockDeploy!"]             |
+------------------------------------------------------------------------------+
| Formulaire `BlocSubmissionForm`:                                             |
|                                                                              |
|   Section: Informations sur le Bloc                                          |
|   [Label] Nom du Bloc*                                                       |
|   [Input Text: metadata.name]                                                |
|   [Label] Description du Bloc* (Markdown supporté)                           |
|   [Textarea: metadata.description]                                           |
|   [Label] Catégorie*                                                         |
|   [Select: metadata.category (liste prédéfinie + "Autre")]                   |
|   [Label] Tags (séparés par virgules, max 5)*                                |
|   [Input Text: metadata.tags]                                                |
|   [Label] Version de votre Bloc (ex: 1.0.0)*                                 |
|   [Input Text: metadata.version (semver)]                                    |
|   [Label] URL de l'Image de Prévisualisation (600x400px recommandé)*         |
|   [Input URL: metadata.previewImageUrl] (ou Upload futur)                    |
|                                                                              |
|   Section: Licence et Prix (Simulé)                                          |
|   [Label] Type de Licence*                                                   |
|   [Select: metadata.licenseType (Options: Gratuit, Payant (Usage Unique))]   |
|   --- Si "Gratuit" ---                                                       |
|   | [Label] Nom de la Licence (ex: MIT, CC0)                               |   |
|   | [Input Text: metadata.licenseName]                                     |   |
|   --- Si "Payant (Usage Unique)" ---                                         |
|   | [Label] Prix (Simulé)*                                                 |   |
|   | [Input Number: metadata.price.amount] [Select: metadata.price.currency (USD_MOCK, ETH_MOCK)] |
|                                                                              |
|   Section: Contenu du Bloc                                                   |
|   [Label] Fichier `bloc.json` (contenant metadata & content)*                |
|   [Input File: uploadBlocJson]                                               |
|   [Info: "Assurez-vous que votre JSON est conforme au Bloc Definition Format."]|
|   [Lien vers `Bloc_Definition_Format.md` et `Create_Your_Block.md`]          |
|                                                                              |
|   [Checkbox: "Je confirme que ce bloc est ma création originale..."]*        |
|   [Bouton: "Soumettre pour Validation"] (désactivé si erreurs form)          |
|                                                                              |
|   [Message de statut après soumission: "Bloc soumis avec succès..." ou erreur]|
+------------------------------------------------------------------------------+
| Footer BlockDeploy                                                           |
+------------------------------------------------------------------------------+
```

## 5. Wireframe : Interface de Modération des Blocs (Admin)

**URL : `blockdeploy.com/admin/blocs-marketplace/submissions`**

```
+------------------------------------------------------------------------------+
| Header Admin BlockDeploy                                                     |
+------------------------------------------------------------------------------+
| Titre: Modération des Soumissions de Blocs                                   |
| [Filtres: Statut (En Attente | Approuvé | Rejeté)] [Recherche par Nom/Auteur] |
+------------------------------------------------------------------------------+
| Tableau `AdminModerationQueue`:                                              |
| | ID Soumission | Nom du Bloc        | Auteur       | Statut       | Date Soum. | Actions |
| |---------------|--------------------|--------------|--------------|------------|---------|
| | SUB_XYZ       | Hero Web3          | user123      | En Attente   | JJ/MM/AA   | [Réviser] |
| | SUB_ABC       | Grille de Prix     | dev_jane     | En Attente   | JJ/MM/AA   | [Réviser] |
| | ...           | ...                | ...          | ...          | ...        | ...     |
+------------------------------------------------------------------------------+

--- Modal `AdminBlocReviewModal` (au clic sur "Réviser") ---
| Titre: Révision du Bloc "{{Nom du Bloc}}" (ID: SUB_XYZ)                      |
| +--------------------------------------------------------------------------+ |
| | Métadonnées Soumises:                                                    | |
| |   Nom: Hero Web3, Auteur: user123, Cat: Sections, Tags: hero, web3      | |
| |   Preview: [Lien ou img] Licence: Gratuite (MIT)                         | |
| |   [Lien pour voir/télécharger le JSON `content` soumis]                  | |
| |                                                                          | |
| | Prévisualisation du Bloc (`BlocPreviewRenderer`):                        | |
| |   +------------------------------------------------------------------+   | |
| |   | (Rendu visuel du bloc ici)                                       |   | |
| |   +------------------------------------------------------------------+   | |
| |                                                                          | |
| | Actions de Modération:                                                   | |
| |   [Label] ID Public Final du Bloc (si approbation, ex: primex-hero-web3-v1)| |
| |   [Input Text: finalBlocId (pré-rempli avec metadata.id suggéré)]        | |
| |   [Label] Motif du Rejet (si rejet)                                      | |
| |   [Textarea: rejectionReason]                                            | |
| |   [Label] Notes Internes (optionnel)                                     | |
| |   [Textarea: internalNotes]                                              | |
| |                                                                          | |
| |   [Bouton: "Approuver et Publier"] [Bouton: "Rejeter la Soumission"]      | |
| |   [Bouton: "Annuler"]                                                    | |
| +--------------------------------------------------------------------------+ |
```

## 6. Wireframe : Modale d'Importation dans le Drag & Drop Builder (Mise à jour)

**(S'ouvre depuis le D&D Builder)**
L'interface est similaire à celle définie en M4.2, mais les `BlocCard_Miniature` affichent maintenant l'info de licence/prix.

```
+------------------------------------------------------------------------------+
| Modal Titre: Importer un Bloc depuis la Marketplace                          |
+------------------------------------------------------------------------------+
| [SearchBar] [Filtre Catégorie] [Filtre Tags]                                 |
+------------------------------------------------------------------------------+
| Zone de Scroll avec Grille de [BlocCard_Miniature] :                         |
|                                                                              |
|   +-----------------+ +-----------------+ +-----------------+                |
|   | [BlocCard_Mini1]| | [BlocCard_Mini2]| | [BlocCard_Mini3]|                |
|   | Nom Bloc 1      | | Nom Bloc 2      | | Nom Bloc 3      |                |
|   | Gratuit         | | 5 U(mock)       | | Gratuit         |                |
|   | [Btn: Importer] | | [Btn:Acquire/Imp]| | [Btn: Importer] |                |
|   +-----------------+ +-----------------+ +-----------------+                |
|   ...                                                                        |
+------------------------------------------------------------------------------+
| [Bouton: Annuler]                                                            |
+------------------------------------------------------------------------------+
```
*   Le bouton "Acquire/Imp" pour un bloc payant :
    *   Si non "acquis" : Affiche "Obtenir (5 U_MOCK)". Au clic, simule l'acquisition et change en "Importer".
    *   Si déjà "acquis" : Affiche "Importer".

---
**Signé : Team Primex Software – https://primex-software.com**
```
