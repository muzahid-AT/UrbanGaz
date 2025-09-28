// at the top
import UsersList from "./UsersList";
import RolesMatrix from "./RolesMatrix";
import UserPermissionMatrix from "./UserPermissionMatrix";
import { useState } from "react";

// ...keep your mockUsers as-is
function Tab({ active, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 h-9 rounded-md text-sm font-semibold border
        ${active
          ? "bg-orange-500 text-white border-orange-600"
          : "bg-slate-900 text-white/90 border-slate-800 hover:bg-slate-800"}`}
    >
      {children}
    </button>
  );
}
/* ---------------- mock data ---------------- */
const mockUsers = [
  { id: 1, name: "Alice Johnson", email: "alice.johnson@example.com", phone: "01526834525", roles: ["Admin"], status: ["Active"], createdAt: "20-07-2025", lastLogin: { time: "6:05 PM", date: "20-07-2025" } },
  { id: 2, name: "Bob Smith", email: "bob.smith@example.com", phone: "01712345678", roles: ["Franchise Manager"], status: ["Pending"], createdAt: "19-07-2025", lastLogin: { time: "2:15 PM", date: "19-07-2025" } },
  { id: 3, name: "Charlie Davis", email: "charlie.davis@example.com", phone: "01698765432", roles: ["Admin", "Franchise Manager"], status: ["Suspended"], createdAt: "18-07-2025", lastLogin: { time: "11:45 AM", date: "18-07-2025" } },
  { id: 4, name: "Diana Roberts", email: "diana.roberts@example.com", phone: "01855544332", roles: ["User"], status: ["Active"], createdAt: "17-07-2025", lastLogin: { time: "4:20 PM", date: "17-07-2025" } },
  { id: 5, name: "Ethan Brown", email: "ethan.brown@example.com", phone: "01922334455", roles: ["Franchise Manager"], status: ["Active"], createdAt: "16-07-2025", lastLogin: { time: "9:10 AM", date: "16-07-2025" } },
  { id: 6, name: "Fiona Wilson", email: "fiona.wilson@example.com", phone: "01533445566", roles: ["Admin"], status: ["Pending"], createdAt: "15-07-2025", lastLogin: { time: "5:55 PM", date: "15-07-2025" } },
  { id: 7, name: "George Martin", email: "george.martin@example.com", phone: "01766778899", roles: ["User"], status: ["Suspended"], createdAt: "14-07-2025", lastLogin: { time: "12:30 PM", date: "14-07-2025" } },
  { id: 8, name: "Hannah White", email: "hannah.white@example.com", phone: "01677889900", roles: ["Franchise Manager"], status: ["Active"], createdAt: "13-07-2025", lastLogin: { time: "10:05 AM", date: "13-07-2025" } },
  { id: 9, name: "Ian Thompson", email: "ian.thompson@example.com", phone: "01899887766", roles: ["Admin"], status: ["Active"], createdAt: "12-07-2025", lastLogin: { time: "3:45 PM", date: "12-07-2025" } },
  { id: 10, name: "Jane Cooper", email: "jane.cooper@example.com", phone: "01911223344", roles: ["User"], status: ["Pending"], createdAt: "11-07-2025", lastLogin: { time: "1:25 PM", date: "11-07-2025" } },
  { id: 11, name: "Kevin Scott", email: "kevin.scott@example.com", phone: "01544556677", roles: ["Admin", "Franchise Manager"], status: ["Suspended"], createdAt: "10-07-2025", lastLogin: { time: "8:40 AM", date: "10-07-2025" } },
  { id: 12, name: "Laura King", email: "laura.king@example.com", phone: "01788990011", roles: ["Franchise Manager"], status: ["Active"], createdAt: "09-07-2025", lastLogin: { time: "7:20 PM", date: "09-07-2025" } },
  { id: 13, name: "Michael Young", email: "michael.young@example.com", phone: "01622334455", roles: ["User"], status: ["Active"], createdAt: "08-07-2025", lastLogin: { time: "6:35 PM", date: "08-07-2025" } },
  { id: 14, name: "Nina Perez", email: "nina.perez@example.com", phone: "01833445566", roles: ["Franchise Manager"], status: ["Pending"], createdAt: "07-07-2025", lastLogin: { time: "11:50 AM", date: "07-07-2025" } },
  { id: 15, name: "Oscar Lewis", email: "oscar.lewis@example.com", phone: "01955667788", roles: ["Admin"], status: ["Active"], createdAt: "06-07-2025", lastLogin: { time: "9:00 AM", date: "06-07-2025" } },
];

export default function UserManagement() {
  const [activeTab, setActiveTab] = useState("list");

  const onAddUser = () => alert("Add New User");

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex items-center gap-3">
        <Tab active={activeTab === "list"} onClick={() => setActiveTab("list")}>Users List</Tab>
        <Tab active={activeTab === "roles"} onClick={() => setActiveTab("roles")}>Users Roles</Tab>
        <Tab active={activeTab === "perm"} onClick={() => setActiveTab("perm")}>Users Permission</Tab>
      </div>

      {/* Card */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm">
        {/* Content by tab */}
        {activeTab === "list" && (
          <UsersList users={mockUsers} onAddUser={onAddUser} />
        )}

        {activeTab === "roles" && (
          <>
            {/* If you still want a top-right Save button, keep it here or move inside RolesMatrix */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
              <h2 className="text-lg font-semibold text-slate-800">Users Roles</h2>
            </div>
            <RolesMatrix />
          </>
        )}

        {activeTab === "perm" && (
          <>
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
              <h2 className="text-lg font-semibold text-slate-800">Permission Management</h2>
            </div>
            <UserPermissionMatrix
              users={mockUsers.map(({ id, name, email }) => ({ id, name, email }))}
            />
          </>
        )}
      </div>
    </div>
  );
}
