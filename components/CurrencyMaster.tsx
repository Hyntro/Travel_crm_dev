
import React, { useState } from 'react';
import { ArrowLeft, Plus, Search, Edit2, Trash2, X } from 'lucide-react';
import { Currency } from '../types';
import { initialCurrencies, initialCountries } from './mockData';

interface CurrencyMasterProps {
  onBack: () => void;
}

const CurrencyMaster: React.FC<CurrencyMasterProps> = ({ onBack }) => {
  const [currencies, setCurrencies] = useState<Currency[]>(initialCurrencies);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentCurrency, setCurrentCurrency] = useState<Partial<Currency>>({ status: 'Active' });

  const handleEdit = (item: Currency) => {
    setCurrentCurrency({ ...item });
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete currency?')) {
      setCurrencies(prev => prev.filter(c => c.id !== id));
    }
  };

  const handleSave = () => {
    if (!currentCurrency.currencyName || !currentCurrency.currencyCode) return;

    const countryName = initialCountries.find(c => c.id === currentCurrency.countryId)?.name || '';

    const newItem: Currency = {
      id: currentCurrency.id || Math.random().toString(),
      countryId: currentCurrency.countryId || '',
      countryName: countryName,
      currencyCode: currentCurrency.currencyCode,
      currencyName: currentCurrency.currencyName,
      exchangeRate: currentCurrency.exchangeRate || 1.0,
      status: currentCurrency.status || 'Active'
    };

    if (currentCurrency.id) {
      setCurrencies(prev => prev.map(c => c.id === currentCurrency.id ? newItem : c));
    } else {
      setCurrencies(prev => [...prev, newItem]);
    }
    setShowModal(false);
    setCurrentCurrency({ status: 'Active' });
  };

  const filteredCurrencies = currencies.filter(c => {
    const matchesSearch = c.currencyName.toLowerCase().includes(search.toLowerCase()) || c.currencyCode.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="h-full flex flex-col animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="flex justify-between items-center mb-6 p-4 bg-white border-b border-slate-200">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full text-slate-500"><ArrowLeft size={20} /></button>
          <h2 className="text-xl font-bold text-slate-800">Currency Master</h2>
        </div>
        <button onClick={() => { setCurrentCurrency({ status: 'Active' }); setShowModal(true); }} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
          <Plus size={18} /> Add Currency
        </button>
      </div>

      <div className="p-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-6 flex flex-wrap gap-4 items-end">
           <div className="flex-1 min-w-[200px]">
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Currency Name</label>
              <input type="text" value={search} onChange={e => setSearch(e.target.value)} className="w-full border border-slate-300 rounded px-3 py-2 text-sm" placeholder="Search..." />
           </div>
           <div className="w-48">
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Status</label>
              <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="w-full border border-slate-300 rounded px-3 py-2 text-sm">
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
           </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
              <tr>
                <th className="px-4 py-3">Sr.</th>
                <th className="px-4 py-3">Country Name</th>
                <th className="px-4 py-3">Currency Code</th>
                <th className="px-4 py-3">Currency Name</th>
                <th className="px-4 py-3">Exchange Rate in INR</th>
                <th className="px-4 py-3 text-center">Rate List</th>
                <th className="px-4 py-3 text-right">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCurrencies.map((item, index) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">{item.countryName}</td>
                  <td className="px-4 py-3">{item.currencyCode}</td>
                  <td className="px-4 py-3">{item.currencyName}</td>
                  <td className="px-4 py-3">{item.exchangeRate}</td>
                  <td className="px-4 py-3 text-center"><button className="text-blue-600 text-xs hover:underline">View Rates</button></td>
                  <td className="px-4 py-3 text-right"><span className={`px-2 py-1 rounded text-xs ${item.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{item.status}</span></td>
                  <td className="px-4 py-3 text-right">
                     <div className="flex justify-end gap-2">
                        <button onClick={() => handleEdit(item)} className="text-slate-400 hover:text-blue-600"><Edit2 size={16}/></button>
                        <button onClick={() => handleDelete(item.id)} className="text-slate-400 hover:text-red-600"><Trash2 size={16}/></button>
                     </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
            <div className="bg-slate-800 px-6 py-4 flex justify-between items-center text-white">
              <h3 className="font-bold">{currentCurrency.id ? 'Edit Currency' : 'Add Currency'}</h3>
              <button onClick={() => setShowModal(false)}><X size={20}/></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                 <label className="block text-xs font-semibold text-slate-500 mb-1">Country</label>
                 <select value={currentCurrency.countryId} onChange={e => setCurrentCurrency({...currentCurrency, countryId: e.target.value})} className="w-full border border-slate-300 rounded px-3 py-2 text-sm border-l-4 border-l-red-500">
                    <option value="">Select</option>
                    {initialCountries.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                 </select>
              </div>
              <div>
                 <label className="block text-xs font-semibold text-slate-500 mb-1">Currency Code</label>
                 <input type="text" value={currentCurrency.currencyCode || ''} onChange={e => setCurrentCurrency({...currentCurrency, currencyCode: e.target.value})} className="w-full border border-slate-300 rounded px-3 py-2 text-sm border-l-4 border-l-red-500"/>
              </div>
              <div>
                 <label className="block text-xs font-semibold text-slate-500 mb-1">Currency Name</label>
                 <input type="text" value={currentCurrency.currencyName || ''} onChange={e => setCurrentCurrency({...currentCurrency, currencyName: e.target.value})} className="w-full border border-slate-300 rounded px-3 py-2 text-sm border-l-4 border-l-red-500"/>
              </div>
              <div>
                 <label className="block text-xs font-semibold text-slate-500 mb-1">Status</label>
                 <select value={currentCurrency.status} onChange={e => setCurrentCurrency({...currentCurrency, status: e.target.value as any})} className="w-full border border-slate-300 rounded px-3 py-2 text-sm">
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                 </select>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-3">
               <button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-sm font-medium">Save</button>
               <button onClick={() => setShowModal(false)} className="border border-slate-300 text-slate-600 px-6 py-2 rounded-full text-sm font-medium hover:bg-slate-50">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrencyMaster;
