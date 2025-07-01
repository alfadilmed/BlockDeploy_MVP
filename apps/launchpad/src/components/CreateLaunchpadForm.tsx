'use client';

import React, { useState, useEffect } from 'react';
import {
  useBlockDeployWallet,
  useCreateLaunchpad,
  CreateLaunchpadArgs,
  simpleLaunchpadBytecode // Pour la vérification du placeholder
} from '@blockdeploy/core-sdk';
import { ethers } from 'ethers'; // Pour parseUnits, formatUnits, et validation d'adresse

interface LaunchpadFormParams {
  tokenAddress: string;
  pricePerToken: string; // En ETH (ex: "0.001")
  amountToSell: string;  // En unités entières du token (ex: "100000")
  deadlineDate: string;  // Format YYYY-MM-DD
  deadlineTime: string;  // Format HH:MM
}

interface FormErrors {
  tokenAddress?: string;
  pricePerToken?: string;
  amountToSell?: string;
  deadline?: string; // Erreur combinée pour date/heure
  general?: string;
}

export default function CreateLaunchpadForm() {
  const { account, chain } = useBlockDeployWallet();
  const {
    createLaunchpad,
    deployTxHash,
    isDeploying,
    deployError,
    isConfirming,
    isConfirmed,
    confirmationError,
    contractAddress: newLaunchpadAddress,
  } = useCreateLaunchpad();

  const [formParams, setFormParams] = useState<LaunchpadFormParams>({
    tokenAddress: '',
    pricePerToken: '0.001',
    amountToSell: '100000',
    deadlineDate: '',
    deadlineTime: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [formMessage, setFormMessage] = useState<{type: 'error' | 'success', text: string} | null>(null);

  // Effets pour gérer les erreurs de déploiement/confirmation
  useEffect(() => {
    if (deployError) setFormMessage({ type: 'error', text: `Erreur déploiement: ${deployError.shortMessage || deployError.message}` });
    if (confirmationError) setFormMessage({ type: 'error', text: `Erreur confirmation: ${confirmationError.shortMessage || confirmationError.message}` });
  }, [deployError, confirmationError]);

  useEffect(() => {
    if (isConfirmed && newLaunchpadAddress) {
      setFormMessage({ type: 'success', text: `Launchpad déployé ! Adresse: ${newLaunchpadAddress}` });
      // TODO: Sauvegarder dans localStorage, rediriger ou afficher un lien vers la page du launchpad
    }
  }, [isConfirmed, newLaunchpadAddress]);

  const validateField = (name: keyof LaunchpadFormParams | 'deadline', value: string, allValues: LaunchpadFormParams): string | undefined => {
    switch (name) {
      case 'tokenAddress':
        if (!value.trim()) return 'L\'adresse du token est requise.';
        if (!ethers.isAddress(value.trim())) return 'Adresse de token invalide.';
        return undefined;
      case 'pricePerToken':
        if (!value.trim()) return 'Le prix par token est requis.';
        try {
          const price = ethers.parseUnits(value, 'ether'); // Convertit ETH en wei
          if (price <= 0n) return 'Le prix doit être positif.';
        } catch { return 'Format de prix invalide (ex: 0.001).'; }
        return undefined;
      case 'amountToSell':
        const amount = parseInt(value, 10);
        if (isNaN(amount) || amount <= 0) return 'La quantité à vendre doit être un nombre positif.';
        return undefined;
      case 'deadline': // Validation combinée pour date et heure
        if (!allValues.deadlineDate || !allValues.deadlineTime) return 'La date et l\'heure de fin sont requises.';
        const deadlineTimestamp = new Date(`${allValues.deadlineDate}T${allValues.deadlineTime}`).getTime();
        if (isNaN(deadlineTimestamp) || deadlineTimestamp <= Date.now()) return 'La deadline doit être dans le futur.';
        return undefined;
      default:
        return undefined;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target as { name: keyof LaunchpadFormParams, value: string };
    setFormParams(prev => ({ ...prev, [name]: value }));
    if (errors[name] || errors.general) { // Valider seulement si une erreur existait pour ce champ ou une erreur générale
        const fieldError = validateField(name, value, { ...formParams, [name]: value });
        setErrors(prev => ({ ...prev, [name]: fieldError, general: undefined }));
    }
    setFormMessage(null);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;
    (Object.keys(formParams) as Array<keyof LaunchpadFormParams>).forEach(key => {
      const error = validateField(key, formParams[key], formParams);
      if (error) { newErrors[key] = error; isValid = false; }
    });
    // Valider la deadline combinée
    const deadlineError = validateField('deadline', '', formParams);
    if (deadlineError) { newErrors.deadline = deadlineError; isValid = false; }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormMessage(null);
    setErrors({});

    if (!validateForm()) return;
    if (!account.isConnected || !account.address) {
      setFormMessage({ type: 'error', text: 'Connectez votre portefeuille pour créer un launchpad.' });
      return;
    }
    if (simpleLaunchpadBytecode.length < 1000) {
        setFormMessage({ type: 'error', text: 'Erreur config: Bytecode Launchpad invalide.'});
        return;
    }

    // Récupérer les décimales du token ERC20 à vendre
    let tokenDecimals: number;
    try {
        // Note: Utilisation directe de readContract ici pour simplicité,
        // car useBlockDeployContractRead est un hook.
        // Pour une meilleure gestion d'état, on pourrait avoir un champ pour les décimales
        // ou un hook qui récupère les décimales au changement de tokenAddress.
        const decimalsBigInt = await ethers.getDefaultProvider(chain?.rpcUrls.default.http[0]).call({
            to: formParams.tokenAddress,
            data: ethers.id("decimals()").substring(0, 10) // Sélecteur de la fonction decimals()
        });
        tokenDecimals = parseInt(ethers.AbiCoder.defaultAbiCoder().decode(["uint8"], decimalsBigInt)[0].toString(), 10);

        if (isNaN(tokenDecimals) || tokenDecimals < 0 || tokenDecimals > 18) { // Max 18 pour la plupart des tokens
            setFormMessage({ type: 'error', text: `Impossible de récupérer les décimales valides pour le token ${formParams.tokenAddress}.` });
            return;
        }
    } catch (err) {
        console.error("Erreur récupération décimales token:", err);
        setFormMessage({ type: 'error', text: `Erreur récupération décimales token: ${formParams.tokenAddress}. Vérifiez l'adresse.` });
        return;
    }

    try {
      const priceInWei = ethers.parseUnits(formParams.pricePerToken, 'ether');
      const amountToSellWithDecimals = ethers.parseUnits(formParams.amountToSell, tokenDecimals);
      const deadlineTimestamp = BigInt(Math.floor(new Date(`${formParams.deadlineDate}T${formParams.deadlineTime}`).getTime() / 1000));

      const args: CreateLaunchpadArgs = {
        tokenAddress: formParams.tokenAddress as `0x${string}`,
        pricePerToken: priceInWei,
        amountToSell: amountToSellWithDecimals,
        deadline: deadlineTimestamp,
        // initialOwner est géré par le hook useCreateLaunchpad via useBlockDeployWallet
      };

      setFormMessage({type: 'success', text: 'Préparation du déploiement du Launchpad... Veuillez vérifier votre portefeuille.'});
      await createLaunchpad(args);

    } catch (err: any) {
      console.error('Erreur soumission création Launchpad:', err);
      setFormMessage({ type: 'error', text: err.message || 'Erreur inattendue.' });
    }
  };

  const commonInputClass = "mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm text-gray-900 dark:text-white";
  const isLoading = isDeploying || isConfirming;

  // Min date pour le date picker (aujourd'hui)
  const today = new Date().toISOString().split('T')[0];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="tokenAddress" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Adresse du Token ERC-20 à vendre</label>
        <input type="text" name="tokenAddress" id="tokenAddress" value={formParams.tokenAddress} onChange={handleChange} placeholder="0x..." className={`${commonInputClass} ${errors.tokenAddress ? 'border-red-500' : ''}`} />
        {errors.tokenAddress && <p className="mt-1 text-xs text-red-500 dark:text-red-400">{errors.tokenAddress}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="pricePerToken" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Prix par Token (en ETH)</label>
          <input type="text" name="pricePerToken" id="pricePerToken" value={formParams.pricePerToken} onChange={handleChange} placeholder="Ex: 0.001" className={`${commonInputClass} ${errors.pricePerToken ? 'border-red-500' : ''}`} />
          {errors.pricePerToken && <p className="mt-1 text-xs text-red-500 dark:text-red-400">{errors.pricePerToken}</p>}
        </div>
        <div>
          <label htmlFor="amountToSell" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Quantité de Tokens à Vendre (unités entières)</label>
          <input type="number" name="amountToSell" id="amountToSell" value={formParams.amountToSell} onChange={handleChange} placeholder="Ex: 100000" min="1" className={`${commonInputClass} ${errors.amountToSell ? 'border-red-500' : ''}`} />
          {errors.amountToSell && <p className="mt-1 text-xs text-red-500 dark:text-red-400">{errors.amountToSell}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Deadline de la Vente</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-1">
          <div>
            <input type="date" name="deadlineDate" id="deadlineDate" value={formParams.deadlineDate} onChange={handleChange} min={today} className={`${commonInputClass} ${errors.deadline ? 'border-red-500' : ''}`} />
          </div>
          <div>
            <input type="time" name="deadlineTime" id="deadlineTime" value={formParams.deadlineTime} onChange={handleChange} className={`${commonInputClass} ${errors.deadline ? 'border-red-500' : ''}`} />
          </div>
        </div>
        {errors.deadline && <p className="mt-1 text-xs text-red-500 dark:text-red-400">{errors.deadline}</p>}
      </div>

      <button type="submit" disabled={!account.isConnected || isLoading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:opacity-60">
        {isLoading ? (isDeploying ? 'Envoi au wallet...' : 'Confirmation en cours...') : (account.isConnected ? 'Créer le Launchpad' : 'Connectez votre Wallet')}
      </button>

      {formMessage && (
        <div className={`mt-4 p-3 rounded-md border ${formMessage.type === 'error' ? 'bg-red-100 dark:bg-red-900/30 border-red-500 dark:border-red-700' : 'bg-green-100 dark:bg-green-900/30 border-green-500 dark:border-green-700'}`}>
          <p className={`text-sm ${formMessage.type === 'error' ? 'text-red-700 dark:text-red-300' : 'text-green-700 dark:text-green-300'}`}>
            {formMessage.text}
            {formMessage.type === 'success' && deployTxHash && !newLaunchpadAddress && (
              <span className="block mt-1 text-xs">Tx Hash: <code className="break-all">{deployTxHash}</code></span>
            )}
          </p>
        </div>
      )}
       {isConfirmed && newLaunchpadAddress && (
         <div className="mt-4 p-3 bg-green-100 dark:bg-green-900/30 border border-green-500 dark:border-green-700 rounded-md">
            <p className="text-sm text-green-700 dark:text-green-300">
                Launchpad déployé avec succès !
                <Link href={`/launchpad/${newLaunchpadAddress}`} className="font-semibold hover:underline ml-1">
                    Voir votre Launchpad ici.
                </Link>
            </p>
            <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                N'oubliez pas de transférer {formParams.amountToSell} tokens (avec {ethers.formatUnits(ethers.parseUnits(formParams.amountToSell,0),0)} décimales) à l'adresse du contrat Launchpad :
                <code className="ml-1 break-all bg-green-200 dark:bg-green-800 p-0.5 rounded">{newLaunchpadAddress}</code>
            </p>
         </div>
      )}
    </form>
  );
}
import Link from 'next/link'; // Ajout pour le lien vers le launchpad déployé
