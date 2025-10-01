import { useMemo, useState, useEffect } from "react";
import { FiSearch, FiEdit2, FiPlusCircle } from "react-icons/fi";
import PaymentModal from "../../components/modal/PaymentModal";

/* ----- Mock data (same shape as yours) ----- */
const mockPayments = [
  { id: 1,  flat: "Flat A", status: "Paid", paidAmount: 2500, dueAmount: 0,    method: "BKash", date: "02-01-2025", franchise: "Franchise A", building: "Building 1" },
  { id: 2,  flat: "Flat B", status: "Due",  paidAmount: 1200, dueAmount: 300,  method: "Cash",  date: "05-01-2025", franchise: "Franchise B", building: "Building 2" },
  { id: 3,  flat: "Flat C", status: "Paid", paidAmount: 1800, dueAmount: 0,    method: "Nagad", date: "08-01-2025", franchise: "Franchise C", building: "Building 3" },
  { id: 4,  flat: "Flat D", status: "Due",  paidAmount: 0,    dueAmount: 2100, method: "Bank",  date: "12-01-2025", franchise: "Franchise A", building: "Building 1" },
  { id: 5,  flat: "Flat E", status: "Paid", paidAmount: 3000, dueAmount: 0,    method: "BKash", date: "15-01-2025", franchise: "Franchise B", building: "Building 2" },
  { id: 6,  flat: "Flat F", status: "Due",  paidAmount: 900,  dueAmount: 600,  method: "Cash",  date: "18-01-2025", franchise: "Franchise C", building: "Building 3" },
  { id: 7,  flat: "Flat G", status: "Paid", paidAmount: 2200, dueAmount: 0,    method: "Nagad", date: "22-01-2025", franchise: "Franchise A", building: "Building 1" },
  { id: 8,  flat: "Flat H", status: "Due",  paidAmount: 500,  dueAmount: 2500, method: "Bank",  date: "25-01-2025", franchise: "Franchise B", building: "Building 2" },
  { id: 9,  flat: "Flat I", status: "Paid", paidAmount: 2700, dueAmount: 0,    method: "BKash", date: "28-01-2025", franchise: "Franchise C", building: "Building 3" },
  { id: 10, flat: "Flat J", status: "Due",  paidAmount: 0,    dueAmount: 1800, method: "Cash",  date: "01-02-2025", franchise: "Franchise A", building: "Building 1" },
];

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

function toDDMMYYYY(yyyyMmDd) {
  if (!yyyyMmDd) return "";
  const [y, m, d] = yyyyMmDd.split("-");
  return `${d}-${m}-${y}`;
}

export default function Payment() {
  const [rows, setRows] = useState(mockPayments);
  const [query, setQuery] = useState("");
  const [franchise, setFranchise] = useState("");
  const [building, setBuilding] = useState("");
  const [open, setOpen] = useState(false);

  // pagination
  const [page, setPage] = useState(1);
  const pageSize = 8;

  // derive selects & dependency maps from rows
  const franchiseOptions = useMemo(
    () => Array.from(new Set(rows.map((r) => r.franchise))).sort(),
    [rows]
  );

  const buildingsByFranchise = useMemo(() => {
    const map = {};
    rows.forEach((r) => {
      if (!map[r.franchise]) map[r.franchise] = new Set();
      map[r.franchise].add(r.building);
    });
    const out = {};
    Object.keys(map).forEach((f) => (out[f] = Array.from(map[f]).sort()));
    return out;
  }, [rows]);

  const buildingOptions = useMemo(() => {
    if (!franchise) {
      const s = new Set(rows.map((r) => r.building));
      return Array.from(s).sort();
    }
    return buildingsByFranchise[franchise] || [];
  }, [rows, buildingsByFranchise, franchise]);

  const flatsByBuilding = useMemo(() => {
    const map = {};
    rows.forEach((r) => {
      if (!map[r.building]) map[r.building] = new Set();
      map[r.building].add(r.flat);
    });
    const out = {};
    Object.keys(map).forEach((b) => (out[b] = Array.from(map[b]).sort()));
    return out;
  }, [rows]);

  // helpful reverse map to assign building for each flat when inserting new rows
  const flatToBuilding = useMemo(() => {
    const m = {};
    rows.forEach((r) => {
      if (!m[r.flat]) m[r.flat] = r.building;
    });
    return m;
  }, [rows]);

  useEffect(() => {
    if (building && !buildingOptions.includes(building)) setBuilding("");
  }, [buildingOptions, building]);

  const filtered = useMemo(() => {
    let list = rows;
    if (franchise) list = list.filter((r) => r.franchise === franchise);
    if (building) list = list.filter((r) => r.building === building);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (r) =>
          r.flat.toLowerCase().includes(q) ||
          r.method.toLowerCase().includes(q) ||
          r.date.toLowerCase().includes(q)
      );
    }
    return list;
  }, [rows, query, franchise, building]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
  };

  const handleAddPayment = (payload) => {
    console.log("Payment (multi) received in parent:", payload);
    const baseId = rows.length ? Math.max(...rows.map((r) => r.id)) : 0;

    const newRows = payload.flats.map((fl, idx) => ({
      id: baseId + idx + 1,
      flat: fl,
      status: "Paid",
      paidAmount: payload.amount,
      dueAmount: 0,
      method: payload.method,
      date: toDDMMYYYY(payload.date),
      // choose franchise heuristic: if only one selected, use it; else keep existing row's franchise if known, else first selected
      franchise:
        payload.franchises.length === 1
          ? payload.franchises[0]
          : (rows.find((r) => r.flat === fl)?.franchise ?? payload.franchises[0]),
      // building via reverse map fallback
      building: flatToBuilding[fl] ?? (payload.buildings[0] || ""),
    }));

    setRows((prev) => [...newRows, ...prev]);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm">
      {/* Header / Add Payment */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
        <h2 className="text-lg font-semibold text-slate-800">View Payment</h2>
        <button
          className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-green-600 text-white text-sm hover:bg-green-700"
          onClick={() => setOpen(true)}
        >
          <FiPlusCircle className="text-base" />
          Add Payment
        </button>
      </div>

      {/* Filters */}
      <div className="px-4 pt-4 grid gap-4 md:grid-cols-2">
        <label className="flex items-center gap-3">
          <span className="min-w-[100px] text-right md:text-left text-slate-700 font-medium">
            Franchise:
          </span>
          <select
            value={franchise}
            onChange={(e) => {
              setFranchise(e.target.value);
              setPage(1);
            }}
            className="w-full md:w-80 h-10 rounded-md border border-slate-300 px-3 outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Select option</option>
            {franchiseOptions.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </label>

        <label className="flex items-center gap-3">
          <span className="min-w-[100px] text-right md:text-left text-slate-700 font-medium">
            Building(s):
          </span>
          <select
            value={building}
            onChange={(e) => {
              setBuilding(e.target.value);
              setPage(1);
            }}
            className="w-full md:w-80 h-10 rounded-md border border-slate-300 px-3 outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Select option</option>
            {buildingOptions.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
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

      {/* Table */}
      <div className="px-4 py-4 overflow-x-auto">
        <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
          <thead className="bg-slate-50 text-slate-700">
            <tr>
              <th className="text-left font-semibold px-3 py-2 border-b">Flat</th>
              <th className="text-left font-semibold px-3 py-2 border-b">Status</th>
              <th className="text-left font-semibold px-3 py-2 border-b">Paid Amount</th>
              <th className="text-left font-semibold px-3 py-2 border-b">Due Amount</th>
              <th className="text-left font-semibold px-3 py-2 border-b">Payment Method</th>
              <th className="text-left font-semibold px-3 py-2 border-b">Payment Date</th>
              <th className="text-left font-semibold px-3 py-2 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {current.length === 0 && (
              <tr>
                <td colSpan={7} className="px-3 py-6 text-center text-slate-500">
                  No payments found.
                </td>
              </tr>
            )}

            {current.map((r) => (
              <tr key={r.id} className="odd:bg-white even:bg-slate-50">
                <td className="px-3 py-3 border-b">{r.flat}</td>
                <td className="px-3 py-3 border-b">
                  {r.status === "Paid" ? (
                    <Badge tone="success">Paid</Badge>
                  ) : (
                    <Badge tone="warning">Due</Badge>
                  )}
                </td>
                <td className="px-3 py-3 border-b">{r.paidAmount}</td>
                <td className="px-3 py-3 border-b">{r.dueAmount}</td>
                <td className="px-3 py-3 border-b">
                  <Badge tone="neutral">{r.method}</Badge>
                </td>
                <td className="px-3 py-3 border-b">{r.date}</td>
                <td className="px-3 py-3 border-b">
                  <button
                    className="inline-flex items-center justify-center w-8 h-8 rounded bg-green-100 text-green-700 hover:bg-green-200"
                    title="Edit"
                    onClick={() => alert(`Edit payment #${r.id}`)}
                  >
                    <FiEdit2 />
                  </button>
                </td>
              </tr>
            ))}
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

      {/* Modal */}
      <PaymentModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleAddPayment}
        franchises={franchiseOptions}
        buildingsByFranchise={buildingsByFranchise}
        flatsByBuilding={flatsByBuilding}
      />
    </div>
  );
}
