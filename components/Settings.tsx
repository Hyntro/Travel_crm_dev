
import React from 'react';
import { User, Mail, Phone, MapPin, BadgeCheck, Edit2, Key, Shield, CheckCircle } from 'lucide-react';
import { User as UserType } from '../types';

// Mock current user (Updated to match Login Demo Credentials)
const currentUser: UserType = {
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

const Settings: React.FC = () => {
  return (
    <div className="p-8 max-w-5xl mx-auto h-full overflow-y-auto">
      <div className="mb-8 border-b border-slate-200 pb-4">
        <h2 className="text-3xl font-bold text-slate-800">Personal Settings</h2>
        <p className="text-slate-500 mt-1">Manage your profile information and account security.</p>
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
               <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                 <Edit2 size={16} /> Edit Profile
               </button>
               <button className="w-full py-2 px-4 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
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
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Email Address</label>
                <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-500 cursor-not-allowed">
                  <Mail size={16} className="mr-2 opacity-50" />
                  {currentUser.email}
                </div>
                <p className="text-xs text-slate-400 mt-1">Email cannot be changed.</p>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Mobile Number</label>
                <div className="flex items-center bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-700">
                  <Phone size={16} className="mr-2 text-slate-400" />
                  <input type="text" defaultValue={currentUser.mobile} className="w-full outline-none text-sm"/>
                </div>
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
                  defaultValue={currentUser.address.street}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">City</label>
                  <input 
                    type="text" 
                    defaultValue={currentUser.address.city}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">State</label>
                  <input 
                    type="text" 
                    defaultValue={currentUser.address.state}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Zip Code</label>
                  <input 
                    type="text" 
                    defaultValue={currentUser.address.zip}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Country</label>
                  <input 
                    type="text" 
                    defaultValue={currentUser.address.country}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-sm">
                Save Changes
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Settings;
