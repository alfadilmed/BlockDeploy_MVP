import { Abi } from 'viem';

// ABI pour un contrat ERC-20 standard minimaliste
// Inclut le constructeur et les fonctions de base ERC20
export const minimalERC20Abi = [
  {
    "inputs": [
      { "internalType": "string", "name": "name_", "type": "string" },
      { "internalType": "string", "name": "symbol_", "type": "string" },
      { "internalType": "uint256", "name": "initialSupply_", "type": "uint256" }
      // Les décimales sont souvent fixées à 18 dans le contrat lui-même pour les ERC20 OpenZeppelin
      // Si les décimales étaient un paramètre du constructeur, il faudrait l'ajouter ici.
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "owner", "type": "address" },
      { "indexed": true, "internalType": "address", "name": "spender", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "from", "type": "address" },
      { "indexed": true, "internalType": "address", "name": "to", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "owner", "type": "address" },
      { "internalType": "address", "name": "spender", "type": "address" }
    ],
    "name": "allowance",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "spender", "type": "address" },
      { "internalType": "uint256", "name": "amount", "type": "uint256" }
    ],
    "name": "approve",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "account", "type": "address" }],
    "name": "balanceOf",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "to", "type": "address" },
      { "internalType": "uint256", "name": "amount", "type": "uint256" }
    ],
    "name": "transfer",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "from", "type": "address" },
      { "internalType": "address", "name": "to", "type": "address" },
      { "internalType": "uint256", "name": "amount", "type": "uint256" }
    ],
    "name": "transferFrom",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const satisfies Abi; // `as const` est important pour l'inférence de type stricte avec wagmi/viem


/**
 * Bytecode d'un contrat ERC-20 minimaliste simple.
 * ATTENTION : Ceci est un bytecode d'EXEMPLE et NE DOIT PAS être utilisé en production.
 * Il correspond à un contrat ERC20 basique qui prend (string name, string symbol, uint256 initialSupply)
 * dans son constructeur et a 18 décimales par défaut.
 * Remplacez-le par le bytecode de votre contrat ERC-20 compilé et audité.
 */
export const minimalERC20Bytecode =
  '0x608060405234801561001057600080fd5b50604051610b9f380380610b9f8339818101604052602081101561003357600080fd5b8101908080519060200190929190505050600080546001600160a01b0319166001600160a01b03169091046040516100739291906106f6565b60405180910390f35b600080546001600160a01b0319166001600160a01b03169091046040516100aa929190610864565b60405180910390f35b60005481565b60006100c06100bb846103d8565b610378565b905060005b838110156100e857600080fd5b505afa5050600080546001600160a01b0319166001600160a01b03169091046040516101199291906108b2565b60405180910390f35b600080546001600160a01b0319166001600160a01b03169091046040516101509291906108f5565b60405180910390f3
  // Le bytecode réel est beaucoup plus long. Ceci est juste un début pour illustration.
  // Un bytecode complet pour un ERC20 simple d'OpenZeppelin est de l'ordre de 2-3 Ko.
  // Pour un exemple plus réaliste, compilez le contrat Solidity fourni dans les commentaires précédents.
  // Par exemple, le constructeur seul avec les arguments string, string, uint256 peut ressembler à quelque chose comme:
  // ... (partie du bytecode qui décode les arguments du constructeur) ...
  // 60008080600035546001600160a01b0316600035546001600160a01b03166101d557... (suite)
  // Pour l'instant, je vais mettre un bytecode très court et invalide pour souligner que c'est un placeholder.
  + '00'; // Placeholder, rendant le bytecode ci-dessus invalide mais court.

if (minimalERC20Bytecode.length < 200) {
  console.warn(
    'ATTENTION: Le `minimalERC20Bytecode` dans `core-sdk` est un placeholder invalide et trop court. ' +
    'Il doit être remplacé par le bytecode réel d\'un contrat ERC-20 compilé pour que le déploiement fonctionne.'
  );
}
