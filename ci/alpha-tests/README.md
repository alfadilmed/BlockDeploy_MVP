```markdown
# Scripts et Configurations pour les Tests Alpha (M6.1)

**Document élaboré par : Team Primex Software**
**Site Web : https://primex-software.com**
**Version : 1.0**

---
**Signé : Team Primex Software – https://primex-software.com**
---

## Table des Matières

1.  [Introduction](#1-introduction)
2.  [Structure du Dossier `ci/alpha-tests/`](#2-structure-du-dossier-cialpha-tests)
3.  [Configuration CI/CD (Exemple GitHub Actions)](#3-configuration-cicd-exemple-github-actions)
    *   [3.1 Déclencheurs](#31-déclencheurs)
    *   [3.2 Variables d'Environnement et Secrets](#32-variables-denvironnement-et-secrets)
    *   [3.3 Étapes du Job "alpha-tests"](#33-étapes-du-job-alpha-tests)
4.  [Scripts de Test](#4-scripts-de-test)
    *   [4.1 Tests Backend (Jest/Mocha)](#41-tests-backend-jestmocha)
    *   [4.2 Tests Smart Contracts (Hardhat/Foundry + Slither)](#42-tests-smart-contracts-hardhatfoundry--slither)
    *   [4.3 Tests Frontend E2E (Cypress/Playwright)](#43-tests-frontend-e2e-cypressplaywright)
    *   [4.4 Tests de Performance (Lighthouse, k6/Artillery)](#44-tests-de-performance-lighthouse-k6artillery)
5.  [Fixtures et Données de Test](#5-fixtures-et-données-de-test)
6.  [Exécution Locale des Suites de Tests](#6-exécution-locale-des-suites-de-tests)
7.  [Gestion des Rapports et Artefacts](#7-gestion-des-rapports-et-artefacts)

## 1. Introduction

Ce document décrit le contenu et l'organisation du dossier `ci/alpha-tests/`. Ce dossier centralise les scripts, configurations, et orchestrations nécessaires pour exécuter la suite complète des tests Alpha pour la plateforme BlockDeploy. L'objectif est d'automatiser autant que possible l'exécution des tests et la collecte des résultats dans un pipeline CI/CD.

## 2. Structure du Dossier `ci/alpha-tests/`

```
/ci/alpha-tests/
|-- /cypress/                  # Configuration et tests Cypress (si Cypress est choisi)
|   |-- integration/           # Scénarios de test E2E
|   |-- support/               # Commandes custom, etc.
|   `-- cypress.config.js
|-- /playwright/               # Configuration et tests Playwright (si Playwright est choisi)
|   |-- tests/                 # Scénarios de test E2E
|   `-- playwright.config.ts
|-- /hardhat-tests/            # Scripts de test Hardhat/Foundry additionnels (si non dans chaque module SC)
|-- /k6-scripts/               # Scripts de test de charge k6
|   |-- api_load_test.js
|   `-- ...
|-- /lighthouse-config/        # Configurations pour les tests Lighthouse (si CLI)
|   `-- lighthouse.config.js
|-- /fixtures/                 # Scripts pour générer/gérer les données de test
|   |-- backend_seeds.js
|   `-- sc_deployment_data.json
|-- run-all-alpha-tests.sh     # Script principal orchestrant toutes les suites (pour exécution locale ou CI)
|-- ci-job-config.yml          # Exemple de configuration de job CI (ex: pour GitHub Actions)
`-- README.md                  # Ce fichier
```

## 3. Configuration CI/CD (Exemple GitHub Actions)

Un fichier comme `ci-job-config.yml` (ou intégré dans `.github/workflows/`) décrirait le job.

### 3.1 Déclencheurs

*   Manuellement (via `workflow_dispatch`).
*   Sur push vers une branche spécifique (ex: `alpha-testing` ou `release-candidate/*`).
*   Sur Pull Request vers `main` (pour s'assurer que les tests passent avant merge).

### 3.2 Variables d'Environnement et Secrets

*   `NODE_ENV=test`
*   `DATABASE_URL_TEST` (pour la base de données de test backend)
*   `TESTNET_RPC_URL_SEPOLIA`
*   `TESTNET_RPC_URL_MUMBAI`
*   `TESTNET_RPC_URL_BSC_TESTNET`
*   `TEST_WALLET_PRIVATE_KEY_1` (pour déployer/interagir avec SC sur testnets - **À STOCKER EN SECRET CI/CD**)
*   `TEST_WALLET_PRIVATE_KEY_2` (pour simuler un autre utilisateur)
*   `ETHERSCAN_API_KEY_TEST` (si besoin de vérifier des contrats ou récupérer des ABI)
*   `SLITHER_CI_LEVEL` (ex: `medium` - pour faire échouer le build si Slither trouve des problèmes >= medium)

### 3.3 Étapes du Job "alpha-tests"

1.  **Checkout Code:** Récupérer la dernière version du code.
2.  **Setup Environment:**
    *   Installer Node.js (versions pour frontend et backend).
    *   Installer Python (pour Slither).
    *   Installer Docker & Docker Compose (si des services sont conteneurisés).
3.  **Cache Dependencies:** Restaurer les `node_modules`, etc., si possible.
4.  **Install Dependencies:** `yarn install` (ou `npm install`) globalement et dans chaque package.
5.  **Spin-up Services:**
    *   Démarrer une base de données de test (ex: PostgreSQL dans Docker).
    *   Appliquer les migrations et les seeds de test (`ci/alpha-tests/fixtures/backend_seeds.js`).
    *   Démarrer les serveurs backend mock/test.
    *   (Optionnel) Démarrer un nœud Hardhat local pour certains tests SC rapides.
6.  **Run Backend Unit & Integration Tests:**
    *   Commande : `yarn test:backend` (exemple).
    *   Collecter les rapports de couverture.
7.  **Run Smart Contract Tests & Analysis:**
    *   Commande : `yarn test:contracts` (exécute les tests Hardhat/Foundry).
    *   Commande : `slither . --fail-on-level {{SLITHER_CI_LEVEL}}` (analyse statique).
8.  **Build Frontend Applications:**
    *   Compiler les frontends des modules et de la plateforme principale.
9.  **Run Frontend E2E Tests:**
    *   Démarrer le serveur frontend de test.
    *   Commande : `yarn test:e2e:headless` (ex: Cypress/Playwright en mode headless).
    *   Enregistrer des vidéos/screenshots en cas d'échec.
10. **Run Frontend Performance Tests (Lighthouse):**
    *   Exécuter Lighthouse sur les URLs cibles.
    *   Générer des rapports JSON/HTML.
    *   (Optionnel) Faire échouer le build si les scores sont en dessous des seuils.
11. **Run Backend API Performance Tests (k6/Artillery):**
    *   Exécuter les scripts k6/Artillery contre l'environnement de test backend.
    *   Générer des résumés de résultats.
    *   (Optionnel) Faire échouer le build si les métriques sont en dessous des seuils.
12. **Collect & Archive Test Reports:**
    *   Rassembler tous les rapports (JUnit XML, JSON, HTML, logs) dans un dossier.
    *   Uploader comme artefacts du job CI.
13. **Cleanup:** Arrêter les services, conteneurs.

## 4. Scripts de Test

### 4.1 Tests Backend (Jest/Mocha)

*   Situés dans chaque `packages/*/backend/tests/`.
*   Commandes d'exécution centralisées dans le `package.json` racine ou via `run-all-alpha-tests.sh`.
*   Utilisent des bases de données de test et des mocks pour les dépendances externes.

### 4.2 Tests Smart Contracts (Hardhat/Foundry + Slither)

*   **Hardhat/Foundry :** Tests fonctionnels situés dans les dossiers `test/` des modules de smart contracts (ex: templates dans Token Creator, NFT Marketplace, Launchpad, DAO Builder).
*   **Slither :** Script pour lancer Slither sur les dossiers contenant les contrats `.sol` finaux ou les templates.
    ```bash
    # Exemple pour un template
    # cd packages/token-creator/backend/src/templates/
    # slither ERC20_Mintable_Burnable.sol.template --solc-remaps "@openzeppelin=node_modules/@openzeppelin" ...
    # Le script `run-all-alpha-tests.sh` devrait gérer ces chemins et options.
    ```

### 4.3 Tests Frontend E2E (Cypress/Playwright)

*   **Scripts :** Dans `ci/alpha-tests/cypress/integration/` ou `ci/alpha-tests/playwright/tests/`.
*   **Scénarios Clés :**
    *   `P1_navigation.cy.js`: Navigation sur la landing page.
    *   `M1_2_wallet_connect.cy.js`: Processus de connexion/déconnexion WalletConnect.
    *   `M2_1_token_creation.cy.js`: Création et déploiement (mocké ou réel sur testnet) d'un token.
    *   `M2_2_nft_marketplace_flow.cy.js`: Création marketplace, collection, mint, list, buy.
    *   `M3_1_launchpad_participation.cy.js`: Création vente, participation.
    *   `M3_2_dao_governance.cy.js`: Création DAO, proposition, vote.
    *   `M4_1_dnd_builder_basic.cy.js`: Drag & drop, config props, export JSON.
*   **Utilisation de `data-testid` attributs** pour des sélecteurs robustes.
*   Gestion des wallets via des extensions de navigateur pré-configurées (si possible avec l'outil E2E) ou via interaction programmatique avec des wallets mockés/test.

### 4.4 Tests de Performance (Lighthouse, k6/Artillery)

*   **Lighthouse :**
    ```bash
    # Exemple d'utilisation en CLI
    # lighthouse <URL_DE_LA_PAGE> --output=json --output-path=./test-reports/alpha/lighthouse/landingpage.json --quiet --chrome-flags="--headless --no-sandbox"
    # Le script `run-all-alpha-tests.sh` bouclera sur les URLs cibles.
    ```
*   **k6/Artillery :**
    *   Scripts dans `ci/alpha-tests/k6-scripts/`.
    *   Exemple `api_load_test.js` (k6):
        ```javascript
        // import http from 'k6/http';
        // import { sleep, check } from 'k6';
        // export const options = { stages: [{ duration: '1m', target: 20 }, { duration: '2m', target: 20 }] };
        // export default function () {
        //   const res = http.get('https://api.blockdeploy.io/v1/launchpad/sales'); // Utiliser l'URL de l'API de config/urls.json
        //   check(res, { 'status was 200': (r) => r.status == 200 });
        //   sleep(1);
        // }
        ```

## 5. Fixtures et Données de Test

*   Situés dans `ci/alpha-tests/fixtures/`.
*   `backend_seeds.js`: Scripts pour populer la base de données de test avec des utilisateurs, des configurations de modules, etc. (utilisant TypeORM, Prisma, ou autre ORM).
*   `sc_deployment_data.json`: Peut contenir des adresses de contrats pré-déployés sur les testnets pour que les tests E2E puissent interagir avec.
*   Les tests E2E peuvent aussi créer leurs propres données au début de chaque scénario (ex: créer un nouveau token avant de tester son listing).

## 6. Exécution Locale des Suites de Tests

Le script `run-all-alpha-tests.sh` permettra aux développeurs de lancer la suite complète (ou des parties) localement.
```bash
#!/bin/bash
echo "Démarrage des Tests Alpha BlockDeploy..."

# Option pour exécuter des parties spécifiques, ex: ./run-all-alpha-tests.sh --module=token-creator --type=e2e

# 1. Setup Environnement (variables, services si besoin)
# export NODE_ENV=test
# docker-compose -f ci/alpha-tests/docker-compose.test.yml up -d db_test backend_test_server

# 2. Exécuter Tests Backend
# yarn test:backend --coverage

# 3. Exécuter Tests Smart Contracts
# yarn test:contracts
# slither . --config-file ci/alpha-tests/slither.config.json --json test-reports/alpha/slither_report.json || true # Ne pas faire échouer tout de suite

# 4. Build Frontends
# yarn build:all-frontends

# 5. Exécuter Tests E2E
# yarn test:e2e:headless --reporter junit --reporter-options "mochaFile=./test-reports/alpha/e2e/results-[hash].xml"

# 6. Exécuter Tests de Performance (exemples)
# node ci/alpha-tests/run_lighthouse_batch.js
# k6 run ci/alpha-tests/k6-scripts/api_load_test.js

# 7. Vérifier les seuils Slither et autres conditions de build fail
# node ci/alpha-tests/check_slither_results.js test-reports/alpha/slither_report.json {{SLITHER_CI_LEVEL}}

# 8. Cleanup
# docker-compose -f ci/alpha-tests/docker-compose.test.yml down

echo "Tests Alpha BlockDeploy Terminés."
```
Ce script sera plus détaillé et adapté à la structure exacte du monorepo.

## 7. Gestion des Rapports et Artefacts

*   Tous les rapports de test (JUnit XML pour Jest/Cypress, JSON/HTML pour Lighthouse, JSON pour Slither, résumés k6) seront générés dans des sous-dossiers de `test-reports/alpha/`.
*   Le pipeline CI/CD archivera ce dossier `test-reports/alpha/` en tant qu'artefact à la fin de chaque exécution du job "alpha-tests".
*   Les logs d'exécution du pipeline CI/CD seront également conservés.

---
**Signé : Team Primex Software – https://primex-software.com**
```
