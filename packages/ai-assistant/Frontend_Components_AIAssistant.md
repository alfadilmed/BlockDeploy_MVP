```markdown
# Composants Frontend Clés - Module : AI Assistant

**Document élaboré par : Team Primex Software**
**Site Web : https://primex-software.com**
**Version : 1.0**

---
**Signé : Team Primex Software – https://primex-software.com**
---

## Table des Matières

1.  [Introduction](#1-introduction)
2.  [Composants Principaux (Beta MVP)](#2-composants-principaux-beta-mvp)
    *   [2.1 `AIAssistantWidget`](#21-aiassistantwidget-ou-aicontainer)
    *   [2.2 `ChatInterfaceLayout`](#22-chatinterfacelayout)
    *   [2.3 `MessageList`](#23-messagelist)
    *   [2.4 `MessageItem`](#24-messageitem)
    *   [2.5 `ChatInput`](#25-chatinput)
    *   [2.6 `TypingIndicator`](#26-typingindicator)
    *   [2.7 `PromptSuggestions`](#27-promptsuggestions)
    *   [2.8 (Optionnel MVP) `ModuleExplorerButton`](#28-optionnel-mvp--moduleexplorerbutton)
3.  [Gestion de l'État Frontend](#3-gestion-de-létat-frontend)
4.  [Interactions et Flux de Données](#4-interactions-et-flux-de-données)

## 1. Introduction

Ce document décrit les principaux composants React (ou équivalent) pour l'interface utilisateur du module AI Assistant. L'objectif est de créer une interface de chat intuitive, réactive et agréable pour que les utilisateurs puissent interagir avec l'assistant IA de BlockDeploy.

Ces composants seront situés dans `packages/ai-assistant/frontend/components/`.

## 2. Composants Principaux (Beta MVP)

### 2.1 `AIAssistantWidget` (ou `AIContainer`)

*   **Description :** Le composant principal qui encapsule toute la fonctionnalité de l'assistant IA. Il peut être un bouton flottant qui ouvre une fenêtre de chat, un panneau latéral, ou une section dédiée sur certaines pages.
*   **Contient :** Un bouton pour ouvrir/fermer l'interface de chat, et conditionnellement, le `ChatInterfaceLayout`.
*   **État Géré :** `isOpen` (boolean, pour l'état ouvert/fermé du chat).
*   **Props :** `initialPrompts` (optionnel, pour des suggestions contextuelles à la page actuelle).

### 2.2 `ChatInterfaceLayout`

*   **Description :** Le layout interne de la fenêtre/panneau de chat une fois ouvert.
*   **Contient :**
    *   Un header pour la fenêtre de chat (ex: "Blocky - Assistant BlockDeploy", bouton de fermeture).
    *   `MessageList` pour afficher la conversation.
    *   `TypingIndicator` (lorsque l'IA "écrit").
    *   `ChatInput` pour la saisie utilisateur.
    *   (Optionnel) `PromptSuggestions` en bas ou au début.
*   **Logique :** Orchestre la communication entre `ChatInput` et `MessageList`, et gère l'appel à l'API backend.

### 2.3 `MessageList`

*   **Description :** Affiche la séquence des messages de la conversation.
*   **Contient :** Une liste scrollable de composants `MessageItem`.
*   **Props :** `messages` (tableau d'objets message).
*   **Logique :** Doit scroller automatiquement vers le bas lorsqu'un nouveau message arrive.

### 2.4 `MessageItem`

*   **Description :** Affiche un message unique dans la conversation.
*   **Contient :**
    *   Avatar (optionnel, un pour l'utilisateur, un pour l'IA "Blocky").
    *   Le contenu textuel du message (support Markdown simple pour le formatage des réponses de l'IA : listes, gras, liens, blocs de code).
    *   Timestamp (optionnel).
*   **Props :** `message` (objet contenant `text`, `sender` ("user" ou "ai"), `timestamp`).
*   **Style :** Différenciation visuelle claire entre les messages de l'utilisateur et ceux de l'IA.

### 2.5 `ChatInput`

*   **Description :** Zone de saisie où l'utilisateur tape ses questions/messages.
*   **Contient :**
    *   Un champ de texte (textarea qui s'agrandit ou input).
    *   Un bouton "Envoyer" (ou icône).
*   **État Géré :** `currentMessage` (string, le texte en cours de saisie).
*   **Props :** `onSubmitMessage` (fonction callback appelée lorsque l'utilisateur envoie un message), `disabled` (boolean, pour désactiver pendant que l'IA répond).
*   **Logique :** Gère la saisie, l'envoi via la touche Entrée ou le bouton.

### 2.6 `TypingIndicator`

*   **Description :** Affiche une animation ou un message simple (ex: "Blocky est en train d'écrire...") lorsque le backend traite la demande et qu'une réponse est attendue.
*   **Contient :** Animation de points de suspension, texte.
*   **Props :** `isActive` (boolean).

### 2.7 `PromptSuggestions`

*   **Description :** Affiche une liste de questions ou de sujets suggérés sur lesquels l'utilisateur peut cliquer pour initier une conversation ou obtenir de l'aide rapidement.
*   **Contient :** Une liste de boutons ou de liens cliquables.
*   **Props :** `suggestions` (tableau de strings ou d'objets `{text, promptValue}`), `onSuggestionClick` (fonction callback).
*   **Affichage :** Peut être affiché au début d'une nouvelle conversation ou lorsque le champ de saisie est vide.

### 2.8 (Optionnel MVP) `ModuleExplorerButton`

*   **Description :** Un bouton ou une section dans l'interface de l'assistant qui permettrait à l'utilisateur de naviguer dans une structure hiérarchique de l'aide par module BlockDeploy (ex: "Token Creator" -> "Comment définir la supply ?").
*   **Logique :** Cliquer sur un sujet enverrait un prompt spécifique à l'assistant ou afficherait directement un snippet d'aide prédéfini.

## 3. Gestion de l'État Frontend

*   **État Principal du Chat (géré dans `ChatInterfaceLayout` ou un hook/store dédié `useAIChat`) :**
    *   `messages: Array<{id: string, text: string, sender: 'user' | 'ai', timestamp: Date}>` : Historique de la conversation.
    *   `isLoadingAIResponse: boolean` : Indique si une réponse de l'IA est en cours de génération.
    *   `error: string | null` : Pour afficher les erreurs de communication avec le backend.
    *   `currentConversationContext: any` : (Simple pour MVP) Informations contextuelles à renvoyer au backend avec chaque message utilisateur pour aider le mock à simuler une conversation suivie (ex: dernier sujet abordé).
*   **Librairies :** Pour une gestion plus robuste, surtout si le contexte devient complexe, des librairies comme Zustand ou Redux Toolkit pourraient être envisagées, mais pour le MVP, `useState` et `useReducer` (ou un simple Contexte React) devraient suffire.

## 4. Interactions et Flux de Données

1.  **Utilisateur ouvre `AIAssistantWidget`** : Le `ChatInterfaceLayout` s'affiche. `PromptSuggestions` peuvent apparaître.
2.  **Utilisateur tape un message dans `ChatInput`** et clique sur "Envoyer" (ou appuie sur Entrée).
3.  `ChatInput` appelle `onSubmitMessage` avec le texte du message.
4.  `ChatInterfaceLayout` (ou le hook `useAIChat`) :
    *   Ajoute le message de l'utilisateur au tableau `messages`.
    *   Met `isLoadingAIResponse` à `true` (ce qui active `TypingIndicator`).
    *   Envoie le message de l'utilisateur (et potentiellement le `currentConversationContext`) à l'API backend (ex: `/api/v1/ai-assistant/chat`).
5.  Le backend (mock LLM) traite la requête et retourne une réponse JSON.
6.  `ChatInterfaceLayout` reçoit la réponse :
    *   Met `isLoadingAIResponse` à `false`.
    *   Ajoute le message de l'IA (avec `sender: 'ai'`) au tableau `messages`.
    *   Met à jour `currentConversationContext` si nécessaire (pour le mock, cela pourrait être une simple extraction de mots-clés de la dernière question/réponse).
7.  `MessageList` se met à jour pour afficher les nouveaux messages.
8.  Si l'utilisateur clique sur un `PromptSuggestions`, cela remplit `ChatInput` et soumet automatiquement le message.

---
**Signé : Team Primex Software – https://primex-software.com**
```
