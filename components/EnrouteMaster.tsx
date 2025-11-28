


import React, { useState } from 'react';
import { ArrowLeft, Download, Upload, Plus, Search, Edit2, Trash2, X, History, FileJson, Image as ImageIcon, FileSpreadsheet, AlignLeft, List, Bold, Italic } from 'lucide-react';
import { Enroute } from '../types';
import { initialEnroutes, initialDestinations } from './mockData';

interface EnrouteMasterProps {
  onBack: () => void;
}

const EnrouteMaster: React.FC<EnrouteMasterProps> = ({ onBack }) => {
  const [enroutes, setEnroutes] = useState<Enroute[]>(initialEnroutes);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  const [currentEnroute, setCurrentEnroute] = useState<Partial<Enroute>>({ 
    status: 'Active', 
    isDefault: 'No', 
    currency: 'INR',
    supplierName: '1589 Gen X Haut Monde (Sector15)',
    gstSlab: 'GSTInclusive (0)'
  });

  const handleEdit = (enroute: Enroute) => {
    setCurrentEnroute({ ...enroute });
    setShowModal(true);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm('Delete enroute service?')) {
      setEnroutes(prev => prev.filter(e => e.id !== id));
    }
  };

  const handleSave = () => {
    if (!currentEnroute.name || !currentEnroute.destinationId) return;

    const destName = initialDestinations.find(d => d.id === currentEnroute.destinationId)?.name || '';

    if (currentEnroute.id) {
      setEnroutes(prev => prev.map(e => e.id === currentEnroute.id ? { ...e, ...currentEnroute, destinationName: destName } as Enroute : e));
    } else {
      const newEnroute: Enroute = {
        ...currentEnroute as Enroute,
        id: Math.random().toString(),
        serviceCode: `ENR${Math.floor(Math.random() * 1000)}`,
        destinationName: destName,
        language: currentEnroute.language || 'English'
      };
      setEnroutes(prev => [...prev, newEnroute]);
    }
    setShowModal(false);
    resetForm();
  };

  const resetForm = () => {
    setCurrentEnroute({ 
      status: 'Active', 
      isDefault: 'No', 
      currency: 'INR',
      supplierName: '1589 Gen X Haut Monde (Sector15)',
      gstSlab: 'GSTInclusive (0)'
    });
  };

  const filteredEnroutes = enroutes.filter(e => {
    const matchesSearch = e.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || e.status === statusFilter;
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
            <h2 className="text-2xl font-bold text-slate-800">Enroute Master</h2>
            <p className="text-sm text-slate-500">Manage enroute stops and services</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
           <button className="bg-white border border-slate-300 text-slate-600 px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-50 text-sm font-medium shadow-sm">
             <History size={16}/> View Logs
           </button>
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
             <Plus size={18} /> Add Enroute
           </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
         <div className="relative flex-1 w-full max-w-md">
            <label className="absolute -top-2 left-2 px-1 bg-white text-[10px] font-semibold text-slate-500">Keyword</label>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
              placeholder="Keyword" 
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
                     <th className="px-4 py-3 w-10 text-center"><input type="checkbox" className="rounded"/></th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Service Code</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Enroute Name</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Destination</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Description</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Language</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase text-center">Gallery</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Status</th>
                     <th className="px-4 py-3 text-right text-xs font-bold text-slate-500 uppercase">Action</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {filteredEnroutes.map((enroute) => (
                     <tr key={enroute.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3 text-center"><input type="checkbox" className="rounded"/></td>
                        <td className="px-4 py-3 text-sm text-slate-500 font-mono">{enroute.serviceCode}</td>
                        <td className="px-4 py-3 font-medium text-slate-800">{enroute.name}</td>
                        <td className="px-4 py-3 text-sm text-slate-600">{enroute.destinationName}</td>
                        <td className="px-4 py-3 text-sm text-slate-600 max-w-[200px] truncate">{enroute.description}</td>
                        <td className="px-4 py-3 text-xs text-slate-600">{enroute.language || 'English'}</td>
                        <td className="px-4 py-3 text-center">
                           <ImageIcon size={16} className="text-purple-500 cursor-pointer mx-auto"/>
                        </td>
                        <td className="px-4 py-3">
                           <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${enroute.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {enroute.status}
                           </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                           <div className="flex items-center justify-end gap-2">
                              <button onClick={() => handleEdit(enroute)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded">
                                <Edit2 size={16}/>
                              </button>
                              <button onClick={(e) => handleDelete(enroute.id, e)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded">
                                <Trash2 size={16}/>
                              </button>
                           </div>
                        </td>
                     </tr>
                  ))}
                  {filteredEnroutes.length === 0 && (
                    <tr>
                      <td colSpan={9} className="px-6 py-8 text-center text-slate-400 text-sm">No enroute services found.</td>
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
                  <h3 className="text-lg font-bold text-white">{currentEnroute.id ? 'Edit Enroute' : 'Add Enroute'}</h3>
                  <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                    <X size={20} />
                  </button>
               </div>
               
               <div className="p-6 space-y-4 overflow-y-auto flex-1">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Enroute Name</label>
                          <input 
                            type="text" 
                            value={currentEnroute.name || ''} 
                            onChange={(e) => setCurrentEnroute({...currentEnroute, name: e.target.value})} 
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-l-4 border-l-red-500"
                          />
                      </div>
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Supplier Name</label>
                          <select 
                            value={currentEnroute.supplierName} 
                            onChange={(e) => setCurrentEnroute({...currentEnroute, supplierName: e.target.value})} 
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 border-l-4 border-l-red-500"
                          >
                             <option value="1589 Gen X Haut Monde (Sector15)">1589 Gen X Haut Monde (Sector15)</option>
                             <option value="Midway Restaurant">Midway Restaurant</option>
                          </select>
                      </div>
                      
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">GST Slab(%)</label>
                          <select 
                            value={currentEnroute.gstSlab} 
                            onChange={(e) => setCurrentEnroute({...currentEnroute, gstSlab: e.target.value})} 
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 border-l-4 border-l-red-500"
                          >
                             <option value="GSTInclusive (0)">GSTInclusive (0)</option>
                             <option value="GST 5%">GST 5%</option>
                          </select>
                      </div>
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Currency</label>
                          <select 
                            value={currentEnroute.currency} 
                            onChange={(e) => setCurrentEnroute({...currentEnroute, currency: e.target.value})} 
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 border-l-4 border-l-red-500"
                          >
                             <option value="INR">INR</option>
                             <option value="USD">USD</option>
                          </select>
                      </div>

                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Per Pax Cost</label>
                          <input 
                            type="number" 
                            value={currentEnroute.cost || ''} 
                            onChange={(e) => setCurrentEnroute({...currentEnroute, cost: Number(e.target.value)})} 
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-l-4 border-l-red-500"
                          />
                      </div>
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Default</label>
                          <select 
                            value={currentEnroute.isDefault} 
                            onChange={(e) => setCurrentEnroute({...currentEnroute, isDefault: e.target.value as any})} 
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                             <option value="No">No</option>
                             <option value="Yes">Yes</option>
                          </select>
                      </div>

                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Destination</label>
                          <select 
                            value={currentEnroute.destinationId} 
                            onChange={(e) => setCurrentEnroute({...currentEnroute, destinationId: e.target.value})} 
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 border-l-4 border-l-red-500"
                          >
                             <option value="">Select</option>
                             {initialDestinations.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                          </select>
                      </div>
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Status</label>
                          <select 
                            value={currentEnroute.status} 
                            onChange={(e) => setCurrentEnroute({...currentEnroute, status: e.target.value as any})} 
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                             <option value="Active">Active</option>
                             <option value="Inactive">Inactive</option>
                          </select>
                      </div>
                  </div>

                  <div>
                     <label className="block text-xs font-semibold text-slate-500 mb-1">Description</label>
                     <div className="border border-slate-300 rounded-lg overflow-hidden">
                        <div className="bg-slate-50 px-3 py-2 border-b border-slate-300 flex gap-4 text-slate-600 text-xs">
                           <span>File</span><span>Edit</span><span>View</span><span>Insert</span><span>Format</span><span>Tools</span><span>Table</span><span>Help</span>
                        </div>
                        <div className="px-3 py-2 flex gap-3 text-slate-500 border-b border-slate-100">
                           <button className="hover:text-blue-600"><ArrowLeft size={14}/></button>
                           <button className="hover:text-blue-600"><ArrowLeft size={14} className="rotate-180"/></button>
                           <button className="hover:text-blue-600 font-bold">B</button>
                           <button className="hover:text-blue-600 italic">I</button>
                           <button className="hover:text-blue-600 underline">U</button>
                           <button className="hover:text-blue-600 line-through">S</button>
                           <div className="w-px bg-slate-300 mx-1"></div>
                           <button className="hover:text-blue-600 flex items-center gap-1">A <span className="text-[8px]">▼</span></button>
                           <button className="hover:text-blue-600 flex items-center gap-1"><Edit2 size={12}/> <span className="text-[8px]">▼</span></button>
                           <button className="hover:text-blue-600">•••</button>
                        </div>
                        <textarea 
                          value={currentEnroute.description || ''}
                          onChange={e => setCurrentEnroute({...currentEnroute, description: e.target.value})}
                          className="w-full h-32 p-3 outline-none text-sm resize-none"
                        ></textarea>
                        <div className="bg-slate-50 border-t border-slate-300 px-3 py-1 text-[10px] text-slate-400 text-right">Powered by TinyMCE</div>
                     </div>
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

export default EnrouteMaster;
