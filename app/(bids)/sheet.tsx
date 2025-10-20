import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../../components/atoms/Button';
import { BidCard } from '../../components/molecules/BidCard';
import { useOffers } from '../../store/useOffers';
import { safeTheme as theme } from '../../lib/theme';
import { t } from '../../lib/i18n';

export default function BidsSheetScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { offerId } = route.params as { offerId: string };
  const { currentOffer, acceptBid, isLoading } = useOffers();
  
  const [selectedBid, setSelectedBid] = useState<string | null>(null);

  useEffect(() => {
    // In a real app, you would fetch the offer details here
    console.log('Fetching offer:', offerId);
  }, [offerId]);

  const handleAcceptBid = async (bidId: string) => {
    Alert.alert(
      'Accept Bid',
      'Are you sure you want to accept this bid?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Accept',
          onPress: async () => {
            try {
              await acceptBid(bidId);
              Alert.alert(
                'Bid Accepted!',
                'The transporter has been notified. You can now track your delivery.',
                [
                  {
                    text: 'OK',
                    onPress: () => navigation.navigate('MainTabs' as never),
                  },
                ]
              );
            } catch (error) {
              Alert.alert('Error', 'Failed to accept bid. Please try again.');
            }
          },
        },
      ]
    );
  };

  const handleRejectBid = (bidId: string) => {
    Alert.alert(
      'Reject Bid',
      'Are you sure you want to reject this bid?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reject',
          style: 'destructive',
          onPress: () => {
            // Handle reject bid
            console.log('Rejecting bid:', bidId);
          },
        },
      ]
    );
  };

  const handleCounterOffer = (bidId: string) => {
    // Navigate to counter offer screen
    console.log('Counter offer for bid:', bidId);
  };

  // Mock bids data
  const mockBids = [
    {
      id: '1',
      transporterId: '2',
      transporter: {
        id: '2',
        email: 'transporter@example.com',
        firstName: 'Mohamed',
        lastName: 'Ali',
        phone: '+1234567891',
        role: 'transporter' as const,
        avatar: 'https://i.pravatar.cc/150?img=2',
      },
      offerId: '1',
      amount: 45,
      message: 'I can deliver this within 2 hours. I have experience with electronics.',
      status: 'pending' as const,
      createdAt: '2024-01-14T09:00:00Z',
    },
    {
      id: '2',
      transporterId: '3',
      transporter: {
        id: '3',
        email: 'transporter2@example.com',
        firstName: 'Ahmed',
        lastName: 'Hassan',
        phone: '+1234567892',
        role: 'transporter' as const,
        avatar: 'https://i.pravatar.cc/150?img=3',
      },
      offerId: '1',
      amount: 50,
      message: 'Professional delivery service with insurance coverage.',
      status: 'pending' as const,
      createdAt: '2024-01-14T09:30:00Z',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={theme.colors.ink900} />
        </TouchableOpacity>
        <Text style={styles.title}>Bids Received</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <Ionicons name="cube-outline" size={24} color={theme.colors.primary} />
            <Text style={styles.summaryTitle}>Electronics Delivery</Text>
          </View>
          <Text style={styles.summarySubtitle}>
            Dubai Mall → Burj Khalifa • 5.2 km
          </Text>
          <View style={styles.summaryStats}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{mockBids.length}</Text>
              <Text style={styles.statLabel}>Bids</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>$45</Text>
              <Text style={styles.statLabel}>Lowest</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>$50</Text>
              <Text style={styles.statLabel}>Highest</Text>
            </View>
          </View>
        </View>

        <View style={styles.bidsSection}>
          <Text style={styles.sectionTitle}>
            Available Bids ({mockBids.length})
          </Text>
          
          {mockBids.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Ionicons
                name="time-outline"
                size={64}
                color={theme.colors.ink400}
              />
              <Text style={styles.emptyTitle}>No bids yet</Text>
              <Text style={styles.emptySubtitle}>
                Transporters are reviewing your offer. You'll receive bids soon.
              </Text>
            </View>
          ) : (
            <View style={styles.bidsList}>
              {mockBids.map((bid) => (
                <BidCard
                  key={bid.id}
                  bid={bid}
                  onAccept={() => handleAcceptBid(bid.id)}
                  onReject={() => handleRejectBid(bid.id)}
                  onCounter={() => handleCounterOffer(bid.id)}
                  isClient={true}
                />
              ))}
            </View>
          )}
        </View>

        <View style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>💡 Tips for choosing a transporter</Text>
          <View style={styles.tipsList}>
            <Text style={styles.tipText}>• Check their rating and delivery history</Text>
            <Text style={styles.tipText}>• Consider their message and professionalism</Text>
            <Text style={styles.tipText}>• Compare prices but don't always choose the cheapest</Text>
            <Text style={styles.tipText}>• Look for transporters with relevant experience</Text>
          </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.l,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  backButton: {
    padding: theme.spacing.s,
  },
  title: {
    fontSize: theme.typography.h2.fontSize,
    fontWeight: theme.typography.h2.fontWeight,
    color: theme.colors.ink900,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: theme.spacing.xl,
  },
  summaryCard: {
    backgroundColor: theme.colors.primary200,
    borderRadius: theme.radii['2xl'],
    padding: theme.spacing.l,
    marginBottom: theme.spacing.l,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.s,
  },
  summaryTitle: {
    fontSize: theme.typography.h4.fontSize,
    fontWeight: theme.typography.h4.fontWeight,
    color: theme.colors.ink900,
    marginLeft: theme.spacing.s,
  },
  summarySubtitle: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.ink600,
    marginBottom: theme.spacing.l,
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: theme.typography.h3.fontSize,
    fontWeight: '700',
    color: theme.colors.primary,
  },
  statLabel: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.colors.ink600,
    marginTop: theme.spacing.s,
  },
  bidsSection: {
    marginBottom: theme.spacing.l,
  },
  sectionTitle: {
    fontSize: theme.typography.h4.fontSize,
    fontWeight: theme.typography.h4.fontWeight,
    color: theme.colors.ink900,
    marginBottom: theme.spacing.l,
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
  bidsList: {
    gap: theme.spacing.m,
  },
  tipsCard: {
    backgroundColor: theme.colors.ink200,
    borderRadius: theme.radii.l,
    padding: theme.spacing.l,
  },
  tipsTitle: {
    fontSize: theme.typography.body.fontSize,
    fontWeight: '600',
    color: theme.colors.ink900,
    marginBottom: theme.spacing.m,
  },
  tipsList: {
    gap: theme.spacing.s,
  },
  tipText: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.colors.ink600,
    lineHeight: 18,
  },
});
