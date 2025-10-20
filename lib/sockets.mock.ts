import { mockApi, type Message, type Bid, type Notification } from './api.mock';

export interface SocketEvent {
  type: 'message' | 'bid' | 'notification' | 'delivery_update';
  data: any;
}

class MockSocket {
  private listeners: Map<string, Function[]> = new Map();
  private intervalId: NodeJS.Timeout | null = null;

  connect() {
    console.log('Mock socket connected');
    this.startMockEvents();
  }

  disconnect() {
    console.log('Mock socket disconnected');
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  on(event: string, callback: Function) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(callback);
  }

  off(event: string, callback: Function) {
    const listeners = this.listeners.get(event);
    if (listeners) {
      const index = listeners.indexOf(callback);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }
  }

  emit(event: string, data: any) {
    console.log('Mock socket emit:', event, data);
    // Simulate server response for certain events
    if (event === 'send_message') {
      setTimeout(() => {
        this.trigger('message_received', {
          id: Date.now().toString(),
          conversationId: data.conversationId,
          senderId: data.senderId,
          content: data.content,
          type: 'text',
          timestamp: new Date().toISOString(),
          read: false,
        });
      }, 1000);
    }
  }

  private trigger(event: string, data: any) {
    const listeners = this.listeners.get(event);
    if (listeners) {
      listeners.forEach(callback => callback(data));
    }
  }

  private startMockEvents() {
    // Simulate random events every 10-30 seconds
    this.intervalId = setInterval(() => {
      const events = [
        this.simulateNewMessage.bind(this),
        this.simulateNewBid.bind(this),
        this.simulateNotification.bind(this),
        this.simulateDeliveryUpdate.bind(this),
      ];
      
      const randomEvent = events[Math.floor(Math.random() * events.length)];
      randomEvent();
    }, Math.random() * 20000 + 10000); // 10-30 seconds
  }

  private simulateNewMessage() {
    const mockMessage: Message = {
      id: Date.now().toString(),
      conversationId: '1',
      senderId: '2',
      sender: {
        id: '2',
        email: 'transporter@example.com',
        firstName: 'Mohamed',
        lastName: 'Ali',
        phone: '+1234567891',
        role: 'transporter',
        avatar: 'https://i.pravatar.cc/150?img=2',
      },
      content: 'I\'m on my way to pick up the package',
      type: 'text',
      timestamp: new Date().toISOString(),
      read: false,
    };

    this.trigger('message_received', mockMessage);
  }

  private simulateNewBid() {
    const mockBid: Bid = {
      id: Date.now().toString(),
      transporterId: '2',
      transporter: {
        id: '2',
        email: 'transporter@example.com',
        firstName: 'Mohamed',
        lastName: 'Ali',
        phone: '+1234567891',
        role: 'transporter',
        avatar: 'https://i.pravatar.cc/150?img=2',
      },
      offerId: '1',
      amount: Math.floor(Math.random() * 20) + 40, // 40-60
      message: 'I can deliver this efficiently',
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    this.trigger('bid_received', mockBid);
  }

  private simulateNotification() {
    const notifications = [
      {
        type: 'offer',
        title: 'New Offer Available',
        message: 'A new delivery offer is available in your area',
      },
      {
        type: 'bid',
        title: 'Bid Accepted',
        message: 'Your bid has been accepted for the delivery offer',
      },
      {
        type: 'delivery',
        title: 'Delivery Update',
        message: 'Your package has been picked up and is in transit',
      },
    ];

    const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
    const mockNotification: Notification = {
      id: Date.now().toString(),
      userId: '1',
      type: randomNotification.type as any,
      title: randomNotification.title,
      message: randomNotification.message,
      read: false,
      createdAt: new Date().toISOString(),
    };

    this.trigger('notification_received', mockNotification);
  }

  private simulateDeliveryUpdate() {
    const updates = [
      { status: 'picked_up', message: 'Package has been picked up' },
      { status: 'in_transit', message: 'Package is in transit' },
      { status: 'delivered', message: 'Package has been delivered' },
    ];

    const randomUpdate = updates[Math.floor(Math.random() * updates.length)];
    
    this.trigger('delivery_update', {
      deliveryId: '1',
      status: randomUpdate.status,
      message: randomUpdate.message,
      timestamp: new Date().toISOString(),
      coordinates: {
        lat: 25.1972 + (Math.random() - 0.5) * 0.01,
        lng: 55.2744 + (Math.random() - 0.5) * 0.01,
      },
    });
  }
}

export const mockSocket = new MockSocket();

// Export for use in components
export const useSocket = () => {
  return {
    socket: mockSocket,
    connect: () => mockSocket.connect(),
    disconnect: () => mockSocket.disconnect(),
    on: (event: string, callback: Function) => mockSocket.on(event, callback),
    off: (event: string, callback: Function) => mockSocket.off(event, callback),
    emit: (event: string, data: any) => mockSocket.emit(event, data),
  };
};
