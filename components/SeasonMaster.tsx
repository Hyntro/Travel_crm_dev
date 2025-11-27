
import React, { useState } from 'react';
import { ArrowLeft, Download, Upload, Plus, Search, Edit2, Trash2, X, Calendar } from 'lucide-react';
import { Season } from '../types';
import { initialSeasons } from './mockData';

interface SeasonMasterProps {
  onBack: () => void;
}

const SeasonMaster: React.FC<SeasonMasterProps> = ({ onBack }) => {
  const [seasons, setSeasons] = useState<Season[]>(initialSeasons);
  const [showAddSeasonModal, setShowAddSeasonModal] = useState(false);
  const [seasonSearch, setSeasonSearch] = useState('');
  const [seasonStatusFilter, setSeasonStatusFilter] = useState('All');
  const [newSeason, setNewSeason] = useState<Partial<Season>>({ status: 'Active' });

  const handleEditSeason = (season: Season) => { setNewSeason({ ...season }); setShowAddSeasonModal(true); };
  const handleDeleteSeason = (id: string, e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (window.confirm('Delete season?')) setSeasons(prev => prev.filter(s => s.id !== id));
  };
  
  const handleSaveSeason = () => {
    if (!newSeason.name || !newSeason.fromDate || !newSeason.toDate) return;
    
    if (newSeason.id) {
      setSeasons(prev => prev.map(s => s.id === newSeason.id ? { ...s, ...newSeason } as Season : s));
    } else {
      setSeasons(prev => [...prev, { 
        id: Math.random().toString(), 
        name: newSeason.name!, 
        fromDate: newSeason.fromDate!,
        toDate: newSeason.toDate!,
        status: newSeason.status || 'Active'
      }]);
    }
    setShowAddSeasonModal(false); 
    setNewSeason({ status: 'Active' });
  };

  const filteredSeasons = seasons.filter(s => {
    return (seasonStatusFilter === 'All' || s.status === seasonStatusFilter) &&
           s.name.toLowerCase().includes(seasonSearch.toLowerCase());
  });

  return (
    <div className="h-full flex flex-col animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Season Master</h2>
            <p className="text-sm text-slate-500">Manage tourism seasons and validity dates</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
           <button className="bg-white border border-slate-300 text-slate-600 px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-50 text-sm font-medium shadow-sm"><Download size={16}/> Sample</button>
           <label className="bg-white border border-slate-300 text-slate-600 px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-50 text-sm font-medium shadow-sm cursor-pointer"><Upload size={16}/> Import<input type="file" className="hidden" accept=".csv,.xlsx"/></label>
           <button onClick={() => { setNewSeason({ status: 'Active' }); setShowAddSeasonModal(true); }} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm text-sm font-medium"><Plus size={18} /> Add Season</button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
         <div className="relative flex-1 w-full max-w-md">
            <label className="absolute -top-2 left-2 px-1 bg-white text-[10px] font-semibold text-slate-500">Keyword</label>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input type="text" value={seasonSearch} onChange={(e) => setSeasonSearch(e.target.value)} placeholder="Search Season Name..." className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
         </div>
         <div className="relative w-full md:w-48">
            <label className="absolute -top-2 left-2 px-1 bg-white text-[10px] font-semibold text-slate-500">Select Status</label>
            <select value={seasonStatusFilter} onChange={(e) => setSeasonStatusFilter(e.target.value)} className="w-full pl-3 pr-8 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
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
                     <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Season Name</th>
                     <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">From Date</th>
                     <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">To Date</th>
                     <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Status</th>
                     <th className="px-6 py-3 text-right text-xs font-bold text-slate-500 uppercase">Action</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {filteredSeasons.map((season, index) => (
                     <tr key={season.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 text-sm text-slate-500">{index + 1}</td>
                        <td className="px-6 py-4 font-medium text-slate-800">{season.name}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{season.fromDate}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{season.toDate}</td>
                        <td className="px-6 py-4">
                           <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${season.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {season.status}
                           </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                           <div className="flex items-center justify-end gap-2">
                              <button onClick={() => handleEditSeason(season)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded"><Edit2 size={16}/></button>
                              <button onClick={(e) => handleDeleteSeason(season.id, e)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded"><Trash2 size={16}/></button>
                           </div>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      {/* Modal */}
      {showAddSeasonModal && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
               <div className="bg-slate-800 px-6 py-4 flex justify-between items-center">
                  <h3 className="text-lg font-bold text-white">{newSeason.id ? 'Edit Season Type' : 'Season Type'}</h3>
                  <button onClick={() => setShowAddSeasonModal(false)} className="text-slate-400 hover:text-white"><X size={20} /></button>
               </div>
               <div className="p-6 space-y-6">
                  <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Season Name</label>
                      <select 
                        value={newSeason.name} 
                        onChange={(e) => setNewSeason({...newSeason, name: e.target.value})} 
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                         <option value="">Select Season</option>
                         <option value="Summer">Summer</option>
                         <option value="Winter">Winter</option>
                         <option value="Monsoon">Monsoon</option>
                         <option value="Peak">Peak</option>
                         <option value="Off-Peak">Off-Peak</option>
                         <option value="Shoulder">Shoulder</option>
                         <option value="Festival">Festival</option>
                      </select>
                      <div className="h-0.5 w-8 bg-red-500 mt-1"></div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1">From Date</label>
                        <div className="relative">
                           <input 
                              type="date" 
                              value={newSeason.fromDate || ''} 
                              onChange={(e) => setNewSeason({...newSeason, fromDate: e.target.value})} 
                              className="w-full pl-3 pr-8 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                           />
                           <Calendar className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
                        </div>
                     </div>
                     <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1">To Date</label>
                        <div className="relative">
                           <input 
                              type="date" 
                              value={newSeason.toDate || ''} 
                              onChange={(e) => setNewSeason({...newSeason, toDate: e.target.value})} 
                              className="w-full pl-3 pr-8 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                           />
                           <Calendar className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
                        </div>
                     </div>
                  </div>

                  <div>
                     <label className="block text-xs font-semibold text-slate-500 mb-1">Status</label>
                     <select 
                        value={newSeason.status} 
                        onChange={(e) => setNewSeason({...newSeason, status: e.target.value as any})} 
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                     >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                     </select>
                     <div className="h-0.5 w-8 bg-red-500 mt-1"></div>
                  </div>
               </div>
               <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-center gap-3">
                  <button onClick={handleSaveSeason} className="px-8 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full text-sm font-medium">Save</button>
                  <button onClick={() => setShowAddSeasonModal(false)} className="px-8 py-2 bg-white border border-slate-300 text-slate-600 rounded-full text-sm font-medium hover:bg-slate-50">Cancel</button>
               </div>
            </div>
         </div>
      )}
    </div>
  );
};

export default SeasonMaster;
