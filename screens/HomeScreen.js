import React, { useState, useEffect } from 'react';
import { View, FlatList, StatusBar, SafeAreaView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HeaderDates from '../components/HeaderDates';
import CardEvento from '../components/CardEvento';
import { events, getEventsByDate, getEventsByDistance } from '../data/mockData';
import { theme } from '../context/ThemeContext';

const HomeScreen = ({ userLocation }) => {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [displayedEvents, setDisplayedEvents] = useState([]);
  
  useEffect(() => {
    if (selectedDate) {
      // Get events for the selected date
      const filteredEvents = getEventsByDate(selectedDate);
      
      // Sort by distance if user location is available
      if (userLocation) {
        setDisplayedEvents(
          filteredEvents.sort((a, b) => 
            a.location.distanceKm - b.location.distanceKm
          )
        );
      } else {
        setDisplayedEvents(filteredEvents);
      }
    } else {
      // If no date is selected, show all events sorted by distance
      setDisplayedEvents(getEventsByDistance(userLocation));
    }
  }, [selectedDate, userLocation]);
  
  const handleSelectDate = (date) => {
    setSelectedDate(date);
  };
  
  const handleEventPress = (event) => {
    navigation.navigate('DetailScreen', { eventId: event.id });
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <HeaderDates
        selectedDate={selectedDate}
        onSelectDate={handleSelectDate}
      />
      
      <FlatList
        data={displayedEvents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CardEvento event={item} onPress={handleEventPress} />
        )}
        contentContainerStyle={styles.listContent}
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
  listContent: {
    paddingVertical: theme.spacing.md,
  }
});

export default HomeScreen;