import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../../components/atoms/Button';
import { Card } from '../../components/atoms/Card';
import { useAuth } from '../../store/useAuth';
import { apiRequest } from '../../lib/api';
import { safeTheme as theme } from '../../lib/theme';
import { t } from '../../lib/i18n';

export default function RolePickerScreen() {
  const navigation = useNavigation();
  const { updateUser, setAuthenticated } = useAuth();
  const [selectedRole, setSelectedRole] = useState<'client' | 'transporter' | null>(null);

  const handleRoleSelect = (role: 'client' | 'transporter') => {
    setSelectedRole(role);
  };

  const handleContinue = async () => {
    if (!selectedRole) {
      Alert.alert('Please select a role', 'Choose whether you are a client or transporter');
      return;
    }

    try {
      // Persist role to backend then update local store
      // @ts-expect-error token from store
      const updated = await apiRequest('/users/me', { method: 'PATCH', body: { role: selectedRole }, token: (useAuth.getState().token as any) });
      updateUser({ role: selectedRole });
      setAuthenticated(true);
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Failed to save role';
      Alert.alert('Error', message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.title}>{t('selectRole', 'en')}</Text>
          <Text style={styles.subtitle}>
            Choose your role to get started with the platform
          </Text>
        </View>

        <View style={styles.rolesContainer}>
          <Card
            onPress={() => handleRoleSelect('client')}
            style={[
              styles.roleCard,
              selectedRole === 'client' && styles.selectedRoleCard,
            ]}
          >
            <View style={styles.roleIcon}>
              <Ionicons
                name="cube-outline"
                size={48}
                color={selectedRole === 'client' ? theme.colors.white : theme.colors.primary}
              />
            </View>
            <Text style={[
              styles.roleTitle,
              selectedRole === 'client' && styles.selectedRoleTitle,
            ]}>
              {t('client', 'en')}
            </Text>
            <Text style={[
              styles.roleDescription,
              selectedRole === 'client' && styles.selectedRoleDescription,
            ]}>
              {t('clientDescription', 'en')}
            </Text>
            {selectedRole === 'client' && (
              <View style={styles.selectedIndicator}>
                <Ionicons name="checkmark-circle" size={24} color={theme.colors.white} />
              </View>
            )}
          </Card>

          <Card
            onPress={() => handleRoleSelect('transporter')}
            style={[
              styles.roleCard,
              selectedRole === 'transporter' && styles.selectedRoleCard,
            ]}
          >
            <View style={styles.roleIcon}>
              <Ionicons
                name="car-outline"
                size={48}
                color={selectedRole === 'transporter' ? theme.colors.white : theme.colors.primary}
              />
            </View>
            <Text style={[
              styles.roleTitle,
              selectedRole === 'transporter' && styles.selectedRoleTitle,
            ]}>
              {t('transporter', 'en')}
            </Text>
            <Text style={[
              styles.roleDescription,
              selectedRole === 'transporter' && styles.selectedRoleDescription,
            ]}>
              {t('transporterDescription', 'en')}
            </Text>
            {selectedRole === 'transporter' && (
              <View style={styles.selectedIndicator}>
                <Ionicons name="checkmark-circle" size={24} color={theme.colors.white} />
              </View>
            )}
          </Card>
        </View>

        <View style={styles.footer}>
          <Button
            title="Continue"
            onPress={handleContinue}
            disabled={!selectedRole}
            size="large"
            style={styles.continueButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing['4xl'],
  },
  title: {
    fontSize: theme.typography.h1.fontSize,
    fontWeight: theme.typography.h1.fontWeight,
    color: theme.colors.ink900,
    textAlign: 'center',
    marginBottom: theme.spacing.m,
  },
  subtitle: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.ink600,
    textAlign: 'center',
    lineHeight: 24,
  },
  rolesContainer: {
    flex: 1,
    gap: theme.spacing.l,
  },
  roleCard: {
    alignItems: 'center',
    padding: theme.spacing.xl,
    borderWidth: 2,
    borderColor: theme.colors.border,
    position: 'relative',
  },
  selectedRoleCard: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  roleIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.primary200,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.l,
  },
  roleTitle: {
    fontSize: theme.typography.h3.fontSize,
    fontWeight: theme.typography.h3.fontWeight,
    color: theme.colors.ink900,
    marginBottom: theme.spacing.m,
  },
  selectedRoleTitle: {
    color: theme.colors.white,
  },
  roleDescription: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.ink600,
    textAlign: 'center',
    lineHeight: 24,
  },
  selectedRoleDescription: {
    color: theme.colors.white,
  },
  selectedIndicator: {
    position: 'absolute',
    top: theme.spacing.m,
    right: theme.spacing.m,
  },
  footer: {
    marginTop: theme.spacing.xl,
  },
  continueButton: {
    width: '100%',
  },
});
