import { Box, Center, Text } from '@gluestack-ui/themed';
import React from 'react';

export default function HomeScreen() {
  return (
    <Box flex={1} justifyContent="center" alignItems="center" bg="$backgroundLight0">
      <Center>
        <Text size="2xl" color="$textLight900">
          Chore App with Expo Router!
        </Text>
        <Text color="$textLight700">This is app/index.tsx</Text>
      </Center>
    </Box>
  );
}