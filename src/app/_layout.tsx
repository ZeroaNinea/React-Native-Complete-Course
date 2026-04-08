import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { Stack, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { useColorScheme } from 'react-native';

import { AuthProvider, useAuth } from '@/context/AuthContext';

// import { AnimatedSplashOverlay } from '@/components/animated-icon';
// import AppTabs from '@/components/app-tabs';

function RouteGuard() {
  return (
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
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const { user } = useAuth();

  let isAuth = false;

  useEffect(() => {
    if (!isAuth) {
      router.replace('/(auth)/login');
    } else {
      router.replace('/(tabs)/home');
    }
  });

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {/* <AnimatedSplashOverlay /> */}
      {/* <AppTabs /> */}
      <AuthProvider>
        <RouteGuard />
      </AuthProvider>
    </ThemeProvider>
  );
}
