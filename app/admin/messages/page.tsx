'use client';

import { useEffect, useState } from 'react';
import { Message } from '@/lib/types';

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/admin/messages', {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }

      const data = await response.json();
      setMessages(data.data || []);
    } catch (err) {
      setError('Failed to load messages');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this message?')) return;

    try {
      const response = await fetch(`/api/admin/messages/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        setMessages(messages.filter((m) => m._id !== id));
      }
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Failed to delete message');
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading messages...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Contact Messages</h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">
          {error}
        </div>
      )}

      {messages.length === 0 ? (
        <div className="bg-gray-50 p-8 rounded-lg text-center text-gray-600">
          No messages yet.
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message._id} className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{message.firstName}</h3>
                  <p className="text-gray-600">{message.email}</p>
                </div>
                <button
                  onClick={() => handleDelete(message._id as string)}
                  className="text-red-600 hover:underline text-sm"
                >
                  Delete
                </button>
              </div>

              <h4 className="font-semibold text-gray-800 mb-2">Subject: {message.subject}</h4>
              <p className="text-gray-700 mb-4 whitespace-pre-wrap">{message.message}</p>

              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>{new Date(message.createdAt || '').toLocaleString()}</span>
                <span className={`px-3 py-1 rounded-full ${message.read ? 'bg-gray-200' : 'bg-blue-200'}`}>
                  {message.read ? 'Read' : 'Unread'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
