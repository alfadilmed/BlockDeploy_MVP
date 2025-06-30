# BlockDeploy Platform

**Éditeur : Team Primex Software**
**Site Web : [https://primex-software.com](https://primex-software.com)**

---

**Bienvenue sur BlockDeploy !**

BlockDeploy est une plateforme modulaire no-code/low-code conçue pour simplifier et accélérer le développement et le déploiement d'applications décentralisées (dApps) et de smart contracts sur diverses blockchains compatibles EVM. Notre objectif est de rendre la technologie Web3 accessible à un public plus large, des entrepreneurs aux développeurs expérimentés.

**Domaines Officiels :**
*   **Landing Page & Informations :** [https://blockdeploy.io](https://blockdeploy.io)
*   **Plateforme Applicative (dApp) :** [https://app.blockdeploy.io](https://app.blockdeploy.io)
*   **API Principale :** `https://api.blockdeploy.io` (utilisée par la plateforme)

---
**Signé : Team Primex Software – https://primex-software.com**
---

## Table des Matières

1.  [Présentation du Projet](#présentation-du-projet)
2.  [Fonctionnalités Clés](#fonctionnalités-clés)
3.  [Architecture](#architecture)
4.  [Structure du Repository](#structure-du-repository)
5.  [Installation et Lancement](#installation-et-lancement)
    *   [Prérequis](#prérequis)
    *   [Installation](#installation)
    *   [Variables d'Environnement](#variables-denvironnement)
    *   [Lancement en Développement](#lancement-en-développement)
6.  [Build et Déploiement](#build-et-déploiement)
7.  [Tests](#tests)
8.  [Contribution](#contribution)
9.  [Licence](#licence)
10. [Liens Utiles](#liens-utiles)

## 1. Présentation du Projet

BlockDeploy est une solution complète qui offre une suite d'outils intuitifs pour :
*   Créer des tokens personnalisés (ERC-20, ERC-721, ERC-1155).
*   Construire et lancer des marketplaces NFT.
*   Mettre en place des plateformes de lancement de tokens (Launchpads).
*   Configurer et déployer des Organisations Autonomes Décentralisées (DAOs).
*   Auditer (analyse statique) des smart contracts pour des vulnérabilités courantes.
*   Composer des interfaces utilisateur via un éditeur Drag & Drop.
*   Et plus encore, grâce à une architecture modulaire et extensible.

Notre mission est de fournir les briques essentielles pour que vous puissiez vous concentrer sur l'innovation et la valeur ajoutée de vos projets Web3.

## 2. Fonctionnalités Clés

BlockDeploy offre une gamme de modules et dApps intégrés, notamment :

*   **Token Creator (M2.1) :** Génération et déploiement de tokens fongibles (ERC-20) avec options de personnalisation (mintable, burnable).
*   **NFT Marketplace Builder (M2.2) :** Création de marketplaces NFT personnalisées et de collections NFT (ERC-721, ERC-1155).
*   **Launchpad (M3.1) :** Plateforme pour lancer des ventes initiales de tokens (IDOs) de manière sécurisée.
*   **DAO Builder (M3.2) :** Outil pour configurer et déployer des DAOs basées sur des modèles de gouvernance éprouvés.
*   **Drag & Drop Builder (M4.1) :** Éditeur visuel pour construire des interfaces utilisateur simples pour dApps.
*   **Blocs Marketplace (M4.2) :** Espace pour partager et réutiliser des composants et sections de page pré-configurés pour le Drag & Drop Builder.
*   **Smart Contract Auditor (M5.1 - Beta) :** Outil d'analyse statique pour aider à identifier des vulnérabilités potentielles dans le code Solidity.
*   **AI Assistant (M5.2 - Beta) :** Agent conversationnel pour guider les utilisateurs au sein de la plateforme.
*   **Web3 Academy (M4.3) :** Centre de ressources éducatives sur le Web3 et l'utilisation de BlockDeploy.
*   **Module WalletConnect (M1.2) :** Intégration pour la connexion avec divers wallets mobiles et desktop.
*   **RPC & API Generator (M1.2) :** Fourniture d'accès RPC managé et gestion de clés API pour la plateforme.

## 3. Architecture

BlockDeploy est conçu comme un **monorepo** (géré avec Yarn Workspaces ou Lerna) pour faciliter le développement et la gestion des dépendances entre les différents modules.
*   **Packages Indépendants :** Chaque fonctionnalité majeure (Token Creator, DAO Builder, etc.) est développée comme un package quasi-autonome dans le dossier `/packages/`. Cela inclut souvent un frontend, un backend dédié (si nécessaire), et des contrats intelligents associés.
*   **Frontend Principal :** Une application Next.js (ou similaire) sert de coque principale pour la plateforme `https://app.blockdeploy.io`, intégrant les interfaces des différents modules.
*   **Backend Principal / API Gateway :** Des services backend (potentiellement NestJS ou Express) exposent une API principale (`https://api.blockdeploy.io`) pour les opérations communes et l'orchestration.
*   **CI/CD :** Des pipelines d'intégration continue et de déploiement continu (GitHub Actions, GitLab CI) sont utilisés pour automatiser les tests, les builds et les déploiements. (Voir `/ci/`)

## 4. Structure du Repository

L'arborescence principale du projet est organisée comme suit :

```
/
|-- .github/                   # Configuration GitHub (workflows CI/CD, issue templates)
|-- ci/                        # Scripts et configurations pour les tests et l'intégration continue
|   `-- alpha-tests/           # Tests Alpha spécifiques
|-- config/                    # Fichiers de configuration globaux
|   `-- urls.json              # URLs officielles de production
|-- deployment/                # Scripts et guides de déploiement
|   |-- app-deploy.md          # Instructions pour https://app.blockdeploy.io
|   `-- landing-deploy.md      # Instructions pour https://blockdeploy.io
|-- docs/                      # Documentation technique et fonctionnelle détaillée
|   `-- testing/               # Plans de test, rapports, etc.
|-- packages/                  # Cœur de la plateforme, contient tous les modules/dApps
|   |-- /ai-assistant/
|   |-- /blocs-marketplace/
|   |-- /dao-builder/
|   |-- /drag-drop-builder/
|   |-- /launchpad/
|   |-- /nft-marketplace-builder/
|   |-- /rpc-api-generator/    # (Nom à confirmer, pourrait être sous /services)
|   |-- /smart-contract-auditor/
|   |-- /token-creator/
|   |-- /walletconnect-module/ # (Nom à confirmer, pourrait être sous /lib ou /shared)
|   `-- /web3-academy/
|-- .env.example               # Fichier d'exemple pour les variables d'environnement locales
|-- .gitignore
|-- package.json               # Dépendances et scripts principaux du monorepo
|-- README.md                  # Ce fichier
|-- yarn.lock                  # (ou package-lock.json)
`-- ... autres fichiers de configuration racine (tsconfig.json, .eslintrc.js, etc.)
```

*   **/ci/** : Contient les scripts et configurations relatifs à l'Intégration Continue et aux tests automatisés. Voir `ci/alpha-tests/README.md`.
*   **/config/** : Stocke les configurations globales partagées à travers le projet, comme `config/urls.json` qui définit les domaines de production.
*   **/deployment/** : Guides et scripts pour le déploiement des différentes parties de la plateforme (landing page, application principale).
*   **/docs/** : Documentation générale du projet, plans de test, architecture. Les README spécifiques à chaque module dans `/packages/` fournissent une documentation plus ciblée.
*   **/packages/** : Le répertoire le plus important, contenant les modules indépendants qui composent BlockDeploy. Chaque sous-dossier est un package avec son propre `package.json` et souvent sa propre structure `frontend/`, `backend/`, `shared/`.

## 5. Installation et Lancement

### Prérequis
*   Node.js (v18.x ou LTS recommandée)
*   Yarn (v1.x "Classic" ou v3 "Berry") ou NPM (v8.x ou LTS)
*   Docker et Docker Compose (pour certains services backend ou bases de données en local)
*   Un wallet Web3 de type navigateur (MetaMask) pour interagir avec la dApp.

### Installation
1.  Clonez le repository :
    ```bash
    git clone https://github.com/primex-software/blockdeploy.git
    ```
2.  Naviguez dans le dossier du projet :
    ```bash
    cd blockdeploy
    ```
3.  Installez les dépendances (cela installera les dépendances de tous les packages du monorepo) :
    ```bash
    yarn install
    # ou npm install (si vous n'utilisez pas Yarn Workspaces nativement avec npm, des étapes supplémentaires peuvent être nécessaires pour les monorepos)
    ```

### Variables d'Environnement
Avant de lancer l'application, vous devez configurer vos variables d'environnement locales.
1.  Copiez le fichier d'exemple `.env.example` (s'il existe à la racine, sinon vérifiez les README des packages backend) en `.env.local` (ou `.env` selon les conventions du projet).
    ```bash
    cp .env.example .env.local
    ```
2.  Modifiez `.env.local` avec vos propres clés API (Infura/Alchemy pour les RPCs, Etherscan, etc.), secrets de base de données, et autres configurations nécessaires.
    *   **URL de la plateforme locale (pour le frontend) :** `APP_URL=http://localhost:3000` (ou le port configuré)
    *   **URL de l'API backend locale :** `API_URL=http://localhost:3001` (ou le port configuré pour le backend principal/gateway)
    *   Consultez les README des packages backend spécifiques pour leurs propres besoins en `.env`.

### Lancement en Développement
Pour lancer la plateforme BlockDeploy en mode développement (avec hot-reloading) :
```bash
yarn dev
# ou npm run dev
```
Cette commande devrait lancer simultanément (grâce à des outils comme `concurrently` ou des scripts de workspace) :
*   Le frontend principal de la plateforme (`https://app.blockdeploy.io` en production, `http://localhost:PORT_APP` en local).
*   Les services backend nécessaires.

Consultez les `package.json` à la racine et dans les `packages/` pour des scripts plus spécifiques (ex: `yarn workspace @blockdeploy/token-creator-backend dev`).

La plateforme devrait être accessible sur `http://localhost:3000` (ou un autre port si configuré).
La landing page (si développée dans ce repo) pourrait avoir son propre script de lancement ou être servie par le même processus de dev.

## 6. Build et Déploiement

*   **Build :**
    ```bash
    yarn build
    # ou npm run build
    ```
    Cette commande compile les applications frontend et backend pour la production.
*   **Déploiement :**
    *   La landing page (`https://blockdeploy.io`) est généralement un site statique ou Next.js optimisé, déployé sur des plateformes comme Vercel, Netlify, ou AWS S3/CloudFront. Voir `deployment/landing-deploy.md`.
    *   La plateforme applicative (`https://app.blockdeploy.io`) est une application Next.js (ou similaire) déployée sur Vercel, Netlify, ou des conteneurs (AWS ECS/EKS, Google Cloud Run). Voir `deployment/app-deploy.md`.
    *   Les APIs backend (`https://api.blockdeploy.io`) sont déployées comme des services conteneurisés ou serverless. Voir `Production_Deployment_Plan.md`.

## 7. Tests

Pour exécuter les différentes suites de tests (unitaires, intégration, E2E) :
```bash
# Exécuter tous les tests (si un script global est configuré)
yarn test
# ou npm test

# Exécuter les tests pour un package spécifique
yarn workspace @blockdeploy/token-creator test

# Exécuter les tests E2E (End-to-End)
yarn test:e2e
```
Consultez le `Global_Alpha_Test_Plan.md` et le `ci/alpha-tests/README.md` pour plus de détails sur la stratégie de test et l'exécution des tests alpha.

## 8. Contribution

Nous accueillons avec plaisir les contributions de la communauté ! Avant de contribuer, veuillez lire notre (futur) `CONTRIBUTING.md` qui détaillera :
*   Les conventions de code (ESLint, Prettier).
*   Le processus de Pull Request.
*   Les standards de nommage des branches et des commits.
*   L'obligation d'inclure des tests pour les nouvelles fonctionnalités ou corrections.
*   **Signature des Commits/Fichiers :** Tous les fichiers de documentation et potentiellement les commits doivent inclure la signature `**Signé : Team Primex Software – https://primex-software.com**` lorsque cela est pertinent pour l'attribution.

## 9. Licence

Ce projet est sous licence [MIT](./LICENSE) (ou une autre licence à définir).
*(Note : Un fichier LICENSE devra être ajouté si ce n'est pas déjà fait).*

## 10. Liens Utiles

*   **Documentation Complète :** `[Placeholder pour le lien vers GitBook, Notion, ou /docs/]`
*   **Roadmap du Projet :** `[Placeholder pour le lien vers la Roadmap]`
*   **Changelog :** `[Placeholder pour le lien vers le Changelog]`
*   **Contact & Support :**
    *   Pour des questions générales ou du support : `support@blockdeploy.io` (ou `support@primex-software.com`)
    *   Pour rapporter des bugs ou proposer des fonctionnalités : Ouvrez une issue sur GitHub.
    *   Communauté Discord/Telegram : `[Placeholder pour les liens]`

---
**Signé : Team Primex Software – https://primex-software.com**
```
