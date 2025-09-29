import { Link, useLocation, useParams } from "react-router-dom";
import { useMemo } from "react";

export default function BuildingDetailsPage() {
  const { id } = useParams();
  const { state } = useLocation(); // data passed from BuildingCard
  const data = useMemo(() => state ?? null, [state]);

  if (!data) {
    return (
      <div className="p-6 space-y-3">
        <div className="text-red-600 font-medium">
          No data found for id: {id}. Please open this page from the Building List.
        </div>
        <Link
          to="/buildings"
          className="inline-flex items-center gap-2 h-9 px-3 rounded-md bg-emerald-600 text-white text-sm hover:bg-emerald-700"
        >
          Back to Building List
        </Link>
      </div>
    );
  }

  const Row = ({ label, value }) => (
    <div className="grid grid-cols-[220px_1fr] border-b border-slate-200 last:border-0">
      <div className="px-4 py-3 font-medium text-slate-700">{label}</div>
      <div className="px-4 py-3 bg-white text-slate-900">{value ?? "-"}</div>
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-semibold text-slate-800">Building Details</h1>
        <Link
          to="/buildings"
          className="inline-flex items-center gap-2 h-9 px-3 rounded-md bg-emerald-600 text-white text-sm hover:bg-emerald-700"
        >
          Building List
        </Link>
      </div>

      <div className="rounded-xl border border-slate-200 overflow-hidden bg-slate-50">
        <Row label="Franchise Name:" value={data.franchiseName} />
        <Row label="Building Name:" value={data.buildingName} />
        <Row label="Address:" value={data.address} />
        <Row label="District:" value={data.district} />
        <Row label="Area:" value={data.area} />
        <Row label="Number Of Flats:" value={data.numberOfFlats} />
        <Row label="Contact Person Name:" value={data.contactName} />
        <Row label="Contact Person Phone:" value={data.contactPhone} />
        <Row label="Note:" value={data.note} />
      </div>
    </div>
  );
}
