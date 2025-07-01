import { test, expect } from '@playwright/test';

test.describe('Launchpad dApp E2E', () => {
  const MOCK_ERC20_TOKEN_ADDRESS_FOR_LAUNCHPAD = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'; // Remplacer par une vraie adresse de testnet si besoin
  let createdLaunchpadAddress: string | null = null;

  test.beforeEach(async ({ page }) => {
    // Simuler un portefeuille connecté
    await page.evaluate(() => {
      // @ts-ignore
      window.testHook_setWalletConnected = true;
    });
  });

  test('Scenario 1: Create a new Launchpad', async ({ page }) => {
    await page.goto('/create'); // Naviguer vers la page de création de Launchpad
    await expect(page.getByRole('heading', { name: /Créer un Nouveau Launchpad/i })).toBeVisible();

    // Remplir le formulaire de création
    await page.getByLabel('Adresse du Token ERC-20 à vendre').fill(MOCK_ERC20_TOKEN_ADDRESS_FOR_LAUNCHPAD);
    await page.getByLabel('Prix par Token (en ETH)').fill('0.001');
    await page.getByLabel('Quantité de Tokens à Vendre').fill('10000'); // 10,000 tokens

    // Gérer la date et l'heure pour la deadline (ex: demain à midi)
    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const year = tomorrow.getFullYear();
    const month = (tomorrow.getMonth() + 1).toString().padStart(2, '0');
    const day = tomorrow.getDate().toString().padStart(2, '0');
    const deadlineDate = `${year}-${month}-${day}`;
    const deadlineTime = '12:00';

    // Trouver les inputs date et time par leur type, car ils n'ont pas de label direct unique
    await page.locator('input[type="date"][name="deadlineDate"]').fill(deadlineDate);
    await page.locator('input[type="time"][name="deadlineTime"]').fill(deadlineTime);

    // Cliquer sur le bouton de création
    const createButton = page.getByRole('button', { name: /Créer le Launchpad/i });
    await expect(createButton).toBeEnabled();

    // Commentaire: Le test suivant est commenté car il dépend fortement de la simulation
    // interne du composant CreateLaunchpadForm et du remplacement du bytecode placeholder.
    // Une fois le bytecode réel en place et la logique de déploiement affinée, ce test pourra être activé.
    /*
    await createButton.click();

    // Attendre le message de succès et récupérer l'adresse du launchpad
    const successMessage = page.getByText(/Launchpad déployé avec succès ! Adresse:/i);
    await expect(successMessage).toBeVisible({ timeout: 15000 });

    const successText = await successMessage.textContent();
    const match = successText?.match(/Adresse: (0x[a-fA-F0-9]{40})/);
    expect(match).toBeTruthy();
    if (match) {
        createdLaunchpadAddress = match[1];
        console.log(`Launchpad créé (simulé) à l'adresse: ${createdLaunchpadAddress}`);
        // Vérifier le lien vers le launchpad
        await expect(page.getByRole('link', { name: /Voir votre Launchpad ici/i })).toHaveAttribute('href', `/launchpad/${createdLaunchpadAddress}`);
    }
    */
  });

  // Le Scénario 2 (Participation) dépend du succès du Scénario 1 pour avoir une adresse de launchpad.
  // En E2E, il est préférable de rendre les tests indépendants ou de gérer un état partagé avec précaution.
  // Pour ce MVP, nous allons le commenter car il nécessite une adresse de launchpad valide et active.
  /*
  test('Scenario 2: Participate in a created Launchpad', async ({ page }) => {
    test.skip(!createdLaunchpadAddress, 'Test de création de Launchpad doit passer en premier et retourner une adresse.');

    if (!createdLaunchpadAddress) {
      console.warn('Adresse du Launchpad non disponible, skip du test de participation.');
      return;
    }

    await page.goto(`/launchpad/${createdLaunchpadAddress}`);
    await expect(page.getByRole('heading', { name: /Détails du Launchpad/i })).toBeVisible();

    // Attendre que les informations du launchpad soient chargées (ex: le widget d'achat)
    // Le widget d'achat a un titre "Participer"
    await expect(page.getByRole('heading', { name: /Participer/i })).toBeVisible({timeout: 10000});

    // Remplir le widget d'achat
    const amountToBuyInput = page.getByLabelText(/Quantité de .* à acheter/i); // Le symbole du token peut varier
    await amountToBuyInput.fill('100'); // Acheter 100 tokens

    // Vérifier le coût estimé (dépend du prix configuré et des décimales du token)
    // Exemple: await expect(page.getByText(/Coût estimé : 0.1 ETH/i)).toBeVisible();

    const buyButton = page.getByRole('button', { name: /Acheter/i }); // Le nom exact peut varier
    await expect(buyButton).toBeEnabled();
    await buyButton.click();

    // Vérifier le message de succès de l'achat
    const purchaseSuccessMessage = page.getByText(/Achat confirmé ! Tx:/i);
    await expect(purchaseSuccessMessage).toBeVisible({ timeout: 15000 });
  });
  */
});
