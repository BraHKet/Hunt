// MapScreen.js
import { Platform } from 'react-native';

let MapScreen;
if (Platform.OS === 'web') {
  MapScreen = require('./MapScreen.web').default;
} else {
  MapScreen = require('./MapScreen.native').default;
}

export default MapScreen;