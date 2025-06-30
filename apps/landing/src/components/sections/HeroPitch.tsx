import Link from 'next/link';
import Button from '../ui/Button';

export default function HeroPitch() {
  return (
    <section className="py-12 md:py-20 lg:py-28 bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700 text-white text-center">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
          BlockDeploy: Votre Rampe de Lancement vers le Web3
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
          Simplifiez la création, le déploiement et la gestion de vos applications décentralisées et smart contracts. BlockDeploy rend le Web3 accessible à tous, des entrepreneurs innovants aux développeurs aguerris.
        </p>
        <div className="space-x-4">
          <Link href="/ico#buy">
            <Button variant="primary" size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-gray-900">
              Acheter des Tokens $BDPY
            </Button>
          </Link>
          <Link href="/features">
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              Découvrir les Fonctionnalités
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
