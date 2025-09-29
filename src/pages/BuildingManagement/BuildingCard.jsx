import { FiHome, FiMapPin, FiPhone } from "react-icons/fi";

export default function BuildingCard({ building, onClick }) {
  const b = building;
  return (
    <button
      type="button"
      onClick={() => onClick?.(b)}
      className="w-full text-left rounded-md border border-slate-200 bg-emerald-50 hover:bg-emerald-100 shadow-sm hover:shadow-md transition focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
    >
      {/* header */}
      <div className="px-3 pt-2 flex items-start justify-between">
        <h3 className="font-semibold text-slate-800 flex items-center gap-2">
          <FiHome className="text-emerald-700" /> {b.buildingName}
        </h3>
        <span className="text-xs text-slate-500">{b.franchiseName}</span>
      </div>

      {/* body */}
      <div className="px-3 pb-3 mt-1 space-y-1 text-sm">
        <div className="flex items-start gap-2 text-slate-700">
          <FiMapPin className="mt-0.5 shrink-0 text-slate-500" />
          <span className="leading-snug">{b.address}</span>
        </div>

        <div className="flex items-center justify-between gap-2 text-slate-700">
          <div className="flex items-center gap-1">
            <FiPhone className="shrink-0 text-slate-500" />
            <span className="text-orange-600 font-medium">{b.contactPhone}</span>
          </div>
          <span className="text-slate-600 text-xs">
            Flats: <span className="text-emerald-700 font-medium">{b.numberOfFlats}</span>
          </span>
        </div>
      </div>

      {/* accent bar */}
      <div className="h-1 rounded-b-md bg-emerald-700" />
    </button>
  );
}
