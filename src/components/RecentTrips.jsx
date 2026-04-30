import { AlertTriangle } from "lucide-react";
import { recentTrips } from "../data/dummyData";

export default function RecentTrips() {
  return (
  return (
    <div className="bg-[#E0E5EC] neo-extruded rounded-2xl p-5 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-[15px] font-bold text-slate-800">Recent trip</h3>
        <button className="text-xs font-semibold text-teal-700 hover:text-teal-900 cursor-pointer transition-colors hover:underline underline-offset-2">
          View all
        </button>
      </div>

      {/* Trip list */}
      <div className="flex-1 overflow-y-auto">
        {recentTrips.map((trip, tripIdx) => {
          const isStop =
            trip.events[0]?.type === "stopped" ||
            trip.events[0]?.type === "stopped_home";

          return (
            <div
              key={trip.id}
              className="bg-[#E0E5EC] neo-extruded-sm rounded-xl p-5 animate-fade-in mb-4 last:mb-0"
              style={{ animationDelay: `${tripIdx * 0.06}s` }}
            >
              {/* â”€â”€ Vehicle header â”€â”€ */}
              <div className="flex items-center gap-2.5 mb-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0 shadow-sm ring-2 ring-white"
                  style={{ backgroundColor: trip.avatarColor }}
                >
                  {trip.vehicleName
                    .split("'")[0]
                    .substring(0, 2)
                    .toUpperCase()}
                </div>
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="text-[13px] font-semibold text-slate-800 truncate">
                    {trip.vehicleName}
                  </span>
                  <span className="text-slate-300">Â·</span>
                  <span className="text-[10px] font-mono font-medium text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded shrink-0">
                    {trip.plate}
                  </span>
                </div>
              </div>

              {/* â”€â”€ Events timeline â”€â”€ */}
              {trip.events.map((event, eventIdx) => {
                const isStopEvent =
                  event.type === "stopped" || event.type === "stopped_home";
                const statusLabel =
                  event.type === "stopped_home"
                    ? "Stopped at home"
                    : event.type === "stopped"
                    ? "Stopped at home"
                    : "Start";
                const dotColor = isStopEvent ? "bg-red-500" : "bg-green-500";
                const dotRing = isStopEvent
                  ? "ring-red-100"
                  : "ring-green-100";

                return (
                  <div key={eventIdx} className="relative ml-4">
                    {/* Vertical timeline line */}
                    {event.details && (
                      <div className="absolute left-0 top-3 bottom-0 w-px bg-slate-200" />
                    )}

                    {/* Status row */}
                    <div className="flex items-start justify-between gap-2 relative">
                      <div className="flex items-start gap-3 min-w-0">
                        {/* Dot */}
                        <div className="relative mt-0.5 shrink-0">
                          <span
                            className={`block w-3 h-3 rounded-full ${dotColor} ring-4 ${dotRing}`}
                          />
                        </div>
                        {/* Text */}
                        <div className="min-w-0">
                          <p className="text-[12px] font-semibold text-slate-700">
                            {statusLabel}
                          </p>
                          <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                            {event.location}
                          </p>
                        </div>
                      </div>
                      <span className="text-[11px] text-slate-400 font-medium shrink-0 mt-0.5">
                        {event.time}
                      </span>
                    </div>

                    {/* â”€â”€ Expanded details for stops â”€â”€ */}
                    {isStopEvent && event.details && (
                      <div className="ml-6 mt-3 mb-1 space-y-1.5">
                        <div className="flex items-center gap-6 text-[11px]">
                          <div className="flex items-center gap-2">
                            <span className="text-slate-400">Time spend</span>
                            <span className="font-semibold text-slate-600">
                              {event.details.timeSpend}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-slate-400">Distance</span>
                            <span className="font-semibold text-slate-600">
                              {event.details.distance}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-[11px]">
                          <span className="text-slate-400">Incident</span>
                          <span className="inline-flex items-center gap-1.5 bg-[#E0E5EC] neo-inset text-amber-600 font-bold px-3 py-1 rounded-full text-[10px]">
                            {event.details.incident}
                            <AlertTriangle size={10} strokeWidth={2.5} />
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}


