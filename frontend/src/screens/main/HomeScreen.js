import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import { requestRide } from '../../store/slices/rideSlice';

const HomeScreen = ({ navigation }) => {
  const [pickupLocation, setPickupLocation] = useState(null);
  const [dropoffLocation, setDropoffLocation] = useState(null);
  const [rideType, setRideType] = useState('economy');
  
  const dispatch = useDispatch();
  const { currentRide, isLoading } = useSelector((state) => state.ride);
  const { user } = useSelector((state) => state.auth);

  const handleRequestRide = async () => {
    if (!pickupLocation || !dropoffLocation) {
      Alert.alert('Error', 'Please select pickup and dropoff locations');
      return;
    }

    const rideData = {
      pickupLocation,
      dropoffLocation,
      rideType,
      paymentMethod: 'card',
    };

    try {
      await dispatch(requestRide(rideData)).unwrap();
      navigation.navigate('RideTracking');
    } catch (error) {
      Alert.alert('Error', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {pickupLocation && (
            <Marker
              coordinate={pickupLocation}
              title="Pickup Location"
              pinColor="green"
            />
          )}
          {dropoffLocation && (
            <Marker
              coordinate={dropoffLocation}
              title="Dropoff Location"
              pinColor="red"
            />
          )}
        </MapView>
      </View>

      <View style={styles.bottomPanel}>
        <Text style={styles.welcomeText}>Welcome, {user?.firstName}!</Text>
        
        <View style={styles.locationInputs}>
          <TouchableOpacity style={styles.locationButton}>
            <Text style={styles.locationButtonText}>
              {pickupLocation ? 'Pickup: Selected' : 'Select Pickup Location'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.locationButton}>
            <Text style={styles.locationButtonText}>
              {dropoffLocation ? 'Dropoff: Selected' : 'Select Dropoff Location'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.rideTypeSelector}>
          <Text style={styles.rideTypeLabel}>Ride Type:</Text>
          <View style={styles.rideTypeButtons}>
            {['economy', 'comfort', 'premium'].map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.rideTypeButton,
                  rideType === type && styles.rideTypeButtonActive
                ]}
                onPress={() => setRideType(type)}
              >
                <Text style={[
                  styles.rideTypeButtonText,
                  rideType === type && styles.rideTypeButtonTextActive
                ]}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={[styles.requestButton, isLoading && styles.requestButtonDisabled]}
          onPress={handleRequestRide}
          disabled={isLoading}
        >
          <Text style={styles.requestButtonText}>
            {isLoading ? 'Requesting Ride...' : 'Request Ride'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  bottomPanel: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  locationInputs: {
    marginBottom: 20,
  },
  locationButton: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
  },
  locationButtonText: {
    fontSize: 16,
    color: '#666',
  },
  rideTypeSelector: {
    marginBottom: 20,
  },
  rideTypeLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  rideTypeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rideTypeButton: {
    flex: 1,
    padding: 12,
    marginHorizontal: 4,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  rideTypeButtonActive: {
    backgroundColor: '#000',
  },
  rideTypeButtonText: {
    fontSize: 14,
    color: '#666',
  },
  rideTypeButtonTextActive: {
    color: '#fff',
  },
  requestButton: {
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  requestButtonDisabled: {
    backgroundColor: '#ccc',
  },
  requestButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
