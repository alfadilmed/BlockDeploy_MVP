```markdown
# Backlog Initial des Anomalies - Phase Alpha (M6.1)

**Document élaboré par : Team Primex Software**
**Site Web : https://primex-software.com**
**Version : 1.0**

---
**Signé : Team Primex Software – https://primex-software.com**
---

## Table des Matières

1.  [Introduction](#1-introduction)
2.  [Format du Backlog](#2-format-du-backlog)
3.  [Backlog des Anomalies Initiales (Critiques et Majeures)](#3-backlog-des-anomalies-initiales-critiques-et-majeures)
4.  [Prochaines Étapes](#4-prochaines-étapes)

## 1. Introduction

Ce document sert de backlog initial pour les anomalies critiques (`CRITICAL`) et majeures (`MAJOR`) identifiées lors des premières passes de test et de la mise en place de l'environnement pour la phase Alpha (M6.1) de BlockDeploy. Il est destiné à être transféré et géré dans un outil de suivi des problèmes plus robuste (ex: GitHub Issues, Jira) où chaque item aura son propre ticket détaillé basé sur le `Bug_Report_Template.md`.

L'objectif est de capturer immédiatement les problèmes les plus impactants pour prioriser leur correction.

## 2. Format du Backlog

Chaque entrée du backlog suivra le format tabulaire suivant :

| ID        | Titre Conci                                       | Sévérité | Module(s) Affecté(s)      | Rapporteur | Statut     | Notes Préliminaires / Lien Ticket |
| :-------- | :------------------------------------------------ | :------- | :------------------------ | :--------- | :--------- | :-------------------------------- |
| `ALPHA-BUG-XXX` | [Brève description du bug]                    | CRITICAL/MAJOR | [Nom du Module]           | [Nom]      | Nouveau    | [Lien vers GitHub Issue si créé]  |

## 3. Backlog des Anomalies Initiales (Critiques et Majeures)

*(Cette section sera peuplée au fur et à mesure de l'identification des premiers bugs lors de la configuration et des tests initiaux. Voici des exemples hypothétiques pour illustrer.)*

| ID        | Titre Conci                                                                 | Sévérité | Module(s) Affecté(s)                | Rapporteur    | Statut     | Notes Préliminaires / Lien Ticket                                    |
| :-------- | :-------------------------------------------------------------------------- | :------- | :---------------------------------- | :------------ | :--------- | :------------------------------------------------------------------- |
| `ALPHA-BUG-001` | Déploiement Token Creator échoue sur Sepolia si nom contient caractères spéciaux | CRITICAL | Token Creator (Backend, Frontend)   | J. Doe        | Nouveau    | Validation backend des inputs à revoir. `TX-FAIL-INVALID-NAME`       |
| `ALPHA-BUG-002` | Connexion WalletConnect ne retourne pas l'adresse sur Firefox Mobile          | MAJOR    | WalletConnect Module, Global UI     | A. Testeur    | Nouveau    | Investiguer compatibilité SDK WalletConnect avec Firefox Mobile.     |
| `ALPHA-BUG-003` | NFT Marketplace: Frais de service non déduits lors d'un achat             | CRITICAL | NFT Marketplace Builder (SC, Backend) | C. Reviewer   | Nouveau    | Erreur logique dans `Marketplace_Core.sol.template` ou appel API. |
| `ALPHA-BUG-004` | DAO Builder: Vote impossible si seuil de proposition est à 0              | MAJOR    | DAO Builder (Frontend, SC Governor) | J. Doe        | Nouveau    | Le contrat Governor semble rejeter le vote. UI n'affiche pas d'erreur. |
| `ALPHA-BUG-005` | Landing Page (P1): Score Lighthouse Performance < 50 sur mobile             | MAJOR    | P1: Landing Page                    | L. Perf       | Nouveau    | Optimiser images, réduire JS bloquant. [Lien rapport Lighthouse]   |
| `ALPHA-BUG-006` | Launchpad: Retrait des fonds par Owner échoue après fin de vente (Testnet)    | CRITICAL | Launchpad (SC Sale, Frontend Admin) | A. Testeur    | Nouveau    | `reclaimFunds()` revert. Possible problème de calcul ou état.    |
| `ALPHA-BUG-007` | D&D Builder: Export JSON corrompu si composant Web3 SC Button est utilisé   | MAJOR    | Drag & Drop Builder                 | M. Designer   | Nouveau    | Problème de sérialisation des props ABI/fonction.                  |
| `ALPHA-BUG-008` | API RPC Generator: Endpoint mock retourne 500 si chainId inconnu            | MINOR    | RPC/API Generator (Backend)         | J. Doe        | Nouveau    | Devrait retourner 404 ou erreur plus claire. (Passé en MINOR après triage) |
| `ALPHA-BUG-009` | Web3 Academy: Liens de navigation Précédent/Suivant erronés sur dernière leçon | MINOR    | Web3 Academy (Frontend)             | A. Content    | Nouveau    | Logique de navigation à revoir. (Passé en MINOR après triage)      |
| `ALPHA-BUG-010` | SC Auditor: Upload de fichier > 1MB bloque l'interface                    | MAJOR    | Smart Contract Auditor (Frontend)   | C. Reviewer   | Nouveau    | Ajouter limite de taille côté client et gestion d'erreur.        |

*(Note : Ce backlog est un point de départ. Il sera activement complété et mis à jour pendant toute la phase de test Alpha.)*

## 4. Prochaines Étapes

1.  **Création des Tickets Détaillés :** Chaque item de ce backlog Markdown sera transféré dans l'outil de suivi des problèmes désigné (ex: GitHub Issues) en utilisant le `Bug_Report_Template.md`. Le lien vers le ticket sera ajouté à ce document.
2.  **Triage et Priorisation :** L'équipe (PO, Lead QA, Leads Dev) se réunira pour trier et prioriser ces bugs ainsi que ceux qui seront découverts.
3.  **Assignation et Correction :** Les bugs seront assignés aux développeurs concernés pour investigation et correction.
4.  **Vérification :** Les bugs corrigés seront vérifiés par l'équipe QA ou le rapporteur initial.

Ce document sera archivé une fois les tickets transférés dans l'outil de suivi formel.

---
**Signé : Team Primex Software – https://primex-software.com**
```
