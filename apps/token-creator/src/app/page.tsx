'use client'; // Pour utiliser des hooks et des interactions client

import React from 'react';
// import { useBlockDeployWallet } from '@blockdeploy/core-sdk'; // Sera utilisé plus tard

import CreateTokenForm from '@/components/CreateTokenForm'; // Importer le composant formulaire

import CreateTokenForm from '@/components/CreateTokenForm'; // Importer le composant formulaire
import DeployedTokensList, { DeployedTokenHistoryItem } from '@/components/DeployedTokensList'; // Importer la liste
import { useState, useEffect } from 'react'; // Pour gérer l'état de la liste

export default function TokenCreatorPage() {
  const [deployedTokens, setDeployedTokens] = useState<DeployedTokenHistoryItem[]>([]);

  useEffect(() => {
    // Charger les tokens depuis localStorage au montage côté client uniquement
    if (typeof window !== 'undefined') {
      const storedTokens = localStorage.getItem('deployedTokens');
      if (storedTokens) {
        try {
          setDeployedTokens(JSON.parse(storedTokens));
        } catch (e) {
          console.error("Erreur lors de la lecture de l'historique des tokens depuis localStorage:", e);
          localStorage.removeItem('deployedTokens'); // Supprimer les données corrompues
        }
      }
    }
  }, []);

  // TODO: Ajouter une fonction pour mettre à jour `deployedTokens` lorsque CreateTokenForm
  // déploie un nouveau token. Pour l'instant, un rechargement de page après déploiement
  // est nécessaire pour voir le nouveau token dans la liste.
  // Une meilleure approche serait d'utiliser un contexte ou un événement global.
  // Ou que CreateTokenForm prenne une prop `onTokenDeployed` pour mettre à jour l'état ici.

  return (
    <div>
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          Créateur de Tokens ERC-20
        </h1>
        <p className="mt-3 text-md md:text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
          Lancez votre propre token fongible sur la blockchain en quelques étapes simples.
          Connectez votre portefeuille, configurez les détails de votre token, et déployez !
        </p>
      </div>

      <div className="max-w-2xl mx-auto p-6 sm:p-8 bg-white dark:bg-gray-800 rounded-xl shadow-2xl">
        <CreateTokenForm />
      </div>

      <DeployedTokensList tokens={deployedTokens} />
    </div>
  );
}
