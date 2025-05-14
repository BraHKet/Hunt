import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { theme } from '../context/ThemeContext';

const OnboardingScreen = ({ userLocation, onComplete }) => {
  const [step, setStep] = useState(1);
  const [locationName, setLocationName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleGetLocation = async () => {
    setIsLoading(true);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        setIsLoading(false);
        return;
      }
      
      let location = await Location.getCurrentPositionAsync({});
      onComplete({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      });
    } catch (error) {
      console.error('Error getting location:', error);
      alert('Could not get your location. Please enter manually.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleManualEntry = () => {
    // In a real app, you'd geocode the location name to get coordinates
    // For this MVP, we'll just move forward
    onComplete(userLocation || { latitude: 40.351, longitude: 18.1719 }); // Default to Lecce coordinates
  };
  
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <LinearGradient
          colors={[theme.colors.primary, theme.colors.secondary]}
          style={styles.container}
        >
          <View style={styles.logoContainer}>
            <Text style={styles.logo}>Hunt</Text>
            <Text style={styles.tagline}>Trova eventi vicino a te</Text>
          </View>
          
          {step === 1 ? (
            <View style={styles.stepContainer}>
              <Text style={styles.title}>Benvenuto su Hunt</Text>
              <Text style={styles.subtitle}>
                Scopri eventi, mercatini e prodotti locali intorno a te
              </Text>
              
              <Image 
                source={{ uri: 'https://via.placeholder.com/300x200/FF458F/FFFFFF?text=Events+Near+You' }}
                style={styles.image}
              />
              
              <TouchableOpacity 
                style={styles.button}
                onPress={() => setStep(2)}
              >
                <Text style={styles.buttonText}>Inizia</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.stepContainer}>
              <Text style={styles.title}>Dove ti trovi?</Text>
              <Text style={styles.subtitle}>
                Hunt ha bisogno della tua posizione per mostrarti gli eventi più vicini a te
              </Text>
              
              <View style={styles.locationInputContainer}>
                <Ionicons name="location-outline" size={24} color="white" />
                <TextInput
                  style={styles.input}
                  placeholder="Inserisci la tua città"
                  placeholderTextColor="rgba(255, 255, 255, 0.6)"
                  value={locationName}
                  onChangeText={setLocationName}
                />
              </View>
              
              <TouchableOpacity 
                style={[styles.button, { marginBottom: 12 }]}
                onPress={handleGetLocation}
                disabled={isLoading}
              >
                <Text style={styles.buttonText}>
                  {isLoading ? 'Rilevamento...' : 'Usa la mia posizione attuale'}
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.button, styles.outlineButton]}
                onPress={handleManualEntry}
                disabled={!locationName && !userLocation}
              >
                <Text style={[styles.buttonText, styles.outlineButtonText]}>
                  Conferma posizione manuale
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </LinearGradient>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: theme.spacing.md,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: theme.spacing.xl * 2,
    marginBottom: theme.spacing.xl,
  },
  logo: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
  },
  tagline: {
    fontSize: theme.typography.fontSizes.md,
    color: 'white',
    opacity: 0.9,
  },
  stepContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: theme.spacing.xxl,
  },
  title: {
    fontSize: theme.typography.fontSizes.xxl,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: theme.typography.fontSizes.md,
    color: 'white',
    opacity: 0.9,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
    paddingHorizontal: theme.spacing.md,
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.xl,
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: theme.colors.primary,
    fontSize: theme.typography.fontSizes.md,
    fontWeight: 'bold',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'white',
  },
  outlineButtonText: {
    color: 'white',
  },
  locationInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.xl,
    width: '80%',
  },
  input: {
    flex: 1,
    height: 50,
    color: 'white',
    marginLeft: theme.spacing.sm,
    fontSize: theme.typography.fontSizes.md,
  },
});

export default OnboardingScreen;