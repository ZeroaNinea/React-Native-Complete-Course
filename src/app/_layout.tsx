import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import React, { useEffect } from 'react';
import { useColorScheme } from 'react-native';

import { Stack, useRouter } from 'expo-router';

// import { AnimatedSplashOverlay } from '@/components/animated-icon';
// import AppTabs from '@/components/app-tabs';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  let isAuth = false;

  useEffect(() => {
    if (!isAuth) {
      router.replace('/(auth)/login');
    } else {
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(auth)" />
      </Stack>;
    }
  });

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {/* <AnimatedSplashOverlay /> */}
      {/* <AppTabs /> */}
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: 'cornflowerblue' },
          headerTintColor: 'white',
          animation: 'slide_from_right',
          headerShown: false,
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(auth)" />
      </Stack>
    </ThemeProvider>
  );
}
