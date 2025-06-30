'use client'; // Ce composant utilise useState et des interactions client

import React, { useState, useEffect } from 'react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { useBlockDeployWallet } from '@blockdeploy/core-sdk'; // Pour vérifier si le wallet est connecté

// Taux de conversion fictif pour la simulation
const BDPY_PRICE_IN_ETH = 0.0001; // 1 ETH = 10,000 BDPY (exemple)
const BDPY_PRICE_IN_USDC = 0.25;  // 1 BDPY = 0.25 USDC (exemple)

export default function IcoPurchaseSimulator() {
  const [amountToSpend, setAmountToSpend] = useState<string>('1');
  const [currency, setCurrency] = useState<'ETH' | 'USDC'>('ETH');
  const [bdpyToReceive, setBdpyToReceive] = useState<number>(0);
  const { account } = useBlockDeployWallet();

  useEffect(() => {
    const numericAmount = parseFloat(amountToSpend);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      setBdpyToReceive(0);
      return;
    }
    if (currency === 'ETH') {
      setBdpyToReceive(numericAmount / BDPY_PRICE_IN_ETH);
    } else {
      setBdpyToReceive(numericAmount / BDPY_PRICE_IN_USDC);
    }
  }, [amountToSpend, currency]);

  const handlePurchase = () => {
    if (!account.isConnected) {
      alert('Veuillez d\'abord connecter votre portefeuille.');
      // Idéalement, ouvrir le modal de connexion wallet ici
      return;
    }
    // Logique d'achat réelle à implémenter (interaction avec smart contract)
    alert(`Simulation : Achat de ${bdpyToReceive.toFixed(2)} $BDPY avec ${amountToSpend} ${currency}.\nCette fonctionnalité n'est pas encore implémentée.`);
  };

  return (
    <Card className="max-w-md mx-auto shadow-xl">
      <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white text-center">
        Participer à l'ICO de $BDPY
      </h3>

      <div className="mb-4">
        <label htmlFor="currency" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Payer avec :
        </label>
        <select
          id="currency"
          name="currency"
          value={currency}
          onChange={(e) => setCurrency(e.target.value as 'ETH' | 'USDC')}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="ETH">ETH</option>
          <option value="USDC">USDC</option>
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="amountToSpend" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Montant en {currency} à investir :
        </label>
        <input
          type="number"
          id="amountToSpend"
          name="amountToSpend"
          value={amountToSpend}
          onChange={(e) => setAmountToSpend(e.target.value)}
          min="0.01" // Exemple de minimum
          step="0.01"
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-700/50 rounded-md text-center">
        <p className="text-sm text-gray-600 dark:text-gray-300">Vous recevrez environ :</p>
        <p className="text-2xl font-bold text-blue-600 dark:text-sky-400">
          {bdpyToReceive.toLocaleString(undefined, { maximumFractionDigits: 2 })} $BDPY
        </p>
      </div>

      <Button
        onClick={handlePurchase}
        variant="primary"
        size="lg"
        className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900"
        disabled={!account.isConnected || parseFloat(amountToSpend) <=0 || isNaN(parseFloat(amountToSpend))}
      >
        {account.isConnected ? (parseFloat(amountToSpend) > 0 && !isNaN(parseFloat(amountToSpend)) ? 'Acheter $BDPY (Simulation)' : 'Entrez un montant valide') : 'Connectez votre Wallet pour acheter'}
      </Button>

      {!account.isConnected && (
          <p className="text-xs text-center mt-2 text-red-500 dark:text-red-400">
            Veuillez connecter votre portefeuille pour simuler un achat.
          </p>
      )}

      <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
        Ceci est une simulation. Les taux et conditions réels de l'ICO seront annoncés.
      </p>
    </Card>
  );
}
