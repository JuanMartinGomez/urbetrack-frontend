import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Home", icon: "⊞" },
  { to: "/assets", label: "Assets", icon: "🗑" },
  { to: "/incidents", label: "Incidents", icon: "⚠" },
  { to: "/vehicles", label: "Vehicles", icon: "🚛" },
  { to: "/zones", label: "Zones", icon: "📍" },
];

export default function Sidebar() {
  return (
    <aside className="w-56 min-h-screen flex flex-col py-6 px-3 bg-sidebar">
      <div className="mb-8 px-3">
        <span className="text-brand font-bold text-xl tracking-wide">
          urbetrack
        </span>
      </div>
      <nav className="flex flex-col gap-1">
        {links.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-brand text-white"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`
            }
          >
            <span>{icon}</span>
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
