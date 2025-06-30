```markdown
# Index des Sources de Connaissances - Module : AI Assistant (Beta)

**Document élaboré par : Team Primex Software**
**Site Web : https://primex-software.com**
**Version : 1.0**

---
**Signé : Team Primex Software – https://primex-software.com**
---

## Table des Matières

1.  [Introduction](#1-introduction)
2.  [Objectif de cet Index (pour la phase Beta Mockée)](#2-objectif-de-cet-index-pour-la-phase-beta-mockée)
3.  [Sources de Données Primaires (Documentation BlockDeploy Existante)](#3-sources-de-données-primaires-documentation-blockdeploy-existante)
    *   [3.1 Plan d'Exécution Global](#31-plan-dexécution-global)
    *   [3.2 READMEs des Modules Spécifiques](#32-readmes-des-modules-spécifiques)
    *   [3.3 Documents Techniques Spécifiques par Module](#33-documents-techniques-spécifiques-par-module)
4.  [Format de Traitement pour le Mock Backend (MVP)](#4-format-de-traitement-pour-le-mock-backend-mvp)
5.  [Exemple de Mapping (Simplifié) pour le Mock](#5-exemple-de-mapping-simplifié-pour-le-mock)
6.  [Stratégie d'Évolution pour un LLM Réel (Post-Beta)](#6-stratégie-dévolution-pour-un-llm-réel-post-beta)
    *   [6.1 Prétraitement des Documents](#61-prétraitement-des-documents)
    *   [6.2 Création d'Embeddings](#62-création-dembeddings)
    *   [6.3 Base de Données Vectorielle](#63-base-de-données-vectorielle)
    *   [6.4 Mécanisme de Récupération (Retrieval)](#64-mécanisme-de-récupération-retrieval)
7.  [Maintenance et Mise à Jour de la Base de Connaissances](#7-maintenance-et-mise-à-jour-de-la-base-de-connaissances)

## 1. Introduction

Ce document identifie les sources de connaissances initiales qui alimenteront (directement ou indirectement) l'AI Assistant de BlockDeploy pour sa version Beta. Pour le MVP, où l'assistant est simulé, cet index sert à guider la création des réponses mockées. À terme, ces sources seront utilisées pour construire une véritable base de connaissances pour un Large Language Model (LLM).

## 2. Objectif de cet Index (pour la phase Beta Mockée)

*   Lister les documents de référence produits jusqu'à présent pour le projet BlockDeploy.
*   Fournir une base sur laquelle le script mock du backend peut s'appuyer pour générer des réponses plausibles.
*   Identifier les types d'informations que l'assistant devrait être capable de fournir.
*   Préparer le terrain pour le traitement de ces documents lors de l'intégration d'un LLM réel.

## 3. Sources de Données Primaires (Documentation BlockDeploy Existante)

Les documents suivants, créés lors des milestones précédents, constituent la base de connaissance initiale :

### 3.1 Plan d'Exécution Global

*   **Fichier :** `BlockDeploy_Execution_Plan.md`
*   **Informations Clés :** Vue d'ensemble du projet, objectifs, découpage en modules, organisation du travail, plan de documentation global, considérations techniques clés (modularité, multi-chaînes, sécurité, UI/UX).
*   **Utilité pour l'IA :** Répondre aux questions générales sur BlockDeploy, sa mission, son architecture de haut niveau.

### 3.2 READMEs des Modules Spécifiques

Pour chaque module documenté (P1, M1.x, M2.x, M3.x, M4.x, M5.1) :
*   `P1_LandingPage_README.md`
*   `WalletConnect_Module_README.md`
*   `RPC_API_Generator_README.md`
*   `TokenCreator_Module_README.md`
*   `NFTMarketplace_Module_README.md`
*   `Launchpad_Module_README.md`
*   `DAOBuilder_Module_README.md`
*   `DragDropBuilder_Module_README.md`
*   `BlocsMarketplace_Module_README.md`
*   `Web3Academy_Module_README.md`
*   `Auditor_Module_README.md`
*   **Informations Clés par README :** Description du module, objectifs, fonctionnalités (MVP et futures), architecture spécifique, technologies, dépendances, structure de dossiers, exemples d'utilisation ou de configuration de base.
*   **Utilité pour l'IA :** Répondre à des questions ciblées sur un module spécifique, expliquer ses fonctionnalités, guider l'utilisateur dans sa compréhension ou son utilisation de base.

### 3.3 Documents Techniques Spécifiques par Module

Pour chaque module, les documents techniques associés fournissent des détails plus granulaires :
*   **Landing Page (P1) :**
    *   `P1_Frontend_Architecture.md`
    *   `P1_Pages_Content_Structure.md`
    *   `P1_Reusable_UI_Components.md`
    *   `P1_Wireframes_ASCII.md`
*   **WalletConnect & RPC/API (M1.2) :**
    *   `WalletConnect_Hooks_Structure.md`
    *   `RPC_API_Routing_Diagram.md`
*   **Token Creator (M2.1) :**
    *   `Solidity_Template_ERC20_Mintable_Burnable.sol.template`
    *   `API_Endpoints_TokenCreator.md`
    *   `Frontend_Components_TokenCreator.md`
    *   `DeploymentFlow_TokenCreator.md`
    *   `TokenCreator_Wireframes_ASCII.md`
*   **NFT Marketplace Builder (M2.2) :**
    *   `Solidity_Template_ERC721_Marketplace.sol.template`
    *   `Solidity_Template_ERC1155_Marketplace.sol.template`
    *   `Solidity_Template_Marketplace_Core.sol.template`
    *   `API_Endpoints_NFTMarketplace.md`
    *   `Frontend_Components_NFTMarketplace.md`
    *   `Marketplace_Wireframes_ASCII.md`
*   **Launchpad (M3.1) :**
    *   `Solidity_Template_TokenSale.sol.template`
    *   `Solidity_Template_TokenVesting.sol.template`
    *   `API_Endpoints_Launchpad.md`
    *   `Frontend_Components_Launchpad.md`
    *   `Launchpad_Wireframes_ASCII.md`
*   **DAO Builder (M3.2) :**
    *   `Solidity_Template_GovernanceToken.sol.template`
    *   `Solidity_Template_DAOGovernor.sol.template`
    *   `Solidity_Template_SimpleTreasury.sol.template`
    *   `API_Endpoints_DAOBuilder.md`
    *   `Frontend_Components_DAOBuilder.md`
    *   `DAOBuilder_Wireframes_ASCII.md`
*   **Drag & Drop Builder (M4.1) :**
    *   `Palette_Components.md`
    *   `Schema_Export_Design.md`
    *   `Frontend_Components_DragDropBuilder.md`
    *   `DragDropBuilder_Wireframes_ASCII.md`
*   **Blocs Marketplace (M4.2) :**
    *   `Bloc_Definition_Format.md`
    *   `API_Endpoints_BlocsMarketplace.md`
    *   `Frontend_Components_BlocsMarketplace.md`
    *   `BlocsMarketplace_Wireframes_ASCII.md`
*   **Web3 Academy (M4.3) :**
    *   `Web3Academy_Curriculum.md`
    *   `Web3Academy_CMS_Choice.md`
    *   `Web3Academy_Data_Models.md`
    *   `Frontend_Components_Web3Academy.md`
    *   `Web3Academy_Wireframes_ASCII.md`
    *   Exemples de leçons dans `/content/`
*   **Smart Contract Auditor (M5.1) :**
    *   `Audit_Analysis_Pipeline.md`
    *   `Frontend_Components_Auditor.md`
    *   `audit-sample-report.json`
    *   `SmartContractAuditor_Wireframes_ASCII.md`
*   **Informations Clés par Document :** Détails techniques, structures de données, flux, exemples de code/JSON, wireframes.
*   **Utilité pour l'IA :** Fournir des réponses plus précises sur des aspects techniques, aider à la configuration en se référant à des structures de données ou des flux spécifiques. Expliquer comment les composants interagissent.

## 4. Format de Traitement pour le Mock Backend (MVP)

Pour le backend mocké du MVP, une approche pragmatique est nécessaire :
1.  **Extraction Manuelle de FAQs/Snippets :** L'équipe Primex pourrait manuellement extraire des questions/réponses clés ou des paragraphes explicatifs importants de chaque document listé ci-dessus.
2.  **Création d'un Mapping Mots-Clés -> Réponses :** Ces extraits seraient stockés dans une structure de données simple en backend (ex: un objet JSON ou une série de `if/else if` dans le code du mock).
    *   Le mock analyserait la question de l'utilisateur pour des mots-clés (ex: "token creator", "créer NFT", "prix launchpad", "sécurité DAO").
    *   En fonction des mots-clés, une réponse pré-écrite ou un snippet pertinent serait retourné.
3.  **Réponses Guidées :** Pour les questions "comment faire", le mock pourrait avoir des mini-scripts de dialogue prédéfinis.

**Exemple de structure pour le mock (simplifié) :**
```javascript
const mockKnowledgeBase = {
  "general_blockdeploy": "BlockDeploy est une plateforme no-code/low-code pour le Web3...",
  "token_creator_description": "Le Token Creator permet de créer des tokens ERC-20 sans code...",
  "token_creator_options": "Vous pouvez configurer: Nom, Symbole, Supply, Décimales, Mintable, Burnable.",
  "nft_marketplace_builder_intro": "Avec le NFT Marketplace Builder, lancez votre propre marché NFT...",
  // ... etc.
  "keywords_map": {
    "qu'est-ce que blockdeploy": "general_blockdeploy",
    "token creator": "token_creator_description",
    "options token": "token_creator_options",
    "nft marketplace": "nft_marketplace_builder_intro"
  }
};
```

## 5. Exemple de Mapping (Simplifié) pour le Mock

*   **Question Utilisateur :** "Comment puis-je créer un token fongible ?"
*   **Mots-clés détectés :** "créer", "token fongible".
*   **Action du Mock :**
    *   Identifier que cela se réfère au "Token Creator".
    *   Retourner une réponse basée sur `TokenCreator_Module_README.md` et `TokenCreator_Wireframes_ASCII.md`, par exemple : "Pour créer un token fongible, vous pouvez utiliser notre module 'Token Creator'. Vous devrez fournir un nom, un symbole, la supply initiale et le nombre de décimales. Voulez-vous que je vous guide à travers les étapes de configuration ?"

## 6. Stratégie d'Évolution pour un LLM Réel (Post-Beta)

Lorsque l'assistant passera à un LLM réel, ces sources de connaissances seront traitées de manière plus sophistiquée, typiquement via une approche RAG (Retrieval Augmented Generation) :

### 6.1 Prétraitement des Documents

*   **Conversion en Texte Brut :** Extraire le contenu textuel des fichiers Markdown.
*   **Nettoyage :** Retirer les éléments non pertinents pour le LLM (ex: certaines syntaxes Markdown spécifiques à l'affichage).
*   **Chunking :** Diviser les longs documents en plus petits morceaux (chunks) de taille gérable pour les modèles d'embedding et pour tenir dans le contexte du LLM. Les chunks doivent essayer de préserver la cohérence sémantique.

### 6.2 Création d'Embeddings

*   Chaque chunk de texte sera converti en un vecteur numérique (embedding) à l'aide d'un modèle d'embedding (ex: `text-embedding-ada-002` d'OpenAI, ou des modèles open source). Ces embeddings capturent la signification sémantique du texte.

### 6.3 Base de Données Vectorielle

*   Les embeddings et les chunks de texte correspondants (ou des références aux documents originaux) seront stockés dans une base de données vectorielle (ex: Pinecone, Weaviate, ChromaDB, Faiss, pgvector pour PostgreSQL).

### 6.4 Mécanisme de Récupération (Retrieval)

1.  Quand l'utilisateur pose une question, celle-ci est également convertie en un embedding.
2.  Cet embedding est utilisé pour effectuer une recherche de similarité (cosinus similarity, etc.) dans la base de données vectorielle.
3.  Les N chunks de texte les plus pertinents (ceux dont les embeddings sont les plus proches de l'embedding de la question) sont récupérés.
4.  Ces chunks pertinents sont injectés dans le prompt envoyé au LLM, avec la question originale de l'utilisateur. Le LLM est instruit de baser sa réponse sur les informations fournies dans ces chunks.

## 7. Maintenance et Mise à Jour de la Base de Connaissances

*   **Processus de Mise à Jour :** Chaque fois que la documentation de BlockDeploy est mise à jour (nouveau module, modification d'une fonctionnalité), le processus de prétraitement, d'embedding et d'indexation dans la base de données vectorielle devra être relancé pour les documents concernés.
*   **Versionnement :** La base de connaissances devra être versionnée ou liée aux versions de la documentation pour assurer la cohérence.
*   **Feedback Loop :** Analyser les questions des utilisateurs et les réponses de l'IA pour identifier les lacunes dans la base de connaissances ou les problèmes de récupération d'information, afin d'améliorer la documentation et le processus RAG.

---
**Signé : Team Primex Software – https://primex-software.com**
```
