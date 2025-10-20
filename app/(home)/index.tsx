import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../../components/atoms/Button';
import { Chip } from '../../components/atoms/Chip';
import { OfferCard } from '../../components/molecules/OfferCard';
import { useAuth } from '../../store/useAuth';
import { useOffers } from '../../store/useOffers';
import { safeTheme as theme } from '../../lib/theme';
import { t } from '../../lib/i18n';

export default function HomeScreen() {
  const navigation = useNavigation();
  const { user } = useAuth();
  const { offers, isLoading, fetchOffers } = useOffers();
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [refreshing, setRefreshing] = useState(false);

  const filters = [
    { id: 'all', label: 'All Offers' },
    { id: 'electronics', label: 'Electronics' },
    { id: 'documents', label: 'Documents' },
    { id: 'furniture', label: 'Furniture' },
    { id: 'food', label: 'Food' },
  ];

  useEffect(() => {
    fetchOffers();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchOffers();
    setRefreshing(false);
  };

  const handleOfferPress = (offerId: string) => {
    // Navigate to offer details or bidding screen based on user role
    if (user?.role === 'client') {
      navigation.navigate('BidsSheet' as never, { offerId } as never);
    } else {
      // For transporters, show offer details
      console.log('Show offer details for transporter');
    }
  };

  const handleCreateOffer = () => {
    navigation.navigate('CreateOffer' as never);
  };

  const handleGoOnline = () => {
    // Toggle online status
    console.log('Toggle online status');
  };

  const isTransporter = user?.role === 'transporter';
  const isClient = user?.role === 'client';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.greeting}>
              Hello, {user?.firstName}!
            </Text>
            <Text style={styles.subtitle}>
              {isTransporter ? 'Find delivery opportunities' : 'Create a new delivery request'}
            </Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {isTransporter && (
          <View style={styles.transporterControls}>
            <Button
              title={user?.isOnline ? t('goOffline', 'en') : t('goOnline', 'en')}
              variant={user?.isOnline ? 'danger' : 'primary'}
              size="small"
              onPress={handleGoOnline}
              style={styles.onlineButton}
            />
            <View style={styles.viewToggle}>
              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  viewMode === 'list' && styles.activeToggleButton,
                ]}
                onPress={() => setViewMode('list')}
              >
                <Ionicons
                  name="list"
                  size={20}
                  color={viewMode === 'list' ? theme.colors.white : theme.colors.ink600}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  viewMode === 'map' && styles.activeToggleButton,
                ]}
                onPress={() => setViewMode('map')}
              >
                <Ionicons
                  name="map"
                  size={20}
                  color={viewMode === 'map' ? theme.colors.white : theme.colors.ink600}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      {isClient && (
        <View style={styles.clientActions}>
          <Button
            title={t('createOffer', 'en')}
            onPress={handleCreateOffer}
            size="large"
            style={styles.createButton}
          />
        </View>
      )}

      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.filters}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {filters.map((filter) => (
              <Chip
                key={filter.id}
                label={filter.label}
                selected={selectedFilter === filter.id}
                onPress={() => setSelectedFilter(filter.id)}
                style={styles.filterChip}
              />
            ))}
          </ScrollView>
        </View>

        <View style={styles.offersSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {isTransporter ? 'Available Offers' : 'My Offers'}
            </Text>
            <Text style={styles.offerCount}>
              {offers.length} {offers.length === 1 ? 'offer' : 'offers'}
            </Text>
          </View>

          {isLoading ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Loading offers...</Text>
            </View>
          ) : offers.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Ionicons
                name="cube-outline"
                size={64}
                color={theme.colors.ink400}
              />
              <Text style={styles.emptyTitle}>No offers found</Text>
              <Text style={styles.emptySubtitle}>
                {isTransporter
                  ? 'No delivery offers available at the moment'
                  : 'Create your first delivery offer to get started'}
              </Text>
              {isClient && (
                <Button
                  title={t('createOffer', 'en')}
                  onPress={handleCreateOffer}
                  style={styles.emptyButton}
                />
              )}
            </View>
          ) : (
            <View style={styles.offersList}>
              {offers.map((offer) => (
                <OfferCard
                  key={offer.id}
                  offer={offer}
                  onPress={() => handleOfferPress(offer.id)}
                  showBids={isClient}
                />
              ))}
            </View>
          )}
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
  header: {
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.l,
    paddingBottom: theme.spacing.m,
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.m,
  },
  greeting: {
    fontSize: theme.typography.h2.fontSize,
    fontWeight: theme.typography.h2.fontWeight,
    color: theme.colors.ink900,
  },
  subtitle: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.ink600,
    marginTop: theme.spacing.s,
  },
  profileButton: {
    padding: theme.spacing.s,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.primary200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.primary,
  },
  transporterControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  onlineButton: {
    flex: 1,
    marginRight: theme.spacing.m,
  },
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: theme.colors.ink200,
    borderRadius: theme.radii.l,
    padding: 4,
  },
  toggleButton: {
    padding: theme.spacing.s,
    borderRadius: theme.radii.m,
  },
  activeToggleButton: {
    backgroundColor: theme.colors.primary,
  },
  clientActions: {
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.l,
  },
  createButton: {
    width: '100%',
  },
  content: {
    flex: 1,
  },
  filters: {
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.m,
  },
  filterChip: {
    marginRight: theme.spacing.m,
  },
  offersSection: {
    paddingHorizontal: theme.spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.l,
  },
  sectionTitle: {
    fontSize: theme.typography.h3.fontSize,
    fontWeight: theme.typography.h3.fontWeight,
    color: theme.colors.ink900,
  },
  offerCount: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.colors.ink600,
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: theme.spacing['4xl'],
  },
  loadingText: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.ink600,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: theme.spacing['4xl'],
  },
  emptyTitle: {
    fontSize: theme.typography.h3.fontSize,
    fontWeight: theme.typography.h3.fontWeight,
    color: theme.colors.ink900,
    marginTop: theme.spacing.l,
    marginBottom: theme.spacing.s,
  },
  emptySubtitle: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.ink600,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: theme.spacing.xl,
  },
  emptyButton: {
    width: '100%',
  },
  offersList: {
    paddingBottom: theme.spacing.xl,
  },
});
