import { useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

/* ============================
   MOCK DATA (includes month)
   ============================ */
const mockReadings = [
  { id: 1, franchise: "Franchise 1", building: "Building 1", flat: "A-101", previousReading: 550, currentReading: 1,   status: "Submitted", month: "Jan 2025" },
  { id: 2, franchise: "Franchise 1", building: "Building 1", flat: "A-102", previousReading: 620, currentReading: "",  status: "Pending",   month: "Jan 2025" },
  { id: 3, franchise: "Franchise 2", building: "Building 3", flat: "B-201", previousReading: 410, currentReading: "",  status: "Pending",   month: "Feb 2025" },
  { id: 4, franchise: "Franchise 2", building: "Building 2", flat: "B-202", previousReading: 735, currentReading: 740, status: "Submitted", month: "Feb 2025" },
  { id: 5, franchise: "Franchise 3", building: "Building 5", flat: "C-301", previousReading: 505, currentReading: "",  status: "Pending",   month: "Mar 2025" },
  { id: 6, franchise: "Franchise 3", building: "Building 5", flat: "C-302", previousReading: 777, currentReading: 790, status: "Submitted", month: "Mar 2025" },
  { id: 7, franchise: "Franchise 1", building: "Building 2", flat: "A-103", previousReading: 333, currentReading: "",  status: "Pending",   month: "Apr 2025" },
  { id: 8, franchise: "Franchise 1", building: "Building 2", flat: "A-104", previousReading: 888, currentReading: 892, status: "Submitted", month: "Apr 2025" },
];

/* ============================
   HELPERS
   ============================ */
const calcConsumption = (prev, currVal) => {
  const p = Number(prev ?? 0);
  const c = Number(currVal ?? 0);
  if (Number.isNaN(p) || Number.isNaN(c) || String(currVal).trim() === "") return "";
  return p + c; // per your requirement
};

const unique = (arr) => Array.from(new Set(arr));
const FRANCHISES = unique(mockReadings.map((r) => r.franchise));
const BUILDINGS  = unique(mockReadings.map((r) => r.building));
const MONTHS     = unique(mockReadings.map((r) => r.month));

function Badge({ children, tone = "success" }) {
  const map = {
    success: "bg-green-100 text-green-700",
    warning: "bg-yellow-100 text-yellow-700",
    neutral: "bg-slate-100 text-slate-700",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 text-xs font-semibold rounded ${map[tone]}`}>
      {children}
    </span>
  );
}

/* ============================
   COMPONENT
   ============================ */
export default function MeterReading() {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [franchise, setFranchise] = useState("");
  const [building, setBuilding] = useState("");
  const [month, setMonth] = useState("");

  const [page, setPage] = useState(1);
  const pageSize = 8;

  const [curr, setCurr] = useState(() =>
    Object.fromEntries(mockReadings.map((r) => [r.id, r.currentReading ?? ""]))
  );
  const [status, setStatus] = useState(() =>
    Object.fromEntries(mockReadings.map((r) => [r.id, r.status]))
  );
  const [editing, setEditing] = useState(() =>
    Object.fromEntries(mockReadings.map((r) => [r.id, false]))
  );

  const filtered = useMemo(() => {
    let rows = mockReadings;
    if (franchise) rows = rows.filter((r) => r.franchise === franchise);
    if (building)  rows = rows.filter((r) => r.building  === building);
    if (month)     rows = rows.filter((r) => r.month     === month);
    if (query.trim()) {
      const q = query.toLowerCase();
      rows = rows.filter(
        (r) =>
          r.flat.toLowerCase().includes(q) ||
          r.franchise.toLowerCase().includes(q) ||
          r.building.toLowerCase().includes(q) ||
          r.month.toLowerCase().includes(q)
      );
    }
    return rows;
  }, [query, franchise, building, month]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentRows = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
  };

  const onSubmitReading = (row) => {
    if (!String(curr[row.id]).trim()) return;
    setStatus((s) => ({ ...s, [row.id]: "Submitted" }));
    setEditing((e) => ({ ...e, [row.id]: false }));
  };

  const goDetails = (row) => {
    const currVal = curr[row.id];
    const consumption = calcConsumption(row.previousReading, currVal);
    navigate(`/meter/${row.id}`, {
      state: {
        ...row,
        currentReading: currVal,
        consumption,
      },
    });
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
        <h2 className="text-lg font-semibold text-slate-800">Meter Reading</h2>
      </div>

      {/* Filters */}
      <div className="px-4 pt-4 grid gap-4 md:grid-cols-3">
        <label className="flex items-center gap-3">
          <span className="min-w-[100px] text-right md:text-left text-slate-700 font-medium">
            Franchise:
          </span>
          <select
            value={franchise}
            onChange={(e) => { setFranchise(e.target.value); setPage(1); }}
            className="w-full md:w-80 h-10 rounded-md border border-slate-300 px-3 outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Select option</option>
            {FRANCHISES.map((f) => <option key={f} value={f}>{f}</option>)}
          </select>
        </label>

        <label className="flex items-center gap-3">
          <span className="min-w-[100px] text-right md:text-left text-slate-700 font-medium">
            Building(s):
          </span>
          <select
            value={building}
            onChange={(e) => { setBuilding(e.target.value); setPage(1); }}
            className="w-full md:w-80 h-10 rounded-md border border-slate-300 px-3 outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Select option</option>
            {BUILDINGS.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </label>

        <label className="flex items-center gap-3">
          <span className="min-w-[100px] text-right md:text-left text-slate-700 font-medium">
            Month:
          </span>
          <select
            value={month}
            onChange={(e) => { setMonth(e.target.value); setPage(1); }}
            className="w-full md:w-80 h-10 rounded-md border border-slate-300 px-3 outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Select option</option>
            {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
        </label>
      </div>

      {/* Search */}
      <div className="px-4 pt-4">
        <form onSubmit={handleSearchSubmit} className="flex max-w-md">
          <input
            type="text"
            placeholder="Search..."
            className="w-full h-10 rounded-l-md border border-slate-300 px-3 outline-none focus:ring-2 focus:ring-orange-500"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className="h-10 w-10 rounded-r-md grid place-items-center bg-[#1d2a39] text-white"
            aria-label="Search"
          >
            <FiSearch />
          </button>
        </form>
      </div>

      {/* ---------- MOBILE CARDS (<= md) ---------- */}
      <div className="px-4 py-4 space-y-4 md:hidden">
        <h3 className="text-2xl font-bold text-slate-800">Meter Reading Entry</h3>

        {currentRows.length === 0 && (
          <div className="text-slate-500">No data found.</div>
        )}

        {currentRows.map((r) => {
          const st = status[r.id];
          const isSubmitted = st === "Submitted";
          const currVal = curr[r.id];
          const consumption = calcConsumption(r.previousReading, currVal);

          return (
            <div key={r.id} className="rounded-2xl border border-slate-200 shadow-sm p-4 bg-white">
              <div className="font-semibold text-slate-800">
                {r.franchise} • {r.building} • {r.flat}
              </div>

              <div className="mt-2 text-slate-500">
                <span className="font-medium text-slate-600">Previous Reading:</span> {r.previousReading}
              </div>

              {/* Consumption on mobile */}
              <div className="mt-2 text-slate-500">
                <span className="font-medium text-slate-600">Consumption:</span>{" "}
                {consumption === "" ? "-" : consumption}
              </div>

              <label className="block mt-4 text-slate-700 font-medium">
                Current Reading:
                <input
                  type="number"
                  className="mt-2 h-11 w-full rounded-md border border-slate-300 px-3 outline-none focus:ring-2 focus:ring-orange-500 disabled:bg-slate-100"
                  value={currVal ?? ""}
                  disabled={isSubmitted && !editing[r.id]}
                  onChange={(e) => setCurr((c) => ({ ...c, [r.id]: e.target.value }))}
                />
              </label>

              <div className="mt-4 flex items-center justify-between">
                {isSubmitted ? <Badge tone="success">Submitted</Badge> : <Badge tone="warning">Pending</Badge>}

                {isSubmitted && !editing[r.id] ? (
                  <div className="flex gap-2">
                    <button
                      className="px-4 h-10 rounded bg-blue-600 text-white text-sm hover:bg-blue-700"
                      onClick={() => goDetails(r)}
                    >
                      View Bill
                    </button>
                    <button
                      className="px-4 h-10 rounded bg-gray-500 text-white text-sm hover:bg-gray-600"
                      onClick={() => setEditing((e) => ({ ...e, [r.id]: true }))}
                    >
                      Edit
                    </button>
                  </div>
                ) : (
                  <button
                    className="px-4 h-10 rounded bg-amber-500 text-white text-sm hover:bg-amber-600 disabled:opacity-50"
                    disabled={!String(currVal).trim()}
                    onClick={() => onSubmitReading(r)}
                  >
                    {isSubmitted ? "Re-Submit" : "Submit"}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ---------- DESKTOP TABLE (>= md) ---------- */}
      <div className="px-4 py-4 overflow-x-auto hidden md:block">
        <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
          <thead className="bg-yellow-100 text-slate-800">
            <tr>
              <th className="text-left font-semibold px-3 py-2 border-b">Franchise</th>
              <th className="text-left font-semibold px-3 py-2 border-b">Building</th>
              <th className="text-left font-semibold px-3 py-2 border-b">Flat</th>
              <th className="text-left font-semibold px-3 py-2 border-b">Previous Reading</th>
              <th className="text-left font-semibold px-3 py-2 border-b">Current Reading</th>
              <th className="text-left font-semibold px-3 py-2 border-b">Consumption</th>
              <th className="text-left font-semibold px-3 py-2 border-b">Status</th>
              <th className="text-left font-semibold px-3 py-2 border-b">Action</th>
            </tr>
          </thead>

          <tbody>
            {currentRows.length === 0 && (
              <tr>
                <td colSpan={8} className="px-3 py-6 text-center text-slate-500">
                  No data found.
                </td>
              </tr>
            )}

            {currentRows.map((r) => {
              const st = status[r.id];
              const isSubmitted = st === "Submitted";
              const currVal = curr[r.id];
              const consumption = calcConsumption(r.previousReading, currVal);

              return (
                <tr key={r.id} className="odd:bg-white even:bg-slate-50">
                  <td className="px-3 py-3 border-b">{r.franchise}</td>
                  <td className="px-3 py-3 border-b">{r.building}</td>
                  <td className="px-3 py-3 border-b">{r.flat}</td>
                  <td className="px-3 py-3 border-b">{r.previousReading}</td>
                  <td className="px-3 py-3 border-b">
                    <input
                      type="number"
                      className="h-9 w-32 rounded-md border border-slate-300 px-3 outline-none focus:ring-2 focus:ring-orange-500 disabled:bg-slate-100"
                      value={currVal ?? ""}
                      disabled={isSubmitted && !editing[r.id]}
                      onChange={(e) => setCurr((c) => ({ ...c, [r.id]: e.target.value }))}
                    />
                  </td>
                  <td className="px-3 py-3 border-b">{consumption === "" ? "-" : consumption}</td>
                  <td className="px-3 py-3 border-b">
                    {isSubmitted ? <Badge tone="success">Submitted</Badge> : <Badge tone="warning">Pending</Badge>}
                  </td>
                  <td className="px-3 py-3 border-b">
                    {isSubmitted && !editing[r.id] ? (
                      <>
                        <button
                          className="px-3 h-9 rounded bg-blue-600 text-white text-sm hover:bg-blue-700 mr-2"
                          onClick={() => goDetails(r)}
                        >
                          View Bill
                        </button>
                        <button
                          className="px-3 h-9 rounded bg-gray-500 text-white text-sm hover:bg-gray-600"
                          onClick={() => setEditing((e) => ({ ...e, [r.id]: true }))}
                        >
                          Edit
                        </button>
                      </>
                    ) : (
                      <button
                        className="px-3 h-9 rounded bg-amber-500 text-white text-sm hover:bg-amber-600 disabled:opacity-50"
                        disabled={!String(currVal).trim()}
                        onClick={() => onSubmitReading(r)}
                      >
                        {isSubmitted ? "Re-Submit" : "Submit"}
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-4 pb-4 flex items-center justify-end gap-2">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="px-3 h-9 rounded-md border border-slate-300 text-sm disabled:opacity-50"
        >
          Previous
        </button>
        <span className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-orange-500 text-white text-sm">
          {page}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          className="px-3 h-9 rounded-md border border-slate-300 text-sm disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
