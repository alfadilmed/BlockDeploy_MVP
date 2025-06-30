module.exports = {
  root: true,
  extends: ['../../.eslintrc.js'], // Hérite de la config racine
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'], // Spécifique à ce package
  },
  rules: {
    // Règles spécifiques au SDK si nécessaire
    // Par exemple, si ce SDK ne doit pas utiliser de fonctionnalités React spécifiques :
    // 'react/display-name': 'off',
  },
  settings: {
    react: {
      version: '18.0', // Spécifier la version de React pour ESLint si non détectée
    },
  }
};
