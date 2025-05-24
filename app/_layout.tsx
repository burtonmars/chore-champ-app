import { config } from '@gluestack-ui/config';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { Slot } from 'expo-router';
import React from 'react';
import "../global.css";

export default function RootLayout() {
  return (
    <GluestackUIProvider config={config}>
      {/* Slot will render the active child screen (e.g., index.tsx) */}
      <Slot />
    </GluestackUIProvider>
  );
}