# BlockDeploy dApp: Token Creator (`apps/token-creator`)

Cette application permet aux utilisateurs de créer et déployer facilement des tokens fongibles (standard ERC-20) sur des blockchains compatibles EVM.

## Table des Matières

1.  [Fonctionnalités Prévues](#fonctionnalités-prévues)
2.  [Structure des Dossiers Clés](#structure-des-dossiers-clés)
3.  [Prérequis](#prérequis)
4.  [Installation](#installation)
5.  [Variables d'Environnement](#variables-denvironnement)
6.  [Développement](#développement)
7.  [Build](#build)
8.  [Contribution](#contribution)

## 1. Fonctionnalités Implémentées (MVP)

*   **Interface Utilisateur (UI) :**
    *   Formulaire simple et intuitif pour configurer les paramètres du token ERC-20 :
        *   Nom du Token
        *   Symbole du Token
        *   Supply Initiale (en unités entières)
        *   Nombre de Décimales (par défaut 18)
*   **Connexion Wallet :**
    *   Intégration avec `@blockdeploy/core-sdk` pour la connexion du portefeuille de l'utilisateur (MetaMask, WalletConnect).
    *   Le déploiement n'est possible que si un portefeuille est connecté.
*   **Logique de Déploiement :**
    *   Utilisation du hook `useDeployToken` du `@blockdeploy/core-sdk` pour initier la transaction de déploiement du contrat.
    *   L'ABI et le bytecode (actuellement un placeholder dans le SDK) d'un contrat ERC-20 minimal sont utilisés.
    *   **Avertissement :** Le bytecode dans le SDK est un placeholder. Pour un déploiement réel, il doit être remplacé par le bytecode d'un contrat ERC-20 valide et compilé. Une alerte est affichée dans le formulaire si le bytecode placeholder est détecté.
*   **Feedback Utilisateur :**
    *   Affichage des états de la transaction de déploiement :
        *   Envoi de la transaction au portefeuille.
        *   Confirmation de la transaction en cours.
        *   Message de succès avec l'adresse du contrat déployé et le hash de la transaction.
        *   Messages d'erreur en cas de problème.
*   **Visualisation Post-Déploiement :**
    *   Une fois le contrat déployé avec succès, affichage des détails du token lus depuis la blockchain :
        *   Adresse du contrat
        *   Nom
        *   Symbole
        *   Décimales
        *   Supply Totale
    *   Bouton pour copier l'adresse du contrat dans le presse-papiers.
    *   Bouton pour voir le contrat sur un explorateur de blocs (ex: Etherscan pour Sepolia).

## 2. Structure des Dossiers Clés

*   `src/app/`: Contient les routes principales de l'application.
    *   `layout.tsx`: Layout global de l'application Token Creator, intégrant `BlockDeployProviders`.
    *   `page.tsx`: Page principale contenant le formulaire de création de token.
*   `src/components/`: Composants React réutilisables spécifiques à cette dApp.
    *   `layout/`: Header et Footer de la dApp.
*   `public/`: Assets statiques.

## 3. Prérequis

*   Node.js (v18.x ou LTS recommandée)
*   Yarn (v1.x "Classic" ou plus récent)

## 4. Installation

Cette application fait partie du monorepo BlockDeploy. Les dépendances sont installées via `yarn install` à la racine du monorepo.
Le `@blockdeploy/core-sdk` est lié via Yarn Workspaces.

## 5. Variables d'Environnement

Créez un fichier `.env.local` à la racine de ce package (`apps/token-creator/.env.local`) pour les variables d'environnement.
Les variables nécessaires sont principalement celles requises par le `@blockdeploy/core-sdk` :

*   `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`: **Requis.** Votre Project ID obtenu depuis [WalletConnect Cloud](https://cloud.walletconnect.com/).
*   `NEXT_PUBLIC_BDPY_TOKEN_ADDRESS` (Optionnel, moins pertinent pour cette dApp mais le SDK peut l'utiliser).
*   `NEXT_PUBLIC_ALCHEMY_ID` (Optionnel).

Exemple de `.env.local`:
```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here
```

## 6. Développement

Pour lancer l'application Token Creator en mode développement :
```bash
yarn workspace token-creator dev
```
L'application sera généralement accessible sur un port différent de la landing page si vous les lancez simultanément (ex: `http://localhost:3001` si la landing est sur `3000`). Vérifiez la sortie du terminal pour le port exact.

## 7. Build

Pour builder l'application pour la production :
```bash
yarn workspace token-creator build
```
Les fichiers de build seront générés dans le dossier `.next/`.

## 8. Contribution

Suivez les directives de contribution du monorepo BlockDeploy.

---
**Signé : Team Primex Software – https://primex-software.com**
