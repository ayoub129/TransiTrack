import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { safeTheme as theme } from '../../lib/theme';

interface ChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  size?: 'small' | 'medium';
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Chip: React.FC<ChipProps> = ({
  label,
  selected = false,
  onPress,
  variant = 'default',
  size = 'medium',
  disabled = false,
  style,
  textStyle,
}) => {
  const chipStyle = [
    styles.base,
    styles[variant],
    styles[size],
    selected && styles.selected,
    disabled && styles.disabled,
    style,
  ];

  const textStyles = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    selected && styles.selectedText,
    disabled && styles.disabledText,
    textStyle,
  ];

  if (onPress) {
    return (
      <TouchableOpacity
        style={chipStyle}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.7}
      >
        <Text style={textStyles}>{label}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={chipStyle}>
      <Text style={textStyles}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: theme.radii.full,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  
  // Variants
  default: {
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.border,
  },
  primary: {
    backgroundColor: theme.colors.primary200,
    borderColor: theme.colors.primary,
  },
  success: {
    backgroundColor: '#D1FAE5',
    borderColor: theme.colors.accent.success,
  },
  warning: {
    backgroundColor: '#FEF3C7',
    borderColor: theme.colors.accent.warning,
  },
  danger: {
    backgroundColor: '#FEE2E2',
    borderColor: theme.colors.accent.danger,
  },
  
  // Sizes
  small: {
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.s,
  },
  medium: {
    paddingHorizontal: theme.spacing.l,
    paddingVertical: theme.spacing.m,
  },
  
  // Text styles
  text: {
    fontWeight: '500',
    textAlign: 'center',
  },
  defaultText: {
    color: theme.colors.ink600,
  },
  primaryText: {
    color: theme.colors.primary,
  },
  successText: {
    color: theme.colors.accent.success,
  },
  warningText: {
    color: theme.colors.accent.warning,
  },
  dangerText: {
    color: theme.colors.accent.danger,
  },
  
  // Size text
  smallText: {
    fontSize: 12,
  },
  mediumText: {
    fontSize: 14,
  },
  
  // Selected state
  selected: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  selectedText: {
    color: theme.colors.white,
  },
  
  // Disabled state
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    opacity: 0.7,
  },
});
