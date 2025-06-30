// Placeholder pour un composant Roadmap visuel plus élaboré si besoin
const RoadmapItem = ({ phase, title, description, status }: { phase: string, title: string, description: string, status: 'completed' | 'current' | 'upcoming' }) => {
  let bgColor = 'bg-gray-500'; // upcoming
  if (status === 'completed') bgColor = 'bg-green-500';
  if (status === 'current') bgColor = 'bg-blue-500 animate-pulse';

  return (
    <div className="relative pl-8 pr-4 py-4 border-l-2 border-gray-300 dark:border-gray-600 group">
      <div className={`absolute w-4 h-4 ${bgColor} rounded-full -left-[9px] top-1/2 -translate-y-1/2 border-2 border-white dark:border-gray-800`}></div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{phase} - {title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{description}</p>
      {status === 'current' && <p className="text-xs text-blue-500 dark:text-blue-400 mt-1">Phase Actuelle</p>}
    </div>
  );
};

const roadmapData = [
  { phase: 'Q3 2024', title: 'Lancement Initial & ICO', description: 'Mise en place du monorepo, landing page ICO, core-sdk, déploiement initial.', status: 'current' as 'current' | 'completed' | 'upcoming' },
  { phase: 'Q4 2024', title: 'Premières dApps & Extension SDK', description: 'Développement du Token Creator, NFT Marketplace Builder. Enrichissement du core-sdk.', status: 'upcoming' as 'current' | 'completed' | 'upcoming'},
  { phase: 'Q1 2025', title: 'Outils de Productivité', description: 'DAO Builder, Launchpad, Drag & Drop Builder (MVP).', status: 'upcoming' as 'current' | 'completed' | 'upcoming'},
  { phase: 'Q2 2025', title: 'Fonctionnalités Avancées & Communauté', description: 'Smart Contract Auditor, AI Assistant, Web3 Academy, Blocs Marketplace.', status: 'upcoming' as 'current' | 'completed' | 'upcoming'},
];

export default function RoadmapTeaser() {
  return (
    <section id="roadmap" className="py-12 md:py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Notre Feuille de Route
          </h2>
          <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Les prochaines étapes de BlockDeploy pour révolutionner le développement Web3.
          </p>
        </div>
        <div className="max-w-2xl mx-auto">
          {roadmapData.map((item, index) => (
            <RoadmapItem key={index} {...item} />
          ))}
        </div>
         <div className="text-center mt-10">
          <a href="/roadmap" className="text-blue-600 dark:text-sky-400 hover:underline">
            Voir la roadmap détaillée &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
