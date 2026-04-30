import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Battery, Fuel, ChevronRight, Plus, X, Check, Car, Hash, Calendar, ShieldCheck, Zap, MoreHorizontal, Activity, Search } from 'lucide-react';

export default function FleetDetailsView({ cars, setCars, onSelectCar, addLog }) {
   const [showAddForm, setShowAddForm] = useState(false);
   const [formSuccess, setFormSuccess] = useState(false);
   const [searchTerm, setSearchTerm] = useState('');
   const [activeFilter, setActiveFilter] = useState('all');
   
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

   const total = cars.length;
   const enRoute = cars.filter(c => c.status === 'En Route').length;
   const idle = cars.filter(c => c.status === 'Idle').length;
   const inShop = cars.filter(c => c.status === 'In Shop').length;

   const pctEnRoute = (enRoute / total) * 100;
   const pctIdle = (idle / total) * 100;
   const pctInShop = (inShop / total) * 100;

   return (
      <div className="space-y-10 view-transition pb-20">
         {/* Fleet Overview Analytics */}
         <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-2 glass-obsidian p-10 rounded-[3rem] glow-blue relative overflow-hidden">
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

               <div className="w-full h-20 rounded-3xl overflow-hidden flex shadow-2xl bg-white/[0.02] p-2 border border-white/5 relative z-10">
                  <motion.div
                     initial={{ width: 0 }} animate={{ width: `${pctEnRoute}%` }}
                     className="bg-gradient-to-r from-blue-600 to-blue-400 h-full rounded-2xl flex items-center justify-center text-white font-black text-[10px] transition-all hover:brightness-110"
                  >
                     {pctEnRoute > 15 && `ACTIVE: ${enRoute}`}
                  </motion.div>
                  <motion.div
                     initial={{ width: 0 }} animate={{ width: `${pctIdle}%` }}
                     className="bg-gradient-to-r from-purple-600 to-purple-400 h-full flex items-center justify-center text-white font-black text-[10px] transition-all hover:brightness-110 mx-1 rounded-lg"
                  >
                     {pctIdle > 15 && `RESERVE: ${idle}`}
                  </motion.div>
                  <motion.div
                     initial={{ width: 0 }} animate={{ width: `${pctInShop}%` }}
                     className="bg-gradient-to-r from-red-600 to-red-400 h-full rounded-2xl flex items-center justify-center text-white font-black text-[10px] transition-all hover:brightness-110"
                  >
                     {pctInShop > 15 && `SHOP: ${inShop}`}
                  </motion.div>
               </div>

               <div className="grid grid-cols-3 gap-8 mt-12 relative z-10">
                  <div className="p-6 bg-white/[0.02] rounded-[2rem] border border-white/5 group hover:border-blue-500/30 transition-all">
                     <p className="text-[10px] font-black text-secondary uppercase tracking-widest mb-2">Fleet Valuation</p>
                     <h4 className="text-2xl font-luxury text-primary italic tracking-tight group-hover:text-blue-400 transition-colors">$14.2M</h4>
                  </div>
                  <div className="p-6 bg-white/[0.02] rounded-[2rem] border border-white/5 group hover:border-gold/30 transition-all">
                     <p className="text-[10px] font-black text-secondary uppercase tracking-widest mb-2">Fuel Efficiency</p>
                     <h4 className="text-2xl font-luxury text-gold italic tracking-tight group-hover:text-gold transition-colors">94% AVG</h4>
                  </div>
                  <div className="p-6 bg-white/[0.02] rounded-[2rem] border border-white/5 group hover:border-purple-500/30 transition-all">
                     <p className="text-[10px] font-black text-secondary uppercase tracking-widest mb-2">Carbon Offset</p>
                     <h4 className="text-2xl font-luxury text-purple-400 italic tracking-tight group-hover:text-purple-400 transition-colors">-12.5%</h4>
                  </div>
               </div>
               <Car size={300} className="absolute -right-20 -bottom-20 opacity-[0.02] text-white" />
            </div>

            <div className="glass-obsidian p-10 rounded-[3rem] flex flex-col justify-between glow-gold relative overflow-hidden">
               <div className="relative z-10">
                  <Zap className="text-gold mb-6" size={32} />
                  <h3 className="text-3xl font-luxury text-primary leading-tight">EXPAND<br />THE FLEET</h3>
                  <p className="text-secondary text-sm font-medium mt-4 leading-relaxed">Add a new premium asset to the global deployment registry.</p>
               </div>
               <button
                  onClick={() => setShowAddForm(true)}
                  className="w-full py-5 bg-gold text-obsidian font-black rounded-2xl shadow-xl shadow-gold/20 hover:scale-[1.02] transition-all uppercase tracking-widest text-xs mt-10 relative z-10"
               >
                  Register New Asset
               </button>
               <Activity className="absolute -right-8 -bottom-8 opacity-5 text-gold" size={200} />
            </div>
         </div>

         {/* Asset Ledger Terminal */}
         <div className="glass-obsidian rounded-[3rem] shadow-2xl border border-white/5 overflow-hidden glow-blue">
            <div className="p-10 border-b border-white/5 flex flex-col lg:flex-row justify-between items-start lg:items-center bg-white/[0.01] gap-6">
               <div>
                  <h3 className="text-2xl font-luxury text-primary tracking-tighter italic uppercase">GLOBAL ASSET LEDGER</h3>
                  <p className="text-secondary text-[10px] font-black uppercase tracking-[0.2em] mt-1">Operational Capacity: 98.2%</p>
               </div>
               
               <div className="flex flex-wrap items-center gap-6 w-full lg:w-auto">
                  <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
                     {['all', 'En Route', 'Idle', 'In Shop'].map(status => (
                        <button 
                           key={status}
                           onClick={() => setActiveFilter(status)}
                           className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${activeFilter === status ? 'bg-primary text-white shadow-lg' : 'text-secondary hover:bg-white/5'}`}
                        >
                           {status === 'En Route' ? 'Active' : status === 'all' ? 'All Assets' : status}
                        </button>
                     ))}
                  </div>

                  <div className="relative flex-1 lg:flex-none">
                     <Search size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600" />
                     <input 
                        type="text" 
                        placeholder="Filter by Plate/Model..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-12 pr-6 py-3.5 bg-white/[0.03] border border-white/10 rounded-2xl text-[10px] font-black text-white focus:ring-1 focus:ring-gold outline-none transition-all w-full lg:w-64 uppercase tracking-widest" 
                     />
                  </div>
               </div>
            </div>

            <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                  <thead>
                     <tr className="bg-white/[0.01] text-secondary text-[10px] font-black uppercase tracking-[0.2em] border-b border-white/5">
                        <th className="p-8 pl-12">Registry ID</th>
                        <th className="p-8">Asset Profile</th>
                        <th className="p-8">Controller</th>
                        <th className="p-8">Health Telemetry</th>
                        <th className="p-8 text-right pr-12">Deployment Status</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-secondary text-sm">
                     <AnimatePresence mode="popLayout">
                        {filteredCars.map((car, idx) => (
                           <motion.tr
                              key={car.id}
                              layout
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              onClick={() => onSelectCar(car)}
                              className="hover:bg-white/[0.03] cursor-pointer transition-all group"
                           >
                              <td className="p-8 pl-12">
                                 <span className="font-luxury text-primary tracking-tighter text-xl group-hover:text-gold transition-colors italic">{car.id}</span>
                              </td>
                              <td className="p-8">
                                 <div className="flex items-center gap-5">
                                    <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-slate-500 group-hover:bg-gold/10 group-hover:text-gold transition-all duration-500 border border-white/5 shadow-inner overflow-hidden">
                                       <img src={car.image} className="w-full h-full object-cover opacity-60" />
                                    </div>
                                    <div>
                                       <p className="font-black text-primary uppercase tracking-wider text-xs">{car.model}</p>
                                       <p className="text-[9px] text-secondary font-black uppercase tracking-widest mt-1">Series {car.year} // VIN {car.vin?.slice(-6)}</p>
                                    </div>
                                 </div>
                              </td>
                              <td className="p-8">
                                 <div className="flex items-center gap-4">
                                    <img src={`https://i.pravatar.cc/150?u=${car.driver}`} className="w-10 h-10 rounded-xl grayscale group-hover:grayscale-0 group-hover:ring-2 group-hover:ring-gold/30 transition-all duration-500 border border-white/10" alt="driver" />
                                    <span className="font-black text-secondary group-hover:text-primary transition-colors uppercase tracking-widest text-[10px]">{car.driver}</span>
                                 </div>
                              </td>
                              <td className="p-8">
                                 <div className="flex flex-col gap-3 max-w-[200px]">
                                    <div className="flex justify-between items-center px-1">
                                       <span className="text-[9px] font-black text-secondary uppercase tracking-widest">Energy Sync</span>
                                       <span className={`text-[9px] font-black uppercase ${car.fuelLevel > 20 ? 'text-gold' : 'text-red-500'}`}>{car.fuelLevel}%</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                       <motion.div
                                          initial={{ width: 0 }} animate={{ width: `${car.fuelLevel}%` }}
                                          className={`h-full rounded-full transition-all duration-1000 ${car.fuelLevel > 20 ? 'bg-gold shadow-[0_0_10px_#d4af37]' : 'bg-red-500 shadow-[0_0_10px_#ef4444]'}`}
                                       ></motion.div>
                                    </div>
                                    <div className="flex justify-between items-center px-1">
                                       <span className="text-[8px] font-black text-secondary uppercase tracking-widest italic">{car.odometer} Traversed</span>
                                       <Activity size={10} className="text-secondary opacity-30" />
                                    </div>
                                 </div>
                              </td>
                              <td className="p-8 pr-12 text-right">
                                 <span className={`inline-flex items-center px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] border ${car.status === 'En Route' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20 glow-blue' :
                                       car.status === 'Idle' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20 glow-purple' :
                                          'bg-red-500/10 text-red-400 border-red-500/20 glow-red'
                                    }`}>
                                    {car.status === 'En Route' ? 'Active Mission' : car.status}
                                 </span>
                              </td>
                           </motion.tr>
                        ))}
                     </AnimatePresence>
                  </tbody>
               </table>
            </div>
         </div>

         {/* ADD VEHICLE MODAL - LUXURY OVERLAY */}
         {showAddForm && (
            <div className="fixed inset-0 z-[300] flex items-center justify-center p-6 bg-obsidian/80 backdrop-blur-xl animate-in fade-in duration-500">
               <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="glass-obsidian w-full max-w-xl rounded-[3.5rem] shadow-2xl overflow-hidden border-white/10 glow-gold"
               >
                  <div className="p-12 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                     <div>
                        <h3 className="text-3xl font-luxury text-white tracking-tighter italic uppercase">Registry Interface</h3>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-2">New Asset Authorization Required</p>
                     </div>
                     <button onClick={() => setShowAddForm(false)} className="w-14 h-14 flex items-center justify-center bg-white/5 rounded-2xl text-slate-500 hover:text-white transition-all border border-white/5">
                        <X size={28} />
                     </button>
                  </div>

                  <div className="p-12">
                     {formSuccess ? (
                        <div className="flex flex-col items-center justify-center py-16 text-center animate-in fade-in zoom-in duration-500">
                           <div className="w-24 h-24 bg-gold/10 text-gold rounded-[2.5rem] flex items-center justify-center mb-10 shadow-2xl shadow-gold/20 animate-bounce border border-gold/20">
                              <Check size={52} />
                           </div>
                           <h3 className="text-3xl font-luxury text-white uppercase italic tracking-tighter">Authorized</h3>
                           <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-4">Plate {plate} synchronized with central command.</p>
                        </div>
                     ) : (
                        <form onSubmit={handleAddCar} className="space-y-10">
                           <div className="space-y-8">
                              <div className="space-y-2">
                                 <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] ml-1">Asset ID / Plate</label>
                                 <div className="relative">
                                    <Hash className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-700" size={20} />
                                    <input
                                       required
                                       type="text"
                                       value={plate}
                                       onChange={(e) => setPlate(e.target.value.toUpperCase())}
                                       placeholder="e.g. ALPHA-01"
                                       className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-14 pr-6 py-6 text-sm focus:bg-white/10 focus:border-gold outline-none transition-all font-black text-white uppercase tracking-widest"
                                    />
                                 </div>
                              </div>

                              <div className="space-y-2">
                                 <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] ml-1">Vehicle Specifications</label>
                                 <div className="relative">
                                    <Car className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-700" size={20} />
                                    <input
                                       required
                                       type="text"
                                       value={model}
                                       onChange={(e) => setModel(e.target.value)}
                                       placeholder="e.g. Bentley Bentayga Fleet"
                                       className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-14 pr-6 py-6 text-sm focus:bg-white/10 focus:border-gold outline-none transition-all font-bold text-white uppercase tracking-wider"
                                    />
                                 </div>
                              </div>

                              <div className="grid grid-cols-2 gap-6">
                                 <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] ml-1">Build Series</label>
                                    <select className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-8 py-6 text-sm focus:bg-white/10 focus:border-gold outline-none transition-all font-black text-white appearance-none">
                                       <option>2024</option>
                                       <option>2023</option>
                                       <option>2022</option>
                                    </select>
                                 </div>
                                 <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] ml-1">Priority Class</label>
                                    <select className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-8 py-6 text-sm focus:bg-white/10 focus:border-gold outline-none transition-all font-black text-white appearance-none">
                                       <option>Executive</option>
                                       <option>Logistics</option>
                                       <option>Express</option>
                                    </select>
                                 </div>
                              </div>
                           </div>

                           <div className="pt-6">
                              <button
                                 type="submit"
                                 className="w-full py-6 bg-gold text-obsidian font-black rounded-3xl transition-all shadow-2xl shadow-gold/20 hover:scale-[1.02] active:scale-[0.98] uppercase tracking-[0.3em] text-xs"
                              >
                                 Initialize Asset
                              </button>
                           </div>
                        </form>
                     )}
                  </div>
               </motion.div>
            </div>
         )}
      </div>
   );
}
