const mongoose = require('mongoose');

const driverLocationSchema = new mongoose.Schema({
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    }
  },
  status: {
    type: String,
    enum: ['offline', 'online', 'busy'],
    default: 'offline'
  },
  heading: {
    type: Number, // direction in degrees (0-360)
    default: 0
  },
  speed: {
    type: Number, // in km/h
    default: 0
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  isAvailable: {
    type: Boolean,
    default: false
  },
  currentRide: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ride',
    default: null
  }
}, {
  timestamps: true
});

// Create geospatial index for finding nearby drivers
driverLocationSchema.index({ location: '2dsphere' });
driverLocationSchema.index({ driver: 1, status: 1 });

module.exports = mongoose.model('DriverLocation', driverLocationSchema);
