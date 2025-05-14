import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ScrollView, 
  Linking, 
  SafeAreaView 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../context/ThemeContext';

const AboutScreen = () => {
  const handleOpenLink = (url) => {
    Linking.openURL(url);
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Informazioni</Text>
        </View>
        
        <View style={styles.appInfo}>
          <View style={styles.logoContainer}>
            <Text style={styles.logo}>Hunt</Text>
          </View>
          <Text style={styles.version}>Versione 1.0.0</Text>
          <Text style={styles.tagline}>Trova eventi vicino a te</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Chi siamo</Text>
          <Text style={styles.sectionText}>
            Hunt è un'app che ti aiuta a scoprire eventi, mercatini e prodotti locali nelle tue vicinanze. 
            Esplora gli eventi, trova nuovi venditori e prodotti, e non perderti mai più un evento interessante vicino a te.
          </Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Funzionalità</Text>
          
          <View style={styles.featureItem}>
            <Ionicons name="compass-outline" size={24} color={theme.colors.primary} />
            <View style={styles.featureTextContainer}>
              <Text style={styles.featureTitle}>Esplora eventi vicini</Text>
              <Text style={styles.featureText}>
                Trova eventi nelle tue vicinanze con informazioni dettagliate su orari, luoghi e venditori partecipanti.
              </Text>
            </View>
          </View>
          
          <View style={styles.featureItem}>
            <Ionicons name="heart-outline" size={24} color={theme.colors.primary} />
            <View style={styles.featureTextContainer}>
              <Text style={styles.featureTitle}>Salva i tuoi preferiti</Text>
              <Text style={styles.featureText}>
                Segna come preferiti gli eventi, i venditori e i prodotti che ti interessano per ritrovarli facilmente.
              </Text>
            </View>
          </View>
          
          <View style={styles.featureItem}>
            <Ionicons name="map-outline" size={24} color={theme.colors.primary} />
            <View style={styles.featureTextContainer}>
              <Text style={styles.featureTitle}>Visualizza sulla mappa</Text>
              <Text style={styles.featureText}>
                Vedi tutti gli eventi sulla mappa per trovare facilmente quelli più vicini a te.
              </Text>
            </View>
          </View>
          
          <View style={styles.featureItem}>
            <Ionicons name="calendar-outline" size={24} color={theme.colors.primary} />
            <View style={styles.featureTextContainer}>
              <Text style={styles.featureTitle}>Gestisci i tuoi eventi</Text>
              <Text style={styles.featureText}>
                Tieni traccia degli eventi a cui hai partecipato e di quelli che hai pianificato di visitare.
              </Text>
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contatti</Text>
          
          <TouchableOpacity 
            style={styles.contactItem}
            onPress={() => handleOpenLink('mailto:info@huntapp.com')}
          >
            <Ionicons name="mail-outline" size={24} color={theme.colors.primary} />
            <Text style={styles.contactText}>info@huntapp.com</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.contactItem}
            onPress={() => handleOpenLink('https://www.huntapp.com')}
          >
            <Ionicons name="globe-outline" size={24} color={theme.colors.primary} />
            <Text style={styles.contactText}>www.huntapp.com</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.contactItem}
            onPress={() => handleOpenLink('https://www.instagram.com/huntapp')}
          >
            <Ionicons name="logo-instagram" size={24} color={theme.colors.primary} />
            <Text style={styles.contactText}>@huntapp</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy</Text>
          <TouchableOpacity 
            style={styles.linkButton}
            onPress={() => handleOpenLink('https://www.huntapp.com/privacy')}
          >
            <Text style={styles.linkButtonText}>Leggi la nostra Privacy Policy</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.linkButton, { marginTop: theme.spacing.md }]}
            onPress={() => handleOpenLink('https://www.huntapp.com/terms')}
          >
            <Text style={styles.linkButtonText}>Termini e Condizioni</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2025 Hunt App. Tutti i diritti riservati.</Text>
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
  appInfo: {
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  version: {
    fontSize: theme.typography.fontSizes.md,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  tagline: {
    fontSize: theme.typography.fontSizes.lg,
    fontWeight: theme.typography.fontWeights.medium,
    color: theme.colors.text,
  },
  section: {
    padding: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSizes.xl,
    fontWeight: theme.typography.fontWeights.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  sectionText: {
    fontSize: theme.typography.fontSizes.md,
    color: theme.colors.textSecondary,
    lineHeight: 22,
  },
  featureItem: {
    flexDirection: 'row',
    marginBottom: theme.spacing.md,
  },
  featureTextContainer: {
    flex: 1,
    marginLeft: theme.spacing.md,
  },
  featureTitle: {
    fontSize: theme.typography.fontSizes.md,
    fontWeight: theme.typography.fontWeights.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  featureText: {
    fontSize: theme.typography.fontSizes.sm,
    color: theme.colors.textSecondary,
    lineHeight: 20,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  contactText: {
    fontSize: theme.typography.fontSizes.md,
    color: theme.colors.text,
    marginLeft: theme.spacing.md,
  },
  linkButton: {
    backgroundColor: theme.colors.card,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
  },
  linkButtonText: {
    fontSize: theme.typography.fontSizes.md,
    color: theme.colors.primary,
    fontWeight: theme.typography.fontWeights.medium,
  },
  footer: {
    padding: theme.spacing.lg,
    alignItems: 'center',
  },
  footerText: {
    fontSize: theme.typography.fontSizes.sm,
    color: theme.colors.textSecondary,
  },
});

export default AboutScreen;