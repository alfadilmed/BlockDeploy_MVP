```markdown
# Composants Frontend Clés de l'Éditeur - Module : Drag & Drop Builder

**Document élaboré par : Team Primex Software**
**Site Web : https://primex-software.com**
**Version : 1.0**

---
**Signé : Team Primex Software – https://primex-software.com**
---

## Table des Matières

1.  [Introduction](#1-introduction)
2.  [Composants Principaux de l'Éditeur (MVP)](#2-composants-principaux-de-léditeur-mvp)
    *   [2.1 `BuilderLayout`](#21-builderlayout)
    *   [2.2 `TopBar`](#22-topbar)
    *   [2.3 `ComponentPalette`](#23-componentpalette)
    *   [2.4 `PaletteItem`](#24-paletteitem)
    *   [2.5 `DroppableCanvas`](#25-droppablecanvas)
    *   [2.6 `CanvasNode`](#26-canvasnode)
    *   [2.7 `PropertyInspector`](#27-propertyinspector)
    *   [2.8 `PropertyField`](#28-propertyfield)
3.  [Gestion de l'État de l'Éditeur](#3-gestion-de-létat-de-léditeur)
4.  [Interactions Clés](#4-interactions-clés)

## 1. Introduction

Ce document décrit les composants React (ou équivalent) majeurs qui constituent l'interface de l'éditeur Drag & Drop Builder lui-même. Ces composants sont responsables de fournir l'expérience de construction visuelle à l'utilisateur.

Ils seront situés dans `packages/drag-drop-builder/frontend/src/components/` (ou une structure similaire).

## 2. Composants Principaux de l'Éditeur (MVP)

### 2.1 `BuilderLayout`

*   **Description :** Le composant racine qui structure l'ensemble de l'interface de l'éditeur.
*   **Contient :** `TopBar`, `ComponentPalette` (barre latérale gauche), `DroppableCanvas` (zone centrale), `PropertyInspector` (barre latérale droite).
*   **Responsabilités :** Gère la disposition générale des trois zones principales. Pourrait gérer l'état global de l'éditeur (via Contexte ou un store) ou déléguer à un hook/service de plus haut niveau.

### 2.2 `TopBar`

*   **Description :** Barre supérieure de l'éditeur.
*   **Contient :**
    *   Nom du design actuel (modifiable).
    *   Boutons d'action : "Nouveau Design", "Sauvegarder Localement", "Charger Localement", "Exporter en JSON".
    *   (Futur) Boutons : "Prévisualiser", "Déployer", "Sauvegarder sur le Cloud".
    *   (Optionnel MVP) Indicateur de statut de sauvegarde.
*   **Interactions :** Déclenche les actions de sauvegarde, chargement, exportation.

### 2.3 `ComponentPalette`

*   **Description :** Barre latérale (généralement à gauche) affichant tous les composants disponibles que l'utilisateur peut glisser sur le canvas.
*   **Contient :** Une liste de `PaletteItem`, potentiellement groupés par catégories (ex: "Layout", "Texte", "Média", "Web3").
*   **Props :** `availableComponents` (tableau d'objets décrivant chaque composant de la palette, cf. `Palette_Components.md`).
*   **Logique :** Chaque item est un élément draggable (source de D&D).

### 2.4 `PaletteItem`

*   **Description :** Représente un seul composant dans la `ComponentPalette`.
*   **Contient :** Icône (optionnelle), nom du composant (ex: "Titre", "Bouton Wallet").
*   **Props :** `componentType` (string, ex: "Heading"), `componentName` (string, ex: "Titre Principal"), `icon` (optionnel).
*   **Logique :** Est la source pour une opération de Drag & Drop. Lorsqu'il est déposé sur le canvas, il fournit le `componentType` pour créer un nouveau `CanvasNode`.

### 2.5 `DroppableCanvas`

*   **Description :** La zone principale de l'éditeur où les utilisateurs déposent et arrangent les composants pour construire leur page.
*   **Contient :** Une représentation visuelle de l'arborescence des composants de la page actuelle. Chaque composant visible sur le canvas est une instance de `CanvasNode`.
*   **Logique :**
    *   Est une cible de D&D (drop target) : accepte les `PaletteItem` de la palette.
    *   Lorsqu'un item est déposé, un nouveau nœud de composant est ajouté à l'état de la page (avec des props par défaut).
    *   Gère le rendu récursif des `CanvasNode` pour afficher la page en cours de construction.
    *   Permet la sélection des `CanvasNode` (pour afficher leurs propriétés dans l'inspecteur).
    *   Permet le réarrangement des `CanvasNode` (D&D au sein du canvas - plus avancé, MVP pourrait être un simple ajout/suppression dans des conteneurs).

### 2.6 `CanvasNode` (ou `RenderedComponentWrapper`)

*   **Description :** Un composant wrapper qui englobe chaque instance de composant réel (ex: un vrai `<button>`, une vraie `<img>`) sur le canvas. Ce wrapper ajoute des fonctionnalités spécifiques à l'éditeur.
*   **Contient :** Le composant utilisateur réel (ex: un `TextParagraph` avec le texte "Bonjour").
*   **Props :** `nodeData` (l'objet `ComponentNode` du store contenant `id`, `type`, `props`, `children`), `isSelected` (boolean), `path` (chemin dans l'arborescence pour la sélection/modification).
*   **Responsabilités :**
    *   Rendre le composant utilisateur final en fonction de `nodeData.type` et `nodeData.props`.
    *   Gérer la sélection : au clic, se marque comme sélectionné et informe l'état global pour que l'`PropertyInspector` se mette à jour.
    *   Afficher des indicateurs visuels si sélectionné (ex: une bordure).
    *   (Futur) Gérer les poignées de redimensionnement ou de D&D pour le réarrangement.
    *   (Futur) Afficher un menu contextuel (supprimer, dupliquer).
    *   Si c'est un conteneur (`Container`, `SimpleGrid`), il agit aussi comme une drop target pour y imbriquer d'autres composants.

### 2.7 `PropertyInspector`

*   **Description :** Barre latérale (généralement à droite) qui affiche les propriétés configurables du `CanvasNode` actuellement sélectionné sur le canvas.
*   **Contient :** Une liste de `PropertyField` générée dynamiquement en fonction du type et des props configurables du composant sélectionné.
*   **Props :** `selectedNodeData` (l'objet `ComponentNode` du composant sélectionné).
*   **Logique :**
    *   Si aucun composant n'est sélectionné, affiche un message ou les propriétés globales de la page.
    *   Pour le composant sélectionné, itère sur ses `props` définies (et les styles communs) et affiche un `PropertyField` approprié pour chacun.
    *   Lorsque la valeur d'un `PropertyField` change, met à jour l'état global du composant sélectionné.

### 2.8 `PropertyField`

*   **Description :** Un composant générique pour afficher et modifier une propriété unique dans l'`PropertyInspector`.
*   **Contient :** Un label pour la propriété et un contrôle d'entrée approprié (input text, select, color picker, textarea, switch, etc.).
*   **Props :** `propertyName` (string), `propertyLabel` (string), `currentValue`, `propertyType` (ex: "text", "color", "number", "boolean", "select", "json"), `options` (si `propertyType` est "select"), `onChange` (fonction callback pour mettre à jour la valeur).
*   **Exemple :** Pour une prop `text` d'un composant `Heading`, ce serait un `Input Text`. Pour `backgroundColor`, un `Color Picker`. Pour `functionArgs` d'un `SmartContractButton`, un `Textarea` ou une interface plus structurée pour un tableau.

## 3. Gestion de l'État de l'Éditeur

Un store central (Zustand, Redux, ou Contexte React avec `useReducer`) sera nécessaire pour gérer :
*   **`pageStructure` :** L'arborescence des `ComponentNode` qui représente la page en cours de construction. C'est la source de vérité pour le rendu du canvas et l'exportation JSON.
*   **`selectedNodeId` :** L'ID du `CanvasNode` actuellement sélectionné, pour l'`PropertyInspector`.
*   **`history` :** (Futur) Un historique des états pour permettre les actions Annuler/Rétablir.
*   **`clipboard` :** (Futur) Pour copier/coller des composants.

**Actions typiques sur le store :**
*   `ADD_COMPONENT(componentType, parentId, index)`
*   `REMOVE_COMPONENT(nodeId)`
*   `UPDATE_COMPONENT_PROPS(nodeId, newProps)`
*   `MOVE_COMPONENT(nodeId, newParentId, newIndex)` (Futur)
*   `SET_SELECTED_NODE(nodeId)`
*   `LOAD_DESIGN(jsonStructure)`
*   `CLEAR_DESIGN()`

## 4. Interactions Clés

*   **Drag de la Palette vers le Canvas :** `PaletteItem` (source D&D) -> `DroppableCanvas` (cible D&D) -> Action `ADD_COMPONENT` sur le store.
*   **Sélection d'un Composant :** Clic sur un `CanvasNode` -> Action `SET_SELECTED_NODE` sur le store -> `PropertyInspector` se met à jour.
*   **Modification d'une Propriété :** Changement dans un `PropertyField` de l'`PropertyInspector` -> Action `UPDATE_COMPONENT_PROPS` sur le store -> `CanvasNode` se re-rend avec les nouvelles props.
*   **Exportation :** Bouton dans `TopBar` -> Lit `pageStructure` du store -> Convertit en JSON formaté -> Propose le téléchargement.

---
**Signé : Team Primex Software – https://primex-software.com**
```
