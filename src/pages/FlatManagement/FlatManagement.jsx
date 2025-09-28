import { GiFlame } from "react-icons/gi";
import { MdVerified, MdPendingActions, MdOutlineBlock } from "react-icons/md";
import KPICard, { KPIGrid } from "../../components/common/kpi/KPICard";
import { Link } from "react-router-dom";
import { FiList } from "react-icons/fi";
function DetailRow({ label, children }) {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-5 md:col-span-5 lg:col-span-5 py-2.5 px-3 font-medium text-slate-700 text-right pr-4">
        {label}:
      </div>
      <div className="col-span-7 md:col-span-7 lg:col-span-7 py-2.5 px-3 border border-slate-200/80 bg-white">
        {children ?? <span className="text-slate-400">—</span>}
      </div>
    </div>
  );
}

/** Small status badge */
function Badge({ tone = "success", children }) {
  const map = {
    success: "bg-green-100 text-green-700",
    danger: "bg-rose-100 text-rose-700",
    info: "bg-blue-100 text-blue-700",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 text-xs font-semibold rounded ${map[tone]}`}>
      {children}
    </span>
  );
}
export default function FlatManagement() {
  
  const flat = {
    buildingName: "Building 1",
    flatName: "F1",
    floorName: "A4",
    status: "Active",
    ownerName: "Uttara",
    ownerPhone: "012345678",
    ownerAddress: "Nikunjo-2, Dhaka-1229",
    ownerNID: "123456789",
  };

  const renter = {
    customerName: "A K M Kalam",
    renterName: "Salman",
    renterPhone: "012345678",
    renterAddress: "Nikunjo-2, Dhaka-1229",
    renterNID: "123456789",
  };
  
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
        <div className="space-y-4">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-slate-800">Flat Details</h1>

        <Link
          to="/flats" // change if your route differs
          className="inline-flex items-center gap-2 rounded-md bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-2"
          title="Back to Flat List"
        >
          <FiList className="text-base" />
          Flat List
        </Link>
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left card – Flat & Owner */}
        <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
          <div className="p-3 border-b border-slate-100">
            <h2 className="text-slate-700 font-semibold">Flat & Owner Info</h2>
          </div>
          <div className="p-3">
            <DetailRow label="Building Name">{flat.buildingName}</DetailRow>
            <DetailRow label="Flat Name">{flat.flatName}</DetailRow>
            <DetailRow label="Floor Name">{flat.floorName}</DetailRow>
            <DetailRow label="Status">
              <div className="flex items-center gap-2">
                <Badge tone="success">Active</Badge>
                <Badge tone="danger">In Active</Badge>
              </div>
            </DetailRow>
            <DetailRow label="Owner Name">{flat.ownerName}</DetailRow>
            <DetailRow label="Owner Contact Number">{flat.ownerPhone}</DetailRow>
            <DetailRow label="Owner Address">{flat.ownerAddress}</DetailRow>
            <DetailRow label="Owner NID">{flat.ownerNID}</DetailRow>
          </div>
        </div>

        {/* Right card – Renter */}
        <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
          <div className="p-3 border-b border-slate-100">
            <h2 className="text-slate-700 font-semibold">Renter Info</h2>
          </div>
          <div className="p-3">
            <DetailRow label="Customer Name">{renter.customerName}</DetailRow>
            <DetailRow label="Renter Name">{renter.renterName}</DetailRow>
            <DetailRow label="Renter Contact Number">{renter.renterPhone}</DetailRow>
            <DetailRow label="Renter Address">{renter.renterAddress}</DetailRow>
            <DetailRow label="Renter NID">{renter.renterNID}</DetailRow>
          </div>
        </div>
      </div>
    </div>
      </div>
    </>
  );
}
