import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, MoreVertical, Phone, Mail, Award, X, Check, Camera, Star, Zap, ArrowRight } from 'lucide-react';

export default function DriversView({ drivers, setDrivers, onSelectDriver, addLog }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const filteredDrivers = (drivers || []).filter(d =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddDriver = (e) => {
    e.preventDefault();
    const newDriver = {
       id: drivers.length + 1,
       name: name,
       role: 'Senior Driver',
       email: email,
       phone: '+1 (555) 000-0000',
       rating: '4.9',
       tripsThisWeek: 0,
       onTimeRate: 100,
       avatar: `https://i.pravatar.cc/150?u=${name}`,
       activeRouteId: null,
       currentLocation: [34.0522, -118.2437]
    };

    setFormSuccess(true);
    setTimeout(() => {
      setDrivers([newDriver, ...drivers]);
      addLog('Admin', `onboarded new operator ${name}`, name, 'status');
      setFormSuccess(false);
      setShowAddForm(false);
      setName('');
      setEmail('');
    }, 1500);
  };

  return (
    <div className="space-y-10 view-transition pb-20 relative">
      {/* Search & Actions Terminal */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 glass-obsidian p-8 rounded-[2.5rem] border-white/5 glow-blue">
        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-gold transition-colors" size={20} />
          <input
            type="text"
            placeholder="Search Personnel Registry..."
            className="w-full pl-14 pr-6 py-4 bg-white/[0.03] border border-white/10 rounded-2xl text-sm text-white focus:ring-1 focus:ring-gold outline-none transition-all placeholder-slate-600 font-bold uppercase tracking-widest"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <button className="flex items-center gap-2 px-6 py-4 bg-white/[0.03] border border-white/10 text-slate-400 font-black rounded-2xl hover:bg-white/5 hover:text-white transition-all uppercase tracking-widest text-[10px]">
            <Filter size={16} />
            Filter Intelligence
          </button>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex-1 md:flex-none flex items-center justify-center gap-3 px-10 py-4 bg-gold text-obsidian font-black rounded-2xl hover:scale-[1.02] transition-all shadow-xl shadow-gold/10 uppercase tracking-[0.2em] text-[10px]"
          >
            <Plus size={18} />
            Onboard Operator
          </button>
        </div>
      </div>

      {/* Personnel Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredDrivers.map((driver) => (
          <motion.div
            key={driver.id}
            whileHover={{ y: -10 }}
            className="glass-obsidian rounded-[3rem] p-8 border-white/5 shadow-2xl hover:border-gold/30 transition-all cursor-pointer group relative overflow-hidden flex flex-col glow-blue"
            onClick={() => onSelectDriver(driver)}
          >
            <div className="flex justify-between items-start mb-8 relative z-10">
              <div className="flex items-center gap-5">
                <div className="relative">
                  <img src={driver.avatar} alt={driver.name} className="w-20 h-20 rounded-[2rem] object-cover ring-2 ring-white/10 group-hover:ring-gold/50 transition-all duration-500" />
                  <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-4 border-obsidian ${driver.activeRouteId ? 'bg-emerald-500 glow-emerald' : 'bg-slate-700'}`}></div>
                </div>
                <div>
                  <h4 className="text-xl font-luxury text-white tracking-tighter italic uppercase group-hover:text-gold transition-colors">{driver.name}</h4>
                  <p className="text-[10px] text-gold/60 font-black uppercase tracking-widest mt-1 opacity-80">{driver.role}</p>
                </div>
              </div>
              <button className="p-3 bg-white/[0.03] text-slate-500 hover:text-white rounded-2xl transition-all border border-white/5">
                <MoreVertical size={20} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8 relative z-10">
              <div className="bg-white/[0.02] rounded-2xl p-4 border border-white/5">
                <p className="text-[10px] text-slate-600 font-black uppercase tracking-widest mb-1">Weekly Ops</p>
                <p className="text-xl font-luxury text-white tracking-tighter">{driver.tripsThisWeek}</p>
              </div>
              <div className="bg-white/[0.02] rounded-2xl p-4 border border-white/5">
                <p className="text-[10px] text-slate-600 font-black uppercase tracking-widest mb-1">Precision</p>
                <p className="text-xl font-luxury text-white tracking-tighter">{driver.onTimeRate}%</p>
              </div>
            </div>

            <div className="space-y-4 mb-8 relative z-10">
              <div className="flex items-center gap-4 text-xs text-slate-400 font-medium">
                <div className="w-8 h-8 bg-white/5 rounded-xl flex items-center justify-center text-slate-600">
                  <Mail size={16} />
                </div>
                <span className="truncate">{driver.email}</span>
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-400 font-medium">
                <div className="w-8 h-8 bg-white/5 rounded-xl flex items-center justify-center text-slate-600">
                  <Phone size={16} />
                </div>
                <span>{driver.phone}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-gold/10 rounded-xl flex items-center justify-center text-gold">
                  <Star size={16} fill="currentColor" />
                </div>
                <span className="font-black text-white text-[10px] uppercase tracking-widest">{driver.rating} Performance Quotient</span>
              </div>
            </div>

            <div className="mt-auto pt-8 border-t border-white/5 flex justify-between items-center relative z-10">
              <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-xl ${driver.activeRouteId ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-slate-500/10 text-slate-500 border border-white/10'
                }`}>
                {driver.activeRouteId ? 'Live Mission' : 'Idle State'}
              </span>
              <button className="text-gold text-[10px] font-black uppercase tracking-widest hover:underline flex items-center gap-2">
                Executive Profile <ArrowRight size={14} />
              </button>
            </div>

            {/* Decorative BG Icon */}
            <Zap size={140} className="absolute -right-12 -bottom-12 opacity-[0.02] text-gold group-hover:scale-125 group-hover:opacity-[0.04] transition-all duration-700" />
          </motion.div>
        ))}
      </div>

      {/* Onboarding Interface Overlay */}
      {showAddForm && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-6 bg-obsidian/80 backdrop-blur-xl animate-in fade-in duration-500">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-obsidian w-full max-w-2xl rounded-[3.5rem] shadow-2xl overflow-hidden border-white/10 glow-gold"
          >
            <div className="p-12 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
               <div>
                <h3 className="text-3xl font-luxury text-white tracking-tighter italic uppercase">Personnel Onboarding</h3>
                <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-2">Initialize New Operator Intelligence</p>
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
                  <h4 className="text-3xl font-luxury text-white uppercase italic tracking-tighter">Registration Confirmed</h4>
                  <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-4">Security clearance granted. Digital identity generated.</p>
                </div>
              ) : (
                <form onSubmit={handleAddDriver} className="space-y-8">
                  <div className="flex flex-col md:flex-row gap-10">
                    <div className="flex flex-col items-center gap-6">
                      <div className="w-32 h-32 rounded-[2.5rem] bg-white/[0.03] border-2 border-dashed border-white/10 flex flex-col items-center justify-center text-slate-600 hover:bg-white/5 hover:border-gold/50 cursor-pointer transition-all group p-4 text-center">
                        <Camera size={32} className="group-hover:text-gold transition-colors mb-2" />
                        <span className="text-[9px] font-black uppercase tracking-widest">Biometric Photo</span>
                      </div>
                    </div>

                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] ml-1">Identity Name</label>
                        <input 
                           required 
                           type="text" 
                           placeholder="Full Name" 
                           value={name}
                           onChange={(e) => setName(e.target.value)}
                           className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 text-sm focus:bg-white/10 focus:border-gold outline-none transition-all font-black text-white uppercase tracking-widest" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] ml-1">Designated Role</label>
                        <select className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 text-sm focus:bg-white/10 focus:border-gold outline-none transition-all font-black text-white appearance-none uppercase tracking-widest">
                          <option>Senior Driver</option>
                          <option>Route Specialist</option>
                          <option>Tactical Lead</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] ml-1">Secure Email</label>
                        <input 
                           required 
                           type="email" 
                           placeholder="Email Address" 
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 text-sm focus:bg-white/10 focus:border-gold outline-none transition-all font-bold text-white tracking-wider" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] ml-1">Comms Line</label>
                        <input required type="tel" placeholder="Phone Number" className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 text-sm focus:bg-white/10 focus:border-gold outline-none transition-all font-bold text-white tracking-wider" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] ml-1">Licensure ID</label>
                      <input required type="text" placeholder="DL-XXXXX" className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 text-sm focus:bg-white/10 focus:border-gold outline-none transition-all font-black text-white uppercase tracking-widest" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] ml-1">Entry Date</label>
                      <input type="date" className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 text-xs font-black text-white uppercase" />
                    </div>
                  </div>

                  <div className="pt-10">
                    <button type="submit" className="w-full py-6 bg-gold text-obsidian font-black rounded-3xl transition-all shadow-2xl shadow-gold/20 hover:scale-[1.02] active:scale-[0.98] uppercase tracking-[0.3em] text-xs">
                      Activate Operator
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
