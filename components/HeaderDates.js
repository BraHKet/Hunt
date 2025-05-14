import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { format, addDays, isToday, isSameDay } from 'date-fns';
import { it } from 'date-fns/locale';
import styles from './HeaderDates.styles';
import { useTheme } from '../context/ThemeContext';

const HeaderDates = ({ selectedDate, onSelectDate }) => {
  const theme = useTheme();
  const today = new Date();
  const dates = Array(7).fill(0).map((_, index) => addDays(today, index));

  // Weekday abbreviations in Italian
  const getDayName = (date) => {
    return format(date, 'EEE', { locale: it }).charAt(0).toUpperCase() + format(date, 'EEE', { locale: it }).slice(1);
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {dates.map((date, index) => {
          const isSelected = selectedDate ? isSameDay(date, selectedDate) : isToday(date);
          
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.dateContainer,
                isSelected && { backgroundColor: theme.colors.primary }
              ]}
              onPress={() => onSelectDate(date)}
            >
              <Text style={[
                styles.dayNumber,
                isSelected && styles.selectedText
              ]}>
                {format(date, 'd')}
              </Text>
              <Text style={[
                styles.dayName, 
                isSelected && styles.selectedText
              ]}>
                {getDayName(date)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      {selectedDate && (
        <View style={styles.filterIndicator}>
          <Text style={styles.filterText}>
            ↓↑ 1 filtro attivo
          </Text>
        </View>
      )}
    </View>
  );
};

export default HeaderDates;