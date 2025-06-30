import HeroPitch from '@/components/sections/HeroPitch';
import KeyFeatures from '@/components/sections/KeyFeatures';
import RoadmapTeaser from '@/components/sections/RoadmapTeaser';
import Tokenomics from '@/components/sections/Tokenomics';
import Team from '@/components/sections/Team';

export default function HomePage() {
  return (
    <> {/* Remplacer main par un fragment ou div si Header/Footer sont dans le layout */}
      <HeroPitch />
      <KeyFeatures />
      <Tokenomics />
      <RoadmapTeaser />
      <Team />

      {/* Section CTA finale ou autres sections peuvent être ajoutées ici */}
      <section className="py-12 md:py-20 text-center bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Prêt à construire l'avenir du Web3 avec BlockDeploy ?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-8 max-w-xl mx-auto">
            Rejoignez notre communauté et soyez parmi les premiers à bénéficier de notre plateforme révolutionnaire.
          </p>
          {/* Le CTA principal est déjà dans HeroPitch, mais on pourrait en avoir un autre ici */}
          {/* Exemple: <ButtonLink href="/ico#buy" variant="primary" size="lg">Participer à l'ICO</ButtonLink> */}
        </div>
      </section>
    </>
  );
}
