# Instructions de Déploiement : Plateforme Applicative (app.blockdeploy.io)

Ce document détaille les étapes pour déployer et maintenir la plateforme applicative (dApp) BlockDeploy, accessible à l'adresse `https://app.blockdeploy.io`. Cela inclut le frontend principal et potentiellement les services backend qu'il consomme directement s'ils sont sous le même processus de déploiement. Le déploiement de l'API backend principale (`https://api.blockdeploy.io`) est couvert plus en détail dans le `Production_Deployment_Plan.md`.

## 1. Vue d'ensemble

*   **Objectif :** Servir l'application frontend principale de BlockDeploy (dashboard, modules dApp, etc.).
*   **URL de Production :** `https://app.blockdeploy.io`
*   **Technologie Frontend (supposée) :** Next.js (principalement, avec SSR/SSG ou CSR selon les pages) ou autre framework SPA moderne (React CRA, Vue CLI, Angular CLI).
*   **Hébergement Frontend (recommandé) :** Vercel (idéal pour Next.js), Netlify, AWS Amplify.
*   **API Backend :** L'application consommera l'API principale sur `https://api.blockdeploy.io`.

## 2. Pré-requis

*   Accès aux identifiants du fournisseur d'hébergement (ex: Vercel, Netlify).
*   Accès au registraire de domaine pour la configuration DNS (`blockdeploy.io`).
*   Code source de l'application frontend dans un repository Git (ex: GitHub, GitLab).
*   API backend (`https://api.blockdeploy.io`) déployée et fonctionnelle.
*   Fichier `config/urls.json` contenant `{"landing": "https://blockdeploy.io", "app": "https://app.blockdeploy.io", "api": "https://api.blockdeploy.io"}`.

## 3. Processus de Build

1.  **Cloner le repository :**
    ```bash
    git clone [URL_DU_REPOSITORY_APP_FRONTEND]
    cd [NOM_DU_DOSSIER_APP_FRONTEND]
    ```
2.  **Installer les dépendances :**
    ```bash
    npm install
    # ou yarn install
    ```
3.  **Configurer les variables d'environnement :**
    *   Créez un fichier `.env.production` ou `.env.local` (ou configurez directement dans l'interface de l'hébergeur).
    *   Variables typiques nécessaires :
        ```plaintext
        NEXT_PUBLIC_APP_URL="https://app.blockdeploy.io"
        NEXT_PUBLIC_LANDING_URL="https://blockdeploy.io"
        NEXT_PUBLIC_API_URL="https://api.blockdeploy.io"
        NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID="[VOTRE_PROJECT_ID_WALLETCONNECT]"
        NEXT_PUBLIC_RPC_URL_SEPOLIA="[URL_RPC_SEPOLIA_ALCHEMY_INFURA]"
        # Ajoutez d'autres clés API publiques (Analytics, Sentry DSN Frontend, etc.)
        ```
    *   Les variables d'environnement serveur (non `NEXT_PUBLIC_`) pour Next.js doivent être configurées uniquement côté serveur/hébergement.
4.  **Builder l'application :**
    *   Si Next.js :
        ```bash
        npm run build
        # ou yarn build
        # Le build sera généré dans le dossier '.next'.
        ```
    *   Pour d'autres frameworks (React CRA, Vue, Angular), la commande peut être similaire (`npm run build`), et le dossier de sortie sera typiquement `build` ou `dist`.

## 4. Déploiement

Nous recommandons l'utilisation d'une plateforme d'hébergement moderne qui s'intègre avec Git pour des déploiements automatisés.

### Option A : Déploiement via Vercel/Netlify (Recommandé pour Next.js/SPA)

1.  **Connecter le Repository Git :**
    *   Sur Vercel ou Netlify, créez un nouveau projet/site.
    *   Connectez le repository Git de l'application frontend.
2.  **Configurer les Paramètres de Build :**
    *   **Framework Preset :** Sélectionnez le framework approprié (ex: Next.js, Create React App).
    *   **Build Command :** `npm run build` (ou équivalent).
    *   **Output Directory / Publish Directory :** `.next` (pour Next.js), `build`, `dist`, etc. (La plateforme le détecte souvent automatiquement pour les frameworks connus).
    *   **Variables d'environnement :** Configurez toutes les variables d'environnement (celles préfixées par `NEXT_PUBLIC_` et les autres nécessaires pour le build/runtime serveur si Next.js) dans l'interface de Vercel/Netlify. **Ne commitez pas de secrets dans le repository.**
3.  **Configurer le Domaine :**
    *   Ajoutez `app.blockdeploy.io` comme domaine personnalisé dans les paramètres du projet Vercel/Netlify.
    *   La plateforme fournira des instructions pour configurer l'enregistrement DNS (`CNAME` ou `A`) chez votre registraire pour le sous-domaine `app`.
4.  **Déclencher le Déploiement :**
    *   Le premier déploiement sera généralement automatique après la configuration.
    *   Les déploiements suivants seront déclenchés par des `push` sur la branche de production (ex: `main` ou `release`).

### Option B : Déploiement sur une infrastructure type conteneurs (si besoin de plus de contrôle)

Consultez le `Production_Deployment_Plan.md` pour des stratégies plus génériques de déploiement de frontend si une solution comme Vercel/Netlify n'est pas utilisée (ex: déploiement d'un serveur Node.js pour Next.js sur AWS ECS/EKS). Cela est généralement plus complexe que l'option A pour les frontends modernes.

## 5. Configuration DNS

*   **Registraire :** [Nom de votre registraire de domaine]
*   **Pour `app.blockdeploy.io` :**
    *   Si Vercel/Netlify : Un enregistrement `CNAME` pointant vers le domaine fourni par Vercel/Netlify (ex: `cname.vercel-dns.com.`) ou un enregistrement `A` vers leur IP si spécifié.
    *   Si auto-hébergé : Un enregistrement `A` pointant vers l'IP de votre load balancer ou serveur frontend.
*   **Certificat SSL :**
    *   Généralement géré automatiquement par Vercel, Netlify.
    *   Si auto-hébergé, configurez un certificat SSL (ex: via Let's Encrypt avec Caddy/Nginx, ou AWS ACM si derrière un Load Balancer AWS).
    *   Assurez-vous que le certificat couvre `app.blockdeploy.io` et que la redirection HTTPS est forcée.

## 6. Cache et CDN

*   **Vercel/Netlify :**
    *   CDN global et gestion du cache automatique et optimisée pour Next.js/SPA.
    *   Les assets statiques (JS, CSS, images) sont mis en cache agressivement.
    *   Les pages rendues côté serveur (SSR) ou via des fonctions serverless ont des stratégies de cache différentes (configurables via headers `Cache-Control`).
*   **Si auto-hébergé avec un CDN externe (ex: CloudFront) :**
    *   Configurez le CDN pour servir les assets statiques depuis leur origine.
    *   Configurez les règles de cache pour les assets statiques (long TTL) et les pages dynamiques (TTL court ou pas de cache, selon la stratégie).
    *   Passez les requêtes API à `/api/*` (si utilisation de Next.js API routes) ou à `https://api.blockdeploy.io` à l'origine sans mise en cache agressive.

## 7. Authentification et Sécurité

*   **Gestion des sessions :** Si utilisation de cookies de session (ex: NextAuth.js), assurez-vous que les paramètres de cookie (`domain`, `secure`, `httpOnly`, `sameSite`) sont correctement configurés pour l'environnement de production et le domaine `app.blockdeploy.io`.
*   **CORS :** L'API backend (`https://api.blockdeploy.io`) doit être configurée pour autoriser les requêtes provenant de `https://app.blockdeploy.io`.
*   **Headers de Sécurité :** Implémentez les headers de sécurité HTTP recommandés (CSP, X-Frame-Options, X-Content-Type-Options, etc.) via la configuration de votre hébergeur ou de votre application Next.js. Vercel/Netlify en ajoutent certains par défaut.

## 8. Monitoring Post-Déploiement

*   **Analytics Produit :** (Voir `PostLaunch_Monitoring_Plan.md`) Intégrez Mixpanel, Amplitude, etc., pour suivre l'utilisation de l'application.
*   **Error Tracking Frontend :** Configurez Sentry (ou similaire) avec le DSN frontend pour capturer les erreurs JavaScript et les problèmes de performance.
*   **Uptime Monitoring :** (Voir `PostLaunch_Monitoring_Plan.md`) Configurez un check pour `https://app.blockdeploy.io`.
*   **Logs Frontend :** Si nécessaire, envoyez des logs spécifiques du client vers votre solution de logging centralisée, mais attention au volume et aux informations sensibles.

## 9. Variables d'Environnement Spécifiques à la Production

Assurez-vous que toutes les clés API, secrets et URLs sont les versions de production :
*   URL de l'API : `https://api.blockdeploy.io`
*   Adresses des Smart Contracts : Adresses Mainnet
*   Clés de service tierces : Clés de production pour WalletConnect, Analytics, Sentry, etc.

---
**Signé : Team Primex Software – https://primex-software.com**
