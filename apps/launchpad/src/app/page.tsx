'use client';
import Link from "next/link";

// Placeholder pour les données des launchpads
const launchpads = [
  // { id: '1', name: 'Awesome Token Launch', tokenSymbol: 'AWT', status: 'Active' },
  // { id: '2', name: 'NextGen DeFi Sale', tokenSymbol: 'NGD', status: 'Upcoming' },
  // { id: '3', name: 'Gaming Guild ICO', tokenSymbol: 'GGT', status: 'Ended' },
];

export default function LaunchpadHomePage() {
  return (
    <div>
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          Bienvenue sur BlockDeploy Launchpad
        </h1>
        <p className="mt-3 text-md md:text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
          Découvrez, participez ou créez votre propre levée de fonds décentralisée.
        </p>
        <div className="mt-6">
            <Link href="/launchpad/create" className="px-6 py-3 text-lg font-medium text-white bg-sky-500 hover:bg-sky-600 rounded-md shadow-sm">
                Créer un Launchpad
            </Link>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
          Launchpads Actifs et à Venir
        </h2>
        {launchpads.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">
            Aucun launchpad actif pour le moment. Soyez le premier à en créer un !
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* {launchpads.map(lp => (
              <div key={lp.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{lp.name} ({lp.tokenSymbol})</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Statut: {lp.status}</p>
                <Link href={`/launchpad/${lp.id}`} className="mt-4 inline-block text-sky-500 hover:text-sky-600">
                  Voir les détails &rarr;
                </Link>
              </div>
            ))} */}
          </div>
        )}
      </div>
    </div>
  );
}
