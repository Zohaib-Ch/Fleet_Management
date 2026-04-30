export const drivers = [
  {
    id: 1,
    name: "Abdullah Ali",
    role: "Senior Driver",
    avatar: "https://i.pravatar.cc/150?u=abdullah",
    tripsThisWeek: 33,
    onTimeRate: 100,
    milesDriven: 450,
    statusCounts: { completed: 25, driving: 6, delayed: 2 },
    email: "abdullah.ali@fleetops.com",
    phone: "+1 (555) 123-4567",
    license: "DL-45920-X",
    joinedDate: "Mar 2021",
    rating: 4.9,
    currentLocation: [34.03, -118.35], // Near Mid-City
    activeRouteId: 1,
    recentTrips: [
      { id: 'T1', route: "Downtown Hub → Santa Monica", date: "Today, 10:30 AM", status: "Completed", distance: "14.2 mi", path: [[34.0522, -118.2437], [34.0195, -118.4912]] },
      { id: 'T2', route: "LAX → Beverly Hills", date: "Yesterday, 2:15 PM", status: "Completed", distance: "11.8 mi", path: [[33.9416, -118.4085], [34.0736, -118.4004]] },
      { id: 'T3', route: "Pasadena → Burbank", date: "Yesterday, 9:00 AM", status: "Completed", distance: "8.5 mi", path: [[34.1478, -118.1445], [34.1808, -118.3090]] },
    ]
  },
  {
    id: 2,
    name: "Sara Smith",
    role: "Route Specialist",
    avatar: "https://i.pravatar.cc/150?u=sara",
    tripsThisWeek: 28,
    onTimeRate: 92,
    milesDriven: 380,
    statusCounts: { completed: 20, driving: 5, delayed: 3 },
    email: "sara.smith@fleetops.com",
    phone: "+1 (555) 987-6543",
    license: "DL-11223-Y",
    joinedDate: "Jan 2022",
    rating: 4.7,
    currentLocation: [34.0195, -118.4912], // Santa Monica
    activeRouteId: 2,
    recentTrips: [
      { id: 'T4', route: "Santa Monica → Downtown Hub", date: "Today, 11:45 AM", status: "Delayed", distance: "14.5 mi", path: [[34.0195, -118.4912], [34.0522, -118.2437]] },
      { id: 'T5', route: "Hollywood → Long Beach", date: "Yesterday, 4:00 PM", status: "Completed", distance: "24.1 mi", path: [[34.0928, -118.3287], [33.7701, -118.1937]] },
    ]
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Driver",
    avatar: "https://i.pravatar.cc/150?u=michael",
    tripsThisWeek: 41,
    onTimeRate: 98,
    milesDriven: 520,
    statusCounts: { completed: 35, driving: 5, delayed: 1 },
    email: "michael.chen@fleetops.com",
    phone: "+1 (555) 246-8101",
    license: "DL-88776-Z",
    joinedDate: "Jul 2020",
    rating: 4.8,
    currentLocation: [34.16, -118.22], // Near Glendale
    activeRouteId: 3,
    recentTrips: [
      { id: 'T6', route: "Burbank → Pasadena", date: "Today, 8:30 AM", status: "Completed", distance: "8.7 mi", path: [[34.1808, -118.3090], [34.1478, -118.1445]] },
    ]
  },
  {
    id: 4,
    name: "Emma Davis",
    role: "Night Shift Lead",
    avatar: "https://i.pravatar.cc/150?u=emma",
    tripsThisWeek: 19,
    onTimeRate: 100,
    milesDriven: 310,
    statusCounts: { completed: 15, driving: 4, delayed: 0 },
    email: "emma.davis@fleetops.com",
    phone: "+1 (555) 135-7924",
    license: "DL-55443-W",
    joinedDate: "Oct 2021",
    rating: 5.0,
    currentLocation: [34.08, -118.26], // Echo Park
    activeRouteId: null,
    recentTrips: [
      { id: 'T7', route: "Echo Park → Silver Lake", date: "Last Night, 11:30 PM", status: "Completed", distance: "3.2 mi", path: [[34.0772, -118.2571], [34.0869, -118.2702]] },
    ]
  },
];

export const cars = [
  {
    id: "ZT41 LCS",
    model: "Ford Transit",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=1000",
    year: 2022,
    driver: "Abdullah Ali",
    fuelLevel: 85,
    status: "En Route",
    vin: "1FDUF5GTXNCA12345",
    purchaseDate: "Jan 12, 2022",
    lastService: "Apr 10, 2026",
    nextService: "Oct 10, 2026",
    odometer: "24,500 mi",
    currentLocation: [34.03, -118.35],
    activeRoute: { id: 1, name: "Downtown Hub → Santa Monica", path: [[34.0522, -118.2437], [34.03, -118.35], [34.0195, -118.4912]] },
    maintenanceHistory: [
      { id: 'M1', type: "Oil Change", date: "Apr 10, 2026", cost: "$85.00", status: "Completed" },
      { id: 'M2', type: "Tire Rotation", date: "Oct 15, 2025", cost: "$40.00", status: "Completed" },
      { id: 'M3', type: "Brake Pad Replacement", date: "Jun 20, 2025", cost: "$220.00", status: "Completed" },
    ]
  },
  {
    id: "VX22 KPO",
    model: "Mercedes Sprinter",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000",
    year: 2023,
    driver: "Sara Smith",
    fuelLevel: 42,
    status: "Idle",
    vin: "W1Y4ED5A9PA678901",
    purchaseDate: "May 22, 2023",
    lastService: "Feb 15, 2026",
    nextService: "Aug 15, 2026",
    odometer: "12,200 mi",
    currentLocation: [34.0195, -118.4912],
    maintenanceHistory: [
      { id: 'M4', type: "Annual Inspection", date: "Feb 15, 2026", cost: "$150.00", status: "Completed" },
    ]
  },
  {
    id: "AB12 CDE",
    model: "Audi A6 Avant",
    image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=1000",
    year: 2021,
    driver: "Michael Chen",
    fuelLevel: 91,
    status: "En Route",
    vin: "WA1BFAFC2LA112233",
    purchaseDate: "Nov 05, 2021",
    lastService: "Dec 01, 2025",
    nextService: "Jun 01, 2026",
    odometer: "35,100 mi",
    currentLocation: [34.16, -118.22],
    activeRoute: { id: 3, name: "Pasadena → Burbank", path: [[34.1478, -118.1445], [34.16, -118.22], [34.1808, -118.3090]] },
    maintenanceHistory: [
      { id: 'M5', type: "Battery Replacement", date: "Dec 01, 2025", cost: "$310.00", status: "Completed" },
    ]
  },
  {
    id: "GH34 QWE",
    model: "Ford Transit",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=1000",
    year: 2022,
    driver: "Unassigned",
    fuelLevel: 12,
    status: "In Shop",
    vin: "1FDUF5GTXNCA55667",
    purchaseDate: "Feb 20, 2022",
    lastService: "Apr 28, 2026",
    nextService: "Ongoing",
    odometer: "28,900 mi",
    currentLocation: [34.1478, -118.1445],
    maintenanceHistory: [
      { id: 'M6', type: "Engine Diagnostic", date: "Apr 28, 2026", cost: "$120.00", status: "In Progress" },
    ]
  },
  {
    id: "MN56 RTY",
    model: "Volkswagen Crafter",
    image: "https://images.unsplash.com/photo-1511119255263-631169722340?auto=format&fit=crop&q=80&w=1000",
    year: 2023,
    driver: "Emma Davis",
    fuelLevel: 67,
    status: "En Route",
    vin: "WV1ZZZSYZPA112233",
    purchaseDate: "Aug 14, 2023",
    lastService: "Mar 10, 2026",
    nextService: "Sep 10, 2026",
    odometer: "9,800 mi",
    currentLocation: [34.08, -118.26],
    activeRoute: { id: 4, name: "Echo Park → Silver Lake", path: [[34.0772, -118.2571], [34.08, -118.26], [34.0869, -118.2702]] },
    maintenanceHistory: []
  },
  {
    id: "KL89 VBN",
    model: "Mercedes Sprinter",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000",
    year: 2023,
    driver: "Unassigned",
    fuelLevel: 100,
    status: "Idle",
    vin: "W1Y4ED5A9PA112233",
    purchaseDate: "Sep 30, 2023",
    lastService: "Mar 20, 2026",
    nextService: "Sep 20, 2026",
    odometer: "7,500 mi",
    currentLocation: [33.9416, -118.4085],
    maintenanceHistory: []
  },
];

export const routes = [
  {
    id: 1,
    name: "Downtown Hub → Santa Monica",
    distance: "14.2 mi",
    eta: "25 mins",
    progress: 65,
    status: "On Time",
    carId: "ZT41 LCS",
    path: [[34.0522, -118.2437], [34.0195, -118.4912]]
  },
  {
    id: 2,
    name: "LAX → Beverly Hills",
    distance: "11.8 mi",
    eta: "40 mins",
    progress: 30,
    status: "Delayed",
    carId: "VX22 KPO",
    path: [[33.9416, -118.4085], [34.0736, -118.4004]]
  },
  {
    id: 3,
    name: "Pasadena → Burbank",
    distance: "8.5 mi",
    eta: "15 mins",
    progress: 80,
    status: "On Time",
    carId: "AB12 CDE",
    path: [[34.1478, -118.1445], [34.1808, -118.3090]]
  }
];

export const fleetVelocityData = Array.from({ length: 30 }).map((_, i) => ({
  day: `Day ${i + 1}`,
  miles: Math.floor(Math.random() * 2000) + 3000,
}));

export const alerts = [
  {
    id: 1,
    type: "critical",
    title: "High Speed Detected",
    message: "Vehicle AB12 CDE (Michael Chen) is traveling at 85mph in a 65mph zone.",
    time: "5 mins ago",
    vehicle: "AB12 CDE"
  },
  {
    id: 2,
    type: "warning",
    title: "Low Fuel Level",
    message: "Vehicle GH34 QWE is at 12% fuel. Nearest station is 2.4 miles away.",
    time: "12 mins ago",
    vehicle: "GH34 QWE"
  },
  {
    id: 3,
    type: "info",
    title: "Maintenance Due",
    message: "Vehicle VX22 KPO is scheduled for service in 2 days.",
    time: "45 mins ago",
    vehicle: "VX22 KPO"
  },
  {
    id: 4,
    type: "critical",
    title: "Engine Overheat",
    message: "Sensor alert: Engine temperature rising rapidly on MN56 RTY.",
    time: "1 hour ago",
    vehicle: "MN56 RTY"
  }
];

export const activityLogs = [
  {
    id: 1,
    category: "started",
    avatar: "https://i.pravatar.cc/150?u=abdullah",
    driver: "Abdullah",
    message: "moved vehicle ZT41 from Idle to En Route",
    time: "2 hours ago",
    ref: "MISSION_HUB_102"
  },
  {
    id: 2,
    category: "alerted",
    avatar: null,
    driver: "System",
    message: "flagged Michael's Audi for Speeding (85mph)",
    time: "3 hours ago",
    ref: "ALERT_SPD_004"
  },
  {
    id: 3,
    category: "resolved",
    avatar: null,
    driver: "Control",
    message: "Vehicle GH34 maintenance cycle completed and verified",
    time: "5 hours ago",
    ref: "MAINT_FIN_221"
  },
  {
    id: 4,
    category: "completed",
    avatar: "https://i.pravatar.cc/150?u=michael",
    driver: "Michael",
    message: "successfully arrived at destination Pasadena Hub",
    time: "6 hours ago",
    ref: "MISSION_FIN_098"
  },
  {
    id: 5,
    category: "assigned",
    avatar: null,
    driver: "Admin",
    message: "assigned Emma Davis to Night Shift Lead role",
    time: "Yesterday, 11:30 PM",
    ref: "PERSONNEL_UPD_11"
  }
];
export const hubs = [
  { id: 'h1', name: 'Downtown Hub', location: [34.0522, -118.2437] },
  { id: 'h2', name: 'Santa Monica Hub', location: [34.0195, -118.4912] },
  { id: 'h3', name: 'LAX Hub', location: [33.9416, -118.4085] },
  { id: 'h4', name: 'Pasadena Hub', location: [34.1478, -118.1445] },
];

export const liveSignalData = Array.from({ length: 24 }).map((_, i) => ({
  time: `${i}:00`,
  trips: Math.floor(Math.random() * 50) + 20,
  alerts: Math.floor(Math.random() * 10),
  distance: Math.floor(Math.random() * 500) + 200,
}));

export const fleetStatusData = [
  { name: 'En Route', value: 142, color: '#3b82f6' },
  { name: 'Idle', value: 64, color: '#d4af37' },
  { name: 'In Shop', value: 24, color: '#ef4444' },
  { name: 'Charging', value: 18, color: '#10b981' },
];

export const vehiclesByHubData = [
  { name: 'Downtown', count: 85 },
  { name: 'Santa Monica', count: 42 },
  { name: 'LAX', count: 68 },
  { name: 'Pasadena', count: 35 },
  { name: 'Burbank', count: 28 },
];

export const tripStatusTimelineData = Array.from({ length: 7 }).map((_, i) => ({
  date: `Apr ${24 + i}`,
  active: Math.floor(Math.random() * 100) + 150,
  completed: Math.floor(Math.random() * 80) + 120,
}));

export const hubPerformanceData = [
  { hub: 'Downtown', speed: 22, distance: 450, trips: 120 },
  { hub: 'Santa Monica', speed: 18, distance: 380, trips: 85 },
  { hub: 'LAX', speed: 25, distance: 520, trips: 140 },
  { hub: 'Pasadena', speed: 20, distance: 410, trips: 95 },
];

export const alertSeverityData = [
  { name: 'Critical', value: 12, color: '#ef4444' },
  { name: 'Warning', value: 28, color: '#f59e0b' },
  { name: 'Info', value: 45, color: '#3b82f6' },
];
