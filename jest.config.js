module.exports = {
  preset: 'react-native',
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  setupFiles: ['./node_modules/react-native-gesture-handler/jestSetup.js'],
};
