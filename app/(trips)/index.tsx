import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../../components/atoms/Card';
import { StatusPill } from '../../components/atoms/StatusPill';
import { Button } from '../../components/atoms/Button';
import { useAuth } from '../../store/useAuth';
import { useDelivery } from '../../store/useDelivery';
import { safeTheme as theme } from '../../lib/theme';
import { t } from '../../lib/i18n';

export default function MyTripsScreen() {
  const navigation = useNavigation();
  const { user } = useAuth();
  const { deliveries, fetchDeliveries, isLoading } = useDelivery();
  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');

  useEffect(() => {
    if (user?.id) {
      fetchDeliveries(user.id);
    }
  }, [user?.id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleDeliveryPress = (deliveryId: string) => {
    navigation.navigate('LiveTracking' as never, { deliveryId } as never);
  };

  // Mock deliveries data
  const mockDeliveries = [
    {
      id: '1',
      offerId: '1',
      offer: {
        id: '1',
        clientId: '1',
        client: {
          id: '1',
          email: 'client@example.com',
          firstName: 'Ahmed',
          lastName: 'Hassan',
          phone: '+1234567890',
          role: 'client' as const,
        },
        from: {
          address: 'Dubai Mall, Dubai',
          coordinates: { lat: 25.1972, lng: 55.2796 },
        },
        to: {
          address: 'Burj Khalifa, Dubai',
          coordinates: { lat: 25.1972, lng: 55.2744 },
        },
        goodsType: 'Electronics',
        weight: 5,
        volume: 0.1,
        photos: [],
        dateTime: '2024-01-15T10:00:00Z',
        estimatedPrice: 50,
        priceRange: { min: 40, max: 60 },
        status: 'assigned' as const,
        bids: [],
        createdAt: '2024-01-14T08:00:00Z',
      },
      transporterId: '2',
      transporter: {
        id: '2',
        email: 'transporter@example.com',
        firstName: 'Mohamed',
        lastName: 'Ali',
        phone: '+1234567891',
        role: 'transporter' as const,
      },
      status: 'assigned' as const,
      trackingHistory: [],
      confirmationPin: '123456',
    },
  ];

  const activeDeliveries = mockDeliveries.filter(d => d.status !== 'delivered');
  const completedDeliveries = mockDeliveries.filter(d => d.status === 'delivered');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('myTrips', 'en')}</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter-outline" size={24} color={theme.colors.ink900} />
        </TouchableOpacity>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'active' && styles.activeTab]}
          onPress={() => setActiveTab('active')}
        >
          <Text style={[styles.tabText, activeTab === 'active' && styles.activeTabText]}>
            {t('activeDelivery', 'en')}
          </Text>
          {activeDeliveries.length > 0 && (
            <View style={styles.tabBadge}>
              <Text style={styles.tabBadgeText}>{activeDeliveries.length}</Text>
            </View>
          )}
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'history' && styles.activeTab]}
          onPress={() => setActiveTab('history')}
        >
          <Text style={[styles.tabText, activeTab === 'history' && styles.activeTabText]}>
            {t('deliveryHistory', 'en')}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
      >
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading deliveries...</Text>
          </View>
        ) : (
          <>
            {activeTab === 'active' ? (
              <>
                {activeDeliveries.length === 0 ? (
                  <View style={styles.emptyContainer}>
                    <Ionicons
                      name="car-outline"
                      size={64}
                      color={theme.colors.ink400}
                    />
                    <Text style={styles.emptyTitle}>No active deliveries</Text>
                    <Text style={styles.emptySubtitle}>
                      {user?.role === 'client'
                        ? 'Create an offer to start a delivery'
                        : 'Go online to find delivery opportunities'}
                    </Text>
                  </View>
                ) : (
                  <View style={styles.deliveriesList}>
                    {activeDeliveries.map((delivery) => (
                      <Card
                        key={delivery.id}
                        onPress={() => handleDeliveryPress(delivery.id)}
                        style={styles.deliveryCard}
                      >
                        <View style={styles.deliveryHeader}>
                          <View style={styles.deliveryInfo}>
                            <Text style={styles.deliveryTitle}>
                              {delivery.offer.goodsType} Delivery
                            </Text>
                            <StatusPill status={delivery.status} />
                          </View>
                          <Text style={styles.deliveryPrice}>
                            ${delivery.offer.estimatedPrice}
                          </Text>
                        </View>

                        <View style={styles.deliveryRoute}>
                          <View style={styles.location}>
                            <View style={styles.locationDot} />
                            <Text style={styles.locationText} numberOfLines={1}>
                              {delivery.offer.from.address}
                            </Text>
                          </View>
                          <View style={styles.location}>
                            <View style={[styles.locationDot, styles.destinationDot]} />
                            <Text style={styles.locationText} numberOfLines={1}>
                              {delivery.offer.to.address}
                            </Text>
                          </View>
                        </View>

                        <View style={styles.deliveryDetails}>
                          <View style={styles.detailRow}>
                            <Ionicons name="person-outline" size={16} color={theme.colors.ink600} />
                            <Text style={styles.detailText}>
                              {user?.role === 'client'
                                ? `${delivery.transporter.firstName} ${delivery.transporter.lastName}`
                                : `${delivery.offer.client.firstName} ${delivery.offer.client.lastName}`}
                            </Text>
                          </View>
                          <View style={styles.detailRow}>
                            <Ionicons name="time-outline" size={16} color={theme.colors.ink600} />
                            <Text style={styles.detailText}>
                              {formatDate(delivery.offer.dateTime)}
                            </Text>
                          </View>
                        </View>

                        <View style={styles.deliveryActions}>
                          <Button
                            title="Track Delivery"
                            variant="primary"
                            size="small"
                            onPress={() => handleDeliveryPress(delivery.id)}
                          />
                        </View>
                      </Card>
                    ))}
                  </View>
                )}
              </>
            ) : (
              <>
                {completedDeliveries.length === 0 ? (
                  <View style={styles.emptyContainer}>
                    <Ionicons
                      name="checkmark-circle-outline"
                      size={64}
                      color={theme.colors.ink400}
                    />
                    <Text style={styles.emptyTitle}>No completed deliveries</Text>
                    <Text style={styles.emptySubtitle}>
                      Your completed deliveries will appear here
                    </Text>
                  </View>
                ) : (
                  <View style={styles.deliveriesList}>
                    {completedDeliveries.map((delivery) => (
                      <Card
                        key={delivery.id}
                        style={styles.deliveryCard}
                      >
                        <View style={styles.deliveryHeader}>
                          <View style={styles.deliveryInfo}>
                            <Text style={styles.deliveryTitle}>
                              {delivery.offer.goodsType} Delivery
                            </Text>
                            <StatusPill status="completed" />
                          </View>
                          <Text style={styles.deliveryPrice}>
                            ${delivery.offer.estimatedPrice}
                          </Text>
                        </View>

                        <View style={styles.deliveryRoute}>
                          <View style={styles.location}>
                            <View style={styles.locationDot} />
                            <Text style={styles.locationText} numberOfLines={1}>
                              {delivery.offer.from.address}
                            </Text>
                          </View>
                          <View style={styles.location}>
                            <View style={[styles.locationDot, styles.destinationDot]} />
                            <Text style={styles.locationText} numberOfLines={1}>
                              {delivery.offer.to.address}
                            </Text>
                          </View>
                        </View>

                        <View style={styles.deliveryDetails}>
                          <View style={styles.detailRow}>
                            <Ionicons name="person-outline" size={16} color={theme.colors.ink600} />
                            <Text style={styles.detailText}>
                              {user?.role === 'client'
                                ? `${delivery.transporter.firstName} ${delivery.transporter.lastName}`
                                : `${delivery.offer.client.firstName} ${delivery.offer.client.lastName}`}
                            </Text>
                          </View>
                          <View style={styles.detailRow}>
                            <Ionicons name="time-outline" size={16} color={theme.colors.ink600} />
                            <Text style={styles.detailText}>
                              Completed {formatDate(delivery.deliveryTime || delivery.offer.dateTime)}
                            </Text>
                          </View>
                        </View>
                      </Card>
                    ))}
                  </View>
                )}
              </>
            )}
          </>
        )}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.l,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  title: {
    fontSize: theme.typography.h2.fontSize,
    fontWeight: theme.typography.h2.fontWeight,
    color: theme.colors.ink900,
  },
  filterButton: {
    padding: theme.spacing.s,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.l,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: theme.colors.primary,
  },
  tabText: {
    fontSize: theme.typography.body.fontSize,
    fontWeight: '500',
    color: theme.colors.ink600,
  },
  activeTabText: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
  tabBadge: {
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: theme.spacing.s,
  },
  tabBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: theme.colors.white,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: theme.spacing.xl,
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
  },
  deliveriesList: {
    gap: theme.spacing.m,
  },
  deliveryCard: {
    padding: theme.spacing.l,
  },
  deliveryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.m,
  },
  deliveryInfo: {
    flex: 1,
  },
  deliveryTitle: {
    fontSize: theme.typography.h4.fontSize,
    fontWeight: theme.typography.h4.fontWeight,
    color: theme.colors.ink900,
    marginBottom: theme.spacing.s,
  },
  deliveryPrice: {
    fontSize: theme.typography.h3.fontSize,
    fontWeight: '700',
    color: theme.colors.primary,
  },
  deliveryRoute: {
    marginBottom: theme.spacing.m,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.s,
  },
  locationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.primary,
    marginRight: theme.spacing.m,
  },
  destinationDot: {
    backgroundColor: theme.colors.accent.teal,
  },
  locationText: {
    flex: 1,
    fontSize: 14,
    color: theme.colors.ink600,
  },
  deliveryDetails: {
    marginBottom: theme.spacing.m,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.s,
  },
  detailText: {
    fontSize: 12,
    color: theme.colors.ink600,
    marginLeft: theme.spacing.s,
  },
  deliveryActions: {
    alignItems: 'flex-end',
  },
});
