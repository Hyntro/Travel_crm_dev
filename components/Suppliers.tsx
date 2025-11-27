
import React, { useState } from 'react';
import { Plus, Search, MapPin, DollarSign, User, Mail, MoreVertical, X, Download, Upload, History, Filter, MoreHorizontal } from 'lucide-react';
import { Supplier } from '../types';

const initialSuppliers: Supplier[] = [
  { id: '1', name: 'Hilton Dubai', alias: 'H-DXB', contactPerson: 'Ahmed Khan', phone: '+971 50 123 4567', email: 'res@hiltondxb.com', services: ['Hotel', 'Venue'], paymentTerms: 'Credit', destination: 'Dubai, UAE', status: 'Active' },
  { id: '2', name: 'Alpha Transports', alias: 'Alpha', contactPerson: 'John Smith', phone: '+44 7700 123456', email: 'bookings@alphatrans.com', services: ['Transport', 'Guide'], paymentTerms: 'Cash', destination: 'London, UK', status: 'Inactive' },
  { id: '3', name: 'Sky High Airlines', alias: 'SHA', contactPerson: 'Maria Garcia', phone: '+34 600 123 456', email: 'sales@skyhigh.com', services: ['Airlines'], paymentTerms: 'Credit', destination: 'Madrid, Spain', status: 'Active' },
];

const availableServices = ['All Supplier Type', 'Hotel', 'Airlines', 'Visa', 'Transport', 'Guide', 'Entrance', 'Insurance', 'Meals'];

const Suppliers: React.FC = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>(initialSuppliers);
  const [showForm, setShowForm] = useState(false);
  const [newSupplier, setNewSupplier] = useState<Partial<Supplier>>({ services: [], paymentTerms: 'Cash', status: 'Active' });

  // Filter States
  const [filterNameInput, setFilterNameInput] = useState('');
  const [filterDestination, setFilterDestination] = useState('All');
  const [filterSupplierSelect, setFilterSupplierSelect] = useState('All');
  const [filterType, setFilterType] = useState('All Supplier Type');

  const handleServiceToggle = (service: string) => {
    const currentServices = newSupplier.services || [];
    if (currentServices.includes(service)) {
      setNewSupplier({ ...newSupplier, services: currentServices.filter(s => s !== service) });
    } else {
      setNewSupplier({ ...newSupplier, services: [...currentServices, service] });
    }
  };

  const handleSave = () => {
    if (!newSupplier.name || !newSupplier.email) return;
    
    const supplier: Supplier = {
      id: Math.random().toString(36).substr(2, 9),
      name: newSupplier.name!,
      alias: newSupplier.alias || '',
      contactPerson: newSupplier.contactPerson || '',
      phone: newSupplier.phone || '',
      email: newSupplier.email!,
      services: newSupplier.services || [],
      paymentTerms: newSupplier.paymentTerms as 'Cash' | 'Credit',
      destination: newSupplier.destination || '',
      status: newSupplier.status as 'Active' | 'Inactive' || 'Active'
    };
    
    setSuppliers([...suppliers, supplier]);
    setShowForm(false);
    setNewSupplier({ services: [], paymentTerms: 'Cash', status: 'Active' });
  };

  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesNameInput = supplier.name.toLowerCase().includes(filterNameInput.toLowerCase());
    const matchesDestination = filterDestination === 'All' || supplier.destination.includes(filterDestination);
    const matchesSupplierSelect = filterSupplierSelect === 'All' || supplier.name === filterSupplierSelect;
    const matchesType = filterType === 'All Supplier Type' || supplier.services.includes(filterType);

    return matchesNameInput && matchesDestination && matchesSupplierSelect && matchesType;
  });

  // Extract unique destinations for filter
  const uniqueDestinations = Array.from(new Set(suppliers.map(s => s.destination))).filter(Boolean);

  return (
    <div className="p-6 h-full flex flex-col bg-slate-50">
      
      {!showForm ? (
        <>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Supplier Master</h2>
              <p className="text-slate-500 text-sm">Manage global vendors, hotels, and service providers.</p>
            </div>
            <button 
              onClick={() => setShowForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
            >
              <Plus size={18} />
              <span>Add Supplier</span>
            </button>
          </div>

          {/* Filter Bar */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6">
             <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                   <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Supplier Name</label>
                   <input 
                     type="text" 
                     placeholder="Enter Supplier Name" 
                     className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                     value={filterNameInput}
                     onChange={(e) => setFilterNameInput(e.target.value)}
                   />
                </div>
                <div>
                   <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Destination</label>
                   <select 
                     className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                     value={filterDestination}
                     onChange={(e) => setFilterDestination(e.target.value)}
                   >
                      <option value="All">All</option>
                      {uniqueDestinations.map(d => <option key={d} value={d}>{d}</option>)}
                   </select>
                </div>
                <div>
                   <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Supplier Name</label>
                   <select 
                     className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                     value={filterSupplierSelect}
                     onChange={(e) => setFilterSupplierSelect(e.target.value)}
                   >
                      <option value="All">All</option>
                      {suppliers.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                   </select>
                </div>
                <div>
                   <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Supplier Type</label>
                   <select 
                     className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                     value={filterType}
                     onChange={(e) => setFilterType(e.target.value)}
                   >
                      {availableServices.map(s => <option key={s} value={s}>{s}</option>)}
                   </select>
                </div>
             </div>
          </div>

          {/* Action Bar & Table */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex-1 overflow-hidden flex flex-col">
             <div className="p-4 border-b border-slate-200 flex justify-end gap-3 bg-slate-50">
                <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-300 text-slate-600 rounded-md text-xs font-medium hover:bg-slate-50 transition-colors">
                   <Download size={14}/> Download Format
                </button>
                <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-300 text-slate-600 rounded-md text-xs font-medium hover:bg-slate-50 transition-colors">
                   <Upload size={14}/> Import Format
                </button>
                <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-300 text-slate-600 rounded-md text-xs font-medium hover:bg-slate-50 transition-colors">
                   <History size={14}/> View Logs
                </button>
             </div>

             <div className="overflow-x-auto flex-1">
                <table className="w-full text-left border-collapse">
                   <thead className="bg-slate-100 text-slate-600">
                      <tr>
                         <th className="px-4 py-3 text-xs font-bold uppercase border-b border-slate-200 whitespace-nowrap w-12">#</th>
                         <th className="px-4 py-3 text-xs font-bold uppercase border-b border-slate-200 whitespace-nowrap">Name</th>
                         <th className="px-4 py-3 text-xs font-bold uppercase border-b border-slate-200 whitespace-nowrap">Alias Name</th>
                         <th className="px-4 py-3 text-xs font-bold uppercase border-b border-slate-200 whitespace-nowrap">Type</th>
                         <th className="px-4 py-3 text-xs font-bold uppercase border-b border-slate-200 whitespace-nowrap">Destination</th>
                         <th className="px-4 py-3 text-xs font-bold uppercase border-b border-slate-200 whitespace-nowrap">Contact Person</th>
                         <th className="px-4 py-3 text-xs font-bold uppercase border-b border-slate-200 whitespace-nowrap">Phone Number</th>
                         <th className="px-4 py-3 text-xs font-bold uppercase border-b border-slate-200 whitespace-nowrap">Email Address</th>
                         <th className="px-4 py-3 text-xs font-bold uppercase border-b border-slate-200 whitespace-nowrap">Status</th>
                         <th className="px-4 py-3 text-xs font-bold uppercase border-b border-slate-200 text-right">Action</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-100">
                      {filteredSuppliers.map((supplier, index) => (
                         <tr key={supplier.id} className="hover:bg-slate-50 transition-colors">
                            <td className="px-4 py-3 text-xs text-slate-500">{index + 1}</td>
                            <td className="px-4 py-3 text-xs font-semibold text-slate-800">{supplier.name}</td>
                            <td className="px-4 py-3 text-xs text-slate-600">{supplier.alias || '-'}</td>
                            <td className="px-4 py-3 text-xs text-slate-600">
                               {supplier.services.length > 0 ? supplier.services.join(', ') : '-'}
                            </td>
                            <td className="px-4 py-3 text-xs text-slate-600 flex items-center gap-1">
                               <MapPin size={12} className="text-slate-400"/> {supplier.destination}
                            </td>
                            <td className="px-4 py-3 text-xs text-slate-600">{supplier.contactPerson}</td>
                            <td className="px-4 py-3 text-xs text-slate-600">{supplier.phone}</td>
                            <td className="px-4 py-3 text-xs text-slate-600">{supplier.email}</td>
                            <td className="px-4 py-3 text-xs">
                               <span className={`px-2 py-0.5 rounded-full font-medium ${supplier.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                  {supplier.status || 'Active'}
                                </span>
                            </td>
                            <td className="px-4 py-3 text-right">
                               <button className="text-slate-400 hover:text-blue-600 transition-colors">
                                  <MoreHorizontal size={16}/>
                               </button>
                            </td>
                         </tr>
                      ))}
                      {filteredSuppliers.length === 0 && (
                        <tr>
                           <td colSpan={10} className="px-4 py-8 text-center text-sm text-slate-500">
                              No suppliers found matching your criteria.
                           </td>
                        </tr>
                      )}
                   </tbody>
                </table>
             </div>
          </div>
        </>
      ) : (
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 flex flex-col h-full overflow-hidden animate-in slide-in-from-bottom-4">
           <div className="flex justify-between items-center p-6 border-b border-slate-200 bg-slate-50/50">
            <h2 className="text-2xl font-bold text-slate-800">Add Supplier</h2>
            <div className="flex gap-3">
               <button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-sm font-medium shadow-sm transition-colors">Save</button>
               <button className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-4 py-2 rounded-full text-sm font-medium transition-colors">Save and New</button>
               <button onClick={() => setShowForm(false)} className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-4 py-2 rounded-full text-sm font-medium transition-colors">Cancel</button>
            </div>
          </div>

          <div className="p-8 overflow-y-auto">
            <div className="mb-8">
               <h3 className="text-sm font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100 uppercase tracking-wider">Supplier Information</h3>
               
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Supplier Name</label>
                    <input 
                      type="text" 
                      value={newSupplier.name || ''}
                      onChange={e => setNewSupplier({...newSupplier, name: e.target.value})}
                      className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 border-l-4 border-l-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Alias Name</label>
                    <input 
                      type="text" 
                      value={newSupplier.alias || ''}
                      onChange={e => setNewSupplier({...newSupplier, alias: e.target.value})}
                      className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                     <label className="block text-xs font-semibold text-slate-500 mb-1">Status</label>
                     <select
                        value={newSupplier.status}
                        onChange={e => setNewSupplier({...newSupplier, status: e.target.value as any})}
                        className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 bg-white"
                     >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                     </select>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                     <label className="block text-xs font-semibold text-slate-500 mb-1">PAN Information</label>
                     <input type="text" className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500" />
                  </div>
                  <div>
                     <label className="block text-xs font-semibold text-slate-500 mb-1">Accounting Code</label>
                     <input type="text" className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500" />
                  </div>
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                     <label className="block text-xs font-semibold text-slate-500 mb-2">Supplier Services</label>
                     <div className="border border-slate-200 rounded-lg p-4 h-64 overflow-y-auto bg-slate-50">
                        <label className="flex items-center gap-2 mb-2 pb-2 border-b border-slate-200">
                           <input type="checkbox" className="rounded text-blue-600"/>
                           <span className="text-sm font-medium">All Select Services</span>
                        </label>
                        <div className="space-y-2">
                           {availableServices.filter(s => s !== 'All Supplier Type').map(service => (
                             <label key={service} className="flex items-center gap-2 cursor-pointer hover:bg-white p-1 rounded transition-colors">
                               <input
                                 type="checkbox"
                                 checked={newSupplier.services?.includes(service)}
                                 onChange={() => handleServiceToggle(service)}
                                 className="rounded text-blue-600 focus:ring-blue-500"
                               />
                               <span className="text-sm text-slate-700">{service}</span>
                             </label>
                           ))}
                        </div>
                     </div>
                  </div>

                  <div className="space-y-6">
                     <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1">Destinations</label>
                        <input 
                          type="text" 
                          value={newSupplier.destination || ''}
                          onChange={e => setNewSupplier({...newSupplier, destination: e.target.value})}
                          className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 border-l-4 border-l-red-500"
                        />
                     </div>
                     
                     <div className="grid grid-cols-2 gap-6">
                        <div>
                           <label className="block text-xs font-semibold text-slate-500 mb-1">Payment Term</label>
                           <div className="flex gap-4 pt-1">
                              <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="payment" className="text-blue-600" checked={newSupplier.paymentTerms === 'Cash'} onChange={() => setNewSupplier({...newSupplier, paymentTerms: 'Cash'})}/> <span className="text-sm">Cash</span></label>
                              <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="payment" className="text-blue-600" checked={newSupplier.paymentTerms === 'Credit'} onChange={() => setNewSupplier({...newSupplier, paymentTerms: 'Credit'})}/> <span className="text-sm">Credit</span></label>
                           </div>
                        </div>
                        <div>
                           <label className="block text-xs font-semibold text-slate-500 mb-1">Confirmation Type</label>
                           <div className="flex gap-4 pt-1">
                              <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="confirm" className="text-blue-600"/> <span className="text-sm">Auto</span></label>
                              <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="confirm" className="text-blue-600" defaultChecked/> <span className="text-sm">Manual</span></label>
                           </div>
                        </div>
                     </div>

                     <div className="grid grid-cols-2 gap-6">
                        <div>
                           <label className="block text-xs font-semibold text-slate-500 mb-1">Local Agent</label>
                           <div className="flex gap-4 pt-1">
                              <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="local" className="text-blue-600"/> <span className="text-sm">Yes</span></label>
                              <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="local" className="text-blue-600" defaultChecked/> <span className="text-sm">No</span></label>
                           </div>
                        </div>
                        <div>
                           <label className="block text-xs font-semibold text-slate-500 mb-1">Default Destination</label>
                           <select className="w-full border border-slate-300 rounded px-3 py-2 text-sm bg-white">
                              <option>Select</option>
                           </select>
                        </div>
                     </div>

                     <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1">Agreement</label>
                        <div className="flex gap-4 pt-1">
                           <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="agree" className="text-blue-600"/> <span className="text-sm">Yes</span></label>
                           <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="agree" className="text-blue-600" defaultChecked/> <span className="text-sm">No</span></label>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="mt-8 pt-6 border-t border-slate-100">
                  <h3 className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-wider">Contact Details</h3>
                  <div className="grid grid-cols-3 gap-6">
                     <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1">Contact Person</label>
                        <input 
                           type="text" 
                           value={newSupplier.contactPerson || ''}
                           onChange={e => setNewSupplier({...newSupplier, contactPerson: e.target.value})}
                           className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500"
                        />
                     </div>
                     <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1">Phone Number</label>
                        <input 
                           type="text" 
                           value={newSupplier.phone || ''}
                           onChange={e => setNewSupplier({...newSupplier, phone: e.target.value})}
                           className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500"
                        />
                     </div>
                     <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1">Email Address</label>
                        <input 
                           type="text" 
                           value={newSupplier.email || ''}
                           onChange={e => setNewSupplier({...newSupplier, email: e.target.value})}
                           className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500"
                        />
                     </div>
                  </div>
               </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-3 p-6 border-t border-slate-200 bg-slate-50/50">
             <button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-sm font-medium shadow-sm transition-colors">Save</button>
             <button className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-4 py-2 rounded-full text-sm font-medium transition-colors">Save and New</button>
             <button onClick={() => setShowForm(false)} className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-4 py-2 rounded-full text-sm font-medium transition-colors">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Suppliers;
