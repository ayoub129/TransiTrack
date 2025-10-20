import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { safeTheme as theme } from '../../lib/theme';

type StatusType = 
  | 'pending' 
  | 'approved' 
  | 'rejected' 
  | 'created' 
  | 'assigned' 
  | 'picked_up' 
  | 'in_transit' 
  | 'delivered' 
  | 'completed' 
  | 'cancelled'
  | 'active'
  | 'accepted'
  | 'countered';

interface StatusPillProps {
  status: StatusType;
  size?: 'small' | 'medium';
  showIcon?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const statusConfig = {
  pending: {
    color: theme.colors.accent.warning,
    backgroundColor: '#FEF3C7',
    icon: 'time-outline' as const,
    label: 'Pending',
  },
  approved: {
    color: theme.colors.accent.success,
    backgroundColor: '#D1FAE5',
    icon: 'checkmark-circle-outline' as const,
    label: 'Approved',
  },
  rejected: {
    color: theme.colors.accent.danger,
    backgroundColor: '#FEE2E2',
    icon: 'close-circle-outline' as const,
    label: 'Rejected',
  },
  created: {
    color: theme.colors.ink600,
    backgroundColor: theme.colors.ink200,
    icon: 'add-circle-outline' as const,
    label: 'Created',
  },
  assigned: {
    color: theme.colors.primary,
    backgroundColor: theme.colors.primary200,
    icon: 'person-outline' as const,
    label: 'Assigned',
  },
  picked_up: {
    color: theme.colors.accent.teal,
    backgroundColor: '#CCFBF1',
    icon: 'cube-outline' as const,
    label: 'Picked Up',
  },
  in_transit: {
    color: theme.colors.primary,
    backgroundColor: theme.colors.primary200,
    icon: 'car-outline' as const,
    label: 'In Transit',
  },
  delivered: {
    color: theme.colors.accent.success,
    backgroundColor: '#D1FAE5',
    icon: 'checkmark-done-outline' as const,
    label: 'Delivered',
  },
  completed: {
    color: theme.colors.accent.success,
    backgroundColor: '#D1FAE5',
    icon: 'checkmark-circle' as const,
    label: 'Completed',
  },
  cancelled: {
    color: theme.colors.accent.danger,
    backgroundColor: '#FEE2E2',
    icon: 'close-circle' as const,
    label: 'Cancelled',
  },
  active: {
    color: theme.colors.primary,
    backgroundColor: theme.colors.primary200,
    icon: 'flash-outline' as const,
    label: 'Active',
  },
  accepted: {
    color: theme.colors.accent.success,
    backgroundColor: '#D1FAE5',
    icon: 'checkmark-circle' as const,
    label: 'Accepted',
  },
  countered: {
    color: theme.colors.accent.warning,
    backgroundColor: '#FEF3C7',
    icon: 'swap-horizontal-outline' as const,
    label: 'Countered',
  },
};

export const StatusPill: React.FC<StatusPillProps> = ({
  status,
  size = 'medium',
  showIcon = true,
  style,
  textStyle,
}) => {
  const config = statusConfig[status] || statusConfig.pending;
  
  const pillStyle = [
    styles.base,
    styles[size],
    { backgroundColor: config.backgroundColor },
    style,
  ];

  const textStyles = [
    styles.text,
    styles[`${size}Text`],
    { color: config.color },
    textStyle,
  ];

  return (
    <View style={pillStyle}>
      {showIcon && (
        <Ionicons
          name={config.icon}
          size={size === 'small' ? 12 : 14}
          color={config.color}
          style={styles.icon}
        />
      )}
      <Text style={textStyles}>{config.label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: theme.radii.full,
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.s,
  },
  
  // Sizes
  small: {
    paddingHorizontal: theme.spacing.s,
    paddingVertical: 4,
  },
  medium: {
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.s,
  },
  
  // Text styles
  text: {
    fontWeight: '500',
    textAlign: 'center',
  },
  smallText: {
    fontSize: 10,
  },
  mediumText: {
    fontSize: 12,
  },
  
  // Icon
  icon: {
    marginRight: theme.spacing.s,
  },
});
