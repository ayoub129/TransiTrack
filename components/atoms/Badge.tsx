import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { safeTheme as theme } from '../../lib/theme';

interface BadgeProps {
  label: string | number;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  size?: 'small' | 'medium';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'default',
  size = 'small',
  style,
  textStyle,
}) => {
  const badgeStyle = [
    styles.base,
    styles[variant],
    styles[size],
    style,
  ];

  const textStyles = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    textStyle,
  ];

  return (
    <View style={badgeStyle}>
      <Text style={textStyles}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: theme.radii.full,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 20,
  },
  
  // Variants
  default: {
    backgroundColor: theme.colors.ink200,
  },
  primary: {
    backgroundColor: theme.colors.primary,
  },
  success: {
    backgroundColor: theme.colors.accent.success,
  },
  warning: {
    backgroundColor: theme.colors.accent.warning,
  },
  danger: {
    backgroundColor: theme.colors.accent.danger,
  },
  
  // Sizes
  small: {
    paddingHorizontal: theme.spacing.s,
    paddingVertical: 2,
    minHeight: 16,
  },
  medium: {
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.s,
    minHeight: 24,
  },
  
  // Text styles
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  defaultText: {
    color: theme.colors.ink900,
  },
  primaryText: {
    color: theme.colors.white,
  },
  successText: {
    color: theme.colors.white,
  },
  warningText: {
    color: theme.colors.white,
  },
  dangerText: {
    color: theme.colors.white,
  },
  
  // Size text
  smallText: {
    fontSize: 10,
  },
  mediumText: {
    fontSize: 12,
  },
});
