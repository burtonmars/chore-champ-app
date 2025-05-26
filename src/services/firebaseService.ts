import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'
import { FirebaseApp, getApp, getApps, initializeApp } from 'firebase/app'
import {
  Auth,
  getAuth,
  getReactNativePersistence,
  initializeAuth,
} from 'firebase/auth'
import { Firestore, getFirestore } from 'firebase/firestore'

import firebaseConfig from '../config/firebaseConfig'

let app: FirebaseApp | null = null
let auth: Auth | null = null
let db: Firestore | null = null
let firebaseInitializedSuccessfully = false

export function initializeFirebaseApp(): void {
  if (firebaseInitializedSuccessfully) {
    return
  }

  if (getApps().length > 0) {
    console.log(
      'Firebase app instance already existed. Retrieving existing services.'
    )
    app = getApp()
    auth = getAuth(app)
    db = getFirestore(app)
    firebaseInitializedSuccessfully = true
    return
  }

  // Primary initialization path
  try {
    if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
      throw new Error(
        'Critical Firebase configuration (apiKey or projectId) is missing.'
      )
    }

    app = initializeApp(firebaseConfig)

    // Initialize Auth with React Native persistence
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(ReactNativeAsyncStorage),
    })

    db = getFirestore(app)

    if (auth && db) {
      firebaseInitializedSuccessfully = true
      console.log(
        'Firebase initialized successfully (App, Auth with persistence, Firestore).'
      )
    }
  } catch (error) {
    console.error('Firebase initialization error:', error)
    app = null
    auth = null
    db = null
    firebaseInitializedSuccessfully = false
    throw error
  }
}

export function getFirebaseAuth(): Auth {
  if (!auth || !firebaseInitializedSuccessfully) {
    throw new Error(
      'Firebase Auth accessed before complete and successful initialization!'
    )
  }
  return auth
}

export function getFirebaseDb(): Firestore {
  if (!db || !firebaseInitializedSuccessfully) {
    throw new Error(
      'Firebase DB accessed before complete and successful initialization!'
    )
  }
  return db
}

export function getFirebaseAppInstance(): FirebaseApp {
  if (!app || !firebaseInitializedSuccessfully) {
    throw new Error(
      'Firebase App accessed before complete and successful initialization!'
    )
  }
  return app
}
