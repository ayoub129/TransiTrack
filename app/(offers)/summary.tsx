import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../../components/atoms/Button';
import { Card } from '../../components/atoms/Card';
import { StatusPill } from '../../components/atoms/StatusPill';
import { safeTheme as theme } from '../../lib/theme';
import { t } from '../../lib/i18n';

export default function OfferSummaryScreen() {
  const navigation = useNavigation();

  const handleConfirmOffer = () => {
    Alert.alert(
      'Offer Posted!',
      'Your delivery offer has been posted successfully. You will receive bids from transporters soon.',
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('MainTabs' as never),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={theme.colors.ink900} />
        </TouchableOpacity>
        <Text style={styles.title}>Offer Summary</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
      >
        <Card style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <StatusPill status="created" />
            <Text style={styles.statusText}>Your offer is ready to be posted</Text>
          </View>
        </Card>

        <Card style={styles.detailsCard}>
          <Text style={styles.sectionTitle}>Delivery Details</Text>
          
          <View style={styles.detailRow}>
            <Ionicons name="location-outline" size={20} color={theme.colors.ink600} />
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>From</Text>
              <Text style={styles.detailValue}>Dubai Mall, Dubai</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="location-outline" size={20} color={theme.colors.accent.teal} />
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>To</Text>
              <Text style={styles.detailValue}>Burj Khalifa, Dubai</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="cube-outline" size={20} color={theme.colors.ink600} />
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Package</Text>
              <Text style={styles.detailValue}>Electronics • 5 kg • 0.1 m³</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="time-outline" size={20} color={theme.colors.ink600} />
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Pickup Time</Text>
              <Text style={styles.detailValue}>Today, 2:00 PM</Text>
            </View>
          </View>
        </Card>

        <Card style={styles.priceCard}>
          <Text style={styles.sectionTitle}>Pricing</Text>
          
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Estimated Price</Text>
            <Text style={styles.priceValue}>$50</Text>
          </View>
          
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Price Range</Text>
            <Text style={styles.priceRangeValue}>$40 - $60</Text>
          </View>
        </Card>

        <Card style={styles.nextStepsCard}>
          <Text style={styles.sectionTitle}>What happens next?</Text>
          
          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <Text style={styles.stepText}>Your offer will be visible to transporters</Text>
          </View>

          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <Text style={styles.stepText}>Transporters will place bids on your offer</Text>
          </View>

          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <Text style={styles.stepText}>You can accept the best bid and start delivery</Text>
          </View>
        </Card>

        <View style={styles.footer}>
          <Button
            title="Post Offer"
            onPress={handleConfirmOffer}
            size="large"
            style={styles.confirmButton}
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
  statusCard: {
    marginBottom: theme.spacing.l,
    backgroundColor: theme.colors.accent.success + '10',
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusText: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.ink600,
    marginLeft: theme.spacing.m,
  },
  detailsCard: {
    marginBottom: theme.spacing.l,
  },
  sectionTitle: {
    fontSize: theme.typography.h4.fontSize,
    fontWeight: theme.typography.h4.fontWeight,
    color: theme.colors.ink900,
    marginBottom: theme.spacing.l,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.l,
  },
  detailContent: {
    flex: 1,
    marginLeft: theme.spacing.m,
  },
  detailLabel: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.colors.ink600,
    marginBottom: theme.spacing.s,
  },
  detailValue: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.ink900,
    fontWeight: '500',
  },
  priceCard: {
    marginBottom: theme.spacing.l,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.m,
  },
  priceLabel: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.ink600,
  },
  priceValue: {
    fontSize: theme.typography.h3.fontSize,
    fontWeight: '700',
    color: theme.colors.primary,
  },
  priceRangeValue: {
    fontSize: theme.typography.body.fontSize,
    fontWeight: '600',
    color: theme.colors.ink900,
  },
  nextStepsCard: {
    marginBottom: theme.spacing.l,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.l,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.m,
  },
  stepNumberText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.white,
  },
  stepText: {
    flex: 1,
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.ink600,
    lineHeight: 22,
  },
  footer: {
    marginTop: theme.spacing.l,
  },
  confirmButton: {
    width: '100%',
  },
});
