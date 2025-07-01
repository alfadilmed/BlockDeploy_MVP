import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox"; // Includes ethers, waffle, etc.
import "@openzeppelin/contracts"; // Pour l'import direct dans les tests/scripts si besoin

// Importer dotenv pour charger les variables d'environnement depuis .env
// Assurez-vous d'avoir un fichier .env à la racine de ce package ou du monorepo
// et que ce package .env est dans .gitignore
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + '/.env' }); // Charger .env depuis le répertoire du package smart-contracts

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || "https://rpc.sepolia.org"; // Fallback public
const DEPLOYER_PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY || "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"; // Clé privée du compte #0 de Hardhat node (NE PAS UTILISER EN PRODUCTION)
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || ""; // Pour la vérification de contrat

if (DEPLOYER_PRIVATE_KEY === "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80") {
  console.warn(
    "ATTENTION: Vous utilisez la clé privée par défaut de Hardhat pour le déploiement." +
    "Cette clé est publique et ne doit JAMAIS être utilisée pour déployer des contrats sur des réseaux réels." +
    "Veuillez configurer DEPLOYER_PRIVATE_KEY dans votre fichier .env avec une clé privée sécurisée."
  );
}


const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24", // Version de Solidity à utiliser
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      // viaIR: true, // Peut être activé pour l'optimisation, mais peut augmenter la taille du bytecode initial
    },
  },
  networks: {
    hardhat: { // Réseau local de développement Hardhat
      chainId: 31337,
      // gasPrice: 1000000000, // 1 gwei (optionnel)
    },
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [DEPLOYER_PRIVATE_KEY],
      chainId: 11155111,
      // gasPrice: 20000000000, // 20 gwei (ajuster selon le marché)
    },
    // mainnet: { // Configuration pour le mainnet (à décommenter et configurer)
    //   url: process.env.MAINNET_RPC_URL || "",
    //   accounts: [DEPLOYER_PRIVATE_KEY_MAINNET || DEPLOYER_PRIVATE_KEY], // Utiliser une clé spécifique pour mainnet
    //   chainId: 1,
    // },
  },
  etherscan: {
    apiKey: {
        sepolia: ETHERSCAN_API_KEY,
        // mainnet: ETHERSCAN_API_KEY_MAINNET || ETHERSCAN_API_KEY,
    }
  },
  gasReporter: { // Pour obtenir des rapports sur la consommation de gas des tests
    enabled: process.env.REPORT_GAS !== undefined, // Activer avec `REPORT_GAS=true yarn test`
    currency: "USD",
    coinmarketcap: process.env.COINMARKETCAP_API_KEY || "", // Optionnel, pour conversion en USD
    // outputFile: "gas-report.txt", // Optionnel
    // noColors: true, // Optionnel
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  mocha: {
    timeout: 40000, // Augmenter le timeout pour les tests qui déploient des contrats
  },
  typechain: { // Configuration pour TypeChain (génération de typages TypeScript pour les contrats)
    outDir: "typechain-types",
    target: "ethers-v6", // ou "web3-v1" etc. selon votre librairie ethers/web3
  },
};

export default config;
