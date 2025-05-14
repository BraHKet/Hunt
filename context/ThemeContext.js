import React, { createContext, useContext } from 'react';

// Theme colors - modified palette from "Staseera" with softer violet tones
export const theme = {
  colors: {
    primary: '#FF458F',      // Brighter pink (was more purple in Staseera)
    secondary: '#A269FF',    // Softer violet 
    accent: '#FF7A3D',       // Warm orange accent
    background: '#121218',   // Dark background
    card: '#1E1E26',         // Slightly lighter card background
    text: '#FFFFFF',         // White text
    textSecondary: '#BCBCBC', // Light gray text
    border: '#2A2A32',       // Border color
    success: '#4CAF50',      // Success color
    error: '#F44336',        // Error color
    highlight: '#FFD54F',    // Highlight yellow
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    round: 9999,
  },
  typography: {
    fontSizes: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      xxl: 24,
      xxxl: 32,
    },
    fontWeights: {
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  },
  shadows: {
    light: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.15,
      shadowRadius: 5,
      elevation: 4,
    },
  }
};

const ThemeContext = createContext(theme);

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};