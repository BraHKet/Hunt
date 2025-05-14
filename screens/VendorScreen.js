import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  Image, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView,
  Alert 
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { events, vendors } from '../data/mockData';
import { theme } from '../context/ThemeContext';

const ProductCard = ({ product, onToggleFavorite, onReserve, isFavorite }) => {
  return (
    <View style={styles.productCard}>
      <Image 
        source={{ uri: product.image }} 
        style={styles.productImage}
        resizeMode="cover"
      />
      
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>
          {product.name}
        </Text>
        <Text style={styles.productPrice}>
          €{product.price.toFixed(2)}
        </Text>
        
        <View style={styles.productActions}>
          <TouchableOpacity 
            style={styles.actionButton} 
            onPress={() => onToggleFavorite(product.id)}
          >
            <Ionicons 
              name={isFavorite ? "heart" : "heart-outline"} 
              size={24} 
              color={isFavorite ? theme.colors.primary : theme.colors.textSecondary} 
            />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.reserveButton]} 
            onPress={() => onReserve(product)}
          >
            <Ionicons name="mail-outline" size={20} color="white" />
            <Text style={styles.reserveButtonText}>Prenota</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const VendorScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { vendorId, eventId } = route.params;
  
  const [vendor, setVendor] = useState(null);
  const [event, setEvent] = useState(null);
  const [favorites, setFavorites] = useState([]);
  
  useEffect(() => {
    // Get vendor data
    if (vendors[vendorId]) {
      setVendor(vendors[vendorId]);
    }
    
    // Get event data
    if (eventId) {
      const foundEvent = events.find(e => e.id === eventId);
      if (foundEvent) {
        setEvent(foundEvent);
      }
    }
  }, [vendorId, eventId]);
  
  const handleGoBack = () => {
    navigation.goBack();
  };
  
  const toggleFavorite = (productId) => {
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter(id => id !== productId));
    } else {
      setFavorites([...favorites, productId]);
    }
    // In a real app, you'd persist this to AsyncStorage or Firestore
  };
  
  const handleReserve = (product) => {
    Alert.alert(
      "Prenotazione",
      `Vuoi prenotare ${product.name} per €${product.price.toFixed(2)}?`,
      [
        {
          text: "Annulla",
          style: "cancel"
        },
        { 
          text: "Conferma", 
          onPress: () => {
            // In a real app, you'd handle the reservation logic
            Alert.alert(
              "Prenotazione confermata",
              "Il venditore è stato notificato della tua prenotazione. Riceverai presto una conferma."
            );
          }
        }
      ]
    );
  };
  
  if (!vendor) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Caricamento...</Text>
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={handleGoBack}
        >
          <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {vendor.name}
          </Text>
          {event && (
            <Text style={styles.headerSubtitle} numberOfLines={1}>
              @ {event.title}
            </Text>
          )}
        </View>
      </View>
      
      <View style={styles.vendorInfoContainer}>
        <Image 
          source={{ uri: vendor.image }} 
          style={styles.vendorImage}
          resizeMode="cover"
        />
        
        <View style={styles.vendorInfo}>
          <Text style={styles.vendorName}>{vendor.name}</Text>
          <Text style={styles.vendorDescription}>
            {vendor.description}
          </Text>
        </View>
      </View>
      
      <Text style={styles.sectionTitle}>
        Prodotti ({vendor.products.length})
      </Text>
      
      <FlatList
        data={vendor.products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductCard 
            product={item} 
            onToggleFavorite={toggleFavorite}
            onReserve={handleReserve}
            isFavorite={favorites.includes(item.id)}
          />
        )}
        numColumns={2}
        contentContainerStyle={styles.productsGrid}
        showsVerticalScrollIndicator={false}
      />
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  backButton: {
    marginRight: theme.spacing.md,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: theme.typography.fontSizes.lg,
    fontWeight: theme.typography.fontWeights.bold,
    color: theme.colors.text,
  },
  headerSubtitle: {
    fontSize: theme.typography.fontSizes.sm,
    color: theme.colors.primary,
  },
  vendorInfoContainer: {
    flexDirection: 'row',
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  vendorImage: {
    width: 80,
    height: 80,
    borderRadius: theme.borderRadius.md,
  },
  vendorInfo: {
    flex: 1,
    marginLeft: theme.spacing.md,
  },
  vendorName: {
    fontSize: theme.typography.fontSizes.lg,
    fontWeight: theme.typography.fontWeights.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  vendorDescription: {
    fontSize: theme.typography.fontSizes.sm,
    color: theme.colors.textSecondary,
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSizes.lg,
    fontWeight: theme.typography.fontWeights.bold,
    color: theme.colors.text,
    marginVertical: theme.spacing.md,
    marginHorizontal: theme.spacing.md,
  },
  productsGrid: {
    padding: theme.spacing.sm,
  },
  productCard: {
    flex: 1,
    margin: theme.spacing.sm,
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
    ...theme.shadows.light,
  },
  productImage: {
    width: '100%',
    height: 150,
  },
  productInfo: {
    padding: theme.spacing.md,
  },
  productName: {
    fontSize: theme.typography.fontSizes.md,
    fontWeight: theme.typography.fontWeights.medium,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
    height: 42, // Approx. 2 lines of text
  },
  productPrice: {
    fontSize: theme.typography.fontSizes.md,
    fontWeight: theme.typography.fontWeights.bold,
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
  },
  productActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionButton: {
    padding: theme.spacing.xs,
  },
  reserveButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
    flexDirection: 'row',
    alignItems: 'center',
  },
  reserveButtonText: {
    marginLeft: theme.spacing.xs,
    color: 'white',
    fontSize: theme.typography.fontSizes.sm,
    fontWeight: theme.typography.fontWeights.medium,
  },
});

export default VendorScreen;