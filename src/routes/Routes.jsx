import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login/Login";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import MainLayout from "../components/layout/MainLayout/MainLayout";
import PrivateRoute from "./PrivateRoute";

// Pages
import Dashboard from "../pages/Dashboard/Dashboard";
import FranchiseManagement from "../pages/FranchiseManagement/FranchiseManagement";
import BuildingManagement from "../pages/BuildingManagement/BuildingManagement";
import FlatManagement from "../pages/FlatManagement/FlatManagement";
import UnitPriceSetup from "../pages/UnitPriceSetup/UnitPriceSetup";
import MeterReading from "../pages/MeterReading/MeterReading";
import Payment from "../pages/Payment/Payment";
import UserManagement from "../pages/UserManagement/UserManagement";
import Settings from "../pages/Settings/Settings";
import ProviderWrapper from "./ProviderWrapper";

const router = createBrowserRouter([
  {
    element: <ProviderWrapper />,           // AuthProvider is now under Router
    errorElement: <ErrorPage />,
    children: [
      { path: "/login", element: <Login /> },

      // ✅ everything below is protected
      {
        element: <PrivateRoute />,          // gatekeeper
        children: [
          {
            path: "/",
            element: <MainLayout />,        // header + sidebar layout
            children: [
              { index: true, element: <Dashboard /> },
              { path: "franchise", element: <FranchiseManagement /> },
              { path: "buildings", element: <BuildingManagement /> },
              { path: "flats", element: <FlatManagement /> },
              { path: "unit-price", element: <UnitPriceSetup /> },
              { path: "meter", element: <MeterReading /> },
              { path: "payment", element: <Payment /> },
              { path: "users", element: <UserManagement /> },
              { path: "settings", element: <Settings /> },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
