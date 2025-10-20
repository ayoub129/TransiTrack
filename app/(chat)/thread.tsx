import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../../components/atoms/Button';
import { useChat } from '../../store/useChat';
import { useAuth } from '../../store/useAuth';
import { safeTheme as theme } from '../../lib/theme';
import { t } from '../../lib/i18n';

export default function ChatThreadScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { conversationId } = route.params as { conversationId: string };
  const { user } = useAuth();
  const { messages, sendMessage, fetchMessages, isLoading } = useChat();
  
  const [messageText, setMessageText] = useState('');

  useEffect(() => {
    fetchMessages(conversationId);
  }, [conversationId]);

  const handleSendMessage = async () => {
    if (!messageText.trim()) return;
    
    try {
      await sendMessage({
        conversationId,
        senderId: user?.id!,
        content: messageText.trim(),
      });
      setMessageText('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Mock messages data
  const mockMessages = [
    {
      id: '1',
      conversationId: '1',
      senderId: '1',
      sender: {
        id: '1',
        email: 'client@example.com',
        firstName: 'Ahmed',
        lastName: 'Hassan',
        phone: '+1234567890',
        role: 'client' as const,
      },
      content: 'Hello, when can you pick up the package?',
      type: 'text' as const,
      timestamp: '2024-01-14T10:00:00Z',
      read: true,
    },
    {
      id: '2',
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
      content: 'I can pick it up in 30 minutes. Is that okay?',
      type: 'text' as const,
      timestamp: '2024-01-14T10:05:00Z',
      read: false,
    },
    {
      id: '3',
      conversationId: '1',
      senderId: '1',
      sender: {
        id: '1',
        email: 'client@example.com',
        firstName: 'Ahmed',
        lastName: 'Hassan',
        phone: '+1234567890',
        role: 'client' as const,
      },
      content: 'Perfect! I\'ll be waiting at the main entrance.',
      type: 'text' as const,
      timestamp: '2024-01-14T10:10:00Z',
      read: true,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={theme.colors.ink900} />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>Mohamed Ali</Text>
          <Text style={styles.headerSubtitle}>Transporter</Text>
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <Ionicons name="ellipsis-vertical" size={24} color={theme.colors.ink900} />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          {mockMessages.map((message) => {
            const isOwnMessage = message.senderId === user?.id;
            
            return (
              <View
                key={message.id}
                style={[
                  styles.messageContainer,
                  isOwnMessage ? styles.ownMessageContainer : styles.otherMessageContainer,
                ]}
              >
                <View
                  style={[
                    styles.messageBubble,
                    isOwnMessage ? styles.ownMessageBubble : styles.otherMessageBubble,
                  ]}
                >
                  <Text
                    style={[
                      styles.messageText,
                      isOwnMessage ? styles.ownMessageText : styles.otherMessageText,
                    ]}
                  >
                    {message.content}
                  </Text>
                  <Text
                    style={[
                      styles.messageTime,
                      isOwnMessage ? styles.ownMessageTime : styles.otherMessageTime,
                    ]}
                  >
                    {formatTime(message.timestamp)}
                  </Text>
                </View>
              </View>
            );
          })}
        </ScrollView>

        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder={t('typeMessage', 'en')}
              placeholderTextColor={theme.colors.ink400}
              value={messageText}
              onChangeText={setMessageText}
              multiline
              maxLength={500}
            />
            <TouchableOpacity style={styles.attachButton}>
              <Ionicons name="attach" size={20} color={theme.colors.ink600} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[
              styles.sendButton,
              messageText.trim() ? styles.sendButtonActive : styles.sendButtonInactive,
            ]}
            onPress={handleSendMessage}
            disabled={!messageText.trim()}
          >
            <Ionicons
              name="send"
              size={20}
              color={messageText.trim() ? theme.colors.white : theme.colors.ink400}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.l,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  backButton: {
    padding: theme.spacing.s,
    marginRight: theme.spacing.s,
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    fontSize: theme.typography.h4.fontSize,
    fontWeight: theme.typography.h4.fontWeight,
    color: theme.colors.ink900,
  },
  headerSubtitle: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.colors.ink600,
  },
  moreButton: {
    padding: theme.spacing.s,
  },
  content: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: theme.spacing.l,
    paddingBottom: theme.spacing.xl,
  },
  messageContainer: {
    marginBottom: theme.spacing.m,
  },
  ownMessageContainer: {
    alignItems: 'flex-end',
  },
  otherMessageContainer: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: theme.spacing.l,
    paddingVertical: theme.spacing.m,
    borderRadius: theme.radii['2xl'],
  },
  ownMessageBubble: {
    backgroundColor: theme.colors.primary,
    borderBottomRightRadius: theme.radii.s,
  },
  otherMessageBubble: {
    backgroundColor: theme.colors.ink200,
    borderBottomLeftRadius: theme.radii.s,
  },
  messageText: {
    fontSize: theme.typography.body.fontSize,
    lineHeight: 20,
  },
  ownMessageText: {
    color: theme.colors.white,
  },
  otherMessageText: {
    color: theme.colors.ink900,
  },
  messageTime: {
    fontSize: 11,
    marginTop: theme.spacing.s,
  },
  ownMessageTime: {
    color: theme.colors.white,
    opacity: 0.8,
  },
  otherMessageTime: {
    color: theme.colors.ink600,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: theme.spacing.l,
    paddingVertical: theme.spacing.m,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    backgroundColor: theme.colors.white,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: theme.colors.ink200,
    borderRadius: theme.radii['2xl'],
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.s,
    marginRight: theme.spacing.m,
  },
  textInput: {
    flex: 1,
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.ink900,
    maxHeight: 100,
    paddingVertical: 0,
  },
  attachButton: {
    padding: theme.spacing.s,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonActive: {
    backgroundColor: theme.colors.primary,
  },
  sendButtonInactive: {
    backgroundColor: theme.colors.ink200,
  },
});
