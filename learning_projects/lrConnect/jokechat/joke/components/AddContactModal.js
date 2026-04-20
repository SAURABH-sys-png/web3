"use client";
import React, { useState } from 'react';

export default function AddContactModal({ isOpen, onClose, onAdd }) {
  const [userId, setUserId] = useState("");
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userId.trim()) {
      onAdd(userId.trim());
      setUserId("");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-[2rem] shadow-2xl overflow-hidden border border-gray-100">
        <div className="px-8 pt-8 pb-4 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-black text-gray-900">Add Contact</h2>
            <p className="text-gray-500 text-sm mt-1">Start a private chat</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="User ID..."
            className="w-full bg-gray-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white rounded-2xl px-5 py-4 text-gray-900 outline-none transition-all"
            required
          />
          <button type="submit" className="w-full px-6 py-4 bg-black text-white rounded-2xl font-bold hover:bg-gray-800 transition-all active:scale-95 shadow-lg">
            Add Contact
          </button>
        </form>
      </div>
    </div>
  );
}