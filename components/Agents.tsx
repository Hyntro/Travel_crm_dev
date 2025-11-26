import React, { useState } from 'react';
import { Plus, Search, Filter, Briefcase, Mail, Phone, Globe, User, MoreHorizontal, Check, X, Upload, Image as ImageIcon } from 'lucide-react';
import { Agent } from '../types';

// Mock Data
const initialAgents: Agent[] = [
  { id: '1', code: 'AGT001', companyName: 'Global Travels Inc', businessType: 'B2B', website: 'www.globaltravels.com', email: 'contact@globaltravels.com', phone: '+1 555-0123', assignedSales: 'Sarah Smith', assignedOps: 'John Doe', status: 'Active', logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=Global' },
  { id: '2', code: 'AGT002', companyName: 'Corporate Fly', businessType: 'Corporate', website: 'www.corpfly.com', email: 'booking@corpfly.com', phone: '+1 555-0124', assignedSales: 'James Wilson', assignedOps: 'John Doe', status: 'Active', logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=Corp' },
  { id: '3', code: 'AGT003', companyName: 'Holiday Makers', businessType: 'Agent', website: 'www.holidaymakers.net', email: 'info@holidaymakers.net', phone: '+1 555-0125', assignedSales: 'Sarah Smith', assignedOps: 'Mike Ross', status: 'Inactive', logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=Holiday' },
];

const Agents: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>(initialAgents);
  const [showForm, setShowForm] = useState(false);
  const [newAgent, setNewAgent] = useState<Partial<Agent>>({ status: 'Active', businessType: 'Agent' });

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewAgent({ ...newAgent, logo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // Basic validation
    if (!newAgent.companyName || !newAgent.email) return;

    const agent: Agent = {
      id: Math.random().toString(36).substr(2, 9),
      code: `AGT00${agents.length + 1}`,
      companyName: newAgent.companyName!,
      businessType: newAgent.businessType as 'Agent' | 'B2B' | 'Corporate',
      website: newAgent.website || '',
      email: newAgent.email!,
      phone: newAgent.phone || '',
      assignedSales: newAgent.assignedSales || 'Unassigned',
      assignedOps: newAgent.assignedOps || 'Unassigned',
      status: newAgent.status as 'Active' | 'Inactive',
      logo: newAgent.logo,
    };

    setAgents([...agents, agent]);
    setShowForm(false);
    setNewAgent({ status: 'Active', businessType: 'Agent' });
  };

  return (
    <div className="p-8 h-full flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Agent Management</h2>
          <p className="text-slate-500 mt-1">Manage B2B partners, agents, and corporate clients.</p>
        </div>
        <button 
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
        >
          <Plus size={20} />
          <span>Add New Agent</span>
        </button>
      </div>

      {showForm ? (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 max-w-4xl mx-auto w-full">
          <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
            <h3 className="text-xl font-bold text-slate-800">Add New Agent</h3>
            <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-red-500">
              <X size={24} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Section 1: Company Info */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2 mb-4">Company Details</h4>
              
              {/* Logo Upload */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">Company Logo</label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden">
                    {newAgent.logo ? (
                      <img src={newAgent.logo} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className="text-slate-400" size={24} />
                    )}
                  </div>
                  <label className="cursor-pointer bg-white border border-slate-200 hover:bg-slate-50 px-3 py-2 rounded-lg text-sm text-slate-600 flex items-center gap-2 transition-colors">
                    <Upload size={16} />
                    <span>Upload Logo</span>
                    <input type="file" accept="image/*" onChange={handleLogoChange} className="hidden" />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Company Name</label>
                <input 
                  type="text" 
                  value={newAgent.companyName || ''}
                  onChange={e => setNewAgent({...newAgent, companyName: e.target.value})}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">Business Type</label>
                   <select 
                     value={newAgent.businessType}
                     onChange={e => setNewAgent({...newAgent, businessType: e.target.value as any})}
                     className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                   >
                     <option value="Agent">Agent</option>
                     <option value="B2B">B2B</option>
                     <option value="Corporate">Corporate</option>
                   </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                   <select 
                     value={newAgent.status}
                     onChange={e => setNewAgent({...newAgent, status: e.target.value as any})}
                     className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                   >
                     <option value="Active">Active</option>
                     <option value="Inactive">Inactive</option>
                   </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Website</label>
                <div className="relative">
                  <Globe size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text" 
                    value={newAgent.website || ''}
                    onChange={e => setNewAgent({...newAgent, website: e.target.value})}
                    className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="www.example.com"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Contact & Internal */}
            <div className="space-y-4">
               <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2 mb-4">Contact & Internal</h4>
               <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input 
                        type="email" 
                        value={newAgent.email || ''}
                        onChange={e => setNewAgent({...newAgent, email: e.target.value})}
                        className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                    <div className="relative">
                      <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input 
                        type="text" 
                        value={newAgent.phone || ''}
                        onChange={e => setNewAgent({...newAgent, phone: e.target.value})}
                        className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
               </div>
               
               <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Sales Person</label>
                    <select 
                      value={newAgent.assignedSales}
                      onChange={e => setNewAgent({...newAgent, assignedSales: e.target.value})}
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      <option value="">Select User</option>
                      <option value="Sarah Smith">Sarah Smith</option>
                      <option value="James Wilson">James Wilson</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Ops Person</label>
                    <select 
                      value={newAgent.assignedOps}
                      onChange={e => setNewAgent({...newAgent, assignedOps: e.target.value})}
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      <option value="">Select User</option>
                      <option value="John Doe">John Doe</option>
                      <option value="Mike Ross">Mike Ross</option>
                    </select>
                  </div>
               </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-3">
            <button onClick={() => setShowForm(false)} className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">Cancel</button>
            <button onClick={handleSave} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm">Save Agent</button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 flex-1 overflow-hidden">
          {/* Filters */}
          <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
             <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input type="text" placeholder="Search agents..." className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
             </div>
             <div className="flex gap-2">
                <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50">
                  <Filter size={16} /> Filter
                </button>
             </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Code</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Company</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Assigned To</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {agents.map(agent => (
                  <tr key={agent.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-mono text-slate-500">{agent.code}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500 overflow-hidden border border-slate-200">
                           {agent.logo ? <img src={agent.logo} alt="Logo" className="w-full h-full object-cover"/> : <Briefcase size={18} />}
                         </div>
                         <div>
                            <div className="text-sm font-medium text-slate-900">{agent.companyName}</div>
                            <div className="text-xs text-blue-500 hover:underline cursor-pointer">{agent.website}</div>
                         </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                       <span className="px-2 py-1 text-xs rounded bg-slate-100 text-slate-600 border border-slate-200">
                         {agent.businessType}
                       </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-600 flex items-center gap-2"><Mail size={12}/> {agent.email}</div>
                      <div className="text-xs text-slate-400 mt-1 flex items-center gap-2"><Phone size={12}/> {agent.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-xs text-slate-600"><span className="font-semibold">Sales:</span> {agent.assignedSales}</div>
                      <div className="text-xs text-slate-600 mt-1"><span className="font-semibold">Ops:</span> {agent.assignedOps}</div>
                    </td>
                    <td className="px-6 py-4">
                      {agent.status === 'Active' ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <Check size={12} className="mr-1" /> Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Inactive
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-slate-400 hover:text-blue-600"><MoreHorizontal size={18} /></button>
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

export default Agents;