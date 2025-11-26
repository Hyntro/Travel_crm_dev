import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts';
import { TrendingUp, Users, Target, DollarSign, ArrowUpRight } from 'lucide-react';

// Mock Data
const funnelData = [
  { name: 'Assigned', value: 120, fill: '#60A5FA' }, // Blue
  { name: 'Reverted', value: 80, fill: '#FBBF24' },  // Amber
  { name: 'Option Sent', value: 45, fill: '#A78BFA' }, // Purple
  { name: 'Confirmed', value: 25, fill: '#34D399' }, // Green
];

const destinationData = [
  { name: 'Dubai', value: 400 },
  { name: 'Bali', value: 300 },
  { name: 'Thailand', value: 300 },
  { name: 'Europe', value: 200 },
  { name: 'Maldives', value: 150 },
];

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#F97316', '#8B5CF6'];

const SalesDashboard: React.FC = () => {
  // Mock calculations
  const totalRevenue = 125000;
  const targetRevenue = 200000;
  const percentage = Math.round((totalRevenue / targetRevenue) * 100);
  
  const gaugeData = [{ name: 'Revenue', value: percentage, fill: '#3B82F6' }];

  return (
    <div className="p-8 h-full bg-slate-50 overflow-y-auto">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Sales Dashboard</h2>
          <p className="text-slate-500 mt-1">Real-time performance metrics and pipeline analytics.</p>
        </div>
        <div className="flex gap-2">
           <select className="bg-white border border-slate-200 text-slate-600 px-3 py-2 rounded-lg text-sm shadow-sm focus:outline-none cursor-pointer hover:border-blue-500 transition-colors">
             <option>This Month</option>
             <option>Last Quarter</option>
             <option>This Year</option>
           </select>
        </div>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
           <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Revenue</p>
                <h3 className="text-2xl font-bold text-slate-800 mt-1">$125,000</h3>
                <span className="text-xs text-green-600 flex items-center mt-1"><ArrowUpRight size={12}/> +12.5%</span>
              </div>
              <div className="p-3 bg-blue-50 text-blue-600 rounded-lg"><DollarSign size={20}/></div>
           </div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
           <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Leads</p>
                <h3 className="text-2xl font-bold text-slate-800 mt-1">1,240</h3>
                <span className="text-xs text-slate-400 mt-1">Since last month</span>
              </div>
              <div className="p-3 bg-purple-50 text-purple-600 rounded-lg"><Users size={20}/></div>
           </div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
           <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Conversion Rate</p>
                <h3 className="text-2xl font-bold text-slate-800 mt-1">18.2%</h3>
                <span className="text-xs text-red-500 mt-1">-1.2% vs target</span>
              </div>
              <div className="p-3 bg-orange-50 text-orange-600 rounded-lg"><TrendingUp size={20}/></div>
           </div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
           <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Avg Deal Size</p>
                <h3 className="text-2xl font-bold text-slate-800 mt-1">$4,200</h3>
                <span className="text-xs text-green-600 mt-1">+5.0%</span>
              </div>
              <div className="p-3 bg-teal-50 text-teal-600 rounded-lg"><Target size={20}/></div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        {/* Gauge / Target Chart */}
        <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center justify-center">
           <h3 className="text-lg font-bold text-slate-800 mb-2 self-start w-full border-b border-slate-100 pb-2">Sales Target</h3>
           
           <div className="w-full h-[220px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart 
                  innerRadius="80%" 
                  outerRadius="100%" 
                  data={gaugeData} 
                  startAngle={180} 
                  endAngle={0}
                >
                  <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                  <RadialBar
                    background
                    clockWise
                    dataKey="value"
                    cornerRadius={10}
                  />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center mt-4">
                  <h2 className="text-4xl font-bold text-slate-800">{percentage}%</h2>
                  <p className="text-sm text-slate-500">Achieved</p>
              </div>
           </div>
           
           <div className="w-full mt-4 flex justify-between gap-4 text-sm bg-slate-50 p-3 rounded-lg">
              <div className="text-center flex-1 border-r border-slate-200">
                 <span className="block font-bold text-slate-700">${(totalRevenue/1000).toFixed(1)}k</span>
                 <span className="text-xs text-slate-400">Current</span>
              </div>
              <div className="text-center flex-1">
                 <span className="block font-bold text-slate-700">${(targetRevenue/1000).toFixed(1)}k</span>
                 <span className="text-xs text-slate-400">Target</span>
              </div>
           </div>
        </div>

        {/* Sales Funnel */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
           <h3 className="text-lg font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">Sales Pipeline</h3>
           <div className="h-[250px] w-full">
             <ResponsiveContainer width="100%" height="100%">
                <BarChart data={funnelData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" width={100} tick={{fontSize: 12, fill: '#64748b'}} />
                  <Tooltip 
                     cursor={{fill: '#f1f5f9'}}
                     contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={32}>
                    {funnelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
             </ResponsiveContainer>
           </div>
        </div>
      </div>

      {/* Destinations Pie Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
           <h3 className="text-lg font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">Top Query Destinations</h3>
           <div className="h-[300px] w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                    <Pie
                       data={destinationData}
                       cx="50%"
                       cy="50%"
                       innerRadius={60}
                       outerRadius={100}
                       paddingAngle={5}
                       dataKey="value"
                    >
                       {destinationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                       ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Legend verticalAlign="bottom" height={36} iconType="circle"/>
                 </PieChart>
              </ResponsiveContainer>
           </div>
        </div>

        {/* Recent Activity Table Preview (Mock) */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col">
           <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-2">
             <h3 className="text-lg font-bold text-slate-800">Recent Sales Activity</h3>
             <button className="text-xs text-blue-600 font-medium hover:underline">View All</button>
           </div>
           
           <div className="flex-1 space-y-4 overflow-y-auto pr-2">
              {[1, 2, 3, 4, 5].map((i) => (
                 <div key={i} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors border border-transparent hover:border-slate-100">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
                          JD
                       </div>
                       <div>
                          <p className="text-sm font-medium text-slate-800">New Quote Generated</p>
                          <p className="text-xs text-slate-500">For: Global Travels Inc</p>
                       </div>
                    </div>
                    <span className="text-xs text-slate-400">2h ago</span>
                 </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default SalesDashboard;