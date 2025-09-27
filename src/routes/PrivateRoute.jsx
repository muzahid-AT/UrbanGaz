import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../services/Context/useAuth";

export default function PrivateRoute() {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return <Outlet />;
}
