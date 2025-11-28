
import React, { useState } from 'react';
import { ArrowLeft, Download, Upload, History, FileSpreadsheet, Calendar, Edit, Plus, Search, Trash2, X } from 'lucide-react';
import { Guide, GuideTariff } from '../types';
import { initialGuides, initialGuideTariffs } from './mockData';

interface GuidePriceMasterProps {
  onBack: () => void;
}

const GuidePriceMaster: React.FC<GuidePriceMasterProps> = ({ onBack }) => {
  const [guides, setGuides] = useState<Guide[]>(initialGuides);
  const [tariffs, setTariffs] = useState<GuideTariff[]>(initialGuideTariffs);
  
  // View State: 'list' (guides) or 'rates' (tariffs for selected guide)
  const [view, setView] = useState<'list' | 'rates'>('list');
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);

  // List Filters
  const [keyword, setKeyword] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Rate Form State
  const [newTariff, setNewTariff] = useState<Partial<GuideTariff>>({
    status: 'Active',
    currency: 'INR',
    universalCost: 'Yes',
    dayType: 'Half Day',
    paxRange: 'All',
    supplierName: '1589 Gen X'
  });

  const handleViewRates = (guide: Guide) => {
    setSelectedGuide(guide);
    setView('rates');
  };

  const handleSaveTariff = () => {
    if (!selectedGuide) return;

    const tariff: GuideTariff = {
        id: Math.random().toString(),
        guideId: selectedGuide.id,
        supplierName: newTariff.supplierName || '',
        validFrom: newTariff.validFrom || '',
        validTo: newTariff.validTo || '',
        paxRange: newTariff.paxRange || 'All',
        dayType: newTariff.dayType || 'Half Day',
        universalCost: newTariff.universalCost || 'Yes',
        currency: newTariff.currency || 'INR',
        serviceCost: Number(newTariff.serviceCost) || 0,
        languageAllowance: Number(newTariff.languageAllowance) || 0,
        otherCost: Number(newTariff.otherCost) || 0,
        gstSlab: newTariff.gstSlab || 'Slab 5 (5)',
        status: newTariff.status || 'Active'
    };

    setTariffs([...tariffs, tariff]);
    
    // Reset form (keep some defaults)
    setNewTariff({
        status: 'Active',
        currency: 'INR',
        universalCost: 'Yes',
        dayType: 'Half Day',
        paxRange: 'All',
        supplierName: '1589 Gen X',
        serviceCost: 0,
        languageAllowance: 0,
        otherCost: 0
    });
  };

  const filteredGuides = guides.filter(g => {
      const matchKeyword = g.name.toLowerCase().includes(keyword.toLowerCase());
      const matchStatus = statusFilter === 'All' || g.status === statusFilter;
      return matchKeyword && matchStatus;
  });

  const currentGuideTariffs = tariffs.filter(t => t.guideId === selectedGuide?.id);

  if (view === 'rates' && selectedGuide) {
      return (
        <div className="h-full flex flex-col bg-slate-50 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="bg-white px-6 py-4 border-b border-slate-200 flex items-center gap-4 shadow-sm">
                <button onClick={() => setView('list')} className="bg-white border border-slate-300 text-slate-700 px-4 py-1.5 rounded-full text-sm font-medium hover:bg-slate-50">Back</button>
                <h2 className="text-xl font-bold text-slate-800">Guide: {selectedGuide.name}</h2>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
                {/* Add Tariff Form */}
                <div className="bg-white border border-green-200 rounded-lg shadow-sm mb-6 overflow-hidden">
                    <div className="bg-green-100 px-4 py-2 border-b border-green-200">
                        <h4 className="font-bold text-green-800 text-sm">Add Guide/Porter Price</h4>
                    </div>
                    <div className="p-4 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 gap-3 items-end">
                        <div className="col-span-1 lg:col-span-2">
                            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Supplier Name</label>
                            <select 
                                value={newTariff.supplierName} 
                                onChange={e => setNewTariff({...newTariff, supplierName: e.target.value})}
                                className="w-full border border-slate-300 rounded px-2 py-1 text-xs bg-white border-l-4 border-l-red-500"
                            >
                                <option>1589 Gen X</option>
                                <option>Direct</option>
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
                            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Pax Range</label>
                            <select 
                                value={newTariff.paxRange} 
                                onChange={e => setNewTariff({...newTariff, paxRange: e.target.value})}
                                className="w-full border border-slate-300 rounded px-2 py-1 text-xs bg-white border-l-4 border-l-red-500"
                            >
                                <option>All</option>
                                <option>1-5</option>
                                <option>6-10</option>
                            </select>
                        </div>
                        <div className="col-span-1">
                            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Day Type</label>
                            <select 
                                value={newTariff.dayType} 
                                onChange={e => setNewTariff({...newTariff, dayType: e.target.value as any})}
                                className="w-full border border-slate-300 rounded px-2 py-1 text-xs bg-white border-l-4 border-l-red-500"
                            >
                                <option>Half Day</option>
                                <option>Full Day</option>
                            </select>
                        </div>
                        <div className="col-span-1">
                            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Universal Cost</label>
                            <select 
                                value={newTariff.universalCost} 
                                onChange={e => setNewTariff({...newTariff, universalCost: e.target.value as any})}
                                className="w-full border border-slate-300 rounded px-2 py-1 text-xs bg-white border-l-4 border-l-red-500"
                            >
                                <option>Yes</option>
                                <option>No</option>
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
                                <option>AED</option>
                            </select>
                        </div>
                        <div className="col-span-1">
                            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Service Cost</label>
                            <input 
                                type="number" 
                                value={newTariff.serviceCost || ''} 
                                onChange={e => setNewTariff({...newTariff, serviceCost: Number(e.target.value)})}
                                className="w-full border border-slate-300 rounded px-2 py-1 text-xs border-l-4 border-l-red-500"
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Language Allowance</label>
                            <input 
                                type="number" 
                                value={newTariff.languageAllowance || ''} 
                                onChange={e => setNewTariff({...newTariff, languageAllowance: Number(e.target.value)})}
                                className="w-full border border-slate-300 rounded px-2 py-1 text-xs"
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Other Cost</label>
                            <input 
                                type="number" 
                                value={newTariff.otherCost || ''} 
                                onChange={e => setNewTariff({...newTariff, otherCost: Number(e.target.value)})}
                                className="w-full border border-slate-300 rounded px-2 py-1 text-xs"
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">GST Slab(%)</label>
                            <select 
                                value={newTariff.gstSlab} 
                                onChange={e => setNewTariff({...newTariff, gstSlab: e.target.value})}
                                className="w-full border border-slate-300 rounded px-2 py-1 text-xs bg-white"
                            >
                                <option>Slab 5 (5)</option>
                                <option>Slab 18 (18)</option>
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
                        <div className="col-span-1">
                            <button onClick={handleSaveTariff} className="bg-blue-500 hover:bg-blue-600 text-white w-full py-1 rounded text-xs font-medium">Save</button>
                        </div>
                    </div>
                </div>

                {/* Tariff Table */}
                <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                    <table className="w-full text-xs text-left">
                        <thead className="bg-slate-100 text-slate-600 font-bold uppercase border-b border-slate-200">
                            <tr>
                                <th className="px-3 py-2 border-r">Supplier</th>
                                <th className="px-3 py-2 border-r">Validity</th>
                                <th className="px-3 py-2 border-r">Day Type</th>
                                <th className="px-3 py-2 border-r">Pax Range</th>
                                <th className="px-3 py-2 border-r">Service Cost(PerDay)</th>
                                <th className="px-3 py-2 border-r">Lang Allowance</th>
                                <th className="px-3 py-2 border-r">Other Cost</th>
                                <th className="px-3 py-2 border-r">Guide GST(%)</th>
                                <th className="px-3 py-2 border-r">Status</th>
                                <th className="px-3 py-2 text-center"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {currentGuideTariffs.map(t => (
                                <tr key={t.id} className="hover:bg-slate-50">
                                    <td className="px-3 py-2 border-r text-slate-700">{t.supplierName}</td>
                                    <td className="px-3 py-2 border-r font-medium">{t.validFrom} - {t.validTo}</td>
                                    <td className="px-3 py-2 border-r text-slate-600">{t.dayType}</td>
                                    <td className="px-3 py-2 border-r text-slate-600">{t.paxRange}</td>
                                    <td className="px-3 py-2 border-r">{t.currency} {t.serviceCost}</td>
                                    <td className="px-3 py-2 border-r">{t.currency} {t.languageAllowance}</td>
                                    <td className="px-3 py-2 border-r">{t.currency} {t.otherCost}</td>
                                    <td className="px-3 py-2 border-r">{t.gstSlab}</td>
                                    <td className="px-3 py-2 border-r text-slate-600">{t.status}</td>
                                    <td className="px-3 py-2 text-center text-green-600 cursor-pointer hover:bg-green-50">
                                        <Edit size={14} className="mx-auto"/>
                                    </td>
                                </tr>
                            ))}
                            {currentGuideTariffs.length === 0 && (
                                <tr><td colSpan={10} className="px-3 py-8 text-center text-slate-400">No tariffs found.</td></tr>
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
            <h2 className="text-2xl font-bold text-slate-800">Guide/Porter Price</h2>
            <p className="text-sm text-slate-500">Manage rates for guides and porters</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
           <button className="bg-white border border-slate-300 text-slate-600 px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-50 text-sm font-medium shadow-sm">
             <FileSpreadsheet size={16}/> Download Format
           </button>
           <button className="bg-white border border-slate-300 text-slate-600 px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-50 text-sm font-medium shadow-sm">
             <History size={16}/> View Logs
           </button>
           <label className="bg-white border border-slate-300 text-slate-600 px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-50 text-sm font-medium shadow-sm cursor-pointer">
             <Upload size={16}/> Import Excel
             <input type="file" className="hidden" accept=".csv,.xlsx"/>
           </label>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-6 flex flex-wrap gap-4 items-end">
         <div className="flex-1 min-w-[200px]">
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Keyword</label>
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                type="text" 
                value={keyword} 
                onChange={(e) => setKeyword(e.target.value)} 
                placeholder="Search" 
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
            </div>
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

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 flex-1 overflow-hidden flex flex-col">
         <div className="overflow-x-auto flex-1">
            <table className="w-full text-left">
               <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Sr.</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Guide/Porter Service</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Destination</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Service Type</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase text-center">Rate Sheet</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Status</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {filteredGuides.map((guide, index) => (
                     <tr key={guide.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3 text-sm text-slate-500">{index + 1}</td>
                        <td className="px-4 py-3 font-medium text-slate-800">{guide.name}</td>
                        <td className="px-4 py-3 text-sm text-slate-600">{guide.destinationName}</td>
                        <td className="px-4 py-3 text-sm text-slate-600">{guide.serviceType}</td>
                        <td className="px-4 py-3 text-center">
                           <button 
                             onClick={() => handleViewRates(guide)}
                             className="text-blue-600 text-xs font-medium hover:underline"
                           >
                             Rate Sheet
                           </button>
                        </td>
                        <td className="px-4 py-3">
                           <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${guide.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {guide.status}
                           </span>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
};

export default GuidePriceMaster;
