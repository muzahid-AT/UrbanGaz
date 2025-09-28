// src/pages/UserManagement/UsersList.jsx
import { useMemo, useState } from "react";
import { FiSearch, FiEdit2, FiPlusCircle } from "react-icons/fi";

/* Small badge helper (local to this file) */
function Badge({ tone = "neutral", children }) {
  const map = {
    neutral: "bg-slate-100 text-slate-700",
    success: "bg-green-100 text-green-700",
    warning: "bg-amber-100 text-amber-700",
    danger: "bg-red-100 text-red-700",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 text-xs font-semibold rounded ${map[tone]}`}>
      {children}
    </span>
  );
}

/**
 * UsersList
 * props:
 * - users: Array<{ id, name, email, phone, roles: string[], createdAt, lastLogin: {time, date} }>
 * - onAddUser?: () => void
 */
export default function UsersList({ users = [], onAddUser }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.phone.includes(q)
    );
  }, [query, users]);

  return (
    <>
      {/* Header row for this card section */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
        <h2 className="text-lg font-semibold text-slate-800">User List</h2>
        <button
          className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-green-600 text-white text-sm hover:bg-green-700"
          onClick={onAddUser ?? (() => alert("Add New User"))}
        >
          <FiPlusCircle className="text-base" />
          Add New User
        </button>
      </div>

      {/* Search */}
      <div className="px-4 pt-4">
        <form onSubmit={(e) => e.preventDefault()} className="flex max-w-md">
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
              <th className="text-left font-semibold px-3 py-2 border-b w-16">SL</th>
              <th className="text-left font-semibold px-3 py-2 border-b">User Name</th>
              <th className="text-left font-semibold px-3 py-2 border-b">Email</th>
              <th className="text-left font-semibold px-3 py-2 border-b">Phone Number</th>
              <th className="text-left font-semibold px-3 py-2 border-b">User Role</th>
              <th className="text-left font-semibold px-3 py-2 border-b">Status</th>
              <th className="text-left font-semibold px-3 py-2 border-b">Create Date</th>
              <th className="text-left font-semibold px-3 py-2 border-b">Last Login</th>
              <th className="text-left font-semibold px-3 py-2 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={9} className="px-3 py-6 text-center text-slate-500">
                  No users found.
                </td>
              </tr>
            )}
            {filtered.map((u, idx) => (
              <tr key={u.id} className="odd:bg-white even:bg-slate-50">
                <td className="px-3 py-3 border-b">{idx + 1}</td>
                <td className="px-3 py-3 border-b">{u.name}</td>
                <td className="px-3 py-3 border-b">{u.email}</td>
                <td className="px-3 py-3 border-b">{u.phone}</td>
                <td className="px-3 py-3 border-b">
                  <div className="flex flex-wrap gap-2">
                    {u.roles.map((r) => (
                      <Badge key={r} tone={r === "Admin" ? "success" : "danger"}>
                        {r}
                      </Badge>
                    ))}
                  </div>
                </td>
                <td className="px-3 py-3 border-b">
                  <div className="flex flex-wrap gap-2">
                    <Badge tone="success">Active</Badge>
                    <Badge tone="warning">Pending</Badge>
                    <Badge tone="neutral">Suspended</Badge>
                  </div>
                </td>
                <td className="px-3 py-3 border-b">{u.createdAt}</td>
                <td className="px-3 py-3 border-b">
                  {u.lastLogin.time}
                  <div className="text-slate-500 text-xs">{u.lastLogin.date}</div>
                </td>
                <td className="px-3 py-3 border-b">
                  <button
                    className="inline-flex items-center justify-center w-8 h-8 rounded bg-green-100 text-green-700 hover:bg-green-200"
                    title="Edit"
                    onClick={() => alert(`Edit user #${u.id}`)}
                  >
                    <FiEdit2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Optional paging placeholder (keep if you want) */}
      <div className="px-4 pb-4 flex items-center justify-end gap-2">
        <button className="px-3 h-9 rounded-md border border-slate-300 text-sm">Previous</button>
        <span className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-orange-500 text-white text-sm">
          1
        </span>
        <button className="px-3 h-9 rounded-md border border-slate-300 text-sm">Next</button>
      </div>
    </>
  );
}
