'use client'; // Pour utiliser des hooks et des interactions client

import React from 'react';
// import { useBlockDeployWallet } from '@blockdeploy/core-sdk'; // Sera utilisé plus tard

import CreateTokenForm from '@/components/CreateTokenForm'; // Importer le composant formulaire

export default function TokenCreatorPage() {
  return (
    <div>
      <div className="text-center mb-10"> {/* Ajustement du margin bottom */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          Créateur de Tokens ERC-20
        </h1>
        <p className="mt-3 text-md md:text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
          Lancez votre propre token fongible sur la blockchain en quelques étapes simples.
          Connectez votre portefeuille, configurez les détails de votre token, et déployez !
        </p>
      </div>

      <div className="max-w-2xl mx-auto p-6 sm:p-8 bg-white dark:bg-gray-800 rounded-xl shadow-2xl">
        {/* Le titre est maintenant dans le composant CreateTokenForm */}
        <CreateTokenForm />
      </div>

      {/* La section pour afficher les résultats du déploiement est gérée dans CreateTokenForm pour l'instant */}
      {/* Si besoin de plus de détails, on pourra l'extraire ici */}
    </div>
  );
}
