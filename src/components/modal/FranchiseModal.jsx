import { useEffect, useRef, useState } from "react";

export default function FranchiseModal({ open, onClose, onSubmit, districts = [] }) {
  const [form, setForm] = useState({
    name: "",
    address: "",
    district: "",
    area: "",
    contactName: "",
    contactPhone: "",
    tin: "",
  });

  const firstFieldRef = useRef(null);

  // reset when closed
  useEffect(() => {
    if (!open) {
      setForm({
        name: "",
        address: "",
        district: "",
        area: "",
        contactName: "",
        contactPhone: "",
        tin: "",
      });
    }
  }, [open]);

  // focus first input, esc to close, lock body scroll
  useEffect(() => {
    if (!open) return;

    firstFieldRef.current?.focus();

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.address.trim()) {
      alert("Franchise Name and Address are required.");
      return;
    }
    onSubmit?.(form);
    onClose?.();
  };

  const stop = (e) => e.stopPropagation();

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[100] bg-black/50"
      aria-modal="true"
      role="dialog"
      aria-labelledby="franchise-modal-title"
    >
      {/* Scrollable viewport wrapper so small screens can scroll */}
      <div className="h-full w-full overflow-y-auto p-0 sm:p-4" onClick={stop}>
        {/* Panel: full height on mobile, centered card on >= sm */}
        <div
          className="
            mx-auto w-full sm:max-w-xl
            bg-white shadow-xl
            rounded-none sm:rounded-xl
            h-full sm:h-auto
            flex flex-col
          "
          // smooth momentum scrolling on iOS
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {/* Sticky header */}
          <div className="top-0 z-10 bg-white border-b px-5 py-3">
            <div className="flex items-center justify-between">
              <h2 id="franchise-modal-title" className="text-slate-700 font-semibold">
                Add New Franchise
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="p-1 rounded hover:bg-slate-100"
                aria-label="Close"
                title="Close"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Scrollable body */}
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-5 py-4">
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-slate-700 mb-1">
                  Franchise Name <span className="text-red-600">*</span>
                </label>
                <input
                  ref={firstFieldRef}
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Enter franchise name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-slate-700 mb-1">
                  Address <span className="text-red-600">*</span>
                </label>
                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
                  rows={3}
                  placeholder="Street, area, city"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-slate-700 mb-1">District</label>
                <select
                  name="district"
                  value={form.district}
                  onChange={handleChange}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="">Select option</option>
                  {districts.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-slate-700 mb-1">Area</label>
                <input
                  name="area"
                  value={form.area}
                  onChange={handleChange}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Area"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-700 mb-1">Contact Person Name</label>
                <input
                  name="contactName"
                  value={form.contactName}
                  onChange={handleChange}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Contact name"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-700 mb-1">Contact Person Phone</label>
                <input
                  name="contactPhone"
                  value={form.contactPhone}
                  onChange={handleChange}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="01XXXXXXXXX"
                  inputMode="tel"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-700 mb-1">TIN Number</label>
                <input
                  name="tin"
                  value={form.tin}
                  onChange={handleChange}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="TIN-000000"
                />
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
                formAction="#"
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
