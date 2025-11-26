import React, { useState } from 'react';
import { Plus, Search, MapPin, DollarSign, User, Mail, MoreVertical, X } from 'lucide-react';
import { Supplier } from '../types';

const initialSuppliers: Supplier[] = [
  { id: '1', name: 'Hilton Dubai', alias: 'H-DXB', contactPerson: 'Ahmed Khan', phone: '+971 50 123 4567', email: 'res@hiltondxb.com', services: ['Hotel', 'Venue'], paymentTerms: 'Credit', destination: 'Dubai, UAE' },
  { id: '2', name: 'Alpha Transports', alias: 'Alpha', contactPerson: 'John Smith', phone: '+44 7700 123456', email: 'bookings@alphatrans.com', services: ['Transport', 'Guide'], paymentTerms: 'Cash', destination: 'London, UK' },
];

const availableServices = ['Hotel', 'Airlines', 'Visa', 'Transport', 'Guide', 'Entrance', 'Insurance', 'Meals'];

const Suppliers: React.FC = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>(initialSuppliers);
  const [showForm, setShowForm] = useState(false);
  const [newSupplier, setNewSupplier] = useState<Partial<Supplier>>({ services: [], paymentTerms: 'Cash' });

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
    };
    
    setSuppliers([...suppliers, supplier]);
    setShowForm(false);
    setNewSupplier({ services: [], paymentTerms: 'Cash' });
  };

  return (
    <div className="p-8 h-full flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Supplier Master</h2>
          <p className="text-slate-500 mt-1">Manage global vendors, hotels, and service providers.</p>
        </div>
        <button 
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
        >
          <Plus size={20} />
          <span>Add Supplier</span>
        </button>
      </div>

      {showForm ? (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 max-w-3xl mx-auto w-full">
           <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
            <h3 className="text-xl font-bold text-slate-800">New Supplier</h3>
            <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-red-500">
              <X size={24} />
            </button>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Supplier Name</label>
                <input 
                  type="text" 
                  value={newSupplier.name || ''}
                  onChange={e => setNewSupplier({...newSupplier, name: e.target.value})}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Alias / Code</label>
                <input 
                  type="text" 
                  value={newSupplier.alias || ''}
                  onChange={e => setNewSupplier({...newSupplier, alias: e.target.value})}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
               <label className="block text-sm font-medium text-slate-700 mb-2">Services Provided</label>
               <div className="flex flex-wrap gap-2">
                 {availableServices.map(service => (
                   <button
                     key={service}
                     onClick={() => handleServiceToggle(service)}
                     className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                       newSupplier.services?.includes(service)
                       ? 'bg-blue-600 text-white border-blue-600'
                       : 'bg-white text-slate-600 border-slate-300 hover:border-slate-400'
                     }`}
                   >
                     {service}
                   </button>
                 ))}
               </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">Destination</label>
                 <div className="relative">
                    <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="text" 
                      value={newSupplier.destination || ''}
                      onChange={e => setNewSupplier({...newSupplier, destination: e.target.value})}
                      className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                    />
                 </div>
              </div>
               <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">Payment Terms</label>
                 <div className="relative">
                    <DollarSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <select
                      value={newSupplier.paymentTerms}
                      onChange={e => setNewSupplier({...newSupplier, paymentTerms: e.target.value as any})}
                      className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      <option value="Cash">Cash</option>
                      <option value="Credit">Credit</option>
                    </select>
                 </div>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
               <h4 className="text-sm font-semibold text-slate-900 mb-3">Contact Information</h4>
               <div className="grid grid-cols-2 gap-4">
                 <input 
                    type="text" 
                    placeholder="Contact Person"
                    value={newSupplier.contactPerson || ''}
                    onChange={e => setNewSupplier({...newSupplier, contactPerson: e.target.value})}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input 
                    type="text" 
                    placeholder="Email Address"
                    value={newSupplier.email || ''}
                    onChange={e => setNewSupplier({...newSupplier, email: e.target.value})}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input 
                    type="text" 
                    placeholder="Phone Number"
                    value={newSupplier.phone || ''}
                    onChange={e => setNewSupplier({...newSupplier, phone: e.target.value})}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  />
               </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-3">
            <button onClick={() => setShowForm(false)} className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">Cancel</button>
            <button onClick={handleSave} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm">Save Supplier</button>
          </div>

        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {suppliers.map(supplier => (
             <div key={supplier.id} className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                   <div>
                     <h3 className="text-lg font-bold text-slate-800">{supplier.name}</h3>
                     <p className="text-xs text-slate-400">{supplier.alias}</p>
                   </div>
                   <button className="text-slate-400 hover:text-slate-600"><MoreVertical size={18}/></button>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-slate-600 mb-4">
                  <MapPin size={16} className="text-slate-400" />
                  {supplier.destination}
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {supplier.services.map(s => (
                    <span key={s} className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded border border-blue-100">
                      {s}
                    </span>
                  ))}
                </div>

                <div className="border-t border-slate-100 pt-3 space-y-2">
                   <div className="flex items-center gap-2 text-xs text-slate-500">
                     <User size={14} /> {supplier.contactPerson}
                   </div>
                   <div className="flex items-center gap-2 text-xs text-slate-500">
                     <Mail size={14} /> {supplier.email}
                   </div>
                   <div className="flex justify-between items-center mt-2">
                     <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded ${supplier.paymentTerms === 'Credit' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'}`}>
                       {supplier.paymentTerms}
                     </span>
                   </div>
                </div>
             </div>
           ))}
        </div>
      )}
    </div>
  );
};

export default Suppliers;