import fs from 'fs-extra'; // Pour les opérations sur le système de fichiers
import path from 'path';
import { execSync } from 'child_process'; // Pour exécuter des commandes shell

// Configuration des chemins
const MONOREPO_ROOT = path.resolve(__dirname, '..'); // Remonter d'un niveau depuis scripts/
const SMART_CONTRACTS_PACKAGE_PATH = path.join(MONOREPO_ROOT, 'packages', 'smart-contracts');
const CORE_SDK_ABIS_PATH = path.join(MONOREPO_ROOT, 'packages', 'core-sdk', 'src', 'contracts', 'abis');

// Liste des contrats à traiter. Peut être étendu ou rendu dynamique.
// Le nom ici doit correspondre au nom du fichier .sol et au nom du contrat dans le fichier.
const CONTRACTS_TO_UPDATE = [
  'MinimalERC20',
  'SimpleLaunchpad',
  // Ajoutez d'autres noms de contrats ici au fur et à mesure
];

// Fonction pour formater l'ABI en une chaîne de caractères pour le fichier .ts
function formatAbiForTs(abi: any[]): string {
  return JSON.stringify(abi, null, 2);
}

// Fonction pour générer le contenu du fichier .ts pour un artefact de contrat
function generateArtifactTsContent(contractName: string, abi: any[], bytecode: string): string {
  return `// Auto-généré par scripts/update-contract-artifacts.ts - NE PAS MODIFIER MANUELLEMENT
import { Abi } from 'viem';

export const ${contractName.toLowerCase()}Abi = ${formatAbiForTs(abi)} as const satisfies Abi;

export const ${contractName.toLowerCase()}Bytecode = '${bytecode}' as \`0x\${string}\`;

// Vérification pour s'assurer que le bytecode n'est pas vide ou un simple placeholder
if (!${contractName.toLowerCase()}Bytecode || ${contractName.toLowerCase()}Bytecode.length < 50 || ${contractName.toLowerCase()}Bytecode === '0x') {
  console.warn(
    \`ATTENTION: Le bytecode pour ${contractName} semble être invalide ou un placeholder. \` +
    \`Veuillez vérifier la compilation et le script update-contract-artifacts.ts.\`
  );
}
`;
}

async function main() {
  console.log('🚀 Démarrage de la mise à jour des artefacts de contrat...');

  // 1. Compiler les contrats Hardhat
  try {
    console.log('📦 Compilation des contrats Hardhat...');
    // Exécuter depuis la racine du monorepo pour que yarn workspace fonctionne correctement
    execSync('yarn workspace @blockdeploy/smart-contracts compile', {
      stdio: 'inherit', // Afficher la sortie de la commande
      cwd: MONOREPO_ROOT, // Spécifier le répertoire de travail
    });
    console.log('✅ Contrats compilés avec succès.');
  } catch (error) {
    console.error('❌ Erreur lors de la compilation des contrats Hardhat :', error);
    process.exit(1);
  }

  // 2. S'assurer que le répertoire de destination pour les ABIs/bytecodes existe
  await fs.ensureDir(CORE_SDK_ABIS_PATH);

  // 3. Traiter chaque contrat
  for (const contractName of CONTRACTS_TO_UPDATE) {
    console.log(`\n🔍 Traitement du contrat : ${contractName}...`);
    const artifactPath = path.join(
      SMART_CONTRACTS_PACKAGE_PATH,
      'artifacts',
      'contracts',
      `${contractName}.sol`,
      `${contractName}.json`
    );

    try {
      // Lire le fichier d'artefact JSON
      const artifactJson = await fs.readJson(artifactPath);
      const abi = artifactJson.abi;
      const bytecode = artifactJson.bytecode;

      if (!abi || !bytecode) {
        console.error(`❌ ABI ou bytecode manquant pour ${contractName} dans ${artifactPath}`);
        continue; // Passer au contrat suivant
      }

      if (bytecode === '0x') {
          console.warn(`⚠️  Le bytecode pour ${contractName} est '0x'. Cela signifie souvent que le contrat est une interface ou une bibliothèque abstraite et ne peut pas être déployé directement. Vérifiez votre contrat.`);
      }

      // Générer le contenu du fichier .ts
      const tsContent = generateArtifactTsContent(contractName, abi, bytecode);

      // Écrire le fichier .ts dans core-sdk
      const tsFilePath = path.join(CORE_SDK_ABIS_PATH, `${contractName}.ts`);
      await fs.writeFile(tsFilePath, tsContent);
      console.log(`✅ Artefacts pour ${contractName} écrits dans : ${path.relative(MONOREPO_ROOT, tsFilePath)}`);

    } catch (error) {
      console.error(`❌ Erreur lors du traitement de ${contractName} depuis ${artifactPath}:`, error);
    }
  }

  // 4. (Optionnel) Mettre à jour le fichier d'index (index.ts) du core-sdk pour exporter ces nouveaux artefacts
  // Cette partie peut être plus complexe et nécessiter une analyse du fichier existant.
  // Pour l'instant, on suppose que l'utilisateur mettra à jour manuellement index.ts si nécessaire,
  // ou que les imports se font directement depuis `packages/core-sdk/src/contracts/abis/ContratName`.
  // Cependant, le script actuel génère des fichiers qui sont déjà dans le bon format pour être importés.
  // Il faut s'assurer que le `packages/core-sdk/src/index.ts` exporte bien ces fichiers.
  // Par exemple : export * from './contracts/abis/MinimalERC20';

  console.log('\n🎉 Mise à jour des artefacts de contrat terminée.');
  console.log('ℹ️  Veuillez vérifier les modifications et commiter les fichiers mis à jour dans `packages/core-sdk/src/contracts/abis/`.');
  console.log('ℹ️  Assurez-vous également que ces artefacts sont correctement exportés depuis `packages/core-sdk/src/index.ts` si nécessaire.');
}

main().catch((error) => {
  console.error('❌ Une erreur non gérée est survenue dans le script :', error);
  process.exit(1);
});
