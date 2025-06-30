# BlockDeploy Landing Page (`apps/landing`)

Cette application contient la landing page publique de BlockDeploy. Elle est construite avec Next.js (App Router) et TypeScript.

## Table des Matières

1.  [Fonctionnalités](#fonctionnalités)
2.  [Structure des Dossiers Clés](#structure-des-dossiers-clés)
3.  [Prérequis](#prérequis)
4.  [Installation](#installation)
5.  [Variables d'Environnement](#variables-denvironnement)
6.  [Développement](#développement)
7.  [Build](#build)
8.  [Déploiement](#déploiement)
9.  [Contribution](#contribution)

## 1. Fonctionnalités

*   Présentation du projet BlockDeploy.
*   Pages pour les Fonctionnalités, Roadmap, ICO, À Propos, Contact.
*   Intégration WalletConnect via le `@blockdeploy/core-sdk` pour :
    *   Connexion du portefeuille utilisateur.
    *   Affichage de l'adresse et du solde du token $BDPY (si configuré).

## 2. Structure des Dossiers Clés

*   `src/app/`: Contient les routes principales de l'application (basé sur App Router).
    *   `layout.tsx`: Layout global de l'application.
    *   `page.tsx`: Page d'accueil.
    *   `globals.css`: Styles globaux et configuration Tailwind.
    *   `features/`, `roadmap/`, `ico/`, etc.: Dossiers pour chaque section/page.
*   `src/components/`: Composants React réutilisables.
    *   `layout/`: Composants de layout (Header, Footer).
    *   `ui/`: Composants UI génériques (Button, Card).
*   `public/`: Assets statiques (images, favicons).
*   `tailwind.config.ts`: Configuration de Tailwind CSS.
*   `next.config.js`: Configuration de Next.js.

## 3. Prérequis

*   Node.js (v18.x ou LTS recommandée)
*   Yarn (v1.x "Classic" ou plus récent)

## 4. Installation

Cette application fait partie du monorepo BlockDeploy. Les dépendances sont installées via `yarn install` à la racine du monorepo.

## 5. Variables d'Environnement

Créez un fichier `.env.local` à la racine de ce package (`apps/landing/.env.local`) si vous avez besoin de surcharger ou de définir des variables d'environnement spécifiques à la landing page.

Variables d'environnement requises (principalement pour le `@blockdeploy/core-sdk`) :

*   `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`: **Requis.** Votre Project ID obtenu depuis [WalletConnect Cloud](https://cloud.walletconnect.com/). Sans cela, la connexion WalletConnect ne fonctionnera pas.
*   `NEXT_PUBLIC_BDPY_TOKEN_ADDRESS` (Optionnel): L'adresse du contrat du token $BDPY sur le réseau par défaut (ex: Sepolia) pour afficher le solde. Si non fournie, le solde $BDPY ne sera pas affiché ou affichera N/A.
*   `NEXT_PUBLIC_ALCHEMY_ID` (Optionnel) : Si vous souhaitez utiliser un endpoint RPC Alchemy spécifique pour Sepolia (ou d'autres chaînes) au lieu du provider public par défaut.

Exemple de `.env.local`:
```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_BDPY_TOKEN_ADDRESS=0xYourBdpyTokenAddressHere
# NEXT_PUBLIC_ALCHEMY_ID=your_alchemy_id_here
```

## 6. Développement

Pour lancer la landing page en mode développement :
```bash
yarn workspace landing dev
# ou depuis la racine du monorepo:
# yarn dev
```
L'application sera généralement accessible sur `http://localhost:3000`.

## 7. Build

Pour builder l'application pour la production :
```bash
yarn workspace landing build
# ou depuis la racine du monorepo:
# yarn build
```
Les fichiers de build seront générés dans le dossier `.next/`.

## 8. Déploiement

Cette application Next.js est optimisée pour un déploiement sur des plateformes comme Vercel ou Netlify.
Consultez le document `deployment/landing-deploy.md` à la racine du monorepo (ou dans le futur dossier `docs/deployment/`) pour des instructions plus détaillées.

## 9. Contribution

Suivez les directives de contribution du monorepo BlockDeploy.
Assurez-vous que le code est correctement formaté (`yarn format` à la racine) et ne présente pas d'erreurs de linting (`yarn lint` à la racine).

---
**Signé : Team Primex Software – https://primex-software.com**
