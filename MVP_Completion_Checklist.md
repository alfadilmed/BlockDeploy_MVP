# Checklist de Complétion du MVP – Projet BlockDeploy (M7.1)

Ce document sert à auditer l'état de complétion du Minimum Viable Product (MVP) de la plateforme BlockDeploy avant son lancement public.

## 1. Statut des Modules Applicatifs

| Module Principal             | Sous-Module(s) / Fonctionnalité(s) Clé(s)                                  | Statut        | Responsable   | Notes / Actions Requises                                                                 |
| :--------------------------- | :------------------------------------------------------------------------- | :------------ | :------------ | :--------------------------------------------------------------------------------------- |
| **Gestion de Compte User**   | Inscription (Email/OAuth), Connexion, Profil, Paramètres                   | `✅ Stable`    | Backend Team  | Vérifier la robustesse des sessions OAuth.                                               |
|                              | Récupération de mot de passe                                               | `✅ Stable`    | Backend Team  | Tests d'email delivery à confirmer.                                                      |
| **Infrastructure Backoffice**| Gestion de projets/workspaces                                              | `✅ Stable`    | Backend Team  |                                                                                          |
|                              | Gestion des tâches et collaboration (commentaires, assignations)           | `✅ Stable`    | Core Team     | Optimiser les notifications en temps réel.                                               |
|                              | Export de données (CSV simple)                                             | `✅ Stable`    | Core Team     |                                                                                          |
| **BlockDeploy dApp: DAO Builder** | Création de DAO (configuration de base : nom, token, membres initiaux) | `🟠 Partiel`   | dApp Team     | Interface utilisateur à finaliser. Smart contract V1 audité mais V1.1 en cours d'intégration. |
|                              | Gestion de la trésorerie (visualisation simple)                            | `🟠 Partiel`   | dApp Team     | Fonctionnalités de dépôt/retrait à tester intensivement.                                 |
|                              | Système de vote (création de proposition simple, vote on-chain)            | `🟡 À corriger`| dApp Team     | Problèmes de gas estimation sur Sepolia. Smart contract de vote à re-vérifier.           |
| **BlockDeploy dApp: Token Creator** | Création de token ERC20 (standard)                                         | `✅ Stable`    | dApp Team     | Interface utilisateur validée. Smart contract audité et stable.                            |
|                              | Options de personnalisation (supply, decimals, nom, symbole)               | `✅ Stable`    | dApp Team     |                                                                                          |
|                              | Déploiement sur Testnet (Sepolia)                                          | `✅ Stable`    | dApp Team     |                                                                                          |
| **Interface Utilisateur (UI)** | Design System & Composants communs                                         | `✅ Stable`    | Frontend Team | Quelques ajustements mineurs post-beta feedback.                                         |
|                              | Responsive design (Desktop, Tablette, Mobile)                              | `🟠 Partiel`   | Frontend Team | Améliorations à apporter sur la vue Kanban mobile. Priorité moyenne.                     |
| **Documentation**            | FAQ Utilisateur                                                            | `🟠 Partiel`   | Support Team  | À compléter avec les retours de la beta.                                                 |
|                              | Guides "Premiers Pas" pour chaque dApp                                     | `🟡 À corriger`| Doc Team      | DAO Builder guide à mettre à jour post-stabilisation du module.                          |

**Légende Statut :**
*   `✅ Stable`: Fonctionnalité complète, testée et prête pour la V1.
*   `🟠 Partiel`: Fonctionnalité implémentée mais nécessite des finitions, tests supplémentaires ou manque des aspects non critiques.
*   `🟡 À corriger`: Bugs identifiés ou fonctionnalité non conforme aux attentes, nécessite une intervention avant V1.
*   `🔴 Bloqué/Reporté`: Problème majeur ou fonctionnalité reportée post-V1.

## 2. Modules Inclus dans la V1 Publique

La V1 publique de BlockDeploy inclura les modules suivants avec les fonctionnalités listées ci-dessus ayant un statut `✅ Stable` ou `🟠 Partiel` (après finalisation des points mineurs) :

*   **Gestion de Compte Utilisateur** (complète)
*   **Infrastructure Backoffice** (complète pour la gestion de projet et collaboration de base)
*   **BlockDeploy dApp: Token Creator** (complète pour la création d'ERC20 standard)
*   **BlockDeploy dApp: DAO Builder** (fonctionnalités de base : création de DAO, visualisation trésorerie. Le système de vote sera inclus si stabilisé à temps, sinon en beta fermée post-lancement V1).
*   **Interface Utilisateur** (avec les limitations connues pour mobile sur certaines vues complexes).
*   **Documentation** (FAQ de base, Guide "Premiers Pas" pour Token Creator. Guide DAO Builder sera mis à jour post-lancement).

**Modules/Fonctionnalités explicitement exclus de la V1 (reportés) :**
*   Fonctionnalités avancées du DAO Builder (ex: modules d'extensions complexes, intégrations DeFi poussées).
*   Launchpad (prévu pour V1.x ou V2).
*   Marché de templates de Smart Contracts (prévu pour V2).
*   Import/Export de configurations de projet avancées.

## 3. Tests Fonctionnels Restants ou à Renforcer

*   **Tests de charge et de performance :**
    *   Simuler N utilisateurs concurrents sur les modules DAO Builder et Token Creator. (Responsable: QA Team)
    *   Mesurer les temps de réponse API sous charge. (Responsable: Backend Team)
*   **Tests de sécurité :**
    *   Audit de sécurité final des smart contracts du DAO Builder (surtout le module de vote). (Responsable: External Auditor + dApp Team)
    *   Scan de vulnérabilités sur l'application web (XSS, CSRF, Injection SQL si applicable). (Responsable: Security Team)
    *   Vérification des permissions et des accès concurrents. (Responsable: QA Team)
*   **Tests d'intégration inter-modules :**
    *   Assurer que les tokens créés via Token Creator peuvent être utilisés correctement dans le DAO Builder. (Responsable: dApp Team)
    *   Flux utilisateur complet : inscription -> création projet -> création token -> création DAO utilisant ce token. (Responsable: QA Team)
*   **Tests d'utilisabilité (post-beta feedback) :**
    *   Valider la prise en compte des retours UI/UX critiques de la phase beta. (Responsable: UX Team, Frontend Team)
    *   Session de test "utilisateur novice" sur le flux complet. (Responsable: UX Team)
*   **Tests sur navigateurs et appareils cibles :**
    *   Validation finale sur les dernières versions de Chrome, Firefox, Safari, Edge. (Responsable: Frontend Team)
    *   Validation sur une sélection d'appareils mobiles iOS et Android représentatifs. (Responsable: Frontend Team)
*   **Tests de résilience et de récupération :**
    *   Simuler des pannes de services dépendants (ex: RPC node) et vérifier le comportement de l'application. (Responsable: DevOps, Backend Team)

Cette checklist sera mise à jour régulièrement jusqu'au gel des fonctionnalités pour la V1.

---
**Signé : Team Primex Software – https://primex-software.com**
