import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
   Navigation, Clock, MapPin, Calendar,
   Download, Plus, X, Check, Search, Car, User,
   ArrowLeft, Zap, Play, Pause, RotateCcw, Trash2, ExternalLink, Activity, ChevronRight, Target, ShieldCheck, Map as MapIcon,
   Compass, Layers, Globe, Filter, MoreHorizontal, AlertCircle
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMapEvents, Polyline, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import HolographicCard from '../ui/HolographicCard';

// Tactical Map Marker Components
const createTacticalIcon = (color, size = 32) => L.divIcon({
   className: 'tactical-icon',
   html: `<div class="relative flex items-center justify-center">
            <div class="absolute w-full h-full rounded-full bg-${color}-500/20 animate-ping"></div>
            <div class="relative w-${size/4} h-${size/4} bg-${color}-500 rounded-full border-4 border-white shadow-[0_0_20px_rgba(var(--${color}-rgb),0.5)] flex items-center justify-center">
               <div class="w-1.5 h-1.5 bg-obsidian rounded-full"></div>
            </div>
          </div>`,
   iconSize: [size, size],
   iconAnchor: [size/2, size/2]
});

function LocationSelector({ points, setPoints }) {
   useMapEvents({
      click(e) {
         if (points.length < 2) {
            setPoints([...points, [e.latlng.lat, e.latlng.lng]]);
         }
      },
   });
   return null;
}

function MapResizer() {
   const map = useMap();
   useEffect(() => {
      const timers = [100, 500, 1000, 2000].map(d => setTimeout(() => map.invalidateSize(), d));
      return () => timers.forEach(t => clearTimeout(t));
   }, [map]);
   return null;
}

export default function TripsView({ mapTheme, trips, setTrips, cars, setCars, drivers, addLog, onSelectCar, autoOpenForm, setAutoOpenForm }) {
   const [showAddForm, setShowAddForm] = useState(false);
   const [selectedTrip, setSelectedTrip] = useState(null);
   const [formSuccess, setFormSuccess] = useState(false);
   const [points, setPoints] = useState([]);
   const [routePath, setRoutePath] = useState([]);
   const [filterStatus, setFilterStatus] = useState('All');

   // Playback State
   const [isPlaying, setIsPlaying] = useState(false);
   const [playbackProgress, setPlaybackProgress] = useState(0);

   // Form State
   const [missionName, setMissionName] = useState('');
   const [selectedDriver, setSelectedDriver] = useState(drivers[0]?.name || '');
   const [selectedCar, setSelectedCar] = useState(cars.find(c => c.status === 'Idle')?.id || cars[0]?.id || '');

   useEffect(() => {
      if (autoOpenForm) {
         setShowAddForm(true);
         setAutoOpenForm(false);
      }
   }, [autoOpenForm, setAutoOpenForm]);

   // Fetch Route Logic (OSRM)
   useEffect(() => {
      if (points.length === 2) {
         const fetchRoute = async () => {
            try {
               const response = await fetch(`https://router.project-osrm.org/route/v1/driving/${points[0][1]},${points[0][0]};${points[1][1]},${points[1][0]}?overview=full&geometries=geojson`);
               const data = await response.json();
               if (data.routes?.[0]) {
                  setRoutePath(data.routes[0].geometry.coordinates.map(c => [c[1], c[0]]));
               }
            } catch (e) { setRoutePath(points); }
         };
         fetchRoute();
      } else setRoutePath([]);
   }, [points]);

   // Playback Engine
   useEffect(() => {
      let interval;
      if (isPlaying && selectedTrip) {
         interval = setInterval(() => {
            setPlaybackProgress(p => p >= 100 ? (setIsPlaying(false), 100) : p + 0.5);
         }, 50);
      }
      return () => clearInterval(interval);
   }, [isPlaying, selectedTrip]);

   const filteredTrips = useMemo(() => 
      filterStatus === 'All' ? trips : trips.filter(t => t.status === filterStatus),
   [trips, filterStatus]);

   const handleAddTrip = (e) => {
      e.preventDefault();
      const newTrip = {
         id: Date.now(),
         name: missionName || `MISSION-${Math.floor(1000 + Math.random() * 9000)}`,
         distance: "14.2 mi",
         eta: "42 mins",
         progress: 0,
         status: "On Time",
         carId: selectedCar,
         driver: selectedDriver,
         startTime: new Date().toLocaleString(),
         path: routePath.length > 0 ? routePath : points
      };

      setFormSuccess(true);
      setTimeout(() => {
         setTrips([newTrip, ...trips]);
         setCars(prev => prev.map(c => c.id === selectedCar ? { ...c, status: 'En Route', driver: selectedDriver, activeRoute: newTrip } : c));
         addLog(selectedDriver, `initialized mission ${newTrip.name}`, selectedCar, 'status');
         setFormSuccess(false);
         setShowAddForm(false);
         setPoints([]);
         setMissionName('');
      }, 2000);
   };

   return (
      <div className="space-y-12 view-transition pb-24">
         {/* Strategic Command Header */}
         <div className="glass-obsidian rounded-[3.5rem] p-12 border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold/5 to-transparent"></div>
            <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
               <div className="space-y-4">
                  <div className="flex items-center gap-3">
                     <div className="px-4 py-1.5 bg-gold/10 text-gold rounded-full text-[10px] font-black uppercase tracking-[0.3em] border border-gold/20">
                        Operational Command
                     </div>
                     <div className="flex items-center gap-2 text-[10px] text-emerald-500 font-bold uppercase tracking-widest">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div> Live Synchronized
                     </div>
                  </div>
                  <h2 className="text-6xl font-luxury text-primary tracking-tighter uppercase italic">Mission <span className="text-gradient-gold">Control</span></h2>
                  <p className="text-secondary font-bold uppercase tracking-[0.2em] text-xs max-w-xl leading-relaxed">
                     Global asset deployment terminal. Manage high-priority mission lifecycles, tactical routing, and real-time fleet telemetry.
                  </p>
               </div>
               
               <div className="flex flex-wrap gap-4">
                  <div className="flex items-center p-2 bg-white/[0.03] border border-white/5 rounded-2xl">
                     {['All', 'On Time', 'Delayed', 'Aborted'].map(status => (
                        <button 
                           key={status}
                           onClick={() => setFilterStatus(status)}
                           className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filterStatus === status ? 'bg-gold text-obsidian shadow-lg shadow-gold/20' : 'text-secondary hover:text-primary'}`}
                        >
                           {status}
                        </button>
                     ))}
                  </div>
                  <button onClick={() => setShowAddForm(true)} className="flex items-center gap-4 px-10 py-5 bg-gold text-obsidian font-black rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-2xl shadow-gold/10 uppercase tracking-[0.2em] text-[10px]">
                     <Plus size={20} strokeWidth={3} /> Initialize Mission
                  </button>
               </div>
            </div>
         </div>

         {/* Mission Grid */}
         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
            {filteredTrips.map((trip) => (
               <motion.div
                  key={trip.id}
                  layoutId={trip.id}
                  onClick={() => setSelectedTrip(trip)}
                  whileHover={{ y: -12, scale: 1.02 }}
                  className="group relative"
               >
                  <HolographicCard glowColor={trip.status === 'Aborted' ? 'red' : trip.status === 'Delayed' ? 'gold' : 'blue'} className="p-10 rounded-[3.5rem] cursor-pointer">
                     <div className="scan-line group-hover:opacity-100 opacity-0 transition-opacity"></div>
                     
                     <div className="flex justify-between items-start mb-10">
                        <div className="flex items-center gap-6">
                           <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center border transition-all duration-500 ${trip.status === 'Aborted' ? 'bg-red-500/10 text-red-400 border-red-500/20 group-hover:bg-red-500 group-hover:text-white' : 'bg-blue-500/10 text-blue-400 border-blue-500/20 group-hover:bg-blue-600 group-hover:text-white'}`}>
                              <Navigation size={32} strokeWidth={1.5} />
                           </div>
                           <div>
                              <h4 className="text-2xl font-luxury text-primary tracking-tighter uppercase italic group-hover:text-gold transition-colors">{trip.name}</h4>
                              <p className="text-[10px] text-secondary font-black uppercase tracking-[0.3em] mt-1.5 opacity-60">ID: {trip.carId}</p>
                           </div>
                        </div>
                        <div className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border ${trip.status === 'On Time' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : trip.status === 'Aborted' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>
                           {trip.status}
                        </div>
                     </div>

                     <div className="space-y-8 mb-10">
                        <div className="grid grid-cols-2 gap-4">
                           <div className="bg-white/[0.02] border border-white/5 p-5 rounded-2xl space-y-2 group-hover:border-white/10 transition-colors">
                              <span className="text-[9px] font-black text-secondary uppercase tracking-widest flex items-center gap-2"><MapPin size={12} className="text-blue-500" /> Distance</span>
                              <p className="text-lg font-black text-primary">{trip.distance}</p>
                           </div>
                           <div className="bg-white/[0.02] border border-white/5 p-5 rounded-2xl space-y-2 group-hover:border-white/10 transition-colors">
                              <span className="text-[9px] font-black text-secondary uppercase tracking-widest flex items-center gap-2"><Clock size={12} className="text-amber-500" /> Est. Time</span>
                              <p className="text-lg font-black text-primary">{trip.eta}</p>
                           </div>
                        </div>

                        <div className="space-y-3 px-1">
                           <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em]">
                              <span className="text-secondary">Tactical Progress</span>
                              <span className="text-gold">{trip.progress}%</span>
                           </div>
                           <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/5">
                              <motion.div 
                                 initial={{ width: 0 }} 
                                 animate={{ width: `${trip.progress}%` }} 
                                 className={`h-full rounded-full ${trip.status === 'Delayed' ? 'bg-amber-500' : 'bg-blue-600'} shadow-[0_0_15px_rgba(59,130,246,0.5)]`} 
                              />
                           </div>
                        </div>
                     </div>

                     <div className="flex justify-between items-center pt-8 border-t border-white/5">
                        <div className="flex items-center gap-4">
                           <img src={`https://i.pravatar.cc/150?u=${trip.driver}`} className="w-12 h-12 rounded-2xl border-2 border-white/10 shadow-xl" alt="operator" />
                           <div>
                              <p className="text-[9px] text-secondary font-black uppercase tracking-widest">Operator</p>
                              <p className="text-xs font-black text-primary uppercase italic">{trip.driver}</p>
                           </div>
                        </div>
                        <button className="w-12 h-12 bg-white/[0.03] border border-white/5 rounded-2xl flex items-center justify-center text-secondary group-hover:text-gold group-hover:border-gold/20 transition-all">
                           <ChevronRight size={24} />
                        </button>
                     </div>
                  </HolographicCard>
               </motion.div>
            ))}
         </div>

         {/* Mission Intelligence Detail Overlay */}
         <AnimatePresence>
            {selectedTrip && !showAddForm && (
               <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[400] bg-obsidian/95 backdrop-blur-[50px] overflow-y-auto custom-scrollbar"
               >
                  <div className="min-h-screen p-6 md:p-16 max-w-[1800px] mx-auto space-y-16">
                     {/* Overlay Header */}
                     <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10">
                        <div className="space-y-6">
                           <button onClick={() => setSelectedTrip(null)} className="group flex items-center gap-4 text-secondary hover:text-gold transition-all text-[10px] font-black uppercase tracking-[0.3em]">
                              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-gold/10 group-hover:text-gold transition-all"><ArrowLeft size={18} /></div> Back to Command
                           </button>
                           <div>
                              <div className="flex items-center gap-4 mb-3">
                                 <h2 className="text-6xl font-luxury text-primary tracking-tighter uppercase italic">{selectedTrip.name}</h2>
                                 <div className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest border ${selectedTrip.status === 'On Time' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                                    {selectedTrip.status}
                                 </div>
                              </div>
                              <div className="flex items-center gap-8 text-secondary font-bold uppercase tracking-[0.2em] text-sm">
                                 <span className="flex items-center gap-2"><Car size={16} className="text-gold" /> {selectedTrip.carId}</span>
                                 <span className="flex items-center gap-2"><User size={16} className="text-gold" /> {selectedTrip.driver}</span>
                                 <span className="flex items-center gap-2"><Calendar size={16} className="text-gold" /> {selectedTrip.startTime}</span>
                              </div>
                           </div>
                        </div>
                        <div className="flex flex-wrap gap-4">
                           <button onClick={() => onSelectCar(cars.find(c => c.id === selectedTrip.carId))} className="flex items-center gap-4 px-8 py-5 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-500 transition-all uppercase tracking-widest text-[10px] shadow-2xl shadow-blue-600/30">
                              <ExternalLink size={18} strokeWidth={3} /> Asset Diagnostics
                           </button>
                           {selectedTrip.status !== 'Aborted' && (
                              <button onClick={() => { addLog('Commander', `aborted mission ${selectedTrip.name}`, selectedTrip.carId, 'alert'); setSelectedTrip(null); }} className="flex items-center gap-4 px-8 py-5 bg-red-600/10 border border-red-600/20 text-red-500 font-black rounded-2xl hover:bg-red-600 hover:text-white transition-all uppercase tracking-widest text-[10px]">
                                 <Zap size={18} strokeWidth={3} /> Abort Mission
                              </button>
                           )}
                        </div>
                     </div>

                     {/* Intelligence Grid */}
                     <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                        {/* Map Viewport */}
                        <div className="lg:col-span-3 space-y-8">
                           <div className="h-[750px] rounded-[4rem] overflow-hidden border border-white/5 relative bg-obsidian-light shadow-2xl">
                              <MapContainer
                                 key={selectedTrip.id}
                                 center={selectedTrip.path?.[0] || [34.0522, -118.2437]}
                                 zoom={13}
                                 className="w-full h-full"
                                 style={{ height: '100%', width: '100%' }}
                              >
                                 <MapResizer />
                                 <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png" />
                                 <Polyline positions={selectedTrip.path} color="#3b82f6" weight={8} opacity={0.15} />
                                 <Polyline 
                                    positions={selectedTrip.path.slice(0, Math.max(1, Math.floor((playbackProgress / 100) * selectedTrip.path.length)))} 
                                    color="#d4af37" weight={10} opacity={1}
                                    lineCap="round"
                                 />
                                 
                                 <Marker position={selectedTrip.path[0]} icon={createTacticalIcon('blue', 24)} />
                                 <Marker position={selectedTrip.path[selectedTrip.path.length - 1]} icon={createTacticalIcon('gold', 24)} />
                                 
                                 <Marker 
                                    position={selectedTrip.path[Math.min(selectedTrip.path.length - 1, Math.floor((playbackProgress / 100) * (selectedTrip.path.length - 1)))]} 
                                    icon={L.divIcon({
                                       className: 'asset-marker',
                                       html: `<div class="relative">
                                                <div class="absolute inset-0 bg-gold/40 rounded-full blur-xl animate-pulse"></div>
                                                <div class="relative w-14 h-14 bg-obsidian border-4 border-gold rounded-2xl flex items-center justify-center rotate-45 shadow-2xl">
                                                   <div class="rotate-[-45deg] text-gold"><Navigation size={24} fill="currentColor" /></div>
                                                </div>
                                              </div>`,
                                       iconSize: [56, 56], iconAnchor: [28, 28]
                                    })}
                                 />
                              </MapContainer>

                              {/* Playback HUD */}
                              <div className="absolute bottom-12 left-12 right-12 z-[1000] glass-obsidian p-10 rounded-[3rem] border-white/10 flex items-center gap-12 shadow-3xl">
                                 <button 
                                    onClick={() => setIsPlaying(!isPlaying)}
                                    className="w-20 h-20 bg-white text-obsidian rounded-[2rem] flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-2xl"
                                 >
                                    {isPlaying ? <Pause size={40} fill="currentColor" /> : <Play size={40} fill="currentColor" className="ml-2" />}
                                 </button>
                                 <div className="flex-1 space-y-6">
                                    <div className="flex justify-between text-[10px] font-black text-secondary uppercase tracking-[0.4em]">
                                       <span className="flex items-center gap-2"><Compass size={14} /> Mission Start</span>
                                       <span className="text-gold flex items-center gap-2 animate-pulse"><Activity size={14} /> Real-time Streaming Telemetry</span>
                                       <span className="flex items-center gap-2">Target Reached <Target size={14} /></span>
                                    </div>
                                    <input 
                                       type="range" min="0" max="100" step="0.1" value={playbackProgress} 
                                       onChange={(e) => setPlaybackProgress(parseFloat(e.target.value))} 
                                       className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-gold hover:accent-gold-light transition-all" 
                                    />
                                    <div className="flex justify-between text-[10px] font-black text-secondary/40 uppercase tracking-widest">
                                       <span>0.00 KM</span>
                                       <span>{((playbackProgress/100) * 14.2).toFixed(2)} / 14.20 MI</span>
                                       <span>100% COMPLETE</span>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>

                        {/* Intelligence Sidebar */}
                        <div className="space-y-10">
                           <HolographicCard glowColor="blue" className="p-10 rounded-[3rem]">
                              <h3 className="text-xl font-luxury text-primary uppercase italic mb-8 flex items-center gap-4"><Activity className="text-blue-400" /> Mission Stats</h3>
                              <div className="space-y-6">
                                 {[
                                    { label: 'Avg Velocity', val: '42.5 MPH', trend: '+2.1%' },
                                    { label: 'Fuel Consumed', val: '1.4 GAL', trend: '-0.4%' },
                                    { label: 'G-Force Max', val: '1.2G', trend: 'Stable' },
                                    { label: 'Engine Temp', val: '194°F', trend: 'Normal' },
                                 ].map((s, i) => (
                                    <div key={i} className="flex justify-between items-center py-4 border-b border-white/5 last:border-0">
                                       <div>
                                          <p className="text-[10px] font-black text-secondary uppercase tracking-widest">{s.label}</p>
                                          <p className="text-sm font-black text-white mt-1 uppercase">{s.val}</p>
                                       </div>
                                       <span className="text-[9px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-md">{s.trend}</span>
                                    </div>
                                 ))}
                              </div>
                           </HolographicCard>

                           <HolographicCard glowColor="gold" className="p-10 rounded-[3rem]">
                              <h3 className="text-xl font-luxury text-primary uppercase italic mb-8 flex items-center gap-4"><Layers className="text-gold" /> Tactical Log</h3>
                              <div className="space-y-10 relative">
                                 <div className="absolute left-3.5 top-0 bottom-0 w-px bg-gradient-to-b from-gold/50 via-gold/10 to-transparent"></div>
                                 {[
                                    { title: 'In Route', time: '10:24 AM', desc: 'Asset maintains orbital vector.', active: true },
                                    { title: 'Checkpoint Alpha', time: '10:15 AM', desc: 'Biometric verify success.', active: false },
                                    { title: 'Departure', time: '10:02 AM', desc: 'Authorization code: XJ-99', active: false },
                                 ].map((log, i) => (
                                    <div key={i} className="relative pl-12">
                                       <div className={`absolute left-0 top-1.5 w-7 h-7 rounded-full border-4 border-obsidian z-10 flex items-center justify-center ${log.active ? 'bg-gold shadow-[0_0_15px_#d4af37]' : 'bg-white/10'}`}>
                                          <div className={`w-1.5 h-1.5 rounded-full ${log.active ? 'bg-obsidian' : 'bg-white/20'}`}></div>
                                       </div>
                                       <div className="flex justify-between items-start mb-2">
                                          <h4 className={`text-xs font-black uppercase italic tracking-tighter ${log.active ? 'text-white' : 'text-secondary'}`}>{log.title}</h4>
                                          <span className="text-[9px] font-bold text-secondary/40">{log.time}</span>
                                       </div>
                                       <p className="text-[10px] text-secondary/60 font-medium uppercase tracking-widest leading-relaxed">{log.desc}</p>
                                    </div>
                                 ))}
                              </div>
                           </HolographicCard>
                        </div>
                     </div>
                  </div>
               </motion.div>
            )}
         </AnimatePresence>

         {/* Mission Designer Overlay */}
         <AnimatePresence>
            {showAddForm && (
               <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[500] bg-obsidian/95 backdrop-blur-3xl flex flex-col overflow-hidden"
               >
                  <div className="flex-1 flex flex-col lg:flex-row h-full">
                     {/* Designer Sidebar */}
                     <div className="w-full lg:w-[500px] glass-obsidian border-r border-white/10 flex flex-col shadow-3xl h-full">
                        <div className="p-12 border-b border-white/5 space-y-6 shrink-0">
                           <div className="flex justify-between items-center">
                              <div>
                                 <h2 className="text-4xl font-luxury text-white tracking-tighter uppercase italic">Mission <span className="text-gradient-gold">Designer</span></h2>
                                 <p className="text-[10px] text-gold font-black uppercase tracking-[0.4em] mt-1.5">Tactical Deployment System</p>
                              </div>
                              <button onClick={() => { setShowAddForm(false); setPoints([]); }} className="w-14 h-14 bg-white/5 hover:bg-white/10 rounded-2xl flex items-center justify-center text-secondary hover:text-white transition-all">
                                 <X size={24} />
                              </button>
                           </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-12 space-y-12 custom-scrollbar pb-40">
                           {formSuccess ? (
                              <div className="py-20 text-center space-y-10 animate-in zoom-in duration-700">
                                 <div className="w-32 h-32 bg-emerald-500/10 text-emerald-500 rounded-[3.5rem] flex items-center justify-center mx-auto border border-emerald-500/20 shadow-4xl shadow-emerald-500/20">
                                    <ShieldCheck size={64} strokeWidth={1} />
                                 </div>
                                 <div>
                                    <h3 className="text-3xl font-luxury text-white uppercase italic tracking-tighter mb-4">Mission Authorized</h3>
                                    <p className="text-secondary font-bold uppercase tracking-[0.2em] text-[10px] max-w-xs mx-auto leading-relaxed">
                                       Tactical coordinates uplinked. Asset {selectedCar} ready for deployment. Driver notified.
                                    </p>
                                 </div>
                              </div>
                           ) : (
                              <form id="mission-form-final" onSubmit={handleAddTrip} className="space-y-12">
                                 <div className="space-y-8">
                                    <div className="space-y-3">
                                       <label className="text-[10px] font-black text-secondary uppercase tracking-[0.3em] ml-2">Mission Callsign</label>
                                       <div className="relative group">
                                          <Target className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-gold transition-colors" size={20} />
                                          <input required type="text" value={missionName} onChange={(e) => setMissionName(e.target.value)} placeholder="e.g. STRIKE-FORCE-01" className="w-full pl-16 pr-8 py-6 bg-white/[0.03] border border-white/10 rounded-[2rem] text-sm font-black text-primary uppercase tracking-widest outline-none focus:border-gold/50 focus:bg-gold/5 transition-all" />
                                       </div>
                                    </div>
                                    <div className="space-y-3">
                                       <label className="text-[10px] font-black text-secondary uppercase tracking-[0.3em] ml-2">Assigned Operator</label>
                                       <div className="relative group">
                                          <User className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-gold transition-colors" size={20} />
                                          <select className="w-full pl-16 pr-8 py-6 bg-white/[0.03] border border-white/10 rounded-[2rem] text-sm font-black text-primary appearance-none outline-none focus:border-gold/50 focus:bg-gold/5 transition-all" value={selectedDriver} onChange={(e) => setSelectedDriver(e.target.value)}>
                                             {drivers.map(d => <option key={d.id} className="bg-obsidian">{d.name}</option>)}
                                          </select>
                                       </div>
                                    </div>
                                    <div className="space-y-3">
                                       <label className="text-[10px] font-black text-secondary uppercase tracking-[0.3em] ml-2">Asset Allocation</label>
                                       <div className="relative group">
                                          <Car className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-gold transition-colors" size={20} />
                                          <select className="w-full pl-16 pr-8 py-6 bg-white/[0.03] border border-white/10 rounded-[2rem] text-sm font-black text-primary appearance-none outline-none focus:border-gold/50 focus:bg-gold/5 transition-all" value={selectedCar} onChange={(e) => setSelectedCar(e.target.value)}>
                                             {cars.map(c => <option key={c.id} disabled={c.status !== 'Idle'} className="bg-obsidian">{c.id} - {c.model}</option>)}
                                          </select>
                                       </div>
                                    </div>
                                 </div>

                                 <div className="glass-obsidian p-8 rounded-[2.5rem] border-white/5 space-y-8">
                                    <h4 className="text-[10px] font-black text-gold uppercase tracking-[0.4em] flex items-center gap-3">
                                       <Globe size={16} /> Tactical Geodata
                                    </h4>
                                    <div className="space-y-6">
                                       <div className="flex items-start gap-5">
                                          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border transition-all ${points[0] ? 'bg-blue-500/10 text-blue-400 border-blue-500/30' : 'bg-white/5 text-secondary border-white/5'}`}>
                                             <MapPin size={20} />
                                          </div>
                                          <div>
                                             <p className="text-[10px] font-black text-white uppercase tracking-widest">Tactical Origin</p>
                                             <p className="text-[9px] text-secondary uppercase font-bold mt-1">{points[0] ? `SYNC: ${points[0][0].toFixed(4)}, ${points[0][1].toFixed(4)}` : 'Awaiting Map Designation'}</p>
                                          </div>
                                       </div>
                                       <div className="flex items-start gap-5">
                                          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border transition-all ${points[1] ? 'bg-gold/10 text-gold border-gold/30' : 'bg-white/5 text-secondary border-white/5'}`}>
                                             <Target size={20} />
                                          </div>
                                          <div>
                                             <p className="text-[10px] font-black text-white uppercase tracking-widest">Target Destination</p>
                                             <p className="text-[9px] text-secondary uppercase font-bold mt-1">{points[1] ? `SYNC: ${points[1][0].toFixed(4)}, ${points[1][1].toFixed(4)}` : 'Awaiting Map Designation'}</p>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </form>
                           )}
                        </div>

                        {/* Designer Footer */}
                        {!formSuccess && (
                           <div className="p-10 bg-obsidian border-t border-white/10 shrink-0 space-y-6">
                              <button 
                                 form="mission-form-final"
                                 type="submit" 
                                 disabled={points.length < 2} 
                                 className={`w-full py-8 rounded-[2rem] font-black uppercase tracking-[0.5em] text-xs transition-all shadow-4xl ${points.length === 2 ? 'bg-gold text-obsidian shadow-gold/20 hover:scale-[1.02] cursor-pointer' : 'bg-white/5 text-secondary cursor-not-allowed'}`}
                              >
                                 Initialize Deployment
                              </button>
                              <div className="flex items-center gap-3 text-[9px] font-black text-secondary uppercase tracking-[0.3em] justify-center opacity-60">
                                 <ShieldCheck size={16} className="text-emerald-500" /> Mil-Spec Uplink Active
                              </div>
                           </div>
                        )}
                     </div>

                     {/* Designer Map Viewport */}
                     <div className="flex-1 relative bg-obsidian-light h-full">
                        <MapContainer center={[34.0522, -118.2437]} zoom={12} className="w-full h-full" style={{ height: '100%', width: '100%' }}>
                           <MapResizer />
                           <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png" />
                           <LocationSelector points={points} setPoints={setPoints} />
                           {points.map((p, i) => (
                              <Marker key={i} position={p} icon={createTacticalIcon(i === 0 ? 'blue' : 'gold', 32)}>
                                 <Popup className="luxury-popup">{i === 0 ? 'TACTICAL ORIGIN' : 'TARGET DESTINATION'}</Popup>
                              </Marker>
                           ))}
                           {routePath.length > 0 && <Polyline positions={routePath} color="#3b82f6" weight={10} opacity={0.4} dashArray="20, 20" />}
                        </MapContainer>
                        
                        <div className="absolute top-10 right-10 z-[1000] glass-obsidian px-8 py-6 rounded-3xl border border-white/10 shadow-3xl flex items-center gap-6">
                           <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-gold shadow-inner">
                              <Compass size={24} className="animate-spin-slow" />
                           </div>
                           <div>
                              <p className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Map Engine v2.0</p>
                              <p className="text-[9px] text-slate-500 font-bold uppercase mt-1">Satellite Relay Synchronized</p>
                           </div>
                        </div>

                        <div className="absolute bottom-10 left-10 z-[1000] glass-obsidian px-10 py-6 rounded-[2.5rem] border border-white/10 shadow-3xl">
                           <div className="flex items-center gap-6">
                              <div className="flex items-center gap-3">
                                 <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_#3b82f6]"></div>
                                 <span className="text-[10px] font-black text-white uppercase tracking-widest">Designate Origin</span>
                              </div>
                              <div className="w-px h-6 bg-white/10"></div>
                              <div className="flex items-center gap-3">
                                 <div className="w-3 h-3 rounded-full bg-gold animate-pulse shadow-[0_0_10px_#d4af37]"></div>
                                 <span className="text-[10px] font-black text-white uppercase tracking-widest">Set Target</span>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </motion.div>
            )}
         </AnimatePresence>
      </div>
   );
}
