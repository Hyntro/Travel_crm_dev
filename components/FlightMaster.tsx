
import React, { useState } from 'react';
import { ArrowLeft, Download, Upload, Plus, Search, Edit2, Trash2, X, History, FileSpreadsheet, ChevronDown, Calendar } from 'lucide-react';
import { FlightMaster, FlightTariff } from '../types';
import { initialFlights, initialAirlines, initialDestinations, initialFlightSeatClasses } from './mockData';

interface FlightMasterProps {
  onBack: () => void;
}

const FlightMaster: React.FC<FlightMasterProps> = ({ onBack }) => {
  const [flights, setFlights] = useState<FlightMaster[]>(initialFlights);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  // View State
  const [view, setView] = useState<'list' | 'rates'>('list');
  const [currentFlight, setCurrentFlight] = useState<Partial<FlightMaster>>({ 
    status: 'Active'
  });

  // Tariffs
  const [tariffs, setTariffs] = useState<FlightTariff[]>([]);
  const [newTariff, setNewTariff] = useState<Partial<FlightTariff>>({
      supplierName: 'Select Supplier',
      cabinClass: 'Select Class',
      currency: 'INR',
      roe: 1,
      taxSlab: 'GSTInclusive (0)'
  });

  const handleEdit = (flight: FlightMaster) => {
    setCurrentFlight({ ...flight });
    setShowModal(true);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (window.confirm('Delete flight?')) {
      setFlights(prev => prev.filter(f => f.id !== id));
    }
  };

  const handleViewRates = (flight: FlightMaster) => {
      setCurrentFlight({ ...flight });
      setView('rates');
  };

  const handleSave = () => {
    if (!currentFlight.airlineId || !currentFlight.flightNumber) return;
    
    const airlineName = initialAirlines.find(a => a.id === currentFlight.airlineId)?.name || '';
    const fromName = initialDestinations.find(d => d.id === currentFlight.fromDestinationId)?.name || '';
    const toName = initialDestinations.find(d => d.id === currentFlight.toDestinationId)?.name || '';
    const viaName = initialDestinations.find(d => d.id === currentFlight.viaDestinationId)?.name || '';

    const newFlight: FlightMaster = {
        id: currentFlight.id || Math.random().toString(),
        airlineId: currentFlight.airlineId,
        airlineName: airlineName,
        flightNumber: currentFlight.flightNumber,
        fromDestinationId: currentFlight.fromDestinationId || '',
        fromDestinationName: fromName,
        toDestinationId: currentFlight.toDestinationId || '',
        toDestinationName: toName,
        departureTime: currentFlight.departureTime || '',
        arrivalTime: currentFlight.arrivalTime || '',
        daysOfOperation: currentFlight.daysOfOperation || '',
        viaDestinationId: currentFlight.viaDestinationId,
        viaDestinationName: viaName,
        departureTerminal: currentFlight.departureTerminal || '',
        arrivalTerminal: currentFlight.arrivalTerminal || '',
        status: currentFlight.status || 'Active'
    };

    if (currentFlight.id) {
        setFlights(prev => prev.map(f => f.id === currentFlight.id ? newFlight : f));
    } else {
        setFlights(prev => [...prev, newFlight]);
    }
    setShowModal(false);
    setCurrentFlight({ status: 'Active' });
  };

  const handleSaveTariff = () => {
      if (!currentFlight.id) return;
      const tariff: FlightTariff = {
          id: Math.random().toString(),
          flightId: currentFlight.id,
          supplierName: newTariff.supplierName || '',
          cabinClass: newTariff.cabinClass || '',
          validFrom: newTariff.validFrom || '',
          validTo: newTariff.validTo || '',
          currency: newTariff.currency || 'INR',
          roe: Number(newTariff.roe) || 1,
          adultBaseFare: Number(newTariff.adultBaseFare) || 0,
          adultTax: Number(newTariff.adultTax) || 0,
          childBaseFare: Number(newTariff.childBaseFare) || 0,
          childTax: Number(newTariff.childTax) || 0,
          baggageAllowance: newTariff.baggageAllowance || '',
          taxSlab: newTariff.taxSlab || ''
      };
      setTariffs([...tariffs, tariff]);
      // Reset some fields
      setNewTariff({ ...newTariff, adultBaseFare: 0, adultTax: 0, childBaseFare: 0, childTax: 0 });
  };

  const filteredFlights = flights.filter(f => {
    const matchesSearch = f.flightNumber.toLowerCase().includes(search.toLowerCase()) || f.airlineName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || f.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const currentFlightTariffs = tariffs.filter(t => t.flightId === currentFlight.id);

  // --- Rate Sheet View ---
  if (view === 'rates') {
      return (
        <div className="h-full flex flex-col bg-slate-50 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="bg-white px-6 py-4 border-b border-slate-200 flex items-center gap-4 shadow-sm">
                <button onClick={() => setView('list')} className="bg-white border border-slate-300 text-slate-700 px-4 py-1.5 rounded-full text-sm font-medium hover:bg-slate-50">Back</button>
                <h2 className="text-xl font-bold text-slate-800">Airline Name : {currentFlight.airlineName}</h2>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
                <div className="bg-white border border-green-200 rounded-lg shadow-sm mb-6 overflow-hidden">
                    <div className="bg-green-100 px-4 py-2 border-b border-green-200">
                        <h4 className="font-bold text-green-800 text-sm">Add Flight Rates</h4>
                    </div>
                    <div className="p-4 space-y-4">
                        {/* Row 1 */}
                        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-9 gap-3 items-end">
                            <div className="col-span-1">
                                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Supplier Name</label>
                                <select 
                                    value={newTariff.supplierName} 
                                    onChange={e => setNewTariff({...newTariff, supplierName: e.target.value})}
                                    className="w-full border border-slate-300 rounded px-2 py-1 text-xs bg-white border-l-4 border-l-red-500"
                                >
                                    <option>Select Supplier</option>
                                    <option>Direct</option>
                                </select>
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Airline Name</label>
                                <input type="text" value={currentFlight.airlineName} readOnly className="w-full border border-slate-300 rounded px-2 py-1 text-xs bg-slate-50 border-l-4 border-l-red-500"/>
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Flight Number</label>
                                <input type="text" value={currentFlight.flightNumber} readOnly className="w-full border border-slate-300 rounded px-2 py-1 text-xs bg-slate-50 border-l-4 border-l-red-500"/>
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Cabin/Class</label>
                                <select 
                                    value={newTariff.cabinClass} 
                                    onChange={e => setNewTariff({...newTariff, cabinClass: e.target.value})}
                                    className="w-full border border-slate-300 rounded px-2 py-1 text-xs bg-white border-l-4 border-l-red-500"
                                >
                                    <option>Select Class</option>
                                    {initialFlightSeatClasses.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                                </select>
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">From</label>
                                <input type="text" value={currentFlight.fromDestinationName} readOnly className="w-full border border-slate-300 rounded px-2 py-1 text-xs bg-slate-50 border-l-4 border-l-red-500"/>
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">To</label>
                                <input type="text" value={currentFlight.toDestinationName} readOnly className="w-full border border-slate-300 rounded px-2 py-1 text-xs bg-slate-50 border-l-4 border-l-red-500"/>
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Via</label>
                                <input type="text" value={currentFlight.viaDestinationName || '-'} readOnly className="w-full border border-slate-300 rounded px-2 py-1 text-xs bg-slate-50 border-l-4 border-l-red-500"/>
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">DPT Time</label>
                                <input type="text" value={currentFlight.departureTime} readOnly className="w-full border border-slate-300 rounded px-2 py-1 text-xs bg-slate-50"/>
                            </div>
                             <div className="col-span-1">
                                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">ARR Time</label>
                                <input type="text" value={currentFlight.arrivalTime} readOnly className="w-full border border-slate-300 rounded px-2 py-1 text-xs bg-slate-50"/>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-9 gap-3 items-end">
                            <div className="col-span-1">
                                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Bag. Alw. (KG)</label>
                                <input type="text" value={newTariff.baggageAllowance || ''} onChange={e => setNewTariff({...newTariff, baggageAllowance: e.target.value})} className="w-full border border-slate-300 rounded px-2 py-1 text-xs"/>
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Rate Valid From</label>
                                <div className="relative">
                                    <input type="date" value={newTariff.validFrom} onChange={e => setNewTariff({...newTariff, validFrom: e.target.value})} className="w-full border border-slate-300 rounded px-2 py-1 text-xs border-l-4 border-l-red-500"/>
                                    <Calendar size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"/>
                                </div>
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Rate Valid To</label>
                                <div className="relative">
                                    <input type="date" value={newTariff.validTo} onChange={e => setNewTariff({...newTariff, validTo: e.target.value})} className="w-full border border-slate-300 rounded px-2 py-1 text-xs border-l-4 border-l-red-500"/>
                                    <Calendar size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"/>
                                </div>
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Currency</label>
                                <select value={newTariff.currency} onChange={e => setNewTariff({...newTariff, currency: e.target.value})} className="w-full border border-slate-300 rounded px-2 py-1 text-xs bg-white border-l-4 border-l-red-500">
                                    <option>INR</option><option>USD</option>
                                </select>
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">ROE (INR)</label>
                                <input type="number" value={newTariff.roe} onChange={e => setNewTariff({...newTariff, roe: Number(e.target.value)})} className="w-full border border-slate-300 rounded px-2 py-1 text-xs"/>
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1 text-center">Adult Cost & Tax</label>
                                <div className="flex gap-1">
                                    <input type="number" placeholder="Base" value={newTariff.adultBaseFare || ''} onChange={e => setNewTariff({...newTariff, adultBaseFare: Number(e.target.value)})} className="w-1/2 border border-slate-300 rounded px-1 py-1 text-xs"/>
                                    <input type="number" placeholder="Tax" value={newTariff.adultTax || ''} onChange={e => setNewTariff({...newTariff, adultTax: Number(e.target.value)})} className="w-1/2 border border-slate-300 rounded px-1 py-1 text-xs"/>
                                </div>
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Total Cost</label>
                                <input type="number" readOnly value={(newTariff.adultBaseFare || 0) + (newTariff.adultTax || 0)} className="w-full border border-slate-300 rounded px-2 py-1 text-xs bg-slate-50"/>
                            </div>
                             <div className="col-span-1">
                                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1 text-center">Child Cost & Tax</label>
                                <div className="flex gap-1">
                                    <input type="number" placeholder="Base" value={newTariff.childBaseFare || ''} onChange={e => setNewTariff({...newTariff, childBaseFare: Number(e.target.value)})} className="w-1/2 border border-slate-300 rounded px-1 py-1 text-xs"/>
                                    <input type="number" placeholder="Tax" value={newTariff.childTax || ''} onChange={e => setNewTariff({...newTariff, childTax: Number(e.target.value)})} className="w-1/2 border border-slate-300 rounded px-1 py-1 text-xs"/>
                                </div>
                            </div>
                             <div className="col-span-1">
                                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Total Cost</label>
                                <input type="number" readOnly value={(newTariff.childBaseFare || 0) + (newTariff.childTax || 0)} className="w-full border border-slate-300 rounded px-2 py-1 text-xs bg-slate-50"/>
                            </div>
                        </div>
                        
                         <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-9 gap-3 items-end">
                             <div className="col-span-1 lg:col-span-2">
                                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Tax Slab(%)</label>
                                <select value={newTariff.taxSlab} onChange={e => setNewTariff({...newTariff, taxSlab: e.target.value})} className="w-full border border-slate-300 rounded px-2 py-1 text-xs bg-white">
                                    <option>GSTInclusive (0)</option>
                                    <option>GST 5%</option>
                                </select>
                             </div>
                             <div className="col-span-1 lg:col-span-7 flex justify-end">
                                 <button onClick={handleSaveTariff} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-1.5 rounded text-sm font-medium">Save</button>
                             </div>
                         </div>
                    </div>
                </div>

                {/* Tariff Table */}
                <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                     <div className="p-4 text-center text-slate-400 text-sm">
                        {currentFlightTariffs.length === 0 ? 'No Tariff found' : (
                            <table className="w-full text-left text-xs">
                                <thead className="bg-slate-100 font-bold">
                                    <tr>
                                        <th className="p-2">Supplier</th>
                                        <th className="p-2">Valid From</th>
                                        <th className="p-2">Valid To</th>
                                        <th className="p-2">Class</th>
                                        <th className="p-2">Adult Total</th>
                                        <th className="p-2">Child Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentFlightTariffs.map(t => (
                                        <tr key={t.id} className="border-t border-slate-100">
                                            <td className="p-2">{t.supplierName}</td>
                                            <td className="p-2">{t.validFrom}</td>
                                            <td className="p-2">{t.validTo}</td>
                                            <td className="p-2">{t.cabinClass}</td>
                                            <td className="p-2">{t.currency} {(t.adultBaseFare || 0) + (t.adultTax || 0)}</td>
                                            <td className="p-2">{t.currency} {(t.childBaseFare || 0) + (t.childTax || 0)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                     </div>
                </div>
            </div>
        </div>
      );
  }

  // --- List View ---
  return (
    <div className="h-full flex flex-col animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Flight Master</h2>
            <p className="text-sm text-slate-500">Manage flights schedules and tariffs</p>
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
             onClick={() => { setCurrentFlight({ status: 'Active' }); setShowModal(true); }} 
             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm text-sm font-medium"
           >
             <Plus size={18} /> Add Flight
           </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
         <div className="relative flex-1 w-full max-w-md">
            <label className="absolute -top-2 left-2 px-1 bg-white text-[10px] font-semibold text-slate-500">Keyword</label>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
              placeholder="Search Flight" 
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

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 flex-1 overflow-hidden flex flex-col">
         <div className="overflow-x-auto flex-1">
            <table className="w-full text-left">
               <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Sr.</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Flight Name</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Flight Number</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">From Destination</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">To Destination</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Departure Time</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Arrivel Time</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Days Of Operation</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Via</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Status</th>
                     <th className="px-4 py-3 text-right text-xs font-bold text-slate-500 uppercase">Rate Sheet</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {filteredFlights.map((flight, index) => (
                     <tr key={flight.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3 text-sm text-slate-500">{index + 1}</td>
                        <td className="px-4 py-3 font-medium text-slate-800">{flight.airlineName}</td>
                        <td className="px-4 py-3 text-sm text-slate-600">{flight.flightNumber}</td>
                        <td className="px-4 py-3 text-sm text-slate-600">{flight.fromDestinationName}</td>
                        <td className="px-4 py-3 text-sm text-slate-600">{flight.toDestinationName}</td>
                        <td className="px-4 py-3 text-sm text-slate-600">{flight.departureTime}</td>
                        <td className="px-4 py-3 text-sm text-slate-600">{flight.arrivalTime}</td>
                        <td className="px-4 py-3 text-sm text-slate-600">{flight.daysOfOperation}</td>
                        <td className="px-4 py-3 text-sm text-slate-600">{flight.viaDestinationName || '-'}</td>
                        <td className="px-4 py-3">
                           <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${flight.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {flight.status}
                           </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                           <button onClick={() => handleViewRates(flight)} className="text-blue-600 hover:underline text-xs font-medium">Rate Sheet</button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      {showModal && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col">
               <div className="bg-slate-800 px-6 py-4 flex justify-between items-center">
                  <h3 className="text-lg font-bold text-white">{currentFlight.id ? 'Edit Flight' : 'Add Flight'}</h3>
                  <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                    <X size={20} />
                  </button>
               </div>
               
               <div className="p-6 space-y-4 overflow-y-auto flex-1">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Airline Name</label>
                          <select 
                            value={currentFlight.airlineId} 
                            onChange={(e) => setCurrentFlight({...currentFlight, airlineId: e.target.value})} 
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 border-l-4 border-l-red-500"
                          >
                             <option value="">Select Airline</option>
                             {initialAirlines.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                          </select>
                      </div>
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Flight Number</label>
                          <input 
                            type="text" 
                            value={currentFlight.flightNumber || ''} 
                            onChange={(e) => setCurrentFlight({...currentFlight, flightNumber: e.target.value})} 
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-l-4 border-l-red-500"
                          />
                      </div>
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">From Destination</label>
                          <select 
                            value={currentFlight.fromDestinationId} 
                            onChange={(e) => setCurrentFlight({...currentFlight, fromDestinationId: e.target.value})} 
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 border-l-4 border-l-red-500"
                          >
                             <option value="">Select Destination</option>
                             {initialDestinations.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                          </select>
                      </div>
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">To Destination</label>
                          <select 
                            value={currentFlight.toDestinationId} 
                            onChange={(e) => setCurrentFlight({...currentFlight, toDestinationId: e.target.value})} 
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 border-l-4 border-l-red-500"
                          >
                             <option value="">Select Destination</option>
                             {initialDestinations.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                          </select>
                      </div>
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">DPT Time</label>
                          <input 
                            type="time" 
                            value={currentFlight.departureTime || ''} 
                            onChange={(e) => setCurrentFlight({...currentFlight, departureTime: e.target.value})} 
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                      </div>
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">ARR Time</label>
                          <input 
                            type="time" 
                            value={currentFlight.arrivalTime || ''} 
                            onChange={(e) => setCurrentFlight({...currentFlight, arrivalTime: e.target.value})} 
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                      </div>
                       <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Via</label>
                          <select 
                            value={currentFlight.viaDestinationId} 
                            onChange={(e) => setCurrentFlight({...currentFlight, viaDestinationId: e.target.value})} 
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                             <option value="">Select Destination</option>
                             {initialDestinations.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                          </select>
                      </div>
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Departure terminal</label>
                          <input 
                            type="text" 
                            value={currentFlight.departureTerminal || ''} 
                            onChange={(e) => setCurrentFlight({...currentFlight, departureTerminal: e.target.value})} 
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                      </div>
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Arrival terminal</label>
                          <input 
                            type="text" 
                            value={currentFlight.arrivalTerminal || ''} 
                            onChange={(e) => setCurrentFlight({...currentFlight, arrivalTerminal: e.target.value})} 
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                      </div>
                      <div className="md:col-span-2">
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Days Of Operation</label>
                          <input 
                            type="text" 
                            value={currentFlight.daysOfOperation || ''} 
                            onChange={(e) => setCurrentFlight({...currentFlight, daysOfOperation: e.target.value})} 
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g. Daily, Mon, Wed, Fri"
                          />
                      </div>
                      <div>
                         <label className="block text-xs font-semibold text-slate-500 mb-1">Status</label>
                         <select 
                            value={currentFlight.status} 
                            onChange={(e) => setCurrentFlight({...currentFlight, status: e.target.value as any})} 
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                         >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                         </select>
                      </div>
                  </div>
                  
                  <div className="pt-4">
                      <button className="flex items-center gap-2 text-sm font-bold text-slate-700">
                          More Information <ChevronDown size={16}/>
                      </button>
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

export default FlightMaster;
