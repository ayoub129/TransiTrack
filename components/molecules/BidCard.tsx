import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../atoms/Card';
import { Button } from '../atoms/Button';
import { StatusPill } from '../atoms/StatusPill';
import { safeTheme as theme } from '../../lib/theme';
import { type Bid } from '../../lib/api.mock';

interface BidCardProps {
  bid: Bid;
  onAccept?: () => void;
  onReject?: () => void;
  onCounter?: () => void;
  showActions?: boolean;
  isClient?: boolean;
}

export const BidCard: React.FC<BidCardProps> = ({
  bid,
  onAccept,
  onReject,
  onCounter,
  showActions = true,
  isClient = false,
}) => {
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <View style={styles.transporterInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {bid.transporter.firstName[0]}{bid.transporter.lastName[0]}
            </Text>
          </View>
          <View style={styles.transporterDetails}>
            <Text style={styles.transporterName}>
              {bid.transporter.firstName} {bid.transporter.lastName}
            </Text>
            <View style={styles.rating}>
              <Ionicons name="star" size={14} color={theme.colors.accent.warning} />
              <Text style={styles.ratingText}>4.8</Text>
              <Text style={styles.deliveryCount}>(127 deliveries)</Text>
            </View>
          </View>
        </View>
        <View style={styles.bidInfo}>
          <Text style={styles.bidAmount}>${bid.amount}</Text>
          <StatusPill status={bid.status} size="small" />
        </View>
      </View>

      {bid.message && (
        <View style={styles.messageSection}>
          <Text style={styles.message}>{bid.message}</Text>
        </View>
      )}

      <View style={styles.footer}>
        <Text style={styles.timestamp}>
          Bid placed at {formatTime(bid.createdAt)}
        </Text>
        
        {showActions && isClient && bid.status === 'pending' && (
          <View style={styles.actions}>
            <Button
              title="Reject"
              variant="ghost"
              size="small"
              onPress={onReject}
              style={styles.actionButton}
            />
            <Button
              title="Counter"
              variant="secondary"
              size="small"
              onPress={onCounter}
              style={styles.actionButton}
            />
            <Button
              title="Accept"
              variant="primary"
              size="small"
              onPress={onAccept}
              style={styles.actionButton}
            />
          </View>
        )}
      </View>
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
  transporterInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.primary200,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.m,
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.primary,
  },
  transporterDetails: {
    flex: 1,
  },
  transporterName: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.ink900,
    marginBottom: theme.spacing.s,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '500',
    color: theme.colors.ink600,
    marginLeft: theme.spacing.s,
  },
  deliveryCount: {
    fontSize: 12,
    color: theme.colors.ink600,
    marginLeft: theme.spacing.s,
  },
  bidInfo: {
    alignItems: 'flex-end',
  },
  bidAmount: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.primary,
    marginBottom: theme.spacing.s,
  },
  messageSection: {
    backgroundColor: theme.colors.ink200,
    borderRadius: theme.radii.m,
    padding: theme.spacing.m,
    marginBottom: theme.spacing.m,
  },
  message: {
    fontSize: 14,
    color: theme.colors.ink600,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timestamp: {
    fontSize: 12,
    color: theme.colors.ink600,
  },
  actions: {
    flexDirection: 'row',
  },
  actionButton: {
    marginLeft: theme.spacing.s,
  },
});
