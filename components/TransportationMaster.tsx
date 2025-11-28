
import React, { useState } from 'react';
import { ArrowLeft, Download, Upload, Plus, Search, Edit2, Trash2, X, History, FileSpreadsheet, ArrowLeft as ArrowLeftSmall, Bold, Italic, Calendar, Save, Edit, Car } from 'lucide-react';
import { TransportationMaster, TransportationTariff } from '../types';
import { initialTransportations, initialDestinations, initialTransferTypes, initialVehicleTypes } from './mockData';

interface TransportationMasterProps {
  onBack: () => void;
}

const TransportationMaster: React.FC<TransportationMasterProps> = ({ onBack }) => {
  const [transportations, setTransportations] = useState<TransportationMaster[]>(initialTransportations);
  const [showModal, setShowModal] = useState(false);
  const [searchName, setSearchName] = useState('');
  const [filterDestination, setFilterDestination] = useState('All');
  const [filterType, setFilterType] = useState('All');
  
  // View State
  const [view, setView] = useState<'list' | 'rates'>('list');
  const [currentTransportation, setCurrentTransportation] = useState<Partial<TransportationMaster>>({ 
    status: 'Active',
    destinationId: '',
    transferType: 'None'
  });

  // Rate Sheet State
  const [tariffs, setTariffs] = useState<TransportationTariff[]>([]);
  const [showAddTariff, setShowAddTariff] = useState(true);
  const [newTariff, setNewTariff] = useState<Partial<TransportationTariff>>({
      status: 'Active',
      currency: 'INR',
      taxSlab: 'Exlusive(8%) (8)',
      type: 'Package Cost',
      supplierName: '1589 Gen X Haut Monde (Sector15)'
  });

  const handleEdit = (transport: TransportationMaster) => {
    setCurrentTransportation({ ...transport });
    setShowModal(true);
  };

  const handleViewRates = (transport: TransportationMaster) => {
      setCurrentTransportation({ ...transport });
      setView('rates');
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm('Delete transportation?')) {
      setTransportations(prev => prev.filter(t => t.id !== id));
    }
  };

  const handleSave = () => {
    if (!currentTransportation.name || !currentTransportation.destinationId) return;

    const destName = initialDestinations.find(d => d.id === currentTransportation.destinationId)?.name || '';

    if (currentTransportation.id) {
      setTransportations(prev => prev.map(t => t.id === currentTransportation.id ? { ...t, ...currentTransportation, destinationName: destName } as TransportationMaster : t));
    } else {
      const newTransport: TransportationMaster = {
        ...currentTransportation as TransportationMaster,
        id: Math.random().toString(),
        destinationName: destName
      };
      setTransportations(prev => [...prev, newTransport]);
    }
    setShowModal(false);
    resetForm();
  };

  const handleSaveTariff = () => {
    if (!currentTransportation.id) return;
    const tariff: TransportationTariff = {
        id: Math.random().toString(),
        transportationId: currentTransportation.id,
        supplierName: newTariff.supplierName || '',
        destination: newTariff.destination || 'All',
        validFrom: newTariff.validFrom || '',
        validTo: newTariff.validTo || '',
        type: newTariff.type || '',
        status: newTariff.status || 'Active',
        vehicleType: newTariff.vehicleType || '',
        taxSlab: newTariff.taxSlab || '',
        currency: newTariff.currency || 'INR',
        vehicleCost: Number(newTariff.vehicleCost) || 0,
        parkingFee: Number(newTariff.parkingFee) || 0,
        representativeEntryFee: Number(newTariff.representativeEntryFee) || 0,
        assistance: Number(newTariff.assistance) || 0,
        additionalAllowance: Number(newTariff.additionalAllowance) || 0,
        interStateToll: Number(newTariff.interStateToll) || 0,
        miscCost: Number(newTariff.miscCost) || 0,
        remarks: newTariff.remarks || ''
    };
    setTariffs([...tariffs, tariff]);
    setNewTariff({ 
        status: 'Active', currency: 'INR', taxSlab: 'Exlusive(8%) (8)', type: 'Package Cost', supplierName: '1589 Gen X Haut Monde (Sector15)' 
    });
  };

  const resetForm = () => {
    setCurrentTransportation({ 
      status: 'Active',
      destinationId: '',
      transferType: 'None'
    });
  };

  const filteredTransportations = transportations.filter(t => {
    const matchesName = t.name.toLowerCase().includes(searchName.toLowerCase());
    const matchesDest = filterDestination === 'All' || t.destinationName === filterDestination;
    const matchesType = filterType === 'All' || t.transferType === filterType;
    return matchesName && matchesDest && matchesType;
  });

  const currentTariffs = tariffs.filter(t => t.transportationId === currentTransportation.id);

  if (view === 'rates') {
      return (
        <div className="h-full flex flex-col bg-slate-50 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="bg-white px-6 py-4 border-b border-slate-200 flex items-center gap-4 shadow-sm">
                <button onClick={() => setView('list')} className="bg-white border border-slate-300 text-slate-700 px-4 py-1.5 rounded-full text-sm font-medium hover:bg-slate-50">Back</button>
                <h2 className="text-xl font-bold text-slate-800">{currentTransportation.name}</h2>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
                {/* Add Tariff Form */}
                <div className="bg-white border border-green-200 rounded-lg shadow-sm mb-6 overflow-hidden">
                    <div className="bg-green-100 px-4 py-2 border-b border-green-200 flex justify-between items-center">
                        <h4 className="font-bold text-green-800 text-sm">Add Transportation Rate</h4>
                        <button onClick={() => setShowAddTariff(!showAddTariff)} className="text-green-800 hover:text-green-900"><X size={16}/></button>
                    </div>
                    {showAddTariff && (
                    <div className="p-4 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-3 items-end">
                        {/* Row 1 */}
                        <div className="col-span-1 lg:col-span-2">
                            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Supplier Name</label>
                            <select 
                                value={newTariff.supplierName} 
                                onChange={e => setNewTariff({...newTariff, supplierName: e.target.value})}
                                className="w-full border border-slate-300 rounded px-2 py-1 text-xs bg-white border-l-4 border-l-red-500"
                            >
                                <option>1589 Gen X Haut Monde (Sector15)</option>
                                <option>Kamboj Pvt. Lmt.</option>
                            </select>
                        </div>
                        <div className="col-span-1 lg:col-span-2">
                            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Destination</label>
                            <select 
                                value={newTariff.destination} 
                                onChange={e => setNewTariff({...newTariff, destination: e.target.value})}
                                className="w-full border border-slate-300 rounded px-2 py-1 text-xs bg-white border-l-4 border-l-red-500"
                            >
                                <option>All</option>
                                {initialDestinations.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
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
                            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Type</label>
                            <select 
                                value={newTariff.type} 
                                onChange={e => setNewTariff({...newTariff, type: e.target.value})}
                                className="w-full border border-slate-300 rounded px-2 py-1 text-xs bg-white border-l-4 border-l-red-500"
                            >
                                <option>Package Cost</option>
                                <option>Per Km</option>
                            </select>
                        </div>
                        <div className="col-span-1">
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
                        
                        {/* Row 2 */}
                        <div className="col-span-1">
                             <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Vehicle Type</label>
                             <select 
                                value={newTariff.vehicleType} 
                                onChange={e => setNewTariff({...newTariff, vehicleType: e.target.value})}
                                className="w-full border border-slate-300 rounded px-2 py-1 text-xs bg-white"
                             >
                                <option value="">Select</option>
                                {initialVehicleTypes.map(v => <option key={v.id} value={v.name}>{v.name}</option>)}
                                <option>SUV - Crysta</option>
                                <option>12 seater Traveller</option>
                             </select>
                        </div>
                        <div className="col-span-1">
                             <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Tax Slab (Tax %)</label>
                             <select 
                                value={newTariff.taxSlab} 
                                onChange={e => setNewTariff({...newTariff, taxSlab: e.target.value})}
                                className="w-full border border-slate-300 rounded px-2 py-1 text-xs bg-white border-l-4 border-l-red-500"
                             >
                                <option>Exlusive(8%) (8)</option>
                                <option>Inclusive</option>
                             </select>
                        </div>
                        <div className="col-span-1">
                             <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Currency</label>
                             <select 
                                value={newTariff.currency} 
                                onChange={e => setNewTariff({...newTariff, currency: e.target.value})}
                                className="w-full border border-slate-300 rounded px-2 py-1 text-xs bg-white border-l-4 border-l-red-500"
                             >
                                <option>INR</option>
                                <option>USD</option>
                             </select>
                        </div>
                        <div className="col-span-1">
                             <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Vehicle Cost</label>
                             <input 
                                type="number" 
                                value={newTariff.vehicleCost || ''} 
                                onChange={e => setNewTariff({...newTariff, vehicleCost: Number(e.target.value)})}
                                className="w-full border border-slate-300 rounded px-2 py-1 text-xs"
                             />
                        </div>
                        <div className="col-span-1">
                             <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Parking Fee</label>
                             <input 
                                type="number" 
                                value={newTariff.parkingFee || ''} 
                                onChange={e => setNewTariff({...newTariff, parkingFee: Number(e.target.value)})}
                                className="w-full border border-slate-300 rounded px-2 py-1 text-xs"
                             />
                        </div>
                        <div className="col-span-1">
                             <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Rep Entry Fee</label>
                             <input 
                                type="number" 
                                value={newTariff.representativeEntryFee || ''} 
                                onChange={e => setNewTariff({...newTariff, representativeEntryFee: Number(e.target.value)})}
                                className="w-full border border-slate-300 rounded px-2 py-1 text-xs"
                             />
                        </div>
                        
                        <div className="col-span-1">
                             <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Assistance</label>
                             <input 
                                type="number" 
                                value={newTariff.assistance || ''} 
                                onChange={e => setNewTariff({...newTariff, assistance: Number(e.target.value)})}
                                className="w-full border border-slate-300 rounded px-2 py-1 text-xs"
                             />
                        </div>
                        <div className="col-span-1">
                             <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Adtnl Allowance</label>
                             <input 
                                type="number" 
                                value={newTariff.additionalAllowance || ''} 
                                onChange={e => setNewTariff({...newTariff, additionalAllowance: Number(e.target.value)})}
                                className="w-full border border-slate-300 rounded px-2 py-1 text-xs"
                             />
                        </div>
                        <div className="col-span-1">
                             <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Inter State & Toll</label>
                             <input 
                                type="number" 
                                value={newTariff.interStateToll || ''} 
                                onChange={e => setNewTariff({...newTariff, interStateToll: Number(e.target.value)})}
                                className="w-full border border-slate-300 rounded px-2 py-1 text-xs"
                             />
                        </div>
                         <div className="col-span-1">
                             <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Misc Cost</label>
                             <input 
                                type="number" 
                                value={newTariff.miscCost || ''} 
                                onChange={e => setNewTariff({...newTariff, miscCost: Number(e.target.value)})}
                                className="w-full border border-slate-300 rounded px-2 py-1 text-xs"
                             />
                        </div>
                        <div className="col-span-1 lg:col-span-5">
                             <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Remarks</label>
                             <input 
                                type="text" 
                                value={newTariff.remarks || ''} 
                                onChange={e => setNewTariff({...newTariff, remarks: e.target.value})}
                                className="w-full border border-slate-300 rounded px-2 py-1 text-xs"
                             />
                        </div>
                        <div className="col-span-1">
                             <button onClick={handleSaveTariff} className="w-full bg-blue-500 hover:bg-blue-600 text-white py-1.5 rounded text-sm font-medium">Save</button>
                        </div>
                    </div>
                    )}
                </div>

                {/* Tariff Table */}
                {currentTariffs.length > 0 ? (
                  <div className="space-y-6">
                    {/* Group by Supplier (Simplified for now, assuming one supplier or list all) */}
                    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                         <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                            <Car size={18} className="text-slate-400"/>
                            <h3 className="font-bold text-slate-700 text-sm">Supplier - {currentTariffs[0].supplierName}</h3>
                         </div>
                         
                         <div className="p-3 bg-slate-50/50 border-b border-slate-200 text-xs font-bold text-slate-600">
                             Validity Date: {currentTariffs[0].validFrom} - {currentTariffs[0].validTo}
                         </div>
                         
                         <div className="overflow-x-auto">
                             <table className="w-full text-xs text-left whitespace-nowrap">
                                 <thead className="bg-slate-100 text-slate-600 font-bold uppercase border-b border-slate-200">
                                     <tr>
                                         <th className="px-3 py-2 border-r">Transportation Name</th>
                                         <th className="px-3 py-2 border-r">Type</th>
                                         <th className="px-3 py-2 border-r">Destination</th>
                                         <th className="px-3 py-2 border-r">Vehicle Type</th>
                                         <th className="px-3 py-2 border-r">TAX SLAB (TAX %)</th>
                                         <th className="px-3 py-2 border-r">Vehicle Cost</th>
                                         <th className="px-3 py-2 border-r">Parking</th>
                                         <th className="px-3 py-2 border-r">Representative Entry Fee</th>
                                         <th className="px-3 py-2 border-r">Assistance</th>
                                         <th className="px-3 py-2 border-r">Additional Allowance</th>
                                         <th className="px-3 py-2 border-r">Inter State & Toll</th>
                                         <th className="px-3 py-2 border-r">Miscellaneous Cost</th>
                                         <th className="px-3 py-2 border-r">Status</th>
                                         <th className="px-3 py-2 text-center">Action</th>
                                     </tr>
                                 </thead>
                                 <tbody className="divide-y divide-slate-100">
                                     {currentTariffs.map(tariff => (
                                         <tr key={tariff.id} className="hover:bg-slate-50">
                                             <td className="px-3 py-2 border-r font-medium">{currentTransportation.name}</td>
                                             <td className="px-3 py-2 border-r text-slate-600">{tariff.type}</td>
                                             <td className="px-3 py-2 border-r text-slate-600">{tariff.destination}</td>
                                             <td className="px-3 py-2 border-r text-slate-600">{tariff.vehicleType}</td>
                                             <td className="px-3 py-2 border-r text-slate-600">{tariff.taxSlab}</td>
                                             <td className="px-3 py-2 border-r font-bold">{tariff.vehicleCost}</td>
                                             <td className="px-3 py-2 border-r">{tariff.parkingFee}</td>
                                             <td className="px-3 py-2 border-r">{tariff.representativeEntryFee}</td>
                                             <td className="px-3 py-2 border-r">{tariff.assistance}</td>
                                             <td className="px-3 py-2 border-r">{tariff.additionalAllowance}</td>
                                             <td className="px-3 py-2 border-r">{tariff.interStateToll}</td>
                                             <td className="px-3 py-2 border-r">{tariff.miscCost}</td>
                                             <td className="px-3 py-2 border-r text-slate-600">{tariff.status}</td>
                                             <td className="px-3 py-2 text-center text-green-600 cursor-pointer hover:bg-green-50">
                                                 <Edit size={14} className="mx-auto"/>
                                             </td>
                                         </tr>
                                     ))}
                                 </tbody>
                             </table>
                         </div>
                    </div>
                  </div>
                ) : (
                   <div className="text-center py-12 text-slate-400 text-sm bg-white rounded-lg border border-slate-200">
                       No tariffs found. Add a new rate above.
                   </div>
                )}
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
            <h2 className="text-2xl font-bold text-slate-800">Transportation</h2>
            <p className="text-sm text-slate-500">Manage transportation services</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
           <button className="bg-white border border-slate-300 text-slate-600 px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-50 text-sm font-medium shadow-sm">
             <Download size={16}/> Download Data
           </button>
           <label className="bg-white border border-slate-300 text-slate-600 px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-50 text-sm font-medium shadow-sm cursor-pointer">
             <Upload size={16}/> Download / Import 
             <input type="file" className="hidden" accept=".csv,.xlsx"/>
           </label>
           <button className="bg-white border border-slate-300 text-slate-600 px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-50 text-sm font-medium shadow-sm">
             <History size={16}/> View Logs
           </button>
           <button 
             onClick={() => { resetForm(); setShowModal(true); }} 
             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm text-sm font-medium"
           >
             <Plus size={18} /> Add Transportation
           </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-6 flex flex-wrap gap-4 items-end">
         <div className="flex-1 min-w-[200px]">
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Transport Name</label>
            <input 
              type="text" 
              value={searchName} 
              onChange={(e) => setSearchName(e.target.value)} 
              placeholder="Keyword" 
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
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Transfer Type</label>
            <select 
              value={filterType} 
              onChange={(e) => setFilterType(e.target.value)} 
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
               <option value="All">All</option>
               {initialTransferTypes.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
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
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Sr.</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Transport Name</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Destinations</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Transfer Type</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase text-center">Detail</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase text-center">Rate Sheet</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Status</th>
                     <th className="px-4 py-3 text-right text-xs font-bold text-slate-500 uppercase">Action</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {filteredTransportations.map((item, index) => (
                     <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3 text-center"><input type="checkbox" className="rounded"/></td>
                        <td className="px-4 py-3 text-sm text-slate-500">{index + 1}</td>
                        <td className="px-4 py-3 font-medium text-slate-800">{item.name}</td>
                        <td className="px-4 py-3 text-sm text-slate-600">{item.destinationName}</td>
                        <td className="px-4 py-3 text-sm text-slate-600">{item.transferType}</td>
                        <td className="px-4 py-3 text-center">
                           <button className="text-blue-600 text-xs font-medium hover:underline">View</button>
                        </td>
                        <td className="px-4 py-3 text-center">
                           <button 
                             onClick={() => handleViewRates(item)}
                             className="text-blue-600 text-xs font-medium hover:underline"
                           >
                             Rates
                           </button>
                        </td>
                        <td className="px-4 py-3">
                           <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {item.status}
                           </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                           <div className="flex items-center justify-end gap-2">
                              <button onClick={() => handleEdit(item)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded">
                                <Edit2 size={16}/>
                              </button>
                              <button onClick={(e) => handleDelete(item.id, e)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded">
                                <Trash2 size={16}/>
                              </button>
                           </div>
                        </td>
                     </tr>
                  ))}
                  {filteredTransportations.length === 0 && (
                    <tr>
                      <td colSpan={9} className="px-6 py-8 text-center text-slate-400 text-sm">No transportation found.</td>
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
                  <h3 className="text-lg font-bold text-white">{currentTransportation.id ? 'Edit Transportation' : 'Add Transportation'}</h3>
                  <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                    <X size={20} />
                  </button>
               </div>
               
               <div className="p-6 space-y-6 overflow-y-auto flex-1">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Transport Name</label>
                          <input 
                            type="text" 
                            value={currentTransportation.name || ''} 
                            onChange={(e) => setCurrentTransportation({...currentTransportation, name: e.target.value})} 
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-l-4 border-l-red-500"
                          />
                      </div>
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Destinations</label>
                          <select 
                            value={currentTransportation.destinationId} 
                            onChange={(e) => setCurrentTransportation({...currentTransportation, destinationId: e.target.value})} 
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                             <option value="">Search Destination</option>
                             {initialDestinations.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                          </select>
                      </div>
                      
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Status</label>
                          <select 
                            value={currentTransportation.status} 
                            onChange={(e) => setCurrentTransportation({...currentTransportation, status: e.target.value as any})} 
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                             <option value="Active">Active</option>
                             <option value="Inactive">Inactive</option>
                          </select>
                      </div>
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Transfer Type</label>
                          <select 
                            value={currentTransportation.transferType} 
                            onChange={(e) => setCurrentTransportation({...currentTransportation, transferType: e.target.value})} 
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                             <option value="None">None</option>
                             {initialTransferTypes.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
                          </select>
                      </div>
                  </div>

                  <div>
                     <label className="block text-xs font-semibold text-slate-500 mb-1">Detail</label>
                     <div className="border border-slate-300 rounded-lg overflow-hidden">
                        <div className="bg-slate-50 px-3 py-2 border-b border-slate-300 flex gap-4 text-slate-600 text-xs">
                           <span>File</span><span>Edit</span><span>View</span><span>Insert</span><span>Format</span>
                        </div>
                        <div className="px-3 py-2 flex gap-3 text-slate-500 border-b border-slate-100">
                           <button className="hover:text-blue-600"><ArrowLeftSmall size={14}/></button>
                           <button className="hover:text-blue-600"><ArrowLeftSmall size={14} className="rotate-180"/></button>
                           <select className="text-xs border border-slate-200 rounded"><option>Paragraph</option></select>
                           <button className="hover:text-blue-600 font-bold"><Bold size={14}/></button>
                           <button className="hover:text-blue-600 italic"><Italic size={14}/></button>
                           <button className="hover:text-blue-600">•••</button>
                        </div>
                        <textarea 
                          value={currentTransportation.description || ''}
                          onChange={e => setCurrentTransportation({...currentTransportation, description: e.target.value})}
                          className="w-full h-32 p-3 outline-none text-sm resize-none"
                        ></textarea>
                        <div className="bg-slate-50 border-t border-slate-300 px-3 py-1 text-[10px] text-slate-400 text-right">Powered by TinyMCE</div>
                     </div>
                  </div>

                  <div>
                     <label className="block text-xs font-semibold text-slate-500 mb-1">Internal Note</label>
                     <div className="border border-slate-300 rounded-lg overflow-hidden">
                        <div className="bg-slate-50 px-3 py-2 border-b border-slate-300 flex gap-4 text-slate-600 text-xs">
                           <span>File</span><span>Edit</span><span>View</span><span>Insert</span><span>Format</span>
                        </div>
                        <div className="px-3 py-2 flex gap-3 text-slate-500 border-b border-slate-100">
                           <button className="hover:text-blue-600"><ArrowLeftSmall size={14}/></button>
                           <button className="hover:text-blue-600"><ArrowLeftSmall size={14} className="rotate-180"/></button>
                           <select className="text-xs border border-slate-200 rounded"><option>Paragraph</option></select>
                           <button className="hover:text-blue-600 font-bold"><Bold size={14}/></button>
                           <button className="hover:text-blue-600 italic"><Italic size={14}/></button>
                           <button className="hover:text-blue-600">•••</button>
                        </div>
                        <textarea 
                          value={currentTransportation.internalNote || ''}
                          onChange={e => setCurrentTransportation({...currentTransportation, internalNote: e.target.value})}
                          className="w-full h-24 p-3 outline-none text-sm resize-none"
                        ></textarea>
                        <div className="bg-slate-50 border-t border-slate-300 px-3 py-1 text-[10px] text-slate-400 text-right">Powered by TinyMCE</div>
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

export default TransportationMaster;
