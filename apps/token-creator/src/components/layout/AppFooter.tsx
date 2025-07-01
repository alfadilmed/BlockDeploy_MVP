export default function AppFooter() {
  const discordLink = "#"; // TODO: Remplacer par le vrai lien Discord
  const supportEmail = "support@blockdeploy.io"; // TODO: Remplacer/confirmer l'email

  return (
    <footer className="bg-gray-700 text-white p-6 text-center text-sm mt-auto">
      <div className="container mx-auto">
        <p className="mb-2">&copy; {new Date().getFullYear()} BlockDeploy Token Creator. Powered by Primex Software.</p>
        <div className="space-x-4">
          {discordLink !== "#" && (
            <a href={discordLink} target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 hover:underline">
              Rejoignez notre Discord
            </a>
          )}
          <a href={`mailto:${supportEmail}`} className="hover:text-gray-300 hover:underline">
            Support Email
          </a>
        </div>
      </div>
    </footer>
  );
}
