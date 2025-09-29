import { GiFlame } from "react-icons/gi";
import { MdVerified, MdPendingActions, MdOutlineBlock } from "react-icons/md";
import KPICard, { KPIGrid } from "../../components/common/kpi/KPICard";
import { FiSearch } from "react-icons/fi";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import FlatCard from "./FlatCard";

const mockFlats = Array.from({ length: 24 }).map((_, i) => {
  const n = i + 1;
  const active = n % 3 !== 0; // some inactive
  return {
    id: n,
    buildingName: `Building ${Math.ceil(n / 4)}`,
    flatName: `F${n}`,
    floorName: `A${(n % 10) + 1}`,
    status: active ? "active" : "inactive",

    ownerName: ["Uttara", "Mohakhali", "Banani", "Mirpur"][n % 4],
    ownerPhone: "012345678",
    ownerAddress: "Nikunjo-2, Dhaka-1229",
    ownerNid: "123456789",

    customerName: ["A K M Kalam", "Shahadat Hossain", "Maliha Rahman"][n % 3],
    renterName: ["Salman", "Parvez", "Tania"][n % 3],
    renterPhone: "012345678",
    renterAddress: "Nikunjo-2, Dhaka-1229",
    renterNid: "123456789",
  };
});

export default function FlatManagement() {
const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 12;
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return mockFlats;
    return mockFlats.filter((f) =>
      [
        f.buildingName,
        f.flatName,
        f.floorName,
        f.status,
        f.ownerName,
        f.ownerPhone,
        f.ownerAddress,
        f.ownerNid,
        f.customerName,
        f.renterName,
        f.renterPhone,
        f.renterAddress,
        f.renterNid,
      ]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const openDetails = (flat) => {
    navigate(`/flats/${flat.id}`, { state: flat });
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
        <h1 className="text-lg font-semibold text-slate-800">Flat List</h1>

        <form onSubmit={(e) => e.preventDefault()} className="flex">
          <input
            type="text"
            placeholder="Search…"
            className="h-10 w-72 rounded-l-md border border-slate-300 px-3 outline-none focus:ring-2 focus:ring-orange-500"
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
                + Add New Flat
              </button>
      </div>

      {/* Grid */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {paginated.map((f) => (
          <FlatCard key={f.id} flat={f} onClick={openDetails} />
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
