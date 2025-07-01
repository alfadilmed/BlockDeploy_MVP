// apps/launchpad/src/components/common/AlphaBanner.tsx
'use client';

import React, { useState } from 'react';

export default function AlphaBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  // Lien de feedback spécifique à launchpad, ou un lien générique
  const feedbackLink = "/feedback-launchpad"; // ou "/feedback"

  return (
    <div className="bg-yellow-400 text-yellow-900 p-3 text-center text-sm shadow-md relative">
      <p>
        <strong>Version Alpha :</strong> Cette application (Launchpad) est en phase de test.
        Utilisez avec prudence, préférentiellement sur des réseaux de test.
        Vos <a href={feedbackLink} className="underline hover:text-yellow-700">retours</a> sont précieux !
      </p>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-1/2 right-3 transform -translate-y-1/2 text-lg font-bold hover:text-yellow-700"
        aria-label="Fermer le bandeau alpha"
      >
        &times;
      </button>
    </div>
  );
}
