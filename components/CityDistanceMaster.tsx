
import React, { useState } from 'react';
import { ArrowLeft, Plus, Search, Edit2, Trash2, X } from 'lucide-react';
import { CityDistance } from '../types';
import { initialCityDistances, initialDestinations } from './mockData';

interface CityDistanceMasterProps {
  onBack: () => void;
}

const CityDistanceMaster: React.FC<CityDistanceMasterProps> = ({ onBack }) => {
  const [cityDistances, setCityDistances] = useState<CityDistance[]>(initialCityDistances);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  const [currentDistance, setCurrentDistance] = useState<Partial<CityDistance>>({ 
    status: 'Active',
    toDestinations: Array(6).fill({ destinationId: '', destinationName: '', km: 0 })
  });

  const handleEdit = (dist: CityDistance) => {
    // Ensure 6 slots
    const filledDestinations = [...dist.toDestinations];
    while(filledDestinations.length < 6) {
        filledDestinations.push({ destinationId: '', destinationName: '', km: 0 });
    }
    setCurrentDistance({ ...dist, toDestinations: filledDestinations });
    setShowModal(true);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (window.confirm('Delete city distance?')) {
      setCityDistances(prev => prev.filter(d => d.id !== id));
    }
  };

  const handleSave = () => {
    if (!currentDistance.fromDestinationId) return;
    
    const fromName = initialDestinations.find(d => d.id === currentDistance.fromDestinationId)?.name || '';
    
    // Clean up empty destinations
    const validDestinations = currentDistance.toDestinations?.filter(d => d.destinationId) || [];

    const newDistance: CityDistance = {
        id: currentDistance.id || Math.random().toString(),
        fromDestinationId: currentDistance.fromDestinationId,
        fromDestinationName: fromName,
        toDestinations: validDestinations.map(d => ({
            ...d,
            destinationName: initialDestinations.find(id => id.id === d.destinationId)?.name || ''
        })),
        status: currentDistance.status || 'Active'
    };

    if (currentDistance.id) {
        setCityDistances(prev => prev.map(d => d.id === currentDistance.id ? newDistance : d));
    } else {
        setCityDistances(prev => [...prev, newDistance]);
    }
    setShowModal(false);
    resetForm();
  };

  const resetForm = () => {
    setCurrentDistance({ 
      status: 'Active',
      toDestinations: Array(6).fill({ destinationId: '', destinationName: '', km: 0 })
    });
  };

  const updateToDestination = (index: number, field: string, value: any) => {
      const updated = [...(currentDistance.toDestinations || [])];
      updated[index] = { ...updated[index], [field]: value };
      setCurrentDistance({ ...currentDistance, toDestinations: updated });
  };

  const filteredDistances = cityDistances.filter(d => {
    const matchesSearch = d.fromDestinationName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || d.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="h-full flex flex-col animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">City Distance Master</h2>
            <p className="text-sm text-slate-500">Manage distances between destinations</p>
          </div>
        </div>
        <button 
          onClick={() => { resetForm(); setShowModal(true); }} 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm text-sm font-medium"
        >
          <Plus size={18} /> Add City Distance
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-6 flex flex-wrap gap-4 items-end">
         <div className="flex-1 min-w-[200px]">
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
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 flex-1 overflow-hidden flex flex-col">
         <div className="overflow-x-auto flex-1">
            <table className="w-full text-left">
               <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">From Destination</th>
                     {[1, 2, 3, 4, 5, 6].map(i => (
                         <th key={i} className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Destination {i}</th>
                     ))}
                     <th className="px-4 py-3 text-right text-xs font-bold text-slate-500 uppercase">Action</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {filteredDistances.map((dist) => (
                     <tr key={dist.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3 text-sm font-medium text-slate-800">{dist.fromDestinationName}</td>
                        {[0, 1, 2, 3, 4, 5].map(i => (
                            <td key={i} className="px-4 py-3 text-xs text-slate-600">
                                {dist.toDestinations[i] ? `${dist.toDestinations[i].destinationName} (${dist.toDestinations[i].km} km)` : '-'}
                            </td>
                        ))}
                        <td className="px-4 py-3 text-right">
                           <div className="flex items-center justify-end gap-2">
                              <button onClick={() => handleEdit(dist)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded">
                                <Edit2 size={16}/>
                              </button>
                              <button onClick={(e) => handleDelete(dist.id, e)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded">
                                <Trash2 size={16}/>
                              </button>
                           </div>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      {showModal && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
               <div className="bg-slate-800 px-6 py-4 flex justify-between items-center">
                  <h3 className="text-lg font-bold text-white">{currentDistance.id ? 'Edit City Distance' : 'Add City Distance'}</h3>
                  <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                    <X size={20} />
                  </button>
               </div>
               
               <div className="p-6 space-y-4 overflow-y-auto flex-1">
                  <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">From Destination</label>
                      <select 
                        value={currentDistance.fromDestinationId} 
                        onChange={(e) => setCurrentDistance({...currentDistance, fromDestinationId: e.target.value})} 
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 border-l-4 border-l-red-500"
                      >
                         <option value="">Select</option>
                         {initialDestinations.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                      </select>
                  </div>

                  {currentDistance.toDestinations?.map((dest, idx) => (
                      <div key={idx} className="grid grid-cols-2 gap-4">
                          <div>
                              <label className="block text-xs font-semibold text-slate-500 mb-1">To Destination {idx + 1}</label>
                              <select 
                                value={dest.destinationId} 
                                onChange={(e) => updateToDestination(idx, 'destinationId', e.target.value)} 
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                 <option value="">Select</option>
                                 {initialDestinations.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                              </select>
                          </div>
                          <div>
                              <label className="block text-xs font-semibold text-slate-500 mb-1">In KM</label>
                              <input 
                                type="number" 
                                value={dest.km || ''} 
                                onChange={(e) => updateToDestination(idx, 'km', Number(e.target.value))} 
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                          </div>
                      </div>
                  ))}
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

export default CityDistanceMaster;
