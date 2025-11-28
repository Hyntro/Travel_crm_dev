
import React, { useState } from 'react';
import { ArrowLeft, Download, Upload, Plus, Search, Edit2, Trash2, X, History, FileSpreadsheet, Image as ImageIcon, ChevronDown } from 'lucide-react';
import { TrainMaster, TrainTariff } from '../types';
import { initialTrains, initialDestinations } from './mockData';

interface TrainMasterProps {
  onBack: () => void;
}

const TrainMaster: React.FC<TrainMasterProps> = ({ onBack }) => {
  const [trains, setTrains] = useState<TrainMaster[]>(initialTrains);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  // View State
  const [view, setView] = useState<'list' | 'rates'>('list');
  const [currentTrain, setCurrentTrain] = useState<Partial<TrainMaster>>({ 
    status: 'Active',
    daysOfOperation: ''
  });

  // Tariffs
  const [tariffs, setTariffs] = useState<TrainTariff[]>([]);
  const [newTariff, setNewTariff] = useState<Partial<TrainTariff>>({
      supplierName: '1589 Gen X Haut',
      journeyType: 'day_journey',
      trainCoach: 'AC First Class',
      currency: 'INR',
      roe: 1,
      taxSlab: 'GSTInclusive (0)',
      status: 'Active'
  });

  const handleEdit = (train: TrainMaster) => {
    setCurrentTrain({ ...train });
    setShowModal(true);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (window.confirm('Delete train?')) {
      setTrains(prev => prev.filter(t => t.id !== id));
    }
  };

  const handleViewRates = (train: TrainMaster) => {
      setCurrentTrain({ ...train });
      // Initialize form defaults from train if needed
      setNewTariff({
        ...newTariff,
        fromStation: train.fromDestinationName,
        toStation: train.toDestinationName
      });
      setView('rates');
  };

  const handleSave = () => {
    if (!currentTrain.name || !currentTrain.number) return;

    const fromName = initialDestinations.find(d => d.id === currentTrain.fromDestinationId)?.name || '';
    const toName = initialDestinations.find(d => d.id === currentTrain.toDestinationId)?.name || '';

    const newTrain: TrainMaster = {
        id: currentTrain.id || Math.random().toString(),
        name: currentTrain.name,
        number: currentTrain.number,
        fromDestinationId: currentTrain.fromDestinationId || '',
        fromDestinationName: fromName,
        toDestinationId: currentTrain.toDestinationId || '',
        toDestinationName: toName,
        daysOfOperation: currentTrain.daysOfOperation || '',
        cancellationPolicy: currentTrain.cancellationPolicy || '',
        remarks: currentTrain.remarks || '',
        image: currentTrain.image || '',
        status: currentTrain.status || 'Active',
        departureTime: currentTrain.departureTime || '',
        arrivalTime: currentTrain.arrivalTime || ''
    };

    if (currentTrain.id) {
        setTrains(prev => prev.map(t => t.id === currentTrain.id ? newTrain : t));
    } else {
        setTrains(prev => [...prev, newTrain]);
    }
    setShowModal(false);
    resetForm();
  };

  const handleSaveTariff = () => {
      if (!currentTrain.id) return;
      const tariff: TrainTariff = {
          id: Math.random().toString(),
          trainId: currentTrain.id,
          supplierName: newTariff.supplierName || '',
          journeyType: newTariff.journeyType || '',
          trainCoach: newTariff.trainCoach || '',
          fromStation: newTariff.fromStation || currentTrain.fromDestinationName || '',
          toStation: newTariff.toStation || currentTrain.toDestinationName || '',
          validFrom: newTariff.validFrom || '',
          validTo: newTariff.validTo || '',
          currency: newTariff.currency || 'INR',
          roe: Number(newTariff.roe) || 1,
          adultCost: Number(newTariff.adultCost) || 0,
          childCost: Number(newTariff.childCost) || 0,
          taxSlab: newTariff.taxSlab || '',
          status: newTariff.status || 'Active'
      };
      setTariffs([...tariffs, tariff]);
      // Reset some fields
      setNewTariff({ ...newTariff, adultCost: 0, childCost: 0 });
  };

  const resetForm = () => {
    setCurrentTrain({ 
      status: 'Active',
      daysOfOperation: ''
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
              setCurrentTrain(prev => ({ ...prev, image: reader.result as string }));
          };
          reader.readAsDataURL(file);
      }
  };

  const filteredTrains = trains.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase()) || t.number.includes(search);
    const matchesStatus = statusFilter === 'All' || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const currentTrainTariffs = tariffs.filter(t => t.trainId === currentTrain.id);

  // --- Rate Sheet View ---
  if (view === 'rates') {
      return (
        <div className="h-full flex flex-col bg-slate-50 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="bg-white px-6 py-4 border-b border-slate-200 flex items-center gap-4 shadow-sm">
                <button onClick={() => setView('list')} className="bg-white border border-slate-300 text-slate-700 px-4 py-1.5 rounded-full text-sm font-medium hover:bg-slate-50">Back</button>
                <h2 className="text-xl font-bold text-slate-800">Train Name: {currentTrain.name} | {currentTrain.number}</h2>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
                <div className="bg-white border border-green-200 rounded-lg shadow-sm mb-6 overflow-hidden">
                    <div className="bg-green-100 px-4 py-2 border-b border-green-200">
                        <h4 className="font-bold text-green-800 text-sm">Add Train Rates</h4>
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
                                    <option>1589 Gen X Haut</option>
                                    <option>IRCTC</option>
                                </select>
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Journey Type</label>
                                <select 
                                    value={newTariff.journeyType} 
                                    onChange={e => setNewTariff({...newTariff, journeyType: e.target.value})}
                                    className="w-full border border-slate-300 rounded px-2 py-1 text-xs bg-white border-l-4 border-l-red-500"
                                >
                                    <option value="day_journey">day_journey</option>
                                    <option value="overnight">Overnight</option>
                                </select>
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Train Coach</label>
                                <select 
                                    value={newTariff.trainCoach} 
                                    onChange={e => setNewTariff({...newTariff, trainCoach: e.target.value})}
                                    className="w-full border border-slate-300 rounded px-2 py-1 text-xs bg-white"
                                >
                                    <option>AC First Class</option>
                                    <option>AC 2 Tier</option>
                                    <option>AC 3 Tier</option>
                                    <option>Sleeper</option>
                                    <option>Chair Car</option>
                                </select>
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">From</label>
                                <select 
                                    value={newTariff.fromStation} 
                                    onChange={e => setNewTariff({...newTariff, fromStation: e.target.value})}
                                    className="w-full border border-slate-300 rounded px-2 py-1 text-xs bg-white border-l-4 border-l-red-500"
                                >
                                   <option value="">Select</option>
                                   {initialDestinations.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                                </select>
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">To</label>
                                <select 
                                    value={newTariff.toStation} 
                                    onChange={e => setNewTariff({...newTariff, toStation: e.target.value})}
                                    className="w-full border border-slate-300 rounded px-2 py-1 text-xs bg-white border-l-4 border-l-red-500"
                                >
                                   <option value="">Select</option>
                                   {initialDestinations.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                                </select>
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Rate Valid From</label>
                                <input type="date" value={newTariff.validFrom} onChange={e => setNewTariff({...newTariff, validFrom: e.target.value})} className="w-full border border-slate-300 rounded px-2 py-1 text-xs"/>
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Rate Valid To</label>
                                <input type="date" value={newTariff.validTo} onChange={e => setNewTariff({...newTariff, validTo: e.target.value})} className="w-full border border-slate-300 rounded px-2 py-1 text-xs"/>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-3 items-end">
                            <div className="col-span-1">
                                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Currency</label>
                                <select value={newTariff.currency} onChange={e => setNewTariff({...newTariff, currency: e.target.value})} className="w-full border border-slate-300 rounded px-2 py-1 text-xs bg-white border-l-4 border-l-red-500">
                                    <option>INR</option><option>USD</option>
                                </select>
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">ROE (INR)</label>
                                <input type="number" value={newTariff.roe} onChange={e => setNewTariff({...newTariff, roe: Number(e.target.value)})} className="w-full border border-slate-300 rounded px-2 py-1 text-xs border-l-4 border-l-red-500"/>
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Adult Cost</label>
                                <input type="number" value={newTariff.adultCost || ''} onChange={e => setNewTariff({...newTariff, adultCost: Number(e.target.value)})} className="w-full border border-slate-300 rounded px-2 py-1 text-xs border-l-4 border-l-red-500"/>
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Child Cost</label>
                                <input type="number" value={newTariff.childCost || ''} onChange={e => setNewTariff({...newTariff, childCost: Number(e.target.value)})} className="w-full border border-slate-300 rounded px-2 py-1 text-xs"/>
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Tax Slab (%)</label>
                                <select value={newTariff.taxSlab} onChange={e => setNewTariff({...newTariff, taxSlab: e.target.value})} className="w-full border border-slate-300 rounded px-2 py-1 text-xs bg-white">
                                    <option>GSTInclusive (0)</option>
                                    <option>GST 5%</option>
                                </select>
                            </div>
                            <div className="col-span-1">
                                <button onClick={handleSaveTariff} className="w-full bg-blue-500 hover:bg-blue-600 text-white py-1.5 rounded text-xs font-medium">Save</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    {currentTrainTariffs.length === 0 ? (
                        <p className="text-sm text-slate-500">No Tariff found</p>
                    ) : (
                        <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                            <table className="w-full text-xs text-left">
                                <thead className="bg-slate-100 font-bold">
                                    <tr>
                                        <th className="p-2">Supplier</th>
                                        <th className="p-2">Coach</th>
                                        <th className="p-2">Route</th>
                                        <th className="p-2">Valid</th>
                                        <th className="p-2 text-right">Adult</th>
                                        <th className="p-2 text-right">Child</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentTrainTariffs.map(t => (
                                        <tr key={t.id} className="border-t border-slate-100">
                                            <td className="p-2">{t.supplierName}</td>
                                            <td className="p-2">{t.trainCoach}</td>
                                            <td className="p-2">{t.fromStation} - {t.toStation}</td>
                                            <td className="p-2">{t.validFrom} to {t.validTo}</td>
                                            <td className="p-2 text-right">{t.currency} {t.adultCost}</td>
                                            <td className="p-2 text-right">{t.currency} {t.childCost}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
      );
  }

  // --- List View ---
  return (
    <div className="h-full flex flex-col animate-in fade-in slide-in-from-right-4 duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Train Master</h2>
            <p className="text-sm text-slate-500">Manage train schedules and tariffs</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
           <button className="bg-white border border-slate-300 text-slate-600 px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-50 text-sm font-medium shadow-sm">
             <Download size={16}/> Download Format
           </button>
           <label className="bg-white border border-slate-300 text-slate-600 px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-50 text-sm font-medium shadow-sm cursor-pointer">
             <Upload size={16}/> Import Excel
             <input type="file" className="hidden" accept=".csv,.xlsx"/>
           </label>
           <button className="bg-white border border-slate-300 text-slate-600 px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-50 text-sm font-medium shadow-sm">
             <History size={16}/> View Logs
           </button>
           <button 
             onClick={() => { resetForm(); setShowModal(true); }} 
             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm text-sm font-medium"
           >
             <Plus size={18} /> Add Train
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
              placeholder="Train" 
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
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Sr.</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase text-center">Image</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Train Name</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Train Number</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">From Destination</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">To Destination</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Days Of Opration</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Cancellation Policy</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Remark</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Status</th>
                     <th className="px-4 py-3 text-right text-xs font-bold text-slate-500 uppercase">Rate Sheet</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {filteredTrains.map((train, index) => (
                     <tr key={train.id} className="hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => handleEdit(train)}>
                        <td className="px-4 py-3 text-sm text-slate-500">{index + 1}</td>
                        <td className="px-4 py-3 text-center">
                            {train.image ? (
                                <img src={train.image} alt={train.name} className="w-8 h-8 rounded object-cover mx-auto"/>
                            ) : (
                                <ImageIcon size={16} className="text-slate-400 mx-auto"/>
                            )}
                        </td>
                        <td className="px-4 py-3 font-medium text-slate-800">{train.name}</td>
                        <td className="px-4 py-3 text-sm text-slate-600">{train.number}</td>
                        <td className="px-4 py-3 text-sm text-slate-600">{train.fromDestinationName}</td>
                        <td className="px-4 py-3 text-sm text-slate-600">{train.toDestinationName}</td>
                        <td className="px-4 py-3 text-sm text-slate-600">{train.daysOfOperation}</td>
                        <td className="px-4 py-3 text-sm text-slate-600 truncate max-w-[100px]">{train.cancellationPolicy}</td>
                        <td className="px-4 py-3 text-sm text-slate-600 truncate max-w-[100px]">{train.remarks}</td>
                        <td className="px-4 py-3">
                           <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${train.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {train.status}
                           </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                           <button 
                             onClick={(e) => { e.stopPropagation(); handleViewRates(train); }} 
                             className="text-blue-600 hover:underline text-xs font-medium"
                           >
                             Rate Sheet
                           </button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      {/* Modal */}
      {showModal && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
               <div className="bg-slate-800 px-6 py-4 flex justify-between items-center">
                  <h3 className="text-lg font-bold text-white">{currentTrain.id ? 'Edit Train' : 'Add Train'}</h3>
                  <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                    <X size={20} />
                  </button>
               </div>
               
               <div className="p-6 space-y-6 overflow-y-auto flex-1">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Train Name</label>
                          <input 
                            type="text" 
                            value={currentTrain.name || ''} 
                            onChange={(e) => setCurrentTrain({...currentTrain, name: e.target.value})} 
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-l-4 border-l-red-500"
                          />
                      </div>
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Train Number</label>
                          <input 
                            type="text" 
                            value={currentTrain.number || ''} 
                            onChange={(e) => setCurrentTrain({...currentTrain, number: e.target.value})} 
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-l-4 border-l-red-500"
                          />
                      </div>
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">From Destination</label>
                          <select 
                            value={currentTrain.fromDestinationId} 
                            onChange={(e) => setCurrentTrain({...currentTrain, fromDestinationId: e.target.value})} 
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 border-l-4 border-l-red-500"
                          >
                             <option value="">Select Destination</option>
                             {initialDestinations.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                          </select>
                      </div>
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">To Destination</label>
                          <select 
                            value={currentTrain.toDestinationId} 
                            onChange={(e) => setCurrentTrain({...currentTrain, toDestinationId: e.target.value})} 
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 border-l-4 border-l-red-500"
                          >
                             <option value="">Select Destination</option>
                             {initialDestinations.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                          </select>
                      </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="md:col-span-2">
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Days Of Operation</label>
                          <input 
                            type="text" 
                            value={currentTrain.daysOfOperation || ''} 
                            onChange={(e) => setCurrentTrain({...currentTrain, daysOfOperation: e.target.value})} 
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g. Daily, Mon, Wed"
                          />
                      </div>
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Status</label>
                          <select 
                             value={currentTrain.status} 
                             onChange={(e) => setCurrentTrain({...currentTrain, status: e.target.value as any})} 
                             className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                             <option value="Active">Active</option>
                             <option value="Inactive">Inactive</option>
                          </select>
                      </div>
                  </div>

                  <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Attach Train Image</label>
                      <div className="flex items-center gap-2">
                        <label className="cursor-pointer bg-white border border-slate-300 text-slate-600 px-3 py-2 rounded-lg hover:bg-slate-50 text-sm font-medium shadow-sm transition-colors">
                          Choose File
                          <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                        </label>
                        <span className="text-xs text-slate-400 truncate max-w-[200px]">
                          {currentTrain.image ? 'Image selected' : 'No fi...osen'}
                        </span>
                      </div>
                  </div>

                  {/* Collapsible More Info (Simulated always open for better UX in this context based on screenshot) */}
                  <div className="pt-2">
                      <div className="flex items-center gap-2 mb-2 cursor-pointer">
                          <span className="text-sm font-bold text-slate-800">More Information</span>
                          <ChevronDown size={16} className="text-slate-800"/>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                              <label className="block text-xs font-semibold text-slate-500 mb-1">Departure Time</label>
                              <input 
                                type="time" 
                                value={currentTrain.departureTime || ''} 
                                onChange={(e) => setCurrentTrain({...currentTrain, departureTime: e.target.value})} 
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                          </div>
                          <div>
                              <label className="block text-xs font-semibold text-slate-500 mb-1">Arrival Time</label>
                              <input 
                                type="time" 
                                value={currentTrain.arrivalTime || ''} 
                                onChange={(e) => setCurrentTrain({...currentTrain, arrivalTime: e.target.value})} 
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                          </div>
                          <div>
                              <label className="block text-xs font-semibold text-slate-500 mb-1">Cancellation Policy</label>
                              <textarea 
                                value={currentTrain.cancellationPolicy || ''} 
                                onChange={(e) => setCurrentTrain({...currentTrain, cancellationPolicy: e.target.value})} 
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-20"
                              />
                          </div>
                          <div>
                              <label className="block text-xs font-semibold text-slate-500 mb-1">Remark</label>
                              <textarea 
                                value={currentTrain.remarks || ''} 
                                onChange={(e) => setCurrentTrain({...currentTrain, remarks: e.target.value})} 
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-20"
                              />
                          </div>
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

export default TrainMaster;
