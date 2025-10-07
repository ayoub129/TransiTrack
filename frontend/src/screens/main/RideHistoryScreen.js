import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

const RideHistoryScreen = () => {
  const { rideHistory } = useSelector((state) => state.user);

  const renderRideItem = ({ item }) => (
    <TouchableOpacity style={styles.rideItem}>
      <View style={styles.rideHeader}>
        <Text style={styles.rideDate}>{new Date(item.createdAt).toLocaleDateString()}</Text>
        <Text style={styles.rideStatus}>{item.status}</Text>
      </View>
      <Text style={styles.rideRoute}>
        {item.pickupLocation.address} → {item.dropoffLocation.address}
      </Text>
      <View style={styles.rideFooter}>
        <Text style={styles.rideFare}>${item.actualFare || item.estimatedFare}</Text>
        <Text style={styles.rideType}>{item.rideType}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ride History</Text>
      
      {rideHistory.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No rides yet</Text>
          <Text style={styles.emptySubtext}>Your ride history will appear here</Text>
        </View>
      ) : (
        <FlatList
          data={rideHistory}
          renderItem={renderRideItem}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  rideItem: {
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  rideHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  rideDate: {
    fontSize: 14,
    color: '#666',
  },
  rideStatus: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  rideRoute: {
    fontSize: 16,
    marginBottom: 8,
  },
  rideFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rideFare: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  rideType: {
    fontSize: 14,
    color: '#666',
    textTransform: 'capitalize',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666',
  },
});

export default RideHistoryScreen;
