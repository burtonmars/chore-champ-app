import { jest } from '@jest/globals';
import '@testing-library/jest-native/extend-expect';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

jest.mock('expo-constants', () => {
  const Constants = jest.requireActual('expo-constants');
  return {
    ...Constants,
    expoConfig: {
      ...Constants.expoConfig,
      extra: {
        firebaseApiKey: 'MOCK_API_KEY',
        firebaseAuthDomain: 'MOCK_AUTH_DOMAIN',
        firebaseProjectId: 'MOCK_PROJECT_ID',
        firebaseStorageBucket: 'MOCK_STORAGE_BUCKET',
        firebaseMessagingSenderId: 'MOCK_MESSAGING_SENDER_ID',
        firebaseAppId: 'MOCK_APP_ID',
        firebaseMeasurementId: 'MOCK_MEASUREMENT_ID',
      },
    },
  };
});
