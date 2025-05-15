// Modifica App.js per includere SafeAreaProvider correttamente

import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from './context/ThemeContext';
import BottomTabs from './navigation/BottomTabs';
import OnboardingScreen from './screens/OnboardingScreen';
import * as Location from 'expo-location';

export default function App() {
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    (async () => {
      // Check if user has already completed onboarding
      // In a real app, you'd check AsyncStorage here
      
      // Request location permissions
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        let location = await Location.getCurrentPositionAsync({});
        setUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      }
    })();
  }, []);

  const completeOnboarding = (location) => {
    if (location) {
      setUserLocation(location);
    }
    setIsOnboarded(true);
    // In a real app, you'd save this to AsyncStorage
  };

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <NavigationContainer>
          <StatusBar style="light" />
          {!isOnboarded ? (
            <OnboardingScreen 
              userLocation={userLocation} 
              onComplete={completeOnboarding} 
            />
          ) : (
            <BottomTabs userLocation={userLocation} />
          )}
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}