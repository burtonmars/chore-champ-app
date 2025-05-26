import Constants from 'expo-constants'

const getExtraVar = (key: string): string | undefined => {
  return Constants.expoConfig?.extra?.[key] as string | undefined
}

const firebaseConfig = {
  apiKey: getExtraVar('firebaseApiKey'),
  authDomain: getExtraVar('firebaseAuthDomain'),
  projectId: getExtraVar('firebaseProjectId'),
  storageBucket: getExtraVar('firebaseStorageBucket'),
  messagingSenderId: getExtraVar('firebaseMessagingSenderId'),
  appId: getExtraVar('firebaseAppId'),
  measurementId: getExtraVar('firebaseMeasurementId'),
}

export default firebaseConfig
