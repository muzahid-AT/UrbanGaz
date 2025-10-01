import { useEffect, useRef, useState } from "react";
import SelectWithCheckboxes from "../../components/common/SelectWithCheckboxes"; // <- adjust if needed

export default function AddUserModal({
  open,
  onClose,
  onSubmit,
  roles = ["Admin", "Franchise Manager", "User"],
  franchises = [],
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "",
    accountType: "",        // "Admin" | "Customer"
    franchises: [],         // multi
    profileFile: null,
  });

  const firstRef = useRef(null);

  // Reset when closed
  useEffect(() => {
    if (!open) {
      setForm({
        name: "",
        email: "",
        password: "",
        phone: "",
        role: "",
        accountType: "",
        franchises: [],
        profileFile: null,
      });
    }
  }, [open]);

  // Focus + ESC + body scroll lock
  useEffect(() => {
    if (!open) return;
    firstRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const onPickFile = (e) => {
    const f = e.target.files?.[0] || null;
    setForm((s) => ({ ...s, profileFile: f }));
  };

  const validate = () => {
    if (!form.name.trim()) return "User Name is required.";
    if (!form.email.trim()) return "Email is required.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return "Invalid email.";
    if (!form.password.trim()) return "Password is required.";
    if (!form.phone.trim()) return "Phone Number is required.";
    if (!form.role) return "User Role is required.";
    if (!form.accountType) return "Please choose Admin or Customer.";
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    if (err) return alert(err);

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password, // send hashed in real app
      phone: form.phone.trim(),
      role: form.role,
      accountType: form.accountType,
      franchises: form.franchises,
      profileImage: form.profileFile
        ? { name: form.profileFile.name, size: form.profileFile.size, type: form.profileFile.type }
        : null,
    };

    console.log("Add User payload:", payload);
    onSubmit?.(payload);
    onClose?.();
  };

  const stop = (e) => e.stopPropagation();
  const L = ({ children }) => <label className="block text-sm text-slate-700 mb-1">{children}</label>;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[100] bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-user-modal-title"
    >
      {/* Scroll wrapper */}
      <div className="h-full w-full overflow-y-auto p-0 sm:p-4" onClick={stop}>
        <div
          className="mx-auto w-full sm:max-w-xl bg-white shadow-xl rounded-none sm:rounded-xl h-full sm:h-auto flex flex-col"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {/* Sticky header */}
          <div className="top-0 z-10 bg-white border-b px-5 py-3">
            <div className="flex items-center justify-between">
              <h2 id="add-user-modal-title" className="text-slate-700 font-semibold">
                Add New User
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="p-1 rounded hover:bg-slate-100"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Body */}
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-5 py-4">
            <div className="space-y-3">
              <div>
                <L>User Name</L>
                <input
                  ref={firstRef}
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder=""
                />
              </div>

              <div>
                <L>Email</L>
                <input
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  type="email"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder=""
                />
              </div>

              <div>
                <L>Password</L>
                <input
                  name="password"
                  value={form.password}
                  onChange={onChange}
                  type="password"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder=""
                />
              </div>

              <div>
                <L>Phone Number</L>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={onChange}
                  inputMode="tel"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder=""
                />
              </div>

              {/* User Role (single select) */}
              <div>
                <L>
                  User Role<span className="text-red-600">*</span>
                </L>
                <select
                  name="role"
                  value={form.role}
                  onChange={onChange}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none bg-white focus:ring-2 focus:ring-emerald-500"
                  required
                >
                  <option value="">Select option</option>
                  {roles.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              {/* Account Type (radio) */}
              <div>
                <L>
                  <span>User Type</span> <span className="text-red-600">*</span>
                </L>
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="accountType"
                      value="Admin"
                      checked={form.accountType === "Admin"}
                      onChange={onChange}
                    />
                    <span>Admin</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="accountType"
                      value="Customer"
                      checked={form.accountType === "Customer"}
                      onChange={onChange}
                    />
                    <span>Customer</span>
                  </label>
                </div>
              </div>

              {/* Franchises (multi-select with checkboxes) */}
              <SelectWithCheckboxes
                options={franchises}
                value={form.franchises}
                onChange={(arr) => setForm((s) => ({ ...s, franchises: arr }))}
                label="Franchise"
                placeholder="Select options"
              />

              {/* Profile Image */}
              <div>
                <L>Profile Image</L>
                <input
                  type="file"
                  accept="image/*"
                  onChange={onPickFile}
                  className="block w-full text-sm text-slate-700
                             file:mr-3 file:py-2 file:px-4
                             file:rounded-md file:border-0
                             file:text-sm file:font-semibold
                             file:bg-emerald-600 file:text-white
                             hover:file:bg-emerald-700"
                />
                {form.profileFile && (
                  <p className="text-xs text-slate-500 mt-1">
                    {form.profileFile.name} ({Math.round(form.profileFile.size / 1024)} KB)
                  </p>
                )}
              </div>
            </div>
          </form>

          {/* Sticky footer */}
          <div className="bottom-0 z-10 bg-white border-t px-5 py-3">
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="h-10 px-4 rounded-md bg-red-600 text-white hover:bg-red-700"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="h-10 px-4 rounded-md bg-emerald-600 text-white hover:bg-emerald-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
