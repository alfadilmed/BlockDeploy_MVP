module.exports = {
  root: true, // Indique à ESLint de ne pas chercher plus haut dans l'arborescence
  extends: [
    '../../.eslintrc.js', // Hérite de la configuration racine
    'next/core-web-vitals', // Spécifique à Next.js
  ],
  // Vous pouvez ajouter des règles spécifiques ou surcharger celles de la racine ici si nécessaire
  // rules: {
  //   // par exemple:
  //   // "@typescript-eslint/no-unused-vars": "warn"
  // },
  // Si votre tsconfig.json de landing a un nom ou chemin différent, spécifiez-le :
  // parserOptions: {
  //   tsconfigRootDir: __dirname,
  //   project: ['./tsconfig.json'],
  // },
};
