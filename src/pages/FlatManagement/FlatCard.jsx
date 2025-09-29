import { FiHome, FiUser, FiPhone } from "react-icons/fi";

function StatusBadge({ status }) {
  const active = status === "active";
  return (
    <span
      className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium ${
        active
          ? "bg-emerald-100 text-emerald-700"
          : "bg-rose-100 text-rose-700"
      }`}
    >
      {active ? "Active" : "In Active"}
    </span>
  );
}

export default function FlatCard({ flat, onClick }) {
  const f = flat;
  return (
    <button
      type="button"
      onClick={() => onClick?.(f)}
      className="w-full text-left rounded-md border border-slate-200 bg-emerald-50 hover:bg-emerald-100 shadow-sm hover:shadow-md transition focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
    >
      {/* header */}
      <div className="px-3 pt-2 flex items-start justify-between">
        <h3 className="font-semibold text-slate-800 flex items-center gap-2">
          <FiHome className="text-emerald-700" /> {f.flatName}
        </h3>
        <StatusBadge status={f.status} />
      </div>

      {/* body */}
      <div className="px-3 pb-3 mt-1 space-y-1 text-sm text-slate-700">
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Building:</span>
          <span className="font-medium">{f.buildingName}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-600">Floor:</span>
          <span className="font-medium">{f.floorName}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1 text-slate-600">
            <FiUser /> Renter:
          </span>
          <span className="font-medium">{f.renterName}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1 text-slate-600">
            <FiPhone /> Phone:
          </span>
          <span className="font-medium text-orange-600">{f.renterPhone}</span>
        </div>
      </div>

      {/* accent bar */}
      <div className="h-1 rounded-b-md bg-emerald-700" />
    </button>
  );
}
