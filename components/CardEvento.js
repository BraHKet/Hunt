import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './CardEvento.styles';
import { useTheme } from '../context/ThemeContext';

const CardEvento = ({ event, onPress }) => {
  const theme = useTheme();
  
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={() => onPress(event)}
      activeOpacity={0.8}
    >
      <View style={styles.card}>
        {/* Left Side - Image */}
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: event.image }} 
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.distanceContainer}>
            <Text style={styles.distanceText}>
              {event.location.distanceKm.toFixed(1)}km
            </Text>
          </View>
          
          {event.featured && (
            <View style={styles.featuredBadge}>
              <Text style={styles.featuredText}>In evidenza</Text>
            </View>
          )}
        </View>
        
        {/* Right Side - Content */}
        <View style={styles.contentContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {event.title}
          </Text>
          
          <View style={styles.infoRow}>
            <View style={styles.iconTextContainer}>
              <Ionicons 
                name="time-outline" 
                size={16} 
                color={theme.colors.textSecondary} 
              />
              <Text style={styles.infoText}>{event.time}</Text>
            </View>
            
            <View style={styles.iconTextContainer}>
              <Ionicons 
                name="location-outline" 
                size={16} 
                color={theme.colors.textSecondary} 
              />
              <Text style={styles.infoText}>{event.location.name}</Text>
            </View>
          </View>
          
          <View style={styles.chevronContainer}>
            <Ionicons 
              name="chevron-forward" 
              size={20} 
              color={theme.colors.textSecondary} 
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardEvento;