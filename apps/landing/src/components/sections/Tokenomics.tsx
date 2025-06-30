import Card from "../ui/Card";

const tokenDetails = [
  { label: 'Nom du Token', value: 'BlockDeploy Token' },
  { label: 'Symbole', value: '$BDPY' },
  { label: 'Supply Totale (Max)', value: '1,000,000,000 $BDPY' }, // Placeholder
  { label: 'Blockchain', value: 'Ethereum (ERC-20) - Phase initiale' }, // Placeholder
  { label: 'Utilités Principales', value: 'Gouvernance, Accès aux fonctionnalités premium, Staking, Frais de plateforme réduits.' }, // Placeholder
];

const allocationData = [
  { category: 'Vente Publique (ICO)', percentage: '30%', color: 'bg-sky-500' },
  { category: 'Équipe & Conseillers', percentage: '15%', color: 'bg-blue-500' },
  { category: 'Trésorerie & Développement Écosystème', percentage: '25%', color: 'bg-indigo-500' },
  { category: 'Marketing & Partenariats', percentage: '15%', color: 'bg-purple-500' },
  { category: 'Récompenses Staking & Liquidité', percentage: '15%', color: 'bg-pink-500' },
];

export default function Tokenomics() {
  return (
    <section id="tokenomics" className="py-12 md:py-20 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Tokenomics de $BDPY
          </h2>
          <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Comprendre la structure et l'utilité de notre token natif.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <Card className="shadow-xl">
            <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white text-center">Détails du Token</h3>
            <ul className="space-y-3">
              {tokenDetails.map(detail => (
                <li key={detail.label} className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="font-medium text-gray-700 dark:text-gray-300">{detail.label}:</span>
                  <span className="text-right text-gray-900 dark:text-white">{detail.value}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="shadow-xl">
            <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white text-center">Allocation des Tokens</h3>
            <div className="space-y-4">
              {allocationData.map(item => (
                <div key={item.category}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.category}</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{item.percentage}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                    <div className={`${item.color} h-4 rounded-full`} style={{ width: item.percentage }}></div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
              Note: Les allocations sont sujettes à des ajustements mineurs. Un whitepaper détaillé sera publié.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
