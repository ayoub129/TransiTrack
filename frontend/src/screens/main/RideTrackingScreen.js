import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useSelector, useDispatch } from 'react-redux';
import { cancelRide, updateRideStatus } from '../../store/slices/rideSlice';

const RideTrackingScreen = ({ navigation }) => {
  const [driverLocation, setDriverLocation] = useState(null);
  const dispatch = useDispatch();
  const { currentRide } = useSelector((state) => state.ride);

  useEffect(() => {
    // TODO: Set up real-time tracking
    // This would connect to WebSocket for live updates
  }, []);

  const handleCancelRide = () => {
    Alert.alert(
      'Cancel Ride',
      'Are you sure you want to cancel this ride?',
      [
        { text: 'No', style: 'cancel' },
        { 
          text: 'Yes', 
          onPress: async () => {
            try {
              await dispatch(cancelRide(currentRide._id)).unwrap();
              navigation.goBack();
            } catch (error) {
              Alert.alert('Error', error);
            }
          }
        }
      ]
    );
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'requested': return 'Looking for a driver...';
      case 'accepted': return 'Driver is on the way';
      case 'arrived': return 'Driver has arrived';
      case 'started': return 'Ride in progress';
      case 'completed': return 'Ride completed';
      case 'cancelled': return 'Ride cancelled';
      default: return 'Unknown status';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'requested': return '#FFA500';
      case 'accepted': return '#007AFF';
      case 'arrived': return '#34C759';
      case 'started': return '#007AFF';
      case 'completed': return '#34C759';
      case 'cancelled': return '#FF3B30';
      default: return '#666';
    }
  };

  if (!currentRide) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No active ride found</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: currentRide.pickupLocation.coordinates.coordinates[1],
            longitude: currentRide.pickupLocation.coordinates.coordinates[0],
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{
              latitude: currentRide.pickupLocation.coordinates.coordinates[1],
              longitude: currentRide.pickupLocation.coordinates.coordinates[0],
            }}
            title="Pickup Location"
            pinColor="green"
          />
          <Marker
            coordinate={{
              latitude: currentRide.dropoffLocation.coordinates.coordinates[1],
              longitude: currentRide.dropoffLocation.coordinates.coordinates[0],
            }}
            title="Dropoff Location"
            pinColor="red"
          />
          {driverLocation && (
            <Marker
              coordinate={driverLocation}
              title="Driver"
              pinColor="blue"
            />
          )}
        </MapView>
      </View>

      <View style={styles.bottomPanel}>
        <View style={styles.statusSection}>
          <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(currentRide.status) }]} />
          <Text style={styles.statusText}>{getStatusText(currentRide.status)}</Text>
        </View>

        {currentRide.driver && (
          <View style={styles.driverSection}>
            <Text style={styles.driverName}>{currentRide.driver.fullName}</Text>
            <Text style={styles.vehicleInfo}>
              {currentRide.driver.driverInfo?.vehicleInfo?.make} {currentRide.driver.driverInfo?.vehicleInfo?.model}
            </Text>
            <Text style={styles.licensePlate}>
              {currentRide.driver.driverInfo?.vehicleInfo?.plateNumber}
            </Text>
          </View>
        )}

        <View style={styles.rideInfo}>
          <Text style={styles.rideInfoText}>
            From: {currentRide.pickupLocation.address}
          </Text>
          <Text style={styles.rideInfoText}>
            To: {currentRide.dropoffLocation.address}
          </Text>
          <Text style={styles.rideInfoText}>
            Fare: ${currentRide.estimatedFare}
          </Text>
        </View>

        {(currentRide.status === 'requested' || currentRide.status === 'accepted') && (
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancelRide}>
            <Text style={styles.cancelButtonText}>Cancel Ride</Text>
          </TouchableOpacity>
        )}
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
  statusSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  statusText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  driverSection: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  driverName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  vehicleInfo: {
    fontSize: 16,
    color: '#666',
    marginBottom: 2,
  },
  licensePlate: {
    fontSize: 14,
    color: '#999',
  },
  rideInfo: {
    marginBottom: 20,
  },
  rideInfoText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  cancelButton: {
    backgroundColor: '#ff4444',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RideTrackingScreen;
