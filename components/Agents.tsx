
import React, { useState } from 'react';
import { Plus, Search, Filter, Briefcase, Mail, Phone, Globe, User, MoreHorizontal, Check, X, Upload, Image as ImageIcon, Download, FileSpreadsheet, History, Save } from 'lucide-react';
import { Agent } from '../types';

// Mock Data updated to match new structure
const initialAgents: Agent[] = [
  { 
    id: '1', code: 'AGT001', companyName: 'Global Travels Inc', businessType: 'B2B', 
    website: 'www.globaltravels.com', email: 'contact@globaltravels.com', phone: '+1 555-0123', 
    assignedSales: 'Sarah Smith', assignedOps: 'John Doe', status: 'Active', 
    logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=Global',
    nationalityType: 'Foreign', nationalityName: 'American', country: 'USA', marketType: 'International', department: 'Sales', companyType: 'Pvt Ltd'
  },
  { 
    id: '2', code: 'AGT002', companyName: 'Corporate Fly', businessType: 'Corporate', 
    website: 'www.corpfly.com', email: 'booking@corpfly.com', phone: '+1 555-0124', 
    assignedSales: 'James Wilson', assignedOps: 'John Doe', status: 'Active', 
    logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=Corp',
    nationalityType: 'Indian', nationalityName: 'Indian', country: 'India', marketType: 'Domestic', department: 'Corporate', companyType: 'LLP'
  },
  { 
    id: '3', code: 'AGT003', companyName: 'Holiday Makers', businessType: 'Agent', 
    website: 'www.holidaymakers.net', email: 'info@holidaymakers.net', phone: '+1 555-0125', 
    assignedSales: 'Sarah Smith', assignedOps: 'Mike Ross', status: 'Inactive', 
    logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=Holiday',
    nationalityType: 'Foreign', nationalityName: 'British', country: 'UK', marketType: 'Inbound', department: 'Leisure', companyType: 'Sole Proprietor'
  },
];

const Agents: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>(initialAgents);
  const [showForm, setShowForm] = useState(false);
  const [newAgent, setNewAgent] = useState<Partial<Agent>>({ status: 'Active', businessType: 'Select', nationalityType: 'Foreign', localAgent: false });

  // Filter States
  const [filterSearch, setFilterSearch] = useState('');
  const [filterCountry, setFilterCountry] = useState('All');
  const [filterAgentName, setFilterAgentName] = useState('All');
  const [filterBusinessType, setFilterBusinessType] = useState('All');
  const [filterAssignedUser, setFilterAssignedUser] = useState('All');

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
    if (!newAgent.companyName || !newAgent.email) return;

    const agent: Agent = {
      ...newAgent as Agent,
      id: Math.random().toString(36).substr(2, 9),
      code: `AGT00${agents.length + 1}`,
      website: newAgent.website || '',
      phone: newAgent.phone || '',
      assignedSales: newAgent.assignedSales || 'Unassigned',
      assignedOps: newAgent.assignedOps || 'Unassigned',
    };

    setAgents([...agents, agent]);
    setShowForm(false);
    setNewAgent({ status: 'Active', businessType: 'Select', nationalityType: 'Foreign' });
  };

  // Filter Logic
  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.companyName.toLowerCase().includes(filterSearch.toLowerCase()) || 
                          agent.email.toLowerCase().includes(filterSearch.toLowerCase()) ||
                          agent.code.toLowerCase().includes(filterSearch.toLowerCase());
    const matchesCountry = filterCountry === 'All' || agent.country === filterCountry;
    const matchesAgent = filterAgentName === 'All' || agent.companyName === filterAgentName;
    const matchesBusiness = filterBusinessType === 'All' || agent.businessType === filterBusinessType; 
    const matchesUser = filterAssignedUser === 'All' || agent.assignedSales === filterAssignedUser || agent.assignedOps === filterAssignedUser;

    return matchesSearch && matchesCountry && matchesAgent && matchesBusiness && matchesUser;
  });

  return (
    <div className="p-6 h-full flex flex-col bg-slate-50">
      
      {!showForm ? (
        <>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Agent Management</h2>
              <p className="text-slate-500 text-sm">Manage company profiles and partners.</p>
            </div>
            <button 
              onClick={() => setShowForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
            >
              <Plus size={18} />
              <span>Add Agent</span>
            </button>
          </div>

          {/* Filter Bar */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6">
             <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div>
                   <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Agent</label>
                   <input 
                     type="text" 
                     placeholder="Enter Company, Contact, Email" 
                     className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                     value={filterSearch}
                     onChange={(e) => setFilterSearch(e.target.value)}
                   />
                </div>
                <div>
                   <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Country</label>
                   <select 
                     className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white"
                     value={filterCountry}
                     onChange={(e) => setFilterCountry(e.target.value)}
                   >
                      <option value="All">All</option>
                      <option value="India">India</option>
                      <option value="USA">USA</option>
                      <option value="UK">UK</option>
                   </select>
                </div>
                <div>
                   <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Agent Name</label>
                   <select 
                     className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white"
                     value={filterAgentName}
                     onChange={(e) => setFilterAgentName(e.target.value)}
                   >
                      <option value="All">All</option>
                      {agents.map(a => <option key={a.id} value={a.companyName}>{a.companyName}</option>)}
                   </select>
                </div>
                <div>
                   <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Business Type</label>
                   <select 
                     className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white"
                     value={filterBusinessType}
                     onChange={(e) => setFilterBusinessType(e.target.value)}
                   >
                      <option value="All">All Business Type</option>
                      <option value="B2B">B2B</option>
                      <option value="Corporate">Corporate</option>
                      <option value="Agent">Agent</option>
                   </select>
                </div>
                <div>
                   <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Assigned User</label>
                   <select 
                     className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white"
                     value={filterAssignedUser}
                     onChange={(e) => setFilterAssignedUser(e.target.value)}
                   >
                      <option value="All">All Assigned Users</option>
                      <option value="Sarah Smith">Sarah Smith</option>
                      <option value="John Doe">John Doe</option>
                   </select>
                </div>
             </div>
          </div>

          {/* Actions & Table */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex-1 overflow-hidden flex flex-col">
             <div className="p-4 border-b border-slate-200 flex justify-end gap-3 bg-slate-50">
                <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-300 text-slate-600 rounded-md text-xs font-medium hover:bg-slate-50">
                   <Download size={14}/> Download Format
                </button>
                <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-300 text-slate-600 rounded-md text-xs font-medium hover:bg-slate-50">
                   <Upload size={14}/> Import Format
                </button>
                <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-300 text-slate-600 rounded-md text-xs font-medium hover:bg-slate-50">
                   <History size={14}/> View Logs
                </button>
             </div>

             <div className="overflow-x-auto flex-1">
                <table className="w-full text-left border-collapse">
                   <thead className="bg-slate-100 text-slate-600">
                      <tr>
                         <th className="px-4 py-3 text-xs font-bold uppercase border-b border-slate-200 whitespace-nowrap">Code</th>
                         <th className="px-4 py-3 text-xs font-bold uppercase border-b border-slate-200 whitespace-nowrap">Company</th>
                         <th className="px-4 py-3 text-xs font-bold uppercase border-b border-slate-200 whitespace-nowrap">Business Type</th>
                         <th className="px-4 py-3 text-xs font-bold uppercase border-b border-slate-200 whitespace-nowrap">Company Phone</th>
                         <th className="px-4 py-3 text-xs font-bold uppercase border-b border-slate-200 whitespace-nowrap">Company Email</th>
                         <th className="px-4 py-3 text-xs font-bold uppercase border-b border-slate-200 whitespace-nowrap">Assign Person</th>
                         <th className="px-4 py-3 text-xs font-bold uppercase border-b border-slate-200 whitespace-nowrap">Nationality Type</th>
                         <th className="px-4 py-3 text-xs font-bold uppercase border-b border-slate-200 whitespace-nowrap">Nationality</th>
                         <th className="px-4 py-3 text-xs font-bold uppercase border-b border-slate-200 whitespace-nowrap">Country</th>
                         <th className="px-4 py-3 text-xs font-bold uppercase border-b border-slate-200 whitespace-nowrap">Market Type</th>
                         <th className="px-4 py-3 text-xs font-bold uppercase border-b border-slate-200 whitespace-nowrap">Department</th>
                         <th className="px-4 py-3 text-xs font-bold uppercase border-b border-slate-200 whitespace-nowrap">Status</th>
                         <th className="px-4 py-3 text-xs font-bold uppercase border-b border-slate-200 text-right">Action</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-100">
                      {filteredAgents.map(agent => (
                         <tr key={agent.id} className="hover:bg-slate-50 transition-colors">
                            <td className="px-4 py-3 text-xs font-mono text-blue-600 font-medium">{agent.code}</td>
                            <td className="px-4 py-3 text-xs font-semibold text-slate-800">{agent.companyName}</td>
                            <td className="px-4 py-3 text-xs text-slate-600">{agent.businessType}</td>
                            <td className="px-4 py-3 text-xs text-slate-600">{agent.phone}</td>
                            <td className="px-4 py-3 text-xs text-slate-600">{agent.email}</td>
                            <td className="px-4 py-3 text-xs text-slate-600">
                               {agent.assignedSales !== 'Unassigned' ? agent.assignedSales : '-'}
                            </td>
                            <td className="px-4 py-3 text-xs text-slate-600">{agent.nationalityType}</td>
                            <td className="px-4 py-3 text-xs text-slate-600">{agent.nationalityName}</td>
                            <td className="px-4 py-3 text-xs text-slate-600">{agent.country}</td>
                            <td className="px-4 py-3 text-xs text-slate-600">{agent.marketType}</td>
                            <td className="px-4 py-3 text-xs text-slate-600">{agent.department}</td>
                            <td className="px-4 py-3 text-xs">
                               <span className={`px-2 py-0.5 rounded-full font-medium ${agent.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                  {agent.status}
                               </span>
                            </td>
                            <td className="px-4 py-3 text-right">
                               <button className="text-slate-400 hover:text-blue-600"><MoreHorizontal size={16}/></button>
                            </td>
                         </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </div>
        </>
      ) : (
        // Add Agent Form View
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 flex flex-col h-full overflow-hidden animate-in slide-in-from-bottom-4">
           <div className="flex justify-between items-center p-6 border-b border-slate-200">
              <h2 className="text-2xl font-bold text-slate-800">Add Agent</h2>
              <div className="flex gap-3">
                 <button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-sm font-medium shadow-sm transition-colors">Save</button>
                 <button className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-4 py-2 rounded-full text-sm font-medium transition-colors">Save and New</button>
                 <button onClick={() => setShowForm(false)} className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-4 py-2 rounded-full text-sm font-medium transition-colors">Cancel</button>
              </div>
           </div>

           <div className="flex-1 overflow-y-auto p-8">
              {/* Company Information */}
              <div className="mb-8">
                 <h3 className="text-sm font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100">Company Information</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    <div>
                       <label className="block text-xs font-semibold text-slate-500 mb-1">Business Type</label>
                       <select 
                         className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 bg-white"
                         value={newAgent.businessType}
                         onChange={e => setNewAgent({...newAgent, businessType: e.target.value})}
                       >
                          <option value="Select">Select</option>
                          <option value="B2B">B2B</option>
                          <option value="Agent">Agent</option>
                          <option value="Corporate">Corporate</option>
                       </select>
                    </div>
                    <div>
                       <label className="block text-xs font-semibold text-slate-500 mb-1">Website URL</label>
                       <input 
                         type="text" 
                         placeholder="https://example.com"
                         className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500"
                         value={newAgent.website || ''}
                         onChange={e => setNewAgent({...newAgent, website: e.target.value})}
                       />
                    </div>
                    <div>
                       <label className="block text-xs font-semibold text-slate-500 mb-1">Company Name</label>
                       <input 
                         type="text" 
                         className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 border-l-4 border-l-red-500"
                         value={newAgent.companyName || ''}
                         onChange={e => setNewAgent({...newAgent, companyName: e.target.value})}
                       />
                    </div>
                    <div>
                       <label className="block text-xs font-semibold text-slate-500 mb-1">Company Type</label>
                       <select 
                         className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 bg-white"
                         value={newAgent.companyType}
                         onChange={e => setNewAgent({...newAgent, companyType: e.target.value})}
                       >
                          <option value="Select">Select</option>
                          <option value="Pvt Ltd">Pvt Ltd</option>
                          <option value="LLP">LLP</option>
                       </select>
                    </div>
                    <div>
                       <label className="block text-xs font-semibold text-slate-500 mb-1">Company Email Address</label>
                       <input 
                         type="email" 
                         className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 border-l-4 border-l-red-500"
                         value={newAgent.email || ''}
                         onChange={e => setNewAgent({...newAgent, email: e.target.value})}
                       />
                    </div>
                    <div>
                       <label className="block text-xs font-semibold text-slate-500 mb-1">Company Phone Number</label>
                       <input 
                         type="text" 
                         className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 border-l-4 border-l-red-500"
                         value={newAgent.phone || ''}
                         onChange={e => setNewAgent({...newAgent, phone: e.target.value})}
                       />
                    </div>
                    <div className="col-span-2 grid grid-cols-2 gap-8">
                       <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Local Agent</label>
                          <div className="flex gap-4 pt-1">
                             <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="local" className="text-blue-600" checked={newAgent.localAgent === true} onChange={() => setNewAgent({...newAgent, localAgent: true})}/> <span className="text-sm">Yes</span></label>
                             <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="local" className="text-blue-600" checked={newAgent.localAgent === false} onChange={() => setNewAgent({...newAgent, localAgent: false})}/> <span className="text-sm">No</span></label>
                          </div>
                       </div>
                       <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Company Logo</label>
                          <div className="flex gap-2 items-center">
                             <button className="px-3 py-1 border border-slate-300 rounded text-sm hover:bg-slate-50 relative overflow-hidden">
                                Choose File
                                <input type="file" accept="image/*" onChange={handleLogoChange} className="absolute inset-0 opacity-0 cursor-pointer"/>
                             </button>
                             <span className="text-xs text-slate-400">No file chosen</span>
                          </div>
                       </div>
                    </div>
                    <div>
                       <label className="block text-xs font-semibold text-slate-500 mb-1">Agent Header</label>
                       <div className="flex gap-2 items-center">
                          <button className="px-3 py-1 border border-slate-300 rounded text-sm hover:bg-slate-50">Choose File</button>
                          <span className="text-xs text-slate-400">No file chosen</span>
                       </div>
                    </div>
                    <div>
                       <label className="block text-xs font-semibold text-slate-500 mb-1">Agent Footer</label>
                       <div className="flex gap-2 items-center">
                          <button className="px-3 py-1 border border-slate-300 rounded text-sm hover:bg-slate-50">Choose File</button>
                          <span className="text-xs text-slate-400">No file chosen</span>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Assignment & Classification - 2 Column Layout Split */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                 <div className="space-y-4">
                    <div>
                       <label className="block text-xs font-semibold text-slate-500 mb-1">Sales Person</label>
                       <select value={newAgent.assignedSales} onChange={e => setNewAgent({...newAgent, assignedSales: e.target.value})} className="w-full border border-slate-300 rounded px-3 py-2 text-sm bg-white">
                          <option>Select</option>
                          <option>Sarah Smith</option>
                          <option>James Wilson</option>
                       </select>
                    </div>
                    <div>
                       <label className="block text-xs font-semibold text-slate-500 mb-1">Consortia</label>
                       <select value={newAgent.consortia} onChange={e => setNewAgent({...newAgent, consortia: e.target.value})} className="w-full border border-slate-300 rounded px-3 py-2 text-sm bg-white">
                          <option>Select Consortia</option>
                       </select>
                    </div>
                    <div>
                       <label className="block text-xs font-semibold text-slate-500 mb-1">Competitor</label>
                       <input type="text" placeholder="Competitor" value={newAgent.competitor} onChange={e => setNewAgent({...newAgent, competitor: e.target.value})} className="w-full border border-slate-300 rounded px-3 py-2 text-sm bg-slate-50" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Nationality Type</label>
                          <select value={newAgent.nationalityType} onChange={e => setNewAgent({...newAgent, nationalityType: e.target.value})} className="w-full border border-slate-300 rounded px-3 py-2 text-sm bg-white border-b-2 border-b-red-500">
                             <option>Foreign</option>
                             <option>Indian</option>
                          </select>
                       </div>
                       <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Nationality Name</label>
                          <select value={newAgent.nationalityName} onChange={e => setNewAgent({...newAgent, nationalityName: e.target.value})} className="w-full border border-slate-300 rounded px-3 py-2 text-sm bg-white">
                             <option>Select</option>
                             <option>American</option>
                             <option>British</option>
                             <option>Indian</option>
                          </select>
                       </div>
                    </div>
                    <div>
                       <label className="block text-xs font-semibold text-slate-500 mb-1">Category</label>
                       <select value={newAgent.category} onChange={e => setNewAgent({...newAgent, category: e.target.value})} className="w-full border border-slate-300 rounded px-3 py-2 text-sm bg-white">
                          <option>Select</option>
                       </select>
                    </div>
                    <div>
                       <label className="block text-xs font-semibold text-slate-500 mb-1">Preferred Language</label>
                       <select value={newAgent.preferredLanguage} onChange={e => setNewAgent({...newAgent, preferredLanguage: e.target.value})} className="w-full border border-slate-300 rounded px-3 py-2 text-sm bg-white">
                          <option>English</option>
                          <option>French</option>
                       </select>
                    </div>
                    <div>
                       <label className="block text-xs font-semibold text-slate-500 mb-1">Status</label>
                       <select value={newAgent.status} onChange={e => setNewAgent({...newAgent, status: e.target.value as any})} className="w-full border border-slate-300 rounded px-3 py-2 text-sm bg-white border-b-2 border-b-red-500">
                          <option>Active</option>
                          <option>Inactive</option>
                       </select>
                    </div>
                 </div>

                 <div className="space-y-4">
                    <div>
                       <label className="block text-xs font-semibold text-slate-500 mb-1">Operations Person</label>
                       <select value={newAgent.assignedOps} onChange={e => setNewAgent({...newAgent, assignedOps: e.target.value})} className="w-full border border-slate-300 rounded px-3 py-2 text-sm bg-white">
                          <option>Select</option>
                          <option>John Doe</option>
                       </select>
                    </div>
                    <div>
                       <label className="block text-xs font-semibold text-slate-500 mb-1">ISO</label>
                       <select value={newAgent.iso} onChange={e => setNewAgent({...newAgent, iso: e.target.value})} className="w-full border border-slate-300 rounded px-3 py-2 text-sm bg-white">
                          <option>Select ISO</option>
                       </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Market Type</label>
                          <select value={newAgent.marketType} onChange={e => setNewAgent({...newAgent, marketType: e.target.value})} className="w-full border border-slate-300 rounded px-3 py-2 text-sm bg-white border-b-2 border-b-red-500">
                             <option>General</option>
                             <option>Inbound</option>
                          </select>
                       </div>
                       <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Department</label>
                          <select value={newAgent.department} onChange={e => setNewAgent({...newAgent, department: e.target.value})} className="w-full border border-slate-300 rounded px-3 py-2 text-sm bg-white">
                             <option>Select</option>
                             <option>Sales</option>
                             <option>Operations</option>
                          </select>
                       </div>
                    </div>
                    <div>
                       <label className="block text-xs font-semibold text-slate-500 mb-1">Country</label>
                       <select value={newAgent.country} onChange={e => setNewAgent({...newAgent, country: e.target.value})} className="w-full border border-slate-300 rounded px-3 py-2 text-sm bg-white">
                          <option>India</option>
                          <option>USA</option>
                       </select>
                    </div>
                    <div>
                       <label className="block text-xs font-semibold text-slate-500 mb-1">Tour Type</label>
                       <input type="text" value={newAgent.tourType} onChange={e => setNewAgent({...newAgent, tourType: e.target.value})} className="w-full border border-slate-300 rounded px-3 py-2 text-sm" />
                    </div>
                    <div>
                       <label className="block text-xs font-semibold text-slate-500 mb-1">Accounting Code</label>
                       <input type="text" placeholder="Accounting Code" value={newAgent.accountingCode} onChange={e => setNewAgent({...newAgent, accountingCode: e.target.value})} className="w-full border border-slate-300 rounded px-3 py-2 text-sm" />
                    </div>
                 </div>
              </div>

              {/* Agent Info (Rich Text Placeholder) */}
              <div>
                 <label className="block text-xs font-semibold text-slate-500 mb-1">Agent Info</label>
                 <div className="border border-slate-300 rounded-lg overflow-hidden h-32">
                    <div className="bg-slate-50 px-3 py-2 border-b border-slate-300 flex gap-4 text-slate-600 text-xs">
                       <span className="cursor-pointer hover:text-blue-600">File</span>
                       <span className="cursor-pointer hover:text-blue-600">Edit</span>
                       <span className="cursor-pointer hover:text-blue-600">View</span>
                       <span className="cursor-pointer hover:text-blue-600">Insert</span>
                       <span className="cursor-pointer hover:text-blue-600">Format</span>
                    </div>
                    <div className="px-3 py-2 flex gap-3 text-slate-500 border-b border-slate-100">
                       <span className="font-bold cursor-pointer">B</span>
                       <span className="italic cursor-pointer">I</span>
                       <span className="cursor-pointer">≡</span>
                       <span className="cursor-pointer">≡</span>
                       <span className="cursor-pointer">≡</span>
                    </div>
                    <textarea className="w-full h-full p-2 outline-none text-sm resize-none"></textarea>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Agents;
