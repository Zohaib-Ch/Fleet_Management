import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Battery, Fuel, ChevronRight, Plus, X, Check, Car, Hash, Calendar, ShieldCheck, Zap, MoreHorizontal, Activity, Search, User } from 'lucide-react';
import HolographicCard from '../ui/HolographicCard';

export default function FleetDetailsView({ cars, setCars, onSelectCar, addLog }) {
   const [showAddForm, setShowAddForm] = useState(false);
   const [formSuccess, setFormSuccess] = useState(false);
   const [searchTerm, setSearchTerm] = useState('');
   const [activeFilter, setActiveFilter] = useState('all');
   const formRef = useRef(null);

   useEffect(() => {
      if (showAddForm && formRef.current) {
         formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
   }, [showAddForm]);

   // Form state
   const [plate, setPlate] = useState('');
   const [model, setModel] = useState('');

   const handleAddCar = (e) => {
      e.preventDefault();
      const newCar = {
         id: plate,
         model: model,
         status: 'Idle',
         fuelLevel: 100,
         odometer: '0 mi',
         driver: 'UNASSIGNED',
         year: '2024',
         vin: 'SYNC' + Math.random().toString(36).substring(2, 8).toUpperCase(),
         image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=1000"
      };

      setFormSuccess(true);
      setTimeout(() => {
         setCars([newCar, ...cars]);
         addLog('Admin', `registered new asset ${plate} (${model})`, plate, 'status');
         setFormSuccess(false);
         setShowAddForm(false);
         setPlate('');
         setModel('');
      }, 1500);
   };

   const filteredCars = (cars || []).filter(c => {
      const matchesSearch = c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
         c.model.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = activeFilter === 'all' || c.status === activeFilter;
      return matchesSearch && matchesFilter;
   });

   const safeCars = cars || [];
   const total = safeCars.length;
   const enRoute = safeCars.filter(c => c.status === 'En Route').length;
   const idle = safeCars.filter(c => c.status === 'Idle').length;
   const inShop = safeCars.filter(c => c.status === 'In Shop').length;

   const pctEnRoute = total > 0 ? (enRoute / total) * 100 : 0;
   const pctIdle = total > 0 ? (idle / total) * 100 : 0;
   const pctInShop = total > 0 ? (inShop / total) * 100 : 0;

   return (
      <div className="space-y-12 view-transition pb-24">
         {/* Fleet Overview Analytics */}
         <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-3 glass-obsidian p-10 rounded-[3.5rem] glow-blue relative overflow-hidden">
               <div className="flex justify-between items-center mb-10 relative z-10">
                  <h3 className="text-2xl font-luxury text-primary tracking-tighter uppercase italic">Asset Deployment Matrix</h3>
                  <div className="flex gap-6">
                     <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                        <span className="text-[10px] font-black text-secondary uppercase tracking-widest">Active</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
                        <span className="text-[10px] font-black text-secondary uppercase tracking-widest">Reserve</span>
                     </div>
                  </div>
               </div>

               <div className="w-full h-20 rounded-3xl overflow-hidden flex shadow-2xl bg-primary/5 p-2  relative z-10">
                  <motion.div
                     initial={{ width: 0 }} animate={{ width: `${pctEnRoute}%` }}
                     className="bg-gradient-to-r from-blue-600 to-blue-400 h-full rounded-2xl flex items-center justify-center text-primary font-black text-[10px] transition-all hover:brightness-110"
                  >
                     {pctEnRoute > 15 && `ACTIVE: ${enRoute}`}
                  </motion.div>
                  <motion.div
                     initial={{ width: 0 }} animate={{ width: `${pctIdle}%` }}
                     className="bg-gradient-to-r from-purple-600 to-purple-400 h-full flex items-center justify-center text-primary font-black text-[10px] transition-all hover:brightness-110 mx-1 rounded-lg"
                  >
                     {pctIdle > 15 && `RESERVE: ${idle}`}
                  </motion.div>
                  <motion.div
                     initial={{ width: 0 }} animate={{ width: `${pctInShop}%` }}
                     className="bg-gradient-to-r from-red-600 to-red-400 h-full rounded-2xl flex items-center justify-center text-primary font-black text-[10px] transition-all hover:brightness-110"
                  >
                     {pctInShop > 15 && `SHOP: ${inShop}`}
                  </motion.div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 relative z-10">
                  <div className="p-8 bg-primary/5 rounded-[2.5rem]  group hover:border-blue-500/30 transition-all">
                     <p className="text-[10px] font-black text-secondary uppercase tracking-widest mb-2">Fleet Valuation</p>
                     <h4 className="text-3xl font-luxury text-primary italic tracking-tight group-hover:text-blue-400 transition-colors">$14.2M</h4>
                  </div>
                  <div className="p-8 bg-primary/5 rounded-[2.5rem]  group hover:border-gold/30 transition-all">
                     <p className="text-[10px] font-black text-secondary uppercase tracking-widest mb-2">Fuel Efficiency</p>
                     <h4 className="text-3xl font-luxury text-gold italic tracking-tight group-hover:text-gold transition-colors">94% AVG</h4>
                  </div>
                  <div className="p-8 bg-primary/5 rounded-[2.5rem]  group hover:border-purple-500/30 transition-all">
                     <p className="text-[10px] font-black text-secondary uppercase tracking-widest mb-2">Carbon Offset</p>
                     <h4 className="text-3xl font-luxury text-purple-400 italic tracking-tight group-hover:text-purple-400 transition-colors">-12.5%</h4>
                  </div>
               </div>
               <Car size={300} className="absolute -right-20 -bottom-20 opacity-[0.02] text-primary" />
            </div>
         </div>

         {/* Asset Registry Search & Actions Terminal */}
         <div className="space-y-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 glass-obsidian p-10 rounded-[3rem]  glow-blue">
               <div className="relative w-full md:w-[450px] group">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-secondary group-focus-within:text-gold transition-colors" size={20} />
                  <input
                     type="text"
                     placeholder="Filter Asset Registry..."
                     className="w-full pl-16 pr-8 py-5 bg-primary/5  rounded-2xl text-sm text-primary focus:ring-1 focus:ring-gold outline-none transition-all placeholder-slate-600 font-bold uppercase tracking-widest"
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                  />
               </div>

               <div className="flex items-center gap-6 w-full md:w-auto">
                  <div className="hidden lg:flex bg-primary/5 p-1.5 rounded-2xl ">
                     {['all', 'En Route', 'Idle', 'In Shop'].map(status => (
                        <button
                           key={status}
                           onClick={() => setActiveFilter(status)}
                           className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeFilter === status ? 'bg-primary text-primary shadow-xl' : 'text-secondary hover:bg-primary/5'}`}
                        >
                           {status === 'En Route' ? 'Active' : status === 'all' ? 'All Assets' : status}
                        </button>
                     ))}
                  </div>
                  <button
                     onClick={() => setShowAddForm(true)}
                     className="flex-1 md:flex-none flex items-center justify-center gap-4 px-12 py-5 bg-gold text-obsidian font-black rounded-2xl hover:scale-[1.02] transition-all shadow-2xl shadow-gold/20 uppercase tracking-[0.2em] text-[10px]"
                  >
                     <Plus size={20} strokeWidth={3} /> Register Asset
                  </button>
               </div>
            </div>

            {/* In-Page Add Vehicle Form */}
            <AnimatePresence>
               {showAddForm && (
                  <motion.div
                     ref={formRef}
                     initial={{ opacity: 0, height: 0 }}
                     animate={{ opacity: 1, height: 'auto' }}
                     exit={{ opacity: 0, height: 0 }}
                     className="overflow-hidden"
                  >
                     <div className="glass-obsidian rounded-[3.5rem] shadow-2xl border border-gold/20 glow-gold mb-12">
                        <div className="p-12 border-b  flex justify-between items-center bg-primary/5">
                           <div>
                              <h3 className="text-3xl font-luxury text-primary tracking-tighter italic uppercase">Asset Registration</h3>
                              <p className="text-secondary font-bold uppercase tracking-widest text-[10px] mt-2">Initialize New Premium Asset Registry</p>
                           </div>
                           <button onClick={() => setShowAddForm(false)} className="w-14 h-14 flex items-center justify-center bg-primary/5 rounded-2xl text-secondary hover:text-primary transition-all ">
                              <X size={28} />
                           </button>
                        </div>

                        <div className="p-12">
                           {formSuccess ? (
                              <div className="flex flex-col items-center justify-center py-16 text-center animate-in fade-in zoom-in duration-500">
                                 <div className="w-24 h-24 bg-gold/10 text-gold rounded-[2.5rem] flex items-center justify-center mb-10 shadow-2xl shadow-gold/20 animate-bounce border border-gold/20">
                                    <Check size={52} />
                                 </div>
                                 <h3 className="text-3xl font-luxury text-primary uppercase italic tracking-tighter">Authorized</h3>
                                 <p className="text-secondary font-bold uppercase tracking-widest text-[10px] mt-4">Plate {plate} synchronized with central command.</p>
                              </div>
                           ) : (
                              <form onSubmit={handleAddCar} className="space-y-10">
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div className="space-y-8">
                                       <div className="space-y-2">
                                          <label className="text-[10px] font-black text-secondary uppercase tracking-[0.3em] ml-1">Asset ID / Plate</label>
                                          <div className="relative">
                                             <Hash className="absolute left-6 top-1/2 -translate-y-1/2 text-secondary" size={20} />
                                             <input
                                                required
                                                type="text"
                                                value={plate}
                                                onChange={(e) => setPlate(e.target.value.toUpperCase())}
                                                placeholder="e.g. ALPHA-01"
                                                className="w-full bg-primary/5  rounded-2xl pl-14 pr-6 py-6 text-sm focus:bg-primary/10 focus:border-gold outline-none transition-all font-black text-primary uppercase tracking-widest"
                                             />
                                          </div>
                                       </div>

                                       <div className="space-y-2">
                                          <label className="text-[10px] font-black text-secondary uppercase tracking-[0.3em] ml-1">Vehicle Specifications</label>
                                          <div className="relative">
                                             <Car className="absolute left-6 top-1/2 -translate-y-1/2 text-secondary" size={20} />
                                             <input
                                                required
                                                type="text"
                                                value={model}
                                                onChange={(e) => setModel(e.target.value)}
                                                placeholder="e.g. Bentley Bentayga Fleet"
                                                className="w-full bg-primary/5  rounded-2xl pl-14 pr-6 py-6 text-sm focus:bg-primary/10 focus:border-gold outline-none transition-all font-bold text-primary uppercase tracking-wider"
                                             />
                                          </div>
                                       </div>
                                    </div>

                                    <div className="space-y-8">
                                       <div className="grid grid-cols-2 gap-6">
                                          <div className="space-y-2">
                                             <label className="text-[10px] font-black text-secondary uppercase tracking-[0.3em] ml-1">Build Series</label>
                                             <select className="w-full bg-primary/5  rounded-2xl px-8 py-6 text-sm focus:bg-primary/10 focus:border-gold outline-none transition-all font-black text-primary appearance-none uppercase">
                                                <option>2024</option>
                                                <option>2023</option>
                                                <option>2022</option>
                                             </select>
                                          </div>
                                          <div className="space-y-2">
                                             <label className="text-[10px] font-black text-secondary uppercase tracking-[0.3em] ml-1">Priority Class</label>
                                             <select className="w-full bg-primary/5  rounded-2xl px-8 py-6 text-sm focus:bg-primary/10 focus:border-gold outline-none transition-all font-black text-primary appearance-none uppercase">
                                                <option>Executive</option>
                                                <option>Logistics</option>
                                                <option>Express</option>
                                             </select>
                                          </div>
                                       </div>

                                       <div className="pt-2">
                                          <button
                                             type="submit"
                                             className="w-full py-6 bg-gold text-obsidian font-black rounded-3xl transition-all shadow-2xl shadow-gold/20 hover:scale-[1.02] active:scale-[0.98] uppercase tracking-[0.3em] text-xs"
                                          >
                                             Initialize Asset Registry
                                          </button>
                                       </div>
                                    </div>
                                 </div>
                              </form>
                           )}
                        </div>
                     </div>
                  </motion.div>
               )}
            </AnimatePresence>

            {/* Asset Registry Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
               <AnimatePresence mode="popLayout">
                  {filteredCars.map((car) => (
                     <motion.div
                        key={car.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        whileHover={{ y: -12, scale: 1.02 }}
                        onClick={() => onSelectCar(car)}
                        className="group cursor-pointer"
                     >
                        <HolographicCard glowColor={car.status === 'En Route' ? 'blue' : car.status === 'Idle' ? 'purple' : 'red'} className="p-10 rounded-[3.5rem]">
                           <div className="flex justify-between items-start mb-10">
                              <div className="flex items-center gap-6">
                                 <div className="w-20 h-20 bg-primary/5 rounded-[2rem]  overflow-hidden relative group-hover:border-gold/30 transition-all duration-500 shadow-inner">
                                    <img src={car.image} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" alt={car.model} />
                                    <div className={`absolute bottom-2 right-2 w-5 h-5 rounded-full border-4 border-obsidian shadow-lg ${car.status === 'En Route' ? 'bg-blue-500' : car.status === 'Idle' ? 'bg-purple-500' : 'bg-red-500'}`}></div>
                                 </div>
                                 <div>
                                    <h4 className="text-2xl font-luxury text-primary tracking-tighter italic uppercase group-hover:text-gold transition-colors">{car.id}</h4>
                                    <p className="text-[10px] text-secondary font-black uppercase tracking-widest mt-1.5 opacity-60">{car.model}</p>
                                 </div>
                              </div>
                              <button className="w-12 h-12 bg-primary/5 text-secondary hover:text-primary rounded-2xl transition-all  flex items-center justify-center">
                                 <MoreHorizontal size={24} />
                              </button>
                           </div>

                           <div className="grid grid-cols-2 gap-6 mb-10">
                              <div className="bg-primary/5 rounded-3xl p-6  group-hover: transition-colors">
                                 <p className="text-[10px] text-secondary font-black uppercase tracking-widest mb-3 flex items-center gap-2"><Fuel size={14} className="text-gold" /> Energy Sync</p>
                                 <div className="flex items-end gap-3">
                                    <p className="text-2xl font-luxury text-primary tracking-tighter italic">{car.fuelLevel}%</p>
                                    <div className="flex-1 h-1.5 bg-primary/5 rounded-full mb-2 overflow-hidden  p-px">
                                       <motion.div initial={{ width: 0 }} animate={{ width: `${car.fuelLevel}%` }} className={`h-full rounded-full ${car.fuelLevel > 20 ? 'bg-gold shadow-[0_0_10px_#d4af37]' : 'bg-red-500 shadow-[0_0_10px_#ef4444]'}`} />
                                    </div>
                                 </div>
                              </div>
                              <div className="bg-primary/5 rounded-3xl p-6  group-hover: transition-colors">
                                 <p className="text-[10px] text-secondary font-black uppercase tracking-widest mb-3 flex items-center gap-2"><Activity size={14} className="text-blue-500" /> Traversal</p>
                                 <p className="text-2xl font-luxury text-primary tracking-tighter italic">{car.odometer}</p>
                              </div>
                           </div>

                           <div className="space-y-5 mb-10">
                              <div className="flex items-center gap-5 text-xs text-slate-400 font-medium">
                                 <div className="w-10 h-10 bg-primary/5 rounded-2xl flex items-center justify-center text-secondary ">
                                    <User size={18} />
                                 </div>
                                 <span className="font-black uppercase tracking-widest text-[11px] text-secondary group-hover:text-primary transition-colors">{car.driver}</span>
                              </div>
                              <div className="flex items-center gap-5 text-xs text-slate-400 font-medium">
                                 <div className="w-10 h-10 bg-primary/5 rounded-2xl flex items-center justify-center text-secondary ">
                                    <Calendar size={18} />
                                 </div>
                                 <span className="font-black uppercase tracking-widest text-[11px] text-secondary group-hover:text-primary transition-colors">Series {car.year} // VIN {car.vin?.slice(-6)}</span>
                              </div>
                           </div>

                           <div className="pt-10 border-t border-[var(--border-primary)]  flex justify-between items-center">
                              <span className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] border ${car.status === 'En Route' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20 glow-blue' :
                                    car.status === 'Idle' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20 glow-purple' :
                                       'bg-red-500/10 text-red-400 border-red-500/20 glow-red'
                                 }`}>
                                 {car.status === 'En Route' ? 'Active Mission' : car.status}
                              </span>
                              <div className="text-gold text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3 group-hover:translate-x-1 transition-transform">
                                 Diagnostics <ChevronRight size={16} />
                              </div>
                           </div>
                        </HolographicCard>
                     </motion.div>
                  ))}
               </AnimatePresence>
            </div>
         </div>
      </div>
   );
}
