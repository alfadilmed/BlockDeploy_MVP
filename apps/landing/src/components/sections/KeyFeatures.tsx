import Card from '../ui/Card'; // Assurez-vous que le chemin est correct

const features = [
  {
    title: 'Token Creator',
    description: 'Lancez vos propres tokens ERC-20, ERC-721, ERC-1155 en quelques clics, sans une ligne de code.',
    icon: '🪙', // Placeholder icon
  },
  {
    title: 'NFT Marketplace Builder',
    description: 'Créez et déployez votre propre marketplace NFT personnalisée avec des fonctionnalités avancées.',
    icon: '🖼️', // Placeholder icon
  },
  {
    title: 'DAO Builder',
    description: 'Mettez en place et gérez des Organisations Autonomes Décentralisées (DAO) facilement.',
    icon: '🏛️', // Placeholder icon
  },
  {
    title: 'Launchpad Facile',
    description: 'Organisez des ventes initiales de tokens (IDO) de manière sécurisée et transparente.',
    icon: '🚀', // Placeholder icon
  },
  {
    title: 'Drag & Drop dApp Builder',
    description: 'Composez des interfaces pour vos dApps avec notre éditeur visuel intuitif.',
    icon: '✨', // Placeholder icon
  },
  {
    title: 'Smart Contract Auditor (Assistant)',
    description: 'Identifiez les vulnérabilités courantes dans vos smart contracts avec notre assistant d\'audit.',
    icon: '🛡️', // Placeholder icon
  },
];

export default function KeyFeatures() {
  return (
    <section id="features" className="py-12 md:py-20 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Fonctionnalités Clés de BlockDeploy
          </h2>
          <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Une suite complète d'outils pour construire l'avenir du Web3, sans complexité.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature) => (
            <Card key={feature.title} className="transform hover:scale-105 transition-transform duration-300">
              <div className="flex flex-col items-center text-center p-2">
                <span className="text-4xl mb-4">{feature.icon}</span>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{feature.description}</p>
                {/* <!-- TODO: Insérer ici une capture/GIF/lien démo pour la fonctionnalité {feature.title} --> */}
                <p className="text-xs text-sky-500 dark:text-sky-400 italic">(Démo visuelle à venir)</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
