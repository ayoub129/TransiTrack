import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { rideAPI } from '../../services/api';

// Async thunks for ride management
export const requestRide = createAsyncThunk(
  'ride/request',
  async (rideData, { rejectWithValue }) => {
    try {
      const response = await rideAPI.requestRide(rideData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to request ride');
    }
  }
);

export const getActiveRide = createAsyncThunk(
  'ride/getActive',
  async (_, { rejectWithValue }) => {
    try {
      const response = await rideAPI.getActiveRide();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get active ride');
    }
  }
);

export const cancelRide = createAsyncThunk(
  'ride/cancel',
  async (rideId, { rejectWithValue }) => {
    try {
      const response = await rideAPI.cancelRide(rideId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to cancel ride');
    }
  }
);

const initialState = {
  currentRide: null,
  rideHistory: [],
  nearbyDrivers: [],
  isLoading: false,
  error: null,
  rideStatus: null, // 'requested', 'accepted', 'arrived', 'started', 'completed', 'cancelled'
};

const rideSlice = createSlice({
  name: 'ride',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    updateRideStatus: (state, action) => {
      if (state.currentRide) {
        state.currentRide.status = action.payload.status;
        state.rideStatus = action.payload.status;
      }
    },
    setNearbyDrivers: (state, action) => {
      state.nearbyDrivers = action.payload;
    },
    clearCurrentRide: (state) => {
      state.currentRide = null;
      state.rideStatus = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Request Ride
      .addCase(requestRide.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(requestRide.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentRide = action.payload;
        state.rideStatus = action.payload.status;
        state.error = null;
      })
      .addCase(requestRide.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Get Active Ride
      .addCase(getActiveRide.fulfilled, (state, action) => {
        state.currentRide = action.payload;
        state.rideStatus = action.payload?.status || null;
      })
      // Cancel Ride
      .addCase(cancelRide.fulfilled, (state, action) => {
        state.currentRide = action.payload;
        state.rideStatus = action.payload.status;
      });
  },
});

export const { clearError, updateRideStatus, setNearbyDrivers, clearCurrentRide } = rideSlice.actions;
export default rideSlice.reducer;
