import { create } from 'zustand';
import { mockApi, type Delivery, type TrackingPoint } from '../lib/api.mock';

interface DeliveryState {
  deliveries: Delivery[];
  currentDelivery: Delivery | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchDeliveries: (userId: string) => Promise<void>;
  getDelivery: (id: string) => Promise<void>;
  updateDeliveryStatus: (deliveryId: string, status: string) => Promise<void>;
  addTrackingPoint: (deliveryId: string, point: TrackingPoint) => void;
  clearError: () => void;
}

export const useDelivery = create<DeliveryState>((set, get) => ({
  deliveries: [],
  currentDelivery: null,
  isLoading: false,
  error: null,

  fetchDeliveries: async (userId: string) => {
    set({ isLoading: true, error: null });
    try {
      const deliveries = await mockApi.getDeliveries(userId);
      set({ deliveries, isLoading: false });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to fetch deliveries', isLoading: false });
    }
  },

  getDelivery: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const deliveries = get().deliveries;
      const delivery = deliveries.find(d => d.id === id);
      if (delivery) {
        set({ currentDelivery: delivery, isLoading: false });
      } else {
        set({ error: 'Delivery not found', isLoading: false });
      }
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to fetch delivery', isLoading: false });
    }
  },

  updateDeliveryStatus: async (deliveryId: string, status: string) => {
    set({ isLoading: true, error: null });
    try {
      const updatedDelivery = await mockApi.updateDeliveryStatus(deliveryId, status);
      set(state => ({
        deliveries: state.deliveries.map(delivery => 
          delivery.id === deliveryId ? updatedDelivery : delivery
        ),
        currentDelivery: state.currentDelivery?.id === deliveryId 
          ? updatedDelivery 
          : state.currentDelivery,
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to update delivery status', isLoading: false });
    }
  },

  addTrackingPoint: (deliveryId: string, point: TrackingPoint) => {
    set(state => ({
      deliveries: state.deliveries.map(delivery => 
        delivery.id === deliveryId 
          ? { ...delivery, trackingHistory: [...delivery.trackingHistory, point] }
          : delivery
      ),
      currentDelivery: state.currentDelivery?.id === deliveryId
        ? { ...state.currentDelivery, trackingHistory: [...state.currentDelivery.trackingHistory, point] }
        : state.currentDelivery,
    }));
  },

  clearError: () => set({ error: null }),
}));
