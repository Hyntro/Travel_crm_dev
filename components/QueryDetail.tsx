
import React, { useState } from 'react';
import { ArrowLeft, User, Phone, Mail, Reply, Calendar, ChevronDown, ChevronUp, Plus, CheckCircle, ExternalLink, CreditCard, Users, FileText, Send, Edit, Eye, Trash2, X, Save } from 'lucide-react';
import { TravelQuery, Quotation } from '../types';
import QuotationBuilder from './QuotationBuilder';

interface QueryDetailProps {
  query: TravelQuery;
  onBack: () => void;
}

// Mock initial Quotations for the Query
const mockQuotations: Quotation[] = [
  // Intentionally empty for demo effect, or can populate
];

const QueryDetail: React.FC<QueryDetailProps> = ({ query, onBack }) => {
  const [activeTab, setActiveTab] = useState<'client-comm' | 'supplier-comm' | 'quotation' | 'tour-ext'>('client-comm');
  const [expandedSection, setExpandedSection] = useState<string | null>('to-do');
  
  // Quotation Module State
  const [quotationView, setQuotationView] = useState<'list' | 'builder'>('list');
  const [quotations, setQuotations] = useState<Quotation[]>(mockQuotations);
  const [selectedQuote, setSelectedQuote] = useState<Quotation | null>(null);
  const [showAddQuoteModal, setShowAddQuoteModal] = useState(false);
  
  // Create Quote Form State
  const [newQuoteForm, setNewQuoteForm] = useState({
    subject: `${query.tourDate} ${query.clientName}`,
    hotelCategoryType: 'Single Hotel Category',
    paxSlabType: 'Single Slab',
    hotelMarkupType: 'Service Wise Markup',
    calculationType: 'Service Wise',
    inbuiltPackage: 'Select Package'
  });

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleAddQuoteClick = () => {
    setNewQuoteForm({
        subject: `${query.tourDate} ${query.clientName}`,
        hotelCategoryType: 'Single Hotel Category',
        paxSlabType: 'Single Slab',
        hotelMarkupType: 'Service Wise Markup',
        calculationType: 'Service Wise',
        inbuiltPackage: 'Select Package'
    });
    setShowAddQuoteModal(true);
  };

  const handleSaveQuote = () => {
    const newId = `Q${quotations.length + 1}`;
    const newQuote: Quotation = {
        id: newId,
        queryId: query.id,
        quoteCode: `${query.id}/${String.fromCharCode(65 + quotations.length)}`, // Generates A, B, C...
        version: '1',
        status: 'Draft',
        hotelCategory: 'Standard', // Default
        mealPlan: 'CP',
        clientName: query.clientName,
        destination: query.destination,
        updatedAt: new Date().toISOString().split('T')[0],
        paxAdult: query.pax, // Assuming pax from query
        paxChild: 0,
        travelDate: query.tourDate
    };
    
    // In real app, we would save other form fields (Hotel Category Type etc) to the quotation object
    
    setQuotations([...quotations, newQuote]);
    setShowAddQuoteModal(false);
    
    // Redirect to builder
    setSelectedQuote(newQuote);
    setQuotationView('builder');
  };

  const handleEditQuote = (quote: Quotation) => {
    setSelectedQuote(quote);
    setQuotationView('builder');
  };

  const handleBackToQuoteList = () => {
    setQuotationView('list');
    setSelectedQuote(null);
  };

  const statusColors = {
    'Confirmed': 'bg-green-500',
    'Lost': 'bg-red-500',
    'Quotation Generated': 'bg-blue-500',
    'New': 'bg-teal-500',
    'In Process': 'bg-purple-500',
    'Contacted': 'bg-orange-500'
  };

  const currentStatusColor = statusColors[query.status as keyof typeof statusColors] || 'bg-slate-500';

  return (
    <div className="flex flex-col h-full bg-slate-50 animate-in slide-in-from-right-4 duration-300 relative">
      
      {/* 1. Top Header (Dark) */}
      <div className="bg-slate-900 text-white p-4 flex justify-between items-center shadow-md z-10 shrink-0">
         <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white">
               <ArrowLeft size={20} />
            </button>
            <div>
               <div className="flex items-baseline gap-3">
                  <h2 className="text-xl font-bold">Query ID {query.id}</h2>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${currentStatusColor} text-white`}>
                     {query.status}
                  </span>
               </div>
               <div className="flex gap-4 text-xs text-slate-400 mt-1">
                  <span>Tour ID: {query.tourId}</span>
                  <span>|</span>
                  <span>Ref: R20250731</span>
                  <span>|</span>
                  <span className="flex items-center gap-1 text-slate-300"><Calendar size={12}/> {query.tourDate}</span>
               </div>
            </div>
         </div>
         <div className="flex gap-2">
            <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 border border-slate-700 transition-colors">
               <Reply size={16}/> Reply
            </button>
            <button onClick={onBack} className="bg-white text-slate-900 hover:bg-slate-100 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
               Back
            </button>
         </div>
      </div>

      {/* 2. Sub-Header (Client Summary) */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center gap-6 shadow-sm shrink-0">
         <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg">
               {query.clientName.charAt(0)}
            </div>
            <div>
               <div className="font-bold text-slate-800">{query.clientName}</div>
               <div className="text-xs text-slate-500">{query.clientPhone}</div>
               <div className="text-xs text-slate-500">{query.clientEmail}</div>
            </div>
         </div>
         <div className="h-8 w-px bg-slate-200"></div>
         <div>
            <div className="text-xs text-slate-400 uppercase font-semibold">Destination</div>
            <div className="font-medium text-slate-700">{query.destination}</div>
         </div>
         <div className="h-8 w-px bg-slate-200"></div>
         <div>
            <div className="text-xs text-slate-400 uppercase font-semibold">Pax</div>
            <div className="font-medium text-slate-700">{query.pax} Travelers</div>
         </div>
         <div className="h-8 w-px bg-slate-200"></div>
         <div>
            <div className="text-xs text-slate-400 uppercase font-semibold">Priority</div>
            <div className={`font-bold ${query.priority === 'High' ? 'text-red-600' : 'text-slate-600'}`}>{query.priority}</div>
         </div>
      </div>

      {/* 3. Status Bar */}
      <div className={`${currentStatusColor} text-white px-6 py-2 text-sm font-bold flex items-center justify-between shrink-0`}>
         <span>Current Status: {query.status}</span>
         <span className="text-xs opacity-80 font-normal">Last updated: Today, 11:30 AM</span>
      </div>

      {/* 4. Main Two-Panel Content */}
      <div className="flex-1 flex overflow-hidden">
         
         {/* LEFT PANEL (Tabs & Content) */}
         <div className="flex-1 flex flex-col bg-white border-r border-slate-200 overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-slate-200 bg-slate-50/50 shrink-0">
               <button 
                  onClick={() => setActiveTab('client-comm')}
                  className={`flex-1 py-3 text-sm font-semibold border-b-2 transition-colors ${activeTab === 'client-comm' ? 'border-orange-500 text-orange-600 bg-orange-50/50' : 'border-transparent text-slate-600 hover:bg-slate-100'}`}
               >
                  Client Communication
               </button>
               <button 
                  onClick={() => setActiveTab('supplier-comm')}
                  className={`flex-1 py-3 text-sm font-semibold border-b-2 transition-colors ${activeTab === 'supplier-comm' ? 'border-green-500 text-green-600 bg-green-50/50' : 'border-transparent text-slate-600 hover:bg-slate-100'}`}
               >
                  Supplier Communication
               </button>
               <button 
                  onClick={() => setActiveTab('quotation')}
                  className={`flex-1 py-3 text-sm font-semibold border-b-2 transition-colors ${activeTab === 'quotation' ? 'border-blue-500 text-blue-600 bg-blue-50/50' : 'border-transparent text-slate-600 hover:bg-slate-100'}`}
               >
                  Quotation
               </button>
               <button 
                  onClick={() => setActiveTab('tour-ext')}
                  className={`flex-1 py-3 text-sm font-semibold border-b-2 transition-colors ${activeTab === 'tour-ext' ? 'border-purple-500 text-purple-600 bg-purple-50/50' : 'border-transparent text-slate-600 hover:bg-slate-100'}`}
               >
                  Tour Extension
               </button>
            </div>

            {/* Tab Content Area */}
            <div className="flex-1 overflow-y-auto bg-slate-50 flex flex-col">
               {activeTab === 'client-comm' && (
                  <div className="p-6">
                     {/* Chat Interface Mock */}
                     <div className="space-y-6">
                        <div className="flex gap-4">
                           <div className="w-8 h-8 rounded-full bg-slate-200 flex-shrink-0 flex items-center justify-center text-xs font-bold text-slate-600">You</div>
                           <div className="flex-1 bg-white p-4 rounded-lg rounded-tl-none shadow-sm border border-slate-100">
                              <p className="text-sm text-slate-700">Dear Sir, Greetings from DeBox services! Thanks for writing to us. We are working on your request and will get back to you shortly with the best options.</p>
                              <div className="mt-2 text-xs text-slate-400 text-right">11:31 AM - 27-11-2025</div>
                           </div>
                        </div>
                        <div className="flex gap-4 flex-row-reverse">
                           <div className="w-8 h-8 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center text-xs font-bold text-blue-600">RK</div>
                           <div className="flex-1 bg-blue-50 p-4 rounded-lg rounded-tr-none shadow-sm border border-blue-100">
                              <p className="text-sm text-slate-700">Thanks. Please make sure to include a visit to Kyoto as discussed.</p>
                              <div className="mt-2 text-xs text-blue-400 text-right">11:45 AM - 27-11-2025</div>
                           </div>
                        </div>
                     </div>
                     <div className="mt-8 bg-white p-4 rounded-xl border border-slate-200 shadow-sm sticky bottom-0">
                        <textarea placeholder="Type your reply here..." className="w-full border border-slate-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-orange-400 outline-none resize-none h-24 mb-2"></textarea>
                        <div className="flex justify-end">
                           <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
                              <Send size={16}/> Send Reply
                           </button>
                        </div>
                     </div>
                  </div>
               )}

               {activeTab === 'supplier-comm' && (
                  <div className="p-12 text-center text-slate-400">
                     <Mail size={48} className="mx-auto mb-4 opacity-50"/>
                     <p>No supplier communication yet.</p>
                     <button className="mt-4 px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium hover:bg-white transition-colors">Start New Thread</button>
                  </div>
               )}

               {activeTab === 'quotation' && (
                  <div className="h-full flex flex-col">
                     {quotationView === 'list' && (
                        <div className="p-6">
                           <div className="flex justify-between items-center mb-6">
                              <div className="space-y-1">
                                 <h3 className="text-lg font-bold text-slate-700">{query.tourDate} {query.clientName}</h3>
                                 <div className="flex gap-2">
                                    <span className="bg-blue-100 text-blue-600 text-[10px] px-2 py-0.5 rounded font-bold">Created</span>
                                 </div>
                              </div>
                              <div className="flex gap-2">
                                 <button 
                                    onClick={handleAddQuoteClick}
                                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 shadow-sm transition-colors"
                                 >
                                    Add Quotation
                                 </button>
                                 <button className="bg-white border border-slate-300 text-slate-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
                                    Back
                                 </button>
                              </div>
                           </div>

                           <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                              <table className="w-full text-left">
                                 <thead className="bg-slate-50 border-b border-slate-200">
                                    <tr>
                                       <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Quotation ID</th>
                                       <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Creation Date</th>
                                       <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">From Date</th>
                                       <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">To Date</th>
                                       <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Duration</th>
                                       <th className="px-4 py-3 text-right text-xs font-bold text-slate-500 uppercase">Action</th>
                                    </tr>
                                 </thead>
                                 <tbody className="divide-y divide-slate-100">
                                    {quotations.length === 0 ? (
                                       <tr>
                                          <td colSpan={6} className="px-4 py-8 text-center text-slate-400 text-sm">
                                             No Quotation Found
                                          </td>
                                       </tr>
                                    ) : (
                                       quotations.map(quote => (
                                          <tr key={quote.id} className="hover:bg-slate-50">
                                             <td className="px-4 py-3 text-sm font-medium text-blue-600">{quote.quoteCode}</td>
                                             <td className="px-4 py-3 text-sm text-slate-600">{quote.updatedAt}</td>
                                             <td className="px-4 py-3 text-sm text-slate-600">{quote.travelDate}</td>
                                             <td className="px-4 py-3 text-sm text-slate-600">-</td>
                                             <td className="px-4 py-3 text-sm text-slate-600">-</td>
                                             <td className="px-4 py-3 text-right">
                                                <div className="flex justify-end gap-2">
                                                   <button onClick={() => handleEditQuote(quote)} className="p-1.5 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded" title="Edit"><Edit size={14}/></button>
                                                   <button className="p-1.5 text-slate-500 bg-slate-100 hover:bg-slate-200 rounded" title="View"><Eye size={14}/></button>
                                                   <button className="p-1.5 text-red-500 bg-red-50 hover:bg-red-100 rounded" title="Delete"><Trash2 size={14}/></button>
                                                </div>
                                             </td>
                                          </tr>
                                       ))
                                    )}
                                 </tbody>
                              </table>
                           </div>
                        </div>
                     )}

                     {quotationView === 'builder' && (
                        <QuotationBuilder 
                           embedded={true} 
                           initialData={selectedQuote || undefined}
                           onBack={handleBackToQuoteList}
                        />
                     )}
                  </div>
               )}

               {activeTab === 'tour-ext' && (
                  <div className="p-6">
                     <div className="bg-white p-6 rounded-xl border border-slate-200 text-center">
                        <Plus size={48} className="mx-auto text-purple-200 mb-4"/>
                        <h3 className="text-lg font-bold text-slate-700">Add Pre/Post Tour Extension</h3>
                        <p className="text-sm text-slate-500 mb-6">Extend the trip with additional nights or destinations.</p>
                        <button className="bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors">Create Extension</button>
                     </div>
                  </div>
               )}
            </div>
         </div>

         {/* RIGHT PANEL (Sidebar) */}
         <div className="w-80 lg:w-96 bg-white border-l border-slate-200 flex flex-col overflow-y-auto shrink-0">
            
            {/* Accordion Sections */}
            <div className="divide-y divide-slate-100">
               {[
                  { id: 'important-links', title: 'Important Links', icon: ExternalLink, color: 'text-green-600' },
                  { id: 'payment', title: 'Payment Information', icon: CreditCard, color: 'text-green-600' },
                  { id: 'supplier-info', title: 'Supplier Information', icon: Users, color: 'text-green-600' },
                  { id: 'to-do', title: 'TO DO LIST', icon: CheckCircle, color: 'text-green-600' },
                  { id: 'client-info', title: 'Client Information', icon: User, color: 'text-green-600' },
                  { id: 'assign-user', title: 'Assign User', icon: Users, color: 'text-green-600' }
               ].map(section => (
                  <div key={section.id} className="bg-white">
                     <button 
                        onClick={() => toggleSection(section.id)}
                        className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-50 transition-colors"
                     >
                        <div className="flex items-center gap-2">
                           <div className={`p-1 rounded bg-green-50 ${section.color}`}><Plus size={12}/></div>
                           <span className={`text-sm font-medium ${section.id === expandedSection ? 'text-green-700' : 'text-slate-600'}`}>{section.title}</span>
                        </div>
                     </button>
                     {expandedSection === section.id && (
                        <div className="px-4 pb-4 animate-in slide-in-from-top-1 duration-200">
                           <div className="text-xs text-slate-500 bg-slate-50 p-3 rounded border border-slate-100">
                              {section.id === 'to-do' ? (
                                 <ul className="space-y-2">
                                    <li className="flex items-center gap-2"><input type="checkbox" className="rounded text-green-600"/><span className="line-through text-slate-400">Send initial quote</span></li>
                                    <li className="flex items-center gap-2"><input type="checkbox" className="rounded text-green-600"/><span>Confirm hotel availability</span></li>
                                    <li className="flex items-center gap-2"><input type="checkbox" className="rounded text-green-600"/><span>Collect deposit</span></li>
                                 </ul>
                              ) : (
                                 <p className="italic">No information available.</p>
                              )}
                           </div>
                        </div>
                     )}
                  </div>
               ))}
            </div>

            {/* Status Grid */}
            <div className="p-4 border-t border-slate-200 mt-auto bg-slate-50">
               <h4 className="text-xs font-bold text-slate-500 uppercase mb-3">Update Status</h4>
               <div className="grid grid-cols-2 gap-2">
                  <button className="bg-blue-100 text-blue-700 text-xs font-medium py-2 rounded hover:bg-blue-200 border border-blue-200">Contacted</button>
                  <button className="bg-orange-100 text-orange-700 text-xs font-medium py-2 rounded hover:bg-orange-200 border border-orange-200">Hot</button>
                  <button className="bg-purple-100 text-purple-700 text-xs font-medium py-2 rounded hover:bg-purple-200 border border-purple-200">In Process</button>
                  <button className="bg-green-600 text-white text-xs font-medium py-2 rounded hover:bg-green-700 shadow-sm">Tour Finished</button>
                  <button className="bg-red-100 text-red-700 text-xs font-medium py-2 rounded hover:bg-red-200 border border-red-200">Query Closed</button>
                  <button className="bg-red-100 text-red-700 text-xs font-medium py-2 rounded hover:bg-red-200 border border-red-200">Query Lost</button>
                  <button className="bg-red-600 text-white text-xs font-medium py-2 rounded hover:bg-red-700 col-span-2 shadow-sm">Query Cancel</button>
               </div>
            </div>

            {/* Notes Section */}
            <div className="p-4 border-t border-slate-200 bg-green-50/30">
               <h4 className="text-xs font-bold text-slate-700 mb-2">Notes & Reminder</h4>
               <div className="grid grid-cols-3 gap-2 mb-2">
                  <div className="bg-blue-100 text-blue-800 text-[10px] p-2 rounded text-center font-medium">Internal Note's</div>
                  <div className="bg-green-100 text-green-800 text-[10px] p-2 rounded text-center font-medium">Talk in progress</div>
                  <div className="bg-green-100 text-green-800 text-[10px] p-2 rounded text-center font-medium">Finalizing soon</div>
               </div>
               <textarea className="w-full border border-slate-300 rounded p-2 text-xs outline-none bg-white focus:border-green-500 resize-none h-16" placeholder="Add a note..."></textarea>
            </div>

            {/* Remarks */}
            <div className="p-4 border-t border-slate-200">
               <h4 className="text-xs font-medium text-slate-500 mb-1">Remarks</h4>
               <div className="h-20 bg-white border border-slate-200 rounded"></div>
            </div>

         </div>
      </div>

      {/* Add Quotation Modal */}
      {showAddQuoteModal && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
               <div className="bg-slate-800 px-6 py-4 flex justify-between items-center">
                  <h3 className="text-lg font-bold text-white uppercase tracking-wide">Select Quotation</h3>
                  <button onClick={() => setShowAddQuoteModal(false)} className="text-slate-400 hover:text-white"><X size={20} /></button>
               </div>
               <div className="p-6 space-y-4">
                  <div>
                     <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Subject</label>
                     <input 
                        type="text" 
                        value={newQuoteForm.subject} 
                        onChange={(e) => setNewQuoteForm({...newQuoteForm, subject: e.target.value})}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-800"
                     />
                     <div className="h-0.5 w-8 bg-red-500 mt-1"></div>
                  </div>
                  <div>
                     <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Hotel Category Type</label>
                     <select 
                        value={newQuoteForm.hotelCategoryType}
                        onChange={(e) => setNewQuoteForm({...newQuoteForm, hotelCategoryType: e.target.value})}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
                     >
                        <option>Single Hotel Category</option>
                        <option>Multiple Hotel Category</option>
                     </select>
                     <div className="h-0.5 w-8 bg-red-500 mt-1"></div>
                  </div>
                  <div>
                     <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Pax Slab Type</label>
                     <select 
                        value={newQuoteForm.paxSlabType}
                        onChange={(e) => setNewQuoteForm({...newQuoteForm, paxSlabType: e.target.value})}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
                     >
                        <option>Single Slab</option>
                        <option>Multiple Slab</option>
                     </select>
                     <p className="text-[10px] text-blue-400 mt-1 leading-tight">
                        [ Note:- 1. Single slab then you may take multiple hotels for each day. ]<br/>
                        [ Note:- 2. Multiple slab then you only take single hotel for each day. ]
                     </p>
                  </div>
                  <div>
                     <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Hotel Markup Type</label>
                     <select 
                        value={newQuoteForm.hotelMarkupType}
                        onChange={(e) => setNewQuoteForm({...newQuoteForm, hotelMarkupType: e.target.value})}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
                     >
                        <option>Service Wise Markup</option>
                        <option>Total Markup</option>
                     </select>
                  </div>
                  <div>
                     <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Calculation Type</label>
                     <select 
                        value={newQuoteForm.calculationType}
                        onChange={(e) => setNewQuoteForm({...newQuoteForm, calculationType: e.target.value})}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
                     >
                        <option>Service Wise</option>
                        <option>Net Total</option>
                     </select>
                     <div className="h-0.5 w-8 bg-red-500 mt-1"></div>
                  </div>
                  <div>
                     <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Select Inbuilt Packages</label>
                     <select 
                        value={newQuoteForm.inbuiltPackage}
                        onChange={(e) => setNewQuoteForm({...newQuoteForm, inbuiltPackage: e.target.value})}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
                     >
                        <option>Select Package</option>
                        <option>Golden Triangle</option>
                        <option>Kerala Bliss</option>
                     </select>
                  </div>
               </div>
               <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-center gap-3">
                  <button onClick={handleSaveQuote} className="px-8 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-full text-sm font-bold flex items-center gap-2">
                     <Save size={16}/> Save
                  </button>
                  <button onClick={() => setShowAddQuoteModal(false)} className="px-8 py-2 bg-white border border-slate-300 text-slate-600 rounded-full text-sm font-medium hover:bg-slate-50">
                     Cancel
                  </button>
               </div>
            </div>
         </div>
      )}

    </div>
  );
};

export default QueryDetail;
