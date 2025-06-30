```markdown
# Intégration avec le Drag & Drop Builder - Module : Blocs Marketplace

**Document élaboré par : Team Primex Software**
**Site Web : https://primex-software.com**
**Version : 1.0**

---
**Signé : Team Primex Software – https://primex-software.com**
---

## Table des Matières

1.  [Introduction](#1-introduction)
2.  [Objectifs de l'Intégration](#2-objectifs-de-lintégration)
3.  [Flux Utilisateur d'Importation d'un Bloc](#3-flux-utilisateur-dimportation-dun-bloc)
4.  [Modifications Nécessaires dans le Drag & Drop Builder (Module M4.1)](#4-modifications-nécessaires-dans-le-drag--drop-builder-module-m41)
    *   [4.1 Interface Utilisateur pour Accéder à la Marketplace](#41-interface-utilisateur-pour-accéder-à-la-marketplace)
    *   [4.2 Logique d'Importation et d'Injection de Blocs](#42-logique-dimportation-et-dinjection-de-blocs)
5.  [Communication API entre Builder et Marketplace](#5-communication-api-entre-builder-et-marketplace)
6.  [Gestion des Dépendances et Styles des Blocs](#6-gestion-des-dépendances-et-styles-des-blocs)
7.  [Gestion des Blocs Payants (Simulé MVP)](#7-gestion-des-blocs-payants-simulé-mvp)
8.  [Considérations Techniques](#8-considérations-techniques)

## 1. Introduction

Ce document décrit comment le module Drag & Drop Builder (D&D Builder - M4.1) s'intégrera avec la Blocs Marketplace (M4.2, M5.3) pour permettre aux utilisateurs d'importer et d'utiliser des Blocs pré-conçus dans leurs propres designs de page ou d'interface dApp.

## 2. Objectifs de l'Intégration

*   **Faciliter la Réutilisation :** Permettre aux utilisateurs du D&D Builder d'accélérer leur processus de design en important des Blocs depuis la marketplace.
*   **Expérience Utilisateur Fluide :** L'accès à la marketplace et l'importation de Blocs doivent être intuitifs depuis l'interface du D&D Builder.
*   **Compatibilité :** Assurer que les Blocs importés (leur structure JSON) sont correctement interprétés et rendus par le D&D Builder.
*   **Gestion des Licences (Simulée) :** Le D&D Builder doit respecter (simuler pour le MVP) les conditions de licence des Blocs (gratuits vs. payants "acquis").

## 3. Flux Utilisateur d'Importation d'un Bloc

1.  **Dans le D&D Builder :** L'utilisateur travaille sur son design.
2.  **Accès à la Marketplace :** L'utilisateur clique sur un bouton/icône "Ajouter depuis la Marketplace des Blocs" (ou similaire) dans l'interface du D&D Builder (ex: dans la palette de composants ou une barre d'outils).
3.  **Navigation dans la Marketplace :** Une modale ou un panneau latéral s'ouvre, affichant l'interface de la Blocs Marketplace (utilisant les composants `BlocGrid`, `SearchBar`, `CategorySidebar` de la marketplace).
4.  **Sélection d'un Bloc :** L'utilisateur navigue, recherche et sélectionne un Bloc qui l'intéresse. Il peut voir les détails du Bloc (`BlocDetailView`).
5.  **Vérification de Licence/Paiement (Simulée MVP) :**
    *   Si le Bloc est gratuit, l'utilisateur peut directement l'importer.
    *   Si le Bloc est payant (simulé) :
        *   Si l'utilisateur ne l'a pas encore "acquis", un message l'invite à le faire (simulé, cf. `Payment_License_System.md`).
        *   Si déjà "acquis", il peut l'importer.
6.  **Importation du Bloc :** L'utilisateur clique sur "Importer ce Bloc" (ou un bouton similaire).
7.  **Injection dans le Canvas :**
    *   Le D&D Builder récupère la structure JSON (`content`) du Bloc sélectionné.
    *   L'utilisateur peut être invité à cliquer sur le canvas à l'endroit où il souhaite insérer le Bloc, ou le Bloc est ajouté à la fin du conteneur sélectionné / de la page.
    *   Le Bloc (ensemble de composants) est ajouté à la structure de la page de l'utilisateur dans le D&D Builder.
8.  **Personnalisation :** Une fois importé, le Bloc et ses composants enfants sont modifiables par l'utilisateur comme s'il les avait créés lui-même.

## 4. Modifications Nécessaires dans le Drag & Drop Builder (Module M4.1)

### 4.1 Interface Utilisateur pour Accéder à la Marketplace

*   Ajouter un **bouton ou une section** dans l'UI du D&D Builder (ex: dans la `ComponentPalette` ou une `TopBar`) pour "Parcourir la Marketplace des Blocs".
*   Ce bouton ouvrira une **modale ou un panneau latéral** qui embarquera une vue de la Blocs Marketplace. Cette vue réutilisera les composants de listing et de détail de la marketplace (`BlocGrid`, `BlocDetailView`, etc.).

### 4.2 Logique d'Importation et d'Injection de Blocs

Le D&D Builder aura besoin d'une nouvelle logique dans son store d'état ou ses services pour :
1.  **Recevoir le JSON du Bloc :** Accepter la structure JSON (`content`) d'un Bloc sélectionné depuis l'interface de la marketplace.
2.  **Traiter le JSON du Bloc :**
    *   **Regénérer les IDs :** Les `id` des composants à l'intérieur du Bloc doivent être rendus uniques au sein du design actuel de l'utilisateur pour éviter les conflits. Une stratégie de préfixage ou de génération de nouveaux UUIDs sera appliquée.
    *   **Valider la Structure :** S'assurer que les `type` de composants du Bloc sont connus par le D&D Builder.
3.  **Ajouter à la Page :**
    *   Modifier l'état de la page (`pageStructure` dans le store du D&D Builder) pour insérer le nouveau groupe de composants (le Bloc) à l'endroit approprié (ex: à la fin, ou dans un conteneur cible).
    *   Le moteur de rendu du D&D Builder affichera alors le Bloc importé sur le canvas.

## 5. Communication API entre Builder et Marketplace

*   Lorsque l'utilisateur navigue dans la marketplace depuis le D&D Builder, l'interface de la marketplace (embarquée) effectuera des appels aux API de la Blocs Marketplace :
    *   `GET /api/v1/blocs-marketplace/blocs` (pour lister/rechercher).
    *   `GET /api/v1/blocs-marketplace/blocs/{blocId}` (pour obtenir le JSON complet d'un bloc, y compris son `content`, lorsque l'utilisateur clique sur "Importer").
*   Pour la vérification des Blocs payants "acquis" (MVP simulé) :
    *   Le D&D Builder pourra vérifier le `localStorage` ou appeler un endpoint mock du backend de la marketplace (ex: `GET /api/v1/blocs-marketplace/users/me/unlocked-blocs/{blocId}`).

## 6. Gestion des Dépendances et Styles des Blocs

*   **Styles :**
    *   Les Blocs sont définis avec des `props` qui incluent des styles de base (couleurs, padding, etc.). Le D&D Builder appliquera ces styles.
    *   Si les Blocs utilisent des classes CSS spécifiques (non recommandé pour la portabilité maximale), ces classes devraient idéalement provenir d'un framework CSS commun (ex: Tailwind) utilisé à la fois par le Builder et pour la création des Blocs, ou être auto-contenues.
    *   Pour le MVP, on s'attend à ce que les styles soient principalement via des props mappées à des styles inline ou des classes utilitaires gérées par le Builder.
*   **Dépendances Externes (ex: polices, icônes spécifiques) :**
    *   Le format du Bloc (`Bloc_Definition_Format.md`) peut inclure une section `dependencies`.
    *   Pour le MVP, le D&D Builder ne gérera probablement pas activement l'installation de ces dépendances. Les Blocs devraient essayer d'être aussi auto-contenus que possible ou utiliser des ressources largement disponibles.
    *   L'utilisateur pourrait être informé si un Bloc a des dépendances non standards.

## 7. Gestion des Blocs Payants (Simulé MVP)

Tel que décrit dans `Payment_License_System.md` et le flux utilisateur :
1.  L'interface de la marketplace dans le D&D Builder affichera le prix simulé.
2.  Si un Bloc est payant et non "acquis" :
    *   Le bouton "Importer" pourrait être désactivé ou rediriger vers la page du Bloc sur la marketplace principale pour "l'acquisition" simulée.
    *   Alternativement, un bouton "Acquérir (Simulé)" dans la modale d'importation pourrait mettre à jour l'état local (`localStorage`) pour marquer le bloc comme acquis.
3.  Une fois "acquis", le bouton "Importer" devient actif.

## 8. Considérations Techniques

*   **Performance :** Le chargement de la liste des Blocs et l'importation d'un Bloc doivent être rapides.
*   **Isolation des Styles :** Si les Blocs peuvent définir des CSS très spécifiques, il faut s'assurer qu'ils n'entrent pas en conflit avec les styles du D&D Builder ou de la page de l'utilisateur. Le rendu dans un `iframe` pour la prévisualisation dans la marketplace est une option, mais l'intégration directe dans le canvas du builder est plus complexe. Pour le MVP, on s'appuie sur des styles via `props`.
*   **Sécurité :** Bien que le JSON d'un Bloc ne devrait pas contenir de code exécutable directement, la validation de la structure et des types de composants est importante. Si des Blocs Web3 contiennent des configurations de smart contracts, celles-ci sont juste des données (adresses, ABI) que le moteur de rendu du Builder utilisera.

---
**Signé : Team Primex Software – https://primex-software.com**
```
