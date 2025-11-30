
import React, { useState } from 'react';
import { Users, Plus, Edit2, X, Save, Filter, ChevronDown, UserPlus } from 'lucide-react';
import { User } from '../types';
import { initialUsers } from './mockData';

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState<Partial<User>>({ status: 'Active', officeName: 'Select Office', timeFormat: '12 Hours', userLoginType: 'Internal User' });

  const handleAddNew = () => {
    setEditingUser({ status: 'Active', officeName: 'Select Office', timeFormat: '12 Hours', userLoginType: 'Internal User' });
    setShowUserModal(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser({ ...user });
    setShowUserModal(true);
  };

  const handleSaveUser = () => {
    if (!editingUser.firstName || !editingUser.email) return;
    
    const fullName = `${editingUser.firstName} ${editingUser.lastName || ''}`.trim();
    
    const newUser: User = {
      ...editingUser as User,
      id: editingUser.id || Math.random().toString(),
      name: fullName,
      address: editingUser.address || { street: '', city: '', state: '', zip: '', country: '' }
    };

    if (editingUser.id) {
      setUsers(users.map(u => u.id === editingUser.id ? newUser : u));
    } else {
      setUsers([...users, newUser]);
    }
    setShowUserModal(false);
  };

  const toggleDestination = (dest: string) => {
     const current = editingUser.destinations || [];
     if(current.includes(dest)) {
        setEditingUser({...editingUser, destinations: current.filter(d => d !== dest)});
     } else {
        setEditingUser({...editingUser, destinations: [...current, dest]});
     }
  };

  return (
    <div className="p-8 h-full flex flex-col bg-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Users</h2>
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded border border-slate-200">Total Licence 20</span>
                <span className="text-sm font-bold text-green-600 bg-green-50 px-3 py-1 rounded border border-green-200 flex items-center gap-1">Active Users {users.filter(u => u.status === 'Active').length} <Users size={14}/></span>
                <span className="text-sm font-bold text-red-600 bg-red-50 px-3 py-1 rounded border border-red-200 flex items-center gap-1">Inactive Users {users.filter(u => u.status === 'Inactive').length} <Users size={14}/></span>
            </div>
            <select className="border border-slate-300 rounded-lg px-3 py-1.5 text-sm bg-white outline-none">
                <option>Active Users</option>
                <option>Inactive Users</option>
            </select>
            <button onClick={handleAddNew} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 shadow-sm">
                + Add New User
            </button>
        </div>
      </div>

      <div className="bg-white border-t border-slate-200 flex-1 overflow-hidden flex flex-col">
         <div className="overflow-x-auto flex-1">
            <table className="w-full text-left">
               <thead className="bg-white border-b border-slate-200 text-slate-600">
                   <tr>
                       <th className="px-4 py-3 w-10"><input type="checkbox" className="rounded"/></th>
                       <th className="px-4 py-3 text-xs font-bold uppercase">USER CODE</th>
                       <th className="px-4 py-3 text-xs font-bold uppercase">USER NAME</th>
                       <th className="px-4 py-3 text-xs font-bold uppercase">OFFICE NAME</th>
                       <th className="px-4 py-3 text-xs font-bold uppercase">EMAIL ADDRESS</th>
                       <th className="px-4 py-3 text-xs font-bold uppercase">ROLE</th>
                       <th className="px-4 py-3 text-xs font-bold uppercase">USERTYPE</th>
                       <th className="px-4 py-3 text-xs font-bold uppercase">PROFILE</th>
                       <th className="px-4 py-3 text-xs font-bold uppercase">REPORTING MANAGER</th>
                       <th className="px-4 py-3 text-xs font-bold uppercase text-center">STATUS</th>
                   </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                   {users.map(user => (
                       <tr key={user.id} className="hover:bg-slate-50 group">
                           <td className="px-4 py-3 text-center flex gap-2 items-center h-full">
                               <input type="checkbox" className="rounded"/>
                               {/* Edit Icon on hover logic simulated here by putting it next to checkbox or usually separate column */}
                               <button onClick={() => handleEditUser(user)} className="text-slate-400 hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"><Edit2 size={14}/></button>
                           </td>
                           <td className="px-4 py-3 text-sm text-slate-600">{user.code}</td>
                           <td className="px-4 py-3 text-sm text-green-600">{user.name}</td>
                           <td className="px-4 py-3 text-sm text-slate-600">{user.officeName || '-'}</td>
                           <td className="px-4 py-3 text-sm text-green-600">{user.email}</td>
                           <td className="px-4 py-3 text-sm text-slate-600">{user.role}</td>
                           <td className="px-4 py-3 text-sm text-slate-600">{user.userType}</td>
                           <td className="px-4 py-3 text-sm text-slate-600">{user.profile}</td>
                           <td className="px-4 py-3 text-sm text-slate-600">{user.reportingManager}</td>
                           <td className="px-4 py-3 text-center">
                               <span className="bg-green-500 text-white text-[10px] px-2 py-1 rounded font-bold uppercase">{user.status}</span>
                           </td>
                       </tr>
                   ))}
               </tbody>
            </table>
         </div>
         <div className="p-4 border-t border-slate-200 flex justify-between items-center">
             <span className="text-sm text-slate-500">6 entries</span>
             <div className="flex items-center gap-2">
                 <select className="border border-slate-300 rounded px-2 py-1 text-sm"><option>25 Records Per Page</option></select>
             </div>
         </div>
      </div>

      {showUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
               <div className="px-8 py-6 border-b border-slate-200 flex justify-between items-center bg-white">
                  <h3 className="text-xl font-bold text-slate-800">Add Users</h3>
                  <button onClick={() => setShowUserModal(false)} className="text-slate-400 hover:text-red-500"><X size={24}/></button>
               </div>
               
               <div className="p-8 space-y-8 overflow-y-auto flex-1 bg-white">
                  <div>
                      <h4 className="text-sm font-bold text-slate-800 mb-4">Account Information</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                          {/* Left Column */}
                          <div className="space-y-4">
                              <div className="flex gap-4">
                                  <div className="w-1/3">
                                      <label className="block text-xs font-semibold text-slate-500 mb-1">User Code</label>
                                      <input type="text" value={editingUser.code || ''} onChange={e => setEditingUser({...editingUser, code: e.target.value})} className="w-full border-b-2 border-red-500 py-1 text-sm outline-none"/>
                                  </div>
                                  <div className="flex-1">
                                      <label className="block text-xs font-semibold text-slate-500 mb-1">Select Office</label>
                                      <select value={editingUser.officeName} onChange={e => setEditingUser({...editingUser, officeName: e.target.value})} className="w-full border border-slate-300 rounded px-3 py-2 text-sm bg-white border-b-2 border-b-red-500">
                                          <option>Select Office</option>
                                          <option>Head Office</option>
                                      </select>
                                  </div>
                              </div>
                              <div>
                                  <label className="block text-xs font-semibold text-slate-500 mb-1">First Name</label>
                                  <input type="text" value={editingUser.firstName || ''} onChange={e => setEditingUser({...editingUser, firstName: e.target.value})} className="w-full border border-slate-300 rounded px-3 py-2 text-sm border-b-2 border-b-red-500 outline-none"/>
                              </div>
                              <div>
                                  <label className="block text-xs font-semibold text-slate-500 mb-1">Last Name</label>
                                  <input type="text" value={editingUser.lastName || ''} onChange={e => setEditingUser({...editingUser, lastName: e.target.value})} className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none"/>
                              </div>
                              <div>
                                  <label className="block text-xs font-semibold text-slate-500 mb-1">Email</label>
                                  <div className="relative">
                                      <input type="email" value={editingUser.email || ''} onChange={e => setEditingUser({...editingUser, email: e.target.value})} className="w-full border border-slate-300 rounded px-3 py-2 text-sm border-b-2 border-b-red-500 outline-none pr-8"/>
                                      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-green-500">✉</span>
                                  </div>
                              </div>
                              <div>
                                  <label className="block text-xs font-semibold text-slate-500 mb-1">Password</label>
                                  <input type="password" value={editingUser.password || ''} onChange={e => setEditingUser({...editingUser, password: e.target.value})} className="w-full border border-slate-300 rounded px-3 py-2 text-sm border-b-2 border-b-red-500 outline-none"/>
                              </div>
                              <div>
                                  <label className="block text-xs font-semibold text-slate-500 mb-1">PIN</label>
                                  <input type="text" value={editingUser.pin || ''} onChange={e => setEditingUser({...editingUser, pin: e.target.value})} className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none"/>
                              </div>
                              <div>
                                  <label className="block text-xs font-semibold text-slate-500 mb-1">Mail Password</label>
                                  <input type="password" value={editingUser.mailPassword || ''} onChange={e => setEditingUser({...editingUser, mailPassword: e.target.value})} className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none"/>
                              </div>
                              <div>
                                  <label className="block text-xs font-semibold text-slate-500 mb-1">Role</label>
                                  <div className="relative">
                                      <input type="text" value={editingUser.role || ''} onChange={e => setEditingUser({...editingUser, role: e.target.value})} className="w-full border border-slate-300 rounded px-3 py-2 text-sm border-b-2 border-b-red-500 outline-none"/>
                                      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-500 bg-blue-100 rounded-full p-1">👤</span>
                                  </div>
                              </div>
                              <div>
                                  <label className="block text-xs font-semibold text-slate-500 mb-1">Users Department</label>
                                  <select value={editingUser.department} onChange={e => setEditingUser({...editingUser, department: e.target.value})} className="w-full border border-slate-300 rounded px-3 py-2 text-sm bg-white border-b-2 border-b-red-500">
                                      <option>Select Department</option>
                                      <option>Sales</option>
                                      <option>Operations</option>
                                  </select>
                              </div>
                              <div>
                                  <label className="block text-xs font-semibold text-slate-500 mb-1">Profile</label>
                                  <select value={editingUser.profile} onChange={e => setEditingUser({...editingUser, profile: e.target.value})} className="w-full border border-slate-300 rounded px-3 py-2 text-sm bg-white border-b-2 border-b-red-500">
                                      <option>Select Profile</option>
                                      <option>Administrator</option>
                                      <option>Staff</option>
                                  </select>
                              </div>
                              <div>
                                  <label className="block text-xs font-semibold text-slate-500 mb-1">Reporting Manager</label>
                                  <select value={editingUser.reportingManager} onChange={e => setEditingUser({...editingUser, reportingManager: e.target.value})} className="w-full border border-slate-300 rounded px-3 py-2 text-sm bg-white border-b-2 border-b-red-500">
                                      <option>Select</option>
                                      <option>Administrator CRM</option>
                                  </select>
                              </div>
                              <div>
                                  <label className="block text-xs font-semibold text-slate-500 mb-1">User Type</label>
                                  <select value={editingUser.userType} onChange={e => setEditingUser({...editingUser, userType: e.target.value})} className="w-full border border-slate-300 rounded px-3 py-2 text-sm bg-white">
                                      <option>Sales Person</option>
                                      <option>Operations Person</option>
                                  </select>
                              </div>
                              <div>
                                  <label className="block text-xs font-semibold text-slate-500 mb-1">User Login Type</label>
                                  <select value={editingUser.userLoginType} onChange={e => setEditingUser({...editingUser, userLoginType: e.target.value})} className="w-full border border-slate-300 rounded px-3 py-2 text-sm bg-white">
                                      <option>Internal User</option>
                                  </select>
                              </div>
                          </div>
                          
                          {/* Right Column */}
                          <div className="space-y-4">
                              <div>
                                  <label className="block text-xs font-semibold text-slate-500 mb-1">Phone</label>
                                  <input type="text" value={editingUser.phone || ''} onChange={e => setEditingUser({...editingUser, phone: e.target.value})} className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none"/>
                              </div>
                              <div>
                                  <label className="block text-xs font-semibold text-slate-500 mb-1">Mobile</label>
                                  <input type="text" value={editingUser.mobile || ''} onChange={e => setEditingUser({...editingUser, mobile: e.target.value})} className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none"/>
                              </div>
                              <div>
                                  <label className="block text-xs font-semibold text-slate-500 mb-1">Street</label>
                                  <input type="text" value={editingUser.address?.street || ''} onChange={e => setEditingUser({...editingUser, address: {...editingUser.address!, street: e.target.value}})} className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none"/>
                              </div>
                              <div>
                                  <label className="block text-xs font-semibold text-slate-500 mb-1">Time Format</label>
                                  <select value={editingUser.timeFormat} onChange={e => setEditingUser({...editingUser, timeFormat: e.target.value as any})} className="w-full border border-slate-300 rounded px-3 py-2 text-sm bg-white">
                                      <option>12 Hours</option>
                                      <option>24 Hours</option>
                                  </select>
                              </div>
                              <div>
                                  <label className="block text-xs font-semibold text-slate-500 mb-1">Language Known</label>
                                  <input type="text" value={editingUser.languageKnown || ''} onChange={e => setEditingUser({...editingUser, languageKnown: e.target.value})} className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none"/>
                              </div>
                              
                              <div className="mt-8">
                                  <label className="block text-xs font-semibold text-slate-500 mb-2">Destinations</label>
                                  <div className="border border-slate-300 rounded h-64 overflow-y-auto p-2 space-y-1">
                                      <label className="flex items-center gap-2 p-1 hover:bg-slate-50">
                                          <input type="checkbox" className="rounded text-blue-600"/> <span className="text-sm">All Destinations</span>
                                      </label>
                                      {['Abepura', 'Abhaneri', 'Abhayapuri', 'Abohar', 'Abu Road', 'Achalgarh', 'Achalkot', 'Achra'].map(dest => (
                                          <label key={dest} className="flex items-center gap-2 p-1 hover:bg-slate-50">
                                              <input 
                                                type="checkbox" 
                                                checked={editingUser.destinations?.includes(dest)} 
                                                onChange={() => toggleDestination(dest)}
                                                className="rounded text-blue-600"
                                              /> 
                                              <span className="text-sm">{dest}</span>
                                          </label>
                                      ))}
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
               </div>

               <div className="px-8 py-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
                  <button onClick={handleSaveUser} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium shadow-sm">Save</button>
                  <button className="bg-white border border-slate-300 text-slate-700 px-6 py-2 rounded-full text-sm font-medium hover:bg-slate-50">Save and New</button>
                  <button onClick={() => setShowUserModal(false)} className="bg-white border border-slate-300 text-slate-700 px-6 py-2 rounded-full text-sm font-medium hover:bg-slate-50">Cancel</button>
               </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
