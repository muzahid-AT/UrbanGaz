import { useMemo, useState } from "react";

/** Menus and Actions for per-user permissions */
const MENUS = [
  "Franchise",
  "Building",
  "Flat",
  "Unit Price",
  "Meter Reading",
  "Billing",
  "SMS",
  "User Management",
];

const ACTIONS = ["view", "create", "edit", "delete", "approve", "special"];

/**
 * props:
 * - users: [{ id, name, email }]  // pass your real users; can be the mockUsers
 */
export default function UserPermissionMatrix({ users = [] }) {
  const [selectedUserId, setSelectedUserId] = useState("");
  // permissionsByUser: { [userId]: { [menu]: { action: boolean } } }
  const [permissionsByUser, setPermissionsByUser] = useState({});

  const currentPerms = useMemo(() => {
    if (!selectedUserId) return {};
    return (
      permissionsByUser[selectedUserId] ??
      MENUS.reduce((acc, m) => {
        acc[m] = {
          view: false,
          create: false,
          edit: false,
          delete: false,
          approve: false,
          special: false,
        };
        return acc;
      }, {})
    );
  }, [selectedUserId, permissionsByUser]);

  const toggleCell = (menu, action) => {
    if (!selectedUserId) return;
    setPermissionsByUser((prev) => {
      const forUser =
        prev[selectedUserId] ??
        MENUS.reduce((acc, m) => {
          acc[m] = {
            view: false,
            create: false,
            edit: false,
            delete: false,
            approve: false,
            special: false,
          };
          return acc;
        }, {});
      const next = {
        ...prev,
        [selectedUserId]: {
          ...forUser,
          [menu]: { ...forUser[menu], [action]: !forUser[menu][action] },
        },
      };
      return next;
    });
  };

  const handleUpdate = () => {
    if (!selectedUserId) {
      alert("Please select a user.");
      return;
    }
    // TODO: call your API here with permissionsByUser[selectedUserId]
    console.log("Updating permissions for user:", selectedUserId, permissionsByUser[selectedUserId]);
    alert("Permissions updated (mock). Check console for payload.");
  };

  return (
    <div className="space-y-4 p-4">
      {/* Header: Select User */}
      <div className="flex items-center gap-3">
        <label className="text-slate-700 font-medium min-w-[110px]">Select User:</label>
        <select
          className="h-10 w-72 rounded-md border border-slate-300 px-3 outline-none focus:ring-2 focus:ring-orange-500"
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
        >
          <option value="">Select option</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name} {u.email ? `— ${u.email}` : ""}
            </option>
          ))}
        </select>
      </div>

      {/* Matrix */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden min-w-[1024px]">
          <thead>
            <tr className="bg-[#fbf3c0] text-slate-800">
              <th className="px-3 py-2 border-b w-16 text-left">S.N</th>
              <th className="px-3 py-2 border-b text-left">Menu</th>
              <th className="px-3 py-2 border-b text-center">View</th>
              <th className="px-3 py-2 border-b text-center">Create</th>
              <th className="px-3 py-2 border-b text-center">Edit</th>
              <th className="px-3 py-2 border-b text-center">Delete</th>
              <th className="px-3 py-2 border-b text-center">Approve</th>
              <th className="px-3 py-2 border-b text-center">Special Action</th>
            </tr>
          </thead>
          <tbody>
            {MENUS.map((menu, idx) => {
              const row = currentPerms[menu] ?? {};
              return (
                <tr key={menu} className="odd:bg-white even:bg-slate-50">
                  <td className="px-3 py-3 border-b">{idx + 1}</td>
                  <td className="px-3 py-3 border-b">{menu}</td>

                  {/* View */}
                  <td className="px-3 py-3 border-b text-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 accent-orange-500"
                      checked={!!row.view}
                      disabled={!selectedUserId}
                      onChange={() => toggleCell(menu, "view")}
                    />
                  </td>

                  {/* Create */}
                  <td className="px-3 py-3 border-b text-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 accent-orange-500"
                      checked={!!row.create}
                      disabled={!selectedUserId}
                      onChange={() => toggleCell(menu, "create")}
                    />
                  </td>

                  {/* Edit */}
                  <td className="px-3 py-3 border-b text-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 accent-orange-500"
                      checked={!!row.edit}
                      disabled={!selectedUserId}
                      onChange={() => toggleCell(menu, "edit")}
                    />
                  </td>

                  {/* Delete */}
                  <td className="px-3 py-3 border-b text-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 accent-orange-500"
                      checked={!!row.delete}
                      disabled={!selectedUserId}
                      onChange={() => toggleCell(menu, "delete")}
                    />
                  </td>

                  {/* Approve */}
                  <td className="px-3 py-3 border-b text-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 accent-orange-500"
                      checked={!!row.approve}
                      disabled={!selectedUserId}
                      onChange={() => toggleCell(menu, "approve")}
                    />
                  </td>

                  {/* Special Action */}
                  <td className="px-3 py-3 border-b text-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 accent-orange-500"
                      checked={!!row.special}
                      disabled={!selectedUserId}
                      onChange={() => toggleCell(menu, "special")}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Update button aligned right */}
      <div className="w-full flex justify-end">
        <button
          onClick={handleUpdate}
          className="inline-flex items-center gap-2 px-4 h-9 rounded-md bg-green-600 text-white text-sm hover:bg-green-700 disabled:opacity-50"
          disabled={!selectedUserId}
        >
          Update
        </button>
      </div>
    </div>
  );
}
