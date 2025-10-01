import { Link, useLocation, useParams } from "react-router-dom";

const Row = ({ label, value }) => (
  <div className="grid grid-cols-[220px_1fr] border-b border-slate-200 last:border-0">
    <div className="px-4 py-3 font-medium text-slate-700">{label}</div>
    <div className="px-4 py-3 bg-white text-slate-900">{value ?? "-"}</div>
  </div>
);

export default function MeterReadingDetails() {
  const { id } = useParams();
  const { state } = useLocation(); // data passed from MeterReading

  if (!state) {
    // Keeping it mock-only: we rely on navigation state.
    return (
      <div className="p-6 space-y-3">
        <div className="text-red-600 font-medium">
          No data found for id: {id}. Please open this page via the Meter Reading list.
        </div>
        <Link
          to="/meter"
          className="inline-flex items-center gap-2 h-9 px-3 rounded-md bg-emerald-600 text-white text-sm hover:bg-emerald-700"
        >
          Back to Meter Reading
        </Link>
      </div>
    );
  }

  const {
    franchise,
    building,
    flat,
    month,
    previousReading,
    currentReading,
    status,
    consumption, // computed and passed from list page
  } = state;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-semibold text-slate-800">Meter Reading Details</h1>
        <Link
          to="/meter"
          className="inline-flex items-center gap-2 h-9 px-3 rounded-md bg-emerald-600 text-white text-sm hover:bg-emerald-700"
        >
          Back to List
        </Link>
      </div>

      {/* Summary banner */}
      <div className="mb-4 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800">
        <div className="font-semibold">
          {franchise} • {building} • {flat}
        </div>
        <div className="text-sm text-slate-600">{month}</div>
      </div>

      {/* Details table (image/table style) */}
      <div className="rounded-xl border border-slate-200 overflow-hidden bg-slate-50">
        <Row label="Franchise:" value={franchise} />
        <Row label="Building:" value={building} />
        <Row label="Flat:" value={flat} />
        <Row label="Month:" value={month} />
        <Row label="Previous Reading:" value={previousReading} />
        <Row label="Current Reading:" value={currentReading === "" ? "-" : currentReading} />
        <Row label="Consumption (Prev + Current):" value={currentReading === "" ? "-" : consumption} />
        <Row label="Status:" value={status} />
        <Row label="Reading ID:" value={id} />
      </div>
    </div>
  );
}
