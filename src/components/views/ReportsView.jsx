import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, Download, Filter, Search, Calendar, ShieldCheck, 
  Clock, ArrowRight, Database, User, TrendingUp, Zap, 
  CheckCircle, AlertCircle, Share2, Printer, Mail, MoreVertical
} from 'lucide-react';
import { activityLogs, fleetVelocityData } from '../../data/dummyData';
import HolographicCard from '../ui/HolographicCard';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, BarChart, Bar, Cell 
} from 'recharts';

const driverInsights = [
  { id: 1, name: 'Abdullah Ali', open: 12, done: 45, overdue: 1, cycle: '24h', status: 'Optimal', sparkline: [10, 15, 8, 20, 18, 25, 22] },
  { id: 2, name: 'Sara Smith', open: 8, done: 38, overdue: 3, cycle: '32h', status: 'Warning', sparkline: [5, 10, 12, 8, 15, 10, 12] },
  { id: 3, name: 'Michael Chen', open: 15, done: 52, overdue: 0, cycle: '18h', status: 'Optimal', sparkline: [20, 25, 22, 30, 28, 35, 32] },
];

const topCompleters = [
  { name: 'Abdullah Ali', score: 98, trips: 142 },
  { name: 'Michael Chen', score: 95, trips: 128 },
  { name: 'Emma Davis', score: 92, trips: 115 },
];

export default function ReportsView() {
  return (
    <div className="space-y-10 view-transition pb-20">
      {/* 1. Executive KPI Strip */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Fleet Velocity', val: '42.8 mph', trend: '+2.4%', icon: Zap, color: 'text-gold' },
          { label: 'Dispatch Accuracy', val: '98.5%', trend: '+0.8%', icon: CheckCircle, color: 'text-emerald-400' },
          { label: 'Operational Cost', val: '$12,450', trend: '-5.2%', icon: TrendingUp, color: 'text-blue-400' },
          { label: 'Risk Mitigation', val: '99.9%', trend: 'Stable', icon: ShieldCheck, color: 'text-purple-400' },
        ].map((kpi, i) => (
          <div key={i} className="glass-obsidian p-8 rounded-[2.5rem]  relative overflow-hidden group">
            <div className="flex justify-between items-start mb-6">
              <div className={`p-3 rounded-xl bg-primary/5  ${kpi.color}`}>
                <kpi.icon size={20} />
              </div>
              <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${kpi.trend.startsWith('+') ? 'text-emerald-400 bg-emerald-500/10' : 'text-blue-400 bg-blue-500/10'}`}>
                {kpi.trend}
              </span>
            </div>
            <p className="text-[10px] font-black text-secondary uppercase tracking-widest">{kpi.label}</p>
            <h3 className="text-3xl font-luxury text-primary mt-2 italic">{kpi.val}</h3>
            <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-10 transition-opacity">
              <kpi.icon size={100} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* 2. Fleet Velocity Chart */}
        <HolographicCard glowColor="blue" className="xl:col-span-2 rounded-[3rem] p-10">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="text-2xl font-luxury text-primary tracking-tighter italic uppercase">Fleet Velocity Tracking</h3>
              <p className="text-[10px] font-black text-secondary uppercase tracking-widest mt-1">Global average speed vs target throughput</p>
            </div>
            <div className="flex gap-2">
              <button className="p-3 bg-primary/5 rounded-xl text-secondary hover:text-gold transition-all "><Share2 size={16} /></button>
              <button className="p-3 bg-primary/5 rounded-xl text-secondary hover:text-gold transition-all "><Printer size={16} /></button>
            </div>
          </div>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={fleetVelocityData}>
                <defs>
                  <linearGradient id="colorVelocity" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="day" hide />
                <YAxis stroke="rgba(255,255,255,0.2)" fontSize={10} fontWeight={800} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#0a0a0c', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px' }} />
                <Area type="monotone" dataKey="miles" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorVelocity)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </HolographicCard>

        {/* 3. Operational Cost Summary */}
        <HolographicCard glowColor="gold" className="rounded-[3rem] p-10 flex flex-col">
          <h3 className="text-2xl font-luxury text-primary tracking-tighter italic uppercase mb-10 text-center">Cost Analysis</h3>
          <div className="flex-1 flex flex-col justify-center space-y-8">
            {[
              { label: 'Fuel/Energy', val: '$5,240', progress: 65, color: 'bg-gold' },
              { label: 'Maintenance', val: '$3,120', progress: 45, color: 'bg-blue-500' },
              { label: 'Insurance', val: '$2,800', progress: 80, color: 'bg-purple-500' },
              { label: 'Personnel', val: '$1,290', progress: 30, color: 'bg-emerald-500' },
            ].map((cost, i) => (
              <div key={i} className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-secondary uppercase tracking-widest">{cost.label}</span>
                  <span className="text-sm font-luxury text-primary italic">{cost.val}</span>
                </div>
                <div className="w-full h-1.5 bg-primary/5 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${cost.progress}%` }} className={`h-full ${cost.color}`} />
                </div>
              </div>
            ))}
          </div>
          <button className="w-full py-5 bg-gold text-obsidian font-black rounded-2xl hover:scale-[1.02] transition-all uppercase text-[10px] tracking-widest mt-10">
            Generate Detailed Audit
          </button>
        </HolographicCard>
      </div>

      {/* 4. Driver Insight Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {driverInsights.map(driver => (
          <HolographicCard key={driver.id} glowColor={driver.status === 'Optimal' ? 'blue' : 'gold'} className="p-8 rounded-[3rem]">
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl overflow-hidden ">
                  <img src={`https://i.pravatar.cc/150?u=${driver.id}`} alt="driver" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-lg font-luxury text-primary tracking-tighter uppercase italic">{driver.name}</h4>
                  <span className={`text-[9px] font-black px-2 py-0.5 rounded-lg border ${driver.status === 'Optimal' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>
                    {driver.status}
                  </span>
                </div>
              </div>
              <button className="text-secondary hover:text-primary"><MoreVertical size={20} /></button>
            </div>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="space-y-1">
                <p className="text-[9px] font-black text-secondary uppercase tracking-widest">Active Missions</p>
                <p className="text-xl font-luxury text-primary italic">{driver.open}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[9px] font-black text-secondary uppercase tracking-widest">Done This Week</p>
                <p className="text-xl font-luxury text-emerald-400 italic">{driver.done}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[9px] font-black text-secondary uppercase tracking-widest">Overdue Assets</p>
                <p className="text-xl font-luxury text-red-500 italic">{driver.overdue}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[9px] font-black text-secondary uppercase tracking-widest">Avg Cycle Time</p>
                <p className="text-xl font-luxury text-blue-400 italic">{driver.cycle}</p>
              </div>
            </div>

            <div className="h-16 w-full opacity-50">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={driver.sparkline.map((v, i) => ({ v, i }))}>
                  <Area type="monotone" dataKey="v" stroke={driver.status === 'Optimal' ? '#3b82f6' : '#d4af37'} strokeWidth={2} fill={driver.status === 'Optimal' ? '#3b82f6' : '#d4af37'} fillOpacity={0.1} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[9px] font-black text-secondary uppercase tracking-widest mt-2 text-center">14-Day Activity Sparkline</p>
          </HolographicCard>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* 5. Top Completers Ranking */}
        <div className="glass-obsidian rounded-[3rem] p-10 glow-blue">
          <h3 className="text-2xl font-luxury text-primary tracking-tighter italic uppercase mb-10">Punctuality Ranking</h3>
          <div className="space-y-6">
            {topCompleters.map((c, i) => (
              <div key={i} className="flex items-center gap-6 p-6 rounded-3xl bg-primary/5  group hover:bg-primary/10 transition-all">
                <div className="text-2xl font-luxury text-gold italic w-8">{i + 1}</div>
                <div className="flex-1 flex justify-between items-center">
                  <div>
                    <h4 className="font-black text-primary text-sm uppercase tracking-wider">{c.name}</h4>
                    <p className="text-[10px] text-secondary font-bold uppercase tracking-widest mt-1">{c.trips} Missions Completed</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-luxury text-emerald-400 italic">{c.score}%</p>
                    <p className="text-[9px] font-black text-secondary uppercase tracking-widest">Integrity</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 6. Activity Log Feed */}
        <div className="glass-obsidian rounded-[3rem] p-10 glow-gold">
           <div className="flex justify-between items-center mb-10">
              <h3 className="text-2xl font-luxury text-primary tracking-tighter uppercase italic">Executive Audit Stream</h3>
              <Clock size={20} className="text-gold" />
           </div>
           <div className="space-y-8 relative before:absolute before:left-[27px] before:top-2 before:bottom-2 before:w-px before:bg-primary/5">
              {activityLogs.slice(0, 4).map(log => (
                 <div key={log.id} className="relative pl-16 group">
                    <div className="absolute left-0 top-0 w-14 h-14 rounded-2xl bg-primary  flex items-center justify-center z-10 group-hover:border-gold transition-colors">
                       <div className="text-secondary group-hover:text-gold transition-colors">
                          <CheckCircle size={20} />
                       </div>
                    </div>
                    <div>
                       <div className="flex justify-between items-start mb-2">
                          <p className="text-sm font-medium text-secondary leading-relaxed">
                             <span className="text-primary font-black uppercase tracking-wider mr-2">{log.driver}</span> 
                             {log.message}
                          </p>
                          <span className="text-[10px] font-bold text-secondary ml-4 shrink-0">{log.time}</span>
                       </div>
                       <div className="flex gap-3">
                          <span className="px-3 py-1 bg-primary/5 rounded-lg text-[9px] font-black text-secondary uppercase tracking-widest ">LOG_RE_4920</span>
                          <span className="px-3 py-1 bg-emerald-500/10 rounded-lg text-[9px] font-black text-emerald-400 uppercase tracking-widest border border-emerald-500/10">VERIFIED</span>
                       </div>
                    </div>
                 </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
