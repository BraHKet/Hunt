// Modifica components/TabBar.js

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from './TabBar.styles';
import { useTheme } from '../context/ThemeContext';

const TabBar = ({ state, descriptors, navigation }) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  
  // Get the middle of the array for special center button
  const middleIndex = Math.floor(state.routes.length / 2);

  return (
    <View style={[
      styles.container,
      { paddingBottom: insets.bottom > 0 ? insets.bottom : 16 }
    ]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel || options.title || route.name;
        const isFocused = state.index === index;
        
        let iconName;
        if (route.name === 'Esplora') {
          iconName = isFocused ? 'search' : 'search-outline';
        } else if (route.name === 'Preferiti') {
          iconName = isFocused ? 'heart' : 'heart-outline';
        } else if (route.name === 'Mappa') {
          // Use map icon for the special center button
          iconName = 'map-outline';
        } else if (route.name === 'I miei eventi') {
          iconName = isFocused ? 'calendar' : 'calendar-outline';
        } else if (route.name === 'About') {
          iconName = isFocused ? 'person' : 'person-outline';
        }

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        // Special styling for center Mappa button
        if (index === middleIndex) {
          return (
            <TouchableOpacity
              key={index}
              onPress={onPress}
              style={styles.centerButton}
              accessibilityLabel={options.tabBarAccessibilityLabel}
            >
              <View style={styles.centerButtonInner}>
                <Ionicons name={iconName} size={24} color="white" />
                <Text style={styles.centerButtonText}>
                  {label}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }

        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            style={styles.tabButton}
            accessibilityLabel={options.tabBarAccessibilityLabel}
          >
            <Ionicons
              name={iconName}
              size={24}
              color={isFocused ? theme.colors.primary : theme.colors.textSecondary}
            />
            <Text
              style={[
                styles.tabButtonText,
                { color: isFocused ? theme.colors.primary : theme.colors.textSecondary }
              ]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabBar;