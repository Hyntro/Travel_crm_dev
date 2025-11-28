
import React, { useState } from 'react';
import { ArrowLeft, Plus, Search, Edit2, Trash2, X, Image as ImageIcon } from 'lucide-react';
import { Fleet } from '../types';
import { initialFleets, initialVehicleTypes, initialDrivers } from './mockData';

interface FleetMasterProps {
  onBack: () => void;
}

const FleetMaster: React.FC<FleetMasterProps> = ({ onBack }) => {
  const [fleets, setFleets] = useState<Fleet[]>(initialFleets);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [brandFilter, setBrandFilter] = useState('All');
  
  const [currentFleet, setCurrentFleet] = useState<Partial<Fleet>>({ 
    status: 'Active',
    showOnCostSheet: false,
    fuelType: 'None',
    assignedDriver: 'None'
  });

  const handleEdit = (fleet: Fleet) => {
    setCurrentFleet({ ...fleet });
    setShowModal(true);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (window.confirm('Delete fleet?')) {
      setFleets(prev => prev.filter(f => f.id !== id));
    }
  };

  const handleSave = () => {
    if (!currentFleet.registrationNumber) return;

    const newFleet: Fleet = {
        id: currentFleet.id || Math.random().toString(),
        vehicleType: currentFleet.vehicleType || '',
        brandName: currentFleet.brandName || 'None',
        registrationNumber: currentFleet.registrationNumber || '',
        ownerName: currentFleet.ownerName || '',
        chassisNumber: currentFleet.chassisNumber || '',
        engineNumber: currentFleet.engineNumber || '',
        colour: currentFleet.colour || '',
        fuelType: currentFleet.fuelType || 'None',
        seatingCapacity: currentFleet.seatingCapacity || '',
        assignedDriver: currentFleet.assignedDriver || 'None',
        insuranceCompany: currentFleet.insuranceCompany || '',
        insurancePolicy: currentFleet.insurancePolicy || '',
        insuranceIssueDate: currentFleet.insuranceIssueDate || '',
        insuranceDueDate: currentFleet.insuranceDueDate || '',
        premiumAmount: Number(currentFleet.premiumAmount) || 0,
        coverAmount: Number(currentFleet.coverAmount) || 0,
        taxEfficiency: currentFleet.taxEfficiency || '',
        taxExpiry: currentFleet.taxExpiry || '',
        permitType: currentFleet.permitType || '',
        permitExpiry: currentFleet.permitExpiry || '',
        rtoAddress: currentFleet.rtoAddress || '',
        status: currentFleet.status || 'Active',
        image: currentFleet.image || '',
        showOnCostSheet: currentFleet.showOnCostSheet || false
    };

    if (currentFleet.id) {
        setFleets(prev => prev.map(f => f.id === currentFleet.id ? newFleet : f));
    } else {
        setFleets(prev => [...prev, newFleet]);
    }
    setShowModal(false);
    resetForm();
  };

  const resetForm = () => {
    setCurrentFleet({ 
        status: 'Active',
        showOnCostSheet: false,
        fuelType: 'None',
        assignedDriver: 'None',
        brandName: 'None'
    });
  };

  const filteredFleets = fleets.filter(f => {
    const matchesSearch = f.registrationNumber.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || f.status === statusFilter;
    const matchesBrand = brandFilter === 'All' || f.brandName === brandFilter;
    return matchesSearch && matchesStatus && matchesBrand;
  });

  return (
    <div className="h-full flex flex-col animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Fleet Master</h2>
            <p className="text-sm text-slate-500">Manage vehicle fleet details</p>
          </div>
        </div>
        <button 
          onClick={() => { resetForm(); setShowModal(true); }} 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm text-sm font-medium"
        >
          <Plus size={18} /> Add Fleet
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-6 flex flex-wrap gap-4 items-end">
         <div className="flex-1 min-w-[200px]">
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Registration No</label>
            <input 
              type="text" 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
              placeholder="Search" 
              className="w-full pl-3 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
         </div>
         <div className="w-48">
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Select Vehicle Brand</label>
            <select 
              value={brandFilter} 
              onChange={(e) => setBrandFilter(e.target.value)} 
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
               <option value="All">All</option>
               {Array.from(new Set(fleets.map(f => f.brandName))).map(b => <option key={b} value={b}>{b}</option>)}
            </select>
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

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 flex-1 overflow-hidden flex flex-col">
         <div className="overflow-x-auto flex-1">
            <table className="w-full text-left">
               <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Sr.</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Image</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Vehicle Type</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Brand Name</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Registration No</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Colour</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Fuel Type</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Assigned Driver</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Insurance</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Insurance Date</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Permits</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Permit ExpiryOn</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Status</th>
                     <th className="px-4 py-3 text-right text-xs font-bold text-slate-500 uppercase">Action</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {filteredFleets.map((fleet, index) => (
                     <tr key={fleet.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3 text-sm text-slate-500">{index + 1}</td>
                        <td className="px-4 py-3">
                            <div className="w-10 h-10 bg-slate-200 rounded flex items-center justify-center overflow-hidden">
                                {fleet.image ? <img src={fleet.image} alt="Fleet" className="w-full h-full object-cover"/> : <ImageIcon size={16} className="text-slate-400"/>}
                            </div>
                        </td>
                        <td className="px-4 py-3 text-sm font-medium text-slate-800">{fleet.vehicleType}</td>
                        <td className="px-4 py-3 text-sm text-slate-600">{fleet.brandName}</td>
                        <td className="px-4 py-3 text-sm text-slate-600 font-mono">{fleet.registrationNumber}</td>
                        <td className="px-4 py-3 text-sm text-slate-600">{fleet.colour || '-'}</td>
                        <td className="px-4 py-3 text-sm text-slate-600">{fleet.fuelType}</td>
                        <td className="px-4 py-3 text-sm text-slate-600">{fleet.assignedDriver}</td>
                        <td className="px-4 py-3 text-sm text-slate-600">{fleet.insuranceCompany || '-'}</td>
                        <td className="px-4 py-3 text-sm text-slate-600">{fleet.insuranceDueDate || '-'}</td>
                        <td className="px-4 py-3 text-sm text-slate-600">{fleet.permitType || '-'}</td>
                        <td className="px-4 py-3 text-sm text-slate-600">{fleet.permitExpiry || '-'}</td>
                        <td className="px-4 py-3">
                           <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${fleet.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {fleet.status}
                           </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                           <div className="flex items-center justify-end gap-2">
                              <button onClick={() => handleEdit(fleet)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded">
                                <Edit2 size={16}/>
                              </button>
                              <button onClick={(e) => handleDelete(fleet.id, e)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded">
                                <Trash2 size={16}/>
                              </button>
                           </div>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      {showModal && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
               <div className="bg-slate-800 px-6 py-4 flex justify-between items-center">
                  <h3 className="text-lg font-bold text-white">{currentFleet.id ? 'Edit Fleet' : 'Add Fleet'}</h3>
                  <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                    <X size={20} />
                  </button>
               </div>
               
               <div className="p-8 space-y-8 overflow-y-auto flex-1 bg-white">
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                      {/* Left Column */}
                      <div className="space-y-4">
                          <div>
                              <label className="block text-xs font-semibold text-slate-500 mb-1">Vehicle Type</label>
                              <select 
                                value={currentFleet.vehicleType} 
                                onChange={(e) => setCurrentFleet({...currentFleet, vehicleType: e.target.value})} 
                                className="w-full px-3 py-2 border border-slate-300 rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                 <option>Select</option>
                                 {initialVehicleTypes.map(v => <option key={v.id} value={v.name}>{v.name}</option>)}
                              </select>
                          </div>
                          <div>
                              <label className="block text-xs font-semibold text-slate-500 mb-1">Brand Name</label>
                              <select 
                                value={currentFleet.brandName} 
                                onChange={(e) => setCurrentFleet({...currentFleet, brandName: e.target.value})} 
                                className="w-full px-3 py-2 border border-slate-300 rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                 <option>None</option>
                                 <option>Toyota</option>
                                 <option>Honda</option>
                                 <option>Maruti</option>
                              </select>
                              <div className="h-0.5 w-8 bg-red-500 mt-1"></div>
                          </div>
                          <div>
                              <label className="block text-xs font-semibold text-slate-500 mb-1">Colour</label>
                              <input 
                                type="text" 
                                value={currentFleet.colour || ''} 
                                onChange={(e) => setCurrentFleet({...currentFleet, colour: e.target.value})} 
                                className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                          </div>
                          <div>
                              <label className="block text-xs font-semibold text-slate-500 mb-1">Fuel Type</label>
                              <select 
                                value={currentFleet.fuelType} 
                                onChange={(e) => setCurrentFleet({...currentFleet, fuelType: e.target.value})} 
                                className="w-full px-3 py-2 border border-slate-300 rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                 <option>None</option>
                                 <option>Diesel</option>
                                 <option>Petrol</option>
                                 <option>CNG</option>
                                 <option>Electric</option>
                              </select>
                          </div>
                          <div>
                              <label className="block text-xs font-semibold text-slate-500 mb-1">Seating Capacity (including driver)</label>
                              <input 
                                type="text" 
                                value={currentFleet.seatingCapacity || ''} 
                                onChange={(e) => setCurrentFleet({...currentFleet, seatingCapacity: e.target.value})} 
                                className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                          </div>
                          <div>
                              <label className="block text-xs font-semibold text-slate-500 mb-1">Assigned Driver</label>
                              <select 
                                value={currentFleet.assignedDriver} 
                                onChange={(e) => setCurrentFleet({...currentFleet, assignedDriver: e.target.value})} 
                                className="w-full px-3 py-2 border border-slate-300 rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                 <option>None</option>
                                 {initialDrivers.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                              </select>
                          </div>
                          <div>
                              <label className="block text-xs font-semibold text-slate-500 mb-1">Category - Vehicle Group</label>
                              <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                          </div>
                          <div>
                              <label className="block text-xs font-semibold text-slate-500 mb-1">Registration Number</label>
                              <input 
                                type="text" 
                                value={currentFleet.registrationNumber || ''} 
                                onChange={(e) => setCurrentFleet({...currentFleet, registrationNumber: e.target.value})} 
                                className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                              <div className="h-0.5 w-8 bg-red-500 mt-1"></div>
                          </div>
                          <div>
                              <label className="block text-xs font-semibold text-slate-500 mb-1">Registered Owner Name</label>
                              <input 
                                type="text" 
                                value={currentFleet.ownerName || ''} 
                                onChange={(e) => setCurrentFleet({...currentFleet, ownerName: e.target.value})} 
                                className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                          </div>
                          <div>
                              <label className="block text-xs font-semibold text-slate-500 mb-1">Pollution Permits Expiry</label>
                              <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                          </div>
                          <div>
                              <label className="block text-xs font-semibold text-slate-500 mb-1">Registration Date</label>
                              <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                          </div>
                          <div>
                              <label className="block text-xs font-semibold text-slate-500 mb-1">Car Photo</label>
                              <div className="flex gap-2 items-center">
                                 <button className="px-3 py-2 border border-slate-300 rounded text-sm bg-white hover:bg-slate-50">Choose File</button>
                                 <span className="text-xs text-slate-400">No file chosen</span>
                              </div>
                          </div>
                          <div>
                              <label className="block text-xs font-semibold text-slate-500 mb-1">status</label>
                              <select 
                                value={currentFleet.status} 
                                onChange={(e) => setCurrentFleet({...currentFleet, status: e.target.value as any})} 
                                className="w-full px-3 py-2 border border-slate-300 rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                 <option value="Active">Active</option>
                                 <option value="Inactive">Inactive</option>
                              </select>
                          </div>
                          <div className="flex items-center gap-2 pt-2">
                             <input 
                               type="checkbox" 
                               checked={currentFleet.showOnCostSheet}
                               onChange={(e) => setCurrentFleet({...currentFleet, showOnCostSheet: e.target.checked})}
                               className="rounded text-blue-600"
                             />
                             <span className="text-sm text-slate-600">Show On CostSheet</span>
                          </div>
                      </div>

                      {/* Right Column */}
                      <div className="space-y-6">
                          <div>
                              <h4 className="font-bold text-slate-800 text-sm mb-4">Parts</h4>
                              <div className="space-y-4">
                                  <div>
                                      <label className="block text-xs font-semibold text-slate-500 mb-1">Chassis Number</label>
                                      <input 
                                        type="text" 
                                        value={currentFleet.chassisNumber || ''} 
                                        onChange={(e) => setCurrentFleet({...currentFleet, chassisNumber: e.target.value})} 
                                        className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                      />
                                  </div>
                                  <div>
                                      <label className="block text-xs font-semibold text-slate-500 mb-1">Engine Number</label>
                                      <input 
                                        type="text" 
                                        value={currentFleet.engineNumber || ''} 
                                        onChange={(e) => setCurrentFleet({...currentFleet, engineNumber: e.target.value})} 
                                        className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                      />
                                  </div>
                              </div>
                          </div>

                          <div>
                              <h4 className="font-bold text-slate-800 text-sm mb-4">Insurance</h4>
                              <div className="space-y-4">
                                  <div>
                                      <label className="block text-xs font-semibold text-slate-500 mb-1">Company Name</label>
                                      <input 
                                        type="text" 
                                        value={currentFleet.insuranceCompany || ''} 
                                        onChange={(e) => setCurrentFleet({...currentFleet, insuranceCompany: e.target.value})} 
                                        className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                      />
                                  </div>
                                  <div>
                                      <label className="block text-xs font-semibold text-slate-500 mb-1">Policy Number</label>
                                      <input 
                                        type="text" 
                                        value={currentFleet.insurancePolicy || ''} 
                                        onChange={(e) => setCurrentFleet({...currentFleet, insurancePolicy: e.target.value})} 
                                        className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                      />
                                  </div>
                                  <div>
                                      <label className="block text-xs font-semibold text-slate-500 mb-1">Issue Date</label>
                                      <input 
                                        type="text" 
                                        value={currentFleet.insuranceIssueDate || ''} 
                                        onChange={(e) => setCurrentFleet({...currentFleet, insuranceIssueDate: e.target.value})} 
                                        className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                      />
                                  </div>
                                  <div>
                                      <label className="block text-xs font-semibold text-slate-500 mb-1">Due Date</label>
                                      <input 
                                        type="text" 
                                        value={currentFleet.insuranceDueDate || ''} 
                                        onChange={(e) => setCurrentFleet({...currentFleet, insuranceDueDate: e.target.value})} 
                                        className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                      />
                                  </div>
                                  <div>
                                      <label className="block text-xs font-semibold text-slate-500 mb-1">Premium Amount</label>
                                      <input 
                                        type="number" 
                                        value={currentFleet.premiumAmount || ''} 
                                        onChange={(e) => setCurrentFleet({...currentFleet, premiumAmount: Number(e.target.value)})} 
                                        className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                      />
                                  </div>
                                  <div>
                                      <label className="block text-xs font-semibold text-slate-500 mb-1">Cover Amount</label>
                                      <input 
                                        type="number" 
                                        value={currentFleet.coverAmount || ''} 
                                        onChange={(e) => setCurrentFleet({...currentFleet, coverAmount: Number(e.target.value)})} 
                                        className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                      />
                                  </div>
                              </div>
                          </div>

                          <div>
                              <h4 className="font-bold text-slate-800 text-sm mb-4">RTO</h4>
                              <div>
                                  <label className="block text-xs font-semibold text-slate-500 mb-1">Address</label>
                                  <input 
                                    type="text" 
                                    value={currentFleet.rtoAddress || ''} 
                                    onChange={(e) => setCurrentFleet({...currentFleet, rtoAddress: e.target.value})} 
                                    className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  />
                              </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                              <div className="col-span-2">
                                  <label className="block text-xs font-semibold text-slate-500 mb-1">Tax Efficiency</label>
                                  <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                              </div>
                              <div className="col-span-2">
                                  <label className="block text-xs font-semibold text-slate-500 mb-1">Expiry Date</label>
                                  <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                              </div>
                          </div>

                          <div>
                              <h4 className="font-bold text-slate-800 text-sm mb-4">Permits</h4>
                              <div className="space-y-4">
                                  <div>
                                      <label className="block text-xs font-semibold text-slate-500 mb-1">Type</label>
                                      <input 
                                        type="text" 
                                        value={currentFleet.permitType || ''} 
                                        onChange={(e) => setCurrentFleet({...currentFleet, permitType: e.target.value})} 
                                        className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                      />
                                  </div>
                                  <div>
                                      <label className="block text-xs font-semibold text-slate-500 mb-1">Expiry Date</label>
                                      <input 
                                        type="text" 
                                        value={currentFleet.permitExpiry || ''} 
                                        onChange={(e) => setCurrentFleet({...currentFleet, permitExpiry: e.target.value})} 
                                        className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                      />
                                  </div>
                              </div>
                          </div>
                      </div>
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

export default FleetMaster;
