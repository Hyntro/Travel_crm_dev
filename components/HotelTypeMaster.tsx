
import React, { useState } from 'react';
import { ArrowLeft, Download, Upload, Plus, Search, Edit2, Trash2, X, FileSpreadsheet } from 'lucide-react';
import { HotelType } from '../types';
import { initialHotelTypes } from './mockData';

interface HotelTypeMasterProps {
  onBack: () => void;
}

const HotelTypeMaster: React.FC<HotelTypeMasterProps> = ({ onBack }) => {
  const [hotelTypes, setHotelTypes] = useState<HotelType[]>(initialHotelTypes);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentType, setCurrentType] = useState<Partial<HotelType>>({ status: 'Active', isHouseBoat: 'No' });

  const handleEdit = (type: HotelType) => {
    setCurrentType({ ...type });
    setShowModal(true);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this hotel type?')) {
      setHotelTypes(prev => prev.filter(t => t.id !== id));
    }
  };

  const handleSave = () => {
    if (!currentType.name) return;

    if (currentType.id) {
      setHotelTypes(prev => prev.map(t => t.id === currentType.id ? { ...t, ...currentType } as HotelType : t));
    } else {
      const newType: HotelType = {
        id: Math.random().toString(),
        name: currentType.name!,
        keyword: currentType.keyword || '',
        isHouseBoat: currentType.isHouseBoat || 'No',
        status: currentType.status || 'Active',
        createdBy: 'Demo',
        modifiedBy: 'Demo'
      };
      setHotelTypes(prev => [...prev, newType]);
    }
    setShowModal(false);
    setCurrentType({ status: 'Active', isHouseBoat: 'No' });
  };

  const filteredTypes = hotelTypes.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || t.status === statusFilter;
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
            <h2 className="text-2xl font-bold text-slate-800">Hotel Type Master</h2>
            <p className="text-sm text-slate-500">Manage hotel types and classifications</p>
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
             onClick={() => { setCurrentType({ status: 'Active', isHouseBoat: 'No' }); setShowModal(true); }} 
             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm text-sm font-medium"
           >
             <Plus size={18} /> Add Hotel Type
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
              placeholder="Search Hotel Type" 
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
                     <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">#</th>
                     <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Name</th>
                     <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Upload Keyword</th>
                     <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Is House-Boat</th>
                     <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Created By</th>
                     <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Modified By</th>
                     <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Status</th>
                     <th className="px-6 py-3 text-right text-xs font-bold text-slate-500 uppercase">Action</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {filteredTypes.map((type, index) => (
                     <tr key={type.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 text-sm text-slate-500">{index + 1}</td>
                        <td className="px-6 py-4 font-medium text-slate-800">{type.name}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{type.keyword}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{type.isHouseBoat}</td>
                        <td className="px-6 py-4 text-xs text-slate-500">{type.createdBy}</td>
                        <td className="px-6 py-4 text-xs text-slate-500">{type.modifiedBy}</td>
                        <td className="px-6 py-4">
                           <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${type.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {type.status}
                           </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                           <div className="flex items-center justify-end gap-2">
                              <button onClick={() => handleEdit(type)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded">
                                <Edit2 size={16}/>
                              </button>
                              <button onClick={(e) => handleDelete(type.id, e)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded">
                                <Trash2 size={16}/>
                              </button>
                           </div>
                        </td>
                     </tr>
                  ))}
                  {filteredTypes.length === 0 && (
                    <tr>
                      <td colSpan={8} className="px-6 py-8 text-center text-slate-400 text-sm">No hotel types found.</td>
                    </tr>
                  )}
               </tbody>
            </table>
         </div>
      </div>

      {/* Modal */}
      {showModal && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
               <div className="bg-slate-800 px-6 py-4 flex justify-between items-center">
                  <h3 className="text-lg font-bold text-white">{currentType.id ? 'Edit Hotel Type' : 'Add Hotel Type'}</h3>
                  <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                    <X size={20} />
                  </button>
               </div>
               <div className="p-6 space-y-4">
                  <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Name</label>
                      <input 
                        type="text" 
                        value={currentType.name || ''} 
                        onChange={(e) => setCurrentType({...currentType, name: e.target.value})} 
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <div className="h-0.5 w-8 bg-red-500 mt-1"></div>
                  </div>
                  <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Upload Keyword</label>
                      <input 
                        type="text" 
                        value={currentType.keyword || ''} 
                        onChange={(e) => setCurrentType({...currentType, keyword: e.target.value})} 
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <div className="h-0.5 w-8 bg-red-500 mt-1"></div>
                  </div>
                  <div>
                     <label className="block text-xs font-semibold text-slate-500 mb-1">status</label>
                     <select 
                        value={currentType.status} 
                        onChange={(e) => setCurrentType({...currentType, status: e.target.value as any})} 
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                     >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                     </select>
                  </div>
                  <div>
                     <label className="block text-xs font-semibold text-slate-500 mb-1">Is House-Boat</label>
                     <select 
                        value={currentType.isHouseBoat} 
                        onChange={(e) => setCurrentType({...currentType, isHouseBoat: e.target.value as any})} 
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                     >
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                     </select>
                  </div>
               </div>
               <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-center gap-3">
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

export default HotelTypeMaster;
