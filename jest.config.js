module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom', // Utiliser jsdom pour simuler un environnement de navigateur
  roots: ['<rootDir>/packages', '<rootDir>/apps'], // Où Jest doit chercher les tests
  moduleDirectories: ['node_modules', 'src'], // Permet d'importer depuis src (utile si configuré dans tsconfig)

  // Gérer les imports de fichiers statiques et de styles
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mocker les fichiers CSS
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js', // Mocker les autres fichiers statiques
    '^@/(.*)$': '<rootDir>/apps/landing/src/$1', // Alias pour la landing page (si besoin dans les tests)
    '^@blockdeploy/core-sdk$': '<rootDir>/packages/core-sdk/src', // Alias pour le SDK
    // Ajoutez d'autres alias si nécessaire pour d'autres packages/apps
  },

  // Fichiers à inclure dans la couverture de code
  collectCoverageFrom: [
    'packages/**/src/**/*.{ts,tsx}',
    'apps/**/src/**/*.{ts,tsx}',
    '!**/*.d.ts', // Exclure les fichiers de déclaration TypeScript
    '!**/node_modules/**',
    '!**/dist/**',
    '!**/vendor/**',
    '!**/.next/**',
    '!**/coverage/**',
    '!jest.config.js',
    '!jest.setup.js',
    '!next.config.js',
    '!postcss.config.js',
    '!.eslintrc.js',
    '!prettier.config.js',
    // Exclure les fichiers de définition de type globaux ou spécifiques à next
    '!apps/landing/next-env.d.ts',
  ],
  coverageDirectory: '<rootDir>/coverage/', // Répertoire de sortie pour la couverture

  // Fichier de setup à exécuter avant chaque suite de tests
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  // Ignorer les dossiers .next pour les tests (important pour Next.js)
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/', '<rootDir>/dist/'],

  // Configuration pour ts-jest
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.json', // Utiliser le tsconfig racine
      // Si vous avez des problèmes de performance, vous pouvez essayer :
      // isolatedModules: true,
    },
  },
  // Transforme les fichiers .ts et .tsx avec ts-jest
  // Les fichiers .js et .jsx peuvent être transformés par babel-jest si nécessaire, mais ts-jest devrait suffire pour un projet TS.
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    // Pour les fichiers js/jsx si vous en avez et qu'ils nécessitent une transformation (ex: import/export ES6)
    // "^.+\\.(js|jsx)$": "babel-jest",
  },
  // Par défaut, Jest ne transforme pas les fichiers dans node_modules.
  // Si une dépendance doit être transformée (parce qu'elle est en ES6 et non transpilée),
  // vous pouvez l'ajouter à transformIgnorePatterns.
  // Exemple: transformIgnorePatterns: ['/node_modules/(?!some-es6-module).+\\.js$'],
  transformIgnorePatterns: [
    '/node_modules/',
    '\\.pnp\\.[^\\/]+$' // Exclure les fichiers pnp de Yarn Berry si utilisé
  ],
};
