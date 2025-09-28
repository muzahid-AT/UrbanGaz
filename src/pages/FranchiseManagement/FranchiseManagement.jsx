import { GiFlame } from "react-icons/gi";
import { MdVerified, MdPendingActions, MdOutlineBlock } from "react-icons/md";
import KPICard, { KPIGrid } from "../../components/common/kpi/KPICard";
import { useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";
import FranchiseCard from "../FranchiseManagement/FranchiseCard";

/* ---------- Mock data ---------- */
const mockFranchises = Array.from({ length: 5 }).map((_, i) => {
  const n = i + 1;
  return {
    id: n,
    name: `Franchise ${n}`,
    address: "Road#01, House#25, Nikunjo-2",
    district: "Dhaka-1229",
    area: ["Uttara", "Mirpur", "Banani", "Mohakhali"][n % 4],
    contactName: ["Abir Hasan", "Sadia Karim", "Rafiul Islam", "Nadia Akter"][n % 4],
    contactPhone: "01673854256",
    tin: `TIN-${100000 + n}`,
  };
});

export default function FranchiseManagement() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 5; // franchises per page

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return mockFranchises;
    return mockFranchises.filter(
      (f) =>
        f.name.toLowerCase().includes(q) ||
        f.address.toLowerCase().includes(q) ||
        f.district.toLowerCase().includes(q) ||
        f.area.toLowerCase().includes(q) ||
        f.contactName.toLowerCase().includes(q) ||
        f.contactPhone.includes(q) ||
        f.tin.toLowerCase().includes(q)
    );
  }, [query]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleOpen = (franchise) => {
    console.log("Open franchise", franchise);
  };

  return (
    <>
      {/* KPI Summary */}
      <div className="space-y-4">
        <KPIGrid>
          <KPICard
            title="Total Franchise"
            value="3344"
            icon={GiFlame}
            iconBg="from-rose-500 to-orange-500"
          />
          <KPICard
            title="Active Project"
            value="3344"
            icon={MdVerified}
            iconBg="from-emerald-500 to-green-600"
          />
          <KPICard
            title="Pending Project"
            value="120"
            icon={MdPendingActions}
            iconBg="from-yellow-400 to-amber-500"
          />
          <KPICard
            title="Inactive Project"
            value="87"
            icon={MdOutlineBlock}
            iconBg="from-slate-500 to-gray-700"
          />
        </KPIGrid>
      </div>

      {/* Franchise List */}
      <div className="p-6 bg-white rounded-xl shadow mt-4">
        <div className="space-y-4">
          {/* Header row */}
          <div className="flex flex-wrap items-center gap-3 justify-between">
            <h1 className="text-lg font-semibold text-slate-800">Franchise List</h1>

            <div className="flex items-center gap-3">
              <form onSubmit={(e) => e.preventDefault()} className="flex">
                <input
                  type="text"
                  placeholder="Search…"
                  className="h-10 w-64 rounded-l-md border border-slate-300 px-3 outline-none focus:ring-2 focus:ring-orange-500"
                  value={query}
                  onChange={(e) => {
                    setPage(1); // reset page when searching
                    setQuery(e.target.value);
                  }}
                />
                <button
                  className="h-10 w-10 grid place-items-center rounded-r-md bg-[#1d2a39] text-white"
                  aria-label="Search"
                  type="submit"
                >
                  <FiSearch />
                </button>
              </form>

              <button
                type="button"
                onClick={() => alert("Add New Franchise")}
                className="h-10 px-3 rounded-md bg-emerald-600 text-white text-sm hover:bg-emerald-700"
              >
                + Add New Franchise
              </button>
            </div>
          </div>

          {/* Cards grid */}
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {paginated.map((f) => (
              <FranchiseCard key={f.id} franchise={f} onClick={handleOpen} />
            ))}
          </div>

          {/* Pagination (copied from UnitPriceSetup) */}
          <div className="flex items-center justify-end gap-2 pt-4">
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
      </div>
    </>
  );
}
