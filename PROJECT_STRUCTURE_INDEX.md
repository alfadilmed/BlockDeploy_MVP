# Index de la Structure du Projet BlockDeploy (Milestones M1.1 à M6.1)

Ce document sert d'index de référence pour les principaux livrables et la structure des dossiers établis durant les phases M1.1 à M6.1 du projet BlockDeploy.

---
**Signé : Team Primex Software – https://primex-software.com**
---

## Table des Milestones

*   [M1.1 – Architecture & Design Initial](#m11--architecture--design-initial)
*   [M1.2 – Module de Connexion Wallet & RPC](#m12--module-de-connexion-wallet--rpc)
*   [M2.1 – dApp Token Creator](#m21--dapp-token-creator)
*   [M2.2 – dApp NFT Marketplace Builder](#m22--dapp-nft-marketplace-builder)
*   [M3.1 – dApp Launchpad](#m31--dapp-launchpad)
*   [M3.2 – dApp DAO Builder](#m32--dapp-dao-builder)
*   [M4.1 – Drag & Drop Page Builder](#m41--drag--drop-page-builder)
*   [M4.2 – Blocs Marketplace (Structure)](#m42--blocs-marketplace-structure)
*   [M4.3 – Web3 Academy (Plateforme + Contenu Initial)](#m43--web3-academy-plateforme--contenu-initial)
*   [M5.1 – Smart Contract Auditor (Beta)](#m51--smart-contract-auditor-beta)
*   [M5.2 – AI Assistant (Beta)](#m52--ai-assistant-beta)
*   [M6.1 – Alpha Testnet & Feedback](#m61--alpha-testnet--feedback)

---

## M1.1 – Architecture & Design Initial

*   **Objectif :** Définir l'architecture globale, la stack technique, et le design initial de la plateforme BlockDeploy.
*   **Dossiers Concernés :** `/` (racine pour les documents globaux), `P1_Frontend_Architecture.md` (nommé ainsi, mais représente l'architecture).
*   **Fichiers Clés :**
    *   `BlockDeploy_Execution_Plan.md` : Plan global du projet.
    *   `P1_Frontend_Architecture.md` : Principes d'architecture frontend, choix technologiques.
    *   `P1_Pages_Content_Structure.md` : Structure de contenu pour les pages publiques.
    *   `P1_Reusable_UI_Components.md` : Liste des composants UI réutilisables.
    *   `P1_Wireframes_ASCII.md` : Wireframes ASCII pour la landing page.
    *   `P1_LandingPage_README.md` : README spécifique à la conception de la landing page.
*   **Résumé :** Ce milestone a jeté les bases de la plateforme, en définissant la vision, la structure modulaire, les technologies à utiliser, et l'apparence initiale des interfaces publiques.

## M1.2 – Module de Connexion Wallet & RPC

*   **Objectif :** Implémenter la connexion Wallet (MetaMask, WalletConnect) et un système de proxy RPC.
*   **Dossiers Concernés :** `packages/walletconnect-module/` (nommé `WalletConnect_Module_README.md` initialement), `packages/rpc-api-generator/` (nommé `RPC_API_Generator_README.md` initialement).
*   **Fichiers Clés :**
    *   `WalletConnect_Module_README.md` : Documentation du module WalletConnect.
    *   `WalletConnect_Hooks_Structure.md` : Structure des hooks React pour WalletConnect.
    *   `RPC_API_Generator_README.md` : Documentation du module RPC & API Generator.
    *   `RPC_API_Routing_Diagram.md` : Diagramme de routage pour le proxy RPC.
*   **Résumé :** Développement des fonctionnalités essentielles pour que les utilisateurs puissent connecter leurs wallets à BlockDeploy et pour que la plateforme puisse interagir de manière fiable avec les blockchains.

## M2.1 – dApp Token Creator

*   **Objectif :** Permettre aux utilisateurs de créer des tokens ERC-20 personnalisés.
*   **Dossiers Concernés :** `packages/token-creator/`
*   **Fichiers Clés :**
    *   `packages/token-creator/TokenCreator_Module_README.md`
    *   `packages/token-creator/API_Endpoints_TokenCreator.md`
    *   `packages/token-creator/Frontend_Components_TokenCreator.md`
    *   `packages/token-creator/DeploymentFlow_TokenCreator.md`
    *   `packages/token-creator/TokenCreator_Wireframes_ASCII.md`
    *   `packages/token-creator/backend/src/templates/Solidity_Template_ERC20_Mintable_Burnable.sol.template` (et autres templates)
*   **Résumé :** Création d'une dApp no-code pour la génération de tokens ERC-20, incluant frontend, backend pour la génération de code, et templates de smart contracts.

## M2.2 – dApp NFT Marketplace Builder

*   **Objectif :** Permettre aux utilisateurs de créer leurs propres marketplaces NFT et collections.
*   **Dossiers Concernés :** `packages/nft-marketplace-builder/`
*   **Fichiers Clés :**
    *   `packages/nft-marketplace-builder/NFTMarketplace_Module_README.md`
    *   `packages/nft-marketplace-builder/API_Endpoints_NFTMarketplace.md`
    *   `packages/nft-marketplace-builder/Frontend_Components_NFTMarketplace.md`
    *   `packages/nft-marketplace-builder/Marketplace_Wireframes_ASCII.md`
    *   `packages/nft-marketplace-builder/backend/src/templates/` (pour les templates de contrats ERC721, ERC1155, Marketplace)
*   **Résumé :** Développement d'un outil pour déployer des marketplaces NFT et les collections associées, avec gestion des royalties (ERC-2981).

## M3.1 – dApp Launchpad

*   **Objectif :** Fournir un outil pour lancer des ventes initiales de tokens (IDO).
*   **Dossiers Concernés :** `packages/launchpad/`
*   **Fichiers Clés :**
    *   `packages/launchpad/Launchpad_Module_README.md`
    *   `packages/launchpad/API_Endpoints_Launchpad.md`
    *   `packages/launchpad/Frontend_Components_Launchpad.md`
    *   `packages/launchpad/Launchpad_Wireframes_ASCII.md`
    *   `packages/launchpad/backend/src/templates/` (pour les templates de contrats de vente et de vesting)
*   **Résumé :** Création d'une plateforme pour configurer et gérer des ventes de tokens à prix fixe, avec options de whitelist et de vesting.

## M3.2 – dApp DAO Builder

*   **Objectif :** Permettre la création et la gestion d'Organisations Autonomes Décentralisées (DAO).
*   **Dossiers Concernés :** `packages/dao-builder/`
*   **Fichiers Clés :**
    *   `packages/dao-builder/DAOBuilder_Module_README.md`
    *   `packages/dao-builder/API_Endpoints_DAOBuilder.md`
    *   `packages/dao-builder/Frontend_Components_DAOBuilder.md`
    *   `packages/dao-builder/DAOBuilder_Wireframes_ASCII.md`
    *   `packages/dao-builder/backend/src/templates/` (pour les templates de token de gouvernance, Governor, Treasury)
*   **Résumé :** Développement d'un outil pour déployer des DAOs avec token de gouvernance, système de vote, et trésorerie, basé sur OpenZeppelin Governor.

## M4.1 – Drag & Drop Page Builder

*   **Objectif :** Créer un éditeur visuel no-code pour construire des interfaces utilisateur.
*   **Dossiers Concernés :** `packages/drag-drop-builder/`
*   **Fichiers Clés :**
    *   `packages/drag-drop-builder/DragDropBuilder_Module_README.md`
    *   `packages/drag-drop-builder/Palette_Components.md`
    *   `packages/drag-drop-builder/Schema_Export_Design.md`
    *   `packages/drag-drop-builder/Frontend_Components_DragDropBuilder.md`
    *   `packages/drag-drop-builder/DragDropBuilder_Wireframes_ASCII.md`
*   **Résumé :** Conception et spécification d'un éditeur visuel permettant de construire des UIs par glisser-déposer, avec export de la structure en JSON.

## M4.2 – Blocs Marketplace (Structure)

*   **Objectif :** Définir la structure d'une marketplace pour les composants réutilisables du Drag & Drop Builder.
*   **Dossiers Concernés :** `packages/blocs-marketplace/`
*   **Fichiers Clés :**
    *   `packages/blocs-marketplace/BlocsMarketplace_Module_README.md`
    *   `packages/blocs-marketplace/Bloc_Definition_Format.md`
    *   `packages/blocs-marketplace/API_Endpoints_BlocsMarketplace.md`
    *   `packages/blocs-marketplace/Frontend_Components_BlocsMarketplace.md`
    *   `packages/blocs-marketplace/BlocsMarketplace_Wireframes_ASCII.md`
    *   `packages/blocs-marketplace/Create_Your_Block.md`
    *   `packages/blocs-marketplace/Integration_With_Builder.md`
    *   `packages/blocs-marketplace/Payment_License_System.md`
    *   `packages/blocs-marketplace/Submission_Workflow.md`
    *   `packages/blocs-marketplace/Block_Specification_Format.md` (potentiellement fusionné ou lié à `Bloc_Definition_Format.md`)
*   **Résumé :** Spécification de l'architecture, du format des "Blocs", des API et des interfaces pour une future marketplace de composants.

## M4.3 – Web3 Academy (Plateforme + Contenu Initial)

*   **Objectif :** Mettre en place une plateforme éducative sur le Web3 et BlockDeploy.
*   **Dossiers Concernés :** `packages/web3-academy/`
*   **Fichiers Clés :**
    *   `packages/web3-academy/Web3Academy_Module_README.md`
    *   `packages/web3-academy/Web3Academy_Curriculum.md`
    *   `packages/web3-academy/Web3Academy_CMS_Choice.md`
    *   `packages/web3-academy/Web3Academy_Data_Models.md`
    *   `packages/web3-academy/Frontend_Components_Web3Academy.md`
    *   `packages/web3-academy/Web3Academy_Wireframes_ASCII.md`
    *   `packages/web3-academy/Course_Content_Structure.md`
    *   `packages/web3-academy/content/` (pour le contenu Markdown initial)
*   **Résumé :** Création d'une plateforme d'apprentissage avec un premier ensemble de cours, utilisant une approche basée sur des fichiers Markdown pour le MVP.

## M5.1 – Smart Contract Auditor (Beta)

*   **Objectif :** Développer un outil d'analyse statique pour les smart contracts Solidity.
*   **Dossiers Concernés :** `packages/smart-contract-auditor/`
*   **Fichiers Clés :**
    *   `packages/smart-contract-auditor/Auditor_Module_README.md`
    *   `packages/smart-contract-auditor/Audit_Analysis_Pipeline.md`
    *   `packages/smart-contract-auditor/Frontend_Components_Auditor.md`
    *   `packages/smart-contract-auditor/SmartContractAuditor_Wireframes_ASCII.md`
    *   `packages/smart-contract-auditor/audit-sample-report.json`
*   **Résumé :** Conception d'un outil d'audit automatisé (simulé pour le MVP Beta) pour aider à identifier les vulnérabilités courantes dans les contrats Solidity.

## M5.2 – AI Assistant (Beta)

*   **Objectif :** Créer un assistant conversationnel IA pour aider les utilisateurs de BlockDeploy.
*   **Dossiers Concernés :** `packages/ai-assistant/`
*   **Fichiers Clés :**
    *   `packages/ai-assistant/AIAssistant_Module_README.md`
    *   `packages/ai-assistant/Prompt_Engineering_Guide.md`
    *   `packages/ai-assistant/Knowledge_Sources_Index.md`
    *   `packages/ai-assistant/Frontend_Components_AIAssistant.md`
    *   `packages/ai-assistant/SmartAssistant_Wireframes_ASCII.md` (ou nom similaire)
    *   `packages/ai-assistant/mock-conversations/sample-assistant-dialogue.json`
*   **Résumé :** Développement d'un assistant IA (simulé pour le MVP Beta) pour fournir une aide contextuelle et répondre aux questions sur la plateforme.

## M6.1 – Alpha Testnet & Feedback

*   **Objectif :** Préparer et exécuter une phase de test Alpha sur testnet, et collecter les retours utilisateurs.
*   **Dossiers Concernés :** `docs/testing/`, `ci/alpha-tests/`
*   **Fichiers Clés :**
    *   `docs/testing/Global_Alpha_Test_Plan.md`
    *   `docs/testing/Module_Test_Matrix.md`
    *   `docs/testing/Bug_Report_Template.md`
    *   `docs/testing/Security_Checklist.md` (général)
    *   `docs/testing/Performance_Benchmarks.md` (cadre)
    *   `docs/testing/Alpha_Issues_Backlog.md`
    *   `docs/testing/Alpha_Test_Report.md` (template)
    *   `ci/alpha-tests/README.md` : Scripts et configurations pour les tests alpha automatisés.
*   **Résumé :** Définition du plan de test Alpha, des outils et des processus pour tester la plateforme sur un réseau de test et recueillir les premiers retours.

---
**Signé : Team Primex Software – https://primex-software.com**
