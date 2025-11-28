

import React, { useState } from 'react';
import { ArrowLeft, Plus, Search, Edit2, Trash2, X, Download, Upload, FileSpreadsheet } from 'lucide-react';
import { MonumentPackage, MonumentPackageService, Monument, SightseeingActivity } from '../types';
import { initialMonumentPackages, initialDestinations, initialMonuments, initialActivities } from './mockData';

interface MonumentActivityPackageMasterProps {
  onBack: () => void;
}

const MonumentActivityPackageMaster: React.FC<MonumentActivityPackageMasterProps> = ({ onBack }) => {
  const [packages, setPackages] = useState<MonumentPackage[]>(initialMonumentPackages);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  // Form State
  const [currentPackage, setCurrentPackage] = useState<Partial<MonumentPackage>>({ status: 'Active', services: [] });
  const [selectedServiceId, setSelectedServiceId] = useState('');

  const handleEdit = (pkg: MonumentPackage) => {
    setCurrentPackage({ ...pkg });
    setShowModal(true);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (window.confirm('Delete package?')) setPackages(prev => prev.filter(p => p.id !== id));
  };

  const handleSave = () => {
    if (!currentPackage.name || !currentPackage.destinationId) return;
    const destName = initialDestinations.find(d => d.id === currentPackage.destinationId)?.name || '';

    if (currentPackage.id) {
      setPackages(prev => prev.map(p => p.id === currentPackage.id ? { ...p, ...currentPackage, destinationName: destName } as MonumentPackage : p));
    } else {
      const newPkg: MonumentPackage = {
        ...currentPackage as MonumentPackage,
        id: Math.random().toString(),
        destinationName: destName
      };
      setPackages(prev => [...prev, newPkg]);
    }
    setShowModal(false);
    setCurrentPackage({ status: 'Active', services: [] });
  };

  const addService = () => {
    if (!selectedServiceId || !currentPackage.serviceType) return;
    
    let serviceName = '';
    let serviceCity = initialDestinations.find(d => d.id === currentPackage.destinationId)?.name || '';

    if (currentPackage.serviceType === 'Entrance') {
        const mon = initialMonuments.find(m => m.id === selectedServiceId);
        if (mon) serviceName = mon.name;
    } else {
        const act = initialActivities.find(a => a.id === selectedServiceId);
        if (act) serviceName = act.name;
    }

    const newService: MonumentPackageService = {
        id: Math.random().toString(),
        serviceId: selectedServiceId,
        serviceType: currentPackage.serviceType,
        serviceName: serviceName,
        serviceCity: serviceCity
    };

    setCurrentPackage(prev => ({
        ...prev,
        services: [...(prev.services || []), newService]
    }));
    setSelectedServiceId('');
  };

  const removeService = (id: string) => {
    setCurrentPackage(prev => ({
        ...prev,
        services: prev.services?.filter(s => s.id !== id)
    }));
  };

  const getAvailableServices = () => {
      if (!currentPackage.destinationId || !currentPackage.serviceType) return [];
      if (currentPackage.serviceType === 'Entrance') {
          return initialMonuments.filter(m => m.destinationId === currentPackage.destinationId);
      } else {
          return initialActivities.filter(a => a.destinationId === currentPackage.destinationId);
      }
  };

  const filteredPackages = packages.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.destinationName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
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
            <h2 className="text-2xl font-bold text-slate-800">Monument & Activity Package Master</h2>
            <p className="text-sm text-slate-500">Group services into packages</p>
          </div>
        </div>
        <button 
          onClick={() => { setCurrentPackage({ status: 'Active', services: [] }); setShowModal(true); }} 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm text-sm font-medium"
        >
          <Plus size={18} /> Add Monument & Activity Package
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
              placeholder="Package Name, Destination ..." 
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
                     <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Package Name</th>
                     <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Service Type</th>
                     <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Service Names</th>
                     <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Short Description</th>
                     <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Status</th>
                     <th className="px-6 py-3 text-right text-xs font-bold text-slate-500 uppercase">Action</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {filteredPackages.map((pkg, index) => (
                     <tr key={pkg.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 text-sm text-slate-500">{index + 1}</td>
                        <td className="px-6 py-4 font-medium text-slate-800">{pkg.name}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{pkg.serviceType}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">
                           {pkg.services.map(s => s.serviceName).join(', ')}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600 max-w-[200px] truncate">{pkg.description || '-'}</td>
                        <td className="px-6 py-4">
                           <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${pkg.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {pkg.status}
                           </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                           <div className="flex items-center justify-end gap-2">
                              <button onClick={() => handleEdit(pkg)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded">
                                <Edit2 size={16}/>
                              </button>
                              <button onClick={(e) => handleDelete(pkg.id, e)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded">
                                <Trash2 size={16}/>
                              </button>
                           </div>
                        </td>
                     </tr>
                  ))}
                  {filteredPackages.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-6 py-8 text-center text-slate-400 text-sm">No packages found.</td>
                    </tr>
                  )}
               </tbody>
            </table>
         </div>
      </div>

      {/* Modal */}
      {showModal && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
               <div className="bg-slate-800 px-6 py-4 flex justify-between items-center">
                  <h3 className="text-lg font-bold text-white">{currentPackage.id ? 'Edit Monument & Activity Package' : 'Add Monument & Activity Package'}</h3>
                  <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                    <X size={20} />
                  </button>
               </div>
               
               <div className="p-6 space-y-4 overflow-y-auto flex-1">
                  <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Monument & Activity Package Name</label>
                      <input 
                        type="text" 
                        value={currentPackage.name || ''} 
                        onChange={(e) => setCurrentPackage({...currentPackage, name: e.target.value})} 
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-l-4 border-l-red-500"
                      />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Service Type</label>
                          <select 
                            value={currentPackage.serviceType} 
                            onChange={(e) => { setCurrentPackage({...currentPackage, serviceType: e.target.value}); setSelectedServiceId(''); }} 
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                             <option value="">Select Type</option>
                             <option value="Entrance">Entrance</option>
                             <option value="Activity">Activity</option>
                          </select>
                      </div>
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Destinations</label>
                          <select 
                            value={currentPackage.destinationId} 
                            onChange={(e) => { setCurrentPackage({...currentPackage, destinationId: e.target.value}); setSelectedServiceId(''); }} 
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                             <option value="">Select Destinations</option>
                             {initialDestinations.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                          </select>
                      </div>
                  </div>

                  <div className="pt-2">
                      <h4 className="text-sm font-bold text-slate-800 mb-2">Select Services</h4>
                      <div className="flex gap-2 mb-2">
                          <select 
                            value={selectedServiceId}
                            onChange={(e) => setSelectedServiceId(e.target.value)}
                            disabled={!currentPackage.destinationId || !currentPackage.serviceType}
                            className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-50"
                          >
                             <option value="">Select Service to Add</option>
                             {getAvailableServices().map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                          </select>
                          <button 
                            onClick={addService}
                            disabled={!selectedServiceId}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium disabled:bg-slate-300"
                          >
                             Add
                          </button>
                      </div>

                      <div className="border border-slate-200 rounded-lg overflow-hidden h-48 bg-slate-50">
                          <table className="w-full text-left text-sm">
                              <thead className="bg-white border-b border-slate-200 text-slate-500 font-bold">
                                  <tr>
                                      <th className="px-3 py-2 border-r border-slate-200 w-12">Sr.</th>
                                      <th className="px-3 py-2 border-r border-slate-200">Service Type</th>
                                      <th className="px-3 py-2 border-r border-slate-200">Service Name</th>
                                      <th className="px-3 py-2 border-r border-slate-200">Service City</th>
                                      <th className="px-3 py-2 text-center w-20">Action</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  {currentPackage.services?.map((s, idx) => (
                                      <tr key={s.id} className="bg-white border-b border-slate-100 last:border-0">
                                          <td className="px-3 py-2 border-r border-slate-200 text-center">{idx + 1}</td>
                                          <td className="px-3 py-2 border-r border-slate-200">{s.serviceType}</td>
                                          <td className="px-3 py-2 border-r border-slate-200">{s.serviceName}</td>
                                          <td className="px-3 py-2 border-r border-slate-200">{s.serviceCity}</td>
                                          <td className="px-3 py-2 text-center">
                                              <button onClick={() => removeService(s.id)} className="text-red-500 hover:text-red-700"><Trash2 size={14}/></button>
                                          </td>
                                      </tr>
                                  ))}
                                  {(!currentPackage.services || currentPackage.services.length === 0) && (
                                      <tr><td colSpan={5} className="px-3 py-8 text-center text-slate-400">----- End -----</td></tr>
                                  )}
                              </tbody>
                          </table>
                      </div>
                  </div>

                  <div>
                     <label className="block text-xs font-semibold text-slate-500 mb-1">Status</label>
                     <select 
                        value={currentPackage.status} 
                        onChange={(e) => setCurrentPackage({...currentPackage, status: e.target.value as any})} 
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                     >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                     </select>
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

export default MonumentActivityPackageMaster;