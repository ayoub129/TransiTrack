import { theme } from './theme';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: 'client' | 'transporter';
  avatar?: string;
  isOnline?: boolean;
  kycStatus?: 'pending' | 'approved' | 'rejected';
  vehicleInfo?: VehicleInfo;
  serviceZones?: ServiceZone[];
}

export interface VehicleInfo {
  type: 'motorcycle' | 'car' | 'van' | 'truck';
  licensePlate: string;
  capacity: number;
  photos: string[];
}

export interface ServiceZone {
  id: string;
  name: string;
  center: { lat: number; lng: number };
  radius: number;
}

export interface Offer {
  id: string;
  clientId: string;
  client: User;
  from: Location;
  to: Location;
  goodsType: string;
  weight: number;
  volume: number;
  photos: string[];
  dateTime: string;
  estimatedPrice: number;
  priceRange: { min: number; max: number };
  status: 'active' | 'assigned' | 'completed' | 'cancelled';
  bids: Bid[];
  createdAt: string;
}

export interface Location {
  address: string;
  coordinates: { lat: number; lng: number };
}

export interface Bid {
  id: string;
  transporterId: string;
  transporter: User;
  offerId: string;
  amount: number;
  message?: string;
  status: 'pending' | 'accepted' | 'rejected' | 'countered';
  counterAmount?: number;
  createdAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  sender: User;
  content: string;
  type: 'text' | 'image' | 'location';
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
  offerId?: string;
  createdAt: string;
}

export interface Delivery {
  id: string;
  offerId: string;
  offer: Offer;
  transporterId: string;
  transporter: User;
  status: 'assigned' | 'picked_up' | 'in_transit' | 'delivered';
  pickupTime?: string;
  deliveryTime?: string;
  trackingHistory: TrackingPoint[];
  confirmationPin?: string;
}

export interface TrackingPoint {
  id: string;
  coordinates: { lat: number; lng: number };
  timestamp: string;
  status: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'offer' | 'bid' | 'message' | 'delivery';
  title: string;
  message: string;
  data?: any;
  read: boolean;
  createdAt: string;
}

// Mock data
const mockUsers: User[] = [
  {
    id: '1',
    email: 'client@example.com',
    firstName: 'Ahmed',
    lastName: 'Hassan',
    phone: '+1234567890',
    role: 'client',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: '2',
    email: 'transporter@example.com',
    firstName: 'Mohamed',
    lastName: 'Ali',
    phone: '+1234567891',
    role: 'transporter',
    avatar: 'https://i.pravatar.cc/150?img=2',
    isOnline: true,
    kycStatus: 'approved',
    vehicleInfo: {
      type: 'van',
      licensePlate: 'ABC-123',
      capacity: 1000,
      photos: ['https://picsum.photos/400/300?random=1'],
    },
    serviceZones: [
      {
        id: '1',
        name: 'Downtown',
        center: { lat: 25.2048, lng: 55.2708 },
        radius: 10,
      },
    ],
  },
];

const mockOffers: Offer[] = [
  {
    id: '1',
    clientId: '1',
    client: mockUsers[0],
    from: {
      address: 'Dubai Mall, Dubai',
      coordinates: { lat: 25.1972, lng: 55.2796 },
    },
    to: {
      address: 'Burj Khalifa, Dubai',
      coordinates: { lat: 25.1972, lng: 55.2744 },
    },
    goodsType: 'Electronics',
    weight: 5,
    volume: 0.1,
    photos: ['https://picsum.photos/400/300?random=2'],
    dateTime: '2024-01-15T10:00:00Z',
    estimatedPrice: 50,
    priceRange: { min: 40, max: 60 },
    status: 'active',
    bids: [],
    createdAt: '2024-01-14T08:00:00Z',
  },
];

const mockBids: Bid[] = [
  {
    id: '1',
    transporterId: '2',
    transporter: mockUsers[1],
    offerId: '1',
    amount: 45,
    message: 'I can deliver this within 2 hours',
    status: 'pending',
    createdAt: '2024-01-14T09:00:00Z',
  },
];

const mockMessages: Message[] = [
  {
    id: '1',
    conversationId: '1',
    senderId: '1',
    sender: mockUsers[0],
    content: 'Hello, when can you pick up the package?',
    type: 'text',
    timestamp: '2024-01-14T10:00:00Z',
    read: true,
  },
  {
    id: '2',
    conversationId: '1',
    senderId: '2',
    sender: mockUsers[1],
    content: 'I can pick it up in 30 minutes',
    type: 'text',
    timestamp: '2024-01-14T10:05:00Z',
    read: false,
  },
];

const mockConversations: Conversation[] = [
  {
    id: '1',
    participants: [mockUsers[0], mockUsers[1]],
    lastMessage: mockMessages[1],
    unreadCount: 1,
    offerId: '1',
    createdAt: '2024-01-14T10:00:00Z',
  },
];

const mockDeliveries: Delivery[] = [
  {
    id: '1',
    offerId: '1',
    offer: mockOffers[0],
    transporterId: '2',
    transporter: mockUsers[1],
    status: 'assigned',
    trackingHistory: [
      {
        id: '1',
        coordinates: { lat: 25.1972, lng: 55.2796 },
        timestamp: '2024-01-14T10:00:00Z',
        status: 'assigned',
      },
    ],
    confirmationPin: '123456',
  },
];

const mockNotifications: Notification[] = [
  {
    id: '1',
    userId: '1',
    type: 'bid',
    title: 'New Bid Received',
    message: 'Mohamed Ali placed a bid of $45 for your offer',
    data: { bidId: '1', offerId: '1' },
    read: false,
    createdAt: '2024-01-14T09:00:00Z',
  },
];

// Mock API functions
export const mockApi = {
  // Auth
  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const user = mockUsers.find(u => u.email === email);
    if (!user) throw new Error('User not found');
    return { user, token: 'mock-token' };
  },

  async register(userData: Partial<User>): Promise<{ user: User; token: string }> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const user: User = {
      id: Date.now().toString(),
      email: userData.email!,
      firstName: userData.firstName!,
      lastName: userData.lastName!,
      phone: userData.phone!,
      role: userData.role!,
      ...userData,
    };
    mockUsers.push(user);
    return { user, token: 'mock-token' };
  },

  // Offers
  async getOffers(filters?: any): Promise<Offer[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockOffers;
  },

  async createOffer(offerData: Partial<Offer>): Promise<Offer> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const offer: Offer = {
      id: Date.now().toString(),
      clientId: '1',
      client: mockUsers[0],
      from: offerData.from!,
      to: offerData.to!,
      goodsType: offerData.goodsType!,
      weight: offerData.weight!,
      volume: offerData.volume!,
      photos: offerData.photos || [],
      dateTime: offerData.dateTime!,
      estimatedPrice: offerData.estimatedPrice!,
      priceRange: offerData.priceRange!,
      status: 'active',
      bids: [],
      createdAt: new Date().toISOString(),
    };
    mockOffers.push(offer);
    return offer;
  },

  async getOffer(id: string): Promise<Offer> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const offer = mockOffers.find(o => o.id === id);
    if (!offer) throw new Error('Offer not found');
    return offer;
  },

  // Bids
  async getBids(offerId: string): Promise<Bid[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockBids.filter(b => b.offerId === offerId);
  },

  async placeBid(bidData: Partial<Bid>): Promise<Bid> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const bid: Bid = {
      id: Date.now().toString(),
      transporterId: bidData.transporterId!,
      transporter: mockUsers[1],
      offerId: bidData.offerId!,
      amount: bidData.amount!,
      message: bidData.message,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    mockBids.push(bid);
    return bid;
  },

  async acceptBid(bidId: string): Promise<Delivery> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const bid = mockBids.find(b => b.id === bidId);
    if (!bid) throw new Error('Bid not found');
    
    bid.status = 'accepted';
    const delivery: Delivery = {
      id: Date.now().toString(),
      offerId: bid.offerId,
      offer: mockOffers[0],
      transporterId: bid.transporterId,
      transporter: mockUsers[1],
      status: 'assigned',
      trackingHistory: [
        {
          id: '1',
          coordinates: { lat: 25.1972, lng: 55.2796 },
          timestamp: new Date().toISOString(),
          status: 'assigned',
        },
      ],
      confirmationPin: Math.floor(100000 + Math.random() * 900000).toString(),
    };
    mockDeliveries.push(delivery);
    return delivery;
  },

  // Messages
  async getConversations(userId: string): Promise<Conversation[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockConversations;
  },

  async getMessages(conversationId: string): Promise<Message[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockMessages.filter(m => m.conversationId === conversationId);
  },

  async sendMessage(messageData: Partial<Message>): Promise<Message> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const message: Message = {
      id: Date.now().toString(),
      conversationId: messageData.conversationId!,
      senderId: messageData.senderId!,
      sender: mockUsers[0],
      content: messageData.content!,
      type: 'text',
      timestamp: new Date().toISOString(),
      read: false,
    };
    mockMessages.push(message);
    return message;
  },

  // Deliveries
  async getDeliveries(userId: string): Promise<Delivery[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockDeliveries;
  },

  async updateDeliveryStatus(deliveryId: string, status: string): Promise<Delivery> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const delivery = mockDeliveries.find(d => d.id === deliveryId);
    if (!delivery) throw new Error('Delivery not found');
    
    delivery.status = status as any;
    delivery.trackingHistory.push({
      id: Date.now().toString(),
      coordinates: { lat: 25.1972, lng: 55.2744 },
      timestamp: new Date().toISOString(),
      status,
    });
    
    return delivery;
  },

  // Notifications
  async getNotifications(userId: string): Promise<Notification[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockNotifications;
  },

  async markNotificationRead(notificationId: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 200));
    const notification = mockNotifications.find(n => n.id === notificationId);
    if (notification) notification.read = true;
  },
};
