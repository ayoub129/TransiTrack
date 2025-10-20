import React, { useState } from 'react';
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
import { Button } from '../../components/atoms/Button';
import { Card } from '../../components/atoms/Card';
import { safeTheme as theme } from '../../lib/theme';
import { t } from '../../lib/i18n';

export default function CostEstimateScreen() {
  const navigation = useNavigation();
  
  const [weightMultiplier, setWeightMultiplier] = useState(1.0);
  const [vehicleMultiplier, setVehicleMultiplier] = useState(1.0);
  const [urgencyMultiplier, setUrgencyMultiplier] = useState(1.0);

  // Mock calculation
  const basePrice = 30;
  const distance = 5.2; // km
  const estimatedPrice = Math.round(
    basePrice * distance * weightMultiplier * vehicleMultiplier * urgencyMultiplier
  );

  const priceRange = {
    min: Math.round(estimatedPrice * 0.8),
    max: Math.round(estimatedPrice * 1.2),
  };

  const handlePostOffer = () => {
    navigation.navigate('OfferSummary' as never);
  };

  const Slider = ({ 
    value, 
    onValueChange, 
    min = 0.5, 
    max = 2.0, 
    step = 0.1,
    label,
    description 
  }: {
    value: number;
    onValueChange: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
    label: string;
    description: string;
  }) => (
    <View style={styles.sliderContainer}>
      <View style={styles.sliderHeader}>
        <Text style={styles.sliderLabel}>{label}</Text>
        <Text style={styles.sliderValue}>{value.toFixed(1)}x</Text>
      </View>
      <Text style={styles.sliderDescription}>{description}</Text>
      <View style={styles.sliderTrack}>
        <View 
          style={[
            styles.sliderProgress, 
            { width: `${((value - min) / (max - min)) * 100}%` }
          ]} 
        />
        <TouchableOpacity
          style={[
            styles.sliderThumb,
            { left: `${((value - min) / (max - min)) * 100}%` }
          ]}
          onPress={() => {
            // Simple increment/decrement for demo
            const newValue = value + step;
            if (newValue <= max) {
              onValueChange(newValue);
            }
          }}
        />
      </View>
      <View style={styles.sliderLabels}>
        <Text style={styles.sliderMinMax}>{min}x</Text>
        <Text style={styles.sliderMinMax}>{max}x</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={theme.colors.ink900} />
        </TouchableOpacity>
        <Text style={styles.title}>{t('costEstimate', 'en')}</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
      >
        <Card style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <Ionicons name="location-outline" size={24} color={theme.colors.primary} />
            <Text style={styles.summaryTitle}>Route Summary</Text>
          </View>
          <View style={styles.summaryDetails}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Distance</Text>
              <Text style={styles.summaryValue}>{distance} km</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Estimated Time</Text>
              <Text style={styles.summaryValue}>25 min</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Base Price</Text>
              <Text style={styles.summaryValue}>${basePrice}</Text>
            </View>
          </View>
        </Card>

        <Card style={styles.slidersCard}>
          <Text style={styles.sectionTitle}>Price Adjustments</Text>
          <Text style={styles.sectionSubtitle}>
            Adjust these factors to get a more accurate estimate
          </Text>

          <Slider
            value={weightMultiplier}
            onValueChange={setWeightMultiplier}
            label="Weight Factor"
            description="Heavier packages require more effort"
          />

          <Slider
            value={vehicleMultiplier}
            onValueChange={setVehicleMultiplier}
            label="Vehicle Type"
            description="Larger vehicles cost more to operate"
          />

          <Slider
            value={urgencyMultiplier}
            onValueChange={setUrgencyMultiplier}
            label="Urgency"
            description="Express delivery costs more"
          />
        </Card>

        <Card style={styles.priceCard}>
          <View style={styles.priceHeader}>
            <Text style={styles.priceTitle}>{t('estimatedPrice', 'en')}</Text>
            <Text style={styles.priceAmount}>${estimatedPrice}</Text>
          </View>
          
          <View style={styles.priceRange}>
            <Text style={styles.priceRangeLabel}>{t('priceRange', 'en')}</Text>
            <Text style={styles.priceRangeValue}>
              ${priceRange.min} - ${priceRange.max}
            </Text>
          </View>

          <View style={styles.priceNote}>
            <Ionicons name="information-circle-outline" size={16} color={theme.colors.ink600} />
            <Text style={styles.priceNoteText}>
              {t('termsNote', 'en')}
            </Text>
          </View>
        </Card>

        <View style={styles.footer}>
          <Button
            title={t('postOffer', 'en')}
            onPress={handlePostOffer}
            size="large"
            style={styles.postButton}
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
  summaryCard: {
    marginBottom: theme.spacing.l,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.l,
  },
  summaryTitle: {
    fontSize: theme.typography.h4.fontSize,
    fontWeight: theme.typography.h4.fontWeight,
    color: theme.colors.ink900,
    marginLeft: theme.spacing.s,
  },
  summaryDetails: {
    gap: theme.spacing.m,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.ink600,
  },
  summaryValue: {
    fontSize: theme.typography.body.fontSize,
    fontWeight: '600',
    color: theme.colors.ink900,
  },
  slidersCard: {
    marginBottom: theme.spacing.l,
  },
  sectionTitle: {
    fontSize: theme.typography.h4.fontSize,
    fontWeight: theme.typography.h4.fontWeight,
    color: theme.colors.ink900,
    marginBottom: theme.spacing.s,
  },
  sectionSubtitle: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.colors.ink600,
    marginBottom: theme.spacing.xl,
  },
  sliderContainer: {
    marginBottom: theme.spacing.xl,
  },
  sliderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.s,
  },
  sliderLabel: {
    fontSize: theme.typography.body.fontSize,
    fontWeight: '500',
    color: theme.colors.ink900,
  },
  sliderValue: {
    fontSize: theme.typography.body.fontSize,
    fontWeight: '600',
    color: theme.colors.primary,
  },
  sliderDescription: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.colors.ink600,
    marginBottom: theme.spacing.m,
  },
  sliderTrack: {
    height: 8,
    backgroundColor: theme.colors.ink200,
    borderRadius: 4,
    position: 'relative',
    marginBottom: theme.spacing.s,
  },
  sliderProgress: {
    height: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
  },
  sliderThumb: {
    position: 'absolute',
    top: -6,
    width: 20,
    height: 20,
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    marginLeft: -10,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sliderMinMax: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.colors.ink600,
  },
  priceCard: {
    marginBottom: theme.spacing.l,
    backgroundColor: theme.colors.primary200,
  },
  priceHeader: {
    alignItems: 'center',
    marginBottom: theme.spacing.l,
  },
  priceTitle: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.ink600,
    marginBottom: theme.spacing.s,
  },
  priceAmount: {
    fontSize: 36,
    fontWeight: '700',
    color: theme.colors.primary,
  },
  priceRange: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.l,
  },
  priceRangeLabel: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.ink600,
  },
  priceRangeValue: {
    fontSize: theme.typography.body.fontSize,
    fontWeight: '600',
    color: theme.colors.ink900,
  },
  priceNote: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  priceNoteText: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.colors.ink600,
    marginLeft: theme.spacing.s,
    flex: 1,
    lineHeight: 18,
  },
  footer: {
    marginTop: theme.spacing.l,
  },
  postButton: {
    width: '100%',
  },
});
