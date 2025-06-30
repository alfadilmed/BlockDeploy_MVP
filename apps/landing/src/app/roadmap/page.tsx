import RoadmapTeaser from "@/components/sections/RoadmapTeaser"; // Importer le composant

export default function RoadmapPage() {
  return (
    <div className="py-2"> {/* Changé main en div et ajusté padding */}
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Roadmap de BlockDeploy
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-10">
          Suivez notre progression et découvrez les prochaines grandes étapes de BlockDeploy. Nous construisons l'avenir du développement Web3, phase par phase, avec des objectifs clairs et une vision à long terme.
        </p>
      </div>
      {/* Réutiliser le composant RoadmapTeaser qui est déjà bien structuré */}
      <RoadmapTeaser />

      <section className="py-12 md:py-16 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Vision à Long Terme (Placeholders)
          </h2>
          <div className="grid md:grid-cols-2 gap-8 text-gray-700 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Écosystème Modulaire Extensible</h3>
              <p>Continuer à ajouter de nouveaux modules et dApps basés sur les besoins de la communauté et les évolutions du marché Web3. Favoriser l'interopérabilité entre les modules.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Support Multi-chaînes Avancé</h3>
              <p>Étendre le support à un plus grand nombre de blockchains EVM et non-EVM, avec des outils spécifiques pour chaque écosystème.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Outils pour Développeurs</h3>
              <p>Fournir des SDKs plus riches, des APIs robustes, et des outils CLI pour permettre aux développeurs de construire sur et avec BlockDeploy.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Décentralisation Progressive</h3>
              <p>Explorer et implémenter des mécanismes de gouvernance décentralisée pour la plateforme elle-même via le token $BDPY et la DAO BlockDeploy.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
