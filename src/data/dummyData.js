export const drivers = [
  {
    id: 1,
    name: "Abdullah Ali",
    role: "Senior Driver",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    tripsThisWeek: 33,
    onTimeRate: 100,
    milesDriven: 450,
    statusCounts: { completed: 25, driving: 6, delayed: 2 },
    email: "abdullah.ali@fleetops.com",
    phone: "+1 (555) 123-4567",
    license: "DL-45920-X",
    joinedDate: "Mar 2021",
    rating: 4.9,
    currentLocation: [34.03, -118.35],
    activeRouteId: 1,
    recentTrips: [
      { id: 'T1', route: "Downtown Hub → Santa Monica", date: "Today, 10:30 AM", status: "Completed", distance: "14.2 mi", path: [[34.0522, -118.2437], [34.0195, -118.4912]] },
      { id: 'T2', route: "LAX → Beverly Hills", date: "Yesterday, 2:15 PM", status: "Completed", distance: "11.8 mi", path: [[33.9416, -118.4085], [34.0736, -118.4004]] },
    ]
  },
  {
    id: 2,
    name: "Sara Smith",
    role: "Route Specialist",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
    tripsThisWeek: 28,
    onTimeRate: 92,
    milesDriven: 380,
    statusCounts: { completed: 20, driving: 5, delayed: 3 },
    email: "sara.smith@fleetops.com",
    phone: "+1 (555) 987-6543",
    license: "DL-11223-Y",
    joinedDate: "Jan 2022",
    rating: 4.7,
    currentLocation: [34.0195, -118.4912],
    activeRouteId: 2,
    recentTrips: [
      { id: 'T4', route: "Santa Monica → Downtown Hub", date: "Today, 11:45 AM", status: "Delayed", distance: "14.5 mi", path: [[34.0195, -118.4912], [34.0522, -118.2437]] },
    ]
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Tactical Lead",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    tripsThisWeek: 41,
    onTimeRate: 98,
    milesDriven: 520,
    statusCounts: { completed: 35, driving: 5, delayed: 1 },
    email: "michael.chen@fleetops.com",
    phone: "+1 (555) 246-8101",
    license: "DL-88776-Z",
    joinedDate: "Jul 2020",
    rating: 4.8,
    currentLocation: [34.16, -118.22],
    activeRouteId: 3,
    recentTrips: [
      { id: 'T6', route: "Burbank → Pasadena", date: "Today, 8:30 AM", status: "Completed", distance: "8.7 mi", path: [[34.1808, -118.3090], [34.1478, -118.1445]] },
    ]
  },
  {
    id: 4,
    name: "Emma Davis",
    role: "Logistics Expert",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200",
    tripsThisWeek: 19,
    onTimeRate: 100,
    milesDriven: 310,
    statusCounts: { completed: 15, driving: 4, delayed: 0 },
    email: "emma.davis@fleetops.com",
    phone: "+1 (555) 135-7924",
    license: "DL-55443-W",
    joinedDate: "Oct 2021",
    rating: 5.0,
    currentLocation: [34.08, -118.26],
    activeRouteId: null,
    recentTrips: []
  },
  {
    id: 5,
    name: "James Wilson",
    role: "Senior Driver",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
    tripsThisWeek: 35,
    onTimeRate: 97,
    milesDriven: 410,
    statusCounts: { completed: 30, driving: 4, delayed: 1 },
    email: "james.wilson@fleetops.com",
    phone: "+1 (555) 222-3333",
    license: "DL-99887-A",
    joinedDate: "May 2019",
    rating: 4.8,
    currentLocation: [34.05, -118.24],
    activeRouteId: null,
    recentTrips: []
  },
  {
    id: 6,
    name: "Sofia Rodriguez",
    role: "Route Specialist",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
    tripsThisWeek: 22,
    onTimeRate: 99,
    milesDriven: 290,
    statusCounts: { completed: 20, driving: 2, delayed: 0 },
    email: "sofia.r@fleetops.com",
    phone: "+1 (555) 444-5555",
    license: "DL-77665-B",
    joinedDate: "Dec 2022",
    rating: 4.9,
    currentLocation: [33.94, -118.40],
    activeRouteId: null,
    recentTrips: []
  },
  {
    id: 7,
    name: "David Park",
    role: "Driver",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200",
    tripsThisWeek: 45,
    onTimeRate: 95,
    milesDriven: 600,
    statusCounts: { completed: 40, driving: 4, delayed: 1 },
    email: "david.park@fleetops.com",
    phone: "+1 (555) 777-8888",
    license: "DL-33445-C",
    joinedDate: "Jan 2020",
    rating: 4.6,
    currentLocation: [34.14, -118.14],
    activeRouteId: null,
    recentTrips: []
  },
  {
    id: 8,
    name: "Olivia Thompson",
    role: "Tactical Lead",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200",
    tripsThisWeek: 12,
    onTimeRate: 100,
    milesDriven: 150,
    statusCounts: { completed: 10, driving: 2, delayed: 0 },
    email: "olivia.t@fleetops.com",
    phone: "+1 (555) 999-0000",
    license: "DL-11002-D",
    joinedDate: "Jun 2023",
    rating: 5.0,
    currentLocation: [34.02, -118.49],
    activeRouteId: null,
    recentTrips: []
  },
];

export const cars = [
  {
    id: "ZT41 LCS",
    model: "Rolls-Royce Cullinan",
    image: "https://images.unsplash.com/photo-1631214503951-375126d296e9?auto=format&fit=crop&q=80&w=1000",
    year: 2024,
    driver: "Abdullah Ali",
    fuelLevel: 85,
    status: "En Route",
    vin: "RR1CULL77XP001",
    purchaseDate: "Jan 12, 2024",
    lastService: "Apr 10, 2026",
    nextService: "Oct 10, 2026",
    odometer: "2,500 mi",
    currentLocation: [34.03, -118.35],
    activeRoute: { id: 1, name: "Downtown Hub → Santa Monica", path: [[34.0522, -118.2437], [34.03, -118.35], [34.0195, -118.4912]] },
    maintenanceHistory: [
      { id: 'M1', type: "Bespoke Inspection", date: "Apr 10, 2026", cost: "$1,200.00", status: "Completed" },
    ]
  },
  {
    id: "VX22 KPO",
    model: "Bentley Bentayga",
    image: "https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&q=80&w=1000",
    year: 2023,
    driver: "Sara Smith",
    fuelLevel: 42,
    status: "Idle",
    vin: "BB9BENTA22L004",
    purchaseDate: "May 22, 2023",
    lastService: "Feb 15, 2026",
    nextService: "Aug 15, 2026",
    odometer: "8,200 mi",
    currentLocation: [34.0195, -118.4912],
    maintenanceHistory: []
  },
  {
    id: "AB12 CDE",
    model: "Range Rover Autobiography",
    image: "https://images.unsplash.com/photo-1606152424101-ad2f91cb55ea?auto=format&fit=crop&q=80&w=1000",
    year: 2024,
    driver: "Michael Chen",
    fuelLevel: 91,
    status: "En Route",
    vin: "LR4RRAB99M002",
    purchaseDate: "Nov 05, 2023",
    lastService: "Dec 01, 2025",
    nextService: "Jun 01, 2026",
    odometer: "1,100 mi",
    currentLocation: [34.16, -118.22],
    activeRoute: { id: 3, name: "Pasadena → Burbank", path: [[34.1478, -118.1445], [34.16, -118.22], [34.1808, -118.3090]] },
    maintenanceHistory: []
  },
  {
    id: "GH34 QWE",
    model: "Mercedes-Maybach GLS",
    image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&q=80&w=1000",
    year: 2023,
    driver: "James Wilson",
    fuelLevel: 75,
    status: "Idle",
    vin: "W1YMAYB600L123",
    purchaseDate: "Feb 20, 2023",
    lastService: "Apr 28, 2026",
    nextService: "Oct 28, 2026",
    odometer: "12,900 mi",
    currentLocation: [34.05, -118.24],
    maintenanceHistory: []
  },
  {
    id: "MN56 RTY",
    model: "Lamborghini Urus",
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=1000",
    year: 2024,
    driver: "Emma Davis",
    fuelLevel: 67,
    status: "En Route",
    vin: "ZHWURUS400X99",
    purchaseDate: "Aug 14, 2023",
    lastService: "Mar 10, 2026",
    nextService: "Sep 10, 2026",
    odometer: "3,800 mi",
    currentLocation: [34.08, -118.26],
    activeRoute: { id: 4, name: "Echo Park → Silver Lake", path: [[34.0772, -118.2571], [34.08, -118.26], [34.0869, -118.2702]] },
    maintenanceHistory: []
  },
  {
    id: "KL89 VBN",
    model: "Aston Martin DBX",
    image: "https://images.unsplash.com/photo-1619330086393-27e65f333333?auto=format&fit=crop&q=80&w=1000",
    year: 2023,
    driver: "Sofia Rodriguez",
    fuelLevel: 88,
    status: "En Route",
    vin: "AMDBX707XP112",
    purchaseDate: "Sep 30, 2023",
    lastService: "Mar 20, 2026",
    nextService: "Sep 20, 2026",
    odometer: "5,500 mi",
    currentLocation: [33.94, -118.40],
    activeRoute: { id: 2, name: "LAX → Beverly Hills", path: [[33.9416, -118.4085], [33.94, -118.40], [34.0736, -118.4004]] },
    maintenanceHistory: []
  },
  {
    id: "XY12 ZZZ",
    model: "Porsche Cayenne Turbo",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1000",
    year: 2022,
    driver: "David Park",
    fuelLevel: 95,
    status: "Idle",
    vin: "WP1CAY911L007",
    purchaseDate: "Oct 15, 2022",
    lastService: "May 01, 2026",
    nextService: "Nov 01, 2026",
    odometer: "18,400 mi",
    currentLocation: [34.14, -118.14],
    maintenanceHistory: []
  },
  {
    id: "VIP-001",
    model: "Ferrari Purosangue",
    image: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&q=80&w=1000",
    year: 2024,
    driver: "Olivia Thompson",
    fuelLevel: 100,
    status: "Idle",
    vin: "ZFFPUR001S001",
    purchaseDate: "Jan 01, 2024",
    lastService: "Never",
    nextService: "Jan 01, 2027",
    odometer: "120 mi",
    currentLocation: [34.02, -118.49],
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
    carId: "KL89 VBN",
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
  },
  {
    id: 4,
    name: "Echo Park → Silver Lake",
    distance: "3.2 mi",
    eta: "10 mins",
    progress: 45,
    status: "On Time",
    carId: "MN56 RTY",
    path: [[34.0772, -118.2571], [34.0869, -118.2702]]
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
    title: "V-Max Threshold Breach",
    message: "Vehicle VIP-001 (Olivia Thompson) exceeded 140mph on I-10.",
    time: "2 mins ago",
    vehicle: "VIP-001"
  },
  {
    id: 2,
    type: "warning",
    title: "Proximity Warning",
    message: "Vehicle VX22 KPO (Sara Smith) detected object within 2ft perimeter.",
    time: "15 mins ago",
    vehicle: "VX22 KPO"
  },
  {
    id: 3,
    type: "info",
    title: "Pre-Flight Check Due",
    message: "Vehicle GH34 QWE is scheduled for a deep diagnostic in 6 hours.",
    time: "1 hour ago",
    vehicle: "GH34 QWE"
  },
  {
    id: 4,
    type: "critical",
    title: "Telematics Lost",
    message: "Signal drop detected on MN56 RTY. Last known location: Silver Lake.",
    time: "2 hours ago",
    vehicle: "MN56 RTY"
  }
];

export const activityLogs = [
  {
    id: 1,
    category: "started",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    driver: "Abdullah",
    message: "initiated mission ALPHA-9 Downtown Deployment",
    time: "5 mins ago",
    ref: "MISSION_HUB_102"
  },
  {
    id: 2,
    category: "alerted",
    avatar: null,
    driver: "System",
    message: "flagged Olivia's Ferrari for Speeding (142mph)",
    time: "12 mins ago",
    ref: "ALERT_SPD_004"
  },
  {
    id: 3,
    category: "resolved",
    avatar: null,
    driver: "Control",
    message: "Vehicle AB12 brake system recalibration completed",
    time: "1 hour ago",
    ref: "MAINT_FIN_221"
  },
  {
    id: 4,
    category: "completed",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    driver: "Michael",
    message: "safely arrived at Pasadena Tactical Hub",
    time: "3 hours ago",
    ref: "MISSION_FIN_098"
  },
  {
    id: 5,
    category: "assigned",
    avatar: null,
    driver: "Admin",
    message: "promoted James Wilson to Senior Deployment Lead",
    time: "Yesterday, 04:30 PM",
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
  { name: 'Active Duty', value: 185, color: '#3b82f6' },
  { name: 'Reserve', value: 92, color: '#d4af37' },
  { name: 'Maintenance', value: 15, color: '#ef4444' },
  { name: 'Eco-Mode', value: 45, color: '#10b981' },
];

export const vehiclesByHubData = [
  { name: 'Downtown', count: 95 },
  { name: 'Santa Monica', count: 58 },
  { name: 'LAX', count: 72 },
  { name: 'Pasadena', count: 44 },
  { name: 'Burbank', count: 32 },
];

export const tripStatusTimelineData = Array.from({ length: 7 }).map((_, i) => ({
  date: `Apr ${24 + i}`,
  active: Math.floor(Math.random() * 100) + 180,
  completed: Math.floor(Math.random() * 80) + 140,
}));

export const hubPerformanceData = [
  { hub: 'Downtown', speed: 28, distance: 850, trips: 220 },
  { hub: 'Santa Monica', speed: 22, distance: 580, trips: 145 },
  { hub: 'LAX', speed: 32, distance: 920, trips: 280 },
  { hub: 'Pasadena', speed: 25, distance: 610, trips: 155 },
];

export const alertSeverityData = [
  { name: 'Critical', value: 8, color: '#ef4444' },
  { name: 'Warning', value: 22, color: '#f59e0b' },
  { name: 'Tactical', value: 55, color: '#3b82f6' },
];
