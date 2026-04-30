import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { User, AlertTriangle, Wrench, CheckCircle } from 'lucide-react';
import { fleetVelocityData, activityLogs } from '../../data/dummyData';

export default function ActivityLogView() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Fleet Velocity Graph */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/60">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-slate-800">Fleet Velocity</h3>
          <p className="text-slate-500 text-sm mt-1">Miles driven per day across the entire fleet (Last 30 Days)</p>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={fleetVelocityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorMiles" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} minTickGap={20} />
              <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                labelStyle={{ fontWeight: 'bold', color: '#1e293b' }}
              />
              <Area 
                type="monotone" 
                dataKey="miles" 
                stroke="#3b82f6" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorMiles)" 
                activeDot={{ r: 6, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Activity Log (Audit Trail) */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200/60">
        <h3 className="text-xl font-bold text-slate-800 mb-6">Activity Log</h3>
        
        <div className="relative pl-4 space-y-8 before:absolute before:inset-0 before:ml-8 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
          {activityLogs.map((log, idx) => (
            <div key={log.id} className="relative flex items-start gap-6 group">
              {/* Timeline Line Connector */}
              <div className="absolute left-4 top-8 bottom-[-2rem] w-0.5 bg-slate-200 group-last:hidden"></div>
              
              {/* Icon / Avatar */}
              <div className="relative z-10 w-10 h-10 shrink-0 bg-white rounded-full flex items-center justify-center shadow-sm border-2 border-white ring-1 ring-slate-200">
                {log.avatar ? (
                  <img src={log.avatar} alt={log.driver} className="w-full h-full rounded-full object-cover" />
                ) : (
                  <div className={`w-full h-full rounded-full flex items-center justify-center text-white
                    ${log.iconType === 'warning' ? 'bg-amber-500' : ''}
                    ${log.iconType === 'wrench' ? 'bg-red-500' : ''}
                  `}>
                    {log.iconType === 'warning' && <AlertTriangle size={18} />}
                    {log.iconType === 'wrench' && <Wrench size={18} />}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 bg-slate-50/50 rounded-xl p-4 border border-slate-100 hover:border-slate-300 transition-colors">
                <p className="text-sm text-slate-700 leading-relaxed">
                  <span className="font-bold text-slate-900">{log.driver}</span>{' '}
                  {log.message}
                </p>
                <p className="text-xs text-slate-400 mt-2 font-medium">{log.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
