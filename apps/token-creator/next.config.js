/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Pour s'assurer que Next.js transpile le core-sdk s'il est linké
  // et contient du code non-transpilé (ex: JSX hors de .jsx/.tsx)
  // ou si vous utilisez des imports directs de fichiers .ts du SDK.
  // Avec Yarn Workspaces, cela est généralement bien géré, mais `transpilePackages`
  // peut être utile pour forcer la transpilation si des erreurs surviennent.
  transpilePackages: ['@blockdeploy/core-sdk'],
};

module.exports = nextConfig;
