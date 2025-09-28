import { useMemo, useState } from "react";
import { FiSearch, FiPlusCircle, FiEdit2, FiTrash2 } from "react-icons/fi";

const mockSetups = [
  {
    id: 1,
    franchise: "Franchise Alpha",
    building: "Building 1",
    month: "January, 2025",
    unitPrice: 6.5,
    serviceChargePct: 4.2,
    lateFeeDate: "12-01-2025",
    lateFeePct: 0.25,
  },
  {
    id: 2,
    franchise: "Franchise Beta",
    building: "Building 2",
    month: "February, 2025",
    unitPrice: 6.8,
    serviceChargePct: 3.9,
    lateFeeDate: "10-02-2025",
    lateFeePct: 0.3,
  },
  {
    id: 3,
    franchise: "Franchise Gamma",
    building: "Building 3",
    month: "March, 2025",
    unitPrice: 7.0,
    serviceChargePct: 4.1,
    lateFeeDate: "08-03-2025",
    lateFeePct: 0.28,
  },
  {
    id: 4,
    franchise: "Franchise Delta",
    building: "Building 4",
    month: "April, 2025",
    unitPrice: 6.4,
    serviceChargePct: 3.7,
    lateFeeDate: "05-04-2025",
    lateFeePct: 0.2,
  },
  {
    id: 5,
    franchise: "Franchise Epsilon",
    building: "Building 5",
    month: "May, 2025",
    unitPrice: 6.9,
    serviceChargePct: 4.4,
    lateFeeDate: "18-05-2025",
    lateFeePct: 0.35,
  },
  {
    id: 6,
    franchise: "Franchise Alpha",
    building: "Building 6",
    month: "June, 2025",
    unitPrice: 7.2,
    serviceChargePct: 4.0,
    lateFeeDate: "20-06-2025",
    lateFeePct: 0.22,
  },
  {
    id: 7,
    franchise: "Franchise Beta",
    building: "Building 7",
    month: "July, 2025",
    unitPrice: 6.3,
    serviceChargePct: 3.8,
    lateFeeDate: "11-07-2025",
    lateFeePct: 0.27,
  },
  {
    id: 8,
    franchise: "Franchise Gamma",
    building: "Building 8",
    month: "August, 2025",
    unitPrice: 6.7,
    serviceChargePct: 4.3,
    lateFeeDate: "16-08-2025",
    lateFeePct: 0.3,
  },
  {
    id: 9,
    franchise: "Franchise Delta",
    building: "Building 9",
    month: "September, 2025",
    unitPrice: 6.6,
    serviceChargePct: 3.6,
    lateFeeDate: "09-09-2025",
    lateFeePct: 0.24,
  },
  {
    id: 10,
    franchise: "Franchise Epsilon",
    building: "Building 10",
    month: "October, 2025",
    unitPrice: 7.1,
    serviceChargePct: 4.5,
    lateFeeDate: "21-10-2025",
    lateFeePct: 0.32,
  },
  {
    id: 11,
    franchise: "Franchise Alpha",
    building: "Building 11",
    month: "November, 2025",
    unitPrice: 6.2,
    serviceChargePct: 3.9,
    lateFeeDate: "13-11-2025",
    lateFeePct: 0.21,
  },
  {
    id: 12,
    franchise: "Franchise Beta",
    building: "Building 12",
    month: "December, 2025",
    unitPrice: 6.5,
    serviceChargePct: 4.1,
    lateFeeDate: "19-12-2025",
    lateFeePct: 0.26,
  },
  {
    id: 13,
    franchise: "Franchise Gamma",
    building: "Building 13",
    month: "January, 2026",
    unitPrice: 7.0,
    serviceChargePct: 4.3,
    lateFeeDate: "15-01-2026",
    lateFeePct: 0.3,
  },
  {
    id: 14,
    franchise: "Franchise Delta",
    building: "Building 14",
    month: "February, 2026",
    unitPrice: 6.8,
    serviceChargePct: 3.7,
    lateFeeDate: "07-02-2026",
    lateFeePct: 0.23,
  },
  {
    id: 15,
    franchise: "Franchise Epsilon",
    building: "Building 15",
    month: "March, 2026",
    unitPrice: 6.9,
    serviceChargePct: 4.2,
    lateFeeDate: "12-03-2026",
    lateFeePct: 0.29,
  },
];

export default function UnitPriceSetup() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return mockSetups;
    return mockSetups.filter((r) =>
      [r.franchise, r.building, r.month].some((v) =>
        String(v).toLowerCase().includes(q)
      )
    );
  }, [query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = filtered.slice((page - 1) * pageSize, page * pageSize);

  const onSearch = (e) => {
    e.preventDefault();
    setPage(1);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm">
      {/* Title + Add New */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
        <h2 className="text-lg font-semibold text-slate-800">
          Unit Price & Service Charge Setup
        </h2>
        <button
          className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-green-600 text-white text-sm hover:bg-green-700"
          onClick={() => alert("Add New Setup")}
        >
          <FiPlusCircle className="text-base" />
          Add New Setup
        </button>
      </div>

      {/* Search */}
      <div className="px-4 pt-4">
        <form onSubmit={onSearch} className="flex max-w-md">
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
          <thead>
            <tr className="bg-[#fbf3c0] text-slate-800">
              <th className="text-left font-semibold px-3 py-2 border-b">Franchise</th>
              <th className="text-left font-semibold px-3 py-2 border-b">Building(s)</th>
              <th className="text-left font-semibold px-3 py-2 border-b">Month</th>
              <th className="text-left font-semibold px-3 py-2 border-b">Unit Price</th>
              <th className="text-left font-semibold px-3 py-2 border-b">Service Charge(%)</th>
              <th className="text-left font-semibold px-3 py-2 border-b">Late Fee Date</th>
              <th className="text-left font-semibold px-3 py-2 border-b">Late Fee(%)</th>
              <th className="text-left font-semibold px-3 py-2 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {current.length === 0 && (
              <tr>
                <td colSpan={8} className="px-3 py-6 text-center text-slate-500">
                  No setup found.
                </td>
              </tr>
            )}

            {current.map((r) => (
              <tr key={r.id} className="odd:bg-white even:bg-slate-50">
                <td className="px-3 py-3 border-b">{r.franchise}</td>
                <td className="px-3 py-3 border-b">{r.building}</td>
                <td className="px-3 py-3 border-b">{r.month}</td>
                <td className="px-3 py-3 border-b">{r.unitPrice}</td>
                <td className="px-3 py-3 border-b">{r.serviceChargePct}</td>
                <td className="px-3 py-3 border-b">{r.lateFeeDate}</td>
                <td className="px-3 py-3 border-b">{r.lateFeePct}</td>
                <td className="px-3 py-3 border-b">
                  <div className="flex items-center gap-2">
                    <button
                      className="inline-flex items-center justify-center w-8 h-8 rounded bg-green-100 text-green-700 hover:bg-green-200"
                      title="Edit"
                      onClick={() => alert(`Edit setup #${r.id}`)}
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      className="inline-flex items-center justify-center w-8 h-8 rounded bg-red-100 text-red-700 hover:bg-red-200"
                      title="Delete"
                      onClick={() => {
                        // confirm only for demo
                        // TODO: replace with real delete handler
                        if (confirm("Delete this setup?")) alert(`Delete setup #${r.id}`);
                      }}
                    >
                      <FiTrash2 />
                    </button>
                  </div>
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
