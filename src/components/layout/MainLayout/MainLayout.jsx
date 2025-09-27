import { Outlet } from "react-router-dom";
import Sidebar from "../../common/SideBar/Sidebar";
import Header from "../../common/Header/Header";

export default function MainLayout() {
  return (
    <div className="bg-slate-100 min-h-screen">
      {/* Sidebar fixed on left */}
      <Sidebar />

      {/* Right side (Header + Content) */}
      <div className="pl-60"> {/* push right by sidebar width */}
        <Header />

        {/* Page content */}
        <main className="pt-16 p-4">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
