
import React, { useState } from 'react';
import { ArrowLeft, Plus, Search, Edit2, Trash2, X, PenTool } from 'lucide-react';
import { BankMaster } from '../types';
import { initialBanks } from './mockData';

interface BankMasterProps {
  onBack: () => void;
}

const BankMaster: React.FC<BankMasterProps> = ({ onBack }) => {
  const [banks, setBanks] = useState<BankMaster[]>(initialBanks);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentBank, setCurrentBank] = useState<Partial<BankMaster>>({ 
    status: 'Active', 
    showHide: 'Yes', 
    isDefault: false,
    accountType: 'Select Account Type'
  });

  const handleEdit = (item: BankMaster) => {
    setCurrentBank({ ...item });
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete bank?')) {
      setBanks(prev => prev.filter(b => b.id !== id));
    }
  };

  const handleSave = () => {
    if (!currentBank.bankName || !currentBank.accountNumber) return;

    const newItem: BankMaster = {
      id: currentBank.id || Math.random().toString(),
      bankName: currentBank.bankName,
      accountType: currentBank.accountType || 'Current',
      accountNumber: currentBank.accountNumber,
      beneficiaryName: currentBank.beneficiaryName || '',
      branchAddress: currentBank.branchAddress || '',
      branchIfsc: currentBank.branchIfsc || '',
      branchSwiftCode: currentBank.branchSwiftCode || '',
      upiId: currentBank.upiId || '',
      qrCodeImage: currentBank.qrCodeImage || '',
      status: currentBank.status || 'Active',
      showHide: currentBank.showHide || 'Yes',
      isDefault: currentBank.isDefault || false,
      createdBy: 'Admin',
      modifiedBy: 'Admin'
    };

    if (currentBank.id) {
      setBanks(prev => prev.map(b => b.id === currentBank.id ? newItem : b));
    } else {
      setBanks(prev => [...prev, newItem]);
    }
    setShowModal(false);
    setCurrentBank({ 
        status: 'Active', 
        showHide: 'Yes', 
        isDefault: false,
        accountType: 'Select Account Type'
    });
  };

  const filteredBanks = banks.filter(b => {
    const matchesSearch = b.bankName.toLowerCase().includes(search.toLowerCase()) || b.accountNumber.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="h-full flex flex-col animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="flex justify-between items-center mb-6 p-4 bg-white border-b border-slate-200">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full text-slate-500"><ArrowLeft size={20} /></button>
          <h2 className="text-xl font-bold text-slate-800">Bank Master</h2>
        </div>
        <button onClick={() => { setCurrentBank({ status: 'Active', showHide: 'Yes', isDefault: false, accountType: 'Select Account Type' }); setShowModal(true); }} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
          <Plus size={18} /> Add Bank
        </button>
      </div>

      <div className="p-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-6 flex flex-wrap gap-4 items-end">
           <div className="flex-1 min-w-[200px]">
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Keyword</label>
              <input type="text" value={search} onChange={e => setSearch(e.target.value)} className="w-full border border-slate-300 rounded px-3 py-2 text-sm" placeholder="Search..." />
           </div>
           <div className="w-48">
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Select Status</label>
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
                <th className="px-4 py-3">Sr</th>
                <th className="px-4 py-3">Bank Name</th>
                <th className="px-4 py-3">Account Type</th>
                <th className="px-4 py-3">Account Number</th>
                <th className="px-4 py-3">Beneficiary Name</th>
                <th className="px-4 py-3">IFSC Code</th>
                <th className="px-4 py-3">Branch Address</th>
                <th className="px-4 py-3">Created By</th>
                <th className="px-4 py-3">Modified By</th>
                <th className="px-4 py-3 text-right">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBanks.map((item, index) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">{item.bankName}</td>
                  <td className="px-4 py-3">{item.accountType}</td>
                  <td className="px-4 py-3">{item.accountNumber}</td>
                  <td className="px-4 py-3">{item.beneficiaryName}</td>
                  <td className="px-4 py-3">{item.branchIfsc}</td>
                  <td className="px-4 py-3 truncate max-w-[150px]">{item.branchAddress}</td>
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
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl overflow-hidden">
            <div className="bg-slate-800 px-6 py-4 flex justify-between items-center text-white">
              <h3 className="font-bold">{currentBank.id ? 'Edit Bank' : 'Add Bank'}</h3>
              <button onClick={() => setShowModal(false)}><X size={20}/></button>
            </div>
            <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Bank Name</label>
                          <input type="text" value={currentBank.bankName || ''} onChange={e => setCurrentBank({...currentBank, bankName: e.target.value})} className="w-full border border-slate-300 rounded px-3 py-2 text-sm border-l-4 border-l-red-500" />
                      </div>
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Account Number</label>
                          <input type="text" value={currentBank.accountNumber || ''} onChange={e => setCurrentBank({...currentBank, accountNumber: e.target.value})} className="w-full border border-slate-300 rounded px-3 py-2 text-sm border-l-4 border-l-red-500" />
                      </div>
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Branch Address</label>
                          <textarea value={currentBank.branchAddress || ''} onChange={e => setCurrentBank({...currentBank, branchAddress: e.target.value})} className="w-full border border-slate-300 rounded px-3 py-2 text-sm border-l-4 border-l-red-500 h-24 resize-none" />
                      </div>
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">UPI ID</label>
                          <input type="text" value={currentBank.upiId || ''} onChange={e => setCurrentBank({...currentBank, upiId: e.target.value})} className="w-full border border-slate-300 rounded px-3 py-2 text-sm" />
                      </div>
                      <div>
                         <label className="block text-xs font-semibold text-slate-500 mb-1">Status</label>
                         <select value={currentBank.status} onChange={e => setCurrentBank({...currentBank, status: e.target.value as any})} className="w-full border border-slate-300 rounded px-3 py-2 text-sm">
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                         </select>
                      </div>
                      <div>
                         <label className="block text-xs font-semibold text-slate-500 mb-1">Show/Hide</label>
                         <select value={currentBank.showHide} onChange={e => setCurrentBank({...currentBank, showHide: e.target.value as any})} className="w-full border border-slate-300 rounded px-3 py-2 text-sm">
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                         </select>
                      </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Account Type</label>
                          <select value={currentBank.accountType} onChange={e => setCurrentBank({...currentBank, accountType: e.target.value})} className="w-full border border-slate-300 rounded px-3 py-2 text-sm border-l-4 border-l-red-500">
                              <option value="Select Account Type">Select Account Type</option>
                              <option value="Current">Current</option>
                              <option value="Savings">Savings</option>
                              <option value="Overdraft">Overdraft</option>
                          </select>
                      </div>
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Beneficiary Name</label>
                          <input type="text" value={currentBank.beneficiaryName || ''} onChange={e => setCurrentBank({...currentBank, beneficiaryName: e.target.value})} className="w-full border border-slate-300 rounded px-3 py-2 text-sm border-l-4 border-l-red-500" />
                      </div>
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1 flex items-center gap-1"><PenTool size={12} className="text-green-600"/> Branch IFSC</label>
                          <input type="text" value={currentBank.branchIfsc || ''} onChange={e => setCurrentBank({...currentBank, branchIfsc: e.target.value})} className="w-full border border-slate-300 rounded px-3 py-2 text-sm" />
                      </div>
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Branch Swift Code</label>
                          <input type="text" value={currentBank.branchSwiftCode || ''} onChange={e => setCurrentBank({...currentBank, branchSwiftCode: e.target.value})} className="w-full border border-slate-300 rounded px-3 py-2 text-sm border-l-4 border-l-red-500" />
                      </div>
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Attach QR Code Image</label>
                          <div className="flex items-center gap-2">
                              <button className="border border-slate-300 bg-slate-50 px-3 py-2 text-sm rounded hover:bg-slate-100 transition-colors">Choose File</button>
                              <span className="text-xs text-slate-500">No file chosen</span>
                              <div className="h-0.5 w-8 bg-red-500 ml-2"></div>
                          </div>
                      </div>
                      <div className="flex items-center gap-2 pt-2">
                          <input type="checkbox" checked={currentBank.isDefault} onChange={e => setCurrentBank({...currentBank, isDefault: e.target.checked})} className="rounded text-blue-600 w-4 h-4" />
                          <label className="text-sm text-slate-600">Set Default</label>
                          <div className="h-0.5 w-8 bg-red-500 ml-2"></div>
                      </div>
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

export default BankMaster;
