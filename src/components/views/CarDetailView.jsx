import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  ArrowLeft, Battery, Fuel, Wrench, Shield, Zap, 
  Settings, Activity, AlertTriangle, Check, X, Clock, Navigation, Database, Cpu, Gauge, Globe, Calendar, ChevronRight, ExternalLink, Trash2
} from 'lucide-react';
import HolographicCard from '../ui/HolographicCard';

export default function CarDetailView({ car, onBack }) {
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [serviceSuccess, setServiceSuccess] = useState(false);
  
  // 3D Rotation State
  const x = useMotionValue(0);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], ["-45deg", "45deg"]));

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const mouseX = e.clientX - rect.left;
    const xPct = (mouseX / width) - 0.5;
    x.set(xPct);
  };

  const handleService = (e) => {
    e.preventDefault();
    setServiceSuccess(true);
    setTimeout(() => {
      setServiceSuccess(false);
      setShowServiceForm(false);
    }, 2000);
  };

  return (
    <div className="space-y-12 view-transition pb-20">
      {/* Tactical Header (Matching Trip Detail Style) */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
         <div>
            <div className="flex items-center gap-4 text-[10px] font-black text-secondary uppercase tracking-[0.3em] mb-4">
               <span>Fleet</span> <ChevronRight size={12} /> <span>Telemetry Node</span> <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div> <span className="text-emerald-500">NOMINAL</span>
            </div>
            <h2 className="text-5xl font-luxury text-primary tracking-tighter italic uppercase">Asset {car.id}</h2>
            <p className="text-secondary font-bold uppercase tracking-[0.2em] mt-3 text-sm">{car.model} â€” VIN: {car.vin}</p>
         </div>
         <div className="flex flex-wrap gap-4">
            <button onClick={onBack} className="flex items-center gap-3 px-8 py-4 bg-primary/5  text-primary font-black rounded-2xl hover:bg-primary/10 transition-all uppercase tracking-widest text-[10px]">
               <ArrowLeft size={18} /> All assets
            </button>
            <button 
               onClick={() => setShowServiceForm(true)}
               className="flex items-center gap-3 px-8 py-4 bg-gold text-obsidian font-black rounded-2xl hover:bg-amber-500 transition-all uppercase tracking-widest text-[10px] shadow-xl shadow-gold/20"
            >
               <Wrench size={18} /> Initialize Service
            </button>
            <button className="flex items-center gap-3 px-8 py-4 bg-red-600 text-primary font-black rounded-2xl hover:bg-red-500 transition-all uppercase tracking-widest text-[10px] shadow-xl shadow-red-600/20">
               <Trash2 size={18} /> Delete asset
            </button>
         </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        {/* Digital Twin Visualization */}
        <div className="xl:col-span-2 space-y-10">
           <HolographicCard 
             glowColor="blue" 
             className="rounded-[4rem] p-12 min-h-[650px] flex flex-col justify-center items-center overflow-visible"
           >
              <div className="absolute top-10 left-10 z-10">
                 <h3 className="text-3xl font-luxury text-primary tracking-tighter italic uppercase">Digital Twin v5.0</h3>
                 <p className="text-secondary font-bold uppercase tracking-[0.3em] text-[10px] mt-2">Real-time Structural Telemetry x 3D Projection</p>
              </div>
              
              <div 
                onMouseMove={handleMouseMove}
                className="relative z-10 w-full max-w-2xl h-[450px] flex flex-col items-center justify-center cursor-move"
                style={{ perspective: "1000px" }}
              >
                 <motion.div 
                   style={{ rotateY, transformStyle: "preserve-3d" }}
                   className="relative w-full h-full flex items-center justify-center"
                 >
                    <div className="relative group">
                       <div className="w-[500px] h-[300px] bg-blue-600/10 blur-[100px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"></div>
                       <div className="relative z-10 overflow-hidden rounded-[3rem]  shadow-2xl">
                          <img 
                            src={car.image} 
                            alt={car.model} 
                            className="w-[650px] h-[380px] object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent opacity-60"></div>
                          <div className="scan-line !h-0.5 opacity-40"></div>
                       </div>
                       <div className="absolute top-20 right-40 w-4 h-4 bg-red-500 rounded-full animate-ping glow-red z-20"></div>
                       <div className="absolute bottom-20 left-40 w-3 h-3 bg-emerald-500 rounded-full animate-pulse glow-emerald z-20"></div>
                    </div>
                 </motion.div>
                 <div className="absolute bottom-0 w-full text-center">
                    <p className="text-[9px] font-black text-secondary uppercase tracking-[0.5em] animate-pulse">Swipe to Rotate Orbital Stream</p>
                 </div>
              </div>
              
              <div className="grid grid-cols-3 gap-12 w-full mt-10 relative z-20">
                 {[
                    { label: 'Structural Integrity', val: '99.2%', color: 'text-emerald-400' },
                    { label: 'Drive Train', val: 'OPTIMAL', color: 'text-emerald-400' },
                    { label: 'Neural Sync', val: 'SECURE', color: 'text-blue-400' }
                 ].map((stat, i) => (
                    <div key={i} className="text-center space-y-2">
                       <span className="text-[10px] font-black text-secondary uppercase tracking-widest block">{stat.label}</span>
                       <p className={`text-xl font-luxury italic ${stat.color}`}>{stat.val}</p>
                    </div>
                 ))}
              </div>
           </HolographicCard>

           {/* Metrics Grid */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <HolographicCard glowColor="gold" className="p-10 rounded-[3rem]">
                  <div className="flex justify-between items-end mb-8">
                     <div>
                        <p className="text-[10px] text-secondary font-black uppercase tracking-[0.2em] mb-2">Energy Reserves</p>
                        <h4 className="text-4xl font-luxury text-primary italic tracking-tighter">{car.fuelLevel}%</h4>
                     </div>
                     <Zap className="text-gold mb-1" size={32} />
                  </div>
                  <div className="w-full h-2 bg-primary/5 rounded-full overflow-hidden">
                     <motion.div 
                        initial={{ width: 0 }} animate={{ width: `${car.fuelLevel}%` }}
                        className="h-full bg-gradient-to-r from-gold to-yellow-500 shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                     ></motion.div>
                  </div>
              </HolographicCard>

              <HolographicCard glowColor="blue" className="p-10 rounded-[3rem]">
                  <div className="flex justify-between items-end mb-8">
                     <div>
                        <p className="text-[10px] text-secondary font-black uppercase tracking-[0.2em] mb-2">Distance Traversed</p>
                        <h4 className="text-4xl font-luxury text-primary italic tracking-tighter">{car.odometer} mi</h4>
                     </div>
                     <Navigation className="text-blue-400 mb-1" size={32} />
                  </div>
                  <div className="flex items-center gap-4 pt-2">
                     <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-2"><Check size={12} /> WITHIN LIFECYCLE</span>
                  </div>
              </HolographicCard>
           </div>
        </div>

        {/* Sidebar Summary & Maintenance */}
        <div className="space-y-10">
           <HolographicCard glowColor="purple" className="p-10 rounded-[3.5rem]">
              <div className="flex items-center gap-4 mb-10">
                 <Activity className="text-purple-400" size={24} />
                 <h3 className="text-xl font-luxury text-primary tracking-tighter uppercase italic">Asset Summary</h3>
              </div>
              <div className="space-y-8">
                 {[
                    { label: 'Deployment Status', val: car.status, color: car.status === 'Idle' ? 'text-purple-400' : 'text-blue-400' },
                    { label: 'Registered Driver', val: car.driver || 'N/A', color: 'text-primary' },
                    { label: 'Registry Date', val: '01/15/2026', color: 'text-primary' },
                    { label: 'Security Level', val: 'Tier 4', color: 'text-gold' },
                 ].map((stat, i) => (
                    <div key={i} className="flex justify-between items-center py-4 border-b  last:border-0">
                       <span className="text-[10px] font-black text-secondary uppercase tracking-widest">{stat.label}</span>
                       <span className={`text-sm font-black uppercase tracking-wider ${stat.color}`}>{stat.val}</span>
                    </div>
                 ))}
              </div>
           </HolographicCard>

           <HolographicCard glowColor="gold" className="p-10 rounded-[3rem]">
              <h3 className="text-xl font-luxury text-primary tracking-tighter uppercase italic mb-10">Maintenance History</h3>
              <div className="space-y-10 relative">
                 <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-primary/10"></div>
                 {[
                    { title: 'Core Optimization', time: '04.12.2026', desc: 'Neural link calibration successful', active: true },
                    { title: 'Energy Exchange', time: '03.28.2026', desc: 'Battery cell swap â€” OK', active: false },
                 ].map((event, i) => (
                    <div key={i} className="relative pl-12">
                       <div className={`absolute left-0 top-1.5 w-6.5 h-6.5 rounded-full border-4 border-obsidian z-10 ${event.active ? 'bg-gold glow-gold' : 'bg-[var(--border-primary)]'}`}></div>
                       <div className="flex justify-between items-start mb-2">
                          <h4 className="text-sm font-black text-primary uppercase italic tracking-tighter">{event.title}</h4>
                          <span className="text-[9px] font-bold text-secondary uppercase">{event.time}</span>
                       </div>
                       <p className="text-[10px] text-secondary font-medium uppercase tracking-widest">{event.desc}</p>
                    </div>
                 ))}
              </div>
           </HolographicCard>

           <HolographicCard glowColor="blue" className="p-10 rounded-[3rem]">
              <h3 className="text-xl font-luxury text-primary tracking-tighter uppercase italic mb-8">Hardware Metrics</h3>
              <div className="space-y-6">
                 {[
                    { icon: Cpu, label: 'Neural Core', val: 'V5-SYNC' },
                    { icon: Database, label: 'Encrypted Log', val: 'SECURE' },
                    { icon: Globe, label: 'Grid Sync', val: 'ACTIVE' }
                 ].map((item, i) => (
                    <div key={i} className="flex items-center gap-6 p-5 rounded-2xl bg-primary/5 ">
                       <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400">
                          <item.icon size={20} />
                       </div>
                       <div>
                          <p className="text-[9px] font-black text-secondary uppercase tracking-widest">{item.label}</p>
                          <p className="text-sm font-black text-primary uppercase italic tracking-tighter">{item.val}</p>
                       </div>
                    </div>
                 ))}
              </div>
           </HolographicCard>
        </div>
      </div>

      {/* SERVICE MODE INTERFACE OVERLAY */}
      <AnimatePresence>
        {showServiceForm && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center p-6 bg-[var(--bg-primary)]/90 backdrop-blur-2xl animate-in fade-in duration-500"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }}
              className="glass-obsidian w-full max-w-xl rounded-[3.5rem] shadow-2xl overflow-hidden  glow-gold"
            >
              <div className="p-12 border-b  flex justify-between items-center bg-primary/5">
                <div>
                  <h3 className="text-3xl font-luxury text-primary tracking-tighter italic uppercase">Service Terminal</h3>
                  <p className="text-secondary font-bold uppercase tracking-widest text-[10px] mt-2">Asset Maintenance Authorization Required</p>
                </div>
                <button onClick={() => setShowServiceForm(false)} className="w-14 h-14 flex items-center justify-center bg-primary/5 rounded-2xl text-secondary hover:text-primary transition-all ">
                  <X size={28} />
                </button>
              </div>
              
              <div className="p-12">
                {serviceSuccess ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center animate-in fade-in zoom-in duration-500">
                    <div className="w-24 h-24 bg-gold/10 text-gold rounded-[2.5rem] flex items-center justify-center mb-10 shadow-2xl shadow-gold/20 animate-bounce border border-gold/20">
                      <Check size={52} />
                    </div>
                    <h4 className="text-3xl font-luxury text-primary uppercase italic tracking-tighter">Maintenance Logged</h4>
                    <p className="text-secondary font-bold uppercase tracking-widest text-[10px] mt-4">Structural integrity verified. Lifecycle registry updated.</p>
                  </div>
                ) : (
                  <form onSubmit={handleService} className="space-y-8">
                    <div className="space-y-8">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-secondary uppercase tracking-[0.3em] ml-1">Service Classification</label>
                          <select className="w-full bg-primary/5  rounded-2xl px-8 py-6 text-sm focus:bg-primary/10 focus:border-gold outline-none transition-all font-black text-primary appearance-none uppercase tracking-[0.2em]">
                             <option>Routine Diagnostic</option>
                             <option>Structural Optimization</option>
                             <option>Neural Link Calibration</option>
                             <option>Energy Core Exchange</option>
                          </select>
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-secondary uppercase tracking-[0.3em] ml-1">Resource Allocation ($)</label>
                          <input required type="number" placeholder="Enter Cost Credits..." className="w-full bg-primary/5  rounded-2xl px-8 py-6 text-sm focus:bg-primary/10 focus:border-gold outline-none transition-all font-black text-primary uppercase tracking-[0.2em]" />
                       </div>
                    </div>
                    <div className="pt-6">
                      <button type="submit" className="w-full py-6 bg-gold text-obsidian font-black rounded-3xl transition-all shadow-2xl shadow-gold/20 hover:scale-[1.02] active:scale-[0.98] uppercase tracking-[0.3em] text-[10px]">
                        Authorize Maintenance Cycle
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}



