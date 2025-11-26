import React, { useState } from 'react';
import { Bell, Send, User, MessageCircle, Lock, Radio } from 'lucide-react';
import { Notification } from '../types';

const initialNotifications: Notification[] = [
  { id: '1', title: 'New Query Assigned', message: 'You have been assigned a new query #DB25/00785 for Japan Tour.', senderName: 'System', timestamp: '2 mins ago', type: 'System', recipientId: '1' },
  { id: '2', title: 'Urgent Update', message: 'Flight prices for London have increased by 15%. Update quotes accordingly.', senderName: 'Sarah Smith', timestamp: '1 hour ago', type: 'Message', recipientId: null }, // Null means Broadcast
  { id: '3', title: 'Payment Received', message: 'Full payment received from Global Travels Inc for Invoice #INV-992.', senderName: 'System', timestamp: '3 hours ago', type: 'System', recipientId: '1' },
];

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [newMessage, setNewMessage] = useState('');
  const [messageType, setMessageType] = useState<'Broadcast' | 'Direct'>('Broadcast');

  const handlePost = () => {
    if (!newMessage.trim()) return;
    
    const notification: Notification = {
      id: Math.random().toString(),
      title: messageType === 'Broadcast' ? 'Team Announcement' : 'Direct Message',
      message: newMessage,
      senderName: 'John Doe', // Current User
      timestamp: 'Just now',
      type: 'Message',
      recipientId: messageType === 'Broadcast' ? null : '2' // Simulated recipient ID
    };
    
    setNotifications([notification, ...notifications]);
    setNewMessage('');
  };

  return (
    <div className="p-8 h-full flex flex-col max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800">Notifications & Feed</h2>
        <p className="text-slate-500 mt-1">Stay updated with system alerts and team messages.</p>
      </div>

      {/* Post Message Input */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 mb-8">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-bold text-slate-700 uppercase flex items-center gap-2">
              <MessageCircle size={16} className="text-blue-500"/> Post Update
          </h3>
          <div className="flex gap-4 text-xs">
            <label className="flex items-center gap-1 cursor-pointer">
              <input type="radio" checked={messageType === 'Broadcast'} onChange={() => setMessageType('Broadcast')} className="text-blue-600" />
              <Radio size={12} /> Broadcast
            </label>
            <label className="flex items-center gap-1 cursor-pointer">
              <input type="radio" checked={messageType === 'Direct'} onChange={() => setMessageType('Direct')} className="text-blue-600" />
              <Lock size={12} /> Direct Msg
            </label>
          </div>
        </div>
        
        <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold flex-shrink-0">
                JD
            </div>
            <div className="flex-1">
                <textarea 
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder={messageType === 'Broadcast' ? "Share an update with everyone..." : "Message a specific user..."}
                    className="w-full border border-slate-200 rounded-lg p-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px] resize-none"
                />
                <div className="flex justify-end mt-2">
                    <button 
                        onClick={handlePost}
                        disabled={!newMessage.trim()}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
                    >
                        <Send size={16} /> Post
                    </button>
                </div>
            </div>
        </div>
      </div>

      {/* Timeline Feed */}
      <div className="space-y-6">
        {notifications.map((notif, idx) => (
            <div key={notif.id} className="relative pl-8">
                {/* Timeline Line */}
                {idx !== notifications.length - 1 && (
                    <div className="absolute left-[15px] top-10 bottom-[-24px] w-0.5 bg-slate-200"></div>
                )}
                
                {/* Icon */}
                <div className={`absolute left-0 top-1 w-8 h-8 rounded-full flex items-center justify-center border-2 border-white shadow-sm z-10 ${
                  notif.type === 'System' ? 'bg-orange-100 text-orange-600' : 
                  notif.recipientId === null ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'
                }`}>
                    {notif.type === 'System' ? <Bell size={14} /> : notif.recipientId === null ? <Radio size={14} /> : <User size={14} />}
                </div>

                {/* Content Card */}
                <div className="bg-white rounded-lg border border-slate-100 p-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-slate-800">{notif.senderName}</span>
                          {notif.recipientId === null && notif.type !== 'System' && (
                            <span className="text-[10px] px-1.5 py-0.5 bg-purple-50 text-purple-600 rounded border border-purple-100 uppercase font-bold tracking-wide">Broadcast</span>
                          )}
                        </div>
                        <span className="text-xs text-slate-400">{notif.timestamp}</span>
                    </div>
                    <h4 className="text-sm font-semibold text-slate-700 mb-1">{notif.title}</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">{notif.message}</p>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;