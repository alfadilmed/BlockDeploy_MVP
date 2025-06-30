```markdown
# Guide Développeur : Créer et Soumettre un Bloc pour la Marketplace

**Document élaboré par : Team Primex Software**
**Site Web : https://primex-software.com**
**Version : 1.0**

---
**Signé : Team Primex Software – https://primex-software.com**
---

## Table des Matières

1.  [Introduction](#1-introduction)
2.  [Qu'est-ce qu'un Bloc BlockDeploy ?](#2-quest-ce-quun-bloc-blockdeploy)
3.  [Prérequis](#3-prérequis)
4.  [Étape 1 : Concevoir votre Bloc](#4-étape-1--concevoir-votre-bloc)
    *   [4.1 Utilité et Public Cible](#41-utilité-et-public-cible)
    *   [4.2 Composants à Inclure](#42-composants-à-inclure)
    *   [4.3 Configurabilité](#43-configurabilité)
5.  [Étape 2 : Structurer votre Bloc (fichier `bloc.json`)](#5-étape-2--structurer-votre-bloc-fichier-blocjson)
    *   [5.1 Rappel du Format (`Bloc_Definition_Format.md`)](#51-rappel-du-format-bloc_definition_formatmd)
    *   [5.2 Section `metadata`](#52-section-metadata)
    *   [5.3 Section `content`](#53-section-content)
6.  [Étape 3 : Créer l'Image de Prévisualisation](#6-étape-3--créer-limage-de-prévisualisation)
7.  [Étape 4 : Tester votre Bloc (Recommandations)](#7-étape-4--tester-votre-bloc-recommandations)
8.  [Étape 5 : Soumettre votre Bloc](#8-étape-5--soumettre-votre-bloc)
    *   [8.1 Processus de Soumission (Voir `Submission_Workflow.md`)](#81-processus-de-soumission-voir-submission_workflowmd)
    *   [8.2 Informations de Licence et de Prix (Simulé MVP)](#82-informations-de-licence-et-de-prix-simulé-mvp)
9.  [Bonnes Pratiques pour la Création de Blocs](#9-bonnes-pratiques-pour-la-création-de-blocs)
10. [Exemple Simplifié : Création d'un Bloc "Bannière d'Alerte Web3"](#10-exemple-simplifié--création-dun-bloc-bannière-dalerte-web3)
11. [Support et Communauté](#11-support-et-communauté)

## 1. Introduction

Bienvenue dans le guide de création de Blocs pour la Blocs Marketplace de BlockDeploy ! Ce guide est destiné aux développeurs et designers qui souhaitent contribuer à l'écosystème BlockDeploy en créant des Blocs réutilisables pour le Drag & Drop Builder.

En partageant vos Blocs, vous aidez d'autres utilisateurs à construire plus rapidement et plus efficacement des interfaces et des dApps Web3.

## 2. Qu'est-ce qu'un Bloc BlockDeploy ?

Un "Bloc" est un ensemble de un ou plusieurs composants du Drag & Drop Builder, avec des propriétés et des styles pré-configurés. Il est défini par un fichier JSON (`bloc.json`) qui contient :
*   Des **métadonnées** (nom, description, auteur, tags, image de preview, etc.).
*   Le **contenu** réel du Bloc, c'est-à-dire la structure hiérarchique des composants et leurs configurations, compatible avec le schéma utilisé par le Drag & Drop Builder.

Les Blocs peuvent être simples (ex: un bouton stylisé avec une icône) ou complexes (ex: une section "Hero" complète, un tableau de bord de staking).

## 3. Prérequis

Avant de commencer, assurez-vous de bien comprendre :
1.  Le fonctionnement du **Drag & Drop Builder** de BlockDeploy (Module M4.1).
2.  La liste des composants disponibles dans la palette du Builder et leurs propriétés configurables (voir `Palette_Components.md` du module Drag & Drop Builder).
3.  Le **Format de Définition d'un Bloc** (décrit dans `Bloc_Definition_Format.md` de la Blocs Marketplace).
4.  Le **Schéma d'Exportation du Design** du Drag & Drop Builder (décrit dans `Schema_Export_Design.md`), car la section `content` de votre Bloc doit suivre cette structure.

## 4. Étape 1 : Concevoir votre Bloc

### 4.1 Utilité et Public Cible

*   Quel problème votre Bloc résout-il ? Quelle valeur apporte-t-il ?
*   À quel type d'utilisateur ou de projet s'adresse-t-il ?
*   Est-il générique et réutilisable dans de nombreux contextes, ou très spécifique ?

### 4.2 Composants à Inclure

*   Choisissez les composants de base du Drag & Drop Builder (`Container`, `Heading`, `TextParagraph`, `Image`, `Button`, `ConnectWalletButton`, `SmartContractButton`, etc.) que vous allez assembler.
*   Pensez à la hiérarchie : quels composants seront imbriqués dans d'autres ?

### 4.3 Configurabilité

*   Quelles propriétés de votre Bloc l'utilisateur final pourra-t-il facilement personnaliser via l'Inspecteur de Propriétés du Drag & Drop Builder une fois le Bloc importé ?
*   Essayez de trouver un bon équilibre : un Bloc trop rigide est peu utile, un Bloc avec trop d'options peut devenir complexe à utiliser.
*   Utilisez des valeurs par défaut judicieuses pour les propriétés.

## 5. Étape 2 : Structurer votre Bloc (fichier `bloc.json`)

C'est l'étape la plus technique. Vous devez créer manuellement (ou via un outil futur) le fichier JSON qui définit votre Bloc.

### 5.1 Rappel du Format (`Bloc_Definition_Format.md`)

Votre fichier `bloc.json` doit avoir cette structure de haut niveau :
```json
{
  "blocApiVersion": "1.0",
  "metadata": { /* ... vos métadonnées ... */ },
  "content": { /* ... la structure ComponentNode de votre bloc ... */ }
}
```

### 5.2 Section `metadata`

Remplissez tous les champs requis et optionnels de la section `metadata` comme décrit dans `Bloc_Definition_Format.md`. Soyez précis et descriptif.
*   **`id` :** Choisissez un ID unique et descriptif (ex: `votrepseudo-nombloc-v1`).
*   **`name` :** Un nom clair et attrayant.
*   **`description` :** Expliquez bien ce que fait le Bloc et ses avantages.
*   **`tags` et `category` :** Aidez les utilisateurs à trouver votre Bloc.
*   **`previewImageUrl` :** Essentiel pour une bonne présentation.

### 5.3 Section `content`

C'est le cœur de votre Bloc. La structure de `content` doit être un objet `ComponentNode` (tel que défini dans `Schema_Export_Design.md` du Drag & Drop Builder).

*   **`id` racine du `content` :** Cet ID sera probablement remplacé par le Builder lors de l'importation. Vous pouvez utiliser une valeur temporaire comme `"bloc-root"`.
*   **`type` :** Le type du composant racine de votre Bloc (souvent un `Container`).
*   **`props` :** Les propriétés pré-configurées pour ce composant racine.
*   **`children` :** Un tableau d'autres `ComponentNode` qui constituent votre Bloc. Chaque enfant peut lui-même avoir des `children`, créant ainsi une hiérarchie.

**Conseil :** Pour créer la section `content`, vous pouvez :
1.  Utiliser le Drag & Drop Builder de BlockDeploy pour assembler visuellement une structure similaire à votre Bloc.
2.  Exporter le design de cette page en JSON.
3.  Extraire la partie pertinente de ce JSON (le `ComponentNode` correspondant à votre Bloc) et l'adapter pour la section `content` de votre `bloc.json`. N'oubliez pas d'ajuster les `id` si nécessaire pour qu'ils soient uniques au sein de la définition de votre Bloc.

## 6. Étape 3 : Créer l'Image de Prévisualisation

*   Créez une image (ex: JPG, PNG, WEBP) qui représente fidèlement l'apparence de votre Bloc.
*   **Dimensions recommandées :** (À spécifier par Primex, ex: 600x400 pixels).
*   **Hébergement :** L'image doit être accessible via une URL publique. Vous pouvez l'héberger sur un service de stockage d'images (Imgur, Cloudinary, votre propre serveur, etc.). Cette URL sera renseignée dans `metadata.previewImageUrl`.
*   Pour le MVP de soumission interne, l'équipe Primex pourra gérer l'hébergement.

## 7. Étape 4 : Tester votre Bloc (Recommandations)

Actuellement (MVP), il n'y a pas d'outil de test local dédié pour les Blocs avant soumission. Cependant, vous pouvez :
1.  **Valider votre `bloc.json` :** Utilisez un validateur JSON en ligne pour vous assurer que la syntaxe est correcte.
2.  **Vérification Manuelle :** Relisez attentivement votre `bloc.json` en vous référant aux schémas (`Bloc_Definition_Format.md` et `Schema_Export_Design.md`).
3.  **Simulation d'Import (si possible) :** Si vous avez accès à une instance de développement du Drag & Drop Builder qui permet l'import de JSON, essayez d'importer le `content` de votre Bloc pour voir comment il se rend.

## 8. Étape 5 : Soumettre votre Bloc

### 8.1 Processus de Soumission (Voir `Submission_Workflow.md`)

*   Pour le MVP, la soumission de Blocs est principalement gérée en interne par l'équipe Primex ou via un processus simplifié pour les partenaires sélectionnés.
*   Consultez le document `Submission_Workflow.md` pour les détails sur le processus actuel.
*   À terme, un formulaire de soumission sera disponible sur la plateforme BlockDeploy.

### 8.2 Informations de Licence et de Prix (Simulé MVP)

Lors de la soumission (ou en éditant le `bloc.json`), vous devrez spécifier :
*   `metadata.licenseType` : Ex: `"Free"` ou `"PaidUsage"`.
*   `metadata.licenseName` (si Free) : Ex: `"MIT"`.
*   `metadata.price` (si PaidUsage) : Ex: `{ "amount": 5, "currency": "USD_MOCK" }`.
*   `metadata.paymentFrequency` (si PaidUsage) : Ex: `"one-time"`.

Référez-vous à `Payment_License_System.md` pour plus de détails sur la simulation.

## 9. Bonnes Pratiques pour la Création de Blocs

*   **Simplicité et Clarté :** Un Bloc doit résoudre un problème de manière claire. Évitez la complexité excessive.
*   **Réutilisabilité :** Concevez votre Bloc pour qu'il puisse être utile dans différents contextes.
*   **Bonnes Valeurs par Défaut :** Les propriétés pré-configurées doivent être esthétiques et fonctionnelles "out-of-the-box".
*   **Personnalisation :** Permettez aux utilisateurs de personnaliser les aspects importants du Bloc (textes, couleurs, images, adresses de contrat, etc.) via les `props`.
*   **Responsivité :** Si votre Bloc implique une mise en page, assurez-vous qu'elle est responsive ou que les composants utilisés le sont.
*   **Performance :** Évitez les images trop lourdes ou les structures inutilement complexes.
*   **Accessibilité (a11y) :** Utilisez des attributs sémantiques et des contrastes de couleurs adéquats.
*   **Documentation Claire :** Les champs `name` et `description` de vos métadonnées sont essentiels.
*   **Image de Prévisualisation de Qualité.**

## 10. Exemple Simplifié : Création d'un Bloc "Bannière d'Alerte Web3"

1.  **Conception :** Je veux une bannière simple pour afficher des messages d'alerte/information, avec un fond coloré, une icône, et un texte personnalisable.
2.  **Composants :** `Container` (racine), `Icon` (optionnel), `TextParagraph`.
3.  **`bloc.json` :**
    ```json
    {
      "blocApiVersion": "1.0",
      "metadata": {
        "id": "primex-web3-alert-banner-v1.0.0",
        "name": "Bannière d'Alerte Web3",
        "version": "1.0.0",
        "author": "VotreNom",
        "description": "Affiche un message d'alerte ou d'information important. Couleur de fond et texte personnalisables.",
        "tags": ["alerte", "notification", "banner", "ui"],
        "category": "UI Elements",
        "previewImageUrl": "https://example.com/alert-banner-preview.png",
        "licenseType": "Free",
        "licenseName": "MIT"
      },
      "content": {
        "id": "alert-banner-root",
        "type": "Container",
        "props": {
          "backgroundColor": "#FFF3CD", // Jaune clair par défaut pour alerte
          "padding": "15px",
          "borderRadius": "4px",
          "border": "1px solid #FFEEBA"
        },
        "children": [
          // Optionnel: un conteneur flex pour icône + texte
          {
            "id": "alert-text",
            "type": "TextParagraph",
            "props": {
              "text": "Message d'alerte par défaut. Modifiez ce texte !",
              "color": "#856404" // Couleur de texte adaptée au fond jaune
            },
            "children": []
          }
        ]
      }
    }
    ```
4.  **Image Preview :** Créer une image de 600x100px montrant la bannière avec son style par défaut.
5.  **Test :** Valider le JSON.
6.  **Soumission :** Suivre le `Submission_Workflow.md`.

## 11. Support et Communauté

Rejoignez la communauté BlockDeploy (forum, Discord - liens futurs) pour poser des questions, partager vos idées de Blocs, et obtenir de l'aide.

---
**Signé : Team Primex Software – https://primex-software.com**
```
