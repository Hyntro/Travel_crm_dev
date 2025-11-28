
import React, { useState } from 'react';
import { ArrowLeft, Plus, Search, Edit2, Trash2, X, Image as ImageIcon, Bold, Italic, AlignLeft, List } from 'lucide-react';
import { VehicleType } from '../types';
import { initialVehicleTypes } from './mockData';

interface VehicleTypeMasterProps {
  onBack: () => void;
}

const VehicleTypeMaster: React.FC<VehicleTypeMasterProps> = ({ onBack }) => {
  const [vehicleTypes, setVehicleTypes] = useState<VehicleType[]>(initialVehicleTypes);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  const [currentVehicle, setCurrentVehicle] = useState<Partial<VehicleType>>({ 
    status: 'Active'
  });

  const handleEdit = (vehicle: VehicleType) => {
    setCurrentVehicle({ ...vehicle });
    setShowModal(true);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (window.confirm('Delete vehicle type?')) {
      setVehicleTypes(prev => prev.filter(v => v.id !== id));
    }
  };

  const handleSave = () => {
    if (!currentVehicle.name) return;

    const newVehicle: VehicleType = {
        id: currentVehicle.id || Math.random().toString(),
        name: currentVehicle.name,
        capacity: currentVehicle.capacity || '',
        status: currentVehicle.status || 'Active',
        createdBy: 'Admin',
        modifiedBy: 'Admin',
        description: currentVehicle.description || '',
        image: currentVehicle.image || ''
    };

    if (currentVehicle.id) {
        setVehicleTypes(prev => prev.map(v => v.id === currentVehicle.id ? newVehicle : v));
    } else {
        setVehicleTypes(prev => [...prev, newVehicle]);
    }
    setShowModal(false);
    resetForm();
  };

  const resetForm = () => {
    setCurrentVehicle({ 
      status: 'Active'
    });
  };

  const filteredVehicles = vehicleTypes.filter(v => {
    const matchesSearch = v.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || v.status === statusFilter;
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
            <h2 className="text-2xl font-bold text-slate-800">Vehicle Type Master</h2>
            <p className="text-sm text-slate-500">Manage vehicle categories and capacities</p>
          </div>
        </div>
        <button 
          onClick={() => { resetForm(); setShowModal(true); }} 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm text-sm font-medium"
        >
          <Plus size={18} /> Add Vehicle Type
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-6 flex flex-wrap gap-4 items-end">
         <div className="flex-1 min-w-[200px]">
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Vehicle Name</label>
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
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Sr.</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Vehicle Type</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Pax Capacity</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Image</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Created By</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Modified By</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Status</th>
                     <th className="px-4 py-3 text-right text-xs font-bold text-slate-500 uppercase">Action</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {filteredVehicles.map((vehicle, index) => (
                     <tr key={vehicle.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3 text-sm text-slate-500">{index + 1}</td>
                        <td className="px-4 py-3 font-medium text-slate-800">{vehicle.name}</td>
                        <td className="px-4 py-3 text-sm text-slate-600">{vehicle.capacity}</td>
                        <td className="px-4 py-3">
                            <ImageIcon size={16} className="text-slate-400"/>
                        </td>
                        <td className="px-4 py-3 text-xs text-slate-500">{vehicle.createdBy}</td>
                        <td className="px-4 py-3 text-xs text-slate-500">{vehicle.modifiedBy}</td>
                        <td className="px-4 py-3">
                           <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${vehicle.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {vehicle.status}
                           </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                           <div className="flex items-center justify-end gap-2">
                              <button onClick={() => handleEdit(vehicle)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded">
                                <Edit2 size={16}/>
                              </button>
                              <button onClick={(e) => handleDelete(vehicle.id, e)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded">
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
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
               <div className="bg-slate-800 px-6 py-4 flex justify-between items-center">
                  <h3 className="text-lg font-bold text-white">{currentVehicle.id ? 'Edit Vehicle Type' : 'Add Vehicle Type'}</h3>
                  <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                    <X size={20} />
                  </button>
               </div>
               
               <div className="p-6 space-y-4 overflow-y-auto flex-1">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Vehicle Type</label>
                          <input 
                            type="text" 
                            value={currentVehicle.name || ''} 
                            onChange={(e) => setCurrentVehicle({...currentVehicle, name: e.target.value})} 
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-l-4 border-l-red-500"
                          />
                      </div>
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Capacity</label>
                          <input 
                            type="text" 
                            value={currentVehicle.capacity || ''} 
                            onChange={(e) => setCurrentVehicle({...currentVehicle, capacity: e.target.value})} 
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-l-4 border-l-red-500"
                          />
                      </div>
                      
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Vehicle Image</label>
                          <div className="flex gap-2 items-center">
                             <button className="px-3 py-2 border border-slate-300 rounded text-sm bg-white hover:bg-slate-50">Choose File</button>
                             <span className="text-xs text-slate-400">No file chosen</span>
                          </div>
                      </div>
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Status</label>
                          <select 
                            value={currentVehicle.status} 
                            onChange={(e) => setCurrentVehicle({...currentVehicle, status: e.target.value as any})} 
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
                           <span>File</span><span>Edit</span><span>View</span><span>Insert</span><span>Format</span>
                        </div>
                        <div className="px-3 py-2 flex gap-3 text-slate-500 border-b border-slate-100">
                           <button className="hover:text-blue-600"><Bold size={14}/></button>
                           <button className="hover:text-blue-600"><Italic size={14}/></button>
                           <button className="hover:text-blue-600"><AlignLeft size={14}/></button>
                           <button className="hover:text-blue-600"><List size={14}/></button>
                        </div>
                        <textarea 
                          value={currentVehicle.description || ''}
                          onChange={e => setCurrentVehicle({...currentVehicle, description: e.target.value})}
                          className="w-full h-32 p-3 outline-none text-sm resize-none"
                        ></textarea>
                        <div className="bg-slate-50 border-t border-slate-300 px-3 py-1 text-[10px] text-slate-400 text-right">Powered by TinyMCE</div>
                     </div>
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

export default VehicleTypeMaster;
