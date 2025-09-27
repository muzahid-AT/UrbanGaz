import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import logo from "../../assets/Images/brand-logo.png";
import { useAuth } from "../../services/Context/useAuth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // optional: restore remembered email
  useEffect(() => {
    const saved = localStorage.getItem("remember_email");
    if (saved) { setEmail(saved); setRemember(true); }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // demo credentials; replace with API call
    if (email === "admin@example.com" && pwd === "123456") {
      if (remember) localStorage.setItem("remember_email", email);
      else localStorage.removeItem("remember_email");

      login({ email }); // persisted by context
      const redirectTo = location.state?.from?.pathname || "/";
      navigate(redirectTo, { replace: true });
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="flex justify-center mb-4">
          <img src={logo} alt="Brand" className="h-12" />
        </div>
        <h1 className="text-2xl font-bold text-slate-800 text-center mb-6">Login</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2">{error}</p>}

          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              className="w-full h-11 rounded-lg border border-slate-300 px-3 pr-10 outline-none focus:ring-2 focus:ring-orange-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 1115 0v.75H4.5v-.75z"/></svg>
            </span>
          </div>

          <div className="relative">
            <input
              type={showPwd ? "text" : "password"}
              placeholder="Password"
              className="w-full h-11 rounded-lg border border-slate-300 px-3 pr-10 outline-none focus:ring-2 focus:ring-orange-500"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              required
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPwd((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
              aria-label={showPwd ? "Hide password" : "Show password"}
            >
              {showPwd ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                className="peer sr-only"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <div className="relative w-11 h-6 rounded-full bg-gray-300 transition-colors duration-200 ease-in-out peer-checked:bg-orange-500
                              before:content-[''] before:absolute before:top-0.5 before:left-0.5 before:h-5 before:w-5 before:rounded-full before:bg-white before:shadow before:transition-transform before:duration-200 before:ease-in-out peer-checked:before:translate-x-5" />
              <span className="text-sm text-slate-700">Remember me</span>
            </label>

            <a href="#" className="text-sm text-orange-600 hover:underline">Recover Password</a>
          </div>

          <button type="submit" className="w-full h-11 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold transition">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
