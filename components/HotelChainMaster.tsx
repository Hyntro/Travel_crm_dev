
import React, { useState } from 'react';
import { ArrowLeft, Download, Upload, Plus, Search, Edit2, Trash2, X, FileSpreadsheet, Mail, Phone, User, Globe, CheckCircle } from 'lucide-react';
import { HotelChain, HotelChainContact } from '../types';
import { initialHotelChains } from './mockData';

interface HotelChainMasterProps {
  onBack: () => void;
}

const HotelChainMaster: React.FC<HotelChainMasterProps> = ({ onBack }) => {
  const [chains, setChains] = useState<HotelChain[]>(initialHotelChains);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  const [currentChain, setCurrentChain] = useState<Partial<HotelChain>>({ 
    status: 'Active', 
    contacts: [{ id: 'temp-1', division: 'Select', title: 'Mr.', name: '', designation: '', countryCode: '+91', phone: '', email: '', isPrimary: true }] 
  });

  const handleEdit = (chain: HotelChain) => {
    setCurrentChain({ ...chain });
    setShowModal(true);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (window.confirm('Delete hotel chain?')) {
      setChains(prev => prev.filter(c => c.id !== id));
    }
  };

  const handleSave = () => {
    if (!currentChain.name) return;

    if (currentChain.id) {
      setChains(prev => prev.map(c => c.id === currentChain.id ? { ...c, ...currentChain } as HotelChain : c));
    } else {
      const newChain: HotelChain = {
        ...currentChain as HotelChain,
        id: Math.random().toString(),
        location: currentChain.location || 'Unknown', // Defaulting location
        createdBy: 'Demo',
        modifiedBy: 'Demo'
      };
      setChains(prev => [...prev, newChain]);
    }
    setShowModal(false);
    resetForm();
  };

  const resetForm = () => {
    setCurrentChain({ 
      status: 'Active', 
      contacts: [{ id: Math.random().toString(), division: 'Select', title: 'Mr.', name: '', designation: '', countryCode: '+91', phone: '', email: '', isPrimary: true }] 
    });
  }

  const addContact = () => {
    const newContact: HotelChainContact = {
      id: Math.random().toString(),
      division: 'Select',
      title: 'Mr.',
      name: '',
      designation: '',
      countryCode: '+91',
      phone: '',
      email: '',
      isPrimary: false
    };
    setCurrentChain(prev => ({ ...prev, contacts: [...(prev.contacts || []), newContact] }));
  };

  const updateContact = (id: string, field: keyof HotelChainContact, value: any) => {
    setCurrentChain(prev => ({
      ...prev,
      contacts: prev.contacts?.map(c => {
        if (c.id === id) {
           if (field === 'isPrimary' && value === true) {
               // If setting this to true, set others to false? Usually yes for radio behavior in UI but handled by rendering logic
               return { ...c, [field]: value };
           }
           return { ...c, [field]: value };
        }
        if (field === 'isPrimary' && value === true) {
            return { ...c, isPrimary: false }; // Unset others
        }
        return c;
      })
    }));
  };

  const removeContact = (id: string) => {
    if ((currentChain.contacts?.length || 0) <= 1) return;
    setCurrentChain(prev => ({ ...prev, contacts: prev.contacts?.filter(c => c.id !== id) }));
  };

  const filteredChains = chains.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="h-full flex flex-col animate-in fade-in slide-in-from-right-4 duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Hotel Chain Master</h2>
            <p className="text-sm text-slate-500">Manage hotel chains and contacts</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
           <button className="bg-white border border-slate-300 text-slate-600 px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-50 text-sm font-medium shadow-sm">
             <Download size={16}/> Download Data
           </button>
           <button className="bg-white border border-slate-300 text-slate-600 px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-50 text-sm font-medium shadow-sm">
             <FileSpreadsheet size={16}/> Download Format
           </button>
           <label className="bg-white border border-slate-300 text-slate-600 px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-50 text-sm font-medium shadow-sm cursor-pointer">
             <Upload size={16}/> Import Excel
             <input type="file" className="hidden" accept=".csv,.xlsx"/>
           </label>
           <button 
             onClick={() => { resetForm(); setShowModal(true); }} 
             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm text-sm font-medium"
           >
             <Plus size={18} /> Add Hotel Chain Master
           </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
         <div className="relative flex-1 w-full max-w-md">
            <label className="absolute -top-2 left-2 px-1 bg-white text-[10px] font-semibold text-slate-500">Hotel Chain Keyword</label>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
              placeholder="Search Hotel Chain" 
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
         </div>
         <div className="relative w-full md:w-48">
            <label className="absolute -top-2 left-2 px-1 bg-white text-[10px] font-semibold text-slate-500">Select Status</label>
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)} 
              className="w-full pl-3 pr-8 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
               <option value="All">All Status</option>
               <option value="Active">Active</option>
               <option value="Inactive">Inactive</option>
            </select>
         </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 flex-1 overflow-hidden flex flex-col">
         <div className="overflow-x-auto flex-1">
            <table className="w-full text-left">
               <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                     <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Sr.</th>
                     <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Hotel Chain Name</th>
                     <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Location</th>
                     <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Hotel Website</th>
                     <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Cont. Person</th>
                     <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Created By</th>
                     <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Modified By</th>
                     <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Status</th>
                     <th className="px-6 py-3 text-right text-xs font-bold text-slate-500 uppercase">Action</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {filteredChains.map((chain, index) => (
                     <tr key={chain.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 text-sm text-slate-500">{index + 1}</td>
                        <td className="px-6 py-4 font-medium text-slate-800">{chain.name}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{chain.location}</td>
                        <td className="px-6 py-4 text-sm text-blue-600 hover:underline cursor-pointer">{chain.website}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">
                           {chain.contacts?.find(c => c.isPrimary)?.name || chain.contacts?.[0]?.name || '-'}
                        </td>
                        <td className="px-6 py-4 text-xs text-slate-500">{chain.createdBy}</td>
                        <td className="px-6 py-4 text-xs text-slate-500">{chain.modifiedBy}</td>
                        <td className="px-6 py-4">
                           <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${chain.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {chain.status}
                           </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                           <div className="flex items-center justify-end gap-2">
                              <button onClick={() => handleEdit(chain)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded">
                                <Edit2 size={16}/>
                              </button>
                              <button onClick={(e) => handleDelete(chain.id, e)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded">
                                <Trash2 size={16}/>
                              </button>
                           </div>
                        </td>
                     </tr>
                  ))}
                  {filteredChains.length === 0 && (
                    <tr>
                      <td colSpan={9} className="px-6 py-8 text-center text-slate-400 text-sm">No hotel chains found.</td>
                    </tr>
                  )}
               </tbody>
            </table>
         </div>
      </div>

      {/* Modal */}
      {showModal && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl overflow-hidden animate-in zoom-in-95 duration-200">
               <div className="bg-slate-800 px-6 py-4 flex justify-between items-center">
                  <h3 className="text-lg font-bold text-white">{currentChain.id ? 'Edit Hotel Chain Master' : 'Add Hotel Chain Master'}</h3>
                  <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                    <X size={20} />
                  </button>
               </div>
               
               <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
                  
                  {/* General Info */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Hotel Chain Name</label>
                          <input 
                            type="text" 
                            value={currentChain.name || ''} 
                            onChange={(e) => setCurrentChain({...currentChain, name: e.target.value})} 
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-l-4 border-l-red-500"
                          />
                      </div>
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Destinations</label>
                          <input 
                            type="text" 
                            placeholder="Search Destination"
                            value={currentChain.destinations || ''} 
                            onChange={(e) => setCurrentChain({...currentChain, destinations: e.target.value})} 
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                      </div>
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Hotel Website</label>
                          <input 
                            type="text" 
                            value={currentChain.website || ''} 
                            onChange={(e) => setCurrentChain({...currentChain, website: e.target.value})} 
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                      </div>
                  </div>

                  {/* Contact Persons */}
                  <div className="border-t border-slate-100 pt-4">
                      <div className="flex justify-between items-center mb-4">
                          <h4 className="text-sm font-bold text-slate-700">Contact Person</h4>
                          <button onClick={addContact} className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-xs font-bold hover:bg-blue-200">
                             + Add More
                          </button>
                      </div>
                      
                      <div className="space-y-4">
                          {currentChain.contacts?.map((contact, idx) => (
                              <div key={contact.id} className="grid grid-cols-1 md:grid-cols-9 gap-3 items-end p-3 bg-slate-50 rounded-lg border border-slate-200">
                                  <div className="col-span-1">
                                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Division</label>
                                      <select 
                                        value={contact.division}
                                        onChange={e => updateContact(contact.id, 'division', e.target.value)}
                                        className="w-full border border-slate-300 rounded px-2 py-1.5 text-xs bg-white"
                                      >
                                          <option>Select</option>
                                          <option>Sales</option>
                                          <option>Operations</option>
                                      </select>
                                  </div>
                                  <div className="col-span-1">
                                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Title</label>
                                      <select 
                                        value={contact.title}
                                        onChange={e => updateContact(contact.id, 'title', e.target.value)}
                                        className="w-full border border-slate-300 rounded px-2 py-1.5 text-xs bg-white"
                                      >
                                          <option>Mr.</option>
                                          <option>Ms.</option>
                                      </select>
                                  </div>
                                  <div className="col-span-1">
                                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Name</label>
                                      <input 
                                        type="text" 
                                        value={contact.name}
                                        onChange={e => updateContact(contact.id, 'name', e.target.value)}
                                        className="w-full border border-slate-300 rounded px-2 py-1.5 text-xs border-l-4 border-l-red-500"
                                        placeholder="Contact Person"
                                      />
                                  </div>
                                  <div className="col-span-1">
                                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Designation</label>
                                      <input 
                                        type="text" 
                                        value={contact.designation}
                                        onChange={e => updateContact(contact.id, 'designation', e.target.value)}
                                        className="w-full border border-slate-300 rounded px-2 py-1.5 text-xs"
                                        placeholder="Designation"
                                      />
                                  </div>
                                  <div className="col-span-1">
                                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Country Code</label>
                                      <input 
                                        type="text" 
                                        value={contact.countryCode}
                                        onChange={e => updateContact(contact.id, 'countryCode', e.target.value)}
                                        className="w-full border border-slate-300 rounded px-2 py-1.5 text-xs"
                                      />
                                  </div>
                                  <div className="col-span-1">
                                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Phone</label>
                                      <input 
                                        type="text" 
                                        value={contact.phone}
                                        onChange={e => updateContact(contact.id, 'phone', e.target.value)}
                                        className="w-full border border-slate-300 rounded px-2 py-1.5 text-xs"
                                        placeholder="Phone"
                                      />
                                  </div>
                                  <div className="col-span-2">
                                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">1Email ID</label>
                                      <div className="relative">
                                          <input 
                                            type="email" 
                                            value={contact.email}
                                            onChange={e => updateContact(contact.id, 'email', e.target.value)}
                                            className="w-full border border-slate-300 rounded px-2 py-1.5 text-xs border-l-4 border-l-red-500 pr-7"
                                            placeholder="Email"
                                          />
                                          <Mail size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-green-600" />
                                      </div>
                                  </div>
                                  <div className="col-span-1 flex items-center justify-center pb-2 gap-2">
                                      <input 
                                        type="radio" 
                                        name="primaryContact"
                                        checked={contact.isPrimary}
                                        onChange={() => updateContact(contact.id, 'isPrimary', true)}
                                        className="text-blue-600 cursor-pointer"
                                      />
                                      {idx > 0 && <button onClick={() => removeContact(contact.id)} className="text-red-500 hover:bg-red-50 p-1 rounded"><Trash2 size={14}/></button>}
                                  </div>
                              </div>
                          ))}
                      </div>
                  </div>

                  <div>
                     <label className="block text-xs font-semibold text-slate-500 mb-1">status</label>
                     <select 
                        value={currentChain.status} 
                        onChange={(e) => setCurrentChain({...currentChain, status: e.target.value as any})} 
                        className="w-full md:w-48 px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                     >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                     </select>
                  </div>
               </div>

               <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                  <button onClick={handleSave} className="px-8 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full text-sm font-medium shadow-sm transition-colors">
                    Save
                  </button>
                  <button onClick={() => setShowModal(false)} className="px-8 py-2 bg-white border border-slate-300 text-slate-600 rounded-full text-sm font-medium hover:bg-slate-50 transition-colors">
                    Cancel
                  </button>
               </div>
            </div>
         </div>
      )}
    </div>
  );
};

export default HotelChainMaster;
