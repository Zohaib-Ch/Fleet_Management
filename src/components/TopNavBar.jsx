import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Car, Users, Navigation, TrendingUp,
  FileText, ChevronDown, Sparkles, AlertTriangle, Sun, Moon
} from "lucide-react";

export default function TopNavBar({ activeTab, onTabChange, appTheme, onToggleTheme }) {
  const isLight = appTheme === 'light';

  const navItems = [
    { id: "dashboard", label: "Operations", icon: LayoutDashboard },
    { id: "fleet", label: "Registry", icon: Car },
    { id: "drivers", label: "Personnel", icon: Users },
    { id: "trips", label: "Trips", icon: Navigation },
    { id: "insights", label: "Analytics", icon: TrendingUp },
    { id: "alerts", label: "Alerts", icon: AlertTriangle },
    { id: "reports", label: "Audits", icon: FileText },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-[100] border-b transition-all duration-500"
      style={{
        background: isLight ? 'rgba(255,255,255,0.88)' : 'rgba(10,10,12,0.85)',
        borderColor: isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        boxShadow: isLight ? '0 4px 30px rgba(0,0,0,0.08)' : '0 4px 30px rgba(0,0,0,0.8)',
      }}
    >
      {/* Top Accent Line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-gold to-transparent opacity-50" />

      <div className="max-w-[1800px] mx-auto px-8 h-20 flex items-center justify-between">

        {/* Branding */}
        <div className="flex items-center gap-5 group cursor-pointer">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500 blur-xl opacity-0 group-hover:opacity-20 transition-opacity" />
            <div
              className="w-12 h-12 flex items-center justify-center rounded-2xl transition-all group-hover:rotate-6 group-hover:scale-110"
              style={{
                background: isLight
                  ? 'linear-gradient(135deg, #1e293b, #334155)'
                  : 'linear-gradient(135deg, #ffffff, #cbd5e1)',
                boxShadow: isLight
                  ? '0 0 20px rgba(0,0,0,0.15)'
                  : '0 0 20px rgba(255,255,255,0.1)',
              }}
            >
              <Car className="w-7 h-7" style={{ color: isLight ? '#f1d592' : '#0a0a0c' }} />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1
                className="font-luxury text-2xl tracking-tighter leading-none"
                style={{ color: isLight ? '#0f172a' : '#ffffff' }}
              >
                FLEET<span className="text-gradient-gold">OPS</span>
              </h1>
              <Sparkles size={14} className="text-gold animate-pulse" />
            </div>
            <p
              className="text-[9px] font-black uppercase tracking-[0.4em] mt-1.5 opacity-60 group-hover:opacity-100 transition-opacity"
              style={{ color: isLight ? '#64748b' : '#64748b' }}
            >
              Intelligence Terminal
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav
          className="flex items-center gap-1 p-1.5 rounded-2xl backdrop-blur-3xl shadow-inner transition-all duration-500"
          style={{
            background: isLight ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.02)',
            border: isLight ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(255,255,255,0.05)',
          }}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className="relative flex items-center gap-2.5 px-6 py-2.5 rounded-xl text-[10px] font-black transition-all duration-500 uppercase tracking-widest"
                style={{
                  color: isActive
                    ? (isLight ? '#0f172a' : '#ffffff')
                    : (isLight ? '#94a3b8' : '#64748b'),
                }}
              >
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      layoutId="nav-crystal"
                      className="absolute inset-0 rounded-xl"
                      style={{
                        background: isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)',
                        border: isLight ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.10)',
                        boxShadow: isLight ? '0 0 15px rgba(0,0,0,0.06)' : '0 0 15px rgba(255,255,255,0.05)',
                      }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    >
                      <div className="absolute inset-x-4 -bottom-[1px] h-[2px] bg-gold glow-gold rounded-full" />
                    </motion.div>
                  )}
                </AnimatePresence>
                <Icon
                  size={14}
                  className="relative z-10 transition-colors duration-500"
                  style={{ color: isActive ? '#d4af37' : (isLight ? '#94a3b8' : '#475569') }}
                />
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right: User Profile & Theme Toggle */}
        <div className="flex items-center gap-6">
          {/* Theme Toggle Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onToggleTheme}
            className="ml-6 relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 overflow-hidden"
            style={{
              background: isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)',
              border: isLight ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.10)',
              color: isLight ? '#d4af37' : '#f1d592',
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={appTheme}
                initial={{ y: 20, opacity: 0, rotate: -45 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                exit={{ y: -20, opacity: 0, rotate: 45 }}
                transition={{ duration: 0.3 }}
              >
                {isLight ? <Moon size={20} fill="currentColor" /> : <Sun size={20} fill="currentColor" />}
              </motion.div>
            </AnimatePresence>
          </motion.button>

          <div className="flex items-center gap-4 cursor-pointer group">
            <div className="text-right hidden sm:block">
              <p
                className="text-xs font-black uppercase tracking-wider group-hover:text-gold transition-colors"
                style={{ color: isLight ? '#1e293b' : '#ffffff' }}
              >
                Commander James
              </p>
              <p className="text-[9px] text-gold/60 font-black uppercase tracking-widest mt-1">
                L4 Clearance
              </p>
            </div>
            <div className="relative overflow-hidden rounded-xl">
              <div className="absolute inset-0 bg-blue-500 blur-lg opacity-0 group-hover:opacity-20 transition-opacity" />
              <div className="scan-line group-hover:block hidden" />
              <img
                src="https://i.pravatar.cc/150?u=admin"
                alt="Admin"
                className="relative w-11 h-11 rounded-xl shadow-2xl group-hover:ring-gold/50 transition-all duration-500"
                style={{
                  outline: isLight ? '1px solid rgba(0,0,0,0.12)' : '1px solid rgba(255,255,255,0.10)',
                }}
              />
              <div
                className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full shadow-[0_0_10px_#10b981]"
                style={{ border: isLight ? '3px solid #f8fafc' : '3px solid #0a0a0c' }}
              />
            </div>
            <button
              className="p-2 transition-colors"
              style={{ color: isLight ? '#94a3b8' : '#64748b' }}
            >
              <ChevronDown size={16} />
            </button>
          </div>
        </div>

      </div>
    </header>
  );
}


