import { StyleSheet } from 'react-native';
import { theme } from '../context/ThemeContext';

export default StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.md,
  },
  dateContainer: {
    width: 70,
    height: 70,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.sm,
    paddingVertical: theme.spacing.sm,
  },
  dayNumber: {
    fontSize: theme.typography.fontSizes.xxl,
    fontWeight: theme.typography.fontWeights.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  dayName: {
    fontSize: theme.typography.fontSizes.sm,
    color: theme.colors.textSecondary,
  },
  selectedText: {
    color: theme.colors.text,
  },
  filterIndicator: {
    marginTop: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
  },
  filterText: {
    fontSize: theme.typography.fontSizes.sm,
    color: theme.colors.textSecondary,
  },
});