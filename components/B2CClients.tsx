
import React, { useState } from 'react';
import { Plus, Search, User, Phone, Mail, MapPin, Heart, AlertCircle, X, Download, Upload, History, FileSpreadsheet, MoreHorizontal, Save, FileText } from 'lucide-react';
import { B2CClient } from '../types';

const initialClients: B2CClient[] = [
  { 
    id: '1', 
    title: 'Ms', firstName: 'Emily', middleName: '', lastName: 'Watson', name: 'Emily Watson',
    gender: 'Female', dob: '1990-05-15', nationalityType: 'Foreign', nationality: 'British',
    anniversaryDate: '', accountingCode: 'ACC001',
    mobileCode: '+44', mobile: '7700 987654', email: 'emily.w@example.com', emailType: 'Personal',
    address: '10 Downing St', country: 'UK', state: 'London', city: 'London', zipCode: 'SW1A 2AA',
    salesPerson: 'Sarah Smith', status: 'Active', familyCode: 'FAM001', familyRelation: 'Self',
    marketType: 'Inbound', holidayPreference: 'Leisure', covidVaccinated: 'Yes', newsletter: 'Yes',
    preferences: { meal: 'Veg', seat: 'Window', special: 'None', accommodation: '5 Star' },
    emergencyContact: { name: 'John Watson', relation: 'Father', code: '+44', phone: '7700 111222' },
    documents: [], socialMedia: { facebook: '', twitter: '', linkedin: '', instagram: '' }, remarks: ['', '', ''],
    passportNumber: 'G12345678', visaNumber: 'V98765432',
  },
  { 
    id: '2', 
    title: 'Mr', firstName: 'Michael', middleName: '', lastName: 'Chen', name: 'Michael Chen',
    gender: 'Male', dob: '1985-08-20', nationalityType: 'Foreign', nationality: 'American',
    anniversaryDate: '2015-06-15', accountingCode: 'ACC002',
    mobileCode: '+1', mobile: '555 012 3456', email: 'm.chen@example.com', emailType: 'Office',
    address: '123 Tech Blvd', country: 'USA', state: 'California', city: 'San Francisco', zipCode: '94107',
    salesPerson: 'James Wilson', status: 'Active', familyCode: 'FAM002', familyRelation: 'Self',
    marketType: 'Inbound', holidayPreference: 'Adventure', covidVaccinated: 'Yes', newsletter: 'No',
    preferences: { meal: 'Non-Veg', seat: 'Aisle', special: 'Extra Legroom', accommodation: '4 Star' },
    emergencyContact: { name: 'Sarah Chen', relation: 'Wife', code: '+1', phone: '555 012 9999' },
    documents: [], socialMedia: { facebook: 'mike.chen', twitter: '@mchen', linkedin: 'michael-chen', instagram: '' }, remarks: ['VIP Client', '', ''],
    passportNumber: 'A98765432', visaNumber: '-',
  },
];

const B2CClients: React.FC = () => {
  const [clients, setClients] = useState<B2CClient[]>(initialClients);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const emptyClient: Partial<B2CClient> = {
    title: 'Mr', firstName: '', middleName: '', lastName: '', gender: 'Male', dob: '', nationalityType: 'Foreign', nationality: '',
    mobileCode: '+91', mobile: '', email: '', emailType: 'Personal',
    address: '', country: '', state: '', city: '', zipCode: '',
    salesPerson: 'Select', status: 'Active', familyRelation: 'Select',
    preferences: { meal: 'Select', seat: 'Select', special: 'Select', accommodation: 'Select' },
    emergencyContact: { name: '', relation: '', code: '+91', phone: '' },
    documents: [],
    socialMedia: { facebook: '', twitter: '', linkedin: '', instagram: '' },
    remarks: ['', '', '']
  };

  const [newClient, setNewClient] = useState<Partial<B2CClient>>(emptyClient);

  // Helper to handle nested updates
  const updateNested = (obj: any, path: string, value: any) => {
    const keys = path.split('.');
    const lastKey = keys.pop();
    const target = keys.reduce((acc, key) => acc[key], obj);
    if (lastKey) target[lastKey] = value;
    return { ...obj };
  };

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      setNewClient(prev => updateNested({ ...prev }, field, value));
    } else {
      setNewClient(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleRemarkChange = (index: number, value: string) => {
    const updatedRemarks = [...(newClient.remarks || [])];
    updatedRemarks[index] = value;
    setNewClient(prev => ({ ...prev, remarks: updatedRemarks }));
  };

  const handleSave = () => {
    if (!newClient.firstName || !newClient.lastName) return;
    
    const client: B2CClient = {
       ...newClient as B2CClient,
       id: Math.random().toString(),
       name: `${newClient.title} ${newClient.firstName} ${newClient.lastName}`,
       passportNumber: newClient.documents?.find(d => d.type === 'Passport')?.number || '-',
       visaNumber: newClient.documents?.find(d => d.type === 'Visa')?.number || '-',
    };
    
    setClients([...clients, client]);
    setShowForm(false);
    setNewClient(emptyClient);
  };

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.mobile.includes(searchQuery)
  );

  return (
    <div className="p-6 h-full flex flex-col bg-slate-50">
       {!showForm ? (
        <>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">B2C Customers</h2>
              <p className="text-slate-500 text-sm">Direct clients database with preferences and history.</p>
            </div>
            <button 
              onClick={() => setShowForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
            >
              <Plus size={18} />
              <span>Add Customer</span>
            </button>
          </div>

          {/* Filter Bar */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                   <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Search</label>
                   <input 
                     type="text" 
                     placeholder="Enter Name, Contact, Email" 
                     className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                   />
                </div>
             </div>
          </div>

          {/* Actions & Table */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex-1 overflow-hidden flex flex-col">
             <div className="p-4 border-b border-slate-200 flex justify-end gap-3 bg-slate-50">
                <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-300 text-slate-600 rounded-md text-xs font-medium hover:bg-slate-50 transition-colors">
                   <Download size={14}/> Download Format
                </button>
                <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-300 text-slate-600 rounded-md text-xs font-medium hover:bg-slate-50 transition-colors">
                   <Upload size={14}/> Import Excel
                </button>
                <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-300 text-slate-600 rounded-md text-xs font-medium hover:bg-slate-50 transition-colors">
                   <History size={14}/> View Logs
                </button>
             </div>
             
             <div className="overflow-x-auto flex-1">
               <table className="w-full text-left border-collapse">
                 <thead className="bg-slate-100 text-slate-600">
                   <tr>
                     <th className="px-4 py-3 text-xs font-bold uppercase border-b border-slate-200 whitespace-nowrap">Name</th>
                     <th className="px-4 py-3 text-xs font-bold uppercase border-b border-slate-200 whitespace-nowrap">Contact Information</th>
                     <th className="px-4 py-3 text-xs font-bold uppercase border-b border-slate-200 whitespace-nowrap">Address</th>
                     <th className="px-4 py-3 text-xs font-bold uppercase border-b border-slate-200 whitespace-nowrap">Preferences</th>
                     <th className="px-4 py-3 text-xs font-bold uppercase border-b border-slate-200 whitespace-nowrap">Passport Number</th>
                     <th className="px-4 py-3 text-xs font-bold uppercase border-b border-slate-200 whitespace-nowrap">VISA Number</th>
                     <th className="px-4 py-3 text-xs font-bold uppercase border-b border-slate-200 whitespace-nowrap">Status</th>
                     <th className="px-4 py-3 text-xs font-bold uppercase border-b border-slate-200 text-right">Action</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                   {filteredClients.map(client => (
                     <tr key={client.id} className="hover:bg-slate-50 transition-colors">
                       <td className="px-4 py-3 text-sm font-medium text-slate-900">{client.name}</td>
                       <td className="px-4 py-3">
                         <div className="flex flex-col text-xs text-slate-600">
                            <span className="flex items-center gap-1"><Phone size={12}/> {client.mobileCode} {client.mobile}</span>
                            <span className="flex items-center gap-1 mt-0.5"><Mail size={12}/> {client.email}</span>
                         </div>
                       </td>
                       <td className="px-4 py-3 text-xs text-slate-600 max-w-[200px] truncate" title={`${client.address}, ${client.city}`}>
                         {client.city}, {client.country}
                       </td>
                       <td className="px-4 py-3">
                         <div className="flex flex-wrap gap-1">
                           <span className={`text-[10px] px-1.5 py-0.5 rounded border ${client.preferences.meal === 'Veg' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
                             {client.preferences.meal}
                           </span>
                           {client.preferences.special !== 'None' && client.preferences.special !== 'Select' && (
                             <span className="text-[10px] px-1.5 py-0.5 rounded border bg-yellow-50 border-yellow-200 text-yellow-700">
                               {client.preferences.special}
                             </span>
                           )}
                         </div>
                       </td>
                       <td className="px-4 py-3 text-xs text-slate-600 font-mono">
                          {client.passportNumber || '-'}
                       </td>
                       <td className="px-4 py-3 text-xs text-slate-600 font-mono">
                          {client.visaNumber || '-'}
                       </td>
                       <td className="px-4 py-3">
                         <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${client.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                           {client.status}
                         </span>
                       </td>
                       <td className="px-4 py-3 text-right">
                          <button className="text-slate-400 hover:text-blue-600"><MoreHorizontal size={16}/></button>
                       </td>
                     </tr>
                   ))}
                   {filteredClients.length === 0 && (
                      <tr>
                         <td colSpan={8} className="px-4 py-8 text-center text-sm text-slate-500">No B2C customers found.</td>
                      </tr>
                   )}
                 </tbody>
               </table>
             </div>
          </div>
        </>
      ) : (
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 flex flex-col h-full overflow-hidden animate-in slide-in-from-bottom-4">
           <div className="flex justify-between items-center p-6 border-b border-slate-200 bg-white">
            <h2 className="text-2xl font-bold text-slate-800">Add B2C</h2>
            <div className="flex gap-3">
               <button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-sm font-medium shadow-sm transition-colors">Save</button>
               <button className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-4 py-2 rounded-full text-sm font-medium transition-colors">Save and New</button>
               <button onClick={() => setShowForm(false)} className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-4 py-2 rounded-full text-sm font-medium transition-colors">Cancel</button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-8">
            <div className="grid grid-cols-12 gap-8">
               
               {/* Left Column (Main Info) */}
               <div className="col-span-12 lg:col-span-8 space-y-8">
                  {/* Contact Info Section */}
                  <div>
                     <h4 className="text-sm font-bold text-slate-800 mb-4 pb-1 border-b border-slate-200">Contact Information</h4>
                     <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1">Contact Type</label>
                        <select className="w-full md:w-1/3 border border-slate-300 rounded px-3 py-2 text-sm bg-slate-50 text-slate-500 outline-none" disabled>
                           <option>B2C</option>
                        </select>
                     </div>
                  </div>

                  {/* Personal Info */}
                  <div>
                     <h4 className="text-sm font-bold text-slate-800 mb-4 pb-1 border-b border-slate-200">Personal Information</h4>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                           <label className="block text-xs font-semibold text-slate-500 mb-1">Nationality Type</label>
                           <select value={newClient.nationalityType} onChange={e => handleInputChange('nationalityType', e.target.value)} className="w-full border border-slate-300 rounded px-3 py-2 text-sm bg-white"><option>Foreign</option><option>Indian</option></select>
                        </div>
                        <div>
                           <label className="block text-xs font-semibold text-slate-500 mb-1">Nationality</label>
                           <select value={newClient.nationality} onChange={e => handleInputChange('nationality', e.target.value)} className="w-full border border-slate-300 rounded px-3 py-2 text-sm bg-white"><option>Select</option><option>British</option><option>American</option><option>Indian</option></select>
                        </div>
                        <div>
                           <label className="block text-xs font-semibold text-slate-500 mb-1">Title</label>
                           <select value={newClient.title} onChange={e => handleInputChange('title', e.target.value)} className="w-full border border-slate-300 rounded px-3 py-2 text-sm bg-white"><option>Mr</option><option>Ms</option><option>Mrs</option></select>
                        </div>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                           <label className="block text-xs font-semibold text-slate-500 mb-1">First Name</label>
                           <input type="text" value={newClient.firstName} onChange={e => handleInputChange('firstName', e.target.value)} className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none border-l-4 border-l-red-500" />
                        </div>
                        <div>
                           <label className="block text-xs font-semibold text-slate-500 mb-1">Middle Name</label>
                           <input type="text" value={newClient.middleName} onChange={e => handleInputChange('middleName', e.target.value)} className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none" />
                        </div>
                        <div>
                           <label className="block text-xs font-semibold text-slate-500 mb-1">Last Name</label>
                           <input type="text" value={newClient.lastName} onChange={e => handleInputChange('lastName', e.target.value)} className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none" />
                        </div>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                           <label className="block text-xs font-semibold text-slate-500 mb-1">Gender</label>
                           <select value={newClient.gender} onChange={e => handleInputChange('gender', e.target.value)} className="w-full border border-slate-300 rounded px-3 py-2 text-sm bg-white"><option>Select</option><option>Male</option><option>Female</option></select>
                        </div>
                        <div>
                           <label className="block text-xs font-semibold text-slate-500 mb-1">Date of Birth</label>
                           <input type="date" value={newClient.dob} onChange={e => handleInputChange('dob', e.target.value)} className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none" />
                        </div>
                        <div>
                           <label className="block text-xs font-semibold text-slate-500 mb-1">Anniversary Date</label>
                           <input type="date" value={newClient.anniversaryDate} onChange={e => handleInputChange('anniversaryDate', e.target.value)} className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none" />
                        </div>
                        <div>
                           <label className="block text-xs font-semibold text-slate-500 mb-1">Accounting Code</label>
                           <input type="text" value={newClient.accountingCode} onChange={e => handleInputChange('accountingCode', e.target.value)} className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none" />
                        </div>
                     </div>
                  </div>

                  {/* Contact Info (Details) */}
                  <div>
                     <h4 className="text-sm font-bold text-slate-800 mb-4 pb-1 border-b border-slate-200">Contact Information</h4>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                           <label className="block text-xs font-semibold text-slate-500 mb-1">Mobile / Landline / Fax Code</label>
                           <div className="flex gap-2">
                              <select className="w-24 border border-slate-300 rounded px-2 py-2 text-sm bg-white"><option>Mobile</option></select>
                              <input type="text" value={newClient.mobileCode} onChange={e => handleInputChange('mobileCode', e.target.value)} className="w-20 border border-slate-300 rounded px-2 py-2 text-sm text-center" />
                              <input type="text" value={newClient.mobile} onChange={e => handleInputChange('mobile', e.target.value)} className="flex-1 border border-slate-300 rounded px-3 py-2 text-sm outline-none" />
                           </div>
                        </div>
                        <div>
                           <label className="block text-xs font-semibold text-slate-500 mb-1">Email</label>
                           <div className="flex gap-2">
                              <select value={newClient.emailType} onChange={e => handleInputChange('emailType', e.target.value)} className="w-28 border border-slate-300 rounded px-2 py-2 text-sm bg-white"><option>Office</option><option>Personal</option></select>
                              <input type="email" value={newClient.email} onChange={e => handleInputChange('email', e.target.value)} className="flex-1 border border-slate-300 rounded px-3 py-2 text-sm outline-none" />
                              <button className="text-blue-600 hover:bg-blue-50 p-2 rounded"><Plus size={18}/></button>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Address Info */}
                  <div>
                     <h4 className="text-sm font-bold text-slate-800 mb-4 pb-1 border-b border-slate-200">Address Information</h4>
                     <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div>
                           <label className="block text-xs font-semibold text-slate-500 mb-1">Country</label>
                           <select value={newClient.country} onChange={e => handleInputChange('country', e.target.value)} className="w-full border border-slate-300 rounded px-3 py-2 text-sm bg-white"><option>India</option><option>USA</option></select>
                        </div>
                        <div>
                           <label className="block text-xs font-semibold text-slate-500 mb-1">State</label>
                           <select value={newClient.state} onChange={e => handleInputChange('state', e.target.value)} className="w-full border border-slate-300 rounded px-3 py-2 text-sm bg-white"><option>Select State</option><option>Maharashtra</option></select>
                        </div>
                        <div>
                           <label className="block text-xs font-semibold text-slate-500 mb-1">City</label>
                           <select value={newClient.city} onChange={e => handleInputChange('city', e.target.value)} className="w-full border border-slate-300 rounded px-3 py-2 text-sm bg-white"><option>Select</option><option>Mumbai</option></select>
                        </div>
                        <div>
                           <label className="block text-xs font-semibold text-slate-500 mb-1">Pin/Zip</label>
                           <input type="text" value={newClient.zipCode} onChange={e => handleInputChange('zipCode', e.target.value)} className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none" />
                        </div>
                     </div>
                     <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1">Address</label>
                        <textarea value={newClient.address} onChange={e => handleInputChange('address', e.target.value)} className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none h-20 resize-none"></textarea>
                     </div>
                  </div>

                  {/* Documentation */}
                  <div>
                     <h4 className="text-sm font-bold text-slate-800 mb-4 pb-1 border-b border-slate-200">Documentation</h4>
                     <div className="overflow-x-auto">
                        <table className="w-full text-left min-w-[800px]">
                           <thead>
                              <tr>
                                 <th className="text-[10px] font-semibold text-slate-500 uppercase pb-2">Document Type</th>
                                 <th className="text-[10px] font-semibold text-slate-500 uppercase pb-2">Required</th>
                                 <th className="text-[10px] font-semibold text-slate-500 uppercase pb-2">Document No.</th>
                                 <th className="text-[10px] font-semibold text-slate-500 uppercase pb-2">Issue Date</th>
                                 <th className="text-[10px] font-semibold text-slate-500 uppercase pb-2">Expiry Date</th>
                                 <th className="text-[10px] font-semibold text-slate-500 uppercase pb-2">Issue Country</th>
                                 <th className="text-[10px] font-semibold text-slate-500 uppercase pb-2">Document Title</th>
                                 <th className="text-[10px] font-semibold text-slate-500 uppercase pb-2">Upload Document</th>
                                 <th></th>
                              </tr>
                           </thead>
                           <tbody>
                              <tr>
                                 <td className="pr-2"><select className="w-full border border-slate-300 rounded px-2 py-1 text-xs"><option>Select</option><option>Passport</option><option>Visa</option></select></td>
                                 <td className="pr-2"><select className="w-full border border-slate-300 rounded px-2 py-1 text-xs"><option>Yes</option><option>No</option></select></td>
                                 <td className="pr-2"><input type="text" className="w-full border border-slate-300 rounded px-2 py-1 text-xs" /></td>
                                 <td className="pr-2"><input type="date" className="w-full border border-slate-300 rounded px-2 py-1 text-xs" /></td>
                                 <td className="pr-2"><input type="date" className="w-full border border-slate-300 rounded px-2 py-1 text-xs" /></td>
                                 <td className="pr-2"><select className="w-full border border-slate-300 rounded px-2 py-1 text-xs"><option>Select</option><option>India</option></select></td>
                                 <td className="pr-2"><select className="w-full border border-slate-300 rounded px-2 py-1 text-xs"><option>Both</option></select></td>
                                 <td className="pr-2">
                                    <div className="flex border border-slate-300 rounded overflow-hidden">
                                       <button className="bg-slate-100 px-2 py-1 text-xs border-r border-slate-300">Choose File</button>
                                       <span className="px-2 py-1 text-[10px] text-slate-400 bg-white flex-1 truncate">No file chosen</span>
                                    </div>
                                 </td>
                                 <td><button className="text-slate-400 hover:text-blue-600"><Plus size={16}/></button></td>
                              </tr>
                           </tbody>
                        </table>
                     </div>
                  </div>

                  {/* Social Media */}
                  <div>
                     <h4 className="text-sm font-bold text-slate-800 mb-4 pb-1 border-b border-slate-200">Social Media</h4>
                     <div className="grid grid-cols-2 gap-4">
                        <div>
                           <label className="block text-xs font-semibold text-slate-500 mb-1">Facebook Profile</label>
                           <input type="text" value={newClient.socialMedia?.facebook} onChange={e => handleInputChange('socialMedia.facebook', e.target.value)} className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none" />
                        </div>
                        <div>
                           <label className="block text-xs font-semibold text-slate-500 mb-1">Twitter Profile</label>
                           <input type="text" value={newClient.socialMedia?.twitter} onChange={e => handleInputChange('socialMedia.twitter', e.target.value)} className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none" />
                        </div>
                        <div>
                           <label className="block text-xs font-semibold text-slate-500 mb-1">LinkedIn Profile</label>
                           <input type="text" value={newClient.socialMedia?.linkedin} onChange={e => handleInputChange('socialMedia.linkedin', e.target.value)} className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none" />
                        </div>
                        <div>
                           <label className="block text-xs font-semibold text-slate-500 mb-1">Instagram Profile</label>
                           <input type="text" value={newClient.socialMedia?.instagram} onChange={e => handleInputChange('socialMedia.instagram', e.target.value)} className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none" />
                        </div>
                     </div>
                  </div>

                  {/* Remarks */}
                  <div>
                     {[0, 1, 2].map((i) => (
                        <div key={i} className="mb-4">
                           <label className="block text-xs font-semibold text-slate-500 mb-1">Remarks {i + 1}</label>
                           <textarea value={newClient.remarks?.[i]} onChange={e => handleRemarkChange(i, e.target.value)} className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none h-16 resize-none"></textarea>
                        </div>
                     ))}
                  </div>
               </div>

               {/* Right Column (Side Info) */}
               <div className="col-span-12 lg:col-span-4 space-y-8">
                  <div>
                     <h4 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-1"><Plus size={16}/> Add More Information</h4>
                     <div className="grid grid-cols-2 gap-4">
                        <div>
                           <label className="block text-xs font-semibold text-slate-500 mb-1">Sales Person</label>
                           <select value={newClient.salesPerson} onChange={e => handleInputChange('salesPerson', e.target.value)} className="w-full border border-slate-300 rounded px-3 py-2 text-sm bg-white"><option>Select</option><option>Sarah Smith</option></select>
                        </div>
                        <div>
                           <label className="block text-xs font-semibold text-slate-500 mb-1">Status</label>
                           <select value={newClient.status} onChange={e => handleInputChange('status', e.target.value as any)} className="w-full border border-slate-300 rounded px-3 py-2 text-sm bg-white border-b-2 border-b-red-500"><option>Active</option><option>Inactive</option></select>
                        </div>
                     </div>
                  </div>

                  <div>
                     <label className="block text-xs font-semibold text-slate-500 mb-2">Family Information</label>
                     <div className="space-y-4">
                        <div>
                           <label className="block text-xs font-semibold text-slate-400 mb-1">Family Code</label>
                           <input type="text" value={newClient.familyCode} onChange={e => handleInputChange('familyCode', e.target.value)} className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none" />
                        </div>
                        <div>
                           <label className="block text-xs font-semibold text-slate-400 mb-1">Family Relation</label>
                           <select value={newClient.familyRelation} onChange={e => handleInputChange('familyRelation', e.target.value)} className="w-full border border-slate-300 rounded px-3 py-2 text-sm bg-white"><option>Select</option><option>Self</option><option>Spouse</option></select>
                        </div>
                     </div>
                  </div>

                  <div>
                     <label className="block text-xs font-semibold text-slate-500 mb-2">Preference</label>
                     <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                           <label className="block text-xs font-semibold text-slate-400 mb-1">Meal Preference</label>
                           <select value={newClient.preferences?.meal} onChange={e => handleInputChange('preferences.meal', e.target.value)} className="w-full border border-slate-300 rounded px-3 py-2 text-sm bg-white"><option>Select</option><option>Veg</option><option>Non-Veg</option></select>
                        </div>
                        <div>
                           <label className="block text-xs font-semibold text-slate-400 mb-1">Special Assistance</label>
                           <select value={newClient.preferences?.special} onChange={e => handleInputChange('preferences.special', e.target.value)} className="w-full border border-slate-300 rounded px-3 py-2 text-sm bg-white"><option>Select</option><option>Wheelchair</option></select>
                        </div>
                        <div>
                           <label className="block text-xs font-semibold text-slate-400 mb-1">Seat Preference</label>
                           <select value={newClient.preferences?.seat} onChange={e => handleInputChange('preferences.seat', e.target.value)} className="w-full border border-slate-300 rounded px-3 py-2 text-sm bg-white"><option>Select</option><option>Window</option><option>Aisle</option></select>
                        </div>
                        <div>
                           <label className="block text-xs font-semibold text-slate-400 mb-1">Accomodation Preference</label>
                           <select value={newClient.preferences?.accommodation} onChange={e => handleInputChange('preferences.accommodation', e.target.value)} className="w-full border border-slate-300 rounded px-3 py-2 text-sm bg-white"><option>Select</option><option>5 Star</option></select>
                        </div>
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div>
                           <label className="block text-xs font-semibold text-slate-400 mb-1">Market Type</label>
                           <select value={newClient.marketType} onChange={e => handleInputChange('marketType', e.target.value)} className="w-full border border-slate-300 rounded px-3 py-2 text-sm bg-white"><option>General</option></select>
                        </div>
                        <div>
                           <label className="block text-xs font-semibold text-slate-400 mb-1">Holiday Preference</label>
                           <input type="text" value={newClient.holidayPreference} onChange={e => handleInputChange('holidayPreference', e.target.value)} className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none" />
                        </div>
                        <div>
                           <label className="block text-xs font-semibold text-slate-400 mb-1">Covid Vaccinated</label>
                           <select value={newClient.covidVaccinated} onChange={e => handleInputChange('covidVaccinated', e.target.value as any)} className="w-full border border-slate-300 rounded px-3 py-2 text-sm bg-white"><option>No</option><option>Yes</option></select>
                        </div>
                        <div>
                           <label className="block text-xs font-semibold text-slate-400 mb-1">Newsletter</label>
                           <select value={newClient.newsletter} onChange={e => handleInputChange('newsletter', e.target.value as any)} className="w-full border border-slate-300 rounded px-3 py-2 text-sm bg-white"><option>No</option><option>Yes</option></select>
                        </div>
                     </div>
                  </div>

                  <div>
                     <h4 className="text-sm font-bold text-slate-800 mb-4">Emergency Contact Details</h4>
                     <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                           <div>
                              <label className="block text-xs font-semibold text-slate-400 mb-1">Name</label>
                              <input type="text" value={newClient.emergencyContact?.name} onChange={e => handleInputChange('emergencyContact.name', e.target.value)} className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none" />
                           </div>
                           <div>
                              <label className="block text-xs font-semibold text-slate-400 mb-1">Relation</label>
                              <input type="text" value={newClient.emergencyContact?.relation} onChange={e => handleInputChange('emergencyContact.relation', e.target.value)} className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none" />
                           </div>
                        </div>
                        <div className="flex gap-2">
                           <div>
                              <label className="block text-xs font-semibold text-slate-400 mb-1">Code</label>
                              <input type="text" value={newClient.emergencyContact?.code} onChange={e => handleInputChange('emergencyContact.code', e.target.value)} className="w-16 border border-slate-300 rounded px-2 py-2 text-sm text-center" placeholder="+91" />
                           </div>
                           <div className="flex-1">
                              <label className="block text-xs font-semibold text-slate-400 mb-1">Contact Number</label>
                              <input type="text" value={newClient.emergencyContact?.phone} onChange={e => handleInputChange('emergencyContact.phone', e.target.value)} className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none" />
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

            </div>
          </div>
          
          <div className="flex justify-end gap-3 p-6 border-t border-slate-200 bg-white">
             <button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-sm font-medium shadow-sm transition-colors">Save</button>
             <button className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-4 py-2 rounded-full text-sm font-medium transition-colors">Save and New</button>
             <button onClick={() => setShowForm(false)} className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-4 py-2 rounded-full text-sm font-medium transition-colors">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default B2CClients;
