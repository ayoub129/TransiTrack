import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { safeTheme as theme } from '../../lib/theme';

type Variant = 'error' | 'success' | 'warning' | 'info';

export const Alert: React.FC<{ variant?: Variant; title?: string; message: string }> = ({ variant = 'error', title, message }) => {
  const cfg = {
    error: { color: theme.colors.accent.danger, bg: '#FEE2E2', icon: 'alert-circle' as const, label: title || 'Error' },
    success: { color: theme.colors.accent.success, bg: '#D1FAE5', icon: 'checkmark-circle' as const, label: title || 'Success' },
    warning: { color: theme.colors.accent.warning, bg: '#FEF3C7', icon: 'warning' as const, label: title || 'Warning' },
    info: { color: theme.colors.primary, bg: theme.colors.primary200, icon: 'information-circle' as const, label: title || 'Info' },
  }[variant];

  return (
    <View style={[styles.container, { backgroundColor: cfg.bg }]}>
      <Ionicons name={cfg.icon} size={18} color={cfg.color} style={styles.icon} />
      <View style={styles.texts}>
        <Text style={[styles.title, { color: cfg.color }]}>{cfg.label}</Text>
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: theme.spacing.m,
    borderRadius: theme.radii.m,
    marginBottom: theme.spacing.m,
  },
  icon: { marginRight: theme.spacing.m, marginTop: 2 },
  texts: { flex: 1 },
  title: { fontWeight: '700', marginBottom: 4 },
  message: { color: theme.colors.ink600 },
});


