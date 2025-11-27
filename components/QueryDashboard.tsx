import React, { useState } from 'react';
import { Search, Calendar, Filter, Plus, FileText, ArrowRight, Briefcase, Globe, User, Phone, Mail, Clock, Hotel, MapPin, Save, X, AlignLeft, Users, Bed, Layers, Trash2 } from 'lucide-react';
import { TravelQuery, QueryStatus, QueryPriority } from '../types';
import QueryDetail from './QueryDetail';
import { initialCities } from './mockData';

// Mock Data
const initialQueries: TravelQuery[] = [
  { id: 'DB25-26/000785', tourId: 'TI: 25/11/0392/RK', type: 'Agent', clientName: 'Robert Kingsley', clientEmail: 'rob.k@example.com', clientPhone: '+44 7700 900077', pax: 2, tourDate: '2025-11-25', destination: 'Japan', queryType: 'Inbound', priority: 'High', assignedTo: 'John Doe', status: 'Confirmed', createdAt: '2025-05-10' },
  { id: 'DB25-26/000786', tourId: 'TI: 25/11/0401/SM', type: 'B2C', clientName: 'Sarah Miller', clientEmail: 's.miller@gmail.com', clientPhone: '+1 555 0199', pax: 4, tourDate: '2025-12-10', destination: 'Italy', queryType: 'FIT', priority: 'Low', assignedTo: 'Jane Smith', status: 'Quotation Generated', createdAt: '2025-05-11' },
  { id: 'DB25-26/000787', tourId: 'TI: 25/11/0405/AL', type: 'B2C', clientName: 'Alice Li', clientEmail: 'alice.li@example.com', clientPhone: '+1 555 0200', pax: 1, tourDate: '2025-08-05', destination: 'Costa Rica', queryType: 'Query', priority: 'Urgent', assignedTo: 'Mike Ross', status: 'In Process', createdAt: '2025-05-12' },
  { id: 'DB25-26/000788', tourId: 'TI: 25/11/0410/BK', type: 'Agent', clientName: 'Bob Kramer', clientEmail: 'bk_travels@agency.com', clientPhone: '+1 555 0300', pax: 15, tourDate: '2026-01-15', destination: 'Thailand', queryType: 'Inbound', priority: 'High', assignedTo: 'John Doe', status: 'New', createdAt: '2025-05-12' },
  { id: 'DB25-26/000789', tourId: 'TI: 25/11/0412/JD', type: 'B2C', clientName: 'John Davis', clientEmail: 'j.davis@example.com', clientPhone: '+1 555 0400', pax: 2, tourDate: '2025-09-20', destination: 'Greece', queryType: 'FIT', priority: 'Low', assignedTo: '-', status: 'Lost', createdAt: '2025-05-09' },
];

const stats = [
  { label: 'Total Queries', value: 1240, color: 'bg-slate-600', text: 'text-white' },
  { label: 'New', value: 45, color: 'bg-teal-500', text: 'text-white' },
  { label: 'Contacted', value: 120, color: 'bg-orange-400', text: 'text-white' },
  { label: 'In Process', value: 85, color: 'bg-purple-500', text: 'text-white' },
  { label: 'Quotation', value: 60, color: 'bg-blue-500', text: 'text-white' },
  { label: 'Confirmed', value: 890, color: 'bg-green-500', text: 'text-white' },
  { label: 'Lost', value: 40, color: 'bg-red-500', text: 'text-white' },
];

const getStatusBadge = (status: QueryStatus) => {
  switch (status) {
    case 'Confirmed': return 'bg-green-100 text-green-700 border-green-200';
    case 'Lost': return 'bg-red-100 text-red-700 border-red-200';
    case 'Quotation Generated': return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'In Process': return 'bg-purple-100 text-purple-700 border-purple-200';
    case 'Contacted': return 'bg-orange-100 text-orange-700 border-orange-200';
    case 'New': return 'bg-teal-100 text-teal-700 border-teal-200';
    default: return 'bg-slate-100 text-slate-700 border-slate-200';
  }
};

const QueryDashboard: React.FC = () => {
  const [view, setView] = useState<'list' | 'add' | 'detail'>('list');
  const [queries, setQueries] = useState<TravelQuery[]>(initialQueries);
  const [selectedQuery, setSelectedQuery] = useState<TravelQuery | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    businessType: 'Agent',
    clientName: '',
    contactPerson: '',
    contactNumber: '',
    email: '',
    marketType: 'International',
    nationality: 'Indian',
    subject: '',
    travelType: 'Inbound',
    queryType: 'Query',
    paxType: 'FIT',
    dateType: 'Date Wise',
    arrivalCountry: 'India',
    fromDate: '',
    toDate: '',
    totalNights: 0,
    salesPerson: '',
    assignUser: '',
    marketingPerson: '',
    budget: '',
    language: 'English',
    leadSource: 'Website',
    tat: '24 Hours',
    priority: 'Normal',
    hotelCategory: '4 Star',
    adult: 2,
    child: 0,
    destination: '',
    rooms: { sgl: 0, dbl: 0, twin: 0, tpl: 0, exbed: 0 },
    itinerary: [] as { day: number; date: string; destination: string }[]
  });

  const handleDateChange = (field: 'fromDate' | 'toDate', value: string) => {
    const updatedData = { ...formData, [field]: value };
    
    if (updatedData.fromDate && updatedData.toDate) {
      const start = new Date(updatedData.fromDate);
      const end = new Date(updatedData.toDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      updatedData.totalNights = diffDays > 0 ? diffDays : 0;
    }
    setFormData(updatedData);
  };

  const handleNightsChange = (value: string) => {
    const nights = parseInt(value) || 0;
    const updatedData = { ...formData, totalNights: nights };

    if (updatedData.fromDate && nights > 0) {
        const start = new Date(updatedData.fromDate);
        const end = new Date(start);
        end.setDate(start.getDate() + nights);
        updatedData.toDate = end.toISOString().split('T')[0];
    }
    setFormData(updatedData);
  };

  const handleGenerateItinerary = () => {
    if (!formData.fromDate || formData.totalNights <= 0) return;

    const start = new Date(formData.fromDate);
    const itineraryItems = [];
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Usually Itinerary Days = Nights + 1
    const totalDays = formData.totalNights + 1;

    for (let i = 0; i < totalDays; i++) {
        const currentDate = new Date(start);
        currentDate.setDate(start.getDate() + i);
        const dayName = weekDays[currentDate.getDay()];
        const displayDate = `${currentDate.getDate().toString().padStart(2, '0')}-${(currentDate.getMonth()+1).toString().padStart(2, '0')}-${currentDate.getFullYear()}`;
        
        itineraryItems.push({
            day: i + 1,
            date: `${displayDate} /${dayName}`,
            destination: ''
        });
    }
    setFormData({ ...formData, itinerary: itineraryItems });
  };

  const handleItineraryChange = (index: number, value: string) => {
    const updatedItinerary = [...formData.itinerary];
    updatedItinerary[index].destination = value;
    setFormData({ ...formData, itinerary: updatedItinerary });
  };

  const handleAddDestinationRow = () => {
    const nextDay = formData.itinerary.length + 1;
    setFormData({
        ...formData,
        itinerary: [...formData.itinerary, { day: nextDay, date: `Day ${nextDay}`, destination: '' }]
    });
  };

  const handleRemoveDestinationRow = (index: number) => {
    const updatedItinerary = formData.itinerary.filter((_, idx) => idx !== index);
    // Re-index days
    const reIndexed = updatedItinerary.map((item, idx) => ({ ...item, day: idx + 1 }));
    setFormData({ ...formData, itinerary: reIndexed });
  };

  const handleSave = () => {
    const newQuery: TravelQuery = {
        id: `DB25-26/${Math.floor(100000 + Math.random() * 900000)}`,
        tourId: `TI: 25/11/${Math.floor(1000 + Math.random() * 9000)}/XY`,
        type: formData.businessType === 'Agent' ? 'Agent' : 'B2C',
        clientName: formData.clientName || formData.contactPerson || 'Unknown Client',
        clientEmail: formData.email,
        clientPhone: formData.contactNumber,
        pax: (Number(formData.adult) || 0) + (Number(formData.child) || 0),
        tourDate: formData.fromDate || new Date().toISOString().split('T')[0],
        destination: formData.destination || formData.arrivalCountry || 'Unknown',
        queryType: 'Query',
        priority: formData.priority === 'High' ? 'High' : 'Low',
        assignedTo: formData.assignUser || 'Unassigned',
        status: 'New',
        createdAt: new Date().toISOString().split('T')[0]
    };
    
    setQueries([newQuery, ...queries]);
    setView('list');
  };

  const handleQueryClick = (query: TravelQuery) => {
    setSelectedQuery(query);
    setView('detail');
  };

  if (view === 'detail' && selectedQuery) {
    return <QueryDetail query={selectedQuery} onBack={() => { setView('list'); setSelectedQuery(null); }} />;
  }

  if (view === 'add') {
    return (
      <div className="p-6 bg-slate-50 min-h-full animate-in slide-in-from-right-4 duration-300">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
           <div>
              <h2 className="text-2xl font-bold text-slate-800">Add New Query</h2>
              <p className="text-slate-500 text-sm">Create a new travel lead or inquiry</p>
           </div>
           <div className="flex gap-3 mt-4 md:mt-0">
              <button onClick={() => setView('list')} className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 text-sm font-medium">Cancel</button>
              <button className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-200">Client History</button>
              <button onClick={handleSave} className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium shadow-sm flex items-center gap-2">
                 <Save size={16} /> Save
              </button>
           </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
           {/* Left Column: Contact Info */}
           <div className="xl:col-span-1 space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                 <div className="bg-orange-100 px-4 py-3 border-b border-orange-200 flex items-center gap-2">
                    <Briefcase size={18} className="text-orange-700"/>
                    <h3 className="font-bold text-orange-800 text-sm uppercase">Contact Information</h3>
                 </div>
                 <div className="p-5 space-y-4">
                    <div>
                       <label className="block text-xs font-semibold text-slate-500 mb-2">Business Type</label>
                       <div className="grid grid-cols-2 gap-2">
                          {['Agent', 'B2B', 'B2C', 'Consortia', 'Foreign Tour Operator', 'Indian Tour Operator', 'ISO'].map(type => (
                             <label key={type} className={`flex items-center gap-2 cursor-pointer p-2 rounded border transition-colors ${formData.businessType === type ? 'bg-blue-50 border-blue-200' : 'bg-slate-50 border-transparent'}`}>
                                <input 
                                  type="radio" 
                                  name="businessType" 
                                  checked={formData.businessType === type} 
                                  onChange={() => setFormData({...formData, businessType: type})}
                                  className="text-blue-600 focus:ring-blue-500"
                                />
                                <span className="text-xs text-slate-700 truncate" title={type}>{type}</span>
                             </label>
                          ))}
                       </div>
                    </div>
                    
                    <div>
                       <label className="block text-xs font-semibold text-slate-500 mb-1">Name / Client Name</label>
                       <div className="flex gap-2">
                          <div className="relative flex-1">
                             <User size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"/>
                             <input type="text" className="w-full pl-8 pr-3 py-2 border border-slate-300 rounded text-sm focus:border-orange-400 outline-none" placeholder="Company or Client Name" value={formData.clientName} onChange={e => setFormData({...formData, clientName: e.target.value})} />
                          </div>
                          <button className="bg-purple-500 text-white px-3 py-1 rounded text-xs font-bold">+Add</button>
                       </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                           <label className="block text-xs font-semibold text-slate-500 mb-1">Contact Person</label>
                           <div className="relative">
                              <User size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"/>
                              <input type="text" className="w-full pl-8 pr-3 py-2 border border-slate-300 rounded text-sm focus:border-orange-400 outline-none bg-slate-50" value={formData.contactPerson} onChange={e => setFormData({...formData, contactPerson: e.target.value})} />
                           </div>
                        </div>
                        <div>
                           <label className="block text-xs font-semibold text-slate-500 mb-1">Contact Number</label>
                           <div className="relative">
                              <Phone size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"/>
                              <input type="text" className="w-full pl-8 pr-3 py-2 border border-slate-300 rounded text-sm focus:border-orange-400 outline-none bg-slate-50" value={formData.contactNumber} onChange={e => setFormData({...formData, contactNumber: e.target.value})} />
                           </div>
                        </div>
                    </div>

                    <div>
                       <label className="block text-xs font-semibold text-slate-500 mb-1">Email Address</label>
                       <div className="relative">
                          <Mail size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"/>
                          <input type="email" className="w-full pl-8 pr-3 py-2 border border-slate-300 rounded text-sm focus:border-orange-400 outline-none bg-slate-50" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                       </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                           <label className="block text-xs font-semibold text-slate-500 mb-1">Market Type</label>
                           <select className="w-full border border-slate-300 rounded px-2 py-2 text-sm bg-slate-50 focus:border-orange-400 outline-none">
                              <option>Domestic</option>
                              <option>International</option>
                           </select>
                        </div>
                        <div>
                           <label className="block text-xs font-semibold text-slate-500 mb-1">Nationality</label>
                           <select className="w-full border border-slate-300 rounded px-2 py-2 text-sm bg-slate-50 focus:border-orange-400 outline-none">
                              <option>Indian</option>
                              <option>American</option>
                              <option>British</option>
                           </select>
                        </div>
                    </div>
                    <div>
                       <label className="block text-xs font-semibold text-slate-500 mb-1">Subject</label>
                       <input type="text" className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-orange-400 outline-none" placeholder="Query Subject" value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} />
                    </div>
                 </div>
              </div>
           </div>

           {/* Middle Column: Travel Info */}
           <div className="xl:col-span-1 space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                 <div className="bg-orange-100 px-4 py-3 border-b border-orange-200 flex items-center gap-2">
                    <Globe size={18} className="text-orange-700"/>
                    <h3 className="font-bold text-orange-800 text-sm uppercase">Travel Information</h3>
                 </div>
                 <div className="p-5 space-y-4">
                    <div>
                       <label className="block text-xs font-semibold text-slate-500 mb-2">Travel Type</label>
                       <div className="grid grid-cols-2 gap-2">
                          {['Inbound', 'Domestic', 'Value Added Services'].map(t => (
                             <label key={t} className={`flex items-center gap-2 cursor-pointer p-2 rounded border ${formData.travelType === t ? 'bg-blue-50 border-blue-200' : 'bg-slate-50 border-transparent'}`}>
                                <input type="radio" name="travelType" checked={formData.travelType === t} onChange={()=>setFormData({...formData, travelType: t})} className="text-blue-600" />
                                <span className="text-xs text-slate-700">{t}</span>
                             </label>
                          ))}
                       </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-2">Query Type</label>
                        <div className="grid grid-cols-2 gap-2">
                            {['Query', 'Series', 'Package', 'Duplicate Query', 'Transfer'].map(t => (
                                <label key={t} className={`flex items-center gap-2 cursor-pointer p-2 rounded border ${formData.queryType === t ? 'bg-blue-50 border-blue-200' : 'bg-slate-50 border-transparent'}`}>
                                    <input type="radio" name="queryType" checked={formData.queryType === t} onChange={()=>setFormData({...formData, queryType: t})} className="text-blue-600" />
                                    <span className="text-xs text-slate-700">{t}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                           <label className="block text-xs font-semibold text-slate-500 mb-1">Pax Type</label>
                           <div className="flex bg-slate-100 p-1 rounded border border-slate-200">
                              <label className="flex-1 flex items-center justify-center gap-1 cursor-pointer py-1 rounded hover:bg-white"><input type="radio" name="paxType" checked={formData.paxType === 'FIT'} onChange={()=>setFormData({...formData, paxType: 'FIT'})} className="text-blue-600"/><span className="text-xs">FIT</span></label>
                              <label className="flex-1 flex items-center justify-center gap-1 cursor-pointer py-1 rounded hover:bg-white"><input type="radio" name="paxType" checked={formData.paxType === 'GIT'} onChange={()=>setFormData({...formData, paxType: 'GIT'})} className="text-blue-600"/><span className="text-xs">GIT</span></label>
                           </div>
                        </div>
                        <div>
                           <label className="block text-xs font-semibold text-slate-500 mb-1">Flow</label>
                           <div className="flex bg-slate-100 p-1 rounded border border-slate-200">
                              <label className="flex-1 flex items-center justify-center gap-1 cursor-pointer py-1 rounded hover:bg-white"><input type="radio" name="dateType" checked={formData.dateType === 'Date Wise'} onChange={()=>setFormData({...formData, dateType: 'Date Wise'})} className="text-blue-600"/><span className="text-xs">Date</span></label>
                              <label className="flex-1 flex items-center justify-center gap-1 cursor-pointer py-1 rounded hover:bg-white"><input type="radio" name="dateType" checked={formData.dateType === 'Day Wise'} onChange={()=>setFormData({...formData, dateType: 'Day Wise'})} className="text-blue-600"/><span className="text-xs">Day</span></label>
                           </div>
                        </div>
                    </div>
                    
                    <div>
                       <label className="block text-xs font-semibold text-slate-500 mb-1">Arrival Information</label>
                       <div className="grid grid-cols-3 gap-2">
                           <select className="col-span-2 border border-slate-300 rounded px-2 py-2 text-sm bg-slate-50 focus:border-orange-400 outline-none" value={formData.arrivalCountry} onChange={e=>setFormData({...formData, arrivalCountry: e.target.value})}>
                              <option value="India">India</option>
                              <option value="Thailand">Thailand</option>
                              <option value="Dubai">Dubai</option>
                              <option value="Japan">Japan</option>
                           </select>
                           <div className="bg-slate-100 rounded border border-slate-200"></div>
                       </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                       <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">From Date</label>
                          <div className="relative">
                             <input type="date" className="w-full px-2 py-2 border border-slate-300 rounded text-xs focus:border-orange-400 outline-none" value={formData.fromDate} onChange={e=>handleDateChange('fromDate', e.target.value)}/>
                          </div>
                       </div>
                       <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">To Date</label>
                          <div className="relative">
                             <input type="date" className="w-full px-2 py-2 border border-slate-300 rounded text-xs focus:border-orange-400 outline-none" value={formData.toDate} onChange={e=>handleDateChange('toDate', e.target.value)}/>
                          </div>
                       </div>
                       <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Total Nights</label>
                          <div className="flex gap-1">
                             <input type="number" className="w-full border border-slate-300 rounded px-2 py-2 text-xs text-center font-bold text-slate-700 focus:border-orange-400 outline-none" value={formData.totalNights} onChange={(e) => handleNightsChange(e.target.value)} />
                             <button onClick={handleGenerateItinerary} className="bg-purple-500 text-white px-2 rounded text-xs hover:bg-purple-600 transition-colors">Add</button>
                          </div>
                       </div>
                    </div>

                    {/* Itinerary Table */}
                    {formData.itinerary.length > 0 && (
                        <div className="mt-4 border border-slate-200 rounded-lg overflow-hidden animate-in fade-in">
                            <div className="flex justify-between items-center p-2 bg-slate-50 border-b border-slate-200">
                                <span className="text-xs font-bold text-slate-600">Itinerary</span>
                                <button onClick={handleAddDestinationRow} className="text-[10px] bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded shadow-sm">
                                    + Add Destination
                                </button> 
                            </div>
                            <div className="max-h-60 overflow-y-auto">
                                <table className="w-full text-xs text-left">
                                    <thead className="bg-slate-100 text-slate-600 font-bold sticky top-0 z-10">
                                        <tr>
                                            <th className="px-2 py-2 border-b border-r">Sr.</th>
                                            <th className="px-2 py-2 border-b border-r">Date/Day</th>
                                            <th className="px-2 py-2 border-b border-r">Destination</th>
                                            <th className="px-2 py-2 border-b w-8"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {formData.itinerary.map((item, idx) => (
                                            <tr key={idx} className="hover:bg-slate-50">
                                                <td className="px-2 py-2 border-r text-center">{item.day}</td>
                                                <td className="px-2 py-2 border-r whitespace-nowrap">{item.date}</td>
                                                <td className="px-2 py-2 border-r">
                                                    <select 
                                                        className="w-full border border-slate-200 rounded px-1 py-1 text-xs outline-none focus:border-blue-500 bg-white"
                                                        value={item.destination}
                                                        onChange={(e) => handleItineraryChange(idx, e.target.value)}
                                                    >
                                                        <option value="">Select City</option>
                                                        {initialCities.map(c => (
                                                            <option key={c.id} value={c.name}>{c.name}</option>
                                                        ))}
                                                    </select>
                                                </td>
                                                <td className="px-2 py-2 text-center">
                                                    <button onClick={() => handleRemoveDestinationRow(idx)} className="text-red-400 hover:text-red-600">
                                                        <Trash2 size={12} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                 </div>
              </div>
           </div>

           {/* Right Column: Assignment, Preference, Quotation */}
           <div className="xl:col-span-1 space-y-6">
              
              {/* Assignment */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                 <div className="bg-orange-100 px-4 py-3 border-b border-orange-200 flex items-center gap-2">
                    <User size={18} className="text-orange-700"/>
                    <h3 className="font-bold text-orange-800 text-sm uppercase">Assignment</h3>
                 </div>
                 <div className="p-5 space-y-4">
                    <div>
                       <label className="block text-xs font-semibold text-slate-500 mb-1">Sales Person</label>
                       <input type="text" placeholder="Search User" className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-orange-400 outline-none bg-slate-50" value={formData.salesPerson} onChange={e => setFormData({...formData, salesPerson: e.target.value})} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                           <label className="block text-xs font-semibold text-slate-500 mb-1">Assign User</label>
                           <input type="text" placeholder="Search User" className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-orange-400 outline-none bg-slate-50" value={formData.assignUser} onChange={e => setFormData({...formData, assignUser: e.target.value})} />
                        </div>
                        <div>
                           <label className="block text-xs font-semibold text-slate-500 mb-1">Marketing Person</label>
                           <input type="text" placeholder="Search User" className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-orange-400 outline-none bg-slate-50" value={formData.marketingPerson} onChange={e => setFormData({...formData, marketingPerson: e.target.value})} />
                        </div>
                    </div>
                 </div>
              </div>

              {/* Preference */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                 <div className="bg-orange-100 px-4 py-3 border-b border-orange-200 flex items-center gap-2">
                    <Filter size={18} className="text-orange-700"/>
                    <h3 className="font-bold text-orange-800 text-sm uppercase">Preference</h3>
                 </div>
                 <div className="p-5 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                       <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Budget</label>
                          <input type="number" className="w-full border border-slate-300 rounded px-3 py-2 text-sm bg-slate-50 focus:border-orange-400 outline-none" placeholder="Amount" value={formData.budget} onChange={e=>setFormData({...formData, budget: e.target.value})}/>
                       </div>
                       <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Preferred Language</label>
                          <select className="w-full border border-slate-300 rounded px-2 py-2 text-sm bg-slate-50 focus:border-orange-400 outline-none">
                             <option>English</option>
                             <option>Spanish</option>
                             <option>French</option>
                          </select>
                       </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                       <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">ISO/Override</label>
                          <select className="w-full border border-slate-300 rounded px-2 py-2 text-sm bg-slate-50 focus:border-orange-400 outline-none">
                             <option>Select ISO</option>
                          </select>
                       </div>
                       <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Consortia</label>
                          <select className="w-full border border-slate-300 rounded px-2 py-2 text-sm bg-slate-50 focus:border-orange-400 outline-none">
                             <option>Select Consortia</option>
                          </select>
                       </div>
                    </div>

                    <div>
                       <label className="block text-xs font-semibold text-slate-500 mb-2">Priority</label>
                       <div className="flex gap-2">
                          {['Normal', 'Medium', 'High'].map(p => (
                             <label key={p} className={`flex-1 flex items-center justify-center gap-1 cursor-pointer border rounded py-1 ${formData.priority === p ? 'bg-blue-100 border-blue-300 text-blue-800' : 'bg-slate-50 border-slate-200'}`}>
                                <input type="radio" name="priority" checked={formData.priority === p} onChange={()=>setFormData({...formData, priority: p})} className="hidden" />
                                <span className="text-xs font-medium">{p}</span>
                             </label>
                          ))}
                       </div>
                    </div>

                    <div>
                       <label className="block text-xs font-semibold text-slate-500 mb-2">TAT</label>
                       <div className="flex gap-2">
                          {['24 Hours', '48 Hours', '72 Hours'].map(t => (
                             <label key={t} className={`flex-1 flex items-center justify-center gap-1 cursor-pointer border rounded py-1 ${formData.tat === t ? 'bg-blue-100 border-blue-300 text-blue-800' : 'bg-slate-50 border-slate-200'}`}>
                                <input type="radio" name="tat" checked={formData.tat === t} onChange={()=>setFormData({...formData, tat: t})} className="hidden" />
                                <span className="text-xs font-medium">{t}</span>
                             </label>
                          ))}
                       </div>
                    </div>

                    <div>
                       <label className="block text-xs font-semibold text-slate-500 mb-2">Hotel Category</label>
                       <div className="flex flex-wrap gap-2">
                          {['All', '1 Star', '2 Star', '3 Star', '4 Star', '5 Star'].map(c => (
                             <label key={c} className={`flex-grow text-center items-center cursor-pointer border rounded px-2 py-1 ${formData.hotelCategory === c ? 'bg-blue-100 border-blue-300 text-blue-800' : 'bg-slate-50 border-slate-200'}`}>
                                <input type="radio" name="hotelCat" checked={formData.hotelCategory === c} onChange={()=>setFormData({...formData, hotelCategory: c})} className="hidden" />
                                <span className="text-xs font-medium">{c}</span>
                             </label>
                          ))}
                       </div>
                    </div>
                 </div>
              </div>

              {/* Quotation / Pax Info */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                 <div className="bg-orange-100 px-4 py-3 border-b border-orange-200 flex items-center gap-2">
                    <FileText size={18} className="text-orange-700"/>
                    <h3 className="font-bold text-orange-800 text-sm uppercase">Quotation / Itinerary Information</h3>
                 </div>
                 <div className="p-5 space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                       <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Adult <User size={10} className="inline"/></label>
                          <input type="number" min="1" value={formData.adult} onChange={e=>setFormData({...formData, adult: parseInt(e.target.value)})} className="w-full border border-slate-300 rounded px-2 py-2 text-sm text-center focus:border-orange-400 outline-none bg-slate-50" />
                       </div>
                       <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Child <User size={10} className="inline"/></label>
                          <input type="number" min="0" value={formData.child} onChange={e=>setFormData({...formData, child: parseInt(e.target.value)})} className="w-full border border-slate-300 rounded px-2 py-2 text-sm text-center focus:border-orange-400 outline-none bg-slate-50" />
                       </div>
                       <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Total Pax</label>
                          <div className="w-full py-2 text-sm text-center font-bold text-slate-700">{(Number(formData.adult)||0) + (Number(formData.child)||0)}</div>
                       </div>
                    </div>
                    
                    <div>
                       <div className="grid grid-cols-2 gap-4 mb-2">
                          <div>
                             <label className="block text-xs font-semibold text-slate-500 mb-1">SGL Room</label>
                             <input type="number" className="w-full border border-slate-300 rounded px-2 py-2 text-sm bg-slate-50" value={formData.rooms.sgl} onChange={e=>setFormData({...formData, rooms: {...formData.rooms, sgl: parseInt(e.target.value)}})}/>
                          </div>
                          <div>
                             <label className="block text-xs font-semibold text-slate-500 mb-1">DBL Room</label>
                             <input type="number" className="w-full border border-slate-300 rounded px-2 py-2 text-sm bg-slate-50" value={formData.rooms.dbl} onChange={e=>setFormData({...formData, rooms: {...formData.rooms, dbl: parseInt(e.target.value)}})}/>
                          </div>
                       </div>
                       <div className="grid grid-cols-3 gap-2">
                          <div>
                             <label className="block text-xs font-semibold text-slate-500 mb-1">TWIN Room</label>
                             <input type="number" className="w-full border border-slate-300 rounded px-2 py-2 text-sm bg-slate-50" value={formData.rooms.twin} onChange={e=>setFormData({...formData, rooms: {...formData.rooms, twin: parseInt(e.target.value)}})}/>
                          </div>
                          <div>
                             <label className="block text-xs font-semibold text-slate-500 mb-1">TPL Room</label>
                             <input type="number" className="w-full border border-slate-300 rounded px-2 py-2 text-sm bg-slate-50" value={formData.rooms.tpl} onChange={e=>setFormData({...formData, rooms: {...formData.rooms, tpl: parseInt(e.target.value)}})}/>
                          </div>
                          <div>
                             <label className="block text-xs font-semibold text-slate-500 mb-1">ExtraBed</label>
                             <input type="number" className="w-full border border-slate-300 rounded px-2 py-2 text-sm bg-slate-50" value={formData.rooms.exbed} onChange={e=>setFormData({...formData, rooms: {...formData.rooms, exbed: parseInt(e.target.value)}})}/>
                          </div>
                       </div>
                       <div className="mt-3 flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-800">Total Rooms:</span>
                          <span className="font-bold text-slate-900">{(formData.rooms.sgl||0) + (formData.rooms.dbl||0) + (formData.rooms.twin||0) + (formData.rooms.tpl||0)}</span>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Bottom Section: Description */}
        <div className="mt-6 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
           <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 flex items-center gap-2">
              <AlignLeft size={16} className="text-slate-500"/>
              <span className="text-xs font-bold text-slate-600 uppercase">Description / Remarks</span>
           </div>
           <div className="p-4">
              {/* Rich text toolbar simulation */}
              <div className="flex gap-3 mb-2 border-b border-slate-100 pb-2 text-slate-500">
                 <button className="text-xs hover:text-blue-600 font-bold">B</button>
                 <button className="text-xs hover:text-blue-600 italic">I</button>
                 <button className="text-xs hover:text-blue-600 underline">U</button>
                 <div className="w-px bg-slate-200 h-4"></div>
                 <button className="text-xs hover:text-blue-600">List</button>
                 <button className="text-xs hover:text-blue-600">Link</button>
              </div>
              <textarea className="w-full h-32 border-none text-sm outline-none resize-none text-slate-600" placeholder="Enter detailed query requirements..."></textarea>
           </div>
        </div>
        
        {/* Footer Buttons */}
        <div className="mt-6 flex justify-end gap-3 pb-6">
           <button onClick={() => setView('list')} className="px-6 py-2 bg-white border border-slate-300 rounded-full text-slate-700 hover:bg-slate-50 text-sm font-medium shadow-sm">Cancel</button>
           <button onClick={handleSave} className="px-8 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full text-sm font-medium shadow-lg shadow-purple-200">Save</button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-slate-50 min-h-full">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Query Dashboard</h2>
        <div className="flex gap-2">
            <button className="bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
                View Rates
            </button>
            <button onClick={() => setView('add')} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 shadow-sm transition-colors">
                <Plus size={16} /> Add Query
            </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className={`${stat.color} rounded-lg p-4 shadow-sm text-center transform hover:-translate-y-1 transition-transform duration-200 cursor-pointer`}>
            <h3 className={`text-2xl font-bold ${stat.text}`}>{stat.value}</h3>
            <p className={`text-xs font-medium uppercase tracking-wide opacity-90 ${stat.text}`}>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full md:w-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search by Query ID, Tour ID, Name..." 
                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="flex gap-2 w-full md:w-auto overflow-x-auto">
                <div className="relative">
                     <select className="appearance-none pl-3 pr-8 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-600 min-w-[140px]">
                         <option>Date Range</option>
                         <option>This Month</option>
                         <option>Last Month</option>
                     </select>
                     <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
                </div>
                <div className="relative">
                     <select className="appearance-none pl-3 pr-8 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-600 min-w-[120px]">
                         <option>Priority</option>
                         <option>High</option>
                         <option>Low</option>
                     </select>
                     <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
                </div>
                 <div className="relative">
                     <select className="appearance-none pl-3 pr-8 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-600 min-w-[120px]">
                         <option>Status</option>
                         <option>Confirmed</option>
                         <option>Lost</option>
                     </select>
                     <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
                </div>
                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors">
                    Search
                </button>
            </div>
        </div>
      </div>

      {/* Main Data Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">ID & Date</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Tour Info</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Client</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Tour Details</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Assigned</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {queries.map((q) => (
                <tr key={q.id} className="hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => handleQueryClick(q)}>
                  <td className="px-6 py-4">
                    <div className="font-mono text-xs font-semibold text-blue-600 group-hover:underline">{q.id}</div>
                    <div className="text-xs text-slate-400 mt-1">{q.createdAt}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs font-medium text-slate-700">{q.tourId}</div>
                    <span className="inline-block mt-1 px-1.5 py-0.5 bg-slate-100 text-slate-600 text-[10px] rounded border border-slate-200 uppercase">{q.queryType}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-slate-900">{q.clientName}</div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                        <span className="bg-slate-100 px-1 rounded">{q.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-800">{q.destination}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{q.pax} Pax • {q.tourDate}</div>
                  </td>
                  <td className="px-6 py-4">
                    {q.priority === 'High' || q.priority === 'Urgent' ? (
                        <span className="flex items-center text-xs font-medium text-red-600">
                             <span className="w-1.5 h-1.5 rounded-full bg-red-600 mr-1.5 animate-pulse"></span>
                             {q.priority}
                        </span>
                    ) : (
                        <span className="flex items-center text-xs font-medium text-slate-500">
                             <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mr-1.5"></span>
                             {q.priority}
                        </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {q.assignedTo !== '-' ? (
                         <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold">
                                {q.assignedTo.charAt(0)}
                            </div>
                            <span className="text-xs text-slate-600">{q.assignedTo}</span>
                         </div>
                    ) : (
                        <span className="text-xs text-slate-400 italic">Unassigned</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusBadge(q.status)}`}>
                        {q.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-slate-400 hover:text-blue-600 transition-colors">
                        <ArrowRight size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-center">
            <button className="text-sm text-blue-600 font-medium hover:underline">View All Queries</button>
        </div>
      </div>
    </div>
  );
};

export default QueryDashboard;