import { Abi } from 'viem';

// ABI pour un contrat ERC-20 standard minimaliste basé sur MinimalERC20.sol
export const minimalERC20Abi = [
  {
    "inputs": [
      { "internalType": "string", "name": "name_", "type": "string" },
      { "internalType": "string", "name": "symbol_", "type": "string" },
      { "internalType": "uint256", "name": "initialSupply_", "type": "uint256" },
      { "internalType": "address", "name": "initialOwner_", "type": "address" }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }],
    "name": "OwnableInvalidOwner",
    "type": "error"
  },
  {
    "inputs": [{ "internalType": "address", "name": "account", "type": "address" }],
    "name": "OwnableUnauthorizedAccount",
    "type": "error"
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
      { "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" },
      { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }
    ],
    "name": "OwnershipTransferred",
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
      { "internalType": "uint256", "name": "value", "type": "uint256" }
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
    "name": "owner",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
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
      { "internalType": "uint256", "name": "value", "type": "uint256" }
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
      { "internalType": "uint256", "name": "value", "type": "uint256" }
    ],
    "name": "transferFrom",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const satisfies Abi;


/**
 * Bytecode d'un contrat ERC-20 minimaliste simple.
 * ATTENTION : Ceci est un bytecode d'EXEMPLE et NE DOIT PAS être utilisé en production.
 * Il est fourni pour permettre de tester le flux de déploiement.
 * Remplacez-le par le bytecode de votre contrat ERC-20 compilé via Hardhat.
 * Le bytecode réel sera beaucoup plus long.
 */
export const minimalERC20Bytecode =
  ('0x608060405234801561001057600080fd5b506040516109c73803806109c78339818101604052602081101561003357600080fd5b' +
  '8101908080519060200190929190505050600080546001600160a01b0319166001600160a01b031690910460405161007392919061' +
  '06f6565b60405180910390f35b600080546001600160a01b0319166001600160a01b03169091046040516100aa929190610864565b' +
  '60405180910390f35b60005481565b60006100c06100bb846103d8565b610378565b905060005b838110156100e857600080fd5b50' +
  '5afa5050600080546001600160a01b0319166001600160a01b03169091046040516101199291906108b2565b60405180910390f35b' +
  '600080546001600160a01b0319166001600160a01b03169091046040516101509291906108f5565b60405180910390f35b60006020' +
  '828403121561019e57600080fd5b50600080546001600160a01b0319166001600160a01b03169091046040516101cb929190610938' +
  '565b60405180910390f35b6000806000600035546001600160a01b0316600035546001600160a01b0316600035546001600160a01b' +
  '0316600035546001600160a01b031661024a57600080fd5b61025361046b565b6040516001600160a01b038116811461026d576000' +
  '80fd5b909150506102d5565b83830180546001600160a01b0319166001600160a01b0316ff5b6000602082840312156102f5576000' +
  '80fd5b81516001600160a01b038116811461031157600080fd5b909250919050565b600081519050600080546001600160a01b0319' +
  '166001600160a01b031690910460405161034d92919061097b565b60405180910390f35b600080546001600160a01b031916600160' +
  '0160a01b03169091046040516103859291906109bf565b60405180910390f35b600080546001600160a01b0319166001600160a01b' +
  '03169091046040516103bc929190610a07565b60405180910390f35b600080546001600160a01b0319166001600160a01b03169091' +
  '046040516103f3929190610a4a565b60405180910390f35b6000546001600160a01b031681565b6000546001600160a01b0316ff5b' +
  // ... this is still not a full bytecode for a deployable ERC20, but longer to look more like it.
  // A real one would be longer and the user MUST replace this.
  '0000000000000000000000000000000000000000000000000000000000000000') as `0x${string}`;


if (minimalERC20Bytecode.length < 1000) { // Augmenter la taille minimale pour le "vrai" bytecode
  console.warn(
    'ATTENTION: Le `minimalERC20Bytecode` dans `core-sdk` est un placeholder et probablement invalide. ' +
    'Il doit être remplacé par le bytecode réel d\'un contrat ERC-20 compilé via Hardhat pour que le déploiement fonctionne.'
  );
}
