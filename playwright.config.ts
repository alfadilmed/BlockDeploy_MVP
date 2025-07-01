import { defineConfig, devices } from '@playwright/test';

// Charger les variables d'environnement si nécessaire (ex: pour baseURL)
// require('dotenv').config();

// URL de base pour les tests. Peut être surchargée par une variable d'environnement.
// Pour les tests locaux, vous devrez démarrer vos applications sur ces ports.
const E2E_BASE_URL_LANDING = process.env.E2E_BASE_URL_LANDING || 'http://localhost:3000';
const E2E_BASE_URL_TOKEN_CREATOR = process.env.E2E_BASE_URL_TOKEN_CREATOR || 'http://localhost:3001'; // Assurez-vous que le port est correct
const E2E_BASE_URL_LAUNCHPAD = process.env.E2E_BASE_URL_LAUNCHPAD || 'http://localhost:3002';     // Assurez-vous que le port est correct

export default defineConfig({
  testDir: './e2e', // Répertoire où se trouvent les fichiers de test E2E
  fullyParallel: true, // Exécuter les tests en parallèle
  forbidOnly: !!process.env.CI, // Interdire `test.only` en CI
  retries: process.env.CI ? 2 : 0, // Réessayer 2 fois en CI, 0 fois en local
  workers: process.env.CI ? 1 : undefined, // Utiliser 1 worker en CI pour la stabilité, undefined pour local (utilise des cœurs disponibles)

  reporter: process.env.CI ? 'blob' : 'html', // Reporter HTML pour local, 'blob' pour CI (Azure Artifacts) ou 'github'

  use: {
    // baseURL est utilisé par les actions comme `page.goto('/')`
    // Nous allons le définir par projet ci-dessous car nous avons plusieurs apps.
    trace: 'on-first-retry', // Enregistrer une trace si un test échoue après une première tentative
    // headless: !!process.env.CI, // Exécuter en headless en CI (par défaut)
    // launchOptions: {
    //   slowMo: process.env.CI ? 0 : 250, // Ralentir l'exécution en local pour observer
    // },
  },

  projects: [
    {
      name: 'chromium-landing',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: E2E_BASE_URL_LANDING,
      },
      testMatch: /landing\.spec\.ts/, // Uniquement les tests pour la landing page
    },
    {
      name: 'chromium-token-creator',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: E2E_BASE_URL_TOKEN_CREATOR,
      },
      testMatch: /token-creator\.spec\.ts/, // Uniquement les tests pour token-creator
    },
    {
      name: 'chromium-launchpad',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: E2E_BASE_URL_LAUNCHPAD,
      },
      testMatch: /launchpad\.spec\.ts/, // Uniquement les tests pour launchpad
    },

    // Exemples pour d'autres navigateurs (décommenter si besoin)
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'], baseURL: E2E_BASE_URL_LANDING },
    //   testMatch: /landing\.spec\.ts/,
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'], baseURL: E2E_BASE_URL_LANDING },
    //   testMatch: /landing\.spec\.ts/,
    // },
  ],

  // Commande pour démarrer le serveur web avant les tests (si on teste localement sans CI)
  // Cette configuration est plus complexe dans un monorepo avec plusieurs apps.
  // Il est souvent plus simple de démarrer les serveurs manuellement ou via un script parent.
  // webServer: [
  //   {
  //     command: 'yarn workspace landing dev',
  //     url: E2E_BASE_URL_LANDING,
  //     reuseExistingServer: !process.env.CI,
  //     timeout: 120 * 1000,
  //   },
  //   {
  //     command: 'yarn workspace token-creator dev', // Assurez-vous que le port est différent
  //     url: E2E_BASE_URL_TOKEN_CREATOR,
  //     reuseExistingServer: !process.env.CI,
  //     timeout: 120 * 1000,
  //   },
  //   {
  //     command: 'yarn workspace launchpad dev', // Assurez-vous que le port est différent
  //     url: E2E_BASE_URL_LAUNCHPAD,
  //     reuseExistingServer: !process.env.CI,
  //     timeout: 120 * 1000,
  //   }
  // ],
});
