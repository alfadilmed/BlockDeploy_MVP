```markdown
# Plan de Test Global - Phase Alpha (M6.1)

**Document élaboré par : Team Primex Software**
**Site Web : https://primex-software.com**
**Version : 1.0**

---
**Signé : Team Primex Software – https://primex-software.com**
---

## Table des Matières

1.  [Introduction et Objectifs](#1-introduction-et-objectifs)
    *   [1.1 Objectifs des Tests Alpha](#11-objectifs-des-tests-alpha)
    *   [1.2 Portée des Tests (Scope)](#12-portée-des-tests-scope)
    *   [1.3 Hors Portée (Out of Scope)](#13-hors-portée-out-of-scope)
2.  [Stratégie de Test](#2-stratégie-de-test)
    *   [2.1 Niveaux de Test](#21-niveaux-de-test)
    *   [2.2 Types de Test](#22-types-de-test)
    *   [2.3 Approche d'Automatisation](#23-approche-dautomatisation)
3.  [Environnements de Test](#3-environnements-de-test)
    *   [3.1 Environnement Backend et API](#31-environnement-backend-et-api)
    *   [3.2 Environnement Frontend](#32-environnement-frontend)
    *   [3.3 Environnement Smart Contracts (Testnets)](#33-environnement-smart-contracts-testnets)
    *   [3.4 Gestion des Données de Test (Fixtures)](#34-gestion-des-données-de-test-fixtures)
4.  [Outils de Test](#4-outils-de-test)
5.  [Rôles et Responsabilités](#5-rôles-et-responsabilités)
6.  [Critères d'Entrée pour la Phase Alpha](#6-critères-dentrée-pour-la-phase-alpha)
7.  [Critères de Sortie de la Phase Alpha (Passage à M6.2 - Beta)](#7-critères-de-sortie-de-la-phase-alpha-passage-à-m62---beta)
8.  [Processus de Gestion des Anomalies](#8-processus-de-gestion-des-anomalies)
9.  [Indicateurs Clés et Rapports](#9-indicateurs-clés-et-rapports)
10. [Risques et Plans de Mitigation](#10-risques-et-plans-de-mitigation)

## 1. Introduction et Objectifs

Ce document détaille le plan de test pour la phase Alpha (Milestone M6.1) de la plateforme BlockDeploy. Cette phase de test interne est cruciale pour identifier les problèmes majeurs, valider l'intégration des modules et s'assurer d'un niveau de qualité suffisant avant d'envisager une phase Beta ouverte aux utilisateurs externes.

### 1.1 Objectifs des Tests Alpha

*   **Validation Fonctionnelle :** Vérifier que toutes les fonctionnalités clés des modules MVP (P1 à P5) fonctionnent comme prévu et s'intègrent correctement.
*   **Identification des Bugs :** Détecter et documenter les bugs critiques et majeurs, les régressions, et les problèmes d'utilisabilité.
*   **Évaluation de la Stabilité :** S'assurer que la plateforme est stable dans des conditions d'utilisation normales simulées.
*   **Première Évaluation de Performance :** Obtenir des benchmarks initiaux pour les temps de réponse frontend et backend.
*   **Première Évaluation de Sécurité :** Effectuer des vérifications de base pour les vulnérabilités web communes et les erreurs de logique dans les smart contracts.
*   **Feedback Interne :** Recueillir les retours de l'équipe Primex sur l'expérience utilisateur globale.
*   **Préparation pour la Beta :** Produire un rapport consolidé pour prioriser les correctifs et améliorations avant la phase Beta (M6.2).

### 1.2 Portée des Tests (Scope)

Les tests Alpha couvriront les modules suivants, tels que définis jusqu'au Milestone M5.3 :
*   **P1 : Landing Page et Pages Publiques**
*   **M1.2 : WalletConnect Module & RPC/API Generator (Base)**
*   **M2.1 : Token Creator (MVP)**
*   **M2.2 : NFT Marketplace Builder (MVP)**
*   **M3.1 : Launchpad (MVP)**
*   **M3.2 : DAO Builder (MVP)**
*   **M4.1 : Drag & Drop Builder (MVP - export JSON, sauvegarde locale)**
*   **M4.2 & M5.3 : Blocs Marketplace (Structure, soumission interne/admin, intégration D&D Builder simulée)**
*   **M4.3 : Web3 Academy (Plateforme, contenu initial Markdown)**
*   **M5.1 : Smart Contract Auditor (Beta - analyse mockée)**
*   **M5.2 : AI Assistant (Beta - réponses mockées)**

L'intégration entre ces modules sera un point d'attention particulier.

### 1.3 Hors Portée (Out of Scope) pour la Phase Alpha

*   Tests de charge exhaustifs (prévus plus tard).
*   Tests d'utilisabilité approfondis avec des utilisateurs externes (prévus en Beta).
*   Tests sur une grande variété de navigateurs/appareils (focus sur les versions récentes de Chrome/Firefox pour l'Alpha).
*   Audit de sécurité externe complet (prévu avant le lancement en production).
*   Localisation et internationalisation (si non implémenté).
*   Fonctionnalités marquées explicitement comme "Post-MVP" ou "Futur" dans les documents de modules.

## 2. Stratégie de Test

### 2.1 Niveaux de Test

1.  **Tests Unitaires (TU) :**
    *   Déjà en place pour de nombreux composants backend et frontend, et pour les fonctions des smart contracts.
    *   Objectif Alpha : S'assurer d'une couverture d'au moins 70-80% pour les nouvelles logiques critiques.
2.  **Tests d'Intégration (TI) :**
    *   **Backend :** Tester les interactions entre services, les appels API, et l'intégration avec la base de données (mockée ou réelle de test).
    *   **Frontend :** Tester les interactions entre composants, la gestion de l'état, et les appels aux API backend.
    *   **Smart Contracts :** Tester les interactions entre les contrats déployés (ex: Governor appelant Timelock, Marketplace utilisant un token ERC721).
3.  **Tests End-to-End (E2E) :**
    *   Simuler des parcours utilisateurs complets à travers l'interface frontend, incluant les interactions avec les wallets et les smart contracts sur testnets.
4.  **Tests Système/Acceptation (Alpha) :**
    *   Exécution manuelle de scénarios par l'équipe Primex pour valider l'expérience utilisateur globale et l'adéquation aux besoins.

### 2.2 Types de Test

1.  **Tests Fonctionnels :** Vérifier que chaque fonctionnalité remplit ses objectifs.
2.  **Tests d'Interface Utilisateur (UI) :** Vérifier la convivialité, la responsivité de base, et la cohérence visuelle.
3.  **Tests d'API :** Tester directement les endpoints backend (robustesse, sécurité de base, performance).
4.  **Tests de Smart Contracts :**
    *   Tests fonctionnels (Hardhat/Foundry).
    *   Analyse statique (Slither).
5.  **Tests de Sécurité (Checklist Initiale) :**
    *   Vérifications OWASP Top 10 pour le web.
    *   Vérifications SWC Registry pour les smart contracts.
    *   Pas de secrets en clair, gestion des permissions de base.
6.  **Tests de Performance (Benchmarks Initiaux) :**
    *   Frontend : Scores Lighthouse (Performance, A11y, SEO).
    *   Backend : Temps de réponse API, débit de base (k6/Artillery).
7.  **Tests de Contenu (Web3 Academy) :** Vérifier l'exactitude et la clarté du contenu initial.
8.  **Tests de Documentation :** S'assurer que la documentation utilisateur (guides) est compréhensible et correspond aux fonctionnalités.

### 2.3 Approche d'Automatisation

*   **Priorité à l'automatisation pour :**
    *   Tests unitaires et d'intégration backend/frontend.
    *   Tests fonctionnels des smart contracts.
    *   Scénarios E2E critiques et répétitifs.
    *   Analyse statique de sécurité (Slither).
    *   Benchmarks de performance (Lighthouse, k6).
*   Les tests exploratoires et certains aspects de l'UI/UX resteront manuels pour la phase Alpha.

## 3. Environnements de Test

### 3.1 Environnement Backend et API

*   Services backend conteneurisés (Docker).
*   Base de données de test dédiée, peuplée par des scripts de fixtures.
*   Mocks pour les services externes non essentiels aux tests (ex: certains LLM si l'AI Assistant était plus avancé).

### 3.2 Environnement Frontend

*   Application Next.js buildée en mode développement ou production pointant vers l'environnement de test backend.
*   Navigateurs cibles : Chrome (dernière version), Firefox (dernière version).

### 3.3 Environnement Smart Contracts (Testnets)

*   **Réseaux de Test EVM :**
    *   Sepolia (ou Goerli si encore actif et préféré) pour les tests Ethereum.
    *   Polygon Mumbai pour les tests Polygon.
    *   BSC Testnet pour les tests BNB Smart Chain.
*   Déploiement des contrats templates via Hardhat scripts ou manuellement via les interfaces BlockDeploy pour les tests E2E.
*   Faucets pour obtenir des tokens de test.

### 3.4 Gestion des Données de Test (Fixtures)

*   **Smart Contracts :** Scripts Hardhat pour déployer des tokens de test, des marketplaces exemples, des DAOs exemples.
*   **Backend :** Scripts pour insérer des données de test dans la base de données (utilisateurs tests, configurations de modules BlockDeploy, etc.).
*   **Frontend E2E :** Utilisation de comptes de test (adresses de wallet avec tokens de test). Les scripts peuvent nécessiter des étapes de configuration initiales (ex: connexion wallet, délégation de votes pour DAO).

## 4. Outils de Test

*   **Gestion de Projet & Suivi des Bugs :** GitHub Issues (ou Jira/équivalent).
*   **Tests Unitaires/Intégration Backend :** Jest, Mocha, Chai, Supertest.
*   **Tests Smart Contracts :** Hardhat, Foundry, Ethers.js, Waffle.
*   **Analyse Statique Smart Contracts :** Slither.
*   **Tests E2E Frontend :** Cypress ou Playwright.
*   **Tests de Performance Frontend :** Google Lighthouse.
*   **Tests de Performance Backend API :** k6 ou Artillery.
*   **CI/CD :** GitHub Actions (ou GitLab CI / Jenkins).
*   **Conteneurisation :** Docker, Docker Compose.

## 5. Rôles et Responsabilités

*   **Lead QA / Test Manager :** Définit la stratégie, supervise l'exécution, consolide les rapports.
*   **Développeurs Backend :** Rédigent les TU/TI pour leurs services, corrigent les bugs backend.
*   **Développeurs Frontend :** Rédigent les TU/TI pour leurs composants, automatisent les E2E, corrigent les bugs frontend.
*   **Développeurs Smart Contracts :** Rédigent les tests Hardhat/Foundry, exécutent Slither, corrigent les bugs SC.
*   **Équipe Produit / PO :** Participe aux tests d'acceptation manuels, valide l'expérience utilisateur, priorise les bugs.
*   **DevOps :** Met en place et maintient l'infrastructure CI/CD et les environnements de test.
*   **Tous les membres de l'équipe Primex :** Sont encouragés à participer aux tests exploratoires.

## 6. Critères d'Entrée pour la Phase Alpha

*   Tous les modules MVP (P1-P5) sont "feature-complete" du point de vue développement.
*   Documentation de base des modules disponible.
*   Environnements de test (backend, frontend, testnets) configurés et accessibles.
*   Outils de test principaux (Cypress/Playwright, Jest, Hardhat, Slither, Lighthouse, k6) configurés.
*   Scripts de fixtures de base disponibles.
*   Ce plan de test Alpha est approuvé.

## 7. Critères de Sortie de la Phase Alpha (Passage à M6.2 - Beta)

*   **Couverture Fonctionnelle Minimale :** Au moins 80% des scénarios de test critiques et majeurs (manuels et automatisés) sont exécutés.
*   **Bugs Critiques :** Aucun bug critique bloquant connu non résolu.
*   **Bugs Majeurs :** Un nombre acceptable (à définir, ex: < 5) de bugs majeurs non résolus, avec des plans de contournement clairs si nécessaire.
*   **Stabilité :** La plateforme ne subit pas de pannes fréquentes lors des tests.
*   **Performance Initiale :** Les benchmarks de performance (Lighthouse, k6) atteignent des seuils minimaux prédéfinis (voir `Performance_Benchmarks.md`).
*   **Sécurité Initiale :** La `Security_Checklist.md` est complétée, et les résultats de Slither (pour les contrats templates) ne montrent aucune vulnérabilité de sévérité Haute ou Critique.
*   **Rapport de Test Alpha (`Alpha_Test_Report.md`) :** Complété, revu et approuvé.
*   **Backlog des Problèmes :** Tous les problèmes identifiés sont enregistrés et priorisés.
*   **Préparation pour la Beta :** Documentation pour l'export des rapports et le portail de feedback pour la Beta est prête.

## 8. Processus de Gestion des Anomalies

1.  **Détection :** Un bug est identifié (test manuel, test automatisé, feedback interne).
2.  **Documentation :** Le bug est rapporté en utilisant le `Bug_Report_Template.md` (ou directement dans l'outil de suivi). Chaque bug reçoit un ID unique (ex: `ALPHA-BUG-001`).
3.  **Triage :** Le bug est analysé, sa sévérité et sa priorité sont évaluées par le Lead QA et/ou le PO.
4.  **Assignation :** Le bug est assigné à un développeur pour correction.
5.  **Correction :** Le développeur corrige le bug.
6.  **Vérification :** Le testeur (ou le développeur via TU/TI) vérifie que le bug est corrigé sur l'environnement de test.
7.  **Clôture :** Le bug est marqué comme résolu.
*   Utilisation de labels dans l'outil de suivi (ex: `module:token-creator`, `severity:critical`, `type:functional`).

## 9. Indicateurs Clés et Rapports

*   **Matrice de Couverture des Tests (`Module_Test_Matrix.md`) :** Suivi de l'avancement des tests.
*   **Nombre de Bugs :** Total, par sévérité, par module, ouverts/fermés.
*   **Densité des Bugs :** Nombre de bugs par fonctionnalité ou par KLOC (lignes de code).
*   **Taux de Réussite des Tests Automatisés.**
*   **Résultats des Benchmarks de Performance.**
*   **Rapport Final des Tests Alpha (`Alpha_Test_Report.md`).**

## 10. Risques et Plans de Mitigation

*   **Risque :** Retard dans la mise en place des environnements/outils de test.
    *   **Mitigation :** Commencer tôt la configuration, allouer des ressources DevOps dédiées.
*   **Risque :** Grand nombre de bugs critiques découverts.
    *   **Mitigation :** Priorisation stricte, allocation de temps suffisant pour les corrections avant la Beta. Possibilité de décaler la Beta si nécessaire.
*   **Risque :** Manque de couverture des tests pour certaines zones.
    *   **Mitigation :** Revue régulière de la `Module_Test_Matrix.md`, prioriser les tests pour les zones les plus critiques.
*   **Risque :** Données de test insuffisantes ou incohérentes.
    *   **Mitigation :** Développer des scripts de fixtures robustes et réutilisables.

---
**Signé : Team Primex Software – https://primex-software.com**
```
