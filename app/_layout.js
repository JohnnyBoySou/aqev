import React, {useState, useEffect} from 'react';
import dark from '../constants/dark'
import light from '../constants/light'
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native'
import { ThemeProvider } from 'styled-components/native';
export {
  ErrorBoundary,
} from 'expo-router';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Font_Book: require('../assets/fonts/Circular_Book.ttf'),
    Font_Medium: require('../assets/fonts/Circular_Medium.ttf'),
    Font_Bold: require('@/assets/fonts/Circular_Bold.ttf'),
    Font_Black: require('@/assets/fonts/Circular_Black.ttf'),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  
  return <RootLayoutMain />
}


function RootLayoutMain() {
  const colorScheme = useColorScheme();
  return (
    
    <ThemeProvider theme={colorScheme === "dark" ? dark : light}>
      <Stack screenOptions={{headerShown: false,  }}>
        <Stack.Screen name="reels/index"  />
      </Stack>
    </ThemeProvider>
  );
}