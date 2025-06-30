import IcoPurchaseSimulator from "@/components/sections/IcoPurchaseSimulator";
import Card from "@/components/ui/Card";

export default function IcoPage() {
  return (
    <div className="py-12 md:py-16"> {/* Changé main en div pour flexibilité avec layout global */}
      <section id="buy" className="mb-16">
        <IcoPurchaseSimulator />
      </section>

      <section className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Informations sur l'ICO de BlockDeploy ($BDPY)
          </h1>
          <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Rejoignez la révolution BlockDeploy en participant à notre vente de tokens.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Détails de la Vente (Placeholders)</h2>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li><strong>Début de la vente :</strong> À Annoncer (Q3 2024)</li>
              <li><strong>Fin de la vente :</strong> À Annoncer</li>
              <li><strong>Prix du Token :</strong> ETH {BDPY_PRICE_IN_ETH_DISPLAY} / $BDPY  |  USDC {BDPY_PRICE_IN_USDC_DISPLAY} / $BDPY (Exemple)</li>
              <li><strong>Tokens disponibles pour la vente :</strong> 300,000,000 $BDPY (30% de la supply totale)</li>
              <li><strong>Minimum d'investissement :</strong> 0.1 ETH / 250 USDC (Exemple)</li>
              <li><strong>Maximum d'investissement :</strong> 10 ETH / 25,000 USDC (Exemple)</li>
              <li><strong>Monnaies acceptées :</strong> ETH, USDC</li>
              <li><strong>KYC/AML :</strong> Potentiellement requis (détails à venir)</li>
            </ul>
          </Card>
          <Card>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Étapes de l'ICO (Placeholders)</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li><strong>Phase 1 (Vente Privée) :</strong> Terminé / En cours pour les partenaires stratégiques.</li>
              <li><strong>Phase 2 (Pré-vente Communauté) :</strong> Accès anticipé pour les membres actifs de la communauté (Whitelist).</li>
              <li><strong>Phase 3 (Vente Publique) :</strong> Ouverte à tous.</li>
              <li><strong>Distribution des Tokens :</strong> Après la fin de la vente publique (détails du vesting à venir).</li>
              <li><strong>Listing sur les Échanges :</strong> Q4 2024 / Q1 2025 (Objectif).</li>
            </ol>
          </Card>
        </div>
        <div className="mt-12 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>Les informations ci-dessus sont des placeholders et sujettes à modification. Un whitepaper détaillé avec les informations finales sera publié prochainement.</p>
          <p>Investir dans les cryptomonnaies comporte des risques. Faites vos propres recherches.</p>
        </div>
      </section>
    </div>
  );
}

// Pour l'affichage des prix, car les constantes sont dans le composant simulateur
const BDPY_PRICE_IN_ETH_DISPLAY = 0.0001;
const BDPY_PRICE_IN_USDC_DISPLAY = 0.25;
