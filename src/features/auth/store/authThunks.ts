import { createAsyncThunk } from '@reduxjs/toolkit';
import { getFirebaseAuth } from '../../../services/firebaseService';
import {
  createUserWithEmailAndPassword,
  UserCredential as FirebaseUserCredential,
  AuthError,
} from 'firebase/auth';
import type { User, AuthCredentials } from './authSlice';

export const signUpUser = createAsyncThunk<
  User,
  AuthCredentials,
  { rejectValue: string }
>(
  'auth/signUpUser',
  async (credentials, { rejectWithValue }) => {
    const { email, password } = credentials;
    const firebaseAuth = getFirebaseAuth();

    if (!firebaseAuth) {
        return rejectWithValue('Firebase Auth is not initialized.');
    }

    try {
      console.log(`Attempting to create user: ${email}`);
      const userCredential: FirebaseUserCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      const firebaseUser = userCredential.user;

      const appUser: User = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName,
      };

      console.log('User created successfully in Firebase:', appUser.uid);
      return appUser;

    } catch (error: any) {
      let errorMessage = 'An unknown error occurred during sign up.';
      if (error.name === 'FirebaseError' || error instanceof Error) {
        const firebaseError = error as AuthError;
        console.error('Firebase SignUp Error Code:', firebaseError.code);
        console.error('Firebase SignUp Error Message:', firebaseError.message);
        switch (firebaseError.code) {
          case 'auth/email-already-in-use':
            errorMessage = 'This email address is already in use.';
            break;
          case 'auth/invalid-email':
            errorMessage = 'The email address is not valid.';
            break;
          case 'auth/weak-password':
            errorMessage = 'The password is too weak. Please choose a stronger password.';
            break;
          default:
            errorMessage = firebaseError.message || 'Sign up failed. Please try again.';
        }
      } else if (typeof error === 'string') {
        errorMessage = error;
      }

      return rejectWithValue(errorMessage);
    }
  }
);
