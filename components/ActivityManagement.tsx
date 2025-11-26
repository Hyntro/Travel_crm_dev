
import React, { useState } from 'react';
import { Plus, Phone, Calendar, CheckSquare, Clock, MapPin, Search } from 'lucide-react';
import { Activity, ActivityType } from '../types';

const initialActivities: Activity[] = [
  { 
    id: '1', 
    type: 'Call', 
    salesPerson: 'Jim Halpert', 
    startDate: '2025-05-15', 
    startTime: '10:00', 
    duration: '15 mins', 
    nextFollowUp: '2025-05-20', 
    status: 'Scheduled', 
    description: 'Follow up on Japan tour quote sent yesterday.',
    callType: 'Outgoing',
    priority: 'High'
  },
  { 
    id: '2', 
    type: 'Meeting', 
    salesPerson: 'Pam Beesly', 
    startDate: '2025-05-16', 
    startTime: '14:00', 
    duration: '1 hour', 
    nextFollowUp: '2025-05-17', 
    status: 'Scheduled', 
    description: 'Client visit to discuss corporate retreat requirements.',
    location: 'Client Office, Downtown',
    meetingOutcome: 'Pending'
  }
];

const ActivityManagement: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>(initialActivities);
  const [activeTab, setActiveTab] = useState<ActivityType>('Task');
  const [showForm, setShowForm] = useState(false);
  const [newActivity, setNewActivity] = useState<Partial<Activity>>({
    type: 'Task',
    status: 'Scheduled',
    priority: 'Medium'
  });

  const handleSave = () => {
    if (!newActivity.description) return;
    setActivities([...activities, { ...newActivity, id: Math.random().toString(), type: activeTab } as Activity]);
    setShowForm(false);
    setNewActivity({ type: activeTab, status: 'Scheduled', priority: 'Medium' });
  };

  const filteredActivities = activities.filter(a => a.type === activeTab);

  return (
    <div className="p-8 h-full flex flex-col bg-slate-50">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Activity Management</h2>
          <p className="text-slate-500 mt-1">Track your calls, meetings, and to-do lists.</p>
        </div>
        <button 
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
        >
          <Plus size={20} />
          <span>Add {activeTab}</span>
        </button>
      </div>

      <div className="flex mb-6 space-x-2 bg-white p-1 rounded-xl border border-slate-200 w-fit">
        {(['Task', 'Meeting', 'Call'] as ActivityType[]).map((tab) => (
          <button
            key={tab}
            onClick={() => { setActiveTab(tab); setNewActivity(prev => ({ ...prev, type: tab })); }}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
            }`}
          >
            <div className="flex items-center gap-2">
              {tab === 'Task' && <CheckSquare size={16} />}
              {tab === 'Meeting' && <Calendar size={16} />}
              {tab === 'Call' && <Phone size={16} />}
              {tab}s
            </div>
          </button>
        ))}
      </div>

      {showForm ? (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 max-w-2xl mx-auto w-full">
           <h3 className="text-xl font-bold text-slate-800 mb-6">Add New {activeTab}</h3>
           
           <div className="space-y-4">
              <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">Subject / Description</label>
                 <textarea 
                   rows={3}
                   value={newActivity.description || ''}
                   onChange={e => setNewActivity({...newActivity, description: e.target.value})}
                   className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                 />
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Start Date</label>
                    <input type="date" value={newActivity.startDate || ''} onChange={e => setNewActivity({...newActivity, startDate: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Start Time</label>
                    <input type="time" value={newActivity.startTime || ''} onChange={e => setNewActivity({...newActivity, startTime: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" />
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Duration</label>
                    <input type="text" placeholder="e.g. 30 mins" value={newActivity.duration || ''} onChange={e => setNewActivity({...newActivity, duration: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Assign To</label>
                    <input type="text" placeholder="User Name" value={newActivity.salesPerson || ''} onChange={e => setNewActivity({...newActivity, salesPerson: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" />
                 </div>
              </div>
              
              {/* Type Specific Fields */}
              {activeTab === 'Call' && (
                 <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg">
                    <div>
                       <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Call Type</label>
                       <select 
                         value={newActivity.callType} 
                         onChange={e => setNewActivity({...newActivity, callType: e.target.value as any})}
                         className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm bg-white"
                       >
                          <option value="Outgoing">Outgoing</option>
                          <option value="Incoming">Incoming</option>
                       </select>
                    </div>
                 </div>
              )}

              {activeTab === 'Meeting' && (
                 <div className="bg-slate-50 p-4 rounded-lg">
                    <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Location</label>
                    <div className="relative">
                       <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                       <input 
                         type="text" 
                         value={newActivity.location || ''} 
                         onChange={e => setNewActivity({...newActivity, location: e.target.value})}
                         className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
                       />
                    </div>
                 </div>
              )}

              <div className="flex justify-end gap-3 mt-4">
                 <button onClick={() => setShowForm(false)} className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">Cancel</button>
                 <button onClick={handleSave} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm">Save {activeTab}</button>
              </div>
           </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 flex-1 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50">
             <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input type="text" placeholder={`Search ${activeTab.toLowerCase()}s...`} className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
             </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
             {filteredActivities.length === 0 ? (
               <div className="text-center text-slate-400 py-12">No {activeTab.toLowerCase()}s found.</div>
             ) : (
               filteredActivities.map(activity => (
                 <div key={activity.id} className="border border-slate-100 rounded-lg p-4 hover:bg-slate-50 transition-colors flex justify-between items-start group">
                    <div className="flex gap-4">
                       <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                         activity.type === 'Call' ? 'bg-green-100 text-green-600' :
                         activity.type === 'Meeting' ? 'bg-purple-100 text-purple-600' :
                         'bg-blue-100 text-blue-600'
                       }`}>
                          {activity.type === 'Call' && <Phone size={20} />}
                          {activity.type === 'Meeting' && <Calendar size={20} />}
                          {activity.type === 'Task' && <CheckSquare size={20} />}
                       </div>
                       <div>
                          <h4 className="font-semibold text-slate-800">{activity.description}</h4>
                          <div className="flex items-center gap-4 mt-1 text-sm text-slate-500">
                             <span className="flex items-center gap-1"><Clock size={14}/> {activity.startTime} ({activity.duration})</span>
                             <span className="flex items-center gap-1"><Calendar size={14}/> {activity.startDate}</span>
                             <span className="text-blue-600 font-medium">@ {activity.salesPerson}</span>
                          </div>
                          {activity.location && (
                             <div className="flex items-center gap-1 mt-1 text-xs text-slate-500">
                                <MapPin size={12}/> {activity.location}
                             </div>
                          )}
                       </div>
                    </div>
                    <div className="text-right">
                       <span className={`inline-block px-2 py-1 rounded-full text-xs font-bold uppercase ${
                          activity.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                       }`}>
                          {activity.status}
                       </span>
                       <div className="mt-2 text-xs text-slate-400">
                          Next: {activity.nextFollowUp}
                       </div>
                    </div>
                 </div>
               ))
             )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityManagement;
