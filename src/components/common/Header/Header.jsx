import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../services/Context/useAuth";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="fixed top-0 left-60 right-0 h-16 bg-white border-b border-slate-200 z-30 flex items-center justify-between px-4">
      <div className="font-semibold text-slate-800">
        {user ? `Welcome, ${user.email}` : "Dashboard"}
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={handleLogout}
          className="px-3 h-9 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-sm"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
