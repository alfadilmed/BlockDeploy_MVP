```markdown
# Wireframes ASCII - Module : AI Assistant

**Document élaboré par : Team Primex Software**
**Site Web : https://primex-software.com**
**Version : 1.0**

---
**Signé : Team Primex Software – https://primex-software.com**
---

## Table des Matières

1.  [Introduction](#1-introduction)
2.  [Wireframe : Widget de Chat AI Assistant (Fermé et Ouvert)](#2-wireframe--widget-de-chat-ai-assistant-fermé-et-ouvert)
3.  [Wireframe : Interface de Chat Principale](#3-wireframe--interface-de-chat-principale)
4.  [Flux d'Interaction Typique](#4-flux-dinteraction-typique)

## 1. Introduction

Ce document présente des wireframes textuels (ASCII) pour l'interface utilisateur du module AI Assistant ("Blocky"). Ces wireframes illustrent la disposition générale des éléments de l'interface de chat et un flux d'interaction de base.
*(Note: Le nom du fichier sera `AIAssistant_Wireframes_ASCII.md` pour correspondre aux autres documents si besoin, mais le contenu réfère à "SmartAssistant" comme parfois utilisé).*

## 2. Wireframe : Widget de Chat AI Assistant (Fermé et Ouvert)

**État Fermé (Bouton Flottant) :**
Apparaît typiquement en bas à droite de l'écran sur la plateforme BlockDeploy.

```
+------------------------------------------------------------------------------+
|                                                                              |
|                                                                              |
|                                     (Autres contenus de la page BlockDeploy) |
|                                                                              |
|                                                                              |
|                                                                              |
|                                                                              |
|                                                                              |
|                                                                              |
|                                                                              |
|                                                                              |
|                                        +-----------------+                   |
|                                        | [Icône IA] Aide |                   |
|                                        | (Blocky)        |                   |
|                                        +-----------------+                   |
+------------------------------------------------------------------------------+
```

**État Ouvert (Après clic sur le bouton flottant) :**
Une fenêtre de chat (pop-up ou panneau latéral) s'ouvre.

```
+------------------------------------------------------------------------------+
|                                                                              |
|                                                                              |
|                                     (Contenus BlockDeploy estompés/derrière) |
|                                                                              |
|                                      +-------------------------------------+ |
|                                      | ChatInterfaceLayout                 | |
|                                      | +---------------------------------+ | |
|                                      | | Header: Blocky Assistant [X]    | | |
|                                      | +---------------------------------+ | |
|                                      | | MessageList (scrollable)        | | |
|                                      | |   (Voir section suivante)       | | |
|                                      | |                                 | | |
|                                      | +---------------------------------+ | |
|                                      | | ChatInput: [Tapez votre msg...] | | |
|                                      | +---------------------------------+ | |
|                                      +-------------------------------------+ |
|                                                                              |
+------------------------------------------------------------------------------+
```

## 3. Wireframe : Interface de Chat Principale

Détail du contenu de `ChatInterfaceLayout` lorsqu'une conversation est en cours.

```
+------------------------------------------------------------------------------+
| Header: Blocky - Assistant BlockDeploy                     [Btn Close: X]  |
+------------------------------------------------------------------------------+
| MessageList (Zone scrollable verticalement)                                  |
|                                                                              |
|   [PromptSuggestions: (si conversation vide ou après un certain temps)]      |
|   | [Btn: "Comment créer un token ?"] [Btn: "Explique-moi les DAOs"]       |
|   | [Btn: "Qu'est-ce que le Launchpad ?"]                                  |
|                                                                              |
|   +------------------------------------------------------------------------+ |
|   | [MessageItem - AI]                                                     | |
|   | [Avatar IA] Blocky: Bonjour ! Comment puis-je vous aider avec BlockDeploy| |
|   |             aujourd'hui ?                                              | |
|   |             <timestamp>                                                | |
|   +------------------------------------------------------------------------+ |
|                                                                              |
|   +------------------------------------------------------------------------+ |
|   | [MessageItem - User]                                                   | |
|   | Vous: Qu'est-ce que le module Token Creator ?                          | |
|   |                                                     [Avatar User]      | |
|   |                                                     <timestamp>        | |
|   +------------------------------------------------------------------------+ |
|                                                                              |
|   [TypingIndicator (si IA répond)]                                           |
|   | [Avatar IA] Blocky est en train d'écrire...                            | |
|                                                                              |
|   +------------------------------------------------------------------------+ |
|   | [MessageItem - AI]                                                     | |
|   | [Avatar IA] Blocky: Le Token Creator de BlockDeploy vous permet de     | |
|   |             créer et déployer facilement des tokens fongibles          | |
|   |             (comme ERC-20) sans écrire de code. Vous pouvez configurer | |
|   |             le nom, symbole, supply, etc. [Lire plus: /docs/token-creator] | |
|   |             <timestamp>                                                | |
|   +------------------------------------------------------------------------+ |
|                                                                              |
|   ... (scroll pour voir plus de messages) ...                                |
|                                                                              |
+------------------------------------------------------------------------------+
| ChatInput                                                                    |
| +-----------------------------------------------------+--------------------+ |
| | [Textarea: "Posez votre question à Blocky..."]      | [Btn Envoyer >]    | |
| +-----------------------------------------------------+--------------------+ |
+------------------------------------------------------------------------------+
| (Optionnel) Footer Chat: [Lien: "Effacer Conversation"] [Lien: "Aide"]        |
+------------------------------------------------------------------------------+
```

## 4. Flux d'Interaction Typique

1.  **Ouverture :** L'utilisateur clique sur le bouton flottant `AIAssistantWidget`. L'interface `ChatInterfaceLayout` s'ouvre.
2.  **Accueil :** L'assistant affiche un message de bienvenue. Des `PromptSuggestions` peuvent être visibles.
3.  **Question Utilisateur :**
    *   L'utilisateur tape une question dans le `ChatInput` (ex: "Comment fonctionne le NFT Marketplace Builder ?").
    *   Il clique sur "Envoyer" ou appuie sur Entrée.
4.  **Envoi et Attente :**
    *   Le message de l'utilisateur apparaît dans `MessageList` (aligné à droite, par exemple).
    *   Le `ChatInput` est vidé (et potentiellement désactivé).
    *   Le `TypingIndicator` s'affiche ("Blocky est en train d'écrire...").
    *   La requête est envoyée au backend.
5.  **Réponse de l'IA :**
    *   Le backend (mock pour MVP) traite la requête et renvoie une réponse.
    *   Le `TypingIndicator` disparaît.
    *   Le message de l'IA apparaît dans `MessageList` (aligné à gauche, par exemple). La réponse peut contenir du texte formaté (Markdown simple : gras, listes, liens).
    *   Le `ChatInput` est réactivé.
6.  **Conversation Continue :** L'utilisateur peut poser d'autres questions, créant un historique dans `MessageList`.
7.  **Utilisation des Suggestions :** L'utilisateur peut cliquer sur un bouton de `PromptSuggestions` pour envoyer directement cette question.
8.  **Fermeture :** L'utilisateur clique sur le bouton "Close [X]" dans le header du chat pour fermer l'interface. L'état de la conversation peut être conservé (MVP: dans `localStorage` ou état React) pour être restauré si l'utilisateur rouvre le chat pendant la même session de navigation.

---
**Signé : Team Primex Software – https://primex-software.com**
```
