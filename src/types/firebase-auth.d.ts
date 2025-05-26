import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

declare module 'firebase/auth' {
  // Using 'any' temporarily for the return type to bypass complex Persistence type issues
  // The main goal is to make TypeScript recognize the function signature
  export function getReactNativePersistence(storage: typeof ReactNativeAsyncStorage): any;
}
