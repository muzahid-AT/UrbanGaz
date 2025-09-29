import { GiFlame } from "react-icons/gi";
import { FiSearch } from "react-icons/fi";
import { MdVerified, MdPendingActions, MdOutlineBlock } from "react-icons/md";
import KPICard, { KPIGrid } from "../../components/common/kpi/KPICard";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import BuildingCard from "./BuildingCard";
const mockBuildings = Array.from({ length: 100 }).map((_, i) => {
  const n = i + 1;
  return {
    id: n,
    franchiseName: `Franchise ${Math.ceil(n / 2)}`,
    buildingName: `Building ${n}`,
    address: "Nikunjo-2, Dhaka-1229",
    district: "Dhaka",
    area: ["Uttara", "Mirpur", "Banani", "Mohakhali"][n % 4],
    numberOfFlats: 200 + n,
    contactName: ["Kamal Hossain", "Sadia Karim", "Rafiul Islam", "Nadia Akter"][n % 4],
    contactPhone: "01763873456",
    note: "Text note",
  };
});
export default function BuildingManagement() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 50;
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return mockBuildings;
    return mockBuildings.filter(
      (b) =>
        b.franchiseName.toLowerCase().includes(q) ||
        b.buildingName.toLowerCase().includes(q) ||
        b.address.toLowerCase().includes(q) ||
        b.district.toLowerCase().includes(q) ||
        b.area.toLowerCase().includes(q) ||
        String(b.numberOfFlats).includes(q) ||
        b.contactName.toLowerCase().includes(q) ||
        b.contactPhone.includes(q)
    );
  }, [query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const openDetails = (building) => {
    navigate(`/buildings/${building.id}`, { state: building });
  };
  return (
    <>
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
      <div className="p-6 bg-white rounded-xl shadow mt-4">
      {/* Header */}
      <div className="flex flex-wrap items-center gap-3 justify-between mb-4">
        <h1 className="text-lg font-semibold text-slate-800">Building List</h1>

        <form onSubmit={(e) => e.preventDefault()} className="flex">
          <input
            type="text"
            placeholder="Search…"
            className="h-10 w-64 rounded-l-md border border-slate-300 px-3 outline-none focus:ring-2 focus:ring-orange-500"
            value={query}
            onChange={(e) => {
              setPage(1);
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

      {/* Grid */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {paginated.map((b) => (
          <BuildingCard key={b.id} building={b} onClick={openDetails} />
        ))}
      </div>

      {/* Pagination */}
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
    </>
  );
}
