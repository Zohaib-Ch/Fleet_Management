import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { drivers } from '../../data/dummyData';

export default function DriverInsightsView({ onSelectDriver }) {
  const chartData = [...drivers].sort((a, b) => b.milesDriven - a.milesDriven);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Workload Chart & Leaderboard */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-200/60">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Workload Distribution (Miles this week)</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                <XAxis type="number" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} width={100} />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="milesDriven" radius={[0, 4, 4, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={index === 0 ? '#3b82f6' : '#94a3b8'} 
                      onClick={() => onSelectDriver(entry)}
                      className="cursor-pointer hover:opacity-80"
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/60">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Top Completer</h3>
          <div className="flex flex-col items-center justify-center h-[250px] text-center">
            <div className="relative cursor-pointer group" onClick={() => onSelectDriver(chartData[0])}>
              <img src={chartData[0].avatar} alt={chartData[0].name} className="w-24 h-24 rounded-full border-4 border-emerald-100 mb-4 shadow-sm group-hover:scale-105 transition-transform" />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-emerald-500 text-primary text-xs font-bold px-3 py-1 rounded-full shadow-md border-2 border-white">
                #1
              </div>
            </div>
            <h4 className="text-xl font-bold text-slate-800 mt-2">{chartData[0].name}</h4>
            <p className="text-secondary text-sm">{chartData[0].role}</p>
            <div className="mt-4 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
              <span className="font-bold text-emerald-600">{chartData[0].tripsThisWeek}</span> <span className="text-sm text-secondary">trips completed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Driver Cards Grid */}
      <div className="flex justify-between items-center mb-4 pt-4">
        <h3 className="text-xl font-bold text-slate-800">Team Performance</h3>
        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Click a card to view profile</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {drivers.map(driver => {
          const total = driver.statusCounts.completed + driver.statusCounts.driving + driver.statusCounts.delayed;
          const pctCompleted = (driver.statusCounts.completed / total) * 100;
          const pctDriving = (driver.statusCounts.driving / total) * 100;
          const pctDelayed = (driver.statusCounts.delayed / total) * 100;

          return (
            <div 
              key={driver.id} 
              onClick={() => onSelectDriver(driver)}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/60 hover:shadow-md hover:border-blue-200 cursor-pointer transition-all group"
            >
              <div className="flex items-center gap-4 mb-6">
                <img src={driver.avatar} alt={driver.name} className="w-14 h-14 rounded-full border border-slate-200 group-hover:ring-2 group-hover:ring-blue-100 transition-all" />
                <div>
                  <h4 className="font-bold text-slate-800 leading-tight group-hover:text-blue-600">{driver.name}</h4>
                  <p className="text-xs text-secondary">{driver.role}</p>
                </div>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-secondary font-medium">Trips this week:</span>
                  <span className="font-bold text-slate-800">{driver.tripsThisWeek}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-secondary font-medium">On-time rate:</span>
                  <span className="font-bold text-slate-800">{driver.onTimeRate}%</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[10px] font-black uppercase tracking-wider mb-1.5">
                  <span className="text-emerald-600">Done</span>
                  <span className="text-blue-600">Drive</span>
                  <span className="text-red-500">Delay</span>
                </div>
                <div className="w-full h-2 rounded-full overflow-hidden flex bg-slate-100">
                  <div style={{ width: `${pctCompleted}%` }} className="bg-emerald-500 h-full"></div>
                  <div style={{ width: `${pctDriving}%` }} className="bg-blue-500 h-full border-l border-white/30"></div>
                  <div style={{ width: `${pctDelayed}%` }} className="bg-red-500 h-full border-l border-white/30"></div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}


