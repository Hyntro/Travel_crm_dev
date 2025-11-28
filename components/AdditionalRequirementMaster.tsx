
import React, { useState } from 'react';
import { ArrowLeft, Download, Upload, Plus, Search, Edit2, Trash2, X, History, FileSpreadsheet, Image as ImageIcon, AlignLeft, List, Bold, Italic } from 'lucide-react';
import { AdditionalRequirement } from '../types';
import { initialAdditionalRequirements, initialDestinations } from './mockData';

interface AdditionalRequirementMasterProps {
  onBack: () => void;
}

const AdditionalRequirementMaster: React.FC<AdditionalRequirementMasterProps> = ({ onBack }) => {
  const [items, setItems] = useState<AdditionalRequirement[]>(initialAdditionalRequirements);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  const [currentItem, setCurrentItem] = useState<Partial<AdditionalRequirement>>({ 
    status: 'Active',
    showInProposal: 'Yes',
    currency: 'INR',
    costType: 'Per Person'
  });

  const handleEdit = (item: AdditionalRequirement) => {
    setCurrentItem({ ...item });
    setShowModal(true);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (window.confirm('Delete item?')) {
      setItems(prev => prev.filter(i => i.id !== id));
    }
  };

  const handleSave = () => {
    if (!currentItem.name || !currentItem.destinationId) return;

    const destName = initialDestinations.find(d => d.id === currentItem.destinationId)?.name || '';

    const newItem: AdditionalRequirement = {
        id: currentItem.id || Math.random().toString(),
        serviceType: currentItem.serviceType || 'Select Type',
        name: currentItem.name,
        destinationId: currentItem.destinationId,
        destinationName: destName,
        currency: currentItem.currency || 'INR',
        costType: currentItem.costType || 'Per Person',
        adultCost: Number(currentItem.adultCost) || 0,
        childCost: Number(currentItem.childCost) || 0,
        groupCost: Number(currentItem.groupCost) || 0,
        displayName: currentItem.displayName || '',
        showInProposal: currentItem.showInProposal || 'Yes',
        status: currentItem.status || 'Active',
        image: currentItem.image || '',
        description: currentItem.description || '',
        language: 'English',
        createdBy: 'Admin'
    };

    if (currentItem.id) {
        setItems(prev => prev.map(i => i.id === currentItem.id ? newItem : i));
    } else {
        setItems(prev => [...prev, newItem]);
    }
    setShowModal(false);
    resetForm();
  };

  const resetForm = () => {
    setCurrentItem({ 
      status: 'Active',
      showInProposal: 'Yes',
      currency: 'INR',
      costType: 'Per Person'
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentItem(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredItems = items.filter(i => {
    const matchesSearch = i.name.toLowerCase().includes(search.toLowerCase()) || i.serviceType.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || i.status === statusFilter;
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
            <h2 className="text-2xl font-bold text-slate-800">Additional Requirement</h2>
            <p className="text-sm text-slate-500">Manage extra services like Visa, Insurance etc.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
           <button className="bg-white border border-slate-300 text-slate-600 px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-50 text-sm font-medium shadow-sm">
             <History size={16}/> View Logs
           </button>
           <button className="bg-white border border-slate-300 text-slate-600 px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-50 text-sm font-medium shadow-sm">
             <Download size={16}/> Download Format
           </button>
           <label className="bg-white border border-slate-300 text-slate-600 px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-50 text-sm font-medium shadow-sm cursor-pointer">
             <Upload size={16}/> Import Excel
             <input type="file" className="hidden" accept=".csv,.xlsx"/>
           </label>
           <button 
             onClick={() => { resetForm(); setShowModal(true); }} 
             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm text-sm font-medium"
           >
             <Plus size={18} /> Add Additional Requirements
           </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-6 flex flex-wrap gap-4 items-end">
         <div className="flex-1 min-w-[200px]">
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Keyword</label>
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                type="text" 
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
                placeholder="Search" 
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
            </div>
         </div>
         <div className="w-48">
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Select Status</label>
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)} 
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Sr.</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase text-center">Image</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Service Type</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Service Name</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Destination</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase text-right">Adult Cost</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase text-right">Child Cost</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase text-right">Group Cost</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase text-center">Description</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Display name in proposal</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Created By</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Language</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Status</th>
                     <th className="px-4 py-3 text-right text-xs font-bold text-slate-500 uppercase">Action</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {filteredItems.map((item, index) => (
                     <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3 text-sm text-slate-500">{index + 1}</td>
                        <td className="px-4 py-3 text-center">
                           <div className="w-10 h-10 bg-slate-200 rounded flex items-center justify-center overflow-hidden mx-auto">
                                {item.image ? <img src={item.image} alt={item.name} className="w-full h-full object-cover"/> : <ImageIcon size={16} className="text-slate-400"/>}
                           </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-600">{item.serviceType}</td>
                        <td className="px-4 py-3 font-medium text-slate-800">{item.name}</td>
                        <td className="px-4 py-3 text-sm text-slate-600">{item.destinationName}</td>
                        <td className="px-4 py-3 text-sm text-right">{item.currency} {item.adultCost}</td>
                        <td className="px-4 py-3 text-sm text-right">{item.currency} {item.childCost}</td>
                        <td className="px-4 py-3 text-sm text-right">{item.currency} {item.groupCost}</td>
                        <td className="px-4 py-3 text-center">
                           <button className="text-blue-600 text-xs font-medium hover:underline">View</button>
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-600">{item.displayName}</td>
                        <td className="px-4 py-3 text-xs text-slate-500">{item.createdBy}</td>
                        <td className="px-4 py-3 text-xs text-slate-600">{item.language}</td>
                        <td className="px-4 py-3">
                           <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {item.status}
                           </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                           <div className="flex items-center justify-end gap-2">
                              <button onClick={() => handleEdit(item)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded">
                                <Edit2 size={16}/>
                              </button>
                              <button onClick={(e) => handleDelete(item.id, e)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded">
                                <Trash2 size={16}/>
                              </button>
                           </div>
                        </td>
                     </tr>
                  ))}
                  {filteredItems.length === 0 && (
                    <tr>
                      <td colSpan={14} className="px-6 py-8 text-center text-slate-400 text-sm">No records found.</td>
                    </tr>
                  )}
               </tbody>
            </table>
         </div>
      </div>

      {/* Modal */}
      {showModal && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
               <div className="bg-slate-800 px-6 py-4 flex justify-between items-center">
                  <h3 className="text-lg font-bold text-white uppercase">{currentItem.id ? 'Edit Additional Requirements' : 'Add Additional Requirements'}</h3>
                  <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                    <X size={20} />
                  </button>
               </div>
               
               <div className="p-8 space-y-6 overflow-y-auto flex-1 bg-white">
                  
                  <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Type</label>
                      <select 
                        value={currentItem.serviceType} 
                        onChange={(e) => setCurrentItem({...currentItem, serviceType: e.target.value})} 
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 border-l-4 border-l-red-500"
                      >
                         <option>Select Type</option>
                         <option>Visa</option>
                         <option>Insurance</option>
                         <option>Sim Card</option>
                         <option>Other</option>
                      </select>
                  </div>

                  <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Service Name</label>
                      <input 
                        type="text" 
                        value={currentItem.name || ''} 
                        onChange={(e) => setCurrentItem({...currentItem, name: e.target.value})} 
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-l-4 border-l-red-500"
                      />
                  </div>

                  <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Destination</label>
                      <select 
                        value={currentItem.destinationId} 
                        onChange={(e) => setCurrentItem({...currentItem, destinationId: e.target.value})} 
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 border-l-4 border-l-red-500"
                      >
                         <option value="">Select Destination</option>
                         {initialDestinations.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                      </select>
                  </div>

                  <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Currency</label>
                      <select 
                        value={currentItem.currency} 
                        onChange={(e) => setCurrentItem({...currentItem, currency: e.target.value})} 
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 border-l-4 border-l-red-500"
                      >
                         <option value="INR">INR</option>
                         <option value="USD">USD</option>
                         <option value="EUR">EUR</option>
                      </select>
                  </div>

                  <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Cost Type</label>
                      <select 
                        value={currentItem.costType} 
                        onChange={(e) => setCurrentItem({...currentItem, costType: e.target.value})} 
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 border-l-4 border-l-red-500"
                      >
                         <option value="Select Cost Type">Select Cost Type</option>
                         <option value="Per Person">Per Person</option>
                         <option value="Per Group">Per Group</option>
                      </select>
                  </div>

                  {currentItem.costType === 'Per Person' && (
                      <div className="grid grid-cols-2 gap-4 animate-in fade-in">
                          <div>
                              <label className="block text-xs font-semibold text-slate-500 mb-1">Adult Cost</label>
                              <input 
                                type="number" 
                                value={currentItem.adultCost || ''} 
                                onChange={(e) => setCurrentItem({...currentItem, adultCost: Number(e.target.value)})} 
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                          </div>
                          <div>
                              <label className="block text-xs font-semibold text-slate-500 mb-1">Child Cost</label>
                              <input 
                                type="number" 
                                value={currentItem.childCost || ''} 
                                onChange={(e) => setCurrentItem({...currentItem, childCost: Number(e.target.value)})} 
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                          </div>
                      </div>
                  )}

                  {currentItem.costType === 'Per Group' && (
                      <div className="animate-in fade-in">
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Group Cost</label>
                          <input 
                            type="number" 
                            value={currentItem.groupCost || ''} 
                            onChange={(e) => setCurrentItem({...currentItem, groupCost: Number(e.target.value)})} 
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                      </div>
                  )}

                  <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Display Name in proposal</label>
                      <input 
                        type="text" 
                        value={currentItem.displayName || ''} 
                        onChange={(e) => setCurrentItem({...currentItem, displayName: e.target.value})} 
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                  </div>

                  <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Show in Proposal</label>
                      <select 
                        value={currentItem.showInProposal} 
                        onChange={(e) => setCurrentItem({...currentItem, showInProposal: e.target.value})} 
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                         <option value="Yes">Yes</option>
                         <option value="No">No</option>
                      </select>
                  </div>

                  <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Status</label>
                      <select 
                        value={currentItem.status} 
                        onChange={(e) => setCurrentItem({...currentItem, status: e.target.value as any})} 
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                         <option value="Active">Active</option>
                         <option value="Inactive">Inactive</option>
                      </select>
                  </div>

                  <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Add Image</label>
                      <div className="flex gap-2 items-center">
                            <label className="cursor-pointer px-3 py-2 border border-slate-300 rounded text-sm bg-white hover:bg-slate-50">
                            Choose File
                            <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                            </label>
                            <span className="text-xs text-slate-400 truncate max-w-[200px]">
                            {currentItem.image ? 'Image selected' : 'No file chosen'}
                            </span>
                      </div>
                  </div>

                  <div>
                     <label className="block text-xs font-semibold text-slate-500 mb-1">Description</label>
                     <div className="border border-slate-300 rounded-lg overflow-hidden">
                        <div className="bg-slate-50 px-3 py-2 border-b border-slate-300 flex gap-4 text-slate-600 text-xs">
                           <span>File</span><span>Edit</span><span>View</span><span>Insert</span><span>Format</span><span>Tools</span><span>Table</span><span>Help</span>
                        </div>
                        <div className="px-3 py-2 flex gap-3 text-slate-500 border-b border-slate-100">
                           <button className="hover:text-blue-600"><Bold size={14}/></button>
                           <button className="hover:text-blue-600"><Italic size={14}/></button>
                           <button className="hover:text-blue-600"><AlignLeft size={14}/></button>
                           <button className="hover:text-blue-600"><List size={14}/></button>
                        </div>
                        <textarea 
                          value={currentItem.description || ''} 
                          onChange={(e) => setCurrentItem({...currentItem, description: e.target.value})} 
                          className="w-full px-3 py-2 border-0 text-sm focus:ring-0 h-24 resize-none"
                        />
                         <div className="bg-slate-50 border-t border-slate-300 px-3 py-1 text-[10px] text-slate-400 text-right">Powered by TinyMCE</div>
                     </div>
                  </div>
               </div>

               <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                  <button onClick={handleSave} className="px-8 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full text-sm font-medium shadow-sm transition-colors">Save</button>
                  <button onClick={() => setShowModal(false)} className="px-8 py-2 bg-white border border-slate-300 text-slate-600 rounded-full text-sm font-medium hover:bg-slate-50 transition-colors">Cancel</button>
               </div>
            </div>
         </div>
      )}
    </div>
  );
};

export default AdditionalRequirementMaster;
