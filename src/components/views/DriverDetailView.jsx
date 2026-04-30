import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Phone, Mail, Award, Calendar, 
  MapPin, Shield, Star, Zap, Clock, Navigation, Check, Car, User, Settings, AlertTriangle, Activity, X
} from 'lucide-react';
import HolographicCard from '../ui/HolographicCard';

export default function DriverDetailView({ driver, onBack, cars, trips }) {
  const [showAssignForm, setShowAssignForm] = useState(false);
  const [assignSuccess, setAssignSuccess] = useState(false);

  const handleAssign = (e) => {
    e.preventDefault();
    setAssignSuccess(true);
    setTimeout(() => {
      setAssignSuccess(false);
      setShowAssignForm(false);
    }, 2000);
  };

  const availableCars = (cars || []).filter(c => c.status === 'Idle');
  const driverTrips = (trips || []).filter(t => t.driver === driver.name);

  return (
    <div className="space-y-10 view-transition pb-20">
      {/* Dynamic Header */}
      <div className="flex items-center gap-6 mb-12">
        <button onClick={onBack} className="w-14 h-14 glass-obsidian rounded-2xl flex items-center justify-center text-slate-500 hover:text-white transition-all border-white/10 glow-blue">
          <ArrowLeft size={28} />
        </button>
        <div>
          <h2 className="text-4xl font-luxury text-white tracking-tighter italic uppercase">Personnel Intelligence</h2>
          <p className="text-gold font-bold uppercase tracking-[0.3em] text-[10px] mt-2 opacity-80">Security Clearance Level 4</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        {/* Profile Identity Card - Holographic with Parallax */}
        <div className="xl:col-span-1 space-y-8">
           <HolographicCard 
             glowColor="gold"
             className="rounded-[4rem] p-12"
           >
              <div className="flex flex-col items-center text-center relative z-10">
                 <div className="relative mb-8 group">
                    <div className="relative overflow-hidden rounded-[3.5rem]">
                       <div className="scan-line"></div>
                       <img src={driver.avatar} className="w-48 h-48 rounded-[3.5rem] object-cover ring-4 ring-white/10 shadow-2xl transition-all duration-700" alt="identity" />
                    </div>
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-gold text-obsidian px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-gold/20">
                       ACTIVE SYNC
                    </div>
                 </div>
                 <h3 className="text-4xl font-luxury text-white tracking-tighter italic uppercase">{driver.name}</h3>
                 <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-[10px] mt-4 leading-relaxed">{driver.role} / OPS DIV-01</p>
                 
                 <div className="grid grid-cols-2 gap-4 w-full mt-10">
                    <div className="bg-white/[0.03] p-4 rounded-2xl border border-white/5">
                       <p className="text-[10px] text-slate-600 font-black uppercase tracking-widest mb-1">Safety Score</p>
                       <p className="text-2xl font-luxury text-emerald-400 italic">{driver.rating}</p>
                    </div>
                    <div className="bg-white/[0.03] p-4 rounded-2xl border border-white/5">
                       <p className="text-[10px] text-slate-600 font-black uppercase tracking-widest mb-1">Reliability</p>
                       <p className="text-2xl font-luxury text-blue-400 italic">{driver.onTimeRate}%</p>
                    </div>
                 </div>
              </div>
              <User size={300} className="absolute -right-20 -bottom-20 opacity-[0.02] text-gold" />
           </HolographicCard>

           <HolographicCard glowColor="blue" className="rounded-[3rem] p-10 space-y-8">
              <h4 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] ml-2">Communication Hub</h4>
              <div className="space-y-6">
                 <div className="flex items-center gap-6 group cursor-pointer">
                    <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-slate-500 group-hover:text-gold transition-colors border border-white/5">
                       <Mail size={22} />
                    </div>
                    <div>
                       <p className="text-[10px] text-slate-600 font-black uppercase tracking-widest">Secure Mail</p>
                       <p className="text-sm font-bold text-slate-300 tracking-wider mt-1">{driver.email}</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-6 group cursor-pointer">
                    <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-slate-500 group-hover:text-gold transition-colors border border-white/5">
                       <Phone size={22} />
                    </div>
                    <div>
                       <p className="text-[10px] text-slate-600 font-black uppercase tracking-widest">Encrypted Comms</p>
                       <p className="text-sm font-bold text-slate-300 tracking-wider mt-1">{driver.phone}</p>
                    </div>
                 </div>
              </div>
           </HolographicCard>
        </div>

        {/* Tactical Mission Deployment */}
        <div className="xl:col-span-2 space-y-10">
           {/* Current Asset Status */}
           <HolographicCard glowColor="blue" className="rounded-[4rem] p-12">
              <div className="flex justify-between items-center mb-12 relative z-10">
                 <h3 className="text-2xl font-luxury text-white tracking-tighter italic uppercase">Assigned Strategic Asset</h3>
                 <Settings className="text-slate-700 hover:text-gold transition-colors cursor-pointer" size={24} />
              </div>
              
              <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
                 <div className="w-full md:w-1/2 aspect-video bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-[2.5rem] flex items-center justify-center border border-white/10 relative group overflow-hidden">
                    <Car size={100} className="text-blue-400/20 group-hover:scale-110 group-hover:text-blue-400 transition-all duration-700" />
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                       <span className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Initialize 3D Twin</span>
                    </div>
                 </div>
                 <div className="flex-1 space-y-8 w-full">
                    <div>
                       <h4 className="text-3xl font-luxury text-white tracking-tighter uppercase italic">{driver.activeRouteId ? 'Armored Transporter - ZT41' : 'No Asset Linked'}</h4>
                       <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-[10px] mt-2">Class: Executive Logistics</p>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                       <div className="space-y-1">
                          <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Telemetry</span>
                          <p className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2"><Activity size={14} /> NOMINAL</p>
                       </div>
                       <div className="space-y-1">
                          <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Energy Sync</span>
                          <p className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2"><Zap size={14} className="text-gold" /> 98.4%</p>
                       </div>
                    </div>
                    <button 
                      onClick={() => setShowAssignForm(true)}
                      className="w-full py-5 bg-white text-obsidian font-black rounded-2xl hover:bg-gold transition-all uppercase text-[10px] tracking-[0.3em]"
                    >
                      {driver.activeRouteId ? 'Reassign Strategic Asset' : 'Link Executive Asset'}
                    </button>
                 </div>
              </div>
              <Activity size={300} className="absolute -right-20 -bottom-20 opacity-[0.02] text-white" />
           </HolographicCard>

           <HolographicCard glowColor="purple" className="rounded-[3rem] p-10">
              <div className="flex justify-between items-center mb-10">
                 <h3 className="text-2xl font-luxury text-white tracking-tighter italic uppercase">Safety & Reliability</h3>
                 <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Global Ranking: #12</span>
              </div>
              
              <div className="space-y-10">
                 <div className="space-y-4">
                    <div className="flex justify-between items-end">
                       <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Operational Safety</span>
                       <span className="text-xl font-luxury text-emerald-400 italic">98.5%</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                       <motion.div initial={{ width: 0 }} animate={{ width: '98.5%' }} className="h-full bg-emerald-500 shadow-[0_0_15px_#10b981]" />
                    </div>
                 </div>

                 <div className="space-y-4">
                    <div className="flex justify-between items-end">
                       <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Fuel Efficiency Index</span>
                       <span className="text-xl font-luxury text-blue-400 italic">92.0%</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                       <motion.div initial={{ width: 0 }} animate={{ width: '92%' }} className="h-full bg-blue-500 shadow-[0_0_15px_#3b82f6]" />
                    </div>
                 </div>

                 <div className="pt-6 border-t border-white/5">
                    <h4 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] mb-6">Incident History</h4>
                    <div className="space-y-6">
                       {[
                         { title: 'Speeding Alert', date: 'Oct 12, 2023', severity: 'warning' },
                         { title: 'Harsh Braking', date: 'Sep 28, 2023', severity: 'info' }
                       ].map((incident, i) => (
                         <div key={i} className="flex items-center gap-5 p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                            <div className={`p-2 rounded-xl bg-white/5 border border-white/10 ${incident.severity === 'warning' ? 'text-amber-500' : 'text-blue-500'}`}>
                               <AlertTriangle size={16} />
                            </div>
                            <div className="flex-1">
                               <p className="text-[11px] font-black text-white uppercase tracking-wider">{incident.title}</p>
                               <p className="text-[9px] text-slate-500 font-bold uppercase mt-0.5">{incident.date}</p>
                            </div>
                            <button className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Review</button>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
           </HolographicCard>

           {/* Deployment History Terminal */}
           <HolographicCard glowColor="blue" className="rounded-[3rem] p-10">
              <div className="flex justify-between items-center mb-10">
                 <h3 className="text-2xl font-luxury text-white tracking-tighter italic uppercase">Mission Registry</h3>
                 <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Last 30 Cycles</span>
              </div>
              <div className="space-y-6">
                 {driverTrips.length > 0 ? driverTrips.map((trip) => (
                    <div key={trip.id} className="flex items-center justify-between p-6 rounded-3xl bg-white/[0.02] border border-white/5 group hover:bg-white/[0.04] transition-all">
                       <div className="flex items-center gap-6">
                          <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-slate-600 group-hover:text-blue-400 transition-colors border border-white/5">
                             <Navigation size={22} />
                          </div>
                          <div>
                             <p className="text-sm font-black text-white uppercase italic tracking-tighter">{trip.name}</p>
                             <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Route Sync: {trip.distance} // {trip.eta}</p>
                          </div>
                       </div>
                       <div className="text-right">
                          <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${trip.progress === 100 ? 'text-emerald-400' : 'text-blue-400'}`}>
                             {trip.progress === 100 ? 'SUCCESSFUL' : 'ACTIVE'}
                          </p>
                          <p className="text-[10px] text-slate-600 font-bold uppercase">12.04.2026</p>
                       </div>
                    </div>
                 )) : (
                    <div className="py-10 text-center">
                       <p className="text-slate-500 font-black uppercase tracking-widest text-xs">No mission history recorded for this operator.</p>
                    </div>
                 )}
              </div>
           </HolographicCard>
        </div>
      </div>

      {/* ASSET LINK INTERFACE OVERLAY */}
      <AnimatePresence>
        {showAssignForm && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center p-6 bg-obsidian/90 backdrop-blur-2xl animate-in fade-in duration-500"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }}
              className="glass-obsidian w-full max-w-2xl rounded-[3.5rem] shadow-2xl overflow-hidden border-white/10 glow-gold"
            >
              <div className="p-12 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                <div>
                  <h3 className="text-3xl font-luxury text-white tracking-tighter italic uppercase">Asset Linking</h3>
                  <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-2">Initialize Secure Resource Association</p>
                </div>
                <button onClick={() => setShowAssignForm(false)} className="w-14 h-14 flex items-center justify-center bg-white/5 rounded-2xl text-slate-500 hover:text-white transition-all border border-white/5">
                  <X size={28} />
                </button>
              </div>
              
              <div className="p-12">
                {assignSuccess ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center animate-in fade-in zoom-in duration-500">
                    <div className="w-24 h-24 bg-gold/10 text-gold rounded-[2.5rem] flex items-center justify-center mb-10 shadow-2xl shadow-gold/20 animate-bounce border border-gold/20">
                      <Check size={52} />
                    </div>
                    <h4 className="text-3xl font-luxury text-white uppercase italic tracking-tighter">Association Active</h4>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-4">Telemetry streams synchronized. Asset control transferred.</p>
                  </div>
                ) : (
                  <form onSubmit={handleAssign} className="space-y-10">
                    <div className="space-y-8">
                       <div className="space-y-3">
                          <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] ml-2">Select Reserve Asset</label>
                          <div className="grid grid-cols-1 gap-4">
                             {availableCars.slice(0, 3).map((car) => (
                                <div 
                                  key={car.id} 
                                  className="flex items-center justify-between p-6 rounded-[1.5rem] bg-white/[0.03] border border-white/5 hover:border-gold/30 hover:bg-white/5 cursor-pointer group transition-all"
                                >
                                   <div className="flex items-center gap-5">
                                      <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-slate-500 group-hover:text-gold transition-colors">
                                         <Car size={22} />
                                      </div>
                                      <div>
                                         <p className="text-sm font-black text-white uppercase italic tracking-tighter group-hover:text-gold transition-colors">{car.id}</p>
                                         <p className="text-[9px] text-slate-600 font-bold uppercase tracking-widest">{car.model}</p>
                                      </div>
                                   </div>
                                   <div className="text-right">
                                      <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">READY</span>
                                   </div>
                                </div>
                             ))}
                          </div>
                       </div>
                    </div>

                    <div className="pt-6">
                      <button type="submit" className="w-full py-6 bg-gold text-obsidian font-black rounded-3xl transition-all shadow-2xl shadow-gold/20 hover:scale-[1.02] active:scale-[0.98] uppercase tracking-[0.3em] text-[10px]">
                        Finalize Link Authorization
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
