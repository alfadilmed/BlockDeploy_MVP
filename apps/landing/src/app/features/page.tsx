import KeyFeatures from "@/components/sections/KeyFeatures"; // Importer le composant

export default function FeaturesPage() {
  return (
    <div className="py-2"> {/* Changé main en div et ajusté padding */}
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Fonctionnalités de BlockDeploy
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-10">
          Explorez en détail la suite d'outils que BlockDeploy met à votre disposition pour accélérer et simplifier vos projets Web3. Chaque module est conçu pour être puissant, flexible et facile à utiliser.
        </p>
      </div>
      {/* Réutiliser le composant KeyFeatures qui est déjà bien structuré */}
      <KeyFeatures />

      <section className="py-12 md:py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Et bien plus à venir...
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-8 max-w-xl mx-auto">
                Notre roadmap est remplie d'innovations pour continuellement enrichir la plateforme.
            </p>
        </div>
      </section>
    </div>
  );
}
