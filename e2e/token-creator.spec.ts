import { test, expect } from '@playwright/test';

test.describe('Token Creator dApp E2E', () => {
  // Note: La connexion Wallet est un défi majeur en E2E.
  // Ces tests supposent une interaction simplifiée ou un état pré-connecté.
  // Pour des tests E2E robustes avec WalletConnect, des solutions comme Synpress
  // ou une gestion de session mockée en mode test seraient nécessaires.
  // Pour ce MVP de test E2E, nous allons nous concentrer sur le remplissage du formulaire
  // et la vérification des outputs UI, en supposant que la connexion wallet est gérée.

  test.beforeEach(async ({ page }) => {
    // Naviguer vers la page Token Creator (baseURL est définie dans playwright.config.ts)
    await page.goto('/');
    // Attendre que la page soit chargée (ex: le titre principal est visible)
    await expect(page.getByRole('heading', { name: /Créateur de Tokens ERC-20/i })).toBeVisible();

    // Simuler un portefeuille connecté pour les besoins du test du formulaire
    // Ceci ne connecte pas réellement un wallet, mais permet de passer la garde `!account.isConnected`
    // dans le composant CreateTokenForm. Une vraie interaction nécessiterait plus.
    await page.evaluate(() => {
      // @ts-ignore
      window.testHook_setWalletConnected = true;
    });
    // Le bouton devrait maintenant être actif (si le composant réagit à cette variable globale de test)
    // Sinon, il faudra mocker la réponse du hook useBlockDeployWallet au niveau de l'application en mode test.
  });

  test('should allow filling the form and simulate deployment (UI check)', async ({ page }) => {
    // Remplir le formulaire
    await page.getByLabel('Nom du Token').fill('My E2E Test Token');
    await page.getByLabel('Symbole du Token').fill('E2ETST');
    await page.getByLabel(/Supply Initiale/i).fill('500000');
    await page.getByLabel('Décimales').fill('18');

    // Cliquer sur le bouton de déploiement
    // Il faut que le bouton soit actif (wallet "connecté")
    const deployButton = page.getByRole('button', { name: /Vérifier & Déployer Token/i });

    // Attendre que le bouton soit potentiellement activé par le mock de connexion
    // Cette approche avec window.testHook_setWalletConnected est très basique.
    // Pour un test plus fiable, il faudrait mocker le hook useBlockDeployWallet.
    // Pour l'instant, on suppose que le bouton devient cliquable.
    // Si le bouton reste désactivé, ce test échouera ici.

    // Si le bytecode est le placeholder, le formulaire affichera une erreur.
    // On s'attend à ce que le script update-artifacts ait été lancé et que le bytecode soit "valide" (non-placeholder).
    // Ou alors, il faut mocker la vérification du bytecode dans le formulaire pour le test E2E.

    // Pour ce test, nous allons vérifier que le bouton est présent. L'interaction complète
    // dépendra de la stratégie de gestion du wallet et du bytecode.
    await expect(deployButton).toBeEnabled(); // Ce test pourrait être instable sans un bon mock de wallet.

    // Simuler le clic et vérifier un message de succès (qui est simulé dans le composant actuel)
    // En l'état actuel, le composant utilise un setTimeout pour simuler le déploiement.
    // On s'attend à ce que le message "Token déployé avec succès !" apparaisse.

    // Commentaire: Le test suivant est commenté car il dépend fortement de la simulation
    // interne du composant CreateTokenForm et du remplacement du bytecode placeholder.
    // Une fois le bytecode réel en place et la logique de déploiement affinée, ce test pourra être activé.
    /*
    await deployButton.click();

    // Attendre l'affichage du message de succès (qui inclut l'adresse simulée)
    // Le message exact et le sélecteur peuvent varier.
    const successMessage = page.getByText(/Token déployé avec succès ! Adresse:/i);
    await expect(successMessage).toBeVisible({ timeout: 10000 }); // Augmenter le timeout si la simulation est longue

    // Vérifier l'affichage de l'adresse du contrat (simulée)
    const deployedAddressText = await successMessage.textContent();
    expect(deployedAddressText).toContain('0x');

    // Vérifier la présence du composant DeployedTokenInfo (indirectement via son contenu)
    await expect(page.getByText(/Détails de votre Token Déployé :/i)).toBeVisible();
    */
  });

  test('should display validation errors for empty required fields', async ({ page }) => {
    // Laisser les champs vides et cliquer sur Déployer
    const deployButton = page.getByRole('button', { name: /Vérifier & Déployer Token/i });
    await deployButton.click();

    // Vérifier les messages d'erreur de validation
    await expect(page.getByText('Le nom du token est requis.')).toBeVisible();
    await expect(page.getByText('Le symbole du token est requis.')).toBeVisible();
    // Supply et Decimals ont des valeurs par défaut, donc ne seront pas en erreur si laissés vides.
  });

  test('should display validation error for invalid symbol', async ({ page }) => {
    await page.getByLabel('Symbole du Token').fill('TKN!');
    const deployButton = page.getByRole('button', { name: /Vérifier & Déployer Token/i });
    await deployButton.click();
    await expect(page.getByText('Le symbole ne doit contenir que des caractères alphanumériques.')).toBeVisible();
  });

});
