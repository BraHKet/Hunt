import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import MyEventsScreen from '../screens/MyEventsScreen';
import AboutScreen from '../screens/AboutScreen';
import TabBar from '../components/TabBar';

const Tab = createBottomTabNavigator();

const BottomTabs = ({ userLocation }) => {
  return (
    <Tab.Navigator
      tabBar={props => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen 
        name="Esplora" 
        options={{ title: 'Esplora' }}
      >
        {props => <HomeScreen {...props} userLocation={userLocation} />}
      </Tab.Screen>
      
      <Tab.Screen 
        name="Preferiti" 
        options={{ title: 'Preferiti' }}
      >
        {props => <FavoritesScreen {...props} userLocation={userLocation} />}
      </Tab.Screen>
      
      <Tab.Screen 
        name="Mappa" 
        options={{ title: 'Mappa' }}
      >
        {props => <MapScreen {...props} userLocation={userLocation} />}
      </Tab.Screen>
      
      <Tab.Screen 
        name="I miei eventi" 
        options={{ title: 'I miei eventi' }}
      >
        {props => <MyEventsScreen {...props} userLocation={userLocation} />}
      </Tab.Screen>
      
      <Tab.Screen 
        name="About" 
        options={{ title: 'About' }}
      >
        {props => <AboutScreen {...props} userLocation={userLocation} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default BottomTabs;