
import React, { useState } from 'react';
import { Search, Filter, Plus, DollarSign, X, Building2, Plane, Flag, Utensils, Sparkles, Bus, Calendar, Edit2, Check, FileText, Save, ArrowLeft, User } from 'lucide-react';
import { 
  initialHotels, 
  initialTariffs, 
  initialItineraryInfos,
  initialDestinations,
  initialAirlines,
  initialActivitiesMasterList,
  initialTransfers,
  initialRestaurants,
  initialAdditionalRequirements,
  initialHotelCategories,
  initialHotelTypes,
  initialCountries,
  initialStates,
  initialCities,
  mockAmenitiesList,
  mockRoomTypesList,
  initialGuides,
  initialGuideTariffs,
  initialPaxSlabs,
  initialActivityTariffs
} from './mockData';
import { HotelMaster, HotelContact, Guide, GuideTariff, ActivityMaster } from '../types';

interface ServiceModalsProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'hotel' | 'flight' | 'transport' | 'activity' | 'restaurant' | 'additional' | 'itinerary-info' | 'guide';
  city: string;
  date?: string;
  onAdd: (serviceData: any) => void;
}

// Helper to get rates
const getHotelRate = (hotelId: string) => {
  return initialTariffs.find(t => t.hotelId === hotelId);
};

const getGuideRate = (guideId: string) => {
  return initialGuideTariffs.find(t => t.guideId === guideId);
};

const getActivityRate = (activityId: string) => {
  return initialActivityTariffs.find(t => t.activityId === activityId);
};

const ServiceModals: React.FC<ServiceModalsProps> = ({ isOpen, onClose, type, city, date, onAdd }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [overrideCost, setOverrideCost] = useState<number | string>('');
  
  // Hotel Logic State
  const [hotelView, setHotelView] = useState<'list' | 'add'>('list');
  const [localHotels, setLocalHotels] = useState<HotelMaster[]>(initialHotels);
  const [newHotel, setNewHotel] = useState<Partial<HotelMaster>>({
    status: 'Active',
    weekendDays: 'FSS',
    checkInTime: '12:00',
    checkOutTime: '11:00',
    selfSupplier: 'Yes',
    amenities: [],
    roomTypes: [],
    contacts: [{ id: '1', title: 'Mr.', firstName: '', lastName: '', designation: '', countryCode: '+91', phone1: '', email: '', isForContactList: false }]
  });

  // Guide Logic State
  const [guideView, setGuideView] = useState<'list' | 'add'>('list');
  const [localGuides, setLocalGuides] = useState<Guide[]>(initialGuides);
  const [newGuideName, setNewGuideName] = useState('');
  const [guideFilterType, setGuideFilterType] = useState('Guide');
  const [guideFilterDest, setGuideFilterDest] = useState(city || 'AGRA');
  const [guideFilterPax, setGuideFilterPax] = useState('All Pax');

  // Activity Logic State
  const [activityView, setActivityView] = useState<'list' | 'add'>('list');
  const [localActivities, setLocalActivities] = useState<ActivityMaster[]>(initialActivitiesMasterList);
  const [newActivity, setNewActivity] = useState<Partial<ActivityMaster>>({
      status: 'Active',
      isDefault: 'No',
      type: 'Activity',
      destinationName: city || 'Agra',
      supplierName: 'Select supplier'
  });
  const [activityFilterDate, setActivityFilterDate] = useState(date || '29-11-2025');
  const [activityFilterDest, setActivityFilterDest] = useState(city || 'Agra');
  const [activityFilterType, setActivityFilterType] = useState('Activity');
  const [activityFilterCostType, setActivityFilterCostType] = useState('Select Cost Type');

  // Specific State for New Modules
  const [mealType, setMealType] = useState<'Lunch' | 'Dinner'>('Dinner');
  const [costType, setCostType] = useState<'Per Person' | 'Group Cost'>('Per Person');

  // Hotel Filter States
  const [starRating, setStarRating] = useState('All');
  const [hotelTypeFilter, setHotelTypeFilter] = useState('All');
  const [roomTypeFilter, setRoomTypeFilter] = useState('All');
  const [filterMealType, setFilterMealType] = useState('All');

  if (!isOpen) return null;

  // Filter Data Source
  const getResults = () => {
    const query = searchQuery.toLowerCase();
    
    switch (type) {
      case 'hotel':
        return localHotels.filter(h => {
            const matchesName = h.name.toLowerCase().includes(query);
            const matchesCity = city ? (h.city.toLowerCase().includes(city.toLowerCase()) || h.destination.toLowerCase().includes(city.toLowerCase())) : true;
            const matchesStar = starRating === 'All' || h.category.includes(starRating);
            return matchesName && matchesCity && matchesStar;
        });
      
      case 'itinerary-info':
        return initialItineraryInfos.filter(info => {
            const matchesTitle = info.title.toLowerCase().includes(query);
            return matchesTitle; 
        });
      
      case 'guide':
        return localGuides.filter(g => {
            const matchesName = g.name.toLowerCase().includes(query);
            const matchesType = guideFilterType === 'All Guide' || g.serviceType === guideFilterType;
            // Loose city check
            const matchesCity = g.destinationName?.toLowerCase().includes(guideFilterDest.toLowerCase()); 
            return matchesName && matchesType && matchesCity;
        });

      case 'activity':
        return localActivities.filter(a => {
            const rate = getActivityRate(a.id);
            const matchesName = a.name.toLowerCase().includes(query);
            const matchesDest = activityFilterDest === 'Selected Destination' || a.destinationName === activityFilterDest || a.destinationName.toLowerCase().includes(activityFilterDest.toLowerCase());
            const matchesType = activityFilterType === 'Activity' ? a.type === 'Activity' : true;
            const matchesCostType = activityFilterCostType === 'Select Cost Type' ? true : rate?.costType === activityFilterCostType;
            
            return matchesName && matchesDest && matchesType && matchesCostType;
        });
        
      case 'flight':
        return []; 
        
      case 'transport':
        return initialTransfers.filter(t => t.name.toLowerCase().includes(query) && t.destinationName.toLowerCase().includes(city.toLowerCase()));

      case 'restaurant':
        return initialRestaurants.filter(r => r.name.toLowerCase().includes(query) && r.destination.toLowerCase().includes(city.toLowerCase()));

      case 'additional':
        return initialAdditionalRequirements.filter(r => r.name.toLowerCase().includes(query));

      default:
        return [];
    }
  };

  const results = getResults();

  const handleSelect = (item: any) => {
    setSelectedItem(item);
    setOverrideCost(item.cost || 0);
    
    if (type === 'itinerary-info') {
        onAdd({
            id: item.id,
            title: item.title,
            description: item.description,
            transferMode: item.transferMode
        });
        onClose();
    }
  };

  const handleConfirmAdd = () => {
    if (!selectedItem) return;
    
    const payload: any = { ...selectedItem, cost: Number(overrideCost) };
    
    if (type === 'hotel') {
       Object.assign(payload, { 
           roomType: selectedItem.roomTypes?.[0] || 'Standard', 
           mealPlan: 'CP', 
           checkIn: '14:00', 
           checkOut: '11:00',
           supplier: selectedItem.selfSupplier === 'Yes' ? 'Direct' : 'Vendor'
       });
    }
    if (type === 'restaurant') {
       Object.assign(payload, { mealType: mealType });
    }
    if (type === 'additional') {
       Object.assign(payload, { costType: costType });
    }
    
    onAdd(payload);
    setSelectedItem(null);
    setSearchQuery('');
    onClose();
  };

  const handleDirectSelectHotel = (hotel: any) => {
      const rate = getHotelRate(hotel.id);
      const cost = rate ? rate.rates.single : 0; 
      
      const payload: any = { 
          ...hotel, 
          cost: cost,
          roomType: rate?.roomType || 'Standard', 
          mealPlan: rate?.mealPlan || 'CP', 
          checkIn: '14:00', 
          checkOut: '11:00',
          supplierName: rate?.supplierName || 'Direct'
      };
      onAdd(payload);
      onClose();
  };

  const handleDirectSelectGuide = (guide: Guide) => {
      const rate = getGuideRate(guide.id);
      const cost = rate ? rate.serviceCost : 0;
      
      const payload: any = {
          ...guide,
          cost: cost,
          supplierName: rate?.supplierName || 'Direct'
      };
      onAdd(payload);
      onClose();
  };

  const handleAddPriceClick = (item: any) => {
      setSelectedItem(item);
      setOverrideCost(0); 
  };

  // --- Add Hotel Handlers ---
  const handleSaveNewHotel = () => {
      if (!newHotel.name) return;

      const hotel: HotelMaster = {
          ...newHotel as HotelMaster,
          id: Math.random().toString(),
          contacts: newHotel.contacts || []
      };

      initialHotels.push(hotel);
      setLocalHotels([...localHotels, hotel]);
      
      setHotelView('list');
      setNewHotel({
        status: 'Active',
        weekendDays: 'FSS',
        checkInTime: '12:00',
        checkOutTime: '11:00',
        selfSupplier: 'Yes',
        amenities: [],
        roomTypes: [],
        contacts: [{ id: '1', title: 'Mr.', firstName: '', lastName: '', designation: '', countryCode: '+91', phone1: '', email: '', isForContactList: false }]
      });
      setSearchQuery(hotel.name); 
  };

  const updateNewHotelContact = (id: string, field: keyof HotelContact, value: any) => {
      const updatedContacts = newHotel.contacts?.map(c => 
        c.id === id ? { ...c, [field]: value } : c
      );
      setNewHotel({ ...newHotel, contacts: updatedContacts });
  };

  const addNewHotelContact = () => {
      setNewHotel({
          ...newHotel,
          contacts: [...(newHotel.contacts || []), { id: Math.random().toString(), title: 'Mr.', firstName: '', lastName: '', designation: '', countryCode: '+91', phone1: '', email: '', isForContactList: false }]
      });
  };

  // --- Add Guide Handlers ---
  const handleSaveNewGuide = () => {
      if (!newGuideName) return;
      
      const guide: Guide = {
          id: Math.random().toString(),
          name: newGuideName,
          serviceType: guideFilterType as any,
          destinationName: guideFilterDest,
          mobile: '', email: '', status: 'Active' // Minimal default
      };
      
      initialGuides.push(guide);
      setLocalGuides([...localGuides, guide]);
      setGuideView('list');
      setNewGuideName('');
      setSearchQuery(guide.name);
  };

  // --- Add Activity Handlers ---
  const handleSaveNewActivity = () => {
      if(!newActivity.name) return;

      const activity: ActivityMaster = {
          ...newActivity as ActivityMaster,
          id: Math.random().toString(),
          serviceCode: `ACT${Math.floor(Math.random()*1000)}`,
          destinationId: '1', // Mock
      };
      
      initialActivitiesMasterList.push(activity);
      setLocalActivities([...localActivities, activity]);
      setActivityView('list');
      setNewActivity({ status: 'Active', isDefault: 'No', type: 'Activity', destinationName: city || 'Agra', supplierName: 'Select supplier' });
      setSearchQuery(activity.name);
  };

  // --- RENDER FOR ACTIVITY TYPE ---
  if (type === 'activity') {
      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col overflow-hidden font-sans">
                {activityView === 'list' ? (
                    <>
                        {/* Header */}
                        <div className="flex justify-between items-center p-3 border-b border-slate-200 bg-white">
                            <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                                Activity | Experiences | {date || 'Date Not Set'}
                            </h3>
                            <button onClick={onClose} className="text-slate-400 hover:text-red-500">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Filters */}
                        <div className="p-4 border-b border-slate-200 bg-slate-50 space-y-3">
                             <div className="grid grid-cols-1 md:grid-cols-7 gap-2 items-end">
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Destination Type</label>
                                    <select className="w-full border border-slate-300 rounded px-2 py-1.5 text-xs bg-white outline-none">
                                        <option>Selected Destination</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Destination</label>
                                    <select 
                                        value={activityFilterDest}
                                        onChange={e => setActivityFilterDest(e.target.value)}
                                        className="w-full border border-slate-300 rounded px-2 py-1.5 text-xs bg-white outline-none"
                                    >
                                        <option>{city || 'Agra'}</option>
                                        {initialDestinations.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Date</label>
                                    <input 
                                        type="date" 
                                        value={activityFilterDate}
                                        onChange={e => setActivityFilterDate(e.target.value)}
                                        className="w-full border border-slate-300 rounded px-2 py-1.5 text-xs outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Type</label>
                                    <select 
                                        value={activityFilterType}
                                        onChange={e => setActivityFilterType(e.target.value)}
                                        className="w-full border border-slate-300 rounded px-2 py-1.5 text-xs bg-white outline-none"
                                    >
                                        <option>Activity</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">SGL/PKG</label>
                                    <select className="w-full border border-slate-300 rounded px-2 py-1.5 text-xs bg-white outline-none">
                                        <option>Individual</option>
                                        <option>Package</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Cost Type</label>
                                    <select 
                                        value={activityFilterCostType}
                                        onChange={e => setActivityFilterCostType(e.target.value)}
                                        className="w-full border border-slate-300 rounded px-2 py-1.5 text-xs bg-white outline-none"
                                    >
                                        <option>Select Cost Type</option>
                                        <option>Per Person Cost</option>
                                        <option>Group Cost</option>
                                    </select>
                                </div>
                                <div className="flex gap-2">
                                    <input 
                                        type="text" 
                                        value={searchQuery}
                                        onChange={e => setSearchQuery(e.target.value)}
                                        placeholder="Enter Keyword"
                                        className="w-full border border-slate-300 rounded px-2 py-1.5 text-xs outline-none"
                                    />
                                    <button className="bg-slate-800 text-white px-3 py-1.5 rounded text-xs font-bold hover:bg-slate-900">
                                        <Search size={12} />
                                    </button>
                                </div>
                             </div>
                        </div>

                        {/* Results Header & Add Button */}
                         <div className="flex justify-end px-4 py-2 border-b border-slate-200 bg-white">
                            <button 
                                onClick={() => setActivityView('add')}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs font-bold flex items-center gap-1"
                            >
                                <Plus size={12} /> Add New
                            </button>
                        </div>

                        {/* Table */}
                        <div className="flex-1 overflow-auto bg-slate-50 p-4">
                            <div className="bg-white border border-slate-300">
                                <table className="w-full text-left text-xs border-collapse">
                                    <thead className="bg-slate-200 text-slate-700 font-bold sticky top-0 z-10">
                                        <tr>
                                            <th className="p-2 border border-slate-300">Service Name</th>
                                            <th className="p-2 border border-slate-300">Type</th>
                                            <th className="p-2 border border-slate-300">Supplier</th>
                                            <th className="p-2 border border-slate-300 text-right">Currency[ROE]</th>
                                            <th className="p-2 border border-slate-300 text-right">Pax Range</th>
                                            <th className="p-2 border border-slate-300 text-right">Cost Type</th>
                                            <th className="p-2 border border-slate-300 text-right">Activity Cost</th>
                                            <th className="p-2 border border-slate-300 text-right">No. of Activity</th>
                                            <th className="p-2 border border-slate-300 text-center w-40">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {results.map((activity: any) => {
                                            const rate = getActivityRate(activity.id);
                                            return (
                                                <tr key={activity.id} className="hover:bg-blue-50">
                                                    <td className="p-2 border border-slate-300 font-medium text-slate-800" title={activity.description}>{activity.name}</td>
                                                    <td className="p-2 border border-slate-300 text-slate-600">{activity.type}</td>
                                                    <td className="p-2 border border-slate-300 text-slate-600">{rate?.supplierName || 'NA'}</td>
                                                    <td className="p-2 border border-slate-300 text-right">{rate ? `${rate.currency} [1]` : 'NA'}</td>
                                                    <td className="p-2 border border-slate-300 text-right">{rate ? `${rate.fromPax}-${rate.toPax}` : 'NA'}</td>
                                                    <td className="p-2 border border-slate-300 text-right">{rate?.costType || 'NA'}</td>
                                                    <td className="p-2 border border-slate-300 text-right">{rate?.perPaxCost || 'NA'}</td>
                                                    <td className="p-2 border border-slate-300 text-right">{rate ? '1' : 'NA'}</td>
                                                    <td className="p-2 border border-slate-300">
                                                        <div className="flex gap-1 justify-center">
                                                            <button 
                                                                onClick={() => handleAddPriceClick(activity)}
                                                                className="w-full bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-[10px] font-bold"
                                                            >
                                                                + Edit Price
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                        {results.length === 0 && (
                                            <tr><td colSpan={9} className="p-8 text-center text-slate-400">No activities found matching criteria.</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="h-full flex flex-col overflow-hidden animate-in slide-in-from-right-4">
                        <div className="bg-white px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-slate-800">Add Activity</h2>
                            <button onClick={() => setActivityView('list')} className="text-slate-400 hover:text-slate-600">
                                <X size={24} />
                            </button>
                        </div>
                        <div className="p-8 bg-slate-50/50 flex-1">
                             <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 max-w-3xl mx-auto">
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                     <div>
                                         <label className="block text-xs font-semibold text-slate-500 mb-1">TYPE</label>
                                         <select 
                                            value={newActivity.type}
                                            onChange={e => setNewActivity({...newActivity, type: e.target.value})}
                                            className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500"
                                         >
                                            <option>Select</option>
                                            <option>Activity</option>
                                         </select>
                                     </div>
                                     <div>
                                         <label className="block text-xs font-semibold text-slate-500 mb-1">ACTIVITY NAME</label>
                                         <input 
                                            type="text" 
                                            value={newActivity.name || ''}
                                            onChange={e => setNewActivity({...newActivity, name: e.target.value})}
                                            className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 border-l-4 border-l-red-500"
                                         />
                                     </div>
                                     <div>
                                         <label className="block text-xs font-semibold text-slate-500 mb-1">DESTINATION</label>
                                         <select 
                                            value={newActivity.destinationName}
                                            onChange={e => setNewActivity({...newActivity, destinationName: e.target.value})}
                                            className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 border-l-4 border-l-red-500"
                                         >
                                            {initialDestinations.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                                         </select>
                                     </div>
                                     <div>
                                         <label className="block text-xs font-semibold text-slate-500 mb-1">DEFAULT</label>
                                         <select 
                                            value={newActivity.isDefault}
                                            onChange={e => setNewActivity({...newActivity, isDefault: e.target.value as any})}
                                            className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500"
                                         >
                                            <option>No</option>
                                            <option>Yes</option>
                                         </select>
                                     </div>
                                     <div>
                                         <label className="block text-xs font-semibold text-slate-500 mb-1">SELECT SUPPLIER</label>
                                         <select 
                                            value={newActivity.supplierName}
                                            onChange={e => setNewActivity({...newActivity, supplierName: e.target.value})}
                                            className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500"
                                         >
                                            <option>Select supplier</option>
                                            <option>Self</option>
                                         </select>
                                     </div>
                                     <div>
                                         <label className="block text-xs font-semibold text-slate-500 mb-1">STATUS</label>
                                         <select 
                                            value={newActivity.status}
                                            onChange={e => setNewActivity({...newActivity, status: e.target.value as any})}
                                            className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500"
                                         >
                                            <option>Active</option>
                                            <option>Inactive</option>
                                         </select>
                                     </div>
                                 </div>
                                 
                                 <div className="mb-6">
                                    <label className="block text-xs font-semibold text-slate-500 mb-1">DESCRIPTION</label>
                                    <textarea 
                                        value={newActivity.description || ''}
                                        onChange={e => setNewActivity({...newActivity, description: e.target.value})}
                                        className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 h-24 resize-none"
                                    />
                                 </div>

                                 <div className="flex gap-3">
                                     <button onClick={handleSaveNewActivity} className="bg-slate-800 text-white px-6 py-2 rounded text-sm font-bold hover:bg-slate-900">Save</button>
                                     <button onClick={() => setActivityView('list')} className="bg-slate-800 text-white px-6 py-2 rounded text-sm font-bold hover:bg-slate-900">Back To Search</button>
                                 </div>
                             </div>
                        </div>
                    </div>
                )}

                {/* Edit Price Modal Overlay */}
                {selectedItem && (
                    <div className="absolute inset-0 bg-slate-900/50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-xl w-96 animate-in zoom-in-95">
                            <h4 className="font-bold text-lg mb-4 text-slate-800">Manual Rate Entry</h4>
                            <p className="text-sm text-slate-600 mb-4 font-medium">{selectedItem.name}</p>
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 mb-1">Cost</label>
                                    <input 
                                        type="number" 
                                        value={overrideCost} 
                                        onChange={(e) => setOverrideCost(e.target.value)} 
                                        className="w-full border border-slate-300 rounded px-3 py-2 outline-none focus:border-blue-500"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end gap-2 mt-6">
                                <button onClick={() => setSelectedItem(null)} className="px-4 py-2 text-sm text-slate-600 border border-slate-300 rounded hover:bg-slate-50">Cancel</button>
                                <button onClick={handleConfirmAdd} className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700">Add to Itinerary</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
      );
  }
  
  // ... rest of component (other types) ...
  
  // --- RENDER FOR ITINERARY INFO ---
  if (type === 'itinerary-info') {
      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col overflow-hidden font-sans">
                <div className="flex justify-between items-center p-4 border-b border-slate-200 bg-blue-600 text-white">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                       <FileText size={20}/> {city || 'Agra'} Itinerary Info
                    </h3>
                    <button onClick={onClose} className="text-white/80 hover:text-white">
                        <X size={24} />
                    </button>
                </div>
                
                <div className="p-4 border-b border-slate-100">
                     <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                            type="text" 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Enter Search Keyword" 
                            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                     </div>
                </div>

                <div className="flex-1 overflow-auto p-4 bg-slate-50">
                    <table className="w-full text-left text-sm border border-slate-200 bg-white">
                        <thead className="bg-slate-100 text-slate-700 font-bold uppercase">
                            <tr>
                                <th className="p-3 border-b w-16 text-center">#</th>
                                <th className="p-3 border-b">TITLE/DESCRIPTION</th>
                                <th className="p-3 border-b w-32">LANGUAGE</th>
                                <th className="p-3 border-b w-24 text-center">ACTION</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {results.map((item: any, idx) => (
                                <tr key={item.id} className="hover:bg-blue-50">
                                    <td className="p-3 text-center font-medium">{idx + 1}</td>
                                    <td className="p-3">
                                        <div className="font-bold text-slate-800 mb-1">{item.title}</div>
                                        <div className="text-xs text-slate-600" dangerouslySetInnerHTML={{ __html: item.description }} />
                                    </td>
                                    <td className="p-3">
                                        <select className="border border-slate-300 rounded px-2 py-1 text-xs bg-white w-full">
                                            <option>Default</option>
                                            <option>English</option>
                                        </select>
                                    </td>
                                    <td className="p-3 text-center">
                                        <button 
                                            onClick={() => handleSelect(item)}
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded text-xs font-bold"
                                        >
                                            Select
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {results.length === 0 && (
                                <tr><td colSpan={4} className="p-8 text-center text-slate-400">No info found matching "{searchQuery}"</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
                 <div className="p-4 border-t border-slate-200 flex justify-end">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded text-sm flex items-center gap-2 hover:bg-blue-600">
                        <Plus size={16}/> Add New
                    </button>
                </div>
            </div>
        </div>
      );
  }

  // --- RENDER FOR GUIDE TYPE ---
  if (type === 'guide') {
      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col overflow-hidden font-sans">
                {guideView === 'list' ? (
                    <>
                        {/* Header */}
                        <div className="flex justify-between items-center p-3 border-b border-slate-200 bg-white">
                            <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                                Guide | {date || 'Date Not Set'}
                            </h3>
                            <button onClick={onClose} className="text-slate-400 hover:text-red-500">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Filters */}
                        <div className="p-4 border-b border-slate-200 bg-slate-50 space-y-3">
                             <div className="grid grid-cols-1 md:grid-cols-6 gap-3 items-end">
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Service Type</label>
                                    <select 
                                        value={guideFilterType}
                                        onChange={e => setGuideFilterType(e.target.value)}
                                        className="w-full border border-slate-300 rounded px-2 py-1.5 text-xs bg-white outline-none"
                                    >
                                        <option>Guide</option>
                                        <option>Porter</option>
                                        <option>Tour Escort</option>
                                        <option>Tour Manager</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Destination Type</label>
                                    <select className="w-full border border-slate-300 rounded px-2 py-1.5 text-xs bg-white outline-none">
                                        <option>Selected Destination</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Destination</label>
                                    <select 
                                        value={guideFilterDest}
                                        onChange={e => setGuideFilterDest(e.target.value)}
                                        className="w-full border border-slate-300 rounded px-2 py-1.5 text-xs bg-white outline-none"
                                    >
                                        {initialDestinations.map(d => <option key={d.id} value={d.name.toUpperCase()}>{d.name.toUpperCase()}</option>)}
                                        <option>AGRA</option>
                                        <option>DELHI</option>
                                        <option>JAIPUR</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Pax Range</label>
                                    <select 
                                        value={guideFilterPax}
                                        onChange={e => setGuideFilterPax(e.target.value)}
                                        className="w-full border border-slate-300 rounded px-2 py-1.5 text-xs bg-white outline-none"
                                    >
                                        <option>All Pax</option>
                                        {initialPaxSlabs?.map((s: any) => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </div>
                                <div className="md:col-span-1">
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Guide Service</label>
                                    <input 
                                        type="text" 
                                        value={searchQuery}
                                        onChange={e => setSearchQuery(e.target.value)}
                                        placeholder="Enter Keyword"
                                        className="w-full border border-slate-300 rounded px-2 py-1.5 text-xs outline-none"
                                    />
                                </div>
                                <div>
                                    <button className="w-full bg-slate-800 text-white px-4 py-1.5 rounded text-xs font-bold hover:bg-slate-900 flex items-center justify-center gap-2">
                                        <Search size={12} /> Search
                                    </button>
                                </div>
                             </div>
                        </div>

                        {/* Results Header & Add Button */}
                         <div className="flex justify-end px-4 py-2 border-b border-slate-200 bg-white">
                            <button 
                                onClick={() => setGuideView('add')}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs font-bold flex items-center gap-1"
                            >
                                <Plus size={12} /> Add New
                            </button>
                        </div>

                        {/* Table */}
                        <div className="flex-1 overflow-auto bg-slate-50 p-4">
                            <div className="bg-white border border-slate-300">
                                <table className="w-full text-left text-xs border-collapse">
                                    <thead className="bg-slate-200 text-slate-700 font-bold sticky top-0 z-10">
                                        <tr>
                                            <th className="p-2 border border-slate-300">Guide Service</th>
                                            <th className="p-2 border border-slate-300">Day Type</th>
                                            <th className="p-2 border border-slate-300">Pax Range</th>
                                            <th className="p-2 border border-slate-300">Pax Slab</th>
                                            <th className="p-2 border border-slate-300 text-right">Guide Cost</th>
                                            <th className="p-2 border border-slate-300 text-right">L. Allowance</th>
                                            <th className="p-2 border border-slate-300 text-right">Other Cost</th>
                                            <th className="p-2 border border-slate-300 text-center w-40">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {results.map((guide: any) => {
                                            const rate = getGuideRate(guide.id);
                                            return (
                                                <tr key={guide.id} className="hover:bg-blue-50">
                                                    <td className="p-2 border border-slate-300 font-medium text-slate-800">{guide.name}</td>
                                                    <td className="p-2 border border-slate-300 text-slate-600">{rate?.dayType || 'Full Day'}</td>
                                                    <td className="p-2 border border-slate-300 text-slate-600">{rate?.paxRange || 'All'}</td>
                                                    <td className="p-2 border border-slate-300">
                                                        <select className="w-full border border-slate-200 rounded px-1 py-0.5 text-xs bg-white outline-none">
                                                            <option>All Pax</option>
                                                        </select>
                                                    </td>
                                                    <td className="p-2 border border-slate-300 text-right">{rate?.serviceCost || 0}</td>
                                                    <td className="p-2 border border-slate-300 text-right">{rate?.languageAllowance || 0}</td>
                                                    <td className="p-2 border border-slate-300 text-right">{rate?.otherCost || 0}</td>
                                                    <td className="p-2 border border-slate-300">
                                                        <div className="flex gap-1 justify-center">
                                                            {rate ? (
                                                                <>
                                                                    <button 
                                                                        onClick={() => handleDirectSelectGuide(guide)}
                                                                        className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-[10px] font-bold flex items-center gap-1"
                                                                    >
                                                                        <Check size={10} /> Select
                                                                    </button>
                                                                    <button 
                                                                        onClick={() => handleAddPriceClick(guide)}
                                                                        className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-[10px] font-bold"
                                                                    >
                                                                        + Edit Price
                                                                    </button>
                                                                </>
                                                            ) : (
                                                                <button 
                                                                    onClick={() => handleAddPriceClick(guide)}
                                                                    className="w-full bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-[10px] font-bold"
                                                                >
                                                                    + Edit Price
                                                                </button>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                        {results.length === 0 && (
                                            <tr><td colSpan={8} className="p-8 text-center text-slate-400">No guides found matching criteria.</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="h-full flex flex-col overflow-hidden animate-in slide-in-from-right-4">
                        <div className="bg-white px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-slate-800">Add {guideFilterType === 'Tour Escort' ? 'TourEscort' : guideFilterType}</h2>
                            <button onClick={() => setGuideView('list')} className="text-slate-400 hover:text-slate-600">
                                <X size={24} />
                            </button>
                        </div>
                        <div className="p-8 bg-slate-50/50 flex-1">
                             <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 max-w-2xl mx-auto">
                                 <div className="space-y-4">
                                     <div>
                                         <label className="block text-xs font-semibold text-slate-500 mb-1">GUIDE SERVICE</label>
                                         <input 
                                            type="text" 
                                            value={newGuideName}
                                            onChange={e => setNewGuideName(e.target.value)}
                                            className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 border-l-4 border-l-red-500"
                                            placeholder="Enter Name"
                                         />
                                     </div>
                                     <div className="flex gap-3 pt-4">
                                         <button onClick={handleSaveNewGuide} className="bg-slate-800 text-white px-6 py-2 rounded text-sm font-bold hover:bg-slate-900">Save</button>
                                         <button onClick={() => setGuideView('list')} className="bg-slate-800 text-white px-6 py-2 rounded text-sm font-bold hover:bg-slate-900">Back To Search</button>
                                     </div>
                                 </div>
                             </div>
                        </div>
                    </div>
                )}

                {/* Edit Price Modal Overlay */}
                {selectedItem && (
                    <div className="absolute inset-0 bg-slate-900/50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-xl w-96 animate-in zoom-in-95">
                            <h4 className="font-bold text-lg mb-4 text-slate-800">Manual Rate Entry</h4>
                            <p className="text-sm text-slate-600 mb-4 font-medium">{selectedItem.name}</p>
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 mb-1">Cost</label>
                                    <input 
                                        type="number" 
                                        value={overrideCost} 
                                        onChange={(e) => setOverrideCost(e.target.value)} 
                                        className="w-full border border-slate-300 rounded px-3 py-2 outline-none focus:border-blue-500"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end gap-2 mt-6">
                                <button onClick={() => setSelectedItem(null)} className="px-4 py-2 text-sm text-slate-600 border border-slate-300 rounded hover:bg-slate-50">Cancel</button>
                                <button onClick={handleConfirmAdd} className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700">Add to Itinerary</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
      );
  }

  // --- RENDER FOR HOTEL TYPE ---
  if (type === 'hotel') {
      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col overflow-hidden font-sans">
                {hotelView === 'list' ? (
                    <>
                        {/* Header */}
                        <div className="flex justify-between items-center p-3 border-b border-slate-200 bg-white">
                            <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                            Guest Hotel | {date || 'Date Not Set'} | Pax Type: FIT
                            </h3>
                            <button onClick={onClose} className="text-slate-400 hover:text-red-500">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Filters */}
                        <div className="p-4 border-b border-slate-200 bg-slate-50 space-y-3">
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Select Destination</label>
                                    <select className="w-full border border-slate-300 rounded px-2 py-1.5 text-xs bg-white focus:border-blue-500 outline-none">
                                        <option>Selected Destination</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Destination</label>
                                    <select className="w-full border border-slate-300 rounded px-2 py-1.5 text-xs bg-white focus:border-blue-500 outline-none" defaultValue={city}>
                                        <option>{city || 'Select City'}</option>
                                        {initialDestinations.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Star Rating</label>
                                    <select 
                                        value={starRating} 
                                        onChange={e => setStarRating(e.target.value)} 
                                        className="w-full border border-slate-300 rounded px-2 py-1.5 text-xs bg-white focus:border-blue-500 outline-none"
                                    >
                                        <option>All</option>
                                        <option>3 Star</option>
                                        <option>4 Star</option>
                                        <option>5 Star</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Hotel Type</label>
                                    <select 
                                        value={hotelTypeFilter} 
                                        onChange={e => setHotelTypeFilter(e.target.value)}
                                        className="w-full border border-slate-300 rounded px-2 py-1.5 text-xs bg-white focus:border-blue-500 outline-none"
                                    >
                                        <option>All</option>
                                        <option>Heritage</option>
                                        <option>Business</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Room Type</label>
                                    <select 
                                        value={roomTypeFilter} 
                                        onChange={e => setRoomTypeFilter(e.target.value)}
                                        className="w-full border border-slate-300 rounded px-2 py-1.5 text-xs bg-white focus:border-blue-500 outline-none"
                                    >
                                        <option>All</option>
                                        <option>Deluxe</option>
                                        <option>Suite</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-6 gap-3 items-end">
                                <div className="md:col-span-2">
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Hotel Name</label>
                                    <input 
                                        type="text" 
                                        placeholder="Search Hotel" 
                                        value={searchQuery}
                                        onChange={e => setSearchQuery(e.target.value)}
                                        className="w-full border border-slate-300 rounded px-2 py-1.5 text-xs focus:border-blue-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Meal Type</label>
                                    <select 
                                        value={filterMealType} 
                                        onChange={e => setFilterMealType(e.target.value)}
                                        className="w-full border border-slate-300 rounded px-2 py-1.5 text-xs bg-white focus:border-blue-500 outline-none"
                                    >
                                        <option>All</option>
                                        <option>CP</option>
                                        <option>MAP</option>
                                        <option>AP</option>
                                    </select>
                                </div>
                                <div>
                                    <button className="w-full bg-slate-800 text-white px-4 py-1.5 rounded text-xs font-bold hover:bg-slate-900 flex items-center justify-center gap-2">
                                        <Search size={12} /> Search
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Results Header */}
                        <div className="flex justify-between items-center px-4 py-2 border-b border-slate-200 bg-white">
                            <span className="text-sm text-slate-700">{results.length} Hotel Found</span>
                            <button 
                                onClick={() => setHotelView('add')}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs font-bold flex items-center gap-1"
                            >
                                <Plus size={12} /> Add New
                            </button>
                        </div>

                        {/* Results Table */}
                        <div className="flex-1 overflow-auto bg-slate-50 p-4">
                            <div className="bg-white border border-slate-300">
                                <table className="w-full text-left text-xs border-collapse">
                                    <thead className="bg-slate-200 text-slate-700 font-bold sticky top-0 z-10">
                                        <tr>
                                            <th className="p-2 border border-slate-300">Hotel</th>
                                            <th className="p-2 border border-slate-300">Supplier</th>
                                            <th className="p-2 border border-slate-300">Category/HotelType</th>
                                            <th className="p-2 border border-slate-300">RoomType/Meal</th>
                                            <th className="p-2 border border-slate-300 text-center">Tariff Type</th>
                                            <th className="p-2 border border-slate-300 text-center">Rate Validate</th>
                                            <th className="p-2 border border-slate-300 text-center">Single</th>
                                            <th className="p-2 border border-slate-300 text-center w-40">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {results.map((hotel: any) => {
                                            const rate = getHotelRate(hotel.id);
                                            return (
                                                <tr key={hotel.id} className="hover:bg-blue-50">
                                                    <td className="p-2 border border-slate-300 font-medium text-slate-800">{hotel.name}</td>
                                                    <td className="p-2 border border-slate-300 text-slate-600 truncate max-w-[200px]" title={rate?.supplierName}>
                                                        {rate?.supplierName || '-'}
                                                    </td>
                                                    <td className="p-2 border border-slate-300 text-slate-600">{hotel.category}</td>
                                                    <td className="p-2 border border-slate-300 text-slate-600">
                                                        {rate ? `${rate.roomType}/${rate.mealPlan}` : '-'}
                                                    </td>
                                                    <td className="p-2 border border-slate-300 text-center text-slate-600">{rate?.tariffType || '-'}</td>
                                                    <td className="p-2 border border-slate-300 text-center text-slate-600 text-[10px]">
                                                        {rate ? `${rate.validFrom} / ${rate.validTo}` : '-'}
                                                    </td>
                                                    <td className="p-2 border border-slate-300 text-center text-slate-600 text-[10px]">
                                                        {rate?.rates.single || '-'}
                                                    </td>
                                                    <td className="p-2 border border-slate-300">
                                                        <div className="flex flex-col gap-1">
                                                            {rate ? (
                                                                <button 
                                                                    onClick={() => handleDirectSelectHotel(hotel)}
                                                                    className="w-full bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-[10px] font-bold flex items-center justify-center gap-1"
                                                                >
                                                                    <Check size={10} /> Select
                                                                </button>
                                                            ) : (
                                                                <button 
                                                                    onClick={() => handleAddPriceClick(hotel)}
                                                                    className="w-full bg-slate-700 hover:bg-slate-800 text-white px-2 py-1 rounded text-[10px] font-bold flex items-center justify-center gap-1"
                                                                >
                                                                    <Plus size={10} /> Add Price
                                                                </button>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                        {results.length === 0 && (
                                            <tr>
                                                <td colSpan={8} className="p-8 text-center text-slate-400">No hotels found.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="h-full flex flex-col overflow-hidden animate-in slide-in-from-right-4">
                        <div className="bg-white px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-slate-800">Add Hotel</h2>
                            <button onClick={() => setHotelView('list')} className="text-slate-400 hover:text-slate-600">
                                <X size={24} />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-slate-50/50">
                            {/* Main Info */}
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-500 mb-1">HOTEL CHAIN</label>
                                        <select 
                                            className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500"
                                            value={newHotel.chain}
                                            onChange={e => setNewHotel({...newHotel, chain: e.target.value})}
                                        >
                                            <option value="">Select</option>
                                            <option value="Taj">Taj</option>
                                            <option value="Oberoi">Oberoi</option>
                                            <option value="Independent">Independent</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-500 mb-1">HOTEL AMENITIES</label>
                                        <input 
                                            type="text" 
                                            className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500"
                                            placeholder="Wifi, Pool, etc."
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-500 mb-1">HOTEL NAME</label>
                                        <input 
                                            type="text" 
                                            value={newHotel.name}
                                            onChange={e => setNewHotel({...newHotel, name: e.target.value})}
                                            className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 border-l-4 border-l-red-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-500 mb-1">ROOM TYPE</label>
                                        <input 
                                            type="text" 
                                            className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 border-l-4 border-l-red-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-500 mb-1">DESTINATION</label>
                                        <select 
                                            value={newHotel.destination}
                                            onChange={e => setNewHotel({...newHotel, destination: e.target.value})}
                                            className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 border-l-4 border-l-red-500"
                                        >
                                            <option value="">Select</option>
                                            {initialDestinations.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-500 mb-1">SUPPLIER</label>
                                        <select 
                                            value={newHotel.selfSupplier}
                                            onChange={e => setNewHotel({...newHotel, selfSupplier: e.target.value as any})}
                                            className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500"
                                        >
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-500 mb-1">HOTEL CATEGORY</label>
                                        <select 
                                            value={newHotel.category}
                                            onChange={e => setNewHotel({...newHotel, category: e.target.value})}
                                            className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500"
                                        >
                                            {initialHotelCategories.map(c => <option key={c.id} value={c.categoryName}>{c.categoryName}</option>)}
                                        </select>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-500 mb-1">COUNTRY</label>
                                            <select 
                                                value={newHotel.country}
                                                onChange={e => setNewHotel({...newHotel, country: e.target.value})}
                                                className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 border-l-4 border-l-red-500"
                                            >
                                                <option value="">Select</option>
                                                {initialCountries.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-500 mb-1">STATE</label>
                                            <select 
                                                value={newHotel.state}
                                                onChange={e => setNewHotel({...newHotel, state: e.target.value})}
                                                className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500"
                                            >
                                                <option value="">Select</option>
                                                {initialStates.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-500 mb-1">HOTEL TYPE</label>
                                        <select 
                                            value={newHotel.type}
                                            onChange={e => setNewHotel({...newHotel, type: e.target.value})}
                                            className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500"
                                        >
                                            {initialHotelTypes.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
                                        </select>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-500 mb-1">CITY</label>
                                            <select 
                                                value={newHotel.city}
                                                onChange={e => setNewHotel({...newHotel, city: e.target.value})}
                                                className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500"
                                            >
                                                <option value="">Select</option>
                                                {initialCities.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-500 mb-1">PIN CODE</label>
                                            <input 
                                                type="text" 
                                                value={newHotel.pinCode}
                                                onChange={e => setNewHotel({...newHotel, pinCode: e.target.value})}
                                                className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-500 mb-1">HOTEL LINK</label>
                                        <input 
                                            type="text" 
                                            value={newHotel.website}
                                            onChange={e => setNewHotel({...newHotel, website: e.target.value})}
                                            className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-500 mb-1">ADDRESS</label>
                                        <input 
                                            type="text" 
                                            value={newHotel.address}
                                            onChange={e => setNewHotel({...newHotel, address: e.target.value})}
                                            className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-500 mb-1">WEEKEND DAYS</label>
                                        <select 
                                            value={newHotel.weekendDays}
                                            onChange={e => setNewHotel({...newHotel, weekendDays: e.target.value})}
                                            className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500"
                                        >
                                            <option value="FSS">FSS</option>
                                            <option value="SS">SS</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-500 mb-1">GSTN</label>
                                        <input 
                                            type="text" 
                                            value={newHotel.gstn}
                                            onChange={e => setNewHotel({...newHotel, gstn: e.target.value})}
                                            className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-500 mb-1">DAYS</label>
                                        <input 
                                            type="text" 
                                            className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-500 mb-1">HOTEL STATUS (ACTIVE/INACTIVE)</label>
                                        <select 
                                            value={newHotel.status}
                                            onChange={e => setNewHotel({...newHotel, status: e.target.value as any})}
                                            className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500"
                                        >
                                            <option value="Active">Active</option>
                                            <option value="Inactive">Inactive</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Time & Contact */}
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                                <div className="grid grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-500 mb-1">CHECK-IN TIME</label>
                                        <input type="time" value={newHotel.checkInTime} onChange={e => setNewHotel({...newHotel, checkInTime: e.target.value})} className="w-full border border-slate-300 rounded px-3 py-2 text-sm"/>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-500 mb-1">CHECK-OUT TIME</label>
                                        <input type="time" value={newHotel.checkOutTime} onChange={e => setNewHotel({...newHotel, checkOutTime: e.target.value})} className="w-full border border-slate-300 rounded px-3 py-2 text-sm"/>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center gap-4 mb-4">
                                        <label className="text-xs font-semibold text-slate-500 uppercase">CONTACT PERSON</label>
                                        <button onClick={addNewHotelContact} className="bg-blue-500 text-white px-3 py-1 rounded text-[10px] font-bold hover:bg-blue-600 uppercase">+ Add More</button>
                                    </div>
                                    {newHotel.contacts?.map((contact, idx) => (
                                        <div key={contact.id} className="grid grid-cols-4 gap-4 mb-4 p-4 border border-slate-100 rounded bg-slate-50">
                                            <div>
                                                <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Title</label>
                                                <select className="w-full border border-slate-300 rounded px-2 py-1 text-sm" value={contact.title} onChange={e => updateNewHotelContact(contact.id, 'title', e.target.value)}><option>Mr.</option><option>Ms.</option></select>
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">First Name</label>
                                                <input type="text" className="w-full border border-slate-300 rounded px-2 py-1 text-sm" value={contact.firstName} onChange={e => updateNewHotelContact(contact.id, 'firstName', e.target.value)}/>
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Last Name</label>
                                                <input type="text" className="w-full border border-slate-300 rounded px-2 py-1 text-sm" value={contact.lastName} onChange={e => updateNewHotelContact(contact.id, 'lastName', e.target.value)}/>
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Designation</label>
                                                <input type="text" className="w-full border border-slate-300 rounded px-2 py-1 text-sm" value={contact.designation} onChange={e => updateNewHotelContact(contact.id, 'designation', e.target.value)}/>
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Country Code</label>
                                                <input type="text" className="w-full border border-slate-300 rounded px-2 py-1 text-sm" value={contact.countryCode} onChange={e => updateNewHotelContact(contact.id, 'countryCode', e.target.value)}/>
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Phone 1</label>
                                                <input type="text" className="w-full border border-slate-300 rounded px-2 py-1 text-sm" value={contact.phone1} onChange={e => updateNewHotelContact(contact.id, 'phone1', e.target.value)}/>
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Phone 2</label>
                                                <input type="text" className="w-full border border-slate-300 rounded px-2 py-1 text-sm" value={contact.phone2 || ''} onChange={e => updateNewHotelContact(contact.id, 'phone2', e.target.value)}/>
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Phone 3</label>
                                                <input type="text" className="w-full border border-slate-300 rounded px-2 py-1 text-sm" value={contact.phone3 || ''} onChange={e => updateNewHotelContact(contact.id, 'phone3', e.target.value)}/>
                                            </div>
                                            <div className="col-span-2">
                                                <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Primary Email</label>
                                                <input type="email" className="w-full border border-slate-300 rounded px-2 py-1 text-sm border-l-4 border-l-green-500" value={contact.email} onChange={e => updateNewHotelContact(contact.id, 'email', e.target.value)}/>
                                            </div>
                                            <div className="col-span-2">
                                                <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Secondary Email</label>
                                                <input type="email" className="w-full border border-slate-300 rounded px-2 py-1 text-sm border-l-4 border-l-green-500" value={contact.secondaryEmail || ''} onChange={e => updateNewHotelContact(contact.id, 'secondaryEmail', e.target.value)}/>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                             {/* Info & Policy */}
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase">HOTEL INFORMATION</label>
                                    <textarea className="w-full border border-slate-300 rounded px-3 py-2 text-sm h-24 resize-none outline-none" value={newHotel.description || ''} onChange={e => setNewHotel({...newHotel, description: e.target.value})}></textarea>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase">POLICY</label>
                                    <textarea className="w-full border border-slate-300 rounded px-3 py-2 text-sm h-20 resize-none outline-none" value={newHotel.policy || ''} onChange={e => setNewHotel({...newHotel, policy: e.target.value})}></textarea>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase">T&C</label>
                                    <textarea className="w-full border border-slate-300 rounded px-3 py-2 text-sm h-20 resize-none outline-none" value={newHotel.terms || ''} onChange={e => setNewHotel({...newHotel, terms: e.target.value})}></textarea>
                                </div>
                            </div>
                        </div>
                        
                        <div className="p-4 bg-slate-800 flex justify-end gap-3 border-t border-slate-700">
                            <button onClick={handleSaveNewHotel} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-full font-bold text-sm shadow-lg">Save</button>
                            <button onClick={() => setHotelView('list')} className="bg-white text-slate-800 hover:bg-slate-100 px-6 py-2 rounded-full font-bold text-sm">Cancel</button>
                        </div>
                    </div>
                )}

                {/* Edit Price Modal Overlay */}
                {selectedItem && (
                    <div className="absolute inset-0 bg-slate-900/50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-xl w-96 animate-in zoom-in-95">
                            <h4 className="font-bold text-lg mb-4 text-slate-800">Manual Rate Entry</h4>
                            <p className="text-sm text-slate-600 mb-4 font-medium">{selectedItem.name}</p>
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 mb-1">Room Type</label>
                                    <select className="w-full border border-slate-300 rounded px-2 py-1.5 text-xs bg-white">
                                        <option>Standard</option>
                                        <option>Deluxe</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 mb-1">Meal Plan</label>
                                    <select className="w-full border border-slate-300 rounded px-2 py-1.5 text-xs bg-white">
                                        <option>CP</option>
                                        <option>MAP</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 mb-1">Cost</label>
                                    <input 
                                        type="number" 
                                        value={overrideCost} 
                                        onChange={(e) => setOverrideCost(e.target.value)} 
                                        className="w-full border border-slate-300 rounded px-3 py-2 outline-none focus:border-blue-500"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end gap-2 mt-6">
                                <button onClick={() => setSelectedItem(null)} className="px-4 py-2 text-sm text-slate-600 border border-slate-300 rounded hover:bg-slate-50">Cancel</button>
                                <button onClick={handleConfirmAdd} className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700">Add to Itinerary</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
      );
  }

  // --- RENDER FOR OTHER TYPES (Generic) ---
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div>
            <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2 capitalize">
              {type === 'flight' && <Plane className="text-orange-500" size={20} />}
              {type === 'transport' && <Bus className="text-orange-600" size={20} />}
              {type === 'restaurant' && <Utensils className="text-red-500" size={20} />}
              {type === 'additional' && <Sparkles className="text-purple-500" size={20} />}
              Add {type} Service
            </h3>
            <p className="text-xs text-slate-500">Select services for {city || 'Itinerary'}</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-red-500 transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-slate-100 bg-white">
           <div className="flex gap-4">
              <div className="relative flex-1">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                 <input 
                   type="text" 
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   placeholder={`Search ${type}s...`}
                   className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                   autoFocus
                 />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm hover:bg-slate-200">
                 <Filter size={16} /> Filters
              </button>
           </div>
        </div>

        {/* Results Body */}
        <div className="flex-1 overflow-y-auto p-4 bg-slate-50/50">
           {results.length === 0 ? (
             <div className="text-center py-12 text-slate-400">
               <p>No results found for "{searchQuery}"</p>
             </div>
           ) : (
             <div className="space-y-3">
               {results.map((item: any) => (
                 <div 
                   key={item.id} 
                   onClick={() => handleSelect(item)}
                   className={`bg-white border rounded-xl p-4 cursor-pointer transition-all flex justify-between items-center group ${
                     selectedItem?.id === item.id 
                     ? 'border-blue-500 ring-1 ring-blue-500 shadow-md' 
                     : 'border-slate-200 hover:border-blue-300 hover:shadow-sm'
                   }`}
                 >
                    <div>
                       <h4 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{item.name}</h4>
                       <div className="text-xs text-slate-500 flex gap-3 mt-1">
                          {type === 'flight' && <span>{item.sector} • {item.time}</span>}
                          {type === 'transport' && <span>{item.type} • {item.duration}</span>}
                          {type === 'restaurant' && <span className="text-red-600 font-medium">{item.mealType} • {item.supplier}</span>}
                          {type === 'additional' && <span className="text-purple-600 font-medium">{item.costType} • {item.supplier}</span>}
                       </div>
                    </div>
                    
                    <div className="text-right">
                       <div className="font-bold text-slate-800 text-lg">${item.cost}</div>
                       {item.supplier && <div className="text-[10px] text-slate-400 uppercase">By {item.supplier}</div>}
                    </div>
                 </div>
               ))}
             </div>
           )}
        </div>

        {/* Footer / Action Bar */}
        {selectedItem && (
          <div className="p-4 bg-white border-t border-slate-100 shadow-lg animate-in slide-in-from-bottom-2">
             <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex-1 w-full md:w-auto flex items-center gap-4">
                   <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Confirm Price</label>
                      <div className="relative w-32">
                         <DollarSign size={14} className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400"/>
                         <input 
                           type="number" 
                           value={overrideCost}
                           onChange={(e) => setOverrideCost(e.target.value)}
                           className="w-full pl-6 pr-2 py-1.5 border border-slate-300 rounded text-sm font-bold text-slate-800 outline-none focus:border-blue-500"
                         />
                      </div>
                   </div>

                   {/* Restaurant Meal Type */}
                   {type === 'restaurant' && (
                       <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Meal Type</label>
                          <select 
                            value={mealType}
                            onChange={(e) => setMealType(e.target.value as any)}
                            className="border border-slate-300 rounded px-2 py-1.5 text-sm bg-white outline-none focus:border-red-500"
                          >
                            <option value="Lunch">Lunch</option>
                            <option value="Dinner">Dinner</option>
                          </select>
                       </div>
                   )}

                   {/* Additional Service Cost Type */}
                   {type === 'additional' && (
                       <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Cost Type</label>
                          <div className="flex bg-slate-100 rounded p-1 gap-1">
                             <button 
                               onClick={() => setCostType('Per Person')}
                               className={`px-2 py-0.5 text-xs rounded transition-colors ${costType === 'Per Person' ? 'bg-white shadow text-slate-800' : 'text-slate-500'}`}
                             >
                               <span className="inline mr-1 font-bold">PP</span>
                             </button>
                             <button 
                               onClick={() => setCostType('Group Cost')}
                               className={`px-2 py-0.5 text-xs rounded transition-colors ${costType === 'Group Cost' ? 'bg-white shadow text-slate-800' : 'text-slate-500'}`}
                             >
                               <span className="inline mr-1 font-bold">GRP</span>
                             </button>
                          </div>
                       </div>
                   )}
                </div>
                
                <div className="flex gap-2">
                   <button onClick={() => setSelectedItem(null)} className="px-4 py-2 text-sm text-slate-500 hover:bg-slate-100 rounded-lg">Cancel</button>
                   <button 
                     onClick={handleConfirmAdd}
                     className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-bold flex items-center gap-2 shadow-lg shadow-blue-900/20"
                   >
                      <Plus size={16} /> Add to Itinerary
                   </button>
                </div>
             </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ServiceModals;
