```markdown
# Composants Frontend Clés - Module : Smart Contract Auditor

**Document élaboré par : Team Primex Software**
**Site Web : https://primex-software.com**
**Version : 1.0**

---
**Signé : Team Primex Software – https://primex-software.com**
---

## Table des Matières

1.  [Introduction](#1-introduction)
2.  [Composants Principaux (Beta MVP)](#2-composants-principaux-beta-mvp)
    *   [2.1 `AuditorLayout`](#21-auditorlayout)
    *   [2.2 `ContractInputForm`](#22-contractinputform)
    *   [2.3 `FileUploadZone`](#23-fileuploadzone)
    *   [2.4 `AddressInputZone`](#24-addressinputzone)
    *   [2.5 `AnalysisInProgressView`](#25-analysisinprogressview)
    *   [2.6 `AuditReportView`](#26-auditreportview)
    *   [2.7 `ReportSummary`](#27-reportsummary)
    *   [2.8 `VulnerabilityList`](#28-vulnerabilitylist)
    *   [2.9 `VulnerabilityDetailItem`](#29-vulnerabilitydetailitem)
    *   [2.10 `CodeSnippetViewer`](#210-codesnippetviewer)
3.  [Gestion de l'État Frontend](#3-gestion-de-létat-frontend)
4.  [Interactions et Flux de Données](#4-interactions-et-flux-de-données)

## 1. Introduction

Ce document décrit les principaux composants React (ou équivalent) pour l'interface utilisateur du module Smart Contract Auditor. L'objectif est de créer une interface claire, intuitive et pédagogique pour soumettre des contrats à l'analyse et visualiser les rapports d'audit.

Ces composants seront situés dans `packages/smart-contract-auditor/frontend/components/`.

## 2. Composants Principaux (Beta MVP)

### 2.1 `AuditorLayout`

*   **Description :** Layout principal pour la page de l'outil d'audit.
*   **Contient :** Header spécifique à l'auditeur (ou header global BlockDeploy), zone de contenu principal, Footer.
*   **Props :** `children`.

### 2.2 `ContractInputForm`

*   **Description :** Formulaire principal permettant à l'utilisateur de choisir comment soumettre son smart contract.
*   **Contient :**
    *   Tabs ou boutons radio pour sélectionner le mode d'entrée : "Uploader Fichier(s) .sol" OU "Entrer une Adresse de Contrat Vérifié".
    *   Conditionnellement, affiche `FileUploadZone` ou `AddressInputZone`.
    *   Bouton "Lancer l'Analyse".
*   **État Géré :** Mode d'entrée sélectionné, fichiers uploadés, adresse et réseau.
*   **Actions :** `onSubmitAnalysisRequest` (appelle l'API backend).

### 2.3 `FileUploadZone`

*   **Description :** Zone permettant à l'utilisateur de glisser-déposer ou de sélectionner des fichiers `.sol`.
*   **Contient :** Zone de drop, input de type fichier, affichage des fichiers sélectionnés (nom, taille).
*   **Props :** `onFilesSelected` (callback).
*   **Logique :** Validation de base du type de fichier (extension `.sol`). Support multi-fichiers pour le futur (dépendances).

### 2.4 `AddressInputZone`

*   **Description :** Zone permettant à l'utilisateur de saisir l'adresse d'un contrat et de sélectionner le réseau.
*   **Contient :**
    *   Input text pour "Adresse du Contrat".
    *   Select pour "Réseau Blockchain" (ex: Ethereum Mainnet, Sepolia, Polygon).
*   **Props :** `onAddressSubmitted` (callback).
*   **Logique :** Validation du format de l'adresse.

### 2.5 `AnalysisInProgressView`

*   **Description :** S'affiche pendant que l'analyse est en cours côté backend.
*   **Contient :**
    *   Indicateur de chargement (spinner, barre de progression animée).
    *   Message informatif (ex: "Analyse en cours... Ceci peut prendre quelques instants.").
    *   (Optionnel) Affichage du `jobId` si l'analyse est gérée de manière asynchrone avec polling.
*   **Props :** `statusMessage` (string).

### 2.6 `AuditReportView`

*   **Description :** Composant principal pour afficher le rapport d'audit une fois l'analyse terminée.
*   **Contient :**
    *   `ReportSummary` (statistiques générales).
    *   `VulnerabilityList` (liste des vulnérabilités).
    *   Option pour télécharger le rapport JSON.
    *   Disclaimer rappelant les limites de l'outil.
*   **Props :** `reportData` (l'objet JSON du rapport complet, cf. `audit-sample-report.json`).

### 2.7 `ReportSummary`

*   **Description :** Affiche un résumé des résultats de l'audit.
*   **Contient :**
    *   Nombre total de vulnérabilités détectées.
    *   Répartition par sévérité (ex: X Hautes, Y Moyennes, Z Faibles).
    *   Score global de "santé" du contrat (concept à définir, peut-être un simple indicateur couleur).
    *   Date et heure de l'analyse.
    *   Nom du contrat / Adresse analysée.
*   **Props :** `summaryData` (extrait du `reportData`).

### 2.8 `VulnerabilityList`

*   **Description :** Affiche la liste des vulnérabilités détectées, souvent groupées par sévérité ou type.
*   **Contient :** Plusieurs instances de `VulnerabilityDetailItem`, potentiellement dans des sections (ex: accordéons) par sévérité.
*   **Props :** `vulnerabilities` (tableau d'objets vulnérabilité du `reportData`).

### 2.9 `VulnerabilityDetailItem`

*   **Description :** Affiche les détails d'une vulnérabilité spécifique.
*   **Contient :**
    *   Nom / Titre de la vulnérabilité (ex: "Utilisation de `tx.origin`").
    *   Indicateur de Sévérité (ex: badge couleur "Haute").
    *   Description détaillée du problème et de son impact potentiel.
    *   Extrait de code concerné (via `CodeSnippetViewer`), avec mise en évidence des lignes.
    *   Recommandations pour corriger le problème.
    *   Liens vers des ressources externes (SWC Registry, documentation OpenZeppelin, articles de blog pertinents).
*   **Props :** `vulnerability` (un objet vulnérabilité du `reportData`).

### 2.10 `CodeSnippetViewer`

*   **Description :** Affiche un extrait de code Solidity avec coloration syntaxique et mise en évidence de lignes spécifiques.
*   **Contient :** Bloc de code formaté.
*   **Props :** `code` (string, l'extrait de code), `highlightLines` (array de numéros de ligne), `language` ("solidity").
*   **Logique :** Utilise une librairie comme `react-syntax-highlighter`.

## 3. Gestion de l'État Frontend

*   **État Local des Composants (`useState`, `useReducer`) :**
    *   Pour les champs de `ContractInputForm`.
    *   Pour l'état de chargement/analyse (`isLoading`, `analysisStatus`).
    *   Pour stocker le `reportData` une fois récupéré.
*   **Contexte React (React Context API) ou Store Global (Zustand/Redux) - Optionnel pour MVP :**
    *   Si l'état de l'analyse ou le rapport doit être accessible par des composants très éloignés dans l'arbre, un contexte pourrait être utile. Pour le MVP, un passage de props descendant pourrait suffire si la structure reste simple.
*   **SWR / React Query (si polling pour rapport asynchrone) :**
    *   Pour gérer la récupération des données du rapport via polling de l'endpoint `/report/{jobId}`.

## 4. Interactions et Flux de Données

1.  **Utilisateur interagit avec `ContractInputForm`** pour fournir le code ou l'adresse.
2.  Au clic sur "Lancer l'Analyse" :
    *   Le frontend envoie les données à l'API backend `/analyze`.
    *   L'état `isLoading` est mis à `true`, `AnalysisInProgressView` s'affiche.
3.  Le backend traite la demande (potentiellement de manière asynchrone) :
    *   Si synchrone (mock MVP rapide) : L'API retourne directement le rapport JSON.
    *   Si asynchrone : L'API retourne un `jobId`. Le frontend utilise ce `jobId` pour poller l'API `/report/{jobId}` jusqu'à ce que le statut soit "Terminé".
4.  Une fois le rapport JSON reçu :
    *   L'état `isLoading` passe à `false`.
    *   `reportData` est mis à jour avec les données du rapport.
    *   `AuditReportView` s'affiche et rend le contenu du rapport.
5.  L'utilisateur navigue dans le rapport, clique sur les détails d'une vulnérabilité, etc.

---
**Signé : Team Primex Software – https://primex-software.com**
```
