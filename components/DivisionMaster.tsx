
import React, { useState } from 'react';
import { ArrowLeft, Download, Upload, Plus, Search, Edit2, Trash2, X } from 'lucide-react';
import { Division } from '../types';
import { initialDivisions } from './mockData';

interface DivisionMasterProps {
  onBack: () => void;
}

const DivisionMaster: React.FC<DivisionMasterProps> = ({ onBack }) => {
  const [divisions, setDivisions] = useState<Division[]>(initialDivisions);
  const [showAddDivisionModal, setShowAddDivisionModal] = useState(false);
  const [divisionSearch, setDivisionSearch] = useState('');
  const [divisionStatusFilter, setDivisionStatusFilter] = useState('All');
  const [newDivision, setNewDivision] = useState<Partial<Division>>({ status: 'Active' });

  const handleEditDivision = (div: Division) => { setNewDivision({ ...div }); setShowAddDivisionModal(true); };
  const handleDeleteDivision = (id: string, e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (window.confirm('Delete division?')) setDivisions(prev => prev.filter(d => d.id !== id));
  };
  const handleSaveDivision = () => {
    if (!newDivision.name) return; // Basic validation
    if (newDivision.id) {
      setDivisions(prev => prev.map(d => d.id === newDivision.id ? { ...d, ...newDivision } as Division : d));
    } else {
      setDivisions(prev => [...prev, {
        id: Math.random().toString(),
        division: newDivision.division || '',
        keyword: newDivision.keyword || '',
        name: newDivision.name!,
        status: newDivision.status || 'Active',
        createdBy: 'Demo',
        modifiedBy: 'Demo'
      }]);
    }
    setShowAddDivisionModal(false);
    setNewDivision({ status: 'Active' });
  };

  const filteredDivisions = divisions.filter(d => {
    return (divisionStatusFilter === 'All' || d.status === divisionStatusFilter) &&
           (d.name.toLowerCase().includes(divisionSearch.toLowerCase()) || 
            d.division.toLowerCase().includes(divisionSearch.toLowerCase()) ||
            d.keyword.toLowerCase().includes(divisionSearch.toLowerCase()));
  });

  return (
    <div className="h-full flex flex-col animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500"><ArrowLeft size={20} /></button>
          <div><h2 className="text-2xl font-bold text-slate-800">Division Master</h2><p className="text-sm text-slate-500">Manage business divisions</p></div>
        </div>
        <div className="flex items-center gap-3">
           <button className="bg-white border border-slate-300 text-slate-600 px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-50 text-sm font-medium shadow-sm"><Download size={16}/> Sample</button>
           <label className="bg-white border border-slate-300 text-slate-600 px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-50 text-sm font-medium shadow-sm cursor-pointer"><Upload size={16}/> Import<input type="file" className="hidden" accept=".csv,.xlsx"/></label>
           <button onClick={() => { setNewDivision({ status: 'Active' }); setShowAddDivisionModal(true); }} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm text-sm font-medium"><Plus size={18} /> Add Division</button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
         <div className="relative flex-1 w-full max-w-md">
            <label className="absolute -top-2 left-2 px-1 bg-white text-[10px] font-semibold text-slate-500">Keyword</label>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input type="text" value={divisionSearch} onChange={(e) => setDivisionSearch(e.target.value)} placeholder="Search Division, Keyword..." className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
         </div>
         <div className="relative w-full md:w-48">
            <label className="absolute -top-2 left-2 px-1 bg-white text-[10px] font-semibold text-slate-500">Select Status</label>
            <select value={divisionStatusFilter} onChange={(e) => setDivisionStatusFilter(e.target.value)} className="w-full pl-3 pr-8 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
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
                     <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Division</th>
                     <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Keyword</th>
                     <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Name</th>
                     <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Created By</th>
                     <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Modified By</th>
                     <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Status</th>
                     <th className="px-6 py-3 text-right text-xs font-bold text-slate-500 uppercase">Action</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {filteredDivisions.map((div) => (
                     <tr key={div.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-medium text-slate-800">{div.division}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{div.keyword}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{div.name}</td>
                        <td className="px-6 py-4 text-xs text-slate-500">{div.createdBy}</td>
                        <td className="px-6 py-4 text-xs text-slate-500">{div.modifiedBy}</td>
                        <td className="px-6 py-4"><span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${div.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{div.status}</span></td>
                        <td className="px-6 py-4 text-right">
                           <div className="flex items-center justify-end gap-2">
                              <button onClick={() => handleEditDivision(div)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded"><Edit2 size={16}/></button>
                              <button onClick={(e) => handleDeleteDivision(div.id, e)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded"><Trash2 size={16}/></button>
                           </div>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      {/* Modal */}
      {showAddDivisionModal && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
               <div className="bg-slate-800 px-6 py-4 flex justify-between items-center"><h3 className="text-lg font-bold text-white">{newDivision.id ? 'Edit Division' : 'Add Division'}</h3><button onClick={() => setShowAddDivisionModal(false)} className="text-slate-400 hover:text-white"><X size={20} /></button></div>
               <div className="p-6 space-y-4">
                  <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Division</label>
                      <input type="text" value={newDivision.division || ''} onChange={(e) => setNewDivision({...newDivision, division: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                      <div className="h-0.5 w-8 bg-red-500 mt-1"></div>
                  </div>
                  <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Keyword</label>
                      <input type="text" value={newDivision.keyword || ''} onChange={(e) => setNewDivision({...newDivision, keyword: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                  </div>
                  <div>
                     <label className="block text-xs font-semibold text-slate-500 mb-1">Name</label>
                     <input type="text" value={newDivision.name || ''} onChange={(e) => setNewDivision({...newDivision, name: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                     <div className="h-0.5 w-8 bg-red-500 mt-1"></div>
                  </div>
                  <div>
                     <label className="block text-xs font-semibold text-slate-500 mb-1">Status</label>
                     <select value={newDivision.status} onChange={(e) => setNewDivision({...newDivision, status: e.target.value as any})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white">
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                     </select>
                  </div>
               </div>
               <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-center gap-3"><button onClick={handleSaveDivision} className="px-8 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full text-sm font-medium">Save</button><button onClick={() => setShowAddDivisionModal(false)} className="px-8 py-2 bg-white border border-slate-300 text-slate-600 rounded-full text-sm font-medium hover:bg-slate-50">Cancel</button></div>
            </div>
         </div>
      )}
    </div>
  );
};

export default DivisionMaster;
