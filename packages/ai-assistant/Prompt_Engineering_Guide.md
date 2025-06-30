```markdown
# Guide d'Ingénierie des Prompts - Module : AI Assistant (Beta)

**Document élaboré par : Team Primex Software**
**Site Web : https://primex-software.com**
**Version : 1.0**

---
**Signé : Team Primex Software – https://primex-software.com**
---

## Table des Matières

1.  [Introduction](#1-introduction)
2.  [Objectifs de ce Guide (pour la phase Beta Mockée)](#2-objectifs-de-ce-guide-pour-la-phase-beta-mockée)
3.  [Prompt Système de Base (Simulé)](#3-prompt-système-de-base-simulé)
4.  [Exemples de Prompts Utilisateurs Types (et Réponses Mockées Attendues)](#4-exemples-de-prompts-utilisateurs-types-et-réponses-mockées-attendues)
    *   [4.1 Questions Générales sur BlockDeploy](#41-questions-générales-sur-blockdeploy)
    *   [4.2 Questions sur des Modules Spécifiques](#42-questions-sur-des-modules-spécifiques)
    *   [4.3 Aide à la Configuration (Guidage Simple)](#43-aide-à-la-configuration-guidage-simple)
    *   [4.4 Questions "Comment faire..."](#44-questions-comment-faire)
5.  [Gestion du Contexte de la Conversation (Simulation pour MVP)](#5-gestion-du-contexte-de-la-conversation-simulation-pour-mvp)
6.  [Stratégies pour le Mock Backend](#6-stratégies-pour-le-mock-backend)
7.  [Limites de l'Assistant (Beta MVP)](#7-limites-de-lassistant-beta-mvp)
8.  [Évolution Future de l'Ingénierie des Prompts (avec un LLM Réel)](#8-évolution-future-de-lingénierie-des-prompts-avec-un-llm-réel)

## 1. Introduction

Ce document sert de guide initial pour la conception des interactions avec l'AI Assistant de BlockDeploy. En phase Beta MVP, où l'assistant est simulé (mocké) en backend, ce guide se concentre sur :
*   La définition du rôle et du ton de l'assistant.
*   Les types de questions que nous voulons que l'assistant (simulé) puisse traiter.
*   La manière dont le backend mocké pourrait interpréter ces questions et générer des réponses plausibles basées sur la base de connaissances définie.

Ce guide évoluera significativement lors du passage à un LLM réel.

## 2. Objectifs de ce Guide (pour la phase Beta Mockée)

*   Définir le comportement attendu de l'assistant simulé.
*   Aider à la conception du script mock en backend.
*   Fournir une base pour les tests de l'interface utilisateur du chat.
*   Préparer le terrain pour une ingénierie des prompts plus avancée avec un LLM réel.

## 3. Prompt Système de Base (Simulé)

Même si nous n'utilisons pas de LLM réel, nous pouvons définir un "prompt système" qui guiderait le développement du script mock. Ce prompt définit la personnalité et le rôle de l'assistant.

**Prompt Système (pour guider la logique du mock) :**

> "Tu es 'Blocky', l'assistant IA amical et compétent de la plateforme BlockDeploy. BlockDeploy est une solution no-code/low-code Web3 qui simplifie la création et le déploiement d'applications décentralisées. Ta mission est d'aider les utilisateurs en répondant à leurs questions sur BlockDeploy, ses fonctionnalités (Token Creator, NFT Marketplace Builder, DAO Builder, etc.), et les concepts Web3 de base. Tu dois fournir des réponses claires, concises et utiles. Si une question concerne une fonctionnalité spécifique de BlockDeploy, réfère-toi à la documentation pertinente (simulée) et propose des étapes claires si possible. Tu ne dois pas inventer d'informations. Si tu ne connais pas la réponse, admets-le poliment et suggère de consulter la documentation officielle ou le support. Évite de donner des conseils financiers ou de sécurité trop spécifiques qui pourraient engager la responsabilité. Ton ton est professionnel mais accessible."

## 4. Exemples de Prompts Utilisateurs Types (et Réponses Mockées Attendues)

Ces exemples aideront à définir la logique du backend mock. Le mock utilisera des mots-clés pour déclencher des réponses prédéfinies ou légèrement dynamiques.

### 4.1 Questions Générales sur BlockDeploy

*   **Utilisateur :** "Qu'est-ce que BlockDeploy ?"
    *   **Réponse Mockée Attendue (basée sur `BlockDeploy_Execution_Plan.md` ou README global) :** "BlockDeploy est une plateforme no-code/low-code conçue pour simplifier la création et le déploiement d'applications décentralisées (dApps) et de composants blockchain. Elle offre des outils comme un Token Creator, un NFT Marketplace Builder, un DAO Builder, et plus encore, pour vous aider à lancer vos projets Web3 rapidement !"

*   **Utilisateur :** "BlockDeploy est-il gratuit ?"
    *   **Réponse Mockée Attendue (si info dispo, sinon générique) :** "BlockDeploy proposera différents plans adaptés à vos besoins. Pour le moment, nous sommes en phase de développement actif. Vous pouvez consulter notre site web [lien vers primex-software.com] ou la section 'Tarifs' (si elle existe) pour les informations les plus à jour lorsque nous les publierons."

### 4.2 Questions sur des Modules Spécifiques

*   **Utilisateur :** "Comment fonctionne le Token Creator ?"
    *   **Réponse Mockée Attendue (basée sur `TokenCreator_Module_README.md`) :** "Le Token Creator de BlockDeploy vous permet de créer et déployer facilement des tokens fongibles (comme ERC-20) sans écrire de code. Vous configurez des paramètres comme le nom, le symbole, la supply, et des options (mintable, burnable). Ensuite, BlockDeploy prépare le contrat et vous le déployez via votre wallet. Voulez-vous en savoir plus sur une étape spécifique ?"

*   **Utilisateur :** "Puis-je créer une DAO avec BlockDeploy ?"
    *   **Réponse Mockée Attendue (basée sur `DAOBuilder_Module_README.md`) :** "Oui, BlockDeploy inclut un DAO Builder ! Il vous permet de configurer et déployer une Organisation Autonome Décentralisée avec un token de gouvernance, des règles de vote, un timelock et une trésorerie. C'est idéal pour la gouvernance de projets communautaires."

### 4.3 Aide à la Configuration (Guidage Simple)

*   **Utilisateur :** "Je veux créer un token, par où commencer ?"
    *   **Réponse Mockée Attendue (simulant un guidage) :** "Super ! Pour créer un token avec le Token Creator, vous devrez d'abord : \n1. Accéder au module 'Token Creator' dans votre tableau de bord BlockDeploy. \n2. Définir les informations de base : Nom du token (ex: 'Mon Super Token'), Symbole (ex: 'MST'), Supply Initiale (ex: 1,000,000), et le nombre de Décimales (généralement 18). \n3. Choisir des fonctionnalités optionnelles comme 'Mintable' (pour créer plus de tokens plus tard) ou 'Burnable' (pour permettre la destruction de tokens). \nAvez-vous déjà une idée de ces paramètres ?"

*   **Utilisateur (suite) :** "Oui, je veux 1 million de tokens, symbole 'ABC', nom 'ABC Coin'."
    *   **Réponse Mockée Attendue (simulant la prise en compte) :** "Parfait ! Donc : Nom: ABC Coin, Symbole: ABC, Supply: 1,000,000. Voulez-vous qu'il soit 'Mintable' ou 'Burnable' ? Et combien de décimales (18 est courant) ?"

### 4.4 Questions "Comment faire..."

*   **Utilisateur :** "Comment ajouter une adresse à la whitelist de mon Launchpad ?"
    *   **Réponse Mockée Attendue (basée sur `API_Endpoints_Launchpad.md` et `Launchpad_Module_README.md`) :** "Pour gérer la whitelist de votre vente sur le Launchpad, vous pouvez utiliser l'interface d'administration de votre vente. Il devrait y avoir une section 'Participants & Whitelist' où vous pouvez ajouter des adresses manuellement ou uploader un fichier CSV. Le backend gère ensuite cette liste. (Pour le MVP, le contrat de vente lira cette information de manière simplifiée ou aura sa propre fonction de gestion de whitelist appelable par l'owner)."

## 5. Gestion du Contexte de la Conversation (Simulation pour MVP)

Pour le MVP avec un backend mocké, la gestion du contexte sera très limitée :
*   **Pas de Mémoire à Long Terme :** L'assistant ne se souviendra pas des conversations précédentes.
*   **Contexte de la Session Courante (Très Simple) :**
    *   Le backend mock pourrait se "souvenir" du sujet principal des 1-2 derniers messages de l'utilisateur pour essayer de rendre la réponse suivante plus pertinente. Par exemple, si l'utilisateur a posé une question sur le "Token Creator", la question suivante "Et pour les options ?" sera probablement comprise comme "Et pour les options du Token Creator ?".
    *   Ceci peut être simulé en backend en stockant temporairement (ex: en session utilisateur si authentifié, ou en renvoyant le contexte au client qui le réinjecte) quelques mots-clés ou le dernier `moduleBlockDeploy` mentionné.
*   **Réponses Autonomes :** Principalement, chaque question sera traitée comme étant relativement indépendante.

## 6. Stratégies pour le Mock Backend

Le backend mocké pour l'API `/chat` pourrait implémenter une logique comme suit :
1.  Recevoir le message de l'utilisateur (et potentiellement un contexte simple des N derniers messages).
2.  Nettoyer/normaliser le message.
3.  Utiliser une série de `if/else if` ou un `switch` basé sur des **mots-clés** ou des **expressions régulières** pour identifier l'intention de l'utilisateur.
    *   Ex: Si le message contient "token creator" ET ("comment" OU "qu'est-ce que"), alors retourner l'information sur le Token Creator.
    *   Ex: Si le message contient "créer token" ET "paramètres", alors initier le flux de guidage pour la configuration du token.
4.  Si un mot-clé correspond à un document dans `Knowledge_Sources_Index.md`, extraire un snippet pertinent (prédéfini) de ce document.
5.  Construire la réponse.
6.  Simuler un léger délai.
7.  Retourner la réponse au frontend.
8.  Si aucune correspondance n'est trouvée, retourner un message type : "Je ne suis pas sûr de comprendre. Pouvez-vous reformuler ou essayer une question sur une fonctionnalité spécifique de BlockDeploy comme 'Token Creator' ou 'NFT Marketplace' ?"

## 7. Limites de l'Assistant (Beta MVP)

Il est crucial de communiquer ces limites aux utilisateurs de la Beta :
*   **Pas une vraie IA :** Les réponses sont basées sur une logique simple et des contenus prédéfinis.
*   **Connaissance Limitée :** Uniquement basé sur les documents indexés dans `Knowledge_Sources_Index.md`.
*   **Compréhension du Langage Naturel Limitée :** Très sensible à la formulation des questions.
*   **Pas de Mémoire Réelle :** Le contexte est très limité.
*   **Ne peut pas exécuter d'actions** sur la plateforme BlockDeploy.
*   **Ne peut pas naviguer sur internet** ou accéder à des informations externes.

## 8. Évolution Future de l'Ingénierie des Prompts (avec un LLM Réel)

Lors du passage à un LLM réel, ce guide sera la base pour :
*   **Prompt Système Détaillé :** Définir précisément le rôle, la personnalité, les capacités, les interdictions.
*   **Techniques de RAG (Retrieval Augmented Generation) :**
    *   Convertir la base de connaissances en embeddings vectoriels.
    *   Lors d'une question utilisateur, effectuer une recherche sémantique dans la base vectorielle pour trouver les passages les plus pertinents.
    *   Injecter ces passages dans le prompt envoyé au LLM, en lui demandant de baser sa réponse sur ces informations.
*   **Few-Shot Prompting :** Inclure des exemples de questions/réponses de haute qualité dans le prompt pour guider le LLM.
*   **Gestion du Contexte Avancée :** Utiliser des techniques pour maintenir un historique de conversation cohérent (résumés, embeddings de conversation).
*   **Chaînage de Prompts (Chaining) :** Pour des tâches complexes, décomposer le problème en plusieurs appels au LLM.
*   **Validation et Filtrage des Réponses :** S'assurer que les réponses du LLM sont factuelles (basées sur la documentation), non toxiques, et n'exposent pas d'informations sensibles.
*   **Fine-tuning (Optionnel, plus tard) :** Entraîner un modèle LLM sur un dataset spécifique à BlockDeploy pour améliorer encore plus la pertinence.

---
**Signé : Team Primex Software – https://primex-software.com**
```
