import React from 'react';
import { Search, Calendar, Filter, Plus, FileText, ArrowRight } from 'lucide-react';
import { TravelQuery, QueryStatus, QueryPriority } from '../types';

// Mock Data
const queries: TravelQuery[] = [
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
  return (
    <div className="p-6 bg-slate-50 min-h-full">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Query Dashboard</h2>
        <div className="flex gap-2">
            <button className="bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
                View Rates
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 shadow-sm transition-colors">
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
            <div className="relative flex-1">
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
                <tr key={q.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-mono text-xs font-semibold text-blue-600">{q.id}</div>
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
