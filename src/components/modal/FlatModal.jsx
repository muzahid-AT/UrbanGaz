import { useEffect, useRef, useState } from "react";

export default function FlatModal({
  open,
  onClose,
  onSubmit,
  buildings = [],
}) {
  const [form, setForm] = useState({
    buildingName: "",
    flatName: "",
    floorName: "",
    status: "active",

    ownerName: "",
    ownerPhone: "",
    ownerAddress: "",
    ownerNid: "",

    customerName: "",
    hasRenter: false,     // <-- NEW
    renterName: "",
    renterPhone: "",
    renterAddress: "",
    renterNid: "",
  });

  const firstRef = useRef(null);

  // reset when closed
  useEffect(() => {
    if (!open) {
      setForm({
        buildingName: "",
        flatName: "",
        floorName: "",
        status: "active",
        ownerName: "",
        ownerPhone: "",
        ownerAddress: "",
        ownerNid: "",
        customerName: "",
        hasRenter: false,  // <-- reset
        renterName: "",
        renterPhone: "",
        renterAddress: "",
        renterNid: "",
      });
    }
  }, [open]);

  // focus first, ESC to close, body-scroll lock
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

  const toggleRenter = (checked) => {
    setForm((s) => ({
      ...s,
      hasRenter: checked,
      // clear renter fields when toggled off
      ...(checked
        ? {}
        : { renterName: "", renterPhone: "", renterAddress: "", renterNid: "" }),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.buildingName || !form.flatName || !form.floorName) {
      alert("Building, Flat and Floor are required.");
      return;
    }

    // Only include renter fields if hasRenter === true
    const {
      hasRenter,
      renterName,
      renterPhone,
      renterAddress,
      renterNid,
      ...rest
    } = form;

    const payload = { ...rest, hasRenter };
    if (hasRenter) {
      payload.renterName = renterName;
      payload.renterPhone = renterPhone;
      payload.renterAddress = renterAddress;
      payload.renterNid = renterNid;
    }

    onSubmit?.(payload); // parent will console.log
    onClose?.();
  };

  const stop = (e) => e.stopPropagation();

  const L = ({ children }) => (
    <label className="block text-sm text-slate-700 mb-1">{children}</label>
  );

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[100] bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="flat-modal-title"
    >
      <div className="h-full w-full overflow-y-auto p-0 sm:p-4" onClick={stop}>
        <div
          className="
            mx-auto w-full sm:max-w-2xl
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
              <h2 id="flat-modal-title" className="text-slate-700 font-semibold">
                Add New Flat
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Primary */}
              <div className="sm:col-span-2">
                <L>
                  Building <span className="text-red-600">*</span>
                </L>
                {buildings?.length ? (
                  <select
                    ref={firstRef}
                    name="buildingName"
                    value={form.buildingName}
                    onChange={onChange}
                    className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none bg-white focus:ring-2 focus:ring-emerald-500"
                    required
                  >
                    <option value="">Select building</option>
                    {buildings.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    ref={firstRef}
                    name="buildingName"
                    value={form.buildingName}
                    onChange={onChange}
                    className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Building name"
                    required
                  />
                )}
              </div>

              <div>
                <L>
                  Flat <span className="text-red-600">*</span>
                </L>
                <input
                  name="flatName"
                  value={form.flatName}
                  onChange={onChange}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="e.g., A-101 / F12"
                  required
                />
              </div>

              <div>
                <L>
                  Floor <span className="text-red-600">*</span>
                </L>
                <input
                  name="floorName"
                  value={form.floorName}
                  onChange={onChange}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="e.g., 5th / A2"
                  required
                />
              </div>

              <div>
                <L>Status</L>
                <select
                  name="status"
                  value={form.status}
                  onChange={onChange}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none bg-white focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              {/* Owner */}
              <div className="sm:col-span-2 mt-2 font-medium text-slate-700">
                Owner Information
              </div>

              <div>
                <L>Owner Name</L>
                <input
                  name="ownerName"
                  value={form.ownerName}
                  onChange={onChange}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Owner name"
                />
              </div>
              <div>
                <L>Owner Phone</L>
                <input
                  name="ownerPhone"
                  value={form.ownerPhone}
                  onChange={onChange}
                  inputMode="tel"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="01XXXXXXXXX"
                />
              </div>
              <div className="sm:col-span-2">
                <L>Owner Address</L>
                <input
                  name="ownerAddress"
                  value={form.ownerAddress}
                  onChange={onChange}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Address"
                />
              </div>
              <div>
                <L>Owner NID</L>
                <input
                  name="ownerNid"
                  value={form.ownerNid}
                  onChange={onChange}
                  inputMode="numeric"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="National ID"
                />
              </div>

              {/* Customer & Renter */}
              <div className="sm:col-span-2 mt-2 flex items-center justify-between">
                {/* <span className="font-medium text-slate-700">
                  Renter / Customer Information
                </span> */}

                {/* NEW: checkbox */}
                <label className="inline-flex items-center gap-2 select-none">
                  <input
                    type="checkbox"
                    className="h-4 w-4"
                    checked={form.hasRenter}
                    onChange={(e) => toggleRenter(e.target.checked)}
                  />
                  <span className="text-sm text-slate-700">Has Renter / Tenant</span>
                </label>
              </div>

              {/* <div className="sm:col-span-2">
                <L>Customer Name</L>
                <input
                  name="customerName"
                  value={form.customerName}
                  onChange={onChange}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Customer name (if applicable)"
                />
              </div> */}

              {/* Conditionally render renter fields */}
              {form.hasRenter && (
                <>
                  <div>
                    <L>Renter Name</L>
                    <input
                      name="renterName"
                      value={form.renterName}
                      onChange={onChange}
                      className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="Renter name"
                    />
                  </div>

                  <div>
                    <L>Renter Phone</L>
                    <input
                      name="renterPhone"
                      value={form.renterPhone}
                      onChange={onChange}
                      inputMode="tel"
                      className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="01XXXXXXXXX"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <L>Renter Address</L>
                    <input
                      name="renterAddress"
                      value={form.renterAddress}
                      onChange={onChange}
                      className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="Address"
                    />
                  </div>

                  <div>
                    <L>Renter NID</L>
                    <input
                      name="renterNid"
                      value={form.renterNid}
                      onChange={onChange}
                      inputMode="numeric"
                      className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="National ID"
                    />
                  </div>
                </>
              )}
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
