
import React, { useState } from 'react';
import { ArrowLeft, Download, Upload, Plus, Search, Edit2, Trash2, X, Image as ImageIcon, FileSpreadsheet } from 'lucide-react';
import { Restaurant } from '../types';
import { initialRestaurants, initialDestinations, initialCountries, initialStates, initialCities } from './mockData';

interface RestaurantMasterProps {
  onBack: () => void;
}

const RestaurantMaster: React.FC<RestaurantMasterProps> = ({ onBack }) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>(initialRestaurants);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [destinationFilter, setDestinationFilter] = useState('All');
  const [nameFilter, setNameFilter] = useState('All');
  
  const [currentRestaurant, setCurrentRestaurant] = useState<Partial<Restaurant>>({ 
    status: 'Active', 
    supplier: 'Yes',
    contact: { title: 'Mr.', name: '', designation: '', countryCode: '+91', phone1: '', email: '' }
  });

  const handleEdit = (restaurant: Restaurant) => {
    setCurrentRestaurant({ ...restaurant });
    setShowModal(true);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm('Delete restaurant?')) {
      setRestaurants(prev => prev.filter(r => r.id !== id));
    }
  };

  const handleSave = () => {
    if (!currentRestaurant.name) return;

    if (currentRestaurant.id) {
      setRestaurants(prev => prev.map(r => r.id === currentRestaurant.id ? { ...r, ...currentRestaurant } as Restaurant : r));
    } else {
      const newRestaurant: Restaurant = {
        ...currentRestaurant as Restaurant,
        id: Math.random().toString(),
      };
      setRestaurants(prev => [...prev, newRestaurant]);
    }
    setShowModal(false);
    resetForm();
  };

  const resetForm = () => {
    setCurrentRestaurant({ 
      status: 'Active', 
      supplier: 'Yes',
      contact: { title: 'Mr.', name: '', designation: '', countryCode: '+91', phone1: '', email: '' }
    });
  }

  const updateContact = (field: string, value: any) => {
    setCurrentRestaurant(prev => ({
      ...prev,
      contact: { ...prev.contact!, [field]: value }
    }));
  };

  const filteredRestaurants = restaurants.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || r.status === statusFilter;
    const matchesDest = destinationFilter === 'All' || r.destination === destinationFilter;
    const matchesName = nameFilter === 'All' || r.name === nameFilter;
    return matchesSearch && matchesStatus && matchesDest && matchesName;
  });

  return (
    <div className="h-full flex flex-col animate-in fade-in slide-in-from-right-4 duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Restaurant Master</h2>
            <p className="text-sm text-slate-500">Manage restaurant partners</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
           <button className="bg-white border border-slate-300 text-slate-600 px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-50 text-sm font-medium shadow-sm">
             <Download size={16}/> Download Data
           </button>
           <button className="bg-white border border-slate-300 text-slate-600 px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-50 text-sm font-medium shadow-sm">
             <FileSpreadsheet size={16}/> Download Format
           </button>
           <label className="bg-white border border-slate-300 text-slate-600 px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-50 text-sm font-medium shadow-sm cursor-pointer">
             <Upload size={16}/> Import Excel
             <input type="file" className="hidden" accept=".csv,.xlsx"/>
           </label>
           <button 
             onClick={() => { resetForm(); setShowModal(true); }} 
             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm text-sm font-medium"
           >
             <Plus size={18} /> Add Restaurant
           </button>
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
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
                placeholder="Search" 
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
            </div>
         </div>
         <div className="w-48">
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Destination</label>
            <select 
              value={destinationFilter} 
              onChange={(e) => setDestinationFilter(e.target.value)} 
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
               <option value="All">All</option>
               {initialDestinations.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
            </select>
         </div>
         <div className="w-48">
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Restaurant Name</label>
            <select 
              value={nameFilter} 
              onChange={(e) => setNameFilter(e.target.value)} 
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
               <option value="All">All</option>
               {restaurants.map(r => <option key={r.id} value={r.name}>{r.name}</option>)}
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

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 flex-1 overflow-hidden flex flex-col">
         <div className="overflow-x-auto flex-1">
            <table className="w-full text-left">
               <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                     <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Sr.</th>
                     <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Image</th>
                     <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Restaurant Name</th>
                     <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Destination</th>
                     <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Contact Information</th>
                     <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Address</th>
                     <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Rate Sheet</th>
                     <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Status</th>
                     <th className="px-6 py-3 text-right text-xs font-bold text-slate-500 uppercase">Action</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {filteredRestaurants.map((restaurant, index) => (
                     <tr key={restaurant.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 text-sm text-slate-500">{index + 1}</td>
                        <td className="px-6 py-4">
                           <div className="w-10 h-10 bg-slate-200 rounded flex items-center justify-center overflow-hidden">
                              {restaurant.image ? <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover"/> : <ImageIcon size={16} className="text-slate-400"/>}
                           </div>
                        </td>
                        <td className="px-6 py-4 font-medium text-slate-800">{restaurant.name}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{restaurant.destination}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">
                           <div className="font-medium">{restaurant.contact.name}</div>
                           <div className="text-xs">{restaurant.contact.phone1}</div>
                           <div className="text-xs">{restaurant.contact.email}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600 max-w-[200px] truncate" title={restaurant.address}>{restaurant.address}</td>
                        <td className="px-6 py-4 text-sm">
                           <button className="text-blue-600 hover:underline">View</button>
                        </td>
                        <td className="px-6 py-4">
                           <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${restaurant.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {restaurant.status}
                           </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                           <div className="flex items-center justify-end gap-2">
                              <button onClick={() => handleEdit(restaurant)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded">
                                <Edit2 size={16}/>
                              </button>
                              <button onClick={(e) => handleDelete(restaurant.id, e)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded">
                                <Trash2 size={16}/>
                              </button>
                           </div>
                        </td>
                     </tr>
                  ))}
                  {filteredRestaurants.length === 0 && (
                    <tr>
                      <td colSpan={9} className="px-6 py-8 text-center text-slate-400 text-sm">No restaurants found.</td>
                    </tr>
                  )}
               </tbody>
            </table>
         </div>
      </div>

      {/* Modal */}
      {showModal && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
               <div className="bg-slate-800 px-6 py-4 flex justify-between items-center">
                  <h3 className="text-lg font-bold text-white">{currentRestaurant.id ? 'Edit Restaurant' : 'Add Restaurant'}</h3>
                  <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                    <X size={20} />
                  </button>
               </div>
               
               <div className="p-6 space-y-6 overflow-y-auto flex-1">
                  
                  {/* General Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Restaurant Name</label>
                          <input 
                            type="text" 
                            value={currentRestaurant.name || ''} 
                            onChange={(e) => setCurrentRestaurant({...currentRestaurant, name: e.target.value})} 
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-l-4 border-l-red-500"
                          />
                      </div>
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Destination</label>
                          <select 
                            value={currentRestaurant.destination} 
                            onChange={(e) => setCurrentRestaurant({...currentRestaurant, destination: e.target.value})} 
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 border-l-4 border-l-red-500"
                          >
                             <option value="">Select Destination</option>
                             {initialDestinations.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                          </select>
                      </div>
                      <div className="md:col-span-2">
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Address</label>
                          <textarea 
                            value={currentRestaurant.address || ''} 
                            onChange={(e) => setCurrentRestaurant({...currentRestaurant, address: e.target.value})} 
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 h-20 resize-none"
                          />
                      </div>
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Country</label>
                          <select 
                            value={currentRestaurant.country} 
                            onChange={(e) => setCurrentRestaurant({...currentRestaurant, country: e.target.value})} 
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                             <option value="">Select Country</option>
                             {initialCountries.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                          </select>
                      </div>
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">State</label>
                          <select 
                            value={currentRestaurant.state} 
                            onChange={(e) => setCurrentRestaurant({...currentRestaurant, state: e.target.value})} 
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                             <option value="">Select State</option>
                             {initialStates.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                          </select>
                      </div>
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">City</label>
                          <select 
                            value={currentRestaurant.city} 
                            onChange={(e) => setCurrentRestaurant({...currentRestaurant, city: e.target.value})} 
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                             <option value="">Select City</option>
                             {initialCities.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                          </select>
                      </div>
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Supplier</label>
                          <select 
                            value={currentRestaurant.supplier} 
                            onChange={(e) => setCurrentRestaurant({...currentRestaurant, supplier: e.target.value as any})} 
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                             <option value="Yes">Yes</option>
                             <option value="No">No</option>
                          </select>
                      </div>
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Pin Code</label>
                          <input 
                            type="text" 
                            value={currentRestaurant.pinCode || ''} 
                            onChange={(e) => setCurrentRestaurant({...currentRestaurant, pinCode: e.target.value})} 
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                      </div>
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">GSTN</label>
                          <input 
                            type="text" 
                            value={currentRestaurant.gstn || ''} 
                            onChange={(e) => setCurrentRestaurant({...currentRestaurant, gstn: e.target.value})} 
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                      </div>
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Image Upload</label>
                          <div className="flex gap-2">
                             <button className="px-3 py-2 border border-slate-300 rounded text-sm bg-white hover:bg-slate-50">Choose File</button>
                             <span className="py-2 text-sm text-slate-400">No file chosen</span>
                          </div>
                      </div>
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Status</label>
                          <select 
                            value={currentRestaurant.status} 
                            onChange={(e) => setCurrentRestaurant({...currentRestaurant, status: e.target.value as any})} 
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                             <option value="Active">Active</option>
                             <option value="Inactive">Inactive</option>
                          </select>
                      </div>
                  </div>

                  {/* Contact Person Section */}
                  <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
                      <h4 className="text-sm font-bold text-slate-700 mb-4 border-b border-slate-200 pb-2">Contact Person</h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div className="col-span-1">
                              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Select</label>
                              <select 
                                value={currentRestaurant.contact?.title}
                                onChange={e => updateContact('title', e.target.value)}
                                className="w-full border border-slate-300 rounded px-2 py-1.5 text-xs bg-white"
                              >
                                  <option>Mr.</option>
                                  <option>Ms.</option>
                              </select>
                          </div>
                          <div className="col-span-1">
                              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Contact Person</label>
                              <input 
                                type="text" 
                                value={currentRestaurant.contact?.name || ''}
                                onChange={e => updateContact('name', e.target.value)}
                                className="w-full border border-slate-300 rounded px-2 py-1.5 text-xs"
                              />
                          </div>
                          <div className="col-span-1">
                              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Designation</label>
                              <input 
                                type="text" 
                                value={currentRestaurant.contact?.designation || ''}
                                onChange={e => updateContact('designation', e.target.value)}
                                className="w-full border border-slate-300 rounded px-2 py-1.5 text-xs"
                              />
                          </div>
                          <div className="col-span-1">
                              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Country Code</label>
                              <input 
                                type="text" 
                                value={currentRestaurant.contact?.countryCode || ''}
                                onChange={e => updateContact('countryCode', e.target.value)}
                                className="w-full border border-slate-300 rounded px-2 py-1.5 text-xs"
                              />
                          </div>
                          <div className="col-span-1">
                              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Phone 1</label>
                              <input 
                                type="text" 
                                value={currentRestaurant.contact?.phone1 || ''}
                                onChange={e => updateContact('phone1', e.target.value)}
                                className="w-full border border-slate-300 rounded px-2 py-1.5 text-xs border-l-4 border-l-red-500"
                              />
                          </div>
                          <div className="col-span-1">
                              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Phone 2</label>
                              <input 
                                type="text" 
                                value={currentRestaurant.contact?.phone2 || ''}
                                onChange={e => updateContact('phone2', e.target.value)}
                                className="w-full border border-slate-300 rounded px-2 py-1.5 text-xs"
                              />
                          </div>
                          <div className="col-span-1">
                              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Phone 3</label>
                              <input 
                                type="text" 
                                value={currentRestaurant.contact?.phone3 || ''}
                                onChange={e => updateContact('phone3', e.target.value)}
                                className="w-full border border-slate-300 rounded px-2 py-1.5 text-xs"
                              />
                          </div>
                          <div className="col-span-2">
                              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Email</label>
                              <input 
                                type="email" 
                                value={currentRestaurant.contact?.email || ''}
                                onChange={e => updateContact('email', e.target.value)}
                                className="w-full border border-slate-300 rounded px-2 py-1.5 text-xs border-l-4 border-l-green-500"
                              />
                          </div>
                          <div className="col-span-2">
                              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Secondary Email</label>
                              <input 
                                type="email" 
                                value={currentRestaurant.contact?.secondaryEmail || ''}
                                onChange={e => updateContact('secondaryEmail', e.target.value)}
                                className="w-full border border-slate-300 rounded px-2 py-1.5 text-xs border-l-4 border-l-green-500"
                              />
                          </div>
                      </div>
                  </div>

               </div>

               <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                  <button onClick={handleSave} className="px-8 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full text-sm font-medium shadow-sm transition-colors">
                    Save
                  </button>
                  <button onClick={() => setShowModal(false)} className="px-8 py-2 bg-white border border-slate-300 text-slate-600 rounded-full text-sm font-medium hover:bg-slate-50 transition-colors">
                    Cancel
                  </button>
               </div>
            </div>
         </div>
      )}
    </div>
  );
};

export default RestaurantMaster;
