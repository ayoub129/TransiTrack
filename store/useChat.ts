import { create } from 'zustand';
import { mockApi, type Conversation, type Message } from '../lib/api.mock';

interface ChatState {
  conversations: Conversation[];
  currentConversation: Conversation | null;
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchConversations: (userId: string) => Promise<void>;
  fetchMessages: (conversationId: string) => Promise<void>;
  sendMessage: (messageData: Partial<Message>) => Promise<void>;
  addMessage: (message: Message) => void;
  markAsRead: (conversationId: string) => void;
  clearError: () => void;
}

export const useChat = create<ChatState>((set, get) => ({
  conversations: [],
  currentConversation: null,
  messages: [],
  isLoading: false,
  error: null,

  fetchConversations: async (userId: string) => {
    set({ isLoading: true, error: null });
    try {
      const conversations = await mockApi.getConversations(userId);
      set({ conversations, isLoading: false });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to fetch conversations', isLoading: false });
    }
  },

  fetchMessages: async (conversationId: string) => {
    set({ isLoading: true, error: null });
    try {
      const messages = await mockApi.getMessages(conversationId);
      const conversation = get().conversations.find(c => c.id === conversationId);
      set({ 
        messages, 
        currentConversation: conversation || null,
        isLoading: false 
      });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to fetch messages', isLoading: false });
    }
  },

  sendMessage: async (messageData: Partial<Message>) => {
    set({ isLoading: true, error: null });
    try {
      const message = await mockApi.sendMessage(messageData);
      set(state => ({
        messages: [...state.messages, message],
        conversations: state.conversations.map(conv => 
          conv.id === message.conversationId
            ? { ...conv, lastMessage: message, unreadCount: 0 }
            : conv
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to send message', isLoading: false });
    }
  },

  addMessage: (message: Message) => {
    set(state => ({
      messages: [...state.messages, message],
      conversations: state.conversations.map(conv => 
        conv.id === message.conversationId
          ? { ...conv, lastMessage: message, unreadCount: conv.unreadCount + 1 }
          : conv
      ),
    }));
  },

  markAsRead: (conversationId: string) => {
    set(state => ({
      conversations: state.conversations.map(conv => 
        conv.id === conversationId
          ? { ...conv, unreadCount: 0 }
          : conv
      ),
      messages: state.messages.map(msg => 
        msg.conversationId === conversationId
          ? { ...msg, read: true }
          : msg
      ),
    }));
  },

  clearError: () => set({ error: null }),
}));
