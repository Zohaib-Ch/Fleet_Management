import React from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, PieChart, Pie, Legend, ComposedChart, LineChart, Line
} from 'recharts';
import {
  TrendingUp, Fuel, Timer, Zap, Shield, Target, Users,
  Cpu, Activity, Globe, AlertTriangle, CheckCircle, ArrowUpRight, 
  BarChart3, Clock, Scale, Wrench, MoreHorizontal, MessageSquare, Bell
} from 'lucide-react';
import HolographicCard from '../ui/HolographicCard';
import { drivers } from '../../data/dummyData';

// MOCK DATA FOR TEAM INTEL
const fleetTrendData = [
  { time: '00:00', active: 45 }, { time: '02:00', active: 30 },
  { time: '04:00', active: 25 }, { time: '06:00', active: 80 },
  { time: '08:00', active: 150 }, { time: '10:00', active: 230 },
  { time: '12:00', active: 256 }, { time: '14:00', active: 240 },
  { time: '16:00', active: 220 }, { time: '18:00', active: 180 },
  { time: '20:00', active: 120 }, { time: '22:00', active: 70 },
];

const assetUtilizationData = [
  { name: 'Mon', usage: 85, target: 90 },
  { name: 'Tue', usage: 88, target: 90 },
  { name: 'Wed', usage: 92, target: 90 },
  { name: 'Thu', usage: 89, target: 90 },
  { name: 'Fri', usage: 95, target: 90 },
  { name: 'Sat', usage: 70, target: 90 },
  { name: 'Sun', usage: 60, target: 90 },
];

const activityLogs = [
  { id: 1, type: 'status', user: 'Abdullah Ali', action: 'completed mission', ref: 'DX-902', time: '2m ago' },
  { id: 2, type: 'alert', user: 'System', action: 'battery critical', ref: 'VX-112', time: '5m ago' },
  { id: 3, type: 'assign', user: 'Sara Smith', action: 'linked asset', ref: 'ZT-410', time: '12m ago' },
  { id: 4, type: 'status', user: 'Michael Chen', action: 'started shift', ref: 'ALPHA', time: '15m ago' },
];

const topPerformers = [
  { name: 'Abdullah Ali', score: 98.5, trips: 142 },
  { name: 'Emma Davis', score: 97.2, trips: 128 },
  { name: 'Michael Chen', score: 96.8, trips: 135 },
  { name: 'Sara Smith', score: 94.5, trips: 110 },
];

export default function InsightsView() {
  return (
    <div className="space-y-12 view-transition pb-20">
      {/* 1. TOP KPI DASHBOARD */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Fleet Assets', val: '350', change: 'Live', icon: Globe, color: 'text-blue-400', glow: 'blue' },
          { label: 'Active Missions', val: '256', change: '73%', icon: Activity, color: 'text-emerald-400', glow: 'emerald' },
          { label: 'Idle Personnel', val: '11', change: '4%', icon: Users, color: 'text-gold', glow: 'gold' },
          { label: 'Technical Interventions', val: '83', change: 'Critical', icon: AlertTriangle, color: 'text-red-400', glow: 'red' },
        ].map((kpi, i) => (
          <HolographicCard key={i} glowColor={kpi.glow} className="p-8 rounded-[2.5rem]">
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div className={`p-4 rounded-2xl bg-white/5 border border-white/10 ${kpi.color}`}>
                <kpi.icon size={22} />
              </div>
              <div className={`text-[10px] font-black px-3 py-1.5 rounded-xl border ${
                kpi.change === '73%' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                kpi.change === 'Critical' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                'bg-blue-500/10 text-blue-400 border-blue-500/20'
              }`}>
                {kpi.change}
              </div>
            </div>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] ml-1 relative z-10">{kpi.label}</p>
            <h3 className="text-4xl font-luxury text-white mt-2 tracking-tighter italic uppercase relative z-10">{kpi.val}</h3>
          </HolographicCard>
        ))}
      </div>

      {/* 2. FLEET DISTRIBUTION BAR */}
      <HolographicCard glowColor="blue" className="p-10 rounded-[3rem]">
        <div className="flex justify-between items-center mb-8 relative z-10">
          <h3 className="text-2xl font-luxury text-white tracking-tighter italic uppercase">Asset Distribution Matrix</h3>
          <div className="flex gap-6 text-[10px] font-black uppercase tracking-widest text-slate-500">
             <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500"></div> Active</div>
             <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-gold"></div> Idle</div>
             <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500"></div> Repair</div>
             <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Charging</div>
          </div>
        </div>
        <div className="w-full h-4 rounded-full bg-white/5 overflow-hidden flex relative z-10 shadow-2xl">
           <div className="h-full bg-blue-500 shadow-[0_0_15px_#3b82f6]" style={{ width: '73%' }}></div>
           <div className="h-full bg-gold shadow-[0_0_15px_#d4af37]" style={{ width: '16%' }}></div>
           <div className="h-full bg-red-500 shadow-[0_0_15px_#ef4444]" style={{ width: '7%' }}></div>
           <div className="h-full bg-emerald-500 shadow-[0_0_15px_#10b981]" style={{ width: '4%' }}></div>
        </div>
      </HolographicCard>

      {/* 3. ACTIVITY TREND CHART */}
      <HolographicCard glowColor="emerald" className="p-10 rounded-[3rem]">
        <div className="flex justify-between items-center mb-10 relative z-10">
          <div>
            <h3 className="text-3xl font-luxury text-white tracking-tighter italic uppercase">Deployment Velocity</h3>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">Personnel Activity Over Time (24h Cycle)</p>
          </div>
        </div>
        <div className="h-[300px] w-full relative z-10">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={fleetTrendData}>
              <defs>
                <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="10 10" vertical={false} stroke="rgba(255,255,255,0.02)" />
              <XAxis dataKey="time" stroke="#475569" fontSize={10} fontWeight={900} axisLine={false} tickLine={false} />
              <YAxis stroke="#475569" fontSize={10} fontWeight={900} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#0a0a0c', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }} />
              <Area type="monotone" dataKey="active" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorActive)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </HolographicCard>

      {/* 4. PERSONNEL GRID (LARGE GRID IN IMAGE) */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {Array.from({ length: 18 }).map((_, i) => (
          <HolographicCard key={i} glowColor="blue" className="p-6 rounded-[2rem] hover:scale-[1.02] transition-all cursor-pointer group">
             <div className="flex items-center gap-4 mb-6 relative z-10">
                <img src={`https://i.pravatar.cc/150?u=${i}`} className="w-10 h-10 rounded-xl grayscale group-hover:grayscale-0 transition-all border border-white/10" alt="user" />
                <div className="overflow-hidden">
                   <p className="text-[10px] font-black text-white uppercase truncate tracking-widest">{drivers[i % drivers.length].name}</p>
                   <p className="text-[8px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Operator-{i+100}</p>
                </div>
             </div>
             <div className="flex justify-between items-center relative z-10">
                <div className="space-y-1">
                   <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Trips</p>
                   <p className="text-lg font-luxury text-white italic">{Math.floor(Math.random() * 50) + 10}</p>
                </div>
                <div className="text-right space-y-1">
                   <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Perf</p>
                   <p className="text-lg font-luxury text-blue-400 italic">{Math.floor(Math.random() * 20) + 80}%</p>
                </div>
             </div>
             <div className={`h-1 w-full bg-white/5 rounded-full mt-4 overflow-hidden relative z-10`}>
                <div className="h-full bg-blue-500/50" style={{ width: `${Math.floor(Math.random() * 50) + 50}%` }}></div>
             </div>
          </HolographicCard>
        ))}
      </div>

      {/* 5. LOGS & PERFORMERS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
         <HolographicCard glowColor="purple" className="lg:col-span-8 p-10 rounded-[3.5rem]">
            <div className="flex justify-between items-center mb-10 relative z-10">
               <h3 className="text-2xl font-luxury text-white tracking-tighter italic uppercase">Live Intelligence Feed</h3>
               <MoreHorizontal className="text-slate-700" />
            </div>
            <div className="space-y-4 relative z-10">
               {activityLogs.map((log) => (
                  <div key={log.id} className="flex items-center justify-between p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-all">
                     <div className="flex items-center gap-6">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${
                          log.type === 'alert' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 
                          'bg-blue-500/10 text-blue-400 border-blue-500/20'
                        }`}>
                           {log.type === 'alert' ? <AlertTriangle size={20} /> : <Activity size={20} />}
                        </div>
                        <div>
                           <p className="text-sm font-bold text-white uppercase tracking-wider">{log.user} <span className="text-slate-500 font-medium lowercase"> {log.action} </span> {log.ref}</p>
                           <p className="text-[10px] text-slate-600 font-black uppercase tracking-widest mt-1">{log.time}</p>
                        </div>
                     </div>
                     <button className="text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-white transition-colors">Details</button>
                  </div>
               ))}
            </div>
         </HolographicCard>

         <HolographicCard glowColor="gold" className="lg:col-span-4 p-10 rounded-[3.5rem]">
            <h3 className="text-2xl font-luxury text-white tracking-tighter italic uppercase mb-10 relative z-10">Top Operators</h3>
            <div className="space-y-8 relative z-10">
               {topPerformers.map((p, i) => (
                  <div key={i} className="flex items-center justify-between">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center text-gold font-black italic text-xs">#{i+1}</div>
                        <div>
                           <p className="text-[10px] font-black text-white uppercase tracking-widest">{p.name}</p>
                           <p className="text-[8px] text-slate-500 font-bold uppercase tracking-widest">{p.trips} Missions</p>
                        </div>
                     </div>
                     <p className="text-xl font-luxury text-gold italic">{p.score}%</p>
                  </div>
               ))}
            </div>
         </HolographicCard>
      </div>

      {/* 6. BOTTOM UTILIZATION & HEALTH */}
      <div className="space-y-10">
         <HolographicCard glowColor="blue" className="p-10 rounded-[4rem]">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 relative z-10 gap-8">
               <div>
                  <h3 className="text-3xl font-luxury text-white tracking-tighter italic uppercase">Operational Load Matrix</h3>
                  <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">Weekly Asset Utilization Efficiency</p>
               </div>
               <div className="flex gap-10">
                  <div className="text-center">
                     <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Avg Efficiency</p>
                     <p className="text-2xl font-luxury text-white italic">91.4%</p>
                  </div>
                  <div className="text-center">
                     <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Target Sync</p>
                     <p className="text-2xl font-luxury text-gold italic">90.0%</p>
                  </div>
               </div>
            </div>
            <div className="h-[300px] w-full relative z-10">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={assetUtilizationData}>
                     <CartesianGrid strokeDasharray="10 10" vertical={false} stroke="rgba(255,255,255,0.02)" />
                     <XAxis dataKey="name" stroke="#475569" fontSize={10} fontWeight={900} axisLine={false} tickLine={false} />
                     <YAxis stroke="#475569" fontSize={10} fontWeight={900} axisLine={false} tickLine={false} />
                     <Tooltip contentStyle={{ backgroundColor: '#0a0a0c', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }} />
                     <Bar dataKey="usage" fill="#3b82f6" radius={[8, 8, 0, 0]} barSize={60} />
                     <Bar dataKey="target" fill="rgba(255,255,255,0.05)" radius={[8, 8, 0, 0]} barSize={60} />
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </HolographicCard>

         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
               { label: 'System Health', val: '99.9%', icon: Shield, color: 'text-emerald-500' },
               { label: 'Latency', val: '14ms', icon: Cpu, color: 'text-blue-500' },
               { label: 'Secure Link', val: 'Active', icon: Globe, color: 'text-purple-500' },
               { label: 'Sync Rate', val: '98%', icon: Zap, color: 'text-gold' },
               { label: 'Alert Rate', val: 'Low', icon: Bell, color: 'text-blue-400' },
               { label: 'Audit Trail', val: 'Verified', icon: Scale, color: 'text-slate-400' },
            ].map((node, i) => (
               <HolographicCard key={i} className="p-6 rounded-[2rem] text-center">
                  <node.icon size={20} className={`${node.color} mx-auto mb-4 opacity-50`} />
                  <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest mb-1">{node.label}</p>
                  <p className="text-lg font-luxury text-white italic">{node.val}</p>
               </HolographicCard>
            ))}
         </div>
      </div>
    </div>
  );
}
