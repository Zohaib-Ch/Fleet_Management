import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Car, Users, Navigation, TrendingUp,
  FileText, ChevronDown, Sparkles, Moon, Sun, Zap, AlertTriangle
} from "lucide-react";

export default function TopNavBar({ activeTab, onTabChange, mapTheme, onToggleMapTheme }) {
  const navItems = [
    { id: "dashboard", label: "Operations", icon: LayoutDashboard },
    { id: "fleet", label: "Registry", icon: Car },
    { id: "drivers", label: "Personnel", icon: Users },
    { id: "trips", label: "Missions", icon: Navigation },
    { id: "insights", label: "Analytics", icon: TrendingUp },
    { id: "alerts", label: "Alerts", icon: AlertTriangle },
    { id: "reports", label: "Audits", icon: FileText },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] glass-obsidian border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
      {/* Top Accent Line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-gold to-transparent opacity-50"></div>

      <div className="max-w-[1800px] mx-auto px-8 h-20 flex items-center justify-between">

        {/* Futuristic Branding */}
        <div className="flex items-center gap-5 group cursor-pointer">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500 blur-xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
            <div className="w-12 h-12 bg-gradient-to-br from-white to-slate-300 flex items-center justify-center rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all group-hover:rotate-6 group-hover:scale-110">
              <Car className="text-obsidian w-7 h-7" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-luxury text-2xl text-white tracking-tighter leading-none">FLEET<span className="text-gradient-gold">OPS</span></h1>
              <Sparkles size={14} className="text-gold animate-pulse" />
            </div>
            <p className="text-[9px] text-slate-500 font-black uppercase tracking-[0.4em] mt-1.5 opacity-60 group-hover:opacity-100 transition-opacity">Intelligence Terminal</p>
          </div>
        </div>

        {/* Floating Command Bar */}
        <nav className="flex items-center gap-1 bg-white/[0.02] p-1.5 rounded-2xl border border-white/5 backdrop-blur-3xl shadow-inner">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`
                  relative flex items-center gap-2.5 px-6 py-2.5 rounded-xl text-[10px] font-black transition-all duration-500 uppercase tracking-widest group
                  ${isActive
                    ? "text-white"
                    : "text-slate-500 hover:text-slate-300"
                  }
                `}
              >
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      layoutId="nav-crystal"
                      className="absolute inset-0 bg-white/[0.05] rounded-xl border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    >
                      <div className="absolute inset-x-4 -bottom-[1px] h-[2px] bg-gold glow-gold rounded-full" />
                    </motion.div>
                  )}
                </AnimatePresence>
                <Icon size={14} className={`relative z-10 transition-colors duration-500 ${isActive ? "text-gold" : "text-slate-600 group-hover:text-slate-400"}`} />
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Hub */}
        <div className="flex items-center gap-6">
          {/* Map Theme Toggle */}
          <button
            onClick={onToggleMapTheme}
            className="flex items-center gap-3 glass-obsidian px-5 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 transition-all text-white group"
          >
            {mapTheme === 'dark' ? <Moon size={16} className="text-blue-400" /> : <Sun size={16} className="text-gold" />}
            <span className="text-[10px] font-black uppercase tracking-widest">{mapTheme === 'dark' ? 'Night Intel' : 'Day Ops'}</span>
          </button>

          <div className="h-10 w-px bg-white/10 hidden sm:block"></div>

          <div className="flex items-center gap-5 cursor-pointer group">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-black text-white uppercase tracking-wider group-hover:text-gold transition-colors">Commander James</p>
              <p className="text-[9px] text-gold/40 font-black uppercase tracking-widest mt-1">L4 Clearanced</p>
            </div>
            <div className="relative overflow-hidden rounded-xl">
              <div className="absolute inset-0 bg-blue-500 blur-lg opacity-0 group-hover:opacity-20 transition-opacity"></div>
              <div className="scan-line group-hover:block hidden"></div>
              <img src="https://i.pravatar.cc/150?u=admin" alt="Admin" className="relative w-11 h-11 rounded-xl ring-1 ring-white/10 shadow-2xl group-hover:ring-gold/50 transition-all duration-500" />
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-[3px] border-obsidian shadow-[0_0_10px_#10b981]"></div>
            </div>
            <button className="p-2 text-slate-500 hover:text-white transition-colors">
              <ChevronDown size={16} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
