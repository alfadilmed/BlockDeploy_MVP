'use client';

import React from 'react';
import { useBlockDeployContractRead, minimalERC20Abi } from '@blockdeploy/core-sdk';
import { useAccount } from 'wagmi';
import { getExplorerUrl, shortenAddress } from '@/lib/utils'; // Import corrigé

interface DeployedTokenInfoProps {
  contractAddress: `0x${string}`;
}

// Fonction utilitaire pour formater le totalSupply en fonction des décimales
const formatTotalSupply = (supply?: bigint, decimals?: number): string => {
  if (supply === undefined || decimals === undefined) return 'Chargement...';
  // Gérer le cas où decimals pourrait être 0 pour éviter la division par 10**0 = 1 de manière incorrecte si l'intention est de ne pas diviser.
  // Cependant, pour un token, decimals() retourne le nombre de décimales, donc 10**decimals est correct.
  return (Number(supply) / (10 ** decimals)).toLocaleString(undefined, {maximumFractionDigits: decimals});
};

export default function DeployedTokenInfo({ contractAddress }: DeployedTokenInfoProps) {
  const { chain } = useAccount();

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
  const displayAddress = shortenAddress(contractAddress, 8); // Afficher un peu plus de caractères pour l'adresse du contrat

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(contractAddress)
      .then(() => {
        // Idéalement, utiliser un système de notification/toast ici au lieu d'alert()
        alert('Adresse du contrat copiée dans le presse-papiers !');
      })
      .catch(err => console.error('Erreur de copie : ', err));
  };

  return (
    <div className="mt-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700/30">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
        Détails de votre Token Déployé :
      </h3>
      <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
        <li>
          <strong>Adresse du Contrat :</strong>
          <code className="ml-1 break-all text-xs bg-gray-100 dark:bg-gray-600 p-1 rounded">{displayAddress}</code>
        </li>
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
      <div className="mt-4 flex flex-wrap gap-2">
        <a
          href={explorerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Voir sur l'Explorateur
        </a>
        <button
          onClick={handleCopyToClipboard}
          className="px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
        >
          Copier l'Adresse
        </button>
      </div>
    </div>
  );
}
