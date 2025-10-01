import { useState, useRef, useEffect } from "react";
import { FiMenu } from "react-icons/fi";
import { MdLogout } from "react-icons/md";
import { useAuth } from "../../../services/Context/useAuth";
import Profile from "../../../assets/Images/user-1.jpg"


export default function Header({ onMenu }) {
  const { logout,user } = useAuth();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 md:left-80 h-16 z-30
                 bg-white border-b border-slate-200 flex items-center justify-between px-4"
    >
      {/* Left side */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenu}
          className="md:hidden inline-flex items-center justify-center w-10 h-10
                     rounded-lg border border-slate-200 hover:bg-slate-50"
          aria-label="Open menu"
        >
          <FiMenu size={20} />
        </button>
        <span className="font-semibold text-slate-800">Welcome to {user.email}</span>
      </div>

      {/* Right side: Avatar + Dropdown */}
      <div className="relative" ref={dropdownRef}>
        {/* Avatar button */}
        <button
          onClick={() => setOpen(!open)}
          className="w-9 h-9 rounded-full border border-slate-200 bg-slate-50 overflow-hidden"
        >
          {/* fallback initials / image */}
          <img
            src={Profile}
            alt="user avatar"
            className="w-full h-full object-cover"
          />
        </button>

        {/* Dropdown */}
        {open && (
          <div
            className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md border border-slate-200 py-1 z-50"
          >
            <button
              onClick={logout}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-slate-700 hover:bg-red-50 hover:text-red-600"
            >
              <MdLogout size={16} />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
