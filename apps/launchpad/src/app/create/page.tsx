'use client';

import CreateLaunchpadForm from '@/components/CreateLaunchpadForm';

export default function CreateLaunchpadPage() {
  return (
    <div>
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          Créer un Nouveau Launchpad
        </h1>
        <p className="mt-3 text-md md:text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
          Configurez les détails de votre levée de fonds décentralisée. Assurez-vous d'avoir l'adresse du token ERC-20 que vous souhaitez vendre et que vous êtes connecté avec le portefeuille qui sera propriétaire du Launchpad.
        </p>
      </div>

      <div className="max-w-2xl mx-auto p-6 sm:p-8 bg-white dark:bg-gray-800 rounded-xl shadow-2xl">
        <CreateLaunchpadForm />
      </div>
    </div>
  );
}
