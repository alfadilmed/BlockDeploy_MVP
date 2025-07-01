export default function AppFooter() {
  return (
    <footer className="bg-slate-700 text-white p-4 text-center text-sm mt-auto"> {/* mt-auto pour pousser en bas si contenu court */}
      <div className="container mx-auto">
        <p>&copy; {new Date().getFullYear()} BlockDeploy Launchpad. Powered by Primex Software.</p>
      </div>
    </footer>
  );
}
