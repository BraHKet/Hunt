// components/CustomMarker.js
import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { theme } from '../context/ThemeContext';

const CustomMarker = ({ isFeatured }) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  
  useEffect(() => {
    if (isFeatured) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.3,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [isFeatured]);
  
  return (
    <View style={styles.container}>
      {isFeatured && (
        <Animated.View 
          style={[
            styles.pulseEffect, 
            { 
              transform: [{ scale: pulseAnim }],
              backgroundColor: theme.colors.primary,
            }
          ]} 
        />
      )}
      <View 
        style={[
          styles.markerDot, 
          isFeatured ? styles.featuredMarker : styles.regularMarker
        ]} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
  },
  markerDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
  },
  regularMarker: {
    backgroundColor: 'white',
    borderColor: 'white',
  },
  featuredMarker: {
    backgroundColor: theme.colors.primary,
    borderColor: 'white',
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  pulseEffect: {
    position: 'absolute',
    width: 36,
    height: 36,
    borderRadius: 18,
    opacity: 0.4,
  },
});

export default CustomMarker;