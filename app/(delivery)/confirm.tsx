import React, { useState } from 'react';
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
import { safeTheme as theme } from '../../lib/theme';
import { t } from '../../lib/i18n';

export default function ConfirmDeliveryScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { deliveryId } = route.params as { deliveryId: string };
  
  const [pin, setPin] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const handlePinInput = (digit: string) => {
    if (pin.length < 6) {
      setPin(prev => prev + digit);
    }
  };

  const handlePinDelete = () => {
    setPin(prev => prev.slice(0, -1));
  };

  const handleVerifyPin = async () => {
    if (pin.length !== 6) {
      Alert.alert('Invalid PIN', 'Please enter a 6-digit PIN');
      return;
    }

    setIsVerifying(true);
    
    // Simulate verification
    setTimeout(() => {
      setIsVerifying(false);
      if (pin === '123456') {
        Alert.alert(
          'Delivery Confirmed!',
          'The delivery has been successfully completed.',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('MainTabs' as never),
            },
          ]
        );
      } else {
        Alert.alert('Invalid PIN', 'The PIN you entered is incorrect. Please try again.');
        setPin('');
      }
    }, 2000);
  };

  const PinButton = ({ digit, onPress }: { digit: string; onPress: () => void }) => (
    <TouchableOpacity style={styles.pinButton} onPress={onPress}>
      <Text style={styles.pinButtonText}>{digit}</Text>
    </TouchableOpacity>
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
        <Text style={styles.title}>{t('confirmDelivery', 'en')}</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        <Card style={styles.instructionCard}>
          <View style={styles.instructionHeader}>
            <Ionicons name="shield-checkmark-outline" size={32} color={theme.colors.primary} />
            <Text style={styles.instructionTitle}>Verify Delivery</Text>
          </View>
          <Text style={styles.instructionText}>
            Please ask the recipient to provide the 6-digit confirmation PIN to complete the delivery.
          </Text>
        </Card>

        <Card style={styles.pinCard}>
          <Text style={styles.pinTitle}>{t('enterPin', 'en')}</Text>
          
          <View style={styles.pinDisplay}>
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <View
                key={index}
                style={[
                  styles.pinDot,
                  index < pin.length && styles.pinDotFilled,
                ]}
              />
            ))}
          </View>

          <View style={styles.pinGrid}>
            <View style={styles.pinRow}>
              <PinButton digit="1" onPress={() => handlePinInput('1')} />
              <PinButton digit="2" onPress={() => handlePinInput('2')} />
              <PinButton digit="3" onPress={() => handlePinInput('3')} />
            </View>
            <View style={styles.pinRow}>
              <PinButton digit="4" onPress={() => handlePinInput('4')} />
              <PinButton digit="5" onPress={() => handlePinInput('5')} />
              <PinButton digit="6" onPress={() => handlePinInput('6')} />
            </View>
            <View style={styles.pinRow}>
              <PinButton digit="7" onPress={() => handlePinInput('7')} />
              <PinButton digit="8" onPress={() => handlePinInput('8')} />
              <PinButton digit="9" onPress={() => handlePinInput('9')} />
            </View>
            <View style={styles.pinRow}>
              <View style={styles.pinButton} />
              <PinButton digit="0" onPress={() => handlePinInput('0')} />
              <TouchableOpacity style={styles.pinButton} onPress={handlePinDelete}>
                <Ionicons name="backspace-outline" size={24} color={theme.colors.ink600} />
              </TouchableOpacity>
            </View>
          </View>
        </Card>

        <Card style={styles.deliveryCard}>
          <Text style={styles.deliveryTitle}>Delivery Information</Text>
          
          <View style={styles.deliveryRow}>
            <Ionicons name="person-outline" size={20} color={theme.colors.ink600} />
            <View style={styles.deliveryContent}>
              <Text style={styles.deliveryLabel}>Recipient</Text>
              <Text style={styles.deliveryValue}>Ahmed Hassan</Text>
            </View>
          </View>

          <View style={styles.deliveryRow}>
            <Ionicons name="location-outline" size={20} color={theme.colors.ink600} />
            <View style={styles.deliveryContent}>
              <Text style={styles.deliveryLabel}>Delivery Address</Text>
              <Text style={styles.deliveryValue}>Burj Khalifa, Dubai</Text>
            </View>
          </View>

          <View style={styles.deliveryRow}>
            <Ionicons name="cube-outline" size={20} color={theme.colors.ink600} />
            <View style={styles.deliveryContent}>
              <Text style={styles.deliveryLabel}>Package</Text>
              <Text style={styles.deliveryValue}>Electronics • 5 kg</Text>
            </View>
          </View>
        </Card>

        <View style={styles.footer}>
          <Button
            title="Verify & Complete"
            onPress={handleVerifyPin}
            loading={isVerifying}
            disabled={pin.length !== 6}
            size="large"
            style={styles.verifyButton}
          />
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
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: theme.spacing.xl,
  },
  instructionCard: {
    alignItems: 'center',
    marginBottom: theme.spacing.l,
    backgroundColor: theme.colors.primary200,
  },
  instructionHeader: {
    alignItems: 'center',
    marginBottom: theme.spacing.m,
  },
  instructionTitle: {
    fontSize: theme.typography.h4.fontSize,
    fontWeight: theme.typography.h4.fontWeight,
    color: theme.colors.ink900,
    marginTop: theme.spacing.m,
  },
  instructionText: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.ink600,
    textAlign: 'center',
    lineHeight: 24,
  },
  pinCard: {
    alignItems: 'center',
    marginBottom: theme.spacing.l,
  },
  pinTitle: {
    fontSize: theme.typography.h4.fontSize,
    fontWeight: theme.typography.h4.fontWeight,
    color: theme.colors.ink900,
    marginBottom: theme.spacing.xl,
  },
  pinDisplay: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: theme.spacing['4xl'],
    gap: theme.spacing.m,
  },
  pinDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: theme.colors.ink400,
  },
  pinDotFilled: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  pinGrid: {
    width: '100%',
    maxWidth: 300,
  },
  pinRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.l,
  },
  pinButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: theme.colors.ink200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinButtonText: {
    fontSize: 24,
    fontWeight: '600',
    color: theme.colors.ink900,
  },
  deliveryCard: {
    marginBottom: theme.spacing.l,
  },
  deliveryTitle: {
    fontSize: theme.typography.h4.fontSize,
    fontWeight: theme.typography.h4.fontWeight,
    color: theme.colors.ink900,
    marginBottom: theme.spacing.l,
  },
  deliveryRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.l,
  },
  deliveryContent: {
    flex: 1,
    marginLeft: theme.spacing.m,
  },
  deliveryLabel: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.colors.ink600,
    marginBottom: theme.spacing.s,
  },
  deliveryValue: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.ink900,
    fontWeight: '500',
  },
  footer: {
    marginTop: 'auto',
  },
  verifyButton: {
    width: '100%',
  },
});
