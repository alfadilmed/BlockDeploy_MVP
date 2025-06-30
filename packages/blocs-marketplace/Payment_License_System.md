```markdown
# Système de Paiement et Licences (Simulé) - Module : Blocs Marketplace

**Document élaboré par : Team Primex Software**
**Site Web : https://primex-software.com**
**Version : 1.0**

---
**Signé : Team Primex Software – https://primex-software.com**
---

## Table des Matières

1.  [Introduction](#1-introduction)
2.  [Objectifs pour le MVP (Simulation)](#2-objectifs-pour-le-mvp-simulation)
3.  [Types de Licences Envisagés (pour MVP et Futur)](#3-types-de-licences-envisagés-pour-mvp-et-futur)
    *   [3.1 Gratuit (Ex: MIT, Creative Commons)](#31-gratuit-ex-mit-creative-commons)
    *   [3.2 Payant - Usage Unique (Simulé MVP)](#32-payant---usage-unique-simulé-mvp)
    *   [3.3 Payant - Abonnement (Futur)](#33-payant---abonnement-futur)
    *   [3.4 Payant - Licence Limitée par Projet/Domaine (Futur)](#34-payant---licence-limitée-par-projetdomaine-futur)
4.  [Logique de Paiement (Simulation pour MVP)](#4-logique-de-paiement-simulation-pour-mvp)
    *   [4.1 Indication du Prix](#41-indication-du-prix)
    *   [4.2 Simulation de l'Acquisition](#42-simulation-de-lacquisition)
    *   [4.3 Accès au Bloc](#43-accès-au-bloc)
5.  [Affichage dans l'Interface Utilisateur](#5-affichage-dans-linterface-utilisateur)
6.  [Considérations pour un Système Réel (Post-MVP)](#6-considérations-pour-un-système-réel-post-mvp)
    *   [6.1 Intégration de Passerelle de Paiement](#61-intégration-de-passerelle-de-paiement)
    *   [6.2 Gestion des Droits Numériques (DRM) / Contrôle d'Accès](#62-gestion-des-droits-numériques-drm--contrôle-daccès)
    *   [6.3 Reversement aux Créateurs](#63-reversement-aux-créateurs)
    *   [6.4 Facturation et Taxes](#64-facturation-et-taxes)
    *   [6.5 Smart Contracts pour Paiements et Licences (Option Web3)](#65-smart-contracts-pour-paiements-et-licences-option-web3)
7.  [Champs Associés dans `Bloc_Definition_Format.md`](#7-champs-associés-dans-bloc_definition_formatmd)

## 1. Introduction

Ce document décrit le système de licences et de paiement envisagé pour les Blocs sur la Blocs Marketplace. Pour le Milestone M5.3 (Blocs Marketplace Fonctionnel - MVP), ce système sera **simulé**. L'objectif est de poser les bases conceptuelles et d'intégrer les indicateurs nécessaires dans les métadonnées des Blocs et l'interface utilisateur, sans implémenter de transactions financières réelles.

## 2. Objectifs pour le MVP (Simulation)

*   Permettre aux soumissionnaires de Blocs (internes pour le MVP) de spécifier un type de licence et, le cas échéant, un prix indicatif pour leurs Blocs.
*   Afficher clairement ces informations de licence et de prix (simulé) aux utilisateurs de la marketplace.
*   Simuler le processus d'"acquisition" d'un Bloc payant pour permettre son utilisation dans le Drag & Drop Builder (ex: via un état local dans le navigateur ou un mock côté backend).
*   Ne **pas** implémenter de flux de paiement réel ni de gestion de droits numériques complexe.

## 3. Types de Licences Envisagés (pour MVP et Futur)

Les Blocs pourront être proposés sous différentes licences.

### 3.1 Gratuit (Ex: MIT, Creative Commons)

*   **Description :** Le Bloc est disponible gratuitement, souvent avec une licence open-source permissive comme MIT, ou une licence Creative Commons pour les assets de design.
*   **MVP :** Supporté. Le soumissionnaire peut spécifier "Gratuit" et optionnellement le type de licence (ex: "MIT").
*   **Champ `metadata.licenseType` :** `"Free"`
*   **Champ `metadata.licenseName` :** `"MIT"` (optionnel)
*   **Champ `metadata.price` :** `0` ou absent.

### 3.2 Payant - Usage Unique (Simulé MVP)

*   **Description :** L'utilisateur paie une fois pour obtenir le droit d'utiliser le Bloc dans un certain nombre de projets ou sans restriction (selon les termes).
*   **MVP (Simulation) :**
    *   Le soumissionnaire peut marquer son Bloc comme "Payant" et indiquer un prix fictif (ex: "5 USD", "0.01 ETH").
    *   L'interface affichera ce prix.
    *   Un bouton "Obtenir ce Bloc" (ou "Acheter") simulera l'acquisition.
*   **Champ `metadata.licenseType` :** `"PaidUsage"`
*   **Champ `metadata.price` :** `{ "amount": 5, "currency": "USD" }` (structure exemple)
*   **Champ `metadata.paymentFrequency` :** `"one-time"`

### 3.3 Payant - Abonnement (Futur)

*   **Description :** L'accès à une collection de Blocs (ou à tous les Blocs d'un créateur) est conditionné à un abonnement récurrent.
*   **MVP :** Non supporté. Mentionné pour l'avenir.
*   **Champ `metadata.licenseType` :** `"Subscription"`
*   **Champ `metadata.paymentFrequency` :** `"monthly"` / `"yearly"`

### 3.4 Payant - Licence Limitée par Projet/Domaine (Futur)

*   **Description :** L'utilisateur paie pour utiliser le Bloc sur un nombre limité de sites web/projets ou pour un domaine spécifique.
*   **MVP :** Non supporté.

## 4. Logique de Paiement (Simulation pour MVP)

### 4.1 Indication du Prix

*   Si `metadata.licenseType` est `"PaidUsage"`, le `metadata.price` (ex: `{ "amount": 10, "currency": "USD_MOCK" }`) est affiché sur la `BlocCard` et la `BlocDetailView`.
*   La devise "USD_MOCK" ou "ETH_MOCK" indique clairement qu'il s'agit d'un prix simulé.

### 4.2 Simulation de l'Acquisition

1.  L'utilisateur clique sur le bouton "Obtenir ce Bloc pour X USD_MOCK" sur la `BlocDetailView`.
2.  **Aucune passerelle de paiement n'est appelée.**
3.  Le frontend pourrait :
    *   Afficher un message de confirmation : "Vous avez 'acquis' le Bloc XYZ ! Vous pouvez maintenant l'utiliser dans le Drag & Drop Builder."
    *   Enregistrer localement (ex: dans `localStorage`) que l'utilisateur a "débloqué" ce Bloc. Clé : `blockdeploy_unlocked_blocs`, Valeur : `["blocId1", "blocId2"]`.
    *   Alternativement, si l'utilisateur est authentifié sur BlockDeploy, un endpoint mock backend `POST /api/v1/blocs-marketplace/blocs/{blocId}/acquire-mock` pourrait être appelé pour enregistrer cette "acquisition" dans le profil utilisateur (toujours sans paiement réel).

### 4.3 Accès au Bloc

*   Lorsque le Drag & Drop Builder tente d'importer un Bloc marqué comme "Payant" :
    *   Il vérifie d'abord si le Bloc a été "acquis" par l'utilisateur (via `localStorage` ou l'état utilisateur si backend mock).
    *   Si oui, l'importation est autorisée.
    *   Si non, un message s'affiche : "Ce Bloc est payant. Veuillez l'acquérir depuis la Marketplace pour l'utiliser." avec un lien vers la page du Bloc sur la marketplace.

## 5. Affichage dans l'Interface Utilisateur

*   **`BlocCard` / `BlocDetailView` :**
    *   Afficher clairement le type de licence (Gratuit, Payant).
    *   Si payant, afficher le prix simulé (ex: "Prix : 10 USD (simulé)").
    *   Le bouton d'action sera "Utiliser ce Bloc" (pour les gratuits ou déjà acquis) ou "Obtenir pour X USD (simulé)" (pour les payants non acquis).
*   **Drag & Drop Builder (Interface d'importation de Blocs) :**
    *   Les Blocs payants non acquis pourraient être grisés ou avoir une icône "cadenas", avec une infobulle expliquant qu'ils doivent être "acquis" sur la marketplace.

## 6. Considérations pour un Système Réel (Post-MVP)

L'implémentation d'un système de paiement et de licences réel est complexe et nécessitera :

### 6.1 Intégration de Passerelle de Paiement

*   Intégration avec des services comme Stripe (pour paiements fiat) ou des solutions de paiement crypto (ex: Coinbase Commerce, ou direct via smart contracts).

### 6.2 Gestion des Droits Numériques (DRM) / Contrôle d'Accès

*   Un backend robuste pour suivre quels utilisateurs ont acheté quels Blocs.
*   Le Drag & Drop Builder devra vérifier auprès de ce backend si l'utilisateur a le droit d'importer un Bloc payant.

### 6.3 Reversement aux Créateurs

*   Système pour que les créateurs de Blocs puissent configurer leurs informations de paiement.
*   Logique de calcul et de distribution des revenus (après déduction des frais de plateforme BlockDeploy).
*   Gestion des litiges et remboursements.

### 6.4 Facturation et Taxes

*   Génération de factures pour les acheteurs.
*   Gestion de la TVA et autres taxes applicables selon les régions.

### 6.5 Smart Contracts pour Paiements et Licences (Option Web3)

*   Envisager d'utiliser des smart contracts pour gérer les licences sous forme de NFTs (ex: un NFT représente le droit d'utiliser un Bloc).
*   Les paiements pourraient se faire directement en cryptomonnaies via un smart contract de la marketplace, qui distribuerait ensuite les fonds au créateur et à la plateforme. Cela ajouterait de la transparence mais aussi de la complexité (frais de gas, expérience utilisateur Web3).

## 7. Champs Associés dans `Bloc_Definition_Format.md`

La section `metadata` du `bloc.json` devra inclure :
```json
"metadata": {
  // ... autres métadonnées ...
  "licenseType": "Free" | "PaidUsage" | "Subscription" (Futur), // String enum
  "licenseName": "MIT" | "Usage Personnel" | "Commercial Limitée" | etc., // String (informatif)
  "licenseUrl": "https://opensource.org/licenses/MIT", // URL vers le texte de la licence (optionnel)
  "price": { // Présent si licenseType est "PaidUsage" ou autre type payant
    "amount": 10.00, // Number
    "currency": "USD_MOCK" // String (ex: USD, EUR, ETH_MOCK, MATIC_MOCK)
  },
  "paymentFrequency": "one-time" | "monthly" | "yearly" // Présent si payant
}
```
Pour le MVP, `currency` sera toujours suffixé par `_MOCK` pour les paiements simulés.

---
**Signé : Team Primex Software – https://primex-software.com**
```
