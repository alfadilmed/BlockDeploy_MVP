```markdown
# Wireframes ASCII - Module : Smart Contract Auditor

**Document élaboré par : Team Primex Software**
**Site Web : https://primex-software.com**
**Version : 1.0**

---
**Signé : Team Primex Software – https://primex-software.com**
---

## Table des Matières

1.  [Introduction](#1-introduction)
2.  [Wireframe : Page d'Accueil / Soumission de Contrat](#2-wireframe--page-daccueil--soumission-de-contrat)
3.  [Wireframe : Vue du Rapport d'Audit](#3-wireframe--vue-du-rapport-daudit)

## 1. Introduction

Ce document présente des wireframes textuels (ASCII) pour les interfaces utilisateur clés du module Smart Contract Auditor. Ces wireframes illustrent la disposition générale des éléments pour la soumission d'un contrat et l'affichage du rapport d'audit.

## 2. Wireframe : Page d'Accueil / Soumission de Contrat

**URL : `blockdeploy.com/auditor`**

```
+------------------------------------------------------------------------------+
| Header BlockDeploy (Logo, Navigation Globale, Profil Utilisateur)            |
+------------------------------------------------------------------------------+
| Titre Principal: "Smart Contract Auditor (Beta)"                             |
| Sous-titre: "Obtenez une première analyse de sécurité pour vos contrats Solidity."|
| [Disclaimer: Cet outil est une assistance et ne remplace pas un audit pro.]  |
+------------------------------------------------------------------------------+

+------------------------------------------------------------------------------+
| Section: Soumettre votre Contrat                                             |
|                                                                              |
|   [Tabs: [Uploader Fichier(s) .sol]  |  [Entrer Adresse de Contrat Vérifié]] |
|                                                                              |
|   --- Contenu Tab "Uploader Fichier(s) .sol" (Actif par défaut) ---          |
|   | +--------------------------------------------------------------------+ |
|   | | [FileUploadZone: "Glissez-déposez vos fichiers .sol ici ou cliquez"] | |
|   | | [Liste des fichiers uploadés: MyContract.sol (XX KB)]                | |
|   | | (Optionnel MVP: [Input Text: "Nom du Contrat Principal (si multi)"]) | |
|   | +--------------------------------------------------------------------+ |
|                                                                              |
|   --- Contenu Tab "Entrer Adresse de Contrat Vérifié" ---                    |
|   | +--------------------------------------------------------------------+ |
|   | | [Label] Adresse du Contrat                                           | |
|   | | [Input Text: contractAddress (0x...)]                                | |
|   | | [Label] Réseau Blockchain                                            | |
|   | | [Select: networkChainId (Ethereum, Sepolia, Polygon, etc.)]          | |
|   | +--------------------------------------------------------------------+ |
|                                                                              |
|   [Bouton: "Lancer l'Analyse"] (Activé si input valide)                      |
|                                                                              |
|   --- Si Analyse en Cours (`AnalysisInProgressView`) ---                     |
|   | +--------------------------------------------------------------------+ |
|   | | [Spinner/Animation de chargement]                                    | |
|   | | [Message: "Analyse en cours... Job ID: XYZ123"]                      | |
|   | | [Message: "Ceci peut prendre quelques instants."]                    | |
|   | +--------------------------------------------------------------------+ |
|                                                                              |
+------------------------------------------------------------------------------+

+------------------------------------------------------------------------------+
| Section: Analyses Récentes (Optionnel MVP - Historique local ou utilisateur) |
|   - Analyse #XYZ123 - MyContract.sol - 3 problèmes - JJ/MM/AAAA [Voir Rapport]|
|   - Analyse #ABC987 - 0xContract... - 1 problème - JJ/MM/AAAA [Voir Rapport]|
+------------------------------------------------------------------------------+
| Footer BlockDeploy                                                           |
+------------------------------------------------------------------------------+
```

## 3. Wireframe : Vue du Rapport d'Audit

**URL : `blockdeploy.com/auditor/report/{jobId}` (ou affichage sur la même page après analyse)**

```
+------------------------------------------------------------------------------+
| Header BlockDeploy                                                           |
+------------------------------------------------------------------------------+
| Titre Rapport: "Rapport d'Audit pour : {{NomContrat / Adresse}}"             |
| Date Analyse: {{analysisTimestamp}} | Version Solidity: {{solidityVersion}}  |
| [Bouton: "Télécharger Rapport JSON"] [Bouton: "Nouvelle Analyse"]            |
+------------------------------------------------------------------------------+

+------------------------------------------------------------------------------+
| `ReportSummary` : Résumé des Résultats                                       |
|                                                                              |
|   Problèmes Totaux: [{{summary.totalIssues}}]                                |
|   Score de Santé (conceptuel): [XX/100] [Indicateur Couleur: Vert/Orange/Rouge]|
|                                                                              |
|   Répartition par Sévérité:                                                  |
|     Haute:    [{{summary.severities.high}}]                                  |
|     Moyenne:  [{{summary.severities.medium}}]                                |
|     Faible:   [{{summary.severities.low}}]                                   |
|     Info:     [{{summary.severities.informational}}]                         |
|                                                                              |
+------------------------------------------------------------------------------+

+------------------------------------------------------------------------------+
| `VulnerabilityList` : Liste des Vulnérabilités Détectées                     |
| [Filtres: Sévérité (Tous|Haute|Moyenne|Faible) / Type (Futur)]               |
|                                                                              |
|   --- `VulnerabilityDetailItem` 1 (Ex: Sévérité Haute) ---                   |
|   | +--------------------------------------------------------------------+ |
|   | | [Icone Sév. Haute] [Titre Vulnérabilité: {{finding1.name}}]          | |
|   | | ID: {{finding1.id}} | Confiance: {{finding1.confidence}}             | |
|   | |                                                                    | |
|   | | Description:                                                         | |
|   | |   {{finding1.description}}                                           | |
|   | |                                                                    | |
|   | | Élément(s) Concerné(s):                                              | |
|   | |   Fichier: {{finding1.elements[0].name}}                             | |
|   | |   Ligne(s): {{finding1.elements[0].source_mapping.lines}}            | |
|   | |   +----------------------------------------------------------------+ | |
|   | |   | `CodeSnippetViewer`:                                           | |
|   | |   | ... ligne N-1 ...                                              | |
|   | |   | > ligne N (concernée, surlignée) : `if (tx.origin == owner)`   | |
|   | |   | ... ligne N+1 ...                                              | |
|   | |   +----------------------------------------------------------------+ | |
|   | |                                                                    | |
|   | | Recommandation:                                                      | |
|   | |   {{finding1.recommendation}}                                        | |
|   | |   Références: [Lien1]({{finding1.referenceUrls[0]}}) [Lien2]        | |
|   | +--------------------------------------------------------------------+ |
|                                                                              |
|   --- `VulnerabilityDetailItem` 2 (Ex: Sévérité Moyenne) ---                 |
|   | +--------------------------------------------------------------------+ |
|   | | [Icone Sév. Moyenne] [Titre Vulnérabilité: {{finding2.name}}]        | |
|   | | ... (structure similaire) ...                                       | |
|   | +--------------------------------------------------------------------+ |
|                                                                              |
|   --- Si aucune vulnérabilité ---                                            |
|   | [Message: "Aucune vulnérabilité de base n'a été détectée. N'oubliez pas |
|   |  qu'un audit manuel reste indispensable pour la production."]           |
|                                                                              |
+------------------------------------------------------------------------------+
| Disclaimer: "Cet outil est une assistance..."                                |
+------------------------------------------------------------------------------+
| Footer BlockDeploy                                                           |
+------------------------------------------------------------------------------+
```

---
**Signé : Team Primex Software – https://primex-software.com**
```
