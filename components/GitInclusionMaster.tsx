
import React, { useState } from 'react';
import { ArrowLeft, Plus, Search, Edit2, Trash2, X, History, FileSpreadsheet, Download, Upload, AlignLeft, List, Bold, Italic } from 'lucide-react';
import { GitInclusionMaster } from '../types';
import { initialGitInclusions, initialDestinations } from './mockData';

interface GitInclusionMasterProps {
  onBack: () => void;
}

const GitInclusionMaster: React.FC<GitInclusionMasterProps> = ({ onBack }) => {
  const [inclusions, setInclusions] = useState<GitInclusionMaster[]>(initialGitInclusions);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  const [currentItem, setCurrentItem] = useState<Partial<GitInclusionMaster>>({ 
    status: 'Active',
    language: 'English',
    isDefault: false
  });

  const handleEdit = (item: GitInclusionMaster) => {
    setCurrentItem({ ...item });
    setShowModal(true);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (window.confirm('Delete item?')) {
      setInclusions(prev => prev.filter(i => i.id !== id));
    }
  };

  const handleSave = () => {
    if (!currentItem.name) return;
    
    const destName = currentItem.destinationId === 'All' ? 'All' : 
        initialDestinations.find(d => d.id === currentItem.destinationId)?.name || currentItem.destinationId || '';

    const newItem: GitInclusionMaster = {
        id: currentItem.id || Math.random().toString(),
        name: currentItem.name,
        destinationId: currentItem.destinationId || 'All',
        destinationName: destName,
        inclusion: currentItem.inclusion || '',
        exclusion: currentItem.exclusion || '',
        terms: currentItem.terms || '',
        cancellationPolicy: currentItem.cancellationPolicy || '',
        remarks: currentItem.remarks || '',
        status: currentItem.status || 'Active',
        language: currentItem.language || 'English',
        isDefault: currentItem.isDefault || false
    };

    if (currentItem.id) {
        setInclusions(prev => prev.map(i => i.id === currentItem.id ? newItem : i));
    } else {
        setInclusions(prev => [...prev, newItem]);
    }
    setShowModal(false);
    resetForm();
  };

  const resetForm = () => {
    setCurrentItem({ 
      status: 'Active',
      language: 'English',
      isDefault: false
    });
  };

  const filteredItems = inclusions.filter(i => {
    const matchesSearch = i.name.toLowerCase().includes(search.toLowerCase()) || 
                          i.destinationName.toLowerCase().includes(search.toLowerCase());
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
            <h2 className="text-2xl font-bold text-slate-800">GIT Inculsions I Exculsions I T & C I Cancellation Policy</h2>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-6 flex flex-wrap gap-4 items-end justify-between">
         <div className="flex gap-4 items-end flex-1">
             <div className="flex-1 min-w-[200px] max-w-md">
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Keyword</label>
                <input 
                type="text" 
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
                placeholder="Search" 
                className="w-full pl-3 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
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
             <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg text-sm font-medium shadow-sm flex items-center gap-2 h-[38px]">
                <Search size={16} /> Search
             </button>
         </div>
         
         <div>
             <button 
               onClick={() => { resetForm(); setShowModal(true); }} 
               className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm text-sm font-medium h-[38px]"
             >
               <Plus size={18} /> Add GIT Inculsions I Exculsions I T & C I Cancellation Policy
             </button>
         </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 flex-1 overflow-hidden flex flex-col">
         <div className="overflow-x-auto flex-1">
            <table className="w-full text-left">
               <thead className="bg-slate-50 border-b border-slate-100 text-slate-600">
                  <tr>
                     <th className="px-4 py-3 w-10 text-center text-xs font-bold uppercase">#</th>
                     <th className="px-4 py-3 w-10 text-center"><input type="checkbox" className="rounded"/></th>
                     <th className="px-4 py-3 text-xs font-bold uppercase">Name</th>
                     <th className="px-4 py-3 text-xs font-bold uppercase">Destination</th>
                     <th className="px-4 py-3 text-xs font-bold uppercase w-1/4">Inclusion</th>
                     <th className="px-4 py-3 text-xs font-bold uppercase w-1/4">Exclusion</th>
                     <th className="px-4 py-3 text-xs font-bold uppercase text-center">Language</th>
                     <th className="px-4 py-3 text-xs font-bold uppercase text-right">Status</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {filteredItems.map((item, index) => (
                     <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                        <td className="px-4 py-3 text-center text-sm text-slate-500">{index + 1}</td>
                        <td className="px-4 py-3 text-center"><input type="checkbox" className="rounded"/></td>
                        <td className="px-4 py-3 text-sm text-green-600 cursor-pointer hover:underline font-medium" onClick={() => handleEdit(item)}>
                            {item.name}
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-600">{item.destinationName}</td>
                        <td className="px-4 py-3 text-xs text-slate-600 align-top">
                            <div className="line-clamp-4 list-disc pl-4" dangerouslySetInnerHTML={{ __html: item.inclusion }} />
                        </td>
                        <td className="px-4 py-3 text-xs text-slate-600 align-top">
                            <div className="line-clamp-4 list-disc pl-4" dangerouslySetInnerHTML={{ __html: item.exclusion }} />
                        </td>
                        <td className="px-4 py-3 text-center align-top">
                           <button className="bg-blue-400 hover:bg-blue-500 text-white text-[10px] px-3 py-1 rounded-full shadow-sm transition-colors">
                              View Language
                           </button>
                        </td>
                        <td className="px-4 py-3 text-right align-top">
                           <span className={`text-xs font-medium ${item.status === 'Active' ? 'text-green-600' : 'text-red-500'}`}>
                              {item.status}
                           </span>
                        </td>
                     </tr>
                  ))}
                  {filteredItems.length === 0 && (
                    <tr>
                      <td colSpan={8} className="px-6 py-8 text-center text-slate-400 text-sm">No records found.</td>
                    </tr>
                  )}
               </tbody>
            </table>
         </div>
      </div>

      {/* Modal */}
      {showModal && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
               <div className="bg-slate-800 px-6 py-4 flex justify-between items-center">
                  <h3 className="text-lg font-bold text-white uppercase">{currentItem.id ? 'Edit GIT Inculsions I Exculsions' : 'Add GIT Inculsions I Exculsions'}</h3>
                  <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                    <X size={20} />
                  </button>
               </div>
               
               <div className="p-8 space-y-6 overflow-y-auto flex-1 bg-white">
                  
                  <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Name</label>
                      <input 
                        type="text" 
                        value={currentItem.name || ''} 
                        onChange={(e) => setCurrentItem({...currentItem, name: e.target.value})} 
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-b-2 border-b-red-500"
                      />
                  </div>

                  <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Destination</label>
                      <input 
                        type="text" 
                        value={currentItem.destinationName || ''} 
                        onChange={(e) => setCurrentItem({...currentItem, destinationName: e.target.value})} 
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-b-2 border-b-red-500"
                        placeholder="Enter Destination"
                      />
                  </div>

                  <div>
                     <label className="block text-xs font-semibold text-slate-500 mb-1 flex items-center gap-2">
                        <Edit2 size={14} className="text-green-600"/> Inclusion
                     </label>
                     <div className="border border-slate-300 rounded-lg overflow-hidden">
                        <div className="bg-white px-3 py-2 border-b border-slate-300 flex gap-4 text-slate-600 text-xs">
                           <span>File</span><span>Edit</span><span>View</span><span>Insert</span><span>Format</span><span>Tools</span><span>Table</span><span>Help</span>
                        </div>
                        <div className="px-3 py-2 flex gap-3 text-slate-500 border-b border-slate-100 bg-slate-50">
                           <button className="hover:text-blue-600"><ArrowLeft size={14}/></button>
                           <button className="hover:text-blue-600"><ArrowLeft size={14} className="rotate-180"/></button>
                           <button className="hover:text-blue-600 font-bold"><Bold size={14}/></button>
                           <button className="hover:text-blue-600 italic"><Italic size={14}/></button>
                           <button className="hover:text-blue-600 underline"><AlignLeft size={14}/></button>
                           <button className="hover:text-blue-600"><List size={14}/></button>
                           <button className="hover:text-blue-600">•••</button>
                        </div>
                        <textarea 
                          value={currentItem.inclusion || ''} 
                          onChange={(e) => setCurrentItem({...currentItem, inclusion: e.target.value})} 
                          className="w-full px-3 py-2 border-0 text-sm focus:ring-0 h-40 resize-none"
                          placeholder="Enter inclusions..."
                        />
                     </div>
                  </div>

                  <div>
                     <label className="block text-xs font-semibold text-slate-500 mb-1">Exclusion</label>
                     <div className="border border-slate-300 rounded-lg overflow-hidden">
                        <div className="bg-white px-3 py-2 border-b border-slate-300 flex gap-4 text-slate-600 text-xs">
                           <span>File</span><span>Edit</span><span>View</span><span>Insert</span><span>Format</span><span>Tools</span><span>Table</span><span>Help</span>
                        </div>
                        <div className="px-3 py-2 flex gap-3 text-slate-500 border-b border-slate-100 bg-slate-50">
                           <button className="hover:text-blue-600"><ArrowLeft size={14}/></button>
                           <button className="hover:text-blue-600"><ArrowLeft size={14} className="rotate-180"/></button>
                           <button className="hover:text-blue-600 font-bold"><Bold size={14}/></button>
                           <button className="hover:text-blue-600 italic"><Italic size={14}/></button>
                           <button className="hover:text-blue-600 underline"><AlignLeft size={14}/></button>
                           <button className="hover:text-blue-600"><List size={14}/></button>
                           <button className="hover:text-blue-600">•••</button>
                        </div>
                        <textarea 
                          value={currentItem.exclusion || ''} 
                          onChange={(e) => setCurrentItem({...currentItem, exclusion: e.target.value})} 
                          className="w-full px-3 py-2 border-0 text-sm focus:ring-0 h-40 resize-none"
                          placeholder="Enter exclusions..."
                        />
                     </div>
                  </div>

                  <div>
                     <label className="block text-xs font-semibold text-slate-500 mb-1 flex items-center gap-2">
                        <Edit2 size={14} className="text-green-600"/> Remarks
                     </label>
                     <div className="border border-slate-300 rounded-lg overflow-hidden">
                        <div className="bg-white px-3 py-2 border-b border-slate-300 flex gap-4 text-slate-600 text-xs">
                           <span>File</span><span>Edit</span><span>View</span><span>Insert</span><span>Format</span><span>Tools</span><span>Table</span><span>Help</span>
                        </div>
                        <div className="px-3 py-2 flex gap-3 text-slate-500 border-b border-slate-100 bg-slate-50">
                           <button className="hover:text-blue-600"><ArrowLeft size={14}/></button>
                           <button className="hover:text-blue-600"><ArrowLeft size={14} className="rotate-180"/></button>
                           <button className="hover:text-blue-600 font-bold"><Bold size={14}/></button>
                           <button className="hover:text-blue-600 italic"><Italic size={14}/></button>
                           <button className="hover:text-blue-600 underline"><AlignLeft size={14}/></button>
                           <button className="hover:text-blue-600"><List size={14}/></button>
                           <button className="hover:text-blue-600">•••</button>
                        </div>
                        <textarea 
                          value={currentItem.remarks || ''} 
                          onChange={(e) => setCurrentItem({...currentItem, remarks: e.target.value})} 
                          className="w-full px-3 py-2 border-0 text-sm focus:ring-0 h-40 resize-none"
                          placeholder="Enter remarks..."
                        />
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">status</label>
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
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Default</label>
                          <select 
                            value={currentItem.isDefault ? 'Yes' : 'No'} 
                            onChange={(e) => setCurrentItem({...currentItem, isDefault: e.target.value === 'Yes'})} 
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                             <option value="No">No</option>
                             <option value="Yes">Yes</option>
                          </select>
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

export default GitInclusionMaster;
