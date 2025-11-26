import React, { useState } from 'react';
import { Plus, Search, User, Phone, Mail, MapPin, Heart, AlertCircle, X } from 'lucide-react';
import { B2CClient } from '../types';

const initialClients: B2CClient[] = [
  { 
    id: '1', 
    name: 'Emily Watson', 
    gender: 'Female', 
    dob: '1990-05-15', 
    nationality: 'British', 
    mobile: '+44 7700 987654', 
    email: 'emily.w@example.com', 
    address: '10 Downing St, London',
    preferences: { meal: 'Veg', seat: 'Window', special: 'None' },
    emergencyContact: { name: 'John Watson', relation: 'Father', phone: '+44 7700 111222' },
    status: 'Active'
  },
];

const B2CClients: React.FC = () => {
  const [clients, setClients] = useState<B2CClient[]>(initialClients);
  const [showForm, setShowForm] = useState(false);
  const [newClient, setNewClient] = useState<Partial<B2CClient>>({
    preferences: { meal: 'Non-Veg', seat: 'Aisle', special: '' },
    emergencyContact: { name: '', relation: '', phone: '' },
    status: 'Active',
    gender: 'Male'
  });

  const handleSave = () => {
    if (!newClient.name) return;
    
    // In a real app, deep clone or properly construct the object
    setClients([...clients, { ...newClient, id: Math.random().toString() } as B2CClient]);
    setShowForm(false);
    setNewClient({
       preferences: { meal: 'Non-Veg', seat: 'Aisle', special: '' },
       emergencyContact: { name: '', relation: '', phone: '' },
       status: 'Active',
       gender: 'Male'
    });
  };

  const updateNested = (category: 'preferences' | 'emergencyContact', field: string, value: string) => {
    setNewClient(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
  };

  return (
    <div className="p-8 h-full flex flex-col">
       <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">B2C Customers</h2>
          <p className="text-slate-500 mt-1">Direct clients database with preferences and history.</p>
        </div>
        <button 
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
        >
          <Plus size={20} />
          <span>Add Customer</span>
        </button>
      </div>

      {showForm ? (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 max-w-4xl mx-auto w-full">
           <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
            <h3 className="text-xl font-bold text-slate-800">New Customer Profile</h3>
            <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-red-500">
              <X size={24} />
            </button>
          </div>

          <div className="space-y-8">
            {/* Personal Info */}
            <div>
              <h4 className="flex items-center gap-2 text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
                <User size={18} className="text-blue-500"/> Personal Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-1">
                   <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Full Name</label>
                   <input 
                     type="text" 
                     value={newClient.name || ''}
                     onChange={e => setNewClient({...newClient, name: e.target.value})}
                     className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                   />
                </div>
                <div>
                   <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Date of Birth</label>
                   <input 
                     type="date" 
                     value={newClient.dob || ''}
                     onChange={e => setNewClient({...newClient, dob: e.target.value})}
                     className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                   />
                </div>
                <div>
                   <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Gender</label>
                   <select 
                     value={newClient.gender}
                     onChange={e => setNewClient({...newClient, gender: e.target.value as any})}
                     className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                   >
                     <option value="Male">Male</option>
                     <option value="Female">Female</option>
                     <option value="Other">Other</option>
                   </select>
                </div>
                <div>
                   <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Nationality</label>
                   <input 
                     type="text" 
                     value={newClient.nationality || ''}
                     onChange={e => setNewClient({...newClient, nationality: e.target.value})}
                     className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                   />
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="flex items-center gap-2 text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
                <MapPin size={18} className="text-blue-500"/> Contact Details
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                   <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Mobile</label>
                   <input 
                     type="text" 
                     value={newClient.mobile || ''}
                     onChange={e => setNewClient({...newClient, mobile: e.target.value})}
                     className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                   />
                </div>
                <div>
                   <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Email</label>
                   <input 
                     type="email" 
                     value={newClient.email || ''}
                     onChange={e => setNewClient({...newClient, email: e.target.value})}
                     className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                   />
                </div>
                <div className="col-span-2">
                   <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Address</label>
                   <input 
                     type="text" 
                     value={newClient.address || ''}
                     onChange={e => setNewClient({...newClient, address: e.target.value})}
                     className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                   />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Preferences */}
              <div>
                <h4 className="flex items-center gap-2 text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
                  <Heart size={18} className="text-red-500"/> Preferences
                </h4>
                <div className="space-y-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Meal</label>
                      <select 
                        value={newClient.preferences?.meal}
                        onChange={e => updateNested('preferences', 'meal', e.target.value)}
                        className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm bg-white"
                      >
                        <option value="Veg">Veg</option>
                        <option value="Non-Veg">Non-Veg</option>
                      </select>
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Seat</label>
                      <input 
                        type="text"
                        value={newClient.preferences?.seat}
                        onChange={e => updateNested('preferences', 'seat', e.target.value)}
                        className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm"
                        placeholder="Window/Aisle"
                      />
                    </div>
                  </div>
                  <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Special Assistance</label>
                      <input 
                        type="text"
                        value={newClient.preferences?.special}
                        onChange={e => updateNested('preferences', 'special', e.target.value)}
                        className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm"
                        placeholder="e.g. Wheelchair"
                      />
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div>
                <h4 className="flex items-center gap-2 text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
                  <AlertCircle size={18} className="text-orange-500"/> Emergency Contact
                </h4>
                <div className="space-y-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Name</label>
                      <input 
                        type="text"
                        value={newClient.emergencyContact?.name}
                        onChange={e => updateNested('emergencyContact', 'name', e.target.value)}
                        className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm"
                      />
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Relation</label>
                      <input 
                        type="text"
                        value={newClient.emergencyContact?.relation}
                        onChange={e => updateNested('emergencyContact', 'relation', e.target.value)}
                        className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Phone</label>
                      <input 
                        type="text"
                        value={newClient.emergencyContact?.phone}
                        onChange={e => updateNested('emergencyContact', 'phone', e.target.value)}
                        className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-3">
            <button onClick={() => setShowForm(false)} className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">Cancel</button>
            <button onClick={handleSave} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm">Save Customer</button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 flex-1 overflow-hidden">
           <div className="p-4 border-b border-slate-100 bg-slate-50/50">
             <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input type="text" placeholder="Search customers..." className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
             </div>
           </div>
           
           <div className="overflow-x-auto">
             <table className="w-full">
               <thead className="bg-slate-50 border-b border-slate-100">
                 <tr>
                   <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Name</th>
                   <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Contact Info</th>
                   <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Nationality</th>
                   <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Preferences</th>
                   <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Status</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                 {clients.map(client => (
                   <tr key={client.id} className="hover:bg-slate-50 transition-colors">
                     <td className="px-6 py-4">
                       <div className="font-medium text-slate-900">{client.name}</div>
                       <div className="text-xs text-slate-500">{client.gender}, Born {client.dob}</div>
                     </td>
                     <td className="px-6 py-4">
                       <div className="flex items-center gap-2 text-sm text-slate-600"><Phone size={14}/> {client.mobile}</div>
                       <div className="flex items-center gap-2 text-sm text-slate-600 mt-1"><Mail size={14}/> {client.email}</div>
                     </td>
                     <td className="px-6 py-4 text-sm text-slate-600">
                       {client.nationality}
                     </td>
                     <td className="px-6 py-4">
                       <div className="flex gap-2">
                         <span className={`text-[10px] px-2 py-0.5 rounded border ${client.preferences.meal === 'Veg' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
                           {client.preferences.meal}
                         </span>
                         {client.preferences.special !== 'None' && client.preferences.special !== '' && (
                           <span className="text-[10px] px-2 py-0.5 rounded border bg-yellow-50 border-yellow-200 text-yellow-700">
                             {client.preferences.special}
                           </span>
                         )}
                       </div>
                     </td>
                     <td className="px-6 py-4">
                       <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                         {client.status}
                       </span>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </div>
      )}
    </div>
  );
};

export default B2CClients;