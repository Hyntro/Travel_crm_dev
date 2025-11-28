
import React, { useState } from 'react';
import { ArrowLeft, Search, Plus, Calendar, Image as ImageIcon } from 'lucide-react';
import { HotelMaster, HotelRestriction } from '../types';
import { initialHotels, initialDestinations } from './mockData';

interface HotelOperationRestrictionProps {
  onBack: () => void;
}

const HotelOperationRestriction: React.FC<HotelOperationRestrictionProps> = ({ onBack }) => {
  const [hotels, setHotels] = useState<HotelMaster[]>(initialHotels);
  const [restrictions, setRestrictions] = useState<HotelRestriction[]>([]);
  
  // Filters
  const [filterDestination, setFilterDestination] = useState('');
  const [filterHotel, setFilterHotel] = useState('');
  const [dateFrom, setDateFrom] = useState('2025-11-28');
  const [dateTo, setDateTo] = useState('2027-11-28');

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [currentRestriction, setCurrentRestriction] = useState<Partial<HotelRestriction>>({});
  const [selectedHotel, setSelectedHotel] = useState<HotelMaster | null>(null);

  const handleAddRestriction = (hotel: HotelMaster) => {
    setSelectedHotel(hotel);
    const existing = restrictions.find(r => r.hotelId === hotel.id);
    setCurrentRestriction(existing || { hotelId: hotel.id, fromDate: '', toDate: '', reason: '' });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!selectedHotel || !currentRestriction.fromDate || !currentRestriction.toDate) return;
    
    const newRestriction: HotelRestriction = {
        id: currentRestriction.id || Math.random().toString(),
        hotelId: selectedHotel.id,
        fromDate: currentRestriction.fromDate!,
        toDate: currentRestriction.toDate!,
        reason: currentRestriction.reason || ''
    };

    setRestrictions(prev => {
        const others = prev.filter(r => r.hotelId !== selectedHotel.id);
        return [...others, newRestriction];
    });
    
    setShowModal(false);
  };

  const filteredHotels = hotels.filter(h => {
      const matchDest = !filterDestination || h.destination === filterDestination;
      const matchName = !filterHotel || h.name === filterHotel;
      return matchDest && matchName;
  });

  return (
    <div className="h-full flex flex-col animate-in fade-in slide-in-from-right-4 duration-300">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
          <button onClick={onBack} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Hotel Operation Restriction</h2>
          </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-6 flex flex-wrap gap-4 items-end">
         <div className="w-48">
            <select 
              value={filterDestination} 
              onChange={e => setFilterDestination(e.target.value)} 
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
               <option value="">Select Destination</option>
               {initialDestinations.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
            </select>
         </div>
         <div className="w-48">
            <select 
              value={filterHotel} 
              onChange={e => setFilterHotel(e.target.value)} 
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
               <option value="">Select Hotel</option>
               {hotels.map(h => <option key={h.id} value={h.name}>{h.name}</option>)}
            </select>
         </div>
         <div className="w-32">
            <input 
              type="date" 
              value={dateFrom} 
              onChange={e => setDateFrom(e.target.value)} 
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
         </div>
         <div className="w-32">
            <input 
              type="date" 
              value={dateTo} 
              onChange={e => setDateTo(e.target.value)} 
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
         </div>
         <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg text-sm font-medium shadow-sm flex items-center gap-2">
            <Search size={16}/> Search
         </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 flex-1 overflow-hidden flex flex-col">
         <div className="overflow-x-auto flex-1">
            <table className="w-full text-left">
               <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                     <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Sr.</th>
                     <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Image</th>
                     <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Hotel Chain Name</th>
                     <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Name</th>
                     <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Location</th>
                     <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Category</th>
                     <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">From Date</th>
                     <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">To Date</th>
                     <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Reason</th>
                     <th className="px-6 py-3 text-right text-xs font-bold text-slate-500 uppercase">Operation Restriction</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {filteredHotels.map((hotel, index) => {
                     const restriction = restrictions.find(r => r.hotelId === hotel.id);
                     return (
                        <tr key={hotel.id} className="hover:bg-slate-50 transition-colors">
                           <td className="px-6 py-4 text-sm text-slate-500">{index + 1}</td>
                           <td className="px-6 py-4">
                              <div className="w-10 h-10 bg-slate-200 rounded flex items-center justify-center">
                                 <ImageIcon size={16} className="text-slate-400"/>
                              </div>
                           </td>
                           <td className="px-6 py-4 text-sm text-slate-600">{hotel.chain}</td>
                           <td className="px-6 py-4 text-sm font-medium text-slate-800">{hotel.name}</td>
                           <td className="px-6 py-4 text-sm text-slate-600">{hotel.city}, {hotel.country}</td>
                           <td className="px-6 py-4 text-sm text-slate-600">{hotel.category}</td>
                           <td className="px-6 py-4 text-sm text-slate-600">{restriction?.fromDate || '-'}</td>
                           <td className="px-6 py-4 text-sm text-slate-600">{restriction?.toDate || '-'}</td>
                           <td className="px-6 py-4 text-sm text-slate-600">{restriction?.reason || '-'}</td>
                           <td className="px-6 py-4 text-right">
                              <button 
                                onClick={() => handleAddRestriction(hotel)}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded text-xs font-bold shadow-sm inline-flex items-center gap-1"
                              >
                                 + Operation Restriction
                              </button>
                           </td>
                        </tr>
                     );
                  })}
               </tbody>
            </table>
         </div>
      </div>

      {/* Modal */}
      {showModal && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
               <div className="bg-slate-800 px-6 py-4">
                  <h3 className="text-lg font-bold text-white">Add Restriction</h3>
                  <p className="text-xs text-slate-300">{selectedHotel?.name}</p>
               </div>
               <div className="p-6 space-y-4">
                  <div>
                     <label className="block text-xs font-semibold text-slate-500 mb-1">From Date</label>
                     <input type="date" value={currentRestriction.fromDate || ''} onChange={e => setCurrentRestriction({...currentRestriction, fromDate: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                     <label className="block text-xs font-semibold text-slate-500 mb-1">To Date</label>
                     <input type="date" value={currentRestriction.toDate || ''} onChange={e => setCurrentRestriction({...currentRestriction, toDate: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                     <label className="block text-xs font-semibold text-slate-500 mb-1">Reason</label>
                     <textarea 
                        value={currentRestriction.reason || ''} 
                        onChange={e => setCurrentRestriction({...currentRestriction, reason: e.target.value})} 
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
                        placeholder="Enter reason for restriction..."
                     />
                  </div>
               </div>
               <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                  <button onClick={handleSave} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-medium shadow-sm">Save</button>
                  <button onClick={() => setShowModal(false)} className="px-6 py-2 border border-slate-300 text-slate-600 hover:bg-slate-50 rounded-full text-sm font-medium">Cancel</button>
               </div>
            </div>
         </div>
      )}
    </div>
  );
};

export default HotelOperationRestriction;
