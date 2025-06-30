/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Si vous utilisez `srcDir: true` dans create-next-app, Next.js cherchera les pages dans `src/pages` ou `src/app`
  // Cette option n'est pas explicitement mise ici car la structure `src/app` est standard pour App Router.
  // Si vous aviez des pages dans `pages/` et non `src/pages/`, vous mettriez `srcDir: 'src'` ici.
  // Cependant, avec App Router, la convention est `src/app`.
};

module.exports = nextConfig;
