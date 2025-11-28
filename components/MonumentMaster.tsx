
import React, { useState } from 'react';
import { ArrowLeft, Download, Upload, Plus, Search, Edit2, Trash2, X, History, FileJson, Eye, Image as ImageIcon, FileSpreadsheet, AlignLeft, List, Bold, Italic, Calendar, Save, Edit } from 'lucide-react';
import { Monument, MonumentTariff } from '../types';
import { initialMonuments, initialDestinations } from './mockData';

interface MonumentMasterProps {
  onBack: () => void;
}

const MonumentMaster: React.FC<MonumentMasterProps> = ({ onBack }) => {
  const [monuments, setMonuments] = useState<Monument[]>(initialMonuments);
  const [showModal, setShowModal] = useState(false);
  const [searchName, setSearchName] = useState('');
  const [filterDestination, setFilterDestination] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterSelectMonument, setFilterSelectMonument] = useState('All');
  
  const [currentMonument, setCurrentMonument] = useState<Partial<Monument>>({ 
    status: 'Active', 
    isDefault: 'No', 
    showInProposal: 'Yes',
    destinationId: ''
  });

  // Rates View State
  const [view, setView] = useState<'list' | 'rates'>('list');
  const [tariffs, setTariffs] = useState<MonumentTariff[]>([]);
  const [newTariff, setNewTariff] = useState<Partial<MonumentTariff>>({
    status: 'Active',
    currency: 'INR',
    nationality: 'Foreign',
    supplierName: 'Self',
    taxSlab: 'ANY (3)'
  });

  const handleEdit = (monument: Monument) => {
    setCurrentMonument({ ...monument });
    setShowModal(true);
  };

  const handleViewRates = (monument: Monument) => {
    setCurrentMonument({ ...monument });
    setView('rates');
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm('Delete monument?')) {
      setMonuments(prev => prev.filter(m => m.id !== id));
    }
  };

  const handleSave = () => {
    if (!currentMonument.name || !currentMonument.destinationId) return;

    const destName = initialDestinations.find(d => d.id === currentMonument.destinationId)?.name || '';

    if (currentMonument.id) {
      setMonuments(prev => prev.map(m => m.id === currentMonument.id ? { ...m, ...currentMonument, destinationName: destName } as Monument : m));
    } else {
      const newMonument: Monument = {
        ...currentMonument as Monument,
        id: Math.random().toString(),
        serviceCode: `MON${Math.floor(Math.random() * 1000)}`,
        destinationName: destName,
        languages: currentMonument.languages || 'English'
      };
      setMonuments(prev => [...prev, newMonument]);
    }
    setShowModal(false);
    resetForm();
  };

  const handleSaveTariff = () => {
    if (!currentMonument.id) return;
    const tariff: MonumentTariff = {
        id: Math.random().toString(),
        monumentId: currentMonument.id,
        supplierName: newTariff.supplierName || 'Self',
        nationality: newTariff.nationality || '',
        validFrom: newTariff.validFrom || '',
        validTo: newTariff.validTo || '',
        currency: newTariff.currency || 'INR',
        adultFee: Number(newTariff.adultFee) || 0,
        childFee: Number(newTariff.childFee) || 0,
        status: newTariff.status || 'Active',
        taxSlab: newTariff.taxSlab || 'ANY (3)',
        policy: newTariff.policy || '',
        terms: newTariff.terms || '',
        remarks: newTariff.remarks || ''
    };
    setTariffs([...tariffs, tariff]);
    setNewTariff({ status: 'Active', currency: 'INR', nationality: 'Foreign', supplierName: 'Self', taxSlab: 'ANY (3)' });
  };

  const resetForm = () => {
    setCurrentMonument({ 
      status: 'Active', 
      isDefault: 'No', 
      showInProposal: 'Yes',
      destinationId: ''
    });
  };

  const filteredMonuments = monuments.filter(m => {
    const matchesName = m.name.toLowerCase().includes(searchName.toLowerCase());
    const matchesDest = filterDestination === 'All' || m.destinationName === filterDestination;
    const matchesStatus = filterStatus === 'All' || m.status === filterStatus;
    const matchesSelect = filterSelectMonument === 'All' || m.name === filterSelectMonument;
    return matchesName && matchesDest && matchesStatus && matchesSelect;
  });

  const currentMonumentTariffs = tariffs.filter(t => t.monumentId === currentMonument.id);

  if (view === 'rates') {
    return (
        <div className="h-full flex flex-col bg-slate-50 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="bg-white px-6 py-4 border-b border-slate-200 flex items-center gap-4 shadow-sm">
                <button onClick={() => setView('list')} className="bg-white border border-slate-300 text-slate-700 px-4 py-1.5 rounded-full text-sm font-medium hover:bg-slate-50">Back</button>
                <h2 className="text-xl font-bold text-slate-800">{currentMonument.name} to</h2>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
                {/* Add Tariff Form */}
                <div className="bg-white border border-green-200 rounded-lg shadow-sm mb-6 overflow-hidden">
                    <div className="bg-green-100 px-4 py-2 border-b border-green-200">
                        <h4 className="font-bold text-green-800 text-sm">Add Monument</h4>
                    </div>
                    <div className="p-4 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-3 items-end">
                            <div className="col-span-1">
                                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Supplier Name</label>
                                <select 
                                    value={newTariff.supplierName} 
                                    onChange={e => setNewTariff({...newTariff, supplierName: e.target.value})}
                                    className="w-full border border-slate-300 rounded px-2 py-1 text-xs bg-white border-l-4 border-l-red-500"
                                >
                                    <option>Self</option>
                                    <option>1589 Gen X Haut</option>
                                </select>
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Nationality</label>
                                <select 
                                    value={newTariff.nationality} 
                                    onChange={e => setNewTariff({...newTariff, nationality: e.target.value})}
                                    className="w-full border border-slate-300 rounded px-2 py-1 text-xs bg-white border-l-4 border-l-red-500"
                                >
                                    <option>Foreign</option>
                                    <option>Indian</option>
                                </select>
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Rate Valid From</label>
                                <div className="relative">
                                    <input 
                                        type="date" 
                                        value={newTariff.validFrom} 
                                        onChange={e => setNewTariff({...newTariff, validFrom: e.target.value})}
                                        className="w-full border border-slate-300 rounded px-2 py-1 text-xs border-l-4 border-l-red-500"
                                    />
                                    <Calendar size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"/>
                                </div>
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Rate Valid To</label>
                                <div className="relative">
                                    <input 
                                        type="date" 
                                        value={newTariff.validTo} 
                                        onChange={e => setNewTariff({...newTariff, validTo: e.target.value})}
                                        className="w-full border border-slate-300 rounded px-2 py-1 text-xs border-l-4 border-l-red-500"
                                    />
                                    <Calendar size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"/>
                                </div>
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Currency</label>
                                <select 
                                    value={newTariff.currency} 
                                    onChange={e => setNewTariff({...newTariff, currency: e.target.value})}
                                    className="w-full border border-slate-300 rounded px-2 py-1 text-xs bg-white border-l-4 border-l-red-500"
                                >
                                    <option>USD</option>
                                    <option>INR</option>
                                </select>
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Adult Monument Fee</label>
                                <input 
                                    type="number" 
                                    value={newTariff.adultFee || ''} 
                                    onChange={e => setNewTariff({...newTariff, adultFee: Number(e.target.value)})}
                                    className="w-full border border-slate-300 rounded px-2 py-1 text-xs"
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Child Monument Fee</label>
                                <input 
                                    type="number" 
                                    value={newTariff.childFee || ''} 
                                    onChange={e => setNewTariff({...newTariff, childFee: Number(e.target.value)})}
                                    className="w-full border border-slate-300 rounded px-2 py-1 text-xs"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                             <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Status</label>
                                <select 
                                    value={newTariff.status} 
                                    onChange={e => setNewTariff({...newTariff, status: e.target.value as any})}
                                    className="w-full border border-slate-300 rounded px-2 py-1 text-xs bg-white"
                                >
                                    <option>Active</option>
                                    <option>Inactive</option>
                                </select>
                             </div>
                             <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Tax Slab (Tax %)</label>
                                <select 
                                    value={newTariff.taxSlab} 
                                    onChange={e => setNewTariff({...newTariff, taxSlab: e.target.value})}
                                    className="w-full border border-slate-300 rounded px-2 py-1 text-xs bg-white border-l-4 border-l-red-500"
                                >
                                    <option>ANY (3)</option>
                                    <option>0%</option>
                                    <option>5%</option>
                                    <option>12%</option>
                                    <option>18%</option>
                                </select>
                             </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Policy</label>
                                <input 
                                    type="text" 
                                    value={newTariff.policy || ''} 
                                    onChange={e => setNewTariff({...newTariff, policy: e.target.value})}
                                    className="w-full border border-slate-300 rounded px-2 py-1 text-xs"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">T&C</label>
                                <input 
                                    type="text" 
                                    value={newTariff.terms || ''} 
                                    onChange={e => setNewTariff({...newTariff, terms: e.target.value})}
                                    className="w-full border border-slate-300 rounded px-2 py-1 text-xs"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Remarks</label>
                            <input 
                                type="text" 
                                value={newTariff.remarks || ''} 
                                onChange={e => setNewTariff({...newTariff, remarks: e.target.value})}
                                className="w-full border border-slate-300 rounded px-2 py-1 text-xs"
                            />
                        </div>
                        <div className="flex justify-end pt-2">
                            <button onClick={handleSaveTariff} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-1.5 rounded text-sm font-medium">Save</button>
                        </div>
                    </div>
                </div>

                {/* Tariff Table */}
                <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                    <table className="w-full text-xs text-left">
                        <thead className="bg-slate-100 text-slate-600 font-bold uppercase border-b border-slate-200">
                            <tr>
                                <th className="px-3 py-2 border-r">Validity</th>
                                <th className="px-3 py-2 border-r">Monument Name</th>
                                <th className="px-3 py-2 border-r">Nationality</th>
                                <th className="px-3 py-2 border-r">Supplier</th>
                                <th className="px-3 py-2 border-r">Adult Cost</th>
                                <th className="px-3 py-2 border-r">Child Cost</th>
                                <th className="px-3 py-2 border-r">GST Slab</th>
                                <th className="px-3 py-2 border-r">Status</th>
                                <th className="px-3 py-2 text-center"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {currentMonumentTariffs.map(tariff => (
                                <tr key={tariff.id} className="hover:bg-slate-50">
                                    <td className="px-3 py-2 border-r font-medium">{tariff.validFrom} - {tariff.validTo}</td>
                                    <td className="px-3 py-2 border-r text-slate-700">{currentMonument.name}</td>
                                    <td className="px-3 py-2 border-r text-slate-600">{tariff.nationality}</td>
                                    <td className="px-3 py-2 border-r text-slate-600">{tariff.supplierName}</td>
                                    <td className="px-3 py-2 border-r">{tariff.currency} {tariff.adultFee}</td>
                                    <td className="px-3 py-2 border-r">{tariff.currency} {tariff.childFee}</td>
                                    <td className="px-3 py-2 border-r">{tariff.taxSlab}</td>
                                    <td className="px-3 py-2 border-r text-slate-600">{tariff.status}</td>
                                    <td className="px-3 py-2 text-center text-green-600 cursor-pointer hover:bg-green-50">
                                        <Edit size={14} className="mx-auto"/>
                                    </td>
                                </tr>
                            ))}
                            {currentMonumentTariffs.length === 0 && (
                                <tr>
                                    <td colSpan={9} className="px-3 py-8 text-center text-slate-400">No tariffs found for this monument.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
  }

  return (
    <div className="h-full flex flex-col animate-in fade-in slide-in-from-right-4 duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Monument Master</h2>
            <p className="text-sm text-slate-500">Manage sightseeing locations and details</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
           <button className="bg-white border border-slate-300 text-slate-600 px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-50 text-sm font-medium shadow-sm">
             <History size={16}/> View Logs
           </button>
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
             onClick={() => { resetForm(); setShowModal(true); }} 
             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm text-sm font-medium"
           >
             <Plus size={18} /> Add Monument
           </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-6 flex flex-wrap gap-4 items-end">
         <div className="flex-1 min-w-[200px]">
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Monument Name</label>
            <input 
              type="text" 
              value={searchName} 
              onChange={(e) => setSearchName(e.target.value)} 
              placeholder="Enter Name" 
              className="w-full pl-3 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
         </div>
         <div className="w-48">
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Destination</label>
            <select 
              value={filterDestination} 
              onChange={(e) => setFilterDestination(e.target.value)} 
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
               <option value="All">All</option>
               {initialDestinations.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
            </select>
         </div>
         <div className="w-48">
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Monument Name</label>
            <select 
              value={filterSelectMonument} 
              onChange={(e) => setFilterSelectMonument(e.target.value)} 
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
               <option value="All">All</option>
               {monuments.map(m => <option key={m.id} value={m.name}>{m.name}</option>)}
            </select>
         </div>
         <div className="w-48">
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Select Status</label>
            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)} 
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
                     <th className="px-4 py-3 w-10 text-center"><input type="checkbox" className="rounded"/></th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Service Code</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Monument Name</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Destination</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase text-center">Detail</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Status</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Language</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase text-center">Gallery</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase text-center">Rate Sheet</th>
                     <th className="px-4 py-3 text-right text-xs font-bold text-slate-500 uppercase">Action</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {filteredMonuments.map((monument) => (
                     <tr key={monument.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3 text-center"><input type="checkbox" className="rounded"/></td>
                        <td className="px-4 py-3 text-sm text-slate-500 font-mono">{monument.serviceCode}</td>
                        <td className="px-4 py-3 font-medium text-slate-800">{monument.name}</td>
                        <td className="px-4 py-3 text-sm text-slate-600">{monument.destinationName}</td>
                        <td className="px-4 py-3 text-center">
                           <button className="text-blue-600 text-xs font-medium hover:underline">View</button>
                        </td>
                        <td className="px-4 py-3">
                           <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${monument.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {monument.status}
                           </span>
                        </td>
                        <td className="px-4 py-3 text-xs text-slate-600">{monument.languages}</td>
                        <td className="px-4 py-3 text-center">
                           <ImageIcon size={16} className="text-purple-500 cursor-pointer mx-auto"/>
                        </td>
                        <td className="px-4 py-3 text-center">
                           <button 
                             onClick={() => handleViewRates(monument)}
                             className="text-blue-600 text-xs font-medium hover:underline"
                           >
                             Rates
                           </button>
                        </td>
                        <td className="px-4 py-3 text-right">
                           <div className="flex items-center justify-end gap-2">
                              <button onClick={() => handleEdit(monument)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded">
                                <Edit2 size={16}/>
                              </button>
                              <button onClick={(e) => handleDelete(monument.id, e)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded">
                                <Trash2 size={16}/>
                              </button>
                           </div>
                        </td>
                     </tr>
                  ))}
                  {filteredMonuments.length === 0 && (
                    <tr>
                      <td colSpan={10} className="px-6 py-8 text-center text-slate-400 text-sm">No monuments found.</td>
                    </tr>
                  )}
               </tbody>
            </table>
         </div>
      </div>

      {/* Modal */}
      {showModal && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
               <div className="bg-slate-800 px-6 py-4 flex justify-between items-center">
                  <h3 className="text-lg font-bold text-white">{currentMonument.id ? 'Edit Monument' : 'Add Monument'}</h3>
                  <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                    <X size={20} />
                  </button>
               </div>
               
               <div className="p-6 space-y-6 overflow-y-auto flex-1">
                  
                  {/* Form Grid */}
                  <div className="space-y-4">
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Monument Name</label>
                          <input 
                            type="text" 
                            value={currentMonument.name || ''} 
                            onChange={(e) => setCurrentMonument({...currentMonument, name: e.target.value})} 
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-l-4 border-l-red-500"
                          />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-6">
                          <div>
                              <label className="block text-xs font-semibold text-slate-500 mb-1">Destination</label>
                              <select 
                                value={currentMonument.destinationId} 
                                onChange={(e) => setCurrentMonument({...currentMonument, destinationId: e.target.value})} 
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 border-l-4 border-l-red-500"
                              >
                                 <option value="">Select</option>
                                 {initialDestinations.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                              </select>
                          </div>
                          <div>
                              <label className="block text-xs font-semibold text-slate-500 mb-1">Status</label>
                              <select 
                                value={currentMonument.status} 
                                onChange={(e) => setCurrentMonument({...currentMonument, status: e.target.value as any})} 
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                 <option value="Active">Active</option>
                                 <option value="Inactive">Inactive</option>
                              </select>
                          </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                          <div>
                              <label className="block text-xs font-semibold text-slate-500 mb-1">Closed On Days</label>
                              <input 
                                type="text" 
                                value={currentMonument.closedDays || ''} 
                                onChange={(e) => setCurrentMonument({...currentMonument, closedDays: e.target.value})} 
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                          </div>
                          <div>
                              <label className="block text-xs font-semibold text-slate-500 mb-1">Default</label>
                              <select 
                                value={currentMonument.isDefault} 
                                onChange={(e) => setCurrentMonument({...currentMonument, isDefault: e.target.value as any})} 
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                 <option value="Yes">Yes</option>
                                 <option value="No">No</option>
                              </select>
                          </div>
                      </div>

                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Show in Proposal</label>
                          <select 
                            value={currentMonument.showInProposal} 
                            onChange={(e) => setCurrentMonument({...currentMonument, showInProposal: e.target.value as any})} 
                            className="w-full md:w-1/2 px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                             <option value="Yes">Yes</option>
                             <option value="No">No</option>
                          </select>
                      </div>

                      <div>
                         <label className="block text-xs font-semibold text-slate-500 mb-1">Description</label>
                         <div className="border border-slate-300 rounded-lg overflow-hidden">
                            <div className="bg-slate-50 px-3 py-2 border-b border-slate-300 flex gap-4 text-slate-600 text-xs">
                               <span>File</span><span>Edit</span><span>View</span><span>Insert</span><span>Format</span><span>Tools</span><span>Table</span><span>Help</span>
                            </div>
                            <div className="px-3 py-2 flex gap-3 text-slate-500 border-b border-slate-100">
                               <button className="hover:text-blue-600"><ArrowLeft size={14}/></button>
                               <button className="hover:text-blue-600"><ArrowLeft size={14} className="rotate-180"/></button>
                               <button className="hover:text-blue-600 font-bold">B</button>
                               <button className="hover:text-blue-600 italic">I</button>
                               <button className="hover:text-blue-600 underline">U</button>
                               <button className="hover:text-blue-600 line-through">S</button>
                               <div className="w-px bg-slate-300 mx-1"></div>
                               <button className="hover:text-blue-600 flex items-center gap-1">A <span className="text-[8px]">▼</span></button>
                               <button className="hover:text-blue-600 flex items-center gap-1"><Edit2 size={12}/> <span className="text-[8px]">▼</span></button>
                               <button className="hover:text-blue-600">•••</button>
                            </div>
                            <textarea 
                              value={currentMonument.description || ''}
                              onChange={e => setCurrentMonument({...currentMonument, description: e.target.value})}
                              className="w-full h-32 p-3 outline-none text-sm resize-none"
                            ></textarea>
                         </div>
                      </div>
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

export default MonumentMaster;
