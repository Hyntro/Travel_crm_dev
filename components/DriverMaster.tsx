
import React, { useState } from 'react';
import { ArrowLeft, Plus, Search, Edit2, Trash2, X, Image as ImageIcon, History, Download, Upload, FileSpreadsheet, Bold, Italic } from 'lucide-react';
import { Driver } from '../types';
import { initialDrivers, initialVehicleTypes } from './mockData';

interface DriverMasterProps {
  onBack: () => void;
}

const DriverMaster: React.FC<DriverMasterProps> = ({ onBack }) => {
  const [drivers, setDrivers] = useState<Driver[]>(initialDrivers);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  const [currentDriver, setCurrentDriver] = useState<Partial<Driver>>({ 
    status: 'Active',
    vehicleType: 'From Vehicle Type'
  });

  const handleEdit = (driver: Driver) => {
    setCurrentDriver({ ...driver });
    setShowModal(true);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (window.confirm('Delete driver?')) {
      setDrivers(prev => prev.filter(d => d.id !== id));
    }
  };

  const handleSave = () => {
    if (!currentDriver.name) return;

    const newDriver: Driver = {
        id: currentDriver.id || Math.random().toString(),
        name: currentDriver.name,
        dob: currentDriver.dob || '',
        licenseNumber: currentDriver.licenseNumber || '',
        validUpto: currentDriver.validUpto || '',
        mobile: currentDriver.mobile || '',
        altMobile: currentDriver.altMobile || '',
        whatsapp: currentDriver.whatsapp || '',
        email: currentDriver.email || '',
        address: currentDriver.address || '',
        vehicleType: currentDriver.vehicleType || '',
        registrationNumber: currentDriver.registrationNumber || '',
        status: currentDriver.status || 'Active',
        image: currentDriver.image || '',
        licenseImage: currentDriver.licenseImage || ''
    };

    if (currentDriver.id) {
        setDrivers(prev => prev.map(d => d.id === currentDriver.id ? newDriver : d));
    } else {
        setDrivers(prev => [...prev, newDriver]);
    }
    setShowModal(false);
    resetForm();
  };

  const resetForm = () => {
    setCurrentDriver({ 
      status: 'Active',
      vehicleType: 'From Vehicle Type'
    });
  };

  const filteredDrivers = drivers.filter(d => {
    const matchesSearch = d.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || d.status === statusFilter;
    return matchesSearch && matchesStatus;
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
            <h2 className="text-2xl font-bold text-slate-800">Driver Master</h2>
            <p className="text-sm text-slate-500">Manage driver profiles and assignments</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
           <button className="bg-white border border-slate-300 text-slate-600 px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-50 text-sm font-medium shadow-sm">
             <History size={16}/> View Logs
           </button>
           <button className="bg-white border border-slate-300 text-slate-600 px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-50 text-sm font-medium shadow-sm">
             <Download size={16}/> Download Format
           </button>
           <label className="bg-white border border-slate-300 text-slate-600 px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-50 text-sm font-medium shadow-sm cursor-pointer">
             <Upload size={16}/> Import Excel
             <input type="file" className="hidden" accept=".csv,.xlsx"/>
           </label>
           <button 
             onClick={() => { resetForm(); setShowModal(true); }} 
             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm text-sm font-medium"
           >
             <Plus size={18} /> Add Driver
           </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-6 flex flex-wrap gap-4 items-end">
         <div className="flex-1 min-w-[200px]">
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Driver Name</label>
            <input 
              type="text" 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
              placeholder="Search" 
              className="w-full pl-3 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
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
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Profile</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Document</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Driver Name</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">DOB</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">License</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Mobile No.</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Alt Mob.</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">WhatsApp No</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Vehicle Type & Capacity</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Registration No.</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase text-center">Edit</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Status</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {filteredDrivers.map((driver, index) => (
                     <tr key={driver.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3 text-sm text-slate-500">{index + 1}</td>
                        <td className="px-4 py-3">
                            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden">
                                {driver.image ? <img src={driver.image} alt={driver.name} className="w-full h-full object-cover"/> : <ImageIcon size={14} className="text-slate-400"/>}
                            </div>
                        </td>
                        <td className="px-4 py-3">
                            <ImageIcon size={16} className="text-blue-500 cursor-pointer"/>
                        </td>
                        <td className="px-4 py-3 font-medium text-slate-800">{driver.name}</td>
                        <td className="px-4 py-3 text-sm text-slate-600">{driver.dob}</td>
                        <td className="px-4 py-3 text-sm text-slate-600">{driver.licenseNumber} <br/><span className="text-[10px] text-slate-400">{driver.validUpto}</span></td>
                        <td className="px-4 py-3 text-sm text-slate-600">{driver.mobile}</td>
                        <td className="px-4 py-3 text-sm text-slate-600">{driver.altMobile || '-'}</td>
                        <td className="px-4 py-3 text-sm text-slate-600">{driver.whatsapp || '-'}</td>
                        <td className="px-4 py-3 text-sm text-slate-600">{driver.vehicleType}</td>
                        <td className="px-4 py-3 text-sm text-slate-600">{driver.registrationNumber || '-'}</td>
                        <td className="px-4 py-3 text-center">
                           <button onClick={() => handleEdit(driver)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded">
                             <Edit2 size={16}/>
                           </button>
                        </td>
                        <td className="px-4 py-3">
                           <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${driver.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {driver.status}
                           </span>
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
               <div className="bg-white px-6 py-4 flex justify-between items-center border-b border-slate-200">
                  <h3 className="text-xl font-bold text-slate-800">{currentDriver.id ? 'Edit Driver Master' : 'Add Driver Master'}</h3>
                  <button onClick={handleSave} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-1.5 rounded-full text-sm font-medium shadow-sm">Save</button>
               </div>
               
               <div className="p-8 space-y-8 overflow-y-auto flex-1 bg-white">
                  
                  <div>
                      <h4 className="text-sm font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">Driver Information</h4>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
                          <div>
                              <label className="block text-xs font-semibold text-slate-500 mb-1">Driver Name</label>
                              <input 
                                type="text" 
                                value={currentDriver.name || ''} 
                                onChange={(e) => setCurrentDriver({...currentDriver, name: e.target.value})} 
                                className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-l-4 border-l-red-500"
                              />
                          </div>
                          <div>
                              <label className="block text-xs font-semibold text-slate-500 mb-1">Date Of Birth</label>
                              <input 
                                type="date" 
                                value={currentDriver.dob || ''} 
                                onChange={(e) => setCurrentDriver({...currentDriver, dob: e.target.value})} 
                                className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                          </div>
                          <div>
                              <label className="block text-xs font-semibold text-slate-500 mb-1">Image</label>
                              <div className="flex gap-2 items-center">
                                 <button className="px-3 py-2 border border-slate-300 rounded text-sm bg-white hover:bg-slate-50">Choose File</button>
                                 <span className="text-xs text-slate-400">No file chosen</span>
                              </div>
                          </div>
                          <div>
                              <label className="block text-xs font-semibold text-slate-500 mb-1">Mobile Number</label>
                              <input 
                                type="text" 
                                value={currentDriver.mobile || ''} 
                                onChange={(e) => setCurrentDriver({...currentDriver, mobile: e.target.value})} 
                                className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-l-4 border-l-red-500"
                              />
                          </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
                          <div>
                              <label className="block text-xs font-semibold text-slate-500 mb-1">Alternate Mobile number</label>
                              <input 
                                type="text" 
                                value={currentDriver.altMobile || ''} 
                                onChange={(e) => setCurrentDriver({...currentDriver, altMobile: e.target.value})} 
                                className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                          </div>
                          <div>
                              <label className="block text-xs font-semibold text-slate-500 mb-1">Whatsapp Number</label>
                              <input 
                                type="text" 
                                value={currentDriver.whatsapp || ''} 
                                onChange={(e) => setCurrentDriver({...currentDriver, whatsapp: e.target.value})} 
                                className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-l-4 border-l-red-500"
                              />
                          </div>
                          <div>
                              <label className="block text-xs font-semibold text-slate-500 mb-1">Email Id</label>
                              <input 
                                type="email" 
                                value={currentDriver.email || ''} 
                                onChange={(e) => setCurrentDriver({...currentDriver, email: e.target.value})} 
                                className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                          </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
                          <div>
                              <label className="block text-xs font-semibold text-slate-500 mb-1">License Number</label>
                              <input 
                                type="text" 
                                value={currentDriver.licenseNumber || ''} 
                                onChange={(e) => setCurrentDriver({...currentDriver, licenseNumber: e.target.value})} 
                                className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                          </div>
                          <div>
                              <label className="block text-xs font-semibold text-slate-500 mb-1">Valid Upto</label>
                              <input 
                                type="date" 
                                value={currentDriver.validUpto || ''} 
                                onChange={(e) => setCurrentDriver({...currentDriver, validUpto: e.target.value})} 
                                className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                          </div>
                          <div>
                              <label className="block text-xs font-semibold text-slate-500 mb-1">Upload License</label>
                              <div className="flex gap-2 items-center">
                                 <button className="px-3 py-2 border border-slate-300 rounded text-sm bg-white hover:bg-slate-50">Choose File</button>
                                 <span className="text-xs text-slate-400">No file chosen</span>
                              </div>
                          </div>
                      </div>

                      <div className="mb-4">
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Address</label>
                          <textarea 
                            value={currentDriver.address || ''} 
                            onChange={(e) => setCurrentDriver({...currentDriver, address: e.target.value})} 
                            className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
                          />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                          <div>
                              <label className="block text-xs font-semibold text-slate-500 mb-1">Assign Vehicle</label>
                              <select 
                                value={currentDriver.vehicleType} 
                                onChange={(e) => setCurrentDriver({...currentDriver, vehicleType: e.target.value})} 
                                className="w-full px-3 py-2 border border-slate-300 rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                 <option>From Vehicle Type</option>
                              </select>
                          </div>
                          <div>
                              <label className="block text-xs font-semibold text-slate-500 mb-1">Vehicle Type</label>
                              <select 
                                className="w-full px-3 py-2 border border-slate-300 rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                 {initialVehicleTypes.map(v => <option key={v.id} value={v.name}>{v.name} ({v.capacity} Seater)</option>)}
                              </select>
                          </div>
                          <div>
                              <label className="block text-xs font-semibold text-slate-500 mb-1">Registration Number</label>
                              <input 
                                type="text" 
                                value={currentDriver.registrationNumber || ''} 
                                onChange={(e) => setCurrentDriver({...currentDriver, registrationNumber: e.target.value})} 
                                className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                          </div>
                      </div>

                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">status</label>
                          <select 
                            value={currentDriver.status} 
                            onChange={(e) => setCurrentDriver({...currentDriver, status: e.target.value as any})} 
                            className="w-full px-3 py-2 border border-slate-300 rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                             <option value="Active">Active</option>
                             <option value="Inactive">Inactive</option>
                          </select>
                      </div>
                  </div>

               </div>
            </div>
         </div>
      )}
    </div>
  );
};

export default DriverMaster;
