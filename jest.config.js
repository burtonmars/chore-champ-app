module.exports = {
    preset: 'jest-expo',

    setupFilesAfterEnv: ['./jest.setup.js'],
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
      '^.+\\.mjs$': 'babel-jest',
    },
    transformIgnorePatterns: [
      "node_modules/(?!(" +
        "jest-runner|@react-native|react-native" +
        "|expo|@expo|@expo/.*|expo-router|expo-constants|expo-modules-core" +
        "|@react-navigation/.*" +
        "|@gluestack-ui/.*|@gluestack-style/.*" +
        "|@react-native-aria/.*|@react-stately/.*" +
        "|nativewind" +
        "|react-native-reanimated|react-native-gesture-handler|react-native-svg" +
        "|@firebase/.*|firebase/.*" +
      ")/)"
    ],
  };
