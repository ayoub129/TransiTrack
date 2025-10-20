import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
  Switch,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../../components/atoms/Button';
import { Card } from '../../components/atoms/Card';
import { StatusPill } from '../../components/atoms/StatusPill';
import { useAuth } from '../../store/useAuth';
import { safeTheme as theme } from '../../lib/theme';
import { t } from '../../lib/i18n';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { user, logout } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('en');

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: logout,
        },
      ]
    );
  };

  const handleEditProfile = () => {
    // Navigate to edit profile screen
    console.log('Edit profile');
  };

  const handleKYC = () => {
    // Navigate to KYC screen
    console.log('KYC process');
  };

  const handleVehicleInfo = () => {
    // Navigate to vehicle info screen
    console.log('Vehicle info');
  };

  const handlePayouts = () => {
    // Navigate to payouts screen
    console.log('Payouts');
  };

  const handleNotifications = () => {
    // Navigate to notifications screen
    console.log('Notifications');
  };

  const handleHelp = () => {
    // Navigate to help screen
    console.log('Help');
  };

  const handleLanguageChange = () => {
    Alert.alert(
      'Select Language',
      'Choose your preferred language',
      [
        { text: 'English', onPress: () => setLanguage('en') },
        { text: 'Français', onPress: () => setLanguage('fr') },
        { text: 'العربية', onPress: () => setLanguage('ar') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const isTransporter = user?.role === 'transporter';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Header */}
        <Card style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>
                {user?.firstName} {user?.lastName}
              </Text>
              <Text style={styles.profileEmail}>{user?.email}</Text>
              <View style={styles.roleContainer}>
                <StatusPill 
                  status={user?.role === 'client' ? 'created' : 'approved'} 
                  size="small"
                />
                <Text style={styles.roleText}>
                  {user?.role === 'client' ? 'Client' : 'Transporter'}
                </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
              <Ionicons name="create-outline" size={20} color={theme.colors.primary} />
            </TouchableOpacity>
          </View>
        </Card>

        {/* KYC Status (for transporters) */}
        {isTransporter && (
          <Card style={styles.kycCard}>
            <View style={styles.kycHeader}>
              <Ionicons name="shield-checkmark-outline" size={24} color={theme.colors.primary} />
              <Text style={styles.kycTitle}>KYC Status</Text>
            </View>
            <View style={styles.kycStatus}>
              <StatusPill status={user?.kycStatus || 'pending'} />
              <Text style={styles.kycText}>
                {user?.kycStatus === 'approved' 
                  ? 'Your profile is verified'
                  : 'Complete your verification to start accepting deliveries'}
              </Text>
            </View>
            {user?.kycStatus !== 'approved' && (
              <Button
                title="Complete KYC"
                variant="primary"
                size="small"
                onPress={handleKYC}
                style={styles.kycButton}
              />
            )}
          </Card>
        )}

        {/* Vehicle Info (for transporters) */}
        {isTransporter && user?.vehicleInfo && (
          <Card style={styles.vehicleCard}>
            <View style={styles.vehicleHeader}>
              <Ionicons name="car-outline" size={24} color={theme.colors.primary} />
              <Text style={styles.vehicleTitle}>Vehicle Information</Text>
            </View>
            <View style={styles.vehicleDetails}>
              <View style={styles.vehicleRow}>
                <Text style={styles.vehicleLabel}>Type</Text>
                <Text style={styles.vehicleValue}>{user.vehicleInfo.type}</Text>
              </View>
              <View style={styles.vehicleRow}>
                <Text style={styles.vehicleLabel}>License Plate</Text>
                <Text style={styles.vehicleValue}>{user.vehicleInfo.licensePlate}</Text>
              </View>
              <View style={styles.vehicleRow}>
                <Text style={styles.vehicleLabel}>Capacity</Text>
                <Text style={styles.vehicleValue}>{user.vehicleInfo.capacity} kg</Text>
              </View>
            </View>
            <Button
              title="Edit Vehicle Info"
              variant="secondary"
              size="small"
              onPress={handleVehicleInfo}
              style={styles.vehicleButton}
            />
          </Card>
        )}

        {/* Settings */}
        <Card style={styles.settingsCard}>
          <Text style={styles.settingsTitle}>Settings</Text>
          
          <TouchableOpacity style={styles.settingItem} onPress={handleLanguageChange}>
            <View style={styles.settingLeft}>
              <Ionicons name="language-outline" size={20} color={theme.colors.ink600} />
              <Text style={styles.settingLabel}>{t('language', 'en')}</Text>
            </View>
            <View style={styles.settingRight}>
              <Text style={styles.settingValue}>
                {language === 'en' ? 'English' : language === 'fr' ? 'Français' : 'العربية'}
              </Text>
              <Ionicons name="chevron-forward" size={16} color={theme.colors.ink400} />
            </View>
          </TouchableOpacity>

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="moon-outline" size={20} color={theme.colors.ink600} />
              <Text style={styles.settingLabel}>{t('darkMode', 'en')}</Text>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={setIsDarkMode}
              trackColor={{ false: theme.colors.ink200, true: theme.colors.primary200 }}
              thumbColor={isDarkMode ? theme.colors.primary : theme.colors.ink400}
            />
          </View>

          <TouchableOpacity style={styles.settingItem} onPress={handleNotifications}>
            <View style={styles.settingLeft}>
              <Ionicons name="notifications-outline" size={20} color={theme.colors.ink600} />
              <Text style={styles.settingLabel}>{t('notifications', 'en')}</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={theme.colors.ink400} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem} onPress={handleHelp}>
            <View style={styles.settingLeft}>
              <Ionicons name="help-circle-outline" size={20} color={theme.colors.ink600} />
              <Text style={styles.settingLabel}>{t('help', 'en')}</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={theme.colors.ink400} />
          </TouchableOpacity>
        </Card>

        {/* Payouts (for transporters) */}
        {isTransporter && (
          <Card style={styles.payoutsCard}>
            <View style={styles.payoutsHeader}>
              <Ionicons name="wallet-outline" size={24} color={theme.colors.primary} />
              <Text style={styles.payoutsTitle}>Payouts</Text>
            </View>
            <View style={styles.payoutsInfo}>
              <Text style={styles.payoutsAmount}>$0.00</Text>
              <Text style={styles.payoutsLabel}>Available Balance</Text>
            </View>
            <Button
              title="View Payouts"
              variant="secondary"
              size="small"
              onPress={handlePayouts}
              style={styles.payoutsButton}
            />
          </Card>
        )}

        {/* Logout */}
        <Button
          title={t('logout', 'en')}
          variant="danger"
          size="large"
          onPress={handleLogout}
          style={styles.logoutButton}
        />
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
  },
  scrollContent: {
    padding: theme.spacing.xl,
  },
  profileCard: {
    marginBottom: theme.spacing.l,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: theme.colors.primary200,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.l,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '600',
    color: theme.colors.primary,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: theme.typography.h3.fontSize,
    fontWeight: theme.typography.h3.fontWeight,
    color: theme.colors.ink900,
    marginBottom: theme.spacing.s,
  },
  profileEmail: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.ink600,
    marginBottom: theme.spacing.s,
  },
  roleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  roleText: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.colors.ink600,
    marginLeft: theme.spacing.s,
  },
  editButton: {
    padding: theme.spacing.s,
  },
  kycCard: {
    marginBottom: theme.spacing.l,
  },
  kycHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.m,
  },
  kycTitle: {
    fontSize: theme.typography.h4.fontSize,
    fontWeight: theme.typography.h4.fontWeight,
    color: theme.colors.ink900,
    marginLeft: theme.spacing.s,
  },
  kycStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.m,
  },
  kycText: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.ink600,
    marginLeft: theme.spacing.s,
    flex: 1,
  },
  kycButton: {
    width: '100%',
  },
  vehicleCard: {
    marginBottom: theme.spacing.l,
  },
  vehicleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.m,
  },
  vehicleTitle: {
    fontSize: theme.typography.h4.fontSize,
    fontWeight: theme.typography.h4.fontWeight,
    color: theme.colors.ink900,
    marginLeft: theme.spacing.s,
  },
  vehicleDetails: {
    marginBottom: theme.spacing.m,
  },
  vehicleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.s,
  },
  vehicleLabel: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.ink600,
  },
  vehicleValue: {
    fontSize: theme.typography.body.fontSize,
    fontWeight: '500',
    color: theme.colors.ink900,
  },
  vehicleButton: {
    width: '100%',
  },
  settingsCard: {
    marginBottom: theme.spacing.l,
  },
  settingsTitle: {
    fontSize: theme.typography.h4.fontSize,
    fontWeight: theme.typography.h4.fontWeight,
    color: theme.colors.ink900,
    marginBottom: theme.spacing.l,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingLabel: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.ink900,
    marginLeft: theme.spacing.m,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingValue: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.ink600,
    marginRight: theme.spacing.s,
  },
  payoutsCard: {
    marginBottom: theme.spacing.l,
  },
  payoutsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.m,
  },
  payoutsTitle: {
    fontSize: theme.typography.h4.fontSize,
    fontWeight: theme.typography.h4.fontWeight,
    color: theme.colors.ink900,
    marginLeft: theme.spacing.s,
  },
  payoutsInfo: {
    alignItems: 'center',
    marginBottom: theme.spacing.m,
  },
  payoutsAmount: {
    fontSize: 32,
    fontWeight: '700',
    color: theme.colors.primary,
    marginBottom: theme.spacing.s,
  },
  payoutsLabel: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.ink600,
  },
  payoutsButton: {
    width: '100%',
  },
  logoutButton: {
    width: '100%',
    marginTop: theme.spacing.l,
  },
});
