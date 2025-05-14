import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  Image, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView 
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';
import { events, getVendorsByEvent } from '../data/mockData';
import VendorCard from '../components/VendorCard';
import { theme } from '../context/ThemeContext';

const DetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { eventId } = route.params;
  
  const [event, setEvent] = useState(null);
  const [vendors, setVendors] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  
  useEffect(() => {
    // Find the event by ID
    const foundEvent = events.find(e => e.id === eventId);
    if (foundEvent) {
      setEvent(foundEvent);
      
      // Get vendors for this event
      const eventVendors = getVendorsByEvent(eventId);
      setVendors(eventVendors);
    }
  }, [eventId]);
  
  const handleGoBack = () => {
    navigation.goBack();
  };
  
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // In a real app, you'd persist this to AsyncStorage or Firestore
  };
  
  const handleVendorPress = (vendor) => {
    navigation.navigate('VendorScreen', { 
      vendorId: vendor.id,
      eventId: eventId
    });
  };
  
  if (!event) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Caricamento...</Text>
      </SafeAreaView>
    );
  }
  
  const formattedDate = format(event.date, 'EEEE d MMMM', { locale: it });
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Image */}
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: event.image }} 
            style={styles.headerImage}
            resizeMode="cover"
          />
          
          {/* Back button */}
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={handleGoBack}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          
          {/* Favorite button */}
          <TouchableOpacity 
            style={styles.favoriteButton} 
            onPress={toggleFavorite}
          >
            <Ionicons 
              name={isFavorite ? "heart" : "heart-outline"} 
              size={24} 
              color={isFavorite ? theme.colors.primary : "white"} 
            />
          </TouchableOpacity>
        </View>
        
        {/* Event Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{event.title}</Text>
          <Text style={styles.organizer}>{event.organizerName}</Text>
          
          <View style={styles.eventDetails}>
            <View style={styles.detailItem}>
              <Ionicons name="calendar-outline" size={20} color={theme.colors.textSecondary} />
              <Text style={styles.detailText}>
                {formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)}
              </Text>
            </View>
            
            <View style={styles.detailItem}>
              <Ionicons name="time-outline" size={20} color={theme.colors.textSecondary} />
              <Text style={styles.detailText}>{event.time}</Text>
            </View>
            
            <View style={styles.detailItem}>
              <Ionicons name="location-outline" size={20} color={theme.colors.textSecondary} />
              <Text style={styles.detailText}>{event.location.name}</Text>
            </View>
          </View>
          
          <View style={styles.tagsContainer}>
            {event.tags.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
          
          <Text style={styles.description}>{event.description}</Text>
          
          {/* Map Preview */}
          <TouchableOpacity 
            style={styles.mapPreview} 
            onPress={() => navigation.navigate('MapScreen', { eventId })}
          >
            <View style={styles.mapPlaceholder}>
              <Ionicons name="map-outline" size={32} color={theme.colors.textSecondary} />
              <Text style={styles.mapText}>Visualizza sulla mappa</Text>
            </View>
          </TouchableOpacity>
          
          {/* Vendors Section */}
          {vendors.length > 0 && (
            <View style={styles.vendorsSection}>
              <Text style={styles.sectionTitle}>Venditori</Text>
              
              <View style={styles.vendorsList}>
                {vendors.map((vendor) => (
                  <VendorCard 
                    key={vendor.id} 
                    vendor={vendor} 
                    onPress={handleVendorPress} 
                  />
                ))}
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  loadingText: {
    color: theme.colors.text,
    fontSize: theme.typography.fontSizes.lg,
  },
  imageContainer: {
    position: 'relative',
    height: 250,
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: theme.spacing.md,
    left: theme.spacing.md,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButton: {
    position: 'absolute',
    top: theme.spacing.md,
    right: theme.spacing.md,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    padding: theme.spacing.lg,
  },
  title: {
    fontSize: theme.typography.fontSizes.xxl,
    fontWeight: theme.typography.fontWeights.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  organizer: {
    fontSize: theme.typography.fontSizes.md,
    color: theme.colors.primary,
    marginBottom: theme.spacing.md,
  },
  eventDetails: {
    marginBottom: theme.spacing.md,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  detailText: {
    marginLeft: theme.spacing.sm,
    fontSize: theme.typography.fontSizes.md,
    color: theme.colors.textSecondary,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: theme.spacing.md,
  },
  tag: {
    backgroundColor: theme.colors.card,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
    marginRight: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  tagText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.fontSizes.sm,
  },
  description: {
    fontSize: theme.typography.fontSizes.md,
    lineHeight: 22,
    color: theme.colors.text,
    marginBottom: theme.spacing.lg,
  },
  mapPreview: {
    marginBottom: theme.spacing.lg,
  },
  mapPlaceholder: {
    height: 150,
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapText: {
    marginTop: theme.spacing.sm,
    color: theme.colors.text,
    fontSize: theme.typography.fontSizes.md,
  },
  vendorsSection: {
    marginTop: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSizes.xl,
    fontWeight: theme.typography.fontWeights.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  vendorsList: {
    marginHorizontal: -theme.spacing.lg,
  },
});

export default DetailScreen;