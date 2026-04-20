"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useChatContext } from '@/components/ChatProvider';
import { useUser } from '@clerk/nextjs';

export default function UserChatPage() {
  const { chatClient, isLoading } = useChatContext();
  const { user } = useUser();
  const [channels, setChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [channelLoading, setChannelLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Load channels when chat client is ready
  useEffect(() => {
    if (!chatClient || isLoading) return;

    const loadChannels = async () => {
      try {
        setChannelLoading(true);
        // Query channels for current user
        const filter = {
          members: { $in: [chatClient.userID] },
        };

        const channelList = await chatClient.queryChannels(filter, { created_at: -1 });
        setChannels(channelList);

        // Select first channel by default
        if (channelList.length > 0) {
          loadChannelMessages(channelList[0]);
        }
      } catch (error) {
        console.error('Error loading channels:', error);
      } finally {
        setChannelLoading(false);
      }
    };

    loadChannels();
  }, [chatClient, isLoading]);

  // Load messages for selected channel
  const loadChannelMessages = async (channel) => {
    try {
      setSelectedChannel(channel);
      setChannelLoading(true);

      // Watch channel for updates
      await channel.watch();

      // Load messages
      const response = await channel.query({ messages: { limit: 50 } });
      setMessages(response.messages || []);
    } catch (error) {
      console.error('Error loading messages:', error);
    } finally {
      setChannelLoading(false);
    }
  };

  // Set up event listeners for the selected channel
  useEffect(() => {
    if (!selectedChannel) return;

    const handleNewMessage = (event) => {
      setMessages((prev) => {
        // Check if message already exists
        if (prev.some((m) => m.id === event.message.id)) {
          return prev;
        }
        return [...prev, event.message];
      });
    };

    const handleMessageUpdated = (event) => {
      setMessages((prev) =>
        prev.map((m) => (m.id === event.message.id ? event.message : m))
      );
    };

    const handleMessageDeleted = (event) => {
      setMessages((prev) => prev.filter((m) => m.id !== event.message.id));
    };

    // Add listeners
    selectedChannel.on('message.new', handleNewMessage);
    selectedChannel.on('message.updated', handleMessageUpdated);
    selectedChannel.on('message.deleted', handleMessageDeleted);

    // Cleanup: Remove listeners when channel changes
    return () => {
      selectedChannel.off('message.new', handleNewMessage);
      selectedChannel.off('message.updated', handleMessageUpdated);
      selectedChannel.off('message.deleted', handleMessageDeleted);
    };
  }, [selectedChannel]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Send message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() || !selectedChannel) return;

    try {
      await selectedChannel.sendMessage({
        text: message,
      });
      setMessage("");
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  // Format timestamp
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="flex h-screen bg-white text-gray-900 overflow-hidden font-sans">
      
      {/* 1. Sidebar (Contacts List) */}
      <aside className={`
        ${selectedChannel ? 'hidden md:flex' : 'flex'} 
        w-full md:w-80 lg:w-[400px] border-r border-gray-100 flex-col bg-white
      `}>
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-20">
          <h2 className="text-2xl font-black tracking-tight text-gray-900">
            Chats
          </h2>
          <Link href="/" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="px-6 py-4">
          <div className="relative group">
            <input 
              type="text" 
              placeholder="Search contacts..." 
              className="w-full bg-gray-100/80 border-none rounded-2xl px-11 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none"
            />
            <svg className="w-4 h-4 absolute left-4 top-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Contact List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {channelLoading ? (
            <div className="flex items-center justify-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
          ) : channels.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              <p>No chats yet. Start a conversation!</p>
            </div>
          ) : (
            channels.map((channel) => {
              const lastMessage = channel.state?.messages[channel.state.messages.length - 1];
              const channelName = channel.data?.name || channel.id;
              const lastMsg = lastMessage?.text || 'No messages';
              const lastTime = lastMessage ? formatTime(lastMessage.created_at) : '';

              return (
                <button
                  key={channel.id}
                  onClick={() => loadChannelMessages(channel)}
                  className={`
                    w-full flex items-center gap-4 px-6 py-4 transition-all duration-200
                    ${selectedChannel?.id === channel.id ? 'bg-indigo-50/80' : 'hover:bg-gray-50'}
                  `}
                >
                  <div className="relative flex-shrink-0">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-200 to-indigo-100 shadow-inner flex items-center justify-center">
                      <span className="text-lg font-bold text-indigo-600">
                        {channelName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-500 border-4 border-white rounded-full"></span>
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="font-bold text-gray-900 truncate">{channelName}</span>
                      <span className="text-[11px] font-medium text-gray-400 uppercase tracking-tighter">{lastTime}</span>
                    </div>
                    <p className="text-sm text-gray-500 truncate leading-snug">{lastMsg}</p>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </aside>

      {/* 2. Chat Area */}
      <main className={`
        flex-1 flex flex-col bg-white relative
        ${!selectedChannel ? 'hidden md:flex' : 'flex'}
      `}>
        {selectedChannel ? (
          <>
            {/* Chat Header */}
            <header className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white/80 backdrop-blur-xl z-20">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setSelectedChannel(null)} 
                  className="md:hidden p-2 -ml-2 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
                  <span className="text-sm font-bold text-indigo-600">
                    {(selectedChannel.data?.name || 'Chat').charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 leading-none mb-1">{selectedChannel.data?.name || 'Conversation'}</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-widest">Active</span>
                  </div>
                </div>
              </div>
            </header>

            {/* Messages Feed */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30">
              {channelLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                </div>
              ) : messages.length === 0 ? (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <p>No messages yet. Start the conversation!</p>
                </div>
              ) : (
                messages.map((msg, idx) => {
                  const isOwn = msg.user?.id === chatClient?.userID;
                  return (
                    <div key={msg.id || idx} className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
                      <div className={`
                        max-w-[75%] rounded-[24px] px-5 py-3.5
                        ${isOwn 
                          ? 'bg-black text-white rounded-br-none shadow-xl shadow-gray-200' 
                          : 'bg-white border border-gray-100 rounded-bl-none shadow-sm'
                        }
                      `}>
                        <p className={`text-[15px] leading-relaxed ${isOwn ? 'text-white' : 'text-gray-700'}`}>
                          {msg.text}
                        </p>
                        <span className={`text-xs mt-1 block ${isOwn ? 'text-gray-300' : 'text-gray-400'}`}>
                          {formatTime(msg.created_at)}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <footer className="p-6 bg-white border-t border-gray-100">
              <div className="max-w-4xl mx-auto">
                <form onSubmit={handleSendMessage} className="flex gap-4 items-center bg-gray-100/80 p-2 rounded-[28px] border border-gray-200/50">
                  <button 
                    type="button"
                    className="p-3 text-gray-400 hover:text-indigo-600 hover:bg-white rounded-full transition-all"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                  <input 
                    type="text" 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write a message..." 
                    className="flex-1 bg-transparent border-none focus:ring-0 text-[15px] py-2 placeholder-gray-400 text-gray-900"
                  />
                  <button 
                    type="submit"
                    disabled={!message.trim()}
                    className="bg-black text-white p-3 rounded-full hover:scale-105 active:scale-95 transition-all shadow-lg shadow-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="w-5 h-5 rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </form>
              </div>
            </footer>
          </>
        ) : (
          /* Empty State */
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center bg-gray-50/20">
            <div className="w-24 h-24 bg-white rounded-[32px] shadow-2xl shadow-indigo-100 flex items-center justify-center mb-8 rotate-12">
               <svg className="w-12 h-12 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-3">No Chat Selected</h3>
            <p className="text-gray-500 max-w-[280px] leading-relaxed">
              Choose a conversation from the sidebar to start messaging.
            </p>
          </div>
        )}
      </main>

    </div>
  );
}

