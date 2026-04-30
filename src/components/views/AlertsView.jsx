import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertTriangle, Search, CheckCircle, Clock, 
  ArrowRight, ShieldAlert, Zap, Car, MapPin, 
  Check, MoreHorizontal, Bell
} from 'lucide-react';
import HolographicCard from '../ui/HolographicCard';

export default function AlertsView({ alerts, setAlerts }) {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const resolveAlert = (id) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  };

  const filteredAlerts = (alerts || []).filter(a => {
    const matchesFilter = filter === 'all' || a.type === filter;
    const matchesSearch = (a.vehicle?.toLowerCase() || '').includes(searchTerm.toLowerCase()) || 
                         (a.title?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-10 view-transition pb-20">
      {/* Risk Summary Control */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 glass-obsidian p-10 rounded-[3rem]  glow-purple">
        <div>
          <h2 className="text-4xl font-luxury text-primary tracking-tighter italic uppercase">Risk Intelligence</h2>
          <p className="text-secondary font-bold uppercase tracking-[0.2em] mt-2 text-[10px]">Real-time Threat Mitigation Terminal</p>
        </div>
        
        <div className="flex flex-wrap gap-4 w-full lg:w-auto">
          <div className="flex bg-primary/5 p-1 rounded-2xl ">
            {['all', 'critical', 'warning', 'info'].map(t => (
              <button 
                key={t}
                onClick={() => setFilter(t)}
                className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === t ? 'bg-primary text-primary shadow-lg' : 'text-secondary hover:bg-primary/5'}`}
              >
                {t}
              </button>
            ))}
          </div>
          
          <div className="relative flex-1 lg:flex-none">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-secondary" size={16} />
            <input 
              type="text" 
              placeholder="Filter by Asset/Alert..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full lg:w-64 pl-12 pr-6 py-3.5 bg-primary/5  rounded-2xl text-[10px] font-black text-primary uppercase tracking-widest focus:bg-primary/5 focus:border-purple-500/50 outline-none transition-all"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Alerts Stream */}
        <div className="xl:col-span-2 space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredAlerts.map((alert) => (
              <motion.div
                key={alert.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass-obsidian rounded-[2.5rem] p-8  hover: transition-all group relative overflow-hidden"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
                  <div className="flex items-center gap-6">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 border transition-all duration-500 ${
                      alert.type === 'critical' ? 'bg-red-500/10 text-red-500 border-red-500/20 glow-red' : 
                      alert.type === 'warning' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20 glow-gold' : 
                      'bg-blue-500/10 text-blue-500 border-blue-500/20 glow-blue'
                    }`}>
                      <ShieldAlert size={28} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="text-xl font-luxury text-primary tracking-tighter italic uppercase">{alert.title}</h4>
                        <span className={`text-[8px] font-black px-2 py-0.5 rounded-md uppercase tracking-widest ${
                          alert.type === 'critical' ? 'text-red-500 bg-red-500/10' : 
                          alert.type === 'warning' ? 'text-amber-500 bg-amber-500/10' : 
                          'text-blue-500 bg-blue-500/10'
                        }`}>
                          {alert.type}
                        </span>
                      </div>
                      <p className="text-sm text-secondary font-medium leading-relaxed max-w-xl">{alert.message}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:items-end gap-4 w-full md:w-auto">
                    <div className="flex items-center gap-2 text-[10px] font-black text-secondary uppercase tracking-widest">
                      <Clock size={12} />
                      {alert.time}
                    </div>
                    <div className="flex gap-3">
                      <button 
                        onClick={() => resolveAlert(alert.id)}
                        className="flex-1 md:flex-none px-6 py-3 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-500 hover:text-primary transition-all flex items-center justify-center gap-2"
                      >
                        <Check size={14} /> Resolve
                      </button>
                      <button className="p-3 bg-primary/5 text-secondary  rounded-xl hover:text-primary transition-all">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Visual Asset Link */}
                <div className="mt-8 pt-8 border-t border-[var(--border-primary)]  flex items-center justify-between relative z-10">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center text-secondary">
                         <Car size={20} />
                      </div>
                      <div>
                         <p className="text-[10px] font-black text-primary uppercase tracking-widest">Target Asset</p>
                         <p className="text-[10px] font-bold text-secondary uppercase tracking-widest">{alert.vehicle}</p>
                      </div>
                   </div>
                   <button className="flex items-center gap-2 text-[10px] font-black text-blue-400 uppercase tracking-widest hover:text-primary transition-colors">
                      Live Telemetry <ArrowRight size={12} />
                   </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {filteredAlerts.length === 0 && (
            <div className="py-32 flex flex-col items-center justify-center text-center glass-obsidian rounded-[3rem] ">
              <div className="w-24 h-24 bg-emerald-500/10 text-emerald-500 rounded-[2.5rem] flex items-center justify-center mb-8 border border-emerald-500/20 shadow-2xl">
                <CheckCircle size={48} />
              </div>
              <h3 className="text-3xl font-luxury text-primary uppercase italic tracking-tighter">System Nominal</h3>
              <p className="text-secondary font-bold uppercase tracking-widest text-[10px] mt-4">All threats mitigated. Fleet operating within optimal parameters.</p>
            </div>
          )}
        </div>

        {/* Tactical Map Sidebar */}
        <div className="space-y-8">
           <HolographicCard glowColor="purple" className="p-10 rounded-[3rem] h-[500px] flex flex-col">
              <h3 className="text-xl font-luxury text-primary tracking-tighter italic uppercase mb-8">Asset Hotspots</h3>
              <div className="flex-1 bg-primary/5 rounded-3xl  relative overflow-hidden flex items-center justify-center">
                 <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5"></div>
                 <div className="relative text-center p-8">
                    <MapPin size={48} className="text-purple-500 mx-auto mb-6 animate-bounce" />
                    <p className="text-[10px] font-black text-secondary uppercase tracking-[0.2em] leading-relaxed">Map synchronization required to view localized threat vectors.</p>
                 </div>
              </div>
              <button className="w-full py-5 bg-primary text-primary  font-black rounded-2xl hover:bg-primary/5 transition-all uppercase tracking-widest text-[10px] mt-8">
                 Refresh Tactical Grid
              </button>
           </HolographicCard>

           <HolographicCard glowColor="gold" className="p-10 rounded-[3rem] bg-gradient-to-br from-amber-600/10 to-gold/10">
              <div className="flex items-center gap-4 mb-6">
                 <Bell className="text-gold" size={24} />
                 <h4 className="text-sm font-black text-primary uppercase tracking-widest">Priority Protocols</h4>
              </div>
              <p className="text-lg font-luxury text-primary mb-8">{alerts.filter(a => a.type === 'critical').length} Critical Alerts require manual commander intervention.</p>
              <div className="space-y-4">
                 {[
                   { label: 'Dispatch Precision', val: '94%' },
                   { label: 'Fleet Latency', val: '12ms' }
                 ].map((stat, i) => (
                   <div key={i} className="flex justify-between items-center py-3 border-b ">
                      <span className="text-[9px] font-black text-secondary uppercase tracking-widest">{stat.label}</span>
                      <span className="text-xs font-black text-primary uppercase">{stat.val}</span>
                   </div>
                 ))}
              </div>
           </HolographicCard>
        </div>
      </div>
    </div>
  );
}



