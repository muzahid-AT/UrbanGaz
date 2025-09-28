// src/pages/UserManagement/RolesMatrix.jsx
import { useState } from "react";

const MENUS = ["Franchise","Building","Flat","Unit Price","Meter Reading","Billing","SMS","User Management"];
const ACTIONS = ["view","create","edit","delete"];

export default function RolesMatrix() {
  const [selectedRole, setSelectedRole] = useState("");
  const [permissions, setPermissions] = useState({});
  const [roles, setRoles] = useState([]);

  const toggle = (menu, action) =>
    setPermissions(p => ({ ...p, [menu]: { view:false, create:false, edit:false, delete:false, ...(p[menu]||{}), [action]: !(p[menu]?.[action]) } }));

  const update = () => alert(`Updated permissions for: ${selectedRole || "(none)"}`);
  const addRole = () => {
    if (!selectedRole) return alert("Select a role first");
    const assignedMenus = Object.entries(permissions).filter(([,a]) => Object.values(a).some(Boolean)).map(([m]) => m);
    setRoles(r => [...r, { id: r.length+1, roleName: selectedRole, description: `${selectedRole} role`, franchiseAccess:false, canCreateUsers:false, assignedMenus }]);
    setPermissions({});
    setSelectedRole("");
  };
  const removeRole = id => setRoles(r => r.filter(x => x.id !== id));
  const save = () => alert("Saved (mock)");

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-3">
        <label className="text-slate-700 font-medium min-w-[110px]">Select Roles:</label>
        <select className="h-10 w-64 rounded-md border border-slate-300 px-3 outline-none focus:ring-2 focus:ring-orange-500"
                value={selectedRole} onChange={e=>setSelectedRole(e.target.value)}>
          <option value="">Select option</option>
          <option>Admin</option><option>Franchise Manager</option><option>User</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden min-w-[900px]">
          <thead>
            <tr className="bg-[#fbf3c0] text-slate-800">
              <th className="px-3 py-2 border-b w-16 text-left">S.N</th>
              <th className="px-3 py-2 border-b text-left">Menu</th>
              {ACTIONS.map(a=> <th key={a} className="px-3 py-2 border-b text-center capitalize">{a}</th>)}
            </tr>
          </thead>
          <tbody>
            {MENUS.map((m,i)=>{
              const row = permissions[m] || {};
              return (
                <tr key={m} className="odd:bg-white even:bg-slate-50">
                  <td className="px-3 py-3 border-b">{i+1}</td>
                  <td className="px-3 py-3 border-b">{m}</td>
                  {ACTIONS.map(a=>(
                    <td key={a} className="px-3 py-3 border-b text-center">
                      <input type="checkbox" className="w-4 h-4 accent-orange-500"
                             checked={!!row[a]} onChange={()=>toggle(m,a)} />
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end">
        <button onClick={update} className="px-4 h-9 rounded-md bg-green-600 text-white text-sm">Update</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-[#fbf3c0] text-slate-800">
              <th className="px-3 py-2 border-b w-16 text-left">S.N</th>
              <th className="px-3 py-2 border-b text-left">Role Name</th>
              <th className="px-3 py-2 border-b text-left">Description</th>
              <th className="px-3 py-2 border-b text-left">Franchise Access</th>
              <th className="px-3 py-2 border-b text-left">Can Create Users</th>
              <th className="px-3 py-2 border-b text-left">Assigned Menus</th>
              <th className="px-3 py-2 border-b text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {roles.length===0 ? (
              <tr><td colSpan={7} className="px-3 py-6 text-center text-slate-400 italic">
                No roles added yet. Click "Add Roles" to create one.
              </td></tr>
            ) : roles.map((r,idx)=>(
              <tr key={r.id} className="odd:bg-white even:bg-slate-50">
                <td className="px-3 py-3 border-b">{idx+1}</td>
                <td className="px-3 py-3 border-b">{r.roleName}</td>
                <td className="px-3 py-3 border-b">{r.description}</td>
                <td className="px-3 py-3 border-b">{r.franchiseAccess ? "Yes":"No"}</td>
                <td className="px-3 py-3 border-b">{r.canCreateUsers ? "Yes":"No"}</td>
                <td className="px-3 py-3 border-b">{r.assignedMenus.join(", ")}</td>
                <td className="px-3 py-3 border-b">
                  <button onClick={()=>removeRole(r.id)} className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between">
        <button onClick={addRole} className="px-3 h-9 rounded-md bg-green-600 text-white text-sm">+ Add Roles</button>
        <button onClick={save} className="px-3 h-9 rounded-md bg-orange-500 text-white text-sm">Save</button>
      </div>
    </div>
  );
}
