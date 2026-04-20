"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useChatContext } from '@/components/ChatProvider';
import { useUser } from '@clerk/nextjs';
import { startDirectMessage } from '@/lib/streamChatHelpers';
import { useRouter } from 'next/navigation';

export default function ContactsPage() {
  const { chatClient, isLoading } = useChatContext();
  const { user } = useUser();
  const router = useRouter();
  const [allUsers, setAllUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [userLoading, setUserLoading] = useState(false);
  const [creatingChat, setCreatingChat] = useState(false);

  // Load all users (mock - in real app, fetch from your backend)
  useEffect(() => {
    if (!chatClient || isLoading) return;

    const loadUsers = async () => {
      try {
        setUserLoading(true);
        // Query all users
        const response = await chatClient.queryUsers({}, { created_at: -1 });
        // Filter out current user
        const otherUsers = response.users.filter((u) => u.id !== chatClient.userID);
        setAllUsers(otherUsers);
      } catch (error) {
        console.error('Error loading users:', error);
      } finally {
        setUserLoading(false);
      }
    };

    loadUsers();
  }, [chatClient, isLoading]);

  const filteredUsers = allUsers.filter((u) =>
    (u.name || u.id).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStartChat = async (targetUser) => {
    if (!chatClient) return;

    try {
      setCreatingChat(true);
      const channel = await startDirectMessage(chatClient, targetUser.id, targetUser.name || targetUser.id);
      // Redirect to chat page
      router.push('/userchat');
    } catch (error) {
      console.error('Error creating chat:', error);
    } finally {
      setCreatingChat(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Contacts</h1>
              <p className="text-gray-600">Find and start conversations</p>
            </div>
            <Link
              href="/userchat"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Back to Chats
            </Link>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-5 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition"
            />
            <svg
              className="w-5 h-5 absolute right-4 top-3.5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Users Grid */}
        {userLoading ? (
          <div className="flex items-center justify-center p-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center p-12 bg-gray-50 rounded-xl">
            <p className="text-gray-600">
              {searchTerm ? "No contacts found matching your search" : "No other users available"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredUsers.map((contact) => (
              <div
                key={contact.id}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:border-indigo-300 hover:shadow-lg transition"
              >
                {/* Avatar */}
                <div className="mb-4">
                  {contact.image ? (
                    <img
                      src={contact.image}
                      alt={contact.name || contact.id}
                      className="w-full h-40 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-40 bg-gradient-to-br from-indigo-200 to-indigo-100 rounded-lg flex items-center justify-center">
                      <span className="text-4xl font-bold text-indigo-600">
                        {(contact.name || contact.id).charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="mb-4">
                  <h3 className="font-bold text-gray-900 text-lg mb-1">
                    {contact.name || contact.id}
                  </h3>
                  {contact.status && (
                    <p className="text-sm text-gray-500">{contact.status}</p>
                  )}
                </div>

                {/* Action Button */}
                <button
                  onClick={() => handleStartChat(contact)}
                  disabled={creatingChat}
                  className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  {creatingChat ? "Creating..." : "Start Chat"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
