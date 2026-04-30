import { MapPin, Navigation, Plus, Minus, Crosshair } from "lucide-react";
import { vehicles, fleetSummary } from "../data/dummyData";

export default function InteractiveMap() {
  return (
    <div className="relative w-full h-[420px] rounded-2xl overflow-hidden neo-extruded bg-[#E0E5EC]">
      {/* Map Background — styled to look like a real map */}
      <div className="absolute inset-0">
        {/* Base map layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#e8f0e6] via-[#f0f4ee] to-[#e5ede3]" />
        
        {/* Road grid simulation */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Major roads */}
          <line x1="0" y1="40%" x2="100%" y2="35%" stroke="#d4d4d4" strokeWidth="3" />
          <line x1="15%" y1="0" x2="20%" y2="100%" stroke="#d4d4d4" strokeWidth="3" />
          <line x1="60%" y1="0" x2="55%" y2="100%" stroke="#d4d4d4" strokeWidth="2.5" />
          <line x1="0" y1="70%" x2="100%" y2="65%" stroke="#d4d4d4" strokeWidth="2" />
          <line x1="35%" y1="0" x2="40%" y2="100%" stroke="#e0e0e0" strokeWidth="1.5" />
          <line x1="80%" y1="0" x2="75%" y2="100%" stroke="#e0e0e0" strokeWidth="1.5" />
          
          {/* Minor roads */}
          <line x1="0" y1="20%" x2="100%" y2="18%" stroke="#e8e8e8" strokeWidth="1" />
          <line x1="0" y1="55%" x2="100%" y2="52%" stroke="#e8e8e8" strokeWidth="1" />
          <line x1="0" y1="85%" x2="100%" y2="82%" stroke="#e8e8e8" strokeWidth="1" />
          <line x1="45%" y1="0" x2="48%" y2="100%" stroke="#e8e8e8" strokeWidth="1" />
          <line x1="25%" y1="0" x2="28%" y2="100%" stroke="#e8e8e8" strokeWidth="1" />
          <line x1="70%" y1="0" x2="68%" y2="100%" stroke="#e8e8e8" strokeWidth="1" />
          
          {/* Curved road */}
          <path d="M 0 50% Q 30% 30%, 60% 45% T 100% 40%" stroke="#d4d4d4" strokeWidth="2" fill="none" />
          <path d="M 10% 0 Q 25% 40%, 40% 60% T 50% 100%" stroke="#d4d4d4" strokeWidth="1.5" fill="none" />
        </svg>

        {/* Green park areas */}
        <div className="absolute top-[15%] left-[8%] w-24 h-20 rounded-2xl bg-[#c8e6c0]/50" />
        <div className="absolute bottom-[20%] right-[15%] w-32 h-16 rounded-2xl bg-[#c8e6c0]/40" />
        <div className="absolute top-[60%] left-[40%] w-16 h-12 rounded-xl bg-[#c8e6c0]/30" />
        
        {/* Place labels */}
        <div className="absolute top-[25%] left-[22%] text-[11px] font-medium text-slate-500 tracking-wider uppercase">
          North Harrow
        </div>
        <div className="absolute top-[52%] right-[30%] text-[13px] font-semibold text-slate-600 tracking-wide">
          Harrow
        </div>
        <div className="absolute bottom-[35%] left-[35%] text-[10px] text-slate-400">
          Bridle Rd
        </div>
      </div>

      {/* Branch office marker */}
      <div className="absolute top-[38%] left-[48%] flex items-center gap-1.5 animate-fade-in">
        <div className="w-3 h-3 rounded-full bg-teal-600 border-2 border-white shadow-lg" />
        <span className="text-[10px] font-semibold bg-white/90 px-2 py-0.5 rounded-md shadow-sm text-slate-700 whitespace-nowrap">
          Branch 1 office
        </span>
      </div>

      {/* Vehicle markers */}
      {vehicles.map((vehicle, idx) => {
        const positions = [
          { top: "30%", left: "42%" },
          { top: "35%", left: "50%" },
          { top: "45%", left: "55%" },
          { top: "55%", left: "38%" },
          { top: "28%", left: "58%" },
          { top: "50%", left: "45%" },
        ];
        const pos = positions[idx] || positions[0];
        
        return (
          <div
            key={vehicle.id}
            className="absolute animate-bounce-marker cursor-pointer group"
            style={{ top: pos.top, left: pos.left, animationDelay: `${idx * 0.3}s` }}
          >
            <div className="relative">
              <div
                className="w-8 h-8 rounded-full ring-2 ring-white shadow-sm flex items-center justify-center text-white text-[10px] font-bold hover:scale-110 transition-transform duration-200"
                style={{ backgroundColor: vehicle.avatarColor }}
              >
                {vehicle.driver.split(" ").map(n => n[0]).join("")}
              </div>
              {vehicle.status === "active" && (
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-white" />
              )}
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                <div className="bg-slate-800 text-white text-[10px] px-2.5 py-1.5 rounded-lg shadow-xl whitespace-nowrap">
                  <p className="font-semibold">{vehicle.name}</p>
                  <p className="text-white/70">{vehicle.speed} • {vehicle.lastUpdate}</p>
                </div>
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-800 rotate-45 -mt-1" />
              </div>
            </div>
          </div>
        );
      })}

      {/* View live map button */}
      <div className="absolute top-4 right-4 z-10">
        <button className="flex items-center gap-2 bg-[#E0E5EC] neo-extruded hover:brightness-105 text-slate-700 text-xs font-semibold px-4 py-2.5 rounded-full transition-all duration-200 cursor-pointer">
          <Navigation size={14} strokeWidth={2.5} className="text-teal-700" />
          <span>View live map</span>
        </button>
      </div>

      {/* Map controls */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center bg-[#E0E5EC] neo-extruded rounded-full p-1.5 z-10">
        <button className="w-8 h-8 rounded-full flex items-center justify-center text-slate-600 hover:brightness-105 transition-all cursor-pointer">
          <Plus size={18} strokeWidth={2.5} />
        </button>
        <div className="w-5 h-px bg-slate-300 my-1" />
        <button className="w-8 h-8 rounded-full flex items-center justify-center text-slate-600 hover:brightness-105 transition-all cursor-pointer">
          <Minus size={18} strokeWidth={2.5} />
        </button>
        <div className="w-5 h-px bg-slate-300 my-1" />
        <button className="w-8 h-8 rounded-full flex items-center justify-center text-slate-600 hover:brightness-105 transition-all cursor-pointer">
          <Crosshair size={16} strokeWidth={2.5} />
        </button>
      </div>

      {/* Fleet summary overlay */}
      <div className="absolute bottom-6 left-6 z-10 animate-fade-in">
        <div className="bg-[#E0E5EC]/80 backdrop-blur-md rounded-2xl px-5 py-4 neo-extruded">
          <div className="flex items-center gap-6">
            <div className="bg-[#E0E5EC] neo-inset rounded-xl px-4 py-2">
              <p className="text-xs text-slate-500 font-semibold mb-1">Total Vehicles</p>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-slate-800">{fleetSummary.totalVehicles}</span>
              </div>
            </div>
            
            <div className="bg-[#E0E5EC] neo-extruded-sm rounded-xl px-4 py-2 flex items-center gap-3">
              <div className="w-1 h-8 rounded-full bg-orange-400 neo-inset-sm" />
              <div>
                <p className="text-xs text-slate-500 font-semibold">In shop</p>
                <span className="text-lg font-bold text-slate-800">{fleetSummary.inShop}</span>
              </div>
            </div>

            <div className="bg-[#E0E5EC] neo-extruded-sm rounded-xl px-4 py-2 flex items-center gap-3">
              <div className="w-1 h-8 rounded-full bg-green-500 neo-inset-sm" />
              <div>
                <p className="text-xs text-slate-500 font-semibold">Active</p>
                <span className="text-lg font-bold text-slate-800">{fleetSummary.active}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
