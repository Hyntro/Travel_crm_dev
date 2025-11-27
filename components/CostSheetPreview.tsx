import React from 'react';
import { X, Printer, Download } from 'lucide-react';
import { Quotation, QuotationItineraryDay, CostSheet } from '../types';

interface CostSheetPreviewProps {
  quotation: Quotation;
  days: QuotationItineraryDay[];
  costSheet: CostSheet;
  onClose: () => void;
}

const CostSheetPreview: React.FC<CostSheetPreviewProps> = ({ quotation, days, costSheet, onClose }) => {
  const totalMarkup = costSheet.markupPercentage;
  
  // Helper to calculate row totals with markup
  const getMarkedUp = (cost: number) => cost + (cost * totalMarkup / 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-6xl h-[90vh] rounded-lg shadow-2xl flex flex-col overflow-hidden font-sans">
        
        {/* Header */}
        <div className="bg-slate-800 text-white px-4 py-3 flex justify-between items-center shrink-0">
          <h3 className="font-bold text-sm uppercase tracking-wide">
            COST SHEET | {quotation.quoteCode}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
          
          {/* Info Block */}
          <div className="bg-white p-4 border border-slate-200 rounded-sm mb-6 text-xs text-slate-700 grid grid-cols-2 md:grid-cols-4 gap-4">
             <div>
                <span className="block font-bold text-slate-900">Tour Id :</span>
                {quotation.queryId}
             </div>
             <div>
                <span className="block font-bold text-slate-900">Operation Person :</span>
                -
             </div>
             <div>
                <span className="block font-bold text-slate-900">Arrival Date :</span>
                {quotation.travelDate}
             </div>
             <div>
                <span className="block font-bold text-slate-900">Sales Person :</span>
                Demo User
             </div>
             <div>
                <span className="block font-bold text-slate-900">Agent Name :</span>
                {quotation.clientName}
             </div>
             <div>
                <span className="block font-bold text-slate-900">R.O.E :</span>
                INR 1 As on: {new Date().toLocaleDateString()}
             </div>
             <div>
                <span className="block font-bold text-slate-900">Lead Pax Name :</span>
                {quotation.clientName}
             </div>
             <div>
                <span className="block font-bold text-slate-900">Printed On:</span>
                {new Date().toLocaleString()}
             </div>
          </div>

          <h4 className="text-center font-bold text-lg text-slate-800 mb-4 uppercase underline underline-offset-4">Cost Sheet Detail</h4>

          {/* Table 1: Hotel Rates */}
          <div className="bg-white border border-slate-300 mb-6 overflow-hidden">
             <table className="w-full text-xs border-collapse">
                <thead className="bg-slate-100 text-slate-800 font-bold">
                   <tr>
                      <th className="border border-slate-300 p-2 text-left w-32">Day/Date</th>
                      <th className="border border-slate-300 p-2 text-left">City</th>
                      <th className="border border-slate-300 p-2 text-left">Hotels</th>
                      <th colSpan={7} className="border border-slate-300 p-2 text-center">Hotel Rates</th>
                      <th className="border border-slate-300 p-2 text-center">Train</th>
                   </tr>
                   <tr>
                      <th colSpan={3} className="border border-slate-300"></th>
                      <th className="border border-slate-300 p-1 text-center">SGL</th>
                      <th className="border border-slate-300 p-1 text-center">DBL</th>
                      <th className="border border-slate-300 p-1 text-center">TPL</th>
                      <th className="border border-slate-300 p-1 text-center">TWN</th>
                      <th className="border border-slate-300 p-1 text-center">B(A)</th>
                      <th className="border border-slate-300 p-1 text-center">L(A)</th>
                      <th className="border border-slate-300 p-1 text-center">D(A)</th>
                      <th className="border border-slate-300 p-1 text-center">Adult</th>
                   </tr>
                </thead>
                <tbody>
                   {days.map((day) => (
                      <tr key={day.id}>
                         <td className="border border-slate-300 p-2 font-medium">{day.dayNumber} - {day.date}</td>
                         <td className="border border-slate-300 p-2">{day.cityName}</td>
                         <td className="border border-slate-300 p-2">
                            {day.itineraryHotels.map(h => h.hotelName).join(', ') || '-'}
                         </td>
                         {/* Mocking Rate Distribution for Display */}
                         <td className="border border-slate-300 p-2 text-right">0</td>
                         <td className="border border-slate-300 p-2 text-right">{day.itineraryHotels.reduce((sum, h) => sum + (h.overrideCost || h.cost), 0)}</td>
                         <td className="border border-slate-300 p-2 text-right">0</td>
                         <td className="border border-slate-300 p-2 text-right">0</td>
                         <td className="border border-slate-300 p-2 text-right">0</td>
                         <td className="border border-slate-300 p-2 text-right">0</td>
                         <td className="border border-slate-300 p-2 text-right">0</td>
                         <td className="border border-slate-300 p-2 text-right">
                            {day.itineraryFlights.reduce((sum, f) => sum + (f.overrideCost || f.cost), 0).toFixed(2)}
                         </td>
                      </tr>
                   ))}
                   {/* Totals Row */}
                   <tr className="bg-orange-100 font-bold">
                      <td colSpan={3} className="border border-slate-300 p-2 text-right">Total</td>
                      <td className="border border-slate-300 p-2 text-right">0.00</td>
                      <td className="border border-slate-300 p-2 text-right">{costSheet.hotelCost.toFixed(2)}</td>
                      <td className="border border-slate-300 p-2 text-right">0.00</td>
                      <td className="border border-slate-300 p-2 text-right">0.00</td>
                      <td className="border border-slate-300 p-2 text-right">0.00</td>
                      <td className="border border-slate-300 p-2 text-right">0.00</td>
                      <td className="border border-slate-300 p-2 text-right">0.00</td>
                      <td className="border border-slate-300 p-2 text-right">{costSheet.flightCost.toFixed(2)}</td>
                   </tr>
                   <tr className="bg-white">
                      <td colSpan={3} className="border border-slate-300 p-2 text-right font-bold">Mark Up (%)</td>
                      <td colSpan={8} className="border border-slate-300 p-2 text-center font-bold">{totalMarkup}%</td>
                   </tr>
                   <tr className="bg-orange-50 font-bold">
                      <td colSpan={3} className="border border-slate-300 p-2 text-right">Grand Total</td>
                      <td className="border border-slate-300 p-2 text-right">0.00</td>
                      <td className="border border-slate-300 p-2 text-right">{getMarkedUp(costSheet.hotelCost).toFixed(2)}</td>
                      <td className="border border-slate-300 p-2 text-right">0.00</td>
                      <td className="border border-slate-300 p-2 text-right">0.00</td>
                      <td className="border border-slate-300 p-2 text-right">0.00</td>
                      <td className="border border-slate-300 p-2 text-right">0.00</td>
                      <td className="border border-slate-300 p-2 text-right">0.00</td>
                      <td className="border border-slate-300 p-2 text-right">{getMarkedUp(costSheet.flightCost).toFixed(2)}</td>
                   </tr>
                </tbody>
             </table>
          </div>

          {/* Table 2: Service Costs */}
          <div className="bg-white border border-slate-300 mb-6 overflow-hidden">
             <table className="w-full text-xs border-collapse">
                <thead className="bg-slate-100 text-slate-800 font-bold">
                   <tr>
                      <th className="border border-slate-300 p-2 text-left w-32">Day/Date</th>
                      <th className="border border-slate-300 p-2 text-left">City</th>
                      <th className="border border-slate-300 p-2 text-center">Guide</th>
                      <th className="border border-slate-300 p-2 text-center">Monument</th>
                      <th className="border border-slate-300 p-2 text-center">Restaurant</th>
                      <th className="border border-slate-300 p-2 text-center">Additional</th>
                      <th className="border border-slate-300 p-2 text-center" colSpan={2}>Per Pax</th>
                      <th className="border border-slate-300 p-2 text-center">Tour Escort</th>
                   </tr>
                   <tr>
                      <th colSpan={6} className="border border-slate-300"></th>
                      <th className="border border-slate-300 p-1 text-center">Enroute</th>
                      <th className="border border-slate-300 p-1 text-center">Porter</th>
                      <th className="border border-slate-300 p-1 text-center">1 Pax</th>
                   </tr>
                </thead>
                <tbody>
                   {days.map(day => (
                      <tr key={day.id}>
                         <td className="border border-slate-300 p-2 font-medium">{day.dayNumber} - {day.date}</td>
                         <td className="border border-slate-300 p-2">{day.cityName}</td>
                         <td className="border border-slate-300 p-2 text-right">{day.itineraryActivities.filter(a=>a.type==='Guide').reduce((s,a)=>s+(a.overrideCost||a.cost),0)}</td>
                         <td className="border border-slate-300 p-2 text-right">{day.itineraryActivities.filter(a=>a.type==='Monument').reduce((s,a)=>s+(a.overrideCost||a.cost),0)}</td>
                         <td className="border border-slate-300 p-2 text-right">{day.itineraryRestaurants.reduce((s,r)=>s+(r.overrideCost||r.cost),0)}</td>
                         <td className="border border-slate-300 p-2 text-right">{day.itineraryAdditionals.reduce((s,a)=>s+(a.overrideCost||a.cost),0)}</td>
                         <td className="border border-slate-300 p-2 text-right">0.00</td>
                         <td className="border border-slate-300 p-2 text-right">0.00</td>
                         <td className="border border-slate-300 p-2 text-right">0.00</td>
                      </tr>
                   ))}
                   {/* Totals */}
                   <tr className="bg-orange-100 font-bold">
                      <td colSpan={2} className="border border-slate-300 p-2 text-right">Total</td>
                      <td className="border border-slate-300 p-2 text-right">{costSheet.guideCost.toFixed(2)}</td>
                      <td className="border border-slate-300 p-2 text-right">{costSheet.monumentCost.toFixed(2)}</td>
                      <td className="border border-slate-300 p-2 text-right">{costSheet.mealCost.toFixed(2)}</td>
                      <td className="border border-slate-300 p-2 text-right">{costSheet.miscCost.toFixed(2)}</td>
                      <td className="border border-slate-300 p-2 text-right">{costSheet.enrouteCost.toFixed(2)}</td>
                      <td className="border border-slate-300 p-2 text-right">0.00</td>
                      <td className="border border-slate-300 p-2 text-right">{costSheet.escortCost.toFixed(2)}</td>
                   </tr>
                   <tr className="bg-orange-50 font-bold">
                      <td colSpan={2} className="border border-slate-300 p-2 text-right">Grand Total (Marked Up)</td>
                      <td className="border border-slate-300 p-2 text-right">{getMarkedUp(costSheet.guideCost).toFixed(2)}</td>
                      <td className="border border-slate-300 p-2 text-right">{getMarkedUp(costSheet.monumentCost).toFixed(2)}</td>
                      <td className="border border-slate-300 p-2 text-right">{getMarkedUp(costSheet.mealCost).toFixed(2)}</td>
                      <td className="border border-slate-300 p-2 text-right">{getMarkedUp(costSheet.miscCost).toFixed(2)}</td>
                      <td className="border border-slate-300 p-2 text-right">{getMarkedUp(costSheet.enrouteCost).toFixed(2)}</td>
                      <td className="border border-slate-300 p-2 text-right">0.00</td>
                      <td className="border border-slate-300 p-2 text-right">{getMarkedUp(costSheet.escortCost).toFixed(2)}</td>
                   </tr>
                </tbody>
             </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {/* Per Pax Cost */}
             <div className="bg-white border border-slate-300">
                <div className="bg-slate-100 p-2 font-bold text-center border-b border-slate-300 text-sm">Per Pax Cost</div>
                <table className="w-full text-xs">
                   <tbody>
                      <tr>
                         <td className="p-2 border-b border-r border-slate-300 font-bold w-1/2">PARTICULARS</td>
                         <td className="p-2 border-b border-slate-300 font-bold text-right">{quotation.paxAdult} Adult(s), {quotation.paxChild} Child(s)</td>
                      </tr>
                      <tr><td className="p-2 border-r border-slate-300 text-right font-bold bg-orange-100" colSpan={2}>ADULT COST</td></tr>
                      <tr><td className="p-2 border-r border-slate-300 font-bold">MEAL+B+L+D+A</td><td className="p-2 border-b border-slate-300 text-right">{costSheet.mealCost.toFixed(2)}</td></tr>
                      <tr><td className="p-2 border-r border-slate-300 font-bold">TRAIN/FLIGHT</td><td className="p-2 border-b border-slate-300 text-right">{costSheet.flightCost.toFixed(2)}</td></tr>
                      <tr><td className="p-2 border-r border-slate-300 font-bold">PORTER</td><td className="p-2 border-b border-slate-300 text-right">0.00</td></tr>
                      <tr><td className="p-2 border-r border-slate-300 font-bold">ENROUTE</td><td className="p-2 border-b border-slate-300 text-right">{costSheet.enrouteCost.toFixed(2)}</td></tr>
                      <tr><td className="p-2 border-r border-slate-300 font-bold">ACTIVITIES</td><td className="p-2 border-b border-slate-300 text-right">{costSheet.activityCost.toFixed(2)}</td></tr>
                      <tr><td className="p-2 border-r border-slate-300 font-bold">MONUMENTS</td><td className="p-2 border-b border-slate-300 text-right">{costSheet.monumentCost.toFixed(2)}</td></tr>
                      <tr><td className="p-2 border-r border-slate-300 font-bold">ADDITIONALS</td><td className="p-2 border-b border-slate-300 text-right">{costSheet.miscCost.toFixed(2)}</td></tr>
                      <tr className="bg-orange-100 font-bold"><td className="p-2 border-r border-slate-300">TOTAL LAND ARRANGEMENT COST</td><td className="p-2 border-b border-slate-300 text-right">{costSheet.totalLandCost.toFixed(2)}</td></tr>
                      <tr><td className="p-2 border-r border-slate-300 font-bold">TRANSPORT</td><td className="p-2 border-b border-slate-300 text-right">{costSheet.transportCost.toFixed(2)}</td></tr>
                      <tr><td className="p-2 border-r border-slate-300 font-bold">GUIDE</td><td className="p-2 border-b border-slate-300 text-right">{costSheet.guideCost.toFixed(2)}</td></tr>
                      <tr><td className="p-2 border-r border-slate-300 font-bold">TOUR ESCORT</td><td className="p-2 border-b border-slate-300 text-right">{costSheet.escortCost.toFixed(2)}</td></tr>
                      <tr className="bg-orange-100 font-bold"><td className="p-2 border-r border-slate-300">TOTAL TPT/GUIDE/ESCORT COST</td><td className="p-2 border-b border-slate-300 text-right">{(costSheet.transportCost + costSheet.guideCost + costSheet.escortCost).toFixed(2)}</td></tr>
                   </tbody>
                </table>
             </div>

             {/* Right Column: General Info & Final */}
             <div className="space-y-6">
                <div className="bg-white border border-slate-300">
                   <div className="bg-slate-100 p-2 font-bold text-center border-b border-slate-300 text-sm">General Info.</div>
                   <table className="w-full text-xs">
                      <tbody>
                         <tr><td className="p-2 border-b border-r border-slate-300 font-bold">Adult Pax</td><td className="p-2 border-b border-slate-300 text-right">{quotation.paxAdult}</td></tr>
                         <tr><td className="p-2 border-b border-r border-slate-300 font-bold">Single Room</td><td className="p-2 border-b border-slate-300 text-right">0</td></tr>
                         <tr><td className="p-2 border-b border-r border-slate-300 font-bold">GST(%)</td><td className="p-2 border-b border-slate-300 text-right">{costSheet.gstPercentage}</td></tr>
                         <tr><td className="p-2 border-b border-r border-slate-300 font-bold bg-orange-100">Purchase Amount</td><td className="p-2 border-b border-slate-300 text-right bg-orange-100 font-bold">{costSheet.totalCost.toFixed(2)}</td></tr>
                         <tr><td className="p-2 border-r border-slate-300 font-bold bg-orange-100">Total Sale Amount</td><td className="p-2 border-slate-300 text-right bg-orange-100 font-bold">{costSheet.finalSalePrice.toFixed(2)}</td></tr>
                      </tbody>
                   </table>
                </div>

                {/* Total Tour Cost Table */}
                <div className="bg-white border border-slate-300">
                   <div className="bg-slate-100 p-2 font-bold text-center border-b border-slate-300 text-sm">Total Tour Cost (1 Pax)</div>
                   <table className="w-full text-xs">
                      <thead className="bg-slate-50">
                         <tr>
                            <th className="border p-1">Itinerary Services</th>
                            <th className="border p-1">Unit Cost</th>
                            <th className="border p-1">Volume Type</th>
                            <th className="border p-1">Qty Total</th>
                            <th className="border p-1">Total Cost</th>
                         </tr>
                      </thead>
                      <tbody>
                         <tr>
                            <td className="border p-1 bg-orange-100 font-bold">Single Room</td>
                            <td className="border p-1 text-right">0.00</td>
                            <td className="border p-1"></td>
                            <td className="border p-1"></td>
                            <td className="border p-1 text-right">0.00</td>
                         </tr>
                         <tr>
                            <td colSpan={4} className="border p-1 text-right font-bold">Cost of the Trip(INR)</td>
                            <td className="border p-1 text-right font-bold">{costSheet.finalSalePrice.toFixed(2)}</td>
                         </tr>
                         <tr>
                            <td colSpan={4} className="border p-1 text-right font-bold">(+) GST ({costSheet.gstPercentage}%)</td>
                            <td className="border p-1 text-right">{costSheet.gstAmount.toFixed(2)}</td>
                         </tr>
                         <tr className="bg-green-100">
                            <td colSpan={4} className="border p-1 text-right font-bold text-green-900">Total Tour Cost (In INR)</td>
                            <td className="border p-1 text-right font-bold text-green-900">{costSheet.finalSalePrice.toFixed(2)}</td>
                         </tr>
                      </tbody>
                   </table>
                </div>
             </div>
          </div>

          <div className="mt-6 border-t border-slate-300 pt-4">
             <h4 className="font-bold text-xs uppercase mb-2">Per Pax Cost</h4>
             <table className="w-full text-xs border border-slate-300">
                <thead className="bg-slate-100 font-bold">
                   <tr>
                      <th className="border p-2 text-left">Occupancy</th>
                      <th className="border p-2 text-right">Slab (1 Pax)</th>
                   </tr>
                </thead>
                <tbody>
                   <tr>
                      <td className="border p-2">Per Person Cost On Single Basis</td>
                      <td className="border p-2 text-right">INR {(costSheet.finalSalePrice / (quotation.paxAdult || 1)).toFixed(2)}</td>
                   </tr>
                </tbody>
             </table>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CostSheetPreview;