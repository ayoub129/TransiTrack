import { create } from 'zustand';
import { mockApi, type Offer, type Bid } from '../lib/api.mock';

interface OffersState {
  offers: Offer[];
  currentOffer: Offer | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchOffers: (filters?: any) => Promise<void>;
  createOffer: (offerData: Partial<Offer>) => Promise<Offer>;
  getOffer: (id: string) => Promise<void>;
  addBid: (bid: Bid) => void;
  acceptBid: (bidId: string) => Promise<void>;
  clearError: () => void;
}

export const useOffers = create<OffersState>((set, get) => ({
  offers: [],
  currentOffer: null,
  isLoading: false,
  error: null,

  fetchOffers: async (filters?: any) => {
    set({ isLoading: true, error: null });
    try {
      const offers = await mockApi.getOffers(filters);
      set({ offers, isLoading: false });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to fetch offers', isLoading: false });
    }
  },

  createOffer: async (offerData: Partial<Offer>) => {
    set({ isLoading: true, error: null });
    try {
      const offer = await mockApi.createOffer(offerData);
      set(state => ({ 
        offers: [offer, ...state.offers], 
        isLoading: false 
      }));
      return offer;
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to create offer', isLoading: false });
      throw error;
    }
  },

  getOffer: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const offer = await mockApi.getOffer(id);
      set({ currentOffer: offer, isLoading: false });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to fetch offer', isLoading: false });
    }
  },

  addBid: (bid: Bid) => {
    set(state => ({
      offers: state.offers.map(offer => 
        offer.id === bid.offerId 
          ? { ...offer, bids: [...offer.bids, bid] }
          : offer
      ),
      currentOffer: state.currentOffer?.id === bid.offerId
        ? { ...state.currentOffer, bids: [...state.currentOffer.bids, bid] }
        : state.currentOffer,
    }));
  },

  acceptBid: async (bidId: string) => {
    set({ isLoading: true, error: null });
    try {
      await mockApi.acceptBid(bidId);
      set(state => ({
        offers: state.offers.map(offer => ({
          ...offer,
          bids: offer.bids.map(bid => 
            bid.id === bidId ? { ...bid, status: 'accepted' as const } : bid
          ),
          status: 'assigned' as const,
        })),
        currentOffer: state.currentOffer ? {
          ...state.currentOffer,
          bids: state.currentOffer.bids.map(bid => 
            bid.id === bidId ? { ...bid, status: 'accepted' as const } : bid
          ),
          status: 'assigned' as const,
        } : null,
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to accept bid', isLoading: false });
    }
  },

  clearError: () => set({ error: null }),
}));
