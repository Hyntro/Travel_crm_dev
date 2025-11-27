
import React, { useState } from 'react';
import { Plus, Search, Calendar, Users, X, ChevronDown, ChevronUp, Edit, User, FileText, Save, AlignLeft, Bold, Italic, List, ListOrdered, Trash2, ArrowLeft, Hotel, Check, Eye, BedDouble } from 'lucide-react';
import { SeriesMaster, SubSeries } from '../types';
import { initialCities } from './mockData';

const initialSeries: SeriesMaster[] = [
  { 
    id: '1', 
    code: 'EQ11', 
    name: 'Europe Queen 2025', 
    clientType: 'Agent', 
    clientName: 'Global Travels',
    destination: 'Europe',
    marketType: 'International', 
    nationality: 'Indian',
    planType: 'Day Wise',
    tourType: 'Group', 
    vehicle: 'Coach', 
    hotelCategory: '4 Star', 
    mealPlan: 'MAP', 
    year: 2025, 
    season: 'Summer',
    status: 'Active',
    totalNights: 10,
    operationPerson: 'John Ops',
    salesPerson: 'Sarah Sales',
    departures: [
      { date: '2025-05-10', seats: 40, booked: 12 },
      { date: '2025-06-15', seats: 40, booked: 5 }
    ],
    subSeries: [
        {
            id: 'ss1',
            name: 'Europe Queen 2025 - Batch A',
            code: 'EQ11|Final',
            tourCode: '25/10/0007/SKM',
            startDate: '2025-10-19',
            endDate: '2025-10-20',
            totalDays: 2,
            adults: 3,
            child: 0,
            rooms: { single: 0, double: 1, twin: 0, triple: 0 },
            extraBeds: { adult: 0, childWithBed: 0, childNoBed: 0 },
            status: 'Confirmed',
            active: true,
            createdAt: '2025-10-18 12:48:36 PM'
        }
    ]
  },
  { 
    id: '2', 
    code: 'KB05', 
    name: 'Kerala Bliss', 
    clientType: 'Direct', 
    clientName: 'Rahul Sharma',
    destination: 'Kerala, India',
    marketType: 'Domestic',
    nationality: 'Indian',
    planType: 'Day Wise',
    tourType: 'FIT', 
    vehicle: 'Sedan', 
    hotelCategory: '5 Star', 
    mealPlan: 'CP', 
    year: 2025, 
    season: 'Winter',
    status: 'Active',
    totalNights: 6,
    operationPerson: 'Mike Ops',
    salesPerson: 'Jim Sales',
    departures: [
      { date: '2025-11-20', seats: 10, booked: 2 }
    ],
    subSeries: []
  },
];

const SeriesManagement: React.FC = () => {
  const [seriesList, setSeriesList] = useState<SeriesMaster[]>(initialSeries);
  
  // Views: 'list' | 'add' | 'sub-series-list'
  const [view, setView] = useState<'list' | 'add' | 'sub-series-list'>('list');
  const [selectedSeries, setSelectedSeries] = useState<SeriesMaster | null>(null);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  
  // Sub Series Modal
  const [showSubSeriesModal, setShowSubSeriesModal] = useState(false);
  const [isEditingSubSeries, setIsEditingSubSeries] = useState(false);
  const [newSubSeries, setNewSubSeries] = useState<Partial<SubSeries>>({
      rooms: { single: 0, double: 0, twin: 0, triple: 0 },
      extraBeds: { adult: 0, childWithBed: 0, childNoBed: 0 },
      active: true,
      status: 'Confirmed'
  });

  // Hotel Availability Modal
  const [showHotelModal, setShowHotelModal] = useState(false);
  const [currentSubSeriesForHotel, setCurrentSubSeriesForHotel] = useState<SubSeries | null>(null);

  // Add Series Form State
  const [newSeries, setNewSeries] = useState<Partial<SeriesMaster>>({
    year: 2025,
    departures: [],
    itinerary: [],
    status: 'Active',
    clientType: 'Agent',
    planType: 'Day Wise',
    season: 'Summer',
    hotelCategory: '3 Star',
    mealPlan: 'CP',
    vehicle: 'Select Vehicle',
    tourType: 'Advanture toure',
    marketType: 'Domestic'
  });

  const toggleRow = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const handleOpenSubSeries = (series: SeriesMaster) => {
      setSelectedSeries(series);
      setView('sub-series-list');
  };

  // --- Sub Series Logic ---

  const handleSubSeriesDateChange = (field: 'startDate' | 'endDate', value: string) => {
      const updated = { ...newSubSeries, [field]: value };
      if (updated.startDate && updated.endDate) {
          const start = new Date(updated.startDate);
          const end = new Date(updated.endDate);
          const diffTime = Math.abs(end.getTime() - start.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; 
          updated.totalDays = diffDays > 0 ? diffDays : 0;
      }
      setNewSubSeries(updated);
  };

  const handleOpenCreateSubSeries = () => {
      setNewSubSeries({
        rooms: { single: 0, double: 0, twin: 0, triple: 0 },
        extraBeds: { adult: 0, childWithBed: 0, childNoBed: 0 },
        active: true,
        status: 'Confirmed'
      });
      setIsEditingSubSeries(false);
      setShowSubSeriesModal(true);
  };

  const handleEditSubSeries = (sub: SubSeries) => {
      setNewSubSeries({ ...sub });
      setIsEditingSubSeries(true);
      setShowSubSeriesModal(true);
  };

  const handleSaveSubSeries = () => {
      if (!selectedSeries || !newSubSeries.name) return;

      let updatedSeriesList = [...seriesList];

      if (isEditingSubSeries && newSubSeries.id) {
          // Update Existing
          updatedSeriesList = seriesList.map(s => {
              if (s.id === selectedSeries.id) {
                  const updatedSubSeries = s.subSeries?.map(sub => 
                      sub.id === newSubSeries.id ? { ...sub, ...newSubSeries } as SubSeries : sub
                  ) || [];
                  return { ...s, subSeries: updatedSubSeries };
              }
              return s;
          });
      } else {
          // Create New
          const subSeriesItem: SubSeries = {
              ...newSubSeries as SubSeries,
              id: Math.random().toString(),
              tourCode: `DB25-26/${Math.floor(Math.random()*10000)}/B`, // Mock generation
              createdAt: new Date().toLocaleString()
          };

          updatedSeriesList = seriesList.map(s => {
              if (s.id === selectedSeries.id) {
                  return { ...s, subSeries: [...(s.subSeries || []), subSeriesItem] };
              }
              return s;
          });
      }

      setSeriesList(updatedSeriesList);
      // Update selected series to reflect change immediately in UI
      const updatedSelectedSeries = updatedSeriesList.find(s => s.id === selectedSeries.id) || null;
      setSelectedSeries(updatedSelectedSeries);
      
      setShowSubSeriesModal(false);
      setIsEditingSubSeries(false);
      setNewSubSeries({
        rooms: { single: 0, double: 0, twin: 0, triple: 0 },
        extraBeds: { adult: 0, childWithBed: 0, childNoBed: 0 },
        active: true,
        status: 'Confirmed'
      });
  };

  const handleHotelAvailability = (sub: SubSeries) => {
      setCurrentSubSeriesForHotel(sub);
      setShowHotelModal(true);
  };

  // --- Main Series Logic ---

  const handleAddItinerary = () => {
    const nights = newSeries.totalNights || 0;
    if (nights > 0) {
        const days = Array.from({ length: nights + 1 }, (_, i) => ({
            day: i + 1,
            destination: ''
        }));
        setNewSeries({ ...newSeries, itinerary: days });
    }
  };

  const handleAddDestination = () => {
     const currentItinerary = newSeries.itinerary || [];
     const nextDay = currentItinerary.length + 1;
     setNewSeries({
        ...newSeries,
        itinerary: [...currentItinerary, { day: nextDay, destination: '' }]
     });
  };

  const handleItineraryChange = (index: number, value: string) => {
    const updatedItinerary = [...(newSeries.itinerary || [])];
    updatedItinerary[index].destination = value;
    setNewSeries({ ...newSeries, itinerary: updatedItinerary });
  };

  const handleRemoveDay = (index: number) => {
     const updatedItinerary = [...(newSeries.itinerary || [])];
     updatedItinerary.splice(index, 1);
     const reindexed = updatedItinerary.map((item, idx) => ({ ...item, day: idx + 1 }));
     setNewSeries({ ...newSeries, itinerary: reindexed });
  };

  const handleSave = () => {
    if(!newSeries.name) return;
    setSeriesList([...seriesList, { 
      ...newSeries, 
      id: Math.random().toString(), 
      code: newSeries.code || `SER${Math.floor(Math.random() * 1000)}`,
      subSeries: []
    } as SeriesMaster]);
    setView('list');
    setNewSeries({ year: 2025, departures: [], itinerary: [], status: 'Active', clientType: 'Agent', planType: 'Day Wise', season: 'Summer', hotelCategory: '3 Star', mealPlan: 'CP', vehicle: 'Select Vehicle' });
  };

  // --- Render Views ---

  if (view === 'sub-series-list' && selectedSeries) {
      return (
          <div className="p-6 bg-white min-h-full">
              {/* Header */}
              <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
                  <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-4 text-sm text-slate-500 mb-2">
                          <div><span className="font-bold text-slate-800">Series Code:</span> <span className="text-green-600 font-medium">{selectedSeries.code}</span></div>
                          <div><span className="font-bold text-slate-800">Series Name:</span> {selectedSeries.name}</div>
                          <div><span className="font-bold text-slate-800">Action:</span> <button onClick={handleOpenCreateSubSeries} className="bg-blue-600 text-white px-3 py-1 rounded text-xs ml-2 hover:bg-blue-700">Create Sub Series</button> <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs ml-1">{selectedSeries.status}</span></div>
                      </div>
                  </div>
                  <div className="flex gap-2">
                      <button className="bg-blue-500 text-white px-4 py-2 rounded shadow-sm hover:bg-blue-600 text-sm">Hotel Availability</button>
                      <button onClick={() => setView('list')} className="bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded hover:bg-slate-50 text-sm">Back</button>
                  </div>
              </div>

              {/* Sub Series Table */}
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <div className="w-full bg-yellow-400 h-1"></div>
                  <table className="w-full text-left text-sm">
                      <thead>
                          <tr className="bg-slate-50 text-xs uppercase text-slate-600 font-bold border-b border-slate-200">
                              <th className="px-4 py-3">Sub/Series Code.</th>
                              <th className="px-4 py-3">Creation Date</th>
                              <th className="px-4 py-3">Sub/Series Name</th>
                              <th className="px-4 py-3">Tour Code</th>
                              <th className="px-4 py-3">From Date</th>
                              <th className="px-4 py-3">To Date</th>
                              <th className="px-4 py-3">Duration</th>
                              <th className="px-4 py-3">Status</th>
                              <th className="px-4 py-3">Active/Inactive</th>
                              <th className="px-4 py-3">Action</th>
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                          {selectedSeries.subSeries?.map((sub, idx) => (
                              <tr key={sub.id} className="hover:bg-green-50/50 bg-green-50/20">
                                  <td className="px-4 py-3 text-green-600 font-medium">{sub.code}</td>
                                  <td className="px-4 py-3 text-xs text-slate-500">{sub.createdAt}</td>
                                  <td className="px-4 py-3 text-slate-800">{sub.name}</td>
                                  <td className="px-4 py-3 text-slate-600 text-xs">{sub.tourCode}</td>
                                  <td className="px-4 py-3 text-slate-600">{sub.startDate}</td>
                                  <td className="px-4 py-3 text-slate-600">{sub.endDate}</td>
                                  <td className="px-4 py-3">{sub.totalDays} Days</td>
                                  <td className="px-4 py-3">
                                      <select className="border border-slate-300 rounded text-xs p-1 bg-white" defaultValue={sub.status}>
                                          <option>Confirmed</option>
                                          <option>Tentative</option>
                                      </select>
                                  </td>
                                  <td className="px-4 py-3 text-green-600 font-medium">{sub.active ? 'Active' : 'Inactive'}</td>
                                  <td className="px-4 py-3 flex gap-1">
                                      <button onClick={() => handleEditSubSeries(sub)} className="bg-black text-white px-2 py-1 rounded text-[10px] flex items-center gap-1 hover:bg-slate-800"><Edit size={10}/> Sub Series</button>
                                      <button onClick={() => handleHotelAvailability(sub)} className="bg-black text-white px-2 py-1 rounded text-[10px] hover:bg-slate-800">Hotel Availability</button>
                                      <button className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-[10px] border border-gray-300 hover:bg-gray-300">Preview</button>
                                  </td>
                              </tr>
                          ))}
                          {(!selectedSeries.subSeries || selectedSeries.subSeries.length === 0) && (
                              <tr>
                                  <td colSpan={10} className="px-4 py-8 text-center text-slate-400">No Sub Series Created Yet.</td>
                              </tr>
                          )}
                      </tbody>
                  </table>
              </div>

              {/* Create/Edit Sub Series Modal */}
              {showSubSeriesModal && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
                      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                          <div className="bg-slate-800 px-6 py-4">
                              <h3 className="text-lg font-bold text-white uppercase">{isEditingSubSeries ? 'Edit Sub Series' : 'New Sub Series'}</h3>
                          </div>
                          <div className="p-6 space-y-4">
                              <div>
                                  <label className="block text-xs font-semibold text-slate-500 mb-1">Sub Series Name</label>
                                  <input type="text" value={newSubSeries.name || selectedSeries.name} onChange={e => setNewSubSeries({...newSubSeries, name: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm outline-none focus:border-blue-500" />
                              </div>
                              <div>
                                  <label className="block text-xs font-semibold text-slate-500 mb-1">Sub Series Code</label>
                                  <input type="text" value={newSubSeries.code || ''} onChange={e => setNewSubSeries({...newSubSeries, code: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm outline-none focus:border-blue-500" />
                              </div>
                              
                              <div className="grid grid-cols-3 gap-4">
                                  <div>
                                      <label className="block text-xs font-semibold text-slate-500 mb-1">Start Date</label>
                                      <input type="date" value={newSubSeries.startDate || ''} onChange={e => handleSubSeriesDateChange('startDate', e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm outline-none focus:border-blue-500" />
                                  </div>
                                  <div>
                                      <label className="block text-xs font-semibold text-slate-500 mb-1">End Date</label>
                                      <input type="date" value={newSubSeries.endDate || ''} onChange={e => handleSubSeriesDateChange('endDate', e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm outline-none focus:border-blue-500" />
                                  </div>
                                  <div>
                                      <label className="block text-xs font-semibold text-slate-500 mb-1">Total Days</label>
                                      <input type="number" readOnly value={newSubSeries.totalDays || 0} className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm bg-slate-50" />
                                  </div>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                  <div>
                                      <label className="block text-xs font-semibold text-slate-500 mb-1">Adults</label>
                                      <input type="number" value={newSubSeries.adults || 0} onChange={e => setNewSubSeries({...newSubSeries, adults: Number(e.target.value)})} className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm outline-none focus:border-blue-500" />
                                  </div>
                                  <div>
                                      <label className="block text-xs font-semibold text-slate-500 mb-1">child</label>
                                      <input type="number" value={newSubSeries.child || 0} onChange={e => setNewSubSeries({...newSubSeries, child: Number(e.target.value)})} className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm outline-none focus:border-blue-500" />
                                  </div>
                              </div>

                              <div className="grid grid-cols-4 gap-4">
                                  <div>
                                      <label className="block text-xs font-semibold text-slate-500 mb-1">Single</label>
                                      <input type="number" value={newSubSeries.rooms?.single || 0} onChange={e => setNewSubSeries({...newSubSeries, rooms: {...newSubSeries.rooms!, single: Number(e.target.value)}})} className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm outline-none focus:border-blue-500" />
                                  </div>
                                  <div>
                                      <label className="block text-xs font-semibold text-slate-500 mb-1">Double</label>
                                      <input type="number" value={newSubSeries.rooms?.double || 0} onChange={e => setNewSubSeries({...newSubSeries, rooms: {...newSubSeries.rooms!, double: Number(e.target.value)}})} className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm outline-none focus:border-blue-500" />
                                  </div>
                                  <div>
                                      <label className="block text-xs font-semibold text-slate-500 mb-1">Twin</label>
                                      <input type="number" value={newSubSeries.rooms?.twin || 0} onChange={e => setNewSubSeries({...newSubSeries, rooms: {...newSubSeries.rooms!, twin: Number(e.target.value)}})} className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm outline-none focus:border-blue-500" />
                                  </div>
                                  <div>
                                      <label className="block text-xs font-semibold text-slate-500 mb-1">Triple</label>
                                      <input type="number" value={newSubSeries.rooms?.triple || 0} onChange={e => setNewSubSeries({...newSubSeries, rooms: {...newSubSeries.rooms!, triple: Number(e.target.value)}})} className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm outline-none focus:border-blue-500" />
                                  </div>
                              </div>

                              <div className="grid grid-cols-3 gap-4">
                                  <div>
                                      <label className="block text-xs font-semibold text-slate-500 mb-1">EBed(Adult)</label>
                                      <input type="number" value={newSubSeries.extraBeds?.adult || 0} onChange={e => setNewSubSeries({...newSubSeries, extraBeds: {...newSubSeries.extraBeds!, adult: Number(e.target.value)}})} className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm outline-none focus:border-blue-500" />
                                  </div>
                                  <div>
                                      <label className="block text-xs font-semibold text-slate-500 mb-1">CWBed(Child)</label>
                                      <input type="number" value={newSubSeries.extraBeds?.childWithBed || 0} onChange={e => setNewSubSeries({...newSubSeries, extraBeds: {...newSubSeries.extraBeds!, childWithBed: Number(e.target.value)}})} className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm outline-none focus:border-blue-500" />
                                  </div>
                                  <div>
                                      <label className="block text-xs font-semibold text-slate-500 mb-1">CNBed(Child)</label>
                                      <input type="number" value={newSubSeries.extraBeds?.childNoBed || 0} onChange={e => setNewSubSeries({...newSubSeries, extraBeds: {...newSubSeries.extraBeds!, childNoBed: Number(e.target.value)}})} className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm outline-none focus:border-blue-500" />
                                  </div>
                              </div>
                          </div>
                          <div className="p-4 border-t border-slate-100 flex justify-end gap-3">
                              <button onClick={handleSaveSubSeries} className="px-6 py-2 bg-slate-800 text-white rounded-full text-sm font-medium hover:bg-slate-900">{isEditingSubSeries ? 'Update' : 'Create'}</button>
                              <button onClick={() => setShowSubSeriesModal(false)} className="px-6 py-2 border border-slate-300 text-slate-600 rounded-full text-sm font-medium hover:bg-slate-50">Close</button>
                          </div>
                      </div>
                  </div>
              )}

              {/* Hotel Availability Modal */}
              {showHotelModal && currentSubSeriesForHotel && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
                      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl overflow-hidden animate-in zoom-in-95 duration-200">
                          <div className="bg-slate-800 px-6 py-4 flex justify-between items-center">
                              <div>
                                  <h3 className="text-lg font-bold text-white uppercase">Hotel Availability</h3>
                                  <p className="text-xs text-slate-400">{currentSubSeriesForHotel.name} ({currentSubSeriesForHotel.code})</p>
                              </div>
                              <button onClick={() => setShowHotelModal(false)} className="text-slate-400 hover:text-white"><X size={20}/></button>
                          </div>
                          <div className="p-6">
                              <div className="mb-4 flex gap-4">
                                  <div className="bg-green-50 border border-green-200 p-3 rounded-lg flex-1">
                                      <div className="text-xs text-green-700 font-semibold uppercase">Total Days</div>
                                      <div className="text-xl font-bold text-green-900">{currentSubSeriesForHotel.totalDays}</div>
                                  </div>
                                  <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg flex-1">
                                      <div className="text-xs text-blue-700 font-semibold uppercase">Dates</div>
                                      <div className="text-sm font-bold text-blue-900">{currentSubSeriesForHotel.startDate} to {currentSubSeriesForHotel.endDate}</div>
                                  </div>
                              </div>
                              
                              <table className="w-full text-sm border border-slate-200">
                                  <thead className="bg-slate-100 text-slate-600">
                                      <tr>
                                          <th className="px-3 py-2 border border-slate-200 text-left">Day</th>
                                          <th className="px-3 py-2 border border-slate-200 text-left">City</th>
                                          <th className="px-3 py-2 border border-slate-200 text-left">Hotel Name</th>
                                          <th className="px-3 py-2 border border-slate-200 text-left">Room Type</th>
                                          <th className="px-3 py-2 border border-slate-200 text-center">Total Rooms</th>
                                          <th className="px-3 py-2 border border-slate-200 text-center">Blocked</th>
                                          <th className="px-3 py-2 border border-slate-200 text-center">Balance</th>
                                          <th className="px-3 py-2 border border-slate-200 text-left">Status</th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                      {/* Mock rows based on total days */}
                                      {Array.from({ length: currentSubSeriesForHotel.totalDays }).map((_, idx) => (
                                          <tr key={idx} className="hover:bg-slate-50">
                                              <td className="px-3 py-2 border border-slate-200 font-medium">Day {idx + 1}</td>
                                              <td className="px-3 py-2 border border-slate-200">
                                                  <select className="w-full bg-transparent outline-none">
                                                      <option>Select City</option>
                                                      {initialCities.map(c => <option key={c.id}>{c.name}</option>)}
                                                  </select>
                                              </td>
                                              <td className="px-3 py-2 border border-slate-200">
                                                  <div className="flex items-center gap-2">
                                                      <Hotel size={14} className="text-slate-400"/>
                                                      <input type="text" placeholder="Select Hotel" className="w-full outline-none bg-transparent" />
                                                  </div>
                                              </td>
                                              <td className="px-3 py-2 border border-slate-200">
                                                  <select className="w-full bg-transparent outline-none text-xs">
                                                      <option>Standard</option>
                                                      <option>Deluxe</option>
                                                      <option>Suite</option>
                                                  </select>
                                              </td>
                                              <td className="px-3 py-2 border border-slate-200 text-center">20</td>
                                              <td className="px-3 py-2 border border-slate-200 text-center text-red-500 font-bold">5</td>
                                              <td className="px-3 py-2 border border-slate-200 text-center text-green-600 font-bold">15</td>
                                              <td className="px-3 py-2 border border-slate-200">
                                                  <span className="bg-green-100 text-green-800 text-[10px] px-2 py-0.5 rounded-full">Available</span>
                                              </td>
                                          </tr>
                                      ))}
                                  </tbody>
                              </table>
                          </div>
                          <div className="p-4 border-t border-slate-100 flex justify-end gap-3 bg-slate-50">
                              <button className="px-6 py-2 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700">Save Allocation</button>
                              <button onClick={() => setShowHotelModal(false)} className="px-6 py-2 border border-slate-300 text-slate-600 rounded-full text-sm font-medium hover:bg-white">Close</button>
                          </div>
                      </div>
                  </div>
              )}
          </div>
      );
  }

  // --- Main View (Add or List) ---

  return (
    <div className="p-8 h-full flex flex-col bg-slate-50">
      {view === 'list' && (
        <div className="flex justify-between items-center mb-8">
            <div>
            <h2 className="text-3xl font-bold text-slate-800">Series Management</h2>
            <p className="text-slate-500 mt-1">Manage fixed departures and group inventory.</p>
            </div>
            <button 
            onClick={() => setView('add')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
            >
            <Plus size={20} />
            <span>Add Series</span>
            </button>
        </div>
      )}

      {view === 'add' ? (
        <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-6 w-full animate-in slide-in-from-bottom-2 h-full overflow-y-auto">
           {/* Form Header */}
           <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
             <div className="flex gap-2">
                <button className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium hover:bg-blue-200">Client History</button>
                <button onClick={handleSave} className="bg-blue-600 text-white px-6 py-1.5 rounded-full text-sm font-bold shadow hover:bg-blue-700">Save</button>
                <button className="bg-white border border-slate-300 text-slate-700 px-4 py-1.5 rounded-full text-sm font-medium hover:bg-slate-50">Save and New</button>
                <button onClick={() => setView('list')} className="bg-white border border-slate-300 text-slate-700 px-4 py-1.5 rounded-full text-sm font-medium hover:bg-slate-50">Cancel</button>
             </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
             
             {/* Column 1: General Information */}
             <div className="lg:col-span-1 border border-slate-200 rounded-lg p-4 bg-slate-50/50 h-fit">
                <h4 className="text-sm font-bold text-slate-600 mb-4 border-b border-slate-200 pb-2">General Information</h4>
                <div className="space-y-4">
                   <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Business Type</label>
                      <select 
                         value={newSeries.clientType} 
                         onChange={e => setNewSeries({...newSeries, clientType: e.target.value as any})}
                         className="w-full border border-slate-300 rounded px-3 py-2 text-sm bg-white outline-none focus:border-blue-500"
                      >
                         <option value="Agent">Agent</option>
                         <option value="Direct">Direct</option>
                      </select>
                      <div className="h-0.5 w-8 bg-red-500 mt-1"></div>
                   </div>
                   <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Name</label>
                      <input 
                        type="text" 
                        value={newSeries.clientName || ''} 
                        onChange={e => setNewSeries({...newSeries, clientName: e.target.value})}
                        className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 border-l-4 border-l-red-500"
                      />
                   </div>
                   <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Series Name</label>
                      <input 
                        type="text" 
                        value={newSeries.name || ''} 
                        onChange={e => setNewSeries({...newSeries, name: e.target.value})}
                        className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 border-l-4 border-l-red-500"
                      />
                   </div>
                   <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Series Code</label>
                      <input 
                        type="text" 
                        value={newSeries.code || ''} 
                        onChange={e => setNewSeries({...newSeries, code: e.target.value})}
                        className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500"
                      />
                      <div className="h-0.5 w-8 bg-red-500 mt-1"></div>
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                      <div>
                         <label className="block text-xs font-semibold text-slate-500 mb-1">Market Type</label>
                         <input 
                           type="text" 
                           value={newSeries.marketType || ''} 
                           onChange={e => setNewSeries({...newSeries, marketType: e.target.value})}
                           className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500"
                         />
                      </div>
                      <div>
                         <label className="block text-xs font-semibold text-slate-500 mb-1">Nationality</label>
                         <input 
                           type="text" 
                           value={newSeries.nationality || ''} 
                           onChange={e => setNewSeries({...newSeries, nationality: e.target.value})}
                           className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500"
                         />
                      </div>
                   </div>
                </div>
             </div>

             {/* Column 2: Series Plan Itinerary */}
             <div className="lg:col-span-1 border border-slate-200 rounded-lg p-4 bg-slate-50/50 h-fit">
                <h4 className="text-sm font-bold text-slate-600 mb-4 border-b border-slate-200 pb-2">Series Plan Itinerary</h4>
                <div className="space-y-4">
                   <div className="grid grid-cols-3 gap-2">
                      <div className="col-span-1">
                         <select 
                           value={newSeries.planType} 
                           onChange={e => setNewSeries({...newSeries, planType: e.target.value as any})}
                           className="w-full border border-slate-300 rounded px-2 py-2 text-sm bg-white outline-none focus:border-blue-500"
                         >
                            <option value="Day Wise">Day Wise</option>
                            <option value="Date Wise">Date Wise</option>
                         </select>
                      </div>
                      <div className="col-span-1">
                         <select 
                           value={newSeries.season} 
                           onChange={e => setNewSeries({...newSeries, season: e.target.value as any})}
                           className="w-full border border-slate-300 rounded px-2 py-2 text-sm bg-white outline-none focus:border-blue-500"
                         >
                            <option value="Summer">Summer</option>
                            <option value="Winter">Winter</option>
                         </select>
                      </div>
                      <div className="col-span-1">
                         <select 
                           value={newSeries.year} 
                           onChange={e => setNewSeries({...newSeries, year: Number(e.target.value)})}
                           className="w-full border border-slate-300 rounded px-2 py-2 text-sm bg-white outline-none focus:border-blue-500"
                         >
                            <option value="2025">2025</option>
                            <option value="2026">2026</option>
                         </select>
                      </div>
                   </div>
                   
                   <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Total Nights</label>
                      <div className="flex gap-2">
                         <input 
                           type="number" 
                           value={newSeries.totalNights || ''} 
                           onChange={e => setNewSeries({...newSeries, totalNights: Number(e.target.value)})}
                           className="w-20 border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 border-l-4 border-l-red-500"
                         />
                         <button 
                           onClick={handleAddItinerary}
                           className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded text-sm font-bold flex-1"
                         >
                            + Add
                         </button>
                      </div>
                   </div>

                   {/* Itinerary Table */}
                   {newSeries.itinerary && newSeries.itinerary.length > 0 && (
                      <div className="mt-4 border border-slate-200 rounded-lg overflow-hidden bg-white">
                          <div className="flex justify-between items-center p-2 bg-slate-50 border-b border-slate-200">
                               <span className="text-xs font-bold text-slate-600">Itinerary Configuration</span>
                               <button 
                                 onClick={handleAddDestination}
                                 className="text-[10px] bg-purple-500 hover:bg-purple-600 text-white px-2 py-1 rounded shadow-sm"
                               >
                                 + Add Destination
                               </button> 
                          </div>
                          <table className="w-full text-sm">
                              <thead className="bg-slate-100 text-slate-500">
                                  <tr>
                                      <th className="px-3 py-2 text-left text-xs font-bold uppercase">Sr.No.</th>
                                      <th className="px-3 py-2 text-left text-xs font-bold uppercase">Destination</th>
                                      <th className="px-3 py-2 w-10"></th>
                                  </tr>
                              </thead>
                              <tbody>
                                  {newSeries.itinerary.map((day, idx) => (
                                      <tr key={idx} className="border-t border-slate-100 hover:bg-slate-50">
                                          <td className="px-3 py-2 font-medium text-slate-700">Day {day.day}</td>
                                          <td className="px-3 py-2">
                                              <select 
                                                  value={day.destination}
                                                  onChange={(e) => handleItineraryChange(idx, e.target.value)}
                                                  className="w-full border border-slate-300 rounded px-2 py-1 text-sm outline-none focus:border-blue-500 bg-white"
                                              >
                                                  <option value="">Select City</option>
                                                  {initialCities.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                                              </select>
                                          </td>
                                          <td className="px-3 py-2 text-right">
                                              <button onClick={() => handleRemoveDay(idx)} className="text-red-400 hover:text-red-600 p-1"><Trash2 size={14}/></button>
                                          </td>
                                      </tr>
                                  ))}
                              </tbody>
                          </table>
                      </div>
                   )}
                </div>
             </div>

             {/* Column 3: Other Information */}
             <div className="lg:col-span-1 border border-slate-200 rounded-lg p-4 bg-slate-50/50 h-fit">
                <h4 className="text-sm font-bold text-slate-600 mb-4 border-b border-slate-200 pb-2">Other Information</h4>
                <div className="space-y-4">
                   <div className="grid grid-cols-2 gap-4">
                      <div>
                         <label className="block text-xs font-semibold text-slate-500 mb-1">Operation Person</label>
                         <div className="relative">
                            <User size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-500"/>
                            <input 
                              type="text" 
                              value={newSeries.operationPerson || ''} 
                              onChange={e => setNewSeries({...newSeries, operationPerson: e.target.value})}
                              className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 border-b-2 border-b-red-500"
                            />
                         </div>
                      </div>
                      <div>
                         <label className="block text-xs font-semibold text-slate-500 mb-1">Sales Person</label>
                         <input 
                           type="text" 
                           value={newSeries.salesPerson || ''} 
                           onChange={e => setNewSeries({...newSeries, salesPerson: e.target.value})}
                           className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 border-b-2 border-b-red-500"
                         />
                      </div>
                   </div>

                   <div className="grid grid-cols-2 gap-4">
                      <div>
                         <label className="block text-xs font-semibold text-slate-500 mb-1">Tour Type</label>
                         <select 
                           value={newSeries.tourType} 
                           onChange={e => setNewSeries({...newSeries,tourType: e.target.value})}
                           className="w-full border border-slate-300 rounded px-3 py-2 text-sm bg-white outline-none focus:border-blue-500 border-b-2 border-b-red-500"
                         >
                            <option value="Advanture toure">Advanture toure</option>
                            <option value="Leisure">Leisure</option>
                         </select>
                      </div>
                      <div>
                         <label className="block text-xs font-semibold text-slate-500 mb-1">Vehicle Prefrence</label>
                         <select 
                           value={newSeries.vehicle} 
                           onChange={e => setNewSeries({...newSeries, vehicle: e.target.value})}
                           className="w-full border border-slate-300 rounded px-3 py-2 text-sm bg-white outline-none focus:border-blue-500"
                         >
                            <option value="Select Vehicle">Select Vehicle</option>
                            <option value="Sedan">Sedan</option>
                            <option value="SUV">SUV</option>
                            <option value="Coach">Coach</option>
                         </select>
                      </div>
                   </div>

                   <div className="grid grid-cols-2 gap-4">
                      <div>
                         <label className="block text-xs font-semibold text-slate-500 mb-1">Hotel Category</label>
                         <select 
                           value={newSeries.hotelCategory} 
                           onChange={e => setNewSeries({...newSeries, hotelCategory: e.target.value})}
                           className="w-full border border-slate-300 rounded px-3 py-2 text-sm bg-white outline-none focus:border-blue-500 border-b-2 border-b-red-500"
                         >
                            <option value="3 Star">3 Star</option>
                            <option value="4 Star">4 Star</option>
                            <option value="5 Star">5 Star</option>
                         </select>
                      </div>
                      <div>
                         <label className="block text-xs font-semibold text-slate-500 mb-1">Meal Plan</label>
                         <select 
                           value={newSeries.mealPlan} 
                           onChange={e => setNewSeries({...newSeries, mealPlan: e.target.value as any})}
                           className="w-full border border-slate-300 rounded px-3 py-2 text-sm bg-white outline-none focus:border-blue-500 border-b-2 border-b-red-500"
                         >
                            <option value="CP">CP</option>
                            <option value="MAP">MAP</option>
                            <option value="AP">AP</option>
                         </select>
                      </div>
                   </div>

                   <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Additional Information</label>
                      <textarea 
                        value={newSeries.additionalInfo || ''}
                        onChange={e => setNewSeries({...newSeries, additionalInfo: e.target.value})}
                        className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 h-16 resize-none"
                      />
                   </div>
                </div>
             </div>
          </div>

          {/* Description Section */}
          <div className="mt-6 border border-slate-200 rounded-lg overflow-hidden">
             <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 text-sm font-semibold text-slate-600">
                Description
             </div>
             <div className="flex gap-2 p-2 border-b border-slate-100 text-slate-500">
                <button className="p-1 hover:bg-slate-100 rounded"><FileText size={14}/></button>
                <button className="p-1 hover:bg-slate-100 rounded">Edit</button>
                <button className="p-1 hover:bg-slate-100 rounded">View</button>
                <button className="p-1 hover:bg-slate-100 rounded">Insert</button>
                <button className="p-1 hover:bg-slate-100 rounded">Format</button>
                <div className="w-px bg-slate-300 mx-2"></div>
                <button className="p-1 hover:bg-slate-100 rounded"><AlignLeft size={14}/></button>
                <button className="p-1 hover:bg-slate-100 rounded"><Bold size={14}/></button>
                <button className="p-1 hover:bg-slate-100 rounded"><Italic size={14}/></button>
                <button className="p-1 hover:bg-slate-100 rounded"><List size={14}/></button>
                <button className="p-1 hover:bg-slate-100 rounded"><ListOrdered size={14}/></button>
             </div>
             <textarea 
               value={newSeries.description || ''}
               onChange={e => setNewSeries({...newSeries, description: e.target.value})}
               className="w-full p-4 h-32 outline-none text-sm resize-none"
               placeholder="Enter description here..."
             />
          </div>
        </div>
      ) : view === 'list' && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
           <div className="p-4 border-b border-slate-100 bg-slate-50">
              <h3 className="font-bold text-slate-800">Series Listing</h3>
           </div>
           <table className="w-full text-left">
              <thead className="bg-white border-b border-slate-200 text-slate-600">
                 <tr>
                    <th className="w-10 px-6 py-3"></th>
                    <th className="px-6 py-3 text-xs font-bold uppercase">Series Code</th>
                    <th className="px-6 py-3 text-xs font-bold uppercase">Series Name</th>
                    <th className="px-6 py-3 text-xs font-bold uppercase">Client Type</th>
                    <th className="px-6 py-3 text-xs font-bold uppercase">Client Name</th>
                    <th className="px-6 py-3 text-xs font-bold uppercase">Destination</th>
                    <th className="px-6 py-3 text-xs font-bold uppercase">Sub Series</th>
                    <th className="px-6 py-3 text-xs font-bold uppercase">Status</th>
                    <th className="px-6 py-3 text-xs font-bold uppercase text-right">Action</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                 {seriesList.map(series => (
                    <React.Fragment key={series.id}>
                       <tr className="hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => toggleRow(series.id)}>
                          <td className="px-6 py-4 text-slate-400">
                             {expandedRow === series.id ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
                          </td>
                          <td className="px-6 py-4 text-sm font-mono text-green-600 font-medium hover:underline cursor-pointer" onClick={(e) => { e.stopPropagation(); handleOpenSubSeries(series); }}>{series.code}</td>
                          <td className="px-6 py-4 font-medium text-slate-800 hover:text-blue-600 cursor-pointer" onClick={(e) => { e.stopPropagation(); handleOpenSubSeries(series); }}>{series.name}</td>
                          <td className="px-6 py-4 text-sm text-slate-600">{series.clientType}</td>
                          <td className="px-6 py-4 text-sm text-slate-600">{series.clientName || '-'}</td>
                          <td className="px-6 py-4 text-sm text-slate-600">{series.destination || '-'}</td>
                          <td className="px-6 py-4">
                             <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {series.departures.length} Departures
                             </span>
                          </td>
                          <td className="px-6 py-4">
                             <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                series.status === 'Active' ? 'bg-blue-600 text-white' :
                                series.status === 'Inactive' ? 'bg-red-100 text-red-800' :
                                'bg-gray-100 text-gray-800'
                             }`}>
                                {series.status || 'Active'}
                             </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                             <button onClick={(e) => { e.stopPropagation(); handleOpenSubSeries(series); }} className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-xs font-bold shadow-sm">
                                Create Sub Series
                             </button>
                          </td>
                       </tr>
                       {expandedRow === series.id && (
                          <tr className="bg-slate-50">
                             <td colSpan={9} className="px-6 py-4">
                                <div className="border border-slate-200 rounded-lg bg-white overflow-hidden shadow-sm">
                                   <div className="px-4 py-2 bg-slate-100 border-b border-slate-200 text-xs font-bold text-slate-600 uppercase flex justify-between">
                                      <span>Departure Details</span>
                                      <span className="text-xs font-normal text-slate-500">Plan: {series.planType} | Total Nights: {series.totalNights}</span>
                                   </div>
                                   <table className="w-full text-sm">
                                      <thead className="bg-slate-50 text-slate-500">
                                         <tr>
                                            <th className="px-4 py-2 text-left">Departure Date</th>
                                            <th className="px-4 py-2 text-left">Total Seats</th>
                                            <th className="px-4 py-2 text-left">Booked</th>
                                            <th className="px-4 py-2 text-left">Availability</th>
                                         </tr>
                                      </thead>
                                      <tbody>
                                         {series.departures.map((dep, idx) => (
                                            <tr key={idx} className="border-t border-slate-100">
                                               <td className="px-4 py-2 font-medium">{dep.date}</td>
                                               <td className="px-4 py-2">{dep.seats}</td>
                                               <td className="px-4 py-2 text-blue-600 font-medium">{dep.booked}</td>
                                               <td className="px-4 py-2">
                                                  <div className="w-32 bg-slate-200 rounded-full h-2">
                                                     <div 
                                                       className={`h-2 rounded-full ${dep.booked/dep.seats > 0.8 ? 'bg-red-500' : 'bg-green-500'}`} 
                                                       style={{ width: `${(dep.booked/dep.seats)*100}%` }}
                                                     ></div>
                                                  </div>
                                               </td>
                                            </tr>
                                         ))}
                                      </tbody>
                                   </table>
                                </div>
                             </td>
                          </tr>
                       )}
                    </React.Fragment>
                 ))}
              </tbody>
           </table>
        </div>
      )}
    </div>
  );
};

export default SeriesManagement;
