import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './VendorCard.styles';

const VendorCard = ({ vendor, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(vendor)}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: vendor.image }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.name} numberOfLines={1}>
          {vendor.name}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {vendor.description}
        </Text>
        <View style={styles.productCount}>
          <Text style={styles.productCountText}>
            {vendor.products.length} prodotti
          </Text>
          <Ionicons name="chevron-forward" size={16} color="#BCBCBC" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default VendorCard;