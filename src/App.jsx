import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import TopNavBar from "./components/TopNavBar";
import DashboardView from "./components/views/DashboardView";
import FleetDetailsView from "./components/views/FleetDetailsView";
import DriversView from "./components/views/DriversView";
import TripsView from "./components/views/TripsView";
import InsightsView from "./components/views/InsightsView";
import ReportsView from "./components/views/ReportsView";
import AlertsView from "./components/views/AlertsView";
import DriverDetailView from "./components/views/DriverDetailView";
import CarDetailView from "./components/views/CarDetailView";

// Import initial data
import {
  cars as initialCars,
  drivers as initialDrivers,
  routes as initialTrips,
  alerts as initialAlerts,
  activityLogs as initialLogs
} from "./data/dummyData";

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);

  // Theme state
  const [appTheme, setAppTheme] = useState(() => {
    const saved = localStorage.getItem('fleet-theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  });

  const [mapTheme, setMapTheme] = useState('dark');

  // GLOBAL DATA STATE
  const [fleetCars, setFleetCars] = useState(() => {
    const saved = localStorage.getItem('fleet-cars-v2');
    return saved ? JSON.parse(saved) : initialCars;
  });

  const [fleetDrivers, setFleetDrivers] = useState(() => {
    const saved = localStorage.getItem('fleet-drivers-v2');
    return saved ? JSON.parse(saved) : initialDrivers;
  });

  const [fleetTrips, setFleetTrips] = useState(() => {
    const saved = localStorage.getItem('fleet-trips-v2');
    return saved ? JSON.parse(saved) : initialTrips;
  });

  const [fleetAlerts, setFleetAlerts] = useState(() => {
    const saved = localStorage.getItem('fleet-alerts-v2');
    return saved ? JSON.parse(saved) : initialAlerts;
  });

  const [fleetLogs, setFleetLogs] = useState(() => {
    const saved = localStorage.getItem('fleet-logs-v2');
    return saved ? JSON.parse(saved) : initialLogs;
  });

  // PERSISTENCE
  useEffect(() => {
    localStorage.setItem('fleet-cars-v2', JSON.stringify(fleetCars));
    localStorage.setItem('fleet-drivers-v2', JSON.stringify(fleetDrivers));
    localStorage.setItem('fleet-trips-v2', JSON.stringify(fleetTrips));
    localStorage.setItem('fleet-alerts-v2', JSON.stringify(fleetAlerts));
    localStorage.setItem('fleet-logs-v2', JSON.stringify(fleetLogs));
  }, [fleetCars, fleetDrivers, fleetTrips, fleetAlerts, fleetLogs]);

  // TELEMETRY SIMULATION
  useEffect(() => {
    const interval = setInterval(() => {
      setFleetCars(prev => prev.map(car => {
        if (car.status === 'En Route') {
          const fuelDrop = Math.random() * 0.05;
          const milesInc = Math.random() * 0.1;
          const newFuel = Math.max(0, car.fuelLevel - fuelDrop);

          // Check for critical fuel alert
          if (newFuel < 15 && car.fuelLevel >= 15) {
            const newAlert = {
              id: Date.now(),
              type: 'critical',
              title: 'Low Fuel Warning',
              message: `Asset ${car.id} has breached critical energy reserves (${newFuel.toFixed(1)}%).`,
              time: 'Just now',
              vehicle: car.id
            };
            setFleetAlerts(prevA => [newAlert, ...prevA]);
          }

          return {
            ...car,
            fuelLevel: Number(newFuel.toFixed(2)),
            odometer: `${(parseFloat(car.odometer.replace(',', '')) + milesInc).toFixed(1)} mi`
          };
        }
        return car;
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Theme Sync
  useEffect(() => {
    const root = window.document.documentElement;
    if (appTheme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
    localStorage.setItem('fleet-theme', appTheme);
    setMapTheme(appTheme);
  }, [appTheme]);

  const toggleTheme = () => {
    setAppTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedDriver(null);
    setSelectedCar(null);
  };

  const showDriverDetail = (driver) => {
    setSelectedDriver(driver);
    setSelectedCar(null);
  };

  const showCarDetail = (car) => {
    setSelectedCar(car);
    setSelectedDriver(null);
  };

  const clearSelection = () => {
    setSelectedDriver(null);
    setSelectedCar(null);
  };

  // ACTIONS
  const addLog = (user, action, ref, type = 'status') => {
    const newLog = {
      id: Date.now(),
      category: type === 'alert' ? 'alerted' : 'started',
      avatar: user === 'System' ? null : `https://i.pravatar.cc/150?u=${user}`,
      driver: user,
      message: action,
      time: 'Just now',
      ref: ref
    };
    setFleetLogs(prev => [newLog, ...prev]);
  };

  return (
    <div className="min-h-screen bg-primary font-sans antialiased text-primary selection:bg-gold/30 selection:text-white">
      <div className="grid-bg"></div>
      <div className="aurora-bg"></div>

      <TopNavBar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        appTheme={appTheme}
        onToggleTheme={toggleTheme}
      />

      <main className="max-w-[1800px] mx-auto px-4 lg:px-6 pt-32 pb-12">
        <AnimatePresence mode="wait">
          {!selectedDriver && !selectedCar && (
            <motion.div
              key="header"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-12"
            >
              <h2 className="text-5xl font-luxury tracking-tighter text-primary">
                {activeTab === 'dashboard' && <span className="text-gradient-gold uppercase">Operations Hub</span>}
                {activeTab === 'fleet' && <span className="uppercase tracking-widest">Asset Registry</span>}
                {activeTab === 'drivers' && <span className="uppercase tracking-widest">Personnel Control</span>}
                {activeTab === 'trips' && <span className="uppercase tracking-widest">Trip Center</span>}
                {activeTab === 'insights' && <span className="uppercase tracking-widest">Team Intel</span>}
                {activeTab === 'alerts' && <span className="uppercase tracking-widest">Risk Hub</span>}
                {activeTab === 'reports' && <span className="uppercase tracking-widest">Audit Terminal</span>}
              </h2>
              <div className="h-1 w-24 bg-gold mt-4 rounded-full shadow-[0_0_10px_rgba(212,175,55,0.5)]"></div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedDriver ? 'driver' : selectedCar ? 'car' : activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {selectedDriver ? (
              <DriverDetailView
                driver={selectedDriver}
                cars={fleetCars}
                trips={fleetTrips}
                onBack={clearSelection}
              />
            ) : selectedCar ? (
              <CarDetailView
                car={selectedCar}
                onBack={clearSelection}
              />
            ) : (
              <>
                {activeTab === "dashboard" && (
                  <DashboardView
                    mapTheme={appTheme}
                    cars={fleetCars}
                    drivers={fleetDrivers}
                    trips={fleetTrips}
                    alerts={fleetAlerts}
                    logs={fleetLogs}
                  />
                )}
                {activeTab === "fleet" && (
                  <FleetDetailsView
                    cars={fleetCars}
                    setCars={setFleetCars}
                    addLog={addLog}
                    onSelectCar={showCarDetail}
                  />
                )}
                {activeTab === "drivers" && (
                  <DriversView
                    drivers={fleetDrivers}
                    setDrivers={setFleetDrivers}
                    addLog={addLog}
                    onSelectDriver={showDriverDetail}
                  />
                )}
                {activeTab === "trips" && (
                  <TripsView
                    mapTheme={appTheme}
                    trips={fleetTrips}
                    setTrips={setFleetTrips}
                    cars={fleetCars}
                    setCars={setFleetCars}
                    drivers={fleetDrivers}
                    addLog={addLog}
                    onSelectCar={showCarDetail}
                  />
                )}
                {activeTab === "insights" && <InsightsView />}
                {activeTab === "alerts" && (
                  <AlertsView
                    alerts={fleetAlerts}
                    setAlerts={setFleetAlerts}
                  />
                )}
                {activeTab === "reports" && <ReportsView />}
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

