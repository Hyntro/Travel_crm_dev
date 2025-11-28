
import React, { useState } from 'react';
import { ArrowLeft, Plus, Search, Edit2, Trash2, X, Image as ImageIcon } from 'lucide-react';
import { Amenity } from '../types';
import { initialAmenities } from './mockData';

interface AmenitiesMasterProps {
  onBack: () => void;
}

const AmenitiesMaster: React.FC<AmenitiesMasterProps> = ({ onBack }) => {
  const [amenities, setAmenities] = useState<Amenity[]>(initialAmenities);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentAmenity, setCurrentAmenity] = useState<Partial<Amenity>>({ status: 'Active', isDefault: false });

  const handleEdit = (amenity: Amenity) => {
    setCurrentAmenity({ ...amenity });
    setShowModal(true);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this amenity?')) {
      setAmenities(prev => prev.filter(a => a.id !== id));
    }
  };

  const handleSave = () => {
    if (!currentAmenity.name) return;

    if (currentAmenity.id) {
      setAmenities(prev => prev.map(a => a.id === currentAmenity.id ? { ...a, ...currentAmenity } as Amenity : a));
    } else {
      const newAmenity: Amenity = {
        id: Math.random().toString(),
        name: currentAmenity.name,
        image: currentAmenity.image || '',
        isDefault: currentAmenity.isDefault || false,
        status: currentAmenity.status || 'Active',
        createdBy: 'Demo',
        modifiedBy: 'Demo'
      };
      setAmenities(prev => [...prev, newAmenity]);
    }
    setShowModal(false);
    setCurrentAmenity({ status: 'Active', isDefault: false });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentAmenity(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredAmenities = amenities.filter(a => {
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
            <h2 className="text-2xl font-bold text-slate-800">Amenities Master</h2>
            <p className="text-sm text-slate-500">Manage hotel and room amenities</p>
          </div>
        </div>
        <button 
          onClick={() => { setCurrentAmenity({ status: 'Active', isDefault: false }); setShowModal(true); }} 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm text-sm font-medium"
        >
          <Plus size={18} /> Add Amenities
        </button>
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
              placeholder="Search Amenities" 
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
                     <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">SN</th>
                     <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Amenity Image</th>
                     <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Name</th>
                     <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Created By</th>
                     <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Modified By</th>
                     <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Status</th>
                     <th className="px-6 py-3 text-right text-xs font-bold text-slate-500 uppercase">Action</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {filteredAmenities.map((amenity, index) => (
                     <tr key={amenity.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 text-sm text-slate-500">{index + 1}</td>
                        <td className="px-6 py-4">
                           <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center overflow-hidden border border-slate-200">
                              {amenity.image ? (
                                <img src={amenity.image} alt={amenity.name} className="w-full h-full object-cover" />
                              ) : (
                                <ImageIcon size={18} className="text-slate-400" />
                              )}
                           </div>
                        </td>
                        <td className="px-6 py-4 font-medium text-slate-800">{amenity.name}</td>
                        <td className="px-6 py-4 text-xs text-slate-500">{amenity.createdBy}</td>
                        <td className="px-6 py-4 text-xs text-slate-500">{amenity.modifiedBy}</td>
                        <td className="px-6 py-4">
                           <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${amenity.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {amenity.status}
                           </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                           <div className="flex items-center justify-end gap-2">
                              <button onClick={() => handleEdit(amenity)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded">
                                <Edit2 size={16}/>
                              </button>
                              <button onClick={(e) => handleDelete(amenity.id, e)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded">
                                <Trash2 size={16}/>
                              </button>
                           </div>
                        </td>
                     </tr>
                  ))}
                  {filteredAmenities.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-6 py-8 text-center text-slate-400 text-sm">No amenities found.</td>
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
                  <h3 className="text-lg font-bold text-white">{currentAmenity.id ? 'Edit Amenities' : 'Add Amenities'}</h3>
                  <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                    <X size={20} />
                  </button>
               </div>
               <div className="p-6 space-y-4">
                  <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Name</label>
                      <input 
                        type="text" 
                        value={currentAmenity.name || ''} 
                        onChange={(e) => setCurrentAmenity({...currentAmenity, name: e.target.value})} 
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <div className="h-0.5 w-8 bg-red-500 mt-1"></div>
                  </div>
                  <div>
                     <label className="block text-xs font-semibold text-slate-500 mb-1">status</label>
                     <select 
                        value={currentAmenity.status} 
                        onChange={(e) => setCurrentAmenity({...currentAmenity, status: e.target.value as any})} 
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                     >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                     </select>
                  </div>
                  <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Amenity Image</label>
                      <div className="flex items-center gap-2">
                        <label className="cursor-pointer bg-white border border-slate-300 text-slate-600 px-3 py-2 rounded-lg hover:bg-slate-50 text-sm font-medium shadow-sm transition-colors">
                          Choose File
                          <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                        </label>
                        <span className="text-sm text-slate-500 truncate max-w-[200px]">
                          {currentAmenity.image ? 'Image selected' : 'No file chosen'}
                        </span>
                      </div>
                      <div className="h-0.5 w-8 bg-red-500 mt-1"></div>
                  </div>
                  <div className="flex items-center gap-2">
                     <input 
                       type="checkbox" 
                       id="setDefault"
                       checked={currentAmenity.isDefault || false}
                       onChange={(e) => setCurrentAmenity({...currentAmenity, isDefault: e.target.checked})}
                       className="rounded text-blue-600 focus:ring-blue-500"
                     />
                     <label htmlFor="setDefault" className="text-sm text-slate-700">Set Default</label>
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

export default AmenitiesMaster;
