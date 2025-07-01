# BlockDeploy dApp: Launchpad (`apps/launchpad`)

Cette application permet aux utilisateurs de créer et de participer à des levées de fonds décentralisées (Launchpads) pour des tokens ERC-20.

## Table des Matières

1.  [Fonctionnalités Prévues (MVP)](#fonctionnalités-prévues-mvp)
2.  [Structure des Dossiers Clés](#structure-des-dossiers-clés)
3.  [Prérequis](#prérequis)
4.  [Installation](#installation)
5.  [Variables d'Environnement](#variables-denvironnement)
6.  [Développement](#développement)
7.  [Build](#build)
8.  [Contribution](#contribution)

## 1. Fonctionnalités Implémentées (MVP)

*   **Création de Launchpad (`/create`) :**
    *   Formulaire permettant de spécifier :
        *   L'adresse du token ERC-20 à vendre.
        *   Le prix de vente par token (en ETH).
        *   La quantité totale de tokens à mettre en vente (en unités entières du token).
        *   La date et l'heure de fin de la vente.
    *   Validation des inputs du formulaire.
    *   Utilisation du hook `useCreateLaunchpad` du `@blockdeploy/core-sdk` pour déployer une instance du contrat `SimpleLaunchpad.sol`.
    *   L'adresse du portefeuille connecté devient propriétaire du contrat Launchpad.
    *   Feedback à l'utilisateur sur l'état du déploiement (envoi, confirmation, succès avec adresse du contrat, erreurs).
    *   **Note :** L'utilisateur est informé qu'il doit transférer manuellement les tokens ERC-20 à vendre à l'adresse du contrat Launchpad après son déploiement pour que la vente puisse fonctionner.
*   **Visualisation de Launchpad (`/launchpad/[id]`) :**
    *   Page dynamique affichant les détails d'un launchpad spécifique via son adresse de contrat.
    *   Utilisation du hook `useLaunchpadStatus` du SDK pour récupérer et afficher :
        *   Informations sur le token (symbole, adresse, décimales).
        *   Prix par token.
        *   Deadline de la vente (avec un compte à rebours).
        *   Progression de la vente (tokens vendus / total à vendre) avec une barre visuelle.
        *   Montant total d'ETH récoltés.
        *   Adresse du propriétaire du launchpad.
        *   Statut (Vente active / terminée).
*   **Participation à un Launchpad (Achat) :**
    *   Widget d'achat (`BuyTokenWidget`) intégré dans la page de visualisation.
    *   Permet aux utilisateurs de spécifier la quantité de tokens (unités entières) qu'ils souhaitent acheter.
    *   Calcul et affichage du coût total en ETH.
    *   Utilisation du hook `useLaunchpadBuy` du SDK pour interagir avec la fonction `buy()` du contrat Launchpad.
    *   Feedback à l'utilisateur sur l'état de la transaction d'achat.
    *   Le widget est désactivé si la vente n'est pas active, si le portefeuille n'est pas connecté, ou si tous les tokens ont été vendus.
*   **Actions du Propriétaire :**
    *   Si l'utilisateur connecté est le propriétaire du launchpad et que la vente est terminée :
        *   Bouton fonctionnel "Retirer les Fonds (ETH)" utilisant `useLaunchpadOwnerActions` du SDK.
        *   Bouton fonctionnel "Retirer Tokens Invendus" utilisant `useLaunchpadOwnerActions` du SDK.
    *   Feedback à l'utilisateur sur l'état des transactions de retrait.

## 2. Structure des Dossiers Clés

*   `src/app/`: Contient les routes principales de l'application.
    *   `layout.tsx`: Layout global de l'application Launchpad, intégrant `BlockDeployProviders`.
    *   `page.tsx`: Page d'accueil/listing des launchpads (pour l'instant, simple page d'accueil).
    *   `create/page.tsx`: Page contenant le formulaire de création d'un nouveau launchpad.
    *   `launchpad/[id]/page.tsx`: Page dynamique pour afficher les détails d'un launchpad spécifique (où `[id]` est l'adresse du contrat).
*   `src/components/`: Composants React réutilisables.
    *   `layout/`: Header et Footer de la dApp.
    *   `ui/`: Composants UI génériques (si besoin, sinon ceux du `core-sdk` ou Tailwind direct).
*   `src/lib/`: Fonctions utilitaires (ex: `shortenAddress`, `getExplorerUrl`).
*   `public/`: Assets statiques.

## 3. Prérequis

*   Node.js (v18.x ou LTS recommandée)
*   Yarn (v1.x "Classic" ou plus récent)

## 4. Installation

Cette application fait partie du monorepo BlockDeploy. Les dépendances sont installées via `yarn install` à la racine du monorepo.
Le `@blockdeploy/core-sdk` est lié via Yarn Workspaces.

## 5. Variables d'Environnement

Créez un fichier `.env.local` à la racine de ce package (`apps/launchpad/.env.local`) pour les variables d'environnement.
Les variables nécessaires sont principalement celles requises par le `@blockdeploy/core-sdk` :

*   `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`: **Requis.** Votre Project ID obtenu depuis [WalletConnect Cloud](https://cloud.walletconnect.com/).
*   `NEXT_PUBLIC_ALCHEMY_ID` (Optionnel, si vous utilisez un provider RPC spécifique).

Exemple de `.env.local`:
```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here
```

## 6. Développement

Pour lancer l'application Launchpad en mode développement :
```bash
yarn workspace launchpad dev
```
L'application sera accessible sur le port spécifié dans son `package.json` (par défaut `http://localhost:3002` si non modifié).

## 7. Build

Pour builder l'application pour la production :
```bash
yarn workspace launchpad build
```
Les fichiers de build seront générés dans le dossier `.next/`.

## 8. Contribution

Suivez les directives de contribution du monorepo BlockDeploy.

---
**Signé : Team Primex Software – https://primex-software.com**
