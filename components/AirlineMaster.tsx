
import React, { useState } from 'react';
import { ArrowLeft, Download, Upload, Plus, Search, Edit2, Trash2, X, History, FileSpreadsheet, Image as ImageIcon } from 'lucide-react';
import { Airline } from '../types';
import { initialAirlines } from './mockData';

interface AirlineMasterProps {
  onBack: () => void;
}

const AirlineMaster: React.FC<AirlineMasterProps> = ({ onBack }) => {
  const [airlines, setAirlines] = useState<Airline[]>(initialAirlines);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  const [currentAirline, setCurrentAirline] = useState<Partial<Airline>>({ 
    status: 'Active'
  });

  const handleEdit = (airline: Airline) => {
    setCurrentAirline({ ...airline });
    setShowModal(true);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (window.confirm('Delete airline?')) {
      setAirlines(prev => prev.filter(a => a.id !== id));
    }
  };

  const handleSave = () => {
    if (!currentAirline.name) return;

    const newAirline: Airline = {
        id: currentAirline.id || Math.random().toString(),
        name: currentAirline.name,
        image: currentAirline.image || '',
        status: currentAirline.status || 'Active',
        createdBy: 'Admin',
        modifiedBy: 'Admin'
    };

    if (currentAirline.id) {
        setAirlines(prev => prev.map(a => a.id === currentAirline.id ? newAirline : a));
    } else {
        setAirlines(prev => [...prev, newAirline]);
    }
    setShowModal(false);
    setCurrentAirline({ status: 'Active' });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentAirline(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredAirlines = airlines.filter(a => {
    const matchesSearch = a.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || a.status === statusFilter;
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
            <h2 className="text-2xl font-bold text-slate-800">Airline</h2>
            <p className="text-sm text-slate-500">Manage airline partners</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
           <button className="bg-white border border-slate-300 text-slate-600 px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-50 text-sm font-medium shadow-sm">
             <History size={16}/> View Logs
           </button>
           <button className="bg-white border border-slate-300 text-slate-600 px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-50 text-sm font-medium shadow-sm">
             <FileSpreadsheet size={16}/> Download Format
           </button>
           <label className="bg-white border border-slate-300 text-slate-600 px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-50 text-sm font-medium shadow-sm cursor-pointer">
             <Upload size={16}/> Import Excel
             <input type="file" className="hidden" accept=".csv,.xlsx"/>
           </label>
           <button 
             onClick={() => { setCurrentAirline({ status: 'Active' }); setShowModal(true); }} 
             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm text-sm font-medium"
           >
             <Plus size={18} /> Add Airline
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
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Image</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Airline Name</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Status</th>
                     <th className="px-4 py-3 text-right text-xs font-bold text-slate-500 uppercase">Action</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {filteredAirlines.map((airline, index) => (
                     <tr key={airline.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3 text-sm text-slate-500">{index + 1}</td>
                        <td className="px-4 py-3">
                            <div className="w-10 h-10 bg-slate-200 rounded flex items-center justify-center overflow-hidden border border-slate-200">
                                {airline.image ? <img src={airline.image} alt={airline.name} className="w-full h-full object-cover"/> : <ImageIcon size={16} className="text-slate-400"/>}
                            </div>
                        </td>
                        <td className="px-4 py-3 font-medium text-slate-800">{airline.name}</td>
                        <td className="px-4 py-3">
                           <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${airline.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {airline.status}
                           </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                           <div className="flex items-center justify-end gap-2">
                              <button onClick={() => handleEdit(airline)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded">
                                <Edit2 size={16}/>
                              </button>
                              <button onClick={(e) => handleDelete(airline.id, e)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded">
                                <Trash2 size={16}/>
                              </button>
                           </div>
                        </td>
                     </tr>
                  ))}
                  {filteredAirlines.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-slate-400 text-sm">No airlines found.</td>
                    </tr>
                  )}
               </tbody>
            </table>
         </div>
      </div>

      {/* Modal */}
      {showModal && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col">
               <div className="bg-slate-800 px-6 py-4 flex justify-between items-center">
                  <h3 className="text-lg font-bold text-white">{currentAirline.id ? 'Edit Airline' : 'Add Airline'}</h3>
                  <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                    <X size={20} />
                  </button>
               </div>
               
               <div className="p-6 space-y-4 overflow-y-auto flex-1">
                  
                  <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Airline Name</label>
                      <input 
                        type="text" 
                        value={currentAirline.name || ''} 
                        onChange={(e) => setCurrentAirline({...currentAirline, name: e.target.value})} 
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-l-4 border-l-red-500"
                      />
                  </div>
                  
                  <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Photo</label>
                      <div className="flex items-center gap-2">
                        <label className="cursor-pointer bg-white border border-slate-300 text-slate-600 px-3 py-2 rounded-lg hover:bg-slate-50 text-sm font-medium shadow-sm transition-colors">
                          Choose File
                          <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                        </label>
                        <span className="text-xs text-slate-400 truncate max-w-[200px]">
                          {currentAirline.image ? 'Image selected' : 'No file chosen'}
                        </span>
                      </div>
                  </div>

                  <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">status</label>
                      <select 
                        value={currentAirline.status} 
                        onChange={(e) => setCurrentAirline({...currentAirline, status: e.target.value as any})} 
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

export default AirlineMaster;
