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
              Participer à l'ICO $BDPY
            </Button>
          </Link>
          <Link href="#apps-section"> {/* Supposons une future section listant les apps, ou un lien direct */}
            <Button variant="secondary" size="lg" className="bg-sky-400 hover:bg-sky-500 text-white">
              Explorer les dApps
            </Button>
          </Link>
        </div>
        <p className="mt-10 text-sm">
            <Link href="/features" className="hover:underline">
                En savoir plus sur les fonctionnalités &rarr;
            </Link>
        </p>
      </div>
    </section>
    // Une section #apps-section pourrait être ajoutée plus bas dans page.tsx
    // <section id="apps-section" className="py-12 md:py-16">
    //   <h2 class="text-center text-2xl font-bold">Nos dApps Actuellement Disponibles :</h2>
    //   <div class="flex justify-center space-x-4 mt-6">
    //     <Link href="/token-creator"><Button>Token Creator</Button></Link>
    //     <Link href="/launchpad"><Button>Launchpad</Button></Link>
    //   </div>
    // </section>
  );
}
