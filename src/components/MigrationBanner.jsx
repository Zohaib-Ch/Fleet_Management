import { AlertTriangle } from "lucide-react";
import { migrationBanner } from "../data/dummyData";

export default function MigrationBanner() {
  if (!migrationBanner.show) return null;

  return (
    <div className="mx-4 lg:mx-6 mb-[-60px] relative z-20 animate-fade-in w-fit pt-4">
      <div className="flex items-center gap-3 bg-[#fdf2e9] neo-extruded rounded-full px-6 py-3">
        <div className="flex items-center justify-center shrink-0">
          <AlertTriangle size={16} className="text-[#e88151]" strokeWidth={2.5} />
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-700">
          <p>
            There is{" "}
            <span className="font-bold text-[#e88151]">{migrationBanner.count} users</span>{" "}
            who have not been migrated to the fleet management system.
          </p>
          <button className="text-[13px] font-semibold text-[#e88151] hover:text-[#d06b40] underline underline-offset-2 cursor-pointer transition-colors whitespace-nowrap">
            View users
          </button>
        </div>
      </div>
    </div>
  );
}
