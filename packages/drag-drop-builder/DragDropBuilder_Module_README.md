```markdown
# Module : Drag & Drop Builder (M4.1)

**Document élaboré par : Team Primex Software**
**Site Web : https://primex-software.com**
**Version du Module : 0.1.0 (MVP)**

---
**Signé : Team Primex Software – https://primex-software.com**
---

## Table des Matières

1.  [Description et Objectifs](#1-description-et-objectifs)
    *   [1.1 Cas d'Usage](#11-cas-dusage)
2.  [Fonctionnalités Clés (MVP)](#2-fonctionnalités-clés-mvp)
3.  [Stack Technique Envisagé](#3-stack-technique-envisagé)
4.  [Architecture Générale](#4-architecture-générale)
    *   [4.1 Frontend (Éditeur)](#41-frontend-éditeur)
    *   [4.2 Backend (Optionnel pour MVP - Sauvegarde/Chargement)](#42-backend-optionnel-pour-mvp---sauvegardechargement)
    *   [4.3 Logique de Rendu des Composants sur le Canvas](#43-logique-de-rendu-des-composants-sur-le-canvas)
5.  [Composants de la Palette (Détaillés dans Palette_Components.md)](#5-composants-de-la-palette-détaillés-dans-palette_componentsmd)
6.  [Structure d'Exportation du Design (Détaillée dans Schema_Export_Design.md)](#6-structure-dexportation-du-design-détaillée-dans-schema_export_designmd)
7.  [Composants Frontend Clés de l'Éditeur (Détaillés dans Frontend_Components_DragDropBuilder.md)](#7-composants-frontend-clés-de-léditeur-détaillés-dans-frontend_components_dragdropbuildermd)
8.  [Logique de Sauvegarde et Chargement (MVP)](#8-logique-de-sauvegarde-et-chargement-mvp)
9.  [Wireframes / Flux UI (Détaillés dans DragDropBuilder_Wireframes_ASCII.md)](#9-wireframes--flux-ui-détaillés-dans-dragdropbuilder_wireframes_asciimd)
10. [Dépendances et Intégrations](#10-dépendances-et-intégrations)
11. [Structure du Module (`packages/drag-drop-builder`)](#11-structure-du-module-packagesdrag-drop-builder)
12. [Tests (Stratégie Initiale)](#12-tests-stratégie-initiale)
13. [Considérations Futures (Post-MVP)](#13-considérations-futures-post-mvp)
14. [Contribution](#14-contribution)

## 1. Description et Objectifs

Le module **Drag & Drop Builder** de BlockDeploy est un outil visuel no-code/low-code conçu pour permettre aux utilisateurs de construire des interfaces utilisateur (UI) simples ou des petites applications décentralisées (dApps) Web3 par glisser-déposer de composants. L'objectif est de réduire drastiquement le temps et la complexité nécessaires pour créer des frontends Web3 basiques.

**Objectifs principaux du MVP :**
*   Fournir un éditeur visuel avec une palette de composants UI classiques et Web3 de base.
*   Permettre le glisser-déposer de ces composants sur un canvas d'édition.
*   Permettre la configuration des propriétés de base de chaque composant via un inspecteur.
*   Générer une représentation sérialisée (JSON) du design créé par l'utilisateur.
*   Permettre l'exportation de ce JSON.
*   Permettre la sauvegarde et le chargement du design via le `localStorage` du navigateur pour le MVP.

### 1.1 Cas d'Usage

*   Création rapide de landing pages simples pour des projets Web3.
*   Prototypage d'interfaces pour des dApps plus complexes.
*   Construction de tableaux de bord basiques pour interagir avec des smart contracts.
*   Création de formulaires simples pour soumettre des données à des smart contracts.

## 2. Fonctionnalités Clés (MVP)

*   **Interface d'Édition Visuelle :**
    *   **Palette de Composants :** Liste de composants disponibles (texte, image, bouton, conteneur, connexion wallet, etc.).
    *   **Canvas d'Édition :** Zone principale où les composants sont déposés et arrangés.
    *   **Inspecteur de Propriétés :** Panneau contextuel pour modifier les attributs du composant sélectionné (contenu textuel, URL d'image, couleurs, alignement, paramètres de contrat pour les blocs Web3).
*   **Actions sur les Composants :**
    *   Glisser-déposer depuis la palette vers le canvas.
    *   Sélectionner un composant sur le canvas.
    *   Modifier les propriétés via l'inspecteur.
    *   Réarranger les composants (MVP : ordre simple dans un conteneur vertical, ou grille basique).
    *   Supprimer un composant.
*   **Gestion du Design :**
    *   **Exportation :** Exporter la structure de la page sous forme de fichier JSON.
    *   **Sauvegarde Locale :** Sauvegarder le design en cours dans le `localStorage` du navigateur.
    *   **Chargement Local :** Charger un design précédemment sauvegardé depuis le `localStorage`.
    *   **(Optionnel MVP)** Bouton "Nouveau Design / Réinitialiser".
*   **Composants Disponibles (MVP) :**
    *   Voir `Palette_Components.md` pour la liste détaillée. Inclut des éléments de base comme Texte, Image, Bouton, Conteneur, et des éléments Web3 comme "Connect Wallet" et un bouton d'interaction avec un smart contract (lecture/écriture simple).

## 3. Stack Technique Envisagé

*   **Framework Frontend Principal :** React (avec TypeScript).
*   **Drag & Drop :**
    *   Option 1 : `react-dnd` - Librairie flexible pour construire des logiques de D&D custom. Donne plus de contrôle.
    *   Option 2 : Explorer des librairies existantes de type "page builder" comme GrapesJS et évaluer leur intégrabilité et personnalisation pour les besoins Web3. Pour le MVP, `react-dnd` pourrait être privilégié pour une meilleure intégration avec un state management custom.
*   **Gestion de l'État de l'Éditeur :** Zustand, Redux Toolkit, ou React Context API (selon la complexité). L'état inclura la structure de la page (arborescence des composants et leurs props).
*   **Sérialisation :** Fonctions custom pour convertir l'état de l'éditeur en JSON et vice-versa.

## 4. Architecture Générale

### 4.1 Frontend (Éditeur)

*   **`EditorLayout` :** Le composant principal qui organise la `ComponentPalette`, le `DroppableCanvas`, et le `PropertyInspector`.
*   **`ComponentPalette` :** Affiche les composants disponibles. Chaque item est un `DraggableItem`.
*   **`DroppableCanvas` :** La surface où les `DraggableItem` peuvent être déposés. Gère le rendu de l'arborescence des composants de la page.
*   **`CanvasNode` / `RenderedComponentWrapper` :** Chaque composant sur le canvas est wrappé pour permettre la sélection, la prévisualisation du D&D, et l'accès à l'inspecteur.
*   **`PropertyInspector` :** Affiche dynamiquement les champs de configuration pour le `CanvasNode` sélectionné.
*   **`StateManager` :** Service ou store qui contient l'état actuel de la page (liste des composants, leurs props, leur hiérarchie). Les actions (ajouter, supprimer, modifier un composant) mettent à jour cet état.
*   **`Renderer` :** Logique qui prend l'état actuel de la page et affiche les composants React correspondants sur le canvas.

### 4.2 Backend (Optionnel pour MVP - Sauvegarde/Chargement)

*   Pour le MVP, le backend n'est pas strictement nécessaire pour la fonctionnalité de base. La sauvegarde/chargement se fera via `localStorage`.
*   **Futur :** Un backend (Node.js/Express ou autre) avec une base de données (MongoDB, PostgreSQL) sera nécessaire pour :
    *   Sauvegarde persistante des designs des utilisateurs authentifiés.
    *   Partage de designs.
    *   Gestion des versions de design.
    *   Endpoints API : `POST /api/v1/dd-builder/designs`, `GET /api/v1/dd-builder/designs`, `GET /api/v1/dd-builder/designs/{id}`, `PUT /api/v1/dd-builder/designs/{id}`.

### 4.3 Logique de Rendu des Composants sur le Canvas

*   Le canvas maintient une structure de données (ex: un tableau d'objets, ou un arbre) représentant les composants de la page.
*   Chaque objet dans cette structure contient :
    *   `id`: Un identifiant unique pour le composant sur le canvas.
    *   `type`: Le type de composant (ex: "Text", "Button", "ConnectWalletButton").
    *   `props`: Un objet contenant les propriétés spécifiques à ce composant (ex: `{ "text": "Hello", "color": "blue" }`).
    *   `children`: (Pour les conteneurs) Un tableau d'autres objets composants.
*   Un composant `PageRenderer` parcourt cette structure et utilise un mapping `type -> ReactComponent` pour afficher les composants réels.

## 5. Composants de la Palette (Détaillés dans `Palette_Components.md`)

Voir le document `Palette_Components.md`.

## 6. Structure d'Exportation du Design (Détaillée dans `Schema_Export_Design.md`)

Voir le document `Schema_Export_Design.md`. Le format principal pour le MVP sera JSON.

## 7. Composants Frontend Clés de l'Éditeur (Détaillés dans `Frontend_Components_DragDropBuilder.md`)

Voir le document `Frontend_Components_DragDropBuilder.md`.

## 8. Logique de Sauvegarde et Chargement (MVP)

*   **Sauvegarde :**
    1.  L'état actuel de la page (l'arborescence des composants et leurs props) est sérialisé en une chaîne JSON.
    2.  Cette chaîne JSON est stockée dans le `localStorage` du navigateur sous une clé spécifique (ex: `blockDeployBuilder_currentDesign`).
    3.  (Optionnel MVP) Permettre à l'utilisateur de nommer et sauvegarder plusieurs designs localement (ex: `blockDeployBuilder_design_MyPage1`).
*   **Chargement :**
    1.  Au démarrage de l'éditeur, vérifier si un design existe dans `localStorage`.
    2.  Si oui, le charger, le désérialiser (JSON.parse), et reconstituer l'état de l'éditeur.
    3.  (Optionnel MVP) Fournir une interface pour choisir parmi les designs sauvegardés localement.
*   **Export/Import JSON :**
    *   Export : Convertit l'état en JSON et propose le téléchargement d'un fichier `.json`.
    *   Import : Permet à l'utilisateur d'uploader un fichier `.json` qui est ensuite désérialisé pour restaurer l'état de l'éditeur.

## 9. Wireframes / Flux UI (Détaillés dans `DragDropBuilder_Wireframes_ASCII.md`)

Voir le document `DragDropBuilder_Wireframes_ASCII.md`.

## 10. Dépendances et Intégrations

*   **Internes (BlockDeploy) :**
    *   `@blockdeploy/walletconnect-module` : Utilisé par les composants Web3 (ex: `ConnectWalletButton`) rendus sur le canvas.
    *   `@blockdeploy/ui-components` (Futur) : Pourrait fournir des atomes UI de base pour construire les composants de la palette ou l'éditeur lui-même.
    *   `@blockdeploy/blocs-marketplace` (M4.2 - Futur) : Le builder pourra importer des "Blocs" plus complexes depuis cette marketplace.
*   **Externes :**
    *   `react`, `react-dom`.
    *   `react-dnd` (si option choisie) ou autre librairie de D&D/builder.
    *   `uuid` (pour générer des IDs uniques pour les composants sur le canvas).
    *   `ethers` (ou `viem`) : Nécessaire pour la logique des composants Web3.

## 11. Structure du Module (`packages/drag-drop-builder`)
```
/packages/drag-drop-builder/
|-- /backend/  # Léger ou mock pour MVP, pour futures API de sauvegarde
|   |-- /src/
|   `-- package.json
|-- /frontend/
|   |-- /src/
|   |   |-- /components/           # Composants de l'éditeur (Palette, Canvas, Inspector)
|   |   |-- /dnd-core/             # Logique de Drag & Drop (si react-dnd)
|   |   |-- /renderer/             # Logique pour rendre les composants sur le canvas
|   |   |-- /store/                # Gestion de l'état de l'éditeur (design actuel)
|   |   |-- /palette-items/        # Définitions et previews des composants de la palette
|   |   |-- /exporter/             # Logique d'exportation en JSON
|   |   |-- /hooks/                # Hooks custom pour l'éditeur
|   |   `-- EditorPage.tsx         # Page principale de l'éditeur
|   `-- package.json
|-- /shared/                   # Types et interfaces (ex: structure du JSON de design)
|   `-- package.json
|-- DragDropBuilder_Module_README.md # Ce fichier
|-- Palette_Components.md
|-- Schema_Export_Design.md
|-- Frontend_Components_DragDropBuilder.md
|-- DragDropBuilder_Wireframes_ASCII.md
`-- package.json
```

## 12. Tests (Stratégie Initiale)

*   **Unitaires :**
    *   Tester les réducteurs/actions du store de l'éditeur (ajout, suppression, modification de composants).
    *   Tester la logique de sérialisation/désérialisation JSON.
    *   Tester les composants UI individuels de l'éditeur (Palette, Inspector).
*   **Intégration :**
    *   Tester le flux complet de D&D d'un composant, sa configuration, et sa présence dans l'état.
    *   Tester la sauvegarde/chargement depuis `localStorage`.
    *   Tester l'exportation JSON.
*   **E2E (Futur) :** Simuler la création d'une page simple par un utilisateur.

## 13. Considérations Futures (Post-MVP)

*   **Plus de Composants :** Enrichir la palette avec des composants UI et Web3 plus avancés.
*   **Grille de Layout Avancée :** Support pour des mises en page plus complexes (colonnes responsives, etc.).
*   **Styling Avancé :** Plus d'options de personnalisation du style pour chaque composant.
*   **Exportation en Code :** Générer du code HTML/CSS ou des composants React directement.
*   **Prévisualisation Responsive :** Outils pour voir le design sur différentes tailles d'écran.
*   **Collaboration en Temps Réel (Très avancé).**
*   **Intégration avec le Blocs Marketplace (M4.2) :** Permettre d'importer et d'utiliser des "blocs" (ensembles de composants pré-configurés) depuis une marketplace.
*   **Déploiement Direct :** Option pour déployer la page générée sur des plateformes comme Vercel/Netlify ou IPFS.

## 14. Contribution

*   Suivre les conventions de BlockDeploy.
*   Focus sur la maintenabilité de la logique de l'état de l'éditeur.
*   Assurer que les nouveaux composants de palette sont bien testables et configurables.

Le Drag & Drop Builder est une fonctionnalité centrale de BlockDeploy, accessible via la plateforme `https://app.blockdeploy.io`.
Le développement local se fait en lançant le frontend de la plateforme principale qui intègre cet éditeur.

---
**Signé : Team Primex Software – https://primex-software.com**
```
