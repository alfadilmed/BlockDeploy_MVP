'use client';

import React, { useState, useEffect } from 'react';
import { useBlockDeployWallet, useLaunchpadBuy, LaunchpadBuyArgs, useLaunchpadStatus } from '@blockdeploy/core-sdk';
import { ethers } from 'ethers'; // Pour parseUnits

interface BuyTokenWidgetProps {
  launchpadAddress: `0x${string}`;
  tokenSymbol?: string; // Pour l'affichage
  tokenDecimals?: number; // Pour convertir le montant à acheter
  pricePerTokenInWei?: bigint; // Prix d'un token entier en Wei
  isSaleActive?: boolean;
  remainingToSell?: bigint;
}

export default function BuyTokenWidget({
  launchpadAddress,
  tokenSymbol = 'Token',
  tokenDecimals = 18,
  pricePerTokenInWei,
  isSaleActive,
  remainingToSell
}: BuyTokenWidgetProps) {
  const { account } = useBlockDeployWallet();
  const {
    buyTokens,
    buyTxHash,
    isSendingBuyTx,
    buyError,
    isConfirmingBuy,
    isBuyConfirmed,
    confirmationBuyError,
    buyReceipt,
  } = useLaunchpadBuy();

  const [amountToBuy, setAmountToBuy] = useState<string>('100'); // Quantité de tokens entiers
  const [costInEth, setCostInEth] = useState<string>('0');
  const [formMessage, setFormMessage] = useState<{type: 'error' | 'success', text: string} | null>(null);

  // Recalculer le coût si le prix ou le montant change
  useEffect(() => {
    if (pricePerTokenInWei && amountToBuy) {
      try {
        const amount = BigInt(amountToBuy);
        if (amount > 0n) {
          const totalCostWei = amount * pricePerTokenInWei;
          setCostInEth(ethers.formatEther(totalCostWei));
        } else {
          setCostInEth('0');
        }
      } catch {
        setCostInEth('Erreur');
      }
    } else {
      setCostInEth('0');
    }
  }, [amountToBuy, pricePerTokenInWei]);

  // Gérer les messages d'erreur/succès du hook d'achat
  useEffect(() => {
    if (buyError) setFormMessage({ type: 'error', text: `Erreur d'achat: ${buyError.shortMessage || buyError.message}` });
    if (confirmationBuyError) setFormMessage({ type: 'error', text: `Erreur confirmation achat: ${confirmationBuyError.shortMessage || confirmationBuyError.message}` });
  }, [buyError, confirmationBuyError]);

  useEffect(() => {
    if (isBuyConfirmed && buyReceipt) {
      setFormMessage({ type: 'success', text: `Achat confirmé ! Tx: ${buyReceipt.transactionHash.substring(0,10)}...` });
      // Idéalement, rafraîchir le statut du launchpad ici
    }
  }, [isBuyConfirmed, buyReceipt]);


  const handleBuy = async () => {
    setFormMessage(null);
    if (!account.isConnected) {
      setFormMessage({ type: 'error', text: 'Connectez votre wallet pour acheter.' });
      return;
    }
    if (!pricePerTokenInWei || pricePerTokenInWei === 0n) {
      setFormMessage({ type: 'error', text: 'Prix du token non disponible ou invalide.' });
      return;
    }
    if (!isSaleActive) {
        setFormMessage({ type: 'error', text: 'La vente n\'est pas active.'});
        return;
    }

    try {
      const amountTokensBigInt = ethers.parseUnits(amountToBuy, tokenDecimals); // Convertir en unités avec décimales
      if (amountTokensBigInt <= 0n) {
        setFormMessage({ type: 'error', text: 'Veuillez entrer une quantité positive.' });
        return;
      }
      if (remainingToSell !== undefined && amountTokensBigInt > remainingToSell) {
        setFormMessage({ type: 'error', text: 'Quantité demandée supérieure aux tokens restants.' });
        return;
      }


      const args: LaunchpadBuyArgs = {
        launchpadAddress,
        tokenAmountToBuy: amountTokensBigInt,
      };
      // Le prix par token (pricePerTokenInWei) est utilisé par le hook pour calculer la value ETH
      await buyTokens(args, pricePerTokenInWei);
      setFormMessage({type: 'success', text: 'Transaction d\'achat envoyée... Veuillez vérifier votre portefeuille.'});

    } catch (err: any) {
      console.error("Erreur lors de la préparation de l'achat:", err);
      setFormMessage({ type: 'error', text: err.message || 'Erreur inattendue.' });
    }
  };

  const commonInputClass = "mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm text-gray-900 dark:text-white";
  const isLoading = isSendingBuyTx || isConfirmingBuy;

  if (!isSaleActive && !isLoading) { // Si la vente n'est pas active et qu'aucune transaction n'est en cours
    return <p className="text-center text-gray-600 dark:text-gray-400 py-4">La vente est terminée ou n'a pas encore commencé.</p>;
  }
  if (remainingToSell === 0n && isSaleActive) {
    return <p className="text-center text-green-600 dark:text-green-400 py-4">Tous les tokens ont été vendus !</p>;
  }


  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="amountToBuy" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Quantité de {tokenSymbol} à acheter
        </label>
        <input
          type="number"
          name="amountToBuy"
          id="amountToBuy"
          value={amountToBuy}
          onChange={(e) => { setAmountToBuy(e.target.value); setFormMessage(null); }}
          placeholder="Ex: 100"
          min="1" // Ou un minimum défini par le launchpad
          className={commonInputClass}
        />
      </div>
      <div className="p-3 bg-gray-100 dark:bg-gray-700/50 rounded-md text-sm">
        <p className="text-gray-600 dark:text-gray-300">
          Coût estimé : <span className="font-semibold text-gray-800 dark:text-white">{costInEth} ETH</span>
        </p>
        {remainingToSell !== undefined && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Tokens restants : {ethers.formatUnits(remainingToSell, tokenDecimals)} {tokenSymbol}</p>}
      </div>
      <button
        onClick={handleBuy}
        disabled={!account.isConnected || isLoading || !isSaleActive || remainingToSell === 0n || parseFloat(amountToBuy) <=0}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-60"
      >
        {isLoading ? (isSendingBuyTx ? 'Envoi au wallet...' : 'Confirmation achat...') : (account.isConnected ? `Acheter ${tokenSymbol}` : 'Connectez Wallet')}
      </button>

      {formMessage && (
        <div className={`mt-3 p-2 rounded-md text-xs border ${formMessage.type === 'error' ? 'bg-red-100 dark:bg-red-900/30 border-red-500 dark:border-red-700 text-red-700 dark:text-red-300' : 'bg-green-100 dark:bg-green-900/30 border-green-500 dark:border-green-700 text-green-700 dark:text-green-300'}`}>
          {formMessage.text}
        </div>
      )}
    </div>
  );
}
