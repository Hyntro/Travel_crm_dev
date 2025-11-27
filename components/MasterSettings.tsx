
import React, { useState } from 'react';
import { Settings, Map, Bed, Car, CreditCard, ChevronRight, Globe, Shield, FileText, Flag, Plane, User, Plus, Search, Filter, ArrowLeft, X, Edit2, Trash2, MoreHorizontal, Check, Download, Upload, Eye, Image as ImageIcon, FileJson, History } from 'lucide-react';

// Configuration Data Interface
interface MasterItem {
  label: string;
  path: string;
}

interface MasterCategory {
  id: string;
  title: string;
  icon: React.ElementType;
  color: string;
  description: string;
  items: MasterItem[];
}

// Data Models for Masters
interface Country {
  id: string;
  name: string;
  shortName: string;
  code: string;
  createdBy: string;
  modifiedBy: string;
  status: 'Active' | 'Inactive';
}

interface State {
  id: string;
  name: string;
  countryId: string;
  countryName: string;
  createdBy: string;
  modifiedBy: string;
  status: 'Active' | 'Inactive';
}

interface City {
  id: string;
  name: string;
  stateId: string;
  stateName: string;
  countryId: string;
  countryName: string;
  createdBy: string;
  modifiedBy: string;
  status: 'Active' | 'Inactive';
}

interface LeadSource {
  id: string;
  name: string;
  createdBy: string;
  modifiedBy: string;
  status: 'Active' | 'Inactive';
}

interface BusinessType {
  id: string;
  name: string;
  isDefault: 'Yes' | 'No';
  createdBy: string;
  modifiedBy: string;
  status: 'Active' | 'Inactive';
}

interface Destination {
  id: string;
  serviceCode: string;
  countryId: string;
  countryName: string;
  name: string;
  airportCode: string;
  latitude: string;
  longitude: string;
  description: string;
  weatherInfo: string;
  additionalInfo: string;
  createdBy: string;
  modifiedBy: string;
  status: 'Active' | 'Inactive';
}

// Mock Data
const initialCountries: Country[] = [
  { id: '1', name: 'India', shortName: 'IND', code: '+91', createdBy: 'Admin', modifiedBy: 'Admin', status: 'Active' },
  { id: '2', name: 'United States', shortName: 'USA', code: '+1', createdBy: 'System', modifiedBy: 'System', status: 'Active' },
  { id: '3', name: 'United Kingdom', shortName: 'UK', code: '+44', createdBy: 'Sarah Smith', modifiedBy: 'Sarah Smith', status: 'Inactive' },
];

const initialStates: State[] = [
  { id: 's1', name: 'Maharashtra', countryId: '1', countryName: 'India', createdBy: 'Admin', modifiedBy: 'Admin', status: 'Active' },
  { id: 's2', name: 'California', countryId: '2', countryName: 'United States', createdBy: 'System', modifiedBy: 'System', status: 'Active' },
  { id: 's3', name: 'Delhi', countryId: '1', countryName: 'India', createdBy: 'Admin', modifiedBy: 'Admin', status: 'Active' },
];

const initialCities: City[] = [
  { id: 'c1', name: 'Mumbai', stateId: 's1', stateName: 'Maharashtra', countryId: '1', countryName: 'India', createdBy: 'Admin', modifiedBy: 'Admin', status: 'Active' },
  { id: 'c2', name: 'Pune', stateId: 's1', stateName: 'Maharashtra', countryId: '1', countryName: 'India', createdBy: 'Admin', modifiedBy: 'Admin', status: 'Active' },
  { id: 'c3', name: 'Los Angeles', stateId: 's2', stateName: 'California', countryId: '2', countryName: 'United States', createdBy: 'System', modifiedBy: 'System', status: 'Active' },
];

const initialLeadSources: LeadSource[] = [
  { id: 'ls1', name: 'Website', createdBy: 'Admin', modifiedBy: 'Admin', status: 'Active' },
  { id: 'ls2', name: 'Referral', createdBy: 'System', modifiedBy: 'System', status: 'Active' },
  { id: 'ls3', name: 'Social Media', createdBy: 'Admin', modifiedBy: 'Admin', status: 'Inactive' },
  { id: 'ls4', name: 'Walk-In', createdBy: 'Staff', modifiedBy: 'Staff', status: 'Active' },
];

const initialBusinessTypes: BusinessType[] = [
  { id: 'bt1', name: 'B2B', isDefault: 'Yes', createdBy: 'Admin', modifiedBy: 'Admin', status: 'Active' },
  { id: 'bt2', name: 'B2C', isDefault: 'No', createdBy: 'Admin', modifiedBy: 'Admin', status: 'Active' },
  { id: 'bt3', name: 'Corporate', isDefault: 'No', createdBy: 'System', modifiedBy: 'System', status: 'Active' },
];

const initialDestinations: Destination[] = [
  { id: 'd1', serviceCode: 'DEST001', countryId: '1', countryName: 'India', name: 'Jaipur', airportCode: 'JAI', latitude: '26.9124', longitude: '75.7873', description: 'The Pink City of India.', weatherInfo: 'Hot summers, pleasant winters.', additionalInfo: 'Famous for palaces.', createdBy: 'Admin', modifiedBy: 'Admin', status: 'Active' },
  { id: 'd2', serviceCode: 'DEST002', countryId: '2', countryName: 'United States', name: 'New York', airportCode: 'JFK', latitude: '40.7128', longitude: '-74.0060', description: 'The city that never sleeps.', weatherInfo: 'Four distinct seasons.', additionalInfo: 'Statue of Liberty.', createdBy: 'System', modifiedBy: 'System', status: 'Active' },
];

// Dynamic Configuration Data
const MASTER_CONFIG: MasterCategory[] = [
  {
    id: 'general',
    title: 'General',
    icon: Globe,
    color: 'bg-blue-600',
    description: 'Locations and global settings',
    items: [
      { label: 'Country Master', path: '/master/country' },
      { label: 'State Master', path: '/master/state' },
      { label: 'City Master', path: '/master/city' },
      { label: 'Lead Source Master', path: '/master/lead-source' },
      { label: 'Destination Master', path: '/master/destination' },
      { label: 'Business Type Master', path: '/master/business-type' },
      { label: 'Language Master', path: '/master/language' },
      { label: 'MarketType Master', path: '/master/market-type' },
      { label: 'Commission Master', path: '/master/commission' },
      { label: 'Division Master', path: '/master/division' },
      { label: 'Season Master', path: '/master/season' },
      { label: 'Tour Type', path: '/master/tour-type' },
    ]
  },
  {
    id: 'hotel',
    title: 'Hotel',
    icon: Bed,
    color: 'bg-teal-500',
    description: 'Property configurations',
    items: [
      { label: 'Room Type Master', path: '/master/room-type' },
      { label: 'Amenities Master', path: '/master/amenities' },
      { label: 'Hotel Category Master', path: '/master/hotel-category' },
      { label: 'Hotel Type Master', path: '/master/hotel-type' },
      { label: 'Hotel Meal Plan', path: '/master/hotel-meal-plan' },
      { label: 'Weekend Master', path: '/master/weekend' },
      { label: 'Hotel Master', path: '/master/hotel' },
      { label: 'Hotel Chain Master', path: '/master/hotel-chain' },
      { label: 'Operation Restriction', path: '/master/operation-restriction' },
      { label: 'Restaurant Master', path: '/master/restaurant' },
      { label: 'Restaurant Meal Plan', path: '/master/restaurant-meal-plan' },
    ]
  },
  {
    id: 'activity',
    title: 'Monument / Activity',
    icon: Flag,
    color: 'bg-indigo-500',
    description: 'Sightseeing and activities',
    items: [
      { label: 'Monument Master', path: '/master/monument' },
      { label: 'Monument & Activity Package', path: '/master/monument-package' },
      { label: 'Activity Master', path: '/master/activity' },
      { label: 'Enroute Master', path: '/master/enroute' },
    ]
  },
  {
    id: 'transport',
    title: 'Transport',
    icon: Car,
    color: 'bg-orange-500',
    description: 'Fleet and driver management',
    items: [
      { label: 'Transfer Master', path: '/master/transfer' },
      { label: 'Transfer Type', path: '/master/transfer-type' },
      { label: 'Transportation Master', path: '/master/transportation' },
      { label: 'City Distance Master', path: '/master/city-distance' },
      { label: 'Vehicle Type Master', path: '/master/vehicle-type' },
      { label: 'Driver Master', path: '/master/driver' },
      { label: 'Fleet Master', path: '/master/fleet' },
    ]
  },
  {
    id: 'flight',
    title: 'Flight / Train',
    icon: Plane,
    color: 'bg-sky-500',
    description: 'Aviation and Rail',
    items: [
      { label: 'Airline Master', path: '/master/airline' },
      { label: 'Flight Seat Master', path: '/master/flight-seat' },
      { label: 'Flight Cost Master', path: '/master/flight-cost' },
      { label: 'Train Master', path: '/master/train' },
    ]
  },
  {
    id: 'guide',
    title: 'Guide / Tour Mgr',
    icon: User,
    color: 'bg-rose-500',
    description: 'Guide and Manager details',
    items: [
      { label: 'Guide Master', path: '/master/guide' },
      { label: 'Guide Price Master', path: '/master/guide-price' },
    ]
  },
  {
    id: 'accounts',
    title: 'Accounts',
    icon: CreditCard,
    color: 'bg-purple-600',
    description: 'Finance and taxation',
    items: [
      { label: 'Currency', path: '/master/currency' },
      { label: 'Bank Master', path: '/master/bank' },
      { label: 'Tax Rules', path: '/master/tax' },
    ]
  }
];

const MasterSettings: React.FC = () => {
  const [activeModule, setActiveModule] = useState<string | null>(null);
  
  // Country Master State
  const [countries, setCountries] = useState<Country[]>(initialCountries);
  const [showAddCountryModal, setShowAddCountryModal] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const [countryStatusFilter, setCountryStatusFilter] = useState('All');
  const [newCountry, setNewCountry] = useState<Partial<Country>>({ status: 'Active' });

  // State Master State
  const [states, setStates] = useState<State[]>(initialStates);
  const [showAddStateModal, setShowAddStateModal] = useState(false);
  const [stateSearch, setStateSearch] = useState('');
  const [stateStatusFilter, setStateStatusFilter] = useState('All');
  const [newState, setNewState] = useState<Partial<State>>({ status: 'Active', countryId: '' });

  // City Master State
  const [cities, setCities] = useState<City[]>(initialCities);
  const [showAddCityModal, setShowAddCityModal] = useState(false);
  const [citySearch, setCitySearch] = useState('');
  const [cityStatusFilter, setCityStatusFilter] = useState('All');
  const [newCity, setNewCity] = useState<Partial<City>>({ status: 'Active', countryId: '', stateId: '' });

  // Lead Source Master State
  const [leadSources, setLeadSources] = useState<LeadSource[]>(initialLeadSources);
  const [showAddLeadSourceModal, setShowAddLeadSourceModal] = useState(false);
  const [leadSourceSearch, setLeadSourceSearch] = useState('');
  const [leadSourceStatusFilter, setLeadSourceStatusFilter] = useState('All');
  const [newLeadSource, setNewLeadSource] = useState<Partial<LeadSource>>({ status: 'Active' });

  // Business Type Master State
  const [businessTypes, setBusinessTypes] = useState<BusinessType[]>(initialBusinessTypes);
  const [showAddBusinessTypeModal, setShowAddBusinessTypeModal] = useState(false);
  const [businessTypeSearch, setBusinessTypeSearch] = useState('');
  const [businessTypeStatusFilter, setBusinessTypeStatusFilter] = useState('All');
  const [newBusinessType, setNewBusinessType] = useState<Partial<BusinessType>>({ status: 'Active', isDefault: 'No' });

  // Destination Master State
  const [destinations, setDestinations] = useState<Destination[]>(initialDestinations);
  const [showAddDestinationModal, setShowAddDestinationModal] = useState(false);
  const [destinationSearch, setDestinationSearch] = useState('');
  const [destinationStatusFilter, setDestinationStatusFilter] = useState('All');
  const [newDestination, setNewDestination] = useState<Partial<Destination>>({ status: 'Active', countryId: '' });

  // Navigation Logic
  const handleModuleClick = (path: string) => {
    setActiveModule(path);
  };

  const handleBack = () => {
    setActiveModule(null);
  };

  // --- Handlers (Generic Patterns) ---
  const handleDownloadSample = () => alert("Downloading sample CSV...");
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setTimeout(() => alert("File processed successfully!"), 800);
  };
  const handleViewLogs = () => alert("Viewing audit logs...");

  // --- Country Master Handlers ---
  const handleEditCountry = (country: Country) => { setNewCountry({ ...country }); setShowAddCountryModal(true); };
  const handleDeleteCountry = (id: string, e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (window.confirm('Delete country?')) setCountries(prev => prev.filter(c => c.id !== id));
  };
  const handleSaveCountry = () => {
    if (!newCountry.name || !newCountry.code) return;
    if (newCountry.id) {
      setCountries(prev => prev.map(c => c.id === newCountry.id ? { ...c, ...newCountry } as Country : c));
    } else {
      setCountries(prev => [...prev, { id: Math.random().toString(), name: newCountry.name!, shortName: newCountry.shortName || '', code: newCountry.code!, status: newCountry.status || 'Active', createdBy: 'Demo', modifiedBy: 'Demo' }]);
    }
    setShowAddCountryModal(false); setNewCountry({ status: 'Active' });
  };

  // --- State Master Handlers ---
  const handleEditState = (state: State) => { setNewState({ ...state }); setShowAddStateModal(true); };
  const handleDeleteState = (id: string, e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (window.confirm('Delete state?')) setStates(prev => prev.filter(s => s.id !== id));
  };
  const handleSaveState = () => {
    if (!newState.name || !newState.countryId) return;
    const countryName = countries.find(c => c.id === newState.countryId)?.name || '';
    if (newState.id) {
      setStates(prev => prev.map(s => s.id === newState.id ? { ...s, ...newState, countryName } as State : s));
    } else {
      setStates(prev => [...prev, { id: Math.random().toString(), name: newState.name!, countryId: newState.countryId!, countryName, status: newState.status || 'Active', createdBy: 'Demo', modifiedBy: 'Demo' }]);
    }
    setShowAddStateModal(false); setNewState({ status: 'Active', countryId: '' });
  };

  // --- City Master Handlers ---
  const handleEditCity = (city: City) => { setNewCity({ ...city }); setShowAddCityModal(true); };
  const handleDeleteCity = (id: string, e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (window.confirm('Delete city?')) setCities(prev => prev.filter(c => c.id !== id));
  };
  const handleSaveCity = () => {
    if (!newCity.name || !newCity.stateId) return;
    const country = countries.find(c => c.id === newCity.countryId);
    const state = states.find(s => s.id === newCity.stateId);
    if (newCity.id) {
      setCities(prev => prev.map(c => c.id === newCity.id ? { ...c, ...newCity, countryName: country?.name || '', stateName: state?.name || '' } as City : c));
    } else {
      setCities(prev => [...prev, { id: Math.random().toString(), name: newCity.name!, countryId: newCity.countryId!, countryName: country?.name || '', stateId: newCity.stateId!, stateName: state?.name || '', status: newCity.status || 'Active', createdBy: 'Demo', modifiedBy: 'Demo' }]);
    }
    setShowAddCityModal(false); setNewCity({ status: 'Active', countryId: '', stateId: '' });
  };

  // --- Lead Source Handlers ---
  const handleEditLeadSource = (ls: LeadSource) => { setNewLeadSource({ ...ls }); setShowAddLeadSourceModal(true); };
  const handleDeleteLeadSource = (id: string, e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (window.confirm('Delete lead source?')) setLeadSources(prev => prev.filter(ls => ls.id !== id));
  };
  const handleSaveLeadSource = () => {
    if (!newLeadSource.name) return;
    if (newLeadSource.id) {
      setLeadSources(prev => prev.map(ls => ls.id === newLeadSource.id ? { ...ls, ...newLeadSource } as LeadSource : ls));
    } else {
      setLeadSources(prev => [...prev, { id: Math.random().toString(), name: newLeadSource.name!, status: newLeadSource.status || 'Active', createdBy: 'Demo', modifiedBy: 'Demo' }]);
    }
    setShowAddLeadSourceModal(false); setNewLeadSource({ status: 'Active' });
  };

  // --- Business Type Handlers ---
  const handleEditBusinessType = (bt: BusinessType) => { setNewBusinessType({ ...bt }); setShowAddBusinessTypeModal(true); };
  const handleDeleteBusinessType = (id: string, e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (window.confirm('Delete business type?')) setBusinessTypes(prev => prev.filter(bt => bt.id !== id));
  };
  const handleSaveBusinessType = () => {
    if (!newBusinessType.name) return;
    if (newBusinessType.id) {
      setBusinessTypes(prev => prev.map(bt => bt.id === newBusinessType.id ? { ...bt, ...newBusinessType } as BusinessType : bt));
    } else {
      setBusinessTypes(prev => [...prev, { id: Math.random().toString(), name: newBusinessType.name!, isDefault: newBusinessType.isDefault || 'No', status: newBusinessType.status || 'Active', createdBy: 'Demo', modifiedBy: 'Demo' }]);
    }
    setShowAddBusinessTypeModal(false); setNewBusinessType({ status: 'Active', isDefault: 'No' });
  };

  // --- Destination Master Handlers ---
  const handleEditDestination = (dest: Destination) => { setNewDestination({ ...dest }); setShowAddDestinationModal(true); };
  const handleDeleteDestination = (id: string, e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (window.confirm('Delete destination?')) setDestinations(prev => prev.filter(d => d.id !== id));
  };
  const handleSaveDestination = () => {
    if (!newDestination.name || !newDestination.countryId) return;
    const country = countries.find(c => c.id === newDestination.countryId);
    if (newDestination.id) {
      setDestinations(prev => prev.map(d => d.id === newDestination.id ? { ...d, ...newDestination, countryName: country?.name || '' } as Destination : d));
    } else {
      setDestinations(prev => [...prev, { 
        id: Math.random().toString(), 
        serviceCode: `DEST${Math.floor(Math.random()*1000)}`,
        name: newDestination.name!, 
        countryId: newDestination.countryId!, 
        countryName: country?.name || '', 
        airportCode: newDestination.airportCode || '',
        latitude: newDestination.latitude || '',
        longitude: newDestination.longitude || '',
        description: newDestination.description || '',
        weatherInfo: newDestination.weatherInfo || '',
        additionalInfo: newDestination.additionalInfo || '',
        status: newDestination.status || 'Active', 
        createdBy: 'Demo', 
        modifiedBy: 'Demo' 
      }]);
    }
    setShowAddDestinationModal(false); setNewDestination({ status: 'Active', countryId: '' });
  };


  // --- Render Sections ---

  // 5. Business Type Master View
  if (activeModule === '/master/business-type') {
    const filteredBusinessTypes = businessTypes.filter(bt => {
      return (businessTypeStatusFilter === 'All' || bt.status === businessTypeStatusFilter) && bt.name.toLowerCase().includes(businessTypeSearch.toLowerCase());
    });

    return (
      <div className="h-full flex flex-col animate-in fade-in slide-in-from-right-4 duration-300">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="flex items-center gap-4">
            <button onClick={handleBack} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500"><ArrowLeft size={20} /></button>
            <div><h2 className="text-2xl font-bold text-slate-800">Business Type Master</h2><p className="text-sm text-slate-500">Classify client and agent types</p></div>
          </div>
          <div className="flex items-center gap-3">
             <button onClick={handleDownloadSample} className="bg-white border border-slate-300 text-slate-600 px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-50 text-sm font-medium shadow-sm"><Download size={16}/> Sample</button>
             <label className="bg-white border border-slate-300 text-slate-600 px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-50 text-sm font-medium shadow-sm cursor-pointer"><Upload size={16}/> Import<input type="file" className="hidden" onChange={handleImport} accept=".csv,.xlsx"/></label>
             <button onClick={() => { setNewBusinessType({ status: 'Active', isDefault: 'No' }); setShowAddBusinessTypeModal(true); }} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm text-sm font-medium"><Plus size={18} /> Add Business Type</button>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
           <div className="relative flex-1 w-full max-w-md">
              <label className="absolute -top-2 left-2 px-1 bg-white text-[10px] font-semibold text-slate-500">Keyword</label>
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input type="text" value={businessTypeSearch} onChange={(e) => setBusinessTypeSearch(e.target.value)} placeholder="Search Business Type" className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
           </div>
           <div className="relative w-full md:w-48">
              <label className="absolute -top-2 left-2 px-1 bg-white text-[10px] font-semibold text-slate-500">Select Status</label>
              <select value={businessTypeStatusFilter} onChange={(e) => setBusinessTypeStatusFilter(e.target.value)} className="w-full pl-3 pr-8 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
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
                       <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Sr</th>
                       <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Business Type Name</th>
                       <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Is Default</th>
                       <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Created By</th>
                       <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Modified By</th>
                       <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Status</th>
                       <th className="px-6 py-3 text-right text-xs font-bold text-slate-500 uppercase">Action</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                    {filteredBusinessTypes.map((bt, index) => (
                       <tr key={bt.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 text-sm text-slate-500">{index + 1}</td>
                          <td className="px-6 py-4 font-medium text-slate-800">{bt.name}</td>
                          <td className="px-6 py-4 text-sm text-slate-600">{bt.isDefault}</td>
                          <td className="px-6 py-4 text-xs text-slate-500">{bt.createdBy}</td>
                          <td className="px-6 py-4 text-xs text-slate-500">{bt.modifiedBy}</td>
                          <td className="px-6 py-4"><span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bt.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{bt.status}</span></td>
                          <td className="px-6 py-4 text-right">
                             <div className="flex items-center justify-end gap-2">
                                <button onClick={() => handleEditBusinessType(bt)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded"><Edit2 size={16}/></button>
                                <button onClick={(e) => handleDeleteBusinessType(bt.id, e)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded"><Trash2 size={16}/></button>
                             </div>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>

        {showAddBusinessTypeModal && (
           <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
              <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
                 <div className="bg-slate-800 px-6 py-4 flex justify-between items-center"><h3 className="text-lg font-bold text-white">{newBusinessType.id ? 'Edit Business Type' : 'Add Business Type'}</h3><button onClick={() => setShowAddBusinessTypeModal(false)} className="text-slate-400 hover:text-white"><X size={20} /></button></div>
                 <div className="p-6 space-y-4">
                    <div><label className="block text-xs font-semibold text-slate-500 mb-1">Business Type Name</label><input type="text" value={newBusinessType.name || ''} onChange={(e) => setNewBusinessType({...newBusinessType, name: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/><div className="h-0.5 w-8 bg-red-500 mt-1"></div></div>
                    <div><label className="block text-xs font-semibold text-slate-500 mb-1">Set Default</label><select value={newBusinessType.isDefault} onChange={(e) => setNewBusinessType({...newBusinessType, isDefault: e.target.value as any})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"><option value="No">No</option><option value="Yes">Yes</option></select></div>
                    <div><label className="block text-xs font-semibold text-slate-500 mb-1">Status</label><select value={newBusinessType.status} onChange={(e) => setNewBusinessType({...newBusinessType, status: e.target.value as any})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"><option value="Active">Active</option><option value="Inactive">Inactive</option></select></div>
                 </div>
                 <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-center gap-3"><button onClick={handleSaveBusinessType} className="px-8 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full text-sm font-medium">Save</button><button onClick={() => setShowAddBusinessTypeModal(false)} className="px-8 py-2 bg-white border border-slate-300 text-slate-600 rounded-full text-sm font-medium hover:bg-slate-50">Cancel</button></div>
              </div>
           </div>
        )}
      </div>
    );
  }

  // 6. Destination Master View
  if (activeModule === '/master/destination') {
    const filteredDestinations = destinations.filter(d => {
      return (destinationStatusFilter === 'All' || d.status === destinationStatusFilter) && d.name.toLowerCase().includes(destinationSearch.toLowerCase());
    });

    return (
      <div className="h-full flex flex-col animate-in fade-in slide-in-from-right-4 duration-300">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="flex items-center gap-4">
            <button onClick={handleBack} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500"><ArrowLeft size={20} /></button>
            <div><h2 className="text-2xl font-bold text-slate-800">Destination Master</h2><p className="text-sm text-slate-500">Manage tour destinations and details</p></div>
          </div>
          <div className="flex items-center gap-3">
             <button onClick={handleViewLogs} className="bg-white border border-slate-300 text-slate-600 px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-50 text-sm font-medium shadow-sm"><History size={16}/> View Logs</button>
             <button onClick={handleDownloadSample} className="bg-white border border-slate-300 text-slate-600 px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-50 text-sm font-medium shadow-sm"><Download size={16}/> Excel</button>
             <button onClick={handleDownloadSample} className="bg-white border border-slate-300 text-slate-600 px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-50 text-sm font-medium shadow-sm"><FileJson size={16}/> Format</button>
             <label className="bg-white border border-slate-300 text-slate-600 px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-50 text-sm font-medium shadow-sm cursor-pointer"><Upload size={16}/> Import<input type="file" className="hidden" onChange={handleImport} accept=".csv,.xlsx"/></label>
             <button onClick={() => { setNewDestination({ status: 'Active', countryId: '' }); setShowAddDestinationModal(true); }} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm text-sm font-medium"><Plus size={18} /> Add Destination</button>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
           <div className="relative flex-1 w-full max-w-md">
              <label className="absolute -top-2 left-2 px-1 bg-white text-[10px] font-semibold text-slate-500">Destination Name</label>
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input type="text" value={destinationSearch} onChange={(e) => setDestinationSearch(e.target.value)} placeholder="Search Destination" className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
           </div>
           <div className="relative w-full md:w-48">
              <label className="absolute -top-2 left-2 px-1 bg-white text-[10px] font-semibold text-slate-500">Select Status</label>
              <select value={destinationStatusFilter} onChange={(e) => setDestinationStatusFilter(e.target.value)} className="w-full pl-3 pr-8 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                 <option value="All">All Status</option>
                 <option value="Active">Active</option>
                 <option value="Inactive">Inactive</option>
              </select>
           </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-100 flex-1 overflow-hidden flex flex-col">
           <div className="overflow-x-auto flex-1">
              <table className="w-full text-left whitespace-nowrap">
                 <thead className="bg-slate-50 border-b border-slate-100">
                    <tr>
                       <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Service Code</th>
                       <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Country</th>
                       <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Destination</th>
                       <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Airport Code</th>
                       <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Coordinates</th>
                       <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Info</th>
                       <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Gallery</th>
                       <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Created By</th>
                       <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Status</th>
                       <th className="px-6 py-3 text-right text-xs font-bold text-slate-500 uppercase">Action</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                    {filteredDestinations.map((dest) => (
                       <tr key={dest.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 text-sm font-mono text-slate-500">{dest.serviceCode}</td>
                          <td className="px-6 py-4 text-sm text-slate-600">{dest.countryName}</td>
                          <td className="px-6 py-4 font-medium text-slate-800">{dest.name}</td>
                          <td className="px-6 py-4 text-sm text-slate-600">{dest.airportCode}</td>
                          <td className="px-6 py-4 text-xs text-slate-500">{dest.latitude}, {dest.longitude}</td>
                          <td className="px-6 py-4"><Eye size={16} className="text-blue-500 cursor-pointer"/></td>
                          <td className="px-6 py-4"><ImageIcon size={16} className="text-purple-500 cursor-pointer"/></td>
                          <td className="px-6 py-4 text-xs text-slate-500">{dest.createdBy}</td>
                          <td className="px-6 py-4"><span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${dest.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{dest.status}</span></td>
                          <td className="px-6 py-4 text-right">
                             <div className="flex items-center justify-end gap-2">
                                <button onClick={() => handleEditDestination(dest)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded"><Edit2 size={16}/></button>
                                <button onClick={(e) => handleDeleteDestination(dest.id, e)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded"><Trash2 size={16}/></button>
                             </div>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>

        {showAddDestinationModal && (
           <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
              <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
                 <div className="bg-slate-800 px-6 py-4 flex justify-between items-center"><h3 className="text-lg font-bold text-white">{newDestination.id ? 'Edit Destination' : 'Add Destination'}</h3><button onClick={() => setShowAddDestinationModal(false)} className="text-slate-400 hover:text-white"><X size={20} /></button></div>
                 <div className="p-6 space-y-6 overflow-y-auto flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div><label className="block text-xs font-semibold text-slate-500 mb-1">Country</label><select value={newDestination.countryId} onChange={(e) => setNewDestination({...newDestination, countryId: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"><option value="">Select Country</option>{countries.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select><div className="h-0.5 w-8 bg-red-500 mt-1"></div></div>
                       <div><label className="block text-xs font-semibold text-slate-500 mb-1">Destination Name</label><input type="text" value={newDestination.name || ''} onChange={(e) => setNewDestination({...newDestination, name: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"/><div className="h-0.5 w-8 bg-red-500 mt-1"></div></div>
                       <div><label className="block text-xs font-semibold text-slate-500 mb-1">Airport Code</label><input type="text" value={newDestination.airportCode || ''} onChange={(e) => setNewDestination({...newDestination, airportCode: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"/></div>
                       <div className="grid grid-cols-2 gap-4">
                          <div><label className="block text-xs font-semibold text-slate-500 mb-1">Latitude</label><input type="text" value={newDestination.latitude || ''} onChange={(e) => setNewDestination({...newDestination, latitude: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"/></div>
                          <div><label className="block text-xs font-semibold text-slate-500 mb-1">Longitude</label><input type="text" value={newDestination.longitude || ''} onChange={(e) => setNewDestination({...newDestination, longitude: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"/></div>
                       </div>
                    </div>
                    
                    {/* Rich Text Editor Simulation */}
                    <div>
                       <label className="block text-xs font-semibold text-slate-500 mb-1">Destination Description (In English)</label>
                       <div className="border border-slate-300 rounded-lg overflow-hidden">
                          <div className="bg-slate-50 border-b border-slate-300 px-3 py-2 flex gap-3 text-slate-600">
                             <span className="font-bold cursor-pointer">B</span><span className="italic cursor-pointer">I</span><span className="underline cursor-pointer">U</span><span className="cursor-pointer line-through">S</span>
                             <div className="w-px bg-slate-300 mx-1"></div>
                             <span className="cursor-pointer text-xs">File</span><span className="cursor-pointer text-xs">Edit</span><span className="cursor-pointer text-xs">View</span>
                          </div>
                          <textarea className="w-full h-32 p-3 outline-none text-sm resize-none" value={newDestination.description || ''} onChange={(e) => setNewDestination({...newDestination, description: e.target.value})}></textarea>
                          <div className="bg-slate-50 border-t border-slate-300 px-3 py-1 text-[10px] text-slate-400 text-right">Powered by TinyMCE</div>
                       </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        <div>
                           <label className="block text-xs font-semibold text-slate-500 mb-1">Weather Information</label>
                           <textarea className="w-full h-20 p-3 border border-slate-300 rounded-lg text-sm resize-none outline-none" value={newDestination.weatherInfo || ''} onChange={(e) => setNewDestination({...newDestination, weatherInfo: e.target.value})}></textarea>
                        </div>
                        <div>
                           <label className="block text-xs font-semibold text-slate-500 mb-1">Additional Information</label>
                           <textarea className="w-full h-20 p-3 border border-slate-300 rounded-lg text-sm resize-none outline-none" value={newDestination.additionalInfo || ''} onChange={(e) => setNewDestination({...newDestination, additionalInfo: e.target.value})}></textarea>
                        </div>
                    </div>

                    <div><label className="block text-xs font-semibold text-slate-500 mb-1">Status</label><select value={newDestination.status} onChange={(e) => setNewDestination({...newDestination, status: e.target.value as any})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"><option value="Active">Active</option><option value="Inactive">Inactive</option></select></div>
                 </div>
                 <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-center gap-3"><button onClick={handleSaveDestination} className="px-8 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full text-sm font-medium">Save</button><button onClick={() => setShowAddDestinationModal(false)} className="px-8 py-2 bg-white border border-slate-300 text-slate-600 rounded-full text-sm font-medium hover:bg-slate-50">Cancel</button></div>
              </div>
           </div>
        )}
      </div>
    );
  }

  // Define derived state for default dashboard view (This fixes the reference errors)
  const filteredCountries = countries.filter(c => (countryStatusFilter === 'All' || c.status === countryStatusFilter) && c.name.toLowerCase().includes(countrySearch.toLowerCase()));
  const filteredStates = states.filter(s => (stateStatusFilter === 'All' || s.status === stateStatusFilter) && s.name.toLowerCase().includes(stateSearch.toLowerCase()));
  const filteredCities = cities.filter(c => (cityStatusFilter === 'All' || c.status === cityStatusFilter) && c.name.toLowerCase().includes(citySearch.toLowerCase()));
  const filteredLeadSources = leadSources.filter(ls => (leadSourceStatusFilter === 'All' || ls.status === leadSourceStatusFilter) && ls.name.toLowerCase().includes(leadSourceSearch.toLowerCase()));

  // Default Dashboard View
  return (
    <div className="h-full overflow-y-auto">
      
      {!activeModule && (
        <>
        <div className="mb-8"><h2 className="text-3xl font-bold text-slate-800">Master Configuration Hub</h2><p className="text-slate-500 mt-1">Centralized control panel for system dropdowns and parameters.</p></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {MASTER_CONFIG.map((category) => {
            const Icon = category.icon;
            return (
              <div key={category.id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow duration-200 group">
                <div className={`${category.color} p-4 text-white flex items-center justify-between`}><div className="flex items-center gap-3"><div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm"><Icon size={20} /></div><span className="font-bold text-lg tracking-tight">{category.title}</span></div></div>
                <div className="p-3 bg-slate-50 border-b border-slate-100"><p className="text-xs text-slate-500">{category.description}</p></div>
                <div className="flex-1 p-2"><ul className="space-y-1">{category.items.map((item, idx) => (<li key={idx}><button onClick={() => handleModuleClick(item.path)} className="w-full text-left px-3 py-2 rounded-md text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors flex justify-between items-center group/item">{item.label}<ChevronRight size={14} className="opacity-0 group-hover/item:opacity-100 transition-opacity text-blue-400" /></button></li>))}</ul></div>
                <div className="p-3 border-t border-slate-100 bg-slate-50/50"><button className="text-xs font-semibold text-slate-400 uppercase tracking-wider hover:text-blue-600 w-full text-center">Manage {category.title}</button></div>
              </div>
            );
          })}
        </div>
        </>
      )}
      
      {/* 1. Country Master View */}
      {activeModule === '/master/country' && (
         <div className="h-full flex flex-col animate-in fade-in slide-in-from-right-4 duration-300">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
               <div className="flex items-center gap-4"><button onClick={handleBack} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500"><ArrowLeft size={20} /></button><div><h2 className="text-2xl font-bold text-slate-800">Country Master</h2><p className="text-sm text-slate-500">Manage global country codes and settings</p></div></div>
               <div className="flex items-center gap-3"><button onClick={handleDownloadSample} className="bg-white border border-slate-300 text-slate-600 px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-50 text-sm font-medium shadow-sm"><Download size={16}/> Sample</button><label className="bg-white border border-slate-300 text-slate-600 px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-50 text-sm font-medium shadow-sm cursor-pointer"><Upload size={16}/> Import<input type="file" className="hidden" onChange={handleImport} accept=".csv,.xlsx"/></label><button onClick={() => { setNewCountry({ status: 'Active' }); setShowAddCountryModal(true); }} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm text-sm font-medium"><Plus size={18} /> Add Country</button></div>
            </div>
            {/* Search */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
               <div className="relative flex-1 w-full max-w-md"><label className="absolute -top-2 left-2 px-1 bg-white text-[10px] font-semibold text-slate-500">Keyword</label><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} /><input type="text" value={countrySearch} onChange={(e) => setCountrySearch(e.target.value)} placeholder="Search Country" className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
               <div className="relative w-full md:w-48"><label className="absolute -top-2 left-2 px-1 bg-white text-[10px] font-semibold text-slate-500">Select Status</label><select value={countryStatusFilter} onChange={(e) => setCountryStatusFilter(e.target.value)} className="w-full pl-3 pr-8 py-2 border border-slate-300 rounded-lg text-sm bg-white"><option value="All">All Status</option><option value="Active">Active</option><option value="Inactive">Inactive</option></select></div>
            </div>
            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 flex-1 overflow-hidden flex flex-col"><div className="overflow-x-auto flex-1"><table className="w-full text-left"><thead className="bg-slate-50 border-b border-slate-100"><tr><th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Sr</th><th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Country Name</th><th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Short Name</th><th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Country Code</th><th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Created By</th><th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Modified By</th><th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Status</th><th className="px-6 py-3 text-right text-xs font-bold text-slate-500 uppercase">Action</th></tr></thead><tbody className="divide-y divide-slate-100">{filteredCountries.map((country, index) => (<tr key={country.id} className="hover:bg-slate-50 transition-colors"><td className="px-6 py-4 text-sm text-slate-500">{index + 1}</td><td className="px-6 py-4 font-medium text-slate-800">{country.name}</td><td className="px-6 py-4 text-sm text-slate-600">{country.shortName}</td><td className="px-6 py-4 text-sm font-mono text-slate-600">{country.code}</td><td className="px-6 py-4 text-xs text-slate-500">{country.createdBy}</td><td className="px-6 py-4 text-xs text-slate-500">{country.modifiedBy}</td><td className="px-6 py-4"><span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${country.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{country.status}</span></td><td className="px-6 py-4 text-right"><div className="flex items-center justify-end gap-2"><button onClick={() => handleEditCountry(country)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded"><Edit2 size={16}/></button><button onClick={(e) => handleDeleteCountry(country.id, e)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded"><Trash2 size={16}/></button></div></td></tr>))}</tbody></table></div></div>
            {/* Modal */}
            {showAddCountryModal && (<div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4"><div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200"><div className="bg-slate-800 px-6 py-4 flex justify-between items-center"><h3 className="text-lg font-bold text-white">{newCountry.id ? 'Edit Country' : 'Add Country'}</h3><button onClick={() => setShowAddCountryModal(false)} className="text-slate-400 hover:text-white"><X size={20} /></button></div><div className="p-6 space-y-4"><div><label className="block text-xs font-semibold text-slate-500 mb-1">Name</label><input type="text" value={newCountry.name || ''} onChange={(e) => setNewCountry({...newCountry, name: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"/><div className="h-0.5 w-8 bg-red-500 mt-1"></div></div><div className="grid grid-cols-2 gap-4"><div><label className="block text-xs font-semibold text-slate-500 mb-1">Short Name</label><input type="text" value={newCountry.shortName || ''} onChange={(e) => setNewCountry({...newCountry, shortName: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"/><div className="h-0.5 w-8 bg-red-500 mt-1"></div></div><div><label className="block text-xs font-semibold text-slate-500 mb-1">Country Code</label><input type="text" value={newCountry.code || ''} onChange={(e) => setNewCountry({...newCountry, code: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" placeholder="+"/><div className="h-0.5 w-8 bg-red-500 mt-1"></div></div></div><div><label className="block text-xs font-semibold text-slate-500 mb-1">Status</label><select value={newCountry.status} onChange={(e) => setNewCountry({...newCountry, status: e.target.value as any})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"><option value="Active">Active</option><option value="Inactive">Inactive</option></select></div></div><div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-center gap-3"><button onClick={handleSaveCountry} className="px-8 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full text-sm font-medium">Save</button><button onClick={() => setShowAddCountryModal(false)} className="px-8 py-2 bg-white border border-slate-300 text-slate-600 rounded-full text-sm font-medium hover:bg-slate-50">Cancel</button></div></div></div>)}
         </div>
      )}

      {/* 2. State Master View */}
      {activeModule === '/master/state' && (
         <div className="h-full flex flex-col animate-in fade-in slide-in-from-right-4 duration-300">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4"><div className="flex items-center gap-4"><button onClick={handleBack} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500"><ArrowLeft size={20} /></button><div><h2 className="text-2xl font-bold text-slate-800">State Master</h2><p className="text-sm text-slate-500">Manage provinces and states by country</p></div></div><div className="flex items-center gap-3"><button onClick={handleDownloadSample} className="bg-white border border-slate-300 text-slate-600 px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-50 text-sm font-medium shadow-sm"><Download size={16}/> Sample</button><label className="bg-white border border-slate-300 text-slate-600 px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-50 text-sm font-medium shadow-sm cursor-pointer"><Upload size={16}/> Import<input type="file" className="hidden" onChange={handleImport} accept=".csv,.xlsx"/></label><button onClick={() => { setNewState({ status: 'Active', countryId: '' }); setShowAddStateModal(true); }} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm text-sm font-medium"><Plus size={18} /> Add State</button></div></div>
            {/* Toolbar */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center"><div className="relative flex-1 w-full max-w-md"><label className="absolute -top-2 left-2 px-1 bg-white text-[10px] font-semibold text-slate-500">Keyword</label><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} /><input type="text" value={stateSearch} onChange={(e) => setStateSearch(e.target.value)} placeholder="Search State" className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" /></div><div className="relative w-full md:w-48"><label className="absolute -top-2 left-2 px-1 bg-white text-[10px] font-semibold text-slate-500">Select Status</label><select value={stateStatusFilter} onChange={(e) => setStateStatusFilter(e.target.value)} className="w-full pl-3 pr-8 py-2 border border-slate-300 rounded-lg text-sm bg-white"><option value="All">All Status</option><option value="Active">Active</option><option value="Inactive">Inactive</option></select></div></div>
            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 flex-1 overflow-hidden flex flex-col"><div className="overflow-x-auto flex-1"><table className="w-full text-left"><thead className="bg-slate-50 border-b border-slate-100"><tr><th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Sr</th><th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">State Name</th><th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Country Name</th><th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Created By</th><th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Modified By</th><th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Status</th><th className="px-6 py-3 text-right text-xs font-bold text-slate-500 uppercase">Action</th></tr></thead><tbody className="divide-y divide-slate-100">{filteredStates.map((state, index) => (<tr key={state.id} className="hover:bg-slate-50 transition-colors"><td className="px-6 py-4 text-sm text-slate-500">{index + 1}</td><td className="px-6 py-4 font-medium text-slate-800">{state.name}</td><td className="px-6 py-4 text-sm text-slate-600">{state.countryName}</td><td className="px-6 py-4 text-xs text-slate-500">{state.createdBy}</td><td className="px-6 py-4 text-xs text-slate-500">{state.modifiedBy}</td><td className="px-6 py-4"><span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${state.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{state.status}</span></td><td className="px-6 py-4 text-right"><div className="flex items-center justify-end gap-2"><button onClick={() => handleEditState(state)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded"><Edit2 size={16}/></button><button onClick={(e) => handleDeleteState(state.id, e)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded"><Trash2 size={16}/></button></div></td></tr>))}</tbody></table></div></div>
            {/* Modal */}
            {showAddStateModal && (<div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4"><div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200"><div className="bg-slate-800 px-6 py-4 flex justify-between items-center"><h3 className="text-lg font-bold text-white">{newState.id ? 'Edit State' : 'Add State'}</h3><button onClick={() => setShowAddStateModal(false)} className="text-slate-400 hover:text-white"><X size={20} /></button></div><div className="p-6 space-y-4"><div><label className="block text-xs font-semibold text-slate-500 mb-1">Country</label><select value={newState.countryId} onChange={(e) => setNewState({...newState, countryId: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"><option value="">Select</option>{countries.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select><div className="h-0.5 w-8 bg-red-500 mt-1"></div></div><div><label className="block text-xs font-semibold text-slate-500 mb-1">Name</label><input type="text" value={newState.name || ''} onChange={(e) => setNewState({...newState, name: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"/><div className="h-0.5 w-8 bg-red-500 mt-1"></div></div><div><label className="block text-xs font-semibold text-slate-500 mb-1">Status</label><select value={newState.status} onChange={(e) => setNewState({...newState, status: e.target.value as any})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"><option value="Active">Active</option><option value="Inactive">Inactive</option></select></div></div><div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-center gap-3"><button onClick={handleSaveState} className="px-8 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full text-sm font-medium">Save</button><button onClick={() => setShowAddStateModal(false)} className="px-8 py-2 bg-white border border-slate-300 text-slate-600 rounded-full text-sm font-medium hover:bg-slate-50">Cancel</button></div></div></div>)}
         </div>
      )}

      {/* 3. City Master View */}
      {activeModule === '/master/city' && (
         <div className="h-full flex flex-col animate-in fade-in slide-in-from-right-4 duration-300">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4"><div className="flex items-center gap-4"><button onClick={handleBack} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500"><ArrowLeft size={20} /></button><div><h2 className="text-2xl font-bold text-slate-800">City Master</h2><p className="text-sm text-slate-500">Manage cities and link them to states</p></div></div><div className="flex items-center gap-3"><button onClick={handleDownloadSample} className="bg-white border border-slate-300 text-slate-600 px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-50 text-sm font-medium shadow-sm"><Download size={16}/> Sample</button><label className="bg-white border border-slate-300 text-slate-600 px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-50 text-sm font-medium shadow-sm cursor-pointer"><Upload size={16}/> Import<input type="file" className="hidden" onChange={handleImport} accept=".csv,.xlsx"/></label><button onClick={() => { setNewCity({ status: 'Active', countryId: '', stateId: '' }); setShowAddCityModal(true); }} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm text-sm font-medium"><Plus size={18} /> Add City</button></div></div>
            {/* Toolbar */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center"><div className="relative flex-1 w-full max-w-md"><label className="absolute -top-2 left-2 px-1 bg-white text-[10px] font-semibold text-slate-500">Keyword</label><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} /><input type="text" value={citySearch} onChange={(e) => setCitySearch(e.target.value)} placeholder="Search City" className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" /></div><div className="relative w-full md:w-48"><label className="absolute -top-2 left-2 px-1 bg-white text-[10px] font-semibold text-slate-500">Select Status</label><select value={cityStatusFilter} onChange={(e) => setCityStatusFilter(e.target.value)} className="w-full pl-3 pr-8 py-2 border border-slate-300 rounded-lg text-sm bg-white"><option value="All">All Status</option><option value="Active">Active</option><option value="Inactive">Inactive</option></select></div></div>
            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 flex-1 overflow-hidden flex flex-col"><div className="overflow-x-auto flex-1"><table className="w-full text-left"><thead className="bg-slate-50 border-b border-slate-100"><tr><th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Sr</th><th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">City Name</th><th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">State Name</th><th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Country Name</th><th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Created By</th><th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Modified By</th><th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Status</th><th className="px-6 py-3 text-right text-xs font-bold text-slate-500 uppercase">Action</th></tr></thead><tbody className="divide-y divide-slate-100">{filteredCities.map((city, index) => (<tr key={city.id} className="hover:bg-slate-50 transition-colors"><td className="px-6 py-4 text-sm text-slate-500">{index + 1}</td><td className="px-6 py-4 font-medium text-slate-800">{city.name}</td><td className="px-6 py-4 text-sm text-slate-600">{city.stateName}</td><td className="px-6 py-4 text-sm text-slate-600">{city.countryName}</td><td className="px-6 py-4 text-xs text-slate-500">{city.createdBy}</td><td className="px-6 py-4 text-xs text-slate-500">{city.modifiedBy}</td><td className="px-6 py-4"><span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${city.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{city.status}</span></td><td className="px-6 py-4 text-right"><div className="flex items-center justify-end gap-2"><button onClick={() => handleEditCity(city)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded"><Edit2 size={16}/></button><button onClick={(e) => handleDeleteCity(city.id, e)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded"><Trash2 size={16}/></button></div></td></tr>))}</tbody></table></div></div>
            {/* Modal */}
            {showAddCityModal && (<div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4"><div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200"><div className="bg-slate-800 px-6 py-4 flex justify-between items-center"><h3 className="text-lg font-bold text-white">{newCity.id ? 'Edit City' : 'Add City'}</h3><button onClick={() => setShowAddCityModal(false)} className="text-slate-400 hover:text-white"><X size={20} /></button></div><div className="p-6 space-y-4"><div><label className="block text-xs font-semibold text-slate-500 mb-1">Country</label><select value={newCity.countryId} onChange={(e) => setNewCity({...newCity, countryId: e.target.value, stateId: ''})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"><option value="">Select Country</option>{countries.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select><div className="h-0.5 w-8 bg-red-500 mt-1"></div></div><div><label className="block text-xs font-semibold text-slate-500 mb-1">State</label><select value={newCity.stateId} onChange={(e) => setNewCity({...newCity, stateId: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white" disabled={!newCity.countryId}><option value="">Select State</option>{states.filter(s => s.countryId === newCity.countryId).map(s => <option key={s.id} value={s.id}>{s.name}</option>)}</select><div className="h-0.5 w-8 bg-red-500 mt-1"></div></div><div><label className="block text-xs font-semibold text-slate-500 mb-1">City Name</label><input type="text" value={newCity.name || ''} onChange={(e) => setNewCity({...newCity, name: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"/><div className="h-0.5 w-8 bg-red-500 mt-1"></div></div><div><label className="block text-xs font-semibold text-slate-500 mb-1">Status</label><select value={newCity.status} onChange={(e) => setNewCity({...newCity, status: e.target.value as any})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"><option value="Active">Active</option><option value="Inactive">Inactive</option></select></div></div><div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-center gap-3"><button onClick={handleSaveCity} className="px-8 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full text-sm font-medium">Save</button><button onClick={() => setShowAddCityModal(false)} className="px-8 py-2 bg-white border border-slate-300 text-slate-600 rounded-full text-sm font-medium hover:bg-slate-50">Cancel</button></div></div></div>)}
         </div>
      )}

      {/* 4. Lead Source Master View */}
      {activeModule === '/master/lead-source' && (
         <div className="h-full flex flex-col animate-in fade-in slide-in-from-right-4 duration-300">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4"><div className="flex items-center gap-4"><button onClick={handleBack} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500"><ArrowLeft size={20} /></button><div><h2 className="text-2xl font-bold text-slate-800">Lead Source Master</h2><p className="text-sm text-slate-500">Manage lead sources for better tracking</p></div></div><div className="flex items-center gap-3"><button onClick={handleDownloadSample} className="bg-white border border-slate-300 text-slate-600 px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-50 text-sm font-medium shadow-sm"><Download size={16}/> Sample</button><label className="bg-white border border-slate-300 text-slate-600 px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-50 text-sm font-medium shadow-sm cursor-pointer"><Upload size={16}/> Import<input type="file" className="hidden" onChange={handleImport} accept=".csv,.xlsx"/></label><button onClick={() => { setNewLeadSource({ status: 'Active' }); setShowAddLeadSourceModal(true); }} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm text-sm font-medium"><Plus size={18} /> Add Lead Source</button></div></div>
            {/* Toolbar */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center"><div className="relative flex-1 w-full max-w-md"><label className="absolute -top-2 left-2 px-1 bg-white text-[10px] font-semibold text-slate-500">Keyword</label><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} /><input type="text" value={leadSourceSearch} onChange={(e) => setLeadSourceSearch(e.target.value)} placeholder="Search Lead Source" className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" /></div><div className="relative w-full md:w-48"><label className="absolute -top-2 left-2 px-1 bg-white text-[10px] font-semibold text-slate-500">Select Status</label><select value={leadSourceStatusFilter} onChange={(e) => setLeadSourceStatusFilter(e.target.value)} className="w-full pl-3 pr-8 py-2 border border-slate-300 rounded-lg text-sm bg-white"><option value="All">All Status</option><option value="Active">Active</option><option value="Inactive">Inactive</option></select></div></div>
            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 flex-1 overflow-hidden flex flex-col"><div className="overflow-x-auto flex-1"><table className="w-full text-left"><thead className="bg-slate-50 border-b border-slate-100"><tr><th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Sr</th><th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Lead Source Name</th><th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Created By</th><th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Modified By</th><th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Status</th><th className="px-6 py-3 text-right text-xs font-bold text-slate-500 uppercase">Action</th></tr></thead><tbody className="divide-y divide-slate-100">{filteredLeadSources.map((ls, index) => (<tr key={ls.id} className="hover:bg-slate-50 transition-colors"><td className="px-6 py-4 text-sm text-slate-500">{index + 1}</td><td className="px-6 py-4 font-medium text-slate-800">{ls.name}</td><td className="px-6 py-4 text-xs text-slate-500">{ls.createdBy}</td><td className="px-6 py-4 text-xs text-slate-500">{ls.modifiedBy}</td><td className="px-6 py-4"><span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${ls.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{ls.status}</span></td><td className="px-6 py-4 text-right"><div className="flex items-center justify-end gap-2"><button onClick={() => handleEditLeadSource(ls)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded"><Edit2 size={16}/></button><button onClick={(e) => handleDeleteLeadSource(ls.id, e)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded"><Trash2 size={16}/></button></div></td></tr>))}</tbody></table></div></div>
            {/* Modal */}
            {showAddLeadSourceModal && (<div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4"><div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200"><div className="bg-slate-800 px-6 py-4 flex justify-between items-center"><h3 className="text-lg font-bold text-white">{newLeadSource.id ? 'Edit Lead Source' : 'Add Lead Source'}</h3><button onClick={() => setShowAddLeadSourceModal(false)} className="text-slate-400 hover:text-white"><X size={20} /></button></div><div className="p-6 space-y-4"><div><label className="block text-xs font-semibold text-slate-500 mb-1">Lead Source Name</label><input type="text" value={newLeadSource.name || ''} onChange={(e) => setNewLeadSource({...newLeadSource, name: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"/><div className="h-0.5 w-8 bg-red-500 mt-1"></div></div><div><label className="block text-xs font-semibold text-slate-500 mb-1">Status</label><select value={newLeadSource.status} onChange={(e) => setNewLeadSource({...newLeadSource, status: e.target.value as any})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"><option value="Active">Active</option><option value="Inactive">Inactive</option></select></div></div><div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-center gap-3"><button onClick={handleSaveLeadSource} className="px-8 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full text-sm font-medium">Save</button><button onClick={() => setShowAddLeadSourceModal(false)} className="px-8 py-2 bg-white border border-slate-300 text-slate-600 rounded-full text-sm font-medium hover:bg-slate-50">Cancel</button></div></div></div>)}
         </div>
      )}
    </div>
  );
};

export default MasterSettings;
