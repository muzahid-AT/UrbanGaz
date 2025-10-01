import { useEffect, useRef, useState } from "react";

export default function BuildingModal({
  open,
  onClose,
  onSubmit,
  districts = [],
  franchises = [],
}) {
  const [form, setForm] = useState({
    franchiseName: "",
    buildingName: "",
    address: "",
    district: "",
    area: "",
    numberOfFlats: "",
    contactName: "",
    contactPhone: "",
    note: "",
  });

  const firstRef = useRef(null);

  // reset when closed
  useEffect(() => {
    if (!open) {
      setForm({
        franchiseName: "",
        buildingName: "",
        address: "",
        district: "",
        area: "",
        numberOfFlats: "",
        contactName: "",
        contactPhone: "",
        note: "",
      });
    }
  }, [open]);

  // focus, esc, body lock
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

  const handleSubmit = (e) => {
    e.preventDefault();

    // basic validation
    if (!form.franchiseName || !form.buildingName || !form.address) {
      alert("Franchise, Building Name and Address are required.");
      return;
    }
    const flats = parseInt(form.numberOfFlats, 10);
    if (form.numberOfFlats && (isNaN(flats) || flats < 1)) {
      alert("Number of flats must be a positive number.");
      return;
    }

    onSubmit?.({
      ...form,
      numberOfFlats: flats || null,
    });
    onClose?.();
  };

  const stop = (e) => e.stopPropagation();

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[100] bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="building-modal-title"
    >
      {/* scrollable viewport for small screens */}
      <div className="h-full w-full overflow-y-auto p-0 sm:p-4" onClick={stop}>
        <div
          className="
            mx-auto w-full sm:max-w-xl
            bg-white shadow-xl
            rounded-none sm:rounded-xl
            h-full sm:h-auto
            flex flex-col
          "
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {/* Sticky header */}
          <div className="top-0 z-10 bg-white border-b px-5 py-3">
            <div className="flex items-center justify-between">
              <h2 id="building-modal-title" className="text-slate-700 font-semibold">
                Add New Building
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

          {/* Body (scrolls) */}
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-5 py-4">
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-slate-700 mb-1">
                  Franchise <span className="text-red-600">*</span>
                </label>
                <select
                  ref={firstRef}
                  name="franchiseName"
                  value={form.franchiseName}
                  onChange={onChange}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none bg-white focus:ring-2 focus:ring-emerald-500"
                  required
                >
                  <option value="">Select franchise</option>
                  {franchises.map((f) => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-slate-700 mb-1">
                  Building Name <span className="text-red-600">*</span>
                </label>
                <input
                  name="buildingName"
                  value={form.buildingName}
                  onChange={onChange}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="e.g., Building 12"
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
                  onChange={onChange}
                  rows={3}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Street, area, city"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-slate-700 mb-1">District</label>
                <select
                  name="district"
                  value={form.district}
                  onChange={onChange}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none bg-white focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="">Select district</option>
                  {districts.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-slate-700 mb-1">Area</label>
                <input
                  name="area"
                  value={form.area}
                  onChange={onChange}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Uttara / Banani / ..."
                />
              </div>

              <div>
                <label className="block text-sm text-slate-700 mb-1">Number of Flats</label>
                <input
                  name="numberOfFlats"
                  value={form.numberOfFlats}
                  onChange={onChange}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="e.g., 120"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-700 mb-1">Contact Person Name</label>
                <input
                  name="contactName"
                  value={form.contactName}
                  onChange={onChange}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Contact name"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-700 mb-1">Contact Person Phone</label>
                <input
                  name="contactPhone"
                  value={form.contactPhone}
                  onChange={onChange}
                  inputMode="tel"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="01XXXXXXXXX"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-700 mb-1">Note</label>
                <textarea
                  name="note"
                  value={form.note}
                  onChange={onChange}
                  rows={2}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Optional note"
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
