import React from "react";

// one-liners that code-split the icon packs
export const DashboardIcon = React.lazy(() =>
  import("react-icons/md").then(m => ({ default: m.MdDashboard }))
);

export const FranchiseIcon = React.lazy(() =>
  import("react-icons/fa").then(m => ({ default: m.FaIndustry }))
);

export const BuildingIcon = React.lazy(() =>
  import("react-icons/ri").then(m => ({ default: m.RiBuilding2Fill }))
);

export const FlatIcon = React.lazy(() =>
  import("react-icons/md").then(m => ({ default: m.MdApartment }))
);

export const UnitPriceIcon = React.lazy(() =>
  import("react-icons/ai").then(m => ({ default: m.AiOutlineCalculator }))
);

export const MeterIcon = React.lazy(() =>
  import("react-icons/io5").then(m => ({ default: m.IoSpeedometerOutline }))
);

export const PaymentIcon = React.lazy(() =>
  import("react-icons/fa").then(m => ({ default: m.FaRegMoneyBillAlt }))
);

export const UsersIcon = React.lazy(() =>
  import("react-icons/md").then(m => ({ default: m.MdPeople }))
);

export const SettingsIcon = React.lazy(() =>
  import("react-icons/md").then(m => ({ default: m.MdSettings }))
);
