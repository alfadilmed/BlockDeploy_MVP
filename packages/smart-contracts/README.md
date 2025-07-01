# BlockDeploy Smart Contracts (`@blockdeploy/smart-contracts`)

Ce package contient les smart contracts Solidity pour la plateforme BlockDeploy, ainsi que les scripts de déploiement et les tests associés. Il est configuré avec Hardhat.

## Table des Matières

1.  [Structure du Projet](#structure-du-projet)
2.  [Prérequis](#prérequis)
3.  [Installation](#installation)
4.  [Configuration](#configuration)
    *   [Variables d'Environnement](#variables-denvironnement)
5.  [Tâches Hardhat Courantes](#tâches-hardhat-courantes)
    *   [Compiler les Contrats](#compiler-les-contrats)
    *   [Exécuter les Tests](#exécuter-les-tests)
    *   [Déployer les Contrats](#déployer-les-contrats)
    *   [Vérifier les Contrats sur Etherscan](#vérifier-les-contrats-sur-etherscan)
    *   [Obtenir un Rapport de Gas](#obtenir-un-rapport-de-gas)
6.  [Contribution](#contribution)

## 1. Structure du Projet

*   `contracts/`: Contient les fichiers de code source Solidity (`.sol`). Inclut `MinimalERC20.sol` et `SimpleLaunchpad.sol`.
*   `scripts/`: Contient les scripts de déploiement et d'interaction avec les contrats (en TypeScript). Des scripts pour déployer `MinimalERC20.sol` et `SimpleLaunchpad.sol` peuvent y être ajoutés.
*   `test/`: Contient les tests pour les smart contracts. Inclut `MinimalERC20.test.ts` et `SimpleLaunchpad.test.ts`.
*   `hardhat.config.ts`: Fichier de configuration principal de Hardhat.
*   `artifacts/`: Généré par Hardhat lors de la compilation, contient les ABIs et bytecodes des contrats. (Gitignoré)
*   `cache/`: Généré par Hardhat. (Gitignoré)
*   `typechain-types/`: Généré par TypeChain via Hardhat, contient les typages TypeScript pour interagir avec les contrats de manière typée. (Gitignoré)

## 2. Prérequis

*   Node.js (v18.x ou LTS recommandée)
*   Yarn (v1.x "Classic" ou plus récent)

## 3. Installation

Ce package fait partie du monorepo BlockDeploy. Les dépendances sont installées via `yarn install --frozen-lockfile` à la racine du monorepo.
Cela installera également les dépendances de ce package listées dans son propre `package.json`.

Si vous avez besoin de réinstaller spécifiquement les dépendances de ce package ou de forcer la génération de TypeChain :
```bash
yarn workspace @blockdeploy/smart-contracts compile # La compilation déclenche TypeChain
```

## 4. Configuration

### Variables d'Environnement

Copiez le fichier `.env.example` en `.env` à la racine de ce package (`packages/smart-contracts/.env`) et remplissez les variables nécessaires :

*   `SEPOLIA_RPC_URL`: URL de l'endpoint RPC pour le réseau de test Sepolia.
*   `DEPLOYER_PRIVATE_KEY`: Clé privée du compte utilisé pour déployer les contrats. **NE PAS utiliser la clé par défaut de Hardhat pour des déploiements réels.**
*   `ETHERSCAN_API_KEY`: Clé API Etherscan pour la vérification des contrats. (Optionnel)
*   `COINMARKETCAP_API_KEY`: Clé API CoinMarketCap pour le rapport de gas. (Optionnel)

Consultez `hardhat.config.ts` pour voir comment ces variables sont utilisées.

## 5. Tâches Hardhat Courantes

Toutes les commandes suivantes doivent être exécutées depuis la racine du monorepo en utilisant `yarn workspace @blockdeploy/smart-contracts <commande_hardhat>`.

### Compiler les Contrats
Compile les contrats Solidity et génère les artefacts et les typages TypeChain.
```bash
yarn workspace @blockdeploy/smart-contracts compile
```

### Exécuter les Tests
Lance les tests pour les contrats (ex: `MinimalERC20.test.ts`).
```bash
yarn workspace @blockdeploy/smart-contracts test
```

### Déployer les Contrats
Un script d'exemple `scripts/deploy.ts` peut être utilisé ou adapté pour déployer vos contrats.
Pour déployer `MinimalERC20.sol` (ou un autre contrat) sur le réseau Sepolia :
```bash
# Assurez-vous que votre scripts/deploy.ts est configuré pour MinimalERC20
yarn workspace @blockdeploy/smart-contracts deploy:sepolia
# Ou pour un script spécifique :
# yarn workspace @blockdeploy/smart-contracts run scripts/deployMinimalERC20.ts --network sepolia
```
Pour déployer sur le réseau Hardhat local (pour des tests rapides) :
```bash
yarn workspace @blockdeploy/smart-contracts run scripts/deployMinimalERC20.ts --network hardhat
```
**Note :** Avant de déployer sur un réseau réel ou testnet public, assurez-vous que `DEPLOYER_PRIVATE_KEY` dans votre `.env` est correctement configurée, sécurisée et financée.

### Vérifier les Contrats sur Etherscan
Après avoir déployé un contrat sur un réseau public (ex: Sepolia), vous pouvez le vérifier sur Etherscan.
Si vous avez déployé `MinimalERC20` avec l'adresse `0xYourContractAddress` et les arguments constructeur "MyToken", "MTK", 1000000, "0xDeployerAddress":
```bash
yarn workspace @blockdeploy/smart-contracts verify --network sepolia 0xYourContractAddress "MyToken" "MTK" 1000000 "0xDeployerAddress"
# Assurez-vous que ETHERSCAN_API_KEY est configuré dans votre .env.
```
La vérification peut également être intégrée dans vos scripts de déploiement.

### Obtenir un Rapport de Gas
Pour analyser la consommation de gas de vos fonctions de contrat lors des tests :
```bash
REPORT_GAS=true yarn workspace @blockdeploy/smart-contracts test
```
Cela générera un rapport dans la console (et un fichier si configuré dans `hardhat.config.ts`). Vous pouvez aussi configurer `COINMARKETCAP_API_KEY` pour voir les estimations de coûts en USD.

### Audit Statique avec Slither
Slither est un outil d'analyse statique pour les contrats Solidity qui peut aider à détecter des vulnérabilités courantes.

**Prérequis :**
*   Python 3.6+ et pip.
*   Slither installé : `pip install slither-analyzer`

**Exécution :**
Naviguez à la racine du package `packages/smart-contracts` et exécutez :
```bash
slither .
# ou pour un contrat spécifique :
# slither contracts/MinimalERC20.sol
```
Cela affichera un rapport dans la console listant les problèmes potentiels, leur impact et leur confiance.

**Interprétation du Rapport :**
*   **Impact :** Haut, Moyen, Bas, Optimisation, Informatif. Concentrez-vous d'abord sur les impacts Haut et Moyen.
*   **Confiance :** Haute, Moyenne, Basse. Une confiance élevée signifie que le problème est très probablement réel.
*   **Description :** Explique la vulnérabilité potentielle.
*   **Référence :** Souvent un lien vers une description plus détaillée de la vulnérabilité (ex: SWC Registry).

Examinez chaque point signalé. Certains peuvent être des faux positifs, surtout avec une confiance basse. Pour les problèmes réels, comprenez la vulnérabilité et appliquez les corrections recommandées ou les meilleures pratiques.

Il est recommandé d'intégrer Slither (ou un outil similaire) dans votre pipeline CI pour une analyse continue.

## 6. Contribution

*   Suivez les conventions de nommage et de style pour Solidity.
*   Écrivez des tests pour tous les nouveaux contrats ou fonctionnalités.
*   Documentez les contrats avec NatSpec.
*   Assurez-vous que le linter (`yarn workspace @blockdeploy/smart-contracts lint`) passe.

---
**Signé : Team Primex Software – https://primex-software.com**
