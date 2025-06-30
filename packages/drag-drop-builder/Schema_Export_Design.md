```markdown
# Schéma d'Exportation du Design - Module : Drag & Drop Builder (MVP)

**Document élaboré par : Team Primex Software**
**Site Web : https://primex-software.com**
**Version : 1.0**

---
**Signé : Team Primex Software – https://primex-software.com**
---

## Table des Matières

1.  [Introduction](#1-introduction)
2.  [Objectifs du Schéma d'Exportation](#2-objectifs-du-schéma-dexportation)
3.  [Format Principal (MVP) : JSON](#3-format-principal-mvp--json)
4.  [Structure Globale du JSON](#4-structure-globale-du-json)
5.  [Structure d'un Nœud de Composant (`ComponentNode`)](#5-structure-dun-nœud-de-composant-componentnode)
6.  [Exemple de Schéma JSON pour une Page Simple](#6-exemple-de-schéma-json-pour-une-page-simple)
7.  [Considérations pour les Propriétés des Composants (`props`)](#7-considérations-pour-les-propriétés-des-composants-props)
    *   [7.1 Styles CSS de Base](#71-styles-css-de-base)
    *   [7.2 Propriétés Spécifiques aux Composants Web3](#72-propriétés-spécifiques-aux-composants-web3)
8.  [Évolution Future du Schéma](#8-évolution-future-du-schéma)
    *   [8.1 Exportation HTML/CSS](#81-exportation-htmlcss)
    *   [8.2 Exportation en Composants React/Vue](#82-exportation-en-composants-reactvue)
    *   [8.3 Gestion des Thèmes et Styles Globaux](#83-gestion-des-thèmes-et-styles-globaux)

## 1. Introduction

Ce document définit la structure et le format des données exportées par le Drag & Drop Builder. Pour le MVP, le format principal sera JSON. Ce schéma JSON doit représenter de manière exhaustive la page ou l'interface conçue par l'utilisateur, y compris l'arborescence des composants, leurs propriétés et leurs configurations spécifiques.

## 2. Objectifs du Schéma d'Exportation

*   **Complétude :** Capturer tous les aspects du design créé par l'utilisateur.
*   **Lisibilité :** Être compréhensible par un développeur (et potentiellement par la machine pour l'importation).
*   **Extensibilité :** Pouvoir facilement ajouter de nouveaux types de composants ou de nouvelles propriétés à l'avenir.
*   **Portabilité :** Permettre à un design d'être sauvegardé, partagé, et potentiellement importé dans d'autres instances du builder ou interprété par d'autres outils (futur).
*   **Reconstructibilité :** Le schéma doit permettre de reconstruire fidèlement l'interface visuelle et fonctionnelle à partir du JSON.

## 3. Format Principal (MVP) : JSON

Le JSON est choisi pour sa simplicité, sa lisibilité humaine et sa facilité de parsing par JavaScript.

## 4. Structure Globale du JSON

Le JSON exporté représentera une page ou une section de page. Il aura une structure racine contenant des métadonnées sur le design et un nœud racine pour l'arborescence des composants.

```json
{
  "version": "0.1.0", // Version du schéma du builder BlockDeploy
  "name": "Ma Page Web3 Simple", // Nom donné par l'utilisateur à son design
  "createdAt": "2024-07-27T10:00:00Z",
  "lastModifiedAt": "2024-07-27T11:30:00Z",
  "globalSettings": { // Paramètres globaux de la page (futur)
    "backgroundColor": "#FFFFFF",
    "defaultFont": "Arial"
    // ... autres paramètres de page
  },
  "rootComponent": { // Nœud racine de l'arborescence des composants
    // Structure ComponentNode décrite ci-dessous
  }
}
```

## 5. Structure d'un Nœud de Composant (`ComponentNode`)

Chaque élément visuel sur le canvas sera représenté par un `ComponentNode`. Les nœuds peuvent être imbriqués pour représenter la hiérarchie.

```json
{
  "id": "uuid-1234-abcd-5678", // Identifiant unique du nœud (généré par le builder)
  "type": "Container", // Type de composant (correspond à un composant de la Palette)
  "props": {
    // Propriétés spécifiques au composant 'type'
    // Exemples:
    // Pour un 'Container':
    "backgroundColor": "#F0F0F0",
    "padding": "16px",
    // Pour un 'TextParagraph':
    // "text": "Bonjour le monde!",
    // "textAlign": "center",
    // Pour un 'ConnectWalletButton':
    // "connectedTextPrefix": "Wallet: "
  },
  "children": [ // Tableau de ComponentNode enfants (pour les conteneurs)
    // { ... autre ComponentNode ... },
    // { ... autre ComponentNode ... }
  ]
}
```

*   **`id` (string, obligatoire) :** Un identifiant unique pour ce nœud spécifique dans le design. Utile pour les références internes, la sélection, etc. Généré par le builder (ex: UUID).
*   **`type` (string, obligatoire) :** Le nom du type de composant, tel que défini dans `Palette_Components.md` (ex: "Container", "Heading", "TextParagraph", "Image", "Button", "ConnectWalletButton", "SmartContractButton"). Ce type est utilisé par le moteur de rendu pour savoir quel composant React afficher.
*   **`props` (object, optionnel) :** Un objet contenant toutes les propriétés configurées par l'utilisateur pour ce composant via l'Inspecteur de Propriétés. La structure de `props` dépendra du `type` de composant.
*   **`children` (array, optionnel) :** Un tableau d'autres `ComponentNode` si ce composant est un conteneur (comme `Container` ou `SimpleGrid`). Si le composant ne peut pas avoir d'enfants (ex: `Image`, `Button`), ce tableau sera absent ou vide.

## 6. Exemple de Schéma JSON pour une Page Simple

Voici un exemple pour une page simple avec un titre, un paragraphe, et un bouton de connexion wallet, le tout dans un conteneur principal.

```json
{
  "version": "0.1.0",
  "name": "Page d'Accueil Simple",
  "createdAt": "2024-07-27T14:00:00Z",
  "lastModifiedAt": "2024-07-27T14:15:00Z",
  "globalSettings": {
    "backgroundColor": "#FFFFFF"
  },
  "rootComponent": {
    "id": "root-container-001",
    "type": "Container",
    "props": {
      "padding": "20px",
      "maxWidth": "800px", // Propriété custom pour centrer le contenu
      "margin": "0 auto"
    },
    "children": [
      {
        "id": "heading-002",
        "type": "Heading",
        "props": {
          "text": "Bienvenue sur Ma dApp!",
          "level": "H1",
          "textAlign": "center",
          "color": "#333333"
        },
        "children": [] // Un titre n'a généralement pas d'enfants directs dans ce modèle
      },
      {
        "id": "paragraph-003",
        "type": "TextParagraph",
        "props": {
          "text": "Ceci est une application décentralisée simple construite avec BlockDeploy.",
          "textAlign": "left",
          "fontSize": "16px"
        },
        "children": []
      },
      {
        "id": "connectwallet-004",
        "type": "ConnectWalletButton",
        "props": {
          "disconnectedText": "Connecter mon Wallet",
          "variant": "primary",
          "marginTop": "20px" // Exemple de prop de style commune
        },
        "children": []
      },
      {
        "id": "sc-button-005",
        "type": "SmartContractButton",
        "props": {
            "buttonText": "Lire Message du Contrat",
            "contractAddress": "0x1234567890123456789012345678901234567890",
            "contractABI": "[{\"inputs\":[],\"name\":\"message\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"}]",
            "functionName": "message",
            "functionArgs": [],
            "variant": "secondary",
            "displayResultInAlert": true // Prop custom pour ce composant
        },
        "children": []
      }
    ]
  }
}
```

## 7. Considérations pour les Propriétés des Composants (`props`)

### 7.1 Styles CSS de Base

Les propriétés de style communes (marge, padding, couleur de fond, couleur de texte, taille de police, alignement) seront des champs standards dans l'objet `props` pour la plupart des composants.
Exemple :
```json
"props": {
  "text": "Mon Titre",
  "color": "#FF0000",
  "textAlign": "center",
  "marginTop": "10px",
  "padding": "5px" // Si c'est un conteneur de texte
}
```
Ces styles seront appliqués inline ou via des classes CSS générées dynamiquement par le moteur de rendu.

### 7.2 Propriétés Spécifiques aux Composants Web3

Les composants Web3 auront des `props` supplémentaires pour leur configuration :
*   **`ConnectWalletButton`**: `connectedTextPrefix`, `disconnectedText`.
*   **`UserAddressDisplay`**: `prefixText`, `truncateLength`.
*   **`UserBalanceDisplay`**: `prefixText`, `suffixText`, `precision`, `tokenAddress` (futur, pour soldes ERC20).
*   **`SmartContractButton`**: `contractAddress`, `contractABI` (ou juste signature de fonction pour MVP), `functionName`, `functionArgs` (tableau de valeurs), `payableAmountEth`.
*   **`SmartContractDataReader`**: `contractAddress`, `contractABI`, `functionName`, `functionArgs`, `formattingFunction`.

L'ABI du contrat pour les composants `SmartContractButton` et `SmartContractDataReader` pourrait être une chaîne JSON de l'ABI complet, ou pour le MVP, juste la signature de la fonction spécifique (ex: `"function greet(string message) view returns (string)"`). L'interface utilisateur de l'inspecteur devra faciliter la saisie de ces informations.

## 8. Évolution Future du Schéma

### 8.1 Exportation HTML/CSS

À terme, le builder pourrait générer directement du code HTML statique avec des classes CSS (potentiellement basées sur un framework comme Tailwind CSS si l'éditeur l'utilise en interne pour le rendu). Le schéma JSON actuel servirait alors d'étape intermédiaire (Représentation Intermédiaire).

### 8.2 Exportation en Composants React/Vue

Pour les développeurs, une option d'exportation vers des composants React ou Vue pourrait être envisagée, où chaque `ComponentNode` du JSON serait mappé à un composant JSX/Vue correspondant.

### 8.3 Gestion des Thèmes et Styles Globaux

La section `globalSettings` du JSON pourrait être étendue pour inclure des variables de thème (couleurs primaires/secondaires, polices globales, etc.) qui seraient appliquées à l'ensemble de la page rendue.

---
**Signé : Team Primex Software – https://primex-software.com**
```
