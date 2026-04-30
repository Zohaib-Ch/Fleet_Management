import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin, Navigation, AlertCircle,
  AlertTriangle, Zap, Bell, Clock, MoreHorizontal,
  ChevronRight, User, Wrench, CheckCircle, TrendingUp, Cpu, Car, ShieldCheck,
  Grid, Filter, Calendar, ChevronDown, Check, Layout, Eye, EyeOff, GripVertical, RotateCcw
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import HolographicCard from '../ui/HolographicCard';
import {
  LiveSignalChart, FleetStatusDonut, VehiclesByHubBar,
  TripStatusTimeline, HubPerformanceProfile, AlertSeverityMix
} from '../charts/DashboardCharts';
import ActivityFeed from '../ui/ActivityFeed';
import { hubs, liveSignalData, vehiclesByHubData, hubPerformanceData, alertSeverityData, tripStatusTimelineData } from '../../data/dummyData';

// DND Kit Imports
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const createDriverIcon = (imageUrl, name) => {
  return L.divIcon({
    className: 'custom-leaflet-icon',
    html: `
      <div class="flex items-center gap-3 bg-[var(--bg-secondary)] backdrop-blur-md p-1 pr-4 rounded-2xl border border-[var(--border-primary)] shadow-2xl transition-all hover:scale-110 cursor-pointer">
         <img src="${imageUrl}" class="w-8 h-8 rounded-xl ring-1 ring-[var(--border-primary)]" />
         <div class="flex flex-col">
           <span class="text-[10px] font-black text-[var(--text-primary)] uppercase tracking-wider">${name}</span>
           <div class="flex items-center gap-1">
             <div class="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
             <span class="text-[8px] text-blue-400 font-bold uppercase">Tracking</span>
           </div>
         </div>
      </div>
    `,
    iconSize: [140, 42],
    iconAnchor: [20, 20]
  });
};

function MapResizer() {
  const map = useMap();
  useEffect(() => {
    const timer = setTimeout(() => { 
      try {
        if (map && map.getContainer()) {
          map.invalidateSize(); 
        }
      } catch (e) {
        // Silently catch errors during drag-and-drop remounting
      }
    }, 250);
    return () => clearTimeout(timer);
  }, [map]);
  return null;
}

const SortableSection = ({ id, children }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 'auto',
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative group">
      <div
        {...attributes}
        {...listeners}
        className="absolute top-6 right-6 p-2 bg-[var(--border-primary)] border border-[var(--border-primary)] rounded-xl cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity z-20"
      >
        <GripVertical size={16} className="text-secondary" />
      </div>
      {children}
    </div>
  );
};

export default function DashboardView({ mapTheme, cars, drivers, trips, alerts, logs, onSelectDriver }) {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('dashboard-order');
    return saved ? JSON.parse(saved) : ['trend', 'distribution', 'analytics', 'activity'];
  });

  const [visibility, setVisibility] = useState({
    liveSignal: true,
    fleetStatus: true,
    vehiclesHub: true,
    tripTimeline: true,
    hubPerformance: true,
    alertSeverity: true
  });

  const [filters, setFilters] = useState({
    timeWindow: '7d',
    hubs: [],
    metrics: ['trips']
  });

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('dashboard-order', JSON.stringify(items));
  }, [items]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleResetDemo = () => {
    localStorage.clear();
    window.location.reload();
  };

  const toggleVisibility = (key) => {
    setVisibility(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Compute live stats from props
  const activeTrips = trips.filter(t => t.progress < 100).length;
  const openAlerts = alerts.length;
  const fleetHealth = (cars.reduce((acc, c) => acc + c.fuelLevel, 0) / cars.length).toFixed(1);
  const totalDistance = cars.reduce((acc, c) => acc + parseFloat(c.odometer.replace(',', '')), 0).toFixed(0);

  return (
    <div className="space-y-10 view-transition pb-20">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 glass-obsidian p-8 rounded-[2.5rem] border-[var(--border-primary)] relative z-30">
        <div className="flex flex-wrap gap-4">
          <div className="relative">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-3 px-6 py-3 bg-[var(--border-primary)] border border-[var(--border-primary)] rounded-2xl text-[10px] font-black text-primary uppercase tracking-widest hover:bg-[var(--border-primary)] transition-all"
            >
              <Filter size={14} className="text-gold" />
              Intelligence Filters
              <ChevronDown size={14} className={`ml-2 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isFilterOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 mt-4 w-72 glass-obsidian p-6 rounded-3xl border border-[var(--border-primary)] shadow-2xl z-[100]"
                >
                  <div className="space-y-6">
                    <div>
                      <p className="text-[9px] font-black text-secondary uppercase tracking-[0.2em] mb-3">Time Window</p>
                      <div className="grid grid-cols-3 gap-2">
                        {['7d', '14d', '30d'].map(t => (
                          <button
                            key={t}
                            onClick={() => setFilters(prev => ({ ...prev, timeWindow: t }))}
                            className={`py-2 rounded-xl text-[10px] font-black uppercase transition-all ${filters.timeWindow === t ? 'bg-gold text-obsidian' : 'bg-[var(--border-primary)] text-secondary hover:bg-[var(--border-primary)]'}`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-2 bg-[var(--border-primary)] p-1 rounded-2xl border border-[var(--border-primary)]">
            {[
              { key: 'liveSignal', label: 'Signal' },
              { key: 'fleetStatus', label: 'Fleet' },
              { key: 'tripTimeline', label: 'Trips' }
            ].map(toggle => (
              <button
                key={toggle.key}
                onClick={() => toggleVisibility(toggle.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
                  visibility[toggle.key] 
                    ? (mapTheme === 'light' ? 'bg-white text-obsidian shadow-lg' : 'bg-primary text-white shadow-lg') 
                    : 'text-secondary hover:bg-[var(--border-primary)]'
                }`}
              >
                {visibility[toggle.key] ? <Eye size={12} /> : <EyeOff size={12} />}
                {toggle.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={handleResetDemo}
            className="px-6 py-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all flex items-center gap-2"
          >
            <RotateCcw size={14} /> Reset Ops
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { id: 'fleet', label: 'Dist. Traversed', val: `${Number(totalDistance).toLocaleString()} mi`, sub: 'Global Fleet Sync', icon: Car, color: 'text-blue-400', glow: 'blue' },
          { id: 'uptime', label: 'Active Trips', val: activeTrips.toString(), sub: '94.8% Operational', icon: Navigation, color: 'text-emerald-400', glow: 'emerald' },
          { id: 'Trips', label: 'Open Alerts', val: openAlerts.toString(), sub: `${alerts.filter(a => a.type === 'critical').length} Critical Pending`, icon: Bell, color: 'text-gold', glow: 'gold' },
          { id: 'risk', label: 'Fleet Integrity', val: `${fleetHealth}%`, sub: 'Nominal Condition', icon: ShieldCheck, color: 'text-purple-400', glow: 'purple' },
        ].map((kpi, i) => (
          <HolographicCard key={i} glowColor={kpi.glow} className="p-8 rounded-[2.5rem]">
            <div className="flex justify-between items-start mb-6">
              <div className={`p-4 rounded-2xl bg-[var(--border-primary)] border border-[var(--border-primary)] ${kpi.color}`}>
                <kpi.icon size={24} />
              </div>
              <TrendingUp size={16} className="text-emerald-500 opacity-50" />
            </div>
            <p className="text-[10px] font-black text-secondary uppercase tracking-[0.2em] ml-1">{kpi.label}</p>
            <h3 className="text-3xl font-luxury text-primary mt-2 italic tracking-tighter">{kpi.val}</h3>
            <p className="text-[9px] font-bold text-secondary uppercase tracking-widest mt-2">{kpi.sub}</p>
          </HolographicCard>
        ))}
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <div className="space-y-10">
            {items.map(id => (
              <SortableSection key={id} id={id}>
                {id === 'trend' && (
                  <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    <HolographicCard glowColor="blue" className="xl:col-span-2 rounded-[3rem] p-3 min-h-[600px] overflow-hidden">
                      <div className="absolute top-8 left-8 z-[1000] flex items-center gap-3 glass-obsidian px-5 py-3 rounded-2xl border border-[var(--border-primary)] shadow-2xl">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                        <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Live Global Telemetry</span>
                      </div>
                      <div className="w-full h-[580px] rounded-[2.5rem] overflow-hidden relative">
                        <MapContainer key="dashboard-main-map" center={[34.0522, -118.2437]} zoom={11} className="w-full h-full" style={{ height: '580px', width: '100%', background: mapTheme === 'dark' ? '#0a0a0c' : '#f8fafc' }}>
                          <MapResizer />
                          <TileLayer url={mapTheme === 'dark' ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png" : "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"} />
                          {trips.map(trip => (
                            <Polyline key={trip.id} positions={trip.path} color={mapTheme === 'dark' ? "#d4af37" : "#f59e0b"} weight={3} opacity={0.6} />
                          ))}
                          {drivers.map(driver => (
                            <Marker 
                              key={driver.id} 
                              position={driver.currentLocation} 
                              icon={createDriverIcon(driver.avatar, driver.name.split(' ')[0])} 
                              eventHandlers={{ click: () => onSelectDriver(driver) }}
                            />
                          ))}
                        </MapContainer>
                      </div>
                    </HolographicCard>

                    <div className="flex flex-col gap-8">
                      <HolographicCard glowColor="gold" className="rounded-[3rem] p-8 flex-1 flex flex-col">
                        <div className="flex justify-between items-center mb-8">
                          <h3 className="text-xl font-luxury text-primary tracking-tighter uppercase italic">Active Trips</h3>
                          <button className="text-[10px] font-black text-gold border border-gold/20 px-3 py-1 rounded-lg">LIVE</button>
                        </div>
                        <div className="space-y-6 overflow-y-auto pr-2 custom-scrollbar">
                          {trips.filter(t => t.progress < 100).map(trip => (
                            <motion.div key={trip.id} whileHover={{ x: 10 }} className="p-6 rounded-3xl bg-white/[0.03] border border-[var(--border-primary)] hover:bg-white/[0.06] transition-all group cursor-pointer relative overflow-hidden">
                              <div className="flex justify-between items-start mb-4 relative z-10">
                                <div>
                                  <h4 className="text-sm font-black text-primary group-hover:text-gold transition-colors">{trip.name}</h4>
                                  <p className="text-[10px] text-secondary font-bold uppercase tracking-widest mt-1">Ref: TR-990{trip.id}</p>
                                </div>
                                <div className={`w-2 h-2 rounded-full ${trip.status === 'On Time' ? 'bg-emerald-500 glow-emerald' : 'bg-amber-500 glow-gold'}`}></div>
                              </div>
                              <div className="flex items-center justify-between text-[10px] font-black text-secondary uppercase tracking-widest mb-4 relative z-10">
                                <div className="flex items-center gap-4">
                                  <span className="flex items-center gap-1.5"><MapPin size={10} className="text-blue-400" /> {trip.distance}</span>
                                  <span className="flex items-center gap-1.5"><Clock size={10} className="text-amber-400" /> {trip.eta}</span>
                                </div>
                                <span className="text-primary">{trip.progress}%</span>
                              </div>
                              <div className="w-full h-1 bg-[var(--border-primary)] rounded-full overflow-hidden relative z-10">
                                <div className="h-full bg-gold transition-all duration-1000" style={{ width: `${trip.progress}%` }}></div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </HolographicCard>
                    </div>
                  </div>
                )}

                {id === 'distribution' && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {visibility.liveSignal && (
                      <HolographicCard glowColor="blue" className="lg:col-span-2 rounded-[3rem] p-10">
                        <div className="flex justify-between items-center mb-10">
                          <h3 className="text-xl font-luxury text-primary tracking-tighter uppercase italic">Live Signal Intensity</h3>
                          <TrendingUp size={20} className="text-blue-500" />
                        </div>
                        <div className="h-[300px]">
                          <LiveSignalChart data={liveSignalData} theme={mapTheme} />
                        </div>
                      </HolographicCard>
                    )}

                    {visibility.fleetStatus && (
                      <HolographicCard glowColor="gold" className="rounded-[3rem] p-10">
                        <div className="flex justify-between items-center mb-10">
                          <h3 className="text-xl font-luxury text-primary tracking-tighter uppercase italic">Fleet Status</h3>
                          <Zap size={20} className="text-gold" />
                        </div>
                        <div className="h-[300px]">
                          <FleetStatusDonut data={cars} />
                        </div>
                      </HolographicCard>
                    )}
                  </div>
                )}

                {id === 'analytics' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <HolographicCard glowColor="emerald" className="rounded-[3rem] p-8 lg:col-span-2">
                      <h3 className="text-lg font-luxury text-primary tracking-tighter uppercase italic mb-8">Vehicles by Strategic Hub</h3>
                      <div className="h-[250px]">
                        <VehiclesByHubBar data={vehiclesByHubData} />
                      </div>
                    </HolographicCard>
                    <HolographicCard glowColor="blue" className="rounded-[3rem] p-8 lg:col-span-2">
                      <h3 className="text-lg font-luxury text-primary tracking-tighter uppercase italic mb-8">Trip Status Timeline</h3>
                      <div className="h-[250px]">
                        <TripStatusTimeline data={tripStatusTimelineData} />
                      </div>
                    </HolographicCard>
                  </div>
                )}

                {id === 'activity' && (
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    <div className="glass-obsidian rounded-[3rem] p-10 glow-purple">
                      <h3 className="text-2xl font-luxury text-primary tracking-tighter uppercase italic mb-10">INTELLIGENCE ALERTS</h3>
                      <div className="space-y-6">
                        {alerts.slice(0, 3).map(alert => (
                          <div key={alert.id} className="flex gap-6 p-6 rounded-3xl bg-white/[0.02] border border-[var(--border-primary)]">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${alert.type === 'critical' ? 'bg-red-500/10 text-red-500' : 'bg-blue-500/10 text-blue-500'}`}>
                              <AlertTriangle size={24} />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-black text-primary text-sm uppercase tracking-wider mb-2">{alert.title}</h4>
                              <p className="text-xs text-secondary font-medium">{alert.message}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="glass-obsidian rounded-[3rem] p-10 glow-blue flex flex-col h-[600px]">
                      <h3 className="text-2xl font-luxury text-primary tracking-tighter uppercase italic mb-10">SYSTEM AUDIT STREAM</h3>
                      <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar">
                        <ActivityFeed logs={logs} />
                      </div>
                    </div>
                  </div>
                )}
              </SortableSection>
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}



