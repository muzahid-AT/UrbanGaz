import { GiFlame } from "react-icons/gi";
import { MdVerified, MdPendingActions, MdOutlineBlock } from "react-icons/md";
import KPICard, { KPIGrid } from "../../components/common/kpi/KPICard";
export default function BuildingManagement() {
  return (
    <>
      <div className="space-y-4">
        <KPIGrid>
          <KPICard
            title="Total Franchise"
            value="3344"
            icon={GiFlame}
            iconBg="from-rose-500 to-orange-500"
          />
          <KPICard
            title="Active Project"
            value="3344"
            icon={MdVerified}
            iconBg="from-emerald-500 to-green-600"
          />
          <KPICard
            title="Pending Project"
            value="120"
            icon={MdPendingActions}
            iconBg="from-yellow-400 to-amber-500"
          />
          <KPICard
            title="Inactive Project"
            value="87"
            icon={MdOutlineBlock}
            iconBg="from-slate-500 to-gray-700"
          />
        </KPIGrid>
      </div>
      <div className="p-6 bg-white rounded-xl shadow mt-4">
        <h1 className="text-2xl font-bold mb-2">Building Management</h1>
        <p className="text-slate-600">
          Manage buildings, assign flats, and track building details here.
        </p>
      </div>
    </>
  );
}
