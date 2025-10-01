import { useEffect, useMemo, useRef, useState } from "react";
import SelectWithCheckboxes from "../../components/common/SelectWithCheckboxes"; // <-- adjust path

export default function PaymentModal({
  open,
  onClose,
  onSubmit,                  // (payload) => void
  franchises = [],           // string[]
  buildingsByFranchise = {}, // { [franchiseName]: string[] }
  flatsByBuilding = {},      // { [buildingName]: string[] }
}) {
  const [form, setForm] = useState({
    franchises: [],   // multi
    buildings: [],    // multi
    flats: [],        // multi
    amount: "",
    method: "bKash",  // "bKash" | "Nagad" | "Cash" | "Bank"
    reference: "",
    date: "",
  });

  const firstRef = useRef(null);

  // reset when closed
  useEffect(() => {
    if (!open) {
      setForm({
        franchises: [],
        buildings: [],
        flats: [],
        amount: "",
        method: "bKash",
        reference: "",
        date: "",
      });
    }
  }, [open]);

  // focus + esc + lock body scroll
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

  // Month/dep options (union logic)
  const buildingOptions = useMemo(() => {
    if (!form.franchises.length) return [];
    const set = new Set();
    form.franchises.forEach((f) => (buildingsByFranchise[f] || []).forEach((b) => set.add(b)));
    return Array.from(set);
  }, [form.franchises, buildingsByFranchise]);

  const flatOptions = useMemo(() => {
    if (!form.buildings.length) return [];
    const set = new Set();
    form.buildings.forEach((b) => (flatsByBuilding[b] || []).forEach((fl) => set.add(fl)));
    return Array.from(set);
  }, [form.buildings, flatsByBuilding]);

  // prune selections if parent changes
  useEffect(() => {
    setForm((s) => {
      const nextBuildings = s.buildings.filter((b) => buildingOptions.includes(b));
      if (nextBuildings.length === s.buildings.length && nextBuildings.every((v, i) => v === s.buildings[i])) return s;
      return { ...s, buildings: nextBuildings, flats: [] }; // reset flats if buildings pruned
    });
  }, [buildingOptions]);

  useEffect(() => {
    setForm((s) => {
      const nextFlats = s.flats.filter((fl) => flatOptions.includes(fl));
      if (nextFlats.length === s.flats.length && nextFlats.every((v, i) => v === s.flats[i])) return s;
      return { ...s, flats: nextFlats };
    });
  }, [flatOptions]);

  if (!open) return null;

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const setMethod = (m) => setForm((s) => ({ ...s, method: m }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.franchises.length) return alert("Select at least one franchise.");
    if (!form.buildings.length) return alert("Select at least one building.");
    if (!form.flats.length) return alert("Select at least one flat.");
    const amt = parseFloat(form.amount);
    if (isNaN(amt) || amt <= 0) return alert("Bill Amount must be a positive number.");
    if (!form.date) return alert("Payment Date is required.");
    if (form.method !== "Cash" && !form.reference.trim())
      return alert("Reference Number is required for non-cash payments.");

    const payload = {
      franchises: form.franchises,
      buildings: form.buildings,
      flats: form.flats,
      amount: amt,
      method: form.method,
      reference: form.method === "Cash" ? null : form.reference.trim(),
      date: form.date, // yyyy-mm-dd
    };

    // console.log("Add Payment (multi) payload:", payload);
    onSubmit?.(payload);
    onClose?.();
  };

  const stop = (e) => e.stopPropagation();
  const L = ({ children }) => <label className="block text-sm text-slate-700 mb-1">{children}</label>;

  const MethodPill = ({ value, children }) => {
    const active = form.method === value;
    return (
      <button
        type="button"
        onClick={() => setMethod(value)}
        className={
          "h-9 px-3 rounded-md border text-sm " +
          (active
            ? "border-orange-400 ring-1 ring-orange-300 bg-orange-50 text-slate-800"
            : "border-slate-300 bg-white hover:bg-slate-50 text-slate-700")
        }
      >
        {children}
      </button>
    );
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[100] bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="payment-modal-title"
    >
      <div className="h-full w-full overflow-y-auto p-0 sm:p-4" onClick={stop}>
        <div
          className="mx-auto w-full sm:max-w-xl bg-white shadow-xl rounded-none sm:rounded-xl h-full sm:h-auto flex flex-col"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {/* Sticky header */}
          <div className="top-0 z-10 bg-white border-b px-5 py-3">
            <div className="flex items-center justify-between">
              <h2 id="payment-modal-title" className="text-slate-700 font-semibold">
                Add Payment
              </h2>
              <button type="button" onClick={onClose} className="p-1 rounded hover:bg-slate-100" aria-label="Close">
                ✕
              </button>
            </div>
          </div>

          {/* Body */}
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-5 py-4">
            <div className="space-y-3">
              {/* Franchise(s) */}
              <SelectWithCheckboxes
                options={franchises}
                value={form.franchises}
                onChange={(arr) => setForm((s) => ({ ...s, franchises: arr }))}
                label="Franchise(s) *"
                placeholder="Select franchise(s)"
              />

              {/* Building(s) */}
              <SelectWithCheckboxes
                options={buildingOptions}
                value={form.buildings}
                onChange={(arr) => setForm((s) => ({ ...s, buildings: arr }))}
                label="Building(s) *"
                placeholder="Select building(s)"
                disabled={!form.franchises.length}
              />

              {/* Flat(s) */}
              <SelectWithCheckboxes
                options={flatOptions}
                value={form.flats}
                onChange={(arr) => setForm((s) => ({ ...s, flats: arr }))}
                label="Flat(s) *"
                placeholder="Select flat(s)"
                disabled={!form.buildings.length}
              />

              {/* Bill Amount */}
              <div>
                <L>
                  Bill Amount <span className="text-red-600">*</span>
                </L>
                <input
                  ref={firstRef}
                  name="amount"
                  value={form.amount}
                  onChange={onChange}
                  type="number"
                  step="0.01"
                  min="0"
                  inputMode="decimal"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
                <p className="text-xs text-slate-500 mt-1">
                  This amount will be applied to each selected flat.
                </p>
              </div>

              {/* Payment Method */}
              <div>
                <L>
                  Payment Method <span className="text-red-600">*</span>
                </L>
                <div className="flex flex-wrap items-center gap-2">
                  <MethodPill value="bKash">bKash</MethodPill>
                  <MethodPill value="Nagad">Nagad</MethodPill>
                  <MethodPill value="Cash">Cash</MethodPill>
                  <MethodPill value="Bank">Bank</MethodPill>
                </div>
              </div>

              {/* Reference Number */}
              <div>
                <L>Reference Number{form.method !== "Cash" && " *"}</L>
                <input
                  name="reference"
                  value={form.reference}
                  onChange={onChange}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder={form.method === "Cash" ? "N/A for cash" : "Txn/Reference number"}
                  required={form.method !== "Cash"}
                />
              </div>

              {/* Payment Date */}
              <div>
                <L>
                  Payment Date <span className="text-red-600">*</span>
                </L>
                <input
                  name="date"
                  value={form.date}
                  onChange={onChange}
                  type="date"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>
            </div>
          </form>

          {/* Sticky footer */}
          <div className="bottom-0 z-10 bg-white border-t px-5 py-3">
            <div className="flex items-center justify-end gap-2">
              <button type="button" onClick={onClose} className="h-10 px-4 rounded-md bg-red-600 text-white hover:bg-red-700">
                Cancel
              </button>
              <button onClick={handleSubmit} className="h-10 px-4 rounded-md bg-emerald-600 text-white hover:bg-emerald-700">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
