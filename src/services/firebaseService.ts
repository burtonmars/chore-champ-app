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

let app: FirebaseApp
let auth: Auth
let db: Firestore

// Initialize Firebase
if (!getApps().length) {
  try {
    app = initializeApp(firebaseConfig)
    // Initialize Auth with React Native persistence
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(ReactNativeAsyncStorage),
    })
    db = getFirestore(app)
    console.log('Firebase initialized successfully!')
  } catch (error) {
    console.error('Firebase initialization error:', error)
    throw error
  }
} else {
  app = getApp()
  // Note: getAuth() and getFirestore() will return the instances associated with the 'app'
  auth = getAuth(app)
  db = getFirestore(app)
  // console.log("Firebase was already initialized.");
}

export { app, auth, db }
