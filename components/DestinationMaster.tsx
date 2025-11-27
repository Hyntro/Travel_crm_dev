
import React, { useState } from 'react';
import { ArrowLeft, Download, Upload, Plus, Search, Edit2, Trash2, X, History, FileJson, Eye, Image as ImageIcon } from 'lucide-react';
import { Destination } from '../types';
import { initialDestinations, initialCountries } from './mockData';

interface DestinationMasterProps {
  onBack: () => void;
}

const DestinationMaster: React.FC<DestinationMasterProps> = ({ onBack }) => {
  const [destinations, setDestinations] = useState<Destination[]>(initialDestinations);
  const [showAddDestinationModal, setShowAddDestinationModal] = useState(false);
  const [destinationSearch, setDestinationSearch] = useState('');
  const [destinationStatusFilter, setDestinationStatusFilter] = useState('All');
  const [newDestination, setNewDestination] = useState<Partial<Destination>>({ status: 'Active', countryId: '' });

  const handleEditDestination = (dest: Destination) => { setNewDestination({ ...dest }); setShowAddDestinationModal(true); };
  const handleDeleteDestination = (id: string, e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (window.confirm('Delete destination?')) setDestinations(prev => prev.filter(d => d.id !== id));
  };
  const handleSaveDestination = () => {
    if (!newDestination.name || !newDestination.countryId) return;
    const country = initialCountries.find(c => c.id === newDestination.countryId);
    if (newDestination.id) {
      setDestinations(prev => prev.map(d => d.id === newDestination.id ? { ...d, ...newDestination, countryName: country?.name || '' } as Destination : d));
    } else {
      setDestinations(prev => [...prev, { 
        id: Math.random().toString(), 
        serviceCode: `DEST${Math.floor(Math.random()*1000)}`,
        name: newDestination.name!, 
        countryId: newDestination.countryId!, 
        countryName: country?.name || '', 
        airportCode: newDestination.airportCode || '',
        latitude: newDestination.latitude || '',
        longitude: newDestination.longitude || '',
        description: newDestination.description || '',
        weatherInfo: newDestination.weatherInfo || '',
        additionalInfo: newDestination.additionalInfo || '',
        status: newDestination.status || 'Active', 
        createdBy: 'Demo', 
        modifiedBy: 'Demo' 
      }]);
    }
    setShowAddDestinationModal(false); setNewDestination({ status: 'Active', countryId: '' });
  };

  const filteredDestinations = destinations.filter(d => {
    return (destinationStatusFilter === 'All' || d.status === destinationStatusFilter) &&
           d.name.toLowerCase().includes(destinationSearch.toLowerCase());
  });

  return (
    <div className="h-full flex flex-col animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500"><ArrowLeft size={20} /></button>
          <div><h2 className="text-2xl font-bold text-slate-800">Destination Master</h2><p className="text-sm text-slate-500">Manage tour destinations and details</p></div>
        </div>
        <div className="flex items-center gap-3">
           <button className="bg-white border border-slate-300 text-slate-600 px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-50 text-sm font-medium shadow-sm"><History size={16}/> View Logs</button>
           <button className="bg-white border border-slate-300 text-slate-600 px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-50 text-sm font-medium shadow-sm"><Download size={16}/> Excel</button>
           <button className="bg-white border border-slate-300 text-slate-600 px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-50 text-sm font-medium shadow-sm"><FileJson size={16}/> Format</button>
           <label className="bg-white border border-slate-300 text-slate-600 px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-50 text-sm font-medium shadow-sm cursor-pointer"><Upload size={16}/> Import<input type="file" className="hidden" accept=".csv,.xlsx"/></label>
           <button onClick={() => { setNewDestination({ status: 'Active', countryId: '' }); setShowAddDestinationModal(true); }} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm text-sm font-medium"><Plus size={18} /> Add Destination</button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
         <div className="relative flex-1 w-full max-w-md">
            <label className="absolute -top-2 left-2 px-1 bg-white text-[10px] font-semibold text-slate-500">Destination Name</label>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input type="text" value={destinationSearch} onChange={(e) => setDestinationSearch(e.target.value)} placeholder="Search Destination" className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
         </div>
         <div className="relative w-full md:w-48">
            <label className="absolute -top-2 left-2 px-1 bg-white text-[10px] font-semibold text-slate-500">Select Status</label>
            <select value={destinationStatusFilter} onChange={(e) => setDestinationStatusFilter(e.target.value)} className="w-full pl-3 pr-8 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
               <option value="All">All Status</option>
               <option value="Active">Active</option>
               <option value="Inactive">Inactive</option>
            </select>
         </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 flex-1 overflow-hidden flex flex-col">
         <div className="overflow-x-auto flex-1">
            <table className="w-full text-left whitespace-nowrap">
               <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                     <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Service Code</th>
                     <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Country</th>
                     <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Destination</th>
                     <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Airport Code</th>
                     <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Coordinates</th>
                     <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Info</th>
                     <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Gallery</th>
                     <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Created By</th>
                     <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Status</th>
                     <th className="px-6 py-3 text-right text-xs font-bold text-slate-500 uppercase">Action</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {filteredDestinations.map((dest) => (
                     <tr key={dest.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 text-sm font-mono text-slate-500">{dest.serviceCode}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{dest.countryName}</td>
                        <td className="px-6 py-4 font-medium text-slate-800">{dest.name}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{dest.airportCode}</td>
                        <td className="px-6 py-4 text-xs text-slate-500">{dest.latitude}, {dest.longitude}</td>
                        <td className="px-6 py-4"><Eye size={16} className="text-blue-500 cursor-pointer"/></td>
                        <td className="px-6 py-4"><ImageIcon size={16} className="text-purple-500 cursor-pointer"/></td>
                        <td className="px-6 py-4 text-xs text-slate-500">{dest.createdBy}</td>
                        <td className="px-6 py-4"><span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${dest.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{dest.status}</span></td>
                        <td className="px-6 py-4 text-right">
                           <div className="flex items-center justify-end gap-2">
                              <button onClick={() => handleEditDestination(dest)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded"><Edit2 size={16}/></button>
                              <button onClick={(e) => handleDeleteDestination(dest.id, e)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded"><Trash2 size={16}/></button>
                           </div>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      {showAddDestinationModal && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
               <div className="bg-slate-800 px-6 py-4 flex justify-between items-center"><h3 className="text-lg font-bold text-white">{newDestination.id ? 'Edit Destination' : 'Add Destination'}</h3><button onClick={() => setShowAddDestinationModal(false)} className="text-slate-400 hover:text-white"><X size={20} /></button></div>
               <div className="p-6 space-y-6 overflow-y-auto flex-1">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div><label className="block text-xs font-semibold text-slate-500 mb-1">Country</label><select value={newDestination.countryId} onChange={(e) => setNewDestination({...newDestination, countryId: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"><option value="">Select Country</option>{initialCountries.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select><div className="h-0.5 w-8 bg-red-500 mt-1"></div></div>
                     <div><label className="block text-xs font-semibold text-slate-500 mb-1">Destination Name</label><input type="text" value={newDestination.name || ''} onChange={(e) => setNewDestination({...newDestination, name: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"/><div className="h-0.5 w-8 bg-red-500 mt-1"></div></div>
                     <div><label className="block text-xs font-semibold text-slate-500 mb-1">Airport Code</label><input type="text" value={newDestination.airportCode || ''} onChange={(e) => setNewDestination({...newDestination, airportCode: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"/></div>
                     <div className="grid grid-cols-2 gap-4">
                        <div><label className="block text-xs font-semibold text-slate-500 mb-1">Latitude</label><input type="text" value={newDestination.latitude || ''} onChange={(e) => setNewDestination({...newDestination, latitude: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"/></div>
                        <div><label className="block text-xs font-semibold text-slate-500 mb-1">Longitude</label><input type="text" value={newDestination.longitude || ''} onChange={(e) => setNewDestination({...newDestination, longitude: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"/></div>
                     </div>
                  </div>
                  
                  <div>
                     <label className="block text-xs font-semibold text-slate-500 mb-1">Destination Description (In English)</label>
                     <div className="border border-slate-300 rounded-lg overflow-hidden">
                        <div className="bg-slate-50 border-b border-slate-300 px-3 py-2 flex gap-3 text-slate-600">
                           <span className="font-bold cursor-pointer">B</span><span className="italic cursor-pointer">I</span><span className="underline cursor-pointer">U</span><span className="cursor-pointer line-through">S</span>
                           <div className="w-px bg-slate-300 mx-1"></div>
                           <span className="cursor-pointer text-xs">File</span><span className="cursor-pointer text-xs">Edit</span><span className="cursor-pointer text-xs">View</span>
                        </div>
                        <textarea className="w-full h-32 p-3 outline-none text-sm resize-none" value={newDestination.description || ''} onChange={(e) => setNewDestination({...newDestination, description: e.target.value})}></textarea>
                        <div className="bg-slate-50 border-t border-slate-300 px-3 py-1 text-[10px] text-slate-400 text-right">Powered by TinyMCE</div>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                      <div>
                         <label className="block text-xs font-semibold text-slate-500 mb-1">Weather Information</label>
                         <textarea className="w-full h-20 p-3 border border-slate-300 rounded-lg text-sm resize-none outline-none" value={newDestination.weatherInfo || ''} onChange={(e) => setNewDestination({...newDestination, weatherInfo: e.target.value})}></textarea>
                      </div>
                      <div>
                         <label className="block text-xs font-semibold text-slate-500 mb-1">Additional Information</label>
                         <textarea className="w-full h-20 p-3 border border-slate-300 rounded-lg text-sm resize-none outline-none" value={newDestination.additionalInfo || ''} onChange={(e) => setNewDestination({...newDestination, additionalInfo: e.target.value})}></textarea>
                      </div>
                  </div>

                  <div><label className="block text-xs font-semibold text-slate-500 mb-1">Status</label><select value={newDestination.status} onChange={(e) => setNewDestination({...newDestination, status: e.target.value as any})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"><option value="Active">Active</option><option value="Inactive">Inactive</option></select></div>
               </div>
               <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-center gap-3"><button onClick={handleSaveDestination} className="px-8 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full text-sm font-medium">Save</button><button onClick={() => setShowAddDestinationModal(false)} className="px-8 py-2 bg-white border border-slate-300 text-slate-600 rounded-full text-sm font-medium hover:bg-slate-50">Cancel</button></div>
            </div>
         </div>
      )}
    </div>
  );
};

export default DestinationMaster;
