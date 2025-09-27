// src/components/layout/MainLayout/MainLayout.jsx
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar, { MobileSidebar } from "../../common/SideBar/Sidebar";
import Header from "../../common/Header/Header";

export default function MainLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const loc = useLocation();

  useEffect(() => setMobileOpen(false), [loc.pathname]);

  return (
    <div className="bg-slate-100 min-h-screen">
      <Sidebar className="hidden md:block" />
      <MobileSidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="md:pl-80">
        <Header onMenu={() => setMobileOpen(true)} />
        <main className="pt-16 p-4">
          <div className="max-w-7xl mx-auto pt-4">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
