// components/MapMarker.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../context/ThemeContext';

/**
 * Componente marker personalizzato per la mappa
 * @param {Object} props - Proprietà del componente
 * @param {boolean} props.isFeatured - Se il marker è in evidenza
 * @param {Object} props.style - Stili aggiuntivi per il marker container
 */
const MapMarker = ({ isFeatured, style }) => (
  <View style={[styles.markerContainer, style]}>
    <View style={[
      styles.marker,
      isFeatured ? styles.featuredMarker : styles.normalMarker
    ]}>
      {isFeatured && <View style={styles.markerInner} />}
    </View>
  </View>
);

const styles = StyleSheet.create({
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  marker: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  normalMarker: {
    backgroundColor: 'white',
    borderColor: 'white',
  },
  featuredMarker: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  markerInner: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#FF75A9',
    borderWidth: 2,
    borderColor: 'white',
  },
});

export default MapMarker;