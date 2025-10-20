import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../atoms/Card';
import { StatusPill } from '../atoms/StatusPill';
import { Badge } from '../atoms/Badge';
import { safeTheme as theme } from '../../lib/theme';
import { type Offer } from '../../lib/api.mock';

interface OfferCardProps {
  offer: Offer;
  onPress: () => void;
  showBids?: boolean;
}

export const OfferCard: React.FC<OfferCardProps> = ({
  offer,
  onPress,
  showBids = true,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDistance = (from: any, to: any) => {
    // Mock distance calculation
    const lat1 = from.coordinates.lat;
    const lng1 = from.coordinates.lng;
    const lat2 = to.coordinates.lat;
    const lng2 = to.coordinates.lng;
    
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    
    return `${distance.toFixed(1)} km`;
  };

  return (
    <Card onPress={onPress} style={styles.card}>
      <View style={styles.header}>
        <View style={styles.clientInfo}>
          <Text style={styles.clientName}>
            {offer.client.firstName} {offer.client.lastName}
          </Text>
          <StatusPill status={offer.status} size="small" />
        </View>
        <Text style={styles.price}>${offer.estimatedPrice}</Text>
      </View>

      <View style={styles.route}>
        <View style={styles.location}>
          <View style={styles.locationDot} />
          <Text style={styles.locationText} numberOfLines={1}>
            {offer.from.address}
          </Text>
        </View>
        <View style={styles.location}>
          <View style={[styles.locationDot, styles.destinationDot]} />
          <Text style={styles.locationText} numberOfLines={1}>
            {offer.to.address}
          </Text>
        </View>
      </View>

      <View style={styles.details}>
        <View style={styles.detailRow}>
          <Ionicons name="cube-outline" size={16} color={theme.colors.ink600} />
          <Text style={styles.detailText}>{offer.goodsType}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="scale-outline" size={16} color={theme.colors.ink600} />
          <Text style={styles.detailText}>{offer.weight} kg</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="time-outline" size={16} color={theme.colors.ink600} />
          <Text style={styles.detailText}>{formatDate(offer.dateTime)}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="location-outline" size={16} color={theme.colors.ink600} />
          <Text style={styles.detailText}>{formatDistance(offer.from, offer.to)}</Text>
        </View>
      </View>

      {showBids && offer.bids.length > 0 && (
        <View style={styles.bidsSection}>
          <View style={styles.bidsHeader}>
            <Text style={styles.bidsTitle}>Bids ({offer.bids.length})</Text>
            <Badge variant="primary" label={offer.bids.length} />
          </View>
          <View style={styles.bidsList}>
            {offer.bids.slice(0, 2).map((bid) => (
              <View key={bid.id} style={styles.bidItem}>
                <Text style={styles.bidAmount}>${bid.amount}</Text>
                <Text style={styles.bidTransporter}>
                  {bid.transporter.firstName} {bid.transporter.lastName}
                </Text>
              </View>
            ))}
            {offer.bids.length > 2 && (
              <Text style={styles.moreBids}>+{offer.bids.length - 2} more</Text>
            )}
          </View>
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: theme.spacing.m,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.m,
  },
  clientInfo: {
    flex: 1,
  },
  clientName: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.ink900,
    marginBottom: theme.spacing.s,
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.primary,
  },
  route: {
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
  details: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: theme.spacing.m,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: theme.spacing.l,
    marginBottom: theme.spacing.s,
  },
  detailText: {
    fontSize: 12,
    color: theme.colors.ink600,
    marginLeft: theme.spacing.s,
  },
  bidsSection: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingTop: theme.spacing.m,
  },
  bidsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.s,
  },
  bidsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.ink900,
  },
  bidsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  bidItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: theme.spacing.l,
    marginBottom: theme.spacing.s,
  },
  bidAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.primary,
    marginRight: theme.spacing.s,
  },
  bidTransporter: {
    fontSize: 12,
    color: theme.colors.ink600,
  },
  moreBids: {
    fontSize: 12,
    color: theme.colors.ink600,
    fontStyle: 'italic',
  },
});
