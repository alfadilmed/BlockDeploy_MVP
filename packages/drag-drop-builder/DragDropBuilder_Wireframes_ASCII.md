```markdown
# Wireframes ASCII - Module : Drag & Drop Builder

**Document élaboré par : Team Primex Software**
**Site Web : https://primex-software.com**
**Version : 1.0**

---
**Signé : Team Primex Software – https://primex-software.com**
---

## Table des Matières

1.  [Introduction](#1-introduction)
2.  [Wireframe : Interface Principale de l'Éditeur](#2-wireframe--interface-principale-de-léditeur)
3.  [Flux Utilisateur : Création d'une Page Simple](#3-flux-utilisateur--création-dune-page-simple)

## 1. Introduction

Ce document présente un wireframe textuel (ASCII) pour l'interface utilisateur principale du Drag & Drop Builder. Il illustre la disposition des panneaux clés et le flux général de création.

## 2. Wireframe : Interface Principale de l'Éditeur

```
+----------------------------------------------------------------------------------------------------------------------+
| TopBar                                                                                                               |
| [Logo BlockDeploy Builder] [Nom du Design: "Ma Page Web3"] [Undo] [Redo] [Save Local] [Load Local] [Export JSON]      |
+----------------------------------------------------------------------------------------------------------------------+
|                                                                                                                      |
| +---------------------------------+ +----------------------------------------------------+ +-----------------------+ |
| | ComponentPalette (Gauche)       | | DroppableCanvas (Centre)                           | | PropertyInspector (Droit)|
| |                                 | |                                                    | | (Contextuel)          |
| | +-----------------------------+ | | +------------------------------------------------+ | |                       |
| | | Section: Layout             | | | | [Glissez et déposez les composants ici]        | | | --- Si Aucun Sélectionné --- |
| | |  - [PaletteItem: Container] | | | |                                                | | | [Message: "Sélectionnez |
| | |  - [PaletteItem: Grid]      | | | |                                                | | |  un composant pour     |
| | +-----------------------------+ | | |                                                | | |  éditer ses propriétés."] |
| | | Section: Éléments de Base   | | | |  +------------------------------------------+  | | |                       |
| | |  - [PaletteItem: Titre]     | | | |  | CanvasNode: Titre (Sélectionné)            |  | | --- Si Titre Sélectionné --- |
| | |  - [PaletteItem: Texte]     | | | |  |  Texte: "Bienvenue !"                    |  | | [Label] Contenu Texte |
| | |  - [PaletteItem: Image]     | | | |  +------------------------------------------+  | | | [Input: "Bienvenue !"]|
| | |  - [PaletteItem: Bouton]    | | | |                                                | | | [Label] Niveau        |
| | |  - [PaletteItem: Lien]      | | | |  +------------------------------------------+  | | | [Select: H1/H2/H3..]  |
| | |  - [PaletteItem: Séparateur]| | | |  | CanvasNode: Bouton Connecter Wallet        |  | | [Label] Alignement    |
| | +-----------------------------+ | | |  |  Texte: "Connecter Wallet"               |  | | [Select: Gauche/Centre]|
| | | Section: Web3               | | | |  +------------------------------------------+  | | | [Label] Couleur Texte |
| | |  - [PaletteItem: Btn Wallet]| | | |                                                | | | [ColorPicker]         |
| | |  - [PaletteItem: Adresse]   | | | |                                                | | | ...                   |
| | |  - [PaletteItem: Solde]     | | | |                                                | | | [Label] Marge Haut    |
| | |  - [PaletteItem: Btn SC]    | | | |                                                | | | [Input Number: 0]px   |
| | |  - [PaletteItem: Lecteur SC]| | | |                                                | | | ...                   |
| | +-----------------------------+ | | |                                                | | | [Bouton: Supprimer Composant] |
| | | ... (scrollable) ...        | | | +------------------------------------------------+ | |                       |
| |                                 | |                                                    | |                       |
| +---------------------------------+ +----------------------------------------------------+ +-----------------------+ |
|                                                                                                                      |
+----------------------------------------------------------------------------------------------------------------------+
| StatusBar (Optionnel MVP)                                                                                            |
| [Info: Zoom Level] [Info: Nombre de composants] [Info: Dern. sauvegarde locale: HH:MM:SS]                            |
+----------------------------------------------------------------------------------------------------------------------+
```

**Description des Zones :**

*   **`TopBar` :**
    *   Affiche le nom du design en cours (modifiable par clic).
    *   Contient les actions principales : Annuler/Rétablir (Futur MVP), Sauvegarder localement, Charger depuis local, Exporter le design en JSON.
*   **`ComponentPalette` (Barre Latérale Gauche) :**
    *   Liste les composants disponibles, groupés par catégories (Layout, Éléments de Base, Web3, etc.).
    *   Chaque `PaletteItem` est draggable. Un clic simple pourrait afficher une infobulle avec la description du composant.
*   **`DroppableCanvas` (Zone Centrale) :**
    *   La surface principale où les composants sont déposés et visualisés tels qu'ils apparaîtront.
    *   Affiche un message d'invite si le canvas est vide.
    *   Les `CanvasNode` (composants déposés) peuvent être sélectionnés en cliquant dessus. Un composant sélectionné est visuellement mis en évidence (ex: bordure bleue).
    *   Le contenu des `CanvasNode` reflète leurs propriétés actuelles.
*   **`PropertyInspector` (Barre Latérale Droite) :**
    *   Contextuel : Affiche les propriétés du `CanvasNode` actuellement sélectionné.
    *   Si aucun composant n'est sélectionné, il peut afficher des propriétés globales de la page/du design ou un message d'invite.
    *   Chaque propriété est modifiable via un contrôle d'entrée approprié (`Input Text`, `Select`, `ColorPicker`, `Textarea` pour l'ABI ou les arguments JSON, etc.).
    *   Un bouton "Supprimer le Composant" est disponible pour le composant sélectionné.
*   **`StatusBar` (Optionnel MVP) :**
    *   Peut afficher des informations contextuelles comme le niveau de zoom (futur), le nombre total de composants sur le canvas, ou le statut de la dernière sauvegarde locale.

## 3. Flux Utilisateur : Création d'une Page Simple

1.  **Accès à l'Éditeur :** L'utilisateur ouvre le Drag & Drop Builder. Un canvas vide est présenté, ou le dernier design sauvegardé localement est chargé.
2.  **Glisser un Composant :**
    *   L'utilisateur trouve un composant "Conteneur" dans la `ComponentPalette`.
    *   Il clique et maintient le clic sur "Conteneur", puis le glisse vers le `DroppableCanvas`.
    *   Il relâche le bouton de la souris. Un nouveau `CanvasNode` de type "Conteneur" apparaît sur le canvas.
3.  **Sélectionner et Paramétrer le Conteneur :**
    *   L'utilisateur clique sur le "Conteneur" sur le canvas. Il est mis en évidence.
    *   Le `PropertyInspector` se met à jour pour afficher les propriétés du Conteneur (ex: `backgroundColor`, `padding`).
    *   L'utilisateur modifie le `padding` à "20px" et la `backgroundColor` en `#EEEEEE`. Les changements sont reflétés en temps réel sur le `CanvasNode` du Conteneur.
4.  **Ajouter un Titre dans le Conteneur :**
    *   L'utilisateur glisse un composant "Titre" depuis la `ComponentPalette` et le dépose *à l'intérieur* du "Conteneur" sur le canvas.
    *   Un nouveau `CanvasNode` de type "Titre" apparaît à l'intérieur du Conteneur.
5.  **Paramétrer le Titre :**
    *   L'utilisateur sélectionne le "Titre".
    *   Dans l'`PropertyInspector`, il change la propriété `text` en "Ma Première Page Web3".
    *   Il change `level` en "H1" et `textAlign` en "center".
6.  **Ajouter un Bouton de Connexion Wallet :**
    *   L'utilisateur glisse un "Bouton Connect Wallet" depuis la section "Web3" de la palette, sous le Titre (mais toujours dans le Conteneur principal).
    *   Il sélectionne le bouton et, dans l'inspecteur, change `disconnectedText` en "Se Connecter avec mon Wallet".
7.  **Sauvegarder Localement :**
    *   L'utilisateur clique sur "Sauvegarder Localement" dans la `TopBar`. Le design actuel est sauvegardé dans le `localStorage` de son navigateur.
8.  **Exporter en JSON :**
    *   L'utilisateur clique sur "Exporter en JSON". Un fichier `.json` contenant la structure de sa page (comme défini dans `Schema_Export_Design.md`) est téléchargé.
9.  **(Session suivante) Charger Localement :**
    *   L'utilisateur revient plus tard. Il clique sur "Charger Localement". Une liste de ses designs sauvegardés localement s'affiche (MVP: charge le dernier design par défaut). Il sélectionne son design, et le canvas est restauré.

---
**Signé : Team Primex Software – https://primex-software.com**
```
