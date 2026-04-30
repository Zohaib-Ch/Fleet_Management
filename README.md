# FleetOps — Fleet Management Frontend Demo

Frontend-only **React + Vite + TypeScript** application for fleet operations demos.
All data is generated and managed in the browser (seed + local persistence), with simulated API latency for realistic interaction.

---

## 1) Setup and Run

### Install

```bash
npm install
```

### Start development server

```bash
npm run dev
```

### Build and preview

```bash
npm run build
npm run preview
```

### Lint

```bash
npm run lint
```

---

## 2) Local Network Access (LAN)

The app is configured to run on local network devices (same Wi-Fi/LAN):

- `vite.config.ts` includes `server.host: true`
- Start with `npm run dev`
- Use the **Network URL** shown by Vite (for example, `http://192.168.x.x:5173`)
- If prompted, allow Node/Vite through Windows Firewall

---

## 3) Theme, Typography, and Visual System

### Theme system

- Full **Light/Dark** theme toggle in topbar
- Theme stored in `localStorage`
- Automatic initial fallback to system `prefers-color-scheme`

### Typography

- Global font switched to **Manrope** (Google Fonts) for cleaner UI readability

### UI styling system upgrades

- Tailwind CSS v4 integration (`@tailwindcss/vite`)
- Futuristic visual language:
  - glow orbs
  - subtle grid background
  - gradient accents
  - glass-like cards
  - polished shadows
- Enhanced global button system:
  - depth and sheen
  - hover lift / active press states
  - improved focus ring
  - disabled-state consistency

---

## 4) Dashboard (Major Enhancements)

The dashboard was upgraded from a static overview to a configurable analytics surface.

### Core cards

- KPI cards for:
  - vehicles tracked
  - active trips
  - open alerts
  - average health

### Graph visibility controls

Users can show/hide graphs with toggle chips:

- Live signal
- Fleet status
- Vehicles by hub
- Trip status timeline
- Hub performance
- Alert severity mix

### New dashboard filters (multi-selection)

- **Time window:** Last 7 / 14 / 30 days
- **Hub filter:** All hubs + multi-select hub chips
- **Trend metrics:** Multi-select among `trips`, `alerts`, `distance`

All charts react to filter selections.

### Added analytics charts

- **Live signal chart** (trips / alerts / distance)
- **Fleet status donut**
- **Vehicles by hub bar**
- **Trip status timeline** (active vs completed)
- **Hub performance profile** (avg speed, avg distance, trips)
- **Alert severity mix** (critical/warning/info)

### Data quality fixes on charts

- Tooltip/data alignment issues fixed for trip timeline
- Sparse window handling improved with deterministic baseline fill for readability
- Better axis spacing and tooltip labels (`Weekday • Date`)

### Drag-and-drop layout

- Dashboard sections are reorderable with drag handles (using `@dnd-kit`)
- Section order is persisted in `localStorage`

Section IDs:

- `trend`
- `distribution`
- `analytics`
- `activity`

---

## 5) Reports / Insights Page (Major Redesign)

Reports page now behaves like an insights hub with executive dashboard patterns.

### Included sections

- Team-style headline KPI strip
- Board distribution visual
- Fleet velocity chart
- Driver insight cards (workload + cycle + punctuality)
- Activity log feed
- Top completers / punctuality ranking
- Operational cost summary
- Report template export/schedule actions

### Driver insight cards include

- open count
- done this week
- overdue
- cycle time
- 14-day activity sparkline
- status badge

---

## 6) Operations Modules

### Fleet

- Search + filter fleet table
- Add/edit/delete vehicles
- Health bars, status badges, richer row visuals

### Vehicle Profile

- Detailed overview panels
- Driver reassignment
- Trip history
- Maintenance list + completion/edit/remove

### Trips

- Trips list with modern table actions
- Add/edit/delete trip flow
- OSRM route integration
- Trip detail playback controls + map timeline

### Drivers

- Add/edit/delete drivers
- Safety score + incidents
- Reassignment controls

### Alerts

- Filter by status and severity
- Resolve flow
- Severity badge styling + contextual actions

### Login

- Redesigned branded demo login screen
- Visual hero treatment + secure-demo messaging

---

## 7) Activity Log System

A structured activity feed was added and reused across pages.

### Generated event categories

- started
- completed
- created
- resolved
- assigned
- alerted

### Capabilities

- grouped by day
- relative timestamps
- status transition chips
- severity coloring
- reusable feed component (`ActivityFeed`)

---

## 8) Data and Persistence

- Fleet state is persisted in browser storage
- UI preferences persisted:
  - theme
  - dashboard section order
  - dashboard filters
- Demo reset action available to restore seed data

---

## 9) Tech Stack

- **Framework:** React 19 + TypeScript
- **Build tool:** Vite 8
- **Styling:** Tailwind CSS v4 + custom CSS variables
- **Animation:** Framer Motion
- **Charts:** Recharts
- **Maps:** Leaflet + React Leaflet
- **Routing:** React Router v7
- **Utilities:** clsx, tailwind-merge
- **Drag-and-drop:** @dnd-kit/core + sortable + utilities

---

## 10) Mapping and Routing Notes

- Road geometry uses public OSRM (`router.project-osrm.org`)
- Vite proxy for dev via `/osrm` to avoid CORS
- Fallback path logic is used if road fetch fails
- Tiles are from OpenStreetMap-compatible providers

---

## 11) Demo Walkthrough (Suggested)

1. Start at `/login`
2. Go to Dashboard and toggle:
   - dark/light theme
   - graph visibility
   - hub/time filters
3. Drag dashboard sections to reorder
4. Move to Fleet → Vehicle → Trips for operational flow
5. Resolve an alert and observe live count changes
6. Open Reports/Insights for management-level visuals

---

## 12) Current Known Lint Status

Project is lint-clean for new work; one pre-existing warning remains in `ReportsPage` (`react-hooks/exhaustive-deps`).
