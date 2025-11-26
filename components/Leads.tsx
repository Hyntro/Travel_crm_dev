import React, { useState } from 'react';
import { Search, Plus, MoreVertical, Sparkles, MessageSquare } from 'lucide-react';
import { Lead, LeadStatus } from '../types';
import { analyzeLeadNotes } from '../services/geminiService';

const initialLeads: Lead[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    phone: '+1 (555) 123-4567',
    status: LeadStatus.NEW,
    notes: "Interested in a honeymoon trip to Bali or Maldives. Likes luxury but budget is tight. 10 days in June.",
    createdAt: '2024-05-15',
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'm.chen@techcorp.com',
    phone: '+1 (555) 987-6543',
    status: LeadStatus.CONTACTED,
    notes: "Corporate retreat for 20 people. Looking for adventure activities. Maybe Costa Rica? High budget.",
    createdAt: '2024-05-14',
  },
  {
    id: '3',
    name: 'Emma Davis',
    email: 'emma.d@example.com',
    phone: '+1 (555) 456-7890',
    status: LeadStatus.QUALIFIED,
    notes: "Family trip to Europe. Kids are 5 and 7. Wants Disney Paris included. Not sure about budget.",
    createdAt: '2024-05-12',
  }
];

const Leads: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [analyzingId, setAnalyzingId] = useState<string | null>(null);

  const handleAnalyze = async (id: string, notes: string) => {
    setAnalyzingId(id);
    try {
      const insight = await analyzeLeadNotes(notes);
      setLeads(current => current.map(lead => {
        if (lead.id === id) {
          return {
            ...lead,
            aiInsight: insight.summary,
            sentiment: insight.sentiment as any,
            budget: insight.potentialValue === "Luxury" ? 10000 : insight.potentialValue === "Moderate" ? 5000 : 2000,
          };
        }
        return lead;
      }));
    } catch (e) {
      alert("Failed to analyze lead");
    } finally {
      setAnalyzingId(null);
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Leads & Prospects</h2>
          <p className="text-slate-500 mt-1">Manage and qualify your potential clients.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm">
          <Plus size={20} />
          <span>Add New Lead</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search leads by name, email, or status..." 
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <select className="border border-slate-200 rounded-lg px-3 py-2 text-slate-600 focus:outline-none">
              <option>All Statuses</option>
              <option>New</option>
              <option>Contacted</option>
              <option>Qualified</option>
            </select>
          </div>
        </div>

        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Client Info</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Notes & Insights</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg">
                      {lead.name.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-slate-900">{lead.name}</div>
                      <div className="text-sm text-slate-500">{lead.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full 
                    ${lead.status === LeadStatus.NEW ? 'bg-green-100 text-green-800' : 
                      lead.status === LeadStatus.CONTACTED ? 'bg-blue-100 text-blue-800' :
                      lead.status === LeadStatus.QUALIFIED ? 'bg-purple-100 text-purple-800' : 'bg-slate-100 text-slate-800'}`}>
                    {lead.status}
                  </span>
                </td>
                <td className="px-6 py-4 max-w-md">
                  <p className="text-sm text-slate-600 truncate">{lead.notes}</p>
                  {lead.aiInsight && (
                     <div className="mt-2 p-2 bg-indigo-50 border border-indigo-100 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <Sparkles size={14} className="text-indigo-600"/>
                          <span className="text-xs font-bold text-indigo-700">AI Analysis</span>
                        </div>
                        <p className="text-xs text-indigo-900">{lead.aiInsight}</p>
                        {lead.sentiment && (
                          <div className="mt-1 flex gap-2">
                             <span className={`text-[10px] px-1.5 py-0.5 rounded border ${
                               lead.sentiment === 'Positive' ? 'bg-green-50 border-green-200 text-green-700' : 
                               lead.sentiment === 'Negative' ? 'bg-red-50 border-red-200 text-red-700' : 
                               'bg-slate-50 border-slate-200 text-slate-700'
                             }`}>{lead.sentiment}</span>
                          </div>
                        )}
                     </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => handleAnalyze(lead.id, lead.notes)}
                      disabled={analyzingId === lead.id}
                      className="text-indigo-600 hover:text-indigo-900 disabled:opacity-50"
                      title="Analyze with AI"
                    >
                      {analyzingId === lead.id ? <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div> : <Sparkles size={18} />}
                    </button>
                    <button className="text-slate-400 hover:text-blue-600">
                      <MessageSquare size={18} />
                    </button>
                    <button className="text-slate-400 hover:text-slate-600">
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leads;