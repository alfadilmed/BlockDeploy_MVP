'use client';

import React from 'react';
import { getExplorerUrl, shortenAddress as shortenAddrUtil } from '@/lib/utils'; // Importer depuis les utilitaires

export interface DeployedTokenHistoryItem {
  address: `0x${string}`;
  name: string;
  symbol: string;
  chainId: number;
  deployer: string; // Pourrait être utile
  timestamp: string;
}

interface DeployedTokensListProps {
  tokens: DeployedTokenHistoryItem[];
}

// const shortenAddress = (address: string | undefined, chars = 6): string => { // Supprimé, utilise shortenAddrUtil
//     if (!address) return '';
//     return `${address.substring(0, chars + 2)}...${address.substring(address.length - chars)}`;
// };

export default function DeployedTokensList({ tokens }: DeployedTokensListProps) {
  if (!tokens || tokens.length === 0) {
    return (
      <div className="mt-10 text-center">
        <p className="text-gray-600 dark:text-gray-400">Vous n'avez pas encore déployé de tokens via ce navigateur.</p>
      </div>
    );
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
        Vos Tokens Déployés Récemment
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 shadow-md rounded-lg">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Nom</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Symbole</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Adresse</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Chaîne ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {tokens.sort((a,b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).map((token) => ( // Trier par date de déploiement desc
              <tr key={`${token.address}-${token.chainId}`} className="hover:bg-gray-50 dark:hover:bg-gray-700/50"> {/* Clé unique améliorée */}
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{token.name}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{token.symbol}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                  <code className="text-xs">{shortenAddrUtil(token.address)}</code> {/* Utilisation de shortenAddrUtil */}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{token.chainId}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                  {new Date(token.timestamp).toLocaleDateString()} {new Date(token.timestamp).toLocaleTimeString()}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">
                  <a
                    href={getExplorerUrl(token.chainId, token.address, 'address')} {/* Spécifier le type 'address' */}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-900 dark:text-sky-400 dark:hover:text-sky-300"
                  >
                    Explorateur
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
