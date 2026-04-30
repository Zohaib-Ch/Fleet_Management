export default function SafeDriverLeaderboard() {
  return (
    <div className="bg-[#E0E5EC] neo-extruded rounded-full px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <h3 className="text-[15px] font-bold text-slate-800">Safe Driver Leaderboards</h3>
      </div>
      <button className="text-[13px] font-semibold text-teal-700 hover:text-teal-900 cursor-pointer transition-colors hover:underline underline-offset-2">
        View all
      </button>
    </div>
  );
}
