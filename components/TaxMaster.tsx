
import React, { useState } from 'react';
import { ArrowLeft, Plus, Search, Edit2, Trash2, X } from 'lucide-react';
import { TaxMaster } from '../types';
import { initialTaxes } from './mockData';

interface TaxMasterProps {
  onBack: () => void;
}

const TaxMaster: React.FC<TaxMasterProps> = ({ onBack }) => {
  const [taxes, setTaxes] = useState<TaxMaster[]>(initialTaxes);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentTax, setCurrentTax] = useState<Partial<TaxMaster>>({ status: 'Active', currency: 'INR', isDefault: false });

  const handleEdit = (item: TaxMaster) => {
    setCurrentTax({ ...item });
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete tax slab?')) {
      setTaxes(prev => prev.filter(t => t.id !== id));
    }
  };

  const handleSave = () => {
    if (!currentTax.slabName || !currentTax.taxValue) return;

    const newItem: TaxMaster = {
      id: currentTax.id || Math.random().toString(),
      serviceType: currentTax.serviceType || 'Service Type',
      currency: currentTax.currency || 'INR',
      slabName: currentTax.slabName,
      taxValue: currentTax.taxValue,
      priceRangeFrom: 0, 
      priceRangeTo: 0,
      isDefault: currentTax.isDefault || false,
      status: currentTax.status || 'Active',
      createdBy: 'Admin'
    };

    if (currentTax.id) {
      setTaxes(prev => prev.map(t => t.id === currentTax.id ? newItem : t));
    } else {
      setTaxes(prev => [...prev, newItem]);
    }
    setShowModal(false);
    setCurrentTax({ status: 'Active', currency: 'INR', isDefault: false });
  };

  const filteredTaxes = taxes.filter(t => {
    const matchesSearch = t.slabName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="h-full flex flex-col animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="flex justify-between items-center mb-6 p-4 bg-white border-b border-slate-200">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full text-slate-500"><ArrowLeft size={20} /></button>
          <h2 className="text-xl font-bold text-slate-800">TAX MASTER</h2>
        </div>
        <button onClick={() => { setCurrentTax({ status: 'Active', currency: 'INR', isDefault: false }); setShowModal(true); }} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
          <Plus size={18} /> Add GST Master
        </button>
      </div>

      <div className="p-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-6 flex flex-wrap gap-4 items-end">
           <div className="flex-1 min-w-[200px]">
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Keyword</label>
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
                <th className="px-4 py-3">Service Type</th>
                <th className="px-4 py-3">Slab Name</th>
                <th className="px-4 py-3">TAX SLAB</th>
                <th className="px-4 py-3">Price Range(From)</th>
                <th className="px-4 py-3">Price Range(To)</th>
                <th className="px-4 py-3">Created By</th>
                <th className="px-4 py-3 text-right">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTaxes.map((item, index) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">{item.serviceType}</td>
                  <td className="px-4 py-3">{item.slabName}</td>
                  <td className="px-4 py-3">{item.taxValue}%</td>
                  <td className="px-4 py-3">{item.priceRangeFrom}</td>
                  <td className="px-4 py-3">{item.priceRangeTo}</td>
                  <td className="px-4 py-3">{item.createdBy}</td>
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
          <div className="bg-white rounded-lg shadow-xl w-full max-w-xl overflow-hidden">
            <div className="bg-slate-800 px-6 py-4 flex justify-between items-center text-white">
              <h3 className="font-bold">{currentTax.id ? 'Edit GST Master' : 'Add GST Master'}</h3>
              <button onClick={() => setShowModal(false)}><X size={20}/></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Service Type</label>
                    <select value={currentTax.serviceType} onChange={e => setCurrentTax({...currentTax, serviceType: e.target.value})} className="w-full border border-slate-300 rounded px-3 py-2 text-sm border-l-4 border-l-red-500">
                        <option value="Service Type">Service Type</option>
                        <option value="Hotel">Hotel</option>
                        <option value="Transport">Transport</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Currency</label>
                    <select value={currentTax.currency} onChange={e => setCurrentTax({...currentTax, currency: e.target.value})} className="w-full border border-slate-300 rounded px-3 py-2 text-sm border-l-4 border-l-red-500">
                        <option value="INR">INR</option>
                    </select>
                  </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">TAX Slab Name</label>
                    <input type="text" value={currentTax.slabName || ''} onChange={e => setCurrentTax({...currentTax, slabName: e.target.value})} className="w-full border border-slate-300 rounded px-3 py-2 text-sm border-l-4 border-l-red-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">TAX Value(In %)</label>
                    <input type="text" value={currentTax.taxValue || ''} onChange={e => setCurrentTax({...currentTax, taxValue: e.target.value})} className="w-full border border-slate-300 rounded px-3 py-2 text-sm border-l-4 border-l-red-500" />
                  </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Status</label>
                    <select value={currentTax.status} onChange={e => setCurrentTax({...currentTax, status: e.target.value as any})} className="w-full border border-slate-300 rounded px-3 py-2 text-sm">
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Set Default</label>
                    <select value={currentTax.isDefault ? 'Yes' : 'No'} onChange={e => setCurrentTax({...currentTax, isDefault: e.target.value === 'Yes'})} className="w-full border border-slate-300 rounded px-3 py-2 text-sm">
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                    </select>
                  </div>
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

export default TaxMaster;
