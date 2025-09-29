import { Link, useLocation, useParams } from "react-router-dom";
import { useMemo } from "react";

function StatusPills({ status }) {
  // Show both pills like your screenshot, with active one highlighted
  const isActive = status === "active";
  const pill = (label, active) => (
    <span
      key={label}
      className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium mr-2 ${
        active
          ? "bg-emerald-100 text-emerald-700"
          : "bg-rose-100 text-rose-700"
      }`}
    >
      {label}
    </span>
  );
  return (
    <div className="flex">
      {pill("Active", isActive)}
      {pill("In Active", !isActive)}
    </div>
  );
}

const Row = ({ label, value }) => (
  <div className="grid grid-cols-[220px_1fr] border-b border-slate-200 last:border-0">
    <div className="px-4 py-3 font-medium text-slate-700">{label}</div>
    <div className="px-4 py-3 bg-white text-slate-900">{value ?? "-"}</div>
  </div>
);

export default function FlatDetailsPage() {
  const { id } = useParams();
  const { state } = useLocation();
  const data = useMemo(() => state ?? null, [state]);

  if (!data) {
    return (
      <div className="p-6 space-y-3">
        <div className="text-red-600 font-medium">
          No data found for id: {id}. Please open this page from the Flat List.
        </div>
        <Link
          to="/flats"
          className="inline-flex items-center gap-2 h-9 px-3 rounded-md bg-emerald-600 text-white text-sm hover:bg-emerald-700"
        >
          Back to Flat List
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-semibold text-slate-800">Flat Details</h1>
        <Link
          to="/flats"
          className="inline-flex items-center gap-2 h-9 px-3 rounded-md bg-emerald-600 text-white text-sm hover:bg-emerald-700"
        >
          Flat List
        </Link>
      </div>

      {/* Two columns like your screenshot */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left card */}
        <div className="rounded-xl border border-slate-200 overflow-hidden bg-slate-50">
          <Row label="Building Name:" value={data.buildingName} />
          <Row label="Flat Name:" value={data.flatName} />
          <Row label="Floor Name:" value={data.floorName} />
          <div className="grid grid-cols-[220px_1fr] border-b border-slate-200">
            <div className="px-4 py-3 font-medium text-slate-700">Status:</div>
            <div className="px-4 py-3 bg-white">
              <StatusPills status={data.status} />
            </div>
          </div>
          <Row label="Owner Name:" value={data.ownerName} />
          <Row label="Owner Contact Number:" value={data.ownerPhone} />
          <Row label="Owner Address:" value={data.ownerAddress} />
          <Row label="Owner NID:" value={data.ownerNid} />
        </div>

        {/* Right card */}
        <div className="rounded-xl border border-slate-200 overflow-hidden bg-slate-50">
          <Row label="Customer Name:" value={data.customerName} />
          <Row label="Renter Name:" value={data.renterName} />
          <Row label="Renter Contact Number:" value={data.renterPhone} />
          <Row label="Renter Address:" value={data.renterAddress} />
          <Row label="Renter NID:" value={data.renterNid} />
        </div>
      </div>
    </div>
  );
}
