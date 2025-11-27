
import React, { useState } from 'react';
import { Search, Filter, Plus, DollarSign, X, Building2, Plane, Flag, Utensils, Sparkles, Bus } from 'lucide-react';

interface ServiceModalsProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'hotel' | 'flight' | 'transport' | 'activity' | 'restaurant' | 'additional';
  city: string;
  onAdd: (serviceData: any) => void;
}

// Mock Master Data
const mockHotels = [
  { id: 'h1', name: 'Hilton Tokyo', city: 'Tokyo', type: 'Deluxe', cost: 250, supplier: 'Agoda' },
  { id: 'h2', name: 'Hotel Sunroute Plaza', city: 'Tokyo', type: 'Standard', cost: 120, supplier: 'Direct' },
  { id: 'h3', name: 'Kyoto Granvia', city: 'Kyoto', type: 'Luxury', cost: 350, supplier: 'Expedia' },
  { id: 'h4', name: 'Ritz Carlton', city: 'Osaka', type: 'Luxury', cost: 500, supplier: 'HotelBeds' },
];

const mockFlights = [
  { id: 'f1', name: 'JAL 501', sector: 'Tokyo - Sapporo', time: '10:00 - 11:30', cost: 150 },
  { id: 'f2', name: 'ANA 202', sector: 'Osaka - Tokyo', time: '14:00 - 15:10', cost: 180 },
];

const mockActivities = [
  { id: 'a1', name: 'Tokyo Tower Visit', type: 'Monument', duration: '2 Hours', cost: 30 },
  { id: 'a2', name: 'Full Day City Tour', type: 'Activity', duration: '8 Hours', cost: 100 },
  { id: 'a3', name: 'English Speaking Guide', type: 'Guide', duration: 'Full Day', cost: 150 },
  { id: 'a4', name: 'Airport Transfer (Sedan)', type: 'Transfer', duration: '1 Hour', cost: 80 },
];

const mockRestaurants = [
  { id: 'r1', name: 'Tokyo Sushi Bar', type: 'Lunch', cost: 50, supplier: 'Direct', mealType: 'Lunch' },
  { id: 'r2', name: 'Indian Spice', type: 'Dinner', cost: 40, supplier: 'Direct', mealType: 'Dinner' },
];

const mockAdditionals = [
  { id: 'm1', name: 'SIM Card', type: 'Misc', cost: 20, supplier: 'Direct', costType: 'Per Person' },
  { id: 'm2', name: 'Visa Fee', type: 'Visa', cost: 100, supplier: 'Embassy', costType: 'Per Person' },
  { id: 'm3', name: 'Gala Dinner Supplement', type: 'Event', cost: 500, supplier: 'Hotel', costType: 'Group Cost' },
];

const ServiceModals: React.FC<ServiceModalsProps> = ({ isOpen, onClose, type, city, onAdd }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [overrideCost, setOverrideCost] = useState<number | string>('');
  
  // Specific State for New Modules
  const [mealType, setMealType] = useState<'Lunch' | 'Dinner'>('Dinner');
  const [costType, setCostType] = useState<'Per Person' | 'Group Cost'>('Per Person');

  if (!isOpen) return null;

  // Filter Data
  const getResults = () => {
    const query = searchQuery.toLowerCase();
    switch (type) {
      case 'hotel':
        return mockHotels.filter(h => h.name.toLowerCase().includes(query) || h.city.toLowerCase().includes(query));
      case 'flight':
        return mockFlights.filter(f => f.name.toLowerCase().includes(query) || f.sector.toLowerCase().includes(query));
      case 'transport':
      case 'activity':
        return mockActivities.filter(a => a.name.toLowerCase().includes(query) || a.type.toLowerCase().includes(query));
      case 'restaurant':
        return mockRestaurants.filter(r => r.name.toLowerCase().includes(query));
      case 'additional':
        return mockAdditionals.filter(m => m.name.toLowerCase().includes(query) || m.type.toLowerCase().includes(query));
      default:
        return [];
    }
  };

  const results = getResults();

  const handleSelect = (item: any) => {
    setSelectedItem(item);
    setOverrideCost(item.cost);
    // Defaults
    if (type === 'restaurant') setMealType(item.mealType || 'Dinner');
    if (type === 'additional') setCostType(item.costType || 'Per Person');
  };

  const handleConfirmAdd = () => {
    if (!selectedItem) return;
    
    // Construct the payload based on type
    const payload: any = { ...selectedItem, cost: Number(overrideCost) };
    
    // Specific Mapping
    if (type === 'hotel') {
       Object.assign(payload, { roomType: 'Standard', mealPlan: 'CP', checkIn: '14:00', checkOut: '11:00' });
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div>
            <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2 capitalize">
              {type === 'hotel' && <Building2 className="text-blue-500" size={20} />}
              {type === 'flight' && <Plane className="text-orange-500" size={20} />}
              {type === 'activity' && <Flag className="text-green-500" size={20} />}
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
               {results.map((item) => (
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
                          {type === 'hotel' && <span>{item.type} • {item.city}</span>}
                          {type === 'flight' && <span>{item.sector} • {item.time}</span>}
                          {(type === 'activity' || type === 'transport') && <span>{item.type} • {item.duration}</span>}
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

                   {/* Module 26 Extension: Restaurant Meal Type */}
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

                   {/* Module 26 Extension: Additional Service Cost Type */}
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
    