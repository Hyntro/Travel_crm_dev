
import React, { useState } from 'react';
import { ArrowLeft, Download, Upload, Plus, Search, Edit2, Trash2, X, History, FileSpreadsheet, AlignLeft, List, Bold, Italic } from 'lucide-react';
import { ItineraryInfoMaster } from '../types';
import { initialItineraryInfos, initialDestinations } from './mockData';

interface ItineraryInfoMasterProps {
  onBack: () => void;
}

const ItineraryInfoMaster: React.FC<ItineraryInfoMasterProps> = ({ onBack }) => {
  const [infos, setInfos] = useState<ItineraryInfoMaster[]>(initialItineraryInfos);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  
  const [currentItem, setCurrentItem] = useState<Partial<ItineraryInfoMaster>>({ 
    status: 'Active',
    fromDestinationId: 'None',
    transferMode: 'Surface'
  });

  const handleEdit = (info: ItineraryInfoMaster) => {
    setCurrentItem({ ...info });
    setShowModal(true);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (window.confirm('Delete itinerary info?')) {
      setInfos(prev => prev.filter(i => i.id !== id));
    }
  };

  const handleSave = () => {
    if (!currentItem.title || !currentItem.toDestinationId) return;

    const fromName = currentItem.fromDestinationId === 'None' ? 'None' : initialDestinations.find(d => d.id === currentItem.fromDestinationId)?.name || '';
    const toName = initialDestinations.find(d => d.id === currentItem.toDestinationId)?.name || '';

    const newItem: ItineraryInfoMaster = {
        id: currentItem.id || `SUB-${Math.floor(1000 + Math.random() * 9000)}`,
        fromDestinationId: currentItem.fromDestinationId || 'None',
        fromDestinationName: fromName,
        toDestinationId: currentItem.toDestinationId!,
        toDestinationName: toName,
        transferMode: currentItem.transferMode || 'Surface',
        title: currentItem.title!,
        description: currentItem.description || '',
        status: currentItem.status || 'Active'
    };

    if (currentItem.id) {
        setInfos(prev => prev.map(i => i.id === currentItem.id ? newItem : i));
    } else {
        setInfos(prev => [...prev, newItem]);
    }
    setShowModal(false);
    resetForm();
  };

  const resetForm = () => {
    setCurrentItem({ 
      status: 'Active',
      fromDestinationId: 'None',
      transferMode: 'Surface'
    });
  };

  const filteredInfos = infos.filter(i => 
    i.title.toLowerCase().includes(search.toLowerCase()) || 
    i.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col animate-in fade-in slide-in-from-right-4 duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Itinerary Info.</h2>
            <p className="text-sm text-slate-500">Manage standard itinerary descriptions</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
           <button className="bg-white border border-slate-300 text-slate-600 px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-50 text-sm font-medium shadow-sm">
             <Download size={16}/> Download Format
           </button>
           <label className="bg-white border border-slate-300 text-slate-600 px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-50 text-sm font-medium shadow-sm cursor-pointer">
             <Upload size={16}/> Import Excel
             <input type="file" className="hidden" accept=".csv,.xlsx"/>
           </label>
           <button className="bg-white border border-slate-300 text-slate-600 px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-50 text-sm font-medium shadow-sm">
             <History size={16}/> View Logs
           </button>
           <button 
             onClick={() => { resetForm(); setShowModal(true); }} 
             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm text-sm font-medium"
           >
             <Plus size={18} /> Add Itinerary Info
           </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-6 flex flex-wrap gap-4 items-end">
         <div className="flex-1 min-w-[200px] max-w-md">
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
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 flex-1 overflow-hidden flex flex-col">
         <div className="overflow-x-auto flex-1">
            <table className="w-full text-left">
               <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                     <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase w-48">Itinerary Title No.</th>
                     <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Title/Description</th>
                     <th className="px-6 py-3 text-right text-xs font-bold text-slate-500 uppercase w-32">Action</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {filteredInfos.map((info) => (
                     <tr key={info.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 text-sm font-mono text-blue-600 font-medium align-top">{info.id}</td>
                        <td className="px-6 py-4 align-top">
                           <div className="font-bold text-slate-800 text-sm mb-1">{info.title}</div>
                           <div className="text-xs text-slate-500 line-clamp-2 mb-2" dangerouslySetInnerHTML={{ __html: info.description }} />
                           <div className="flex gap-2">
                              <span className="text-[10px] px-2 py-0.5 bg-slate-100 rounded text-slate-600 border border-slate-200">
                                {info.fromDestinationName} → {info.toDestinationName}
                              </span>
                              <span className="text-[10px] px-2 py-0.5 bg-blue-50 rounded text-blue-600 border border-blue-100">
                                {info.transferMode}
                              </span>
                           </div>
                        </td>
                        <td className="px-6 py-4 text-right align-top">
                           <div className="flex items-center justify-end gap-2">
                              <button onClick={() => handleEdit(info)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded">
                                <Edit2 size={16}/>
                              </button>
                              <button onClick={(e) => handleDelete(info.id, e)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded">
                                <Trash2 size={16}/>
                              </button>
                           </div>
                        </td>
                     </tr>
                  ))}
                  {filteredInfos.length === 0 && (
                    <tr>
                      <td colSpan={3} className="px-6 py-8 text-center text-slate-400 text-sm">No itinerary info found.</td>
                    </tr>
                  )}
               </tbody>
            </table>
         </div>
      </div>

      {/* Modal */}
      {showModal && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
               <div className="bg-slate-800 px-6 py-4 flex justify-between items-center">
                  <h3 className="text-lg font-bold text-white uppercase">Add Subject Master</h3>
                  <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                    <X size={20} />
                  </button>
               </div>
               
               <div className="p-8 space-y-5 overflow-y-auto flex-1 bg-white">
                  
                  <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">From Destination</label>
                      <select 
                        value={currentItem.fromDestinationId} 
                        onChange={(e) => setCurrentItem({...currentItem, fromDestinationId: e.target.value})} 
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                         <option value="None">None</option>
                         {initialDestinations.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                      </select>
                  </div>

                  <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">To Destination</label>
                      <select 
                        value={currentItem.toDestinationId} 
                        onChange={(e) => setCurrentItem({...currentItem, toDestinationId: e.target.value})} 
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 border-b-2 border-b-red-500"
                      >
                         <option value="">Select</option>
                         {initialDestinations.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                      </select>
                  </div>

                  <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Transfer Mode</label>
                      <select 
                        value={currentItem.transferMode} 
                        onChange={(e) => setCurrentItem({...currentItem, transferMode: e.target.value})} 
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 border-b-2 border-b-red-500"
                      >
                         <option value="Surface">Surface</option>
                         <option value="Flight">Flight</option>
                         <option value="Train">Train</option>
                      </select>
                  </div>

                  <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Title</label>
                      <input 
                        type="text" 
                        value={currentItem.title || ''} 
                        onChange={(e) => setCurrentItem({...currentItem, title: e.target.value})} 
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-b-2 border-b-red-500"
                      />
                  </div>

                  <div>
                     <label className="block text-xs font-semibold text-slate-500 mb-1">Description</label>
                     <div className="border border-slate-300 rounded-lg overflow-hidden">
                        <div className="bg-slate-50 px-3 py-2 border-b border-slate-300 flex gap-4 text-slate-600 text-xs">
                           <span>File</span><span>Edit</span><span>View</span><span>Insert</span><span>Format</span>
                        </div>
                        <div className="px-3 py-2 flex gap-3 text-slate-500 border-b border-slate-100">
                           <button className="hover:text-blue-600"><ArrowLeft size={14}/></button>
                           <button className="hover:text-blue-600"><ArrowLeft size={14} className="rotate-180"/></button>
                           <button className="hover:text-blue-600 font-bold"><Bold size={14}/></button>
                           <button className="hover:text-blue-600 italic"><Italic size={14}/></button>
                           <button className="hover:text-blue-600 underline"><AlignLeft size={14}/></button>
                           <button className="hover:text-blue-600"><List size={14}/></button>
                           <button className="hover:text-blue-600">•••</button>
                        </div>
                        <textarea 
                          value={currentItem.description || ''} 
                          onChange={(e) => setCurrentItem({...currentItem, description: e.target.value})} 
                          className="w-full px-3 py-2 border-0 text-sm focus:ring-0 h-32 resize-none"
                        />
                         <div className="bg-slate-50 border-t border-slate-300 px-3 py-1 text-[10px] text-slate-400 text-right">Powered by TinyMCE</div>
                     </div>
                  </div>

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

export default ItineraryInfoMaster;
