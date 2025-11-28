
import React, { useState } from 'react';
import { ArrowLeft, Download, Upload, Plus, Search, Edit2, Trash2, X, History, FileSpreadsheet, Image as ImageIcon, Eye, Calendar, Mail } from 'lucide-react';
import { Guide } from '../types';
import { initialGuides, initialDestinations, initialCountries, initialStates, initialCities } from './mockData';

interface GuideMasterProps {
  onBack: () => void;
}

const GuideMaster: React.FC<GuideMasterProps> = ({ onBack }) => {
  const [guides, setGuides] = useState<Guide[]>(initialGuides);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [serviceTypeFilter, setServiceTypeFilter] = useState('All');
  
  const [currentGuide, setCurrentGuide] = useState<Partial<Guide>>({ 
    status: 'Active',
    serviceType: 'Guide',
    selfSupplier: 'Yes',
    isDefault: 'No',
    vaccinationStatus: 'Yes',
    rating: 'NA'
  });

  const handleEdit = (guide: Guide) => {
    setCurrentGuide({ ...guide });
    setShowModal(true);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (window.confirm('Delete guide?')) {
      setGuides(prev => prev.filter(g => g.id !== id));
    }
  };

  const handleSave = () => {
    if (!currentGuide.name || !currentGuide.mobile) return;

    const destName = initialDestinations.find(d => d.id === currentGuide.destinationId)?.name || '';

    const newGuide: Guide = {
        id: currentGuide.id || Math.random().toString(),
        name: currentGuide.name,
        serviceType: currentGuide.serviceType || 'Guide',
        dob: currentGuide.dob || '',
        image: currentGuide.image || '',
        mobile: currentGuide.mobile,
        whatsapp: currentGuide.whatsapp || '',
        alternateNumber: currentGuide.alternateNumber || '',
        email: currentGuide.email || '',
        licenseNumber: currentGuide.licenseNumber || '',
        licenseIssueDate: currentGuide.licenseIssueDate || '',
        licenseExpiryDate: currentGuide.licenseExpiryDate || '',
        licenseImage: currentGuide.licenseImage || '',
        idProofNumber: currentGuide.idProofNumber || '',
        idProofIssueDate: currentGuide.idProofIssueDate || '',
        idProofExpiryDate: currentGuide.idProofExpiryDate || '',
        idProofImage: currentGuide.idProofImage || '',
        destinationId: currentGuide.destinationId || '',
        destinationName: destName,
        languages: currentGuide.languages || '',
        designation: currentGuide.designation || '',
        address: currentGuide.address || '',
        country: currentGuide.country || '',
        state: currentGuide.state || '',
        city: currentGuide.city || '',
        pinCode: currentGuide.pinCode || '',
        panNo: currentGuide.panNo || '',
        gstNo: currentGuide.gstNo || '',
        rating: currentGuide.rating || 'NA',
        vaccinationStatus: currentGuide.vaccinationStatus || 'No',
        status: currentGuide.status || 'Active',
        selfSupplier: currentGuide.selfSupplier || 'Yes',
        isDefault: currentGuide.isDefault || 'No',
        remarks: currentGuide.remarks || '',
        feedback: currentGuide.feedback || ''
    };

    if (currentGuide.id) {
        setGuides(prev => prev.map(g => g.id === currentGuide.id ? newGuide : g));
    } else {
        setGuides(prev => [...prev, newGuide]);
    }
    setShowModal(false);
    resetForm();
  };

  const resetForm = () => {
    setCurrentGuide({ 
      status: 'Active',
      serviceType: 'Guide',
      selfSupplier: 'Yes',
      isDefault: 'No',
      vaccinationStatus: 'Yes',
      rating: 'NA'
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'image' | 'licenseImage' | 'idProofImage') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentGuide(prev => ({ ...prev, [field]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredGuides = guides.filter(g => {
    const matchesSearch = g.name.toLowerCase().includes(search.toLowerCase()) || g.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || g.status === statusFilter;
    const matchesType = serviceTypeFilter === 'All' || g.serviceType === serviceTypeFilter;
    return matchesSearch && matchesStatus && matchesType;
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
            <h2 className="text-2xl font-bold text-slate-800">Guide</h2>
            <p className="text-sm text-slate-500">Manage guides, porters and tour escorts</p>
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
             <Plus size={18} /> Add Guide
           </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-6 flex flex-wrap gap-4 items-end">
         <div className="flex-1 min-w-[200px]">
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Name , Email</label>
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
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Select Type</label>
            <select 
              value={serviceTypeFilter} 
              onChange={(e) => setServiceTypeFilter(e.target.value)} 
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
               <option value="All">All</option>
               <option value="Guide">Guide</option>
               <option value="Porter">Porter</option>
               <option value="Tour Escort">Tour Escort</option>
               <option value="Tour Manager">Tour Manager</option>
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
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Sr.</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase text-center">Image</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Name</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Service Type</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Rating</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Email/Phone</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Address</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Languages</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Destination</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase text-center">Details</th>
                     <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Status</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {filteredGuides.map((guide, index) => (
                     <tr key={guide.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3 text-sm text-slate-500">{index + 1}</td>
                        <td className="px-4 py-3 text-center">
                            <div className="w-10 h-10 bg-slate-200 rounded flex items-center justify-center overflow-hidden mx-auto">
                                {guide.image ? <img src={guide.image} alt={guide.name} className="w-full h-full object-cover"/> : <ImageIcon size={16} className="text-slate-400"/>}
                            </div>
                        </td>
                        <td className="px-4 py-3 font-medium text-slate-800">{guide.name}</td>
                        <td className="px-4 py-3 text-sm text-slate-600">{guide.serviceType}</td>
                        <td className="px-4 py-3 text-sm text-slate-600">{guide.rating}</td>
                        <td className="px-4 py-3 text-sm text-slate-600">
                           <div>{guide.email}</div>
                           <div className="text-xs text-slate-500">{guide.mobile}</div>
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-600 truncate max-w-[150px]">{guide.address}</td>
                        <td className="px-4 py-3 text-sm text-slate-600">{guide.languages}</td>
                        <td className="px-4 py-3 text-sm text-slate-600">{guide.destinationName}</td>
                        <td className="px-4 py-3 text-center">
                           <button onClick={() => handleEdit(guide)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded">
                             <Eye size={16}/>
                           </button>
                        </td>
                        <td className="px-4 py-3">
                           <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${guide.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {guide.status}
                           </span>
                        </td>
                     </tr>
                  ))}
                  {filteredGuides.length === 0 && (
                    <tr>
                      <td colSpan={11} className="px-6 py-8 text-center text-slate-400 text-sm">No guides found.</td>
                    </tr>
                  )}
               </tbody>
            </table>
         </div>
      </div>

      {/* Modal */}
      {showModal && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
               <div className="bg-slate-800 px-6 py-4 flex justify-between items-center">
                  <h3 className="text-lg font-bold text-white uppercase">{currentGuide.id ? 'Edit Guide' : 'Add GUIDE/PORTER/TOUR ESCORT/TOUR MANAGER'}</h3>
                  <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                    <X size={20} />
                  </button>
               </div>
               
               <div className="p-8 space-y-8 overflow-y-auto flex-1 bg-white">
                  
                  {/* Supplier / Basic Info */}
                  <div>
                      <h4 className="text-xs font-bold text-slate-500 uppercase mb-4">Supplier</h4>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                          <div>
                              <label className="block text-xs font-semibold text-slate-500 mb-1">Service Type</label>
                              <select 
                                value={currentGuide.serviceType} 
                                onChange={(e) => setCurrentGuide({...currentGuide, serviceType: e.target.value as any})} 
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                 <option value="Guide">Guide</option>
                                 <option value="Porter">Porter</option>
                                 <option value="Tour Escort">Tour Escort</option>
                                 <option value="Tour Manager">Tour Manager</option>
                              </select>
                          </div>
                          <div>
                              <label className="block text-xs font-semibold text-slate-500 mb-1">Name</label>
                              <input 
                                type="text" 
                                value={currentGuide.name || ''} 
                                onChange={(e) => setCurrentGuide({...currentGuide, name: e.target.value})} 
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-l-4 border-l-red-500"
                              />
                          </div>
                          <div>
                              <label className="block text-xs font-semibold text-slate-500 mb-1">Date Of Birth</label>
                              <input 
                                type="date" 
                                value={currentGuide.dob || ''} 
                                onChange={(e) => setCurrentGuide({...currentGuide, dob: e.target.value})} 
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                          </div>
                          <div>
                              <label className="block text-xs font-semibold text-slate-500 mb-1">User Image</label>
                              <div className="flex gap-2 items-center">
                                 <label className="cursor-pointer px-3 py-2 border border-slate-300 rounded text-sm bg-white hover:bg-slate-50">
                                    Choose File
                                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageChange(e, 'image')} />
                                 </label>
                                 <span className="text-xs text-slate-400 truncate max-w-[100px]">
                                    {currentGuide.image ? 'Selected' : 'No file chosen'}
                                 </span>
                              </div>
                          </div>
                      </div>
                  </div>

                  {/* Contact Info */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Mobile Number</label>
                          <input 
                            type="text" 
                            value={currentGuide.mobile || ''} 
                            onChange={(e) => setCurrentGuide({...currentGuide, mobile: e.target.value})} 
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-l-4 border-l-red-500"
                          />
                      </div>
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">WhatsApp Number</label>
                          <input 
                            type="text" 
                            value={currentGuide.whatsapp || ''} 
                            onChange={(e) => setCurrentGuide({...currentGuide, whatsapp: e.target.value})} 
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                      </div>
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Alternate Number</label>
                          <input 
                            type="text" 
                            value={currentGuide.alternateNumber || ''} 
                            onChange={(e) => setCurrentGuide({...currentGuide, alternateNumber: e.target.value})} 
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                      </div>
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Email</label>
                          <div className="relative">
                              <input 
                                type="email" 
                                value={currentGuide.email || ''} 
                                onChange={(e) => setCurrentGuide({...currentGuide, email: e.target.value})} 
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                              />
                              <Mail size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-green-600" />
                          </div>
                      </div>
                  </div>

                  {/* License Info */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">License Number</label>
                          <input 
                            type="text" 
                            value={currentGuide.licenseNumber || ''} 
                            onChange={(e) => setCurrentGuide({...currentGuide, licenseNumber: e.target.value})} 
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                      </div>
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Issue Date</label>
                          <input 
                            type="date" 
                            value={currentGuide.licenseIssueDate || ''} 
                            onChange={(e) => setCurrentGuide({...currentGuide, licenseIssueDate: e.target.value})} 
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                      </div>
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Valid Upto</label>
                          <input 
                            type="date" 
                            value={currentGuide.licenseExpiryDate || ''} 
                            onChange={(e) => setCurrentGuide({...currentGuide, licenseExpiryDate: e.target.value})} 
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                      </div>
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Update license</label>
                          <div className="flex gap-2 items-center">
                                 <label className="cursor-pointer px-3 py-2 border border-slate-300 rounded text-sm bg-white hover:bg-slate-50">
                                    Choose File
                                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageChange(e, 'licenseImage')} />
                                 </label>
                                 <span className="text-xs text-slate-400 truncate max-w-[100px]">
                                    {currentGuide.licenseImage ? 'Selected' : 'No file chosen'}
                                 </span>
                          </div>
                      </div>
                  </div>

                  {/* ID Proof Info */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Id Proof Number</label>
                          <input 
                            type="text" 
                            value={currentGuide.idProofNumber || ''} 
                            onChange={(e) => setCurrentGuide({...currentGuide, idProofNumber: e.target.value})} 
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                      </div>
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Issue Date</label>
                          <input 
                            type="date" 
                            value={currentGuide.idProofIssueDate || ''} 
                            onChange={(e) => setCurrentGuide({...currentGuide, idProofIssueDate: e.target.value})} 
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                      </div>
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Valid Upto</label>
                          <input 
                            type="date" 
                            value={currentGuide.idProofExpiryDate || ''} 
                            onChange={(e) => setCurrentGuide({...currentGuide, idProofExpiryDate: e.target.value})} 
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                      </div>
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Upload Id Proof</label>
                          <div className="flex gap-2 items-center">
                                 <label className="cursor-pointer px-3 py-2 border border-slate-300 rounded text-sm bg-white hover:bg-slate-50">
                                    Choose File
                                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageChange(e, 'idProofImage')} />
                                 </label>
                                 <span className="text-xs text-slate-400 truncate max-w-[100px]">
                                    {currentGuide.idProofImage ? 'Selected' : 'No file chosen'}
                                 </span>
                          </div>
                      </div>
                  </div>

                  {/* Location & Skills */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Destination</label>
                          <select 
                            value={currentGuide.destinationId} 
                            onChange={(e) => setCurrentGuide({...currentGuide, destinationId: e.target.value})} 
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 border-l-4 border-l-red-500"
                          >
                             <option value="">Search Destination</option>
                             {initialDestinations.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                          </select>
                      </div>
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Language</label>
                          <input 
                            type="text" 
                            value={currentGuide.languages || ''} 
                            onChange={(e) => setCurrentGuide({...currentGuide, languages: e.target.value})} 
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                      </div>
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Designation</label>
                          <input 
                            type="text" 
                            value={currentGuide.designation || ''} 
                            onChange={(e) => setCurrentGuide({...currentGuide, designation: e.target.value})} 
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                      </div>
                  </div>

                  {/* Address */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Country</label>
                          <select 
                             value={currentGuide.country} 
                             onChange={(e) => setCurrentGuide({...currentGuide, country: e.target.value})}
                             className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white border-l-4 border-l-red-500"
                          >
                              <option value="">Select</option>
                              {initialCountries.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                          </select>
                      </div>
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">State</label>
                          <select 
                             value={currentGuide.state} 
                             onChange={(e) => setCurrentGuide({...currentGuide, state: e.target.value})}
                             className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
                          >
                              <option value="">Select State</option>
                              {initialStates.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                          </select>
                      </div>
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">City</label>
                          <select 
                             value={currentGuide.city} 
                             onChange={(e) => setCurrentGuide({...currentGuide, city: e.target.value})}
                             className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
                          >
                              <option value="">Select City</option>
                              {initialCities.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                          </select>
                      </div>
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Pin Code</label>
                          <input 
                            type="text" 
                            value={currentGuide.pinCode || ''} 
                            onChange={(e) => setCurrentGuide({...currentGuide, pinCode: e.target.value})} 
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                      </div>
                      <div className="col-span-4">
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Address</label>
                          <textarea 
                            value={currentGuide.address || ''} 
                            onChange={(e) => setCurrentGuide({...currentGuide, address: e.target.value})} 
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-20"
                          />
                      </div>
                  </div>
                  
                  {/* Notes */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Remark</label>
                          <textarea 
                            value={currentGuide.remarks || ''} 
                            onChange={(e) => setCurrentGuide({...currentGuide, remarks: e.target.value})} 
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-20"
                          />
                      </div>
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Feedback</label>
                          <textarea 
                            value={currentGuide.feedback || ''} 
                            onChange={(e) => setCurrentGuide({...currentGuide, feedback: e.target.value})} 
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-20"
                          />
                      </div>
                  </div>

                  {/* Settings */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Self Supplier</label>
                          <select 
                             value={currentGuide.selfSupplier} 
                             onChange={(e) => setCurrentGuide({...currentGuide, selfSupplier: e.target.value as any})}
                             className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white border-l-4 border-l-red-500"
                          >
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                          </select>
                      </div>
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Default</label>
                          <select 
                             value={currentGuide.isDefault} 
                             onChange={(e) => setCurrentGuide({...currentGuide, isDefault: e.target.value as any})}
                             className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white border-l-4 border-l-red-500"
                          >
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                          </select>
                      </div>
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Status</label>
                          <select 
                             value={currentGuide.status} 
                             onChange={(e) => setCurrentGuide({...currentGuide, status: e.target.value as any})}
                             className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white border-l-4 border-l-red-500"
                          >
                              <option value="Active">Active</option>
                              <option value="Inactive">Inactive</option>
                          </select>
                      </div>
                  </div>

                  {/* Financial & Misc */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">PAN NO.</label>
                          <input 
                            type="text" 
                            value={currentGuide.panNo || ''} 
                            onChange={(e) => setCurrentGuide({...currentGuide, panNo: e.target.value})} 
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                      </div>
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">GST NO.</label>
                          <input 
                            type="text" 
                            value={currentGuide.gstNo || ''} 
                            onChange={(e) => setCurrentGuide({...currentGuide, gstNo: e.target.value})} 
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                      </div>
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Rating</label>
                          <select 
                             value={currentGuide.rating} 
                             onChange={(e) => setCurrentGuide({...currentGuide, rating: e.target.value})}
                             className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
                          >
                              <option value="NA">NA</option>
                              <option value="1 Star">1 Star</option>
                              <option value="2 Star">2 Star</option>
                              <option value="3 Star">3 Star</option>
                              <option value="4 Star">4 Star</option>
                              <option value="5 Star">5 Star</option>
                          </select>
                      </div>
                      <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Vaccination Status</label>
                          <select 
                             value={currentGuide.vaccinationStatus} 
                             onChange={(e) => setCurrentGuide({...currentGuide, vaccinationStatus: e.target.value as any})}
                             className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
                          >
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                          </select>
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

export default GuideMaster;
