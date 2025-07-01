'use client';

import React, { useState, useEffect } from 'react';
import { useBlockDeployWallet, useDeployToken, minimalERC20Abi, minimalERC20Bytecode, DeployTokenArgs } from '@blockdeploy/core-sdk';

interface TokenFormParams {
  name: string;
  symbol: string;
  initialSupply: string; // Garder en string pour le champ, convertir en BigInt plus tard
  decimals: string; // Idem
}

export default function CreateTokenForm() {
  const { account } = useBlockDeployWallet();
  const {
    deployToken,
    deployTxHash,
    isDeploying,
    deployError,
    isConfirming,
    isConfirmed,
    confirmationError,
    contractAddress, // Adresse du contrat une fois déployé
  } = useDeployToken();

  const [formParams, setFormParams] = useState<TokenFormParams>({
    name: '',
    symbol: '',
    initialSupply: '1000000',
    decimals: '18',
  });
  // État local pour gérer les messages d'erreur ou de succès globaux du formulaire
  const [formMessage, setFormMessage] = useState<{type: 'error' | 'success', text: string} | null>(null);

  useEffect(() => {
    if (deployError) {
      setFormMessage({ type: 'error', text: deployError.message || 'Erreur de déploiement.' });
    }
    if (confirmationError) {
        setFormMessage({ type: 'error', text: confirmationError.message || 'Erreur de confirmation de la transaction.' });
    }
  }, [deployError, confirmationError]);

  useEffect(() => {
    if (isConfirmed && contractAddress) {
      setFormMessage({ type: 'success', text: `Token déployé avec succès ! Adresse: ${contractAddress}`});
    }
  }, [isConfirmed, contractAddress]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormParams(prev => ({ ...prev, [name]: value }));
    setFormMessage(null); // Réinitialiser le message en cas de changement
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormMessage(null);

    if (!account.isConnected) {
      setFormMessage({ type: 'error', text: 'Veuillez connecter votre portefeuille pour déployer un token.' });
      return;
    }

    if (minimalERC20Bytecode.length < 200) { // Vérification du bytecode placeholder
        setFormMessage({ type: 'error', text: 'Erreur de configuration: Le bytecode du contrat est un placeholder invalide. Déploiement impossible.' });
        console.error("Tentative de déploiement avec un bytecode placeholder. Veuillez remplacer `minimalERC20Bytecode` dans le core-sdk.");
        return;
    }

    try {
      // Les décimales sont généralement fixées à 18 dans le contrat ERC20 standard d'OpenZeppelin.
      // La supply initiale doit donc être ajustée.
      const numDecimals = parseInt(formParams.decimals, 10);
      if (isNaN(numDecimals) || numDecimals < 0 || numDecimals > 18) { // Max 18 pour la plupart des tokens, mais techniquement uint8
        setFormMessage({ type: 'error', text: 'Nombre de décimales invalide (doit être entre 0 et 18).' });
        return;
      }
      const supply = BigInt(formParams.initialSupply) * BigInt(10 ** numDecimals);

      const deployArgs: DeployTokenArgs = {
        name: formParams.name,
        symbol: formParams.symbol,
        initialSupply: supply,
        contractAbi: minimalERC20Abi,
        contractBytecode: minimalERC20Bytecode,
      };

      await deployToken(deployArgs);
      // L'état (isDeploying, isConfirming, isConfirmed, contractAddress, errors) est géré par le hook useDeployToken
      // et les useEffect ci-dessus mettront à jour formMessage.

    } catch (err: any) {
      // Cette capture est un fallback, les erreurs du hook devraient être gérées par deployError/confirmationError
      console.error('Erreur inattendue lors de la soumission du déploiement:', err);
      setFormMessage({ type: 'error', text: err.message || 'Une erreur inattendue est survenue.' });
    }
  };

  const commonInputClass = "mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900 dark:text-white";
  const isLoading = isDeploying || isConfirming;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
        Configurer votre Token ERC-20
      </h2>
      {/* Champs du formulaire (inchangés pour la plupart) */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Nom du Token
        </label>
        <input type="text" name="name" id="name" value={formParams.name} onChange={handleChange} required placeholder="Ex: My Awesome Token" className={commonInputClass} />
      </div>
      <div>
        <label htmlFor="symbol" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Symbole du Token
        </label>
        <input type="text" name="symbol" id="symbol" value={formParams.symbol} onChange={handleChange} required placeholder="Ex: MAT" maxLength={11} className={commonInputClass} />
      </div>
      <div>
        <label htmlFor="initialSupply" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Supply Initiale (en unités entières, ex: 1000000 pour 1 million de tokens)
        </label>
        <input type="number" name="initialSupply" id="initialSupply" value={formParams.initialSupply} onChange={handleChange} required min="1" placeholder="Ex: 1000000" className={commonInputClass} />
      </div>
      <div>
        <label htmlFor="decimals" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Décimales
        </label>
        <input type="number" name="decimals" id="decimals" value={formParams.decimals} onChange={handleChange} required min="0" max="18" placeholder="Ex: 18" className={commonInputClass} />
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Standard: 18. Ce nombre définit la divisibilité de votre token.</p>
      </div>

      <div>
        <button
          type="submit"
          disabled={!account.isConnected || isLoading}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isLoading ? (isDeploying ? 'Envoi au wallet...' : 'Confirmation en cours...') : (account.isConnected ? 'Vérifier & Déployer Token' : 'Connectez votre Wallet pour Déployer')}
        </button>
      </div>

      {formMessage && (
        <div className={`mt-4 p-3 rounded-md border ${formMessage.type === 'error' ? 'bg-red-100 dark:bg-red-900/30 border-red-400 dark:border-red-700' : 'bg-green-100 dark:bg-green-900/30 border-green-400 dark:border-green-700'}`}>
          <p className={`text-sm ${formMessage.type === 'error' ? 'text-red-700 dark:text-red-300' : 'text-green-700 dark:text-green-300'}`}>
            {formMessage.text}
            {formMessage.type === 'success' && deployTxHash && !contractAddress && ( // Afficher le hash pendant la confirmation
              <span className="block mt-1 text-xs">Tx Hash: <code className="break-all">{deployTxHash}</code></span>
            )}
            {/* L'adresse du contrat sera affichée par DeployedTokenInfo */}
          </p>
        </div>
      )}

      {isConfirmed && contractAddress && (
        <DeployedTokenInfo contractAddress={contractAddress} />
      )}
    </form>
  );
}
import DeployedTokenInfo from './DeployedTokenInfo'; // Assurez-vous que le chemin est correct
