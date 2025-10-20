import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../../components/atoms/Card';
import { Badge } from '../../components/atoms/Badge';
import { useChat } from '../../store/useChat';
import { useAuth } from '../../store/useAuth';
import { safeTheme as theme } from '../../lib/theme';
import { t } from '../../lib/i18n';

export default function ConversationsScreen() {
  const navigation = useNavigation();
  const { user } = useAuth();
  const { conversations, fetchConversations, isLoading } = useChat();

  useEffect(() => {
    if (user?.id) {
      fetchConversations(user.id);
    }
  }, [user?.id]);

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      });
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
    }
  };

  const handleConversationPress = (conversationId: string) => {
    navigation.navigate('ChatThread' as never, { conversationId } as never);
  };

  // Mock conversations data
  const mockConversations = [
    {
      id: '1',
      participants: [
        {
          id: '1',
          email: 'client@example.com',
          firstName: 'Ahmed',
          lastName: 'Hassan',
          phone: '+1234567890',
          role: 'client' as const,
          avatar: 'https://i.pravatar.cc/150?img=1',
        },
        {
          id: '2',
          email: 'transporter@example.com',
          firstName: 'Mohamed',
          lastName: 'Ali',
          phone: '+1234567891',
          role: 'transporter' as const,
          avatar: 'https://i.pravatar.cc/150?img=2',
        },
      ],
      lastMessage: {
        id: '1',
        conversationId: '1',
        senderId: '2',
        sender: {
          id: '2',
          email: 'transporter@example.com',
          firstName: 'Mohamed',
          lastName: 'Ali',
          phone: '+1234567891',
          role: 'transporter' as const,
        },
        content: 'I can pick it up in 30 minutes',
        type: 'text' as const,
        timestamp: '2024-01-14T10:05:00Z',
        read: false,
      },
      unreadCount: 1,
      offerId: '1',
      createdAt: '2024-01-14T10:00:00Z',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('conversations', 'en')}</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search-outline" size={24} color={theme.colors.ink900} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
      >
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading conversations...</Text>
          </View>
        ) : mockConversations.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons
              name="chatbubbles-outline"
              size={64}
              color={theme.colors.ink400}
            />
            <Text style={styles.emptyTitle}>No conversations yet</Text>
            <Text style={styles.emptySubtitle}>
              Start a conversation when you accept a bid or create an offer
            </Text>
          </View>
        ) : (
          <View style={styles.conversationsList}>
            {mockConversations.map((conversation) => {
              const otherParticipant = conversation.participants.find(
                p => p.id !== user?.id
              );
              
              return (
                <Card
                  key={conversation.id}
                  onPress={() => handleConversationPress(conversation.id)}
                  style={styles.conversationCard}
                >
                  <View style={styles.conversationHeader}>
                    <View style={styles.avatar}>
                      <Text style={styles.avatarText}>
                        {otherParticipant?.firstName[0]}{otherParticipant?.lastName[0]}
                      </Text>
                    </View>
                    
                    <View style={styles.conversationInfo}>
                      <View style={styles.conversationTop}>
                        <Text style={styles.participantName}>
                          {otherParticipant?.firstName} {otherParticipant?.lastName}
                        </Text>
                        <Text style={styles.timestamp}>
                          {conversation.lastMessage && formatTime(conversation.lastMessage.timestamp)}
                        </Text>
                      </View>
                      
                      <View style={styles.conversationBottom}>
                        <Text 
                          style={[
                            styles.lastMessage,
                            !conversation.lastMessage?.read && styles.unreadMessage
                          ]}
                          numberOfLines={1}
                        >
                          {conversation.lastMessage?.content || 'No messages yet'}
                        </Text>
                        
                        {conversation.unreadCount > 0 && (
                          <Badge
                            label={conversation.unreadCount}
                            variant="primary"
                            size="small"
                          />
                        )}
                      </View>
                    </View>
                  </View>
                </Card>
              );
            })}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.l,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  title: {
    fontSize: theme.typography.h2.fontSize,
    fontWeight: theme.typography.h2.fontWeight,
    color: theme.colors.ink900,
  },
  searchButton: {
    padding: theme.spacing.s,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: theme.spacing.xl,
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: theme.spacing['4xl'],
  },
  loadingText: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.ink600,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: theme.spacing['4xl'],
  },
  emptyTitle: {
    fontSize: theme.typography.h3.fontSize,
    fontWeight: theme.typography.h3.fontWeight,
    color: theme.colors.ink900,
    marginTop: theme.spacing.l,
    marginBottom: theme.spacing.s,
  },
  emptySubtitle: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.ink600,
    textAlign: 'center',
    lineHeight: 24,
  },
  conversationsList: {
    gap: theme.spacing.m,
  },
  conversationCard: {
    padding: theme.spacing.l,
  },
  conversationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.primary200,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.m,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.primary,
  },
  conversationInfo: {
    flex: 1,
  },
  conversationTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.s,
  },
  participantName: {
    fontSize: theme.typography.body.fontSize,
    fontWeight: '600',
    color: theme.colors.ink900,
  },
  timestamp: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.colors.ink600,
  },
  conversationBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    flex: 1,
    fontSize: theme.typography.caption.fontSize,
    color: theme.colors.ink600,
    marginRight: theme.spacing.s,
  },
  unreadMessage: {
    fontWeight: '600',
    color: theme.colors.ink900,
  },
});
