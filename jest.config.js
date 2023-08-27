module.exports = {
    transform: {
      '^.+\\.(js|jsx)$': 'babel-jest',
    },
    moduleFileExtensions: ['js', 'jsx'],
    moduleNameMapper: {
      '\\.(css|less|sass|scss)$': '<rootDir>/src/__mocks__/styleMock.js',
      '\\.(gif|ttf|eot|svg)$': '<rootDir>/src/__mocks__/fileMock.js',
    },
    testEnvironment: 'jsdom',
    transformIgnorePatterns: ['<rootDir>/node_modules/(?!(babel-jest|react-native)/)'],
  };
  