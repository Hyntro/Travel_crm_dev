
import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, BadgeCheck, Edit2, Key, Shield, CheckCircle, ArrowLeft, Save, X } from 'lucide-react';
import { User as UserType } from '../types';

// Mock current user
const initialUser: UserType = {
  id: '1',
  code: 'ADM001',
  name: 'Demo Admin',
  email: 'demo@travelcrm.com',
  mobile: '+1 (555) 000-ADMIN',
  role: 'Administrator',
  department: 'Management',
  reportingManager: '-',
  status: 'Active',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
  address: {
    street: '1 World Trade Center',
    city: 'New York',
    state: 'NY',
    zip: '10007',
    country: 'USA'
  }
};

interface SettingsProps {
  onBack: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onBack }) => {
  const [currentUser, setCurrentUser] = useState<UserType>(initialUser);
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [tempUser, setTempUser] = useState<UserType>(initialUser);

  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel edit
      setTempUser(currentUser);
      setIsEditing(false);
    } else {
      // Start edit
      setIsEditing(true);
    }
  };

  const handleSave = () => {
    setCurrentUser(tempUser);
    setIsEditing(false);
    // In a real app, you would make an API call here
    alert("Profile updated successfully!");
  };

  const handleChange = (field: string, value: string) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setTempUser(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof UserType] as any),
          [child]: value
        }
      }));
    } else {
      setTempUser(prev => ({ ...prev, [field]: value }));
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto h-full overflow-y-auto bg-slate-50">
      <div className="flex items-center gap-4 mb-8 border-b border-slate-200 pb-4">
        <button onClick={onBack} className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Personal Settings</h2>
          <p className="text-slate-500 mt-1">Manage your profile information and account security.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Col: Profile Card */}
        <div className="col-span-1 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col items-center text-center">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-50 mb-4 bg-slate-100">
               <img src={currentUser.avatar} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">{currentUser.name}</h3>
            <span className="mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">
              <BadgeCheck size={14} />
              {currentUser.role}
            </span>
            <p className="text-slate-500 text-sm mt-4">{currentUser.department} Department</p>
            <p className="text-slate-400 text-xs">User Code: {currentUser.code}</p>

            <div className="w-full mt-6 space-y-3">
               {!isEditing ? (
                 <button 
                   onClick={handleEditToggle}
                   className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                 >
                   <Edit2 size={16} /> Edit Profile
                 </button>
               ) : (
                 <div className="flex gap-2">
                    <button 
                      onClick={handleEditToggle}
                      className="flex-1 py-2 px-4 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-sm font-medium transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleSave}
                      className="flex-1 py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <Save size={16} /> Save
                    </button>
                 </div>
               )}
               
               <button 
                 onClick={() => setShowPasswordModal(true)}
                 className="w-full py-2 px-4 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
               >
                 <Key size={16} /> Change Password
               </button>
            </div>
          </div>

          {/* Role Capabilities */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
             <h4 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2 uppercase tracking-wider">
               <Shield size={16} className="text-purple-600" /> Role & Permissions
             </h4>
             <div className="space-y-3">
                <div className="flex items-start gap-2 text-sm text-slate-600">
                   <CheckCircle size={16} className="text-green-500 mt-0.5 shrink-0"/>
                   <span>Full System Access</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-slate-600">
                   <CheckCircle size={16} className="text-green-500 mt-0.5 shrink-0"/>
                   <span>User & Role Management</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-slate-600">
                   <CheckCircle size={16} className="text-green-500 mt-0.5 shrink-0"/>
                   <span>Financial Approvals</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-slate-600">
                   <CheckCircle size={16} className="text-green-500 mt-0.5 shrink-0"/>
                   <span>Master Configuration</span>
                </div>
                <div className="mt-4 p-3 bg-slate-50 rounded text-xs text-slate-500">
                   Role assigned by System Root. Contact IT for privilege escalation.
                </div>
             </div>
          </div>
        </div>

        {/* Right Col: Details Form */}
        <div className="col-span-1 md:col-span-2 space-y-6">
          
          {/* Contact Information */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <h4 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <User size={20} className="text-blue-500" />
              Contact Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2 md:col-span-1">
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={tempUser.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  disabled={!isEditing}
                  className={`w-full border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${!isEditing && 'bg-slate-50 text-slate-500'}`}
                />
              </div>
              <div className="col-span-2 md:col-span-1">
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Mobile Number</label>
                <div className={`flex items-center border border-slate-200 rounded-lg px-3 py-2 ${!isEditing ? 'bg-slate-50 text-slate-500' : 'bg-white text-slate-700'}`}>
                  <Phone size={16} className="mr-2 text-slate-400" />
                  <input 
                    type="text" 
                    value={tempUser.mobile}
                    onChange={(e) => handleChange('mobile', e.target.value)}
                    disabled={!isEditing}
                    className="w-full outline-none text-sm bg-transparent"
                  />
                </div>
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Email Address</label>
                <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-500 cursor-not-allowed">
                  <Mail size={16} className="mr-2 opacity-50" />
                  {currentUser.email}
                </div>
                <p className="text-xs text-slate-400 mt-1">Email cannot be changed.</p>
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <h4 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <MapPin size={20} className="text-blue-500" />
              Address Details
            </h4>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Street Address</label>
                <input 
                  type="text" 
                  value={tempUser.address.street}
                  onChange={(e) => handleChange('address.street', e.target.value)}
                  disabled={!isEditing}
                  className={`w-full border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${!isEditing && 'bg-slate-50 text-slate-500'}`}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">City</label>
                  <input 
                    type="text" 
                    value={tempUser.address.city}
                    onChange={(e) => handleChange('address.city', e.target.value)}
                    disabled={!isEditing}
                    className={`w-full border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${!isEditing && 'bg-slate-50 text-slate-500'}`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">State</label>
                  <input 
                    type="text" 
                    value={tempUser.address.state}
                    onChange={(e) => handleChange('address.state', e.target.value)}
                    disabled={!isEditing}
                    className={`w-full border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${!isEditing && 'bg-slate-50 text-slate-500'}`}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Zip Code</label>
                  <input 
                    type="text" 
                    value={tempUser.address.zip}
                    onChange={(e) => handleChange('address.zip', e.target.value)}
                    disabled={!isEditing}
                    className={`w-full border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${!isEditing && 'bg-slate-50 text-slate-500'}`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Country</label>
                  <input 
                    type="text" 
                    value={tempUser.address.country}
                    onChange={(e) => handleChange('address.country', e.target.value)}
                    disabled={!isEditing}
                    className={`w-full border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${!isEditing && 'bg-slate-50 text-slate-500'}`}
                  />
                </div>
              </div>
            </div>
            {isEditing && (
              <div className="mt-6 flex justify-end">
                <button 
                  onClick={handleSave}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-sm flex items-center gap-2"
                >
                  <Save size={16} /> Save Changes
                </button>
              </div>
            )}
          </div>
          
        </div>
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-800">Change Password</h3>
              <button onClick={() => setShowPasswordModal(false)} className="text-slate-400 hover:text-red-500">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Current Password</label>
                <input type="password" className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">New Password</label>
                <input type="password" className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Confirm New Password</label>
                <input type="password" className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-2">
              <button onClick={() => setShowPasswordModal(false)} className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 text-sm font-medium hover:bg-white">Cancel</button>
              <button onClick={() => { alert('Password changed!'); setShowPasswordModal(false); }} className="px-4 py-2 bg-blue-600 rounded-lg text-white text-sm font-medium hover:bg-blue-700">Update Password</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
