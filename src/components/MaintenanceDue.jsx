import { maintenanceDue } from "../data/dummyData";

export default function MaintenanceDue() {
  return (
    <div className="bg-[#E0E5EC] neo-extruded rounded-full px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <h3 className="text-[15px] font-bold text-slate-800">Maintenance due</h3>
        <span className="bg-[#fcepe5] text-[#e88151] text-[12px] font-bold px-2.5 py-0.5 rounded shadow-sm border border-[#f3d5c6]">
          {maintenanceDue.length}
        </span>
      </div>
      <button className="text-[13px] font-semibold text-teal-700 hover:text-teal-900 cursor-pointer transition-colors hover:underline underline-offset-2">
        View all
      </button>
    </div>
  );
}

