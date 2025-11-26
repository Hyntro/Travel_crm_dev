import React, { useState } from 'react';
import { Map, Clock, DollarSign, Calendar, Send, Printer, Share2 } from 'lucide-react';
import { generateTripItinerary } from '../services/geminiService';
import { ItineraryDay } from '../types';

const ItineraryGenerator: React.FC = () => {
  const [formData, setFormData] = useState({
    destination: '',
    duration: 3,
    interests: '',
    budget: 'Moderate'
  });
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState<ItineraryDay[] | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await generateTripItinerary(
        formData.destination,
        formData.duration,
        formData.interests,
        formData.budget
      );
      setItinerary(result);
    } catch (error) {
      console.error(error);
      alert('Failed to generate itinerary. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 h-full flex flex-col lg:flex-row gap-8">
      {/* Input Section */}
      <div className="w-full lg:w-1/3 space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Itinerary Planner</h2>
          <p className="text-slate-500 mt-1">Generate bespoke travel plans in seconds.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Destination</label>
            <div className="relative">
              <Map className="absolute left-3 top-3 text-slate-400" size={18} />
              <input
                required
                type="text"
                value={formData.destination}
                onChange={e => setFormData({...formData, destination: e.target.value})}
                placeholder="e.g. Kyoto, Japan"
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Duration (Days)</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 text-slate-400" size={18} />
              <input
                required
                type="number"
                min="1"
                max="14"
                value={formData.duration}
                onChange={e => setFormData({...formData, duration: parseInt(e.target.value)})}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Client Interests</label>
            <textarea
              required
              rows={3}
              value={formData.interests}
              onChange={e => setFormData({...formData, interests: e.target.value})}
              placeholder="e.g. History, food, nature, hiking..."
              className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Budget Level</label>
            <div className="grid grid-cols-3 gap-2">
              {['Budget', 'Moderate', 'Luxury'].map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setFormData({...formData, budget: b})}
                  className={`py-2 px-3 rounded-lg text-sm font-medium border transition-colors ${
                    formData.budget === b 
                      ? 'bg-blue-50 border-blue-200 text-blue-700' 
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium shadow-lg shadow-blue-900/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Send size={18} />
                <span>Generate Itinerary</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Result Section */}
      <div className="flex-1">
        {itinerary ? (
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 h-full flex flex-col">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-slate-800">Trip to {formData.destination}</h3>
                <p className="text-sm text-slate-500">{formData.duration} Days • {formData.budget}</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg">
                  <Printer size={20} />
                </button>
                <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                  <Share2 size={20} />
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {itinerary.map((day) => (
                <div key={day.day} className="relative pl-8 border-l-2 border-blue-100">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500 ring-4 ring-blue-50"></div>
                  <h4 className="text-lg font-bold text-slate-800 mb-4">Day {day.day}: {day.title}</h4>
                  <div className="space-y-4">
                    {day.activities.map((activity, idx) => (
                      <div key={idx} className="bg-slate-50 p-4 rounded-lg hover:bg-slate-100 transition-colors">
                        <div className="flex items-center gap-2 text-blue-600 text-sm font-semibold mb-1">
                          <Clock size={14} />
                          <span>{activity.time}</span>
                        </div>
                        <h5 className="font-semibold text-slate-800">{activity.activity}</h5>
                        <p className="text-sm text-slate-600 mt-1">{activity.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 p-12">
            <Map size={64} className="mb-4 text-slate-300" />
            <h3 className="text-lg font-medium text-slate-600">Ready to Plan?</h3>
            <p className="text-center max-w-sm mt-2">Enter the destination details on the left and let our AI curate the perfect experience for your client.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItineraryGenerator;