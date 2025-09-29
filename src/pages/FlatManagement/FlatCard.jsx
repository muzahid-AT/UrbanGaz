import { FiHome, FiMapPin, FiPhone, FiMoreVertical } from "react-icons/fi";

function StatusBadge({ status }) {
  const active = status === "active" || status === "Active";
  return (
    <span
      className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium ${
        active
          ? "bg-orange-500 text-white"
          : "bg-slate-300 text-slate-700"
      }`}
    >
      {active ? "Active" : "In Active"}
    </span>
  );
}

export default function FlatCard({ flat, onClick }) {
  // expected fields in your mock:
  // buildingName, flatName, ownerName, ownerAddress, ownerPhone, status
  const f = flat;

  return (
    <button
      type="button"
      onClick={() => onClick?.(f)}
      className="w-full text-left rounded-md border border-slate-200 bg-white hover:bg-slate-50 shadow-sm hover:shadow-md transition focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
    >
      <div className="px-3 pt-2 flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-slate-800 flex items-center gap-2">
            <FiHome className="text-emerald-700" /> {f.buildingName}
          </h3>
          <p className="text-slate-600 text-sm">{f.flatName}</p>
        </div>
        <div className="flex items-center gap-1">
          <StatusBadge status={f.status} />
          <FiMoreVertical className="text-slate-400" />
        </div>
      </div>

      <div className="px-3 pb-3 mt-1 space-y-1 text-sm">
        <div className="text-slate-700">
          <span className="font-medium">{f.ownerName}</span>
        </div>

        <div className="flex items-start gap-2 text-slate-700">
          <FiMapPin className="mt-0.5 shrink-0 text-slate-500" />
          <span className="leading-snug">{f.ownerAddress}</span>
        </div>

        <div className="flex items-center justify-between gap-2 text-slate-700">
          <div className="flex items-center gap-1">
            <FiPhone className="shrink-0 text-slate-500" />
            <span className="text-emerald-700 font-medium">{f.ownerPhone}</span>
          </div>
          {f.area && (
            <span className="text-slate-600 text-xs">
              Area: <span className="text-emerald-700 font-medium">{f.area}</span>
            </span>
          )}
        </div>
      </div>

      <div className="h-1 rounded-b-md bg-emerald-700" />
    </button>
  );
}
