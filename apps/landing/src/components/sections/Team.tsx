import Image from 'next/image'; // Utilisé si vous avez des images pour les membres
import Card from '../ui/Card';

// Données Placeholder pour l'équipe
const teamMembers = [
  {
    name: 'Simo Fadil',
    role: 'Coordinateur Projet & Expert Web3',
    // imageUrl: '/images/team/simo.jpg', // Chemin vers l'image si disponible
    bio: 'Passionné par la décentralisation et l\'innovation, Simo pilote la vision de BlockDeploy.',
    linkedin: '#', // Lien LinkedIn Placeholder
    twitter: '#',  // Lien Twitter Placeholder
  },
  {
    name: 'Jules (IA)',
    role: 'Ingénieur Logiciel Principal IA',
    // imageUrl: '/images/team/jules.png', // Placeholder
    bio: 'Dédié à la construction d\'outils robustes et scalables pour l\'écosystème Web3.',
    // github: '#', // Lien GitHub Placeholder
  },
  {
    name: 'ChatGPT (IA)',
    role: 'Expert Gestion de Projet IA',
    // imageUrl: '/images/team/chatgpt.png', // Placeholder
    bio: 'Assure la fluidité et l\'efficacité des sprints de développement et de la stratégie projet.',
  },
  // Ajoutez d'autres membres ici (placeholders)
  {
    name: 'Jane Doe (Placeholder)',
    role: 'Lead Designer UI/UX',
    // imageUrl: '/images/team/jane.jpg',
    bio: 'Experte en création d\'expériences utilisateur intuitives et engageantes pour le Web3.',
    linkedin: '#',
  },
];

export default function Team() {
  return (
    <section id="team" className="py-12 md:py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Notre Équipe (Placeholders)
          </h2>
          <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Les esprits derrière BlockDeploy, dédiés à votre succès dans le Web3.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {teamMembers.map((member) => (
            <Card key={member.name} className="text-center transform hover:shadow-2xl transition-shadow duration-300">
              {/* Placeholder pour l'image - à remplacer par <Image /> si les images sont disponibles */}
              <div className="w-32 h-32 rounded-full bg-gray-300 dark:bg-gray-700 mx-auto mb-4 flex items-center justify-center text-4xl">
                {member.imageUrl ? (
                  <Image src={member.imageUrl} alt={member.name} width={128} height={128} className="rounded-full object-cover" />
                ) : (
                  <span>{member.name.charAt(0)}</span>
                )}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{member.name}</h3>
              <p className="text-blue-600 dark:text-sky-400 text-sm mb-2">{member.role}</p>
              <p className="text-gray-600 dark:text-gray-400 text-xs mb-3 px-2">{member.bio}</p>
              <div className="flex justify-center space-x-3">
                {member.linkedin && <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-700 dark:hover:text-sky-500">LinkedIn</a>}
                {member.twitter && <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-500 dark:hover:text-sky-400">Twitter</a>}
                {member.github && <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">GitHub</a>}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
