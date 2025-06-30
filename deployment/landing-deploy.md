# Instructions de Déploiement : Landing Page (blockdeploy.io)

Ce document détaille les étapes pour déployer et maintenir la landing page marketing de BlockDeploy, accessible à l'adresse `https://blockdeploy.io`.

## 1. Vue d'ensemble

*   **Objectif :** Servir le site vitrine statique de BlockDeploy.
*   **URL de Production :** `https://blockdeploy.io` (et potentiellement `https://www.blockdeploy.io` avec redirection).
*   **Technologie (supposée) :** Site statique généré (Next.js export statique, Hugo, Jekyll, ou HTML/CSS/JS pur). Les instructions ci-dessous sont génériques et devront être adaptées à la technologie spécifique.
*   **Hébergement (recommandé) :** Vercel, Netlify, GitHub Pages, AWS S3 + CloudFront, Cloudflare Pages.

## 2. Pré-requis

*   Accès aux identifiants du fournisseur d'hébergement (ex: Vercel, Netlify).
*   Accès au registraire de domaine pour la configuration DNS (`blockdeploy.io`).
*   Code source de la landing page dans un repository Git (ex: GitHub, GitLab).
*   Fichier `config/urls.json` contenant `{"landing": "https://blockdeploy.io", "app": "https://app.blockdeploy.io", "api": "https://api.blockdeploy.io"}`. Ce fichier peut être utilisé pour s'assurer que les liens vers l'application sont corrects.

## 3. Processus de Build et Export (Exemple avec Next.js export statique)

1.  **Cloner le repository :**
    ```bash
    git clone [URL_DU_REPOSITORY_LANDING_PAGE]
    cd [NOM_DU_DOSSIER_LANDING_PAGE]
    ```
2.  **Installer les dépendances :**
    ```bash
    npm install
    # ou yarn install
    ```
3.  **Configurer les variables d'environnement (si nécessaire) :**
    *   Créer un fichier `.env.production` ou `.env.local` si la landing page nécessite des clés API (ex: pour un formulaire de contact, analytics) ou pour lire `config/urls.json`.
    *   Exemple de variable qui pourrait être utile :
        `NEXT_PUBLIC_APP_URL="https://app.blockdeploy.io"`
        `NEXT_PUBLIC_LANDING_URL="https://blockdeploy.io"`
4.  **Builder et Exporter le site statique :**
    *   Si Next.js (avec `output: 'export'` dans `next.config.js`):
        ```bash
        npm run build
        # ou yarn build
        # Le site statique sera généré dans le dossier 'out'.
        ```
    *   Pour d'autres générateurs, adapter la commande (ex: `hugo`, `jekyll build`).

## 4. Déploiement

Nous recommandons l'utilisation d'une plateforme d'hébergement moderne pour sites statiques qui s'intègre avec Git pour des déploiements automatisés.

### Option A : Déploiement via Vercel/Netlify (Recommandé)

1.  **Connecter le Repository Git :**
    *   Sur Vercel ou Netlify, créez un nouveau projet/site.
    *   Connectez le repository Git de la landing page.
2.  **Configurer les Paramètres de Build :**
    *   **Framework Preset :** Sélectionnez le framework approprié (ex: Next.js, Autre).
    *   **Build Command :** `npm run build` (ou équivalent).
    *   **Output Directory / Publish Directory :** `out` (pour Next.js export), `public`, `_site`, etc., selon le générateur.
    *   **Variables d'environnement :** Configurez les mêmes variables que celles de votre `.env.production` dans l'interface de Vercel/Netlify.
3.  **Configurer le Domaine :**
    *   Ajoutez `blockdeploy.io` (et `www.blockdeploy.io` si souhaité) comme domaine personnalisé dans les paramètres du projet Vercel/Netlify.
    *   La plateforme fournira des instructions pour configurer les enregistrements DNS chez votre registraire.
4.  **Déclencher le Déploiement :**
    *   Le premier déploiement sera généralement automatique après la configuration.
    *   Les déploiements suivants seront déclenchés par des `push` sur la branche de production (ex: `main` ou `master`).

### Option B : Déploiement Manuel (Exemple AWS S3 + CloudFront)

1.  **Configurer un Bucket S3 :**
    *   Créez un bucket S3 (ex: `blockdeploy.io`).
    *   Activez l'hébergement de site web statique sur le bucket.
    *   Configurez les permissions du bucket pour un accès public en lecture.
2.  **Uploader les Fichiers :**
    *   Uploadez le contenu du dossier `out` (ou équivalent) à la racine du bucket S3.
    *   Utilisez l'AWS CLI : `aws s3 sync out/ s3://blockdeploy.io --delete`
3.  **Configurer CloudFront (CDN) :**
    *   Créez une distribution CloudFront.
    *   Configurez l'origine pour pointer vers le site web endpoint du bucket S3 (pas l'API REST du bucket).
    *   Configurez `blockdeploy.io` (et `www.blockdeploy.io`) comme "Alternate Domain Names (CNAMEs)".
    *   Demandez ou importez un certificat SSL via AWS Certificate Manager (ACM) pour ces domaines dans la région `us-east-1`.
    *   Configurez la distribution pour utiliser ce certificat SSL.
    *   Configurez la redirection HTTP vers HTTPS.
    *   Paramétrez les politiques de cache (TLL) pour les différents types de fichiers.
4.  **Configurer les DNS :**
    *   Chez votre registraire, pointez `blockdeploy.io` (et `www`) vers la distribution CloudFront en utilisant un enregistrement `ALIAS` (si le registraire le supporte et est Route 53) ou `CNAME`.

## 5. Configuration DNS

*   **Registraire :** [Nom de votre registraire de domaine, ex: GoDaddy, Namecheap, AWS Route 53]
*   **Pour `blockdeploy.io` (Apex Domain) :**
    *   Si Vercel/Netlify : Suivez leurs instructions (souvent un `A` record pointant vers leur IP ou un `ALIAS`).
    *   Si CloudFront : `ALIAS` vers la distribution CloudFront, ou `A` record si vous utilisez S3 directement (non recommandé sans CDN).
*   **Pour `www.blockdeploy.io` (Sous-domaine) :**
    *   `CNAME` pointant vers `blockdeploy.io` pour une redirection simple, ou configuré comme `blockdeploy.io` s'il sert le même contenu.
    *   Ou `CNAME` pointant vers Vercel/Netlify/CloudFront si géré séparément.
*   **Certificat SSL :**
    *   Généralement géré automatiquement par Vercel, Netlify, ou via AWS ACM pour CloudFront. Assurez-vous qu'il est actif et couvre `blockdeploy.io` et `www.blockdeploy.io`.
    *   Forcez la redirection HTTPS.

## 6. Cache et CDN

*   **Vercel/Netlify :** Gèrent le CDN et le cache automatiquement. Des options de configuration manuelle du cache existent si besoin (via `vercel.json` ou `netlify.toml`).
*   **CloudFront :** Configurez les comportements de cache (Cache Policies) pour optimiser la mise en cache des assets (HTML, CSS, JS, images).
    *   Fichiers HTML : TTL court ou basé sur `Cache-Control` headers.
    *   Assets versionnés (CSS, JS, images avec hash dans le nom) : TTL long.
*   **Invalidation du Cache :**
    *   Après chaque déploiement, si les noms de fichiers n'incluent pas de hash, une invalidation du cache CDN peut être nécessaire pour forcer la distribution des nouvelles versions.
    *   Vercel/Netlify gèrent cela intelligemment.
    *   Sur CloudFront, créez une invalidation pour `/*`.

## 7. Authentification

*   La landing page est un site public et ne devrait **pas** nécessiter d'authentification pour l'accès public.
*   Si des sections d'administration existent (ex: CMS headless), elles doivent être sécurisées séparément et ne pas faire partie du build statique public directement accessible.

## 8. Monitoring Post-Déploiement

*   **Google Analytics / Plausible / Fathom :** Intégrez un outil d'analyse d'audience.
*   **Uptime Monitoring :** (Voir `PostLaunch_Monitoring_Plan.md`) Configurez un check pour `https://blockdeploy.io`.
*   **Console de recherche (Google Search Console, Bing Webmaster Tools) :** Soumettez le sitemap (`sitemap.xml`) et surveillez l'indexation et les erreurs de crawl.

---
**Signé : Team Primex Software – https://primex-software.com**
