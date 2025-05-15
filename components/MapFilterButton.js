// components/MapFilterButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../context/ThemeContext';

const MapFilterButton = ({ onPress, filterActive }) => {
  return (
    <TouchableOpacity 
      style={styles.filterButton}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Ionicons name="options-outline" size={18} color="white" />
      <Text style={styles.filterText}>
        {filterActive ? '↓↑ Filtra' : '⋮↕ Filtra'}
      </Text>
      
      {filterActive && (
        <TouchableOpacity 
          style={styles.closeButton}
          onPress={onPress}
        >
          <Ionicons name="close" size={20} color="white" />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(26, 27, 38, 0.7)',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: 20,
    alignSelf: 'center',
  },
  filterText: {
    color: 'white',
    fontSize: theme.typography.fontSizes.sm,
    marginLeft: theme.spacing.xs,
  },
  closeButton: {
    marginLeft: theme.spacing.sm,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  }
});

export default MapFilterButton;