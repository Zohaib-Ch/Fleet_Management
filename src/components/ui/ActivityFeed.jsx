import React from 'react';
import { motion } from 'framer-motion';
import { 
  Navigation, CheckCircle, PlusCircle, AlertTriangle, 
  UserPlus, ShieldCheck, Clock, ArrowRight 
} from 'lucide-react';

const categoryConfig = {
  started: { icon: Navigation, color: 'text-blue-400', bg: 'bg-blue-500/10', label: 'Mission Started' },
  completed: { icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-500/10', label: 'Mission Completed' },
  created: { icon: PlusCircle, color: 'text-gold', bg: 'bg-gold/10', label: 'Asset Created' },
  resolved: { icon: ShieldCheck, color: 'text-purple-400', bg: 'bg-purple-500/10', label: 'Alert Resolved' },
  assigned: { icon: UserPlus, color: 'text-blue-400', bg: 'bg-blue-500/10', label: 'Operator Assigned' },
  alerted: { icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-500/10', label: 'System Alert' },
};

export default function ActivityFeed({ logs, className = "" }) {
  // Group logs by day (simulated for demo)
  const groupedLogs = {
    'Today': logs.slice(0, 3),
    'Yesterday': logs.slice(3, 5),
  };

  return (
    <div className={`space-y-10 ${className}`}>
      {Object.entries(groupedLogs).map(([day, dayLogs]) => (
        <div key={day} className="space-y-6">
          <div className="flex items-center gap-4">
            <h4 className="text-[10px] font-black text-secondary uppercase tracking-[0.3em] whitespace-nowrap">{day}</h4>
            <div className="h-px w-full bg-primary/5"></div>
          </div>
          
          <div className="space-y-4 relative before:absolute before:left-[27px] before:top-2 before:bottom-2 before:w-px before:bg-primary/5">
            {dayLogs.map((log, i) => {
              const config = categoryConfig[log.category] || categoryConfig.started;
              return (
                <motion.div 
                  key={log.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="relative pl-16 group"
                >
                  <div className={`absolute left-0 top-0 w-14 h-14 rounded-2xl ${config.bg}  flex items-center justify-center z-10 group-hover:border-gold transition-colors shadow-2xl`}>
                    <config.icon size={20} className={config.color} />
                  </div>
                  
                  <div className="glass-obsidian p-5 rounded-[1.5rem] border-[var(--border-primary)] group-hover:border-[var(--border-primary)] transition-all">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-3">
                        {log.avatar && (
                          <img src={log.avatar} alt="avatar" className="w-6 h-6 rounded-lg ring-1 ring-[var(--border-primary)]" />
                        )}
                        <p className="text-sm font-medium text-secondary leading-relaxed">
                          <span className="text-primary font-black uppercase tracking-wider mr-2">{log.driver}</span>
                          {log.message}
                        </p>
                      </div>
                      <span className="text-[9px] font-bold text-secondary ml-4 shrink-0 uppercase tracking-widest">{log.time}</span>
                    </div>
                    
                    <div className="flex items-center gap-3 mt-3">
                      <span className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest  ${config.color} bg-primary/5`}>
                        {config.label}
                      </span>
                      {log.ref && (
                        <span className="text-[8px] font-black text-secondary uppercase tracking-widest">Ref: {log.ref}</span>
                      )}
                      <button className="ml-auto text-[8px] font-black text-blue-500 uppercase tracking-widest flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        Details <ArrowRight size={10} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}


