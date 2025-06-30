```markdown
# Wireframes ASCII - Module : DAO Builder

**Document élaboré par : Team Primex Software**
**Site Web : https://primex-software.com**
**Version : 1.0**

---
**Signé : Team Primex Software – https://primex-software.com**
---

## Table des Matières

1.  [Introduction](#1-introduction)
2.  [Flux 1 : Création d'une DAO (Admin/Créateur)](#2-flux-1--création-dune-dao-admincréateur)
    *   [Étape 1.1 : Informations Générales DAO](#étape-11--informations-générales-dao)
    *   [Étape 1.2 : Configuration du Token de Gouvernance](#étape-12--configuration-du-token-de-gouvernance)
    *   [Étape 1.3 : Paramètres de Gouvernance (Governor)](#étape-13--paramètres-de-gouvernance-governor)
    *   [Étape 1.4 : Paramètres du Timelock et Trésorerie](#étape-14--paramètres-du-timelock-et-trésorerie)
    *   [Étape 1.5 : Révision et Déploiement des Contrats](#étape-15--révision-et-déploiement-des-contrats)
3.  [Flux 2 : Tableau de Bord d'une DAO (Membre)](#3-flux-2--tableau-de-bord-dune-dao-membre)
    *   [Vue Principale / Liste des Propositions](#vue-principale--liste-des-propositions)
4.  [Flux 3 : Création d'une Proposition (Membre éligible)](#4-flux-3--création-dune-proposition-membre-éligible)
5.  [Flux 4 : Vue Détaillée et Vote sur une Proposition (Membre)](#5-flux-4--vue-détaillée-et-vote-sur-une-proposition-membre)

## 1. Introduction

Ce document présente des wireframes textuels (ASCII) pour les interfaces utilisateur clés du module DAO Builder. Il couvre le parcours de création d'une DAO et l'interaction des membres avec la gouvernance.

## 2. Flux 1 : Création d'une DAO (Admin/Créateur)

**Page : BlockDeploy Dashboard > DAO Builder > Créer une Nouvelle DAO**

### Étape 1.1 : Informations Générales DAO
```
+------------------------------------------------------------------------------+
| BlockDeploy - DAO Builder - Créer une DAO (Étape 1/5)                        |
+------------------------------------------------------------------------------+
| Titre: Informations Générales sur votre DAO                                  |
|                                                                              |
|   [Label] Nom de la DAO (public, ex: "Primex Grants DAO")                    |
|   [Input Text: daoName]                                                      |
|                                                                              |
|   [Label] Description Courte de la DAO (Objectif, mission)                   |
|   [Textarea: daoDescription]                                                 |
|                                                                              |
|   [Label] Logo de la DAO (URL ou Upload - optionnel)                         |
|   [Input File/URL: daoLogoUrl]                                               |
|                                                                              |
|   [Label] Catégorie de la DAO (ex: Subventions, Investissement, Communauté)  |
|   [Select: daoCategory]                                                      |
|                                                                              |
|   [Bouton: "Suivant > Configuration du Token"]                               |
+------------------------------------------------------------------------------+
```

### Étape 1.2 : Configuration du Token de Gouvernance
```
+------------------------------------------------------------------------------+
| BlockDeploy - DAO Builder - Créer une DAO (Étape 2/5)                        |
+------------------------------------------------------------------------------+
| Titre: Token de Gouvernance                                                  |
|                                                                              |
|   [Radio Group: tokenChoice]                                                 |
|     ( ) Créer un nouveau token de gouvernance (ERC20Votes)                   |
|     ( ) Utiliser un token ERC20Votes existant                                |
|                                                                              |
|   --- Si "Créer un nouveau token" ---                                        |
|   | [Label] Nom du Token                                                     |
|   | [Input Text: tokenName]                                                  |
|   | [Label] Symbole du Token                                                 |
|   | [Input Text: tokenSymbol]                                                |
|   | [Label] Supply Initiale (en unités entières)                           |
|   | [Input Number: initialTokenSupply]                                       |
|   | [Label] Adresse pour recevoir la Supply Initiale                         |
|   | [Input Text: initialSupplyRecipient (défaut: votre adresse connectée)] |
|   | [Checkbox: tokenIsMintableByDAO] [Label] Permettre à la DAO de minter plus tard? |
|   | (Décimales: 18 par défaut)                                               |
|                                                                              |
|   --- Si "Utiliser un token existant" ---                                    |
|   | [Label] Adresse du Contrat Token ERC20Votes existant                     |
|   | [Input Text: existingTokenAddress] [Bouton: "Vérifier"]                |
|   | [Message: Statut de vérification du token]                               |
|                                                                              |
|   [Bouton: "< Précédent"] [Bouton: "Suivant > Paramètres de Gouvernance"]    |
+------------------------------------------------------------------------------+
```

### Étape 1.3 : Paramètres de Gouvernance (Governor)
```
+------------------------------------------------------------------------------+
| BlockDeploy - DAO Builder - Créer une DAO (Étape 3/5)                        |
+------------------------------------------------------------------------------+
| Titre: Paramètres de Gouvernance                                             |
|                                                                              |
|   [Label] Délai de Vote (en blocs, après soumission proposition)             |
|   [Input Number: votingDelayBlocks] [Infobulle: ?]                           |
|   [Info: "Ex: 1 bloc sur testnet, ~6500 blocs (~1 jour) sur Ethereum Mainnet"]|
|                                                                              |
|   [Label] Période de Vote (en blocs)                                         |
|   [Input Number: votingPeriodBlocks] [Infobulle: ?]                          |
|   [Info: "Ex: 7200 blocs (~1 jour) sur testnet, ~45800 (~1 semaine) sur Mainnet"]|
|                                                                              |
|   [Label] Seuil de Proposition (nb de tokens requis pour proposer)           |
|   [Input Number: proposalThreshold (en unités entières du token)] [Infobulle: ?]|
|   [Info: "Mettre 0 si tout détenteur de token peut proposer."]               |
|                                                                              |
|   [Label] Quorum Requis (pourcentage de la supply votante)                   |
|   [Input Number: quorumNumeratorPercentage (ex: 4 pour 4%)] [Infobulle: ?]   |
|                                                                              |
|   [Bouton: "< Précédent"] [Bouton: "Suivant > Timelock & Trésorerie"]        |
+------------------------------------------------------------------------------+
```

### Étape 1.4 : Paramètres du Timelock et Trésorerie
```
+------------------------------------------------------------------------------+
| BlockDeploy - DAO Builder - Créer une DAO (Étape 4/5)                        |
+------------------------------------------------------------------------------+
| Titre: Timelock et Trésorerie                                                |
|                                                                              |
|   Section Timelock Controller:                                               |
|   [Label] Délai Minimum d'Exécution (après adoption d'une proposition)       |
|   [Input Number: minDelaySeconds] [Select: Unité (secondes, heures, jours)] |
|   [Infobulle: "Temps d'attente avant qu'une proposition réussie puisse être exécutée."]|
|   [Info: "Les rôles Proposer et Executor seront assignés au Governor et address(0)."]|
|   [Info: "L'admin initial du Timelock sera votre adresse de déploiement."]   |
|                                                                              |
|   Section Trésorerie (Simple):                                               |
|   [Info: "Une trésorerie simple sera créée. Elle sera initialement vide et   |
|    contrôlée par le Timelock de la DAO après configuration des rôles."]      |
|   [Info: "Vous pourrez y envoyer des fonds (ETH, ERC20) après déploiement."] |
|                                                                              |
|   [Bouton: "< Précédent"] [Bouton: "Suivant > Révision & Déploiement"]       |
+------------------------------------------------------------------------------+
```

### Étape 1.5 : Révision et Déploiement des Contrats
```
+------------------------------------------------------------------------------+
| BlockDeploy - DAO Builder - Créer une DAO (Étape 5/5)                        |
+------------------------------------------------------------------------------+
| Titre: Révision et Déploiement des Contrats de la DAO                        |
|                                                                              |
|   Résumé de toutes les configurations (DAO Info, Token, Governor, Timelock)  |
|   [Zone de texte scrollable avec tous les paramètres en read-only]           |
|                                                                              |
|   [Label] Votre Adresse de Déploiement (Propriétaire initial / Exécuteur)    |
|   [Text: userWalletAddress (auto-rempli via WalletConnect)]                  |
|                                                                              |
|   [Bouton: "Préparer les Contrats de la DAO"]                                |
|   [Spinner si préparation en cours...]                                       |
|                                                                              |
|   --- Si préparation OK (Backend a retourné bytecode/ABI/plan) ---         |
|   | [Message: "Contrats prêts. Suivez les étapes pour déployer et configurer."] |
|   |                                                                          |
|   | Étape 1: Déployer le Token de Gouvernance {{tokenName}}                  |
|   |   [Bouton: "Déployer Contrat Token"] [Statut: OK/KO, Addr: 0x...]       |
|   | Étape 2: Déployer le Timelock Controller                                 |
|   |   [Bouton: "Déployer Contrat Timelock"] [Statut: OK/KO, Addr: 0x...]     |
|   | Étape 3: Déployer le Governor {{daoName}}Governor                        |
|   |   [Bouton: "Déployer Contrat Governor"] [Statut: OK/KO, Addr: 0x...]    |
|   | Étape 4: Déployer la Trésorerie {{daoName}}Treasury                      |
|   |   [Bouton: "Déployer Contrat Trésorerie"] [Statut: OK/KO, Addr: 0x...]   |
|   | Étape 5: Configuration des Rôles du Timelock                             |
|   |   [Bouton: "Configurer Rôles Timelock"] [Statut: OK/KO]                |
|   |   (Grant PROPOSER_ROLE to Governor, EXECUTOR_ROLE to address(0), renounce deployer ADMIN_ROLE) |
|   | Étape 6: Transférer Ownership de la Trésorerie au Timelock             |
|   |   [Bouton: "Transférer Ownership Trésorerie"] [Statut: OK/KO]          |
|   |                                                                          |
|   | [Message Global: "DAO Déployée et Configurée avec Succès!"] (si tout OK) |
|   | [Bouton: "Aller au Tableau de Bord de la DAO"]                           |
|                                                                              |
|   [Bouton: "< Précédent"]                                                   |
+------------------------------------------------------------------------------+
```

## 3. Flux 2 : Tableau de Bord d'une DAO (Membre)

**Page : `blockdeploy.com/daos/{daoAddress}`**
```
+------------------------------------------------------------------------------+
| Header: {{daoName}} - Tableau de Bord                                        |
| [Connect Wallet Btn] [Solde: X {{tokenSymbol}}] [VP: Y] [Delegate Btn]       |
+------------------------------------------------------------------------------+
| [Tabs: Propositions | Trésorerie | Paramètres DAO (read-only) | Membres (Futur)]|
+------------------------------------------------------------------------------+

Onglet "Propositions":
|   [Bouton: "+ Créer une Nouvelle Proposition"] (si éligible)                 |
|   [Filtres: Actives | Passées | En Attente | Exécutées | Annulées ]          |
|                                                                              |
|   Liste de [ProposalCard]:                                                   |
|   +----------------------------------------------------------------------+   |
|   | [ProposalCard 1]                                                     |   |
|   | Titre: "Financer Projet Alpha" | Statut: Active (Vote en cours)      |   |
|   | Proposeur: 0x... | Fin Vote: JJ/MM HH:MM (Countdown)                |   |
|   | Pour: XXXX | Contre: YY | Abst: ZZ | Quorum: A% / B% Requis          |   |
|   | [Bouton: "Voir & Voter"]                                             |   |
|   +----------------------------------------------------------------------+   |
|   | [ProposalCard 2]                                                     |   |
|   | Titre: "Changer le Quorum" | Statut: Réussie (Exécutée)            |   |
|   | ...                                                                  |   |
|   +----------------------------------------------------------------------+   |
|   [Pagination]                                                             |

Onglet "Trésorerie":
|   [Titre: Trésorerie de {{daoName}}]                                         |
|   [Adresse Contrat Trésorerie: 0xTREASURY_ADDR] [Lien Explorateur]           |
|   Solde ETH: XX.YYYY ETH                                                     |
|   Tokens Détenus:                                                            |
|     - Token A (0xAAA...): NNN unités                                         |
|     - Token B (0xBBB...): MMM unités                                         |
|   [Historique des transactions (Futur)]                                      |

Onglet "Paramètres DAO":
|   [Affichage read-only des paramètres du Governor et Timelock]               |
|   - Voting Delay, Period, Threshold, Quorum                                  |
|   - Timelock Min Delay                                                       |
|   - Adresses des contrats (Token, Governor, Timelock)                        |
+------------------------------------------------------------------------------+
```

## 4. Flux 3 : Création d'une Proposition (Membre éligible)

**(Modal ou Page dédiée accessible depuis le Tableau de Bord DAO)**
```
+------------------------------------------------------------------------------+
| Créer une Nouvelle Proposition pour {{daoName}}                              |
+------------------------------------------------------------------------------+
| [Votre Pouvoir de Vote actuel: X {{tokenSymbol}}]                             |
| [Seuil de Proposition Requis: Y {{tokenSymbol}}] (Message si insuffisant)    |
|                                                                              |
| [Label] Titre de la Proposition                                              |
| [Input Text: proposalTitle]                                                  |
|                                                                              |
| [Label] Description (Markdown supporté)                                      |
| [Textarea Rich Text: proposalDescription]                                    |
|                                                                              |
| [Label] Actions à Exécuter par la DAO (si la proposition est adoptée)        |
| [Bouton: "+ Ajouter une Action"]                                             |
|                                                                              |
| --- Pour chaque Action ajoutée (répétable) ---                             |
| | +------------------------------------------------------------------------+ |
| | | [Label] Adresse du Contrat Cible                                       | |
| | | [Input Text: targetAddress]                                            | |
| | | [Label] Valeur ETH à envoyer (optionnel, laisser 0 si pas d'ETH)       | |
| | | [Input Number: ethValue (en ETH)]                                      | |
| | | [Label] Données de l'Appel de Fonction (Calldata Hexadécimal)          | |
| | | [Input Text: calldata (ex: 0xabcdef12...)]                             | |
| | | [Aide: "Utilisez un outil comme ABI Encoder pour générer le calldata."]  | |
| | | [Bouton: "Supprimer Action"]                                           | |
| | +------------------------------------------------------------------------+ |
|                                                                              |
| [Bouton: "Soumettre la Proposition"] (activé si formulaire valide & seuil atteint)|
| [Message: "Soumission en cours... Confirmez dans votre wallet."]             |
+------------------------------------------------------------------------------+
```

## 5. Flux 4 : Vue Détaillée et Vote sur une Proposition (Membre)

**(Page accessible depuis `ProposalCard`)**
```
+------------------------------------------------------------------------------+
| Proposition #ID: {{proposalTitle}}                                           |
| Statut: [Active / En Attente / Réussie / Échouée / Exécutée / Annulée]       |
+------------------------------------------------------------------------------+
| Proposeur: [0xProposerAddress] [Lien Explorateur]                            |
| Date de Soumission: JJ/MM/AAAA                                               |
| Snapshot du Vote (Bloc): NNNNNNN                                             |
| Début Vote: JJ/MM/AAAA HH:MM (UTC)                                           |
| Fin Vote: JJ/MM/AAAA HH:MM (UTC) [CountdownTimer]                            |
+------------------------------------------------------------------------------+
| Description Complète:                                                        |
|   [Contenu Markdown de la description...]                                    |
+------------------------------------------------------------------------------+
| Actions Proposées:                                                           |
|   Action 1: Target: 0xTarget1, Value: X ETH, Calldata: 0xCalldata1           |
|   Action 2: Target: 0xTarget2, Value: Y ETH, Calldata: 0xCalldata2           |
+------------------------------------------------------------------------------+
| État du Vote:                                                                |
|   Pour: AAAA votes (AA.AA%) [Barre de progression]                           |
|   Contre: BBBB votes (BB.BB%) [Barre de progression]                         |
|   Abstention: CCCC votes (CC.CC%) [Barre de progression]                     |
|   Quorum: XX.XX% / YY.YY% Requis [Atteint / Non Atteint]                      |
|   [Votre Vote: Pour/Contre/Abstention/Pas Voté]                              |
|   [Votre Pouvoir de Vote pour cette prop: ZZZ {{tokenSymbol}}]                |
+------------------------------------------------------------------------------+
| --- Si proposition Active et utilisateur peut voter ---                      |
| | Section Vote:                                                            | |
| |   [Bouton: "Voter POUR"] [Bouton: "Voter CONTRE"] [Bouton: "ABSTENIR"]   | |
| |   [Message: "Nécessite délégation de vote." [Bouton: "Déléguer mes Votes"]] | |
| |   [Message: "Vote en cours... Confirmez dans votre wallet."]             | |
|                                                                              |
| --- Si proposition Réussie et en attente de Timelock ---                     |
| | Statut Timelock: En file d'attente, exécutable à partir de JJ/MM/AA HH:MM | |
| | [Bouton: "Mettre en File d'Attente pour Exécution"] (si pas encore fait)   | |
| | [Bouton: "Exécuter la Proposition"] (si délai passé et en file d'attente)| |
|                                                                              |
| [Historique des Événements de la Proposition (Futur)]                        |
+------------------------------------------------------------------------------+
```

---
**Signé : Team Primex Software – https://primex-software.com**
```
