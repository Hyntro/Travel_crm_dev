
import React from 'react';
import { Quotation, QuotationItineraryDay, CostSheet } from '../types';
import { MapPin, Calendar, Check, X, Phone, Mail, Globe, Clock, Coffee, Bus, Hotel, Flag } from 'lucide-react';

interface ProposalProps {
  theme: 'Aspire' | 'Simple';
  quotation: Quotation;
  itinerary: QuotationItineraryDay[];
  costSheet: CostSheet;
}

const ProposalTemplates: React.FC<ProposalProps> = ({ theme, quotation, itinerary, costSheet }) => {
  
  // Theme 1: Aspire (Visual, Modern)
  if (theme === 'Aspire') {
    return (
      <div className="bg-white max-w-4xl mx-auto shadow-2xl print:shadow-none mb-10 overflow-hidden">
        {/* Hero Section */}
        <div className="relative h-64 md:h-80 bg-slate-900 text-white overflow-hidden">
           <img 
             src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=2070" 
             alt="Destination" 
             className="w-full h-full object-cover opacity-60"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent flex flex-col justify-end p-8">
              <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-bold uppercase tracking-wider mb-3 w-fit rounded">Travel Proposal</span>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">Trip to {quotation.destination}</h1>
              <p className="text-xl text-slate-200">Prepared for {quotation.clientName}</p>
           </div>
        </div>

        <div className="p-8 print:p-0">
           {/* Info Bar */}
           <div className="flex flex-wrap gap-6 mb-12 pb-6 border-b border-slate-100 text-sm">
              <div className="flex items-center gap-2 text-slate-600">
                 <Calendar className="text-blue-500" size={18} />
                 <div>
                    <span className="block font-bold text-slate-800">Start Date</span>
                    {quotation.travelDate}
                 </div>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                 <Clock className="text-blue-500" size={18} />
                 <div>
                    <span className="block font-bold text-slate-800">Duration</span>
                    {itinerary.length} Days
                 </div>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                 <MapPin className="text-blue-500" size={18} />
                 <div>
                    <span className="block font-bold text-slate-800">Destination</span>
                    {quotation.destination}
                 </div>
              </div>
              <div className="flex-1 text-right">
                 <span className="block text-xs text-slate-400 uppercase">Quote Ref</span>
                 <span className="font-mono text-slate-800">{quotation.quoteCode}</span>
              </div>
           </div>

           {/* Itinerary Timeline */}
           <div className="mb-12">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                 <span className="w-2 h-8 bg-blue-600 rounded-sm"></span> Your Itinerary
              </h2>
              <div className="space-y-8 relative before:absolute before:left-[19px] before:top-4 before:bottom-4 before:w-0.5 before:bg-slate-200">
                 {itinerary.map((day) => (
                    <div key={day.id} className="relative pl-12">
                       <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold z-10 border-4 border-white shadow-sm">
                          {day.dayNumber}
                       </div>
                       <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start mb-3">
                             <div>
                                <h3 className="text-lg font-bold text-slate-800">{day.cityName}</h3>
                                <p className="text-sm text-blue-600 font-medium">{day.date}</p>
                             </div>
                             <div className="flex gap-2">
                                {day.services.hotel && <Hotel size={16} className="text-slate-400" title="Hotel Included"/>}
                                {day.services.transfer && <Bus size={16} className="text-slate-400" title="Transfer Included"/>}
                                {day.services.guide && <Flag size={16} className="text-slate-400" title="Guide Included"/>}
                             </div>
                          </div>
                          <p className="text-slate-600 leading-relaxed text-sm">{day.description}</p>
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           {/* Inclusions / Exclusions */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                 <h3 className="font-bold text-green-800 mb-4 flex items-center gap-2">
                    <Check size={20} /> Inclusions
                 </h3>
                 <ul className="space-y-2">
                    <li className="flex gap-2 text-sm text-green-900"><Check size={16} className="mt-0.5 shrink-0"/> Accommodation in selected hotels</li>
                    <li className="flex gap-2 text-sm text-green-900"><Check size={16} className="mt-0.5 shrink-0"/> Daily Breakfast (MAP Plan)</li>
                    <li className="flex gap-2 text-sm text-green-900"><Check size={16} className="mt-0.5 shrink-0"/> Private Airport Transfers</li>
                    <li className="flex gap-2 text-sm text-green-900"><Check size={16} className="mt-0.5 shrink-0"/> Sightseeing as per itinerary</li>
                 </ul>
              </div>
              <div className="bg-red-50 p-6 rounded-xl border border-red-100">
                 <h3 className="font-bold text-red-800 mb-4 flex items-center gap-2">
                    <X size={20} /> Exclusions
                 </h3>
                 <ul className="space-y-2">
                    <li className="flex gap-2 text-sm text-red-900"><X size={16} className="mt-0.5 shrink-0"/> International Airfare</li>
                    <li className="flex gap-2 text-sm text-red-900"><X size={16} className="mt-0.5 shrink-0"/> Visa Fees</li>
                    <li className="flex gap-2 text-sm text-red-900"><X size={16} className="mt-0.5 shrink-0"/> Personal Expenses (Laundry, Calls)</li>
                    <li className="flex gap-2 text-sm text-red-900"><X size={16} className="mt-0.5 shrink-0"/> Travel Insurance</li>
                 </ul>
              </div>
           </div>

           {/* Costing Section */}
           <div className="bg-slate-900 text-white p-8 rounded-xl flex flex-col md:flex-row justify-between items-center mb-12">
              <div>
                 <h3 className="text-2xl font-bold mb-1">Total Package Cost</h3>
                 <p className="text-slate-400 text-sm">Inclusive of all taxes & service charges</p>
              </div>
              <div className="text-right mt-4 md:mt-0">
                 <span className="text-4xl font-bold text-blue-400">${costSheet.finalSalePrice.toLocaleString()}</span>
                 <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Per Person</p>
              </div>
           </div>

           {/* Terms */}
           <div className="text-xs text-slate-500 border-t border-slate-100 pt-6">
              <h4 className="font-bold text-slate-700 uppercase mb-2">Terms & Conditions</h4>
              <p>Rates are subject to availability at the time of booking. 50% advance required to confirm booking. Cancellation policy applies as per hotel rules.</p>
           </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-100 p-6 text-center text-slate-500 text-sm mt-auto print:hidden">
           <div className="flex justify-center gap-6 mb-2">
              <span className="flex items-center gap-1"><Phone size={14}/> +1 555 123 4567</span>
              <span className="flex items-center gap-1"><Mail size={14}/> info@travelcrm.com</span>
              <span className="flex items-center gap-1"><Globe size={14}/> www.travelcrm.com</span>
           </div>
           <p>&copy; 2025 TravelCRM. All rights reserved.</p>
        </div>
      </div>
    );
  }

  // Theme 2: Simple (Clean, Text Heavy)
  return (
    <div className="bg-white max-w-4xl mx-auto p-12 shadow-2xl print:shadow-none print:p-0 mb-10 font-serif">
       <div className="text-center border-b-2 border-black pb-6 mb-8">
          <h1 className="text-3xl font-bold uppercase tracking-widest mb-2">Travel Proposal</h1>
          <p className="text-lg italic">Prepared for {quotation.clientName}</p>
       </div>

       <div className="mb-8">
          <table className="w-full text-sm border-collapse border border-black">
             <tbody>
                <tr>
                   <td className="border border-black p-2 font-bold bg-gray-100">Destination</td>
                   <td className="border border-black p-2">{quotation.destination}</td>
                   <td className="border border-black p-2 font-bold bg-gray-100">Travel Date</td>
                   <td className="border border-black p-2">{quotation.travelDate}</td>
                </tr>
                <tr>
                   <td className="border border-black p-2 font-bold bg-gray-100">Reference</td>
                   <td className="border border-black p-2">{quotation.quoteCode}</td>
                   <td className="border border-black p-2 font-bold bg-gray-100">Total Nights</td>
                   <td className="border border-black p-2">{itinerary.length - 1} Nights</td>
                </tr>
             </tbody>
          </table>
       </div>

       <div className="mb-8">
          <h2 className="font-bold uppercase border-b border-black mb-4 pb-1">Itinerary Detail</h2>
          <div className="space-y-4">
             {itinerary.map((day) => (
                <div key={day.id}>
                   <h3 className="font-bold text-sm bg-gray-100 p-1 inline-block mb-1">Day {day.dayNumber}: {day.cityName} ({day.date})</h3>
                   <p className="text-sm leading-relaxed text-justify">{day.description}</p>
                </div>
             ))}
          </div>
       </div>

       <div className="flex gap-8 mb-8">
          <div className="flex-1">
             <h2 className="font-bold uppercase border-b border-black mb-4 pb-1">Inclusions</h2>
             <ul className="text-sm list-disc pl-4 space-y-1">
                <li>Accommodation on Twin Share basis</li>
                <li>Daily Breakfast</li>
                <li>All transfers by private vehicle</li>
                <li>Driver allowance, toll, parking</li>
             </ul>
          </div>
          <div className="flex-1">
             <h2 className="font-bold uppercase border-b border-black mb-4 pb-1">Exclusions</h2>
             <ul className="text-sm list-disc pl-4 space-y-1">
                <li>Airfare / Train fare</li>
                <li>Personal expenses</li>
                <li>Tips & Gratuities</li>
                <li>Anything not mentioned in inclusions</li>
             </ul>
          </div>
       </div>

       <div className="border-2 border-black p-4 text-center mb-8">
          <p className="uppercase font-bold text-sm mb-1">Total Package Cost</p>
          <p className="text-2xl font-bold">${costSheet.finalSalePrice.toLocaleString()}</p>
          <p className="text-xs italic">Per Person</p>
       </div>

       <div className="text-xs text-justify">
          <p className="font-bold uppercase mb-1">Terms & Conditions:</p>
          <p>This is a computer generated proposal and does not require a signature. Rates valid for 7 days.</p>
       </div>
    </div>
  );
};

export default ProposalTemplates;
