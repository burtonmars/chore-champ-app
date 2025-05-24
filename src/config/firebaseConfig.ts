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

if (
  !firebaseConfig.apiKey ||
  !firebaseConfig.authDomain ||
  !firebaseConfig.projectId ||
  !firebaseConfig.appId
) {
  console.error(
    'Firebase configuration is missing. Ensure environment variables are set and accessible via Constants.expoConfig.extra in app.config.js'
  )
}

export default firebaseConfig
