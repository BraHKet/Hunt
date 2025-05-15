// screens/MapScreen.native.js - Utilizzando il componente MapMarker separato
import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Dimensions,
  Platform,
  Alert,
  Image
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker, Callout, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { SafeAreaView } from 'react-native-safe-area-context';
import { events } from '../data/mockData';
import { theme } from '../context/ThemeContext';
import mapStyles from '../styles/mapStyles';
import MapMarker from '../components/MapMarker';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.25;
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
  const [mapReady, setMapReady] = useState(false);
  const [error, setError] = useState(null);
  const [filterActive, setFilterActive] = useState(false);
  
  // Check if a specific event was requested
  useEffect(() => {
    if (route.params?.eventId) {
      const event = events.find(e => e.id === route.params.eventId);
      if (event) {
        setSelectedEvent(event);
        setRegion({
          latitude: event.location.latitude,
          longitude: event.location.longitude,
          latitudeDelta: LATITUDE_DELTA * 0.5,
          longitudeDelta: LONGITUDE_DELTA * 0.5,
        });
      }
    }
  }, [route.params]);
  
  // Handle map load error
  const handleMapError = (error) => {
    console.error("Map error:", error);
    setError("Errore nel caricamento della mappa. Verifica la connessione e le autorizzazioni.");
  };
  
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
          Alert.alert(
            "Permessi di posizione",
            "Per vedere la tua posizione sulla mappa, devi consentire l'accesso alla tua posizione."
          );
          return;
        }
        
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced
        });
        
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
        Alert.alert(
          "Errore di posizione",
          "Non è stato possibile determinare la tua posizione attuale."
        );
      }
    }
  };
  
  const handleMarkerPress = (event) => {
    setSelectedEvent(event);
  };
  
  const handleCalloutPress = (event) => {
    navigation.navigate('DetailScreen', { eventId: event.id });
  };
  
  // Handle map ready state
  const onMapReady = () => {
    setMapReady(true);
    
    // Fit map to show all markers
    if (mapRef.current && events.length > 0) {
      setTimeout(() => {
        // Se c'è un evento selezionato, centra su quello
        if (selectedEvent) {
          mapRef.current.animateToRegion({
            latitude: selectedEvent.location.latitude,
            longitude: selectedEvent.location.longitude,
            latitudeDelta: LATITUDE_DELTA * 0.5,
            longitudeDelta: LONGITUDE_DELTA * 0.5,
          }, 500);
        } else {
          // Altrimenti calcola i limiti per includere tutti i marker
          const coordinates = events.map(event => ({
            latitude: event.location.latitude,
            longitude: event.location.longitude,
          }));
          
          mapRef.current.fitToCoordinates(coordinates, {
            edgePadding: { top: 100, right: 100, bottom: 200, left: 100 },
            animated: true,
          });
        }
      }, 300);
    }
  };

  // Toggle filter
  const toggleFilter = () => {
    setFilterActive(!filterActive);
  };

  // Crea linee di connessione tra eventi
  const renderEventConnections = () => {
    // Centro della mappa (Lecce)
    const centerCoords = { latitude: 40.351, longitude: 18.1719 };
    
    return events.map(event => (
      <Polyline
        key={`line-${event.id}`}
        coordinates={[
          centerCoords,
          { latitude: event.location.latitude, longitude: event.location.longitude }
        ]}
        strokeColor={theme.colors.primary}
        strokeWidth={1.5}
        lineDashPattern={[0]}
        lineJoin="round"
      />
    ));
  };
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {selectedEvent ? selectedEvent.title : 'Mappa Eventi'}
        </Text>
      </View>
      
      {error ? (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={48} color={theme.colors.error} />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={() => setError(null)}
          >
            <Text style={styles.retryButtonText}>Riprova</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={region}
            provider={PROVIDER_GOOGLE}
            showsUserLocation
            showsMyLocationButton={false}
            onMapReady={onMapReady}
            onError={handleMapError}
            customMapStyle={mapStyles.darkMapStyle}
          >
            {renderEventConnections()}
            
            {events.map((event) => (
              <Marker
                key={event.id}
                coordinate={{
                  latitude: event.location.latitude,
                  longitude: event.location.longitude,
                }}
                title={event.title}
                description={`${event.time} - ${event.location.name}`}
                onPress={() => handleMarkerPress(event)}
                tracksViewChanges={false}
              >
                <MapMarker isFeatured={event.featured} />
                
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
          
          {/* Filter button */}
          <TouchableOpacity style={styles.filterButton} onPress={toggleFilter}>
            <Ionicons name="options" size={22} color="white" />
            <Text style={styles.filterText}>
              {filterActive ? '↓↑ Filtra' : '⋮↕ Filtra'}
            </Text>
            
            {filterActive && (
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={toggleFilter}
              >
                <Ionicons name="close" size={20} color="white" />
              </TouchableOpacity>
            )}
          </TouchableOpacity>
          
          {/* Selected event info panel */}
          {selectedEvent && (
            <View style={styles.eventPanel}>
              <View style={styles.eventImageContainer}>
                {selectedEvent.image ? (
                  <Image 
                    source={{ uri: selectedEvent.image }} 
                    style={styles.eventImage}
                    resizeMode="cover"
                  />
                ) : (
                  <View style={styles.eventImagePlaceholder}>
                    <Text style={styles.eventImageText}>
                      {selectedEvent.title.charAt(0)}
                    </Text>
                  </View>
                )}
              </View>
              
              <View style={styles.eventInfo}>
                <Text style={styles.eventTitle} numberOfLines={1}>
                  {selectedEvent.title}
                </Text>
                <Text style={styles.organizerName} numberOfLines={1}>
                  {selectedEvent.organizerName}
                </Text>
                <View style={styles.eventDetailsRow}>
                  <View style={styles.eventTimeContainer}>
                    <Ionicons name="time-outline" size={16} color={theme.colors.textSecondary} />
                    <Text style={styles.eventDetailText}>{selectedEvent.time}</Text>
                  </View>
                  <View style={styles.eventLocationContainer}>
                    <Ionicons name="location-outline" size={16} color={theme.colors.textSecondary} />
                    <Text style={styles.eventDetailText}>
                      {selectedEvent.location.name}
                    </Text>
                  </View>
                </View>
              </View>
              
              <TouchableOpacity 
                style={styles.viewDetailsButton}
                onPress={() => navigation.navigate('DetailScreen', { eventId: selectedEvent.id })}
              >
                <Ionicons name="chevron-forward" size={24} color={theme.colors.primary} />
              </TouchableOpacity>
            </View>
          )}
        </>
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
    backgroundColor: theme.colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.medium,
  },
  filterButton: {
    position: 'absolute',
    top: 160,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(26, 27, 38, 0.7)',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: 20,
  },
  filterText: {
    color: 'white',
    marginLeft: theme.spacing.xs,
    fontSize: theme.typography.fontSizes.sm,
  },
  closeButton: {
    marginLeft: theme.spacing.sm,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  callout: {
    width: 200,
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.card,
  },
  calloutTitle: {
    fontSize: theme.typography.fontSizes.md,
    fontWeight: theme.typography.fontWeights.bold,
    marginBottom: theme.spacing.xs,
    color: theme.colors.text,
  },
  calloutInfo: {
    fontSize: theme.typography.fontSizes.sm,
    color: theme.colors.textSecondary,
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
    alignItems: 'center',
    ...theme.shadows.medium,
  },
  eventImageContainer: {
    marginRight: theme.spacing.md,
  },
  eventImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: theme.colors.primary,
  },
  eventImagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventImageText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: theme.typography.fontSizes.lg,
    fontWeight: theme.typography.fontWeights.bold,
    color: theme.colors.text,
    marginBottom: 2,
  },
  organizerName: {
    fontSize: theme.typography.fontSizes.sm,
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },
  eventDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  eventLocationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventDetailText: {
    fontSize: theme.typography.fontSizes.sm,
    color: theme.colors.textSecondary,
    marginLeft: 4,
  },
  viewDetailsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  errorText: {
    fontSize: theme.typography.fontSizes.lg,
    color: theme.colors.text,
    textAlign: 'center',
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  retryButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
  },
  retryButtonText: {
    color: 'white',
    fontWeight: theme.typography.fontWeights.medium,
  },
});

export default MapScreen;