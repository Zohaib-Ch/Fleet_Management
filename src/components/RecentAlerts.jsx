import { MapPin, Clock, AlertTriangle, Triangle } from "lucide-react";
import { recentAlerts } from "../data/dummyData";

const alertIconMap = {
  Clock: Clock,
  MapPin: MapPin,
};

export default function RecentAlerts() {
  return (
    <div className="bg-[#E0E5EC] neo-extruded rounded-2xl p-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[15px] font-bold text-slate-800">Recent alerts</h3>
        <button className="text-xs font-medium text-teal-700 hover:text-teal-900 cursor-pointer transition-colors hover:underline underline-offset-2">
          View all
        </button>
      </div>

      {/* Alert list */}
      <div className="flex-1 space-y-4">
        {recentAlerts.map((alert, idx) => {
          const IconComponent = alertIconMap[alert.icon] || AlertTriangle;
          return (
            <div
              key={alert.id}
              className="bg-[#E0E5EC] neo-extruded-sm rounded-xl p-4 animate-fade-in group"
              style={{ animationDelay: `${idx * 0.08}s` }}
            >
              {/* Header row */}
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="min-w-0">
                  <p className="text-[13px] font-bold text-slate-800">{alert.vehicleName}</p>
                  <p className="text-[11px] text-teal-700 font-semibold mt-0.5">{alert.time}</p>
                </div>
                {/* Always-visible map pin */}
                <button className="shrink-0 w-8 h-8 rounded-full bg-[#E0E5EC] neo-extruded-sm flex items-center justify-center text-teal-600 hover:brightness-105 transition-all cursor-pointer">
                  <MapPin size={14} strokeWidth={2.5} />
                </button>
              </div>
              {/* Alert message */}
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[#E0E5EC] neo-inset-sm flex items-center justify-center shrink-0">
                  <IconComponent size={12} className="text-slate-500" strokeWidth={2.5} />
                </div>
                <p className="text-[12px] font-medium text-slate-600 leading-snug">{alert.message}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

