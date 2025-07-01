module.exports = {
  root: true,
  extends: [
    '../../.eslintrc.js',
    'next/core-web-vitals',
  ],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
};
