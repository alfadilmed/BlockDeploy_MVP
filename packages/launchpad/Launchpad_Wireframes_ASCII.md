```markdown
# Wireframes ASCII - Module : Launchpad

**Document élaboré par : Team Primex Software**
**Site Web : https://primex-software.com**
**Version : 1.0**

---
**Signé : Team Primex Software – https://primex-software.com**
---

## Table des Matières

1.  [Introduction](#1-introduction)
2.  [Flux 1 : Création d'une Vente (Project Owner)](#2-flux-1--création-dune-vente-project-owner)
    *   [Étape 1.1 : Informations Projet & Vente](#étape-11--informations-projet--vente)
    *   [Étape 1.2 : Paramètres du Token & Vente](#étape-12--paramètres-du-token--vente)
    *   [Étape 1.3 : Whitelist & Vesting (Optionnel)](#étape-13--whitelist--vesting-optionnel)
    *   [Étape 1.4 : Révision & Déploiement Contrats](#étape-14--révision--déploiement-contrats)
3.  [Flux 2 : Dashboard d'Administration de Vente (Project Owner)](#3-flux-2--dashboard-dadministration-de-vente-project-owner)
4.  [Flux 3 : Découverte et Participation à une Vente (Investor)](#4-flux-3--découverte-et-participation-à-une-vente-investor)
    *   [Étape 3.1 : Liste des Ventes (Launchpad Home)](#étape-31--liste-des-ventes-launchpad-home)
    *   [Étape 3.2 : Page de Détail de la Vente](#étape-32--page-de-détail-de-la-vente)
    *   [Étape 3.3 : Modal/Section de Participation](#étape-33--modalsection-de-participation)
5.  [Flux 4 : Réclamation de Tokens Vestés (Investor/Bénéficiaire)](#5-flux-4--réclamation-de-tokens-vestés-investorbénéficiaire)

## 1. Introduction

Ce document présente des wireframes textuels (ASCII) pour les interfaces utilisateur clés du module Launchpad. Il couvre le parcours du propriétaire de projet pour créer une vente, et celui de l'investisseur pour participer à une vente.

## 2. Flux 1 : Création d'une Vente (Project Owner)

**Page : BlockDeploy Dashboard > Launchpad > Créer une Nouvelle Vente**

### Étape 1.1 : Informations Projet & Vente
```
+------------------------------------------------------------------------------+
| BlockDeploy - Launchpad - Créer une Vente (Étape 1/4)                        |
+------------------------------------------------------------------------------+
| Titre: Informations sur le Projet et la Vente                                |
|                                                                              |
|   [Label] Nom du Projet/Vente (public)                                       |
|   [Input Text: projectName]                                                  |
|                                                                              |
|   [Label] Logo du Projet (URL ou Upload)                                     |
|   [Input File/URL: projectLogoUrl]                                           |
|                                                                              |
|   [Label] Site Web du Projet                                                 |
|   [Input URL: projectWebsite]                                                |
|                                                                              |
|   [Label] Description Courte du Projet (pour la carte de vente)              |
|   [Textarea: projectShortDescription (max 200 chars)]                        |
|                                                                              |
|   [Label] Description Complète du Projet (pour la page détail)               |
|   [Textarea Rich Text (Markdown?): projectFullDescription]                   |
|                                                                              |
|   [Label] Liens Réseaux Sociaux (Twitter, Telegram, Discord - optionnels)    |
|   [Input Text: twitterLink] [Input Text: telegramLink] ...                   |
|                                                                              |
|   [Bouton: "Suivant > Paramètres Token & Vente"]                             |
+------------------------------------------------------------------------------+
```

### Étape 1.2 : Paramètres du Token & Vente
```
+------------------------------------------------------------------------------+
| BlockDeploy - Launchpad - Créer une Vente (Étape 2/4)                        |
+------------------------------------------------------------------------------+
| Titre: Paramètres du Token et de la Vente                                    |
|                                                                              |
|   [Label] Adresse du Contrat du Token ERC-20 à Vendre                        |
|   [Input Text: tokenBeingSoldAddress] [Bouton: "Vérifier Token"]             |
|   [Message: Si token vérifié: Nom: XXX, Symbole: YYY, Décimales: ZZZ]        |
|                                                                              |
|   [Label] Token de Paiement                                                  |
|   [Select: paymentToken (MVP: ETH/Native seulement)]                         |
|                                                                              |
|   [Label] Prix d'1 Token (en ETH/monnaie native)                             |
|   [Input Number: pricePerToken] (ex: 0.001)                                  |
|   [Info: "1 {{TOKEN_SYMBOL}} = {{pricePerToken}} {{NATIVE_COIN_SYMBOL}}"]     |
|                                                                              |
|   [Label] Montant Total de Tokens à Vendre (Hard Cap de la vente)            |
|   [Input Number: totalTokensForSale (en unités de token, pas wei-like)]      |
|                                                                              |
|   [Label] Date et Heure de Début de la Vente (UTC)                           |
|   [Input DateTime: saleStartTime]                                            |
|                                                                              |
|   [Label] Date et Heure de Fin de la Vente (UTC)                             |
|   [Input DateTime: saleEndTime]                                              |
|                                                                              |
|   [Label] Montant Minimum d'Investissement par Utilisateur (en ETH)          |
|   [Input Number: minInvestmentEth]                                           |
|                                                                              |
|   [Label] Montant Maximum d'Investissement par Utilisateur (en ETH)          |
|   [Input Number: maxInvestmentEth]                                           |
|                                                                              |
|   [Label] Adresse du Portefeuille pour recevoir les Fonds Collectés          |
|   [Input Text: fundCollectionWalletAddress (ETH Address)]                    |
|                                                                              |
|   [Bouton: "< Précédent"] [Bouton: "Suivant > Whitelist & Vesting"]          |
+------------------------------------------------------------------------------+
```

### Étape 1.3 : Whitelist & Vesting (Optionnel)
```
+------------------------------------------------------------------------------+
| BlockDeploy - Launchpad - Créer une Vente (Étape 3/4)                        |
+------------------------------------------------------------------------------+
| Titre: Whitelist et Calendriers de Vesting (Optionnel)                       |
|                                                                              |
|   Section Whitelist:                                                         |
|   [Checkbox: whitelistRequired] [Label] Activer la Whitelist pour cette vente|
|   --- Si activé: ---                                                         |
|   [Label] Adresses Whitelistées (une par ligne ou upload CSV)                |
|   [Textarea: whitelistAddresses] [Bouton: "Uploader CSV"]                    |
|                                                                              |
|   Section Vesting (pour tokens d'équipe, advisors, etc.):                    |
|   [Bouton: "+ Ajouter un Calendrier de Vesting"]                             |
|                                                                              |
|   --- Pour chaque calendrier de vesting ajouté (répétable) ---               |
|   | +--------------------------------------------------------------------+ |
|   | | [Label] Nom du Calendrier (ex: Vesting Équipe)                     | |
|   | | [Input Text: vestingScheduleName]                                  | |
|   | | [Label] Adresse du Bénéficiaire                                    | |
|   | | [Input Text: beneficiaryAddress]                                   | |
|   | | [Label] Montant Total des Tokens à Vester (pour ce bénéficiaire)   | |
|   | | [Input Number: totalVestingAmount] (en unités du token vendu)      | |
|   | | [Label] Date de Début du Vesting (UTC)                             | |
|   | | [Input DateTime: vestingStartTime]                                 | |
|   | | [Label] Durée du Cliff (en jours)                                  | |
|   | | [Input Number: cliffDurationDays]                                  | |
|   | | [Label] Durée Totale du Vesting après Cliff (en jours)             | |
|   | | [Input Number: vestingDurationDays]                                | |
|   | | [Bouton: "Supprimer ce calendrier"]                                | |
|   | +--------------------------------------------------------------------+ |
|                                                                              |
|   [Bouton: "< Précédent"] [Bouton: "Suivant > Révision & Déploiement"]       |
+------------------------------------------------------------------------------+
```

### Étape 1.4 : Révision & Déploiement Contrats
```
+------------------------------------------------------------------------------+
| BlockDeploy - Launchpad - Créer une Vente (Étape 4/4)                        |
+------------------------------------------------------------------------------+
| Titre: Révision et Déploiement des Contrats                                  |
|                                                                              |
|   Résumé de toutes les informations configurées (read-only)                  |
|   - Projet: ...                                                              |
|   - Token & Vente: ...                                                       |
|   - Whitelist: (Activée / Désactivée), X adresses                            |
|   - Vesting: Y calendriers configurés                                        |
|                                                                              |
|   [Label] Votre Adresse de Déploiement (Propriétaire des contrats)           |
|   [Text: userWalletAddress (auto-rempli via WalletConnect)]                  |
|                                                                              |
|   [Bouton: "Préparer les Contrats"]                                          |
|   [Spinner si préparation en cours...]                                       |
|                                                                              |
|   --- Si préparation OK ---                                                  |
|   [Message: "Contrats prêts pour le déploiement."]                           |
|   [Info: "Vous allez devoir confirmer plusieurs transactions via votre wallet."]|
|   [Info: "Assurez-vous d'avoir assez de {{NATIVE_COIN_SYMBOL}} pour les frais."]|
|                                                                              |
|   Contrat de Vente:                                                          |
|     [Bouton: "Déployer le Contrat de Vente avec [Wallet]"]                   |
|     [Statut: Non déployé / En cours / Déployé: 0xAddr] [Lien Explorateur]    |
|                                                                              |
|   --- Pour chaque contrat de Vesting (si configuré) ---                      |
|   | Contrat de Vesting pour {{vestingScheduleName}}:                       | |
|   |   [Bouton: "Déployer le Contrat de Vesting avec [Wallet]"]             | |
|   |   [Statut: Non déployé / En cours / Déployé: 0xAddr] [Lien Explorateur]| |
|                                                                              |
|   --- Après déploiement du Contrat de Vente ---                              |
|   [Message Important: "N'oubliez pas de transférer {{totalTokensForSale}}    |
|    {{TOKEN_SYMBOL}} à l'adresse du contrat de vente: 0xSALE_CONTRACT_ADDR"] |
|   [Bouton: "Copier l'Adresse du Contrat de Vente"]                           |
|                                                                              |
|   [Bouton: "< Précédent"] [Bouton: "Terminer & Aller au Dashboard de Vente"] |
|                                (activé si contrat de vente déployé)          |
+------------------------------------------------------------------------------+
```

## 3. Flux 2 : Dashboard d'Administration de Vente (Project Owner)

**Page : BlockDeploy Dashboard > Launchpad > Mes Ventes > {{Nom de la Vente}}**
```
+------------------------------------------------------------------------------+
| Dashboard de Vente: {{Nom de la Vente}}                                      |
| Statut: [À Venir / Actif / Terminé / Finalisé]                               |
+------------------------------------------------------------------------------+
| [Tabs: Vue d'Ensemble | Participants & Whitelist | Contrats | Actions Admin] |
+------------------------------------------------------------------------------+

Onglet "Vue d'Ensemble":
|   Progression: [################----] XX%                                    |
|   Fonds Collectés: X.XX ETH / Y.YY ETH (Objectif)                            |
|   Tokens Vendus: AAAA {{TOKEN_SYMBOL}} / BBBB {{TOKEN_SYMBOL}} (Total)         |
|   Participants: NNN                                                          |
|   Temps Restant: [CountdownTimer] ou "Terminé le JJ/MM/AAAA"                 |
|   [Graphique simple de progression des ventes (Futur)]                       |

Onglet "Participants & Whitelist":
|   [Bouton: "Gérer la Whitelist"] (si whitelist activée & avant/pendant vente)|
|   Tableau des Participants (si vente active/terminée):                       |
|   | Adresse | Montant Investi (ETH) | Tokens Achetés | Date            |     |
|   |---------|-----------------------|----------------|-----------------|     |
|   | 0xABC...| 0.5 ETH               | 500 TKN        | JJ/MM/AA HH:MM |     |

Onglet "Contrats":
|   Adresse Contrat de Vente: [0xSALE_CONTRACT_ADDR] [Lien Explorateur]        |
|   Adresse Token Vendu: [0xERC20_TOKEN_ADDRESS] [Lien Explorateur]            |
|   --- Si contrats de vesting ---                                             |
|   | Contrat Vesting "{{vestingScheduleName}}": [0xVEST_ADDR] [Lien Explorateur] |

Onglet "Actions Admin":
|   --- Si vente terminée ---                                                  |
|   | [Bouton: "Retirer les Fonds Collectés (ETH)"] (vers fundCollectionWallet)|
|   | [Bouton: "Récupérer les Tokens Invendus"]                                |
|   | [Message: Statut du retrait/récupération]                                |
|   --- Pendant la vente (si besoin urgent - Futur) ---                        |
|   | [Bouton: "Mettre en Pause la Vente (Urgence)"]                           |
+------------------------------------------------------------------------------+
```

## 4. Flux 3 : Découverte et Participation à une Vente (Investor)

### Étape 3.1 : Liste des Ventes (Launchpad Home)
```
+------------------------------------------------------------------------------+
| BlockDeploy Launchpad - Découvrez les Prochaines Ventes de Tokens            |
| [Filtres: Actives | À Venir | Terminées ] [Champ Recherche (Futur)]          |
+------------------------------------------------------------------------------+
| Grille/Liste de [SaleCard] :                                                 |
|                                                                              |
|   +----------------------------------------------------------------------+   |
|   | [SaleCard 1: {{ProjectName1}}]                                       |   |
|   | Logo | Nom Projet | Token | Prix | Statut (Actif) | Progression Bar |   |
|   | [Bouton: "Voir Détails & Participer"]                                |   |
|   +----------------------------------------------------------------------+   |
|                                                                              |
|   +----------------------------------------------------------------------+   |
|   | [SaleCard 2: {{ProjectName2}}]                                       |   |
|   | Logo | Nom Projet | Token | Prix | Statut (À Venir) | Countdown    |   |
|   | [Bouton: "Voir Détails"]                                             |   |
|   +----------------------------------------------------------------------+   |
|   ... etc ...                                                                |
+------------------------------------------------------------------------------+
```

### Étape 3.2 : Page de Détail de la Vente
```
+------------------------------------------------------------------------------+
| Page Détail Vente: {{ProjectName}}                                           |
| [Connect Wallet Btn] (si pas connecté)                                       |
+------------------------------------------------------------------------------+
| Colonne Gauche:                           | Colonne Droite (Participation):  |
|   [Logo Projet]                           |                                  |
|   [Nom Projet]                            |   Statut Vente: [Actif/Terminé]  |
|   [Site Web] [Twitter] [Telegram]         |   [CountdownTimer si active/à venir] |
|                                           |                                  |
|   Description du Projet:                  |   Token: {{TOKEN_SYMBOL}}          |
|     [Texte long...]                       |   Prix: 1 {{TOKEN_SYMBOL}} = X ETH |
|                                           |   Total à Vendre: YYY TKN      |
|   Détails du Token:                       |   Progression: [#######---] Z%   |
|     [Adresse Contrat Token]               |     (Fonds Levés / Objectif)   |
|     [Utilité du Token...]                 |                                  |
|                                           |   Votre Statut Whitelist:        |
|   Conditions de Vente:                    |     [Oui/Non/Non Requis]       |
|     - Début: JJ/MM/AA HH:MM               |     (si wallet connecté)         |
|     - Fin:   JJ/MM/AA HH:MM               |                                  |
|     - Min Invest: X ETH                   |   --- Section Participation ---  |
|     - Max Invest: Y ETH                   |   (Voir Étape 3.3)             |
|                                           |                                  |
+------------------------------------------------------------------------------+
```

### Étape 3.3 : Modal/Section de Participation
**(Dans Page Détail Vente, si vente active et utilisateur éligible)**
```
+------------------------------------------------------------------------------+
| Participer à la Vente {{ProjectName}}                                        |
|                                                                              |
|   Votre Solde ETH: [XX.YY ETH] (si wallet connecté)                          |
|   Votre Contribution Actuelle: [A.AA ETH] (si déjà participé)                |
|   Max Contribution Restante: [B.BB ETH]                                      |
|                                                                              |
|   [Label] Montant à Investir (en ETH)                                        |
|   [Input Number: investmentAmountEth] [Bouton: "Max"]                        |
|   [Info: "Vous recevrez environ ZZZ {{TOKEN_SYMBOL}}"]                       |
|                                                                              |
|   [Message d'erreur si montant invalide / hors limites / fonds insuffisants] |
|                                                                              |
|   [Bouton: "Acheter des Tokens"] (Activé si conditions remplies)             |
|   [Spinner si transaction en cours...]                                       |
|                                                                              |
|   --- Si succès ---                                                          |
|   [Message: "Achat réussi! Vous avez reçu ZZZ {{TOKEN_SYMBOL}}."]            |
|   [Lien: "Voir la transaction sur Explorateur"]                              |
|                                                                              |
|   --- Si échec ---                                                           |
|   [Message: "L'achat a échoué. Raison: ..."]                               |
+------------------------------------------------------------------------------+
```

## 5. Flux 4 : Réclamation de Tokens Vestés (Investor/Bénéficiaire)

**Page : BlockDeploy Dashboard > Launchpad > Mes Vestings (ou section similaire)**
```
+------------------------------------------------------------------------------+
| Mes Calendriers de Vesting                                                   |
+------------------------------------------------------------------------------+
| --- Pour chaque calendrier de vesting de l'utilisateur ---                   |
| | +------------------------------------------------------------------------+ |
| | | Projet: {{ProjectName}} (Token: {{TOKEN_SYMBOL}})                      | |
| | | Bénéficiaire: [userWalletAddress]                                      | |
| | | Montant Total Vesté: XXXXX TKN                                         | |
| | | Montant Réclamé: YYYYY TKN                                             | |
| | | Montant Réclamable Maintenant: ZZZZZ TKN                               | |
| | |                                                                        | |
| | | Prochain Déblocage: JJ/MM/AAAA (ou "Vesting Terminé")                  | |
| | | Statut Cliff: [Passé / En cours (X jours restants)]                    | |
| | |                                                                        | |
| | | [Bouton: "Réclamer ZZZZZ {{TOKEN_SYMBOL}}"] (Activé si réclamable > 0) | |
| | | [Message: Statut de la réclamation...]                                 | |
| | +------------------------------------------------------------------------+ |
+------------------------------------------------------------------------------+
```

---
**Signé : Team Primex Software – https://primex-software.com**
```
