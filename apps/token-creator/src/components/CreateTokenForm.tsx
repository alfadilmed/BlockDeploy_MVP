'use client';

import React, { useState, useEffect } from 'react';
import { useBlockDeployWallet, useDeployToken, minimalERC20Abi, minimalERC20Bytecode, DeployTokenArgs } from '@blockdeploy/core-sdk';

interface TokenFormParams {
  name: string;
  symbol: string;
  initialSupply: string;
  decimals: string;
}

interface FormErrors {
  name?: string;
  symbol?: string;
  initialSupply?: string;
  decimals?: string;
  general?: string; // Pour les erreurs non liées à un champ spécifique
}

export default function CreateTokenForm() {
  const { account, chain } = useBlockDeployWallet(); // Ajout de chain pour le constructeur
  const {
    deployToken,
    deployTxHash,
    isDeploying,
    deployError,
    isConfirming,
    isConfirmed,
    confirmationError,
    contractAddress,
  } = useDeployToken();

  const [formParams, setFormParams] = useState<TokenFormParams>({
    name: '',
    symbol: '',
    initialSupply: '1000000',
    decimals: '18',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [formMessage, setFormMessage] = useState<{type: 'error' | 'success', text: string} | null>(null);

  useEffect(() => {
    if (deployError) {
      setFormMessage({ type: 'error', text: `Erreur de déploiement: ${deployError.shortMessage || deployError.message}` });
    }
    if (confirmationError) {
        setFormMessage({ type: 'error', text: `Erreur de confirmation: ${confirmationError.shortMessage || confirmationError.message}` });
    }
  }, [deployError, confirmationError]);

  useEffect(() => {
    if (isConfirmed && contractAddress && account.address && chain?.id) {
      setFormMessage({ type: 'success', text: `Token déployé avec succès ! Adresse: ${contractAddress}`});

      // Sauvegarde dans localStorage
      const newDeployedToken = {
        address: contractAddress,
        name: formParams.name.trim(),
        symbol: formParams.symbol.trim().toUpperCase(),
        chainId: chain.id,
        deployer: account.address,
        timestamp: new Date().toISOString(),
      };
      try {
        const existingTokens = JSON.parse(localStorage.getItem('deployedTokens') || '[]');
        // Éviter les doublons si l'utilisateur rafraîchit juste après le succès
        if (!existingTokens.find((t:any) => t.address === newDeployedToken.address && t.chainId === newDeployedToken.chainId)) {
          existingTokens.push(newDeployedToken);
          localStorage.setItem('deployedTokens', JSON.stringify(existingTokens));
          // Optionnel: déclencher un événement ou un callback pour mettre à jour une liste globale si elle n'est pas gérée par ce composant.
          // Pour l'instant, on suppose que la page lira localStorage au montage.
        }
      } catch (e) {
        console.error("Erreur lors de la sauvegarde dans localStorage:", e);
      }

      // Optionnel: réinitialiser le formulaire ou certaines parties
      // setFormParams({ name: '', symbol: '', initialSupply: '1000000', decimals: '18' });
    }
  }, [isConfirmed, contractAddress, account.address, chain?.id, formParams.name, formParams.symbol]); // Ajout des dépendances

  const validateField = (name: keyof TokenFormParams, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Le nom du token est requis.';
        if (value.length > 50) return 'Le nom du token ne doit pas dépasser 50 caractères.';
        return undefined;
      case 'symbol':
        if (!value.trim()) return 'Le symbole du token est requis.';
        if (!/^[a-zA-Z0-9]+$/.test(value)) return 'Le symbole ne doit contenir que des caractères alphanumériques.';
        if (value.length > 11) return 'Le symbole ne doit pas dépasser 11 caractères.';
        return undefined;
      case 'initialSupply':
        const supply = parseInt(value, 10);
        if (isNaN(supply) || supply <= 0) return 'La supply initiale doit être un nombre positif.';
        return undefined;
      case 'decimals':
        const dec = parseInt(value, 10);
        if (isNaN(dec) || dec < 0 || dec > 18) return 'Les décimales doivent être un nombre entre 0 et 18.';
        return undefined;
      default:
        return undefined;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as { name: keyof TokenFormParams, value: string };
    setFormParams(prev => ({ ...prev, [name]: value }));
    // Valider le champ modifié et mettre à jour les erreurs
    const fieldError = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: fieldError, general: undefined })); // Effacer l'erreur générale aussi
    setFormMessage(null);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;
    (Object.keys(formParams) as Array<keyof TokenFormParams>).forEach(key => {
      const error = validateField(key, formParams[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormMessage(null);
    setErrors({});

    if (!validateForm()) {
      return;
    }

    if (!account.isConnected || !account.address) {
      setFormMessage({ type: 'error', text: 'Veuillez connecter votre portefeuille pour déployer un token.' });
      return;
    }

    // La vérification du bytecode placeholder est bonne, on la garde.
    if (minimalERC20Bytecode.length < 1000) {
        setFormMessage({ type: 'error', text: 'Erreur de configuration: Le bytecode du contrat est un placeholder invalide. Déploiement impossible.' });
        console.error("Tentative de déploiement avec un bytecode placeholder. Veuillez remplacer `minimalERC20Bytecode` dans le core-sdk.");
        return;
    }

    try {
      const numDecimals = parseInt(formParams.decimals, 10); // Validation déjà faite dans validateForm
      const supplyWithDecimals = BigInt(formParams.initialSupply) * BigInt(10 ** numDecimals);

      const deployArgs: DeployTokenArgs = {
        name: formParams.name.trim(),
        symbol: formParams.symbol.trim().toUpperCase(), // Souvent en majuscules
        initialSupply: supplyWithDecimals,
        // Le contrat MinimalERC20.sol prend initialOwner_ comme 4ème argument
        // On va passer l'adresse du compte connecté comme initialOwner.
        // Il faudra ajuster l'ABI et l'appel à `writeContractAsync` dans `useDeployToken` si ce n'est pas déjà le cas.
        // Pour l'instant, `useDeployToken` passe [args.name, args.symbol, args.initialSupply]
        // Je vais modifier `useDeployToken` pour inclure `initialOwner_`
        // et ici on va le passer.
        initialOwner: account.address, // Ajouté pour correspondre au contrat
        contractAbi: minimalERC20Abi,
        contractBytecode: minimalERC20Bytecode,
      };

      setFormMessage({type: 'success', text: 'Préparation du déploiement...Veuillez vérifier votre portefeuille.'});
      await deployToken(deployArgs);

    } catch (err: any) {
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
        <input type="text" name="name" id="name" value={formParams.name} onChange={handleChange} required placeholder="Ex: My Awesome Token" className={`${commonInputClass} ${errors.name ? 'border-red-500' : ''}`} />
        {errors.name && <p className="mt-1 text-xs text-red-500 dark:text-red-400">{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="symbol" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Symbole du Token
        </label>
        <input type="text" name="symbol" id="symbol" value={formParams.symbol} onChange={handleChange} required placeholder="Ex: MAT" maxLength={11} className={`${commonInputClass} ${errors.symbol ? 'border-red-500' : ''}`} />
        {errors.symbol && <p className="mt-1 text-xs text-red-500 dark:text-red-400">{errors.symbol}</p>}
      </div>
      <div>
        <label htmlFor="initialSupply" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Supply Initiale (en unités entières, ex: 1000000 pour 1 million de tokens)
        </label>
        <input type="number" name="initialSupply" id="initialSupply" value={formParams.initialSupply} onChange={handleChange} required min="1" placeholder="Ex: 1000000" className={`${commonInputClass} ${errors.initialSupply ? 'border-red-500' : ''}`} />
        {errors.initialSupply && <p className="mt-1 text-xs text-red-500 dark:text-red-400">{errors.initialSupply}</p>}
      </div>
      <div>
        <label htmlFor="decimals" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Décimales
        </label>
        <input type="number" name="decimals" id="decimals" value={formParams.decimals} onChange={handleChange} required min="0" max="18" placeholder="Ex: 18" className={`${commonInputClass} ${errors.decimals ? 'border-red-500' : ''}`} />
        {errors.decimals && <p className="mt-1 text-xs text-red-500 dark:text-red-400">{errors.decimals}</p>}
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
