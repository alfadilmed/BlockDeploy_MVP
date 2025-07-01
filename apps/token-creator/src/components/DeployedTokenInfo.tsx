'use client';

import React from 'react';
import { useBlockDeployContractRead, minimalERC20Abi } from '@blockdeploy/core-sdk';
import { useAccount } from 'wagmi'; // Pour obtenir le chainId actuel

interface DeployedTokenInfoProps {
  contractAddress: `0x${string}`;
}

// Fonction utilitaire pour formater le totalSupply en fonction des décimales
const formatTotalSupply = (supply?: bigint, decimals?: number): string => {
  if (supply === undefined || decimals === undefined) return 'Chargement...';
  return (Number(supply) / (10 ** decimals)).toLocaleString(undefined, {maximumFractionDigits: decimals});
};

// Fonction utilitaire pour obtenir l'URL de l'explorateur
const getExplorerUrl = (chainId: number | undefined, address: string): string => {
    if (chainId === 1) return `https://etherscan.io/address/${address}`; // Mainnet
    if (chainId === 11155111) return `https://sepolia.etherscan.io/address/${address}`; // Sepolia
    // Ajoutez d'autres chaînes ici
    return `https://etherscan.io/address/${address}`; // Fallback générique Etherscan
}

export default function DeployedTokenInfo({ contractAddress }: DeployedTokenInfoProps) {
  const { chain } = useAccount(); // Pour obtenir le chainId pour le lien Etherscan

  const { data: name, isLoading: isLoadingName } = useBlockDeployContractRead({
    address: contractAddress,
    abi: minimalERC20Abi,
    functionName: 'name',
    enabled: !!contractAddress,
  });

  const { data: symbol, isLoading: isLoadingSymbol } = useBlockDeployContractRead({
    address: contractAddress,
    abi: minimalERC20Abi,
    functionName: 'symbol',
    enabled: !!contractAddress,
  });

  const { data: decimals, isLoading: isLoadingDecimals } = useBlockDeployContractRead({
    address: contractAddress,
    abi: minimalERC20Abi,
    functionName: 'decimals',
    enabled: !!contractAddress,
  });

  const { data: totalSupply, isLoading: isLoadingTotalSupply } = useBlockDeployContractRead({
    address: contractAddress,
    abi: minimalERC20Abi,
    functionName: 'totalSupply',
    enabled: !!contractAddress,
  });

  const explorerUrl = getExplorerUrl(chain?.id, contractAddress);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(contractAddress)
      .then(() => alert('Adresse copiée dans le presse-papiers !'))
      .catch(err => console.error('Erreur de copie : ', err));
  };

  return (
    <div className="mt-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700/30">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
        Détails de votre Token Déployé :
      </h3>
      <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
        <li><strong>Adresse du Contrat :</strong> <code className="break-all text-xs">{contractAddress}</code></li>
        <li><strong>Nom :</strong> {isLoadingName ? 'Chargement...' : String(name || 'N/A')}</li>
        <li><strong>Symbole :</strong> {isLoadingSymbol ? 'Chargement...' : String(symbol || 'N/A')}</li>
        <li><strong>Décimales :</strong> {isLoadingDecimals ? 'Chargement...' : String(decimals?.toString() || 'N/A')}</li>
        <li>
            <strong>Supply Totale :</strong> {isLoadingTotalSupply || isLoadingDecimals
                ? 'Chargement...'
                : formatTotalSupply(totalSupply as bigint | undefined, decimals as number | undefined)
            } {symbol as string || ''}
        </li>
      </ul>
      <div className="mt-4 flex space-x-3">
        <a
          href={explorerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Voir sur l'Explorateur
        </a>
        <button
          onClick={handleCopyToClipboard}
          className="px-4 py-2 text-xs font-medium text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
        >
          Copier l'Adresse
        </button>
      </div>
    </div>
  );
}
