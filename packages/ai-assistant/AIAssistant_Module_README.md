```markdown
# Module : AI Assistant (Beta - M5.2)

**Document élaboré par : Team Primex Software**
**Site Web : https://primex-software.com**
**Version du Module : 0.1.0 (Beta)**

---
**Signé : Team Primex Software – https://primex-software.com**
---

## Table des Matières

1.  [Description et Objectifs](#1-description-et-objectifs)
    *   [1.1 Public Cible](#11-public-cible)
2.  [Fonctionnalités Clés (Beta MVP)](#2-fonctionnalités-clés-beta-mvp)
3.  [Architecture et Choix Technologiques](#3-architecture-et-choix-technologiques)
    *   [3.1 Frontend](#31-frontend)
    *   [3.2 Backend](#32-backend)
    *   [3.3 API LLM (Cible et Mock MVP)](#33-api-llm-cible-et-mock-mvp)
    *   [3.4 Base de Connaissances (Knowledge Base)](#34-base-de-connaissances-knowledge-base)
4.  [Fonctionnement de l'Assistant (Détaillé dans Prompt_Engineering_Guide.md)](#4-fonctionnement-de-lassistant-détaillé-dans-prompt_engineering_guidemd)
5.  [Sources de Connaissances (Détaillées dans Knowledge_Sources_Index.md)](#5-sources-de-connaissances-détaillées-dans-knowledge_sources_indexmd)
6.  [Composants Frontend Clés (Détaillés dans Frontend_Components_AIAssistant.md)](#6-composants-frontend-clés-détaillés-dans-frontend_components_aiassistantmd)
7.  [Wireframes / Flux UI (Détaillés dans SmartAssistant_Wireframes_ASCII.md)](#7-wireframes--flux-ui-détaillés-dans-smartassistant_wireframes_asciimd)
8.  [Exemple de Dialogue (Dans `/mock-conversations/`)](#8-exemple-de-dialogue-dans-mock-conversations)
9.  [Sécurité et Confidentialité](#9-sécurité-et-confidentialité)
10. [Technologies Utilisées (Prévision)](#10-technologies-utilisées-prévision)
11. [Dépendances et Intégrations](#11-dépendances-et-intégrations)
12. [Structure du Module (`packages/ai-assistant`)](#12-structure-du-module-packagesai-assistant)
13. [Tests (Stratégie Initiale)](#13-tests-stratégie-initiale)
14. [Considérations Futures (Post-Beta)](#14-considérations-futures-post-beta)
15. [Contribution](#15-contribution)

## 1. Description et Objectifs

L'**AI Assistant** de BlockDeploy est un agent conversationnel intelligent conçu pour aider les utilisateurs à naviguer et à utiliser la plateforme BlockDeploy. Il vise à fournir des réponses rapides aux questions, à guider les utilisateurs dans la configuration des modules, et à offrir une assistance contextuelle basée sur la documentation et les guides de BlockDeploy.

**Objectifs principaux de la Beta (MVP) :**
*   Mettre en place une interface de chat simple pour interagir avec l'assistant.
*   Simuler l'interaction avec un Large Language Model (LLM) externe via une API mockée en backend.
*   Utiliser un ensemble défini de documents BlockDeploy (READMEs, guides des modules précédents) comme base de connaissances initiale (simulée).
*   Permettre à l'assistant de répondre à des questions de base sur les fonctionnalités de BlockDeploy (ex: "Comment créer un token ERC-20 ?", "Qu'est-ce que le Launchpad ?").
*   Guider l'utilisateur dans la configuration initiale de modules simples en posant des questions ou en suggérant des étapes.
*   Définir les bases pour l'ingénierie des prompts et la gestion du contexte.

### 1.1 Public Cible

*   **Nouveaux utilisateurs de BlockDeploy :** Pour les aider à prendre en main la plateforme.
*   **Utilisateurs existants :** Pour obtenir des réponses rapides à des questions spécifiques ou de l'aide sur des configurations.

## 2. Fonctionnalités Clés (Beta MVP)

*   **Interface de Chat :**
    *   Zone d'affichage des messages (utilisateur et assistant).
    *   Champ de saisie pour les questions de l'utilisateur.
    *   Affichage d'indicateurs de chargement pendant que l'assistant "réfléchit".
*   **Réponses Basées sur la Connaissance (Simulée) :**
    *   L'assistant (via le backend mocké) tente de répondre aux questions en se basant sur un index simulé des documents de BlockDeploy.
    *   Les réponses peuvent inclure des extraits de la documentation ou des liens vers les sections pertinentes.
*   **Aide à la Configuration Guidée (Simulée) :**
    *   Pour des questions comme "Comment configurer un Token Creator ?", l'assistant peut simuler une série de questions pour recueillir les paramètres nécessaires ou lister les étapes à suivre.
*   **Suggestions de Prompts :** Afficher des exemples de questions que l'utilisateur peut poser pour démarrer la conversation ou explorer des sujets.
*   **Gestion de Contexte Simple (Simulée) :** Le backend mocké peut prendre en compte les quelques derniers messages pour donner l'illusion d'une conversation suivie (pour des scénarios très simples).
*   **Pas d'Appel Réel à un LLM Externe :** Toutes les réponses sont générées par une logique mockée en backend pour cette phase Beta.

## 3. Architecture et Choix Technologiques

### 3.1 Frontend (`packages/ai-assistant/frontend/`)

*   Interface React/Next.js pour le chat.
*   Communication avec le backend via API REST pour envoyer les messages de l'utilisateur et recevoir les réponses de l'assistant.
*   Gestion de l'état du chat (historique des messages, statut de chargement).

### 3.2 Backend (`packages/ai-assistant/backend/`)

*   API RESTful (Node.js/Express ou Fastify).
*   Endpoint pour recevoir les messages de l'utilisateur (ex: `/api/v1/ai-assistant/chat`).
*   **Logique de Mock LLM :**
    *   Analyse simple du message utilisateur (mots-clés).
    *   Consulte une version simplifiée/indexée de la `Knowledge_Sources_Index.md`.
    *   Génère une réponse textuelle prédéfinie ou dynamiquement simple.
    *   Simule un délai de réponse pour imiter un LLM.
*   Gestion basique du contexte de la conversation (ex: stocker les derniers N messages en session ou côté client et les renvoyer).

### 3.3 API LLM (Cible et Mock MVP)

*   **Cible (Post-Beta) :** Intégration avec une API LLM externe (OpenAI GPT-3.5/4, Anthropic Claude, Mistral AI, etc.).
*   **Mock (Beta MVP) :** Le backend ne fera **pas** d'appel réel à une API LLM. Il simulera la réponse. L'interface de l'API backend (`/chat`) sera conçue de manière à pouvoir facilement remplacer le mock par un appel réel plus tard.

### 3.4 Base de Connaissances (Knowledge Base)

*   **Source :** Les documents listés dans `Knowledge_Sources_Index.md`.
*   **Traitement (Simulation pour MVP) :**
    *   Pour le mock, le backend pourrait avoir une structure de données simple (ex: un JSON) mappant des mots-clés ou des questions types à des réponses ou des extraits de ces documents.
    *   **Cible (Post-Beta) :** Les documents seraient prétraités (chunking, embedding) et stockés dans une base de données vectorielle (ex: Pinecone, Weaviate, pgvector) pour permettre une recherche sémantique (Retrieval Augmented Generation - RAG).

## 4. Fonctionnement de l'Assistant (Détaillé dans `Prompt_Engineering_Guide.md`)

Voir le document `Prompt_Engineering_Guide.md` pour les stratégies de prompts et la gestion du contexte.

## 5. Sources de Connaissances (Détaillées dans `Knowledge_Sources_Index.md`)

Voir le document `Knowledge_Sources_Index.md` pour la liste des documents servant de base à l'assistant.

## 6. Composants Frontend Clés (Détaillés dans `Frontend_Components_AIAssistant.md`)

Voir le document `Frontend_Components_AIAssistant.md`.

## 7. Wireframes / Flux UI (Détaillés dans `SmartAssistant_Wireframes_ASCII.md`)

Voir le document `SmartAssistant_Wireframes_ASCII.md`. (Note: le nom du fichier sera ajusté pour correspondre à `AIAssistant_Wireframes_ASCII.md` si nécessaire pour la cohérence).

## 8. Exemple de Dialogue (Dans `/mock-conversations/`)

Un fichier `sample-assistant-dialogue.json` ou `.md` illustrera un échange type.

## 9. Sécurité et Confidentialité

*   **Pas d'Informations Sensibles :** Les utilisateurs seront informés de ne pas partager de clés privées, de phrases mnémoniques ou d'autres informations sensibles avec l'assistant.
*   **Données de Conversation :** Pour le MVP mock, les conversations ne sont pas stockées de manière persistante en backend. Si un stockage de session est utilisé, il sera temporaire.
*   **Filtrage (Futur) :** Pour les appels réels à des LLM, un filtrage des entrées/sorties pourrait être nécessaire.

## 10. Technologies Utilisées (Prévision)

*   **Frontend :** React, Next.js, TypeScript, TailwindCSS.
*   **Backend :** Node.js (avec Express/Fastify), TypeScript.
*   **API LLM (Cible) :** SDK du fournisseur LLM choisi (ex: `openai`).

## 11. Dépendances et Intégrations

*   **Internes (BlockDeploy) :**
    *   L'assistant doit pouvoir accéder (lire) la documentation des autres modules.
    *   L'interface de l'assistant sera intégrée dans la plateforme BlockDeploy (ex: via un bouton d'aide flottant ou une section dédiée).
*   **Externes :** Aucune pour le mock MVP au-delà du stack de base. Pour la version réelle, dépendance à l'API du LLM.

## 12. Structure du Module (`packages/ai-assistant`)
```
/packages/ai-assistant/
|-- /backend/
|   |-- /src/
|   |   |-- /api/                # Routes et contrôleurs API (ex: /chat)
|   |   |-- /services/         # Logique du mock LLM, gestion contexte (simple)
|   |   |-- /knowledge_base/   # (Simulation) Index simplifié des connaissances
|   |   `-- ...
|   `-- package.json
|-- /frontend/
|   |-- /components/           # Composants React pour l'UI de chat
|   |-- /hooks/                # Hooks pour la gestion du chat, appels API
|   |-- /pages/                # (Si l'assistant a une page dédiée)
|   |-- /services/             # Service client pour l'API backend de l'assistant
|   `-- package.json
|-- /shared/                   # Types et interfaces (ex: format des messages)
|   `-- package.json
|-- /mock-conversations/
|   `-- sample-assistant-dialogue.json
|-- AIAssistant_Module_README.md # Ce fichier
|-- Prompt_Engineering_Guide.md
|-- Knowledge_Sources_Index.md
|-- Frontend_Components_AIAssistant.md
|-- SmartAssistant_Wireframes_ASCII.md # (Sera renommé si besoin)
`-- package.json
```

## 13. Tests (Stratégie Initiale)

*   **Backend :**
    *   Tests unitaires pour la logique du mock LLM (vérifier que des inputs spécifiques produisent les réponses mockées attendues).
    *   Tests d'intégration pour l'API `/chat`.
*   **Frontend :**
    *   Tests unitaires pour les composants UI du chat.
    *   Tests d'intégration pour le flux d'envoi de message et d'affichage de la réponse.

## 14. Considérations Futures (Post-Beta)

*   **Intégration d'un vrai LLM.**
*   **Techniques de RAG (Retrieval Augmented Generation) :** Utilisation de bases de données vectorielles pour une recherche sémantique dans la documentation de BlockDeploy.
*   **Fine-tuning d'un modèle LLM** sur les données spécifiques de BlockDeploy pour des réponses plus précises et contextuelles.
*   **Historique des conversations persistant** pour les utilisateurs connectés.
*   **Capacité à exécuter des actions simples** dans la plateforme (avec confirmation utilisateur).
*   **Support multi-langues.**
*   **Analyse des conversations** pour améliorer l'assistant et la documentation.

## 15. Contribution

*   Contribuer à l'enrichissement de `Knowledge_Sources_Index.md`.
*   Proposer des scénarios de dialogue et des améliorations pour les prompts.
*   Participer au développement du mock ou à l'intégration future du LLM.

---
**Signé : Team Primex Software – https://primex-software.com**
```
