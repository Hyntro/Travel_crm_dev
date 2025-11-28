
import React, { useState } from 'react';
import { ArrowLeft, Download, Upload, Plus, Search, Edit2, Trash2, X, History, FileSpreadsheet, Eye, ArrowLeft as ArrowLeftSmall, AlignLeft, List, Bold, Italic } from 'lucide-react';
import { TransferMaster } from '../types';
import { initialTransfers, initialDestinations, initialTransferTypes } from './mockData';

interface TransferMasterProps {
  onBack: () => void;
}

const TransferMaster: React.FC<TransferMasterProps> = ({ onBack }) => {
  const [transfers, setTransfers] = useState<TransferMaster[]>(initialTransfers);
  const [showModal, setShowModal] = useState(false);
  const [searchName, setSearchName] = useState('');
  const [filterDestination, setFilterDestination] = useState('All');
  const [filterType, setFilterType] = useState('All');
  
  const [currentTransfer, setCurrentTransfer] = useState<Partial<TransferMaster>>({ 
    status: 'Active',
    destinationId: '',
    transferType: 'None'
  });

  const handleEdit = (transfer: TransferMaster) => {
    setCurrentTransfer({ ...transfer });
    setShowModal(true);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm('Delete transfer?')) {
      setTransfers(prev => prev.filter(t => t.id !== id));
    }
  };

  const handleSave = () => {
    if (!currentTransfer.name || !currentTransfer.destinationId) return;

    const destName = initialDestinations.find(d => d.id === currentTransfer.destinationId)?.name || '';

    if (currentTransfer.id) {
      setTransfers(prev => prev.map(t => t.id === currentTransfer.id ? { ...t, ...currentTransfer, destinationName: destName } as TransferMaster : t));
    } else {
      const newTransfer: TransferMaster = {
        ...currentTransfer as TransferMaster,
        id: Math.random().toString(),
        destinationName: destName
      };
      setTransfers(prev => [...prev, newTransfer]);
    }
    setShowModal(false);
    resetForm();
  };

  const resetForm = () => {
    setCurrentTransfer({ 
      status: 'Active',
      destinationId: '',
      transferType: 'None'
    });
  };

  const filteredTransfers = transfers.filter(t => {
    const matchesName = t.name.toLowerCase().includes(searchName.toLowerCase());
    const matchesDest = filterDestination === 'All' || t.destinationName === filterDestination;
    const matchesType = filterType === 'All' || t.transferType === filterType;
    return matchesName && matchesDest && matchesType;
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
            <h2 className="text-2xl font-bold text-slate-800">Transfer Master</h2>
            <p className="text-sm text-slate-500">Manage transfer services and transport details</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
           <button className="bg-white border border-slate-300 text-slate-600 px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-50 text-sm font-medium shadow-sm">
             <History size={16}/> View Logs
           </button>
           <button className="bg-white border border-slate-300 text-slate-600 px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-50 text-sm font-medium shadow-sm">
             <Download size={16}/> Download Data
           </button>
           <label className="bg-white border border-slate-300 text-slate-600 px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-50 text-sm font-medium shadow-sm cursor-pointer">
             <Upload size={16}/> Download / Import 
             <input type="file" className="hidden" accept=".csv,.xlsx"/>
           </label>
           <button 
             onClick={() => { resetForm(); setShowModal(true); }} 
             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm text-sm font-medium"
           >
             <Plus size={18} /> Add Transfer
           </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-6 flex flex-wrap gap-4 items-end">
         <div className="flex-1 min-w-[200px]">
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Transfer Name</label>
            <input 
              type="text" 
              value={searchName} 
              onChange={(e) => setSearchName(e.target.value)} 
              placeholder="Keyword" 
              className="w-full pl-3 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
         </div>
         <div className="w-48">
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Destination</label>
            <select 
              value={filterDestination} 
              onChange={(e) => setFilterDestination(e.target.value)} 
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
               <option value="All">All</option>
               {initialDestinations.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
            </select>
         </div>
         <div className="w-48">
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Transfer Type</label>
            <select 
              value={filterType} 
              onChange={(e) => setFilterType(e.target.value)} 
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
               <option value="All">All</option>
               {initialTransferTypes.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
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
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Sr.</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Transfer Name</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Destinations</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Transfer Type</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase text-center">Detail</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase text-center">Rate Sheet</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Status</th>
                     <th className="px-4 py-3 text-right text-xs font-bold text-slate-500 uppercase">Action</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {filteredTransfers.map((transfer, index) => (
                     <tr key={transfer.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3 text-center"><input type="checkbox" className="rounded"/></td>
                        <td className="px-4 py-3 text-sm text-slate-500">{index + 1}</td>
                        <td className="px-4 py-3 font-medium text-slate-800">{transfer.name}</td>
                        <td className="px-4 py-3 text-sm text-slate-600">{transfer.destinationName}</td>
                        <td className="px-4 py-3 text-sm text-slate-600">{transfer.transferType}</td>
                        <td className="px-4 py-3 text-center">
                           <button className="text-blue-600 text-xs font-medium hover:underline">View</button>
                        </td>
                        <td className="px-4 py-3 text-center">
                           <button className="text-blue-600 text-xs font-medium hover:underline">Rates</button>
                        </td>
                        <td className="px-4 py-3">
                           <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${transfer.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {transfer.status}
                           </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                           <div className="flex items-center justify-end gap-2">
                              <button onClick={() => handleEdit(transfer)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded">
                                <Edit2 size={16}/>
                              </button>
                              <button onClick={(e) => handleDelete(transfer.id, e)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded">
                                <Trash2 size={16}/>
                              </button>
                           </div>
                        </td>
                     </tr>
                  ))}
                  {filteredTransfers.length === 0 && (
                    <tr>
                      <td colSpan={9} className="px-6 py-8 text-center text-slate-400 text-sm">No transfers found.</td>
                    </tr>
                  )}
               </tbody>
            </table>
         </div>
      </div>

      {/* Modal */}
      {showModal && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
               <div className="bg-slate-800 px-6 py-4 flex justify-between items-center">
                  <h3 className="text-lg font-bold text-white">{currentTransfer.id ? 'Edit Transfer/Transportation' : 'Add Transfer/Transportation'}</h3>
                  <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                    <X size={20} />
                  </button>
               </div>
               
               <div className="p-6 space-y-6 overflow-y-auto flex-1">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Transfer/Transportation Name</label>
                          <input 
                            type="text" 
                            value={currentTransfer.name || ''} 
                            onChange={(e) => setCurrentTransfer({...currentTransfer, name: e.target.value})} 
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-l-4 border-l-red-500"
                          />
                      </div>
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Destinations</label>
                          <select 
                            value={currentTransfer.destinationId} 
                            onChange={(e) => setCurrentTransfer({...currentTransfer, destinationId: e.target.value})} 
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                             <option value="">Search Destination</option>
                             {initialDestinations.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                          </select>
                      </div>
                      
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Status</label>
                          <select 
                            value={currentTransfer.status} 
                            onChange={(e) => setCurrentTransfer({...currentTransfer, status: e.target.value as any})} 
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                             <option value="Active">Active</option>
                             <option value="Inactive">Inactive</option>
                          </select>
                      </div>
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Transfer Type</label>
                          <select 
                            value={currentTransfer.transferType} 
                            onChange={(e) => setCurrentTransfer({...currentTransfer, transferType: e.target.value})} 
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                             <option value="None">None</option>
                             {initialTransferTypes.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
                          </select>
                      </div>
                  </div>

                  <div>
                     <label className="block text-xs font-semibold text-slate-500 mb-1">Detail</label>
                     <div className="border border-slate-300 rounded-lg overflow-hidden">
                        <div className="bg-slate-50 px-3 py-2 border-b border-slate-300 flex gap-4 text-slate-600 text-xs">
                           <span>File</span><span>Edit</span><span>View</span><span>Insert</span><span>Format</span>
                        </div>
                        <div className="px-3 py-2 flex gap-3 text-slate-500 border-b border-slate-100">
                           <button className="hover:text-blue-600"><ArrowLeftSmall size={14}/></button>
                           <button className="hover:text-blue-600"><ArrowLeftSmall size={14} className="rotate-180"/></button>
                           <select className="text-xs border border-slate-200 rounded"><option>Paragraph</option></select>
                           <button className="hover:text-blue-600 font-bold"><Bold size={14}/></button>
                           <button className="hover:text-blue-600 italic"><Italic size={14}/></button>
                           <button className="hover:text-blue-600">•••</button>
                        </div>
                        <textarea 
                          value={currentTransfer.description || ''}
                          onChange={e => setCurrentTransfer({...currentTransfer, description: e.target.value})}
                          className="w-full h-32 p-3 outline-none text-sm resize-none"
                        ></textarea>
                        <div className="bg-slate-50 border-t border-slate-300 px-3 py-1 text-[10px] text-slate-400 text-right">Powered by TinyMCE</div>
                     </div>
                  </div>

                  <div>
                     <label className="block text-xs font-semibold text-slate-500 mb-1">Internal Note</label>
                     <div className="border border-slate-300 rounded-lg overflow-hidden">
                        <div className="bg-slate-50 px-3 py-2 border-b border-slate-300 flex gap-4 text-slate-600 text-xs">
                           <span>File</span><span>Edit</span><span>View</span><span>Insert</span><span>Format</span>
                        </div>
                        <div className="px-3 py-2 flex gap-3 text-slate-500 border-b border-slate-100">
                           <button className="hover:text-blue-600"><ArrowLeftSmall size={14}/></button>
                           <button className="hover:text-blue-600"><ArrowLeftSmall size={14} className="rotate-180"/></button>
                           <select className="text-xs border border-slate-200 rounded"><option>Paragraph</option></select>
                           <button className="hover:text-blue-600 font-bold"><Bold size={14}/></button>
                           <button className="hover:text-blue-600 italic"><Italic size={14}/></button>
                           <button className="hover:text-blue-600">•••</button>
                        </div>
                        <textarea 
                          value={currentTransfer.internalNote || ''}
                          onChange={e => setCurrentTransfer({...currentTransfer, internalNote: e.target.value})}
                          className="w-full h-24 p-3 outline-none text-sm resize-none"
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

export default TransferMaster;
