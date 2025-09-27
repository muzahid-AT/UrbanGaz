// src/routes/ProviderWrapper.jsx
import { Outlet } from "react-router-dom";
import { AuthProvider } from "../services/Context/AuthContext";

export default function ProviderWrapper() {
  // Now AuthProvider is INSIDE the Router context
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}
