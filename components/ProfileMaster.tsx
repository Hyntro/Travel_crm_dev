
import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, X, Save } from 'lucide-react';
import { Profile } from '../types';
import { initialProfiles } from './mockData';

const ProfileMaster: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>(initialProfiles);
  const [showModal, setShowModal] = useState(false);
  const [newProfile, setNewProfile] = useState<Partial<Profile>>({});

  const handleSave = () => {
     const profile: Profile = {
         id: Math.random().toString(),
         name: newProfile.name || '',
         description: newProfile.description || '',
         createdBy: 'Administrator CRM',
         createdAt: new Date().toLocaleDateString()
     };
     setProfiles([...profiles, profile]);
     setShowModal(false);
     setNewProfile({});
  };

  const handleDelete = (id: string) => {
      if(window.confirm("Delete profile?")) {
          setProfiles(prev => prev.filter(p => p.id !== id));
      }
  };

  return (
    <div className="h-full flex flex-col bg-white animate-in fade-in duration-300">
      <div className="flex justify-between items-center p-6 border-b border-slate-100">
        <h2 className="text-2xl font-bold text-slate-800">Profile</h2>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium shadow-sm flex items-center gap-2"
        >
          <Plus size={16} /> Add New Profile
        </button>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col p-6">
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead className="bg-white border-b border-slate-200 text-slate-600">
                  <tr>
                     <th className="px-6 py-4 text-xs font-bold uppercase">PROFILE NAME</th>
                     <th className="px-6 py-4 text-xs font-bold uppercase">PROFILE DESCRIPTION</th>
                     <th className="px-6 py-4 text-xs font-bold uppercase">CREATED BY</th>
                     <th className="px-6 py-4 text-xs font-bold uppercase">MODIFIED BY</th>
                     <th className="px-6 py-4 text-right text-xs font-bold uppercase"></th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {profiles.map(profile => (
                     <tr key={profile.id} className="hover:bg-slate-50">
                        <td className={`px-6 py-4 text-sm font-medium ${profile.id === '5' ? 'text-green-600' : 'text-green-600'}`}>
                           {profile.id === '5' && <Edit2 size={14} className="inline mr-2 text-gray-400"/>}
                           {profile.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">{profile.description}</td>
                        <td className="px-6 py-4 text-xs text-slate-500">
                            <div className="text-slate-800 font-medium">{profile.createdBy}</div>
                            <div>{profile.createdAt}</div>
                        </td>
                        <td className="px-6 py-4 text-xs text-slate-500">
                            {profile.modifiedBy && (
                                <>
                                    <div className="text-slate-800 font-medium">{profile.modifiedBy}</div>
                                    <div>{profile.modifiedByDate}</div>
                                </>
                            )}
                        </td>
                        <td className="px-6 py-4 text-right">
                            <button onClick={() => handleDelete(profile.id)} className="text-green-600 hover:text-green-800 text-sm font-medium">Delete</button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
         <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
            <span>8 entries</span>
            <select className="border border-slate-300 rounded px-2 py-1"><option>25 Records Per Page</option></select>
         </div>
      </div>

      {/* Add Profile Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
               <div className="bg-white px-6 py-4 flex justify-between items-center border-b border-slate-200">
                  <h3 className="text-xl font-bold text-slate-800">Add Profile</h3>
                  <div className="flex gap-2">
                      <button onClick={handleSave} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-1.5 rounded-full text-sm font-medium shadow-sm">Save</button>
                      <button onClick={() => setShowModal(false)} className="bg-white border border-slate-300 text-slate-700 px-6 py-1.5 rounded-full text-sm font-medium hover:bg-slate-50">Cancel</button>
                  </div>
               </div>
               
               <div className="p-8 space-y-8 overflow-y-auto flex-1 bg-white">
                  
                  <div>
                      <h4 className="text-sm font-bold text-slate-800 mb-4">Profile Information</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                          <div>
                              <label className="block text-xs font-semibold text-slate-500 mb-1">Profile Name</label>
                              <input 
                                type="text" 
                                value={newProfile.name || ''}
                                onChange={e => setNewProfile({...newProfile, name: e.target.value})}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-b-2 border-b-red-500"
                              />
                          </div>
                          <div>
                              <label className="block text-xs font-semibold text-slate-500 mb-1">Clone Profile</label>
                              <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-b-2 border-b-red-500 bg-white">
                                  <option>Administrator</option>
                                  <option>Sales</option>
                              </select>
                          </div>
                      </div>
                      <div className="mb-6">
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Profile Description</label>
                          <input 
                            type="text" 
                            value={newProfile.description || ''}
                            onChange={e => setNewProfile({...newProfile, description: e.target.value})}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                      </div>

                      <div className="space-y-2">
                          <label className="block text-xs font-semibold text-slate-500 mb-2">Permission</label>
                          <div className="border border-slate-200 rounded-lg p-4 space-y-2 h-48 overflow-y-auto">
                              {['Admin Dashboard', 'Sales Dashboard', 'Operations Dashboard', 'Accounts Dashboard', 'Agent Create Query', 'Itinerary Builder'].map(perm => (
                                  <label key={perm} className="flex items-center gap-3 p-1 hover:bg-slate-50 rounded cursor-pointer">
                                      <input type="checkbox" className="rounded text-blue-600 w-4 h-4 border-slate-300"/>
                                      <span className="text-sm text-slate-700">{perm}</span>
                                  </label>
                              ))}
                          </div>
                          <div className="h-0.5 w-8 bg-red-500 mt-1"></div>
                      </div>
                  </div>

               </div>

               <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex justify-end gap-3">
                  <button onClick={handleSave} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium shadow-sm">Save</button>
                  <button onClick={() => setShowModal(false)} className="bg-white border border-slate-300 text-slate-700 px-6 py-2 rounded-full text-sm font-medium hover:bg-slate-50">Cancel</button>
               </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMaster;
