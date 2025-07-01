import { Abi } from 'viem';

export const simpleLaunchpadAbi = [
  {
    "inputs": [
      { "internalType": "address", "name": "tokenAddress_", "type": "address" },
      { "internalType": "uint256", "name": "pricePerToken_", "type": "uint256" },
      { "internalType": "uint256", "name": "amountToSell_", "type": "uint256" },
      { "internalType": "uint256", "name": "deadline_", "type": "uint256" },
      { "internalType": "address", "name": "initialOwner_", "type": "address" }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  { "inputs": [], "name": "AmountExceedsSaleSupply", "type": "error" },
  { "inputs": [], "name": "NoFundsToWithdraw", "type": "error" },
  { "inputs": [], "name": "NoUnsoldTokensToWithdraw", "type": "error" },
  { "inputs": [], "name": "NotEnoughETHSent", "type": "error" },
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
  { "inputs": [], "name": "SaleEnded", "type": "error" },
  { "inputs": [], "name": "SaleNotActive", "type": "error" },
  { "inputs": [], "name": "TransferFailed", "type": "error" },
  { "inputs": [], "name": "WithdrawalFailed", "type": "error" },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "owner", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "amountETH", "type": "uint256" }
    ],
    "name": "FundsWithdrawn",
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
      { "indexed": true, "internalType": "address", "name": "buyer", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "amountTokens", "type": "uint256" },
      { "indexed": false, "internalType": "uint256", "name": "amountETH", "type": "uint256" }
    ],
    "name": "TokensPurchased",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "owner", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "amountTokens", "type": "uint256" }
    ],
    "name": "UnsoldTokensWithdrawn",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "amountToSell",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "tokenAmountToBuy", "type": "uint256" }],
    "name": "buy",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "name": "contributions",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "deadline",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getRemainingTokens",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
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
    "name": "price",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "raisedAmount",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
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
    "name": "token",
    "outputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSold",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "withdrawFunds",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "withdrawUnsoldTokens",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  { "stateMutability": "payable", "type": "receive" }
] as const satisfies Abi;

/**
 * Bytecode du contrat SimpleLaunchpad.
 * ATTENTION : Ceci est un bytecode d'EXEMPLE et NE DOIT PAS être utilisé en production.
 * Il est fourni pour permettre de tester le flux de déploiement.
 * Remplacez-le par le bytecode de votre contrat SimpleLaunchpad.sol compilé via Hardhat.
 */
export const simpleLaunchpadBytecode =
  ('0x608060405234801561001057600080fd5b50604051611abc380380611abc8339818101604052602081101561003357600080fd5b' +
  // ... (structure de bytecode plus longue et complexe pour un contrat de cette taille)
  // Ce placeholder est volontairement différent de celui de l'ERC20 pour montrer qu'il est spécifique.
  '60008080600035546001600160a01b0316600035546001600160a01b0316600035546001600160a01b0316600035546001600160a01b031661024a57600080fd5b61025361046b565b6040516001600160a01b038116811461026d57600080fd5b909150506102d5565b83830180546001600160a01b0319166001600160a01b0316ff5b6000602082840312156102f557600080fd5b81516001600160a01b038116811461031157600080fd5b909250919050565b600081519050600080546001600160a01b0319166001600160a01b031690910460405161034d92919061097b565b60405180910390f35b600080546001600160a01b0319166001600160a01b03169091046040516103859291906109bf565b60405180910390f35b600080546001600160a01b0319166001600160a01b03169091046040516103bc929190610a07565b60405180910390f35b600080546001600160a01b0319166001600160a01b03169091046040516103f3929190610a4a565b60405180910390f35b6000546001600160a01b031681565b6000546001600160a01b0316ff5b' +
  '0000000000000000000000000000000000000000000000000000000000000000' + // Padding pour le rendre plus long
  '112233445566778899aabbccddeeff00112233445566778899aabbccddeeff00') as `0x${string}`;

if (simpleLaunchpadBytecode.length < 2000) { // Un contrat Launchpad sera plus gros
  console.warn(
    'ATTENTION: Le `simpleLaunchpadBytecode` dans `core-sdk` est un placeholder et probablement invalide. ' +
    'Il doit être remplacé par le bytecode réel du contrat `SimpleLaunchpad.sol` compilé via Hardhat.'
  );
}
