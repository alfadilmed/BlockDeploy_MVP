// apps/launchpad/src/components/common/FeedbackButton.tsx
'use client';

import React, { useState } from 'react';

export default function FeedbackButton() {
  const [showModal, setShowModal] = useState(false);
  const discordLink = "#"; // TODO: Remplacer par le vrai lien Discord
  const supportEmail = "support@blockdeploy.io"; // TODO: Remplacer/confirmer

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-4 right-4 bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 px-4 rounded-full shadow-lg transition-transform duration-150 hover:scale-105 z-50"
        title="Donner votre feedback"
      >
        Feedback Alpha
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[100]">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Vos Retours Comptent !</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
              Merci de nous aider à améliorer BlockDeploy (Launchpad) ! Cette application est en version Alpha.
              Pour l'instant, veuillez nous envoyer vos retours, suggestions ou rapports de bugs via :
            </p>
            <ul className="list-disc list-inside mb-6 text-sm space-y-1">
              {discordLink !== "#" && (
                <li>
                  Notre serveur Discord : <a href={discordLink} target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:underline">Rejoindre ici</a>
                </li>
              )}
              <li>
                Email : <a href={`mailto:${supportEmail}?subject=Feedback Alpha - Launchpad`} className="text-sky-500 hover:underline">{supportEmail}</a>
              </li>
            </ul>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
              Un formulaire de feedback plus structuré sera bientôt disponible.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="w-full py-2 px-4 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-white rounded-md text-sm"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </>
  );
}
