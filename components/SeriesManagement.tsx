
import React, { useState } from 'react';
import { Plus, Search, Calendar, Users, X, ChevronDown, ChevronUp } from 'lucide-react';
import { SeriesMaster } from '../types';

const initialSeries: SeriesMaster[] = [
  { 
    id: '1', 
    code: 'EQ11', 
    name: 'Europe Queen 2025', 
    clientType: 'Agent', 
    marketType: 'International', 
    tourType: 'Group', 
    vehicle: 'Coach', 
    hotelCategory: '4 Star', 
    mealPlan: 'MAP', 
    year: 2025, 
    season: 'Summer',
    departures: [
      { date: '2025-05-10', seats: 40, booked: 12 },
      { date: '2025-06-15', seats: 40, booked: 5 }
    ]
  },
];

const SeriesManagement: React.FC = () => {
  const [seriesList, setSeriesList] = useState<SeriesMaster[]>(initialSeries);
  const [showForm, setShowForm] = useState(false);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  
  const [newSeries, setNewSeries] = useState<Partial<SeriesMaster>>({
    year: 2025,
    departures: []
  });

  const toggleRow = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const handleAddDeparture = () => {
    const date = prompt("Enter Departure Date (YYYY-MM-DD):");
    if (date) {
       setNewSeries({
          ...newSeries,
          departures: [...(newSeries.departures || []), { date, seats: 40, booked: 0 }]
       });
    }
  };

  const handleSave = () => {
    if(!newSeries.name) return;
    setSeriesList([...seriesList, { ...newSeries, id: Math.random().toString(), code: `SER${seriesList.length+1}` } as SeriesMaster]);
    setShowForm(false);
    setNewSeries({ year: 2025, departures: [] });
  };

  return (
    <div className="p-8 h-full flex flex-col bg-slate-50">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Series Management</h2>
          <p className="text-slate-500 mt-1">Manage fixed departures and group inventory.</p>
        </div>
        <button 
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
        >
          <Plus size={20} />
          <span>Add Series</span>
        </button>
      </div>

      {showForm ? (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 max-w-4xl mx-auto w-full">
           <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
            <h3 className="text-xl font-bold text-slate-800">Create New Series</h3>
            <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-red-500">
              <X size={24} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
             <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Series Name</label>
                <input 
                  type="text" 
                  value={newSeries.name || ''}
                  onChange={e => setNewSeries({...newSeries, name: e.target.value})}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" 
                />
             </div>
             <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Client Type</label>
                <select 
                   value={newSeries.clientType}
                   onChange={e => setNewSeries({...newSeries, clientType: e.target.value as any})}
                   className="w-full border border-slate-300 rounded-lg px-3 py-2 bg-white"
                >
                   <option value="Agent">Agent</option>
                   <option value="Direct">Direct</option>
                </select>
             </div>
             <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Season</label>
                <select 
                   value={newSeries.season}
                   onChange={e => setNewSeries({...newSeries, season: e.target.value as any})}
                   className="w-full border border-slate-300 rounded-lg px-3 py-2 bg-white"
                >
                   <option value="Summer">Summer</option>
                   <option value="Winter">Winter</option>
                </select>
             </div>
             <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Year</label>
                <input 
                  type="number" 
                  value={newSeries.year}
                  onChange={e => setNewSeries({...newSeries, year: parseInt(e.target.value)})}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2" 
                />
             </div>
          </div>
          
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
             <div className="flex justify-between items-center mb-4">
                <h4 className="font-bold text-slate-700 text-sm uppercase">Departures (Sub-Series)</h4>
                <button onClick={handleAddDeparture} className="text-xs text-blue-600 font-medium hover:underline flex items-center gap-1">
                   <Plus size={14}/> Add Date
                </button>
             </div>
             <div className="space-y-2">
                {newSeries.departures?.length === 0 && <p className="text-sm text-slate-400 italic">No departure dates added.</p>}
                {newSeries.departures?.map((dep, idx) => (
                   <div key={idx} className="flex justify-between items-center bg-white p-3 rounded border border-slate-200">
                      <span className="text-sm font-medium text-slate-700">{dep.date}</span>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">40 Seats</span>
                   </div>
                ))}
             </div>
          </div>

          <div className="mt-8 flex justify-end gap-3">
             <button onClick={() => setShowForm(false)} className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">Cancel</button>
             <button onClick={handleSave} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm">Save Series</button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
           <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-100">
                 <tr>
                    <th className="w-10 px-6 py-3"></th>
                    <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Code</th>
                    <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Series Name</th>
                    <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Season</th>
                    <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Departures</th>
                    <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Action</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                 {seriesList.map(series => (
                    <React.Fragment key={series.id}>
                       <tr className="hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => toggleRow(series.id)}>
                          <td className="px-6 py-4 text-slate-400">
                             {expandedRow === series.id ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
                          </td>
                          <td className="px-6 py-4 text-sm font-mono text-slate-500">{series.code}</td>
                          <td className="px-6 py-4 font-medium text-slate-800">{series.name}</td>
                          <td className="px-6 py-4 text-sm text-slate-600">{series.season} {series.year}</td>
                          <td className="px-6 py-4">
                             <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {series.departures.length} Dates
                             </span>
                          </td>
                          <td className="px-6 py-4">
                             <button className="text-blue-600 hover:underline text-sm font-medium">Manage</button>
                          </td>
                       </tr>
                       {expandedRow === series.id && (
                          <tr className="bg-slate-50">
                             <td colSpan={6} className="px-6 py-4">
                                <div className="border border-slate-200 rounded-lg bg-white overflow-hidden">
                                   <table className="w-full text-sm">
                                      <thead className="bg-slate-100 text-slate-500">
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
                                               <td className="px-4 py-2 text-blue-600">{dep.booked}</td>
                                               <td className="px-4 py-2">
                                                  <div className="w-24 bg-slate-200 rounded-full h-1.5">
                                                     <div 
                                                       className={`h-1.5 rounded-full ${dep.booked/dep.seats > 0.8 ? 'bg-red-500' : 'bg-green-500'}`} 
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
