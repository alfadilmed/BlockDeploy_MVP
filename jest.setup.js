// jest.setup.js
import '@testing-library/jest-dom';

// Vous pouvez ajouter d'autres configurations globales ici si nécessaire
// Par exemple, des mocks globaux, etc.

// Exemple de mock global pour une API qui pourrait être utilisée
// global.fetch = jest.fn(() =>
//   Promise.resolve({
//     json: () => Promise.resolve({ data: 'mocked data' }),
//   })
// );

// Silence les erreurs console.warn et console.error pendant les tests si elles sont trop verbeuses
// (à utiliser avec précaution, car cela peut masquer des problèmes réels)
// beforeEach(() => {
//   jest.spyOn(console, 'error').mockImplementation(jest.fn());
//   jest.spyOn(console, 'warn').mockImplementation(jest.fn());
// });
