'use client';

import { useLaunchpadStatus, useBlockDeployWallet } from '@blockdeploy/core-sdk';
import BuyTokenWidget from '@/components/BuyTokenWidget';
import { ethers } from 'ethers'; // Pour formatUnits
import { useEffect, useState } from 'react';
import { getExplorerUrl, shortenAddress } from '@/lib/utils'; // Assurez-vous que ce chemin est correct

interface LaunchpadDetailPageProps {
  params: { id: string };
}

const ProgressBar = ({ value, max }: { value: bigint; max: bigint }) => {
  const percentage = max > 0n ? Number((value * 10000n / max)) / 100 : 0; // x10000 puis /100 pour 2 décimales
  return (
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
      <div
        className="bg-sky-500 h-2.5 rounded-full"
        style={{ width: `${Math.min(percentage, 100)}%` }} // Assurer que ça ne dépasse pas 100% visuellement
      ></div>
    </div>
  );
};

const CountdownTimer = ({ deadlineTimestamp }: { deadlineTimestamp: bigint }) => {
  const calculateTimeLeft = () => {
    const difference = Number(deadlineTimestamp) * 1000 - new Date().getTime();
    let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  }); // Pas de tableau de dépendances pour se réexécuter à chaque seconde

  const timerComponents = Object.entries(timeLeft).map(([interval, value]) => (
    <span key={interval} className="text-lg font-semibold">{value}{interval.charAt(0)} </span>
  ));

  return (
    <span>
      {timeLeft.days > 0 || timeLeft.hours > 0 || timeLeft.minutes > 0 || timeLeft.seconds > 0
        ? timerComponents
        : 'Vente terminée !'}
    </span>
  );
};


export default function LaunchpadDetailPage({ params }: LaunchpadDetailPageProps) {
  const launchpadId = params.id as `0x${string}`;
  const { account } = useBlockDeployWallet();
  const { isLoading: isLoadingStatus, status } = useLaunchpadStatus(launchpadId);

  const {
    executeWithdrawFunds,
    isWithdrawingFunds,
    isConfirmingWithdrawFunds,
    withdrawFundsError,
    withdrawFundsTxHash,
    isWithdrawFundsConfirmed,
    executeWithdrawUnsoldTokens,
    isWithdrawingTokens,
    isConfirmingWithdrawTokens,
    withdrawTokensError,
    withdrawTokensTxHash,
    isWithdrawTokensConfirmed,
  } = useLaunchpadOwnerActions();

  const [ownerActionMessage, setOwnerActionMessage] = useState<{type: 'error' | 'success', text: string} | null>(null);

  // Gérer les messages pour les actions propriétaire
  useEffect(() => {
    if (withdrawFundsError) setOwnerActionMessage({ type: 'error', text: `Erreur retrait fonds: ${withdrawFundsError.shortMessage || withdrawFundsError.message}` });
    if (withdrawTokensError) setOwnerActionMessage({ type: 'error', text: `Erreur retrait tokens: ${withdrawTokensError.shortMessage || withdrawTokensError.message}` });
  }, [withdrawFundsError, withdrawTokensError]);

  useEffect(() => {
    if (isWithdrawFundsConfirmed) {
        setOwnerActionMessage({ type: 'success', text: `Fonds retirés avec succès ! Tx: ${withdrawFundsTxHash}`});
        // Idéalement, rafraîchir le statut du launchpad ici
    }
  }, [isWithdrawFundsConfirmed, withdrawFundsTxHash]);

  useEffect(() => {
    if (isWithdrawTokensConfirmed) {
        setOwnerActionMessage({ type: 'success', text: `Tokens invendus retirés ! Tx: ${withdrawTokensTxHash}`});
        // Idéalement, rafraîchir le statut du launchpad ici
    }
  }, [isWithdrawTokensConfirmed, withdrawTokensTxHash]);


  if (isLoadingStatus && !status.tokenAddress) {
    return <div className="text-center py-10">Chargement des détails du Launchpad...</div>;
  }

  if (!isLoadingStatus && !status.tokenAddress && launchpadId) {
    return <div className="text-center py-10 text-red-500">Impossible de charger les informations pour le Launchpad: {shortenAddress(launchpadId)}. Vérifiez l'adresse.</div>;
  }

  const tokenDecimals = status.tokenDecimals ?? 18;

  const handleWithdrawFunds = async () => {
    setOwnerActionMessage(null);
    await executeWithdrawFunds({ launchpadAddress: launchpadId });
  };

  const handleWithdrawUnsoldTokens = async () => {
    setOwnerActionMessage(null);
    await executeWithdrawUnsoldTokens({ launchpadAddress: launchpadId });
  };

  const isLoadingOwnerAction = isWithdrawingFunds || isConfirmingWithdrawFunds || isWithdrawingTokens || isConfirmingWithdrawTokens;

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          Launchpad : {status.tokenSymbol ? `${status.tokenSymbol} Sale` : shortenAddress(launchpadId)}
        </h1>
        <a
            href={getExplorerUrl(account.chainId, launchpadId)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 text-xs text-gray-500 dark:text-gray-400 hover:underline"
        >
          Contrat : <code className="break-all">{launchpadId}</code>
        </a>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Colonne Infos */}
        <div className="md:col-span-2 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white border-b pb-2 dark:border-gray-700">
            Statut de la Vente
          </h2>

          <div><strong>Token à vendre :</strong> {status.tokenSymbol || 'N/A'} (<a href={getExplorerUrl(account.chainId, status.tokenAddress || '')} target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:underline">{shortenAddress(status.tokenAddress)}</a>)</div>
          <div><strong>Prix :</strong> {status.pricePerToken ? `${ethers.formatEther(status.pricePerToken)} ETH par ${status.tokenSymbol || 'Token'}` : 'N/A'}</div>
          <div><strong>Deadline :</strong> {status.deadlineTimestamp ? <CountdownTimer deadlineTimestamp={status.deadlineTimestamp} /> : 'N/A'}</div>

          <div className="my-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Progression</span>
              <span>
                {status.totalSold !== undefined ? ethers.formatUnits(status.totalSold, tokenDecimals) : '0'} /
                {status.amountToSell !== undefined ? ethers.formatUnits(status.amountToSell, tokenDecimals) : '0'} {status.tokenSymbol || ''}
              </span>
            </div>
            {status.totalSold !== undefined && status.amountToSell !== undefined && status.amountToSell > 0n && (
              <ProgressBar value={status.totalSold} max={status.amountToSell} />
            )}
          </div>

          <div><strong>Total ETH Récoltés :</strong> {status.raisedAmountInWei ? `${ethers.formatEther(status.raisedAmountInWei)} ETH` : '0 ETH'}</div>
          <div><strong>Propriétaire :</strong> <a href={getExplorerUrl(account.chainId, status.ownerAddress || '')} target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:underline">{shortenAddress(status.ownerAddress)}</a></div>
          <div><strong>Vente Active :</strong> {status.isSaleActive ? <span className="text-green-500">Oui</span> : <span className="text-red-500">Non</span>}</div>
        </div>

        {/* Colonne Achat */}
        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Participer
          </h2>
          <BuyTokenWidget
            launchpadAddress={launchpadId}
            tokenSymbol={status.tokenSymbol}
            tokenDecimals={tokenDecimals}
            pricePerTokenInWei={status.pricePerToken}
            isSaleActive={status.isSaleActive}
            remainingToSell={status.remainingToSell}
          />
        </div>
      </div>

      {account.isConnected && account.address === status.ownerAddress && !status.isSaleActive && (
        <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Actions Propriétaire</h2>
            <div className="flex flex-col sm:flex-row gap-4">
                <button
                    onClick={handleWithdrawFunds}
                    disabled={isLoadingOwnerAction || status.raisedAmountInWei === 0n || status.raisedAmountInWei === undefined}
                    className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 flex-1"
                >
                    {isWithdrawingFunds || isConfirmingWithdrawFunds ? 'Retrait ETH en cours...' : 'Retirer les Fonds (ETH)'}
                </button>
                <button
                    onClick={handleWithdrawUnsoldTokens}
                    disabled={isLoadingOwnerAction || status.remainingToSell === 0n || status.remainingToSell === undefined}
                    className="px-4 py-2 text-sm bg-orange-500 text-white rounded hover:bg-orange-600 disabled:opacity-50 flex-1"
                >
                    {isWithdrawingTokens || isConfirmingWithdrawTokens ? 'Retrait Tokens en cours...' : 'Retirer Tokens Invendus'}
                </button>
            </div>
            {ownerActionMessage && (
                <div className={`mt-4 p-2 rounded-md text-xs border ${ownerActionMessage.type === 'error' ? 'bg-red-100 dark:bg-red-900/30 border-red-400 text-red-700 dark:text-red-300' : 'bg-green-100 dark:bg-green-900/30 border-green-400 text-green-700 dark:text-green-300'}`}>
                    {ownerActionMessage.text}
                </div>
            )}
        </div>
      )}
    </div>
  );
}
