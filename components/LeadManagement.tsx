import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Calendar, User, MapPin, Hotel, Users, DollarSign, ChevronDown, Check, X, TrendingUp } from 'lucide-react';
import { CRMLead, SalesStage } from '../types';

// Mock Stages with Probabilities
const stages: SalesStage[] = [
  { id: '1', name: 'Unassigned', probability: 0, color: 'bg-orange-100 text-orange-800 border-orange-200' },
  { id: '2', name: 'Contacted', probability: 20, color: 'bg-blue-100 text-blue-800 border-blue-200' },
  { id: '3', name: 'Processing', probability: 50, color: 'bg-purple-100 text-purple-800 border-purple-200' },
  { id: '4', name: 'Convert', probability: 90, color: 'bg-green-100 text-green-800 border-green-200' },
  { id: '5', name: 'Won', probability: 100, color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
  { id: '6', name: 'Lost', probability: 0, color: 'bg-red-100 text-red-800 border-red-200' },
];

const initialLeads: CRMLead[] = [
  {
    id: '1',
    leadSource: 'LinkedIn',
    clientCountry: 'USA',
    businessType: 'B2C',
    contactPerson: 'Michael Scott',
    email: 'm.scott@example.com',
    mobile: '+1 555 0199',
    fromDate: '2025-06-15',
    toDate: '2025-06-25',
    totalNights: 10,
    paxAdult: 2,
    paxChild: 0,
    destination: 'Japan',
    rooms: { sgl: 0, dbl: 1, twin: 0, tpl: 0, extraBed: 0, cwBed: 0, cnBed: 0 },
    salesPerson: 'Jim Halpert',
    opsPerson: 'Pam Beesly',
    budget: 5000,
    hotelCategory: '4 Star',
    stageId: '2',
    potentialValue: 1000, // 20% of 5000
    updatedAt: '2025-05-14'
  },
];

const LeadManagement: React.FC = () => {
  const [leads, setLeads] = useState<CRMLead[]>(initialLeads);
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState<'contact' | 'travel' | 'assignment'>('contact');
  
  // Form State
  const [newLead, setNewLead] = useState<Partial<CRMLead>>({
    rooms: { sgl: 0, dbl: 0, twin: 0, tpl: 0, extraBed: 0, cwBed: 0, cnBed: 0 },
    stageId: '1',
    businessType: 'B2C',
    hotelCategory: '3 Star',
    budget: 0
  });

  // Calculate Potential Value when Stage or Budget changes
  useEffect(() => {
    if (newLead.stageId && newLead.budget) {
      const stage = stages.find(s => s.id === newLead.stageId);
      if (stage) {
        const calculatedPotential = Math.round(newLead.budget * (stage.probability / 100));
        // We only update if it's different to avoid loops, though strict mode might double fire
        if (newLead.potentialValue !== calculatedPotential) {
            setNewLead(prev => ({ ...prev, potentialValue: calculatedPotential }));
        }
      }
    }
  }, [newLead.stageId, newLead.budget]);

  const handleRoomChange = (field: keyof CRMLead['rooms'], value: number) => {
    setNewLead(prev => ({
      ...prev,
      rooms: {
        ...prev.rooms!,
        [field]: value
      }
    }));
  };

  const handleSave = () => {
    if (!newLead.contactPerson) return;
    
    const lead: CRMLead = {
       ...newLead as CRMLead,
       id: Math.random().toString(),
       updatedAt: new Date().toISOString().split('T')[0],
       // Ensure potential value is set
       potentialValue: newLead.potentialValue || 0
    };
    
    setLeads([lead, ...leads]);
    setShowForm(false);
    setNewLead({
      rooms: { sgl: 0, dbl: 0, twin: 0, tpl: 0, extraBed: 0, cwBed: 0, cnBed: 0 },
      stageId: '1',
      businessType: 'B2C',
      hotelCategory: '3 Star',
      budget: 0,
      potentialValue: 0
    });
    setActiveTab('contact');
  };

  return (
    <div className="p-8 h-full flex flex-col bg-slate-50">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Lead Management</h2>
          <p className="text-slate-500 mt-1">Track, qualify, and convert your potential clients.</p>
        </div>
        <button 
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
        >
          <Plus size={20} />
          <span>Add New Lead</span>
        </button>
      </div>

      {showForm ? (
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 max-w-5xl mx-auto w-full overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
          <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
            <h3 className="text-lg font-bold text-slate-800">Create New Lead</h3>
            <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-red-500"><X size={24}/></button>
          </div>
          
          {/* Tabs */}
          <div className="flex border-b border-slate-200">
             <button onClick={() => setActiveTab('contact')} className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'contact' ? 'border-blue-600 text-blue-600 bg-blue-50/50' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Contact Information</button>
             <button onClick={() => setActiveTab('travel')} className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'travel' ? 'border-blue-600 text-blue-600 bg-blue-50/50' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Travel Info & Rooms</button>
             <button onClick={() => setActiveTab('assignment')} className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'assignment' ? 'border-blue-600 text-blue-600 bg-blue-50/50' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Assignment & Status</button>
          </div>

          <div className="p-8 overflow-y-auto max-h-[70vh]">
            {activeTab === 'contact' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Contact Person</label>
                    <input type="text" value={newLead.contactPerson || ''} onChange={e => setNewLead({...newLead, contactPerson: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" placeholder="Full Name" />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Business Type</label>
                    <select value={newLead.businessType} onChange={e => setNewLead({...newLead, businessType: e.target.value as any})} className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                      <option value="B2C">B2C</option>
                      <option value="Agent">Agent/B2B</option>
                    </select>
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                    <input type="email" value={newLead.email || ''} onChange={e => setNewLead({...newLead, email: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" placeholder="email@example.com" />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Mobile</label>
                    <input type="text" value={newLead.mobile || ''} onChange={e => setNewLead({...newLead, mobile: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" placeholder="+1 234 567 8900" />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Client Country</label>
                    <input type="text" value={newLead.clientCountry || ''} onChange={e => setNewLead({...newLead, clientCountry: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. USA" />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Lead Source</label>
                    <input type="text" placeholder="e.g. LinkedIn, Website" value={newLead.leadSource || ''} onChange={e => setNewLead({...newLead, leadSource: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" />
                 </div>
              </div>
            )}

            {activeTab === 'travel' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Destination</label>
                      <input type="text" value={newLead.destination || ''} onChange={e => setNewLead({...newLead, destination: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                       <label className="block text-sm font-medium text-slate-700 mb-1">From Date</label>
                       <input type="date" value={newLead.fromDate || ''} onChange={e => setNewLead({...newLead, fromDate: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                       <label className="block text-sm font-medium text-slate-700 mb-1">To Date</label>
                       <input type="date" value={newLead.toDate || ''} onChange={e => setNewLead({...newLead, toDate: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                       <label className="block text-sm font-medium text-slate-700 mb-1">Adult Pax</label>
                       <input type="number" min="1" value={newLead.paxAdult || ''} onChange={e => setNewLead({...newLead, paxAdult: parseInt(e.target.value)})} className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                       <label className="block text-sm font-medium text-slate-700 mb-1">Child Pax</label>
                       <input type="number" min="0" value={newLead.paxChild || 0} onChange={e => setNewLead({...newLead, paxChild: parseInt(e.target.value)})} className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                       <label className="block text-sm font-medium text-slate-700 mb-1">Total Nights</label>
                       <input type="number" readOnly value={newLead.totalNights || 0} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 outline-none text-slate-500 cursor-not-allowed" />
                    </div>
                 </div>

                 {/* Room Configuration Section */}
                 <div>
                   <h4 className="flex items-center gap-2 text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100">
                      <Hotel size={18} className="text-blue-500"/> Room Configuration
                   </h4>
                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
                      {['sgl', 'dbl', 'twin', 'tpl', 'extraBed', 'cwBed', 'cnBed'].map((roomType) => (
                        <div key={roomType}>
                           <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">{roomType.replace(/([A-Z])/g, ' $1').trim()}</label>
                           <input 
                             type="number" 
                             min="0"
                             value={newLead.rooms ? newLead.rooms[roomType as keyof typeof newLead.rooms] : 0}
                             onChange={e => handleRoomChange(roomType as any, parseInt(e.target.value))}
                             className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none" 
                           />
                        </div>
                      ))}
                   </div>
                 </div>
              </div>
            )}

            {activeTab === 'assignment' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Sales Person</label>
                    <select value={newLead.salesPerson} onChange={e => setNewLead({...newLead, salesPerson: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                      <option value="">Select User</option>
                      <option value="Jim Halpert">Jim Halpert</option>
                    </select>
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Operation Person</label>
                    <select value={newLead.opsPerson} onChange={e => setNewLead({...newLead, opsPerson: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                      <option value="">Select User</option>
                      <option value="Pam Beesly">Pam Beesly</option>
                    </select>
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Estimated Budget ($)</label>
                    <div className="relative">
                       <DollarSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                       <input 
                         type="number" 
                         value={newLead.budget || ''} 
                         onChange={e => setNewLead({...newLead, budget: parseInt(e.target.value)})} 
                         className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" 
                       />
                    </div>
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Hotel Category</label>
                    <select value={newLead.hotelCategory} onChange={e => setNewLead({...newLead, hotelCategory: e.target.value as any})} className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                      <option value="3 Star">3 Star</option>
                      <option value="4 Star">4 Star</option>
                      <option value="5 Star">5 Star</option>
                    </select>
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Sales Stage</label>
                    <div className="flex items-center gap-3">
                      <select value={newLead.stageId} onChange={e => setNewLead({...newLead, stageId: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                        {stages.map(s => (
                          <option key={s.id} value={s.id}>{s.name} ({s.probability}%)</option>
                        ))}
                      </select>
                    </div>
                 </div>
                 
                 {/* Potential Value Display */}
                 <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex items-center justify-between">
                    <div>
                       <span className="text-xs font-bold text-blue-600 uppercase">Projected Value</span>
                       <div className="text-2xl font-bold text-blue-900 flex items-center gap-1">
                          <DollarSign size={20}/>
                          {newLead.potentialValue || 0}
                       </div>
                    </div>
                    <div className="text-right">
                       <span className="text-xs text-blue-500 block">Based on Stage Probability</span>
                       <span className="text-sm font-semibold text-blue-700">
                          {stages.find(s => s.id === newLead.stageId)?.probability}% Win Chance
                       </span>
                    </div>
                 </div>
              </div>
            )}
          </div>

          <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
             <button onClick={() => setShowForm(false)} className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-white transition-colors">Cancel</button>
             <button onClick={handleSave} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm">Save Lead</button>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto">
          {/* Filters Bar */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
             <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input type="text" placeholder="Search leads by name, destination..." className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
             </div>
             <div className="flex gap-2 w-full md:w-auto overflow-x-auto">
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 whitespace-nowrap">
                   <Filter size={16} /> Status
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 whitespace-nowrap">
                   <Calendar size={16} /> Date Range
                </button>
             </div>
          </div>

          {/* Lead Cards List */}
          <div className="space-y-4">
            {leads.map(lead => {
               const stage = stages.find(s => s.id === lead.stageId) || stages[0];
               return (
                 <div key={lead.id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow">
                    {/* Header Strip with prominent stage color */}
                    <div className={`h-10 w-full px-5 flex items-center justify-between ${stage.color.split(' ')[0].replace('bg-', 'bg-').replace('100', '50')}`}>
                        <div className="flex items-center gap-2">
                           <span className={`w-2 h-2 rounded-full ${stage.color.split(' ')[1].replace('text-', 'bg-').replace('800', '500')}`}></span>
                           <span className={`text-xs font-bold uppercase tracking-wide ${stage.color.split(' ')[1]}`}>
                              {stage.name} Stage
                           </span>
                        </div>
                        <div className="text-xs font-medium text-slate-500">
                           Last Updated: {lead.updatedAt}
                        </div>
                    </div>

                    <div className="p-5">
                       <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-4">
                             <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-lg border border-slate-200">
                                {lead.contactPerson.charAt(0)}
                             </div>
                             <div>
                                <h3 className="text-lg font-bold text-slate-800">{lead.contactPerson}</h3>
                                <div className="flex items-center gap-2 text-sm text-slate-500">
                                   <span className="px-1.5 py-0.5 bg-slate-100 rounded text-xs font-medium">{lead.businessType}</span>
                                   <span>•</span>
                                   <span>{lead.leadSource}</span>
                                   <span>•</span>
                                   <span className="flex items-center gap-1"><MapPin size={12}/> {lead.clientCountry}</span>
                                </div>
                             </div>
                          </div>
                          
                          <div className="text-right">
                             <div className="text-sm text-slate-400 uppercase font-semibold">Potential</div>
                             <div className="text-xl font-bold text-slate-800 flex items-center justify-end">
                                ${lead.potentialValue.toLocaleString()}
                             </div>
                             <div className="text-xs text-green-600 flex items-center justify-end gap-1">
                                <TrendingUp size={10} /> {stage.probability}% Probability
                             </div>
                          </div>
                       </div>

                       <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-4 p-4 bg-slate-50 rounded-lg">
                          <div>
                             <p className="text-xs text-slate-400 uppercase font-semibold">Destination</p>
                             <p className="text-sm font-medium text-slate-700 flex items-center gap-1 mt-1">
                                <MapPin size={14} className="text-slate-400"/> {lead.destination}
                             </p>
                          </div>
                          <div>
                             <p className="text-xs text-slate-400 uppercase font-semibold">Travel Date</p>
                             <p className="text-sm font-medium text-slate-700 flex items-center gap-1 mt-1">
                                <Calendar size={14} className="text-slate-400"/> {lead.fromDate}
                             </p>
                          </div>
                          <div>
                             <p className="text-xs text-slate-400 uppercase font-semibold">Travellers</p>
                             <p className="text-sm font-medium text-slate-700 flex items-center gap-1 mt-1">
                                <Users size={14} className="text-slate-400"/> {lead.paxAdult} Adt, {lead.paxChild} Chd
                             </p>
                          </div>
                          <div>
                             <p className="text-xs text-slate-400 uppercase font-semibold">Total Budget</p>
                             <p className="text-sm font-medium text-slate-700 flex items-center gap-1 mt-1">
                                <DollarSign size={14} className="text-slate-400"/> ${lead.budget.toLocaleString()}
                             </p>
                          </div>
                       </div>

                       <div className="flex justify-between items-center pt-2">
                          <div className="flex items-center gap-2 text-xs text-slate-400">
                             <User size={12} /> Sales: <span className="text-slate-600 font-medium">{lead.salesPerson}</span>
                             <span className="mx-1">|</span>
                             <User size={12} /> Ops: <span className="text-slate-600 font-medium">{lead.opsPerson}</span>
                          </div>
                          <button className="text-sm text-blue-600 font-medium hover:underline flex items-center gap-1">
                             View Details <ChevronDown size={14} />
                          </button>
                       </div>
                    </div>
                 </div>
               );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadManagement;