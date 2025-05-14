import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { events, vendors } from '../data/mockData';
import CardEvento from '../components/CardEvento';
import { theme } from '../context/ThemeContext';

// In a real app, this would be fetched from AsyncStorage or Firestore
const initialFavorites = {
  events: [],
  vendors: [],
  products: []
};

const FavoritesScreen = ({ userLocation }) => {
  const navigation = useNavigation();
  const [favorites, setFavorites] = useState(initialFavorites);
  const [activeTab, setActiveTab] = useState('events');
  const [favoriteEvents, setFavoriteEvents] = useState([]);
  const [favoriteVendors, setFavoriteVendors] = useState([]);
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  
  // For demo purposes, let's add some items to favorites
  useEffect(() => {
    // Add two random events to favorites
    const demoFavoriteEvents = [events[0].id, events[3].id];
    // Add a vendor to favorites
    const demoFavoriteVendors = ['v1'];
    // Add some products to favorites
    const demoFavoriteProducts = [
      vendors.v1.products[0].id,
      vendors.v2.products[0].id
    ];
    
    setFavorites({
      events: demoFavoriteEvents,
      vendors: demoFavoriteVendors,
      products: demoFavoriteProducts
    });
  }, []);
  
  // Load favorite items based on IDs
  useEffect(() => {
    // Load favorite events
    const eventsData = events.filter(event => 
      favorites.events.includes(event.id)
    );
    setFavoriteEvents(eventsData);
    
    // Load favorite vendors
    const vendorsData = Object.values(vendors).filter(vendor => 
      favorites.vendors.includes(vendor.id)
    );
    setFavoriteVendors(vendorsData);
    
    // Load favorite products
    const productsData = [];
    Object.values(vendors).forEach(vendor => {
      vendor.products.forEach(product => {
        if (favorites.products.includes(product.id)) {
          productsData.push({
            ...product,
            vendorId: vendor.id,
            vendorName: vendor.name
          });
        }
      });
    });
    setFavoriteProducts(productsData);
  }, [favorites]);
  
  const handleEventPress = (event) => {
    navigation.navigate('DetailScreen', { eventId: event.id });
  };
  
  const handleVendorPress = (vendor) => {
    // In a real app, we'd need to determine which event this vendor is associated with
    navigation.navigate('VendorScreen', { vendorId: vendor.id });
  };
  
  const handleProductPress = (product) => {
    navigation.navigate('VendorScreen', { vendorId: product.vendorId });
  };
  
  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Ionicons 
        name={activeTab === 'events' ? 'calendar-outline' : 
              activeTab === 'vendors' ? 'storefront-outline' : 'cart-outline'} 
        size={64} 
        color={theme.colors.textSecondary} 
      />
      <Text style={styles.emptyText}>
        Nessun {activeTab === 'events' ? 'evento' : 
                activeTab === 'vendors' ? 'venditore' : 'prodotto'} 
        tra i preferiti
      </Text>
      <TouchableOpacity 
        style={styles.exploreButton}
        onPress={() => navigation.navigate('Esplora')}
      >
        <Text style={styles.exploreButtonText}>
          Esplora
        </Text>
      </TouchableOpacity>
    </View>
  );
  
  const renderEventItem = ({ item }) => (
    <CardEvento event={item} onPress={handleEventPress} />
  );
  
  const renderVendorItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.vendorItem}
      onPress={() => handleVendorPress(item)}
    >
      <Text style={styles.vendorName}>{item.name}</Text>
      <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
    </TouchableOpacity>
  );
  
  const renderProductItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.productItem}
      onPress={() => handleProductPress(item)}
    >
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.vendorName}>{item.vendorName}</Text>
        <Text style={styles.productPrice}>€{item.price.toFixed(2)}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
    </TouchableOpacity>
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>I tuoi preferiti</Text>
      </View>
      
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[
            styles.tab, 
            activeTab === 'events' && styles.activeTab
          ]}
          onPress={() => setActiveTab('events')}
        >
          <Text 
            style={[
              styles.tabText, 
              activeTab === 'events' && styles.activeTabText
            ]}
          >
            Eventi
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.tab, 
            activeTab === 'vendors' && styles.activeTab
          ]}
          onPress={() => setActiveTab('vendors')}
        >
          <Text 
            style={[
              styles.tabText, 
              activeTab === 'vendors' && styles.activeTabText
            ]}
          >
            Venditori
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.tab, 
            activeTab === 'products' && styles.activeTab
          ]}
          onPress={() => setActiveTab('products')}
        >
          <Text 
            style={[
              styles.tabText, 
              activeTab === 'products' && styles.activeTabText
            ]}
          >
            Prodotti
          </Text>
        </TouchableOpacity>
      </View>
      
      {activeTab === 'events' && (
        <FlatList
          data={favoriteEvents}
          keyExtractor={(item) => item.id}
          renderItem={renderEventItem}
          contentContainerStyle={
            favoriteEvents.length === 0 ? styles.emptyListContent : styles.listContent
          }
          ListEmptyComponent={renderEmptyState}
        />
      )}
      
      {activeTab === 'vendors' && (
        <FlatList
          data={favoriteVendors}
          keyExtractor={(item) => item.id}
          renderItem={renderVendorItem}
          contentContainerStyle={
            favoriteVendors.length === 0 ? styles.emptyListContent : styles.listContent
          }
          ListEmptyComponent={renderEmptyState}
        />
      )}
      
      {activeTab === 'products' && (
        <FlatList
          data={favoriteProducts}
          keyExtractor={(item) => item.id}
          renderItem={renderProductItem}
          contentContainerStyle={
            favoriteProducts.length === 0 ? styles.emptyListContent : styles.listContent
          }
          ListEmptyComponent={renderEmptyState}
        />
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
  },
  headerTitle: {
    fontSize: theme.typography.fontSizes.xl,
    fontWeight: theme.typography.fontWeights.bold,
    color: theme.colors.text,
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  tab: {
    flex: 1,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.primary,
  },
  tabText: {
    fontSize: theme.typography.fontSizes.md,
    color: theme.colors.textSecondary,
  },
  activeTabText: {
    color: theme.colors.primary,
    fontWeight: theme.typography.fontWeights.bold,
  },
  listContent: {
    paddingVertical: theme.spacing.md,
  },
  emptyListContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  emptyContainer: {
    alignItems: 'center',
  },
  emptyText: {
    fontSize: theme.typography.fontSizes.lg,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.lg,
    textAlign: 'center',
  },
  exploreButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
  },
  exploreButtonText: {
    color: 'white',
    fontSize: theme.typography.fontSizes.md,
    fontWeight: theme.typography.fontWeights.medium,
  },
  vendorItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.md,
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.md,
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.md,
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.md,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: theme.typography.fontSizes.md,
    fontWeight: theme.typography.fontWeights.medium,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  vendorName: {
    fontSize: theme.typography.fontSizes.sm,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  productPrice: {
    fontSize: theme.typography.fontSizes.md,
    fontWeight: theme.typography.fontWeights.bold,
    color: theme.colors.primary,
  },
});

export default FavoritesScreen;