import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../../components/atoms/Button';
import { Card } from '../../components/atoms/Card';
import { StatusPill } from '../../components/atoms/StatusPill';
import { safeTheme as theme } from '../../lib/theme';
import { t } from '../../lib/i18n';

export default function LiveTrackingScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { deliveryId } = route.params as { deliveryId: string };
  
  const [deliveryStatus, setDeliveryStatus] = useState('assigned');
  const [currentStep, setCurrentStep] = useState(0);

  const deliverySteps = [
    { id: 'assigned', label: 'Assigned', icon: 'person-outline' },
    { id: 'picked_up', label: 'Picked Up', icon: 'cube-outline' },
    { id: 'in_transit', label: 'In Transit', icon: 'car-outline' },
    { id: 'delivered', label: 'Delivered', icon: 'checkmark-circle-outline' },
  ];

  const handleStatusUpdate = (status: string) => {
    Alert.alert(
      'Update Status',
      `Mark delivery as ${status.replace('_', ' ')}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          onPress: () => {
            setDeliveryStatus(status);
            setCurrentStep(deliverySteps.findIndex(step => step.id === status));
          },
        },
      ]
    );
  };

  const handleConfirmDelivery = () => {
    navigation.navigate('ConfirmDelivery' as never, { deliveryId } as never);
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
        <Text style={styles.title}>Live Tracking</Text>
        <TouchableOpacity style={styles.moreButton}>
          <Ionicons name="ellipsis-vertical" size={24} color={theme.colors.ink900} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* Map Placeholder */}
        <View style={styles.mapContainer}>
          <View style={styles.mapPlaceholder}>
            <Ionicons name="map-outline" size={64} color={theme.colors.ink400} />
            <Text style={styles.mapText}>Live Map View</Text>
            <Text style={styles.mapSubtext}>Real-time tracking will be shown here</Text>
          </View>
        </View>

        {/* Delivery Status */}
        <Card style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <Text style={styles.statusTitle}>Delivery Status</Text>
            <StatusPill status={deliveryStatus as any} />
          </View>
          
          <View style={styles.stepsContainer}>
            {deliverySteps.map((step, index) => (
              <View key={step.id} style={styles.stepContainer}>
                <View style={styles.stepContent}>
                  <View
                    style={[
                      styles.stepIcon,
                      index <= currentStep && styles.stepIconActive,
                    ]}
                  >
                    <Ionicons
                      name={step.icon as any}
                      size={20}
                      color={index <= currentStep ? theme.colors.white : theme.colors.ink400}
                    />
                  </View>
                  <Text
                    style={[
                      styles.stepLabel,
                      index <= currentStep && styles.stepLabelActive,
                    ]}
                  >
                    {step.label}
                  </Text>
                </View>
                {index < deliverySteps.length - 1 && (
                  <View
                    style={[
                      styles.stepLine,
                      index < currentStep && styles.stepLineActive,
                    ]}
                  />
                )}
              </View>
            ))}
          </View>
        </Card>

        {/* Delivery Details */}
        <Card style={styles.detailsCard}>
          <Text style={styles.detailsTitle}>Delivery Details</Text>
          
          <View style={styles.detailRow}>
            <Ionicons name="cube-outline" size={20} color={theme.colors.ink600} />
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Package</Text>
              <Text style={styles.detailValue}>Electronics • 5 kg</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="location-outline" size={20} color={theme.colors.primary} />
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
            <Ionicons name="person-outline" size={20} color={theme.colors.ink600} />
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Transporter</Text>
              <Text style={styles.detailValue}>Mohamed Ali</Text>
            </View>
          </View>
        </Card>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          {deliveryStatus === 'assigned' && (
            <Button
              title={t('startDelivery', 'en')}
              onPress={() => handleStatusUpdate('picked_up')}
              size="large"
              style={styles.actionButton}
            />
          )}
          
          {deliveryStatus === 'picked_up' && (
            <Button
              title={t('inTransit', 'en')}
              onPress={() => handleStatusUpdate('in_transit')}
              size="large"
              style={styles.actionButton}
            />
          )}
          
          {deliveryStatus === 'in_transit' && (
            <Button
              title={t('confirmDelivery', 'en')}
              onPress={handleConfirmDelivery}
              size="large"
              style={styles.actionButton}
            />
          )}
        </View>
      </View>
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
  moreButton: {
    padding: theme.spacing.s,
  },
  content: {
    flex: 1,
  },
  mapContainer: {
    height: 300,
    backgroundColor: theme.colors.ink200,
  },
  mapPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapText: {
    fontSize: theme.typography.h4.fontSize,
    fontWeight: theme.typography.h4.fontWeight,
    color: theme.colors.ink600,
    marginTop: theme.spacing.m,
  },
  mapSubtext: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.colors.ink600,
    marginTop: theme.spacing.s,
  },
  statusCard: {
    margin: theme.spacing.xl,
    marginBottom: theme.spacing.l,
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.l,
  },
  statusTitle: {
    fontSize: theme.typography.h4.fontSize,
    fontWeight: theme.typography.h4.fontWeight,
    color: theme.colors.ink900,
  },
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stepContainer: {
    flex: 1,
    alignItems: 'center',
  },
  stepContent: {
    alignItems: 'center',
  },
  stepIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.ink200,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.s,
  },
  stepIconActive: {
    backgroundColor: theme.colors.primary,
  },
  stepLabel: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.colors.ink600,
    textAlign: 'center',
  },
  stepLabelActive: {
    color: theme.colors.ink900,
    fontWeight: '600',
  },
  stepLine: {
    position: 'absolute',
    top: 20,
    left: '50%',
    width: '100%',
    height: 2,
    backgroundColor: theme.colors.ink200,
    zIndex: -1,
  },
  stepLineActive: {
    backgroundColor: theme.colors.primary,
  },
  detailsCard: {
    marginHorizontal: theme.spacing.xl,
    marginBottom: theme.spacing.l,
  },
  detailsTitle: {
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
  actionsContainer: {
    paddingHorizontal: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },
  actionButton: {
    width: '100%',
  },
});
