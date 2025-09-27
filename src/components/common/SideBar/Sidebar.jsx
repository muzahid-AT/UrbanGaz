/* eslint-disable no-unused-vars */
import { NavLink } from "react-router-dom";
import {
  MdDashboard,
  MdApartment,
  MdPeople,
  MdSettings,
} from "react-icons/md";
import { RiBuilding2Fill } from "react-icons/ri";
import { FaRegMoneyBillAlt, FaIndustry } from "react-icons/fa";
import { AiOutlineCalculator } from "react-icons/ai";
import { IoSpeedometerOutline } from "react-icons/io5";
import { FiX } from "react-icons/fi";
import { useEffect } from "react";

const MENU = [
  { to: "/", label: "Dashboard", icon: MdDashboard },
  { to: "/franchise", label: "Franchise Management", icon: FaIndustry },
  { to: "/buildings", label: "Building Management", icon: RiBuilding2Fill },
  { to: "/flats", label: "Flat Management", icon: MdApartment },
  { to: "/unit-price", label: "Unit Price Setup", icon: AiOutlineCalculator },
  { to: "/meter", label: "Meter Reading", icon: IoSpeedometerOutline },
  { to: "/payment", label: "Payment", icon: FaRegMoneyBillAlt },
  { to: "/users", label: "User Management", icon: MdPeople },
  { to: "/settings", label: "Setting", icon: MdSettings },
];

function Brand({ onClose, showClose = false }) {
  return (
    <div className="relative h-16 px-5 flex items-center justify-between">
      <div className="text-[26px] font-extrabold">
        <span className="text-white">Urban</span>
        <span className="text-orange-500">Gaz</span>
      </div>
      {showClose && (
        <button
          onClick={onClose}
          aria-label="Close menu"
          className="text-slate-300 hover:text-white"
        >
          <FiX size={20} />
        </button>
      )}
    </div>
  );
}

function MenuList({ onItemClick }) {
  return (
    <nav className="flex-1 px-4 pb-6 space-y-3">
      {MENU.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === "/"}
          onClick={onItemClick}
          className={({ isActive }) =>
            [
              "group flex items-center gap-3 px-6 py-3 text-base font-medium",
              "transition-colors",
              isActive
                ? "bg-orange-500 text-white rounded-full"
                : "text-white/90 hover:text-white hover:bg-white/10 rounded-2xl",
            ].join(" ")
          }
        >
          <Icon className="text-lg" />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

/** Desktop Sidebar */
export default function Sidebar({ className = "" }) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 w-80 bg-[#1d2a39] text-white flex flex-col ${className}`}
    >
      <Brand />
      <MenuList />
    </aside>
  );
}

/** Mobile Sidebar */
export function MobileSidebar({ open, onClose }) {
  // prevent body scroll
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = prev);
  }, [open]);

  return (
    <>
      {/* overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/50 z-50 md:hidden transition-opacity
        ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      {/* drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 md:hidden w-80
        bg-[#1d2a39] text-white flex flex-col
        transform transition-transform duration-200
        ${open ? "translate-x-0" : "-translate-x-full"}`}
        aria-hidden={!open}
      >
        <Brand onClose={onClose} showClose />
        <MenuList onItemClick={onClose} />
      </aside>
    </>
  );
}
