
import React, { useState } from 'react';
import { ArrowLeft, Plus, Search, Edit2, Trash2, X } from 'lucide-react';
import { PaymentType } from '../types';
import { initialPaymentTypes } from './mockData';

interface PaymentTypeMasterProps {
  onBack: () => void;
}

const PaymentTypeMaster: React.FC<PaymentTypeMasterProps> = ({ onBack }) => {
  const [paymentTypes, setPaymentTypes] = useState<PaymentType[]>(initialPaymentTypes);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentType, setCurrentType] = useState<Partial<PaymentType>>({ status: 'Active' });

  const handleEdit = (item: PaymentType) => {
    setCurrentType({ ...item });
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete payment type?')) {
      setPaymentTypes(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleSave = () => {
    if (!currentType.name) return;

    const newItem: PaymentType = {
      id: currentType.id || Math.random().toString(),
      name: currentType.name,
      status: currentType.status || 'Active',
      createdBy: 'Admin',
      modifiedBy: 'Admin'
    };

    if (currentType.id) {
      setPaymentTypes(prev => prev.map(p => p.id === currentType.id ? newItem : p));
    } else {
      setPaymentTypes(prev => [...prev, newItem]);
    }
    setShowModal(false);
    setCurrentType({ status: 'Active' });
  };

  const filteredTypes = paymentTypes.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="h-full flex flex-col animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="flex justify-between items-center mb-6 p-4 bg-white border-b border-slate-200">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full text-slate-500"><ArrowLeft size={20} /></button>
          <h2 className="text-xl font-bold text-slate-800">Payment Type</h2>
        </div>
        <button onClick={() => { setCurrentType({ status: 'Active' }); setShowModal(true); }} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
          <Plus size={18} /> Add Payment Type
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
                <th className="px-4 py-3">Payment Type Name</th>
                <th className="px-4 py-3">Created By</th>
                <th className="px-4 py-3">Modified By</th>
                <th className="px-4 py-3 text-right">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTypes.map((item, index) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">{item.name}</td>
                  <td className="px-4 py-3">{item.createdBy}</td>
                  <td className="px-4 py-3">{item.modifiedBy}</td>
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
              <h3 className="font-bold">{currentType.id ? 'Edit Payment Type' : 'Add Payment Type'}</h3>
              <button onClick={() => setShowModal(false)}><X size={20}/></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                 <label className="block text-xs font-semibold text-slate-500 mb-1">Payment Type Name</label>
                 <input type="text" value={currentType.name || ''} onChange={e => setCurrentType({...currentType, name: e.target.value})} className="w-full border border-slate-300 rounded px-3 py-2 text-sm border-l-4 border-l-red-500"/>
              </div>
              <div>
                 <label className="block text-xs font-semibold text-slate-500 mb-1">Status</label>
                 <select value={currentType.status} onChange={e => setCurrentType({...currentType, status: e.target.value as any})} className="w-full border border-slate-300 rounded px-3 py-2 text-sm">
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

export default PaymentTypeMaster;
