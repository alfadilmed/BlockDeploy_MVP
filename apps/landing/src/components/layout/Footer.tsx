export default function Footer() {
  return (
    <footer className="bg-gray-700 text-white p-6 text-center">
      <div className="container mx-auto">
        <p>&copy; {new Date().getFullYear()} BlockDeploy by Primex Software. All rights reserved.</p>
        <p className="mt-2 text-sm">
          <a href="https://primex-software.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
            primex-software.com
          </a>
        </p>
        {/* Ajouter ici les liens vers les pages légales, réseaux sociaux, etc. */}
      </div>
    </footer>
  );
}
