
import React, { useRef } from 'react';
import { X, Printer, Download, FileSpreadsheet } from 'lucide-react';
import { Quotation, QuotationItineraryDay, CostSheet } from '../types';

interface CostSheetPreviewProps {
  quotation: Quotation;
  days: QuotationItineraryDay[];
  costSheet: CostSheet;
  onClose: () => void;
}

const CostSheetPreview: React.FC<CostSheetPreviewProps> = ({ quotation, days, costSheet, onClose }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const totalMarkup = costSheet.markupPercentage;
  
  // Helper to calculate row totals with markup
  const getMarkedUp = (cost: number) => cost + (cost * totalMarkup / 100);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadExcel = () => {
    if (!contentRef.current) return;

    // Basic HTML to Excel Blob
    const tableHTML = contentRef.current.innerHTML;
    const preHtml = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='UTF-8'><style>table { border-collapse: collapse; width: 100%; } td, th { border: 1px solid #000; padding: 5px; text-align: left; } .no-print { display: none; }</style></head><body>`;
    const postHtml = "</body></html>";
    const html = preHtml + tableHTML + postHtml;

    const blob = new Blob([html], {
        type: 'application/vnd.ms-excel'
    });
    
    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement("a");
    document.body.appendChild(downloadLink);
    downloadLink.href = url;
    downloadLink.download = `CostSheet_${quotation.quoteCode}.xls`;
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4 animate-in fade-in duration-200 print:p-0 print:bg-white print:static">
      <div className="bg-white w-full max-w-6xl h-[90vh] rounded-lg shadow-2xl flex flex-col overflow-hidden font-sans print:h-auto print:shadow-none print:w-full print:max-w-none">
        
        {/* Header - Hidden in Print */}
        <div className="bg-slate-800 text-white px-4 py-3 flex justify-between items-center shrink-0 print:hidden">
          <h3 className="font-bold text-sm uppercase tracking-wide">
            COST SHEET | {quotation.quoteCode}
          </h3>
          <div className="flex items-center gap-3">
             <button onClick={handleDownloadExcel} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded text-xs font-medium transition-colors">
                <FileSpreadsheet size={16} /> Excel
             </button>
             <button onClick={handlePrint} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-xs font-medium transition-colors">
                <Printer size={16} /> Print / PDF
             </button>
             <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors ml-2">
                <X size={20} />
             </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div ref={contentRef} className="flex-1 overflow-y-auto p-6 bg-slate-50 print:overflow-visible print:bg-white print:p-0">
          
          {/* Info Block */}
          <div className="bg-white p-4 border border-slate-200 rounded-sm mb-6 text-xs text-slate-700 grid grid-cols-2 md:grid-cols-4 gap-4 print:grid-cols-4 print:border-slate-400">
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
          <div className="bg-white border border-slate-300 mb-6 overflow-hidden print:border-black">
             <table className="w-full text-xs border-collapse">
                <thead className="bg-slate-100 text-slate-800 font-bold print:bg-slate-200">
                   <tr>
                      <th className="border border-slate-300 p-2 text-left w-32 print:border-black">Day/Date</th>
                      <th className="border border-slate-300 p-2 text-left print:border-black">City</th>
                      <th className="border border-slate-300 p-2 text-left print:border-black">Hotels</th>
                      <th colSpan={7} className="border border-slate-300 p-2 text-center print:border-black">Hotel Rates</th>
                      <th className="border border-slate-300 p-2 text-center print:border-black">Train</th>
                   </tr>
                   <tr>
                      <th colSpan={3} className="border border-slate-300 print:border-black"></th>
                      <th className="border border-slate-300 p-1 text-center print:border-black">SGL</th>
                      <th className="border border-slate-300 p-1 text-center print:border-black">DBL</th>
                      <th className="border border-slate-300 p-1 text-center print:border-black">TPL</th>
                      <th className="border border-slate-300 p-1 text-center print:border-black">TWN</th>
                      <th className="border border-slate-300 p-1 text-center print:border-black">B(A)</th>
                      <th className="border border-slate-300 p-1 text-center print:border-black">L(A)</th>
                      <th className="border border-slate-300 p-1 text-center print:border-black">D(A)</th>
                      <th className="border border-slate-300 p-1 text-center print:border-black">Adult</th>
                   </tr>
                </thead>
                <tbody>
                   {days.map((day) => (
                      <tr key={day.id}>
                         <td className="border border-slate-300 p-2 font-medium print:border-black">{day.dayNumber} - {day.date}</td>
                         <td className="border border-slate-300 p-2 print:border-black">{day.cityName}</td>
                         <td className="border border-slate-300 p-2 print:border-black">
                            {day.itineraryHotels.map(h => h.hotelName).join(', ') || '-'}
                         </td>
                         {/* Mocking Rate Distribution for Display */}
                         <td className="border border-slate-300 p-2 text-right print:border-black">0</td>
                         <td className="border border-slate-300 p-2 text-right print:border-black">{day.itineraryHotels.reduce((sum, h) => sum + (h.overrideCost || h.cost), 0)}</td>
                         <td className="border border-slate-300 p-2 text-right print:border-black">0</td>
                         <td className="border border-slate-300 p-2 text-right print:border-black">0</td>
                         <td className="border border-slate-300 p-2 text-right print:border-black">0</td>
                         <td className="border border-slate-300 p-2 text-right print:border-black">0</td>
                         <td className="border border-slate-300 p-2 text-right print:border-black">0</td>
                         <td className="border border-slate-300 p-2 text-right print:border-black">
                            {day.itineraryFlights.reduce((sum, f) => sum + (f.overrideCost || f.cost), 0).toFixed(2)}
                         </td>
                      </tr>
                   ))}
                   {/* Totals Row */}
                   <tr className="bg-orange-100 font-bold print:bg-slate-100">
                      <td colSpan={3} className="border border-slate-300 p-2 text-right print:border-black">Total</td>
                      <td className="border border-slate-300 p-2 text-right print:border-black">0.00</td>
                      <td className="border border-slate-300 p-2 text-right print:border-black">{costSheet.hotelCost.toFixed(2)}</td>
                      <td className="border border-slate-300 p-2 text-right print:border-black">0.00</td>
                      <td className="border border-slate-300 p-2 text-right print:border-black">0.00</td>
                      <td className="border border-slate-300 p-2 text-right print:border-black">0.00</td>
                      <td className="border border-slate-300 p-2 text-right print:border-black">0.00</td>
                      <td className="border border-slate-300 p-2 text-right print:border-black">0.00</td>
                      <td className="border border-slate-300 p-2 text-right print:border-black">{costSheet.flightCost.toFixed(2)}</td>
                   </tr>
                   <tr className="bg-white">
                      <td colSpan={3} className="border border-slate-300 p-2 text-right font-bold print:border-black">Mark Up (%)</td>
                      <td colSpan={8} className="border border-slate-300 p-2 text-center font-bold print:border-black">{totalMarkup}%</td>
                   </tr>
                   <tr className="bg-orange-50 font-bold print:bg-slate-50">
                      <td colSpan={3} className="border border-slate-300 p-2 text-right print:border-black">Grand Total</td>
                      <td className="border border-slate-300 p-2 text-right print:border-black">0.00</td>
                      <td className="border border-slate-300 p-2 text-right print:border-black">{getMarkedUp(costSheet.hotelCost).toFixed(2)}</td>
                      <td className="border border-slate-300 p-2 text-right print:border-black">0.00</td>
                      <td className="border border-slate-300 p-2 text-right print:border-black">0.00</td>
                      <td className="border border-slate-300 p-2 text-right print:border-black">0.00</td>
                      <td className="border border-slate-300 p-2 text-right print:border-black">0.00</td>
                      <td className="border border-slate-300 p-2 text-right print:border-black">0.00</td>
                      <td className="border border-slate-300 p-2 text-right print:border-black">{getMarkedUp(costSheet.flightCost).toFixed(2)}</td>
                   </tr>
                </tbody>
             </table>
          </div>

          {/* Table 2: Service Costs */}
          <div className="bg-white border border-slate-300 mb-6 overflow-hidden print:border-black">
             <table className="w-full text-xs border-collapse">
                <thead className="bg-slate-100 text-slate-800 font-bold print:bg-slate-200">
                   <tr>
                      <th className="border border-slate-300 p-2 text-left w-32 print:border-black">Day/Date</th>
                      <th className="border border-slate-300 p-2 text-left print:border-black">City</th>
                      <th className="border border-slate-300 p-2 text-center print:border-black">Guide</th>
                      <th className="border border-slate-300 p-2 text-center print:border-black">Monument</th>
                      <th className="border border-slate-300 p-2 text-center print:border-black">Restaurant</th>
                      <th className="border border-slate-300 p-2 text-center print:border-black">Additional</th>
                      <th className="border border-slate-300 p-2 text-center" colSpan={2}>Per Pax</th>
                      <th className="border border-slate-300 p-2 text-center print:border-black">Tour Escort</th>
                   </tr>
                   <tr>
                      <th colSpan={6} className="border border-slate-300 print:border-black"></th>
                      <th className="border border-slate-300 p-1 text-center print:border-black">Enroute</th>
                      <th className="border border-slate-300 p-1 text-center print:border-black">Porter</th>
                      <th className="border border-slate-300 p-1 text-center print:border-black">1 Pax</th>
                   </tr>
                </thead>
                <tbody>
                   {days.map(day => (
                      <tr key={day.id}>
                         <td className="border border-slate-300 p-2 font-medium print:border-black">{day.dayNumber} - {day.date}</td>
                         <td className="border border-slate-300 p-2 print:border-black">{day.cityName}</td>
                         <td className="border border-slate-300 p-2 text-right print:border-black">{day.itineraryActivities.filter(a=>a.type==='Guide').reduce((s,a)=>s+(a.overrideCost||a.cost),0)}</td>
                         <td className="border border-slate-300 p-2 text-right print:border-black">{day.itineraryActivities.filter(a=>a.type==='Monument').reduce((s,a)=>s+(a.overrideCost||a.cost),0)}</td>
                         <td className="border border-slate-300 p-2 text-right print:border-black">{day.itineraryRestaurants.reduce((s,r)=>s+(r.overrideCost||r.cost),0)}</td>
                         <td className="border border-slate-300 p-2 text-right print:border-black">{day.itineraryAdditionals.reduce((s,a)=>s+(a.overrideCost||a.cost),0)}</td>
                         <td className="border border-slate-300 p-2 text-right print:border-black">0.00</td>
                         <td className="border border-slate-300 p-2 text-right print:border-black">0.00</td>
                         <td className="border border-slate-300 p-2 text-right print:border-black">0.00</td>
                      </tr>
                   ))}
                   {/* Totals */}
                   <tr className="bg-orange-100 font-bold print:bg-slate-100">
                      <td colSpan={2} className="border border-slate-300 p-2 text-right print:border-black">Total</td>
                      <td className="border border-slate-300 p-2 text-right print:border-black">{costSheet.guideCost.toFixed(2)}</td>
                      <td className="border border-slate-300 p-2 text-right print:border-black">{costSheet.monumentCost.toFixed(2)}</td>
                      <td className="border border-slate-300 p-2 text-right print:border-black">{costSheet.mealCost.toFixed(2)}</td>
                      <td className="border border-slate-300 p-2 text-right print:border-black">{costSheet.miscCost.toFixed(2)}</td>
                      <td className="border border-slate-300 p-2 text-right print:border-black">{costSheet.enrouteCost.toFixed(2)}</td>
                      <td className="border border-slate-300 p-2 text-right print:border-black">0.00</td>
                      <td className="border border-slate-300 p-2 text-right print:border-black">{costSheet.escortCost.toFixed(2)}</td>
                   </tr>
                   <tr className="bg-orange-50 font-bold print:bg-slate-50">
                      <td colSpan={2} className="border border-slate-300 p-2 text-right print:border-black">Grand Total (Marked Up)</td>
                      <td className="border border-slate-300 p-2 text-right print:border-black">{getMarkedUp(costSheet.guideCost).toFixed(2)}</td>
                      <td className="border border-slate-300 p-2 text-right print:border-black">{getMarkedUp(costSheet.monumentCost).toFixed(2)}</td>
                      <td className="border border-slate-300 p-2 text-right print:border-black">{getMarkedUp(costSheet.mealCost).toFixed(2)}</td>
                      <td className="border border-slate-300 p-2 text-right print:border-black">{getMarkedUp(costSheet.miscCost).toFixed(2)}</td>
                      <td className="border border-slate-300 p-2 text-right print:border-black">{getMarkedUp(costSheet.enrouteCost).toFixed(2)}</td>
                      <td className="border border-slate-300 p-2 text-right print:border-black">0.00</td>
                      <td className="border border-slate-300 p-2 text-right print:border-black">{getMarkedUp(costSheet.escortCost).toFixed(2)}</td>
                   </tr>
                </tbody>
             </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 print:grid-cols-2">
             {/* Per Pax Cost */}
             <div className="bg-white border border-slate-300 print:border-black">
                <div className="bg-slate-100 p-2 font-bold text-center border-b border-slate-300 text-sm print:bg-slate-200 print:border-black">Per Pax Cost</div>
                <table className="w-full text-xs">
                   <tbody>
                      <tr>
                         <td className="p-2 border-b border-r border-slate-300 font-bold w-1/2 print:border-black">PARTICULARS</td>
                         <td className="p-2 border-b border-slate-300 font-bold text-right print:border-black">{quotation.paxAdult} Adult(s), {quotation.paxChild} Child(s)</td>
                      </tr>
                      <tr><td className="p-2 border-r border-slate-300 text-right font-bold bg-orange-100 print:bg-slate-100 print:border-black" colSpan={2}>ADULT COST</td></tr>
                      <tr><td className="p-2 border-r border-slate-300 font-bold print:border-black">MEAL+B+L+D+A</td><td className="p-2 border-b border-slate-300 text-right print:border-black">{costSheet.mealCost.toFixed(2)}</td></tr>
                      <tr><td className="p-2 border-r border-slate-300 font-bold print:border-black">TRAIN/FLIGHT</td><td className="p-2 border-b border-slate-300 text-right print:border-black">{costSheet.flightCost.toFixed(2)}</td></tr>
                      <tr><td className="p-2 border-r border-slate-300 font-bold print:border-black">PORTER</td><td className="p-2 border-b border-slate-300 text-right print:border-black">0.00</td></tr>
                      <tr><td className="p-2 border-r border-slate-300 font-bold print:border-black">ENROUTE</td><td className="p-2 border-b border-slate-300 text-right print:border-black">{costSheet.enrouteCost.toFixed(2)}</td></tr>
                      <tr><td className="p-2 border-r border-slate-300 font-bold print:border-black">ACTIVITIES</td><td className="p-2 border-b border-slate-300 text-right print:border-black">{costSheet.activityCost.toFixed(2)}</td></tr>
                      <tr><td className="p-2 border-r border-slate-300 font-bold print:border-black">MONUMENTS</td><td className="p-2 border-b border-slate-300 text-right print:border-black">{costSheet.monumentCost.toFixed(2)}</td></tr>
                      <tr><td className="p-2 border-r border-slate-300 font-bold print:border-black">ADDITIONALS</td><td className="p-2 border-b border-slate-300 text-right print:border-black">{costSheet.miscCost.toFixed(2)}</td></tr>
                      <tr className="bg-orange-100 font-bold print:bg-slate-100"><td className="p-2 border-r border-slate-300 print:border-black">TOTAL LAND ARRANGEMENT COST</td><td className="p-2 border-b border-slate-300 text-right print:border-black">{costSheet.totalLandCost.toFixed(2)}</td></tr>
                      <tr><td className="p-2 border-r border-slate-300 font-bold print:border-black">TRANSPORT</td><td className="p-2 border-b border-slate-300 text-right print:border-black">{costSheet.transportCost.toFixed(2)}</td></tr>
                      <tr><td className="p-2 border-r border-slate-300 font-bold print:border-black">GUIDE</td><td className="p-2 border-b border-slate-300 text-right print:border-black">{costSheet.guideCost.toFixed(2)}</td></tr>
                      <tr><td className="p-2 border-r border-slate-300 font-bold print:border-black">TOUR ESCORT</td><td className="p-2 border-b border-slate-300 text-right print:border-black">{costSheet.escortCost.toFixed(2)}</td></tr>
                      <tr className="bg-orange-100 font-bold print:bg-slate-100"><td className="p-2 border-r border-slate-300 print:border-black">TOTAL TPT/GUIDE/ESCORT COST</td><td className="p-2 border-b border-slate-300 text-right print:border-black">{(costSheet.transportCost + costSheet.guideCost + costSheet.escortCost).toFixed(2)}</td></tr>
                   </tbody>
                </table>
             </div>

             {/* Right Column: General Info & Final */}
             <div className="space-y-6">
                <div className="bg-white border border-slate-300 print:border-black">
                   <div className="bg-slate-100 p-2 font-bold text-center border-b border-slate-300 text-sm print:bg-slate-200 print:border-black">General Info.</div>
                   <table className="w-full text-xs">
                      <tbody>
                         <tr><td className="p-2 border-b border-r border-slate-300 font-bold print:border-black">Adult Pax</td><td className="p-2 border-b border-slate-300 text-right print:border-black">{quotation.paxAdult}</td></tr>
                         <tr><td className="p-2 border-b border-r border-slate-300 font-bold print:border-black">Single Room</td><td className="p-2 border-b border-slate-300 text-right print:border-black">0</td></tr>
                         <tr><td className="p-2 border-b border-r border-slate-300 font-bold print:border-black">GST(%)</td><td className="p-2 border-b border-slate-300 text-right print:border-black">{costSheet.gstPercentage}</td></tr>
                         <tr><td className="p-2 border-b border-r border-slate-300 font-bold bg-orange-100 print:bg-slate-100 print:border-black">Purchase Amount</td><td className="p-2 border-b border-slate-300 text-right bg-orange-100 font-bold print:bg-slate-100 print:border-black">{costSheet.totalCost.toFixed(2)}</td></tr>
                         <tr><td className="p-2 border-r border-slate-300 font-bold bg-orange-100 print:bg-slate-100 print:border-black">Total Sale Amount</td><td className="p-2 border-slate-300 text-right bg-orange-100 font-bold print:bg-slate-100 print:border-black">{costSheet.finalSalePrice.toFixed(2)}</td></tr>
                      </tbody>
                   </table>
                </div>

                {/* Total Tour Cost Table */}
                <div className="bg-white border border-slate-300 print:border-black">
                   <div className="bg-slate-100 p-2 font-bold text-center border-b border-slate-300 text-sm print:bg-slate-200 print:border-black">Total Tour Cost (1 Pax)</div>
                   <table className="w-full text-xs">
                      <thead className="bg-slate-50 print:bg-slate-50">
                         <tr>
                            <th className="border p-1 print:border-black">Itinerary Services</th>
                            <th className="border p-1 print:border-black">Unit Cost</th>
                            <th className="border p-1 print:border-black">Volume Type</th>
                            <th className="border p-1 print:border-black">Qty Total</th>
                            <th className="border p-1 print:border-black">Total Cost</th>
                         </tr>
                      </thead>
                      <tbody>
                         <tr>
                            <td className="border p-1 bg-orange-100 font-bold print:bg-slate-100 print:border-black">Single Room</td>
                            <td className="border p-1 text-right print:border-black">0.00</td>
                            <td className="border p-1 print:border-black"></td>
                            <td className="border p-1 print:border-black"></td>
                            <td className="border p-1 text-right print:border-black">0.00</td>
                         </tr>
                         <tr>
                            <td colSpan={4} className="border p-1 text-right font-bold print:border-black">Cost of the Trip(INR)</td>
                            <td className="border p-1 text-right font-bold print:border-black">{costSheet.finalSalePrice.toFixed(2)}</td>
                         </tr>
                         <tr>
                            <td colSpan={4} className="border p-1 text-right font-bold print:border-black">(+) GST ({costSheet.gstPercentage}%)</td>
                            <td className="border p-1 text-right print:border-black">{costSheet.gstAmount.toFixed(2)}</td>
                         </tr>
                         <tr className="bg-green-100 print:bg-slate-100">
                            <td colSpan={4} className="border p-1 text-right font-bold text-green-900 print:text-black print:border-black">Total Tour Cost (In INR)</td>
                            <td className="border p-1 text-right font-bold text-green-900 print:text-black print:border-black">{costSheet.finalSalePrice.toFixed(2)}</td>
                         </tr>
                      </tbody>
                   </table>
                </div>
             </div>
          </div>

          <div className="mt-6 border-t border-slate-300 pt-4 print:border-black">
             <h4 className="font-bold text-xs uppercase mb-2">Per Pax Cost</h4>
             <table className="w-full text-xs border border-slate-300 print:border-black">
                <thead className="bg-slate-100 font-bold print:bg-slate-200">
                   <tr>
                      <th className="border p-2 text-left print:border-black">Occupancy</th>
                      <th className="border p-2 text-right print:border-black">Slab (1 Pax)</th>
                   </tr>
                </thead>
                <tbody>
                   <tr>
                      <td className="border p-2 print:border-black">Per Person Cost On Single Basis</td>
                      <td className="border p-2 text-right print:border-black">INR {(costSheet.finalSalePrice / (quotation.paxAdult || 1)).toFixed(2)}</td>
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
