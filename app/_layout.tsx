import { config as gluestackConfig } from '@gluestack-ui/config';
import { Center, GluestackUIProvider, Spinner, Text } from '@gluestack-ui/themed';
import { Slot } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import "../global.css";
import { initializeFirebaseApp } from '../src/services/firebaseService';
import { store } from '../src/store';

export default function RootLayout() {
  const [isAppReady, setIsAppReady] = useState(false);
  const [initializationError, setInitializationError] = useState<string | null>(null);

  useEffect(() => {
    try {
      initializeFirebaseApp();
      setIsAppReady(true);
    } catch (error: any) {
      console.error("RootLayout: Critical error during Firebase initialization:", error);
      setInitializationError(
        error.message || "An unexpected error occurred while starting the application."
      );
    }
  }, []); // Empty dependency array ensures this runs only once

  if (initializationError) {
    return (
      <GluestackUIProvider config={gluestackConfig}>
        <Center flex={1} bg="$backgroundLight0" p="$4">
          <Text color="$error700" size="xl" fontWeight="bold" mb="$2">
            Application Error
          </Text>
          <Text color="$textLight700" textAlign="center">
            Could not initialize essential services. Please try restarting the app.
          </Text>
          {/* show detailed error in development mode only */}
          {__DEV__ && initializationError && (
            <Text size="xs" color="$textLight500" mt="$4" fontStyle="italic">
              Details: {initializationError}
            </Text>
          )}
        </Center>
      </GluestackUIProvider>
    );
  }

  if (!isAppReady) {
    return (
      <GluestackUIProvider config={gluestackConfig}>
        <Center flex={1} bg="$backgroundLight0">
          <Spinner size="large" />
          <Text mt="$2" color="$textLight700">
            Initializing App...
          </Text>
        </Center>
      </GluestackUIProvider>
    );
  }

  return (
    <ReduxProvider store={store}>
      <GluestackUIProvider config={gluestackConfig}>
        <Slot />
      </GluestackUIProvider>
    </ReduxProvider>
  );
}