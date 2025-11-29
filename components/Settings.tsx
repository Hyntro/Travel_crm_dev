
import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, BadgeCheck, Edit2, Key, Shield, CheckCircle, ArrowLeft, Save, X, Plus, Settings as SettingsIcon } from 'lucide-react';
import { User as UserType, EmailConfiguration } from '../types';
import UserManagement from './UserManagement';
import RoleMaster from './RoleMaster';
import ProfileMaster from './ProfileMaster';
import UserDepartmentMaster from './UserDepartmentMaster';

// Mock current user
const initialUser: UserType = {
  id: '1',
  code: '12',
  name: 'Raja kumar',
  firstName: 'Raja',
  lastName: 'kumar',
  email: 'raja.kumar@deboxglobal.com',
  mobile: '154878565',
  phone: '5655698998',
  role: 'Administrator',
  department: 'Management',
  reportingManager: '-',
  status: 'Active',
  timeFormat: '24 Hours',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Raja',
  address: {
    street: '',
    city: '',
    state: '',
    zip: '',
    country: ''
  }
};

const initialEmails: EmailConfiguration[] = [
    { id: '1', fromName: 'Mohd Rizwan', email: 'mohd.rizwan@deboxglobal.com', isDefault: false },
    { id: '2', fromName: 'DeBox Global', email: 'info@deboxcrm.com', isDefault: true },
];

interface SettingsProps {
  onBack: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onBack }) => {
  const [activeSection, setActiveSection] = useState<'personal' | 'email' | 'users' | 'role' | 'profile' | 'department'>('personal');
  const [currentUser, setCurrentUser] = useState<UserType>(initialUser);
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [tempUser, setTempUser] = useState<UserType>(initialUser);
  
  // Email Settings State
  const [emails, setEmails] = useState<EmailConfiguration[]>(initialEmails);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [newEmail, setNewEmail] = useState<Partial<EmailConfiguration>>({ isDefault: false, securityType: 'None', imapSecurityType: 'None' });

  const handleEditToggle = () => {
    if (isEditing) {
      setTempUser(currentUser);
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const handleSaveUser = () => {
    setCurrentUser(tempUser);
    setIsEditing(false);
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

  const handleSaveEmail = () => {
      if(!newEmail.email) return;
      const emailConfig: EmailConfiguration = {
          id: newEmail.id || Math.random().toString(),
          fromName: newEmail.fromName || '',
          email: newEmail.email,
          password: newEmail.password || '',
          smtpServer: newEmail.smtpServer || '',
          smtpPort: newEmail.smtpPort || '',
          securityType: newEmail.securityType || 'None',
          imapServer: newEmail.imapServer || '',
          imapPort: newEmail.imapPort || '',
          imapSecurityType: newEmail.imapSecurityType || 'None',
          imapFilter: newEmail.imapFilter || '',
          isDefault: newEmail.isDefault || false
      };

      if(newEmail.id) {
          setEmails(emails.map(e => e.id === newEmail.id ? emailConfig : e));
      } else {
          setEmails([...emails, emailConfig]);
      }
      setShowEmailModal(false);
      setNewEmail({ isDefault: false, securityType: 'None', imapSecurityType: 'None' });
  };

  const handleEditEmail = (email: EmailConfiguration) => {
      setNewEmail({...email});
      setShowEmailModal(true);
  };

  return (
    <div className="flex h-full bg-slate-50">
        {/* Inner Sidebar */}
        <div className="w-64 bg-gray-100 border-r border-gray-200 flex flex-col h-full shrink-0">
            <div className="p-6">
                <h2 className="text-2xl font-bold text-slate-800">Setup</h2>
            </div>
            <div className="flex-1 overflow-y-auto px-4 space-y-6">
                <div>
                    <div className="px-4 py-2 text-sm font-bold text-slate-700 uppercase bg-gray-200 rounded-full mb-2">GENERAL</div>
                    <nav className="space-y-1 pl-2">
                        <button onClick={() => setActiveSection('personal')} className={`w-full text-left px-3 py-2 rounded text-sm font-medium transition-colors ${activeSection === 'personal' ? 'text-green-600' : 'text-slate-500 hover:text-slate-700'}`}>Personal Settings</button>
                        <button onClick={() => setActiveSection('email')} className={`w-full text-left px-3 py-2 rounded text-sm font-medium transition-colors ${activeSection === 'email' ? 'text-green-600' : 'text-slate-500 hover:text-slate-700'}`}>Email Settings</button>
                    </nav>
                </div>
                
                <div>
                    <div className="px-4 py-2 text-sm font-bold text-slate-700 uppercase bg-gray-200 rounded-full mb-2">USERS & PERMISSION</div>
                    <nav className="space-y-1 pl-2">
                        <button onClick={() => setActiveSection('users')} className={`w-full text-left px-3 py-2 rounded text-sm font-medium transition-colors ${activeSection === 'users' ? 'text-green-600' : 'text-slate-500 hover:text-slate-700'}`}>Users</button>
                        <button onClick={() => setActiveSection('role')} className={`w-full text-left px-3 py-2 rounded text-sm font-medium transition-colors ${activeSection === 'role' ? 'text-green-600' : 'text-slate-500 hover:text-slate-700'}`}>Role</button>
                        <button onClick={() => setActiveSection('profile')} className={`w-full text-left px-3 py-2 rounded text-sm font-medium transition-colors ${activeSection === 'profile' ? 'text-green-600' : 'text-slate-500 hover:text-slate-700'}`}>Profile</button>
                        <button onClick={() => setActiveSection('department')} className={`w-full text-left px-3 py-2 rounded text-sm font-medium transition-colors ${activeSection === 'department' ? 'text-green-600' : 'text-slate-500 hover:text-slate-700'}`}>User Department</button>
                    </nav>
                </div>

                <div>
                    <div className="px-4 py-2 text-sm font-bold text-slate-700 uppercase bg-gray-200 rounded-full mb-2">CUSTOMIZATION</div>
                </div>
            </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden flex flex-col">
            {activeSection === 'personal' && (
                <div className="flex-1 overflow-y-auto p-8">
                    <div className="max-w-5xl mx-auto">
                        <div className="flex justify-between items-center mb-8 border-b border-slate-200 pb-4">
                            <h2 className="text-2xl font-bold text-slate-800">Personal Settings</h2>
                            <button onClick={handleEditToggle} className="px-6 py-1.5 border border-slate-300 rounded-full text-sm hover:bg-white bg-white shadow-sm text-slate-600">Edit</button>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8 mb-6 relative">
                            <div className="flex justify-between items-start">
                                 <div className="flex gap-6">
                                    <div className="relative">
                                        <div className="w-24 h-24 rounded-full bg-yellow-100 border-4 border-white shadow-md overflow-hidden">
                                            <img src={currentUser.avatar} alt="Profile" className="w-full h-full object-cover"/>
                                        </div>
                                        <button className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-green-600 font-bold hover:underline bg-white px-2 py-0.5 rounded shadow-sm">Change</button>
                                    </div>
                                    <div className="pt-2">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="text-xl font-medium text-slate-800">{currentUser.name}</h3>
                                            <span className="px-2 py-0.5 border border-slate-300 rounded text-[10px] text-slate-500">{currentUser.role}</span>
                                        </div>
                                    </div>
                                 </div>
                                 <button onClick={() => setShowPasswordModal(true)} className="px-4 py-1.5 border border-slate-300 rounded-full text-sm hover:bg-slate-50 text-slate-600">Change Password</button>
                            </div>

                            <div className="mt-10 space-y-6 max-w-3xl">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-4">
                                    <div className="flex justify-between border-b border-slate-100 pb-2 items-center">
                                        <span className="text-sm text-slate-500">Email</span>
                                        <span className="text-sm font-medium text-slate-800">{currentUser.email}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-slate-100 pb-2 items-center">
                                        <span className="text-sm text-slate-500">Phone</span>
                                        {isEditing ? <input type="text" value={tempUser.phone} onChange={e=>handleChange('phone', e.target.value)} className="text-sm text-right border border-slate-300 rounded px-1 w-32"/> : <span className="text-sm font-medium text-slate-800">{currentUser.phone}</span>}
                                    </div>
                                    <div className="flex justify-between border-b border-slate-100 pb-2 items-center">
                                        <span className="text-sm text-slate-500">Mobile</span>
                                        {isEditing ? <input type="text" value={tempUser.mobile} onChange={e=>handleChange('mobile', e.target.value)} className="text-sm text-right border border-slate-300 rounded px-1 w-32"/> : <span className="text-sm font-medium text-slate-800">{currentUser.mobile}</span>}
                                    </div>
                                    <div className="flex justify-between border-b border-slate-100 pb-2 items-center">
                                        <span className="text-sm text-slate-500">Time Format</span>
                                        <span className="text-sm font-medium text-slate-800">{currentUser.timeFormat}</span>
                                    </div>
                                </div>

                                 <div className="space-y-4 pt-4">
                                    <div className="border-b border-slate-100 pb-2"><span className="text-sm text-slate-500 block mb-1">Street</span>{isEditing ? <input type="text" value={tempUser.address.street} onChange={e=>handleChange('address.street', e.target.value)} className="w-full text-sm border border-slate-300 rounded px-2 py-1"/> : <span className="text-sm font-medium text-slate-800 min-h-[20px] block">{currentUser.address.street}</span>}</div>
                                    <div className="border-b border-slate-100 pb-2"><span className="text-sm text-slate-500 block mb-1">City</span>{isEditing ? <input type="text" value={tempUser.address.city} onChange={e=>handleChange('address.city', e.target.value)} className="w-full text-sm border border-slate-300 rounded px-2 py-1"/> : <span className="text-sm font-medium text-slate-800 min-h-[20px] block">{currentUser.address.city}</span>}</div>
                                    <div className="border-b border-slate-100 pb-2"><span className="text-sm text-slate-500 block mb-1">State</span>{isEditing ? <input type="text" value={tempUser.address.state} onChange={e=>handleChange('address.state', e.target.value)} className="w-full text-sm border border-slate-300 rounded px-2 py-1"/> : <span className="text-sm font-medium text-slate-800 min-h-[20px] block">{currentUser.address.state}</span>}</div>
                                    <div className="border-b border-slate-100 pb-2"><span className="text-sm text-slate-500 block mb-1">Zip</span>{isEditing ? <input type="text" value={tempUser.address.zip} onChange={e=>handleChange('address.zip', e.target.value)} className="w-full text-sm border border-slate-300 rounded px-2 py-1"/> : <span className="text-sm font-medium text-slate-800 min-h-[20px] block">{currentUser.address.zip}</span>}</div>
                                    <div className="border-b border-slate-100 pb-2"><span className="text-sm text-slate-500 block mb-1">Country</span>{isEditing ? <input type="text" value={tempUser.address.country} onChange={e=>handleChange('address.country', e.target.value)} className="w-full text-sm border border-slate-300 rounded px-2 py-1"/> : <span className="text-sm font-medium text-slate-800 min-h-[20px] block">{currentUser.address.country}</span>}</div>
                                 </div>
                            </div>
                            {isEditing && (
                                <div className="mt-6 flex justify-end gap-2">
                                    <button onClick={handleEditToggle} className="px-4 py-2 text-sm border border-slate-300 rounded hover:bg-slate-50">Cancel</button>
                                    <button onClick={handleSaveUser} className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">Save Changes</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {activeSection === 'email' && (
                <div className="flex-1 overflow-y-auto p-8">
                    <div className="max-w-5xl mx-auto">
                        {!showEmailModal ? (
                            <>
                                <div className="flex justify-between items-center mb-8 border-b border-slate-200 pb-4">
                                    <h2 className="text-2xl font-bold text-slate-800">Email Settings</h2>
                                    <button onClick={() => {setNewEmail({isDefault: false, securityType: 'None', imapSecurityType: 'None'}); setShowEmailModal(true)}} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-sm">+ Add New Email</button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {emails.map(email => (
                                        <div key={email.id} className="bg-green-50/30 border border-green-100 rounded-lg p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow h-64 justify-center">
                                            <div className="w-16 h-12 bg-yellow-400 rounded-lg flex items-center justify-center mb-4 relative">
                                                <Mail className="text-white" size={24}/>
                                                {email.isDefault && (
                                                    <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-1 border-2 border-white">
                                                        <CheckCircle size={12} className="text-white"/>
                                                    </div>
                                                )}
                                            </div>
                                            <h3 className="font-medium text-green-600 text-lg mb-1">{email.fromName}</h3>
                                            <p className="text-sm text-slate-500 mb-6">{email.email}</p>
                                            <button onClick={() => handleEditEmail(email)} className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-2 rounded-full text-sm font-medium shadow-sm">Setting</button>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 animate-in fade-in slide-in-from-right-4">
                                <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
                                    <h2 className="text-xl font-bold text-slate-800">Configure Email</h2>
                                    <div className="flex gap-2">
                                        <button onClick={handleSaveEmail} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-1.5 rounded-full text-sm font-medium">Save</button>
                                        <button onClick={() => setShowEmailModal(false)} className="border border-slate-300 text-slate-600 px-6 py-1.5 rounded-full text-sm font-medium hover:bg-slate-50">Cancel</button>
                                    </div>
                                </div>
                                
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="font-bold text-slate-700 mb-4">Email Information</h3>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-xs text-slate-500 mb-1">From Name</label>
                                                <input type="text" value={newEmail.fromName || ''} onChange={e=>setNewEmail({...newEmail, fromName: e.target.value})} className="w-full border-b-2 border-red-500 outline-none py-1 text-sm"/>
                                            </div>
                                            <div>
                                                <label className="block text-xs text-slate-500 mb-1">Email</label>
                                                <div className="relative">
                                                    <input type="email" value={newEmail.email || ''} onChange={e=>setNewEmail({...newEmail, email: e.target.value})} className="w-full border-b-2 border-red-500 outline-none py-1 text-sm pr-8"/>
                                                    <Mail className="absolute right-0 bottom-2 text-teal-500" size={16}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border border-slate-200 rounded p-4">
                                        <h3 className="font-bold text-slate-700 mb-4 underline text-center text-xs uppercase">Other Mail Configuration</h3>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-xs text-slate-500 mb-1">Password</label>
                                                <input type="password" value={newEmail.password || ''} onChange={e=>setNewEmail({...newEmail, password: e.target.value})} className="w-full border border-slate-200 rounded px-3 py-2 text-sm border-b-2 border-b-red-500 outline-none"/>
                                            </div>
                                            <div>
                                                <label className="block text-xs text-slate-500 mb-1">SMTP Server</label>
                                                <input type="text" value={newEmail.smtpServer || ''} onChange={e=>setNewEmail({...newEmail, smtpServer: e.target.value})} className="w-full border border-slate-200 rounded px-3 py-2 text-sm border-b-2 border-b-red-500 outline-none"/>
                                            </div>
                                            <div>
                                                <label className="block text-xs text-slate-500 mb-1">SMTP Port</label>
                                                <input type="text" value={newEmail.smtpPort || ''} onChange={e=>setNewEmail({...newEmail, smtpPort: e.target.value})} className="w-full border border-slate-200 rounded px-3 py-2 text-sm border-b-2 border-b-red-500 outline-none"/>
                                            </div>
                                            <div>
                                                <label className="block text-xs text-slate-500 mb-1">Security Type</label>
                                                <select value={newEmail.securityType} onChange={e=>setNewEmail({...newEmail, securityType: e.target.value as any})} className="w-full border border-slate-200 rounded px-3 py-2 text-sm border-b-2 border-b-red-500 outline-none">
                                                    <option>None</option><option>SSL</option><option>TLS</option>
                                                </select>
                                            </div>
                                            
                                            <div>
                                                <label className="block text-xs text-slate-500 mb-1">IMAP Server</label>
                                                <input type="text" value={newEmail.imapServer || ''} onChange={e=>setNewEmail({...newEmail, imapServer: e.target.value})} className="w-full border border-slate-200 rounded px-3 py-2 text-sm border-b-2 border-b-red-500 outline-none"/>
                                            </div>
                                            <div>
                                                <label className="block text-xs text-slate-500 mb-1">IMAP Port</label>
                                                <input type="text" value={newEmail.imapPort || ''} onChange={e=>setNewEmail({...newEmail, imapPort: e.target.value})} className="w-full border border-slate-200 rounded px-3 py-2 text-sm border-b-2 border-b-red-500 outline-none"/>
                                            </div>
                                            <div>
                                                <label className="block text-xs text-slate-500 mb-1">IMAP Security Type</label>
                                                <select value={newEmail.imapSecurityType} onChange={e=>setNewEmail({...newEmail, imapSecurityType: e.target.value as any})} className="w-full border border-slate-200 rounded px-3 py-2 text-sm border-b-2 border-b-red-500 outline-none">
                                                    <option>None</option><option>SSL</option><option>TLS</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-xs text-slate-500 mb-1">IMAP Filter</label>
                                                <input type="text" value={newEmail.imapFilter || ''} onChange={e=>setNewEmail({...newEmail, imapFilter: e.target.value})} className="w-full border border-slate-200 rounded px-3 py-2 text-sm outline-none"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input type="checkbox" checked={newEmail.isDefault} onChange={e=>setNewEmail({...newEmail, isDefault: e.target.checked})} className="rounded text-blue-600 focus:ring-blue-500"/>
                                        <label className="text-sm text-slate-700">Set Default</label>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {activeSection === 'users' && <UserManagement />}
            {activeSection === 'role' && <RoleMaster />}
            {activeSection === 'profile' && <ProfileMaster />}
            {activeSection === 'department' && <UserDepartmentMaster />}

        </div>
        
        {showPasswordModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
              <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="flex justify-between items-center p-4 border-b border-slate-100">
                  <h3 className="text-lg font-bold text-slate-800">Change Password</h3>
                  <button onClick={() => setShowPasswordModal(false)} className="text-slate-400 hover:text-red-500">
                    <X size={20} />
                  </button>
                </div>
                <div className="p-6 space-y-4">
                  <div><label className="block text-sm font-medium text-slate-700 mb-1">Current Password</label><input type="password" className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" /></div>
                  <div><label className="block text-sm font-medium text-slate-700 mb-1">New Password</label><input type="password" className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" /></div>
                  <div><label className="block text-sm font-medium text-slate-700 mb-1">Confirm New Password</label><input type="password" className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" /></div>
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
