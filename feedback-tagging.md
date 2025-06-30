# Système de Tagging pour les Retours de la Beta Publique

Ce document définit la convention de tagging (étiquetage) à utiliser pour catégoriser les feedbacks reçus via GitHub Issues durant la beta publique de Primex Software. L'utilisation cohérente de ces tags permettra une meilleure organisation, priorisation et analyse des retours.

Les labels (tags) sur GitHub Issues seront préfixés pour faciliter leur identification et leur regroupement (par exemple, `type:`, `priority:`, `module:`, `status:`).

## 1. Type de Retour (`type:`)
*   `type:bug` : Pour les dysfonctionnements, erreurs ou comportements inattendus.
*   `type:feature-request` : Pour les suggestions de nouvelles fonctionnalités ou d'améliorations significatives de fonctionnalités existantes.
*   `type:ui-ux` : Pour les retours spécifiques à l'interface utilisateur (aspect visuel, design) ou à l'expérience utilisateur (ergonomie, intuitivité, facilité d'utilisation).
*   `type:performance` : Pour les problèmes de lenteur, de temps de chargement excessif, ou de consommation anormale de ressources.
*   `type:documentation` : Pour les retours concernant le `Beta_Test_Guide.md`, les messages d'aide dans l'application, ou toute autre documentation fournie.
*   `type:question` : Pour les questions des testeurs sur le fonctionnement de l'application qui ne sont pas des bugs ou des demandes de fonctionnalités.
*   `type:security` : Pour les vulnérabilités de sécurité potentielles identifiées.
*   `type:other` : Pour les retours qui ne rentrent dans aucune des catégories ci-dessus.

## 2. Priorité du Retour (`priority:`)
Cette priorité est initialement suggérée par le testeur (via le `Beta_Feedback_Form.md`) et peut être ajustée par l'équipe Primex.
*   `priority:critical` : Bloquant l'utilisation d'une fonctionnalité majeure, pas de contournement possible. Nécessite une attention immédiate.
*   `priority:high` : Impacte significativement une fonctionnalité majeure, ou problème de sécurité. Un contournement peut exister.
*   `priority:medium` : Bug non critique, ou amélioration UI/UX notable, ou demande de fonctionnalité pertinente.
*   `priority:low` : Problème mineur (ex: faute de frappe), suggestion d'amélioration de faible impact, ou question simple.

## 3. Module Concerné (`module:`)
Ces tags permettent d'identifier rapidement la partie de l'application concernée.
*   `module:auth` : Inscription, connexion, réinitialisation de mot de passe, OAuth.
*   `module:project-management` : Création/gestion de projets, tableaux de bord projets.
*   `module:tasks` : Création, assignation, modification, commentaires de tâches.
*   `module:kanban-board` : Fonctionnalités spécifiques à la vue Kanban.
*   `module:list-view` : Fonctionnalités spécifiques à la vue Liste.
*   `module:collaboration` : Invitation de membres, permissions, commentaires au niveau projet.
*   `module:notifications` : Système de notifications (in-app, email).
*   `module:user-profile` : Gestion du profil utilisateur, paramètres.
*   `module:data-export` : Fonctionnalités d'export (CSV, etc.).
*   `module:search` : Fonctionnalité de recherche.
*   `module:mobile-responsiveness` : Problèmes spécifiques à l'affichage ou l'utilisation sur appareils mobiles.
*   `module:general` : Concerne l'application dans son ensemble ou plusieurs modules.

## 4. Statut du Retour (`status:`)
Ces tags seront gérés par l'équipe Primex pour suivre le cycle de vie d'une issue.
*   `status:open` : Nouveau retour, non encore traité. (Généralement le statut par défaut de GitHub)
*   `status:under-investigation` : L'équipe examine le retour.
*   `status:confirmed` : Le bug est confirmé / la suggestion est acceptée pour considération.
*   `status:in-progress` : Le correctif ou la fonctionnalité est en cours de développement.
*   `status:resolved` : Le correctif a été appliqué / la fonctionnalité implémentée (en attente de déploiement ou de test).
*   `status:closed-fixed` : Le problème est résolu et vérifié.
*   `status:closed-duplicate` : Ce retour est un doublon d'un autre déjà existant.
*   `status:closed-wontfix` : Le problème ne sera pas corrigé (ex: limitation connue, trop faible priorité).
*   `status:closed-cantreproduce` : Impossible de reproduire le bug signalé.
*   `status:feedback-needed` : Plus d'informations sont requises de la part du testeur.

## 5. Navigateur/OS (`env:`) (Optionnel, si récurrent)
Si des problèmes sont fréquemment liés à des environnements spécifiques, des tags peuvent être créés.
*   `env:chrome`
*   `env:firefox`
*   `env:safari`
*   `env:windows`
*   `env:macos`
*   `env:linux`
*   `env:android`
*   `env:ios`

## Application des Tags

*   **Testeurs :** Les testeurs ne sont pas tenus d'appliquer les tags eux-mêmes, mais leur description détaillée aidera l'équipe Primex à le faire correctement. Le `Beta_Feedback_Form.md` les guide pour fournir les informations nécessaires.
*   **Équipe Primex :** Désignera une ou plusieurs personnes responsables du tri initial des feedbacks et de l'application des tags pertinents. Il est crucial d'être cohérent.
*   **Revue régulière :** L'équipe devrait régulièrement revoir les issues et leurs tags pour s'assurer de leur pertinence et ajuster les priorités.

Ce système de tagging est une base et pourra être ajusté en fonction des besoins observés durant la phase de beta.
