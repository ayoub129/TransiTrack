import React, { useState } from 'react';
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
import { Input } from '../../components/atoms/Input';
import { Card } from '../../components/atoms/Card';
import { Chip } from '../../components/atoms/Chip';
import { useOffers } from '../../store/useOffers';
import { safeTheme as theme } from '../../lib/theme';
import { t } from '../../lib/i18n';

const goodsTypes = [
  'Electronics',
  'Documents',
  'Furniture',
  'Food',
  'Clothing',
  'Books',
  'Other',
];

export default function CreateOfferScreen() {
  const navigation = useNavigation();
  const { createOffer, isLoading } = useOffers();
  
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    goodsType: '',
    weight: '',
    volume: '',
    dateTime: '',
    description: '',
  });
  const [selectedGoodsType, setSelectedGoodsType] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.from) {
      newErrors.from = 'Pickup location is required';
    }
    
    if (!formData.to) {
      newErrors.to = 'Delivery location is required';
    }
    
    if (!selectedGoodsType) {
      newErrors.goodsType = 'Please select a goods type';
    }
    
    if (!formData.weight) {
      newErrors.weight = 'Weight is required';
    } else if (isNaN(Number(formData.weight)) || Number(formData.weight) <= 0) {
      newErrors.weight = 'Please enter a valid weight';
    }
    
    if (!formData.volume) {
      newErrors.volume = 'Volume is required';
    } else if (isNaN(Number(formData.volume)) || Number(formData.volume) <= 0) {
      newErrors.volume = 'Please enter a valid volume';
    }
    
    if (!formData.dateTime) {
      newErrors.dateTime = 'Date and time is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateOffer = async () => {
    if (!validateForm()) return;
    
    try {
      const offerData = {
        from: {
          address: formData.from,
          coordinates: { lat: 25.2048, lng: 55.2708 }, // Mock coordinates
        },
        to: {
          address: formData.to,
          coordinates: { lat: 25.1972, lng: 55.2744 }, // Mock coordinates
        },
        goodsType: selectedGoodsType,
        weight: Number(formData.weight),
        volume: Number(formData.volume),
        dateTime: formData.dateTime,
        estimatedPrice: 50, // Will be calculated in estimate screen
        priceRange: { min: 40, max: 60 },
      };
      
      await createOffer(offerData);
      navigation.navigate('CostEstimate' as never);
    } catch (error) {
      Alert.alert('Error', 'Failed to create offer. Please try again.');
    }
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
        <Text style={styles.title}>{t('createOffer', 'en')}</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Location Details</Text>
          
          <Input
            label="Pickup Location"
            placeholder="Enter pickup address"
            value={formData.from}
            onChangeText={(value) => updateField('from', value)}
            error={errors.from}
            leftIcon="location-outline"
            rightIcon="search-outline"
            required
          />

          <Input
            label="Delivery Location"
            placeholder="Enter delivery address"
            value={formData.to}
            onChangeText={(value) => updateField('to', value)}
            error={errors.to}
            leftIcon="location-outline"
            rightIcon="search-outline"
            required
          />
        </Card>

        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Package Details</Text>
          
          <View style={styles.goodsTypeSection}>
            <Text style={styles.label}>Goods Type *</Text>
            <View style={styles.goodsTypeGrid}>
              {goodsTypes.map((type) => (
                <Chip
                  key={type}
                  label={type}
                  selected={selectedGoodsType === type}
                  onPress={() => setSelectedGoodsType(type)}
                  style={styles.goodsTypeChip}
                />
              ))}
            </View>
            {errors.goodsType && (
              <Text style={styles.errorText}>{errors.goodsType}</Text>
            )}
          </View>

          <View style={styles.dimensionsRow}>
            <Input
              label="Weight (kg)"
              placeholder="0"
              value={formData.weight}
              onChangeText={(value) => updateField('weight', value)}
              error={errors.weight}
              keyboardType="numeric"
              style={styles.halfInput}
              required
            />
            <Input
              label="Volume (m³)"
              placeholder="0"
              value={formData.volume}
              onChangeText={(value) => updateField('volume', value)}
              error={errors.volume}
              keyboardType="numeric"
              style={styles.halfInput}
              required
            />
          </View>

          <Input
            label="Description (Optional)"
            placeholder="Describe your package"
            value={formData.description}
            onChangeText={(value) => updateField('description', value)}
            multiline
            numberOfLines={3}
          />
        </Card>

        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Schedule</Text>
          
          <Input
            label="Pickup Date & Time"
            placeholder="Select date and time"
            value={formData.dateTime}
            onChangeText={(value) => updateField('dateTime', value)}
            error={errors.dateTime}
            leftIcon="calendar-outline"
            rightIcon="time-outline"
            required
          />
        </Card>

        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Photos (Optional)</Text>
          <TouchableOpacity style={styles.photoButton}>
            <Ionicons name="camera-outline" size={24} color={theme.colors.ink600} />
            <Text style={styles.photoButtonText}>Add Photos</Text>
          </TouchableOpacity>
        </Card>

        <View style={styles.footer}>
          <Button
            title={t('getEstimate', 'en')}
            onPress={handleCreateOffer}
            loading={isLoading}
            size="large"
            style={styles.createButton}
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
  section: {
    marginBottom: theme.spacing.l,
  },
  sectionTitle: {
    fontSize: theme.typography.h4.fontSize,
    fontWeight: theme.typography.h4.fontWeight,
    color: theme.colors.ink900,
    marginBottom: theme.spacing.l,
  },
  goodsTypeSection: {
    marginBottom: theme.spacing.l,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.ink900,
    marginBottom: theme.spacing.s,
  },
  goodsTypeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.s,
  },
  goodsTypeChip: {
    marginBottom: theme.spacing.s,
  },
  errorText: {
    fontSize: 12,
    color: theme.colors.accent.danger,
    marginTop: theme.spacing.s,
  },
  dimensionsRow: {
    flexDirection: 'row',
    gap: theme.spacing.m,
  },
  halfInput: {
    flex: 1,
  },
  photoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.xl,
    borderWidth: 2,
    borderColor: theme.colors.border,
    borderStyle: 'dashed',
    borderRadius: theme.radii.l,
    backgroundColor: theme.colors.ink200,
  },
  photoButtonText: {
    fontSize: 16,
    color: theme.colors.ink600,
    marginLeft: theme.spacing.s,
  },
  footer: {
    marginTop: theme.spacing.l,
  },
  createButton: {
    width: '100%',
  },
});
