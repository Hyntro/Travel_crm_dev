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
      <div className="bg-white max-w-4xl mx-auto shadow-2xl print:shadow-none mb-10 overflow-hidden font-sans">
        {/* Header with Logo Area */}
        <div className="text-center pt-12 pb-6">
           <div className="border-2 border-slate-800 p-2 inline-block mb-6">
              <h2 className="text-2xl font-serif font-bold text-slate-700 tracking-widest px-4 uppercase">Peirce & Leslie</h2>
           </div>
           <h1 className="text-4xl font-serif text-slate-700 mb-2">Cost proposal for</h1>
           <h2 className="text-3xl font-serif text-slate-800">{quotation.travelDate} {quotation.destination}</h2>
        </div>

        {/* Hero Image */}
        <div className="px-12 pb-8 relative group">
           <div className="h-80 w-full overflow-hidden rounded-sm relative">
              <img 
                src="https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&q=80&w=2000" 
                alt="Proposal Cover" 
                className="w-full h-full object-cover"
              />
              {/* Corner Decorations */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-green-700/60 rounded-tl-xl"></div>
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-green-700/60 rounded-br-xl"></div>
           </div>
           <button className="absolute top-2 right-14 text-xs bg-white/80 px-2 py-1 border border-slate-300 text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">Change Image</button>
        </div>

        <div className="px-12 pb-12 print:px-8">
           
           {/* Validity & Destination */}
           <div className="text-center mb-8 bg-blue-50/50 py-4 border-y border-blue-100">
              <h3 className="text-xl font-serif font-bold text-slate-800">Validity : {quotation.travelDate}</h3>
              <h4 className="text-lg font-serif font-bold text-slate-700 mt-1">{quotation.destination}</h4>
           </div>

           {/* Land Arrangements Header */}
           <div className="bg-slate-800 text-white px-4 py-2 mb-1">
              <h4 className="font-bold text-sm uppercase">LAND ARRANGEMENTS: Based on {quotation.paxAdult} pax traveling</h4>
           </div>

           {/* Cost Table */}
           <div className="mb-8">
              <div className="bg-slate-800 text-white px-4 py-2 text-center border-b border-slate-600">
                 <h4 className="font-bold text-sm uppercase">COST OF LAND ARRANGEMENTS</h4>
              </div>
              <div className="border border-slate-300 flex">
                 <div className="flex-1 p-3 text-sm text-slate-700 font-medium">Cost of land arrangements</div>
                 <div className="w-1/3 border-l border-slate-300 p-3 text-sm font-bold text-slate-800">
                    {/* Placeholder Logic for AED currency mock */}
                    AED {(costSheet.finalSalePrice / 20).toFixed(2)} Per Pax X {quotation.paxAdult}
                    <div className="text-blue-600">= Total AED {(costSheet.finalSalePrice * quotation.paxAdult / 20).toFixed(0)}</div>
                 </div>
              </div>
           </div>

           {/* Inclusions */}
           <div className="mb-6">
              <div className="bg-slate-800 text-white px-4 py-2 mb-4">
                 <h4 className="font-bold text-sm uppercase">Inclusion</h4>
              </div>
              <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 leading-relaxed marker:text-slate-400">
                 <li>Accommodation as per itinerary - Double room on twin sharing basis at all destinations. (We will offer choice to select hotel in 4 star category)</li>
                 <li>Daily Breakfast at hotel.</li>
                 <li>Private AC car for all transfers, sightseeing and drives.</li>
                 <li>Assistance on arrival and departure.</li>
                 <li>Monuments Entrance fees during sightseeing.</li>
                 <li>Tour Guides.</li>
                 <li>All the taxes included, no hidden charges.</li>
              </ul>
           </div>

           {/* Exclusions */}
           <div className="mb-6">
              <div className="bg-slate-800 text-white px-4 py-2 mb-4">
                 <h4 className="font-bold text-sm uppercase">Exclusion</h4>
              </div>
              <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 leading-relaxed marker:text-slate-400">
                 <li>Air fare / train fare.</li>
                 <li>Any other item not specified in the Package Inclusions.</li>
                 <li>Gratuities.</li>
                 <li>Lunch and Dinner.</li>
              </ul>
           </div>

        </div>
      </div>
    );
  }

  // Theme 2: Simple (Clean, Text Heavy) - Keeping as is or simplifying further if needed.
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