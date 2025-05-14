import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Dimensions,
  Platform,
  SafeAreaView
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { events } from '../data/mockData';
import { theme } from '../context/ThemeContext';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const MapScreen = ({ userLocation }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const mapRef = useRef(null);
  
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [region, setRegion] = useState({
    latitude: userLocation?.latitude || 40.351,
    longitude: userLocation?.longitude || 18.1719,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  
  // Check if a specific event was requested
  useEffect(() => {
    if (route.params?.eventId) {
      const event = events.find(e => e.id === route.params.eventId);
      if (event) {
        setSelectedEvent(event);
        setRegion({
          latitude: event.location.latitude,
          longitude: event.location.longitude,
          latitudeDelta: LATITUDE_DELTA * 0.5, // Zoom in a bit
          longitudeDelta: LONGITUDE_DELTA * 0.5,
        });
      }
    }
  }, [route.params]);
  
  // Center map on user location
  const centerOnUser = async () => {
    if (userLocation) {
      mapRef.current?.animateToRegion({
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      });
    } else {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          return;
        }
        
        const location = await Location.getCurrentPositionAsync({});
        const newRegion = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        };
        
        setRegion(newRegion);
        mapRef.current?.animateToRegion(newRegion);
      } catch (error) {
        console.error('Error getting location:', error);
      }
    }
  };
  
  const handleMarkerPress = (event) => {
    setSelectedEvent(event);
  };
  
  const handleCalloutPress = (event) => {
    navigation.navigate('DetailScreen', { eventId: event.id });
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {selectedEvent ? selectedEvent.title : 'Mappa Eventi'}
        </Text>
      </View>
      
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={region}
        provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : null}
        showsUserLocation
        showsMyLocationButton={false}
      >
        {events.map((event) => (
          <Marker
            key={event.id}
            coordinate={{
              latitude: event.location.latitude,
              longitude: event.location.longitude,
            }}
            title={event.title}
            description={`${event.time} - ${event.location.name}`}
            pinColor={event.featured ? theme.colors.highlight : theme.colors.primary}
            onPress={() => handleMarkerPress(event)}
          >
            <Callout onPress={() => handleCalloutPress(event)}>
              <View style={styles.callout}>
                <Text style={styles.calloutTitle}>{event.title}</Text>
                <Text style={styles.calloutInfo}>{event.time} - {event.location.name}</Text>
                <Text style={styles.calloutAction}>Tocca per i dettagli</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
      
      {/* User location button */}
      <TouchableOpacity 
        style={styles.myLocationButton}
        onPress={centerOnUser}
      >
        <Ionicons name="locate" size={24} color={theme.colors.primary} />
      </TouchableOpacity>
      
      {/* Selected event info panel */}
      {selectedEvent && (
        <View style={styles.eventPanel}>
          <View style={styles.eventInfo}>
            <Text style={styles.eventTitle}>{selectedEvent.title}</Text>
            <Text style={styles.eventDetails}>
              {selectedEvent.time} · {selectedEvent.location.name} · {selectedEvent.location.distanceKm.toFixed(1)}km
            </Text>
          </View>
          
          <TouchableOpacity 
            style={styles.viewDetailsButton}
            onPress={() => navigation.navigate('DetailScreen', { eventId: selectedEvent.id })}
          >
            <Text style={styles.viewDetailsText}>Dettagli</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    backgroundColor: theme.colors.background,
  },
  headerTitle: {
    fontSize: theme.typography.fontSizes.lg,
    fontWeight: theme.typography.fontWeights.bold,
    color: theme.colors.text,
    textAlign: 'center',
  },
  map: {
    flex: 1,
  },
  myLocationButton: {
    position: 'absolute',
    top: 100,
    right: theme.spacing.md,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.medium,
  },
  callout: {
    width: 200,
    padding: theme.spacing.sm,
  },
  calloutTitle: {
    fontSize: theme.typography.fontSizes.md,
    fontWeight: theme.typography.fontWeights.bold,
    marginBottom: theme.spacing.xs,
  },
  calloutInfo: {
    fontSize: theme.typography.fontSizes.sm,
    color: '#777',
    marginBottom: theme.spacing.xs,
  },
  calloutAction: {
    fontSize: theme.typography.fontSizes.sm,
    color: theme.colors.primary,
    fontWeight: theme.typography.fontWeights.medium,
  },
  eventPanel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.card,
    padding: theme.spacing.md,
    borderTopLeftRadius: theme.borderRadius.lg,
    borderTopRightRadius: theme.borderRadius.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...theme.shadows.medium,
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: theme.typography.fontSizes.lg,
    fontWeight: theme.typography.fontWeights.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  eventDetails: {
    fontSize: theme.typography.fontSizes.sm,
    color: theme.colors.textSecondary,
  },
  viewDetailsButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
  },
  viewDetailsText: {
    color: 'white',
    fontWeight: theme.typography.fontWeights.medium,
  },
});

export default MapScreen;