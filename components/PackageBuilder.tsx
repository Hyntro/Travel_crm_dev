
import React, { useState } from 'react';
import { Plus, Search, Calendar, MapPin, Globe, Clock, AlignLeft, X, Save } from 'lucide-react';
import { TravelPackage } from '../types';

const initialPackages: TravelPackage[] = [
  { id: '1', code: 'PKG001', name: 'Magical Maldives', planType: 'Day Wise', supplier: 'Hilton', totalNights: 4, duration: '5 Days / 4 Nights', destination: 'Maldives', paxType: 'FIT', status: 'Active', description: 'Luxury stay at water villa.' },
];

const PackageBuilder: React.FC = () => {
  const [packages, setPackages] = useState<TravelPackage[]>(initialPackages);
  const [showForm, setShowForm] = useState(false);
  const [newPackage, setNewPackage] = useState<Partial<TravelPackage>>({
    planType: 'Day Wise',
    paxType: 'FIT',
    status: 'Active'
  });

  const handleSave = () => {
    if (!newPackage.name) return;
    setPackages([...packages, { ...newPackage, id: Math.random().toString(), code: `PKG00${packages.length + 2}` } as TravelPackage]);
    setShowForm(false);
    setNewPackage({ planType: 'Day Wise', paxType: 'FIT', status: 'Active' });
  };

  return (
    <div className="p-8 h-full flex flex-col bg-slate-50">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Package Builder</h2>
          <p className="text-slate-500 mt-1">Create and manage travel itineraries and products.</p>
        </div>
        <button 
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
        >
          <Plus size={20} />
          <span>Add Package</span>
        </button>
      </div>

      {showForm ? (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 max-w-5xl mx-auto w-full animate-in slide-in-from-bottom-2">
           <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
            <h3 className="text-xl font-bold text-slate-800">New Package Builder</h3>
            <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-red-500">
              <X size={24} />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             {/* Left Column: General Info */}
             <div className="lg:col-span-1 space-y-6">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                   <h4 className="text-sm font-bold text-slate-700 uppercase mb-4">Package Details</h4>
                   <div className="space-y-4">
                      <div>
                         <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Package Name</label>
                         <input 
                           type="text" 
                           value={newPackage.name || ''} 
                           onChange={e => setNewPackage({...newPackage, name: e.target.value})}
                           className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                         />
                      </div>
                      <div>
                         <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Plan Type</label>
                         <div className="flex bg-white rounded-lg border border-slate-300 p-1">
                            {['Day Wise', 'Date Wise'].map(type => (
                               <button 
                                 key={type}
                                 onClick={() => setNewPackage({...newPackage, planType: type as any})}
                                 className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${newPackage.planType === type ? 'bg-blue-100 text-blue-700' : 'text-slate-500 hover:bg-slate-50'}`}
                               >
                                  {type}
                               </button>
                            ))}
                         </div>
                      </div>
                      
                      {/* Date Wise Specific Fields */}
                      {newPackage.planType === 'Date Wise' && (
                         <div className="grid grid-cols-2 gap-3 p-3 bg-blue-50/50 rounded-lg border border-blue-100">
                            <div>
                               <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">From Date</label>
                               <input type="date" className="w-full border border-slate-300 rounded px-2 py-1 text-xs" />
                            </div>
                            <div>
                               <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">To Date</label>
                               <input type="date" className="w-full border border-slate-300 rounded px-2 py-1 text-xs" />
                            </div>
                         </div>
                      )}

                      <div>
                         <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Destination</label>
                         <div className="relative">
                            <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
                            <input 
                              type="text" 
                              value={newPackage.destination || ''}
                              onChange={e => setNewPackage({...newPackage, destination: e.target.value})}
                              className="w-full pl-8 pr-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
                            />
                         </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                         <div>
                            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Nights</label>
                            <input 
                              type="number" 
                              value={newPackage.totalNights || ''}
                              onChange={e => setNewPackage({...newPackage, totalNights: parseInt(e.target.value)})}
                              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                            />
                         </div>
                         <div>
                             <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Duration Text</label>
                             <input 
                               type="text" 
                               placeholder="e.g. 4D/3N"
                               value={newPackage.duration || ''}
                               onChange={e => setNewPackage({...newPackage, duration: e.target.value})}
                               className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                             />
                         </div>
                      </div>

                      <div>
                         <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">Pax Type</label>
                         <div className="flex gap-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                               <input 
                                 type="radio" 
                                 name="paxType" 
                                 checked={newPackage.paxType === 'FIT'}
                                 onChange={() => setNewPackage({...newPackage, paxType: 'FIT'})}
                                 className="text-blue-600"
                               /> 
                               <span className="text-sm text-slate-700">FIT</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                               <input 
                                 type="radio" 
                                 name="paxType" 
                                 checked={newPackage.paxType === 'GIT'}
                                 onChange={() => setNewPackage({...newPackage, paxType: 'GIT'})}
                                 className="text-blue-600"
                               /> 
                               <span className="text-sm text-slate-700">GIT</span>
                            </label>
                         </div>
                      </div>
                   </div>
                </div>
             </div>

             {/* Right Column: Content & Itinerary */}
             <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                   <h4 className="text-sm font-bold text-slate-700 uppercase mb-4 flex items-center gap-2">
                      <AlignLeft size={16} className="text-blue-500"/> Content & Description
                   </h4>
                   <textarea 
                      rows={4}
                      className="w-full border border-slate-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                      placeholder="Enter detailed package description..."
                      value={newPackage.description || ''}
                      onChange={e => setNewPackage({...newPackage, description: e.target.value})}
                   />
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-6">
                   <h4 className="text-sm font-bold text-slate-700 uppercase mb-4 flex items-center gap-2">
                      <Clock size={16} className="text-blue-500"/> Itinerary Builder
                   </h4>
                   
                   <div className="bg-slate-50 rounded-lg border border-slate-200 border-dashed p-8 text-center">
                      <p className="text-slate-500 text-sm mb-2">Itinerary setup will appear here after saving basic details.</p>
                      <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                         Configure Day-wise Plan
                      </button>
                   </div>
                </div>
             </div>
          </div>

          <div className="mt-8 flex justify-end gap-3">
             <button onClick={() => setShowForm(false)} className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">Cancel</button>
             <button onClick={handleSave} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm flex items-center gap-2">
                <Save size={18} /> Save Package
             </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
           <div className="p-4 border-b border-slate-100 flex items-center gap-4 bg-slate-50/50">
              <div className="relative flex-1 max-w-md">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                 <input type="text" placeholder="Search packages..." className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
           </div>

           <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-100">
                 <tr>
                    <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Code</th>
                    <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Package Name</th>
                    <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Destination</th>
                    <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Plan Type</th>
                    <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Duration</th>
                    <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Status</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                 {packages.map(pkg => (
                    <tr key={pkg.id} className="hover:bg-slate-50 transition-colors">
                       <td className="px-6 py-4 text-sm font-mono text-slate-500">{pkg.code}</td>
                       <td className="px-6 py-4">
                          <div className="font-medium text-slate-800">{pkg.name}</div>
                          <div className="text-xs text-slate-400">{pkg.supplier}</div>
                       </td>
                       <td className="px-6 py-4 text-sm text-slate-600 flex items-center gap-2">
                          <MapPin size={14} className="text-slate-400"/> {pkg.destination}
                       </td>
                       <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs rounded border ${pkg.planType === 'Date Wise' ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>
                             {pkg.planType}
                          </span>
                       </td>
                       <td className="px-6 py-4 text-sm text-slate-600">{pkg.duration}</td>
                       <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                             Active
                          </span>
                       </td>
                    </tr>
                 ))}
              </tbody>
           </table>
        </div>
      )}
    </div>
  );
};

export default PackageBuilder;
