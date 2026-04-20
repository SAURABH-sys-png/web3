'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import { useUser } from '@clerk/nextjs';

const ChatContext = createContext(null);

export function ChatProvider({ children }) {
  const [chatClient, setChatClient] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    const initChat = async () => {
      try {
        setIsLoading(true);

        // Fetch token from our API
        const response = await fetch('/api/stream-token', { method: 'POST' });
        
        if (!response.ok) {
          throw new Error('Failed to fetch Stream token');
        }

        const { token, apiKey, userId } = await response.json();

        // Initialize Stream Chat client
        const client = StreamChat.getInstance(apiKey);

        // Connect user to Stream Chat
        await client.connectUser(
          {
            id: userId,
            name: user.fullName || user.username || userId,
            image: user.imageUrl,
          },
          token
        );

        setChatClient(client);
        setError(null);
      } catch (err) {
        console.error('Chat initialization error:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    initChat();

    // Cleanup: disconnect on unmount
    return () => {
      if (chatClient) {
        chatClient.disconnectUser();
      }
    };
  }, [user]);

  return (
    <ChatContext.Provider value={{ chatClient, isLoading, error }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within ChatProvider');
  }
  return context;
}
