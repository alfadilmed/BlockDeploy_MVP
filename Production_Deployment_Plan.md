# Plan de Déploiement en Production – BlockDeploy V1 (M7.1)

Ce document décrit la stack technique finale, l'infrastructure, et les étapes de déploiement pour la version 1 (V1) publique de BlockDeploy.

## 1. Stack Technique Finale

*   **Frontend :**
    *   Framework : Next.js (v13.x ou dernière version stable)
    *   Langage : TypeScript
    *   Librairies UI : Tailwind CSS, Headless UI (ou composants internes Primex équivalents)
    *   Gestion d'état : Zustand (ou Recoil/Redux Toolkit selon complexité finale)
    *   Interactions Blockchain : Ethers.js (v5.x ou v6.x), Wagmi
*   **Backend (API) :**
    *   Framework : NestJS (v9.x ou dernière version stable)
    *   Langage : TypeScript
    *   Base de données : PostgreSQL (via TypeORM ou Prisma)
    *   Authentification : JWT, intégration OAuth (Google, GitHub)
    *   Communication : RESTful APIs, WebSockets (pour notifications temps réel)
*   **Smart Contracts :**
    *   Langage : Solidity (v0.8.x)
    *   Framework de développement : Hardhat
    *   Bibliothèques : OpenZeppelin Contracts
    *   Testnets cibles pour V1 : Sepolia (principalement), Goerli (secondaire si besoin)
    *   Mainnet cible pour V1 : Ethereum Mainnet (ou L2 type Polygon/Arbitrum/Optimism si décision finale évolue)
*   **Infrastructure :**
    *   Hébergement Frontend : Vercel (pour Next.js) ou AWS Amplify/Netlify
    *   Hébergement Backend : AWS ECS/EKS, Google Cloud Run, ou Heroku (selon scalabilité et budget)
    *   Base de données : AWS RDS for PostgreSQL ou équivalent Google Cloud/Heroku Postgres
    *   Cache : Redis (optionnel, pour performances sur requêtes fréquentes)
    *   Hébergement Smart Contracts : Déployés sur la blockchain cible.
    *   RPC Nodes : Alchemy, Infura, ou QuickNode (pour interactions blockchain fiables et scalables)
    *   CDN : Cloudflare (intégré avec Vercel ou configuré séparément) ou AWS CloudFront
    *   Stockage (fichiers, avatars, etc.) : AWS S3 ou Google Cloud Storage
    *   Monitoring & Logging : Sentry, Datadog, ou ELK Stack (Elasticsearch, Logstash, Kibana) / Grafana Loki
    *   CI/CD : GitHub Actions

## 2. Instructions de Déploiement V1

### Pré-requis :
*   [ ] Tous les audits (sécurité, code) sont complétés et les correctifs critiques appliqués.
*   [ ] `MVP_Completion_Checklist.md` validée, tous modules V1 sont `✅ Stable`.
*   [ ] Variables d'environnement pour la production sont prêtes et sécurisées (clés API, secrets DB, clés privées de déploiement SC, etc.).
*   [ ] Budgets cloud et services tiers (RPC, etc.) sont configurés et alertes de coûts activées.
*   [ ] Plan de rollback défini en cas d'échec majeur du déploiement.

### A. Déploiement des Smart Contracts (si nouvelle version ou premier déploiement Mainnet)
    *   **Responsable :** Lead Smart Contract Developer, DevOps
    1.  [ ] Vérifier la configuration du `hardhat.config.js` pour le réseau Mainnet (RPC URL, private key du deployer).
    2.  [ ] S'assurer que le compte de déploiement dispose de suffisamment de ETH natif pour le gas.
    3.  [ ] Exécuter les scripts de migration/déploiement : `npx hardhat run scripts/deploy-all.ts --network mainnet` (adapter le nom du script).
    4.  [ ] Vérifier chaque transaction de déploiement sur Etherscan (ou équivalent).
    5.  [ ] Sauvegarder les adresses des contrats déployés et les ABIs.
    6.  [ ] Mettre à jour les adresses des contrats dans la configuration backend et frontend.
    7.  [ ] Soumettre le code source des contrats à Etherscan (ou équivalent) pour vérification.

### B. Déploiement du Backend (API)
    *   **Responsable :** Lead Backend Developer, DevOps
    1.  [ ] Construire l'image Docker de production : `docker build -t primex/blockdeploy-api:v1.0.0 .` (adapter le tag).
    2.  [ ] Pousser l'image vers le registre d'images (AWS ECR, Google GCR, Docker Hub).
    3.  [ ] Mettre à jour la configuration du service de production (ex: task definition ECS, Cloud Run service) pour utiliser la nouvelle image et les variables d'environnement de production.
    4.  [ ] Appliquer les migrations de base de données (si nécessaire) : `npm run migration:run:prod`.
    5.  [ ] Déployer la nouvelle version du service.
    6.  [ ] Surveiller les logs et les métriques pour détecter toute anomalie.
    7.  [ ] Effectuer des tests de santé post-déploiement (endpoints critiques).

### C. Déploiement du Frontend (Application Next.js)
    *   **Responsable :** Lead Frontend Developer, DevOps
    1.  [ ] S'assurer que les variables d'environnement de production (URL de l'API, adresses des SC, clés d'analytics) sont configurées dans le service d'hébergement (Vercel, Netlify, etc.).
    2.  [ ] Merger la branche `main` (ou `release/v1.0.0`) vers la branche de production si utilisation de GitOps avec Vercel/Netlify.
    3.  [ ] Ou déclencher manuellement le build et déploiement de production via l'interface du service d'hébergement ou via CLI : `vercel --prod`.
    4.  [ ] Surveiller le processus de build et de déploiement.
    5.  [ ] Vider les caches CDN si nécessaire (généralement géré automatiquement par Vercel/Cloudflare).
    6.  [ ] Effectuer des tests de santé post-déploiement (pages critiques, flux utilisateur principal).

### D. Post-Déploiement
    1.  [ ] Annonce interne à l'équipe de la fin du déploiement.
    2.  [ ] Exécution d'une suite de tests "smoke tests" automatisés ou manuels sur l'environnement de production.
    3.  [ ] Activation progressive du trafic si utilisation d'un système de feature flags ou blue/green deployment (pour déploiements plus complexes).
    4.  [ ] Communication au marketing/communication pour le lancement public (voir `Public_Assets_Pack.md`).

## 3. Préparation DNS et Sous-Domaine

*   **Domaine principal :** `blockdeploy.io` (supposé déjà acquis et géré par Primex Software)
*   **Sous-domaine pour l'application (MVP V1) :** `app.blockdeploy.io`
*   **Landing Page / Site Vitrine :** `www.blockdeploy.io` ou `blockdeploy.io`

### Actions DNS :
*   **Responsable :** DevOps, Tech Lead
1.  [ ] **Pour `app.blockdeploy.io` :**
    *   Si utilisation de Vercel/Netlify : Configurer un enregistrement `CNAME` ou `ALIAS` pointant vers le domaine fourni par la plateforme d'hébergement.
        *   Exemple Vercel : `app.blockdeploy.io CNAME cname.vercel-dns.com.`
    *   Si hébergement auto-géré : Configurer un enregistrement `A` pointant vers l'IP du load balancer du frontend.
2.  [ ] **Pour `www.blockdeploy.io` (Landing Page) :**
    *   Configurer les enregistrements `A` ou `CNAME` selon l'hébergement de la landing page (peut être différent de l'app).
3.  [ ] **Pour `blockdeploy.io` (apex domain) :**
    *   Configurer pour rediriger vers `www.blockdeploy.io` ou pointer directement vers la landing page (selon la stratégie SEO et hébergement). Utiliser `ALIAS`, `ANAME`, ou `A` records.
4.  [ ] **Certificats SSL/TLS :**
    *   S'assurer que des certificats SSL valides sont générés et automatiquement renouvelés pour tous les domaines et sous-domaines (généralement géré par Vercel, Cloudflare, AWS ACM).
5.  [ ] **Configuration Email (MX, SPF, DKIM, DMARC) :**
    *   Vérifier que les enregistrements DNS pour les services d'email (ex: Google Workspace, SendGrid) sont correctement configurés pour `blockdeploy.io` afin d'assurer la délivrabilité des emails transactionnels et marketing.
6.  [ ] **Propagation DNS :**
    *   Prévoir un délai pour la propagation DNS (peut prendre de quelques minutes à plusieurs heures). Utiliser des outils comme `dnschecker.org` pour vérifier. Planifier le déploiement en conséquence.

## 4. Plan de Rollback

*   **Smart Contracts :** Un rollback direct est impossible. Un nouveau déploiement de contrats corrigés (V1.0.1) serait nécessaire, avec une stratégie de migration de données/état si applicable et possible. Pour la V1, la complexité de migration est supposée faible.
*   **Backend :**
    *   Re-déployer la version stable précédente de l'image Docker.
    *   Restaurer la base de données à partir du dernier backup si des migrations destructrices ont été appliquées (dernier recours).
*   **Frontend :**
    *   Re-déployer le commit stable précédent via l'interface Vercel/Netlify ou la CLI.
    *   La plupart des plateformes modernes permettent un rollback instantané vers une version précédente.

Le plan de rollback détaillé doit être spécifique à la technologie d'hébergement choisie et testé lors de simulations si possible.

---
**Signé : Team Primex Software – https://primex-software.com**
