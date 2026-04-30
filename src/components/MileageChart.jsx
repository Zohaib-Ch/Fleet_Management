import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { ChevronDown, Calendar } from "lucide-react";
import { mileageData } from "../data/dummyData";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="relative">
        <div className="bg-slate-800 text-white px-4 py-2.5 rounded-xl shadow-2xl text-xs border border-slate-700">
          <p className="font-bold text-[13px]">
            Total {payload[0].value.toLocaleString()} km
          </p>
          <p className="text-[var(--border-primary)]0 text-[11px] mt-0.5">{label}</p>
        </div>
        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-800 rotate-45 border-b border-r border-slate-700" />
      </div>
    );
  }
  return null;
};

export default function MileageChart() {
  const [period, setPeriod] = useState("Last year");
  const [hoveredBar, setHoveredBar] = useState(null);

  /* Soft green palette: inactive = light sage green, hovered/max = deep teal */
  const SOFT_GREEN = "#b3dbd2";
  const MID_GREEN = "#7bc4b5";
  const DEEP_TEAL = "#0A4D4A";

  const maxVal = Math.max(...mileageData.map((d) => d.mileage));

  const getBarColor = (entry, index) => {
    if (hoveredBar === index) return DEEP_TEAL;
    if (entry.month === "Oct") return DEEP_TEAL;
    return SOFT_GREEN;
  };

  return (
    <div className="bg-[#E0E5EC] neo-extruded rounded-2xl p-6 h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[15px] font-bold text-slate-800">Total Mileage</h3>
        <button className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-[#E0E5EC] neo-inset px-4 py-2 rounded-xl transition-all cursor-pointer">
          <Calendar size={14} className="text-slate-400" />
          <span>{period}</span>
          <ChevronDown size={14} className="text-slate-400" />
        </button>
      </div>

      {/* Chart */}
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={mileageData}
            margin={{ top: 8, right: 8, left: -10, bottom: 0 }}
            onMouseMove={(state) => {
              if (state.isTooltipActive) {
                setHoveredBar(state.activeTooltipIndex);
              } else {
                setHoveredBar(null);
              }
            }}
            onMouseLeave={() => setHoveredBar(null)}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f1f5f9"
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 500 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 11 }}
              tickFormatter={(v) => (v >= 1000 ? `${v / 1000}k` : v)}
              width={40}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(10, 77, 74, 0.04)", radius: 4 }}
              offset={15}
            />
            <Bar dataKey="mileage" radius={[5, 5, 0, 0]} maxBarSize={36}>
              {mileageData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={getBarColor(entry, index)}
                  style={{
                    transition: "fill 0.25s ease, filter 0.25s ease",
                    filter: hoveredBar === index ? "brightness(1.05) drop-shadow(2px 4px 6px rgba(0,0,0,0.15))" : "drop-shadow(2px 4px 6px rgba(0,0,0,0.08))",
                    cursor: "pointer",
                  }}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

