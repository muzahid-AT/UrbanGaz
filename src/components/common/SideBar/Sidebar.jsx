/* eslint-disable no-unused-vars */
import React, { Suspense } from "react";
import { NavLink } from "react-router-dom";
import {
  DashboardIcon,
  FranchiseIcon,
  BuildingIcon,
  FlatIcon,
  UnitPriceIcon,
  MeterIcon,
  PaymentIcon,
  UsersIcon,
  SettingsIcon,
} from "../../icons/lazyIcons";

const items = [
  { to: "/", label: "Dashboard", icon: DashboardIcon },
  { to: "/franchise", label: "Franchise Management", icon: FranchiseIcon },
  { to: "/buildings", label: "Building Management", icon: BuildingIcon },
  { to: "/flats", label: "Flat Management", icon: FlatIcon },
  { to: "/unit-price", label: "Unit Price Setup", icon: UnitPriceIcon },
  { to: "/meter", label: "Meter Reading", icon: MeterIcon },
  { to: "/payment", label: "Payment", icon: PaymentIcon },
  { to: "/users", label: "User Management", icon: UsersIcon },
  { to: "/settings", label: "Settings", icon: SettingsIcon },
];

export default function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 w-60 bg-slate-900 text-slate-100 z-40">
      <div className="h-16 px-4 flex items-center gap-2 border-b border-slate-800">
        <div className="w-8 h-8 bg-slate-700 rounded" />
        <span className="font-semibold">BrandCrowd</span>
      </div>

      <nav className="p-3 space-y-1">
        {items.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition 
               ${isActive
                 ? "bg-orange-500/20 text-white border border-orange-500/50"
                 : "text-slate-300 hover:text-white hover:bg-white/10"}`
            }
          >
            <Suspense fallback={<span className="w-5 h-5 rounded bg-slate-700/60" />}>
              <Icon className="text-lg" />
            </Suspense>
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
