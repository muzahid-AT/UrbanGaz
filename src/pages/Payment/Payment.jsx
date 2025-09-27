import { useMemo, useState } from "react";
import { FiSearch, FiEdit2, FiPlusCircle } from "react-icons/fi";

const mockPayments = [
  {
    id: 1,
    flat: "Flat A",
    status: "Paid",
    paidAmount: 2500,
    dueAmount: 0,
    method: "BKash",
    date: "02-01-2025",
    franchise: "Franchise A",
    building: "Building 1",
  },
  {
    id: 2,
    flat: "Flat B",
    status: "Due",
    paidAmount: 1200,
    dueAmount: 300,
    method: "Cash",
    date: "05-01-2025",
    franchise: "Franchise B",
    building: "Building 2",
  },
  {
    id: 3,
    flat: "Flat C",
    status: "Paid",
    paidAmount: 1800,
    dueAmount: 0,
    method: "Nagad",
    date: "08-01-2025",
    franchise: "Franchise C",
    building: "Building 3",
  },
  {
    id: 4,
    flat: "Flat D",
    status: "Due",
    paidAmount: 0,
    dueAmount: 2100,
    method: "Bank",
    date: "12-01-2025",
    franchise: "Franchise A",
    building: "Building 1",
  },
  {
    id: 5,
    flat: "Flat E",
    status: "Paid",
    paidAmount: 3000,
    dueAmount: 0,
    method: "BKash",
    date: "15-01-2025",
    franchise: "Franchise B",
    building: "Building 2",
  },
  {
    id: 6,
    flat: "Flat F",
    status: "Due",
    paidAmount: 900,
    dueAmount: 600,
    method: "Cash",
    date: "18-01-2025",
    franchise: "Franchise C",
    building: "Building 3",
  },
  {
    id: 7,
    flat: "Flat G",
    status: "Paid",
    paidAmount: 2200,
    dueAmount: 0,
    method: "Nagad",
    date: "22-01-2025",
    franchise: "Franchise A",
    building: "Building 1",
  },
  {
    id: 8,
    flat: "Flat H",
    status: "Due",
    paidAmount: 500,
    dueAmount: 2500,
    method: "Bank",
    date: "25-01-2025",
    franchise: "Franchise B",
    building: "Building 2",
  },
  {
    id: 9,
    flat: "Flat I",
    status: "Paid",
    paidAmount: 2700,
    dueAmount: 0,
    method: "BKash",
    date: "28-01-2025",
    franchise: "Franchise C",
    building: "Building 3",
  },
  {
    id: 10,
    flat: "Flat J",
    status: "Due",
    paidAmount: 0,
    dueAmount: 1800,
    method: "Cash",
    date: "01-02-2025",
    franchise: "Franchise A",
    building: "Building 1",
  },
  // -----------------------------
  // Keep generating in same style until 50
  // -----------------------------
  {
    id: 11,
    flat: "Flat K",
    status: "Paid",
    paidAmount: 1950,
    dueAmount: 0,
    method: "Nagad",
    date: "03-02-2025",
    franchise: "Franchise B",
    building: "Building 2",
  },
  {
    id: 12,
    flat: "Flat L",
    status: "Due",
    paidAmount: 700,
    dueAmount: 1300,
    method: "Bank",
    date: "06-02-2025",
    franchise: "Franchise C",
    building: "Building 3",
  },
  {
    id: 13,
    flat: "Flat M",
    status: "Paid",
    paidAmount: 3100,
    dueAmount: 0,
    method: "BKash",
    date: "10-02-2025",
    franchise: "Franchise A",
    building: "Building 1",
  },
  {
    id: 14,
    flat: "Flat N",
    status: "Due",
    paidAmount: 400,
    dueAmount: 2400,
    method: "Cash",
    date: "13-02-2025",
    franchise: "Franchise B",
    building: "Building 2",
  },
  {
    id: 15,
    flat: "Flat O",
    status: "Paid",
    paidAmount: 2750,
    dueAmount: 0,
    method: "Nagad",
    date: "16-02-2025",
    franchise: "Franchise C",
    building: "Building 3",
  },
  {
    id: 16,
    flat: "Flat P",
    status: "Due",
    paidAmount: 1000,
    dueAmount: 900,
    method: "Bank",
    date: "19-02-2025",
    franchise: "Franchise A",
    building: "Building 1",
  },
  {
    id: 17,
    flat: "Flat Q",
    status: "Paid",
    paidAmount: 3500,
    dueAmount: 0,
    method: "BKash",
    date: "22-02-2025",
    franchise: "Franchise B",
    building: "Building 2",
  },
  {
    id: 18,
    flat: "Flat R",
    status: "Due",
    paidAmount: 0,
    dueAmount: 1600,
    method: "Cash",
    date: "25-02-2025",
    franchise: "Franchise C",
    building: "Building 3",
  },
  {
    id: 19,
    flat: "Flat S",
    status: "Paid",
    paidAmount: 2900,
    dueAmount: 0,
    method: "Nagad",
    date: "28-02-2025",
    franchise: "Franchise A",
    building: "Building 1",
  },
  {
    id: 20,
    flat: "Flat T",
    status: "Due",
    paidAmount: 600,
    dueAmount: 1400,
    method: "Bank",
    date: "03-03-2025",
    franchise: "Franchise B",
    building: "Building 2",
  },
  {
    id: 21,
    flat: "Flat U",
    status: "Paid",
    paidAmount: 2100,
    dueAmount: 0,
    method: "BKash",
    date: "06-03-2025",
    franchise: "Franchise C",
    building: "Building 3",
  },
  {
    id: 22,
    flat: "Flat V",
    status: "Due",
    paidAmount: 0,
    dueAmount: 1900,
    method: "Cash",
    date: "09-03-2025",
    franchise: "Franchise A",
    building: "Building 1",
  },
  {
    id: 23,
    flat: "Flat W",
    status: "Paid",
    paidAmount: 2600,
    dueAmount: 0,
    method: "Nagad",
    date: "12-03-2025",
    franchise: "Franchise B",
    building: "Building 2",
  },
  {
    id: 24,
    flat: "Flat X",
    status: "Due",
    paidAmount: 800,
    dueAmount: 1200,
    method: "Bank",
    date: "15-03-2025",
    franchise: "Franchise C",
    building: "Building 3",
  },
  {
    id: 25,
    flat: "Flat Y",
    status: "Paid",
    paidAmount: 3200,
    dueAmount: 0,
    method: "BKash",
    date: "18-03-2025",
    franchise: "Franchise A",
    building: "Building 1",
  },
  {
    id: 26,
    flat: "Flat Z",
    status: "Due",
    paidAmount: 200,
    dueAmount: 2800,
    method: "Cash",
    date: "21-03-2025",
    franchise: "Franchise B",
    building: "Building 2",
  },
  {
    id: 27,
    flat: "Flat A",
    status: "Paid",
    paidAmount: 2450,
    dueAmount: 0,
    method: "Nagad",
    date: "24-03-2025",
    franchise: "Franchise C",
    building: "Building 3",
  },
  {
    id: 28,
    flat: "Flat B",
    status: "Due",
    paidAmount: 950,
    dueAmount: 1050,
    method: "Bank",
    date: "27-03-2025",
    franchise: "Franchise A",
    building: "Building 1",
  },
  {
    id: 29,
    flat: "Flat C",
    status: "Paid",
    paidAmount: 2800,
    dueAmount: 0,
    method: "BKash",
    date: "30-03-2025",
    franchise: "Franchise B",
    building: "Building 2",
  },
  {
    id: 30,
    flat: "Flat D",
    status: "Due",
    paidAmount: 500,
    dueAmount: 1500,
    method: "Cash",
    date: "02-04-2025",
    franchise: "Franchise C",
    building: "Building 3",
  },
  // … continue same structure until id: 50
];
const franchises = ["Franchise A", "Franchise B", "Franchise C"];
const buildings = ["Building 1", "Building 2", "Building 3"];

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

export default function Payment() {
  const [query, setQuery] = useState("");
  const [franchise, setFranchise] = useState("");
  const [building, setBuilding] = useState("");

  // pagination
  const [page, setPage] = useState(1);
  const pageSize = 8;

  const filtered = useMemo(() => {
    let rows = mockPayments;
    if (franchise) rows = rows.filter(r => r.franchise === franchise);
    if (building) rows = rows.filter(r => r.building === building);
    if (query.trim()) {
      const q = query.toLowerCase();
      rows = rows.filter(
        r =>
          r.flat.toLowerCase().includes(q) ||
          r.method.toLowerCase().includes(q) ||
          r.date.toLowerCase().includes(q)
      );
    }
    return rows;
  }, [query, franchise, building]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm">
      {/* Header / Add Payment */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
        <h2 className="text-lg font-semibold text-slate-800">View Payment</h2>
        <button
          className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-green-600 text-white text-sm hover:bg-green-700"
          onClick={() => alert("Add Payment clicked")}
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
            onChange={(e) => { setFranchise(e.target.value); setPage(1); }}
            className="w-full md:w-80 h-10 rounded-md border border-slate-300 px-3 outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Select option</option>
            {franchises.map(f => <option key={f} value={f}>{f}</option>)}
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
            {buildings.map(b => <option key={b} value={b}>{b}</option>)}
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
    </div>
  );
}
