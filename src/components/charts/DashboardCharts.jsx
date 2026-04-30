import React from 'react';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, 
  CartesianGrid, Tooltip, PieChart, Pie, Cell, 
  BarChart, Bar, Legend, RadarChart, PolarGrid, 
  PolarAngleAxis, PolarRadiusAxis, Radar 
} from 'recharts';

const CustomTooltip = ({ active, payload, label, theme }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-obsidian p-4 rounded-2xl border border-[var(--border-primary)] shadow-2xl">
        <p className="text-[10px] font-black text-secondary uppercase tracking-widest mb-2">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></div>
            <p className="text-xs font-bold text-primary uppercase">
              {entry.name}: <span className="text-white">{entry.value}</span>
            </p>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export const LiveSignalChart = ({ data, theme }) => (
  <ResponsiveContainer width="100%" height="100%">
    <AreaChart data={data}>
      <defs>
        <linearGradient id="colorTrips" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" stroke="var(--border-primary)" vertical={false} />
      <XAxis 
        dataKey="time" 
        axisLine={false} 
        tickLine={false} 
        tick={{ fill: 'var(--text-secondary)', fontSize: 10, fontWeight: 800 }}
      />
      <YAxis 
        axisLine={false} 
        tickLine={false} 
        tick={{ fill: 'var(--text-secondary)', fontSize: 10, fontWeight: 800 }}
      />
      <Tooltip content={<CustomTooltip theme={theme} />} />
      <Area 
        type="monotone" 
        dataKey="trips" 
        stroke="#3b82f6" 
        strokeWidth={3}
        fillOpacity={1} 
        fill="url(#colorTrips)" 
        animationDuration={2000}
      />
    </AreaChart>
  </ResponsiveContainer>
);

export const FleetStatusDonut = ({ data }) => {
  // If data is the raw cars array, transform it
  const chartData = Array.isArray(data) && data[0]?.fuelLevel !== undefined ? [
    { name: 'En Route', value: data.filter(c => c.status === 'En Route').length, color: '#3b82f6' },
    { name: 'Idle', value: data.filter(c => c.status === 'Idle').length, color: '#a855f7' },
    { name: 'In Shop', value: data.filter(c => c.status === 'In Shop').length, color: '#ef4444' },
    { name: 'Charging', value: data.filter(c => c.status === 'Charging').length, color: '#10b981' },
  ] : data;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          dataKey="value"
          stroke="none"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend 
          verticalAlign="bottom" 
          height={36} 
          iconType="circle"
          formatter={(value) => <span className="text-[10px] font-black text-secondary uppercase tracking-widest">{value}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export const VehiclesByHubBar = ({ data }) => (
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={data} layout="vertical">
      <CartesianGrid strokeDasharray="3 3" stroke="var(--border-primary)" horizontal={false} />
      <XAxis type="number" hide />
      <YAxis 
        dataKey="name" 
        type="category" 
        axisLine={false} 
        tickLine={false} 
        tick={{ fill: 'var(--text-secondary)', fontSize: 10, fontWeight: 800 }}
        width={100}
      />
      <Tooltip content={<CustomTooltip />} />
      <Bar 
        dataKey="count" 
        fill="#d4af37" 
        radius={[0, 10, 10, 0]} 
        barSize={20}
        animationDuration={1500}
      />
    </BarChart>
  </ResponsiveContainer>
);

export const TripStatusTimeline = ({ data }) => (
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" stroke="var(--border-primary)" vertical={false} />
      <XAxis 
        dataKey="date" 
        axisLine={false} 
        tickLine={false} 
        tick={{ fill: 'var(--text-secondary)', fontSize: 10, fontWeight: 800 }}
      />
      <YAxis 
        axisLine={false} 
        tickLine={false} 
        tick={{ fill: 'var(--text-secondary)', fontSize: 10, fontWeight: 800 }}
      />
      <Tooltip content={<CustomTooltip />} />
      <Legend 
        verticalAlign="top" 
        align="right"
        iconType="circle"
        formatter={(value) => <span className="text-[10px] font-black text-secondary uppercase tracking-widest">{value}</span>}
      />
      <Bar dataKey="active" fill="#3b82f6" radius={[10, 10, 0, 0]} barSize={15} stackId="a" />
      <Bar dataKey="completed" fill="#10b981" radius={[10, 10, 0, 0]} barSize={15} stackId="a" />
    </BarChart>
  </ResponsiveContainer>
);

export const HubPerformanceProfile = ({ data }) => (
  <ResponsiveContainer width="100%" height="100%">
    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
      <PolarGrid stroke="var(--border-primary)" />
      <PolarAngleAxis 
        dataKey="hub" 
        tick={{ fill: 'var(--text-secondary)', fontSize: 10, fontWeight: 800 }}
      />
      <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
      <Radar
        name="Trips"
        dataKey="trips"
        stroke="#d4af37"
        fill="#d4af37"
        fillOpacity={0.6}
        animationDuration={2000}
      />
      <Tooltip content={<CustomTooltip />} />
    </RadarChart>
  </ResponsiveContainer>
);

export const AlertSeverityMix = ({ data }) => (
  <ResponsiveContainer width="100%" height="100%">
    <PieChart>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        labelLine={false}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
        stroke="none"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
      <Tooltip content={<CustomTooltip />} />
      <Legend 
        verticalAlign="bottom" 
        height={36} 
        iconType="circle"
        formatter={(value) => <span className="text-[10px] font-black text-secondary uppercase tracking-widest">{value}</span>}
      />
    </PieChart>
  </ResponsiveContainer>
);


