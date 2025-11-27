
import React, { useState } from 'react';
import { Users, Shield, Plus, MoreHorizontal, ChevronRight, ChevronDown, FolderTree, UserPlus, Filter, Edit2, Trash2, X, Save } from 'lucide-react';
import { User, Role } from '../types';

// Mock Data
const initialUsers: User[] = [
  { id: '1', code: 'USR001', name: 'James Wilson', email: 'j.wilson@travelcrm.com', role: 'CEO', department: 'Management', reportingManager: '-', status: 'Active', mobile: '+1234567890', avatar: '', address: { street: '', city: '', state: '', zip: '', country: '' } },
  { id: '2', code: 'USR002', name: 'Sarah Smith', email: 's.smith@travelcrm.com', role: 'VP Sales', department: 'Sales', reportingManager: 'James Wilson', status: 'Active', mobile: '+1234567890', avatar: '', address: { street: '', city: '', state: '', zip: '', country: '' } },
  { id: '3', code: 'USR003', name: 'John Doe', email: 'j.doe@travelcrm.com', role: 'Operation Manager', department: 'Operations', reportingManager: 'James Wilson', status: 'Active', mobile: '+1234567890', avatar: '', address: { street: '', city: '', state: '', zip: '', country: '' } },
  { id: '4', code: 'USR004', name: 'Emily Chen', email: 'e.chen@travelcrm.com', role: 'Sales Executive', department: 'Sales', reportingManager: 'Sarah Smith', status: 'Inactive', mobile: '+1234567890', avatar: '', address: { street: '', city: '', state: '', zip: '', country: '' } },
  { id: '5', code: 'USR005', name: 'Michael Brown', email: 'm.brown@travelcrm.com', role: 'Accountant', department: 'Finance', reportingManager: 'James Wilson', status: 'Active', mobile: '+1234567890', avatar: '', address: { street: '', city: '', state: '', zip: '', country: '' } },
];

const rolesTree: Role = {
  id: 'root',
  name: 'TravelCRM (Organization)',
  parentId: null,
  children: [
    {
      id: 'ceo',
      name: 'CEO',
      parentId: 'root',
      children: [
        {
          id: 'vp-sales',
          name: 'VP Sales',
          parentId: 'ceo',
          children: [
            { id: 'sales-mgr', name: 'Sales Manager', parentId: 'vp-sales', children: [] },
            { id: 'sales-exec', name: 'Sales Executive', parentId: 'vp-sales', children: [] },
          ]
        },
        {
          id: 'ops-mgr',
          name: 'Operation Manager',
          parentId: 'ceo',
          children: [
            { id: 'ops-exec', name: 'Operations Executive', parentId: 'ops-mgr', children: [] }
          ]
        },
        {
          id: 'fin-mgr',
          name: 'Finance Manager',
          parentId: 'ceo',
          children: [
             { id: 'acct', name: 'Accountant', parentId: 'fin-mgr', children: [] }
          ]
        }
      ]
    }
  ]
};

const RoleTreeNode: React.FC<{ role: Role; level?: number }> = ({ role, level = 0 }) => {
  const [expanded, setExpanded] = useState(true);
  const hasChildren = role.children && role.children.length > 0;

  return (
    <div className="select-none">
      <div 
        className={`flex items-center p-3 hover:bg-slate-50 rounded-lg group transition-colors ${level === 0 ? 'bg-slate-50 border border-slate-200 mb-2' : ''}`}
        style={{ marginLeft: `${level * 24}px` }}
      >
        <button 
          onClick={() => setExpanded(!expanded)} 
          className={`mr-2 p-1 rounded-md text-slate-400 hover:text-blue-600 ${!hasChildren && 'opacity-0 cursor-default'}`}
        >
          {expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </button>
        
        <div className="flex-1 flex items-center gap-3">
          <Shield size={18} className={`${level === 0 ? 'text-blue-600' : 'text-slate-400'}`} />
          <span className={`font-medium ${level === 0 ? 'text-slate-800 text-lg' : 'text-slate-700'}`}>
            {role.name}
          </span>
        </div>

        <div className="opacity-0 group-hover:opacity-100 flex gap-2">
          <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded" title="Add Sub-role">
            <Plus size={16} />
          </button>
          <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded" title="Edit">
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>
      
      {expanded && hasChildren && (
        <div className="relative">
           {/* Vertical Line for hierarchy visualization */}
           <div 
             className="absolute left-0 top-0 bottom-0 border-l border-slate-200" 
             style={{ left: `${(level * 24) + 15}px` }} 
           />
           {role.children!.map(child => (
             <RoleTreeNode key={child.id} role={child} level={level + 1} />
           ))}
        </div>
      )}
    </div>
  );
};

const UserManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'roles'>('users');
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState<Partial<User>>({});

  const handleAddNew = () => {
    setEditingUser({ status: 'Active', code: `USR00${users.length + 1}` });
    setShowUserModal(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setShowUserModal(true);
  };

  const handleDeleteUser = (id: string) => {
    if(window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const handleSaveUser = () => {
    if (!editingUser.name || !editingUser.email) return;

    if (editingUser.id) {
      // Update existing
      setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...editingUser } as User : u));
    } else {
      // Create new
      const newUser: User = {
        ...editingUser,
        id: Math.random().toString(),
        address: { street: '', city: '', state: '', zip: '', country: '' },
        avatar: '',
      } as User;
      setUsers([...users, newUser]);
    }
    setShowUserModal(false);
  };

  return (
    <div className="p-8 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">User Management</h2>
          <p className="text-slate-500 mt-1">Manage system access, roles, and hierarchy.</p>
        </div>
        <button 
          onClick={handleAddNew}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
        >
          <UserPlus size={18} />
          <span>Add New {activeTab === 'users' ? 'User' : 'Role'}</span>
        </button>
      </div>

      {/* Stats Bar */}
      {activeTab === 'users' && (
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Total Users</p>
              <h3 className="text-2xl font-bold text-slate-800">{users.length}</h3>
            </div>
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
              <Users size={20} />
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border-l-4 border-green-500 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Active Users</p>
              <h3 className="text-2xl font-bold text-green-600">{users.filter(u => u.status === 'Active').length}</h3>
            </div>
            <div className="w-10 h-10 bg-green-50 text-green-600 rounded-full flex items-center justify-center">
              <Users size={20} />
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border-l-4 border-red-500 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Inactive Users</p>
              <h3 className="text-2xl font-bold text-red-600">{users.filter(u => u.status === 'Inactive').length}</h3>
            </div>
            <div className="w-10 h-10 bg-red-50 text-red-600 rounded-full flex items-center justify-center">
              <Users size={20} />
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-slate-200 mb-6">
        <button 
          onClick={() => setActiveTab('users')}
          className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
            activeTab === 'users' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          User List
        </button>
        <button 
          onClick={() => setActiveTab('roles')}
          className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'roles' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <FolderTree size={16} />
          Role Hierarchy
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 flex-1 overflow-hidden flex flex-col">
        {activeTab === 'users' ? (
          <>
             {/* Toolbar */}
             <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
               <div className="flex items-center gap-3">
                 <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 hover:border-slate-300">
                   <Filter size={14} /> Active Users
                 </button>
               </div>
               <div className="relative">
                 <input type="text" placeholder="Search users..." className="pl-3 pr-8 py-1.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
               </div>
             </div>

             {/* Table */}
             <div className="overflow-x-auto flex-1">
               <table className="w-full">
                 <thead className="bg-slate-50 border-b border-slate-100">
                   <tr>
                     <th className="px-6 py-3 text-left"><input type="checkbox" className="rounded border-slate-300" /></th>
                     <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">User Code</th>
                     <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Name & Email</th>
                     <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Role</th>
                     <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Department</th>
                     <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Manager</th>
                     <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Status</th>
                     <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase">Action</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                   {users.map(user => (
                     <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                       <td className="px-6 py-4"><input type="checkbox" className="rounded border-slate-300" /></td>
                       <td className="px-6 py-4 text-sm font-mono text-slate-500">{user.code}</td>
                       <td className="px-6 py-4">
                         <div>
                           <div className="text-sm font-medium text-slate-900">{user.name}</div>
                           <div className="text-xs text-slate-500">{user.email}</div>
                         </div>
                       </td>
                       <td className="px-6 py-4 text-sm text-slate-700">{user.role}</td>
                       <td className="px-6 py-4 text-sm text-slate-700">{user.department}</td>
                       <td className="px-6 py-4 text-sm text-slate-500">{user.reportingManager}</td>
                       <td className="px-6 py-4">
                         <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                           user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                         }`}>
                           <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${user.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                           {user.status}
                         </span>
                       </td>
                       <td className="px-6 py-4 text-right">
                         <div className="flex justify-end gap-2">
                            <button onClick={() => handleEditUser(user)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"><Edit2 size={16} /></button>
                            <button onClick={() => handleDeleteUser(user.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"><Trash2 size={16} /></button>
                         </div>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
          </>
        ) : (
          <div className="p-6">
            <RoleTreeNode role={rolesTree} />
          </div>
        )}
      </div>

      {/* Add/Edit User Modal */}
      {showUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-4 border-b border-slate-100 bg-slate-50">
              <h3 className="text-lg font-bold text-slate-800">{editingUser.id ? 'Edit User' : 'Add New User'}</h3>
              <button onClick={() => setShowUserModal(false)} className="text-slate-400 hover:text-red-500 transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                     <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                     <input 
                       type="text" 
                       value={editingUser.name || ''} 
                       onChange={e => setEditingUser({...editingUser, name: e.target.value})}
                       className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                     />
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                     <input 
                       type="email" 
                       value={editingUser.email || ''} 
                       onChange={e => setEditingUser({...editingUser, email: e.target.value})}
                       className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                     />
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
                     <select 
                       value={editingUser.role || ''} 
                       onChange={e => setEditingUser({...editingUser, role: e.target.value})}
                       className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                     >
                        <option value="">Select Role</option>
                        <option value="Administrator">Administrator</option>
                        <option value="VP Sales">VP Sales</option>
                        <option value="Sales Manager">Sales Manager</option>
                        <option value="Sales Executive">Sales Executive</option>
                        <option value="Operation Manager">Operation Manager</option>
                        <option value="Accountant">Accountant</option>
                     </select>
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-slate-700 mb-1">Department</label>
                     <select 
                       value={editingUser.department || ''} 
                       onChange={e => setEditingUser({...editingUser, department: e.target.value})}
                       className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                     >
                        <option value="">Select Department</option>
                        <option value="Management">Management</option>
                        <option value="Sales">Sales</option>
                        <option value="Operations">Operations</option>
                        <option value="Finance">Finance</option>
                     </select>
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-slate-700 mb-1">Reporting Manager</label>
                     <select 
                       value={editingUser.reportingManager || ''} 
                       onChange={e => setEditingUser({...editingUser, reportingManager: e.target.value})}
                       className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                     >
                        <option value="-">None</option>
                        {users.map(u => <option key={u.id} value={u.name}>{u.name}</option>)}
                     </select>
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                     <select 
                       value={editingUser.status || 'Active'} 
                       onChange={e => setEditingUser({...editingUser, status: e.target.value as any})}
                       className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                     >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                     </select>
                  </div>
               </div>
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
               <button onClick={() => setShowUserModal(false)} className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-white transition-colors">Cancel</button>
               <button onClick={handleSaveUser} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                  <Save size={18} /> Save User
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
