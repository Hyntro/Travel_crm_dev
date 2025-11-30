

import React, { useState } from 'react';
import { ArrowLeft, Plus, Search, Download, Upload, History, FileSpreadsheet, Eye, Edit, Trash2, X, Image as ImageIcon, MapPin, Save, Calendar } from 'lucide-react';
import { HotelMaster, HotelContact, HotelTariff } from '../types';
import { initialHotels, initialCountries, initialStates, initialCities, mockAmenitiesList, mockRoomTypesList, initialHotelCategories, initialHotelTypes, initialDestinations, initialTariffs } from './mockData';

interface HotelMasterProps {
  onBack: () => void;
}

const HotelMaster: React.FC<HotelMasterProps> = ({ onBack }) => {
  const [hotels, setHotels] = useState<HotelMaster[]>(initialHotels);
  const [view, setView] = useState<'list' | 'form' | 'rates'>('list');
  const [currentHotel, setCurrentHotel] = useState<Partial<HotelMaster>>({
    status: 'Active',
    weekendDays: 'FSS',
    checkInTime: '12:00',
    checkOutTime: '11:00',
    selfSupplier: 'Yes',
    amenities: [],
    roomTypes: [],
    contacts: [{ id: '1', title: 'Mr.', firstName: '', lastName: '', designation: '', countryCode: '+91', phone1: '', email: '', isForContactList: false }]
  });

  // Tariff State
  const [tariffs, setTariffs] = useState<HotelTariff[]>(initialTariffs);
  const [showAddTariff, setShowAddTariff] = useState(false);
  const [newTariff, setNewTariff] = useState<Partial<HotelTariff>>({
      marketType: 'General',
      paxType: 'FIT',
      tariffType: 'Normal',
      seasonType: 'Summer',
      status: 'Active',
      currency: 'INR',
      rates: {
          single: 0, double: 0, extraBedAdult: 0, extraBedChild: 0, childWithBed: 0,
          tacPercentage: 0, roomTaxSlab: 'TAXINC', mealTaxSlab: 'GSTInclusive', markupType: '%', markupCost: 0
      },
      mealRates: { breakfastAdult: 0, lunchAdult: 0, dinnerAdult: 0, breakfastChild: 0, lunchChild: 0, dinnerChild: 0 }
  });

  // Filters
  const [filterKeyword, setFilterKeyword] = useState('');
  const [filterDestination, setFilterDestination] = useState('All');
  const [filterHotelName, setFilterHotelName] = useState('All');

  const handleSave = () => {
    if (!currentHotel.name) return;
    
    if (currentHotel.id) {
      setHotels(prev => prev.map(h => h.id === currentHotel.id ? { ...h, ...currentHotel } as HotelMaster : h));
    } else {
      setHotels(prev => [...prev, { ...currentHotel, id: Math.random().toString() } as HotelMaster]);
    }
    setView('list');
    resetForm();
  };

  const resetForm = () => {
    setCurrentHotel({
        status: 'Active',
        weekendDays: 'FSS',
        checkInTime: '12:00',
        checkOutTime: '11:00',
        selfSupplier: 'Yes',
        amenities: [],
        roomTypes: [],
        contacts: [{ id: Math.random().toString(), title: 'Mr.', firstName: '', lastName: '', designation: '', countryCode: '+91', phone1: '', email: '', isForContactList: false }]
    });
  }

  const handleEdit = (hotel: HotelMaster) => {
    setCurrentHotel({ ...hotel });
    setView('form');
  };

  const handleViewRates = (hotel: HotelMaster) => {
      setCurrentHotel({ ...hotel });
      setView('rates');
  };

  const handleSaveTariff = () => {
      if(!currentHotel.id) return;
      const tariff: HotelTariff = {
          ...newTariff as HotelTariff,
          id: Math.random().toString(),
          hotelId: currentHotel.id,
          // Ensure nested objects are populated if missing in partial state
          rates: newTariff.rates || { single:0, double:0, extraBedAdult:0, extraBedChild:0, childWithBed:0, tacPercentage:0, roomTaxSlab:'TAXINC', mealTaxSlab:'GSTInclusive', markupType:'%', markupCost:0 },
          mealRates: newTariff.mealRates || { breakfastAdult:0, lunchAdult:0, dinnerAdult:0, breakfastChild:0, lunchChild:0, dinnerChild:0 }
      };
      setTariffs([...tariffs, tariff]);
      setShowAddTariff(false);
      // Reset tariff form
      setNewTariff({
        marketType: 'General', paxType: 'FIT', tariffType: 'Normal', seasonType: 'Summer', status: 'Active', currency: 'INR',
        rates: { single: 0, double: 0, extraBedAdult: 0, extraBedChild: 0, childWithBed: 0, tacPercentage: 0, roomTaxSlab: 'TAXINC', mealTaxSlab: 'GSTInclusive', markupType: '%', markupCost: 0 },
        mealRates: { breakfastAdult: 0, lunchAdult: 0, dinnerAdult: 0, breakfastChild: 0, lunchChild: 0, dinnerChild: 0 }
      });
  };

  const toggleSelection = (list: string[], item: string) => {
    if (list.includes(item)) return list.filter(i => i !== item);
    return [...list, item];
  };

  const updateContact = (id: string, field: keyof HotelContact, value: any) => {
    const updatedContacts = currentHotel.contacts?.map(c => 
      c.id === id ? { ...c, [field]: value } : c
    );
    setCurrentHotel({ ...currentHotel, contacts: updatedContacts });
  };

  const addContact = () => {
    const newContact: HotelContact = {
      id: Math.random().toString(),
      title: 'Mr.', firstName: '', lastName: '', designation: '', countryCode: '+91', phone1: '', email: '', isForContactList: false
    };
    setCurrentHotel({ ...currentHotel, contacts: [...(currentHotel.contacts || []), newContact] });
  };

  const removeContact = (id: string) => {
    setCurrentHotel({ ...currentHotel, contacts: currentHotel.contacts?.filter(c => c.id !== id) });
  };

  const filteredHotels = hotels.filter(h => {
    const matchesKeyword = h.name.toLowerCase().includes(filterKeyword.toLowerCase()) || h.chain.toLowerCase().includes(filterKeyword.toLowerCase());
    const matchesDest = filterDestination === 'All' || h.destination === filterDestination;
    const matchesName = filterHotelName === 'All' || h.name === filterHotelName;
    return matchesKeyword && matchesDest && matchesName;
  });

  const hotelTariffs = tariffs.filter(t => t.hotelId === currentHotel.id || t.hotelId === 'h1'); // Show mock data for demo

  // --- RATE SHEET VIEW ---
  if (view === 'rates') {
      return (
          <div className="h-full flex flex-col bg-slate-50 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="bg-white px-6 py-4 border-b border-slate-200 flex justify-between items-center shadow-sm">
                  <div className="flex items-center gap-4">
                      <button onClick={() => setView('list')} className="bg-white border border-slate-300 text-slate-700 px-4 py-1.5 rounded-full text-sm font-medium hover:bg-slate-50">Back</button>
                      <h2 className="text-xl font-bold text-slate-800">Hotel: {currentHotel.name}</h2>
                  </div>
                  <div className="flex items-center gap-4">
                      <h3 className="text-lg font-bold text-slate-800">Hotel Type: Option 1</h3>
                      <button 
                        onClick={() => setShowAddTariff(!showAddTariff)} 
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-sm flex items-center gap-2"
                      >
                          <Plus size={16} /> Add Tariff
                      </button>
                  </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                  {showAddTariff && (
                      <div className="bg-white border border-green-200 rounded-lg shadow-sm mb-6 overflow-hidden">
                          <div className="bg-green-100 px-4 py-2 border-b border-green-200">
                              <h4 className="font-bold text-green-800 text-sm">Add Tariff</h4>
                          </div>
                          <div className="p-4 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 gap-3">
                              {/* Row 1 */}
                              <div className="col-span-1">
                                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Market Type</label>
                                  <select className="w-full border border-slate-300 rounded px-2 py-1 text-xs bg-white" value={newTariff.marketType} onChange={e => setNewTariff({...newTariff, marketType: e.target.value})}>
                                      <option>General</option><option>Corporate</option>
                                  </select>
                                  <div className="h-0.5 w-8 bg-red-500 mt-1"></div>
                              </div>
                              <div className="col-span-2">
                                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Supplier Name</label>
                                  <select className="w-full border border-slate-300 rounded px-2 py-1 text-xs bg-white" value={newTariff.supplierName} onChange={e => setNewTariff({...newTariff, supplierName: e.target.value})}>
                                      <option>{currentHotel.name} - [SU000782]</option>
                                  </select>
                              </div>
                              <div className="col-span-1">
                                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Pax Type</label>
                                  <select className="w-full border border-slate-300 rounded px-2 py-1 text-xs bg-white" value={newTariff.paxType} onChange={e => setNewTariff({...newTariff, paxType: e.target.value})}>
                                      <option>FIT</option><option>GIT</option>
                                  </select>
                              </div>
                              <div className="col-span-1">
                                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Tarif Type</label>
                                  <select className="w-full border border-slate-300 rounded px-2 py-1 text-xs bg-white" value={newTariff.tariffType} onChange={e => setNewTariff({...newTariff, tariffType: e.target.value})}>
                                      <option>Normal</option><option>Special</option>
                                  </select>
                                  <div className="h-0.5 w-8 bg-red-500 mt-1"></div>
                              </div>
                              <div className="col-span-1">
                                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Season Type</label>
                                  <select className="w-full border border-slate-300 rounded px-2 py-1 text-xs bg-white" value={newTariff.seasonType} onChange={e => setNewTariff({...newTariff, seasonType: e.target.value})}>
                                      <option>Summer</option><option>Winter</option>
                                  </select>
                                  <div className="h-0.5 w-8 bg-red-500 mt-1"></div>
                              </div>
                              <div className="col-span-1">
                                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Season Year</label>
                                  <select className="w-full border border-slate-300 rounded px-2 py-1 text-xs bg-white" value={newTariff.seasonYear} onChange={e => setNewTariff({...newTariff, seasonYear: e.target.value})}>
                                      <option>Select</option><option>2024</option><option>2025</option>
                                  </select>
                              </div>
                              <div className="col-span-1">
                                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Rate Valid From</label>
                                  <div className="relative">
                                      <input type="date" className="w-full border border-slate-300 rounded px-2 py-1 text-xs" value={newTariff.validFrom} onChange={e => setNewTariff({...newTariff, validFrom: e.target.value})}/>
                                      <div className="h-0.5 w-8 bg-red-500 mt-1"></div>
                                  </div>
                              </div>

                              {/* Row 2 */}
                              <div className="col-span-1">
                                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Rate Valid To</label>
                                  <div className="relative">
                                      <input type="date" className="w-full border border-slate-300 rounded px-2 py-1 text-xs" value={newTariff.validTo} onChange={e => setNewTariff({...newTariff, validTo: e.target.value})}/>
                                      <div className="h-0.5 w-8 bg-red-500 mt-1"></div>
                                  </div>
                              </div>
                              <div className="col-span-1">
                                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Status</label>
                                  <select className="w-full border border-slate-300 rounded px-2 py-1 text-xs bg-white" value={newTariff.status} onChange={e => setNewTariff({...newTariff, status: e.target.value as any})}>
                                      <option>Active</option><option>Inactive</option>
                                  </select>
                              </div>
                              <div className="col-span-2">
                                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Room Type</label>
                                  <select className="w-full border border-slate-300 rounded px-2 py-1 text-xs bg-white" value={newTariff.roomType} onChange={e => setNewTariff({...newTariff, roomType: e.target.value})}>
                                      <option>Select</option>
                                      {mockRoomTypesList.map(r => <option key={r} value={r}>{r}</option>)}
                                  </select>
                                  <div className="h-0.5 w-8 bg-red-500 mt-1"></div>
                              </div>
                              <div className="col-span-1">
                                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Meal Plan</label>
                                  <select className="w-full border border-slate-300 rounded px-2 py-1 text-xs bg-white" value={newTariff.mealPlan} onChange={e => setNewTariff({...newTariff, mealPlan: e.target.value})}>
                                      <option>Select</option><option>EP</option><option>CP</option><option>MAP</option><option>AP</option>
                                  </select>
                                  <div className="h-0.5 w-8 bg-red-500 mt-1"></div>
                              </div>
                              <div className="col-span-1">
                                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Currency</label>
                                  <select className="w-full border border-slate-300 rounded px-2 py-1 text-xs bg-white" value={newTariff.currency} onChange={e => setNewTariff({...newTariff, currency: e.target.value})}>
                                      <option>INR</option><option>USD</option>
                                  </select>
                              </div>
                              <div className="col-span-1">
                                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Single</label>
                                  <input type="number" className="w-full border border-slate-300 rounded px-2 py-1 text-xs" value={newTariff.rates?.single} onChange={e => setNewTariff({...newTariff, rates: {...newTariff.rates!, single: Number(e.target.value)}})}/>
                              </div>
                              <div className="col-span-1">
                                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Double</label>
                                  <input type="number" className="w-full border border-slate-300 rounded px-2 py-1 text-xs" value={newTariff.rates?.double} onChange={e => setNewTariff({...newTariff, rates: {...newTariff.rates!, double: Number(e.target.value)}})}/>
                              </div>

                              {/* Row 3 */}
                              <div className="col-span-1">
                                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Extra Bed (A)</label>
                                  <input type="number" className="w-full border border-slate-300 rounded px-2 py-1 text-xs" value={newTariff.rates?.extraBedAdult} onChange={e => setNewTariff({...newTariff, rates: {...newTariff.rates!, extraBedAdult: Number(e.target.value)}})}/>
                              </div>
                              <div className="col-span-1">
                                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Extra Bed (C)</label>
                                  <input type="number" className="w-full border border-slate-300 rounded px-2 py-1 text-xs" value={newTariff.rates?.extraBedChild} onChange={e => setNewTariff({...newTariff, rates: {...newTariff.rates!, extraBedChild: Number(e.target.value)}})}/>
                              </div>
                              <div className="col-span-1">
                                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Child W/B</label>
                                  <input type="number" className="w-full border border-slate-300 rounded px-2 py-1 text-xs" value={newTariff.rates?.childWithBed} onChange={e => setNewTariff({...newTariff, rates: {...newTariff.rates!, childWithBed: Number(e.target.value)}})}/>
                              </div>
                              <div className="col-span-1">
                                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">TAC(%)</label>
                                  <input type="number" className="w-full border border-slate-300 rounded px-2 py-1 text-xs" value={newTariff.rates?.tacPercentage} onChange={e => setNewTariff({...newTariff, rates: {...newTariff.rates!, tacPercentage: Number(e.target.value)}})}/>
                              </div>
                              <div className="col-span-1">
                                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Room Tax Slab</label>
                                  <select className="w-full border border-slate-300 rounded px-2 py-1 text-xs bg-white" value={newTariff.rates?.roomTaxSlab} onChange={e => setNewTariff({...newTariff, rates: {...newTariff.rates!, roomTaxSlab: e.target.value}})}>
                                      <option>TAXINC</option><option>TAXEXC</option>
                                  </select>
                                  <div className="h-0.5 w-8 bg-red-500 mt-1"></div>
                              </div>
                              <div className="col-span-1">
                                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Meal Tax Slab(%)</label>
                                  <select className="w-full border border-slate-300 rounded px-2 py-1 text-xs bg-white" value={newTariff.rates?.mealTaxSlab} onChange={e => setNewTariff({...newTariff, rates: {...newTariff.rates!, mealTaxSlab: e.target.value}})}>
                                      <option>GSTInclusive</option><option>GSTExclusive</option>
                                  </select>
                                  <div className="h-0.5 w-8 bg-red-500 mt-1"></div>
                              </div>
                              <div className="col-span-1">
                                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Markup Type</label>
                                  <select className="w-full border border-slate-300 rounded px-2 py-1 text-xs bg-white" value={newTariff.rates?.markupType} onChange={e => setNewTariff({...newTariff, rates: {...newTariff.rates!, markupType: e.target.value as any}})}>
                                      <option>%</option><option>Flat</option>
                                  </select>
                              </div>
                              <div className="col-span-1">
                                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Markup Cost</label>
                                  <input type="number" className="w-full border border-slate-300 rounded px-2 py-1 text-xs" value={newTariff.rates?.markupCost} onChange={e => setNewTariff({...newTariff, rates: {...newTariff.rates!, markupCost: Number(e.target.value)}})}/>
                              </div>

                              {/* Row 4 - Meals */}
                              <div className="col-span-1">
                                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Breakfast(A)</label>
                                  <input type="number" className="w-full border border-slate-300 rounded px-2 py-1 text-xs" value={newTariff.mealRates?.breakfastAdult} onChange={e => setNewTariff({...newTariff, mealRates: {...newTariff.mealRates!, breakfastAdult: Number(e.target.value)}})}/>
                              </div>
                              <div className="col-span-1">
                                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Lunch(A)</label>
                                  <input type="number" className="w-full border border-slate-300 rounded px-2 py-1 text-xs" value={newTariff.mealRates?.lunchAdult} onChange={e => setNewTariff({...newTariff, mealRates: {...newTariff.mealRates!, lunchAdult: Number(e.target.value)}})}/>
                              </div>
                              <div className="col-span-1">
                                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Dinner(A)</label>
                                  <input type="number" className="w-full border border-slate-300 rounded px-2 py-1 text-xs" value={newTariff.mealRates?.dinnerAdult} onChange={e => setNewTariff({...newTariff, mealRates: {...newTariff.mealRates!, dinnerAdult: Number(e.target.value)}})}/>
                              </div>
                              <div className="col-span-1">
                                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Breakfast(C)</label>
                                  <input type="number" className="w-full border border-slate-300 rounded px-2 py-1 text-xs" value={newTariff.mealRates?.breakfastChild} onChange={e => setNewTariff({...newTariff, mealRates: {...newTariff.mealRates!, breakfastChild: Number(e.target.value)}})}/>
                              </div>
                              <div className="col-span-1">
                                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Lunch(C)</label>
                                  <input type="number" className="w-full border border-slate-300 rounded px-2 py-1 text-xs" value={newTariff.mealRates?.lunchChild} onChange={e => setNewTariff({...newTariff, mealRates: {...newTariff.mealRates!, lunchChild: Number(e.target.value)}})}/>
                              </div>
                              <div className="col-span-1">
                                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Dinner(C)</label>
                                  <input type="number" className="w-full border border-slate-300 rounded px-2 py-1 text-xs" value={newTariff.mealRates?.dinnerChild} onChange={e => setNewTariff({...newTariff, mealRates: {...newTariff.mealRates!, dinnerChild: Number(e.target.value)}})}/>
                              </div>
                          </div>
                          
                          <div className="px-4 pb-4">
                              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Remarks</label>
                              <input type="text" className="w-full border border-slate-300 rounded px-2 py-1 text-xs" value={newTariff.remarks || ''} onChange={e => setNewTariff({...newTariff, remarks: e.target.value})}/>
                          </div>

                          <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
                              <button onClick={handleSaveTariff} className="bg-blue-600 text-white px-6 py-1.5 rounded text-sm font-medium hover:bg-blue-700">Save</button>
                          </div>
                      </div>
                  )}

                  {/* Tariff Table */}
                  <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                      <div className="w-full overflow-x-auto">
                          <table className="w-full text-xs text-left whitespace-nowrap">
                              <thead className="bg-white border-b border-blue-200 text-slate-600 font-bold uppercase">
                                  <tr>
                                      <th className="px-3 py-3 border-b-2 border-blue-500">Season</th>
                                      <th className="px-3 py-3">Validity</th>
                                      <th className="px-3 py-3">PaxType</th>
                                      <th className="px-3 py-3">Market Type</th>
                                      <th className="px-3 py-3">Supplier</th>
                                      <th className="px-3 py-3">Tarif Type</th>
                                      <th className="px-3 py-3">Room Type</th>
                                      <th className="px-3 py-3">Meal Plan</th>
                                      <th className="px-3 py-3 text-right">Single</th>
                                      <th className="px-3 py-3 text-right">Double</th>
                                      <th className="px-3 py-3 text-right">Extra Bed(Adult)</th>
                                      <th className="px-3 py-3 text-right">Extra Bed(Child)</th>
                                      <th className="px-3 py-3 text-right">Child Without Bed</th>
                                      <th className="px-3 py-3 text-right">Breakfast(A)</th>
                                      <th className="px-3 py-3 text-right">Lunch(A)</th>
                                      <th className="px-3 py-3 text-right">Dinner(A)</th>
                                  </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100">
                                  {hotelTariffs.map((tariff) => (
                                      <tr key={tariff.id} className="hover:bg-slate-50">
                                          <td className="px-3 py-2 text-slate-700">{tariff.seasonType} - {tariff.seasonYear}</td>
                                          <td className="px-3 py-2 text-slate-500">{tariff.validFrom} TO {tariff.validTo}</td>
                                          <td className="px-3 py-2 text-slate-600">{tariff.paxType}</td>
                                          <td className="px-3 py-2 text-slate-600">{tariff.marketType}</td>
                                          <td className="px-3 py-2 text-slate-600 max-w-[150px] truncate" title={tariff.supplierName}>{tariff.supplierName}</td>
                                          <td className="px-3 py-2 text-slate-600">{tariff.tariffType}</td>
                                          <td className="px-3 py-2 text-slate-600 max-w-[120px] truncate">{tariff.roomType}</td>
                                          <td className="px-3 py-2 text-slate-600">{tariff.mealPlan}</td>
                                          <td className="px-3 py-2 text-right">{tariff.rates.single}</td>
                                          <td className="px-3 py-2 text-right">{tariff.rates.double}</td>
                                          <td className="px-3 py-2 text-right">{tariff.rates.extraBedAdult}</td>
                                          <td className="px-3 py-2 text-right">{tariff.rates.extraBedChild}</td>
                                          <td className="px-3 py-2 text-right">{tariff.rates.childWithBed}</td>
                                          <td className="px-3 py-2 text-right">{tariff.mealRates.breakfastAdult}</td>
                                          <td className="px-3 py-2 text-right">{tariff.mealRates.lunchAdult}</td>
                                          <td className="px-3 py-2 text-right">{tariff.mealRates.dinnerAdult}</td>
                                      </tr>
                                  ))}
                                  {hotelTariffs.length === 0 && (
                                      <tr><td colSpan={16} className="px-3 py-8 text-center text-slate-400">No tariffs found. Add one above.</td></tr>
                                  )}
                              </tbody>
                          </table>
                      </div>
                  </div>
              </div>
          </div>
      );
  }

  if (view === 'form') {
    return (
      <div className="h-full flex flex-col bg-slate-50 animate-in fade-in slide-in-from-right-4 duration-300">
        <div className="bg-white px-6 py-4 border-b border-slate-200 flex justify-between items-center shadow-sm">
           <h2 className="text-xl font-bold text-slate-800">{currentHotel.id ? 'Edit Hotel' : 'Add Hotel'}</h2>
           <div className="flex gap-2">
              <button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-sm font-medium shadow-sm transition-colors">Save</button>
              <button onClick={() => setView('list')} className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-6 py-2 rounded-full text-sm font-medium transition-colors">Cancel</button>
           </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
           <div className="max-w-5xl mx-auto space-y-6">
              
              {/* General Info */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    <div>
                       <label className="block text-xs font-semibold text-slate-500 mb-1">Hotel Chain</label>
                       <select 
                         value={currentHotel.chain} 
                         onChange={e => setCurrentHotel({...currentHotel, chain: e.target.value})}
                         className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500"
                       >
                          <option value="">Select</option>
                          <option value="Taj">Taj Hotels</option>
                          <option value="Oberoi">Oberoi Hotels</option>
                          <option value="Independent">Independent</option>
                       </select>
                    </div>
                    <div>
                       <label className="block text-xs font-semibold text-slate-500 mb-1">Hotel Name</label>
                       <input 
                         type="text" 
                         value={currentHotel.name || ''} 
                         onChange={e => setCurrentHotel({...currentHotel, name: e.target.value})}
                         className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 border-l-4 border-l-red-500"
                       />
                    </div>
                    <div>
                       <label className="block text-xs font-semibold text-slate-500 mb-1">Destination</label>
                       <select 
                         value={currentHotel.destination} 
                         onChange={e => setCurrentHotel({...currentHotel, destination: e.target.value})}
                         className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 border-l-4 border-l-red-500"
                       >
                          <option value="">Select</option>
                          {initialDestinations.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                       </select>
                    </div>
                    <div>
                       <label className="block text-xs font-semibold text-slate-500 mb-1">Hotel Category</label>
                       <select 
                         value={currentHotel.category} 
                         onChange={e => setCurrentHotel({...currentHotel, category: e.target.value})}
                         className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500"
                       >
                          {initialHotelCategories.map(c => <option key={c.id} value={c.categoryName}>{c.categoryName}</option>)}
                       </select>
                    </div>
                    <div>
                       <label className="block text-xs font-semibold text-slate-500 mb-1">Hotel Type</label>
                       <select 
                         value={currentHotel.type} 
                         onChange={e => setCurrentHotel({...currentHotel, type: e.target.value})}
                         className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500"
                       >
                          {initialHotelTypes.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
                       </select>
                    </div>
                    <div>
                       <label className="block text-xs font-semibold text-slate-500 mb-1">Hotel Email Id</label>
                       <input 
                         type="email" 
                         value={currentHotel.email || ''} 
                         onChange={e => setCurrentHotel({...currentHotel, email: e.target.value})}
                         className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500"
                       />
                    </div>
                    <div>
                       <label className="block text-xs font-semibold text-slate-500 mb-1">Hotel Link</label>
                       <input 
                         type="text" 
                         value={currentHotel.website || ''} 
                         onChange={e => setCurrentHotel({...currentHotel, website: e.target.value})}
                         className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500"
                       />
                    </div>
                    <div>
                       <label className="block text-xs font-semibold text-slate-500 mb-1">Weekend Days</label>
                       <div className="flex gap-2">
                          <select 
                            value={currentHotel.weekendDays}
                            onChange={e => setCurrentHotel({...currentHotel, weekendDays: e.target.value})}
                            className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500"
                          >
                             <option value="FSS">Friday, Saturday, Sunday</option>
                             <option value="SS">Saturday, Sunday</option>
                          </select>
                          <input type="text" placeholder="Days" className="w-20 border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500"/>
                       </div>
                    </div>
                    <div>
                       <label className="block text-xs font-semibold text-slate-500 mb-1">Check-In Time</label>
                       <input 
                         type="time" 
                         value={currentHotel.checkInTime} 
                         onChange={e => setCurrentHotel({...currentHotel, checkInTime: e.target.value})}
                         className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500"
                       />
                    </div>
                    <div>
                       <label className="block text-xs font-semibold text-slate-500 mb-1">Check-Out Time</label>
                       <input 
                         type="time" 
                         value={currentHotel.checkOutTime} 
                         onChange={e => setCurrentHotel({...currentHotel, checkOutTime: e.target.value})}
                         className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500"
                       />
                    </div>
                 </div>

                 {/* Amenities */}
                 <div className="mt-6">
                    <label className="block text-xs font-semibold text-slate-500 mb-2">Hotel Amenities</label>
                    <div className="h-32 overflow-y-auto border border-slate-300 rounded-lg p-2 bg-slate-50 grid grid-cols-2 md:grid-cols-4 gap-2">
                       {mockAmenitiesList.map(item => (
                          <label key={item} className="flex items-center gap-2 text-xs cursor-pointer hover:bg-white p-1 rounded">
                             <input 
                               type="checkbox" 
                               checked={currentHotel.amenities?.includes(item)}
                               onChange={() => setCurrentHotel({...currentHotel, amenities: toggleSelection(currentHotel.amenities || [], item)})}
                               className="rounded text-blue-600 focus:ring-0"
                             />
                             {item}
                          </label>
                       ))}
                    </div>
                 </div>

                 {/* Room Types */}
                 <div className="mt-4">
                    <label className="block text-xs font-semibold text-slate-500 mb-2">Room Type</label>
                    <div className="h-32 overflow-y-auto border border-slate-300 rounded-lg p-2 bg-slate-50 grid grid-cols-2 md:grid-cols-4 gap-2">
                       {mockRoomTypesList.map(item => (
                          <label key={item} className="flex items-center gap-2 text-xs cursor-pointer hover:bg-white p-1 rounded">
                             <input 
                               type="checkbox" 
                               checked={currentHotel.roomTypes?.includes(item)}
                               onChange={() => setCurrentHotel({...currentHotel, roomTypes: toggleSelection(currentHotel.roomTypes || [], item)})}
                               className="rounded text-blue-600 focus:ring-0"
                             />
                             {item}
                          </label>
                       ))}
                    </div>
                 </div>
              </div>

              {/* Location & Billing */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                 <h3 className="text-sm font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">Location & Billing</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    <div>
                       <label className="block text-xs font-semibold text-slate-500 mb-1">Self Supplier</label>
                       <select 
                         value={currentHotel.selfSupplier} 
                         onChange={e => setCurrentHotel({...currentHotel, selfSupplier: e.target.value as any})}
                         className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500"
                       >
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                       </select>
                    </div>
                    <div>
                       <label className="block text-xs font-semibold text-slate-500 mb-1">Country</label>
                       <select 
                         value={currentHotel.country} 
                         onChange={e => setCurrentHotel({...currentHotel, country: e.target.value})}
                         className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500"
                       >
                          <option value="">Select</option>
                          {initialCountries.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                       </select>
                    </div>
                    <div>
                       <label className="block text-xs font-semibold text-slate-500 mb-1">State</label>
                       <select 
                         value={currentHotel.state} 
                         onChange={e => setCurrentHotel({...currentHotel, state: e.target.value})}
                         className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500"
                       >
                          <option value="">Select State</option>
                          {initialStates.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                       </select>
                    </div>
                    <div>
                       <label className="block text-xs font-semibold text-slate-500 mb-1">City</label>
                       <input 
                         type="text" 
                         value={currentHotel.city || ''} 
                         onChange={e => setCurrentHotel({...currentHotel, city: e.target.value})}
                         className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500"
                       />
                    </div>
                    <div>
                       <label className="block text-xs font-semibold text-slate-500 mb-1">Pin Code</label>
                       <input 
                         type="text" 
                         value={currentHotel.pinCode || ''} 
                         onChange={e => setCurrentHotel({...currentHotel, pinCode: e.target.value})}
                         className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500"
                       />
                    </div>
                    <div>
                       <label className="block text-xs font-semibold text-slate-500 mb-1">Hotel Phone Number</label>
                       <input 
                         type="text" 
                         value={currentHotel.phone || ''} 
                         onChange={e => setCurrentHotel({...currentHotel, phone: e.target.value})}
                         className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500"
                       />
                    </div>
                    <div className="md:col-span-2">
                       <label className="block text-xs font-semibold text-slate-500 mb-1">Address</label>
                       <input 
                         type="text" 
                         value={currentHotel.address || ''} 
                         onChange={e => setCurrentHotel({...currentHotel, address: e.target.value})}
                         className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500"
                       />
                    </div>
                    <div>
                       <label className="block text-xs font-semibold text-slate-500 mb-1">GSTN</label>
                       <input 
                         type="text" 
                         value={currentHotel.gstn || ''} 
                         onChange={e => setCurrentHotel({...currentHotel, gstn: e.target.value})}
                         className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500"
                       />
                    </div>
                    <div>
                       <label className="block text-xs font-semibold text-slate-500 mb-1">Hotel Status</label>
                       <select 
                         value={currentHotel.status} 
                         onChange={e => setCurrentHotel({...currentHotel, status: e.target.value as any})}
                         className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 bg-white"
                       >
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                       </select>
                    </div>
                 </div>
                 
                 <div className="mt-4 pt-4 border-t border-slate-100">
                    <button className="text-green-600 font-bold text-sm hover:underline">+ Define Rooms Rules</button>
                 </div>
              </div>

              {/* Contacts */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                 <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-bold text-slate-800">Contact Person</h3>
                    <button onClick={addContact} className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-xs font-bold hover:bg-blue-200">+ Add More</button>
                 </div>
                 
                 <div className="space-y-6">
                    {currentHotel.contacts?.map((contact, idx) => (
                       <div key={contact.id} className="p-4 border border-slate-200 rounded-lg bg-slate-50 relative">
                          {idx > 0 && <button onClick={() => removeContact(contact.id)} className="absolute top-2 right-2 text-slate-400 hover:text-red-500"><X size={16}/></button>}
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                             <div>
                                <label className="block text-xs font-semibold text-slate-500 mb-1">Title</label>
                                <select 
                                  value={contact.title}
                                  onChange={e => updateContact(contact.id, 'title', e.target.value)}
                                  className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm bg-white"
                                >
                                   <option>Mr.</option>
                                   <option>Ms.</option>
                                   <option>Mrs.</option>
                                </select>
                             </div>
                             <div>
                                <label className="block text-xs font-semibold text-slate-500 mb-1">First Name</label>
                                <input type="text" value={contact.firstName} onChange={e => updateContact(contact.id, 'firstName', e.target.value)} className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm"/>
                             </div>
                             <div>
                                <label className="block text-xs font-semibold text-slate-500 mb-1">Last Name</label>
                                <input type="text" value={contact.lastName} onChange={e => updateContact(contact.id, 'lastName', e.target.value)} className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm"/>
                             </div>
                             <div>
                                <label className="block text-xs font-semibold text-slate-500 mb-1">Designation</label>
                                <input type="text" value={contact.designation} onChange={e => updateContact(contact.id, 'designation', e.target.value)} className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm"/>
                             </div>
                             <div>
                                <label className="block text-xs font-semibold text-slate-500 mb-1">Country Code</label>
                                <input type="text" value={contact.countryCode} onChange={e => updateContact(contact.id, 'countryCode', e.target.value)} className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm"/>
                             </div>
                             <div>
                                <label className="block text-xs font-semibold text-slate-500 mb-1">Phone 1</label>
                                <input type="text" value={contact.phone1} onChange={e => updateContact(contact.id, 'phone1', e.target.value)} className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm"/>
                             </div>
                             <div>
                                <label className="block text-xs font-semibold text-slate-500 mb-1">Phone 2</label>
                                <input type="text" value={contact.phone2 || ''} onChange={e => updateContact(contact.id, 'phone2', e.target.value)} className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm"/>
                             </div>
                             <div>
                                <label className="block text-xs font-semibold text-slate-500 mb-1">Phone 3</label>
                                <input type="text" value={contact.phone3 || ''} onChange={e => updateContact(contact.id, 'phone3', e.target.value)} className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm"/>
                             </div>
                             <div>
                                <label className="block text-xs font-semibold text-slate-500 mb-1">Primary Email</label>
                                <input type="text" value={contact.email} onChange={e => updateContact(contact.id, 'email', e.target.value)} className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm"/>
                             </div>
                             <div>
                                <label className="block text-xs font-semibold text-slate-500 mb-1">Secondary Email</label>
                                <input type="text" value={contact.secondaryEmail || ''} onChange={e => updateContact(contact.id, 'secondaryEmail', e.target.value)} className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm"/>
                             </div>
                             <div className="flex items-end pb-2">
                                <label className="flex items-center gap-2 cursor-pointer">
                                   <input type="checkbox" checked={contact.isForContactList} onChange={e => updateContact(contact.id, 'isForContactList', e.target.checked)} className="rounded text-blue-600"/>
                                   <span className="text-sm">For Contact List</span>
                                </label>
                             </div>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>

              {/* Information & Media */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-6">
                 <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Hotel Information</label>
                    <textarea 
                      value={currentHotel.description || ''}
                      onChange={e => setCurrentHotel({...currentHotel, description: e.target.value})}
                      className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none h-32 resize-none"
                      placeholder="Enter hotel description..."
                    />
                 </div>
                 <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Policy</label>
                    <textarea 
                      value={currentHotel.policy || ''}
                      onChange={e => setCurrentHotel({...currentHotel, policy: e.target.value})}
                      className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none h-20 resize-none"
                    />
                 </div>
                 <div className="grid grid-cols-2 gap-6">
                    <div>
                       <label className="block text-xs font-semibold text-slate-500 mb-1">Image 1</label>
                       <div className="flex gap-2">
                          <button className="px-3 py-2 border border-slate-300 rounded text-sm bg-white hover:bg-slate-50">Choose File</button>
                          <span className="py-2 text-sm text-slate-400">No file chosen</span>
                       </div>
                    </div>
                    <div>
                       <label className="block text-xs font-semibold text-slate-500 mb-1">Image 2</label>
                       <div className="flex gap-2">
                          <button className="px-3 py-2 border border-slate-300 rounded text-sm bg-white hover:bg-slate-50">Choose File</button>
                          <span className="py-2 text-sm text-slate-400">No file chosen</span>
                       </div>
                    </div>
                 </div>
                 <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">T&C</label>
                    <textarea 
                      value={currentHotel.terms || ''}
                      onChange={e => setCurrentHotel({...currentHotel, terms: e.target.value})}
                      className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none h-20 resize-none"
                    />
                 </div>
                 <div className="grid grid-cols-2 gap-6">
                    <div>
                       <label className="block text-xs font-semibold text-slate-500 mb-1">Verified</label>
                       <select 
                         value={currentHotel.verified}
                         onChange={e => setCurrentHotel({...currentHotel, verified: e.target.value as any})}
                         className="w-full border border-slate-300 rounded px-3 py-2 text-sm bg-white border-l-4 border-l-red-500"
                       >
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                       </select>
                    </div>
                    <div>
                       <label className="block text-xs font-semibold text-slate-500 mb-1">Internal Note</label>
                       <input 
                         type="text" 
                         value={currentHotel.internalNote || ''}
                         onChange={e => setCurrentHotel({...currentHotel, internalNote: e.target.value})}
                         className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none"
                       />
                    </div>
                 </div>
              </div>

           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col animate-in fade-in slide-in-from-right-4 duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Hotel Master</h2>
            <p className="text-sm text-slate-500">Manage hotel properties and contracts</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-6">
         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
               <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Keyword</label>
               <input 
                 type="text" 
                 value={filterKeyword} 
                 onChange={e => setFilterKeyword(e.target.value)} 
                 className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500"
               />
            </div>
            <div>
               <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Destination</label>
               <select 
                 value={filterDestination} 
                 onChange={e => setFilterDestination(e.target.value)} 
                 className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white outline-none focus:border-blue-500"
               >
                  <option value="All">All</option>
                  {initialDestinations.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
               </select>
            </div>
            <div>
               <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Hotel Name</label>
               <select 
                 value={filterHotelName} 
                 onChange={e => setFilterHotelName(e.target.value)} 
                 className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white outline-none focus:border-blue-500"
               >
                  <option value="All">All</option>
                  {hotels.map(h => <option key={h.id} value={h.name}>{h.name}</option>)}
               </select>
            </div>
            <div className="flex justify-end">
               <button onClick={() => setView('form')} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm text-sm font-medium transition-colors">
                  <Plus size={18} /> Add Hotel
               </button>
            </div>
         </div>
      </div>

      {/* Action Bar */}
      <div className="flex justify-end gap-3 mb-4">
         <button className="bg-white border border-slate-300 text-slate-600 px-3 py-1.5 rounded text-xs font-medium hover:bg-slate-50 flex items-center gap-2"><Download size={14}/> Download Format</button>
         <button className="bg-white border border-slate-300 text-slate-600 px-3 py-1.5 rounded text-xs font-medium hover:bg-slate-50 flex items-center gap-2"><Download size={14}/> Download Data</button>
         <button className="bg-white border border-slate-300 text-slate-600 px-3 py-1.5 rounded text-xs font-medium hover:bg-slate-50 flex items-center gap-2"><Upload size={14}/> Import Format</button>
         <button className="bg-white border border-slate-300 text-slate-600 px-3 py-1.5 rounded text-xs font-medium hover:bg-slate-50 flex items-center gap-2"><History size={14}/> View Logs</button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 flex-1 overflow-hidden flex flex-col">
         <div className="overflow-x-auto flex-1">
            <table className="w-full text-left">
               <thead className="bg-slate-50 border-b border-slate-100 text-slate-500">
                  <tr>
                     <th className="px-4 py-3 text-xs font-bold uppercase">#</th>
                     <th className="px-4 py-3 text-xs font-bold uppercase">Hotel Chain</th>
                     <th className="px-4 py-3 text-xs font-bold uppercase">Hotel Name</th>
                     <th className="px-4 py-3 text-xs font-bold uppercase">Location</th>
                     <th className="px-4 py-3 text-xs font-bold uppercase">Contact Person</th>
                     <th className="px-4 py-3 text-xs font-bold uppercase">Category</th>
                     <th className="px-4 py-3 text-xs font-bold uppercase">Status</th>
                     <th className="px-4 py-3 text-xs font-bold uppercase">Room Type</th>
                     <th className="px-4 py-3 text-xs font-bold uppercase">Gallery</th>
                     <th className="px-4 py-3 text-xs font-bold uppercase">Rate Sheet</th>
                     <th className="px-4 py-3 text-xs font-bold uppercase text-right">Action</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {filteredHotels.map((hotel, index) => (
                     <tr key={hotel.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3 text-sm text-slate-500">{index + 1}</td>
                        <td className="px-4 py-3 text-sm text-slate-700">{hotel.chain}</td>
                        <td className="px-4 py-3 font-medium text-slate-800">{hotel.name}</td>
                        <td className="px-4 py-3 text-xs text-slate-600">{hotel.city}, {hotel.country}</td>
                        <td className="px-4 py-3 text-xs text-slate-600">
                           {hotel.contacts && hotel.contacts.length > 0 ? `${hotel.contacts[0].firstName} ${hotel.contacts[0].lastName}` : '-'}
                        </td>
                        <td className="px-4 py-3 text-xs text-slate-600">{hotel.category}</td>
                        <td className="px-4 py-3">
                           <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${hotel.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                              {hotel.status}
                           </span>
                        </td>
                        <td className="px-4 py-3 text-xs text-slate-600">{hotel.roomTypes?.length || 0}</td>
                        <td className="px-4 py-3 text-center"><ImageIcon size={16} className="text-purple-500 cursor-pointer"/></td>
                        <td className="px-4 py-3 text-center"><button onClick={() => handleViewRates(hotel)} className="text-blue-600 text-xs font-medium hover:underline">View Rate</button></td>
                        <td className="px-4 py-3 text-right">
                           <div className="flex items-center justify-end gap-2">
                              <button onClick={() => handleEdit(hotel)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded"><Edit size={14}/></button>
                              <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded"><Trash2 size={14}/></button>
                           </div>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
};

export default HotelMaster;
