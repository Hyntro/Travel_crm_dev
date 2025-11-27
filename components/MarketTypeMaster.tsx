
import React, { useState } from 'react';
import { ArrowLeft, Download, Upload, Plus, Search, Edit2, Trash2, X } from 'lucide-react';
import { MarketType } from '../types';
import { initialMarketTypes } from './mockData';

interface MarketTypeMasterProps {
  onBack: () => void;
}

const MarketTypeMaster: React.FC<MarketTypeMasterProps> = ({ onBack }) => {
  const [marketTypes, setMarketTypes] = useState<MarketType[]>(initialMarketTypes);
  const [showAddMarketTypeModal, setShowAddMarketTypeModal] = useState(false);
  const [marketTypeSearch, setMarketTypeSearch] = useState('');
  const [marketTypeStatusFilter, setMarketTypeStatusFilter] = useState('All');
  const [newMarketType, setNewMarketType] = useState<Partial<MarketType>>({ status: 'Active', isDefault: 'No', color: '#3b82f6' });

  const handleEditMarketType = (mt: MarketType) => { setNewMarketType({ ...mt }); setShowAddMarketTypeModal(true); };
  const handleDeleteMarketType = (id: string, e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (window.confirm('Delete market type?')) setMarketTypes(prev => prev.filter(mt => mt.id !== id));
  };
  const handleSaveMarketType = () => {
    if (!newMarketType.name) return;
    if (newMarketType.id) {
      setMarketTypes(prev => prev.map(mt => mt.id === newMarketType.id ? { ...mt, ...newMarketType } as MarketType : mt));
    } else {
      setMarketTypes(prev => [...prev, { 
        id: Math.random().toString(), 
        name: newMarketType.name!, 
        color: newMarketType.color || '#3b82f6',
        isDefault: newMarketType.isDefault || 'No', 
        status: newMarketType.status || 'Active', 
        addedBy: 'Admin', 
        dateAdded: new Date().toISOString().split('T')[0]
      }]);
    }
    setShowAddMarketTypeModal(false); setNewMarketType({ status: 'Active', isDefault: 'No', color: '#3b82f6' });
  };

  const filteredMarketTypes = marketTypes.filter(mt => {
    return (marketTypeStatusFilter === 'All' || mt.status === marketTypeStatusFilter) &&
           mt.name.toLowerCase().includes(marketTypeSearch.toLowerCase());
  });

  return (
    <div className="h-full flex flex-col animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500"><ArrowLeft size={20} /></button>
          <div><h2 className="text-2xl font-bold text-slate-800">Market Type Master</h2><p className="text-sm text-slate-500">Manage market categories</p></div>
        </div>
        <div className="flex items-center gap-3">
           <button className="bg-white border border-slate-300 text-slate-600 px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-50 text-sm font-medium shadow-sm"><Download size={16}/> Sample</button>
           <label className="bg-white border border-slate-300 text-slate-600 px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-50 text-sm font-medium shadow-sm cursor-pointer"><Upload size={16}/> Import<input type="file" className="hidden" accept=".csv,.xlsx"/></label>
           <button onClick={() => { setNewMarketType({ status: 'Active', isDefault: 'No', color: '#3b82f6' }); setShowAddMarketTypeModal(true); }} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm text-sm font-medium"><Plus size={18} /> Add Market Type</button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
         <div className="relative flex-1 w-full max-w-md">
            <label className="absolute -top-2 left-2 px-1 bg-white text-[10px] font-semibold text-slate-500">Keyword</label>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input type="text" value={marketTypeSearch} onChange={(e) => setMarketTypeSearch(e.target.value)} placeholder="Search Market Type" className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
         </div>
         <div className="relative w-full md:w-48">
            <label className="absolute -top-2 left-2 px-1 bg-white text-[10px] font-semibold text-slate-500">Select Status</label>
            <select value={marketTypeStatusFilter} onChange={(e) => setMarketTypeStatusFilter(e.target.value)} className="w-full pl-3 pr-8 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
               <option value="All">All Status</option>
               <option value="Active">Active</option>
               <option value="Inactive">Inactive</option>
            </select>
         </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 flex-1 overflow-hidden flex flex-col">
         <div className="overflow-x-auto flex-1">
            <table className="w-full text-left">
               <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                     <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Sr.</th>
                     <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Market Name</th>
                     <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Color</th>
                     <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Added By</th>
                     <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Date Added</th>
                     <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Status</th>
                     <th className="px-6 py-3 text-right text-xs font-bold text-slate-500 uppercase">Action</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {filteredMarketTypes.map((mt, index) => (
                     <tr key={mt.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 text-sm text-slate-500">{index + 1}</td>
                        <td className="px-6 py-4 font-medium text-slate-800">{mt.name}</td>
                        <td className="px-6 py-4">
                           <div className="w-16 h-4 rounded-full border border-slate-200" style={{ backgroundColor: mt.color }}></div>
                        </td>
                        <td className="px-6 py-4 text-xs text-slate-500">{mt.addedBy}</td>
                        <td className="px-6 py-4 text-xs text-slate-500">{mt.dateAdded}</td>
                        <td className="px-6 py-4"><span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${mt.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{mt.status}</span></td>
                        <td className="px-6 py-4 text-right">
                           <div className="flex items-center justify-end gap-2">
                              <button onClick={() => handleEditMarketType(mt)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded"><Edit2 size={16}/></button>
                              <button onClick={(e) => handleDeleteMarketType(mt.id, e)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded"><Trash2 size={16}/></button>
                           </div>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      {showAddMarketTypeModal && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
               <div className="bg-slate-800 px-6 py-4 flex justify-between items-center"><h3 className="text-lg font-bold text-white">{newMarketType.id ? 'Edit Market Type' : 'Add Market Type'}</h3><button onClick={() => setShowAddMarketTypeModal(false)} className="text-slate-400 hover:text-white"><X size={20} /></button></div>
               <div className="p-6 space-y-4">
                  <div>
                     <label className="block text-xs font-semibold text-slate-500 mb-1">Market Name</label>
                     <input type="text" value={newMarketType.name || ''} onChange={(e) => setNewMarketType({...newMarketType, name: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/><div className="h-0.5 w-8 bg-red-500 mt-1"></div>
                  </div>
                  <div>
                     <label className="block text-xs font-semibold text-slate-500 mb-1">Select Color:</label>
                     <div className="flex items-center gap-2">
                        <input type="color" value={newMarketType.color} onChange={(e) => setNewMarketType({...newMarketType, color: e.target.value})} className="h-10 w-full p-1 border border-slate-300 rounded-lg cursor-pointer" />
                        <div className="h-10 w-10 border border-slate-300 rounded-lg shrink-0" style={{ backgroundColor: newMarketType.color }}></div>
                     </div>
                  </div>
                  <div>
                     <label className="block text-xs font-semibold text-slate-500 mb-1">Set Default</label>
                     <select value={newMarketType.isDefault} onChange={(e) => setNewMarketType({...newMarketType, isDefault: e.target.value as any})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white">
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                     </select>
                  </div>
                  <div>
                     <label className="block text-xs font-semibold text-slate-500 mb-1">Status</label>
                     <select value={newMarketType.status} onChange={(e) => setNewMarketType({...newMarketType, status: e.target.value as any})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white">
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                     </select>
                  </div>
               </div>
               <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-center gap-3"><button onClick={handleSaveMarketType} className="px-8 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full text-sm font-medium">Save</button><button onClick={() => setShowAddMarketTypeModal(false)} className="px-8 py-2 bg-white border border-slate-300 text-slate-600 rounded-full text-sm font-medium hover:bg-slate-50">Cancel</button></div>
            </div>
         </div>
      )}
    </div>
  );
};

export default MarketTypeMaster;
