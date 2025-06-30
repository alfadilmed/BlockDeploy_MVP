```markdown
# Pipeline d'Analyse de Code - Module : Smart Contract Auditor

**Document élaboré par : Team Primex Software**
**Site Web : https://primex-software.com**
**Version : 1.0**

---
**Signé : Team Primex Software – https://primex-software.com**
---

## Table des Matières

1.  [Introduction](#1-introduction)
2.  [Vue d'Ensemble du Pipeline](#2-vue-densemble-du-pipeline)
3.  [Étapes Détaillées du Pipeline (Beta MVP)](#3-étapes-détaillées-du-pipeline-beta-mvp)
    *   [Étape 1 : Soumission du Code (Frontend)](#étape-1--soumission-du-code-frontend)
    *   [Étape 2 : Réception et Préparation (Backend)](#étape-2--réception-et-préparation-backend)
    *   [Étape 3 : Exécution de l'Analyse Statique (Backend - Mock MVP)](#étape-3--exécution-de-lanalyse-statique-backend---mock-mvp)
    *   [Étape 4 : Parsing et Formatage du Rapport (Backend)](#étape-4--parsing-et-formatage-du-rapport-backend)
    *   [Étape 5 : Récupération et Affichage du Rapport (Frontend)](#étape-5--récupération-et-affichage-du-rapport-frontend)
4.  [Gestion des Tâches Asynchrones](#4-gestion-des-tâches-asynchrones)
5.  [Évolution du Pipeline (Post-MVP avec Outils Réels)](#5-évolution-du-pipeline-post-mvp-avec-outils-réels)

## 1. Introduction

Ce document décrit le pipeline de traitement pour l'analyse de smart contracts Solidity par le module Smart Contract Auditor. Il détaille les étapes depuis la soumission du code par l'utilisateur jusqu'à la génération et l'affichage du rapport d'audit.

## 2. Vue d'Ensemble du Pipeline

Le flux général peut être résumé comme suit :

**Utilisateur (Frontend)** → **Soumission (Code/Adresse)** → **Backend API** → **(Récupération Code si Adresse)** → **Moteur d'Analyse (Mock/Réel)** → **Résultats Bruts** → **Parsing/Formatage Backend** → **Rapport JSON Standardisé** → **Affichage Frontend**

```mermaid
graph LR
    A[Frontend: Utilisateur soumet code/adresse] --> B(Backend: API /input);
    B --> C{Code fourni direct?};
    C -- Oui --> E[Backend: Prépare code pour analyse];
    C -- Non (Adresse) --> D[Backend: Récupère code via API Explorateur];
    D --> E;
    E --> F[Backend: Lance Moteur d'Analyse Statique (Mock MVP)];
    F --> G[Backend: Reçoit Résultats Bruts];
    G --> H[Backend: Parse & Formate en Rapport JSON Standard];
    H --> I(Backend: API /report/{jobId});
    A --> J[Frontend: Polling ou WebSocket pour statut];
    J --> I;
    I --> K[Frontend: Affiche Rapport à l'Utilisateur];
```

## 3. Étapes Détaillées du Pipeline (Beta MVP)

### Étape 1 : Soumission du Code (Frontend)

1.  **Interface Utilisateur (`ContractInputForm`) :**
    *   L'utilisateur choisit une option :
        *   **Upload de fichier(s) `.sol` :** Sélectionne un ou plusieurs fichiers depuis son ordinateur. Le frontend peut gérer la lecture du contenu des fichiers.
        *   **Adresse de contrat vérifié :** Saisit l'adresse du contrat et sélectionne le réseau blockchain correspondant (ex: Ethereum Mainnet, Sepolia).
2.  **Envoi au Backend :**
    *   Le frontend envoie une requête `POST` à l'API backend (ex: `/api/v1/smart-contract-auditor/analyze`).
    *   **Payload pour upload de fichier :**
        ```json
        {
          "inputType": "file",
          "files": [
            { "name": "MyContract.sol", "content": "pragma solidity ^0.8.20; contract MyContract { ... }" }
            // ... autres fichiers si support multi-fichiers pour dépendances
          ],
          "mainContractName": "MyContract" // Optionnel, si plusieurs fichiers, indiquer le principal
        }
        ```
    *   **Payload pour adresse de contrat :**
        ```json
        {
          "inputType": "address",
          "contractAddress": "0x123...",
          "networkChainId": 1 // ou 11155111 pour Sepolia
        }
        ```
3.  **Gestion de l'Attente (Frontend) :**
    *   Le frontend affiche un indicateur de chargement (`AnalysisInProgressView`).
    *   L'API backend pourrait retourner immédiatement un `jobId` pour permettre un polling ou utiliser une connexion WebSocket pour notifier la fin de l'analyse (voir Section 4).

### Étape 2 : Réception et Préparation (Backend)

1.  **Endpoint API (`/analyze`) :**
    *   Reçoit la requête du frontend.
    *   Valide les entrées.
2.  **Préparation du Code Source :**
    *   **Si `inputType` est "file" :**
        *   Le contenu du/des fichier(s) est sauvegardé temporairement sur le serveur ou traité en mémoire.
        *   S'il y a plusieurs fichiers (dépendances), ils doivent être organisés de manière à ce que l'outil d'analyse puisse les résoudre (Post-MVP). Pour le MVP mock, on se concentre sur un seul fichier.
    *   **Si `inputType` est "address" :**
        *   Le backend appelle l'API de l'explorateur de blocs correspondant (ex: Etherscan API `getsourcecode` endpoint) pour récupérer le code source du contrat vérifié.
        *   Gère les erreurs si le contrat n'est pas vérifié ou si l'API échoue.
3.  **Assignation d'un `jobId` :** Une fois le code source obtenu, un identifiant unique de tâche (`jobId`) est généré. Ce `jobId` sera utilisé pour suivre l'état de l'analyse et récupérer le rapport.

### Étape 3 : Exécution de l'Analyse Statique (Backend - Mock MVP)

1.  **Invocation du Script Mock :**
    *   Le backend exécute le script d'analyse mock (ex: `mock_analyzer.js` ou `mock_analyzer.py`) en lui passant le code Solidity préparé.
    *   Le script mock effectue des analyses basiques :
        *   Recherche de mots-clés simples (ex: `tx.origin`, `selfdestruct`, `delegatecall` sans protection stricte, `block.timestamp` utilisé pour de la logique critique).
        *   Peut simuler des temps de traitement variables.
2.  **Génération des Résultats Bruts :**
    *   Le script mock retourne une structure JSON simple listant les "vulnérabilités" trouvées, avec des informations basiques (type de problème, ligne approximative).
    *   Exemple de sortie brute du mock :
        ```json
        {
          "findings": [
            { "type": "TX_ORIGIN_USAGE", "line": 42, "confidence": "Medium" },
            { "type": "REENTRANCY_POTENTIAL_LOW", "line": 105, "function": "withdraw" }
          ],
          "success": true
        }
        ```

### Étape 4 : Parsing et Formatage du Rapport (Backend)

1.  **Réception des Résultats Bruts :** Le backend reçoit la sortie du script mock.
2.  **Transformation en Rapport Standardisé :**
    *   Le backend parse les résultats bruts.
    *   Pour chaque "finding", il enrichit l'information :
        *   Cherche une description plus détaillée de la vulnérabilité (depuis une base de connaissance interne ou un mapping).
        *   Attribue une sévérité (Haute, Moyenne, Faible, Info).
        *   Ajoute des recommandations génériques et des liens vers des ressources externes (ex: SWC Registry, OpenZeppelin best practices).
    *   Génère le rapport final au format JSON standardisé (voir `audit-sample-report.json`).
3.  **Stockage du Rapport :** Le rapport JSON est stocké (ex: en base de données, cache Redis, ou système de fichiers temporaire) associé au `jobId`.
4.  **Mise à jour du Statut de la Tâche :** Marque la tâche (`jobId`) comme "Terminée".

### Étape 5 : Récupération et Affichage du Rapport (Frontend)

1.  **Récupération du Rapport :**
    *   Si le backend a retourné un `jobId` à l'étape 1.3, le frontend effectue un polling sur un endpoint comme `GET /api/v1/smart-contract-auditor/report/{jobId}`.
    *   Alternativement, si une WebSocket est utilisée, le backend notifie le frontend lorsque le rapport est prêt.
    *   Une fois le statut "Terminé", le frontend récupère le rapport JSON.
2.  **Affichage du Rapport (`AuditReportView`) :**
    *   Le frontend parse le rapport JSON.
    *   Utilise les composants `ReportSummary`, `VulnerabilityList`, `VulnerabilityDetailItem` pour afficher les informations de manière conviviale et pédagogique.
    *   Met en évidence les lignes de code concernées (si l'information est disponible et que le frontend peut afficher le code source).

## 4. Gestion des Tâches Asynchrones

Étant donné que l'analyse réelle (post-MVP) peut prendre du temps (de quelques secondes à plusieurs minutes pour des outils complexes et des gros contrats) :

*   **Réponse Immédiate avec `jobId` :** L'API `/analyze` devrait répondre rapidement avec un `jobId`.
*   **Polling :** Le frontend peut interroger périodiquement un endpoint `/status/{jobId}` pour connaître l'état de l'analyse (En file d'attente, En cours, Terminé, Échoué).
*   **WebSockets (Alternative) :** Pour une communication en temps réel, le backend pourrait notifier le client via WebSockets lorsque l'analyse est terminée. C'est plus complexe mais offre une meilleure UX.
*   **File d'Attente de Tâches (Backend) :** Pour les analyses réelles, une file d'attente (ex: RabbitMQ, Redis Queue) avec des workers dédiés à l'analyse sera nécessaire pour gérer la charge et les tâches longues sans bloquer le serveur API principal.

Pour le **MVP avec le script mock**, l'analyse sera probablement assez rapide pour que le backend puisse attendre la fin du script mock et retourner le rapport directement dans la réponse à `/analyze`, simplifiant ainsi le frontend. Cependant, il est bon de concevoir l'API avec la possibilité d'une gestion asynchrone pour l'avenir.

## 5. Évolution du Pipeline (Post-MVP avec Outils Réels)

1.  **Intégration des Outils Réels :**
    *   Le backend invoquera les CLI de Slither, Mythril, etc., en passant les fichiers Solidity.
    *   Cela peut nécessiter des wrappers ou des scripts pour gérer les entrées/sorties de ces outils.
    *   L'utilisation de conteneurs Docker pour chaque outil d'analyse est fortement recommandée pour isoler les dépendances et faciliter le déploiement.
2.  **Parsing des Sorties Complexes :** Les sorties des outils réels sont souvent plus complexes (JSON, texte, etc.) et nécessiteront des parseurs robustes.
3.  **Corrélation des Résultats :** Si plusieurs outils sont utilisés, le backend pourrait tenter de corréler leurs résultats pour éviter les doublons ou consolider les informations.
4.  **Base de Connaissances des Vulnérabilités :** Maintenir une base de données interne ou utiliser des API externes pour obtenir des descriptions détaillées, des exemples de code vulnérable/corrigé, et des références (CWE, SWC ID) pour chaque type de vulnérabilité détectée.
5.  **Priorisation et Filtrage :** Permettre à l'utilisateur de filtrer les résultats par sévérité, type de vulnérabilité, etc.
6.  **Analyse de Dépendances :** Gérer correctement les projets Solidity avec des importations et des dépendances (ex: via Hardhat/Foundry project structure).

---
**Signé : Team Primex Software – https://primex-software.com**
```
