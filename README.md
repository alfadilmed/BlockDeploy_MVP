# BlockDeploy Monorepo

**Éditeur : Team Primex Software**
**Site Web : [https://primex-software.com](https://primex-software.com)**

---

**Bienvenue sur le Monorepo BlockDeploy !**

Ce monorepo héberge le code de la plateforme BlockDeploy, une solution modulaire no-code/low-code conçue pour simplifier et accélérer le développement et le déploiement d'applications décentralisées (dApps) et de smart contracts.

**Domaines Officiels (Prévus) :**
*   **Landing Page & Informations :** [https://blockdeploy.io](https://blockdeploy.io)
*   **Plateforme Applicative (dApp) :** [https://app.blockdeploy.io](https://app.blockdeploy.io)
*   **API Principale :** `https://api.blockdeploy.io`

---
**Signé : Team Primex Software – https://primex-software.com**
---

## Table des Matières

1.  [Structure du Monorepo](#structure-du-monorepo)
2.  [Prérequis](#prérequis)
3.  [Installation](#installation)
4.  [Scripts Disponibles](#scripts-disponibles)
5.  [Lancer en Développement](#lancer-en-développement)
6.  [Build](#build)
7.  [Documentation Détaillée](#documentation-détaillée)
8.  [Contribution](#contribution)

## 1. Structure du Monorepo

Ce projet utilise Yarn Workspaces pour gérer un monorepo.

*   `apps/`: Contient les applications déployables.
    *   `apps/landing`: Le code source de la landing page publique de BlockDeploy (Next.js).
*   `packages/`: Contient les bibliothèques et modules partagés.
    *   `packages/core-sdk`: SDK de base pour les fonctionnalités Web3, la connexion wallet, etc.
*   `docs/`: Contient la documentation technique et fonctionnelle détaillée (migrée depuis le dépôt BlockDeploy_MVP).

## 2. Prérequis
*   Node.js (v18.x ou LTS recommandée)
*   Yarn (v1.x "Classic" ou plus récent)

## 3. Installation
1.  Clonez le repository :
    ```bash
    git clone [URL_DU_REPO]
    cd blockdeploy-monorepo
    ```
2.  Installez les dépendances pour tous les packages :
    ```bash
    yarn install
    ```

## 4. Scripts Disponibles

Les scripts suivants sont disponibles à la racine du monorepo (voir `package.json` global) :

*   `yarn dev`: Lance l'application `landing` en mode développement.
*   `yarn build`: Build l'application `landing` pour la production. (Note: pour builder le SDK, voir sa documentation)
*   `yarn start`: Démarre l'application `landing` en mode production (après un build).
*   `yarn lint`: Exécute ESLint sur tout le monorepo.
*   `yarn format`: Exécute Prettier pour formater tout le code.
*   `yarn test`: Exécute les tests Jest pour tous les packages.
*   `yarn coverage`: Exécute les tests Jest et génère un rapport de couverture.
*   `yarn compile-contracts`: Compile les smart contracts du package `@blockdeploy/smart-contracts` en utilisant Hardhat.
    "update-artifacts": "Exécute le script `scripts/update-contract-artifacts.ts` pour compiler les contrats et mettre à jour les fichiers ABI/bytecode dans `@blockdeploy/core-sdk`. **Important : Après chaque modification des contrats Solidity, exécutez ce script localement et commitez les artefacts mis à jour. La CI vérifiera cela et échouera si les artefacts ne sont pas à jour.**"

Des scripts spécifiques à chaque package/application sont disponibles dans leurs `package.json` respectifs et peuvent être lancés avec `yarn workspace <nom_du_workspace> <script>`.

Par exemple :
*   `yarn workspace landing dev` (lance la landing page sur le port 3000)
*   `yarn workspace token-creator dev` (lance la dApp Token Creator sur le port 3001 - *Note: port à vérifier/configurer dans son package.json*)
*   `yarn workspace launchpad dev` (lance la dApp Launchpad sur le port 3002)
*   `yarn workspace @blockdeploy/core-sdk build`
*   `yarn workspace @blockdeploy/smart-contracts test` (lance les tests Hardhat des contrats)

## 5. Lancer en Développement

### Landing Page (`apps/landing`)
Pour lancer la landing page en mode développement :
```bash
yarn workspace landing dev
# ou depuis la racine:
yarn dev
```
Elle sera généralement accessible sur `http://localhost:3000`.

### Core SDK (`packages/core-sdk`)
Le Core SDK est une bibliothèque. Pour le recompiler en mode watch pendant que vous développez :
```bash
yarn workspace @blockdeploy/core-sdk dev
```

## 6. Build

### Landing Page (`apps/landing`)
```bash
yarn workspace landing build
# ou depuis la racine:
yarn build
```

### Core SDK (`packages/core-sdk`)
```bash
yarn workspace @blockdeploy/core-sdk build
```

## 7. Documentation Détaillée

La documentation technique et fonctionnelle plus détaillée, incluant les plans de modules, l'architecture prévue, etc., a été migrée depuis le dépôt initial `BlockDeploy_MVP` et se trouve dans le répertoire `/docs` de ce monorepo.

Chaque application dans `apps/` et chaque package dans `packages/` possède également son propre `README.md` avec des instructions spécifiques.

## 8. Contribution

Veuillez suivre les conventions de code (ESLint, Prettier) et les bonnes pratiques pour les Pull Requests.
Plus de détails sur la contribution seront ajoutés ultérieurement.

---
**Signé : Team Primex Software – https://primex-software.com**
