```markdown
# Matrice de Couverture des Tests par Module - Phase Alpha (M6.1)

**Document élaboré par : Team Primex Software**
**Site Web : https://primex-software.com**
**Version : 1.0**

---
**Signé : Team Primex Software – https://primex-software.com**
---

## Table des Matières

1.  [Introduction](#1-introduction)
2.  [Légende des Statuts](#2-légende-des-statuts)
3.  [Matrice de Test](#3-matrice-de-test)
    *   [3.1 P1 : Landing Page et Pages Publiques](#31-p1--landing-page-et-pages-publiques)
    *   [3.2 M1.2 : WalletConnect Module](#32-m12--walletconnect-module)
    *   [3.3 M1.2 : RPC & API Generator (Base)](#33-m12--rpc--api-generator-base)
    *   [3.4 M2.1 : Token Creator (MVP)](#34-m21--token-creator-mvp)
    *   [3.5 M2.2 : NFT Marketplace Builder (MVP)](#35-m22--nft-marketplace-builder-mvp)
    *   [3.6 M3.1 : Launchpad (MVP)](#36-m31--launchpad-mvp)
    *   [3.7 M3.2 : DAO Builder (MVP)](#37-m32--dao-builder-mvp)
    *   [3.8 M4.1 : Drag & Drop Builder (MVP)](#38-m41--drag--drop-builder-mvp)
    *   [3.9 M4.2 & M5.3 : Blocs Marketplace (Structure + Fonctionnel)](#39-m42--m53--blocs-marketplace-structure--fonctionnel)
    *   [3.10 M4.3 : Web3 Academy (Plateforme + Contenu Initial)](#310-m43--web3-academy-plateforme--contenu-initial)
    *   [3.11 M5.1 : Smart Contract Auditor (Beta - Mock)](#311-m51--smart-contract-auditor-beta---mock)
    *   [3.12 M5.2 : AI Assistant (Beta - Mock)](#312-m52--ai-assistant-beta---mock)
    *   [3.13 Intégration Globale / Cross-Module](#313-intégration-globale--cross-module)
4.  [Suivi et Mise à Jour](#4-suivi-et-mise-à-jour)

## 1. Introduction

Cette matrice fournit un aperçu de la couverture des tests pour chaque module de BlockDeploy durant la phase Alpha (M6.1). Elle croise les modules avec les différents types de tests à effectuer et leur statut actuel. Ce document est un outil de suivi dynamique.

**Objectifs :**
*   Visualiser rapidement la progression des efforts de test.
*   Identifier les zones nécessitant plus d'attention.
*   Assurer une couverture adéquate avant de passer à la phase Beta.

## 2. Légende des Statuts

*   **DFS (À Définir/Spécifier) :** Les cas de test ou la stratégie pour ce point sont encore à définir.
*   **AF (À Faire) :** Les cas de test sont définis, mais l'exécution/automatisation n'a pas commencé.
*   **EC (En Cours) :** L'exécution/automatisation des tests est en cours.
*   **OK (Passé) :** Tous les tests planifiés pour ce point sont exécutés et réussis.
*   **KO (Échoué) :** Des tests ont échoué ; des bugs sont ouverts (voir `Alpha_Issues_Backlog.md`).
*   **BL (Bloqué) :** Les tests ne peuvent pas être exécutés à cause d'un bug bloquant ou d'une dépendance.
*   **NA (Non Applicable) :** Ce type de test n'est pas pertinent pour ce module dans le scope Alpha.
*   **COV (Couverture) :** Pourcentage estimé de couverture pour ce type de test (ex: 70%).

## 3. Matrice de Test

| Module / Type de Test                 | Tests Unitaires (TU) | Tests d'Intégration API (TI API) | Tests d'Intégration Frontend (TI FE) | Tests Smart Contract (Hardhat/Foundry) | Analyse Statique SC (Slither) | Tests E2E (Cypress/Playwright) | Checklist Sécurité (Manuelle) | Perf. Benchmarks (Lighthouse/k6) | Tests Manuels Exploratoires | Documentation & Contenu |
| :------------------------------------ | :------------------: | :------------------------------: | :----------------------------------: | :------------------------------------: | :---------------------------: | :----------------------------: | :---------------------------: | :------------------------------: | :-------------------------: | :---------------------: |
| **3.1 P1 : Landing Page**             |        COV:80%       |                NA                |                AF                  |                   NA                   |              NA               |               AF               |              AF               |                AF                |            AF             |           AF            |
| **3.2 M1.2 : WalletConnect**          |        COV:70%       |                NA                |                AF                  |                   NA                   |              NA               |               AF               |              AF               |                NA                |            AF             |           AF            |
| **3.3 M1.2 : RPC/API Gen (Base)**     |        COV:60%       |                AF                |                AF (Admin UI)     |                   NA                   |              NA               |               DFS              |              AF               |                AF                |            AF             |           AF            |
| **3.4 M2.1 : Token Creator**          |        AF            |                AF                |                AF                  |                   AF                   |              AF               |               AF               |              AF               |                DFS               |            AF             |           AF            |
| **3.5 M2.2 : NFT Mpl Builder**        |        AF            |                AF                |                AF                  |                   AF                   |              AF               |               AF               |              AF               |                DFS               |            AF             |           AF            |
| **3.6 M3.1 : Launchpad**              |        AF            |                AF                |                AF                  |                   AF                   |              AF               |               AF               |              AF               |                DFS               |            AF             |           AF            |
| **3.7 M3.2 : DAO Builder**            |        AF            |                AF                |                AF                  |                   AF                   |              AF               |               AF               |              AF               |                DFS               |            AF             |           AF            |
| **3.8 M4.1 : D&D Builder**            |        AF            |         NA (localStorage)        |                AF                  |                   NA                   |              NA               |               AF               |              AF               |                NA                |            AF             |           AF            |
| **3.9 M4.2 & M5.3 : Blocs Mpl**       |        AF            |                AF                |                AF                  |                   NA                   |              NA               |               DFS              |              AF               |                AF                |            AF             |           AF            |
| **3.10 M4.3 : Web3 Academy**          |        AF            |         NA (Markdown)            |                AF                  |                   NA                   |              NA               |               DFS              |              AF               |                AF                |            AF             |        **EC**         |
| **3.11 M5.1 : SC Auditor (Mock)**     |        AF            |                AF                |                AF                  |                   NA                   |              NA               |               DFS              |              AF               |                NA                |            AF             |           AF            |
| **3.12 M5.2 : AI Assistant (Mock)**   |        AF            |                AF                |                AF                  |                   NA                   |              NA               |               DFS              |              AF               |                NA                |            AF             |           AF            |
| **3.13 Intégration Cross-Module**     |          NA          |                EC                |                EC                  |                   EC                   |              NA               |             **EC**             |              EC               |                EC                |          **EC**           |           NA            |

**Notes sur la Matrice :**

*   **TU Backend/Frontend :** Le statut "AF" indique que bien que des TU existent, une passe est nécessaire pour assurer la couverture des fonctionnalités MVP pour l'Alpha. "COV:X%" est une estimation de la couverture actuelle ou cible.
*   **TI API :** Concerne les tests d'intégration des endpoints backend.
*   **TI FE :** Concerne les tests d'intégration entre composants frontend et avec les services/API mockées ou réelles.
*   **Tests Smart Contract :** Incluent les tests fonctionnels avec Hardhat/Foundry.
*   **Analyse Statique SC :** Exécution de Slither sur les templates Solidity.
*   **Tests E2E :** Scénarios utilisateurs complets. "DFS" pour les modules plus récents où les scénarios E2E sont à définir plus précisément.
*   **Checklist Sécurité :** Revue manuelle basée sur `Security_Checklist.md`.
*   **Perf. Benchmarks :** Exécution des scripts Lighthouse (pour les modules avec UI significative) et k6/Artillery (pour les API).
*   **Tests Manuels Exploratoires :** Tests libres par l'équipe pour trouver des bugs non couverts par les scénarios automatisés.
*   **Documentation & Contenu :** Revue de la clarté, de l'exactitude et de la complétude des READMEs, guides, et contenu de l'Academy.

## 4. Suivi et Mise à Jour

Cette matrice sera mise à jour régulièrement (quotidiennement ou tous les deux jours) par le Lead QA ou les responsables de test pendant la phase Alpha. Les statuts "KO" devront être liés aux IDs des bugs dans `Alpha_Issues_Backlog.md` ou l'outil de suivi.

L'objectif est d'atteindre un statut "OK" ou "NA" pour la majorité des cellules pertinentes, et une couverture ("COV") satisfaisante pour les tests unitaires, avant de valider les critères de sortie de la phase Alpha. Les points en "EC" (En Cours) sont les priorités actuelles de l'équipe de test.

---
**Signé : Team Primex Software – https://primex-software.com**
```
