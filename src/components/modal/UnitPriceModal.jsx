import { useEffect, useMemo, useRef, useState } from "react";
import SelectWithCheckboxes from "../../components/common/SelectWithCheckboxes"; // adjust path

export default function UnitPriceModal({
  open,
  onClose,
  onSubmit,
  franchises = [],
  buildings,                 // <-- no default []
  buildingsByFranchise = null, // { [franchiseName]: string[] }
}) {
  const [form, setForm] = useState({
    franchises: [],   // array of selected franchises
    buildings: [],    // array of selected buildings
    month: "",
    unitPrice: "",
    serviceChargePct: "",
    lateFeeDate: "",
    lateFeePct: "",
  });

  const firstRef = useRef(null);

  // Reset when closed
  useEffect(() => {
    if (!open) {
      setForm({
        franchises: [],
        buildings: [],
        month: "",
        unitPrice: "",
        serviceChargePct: "",
        lateFeeDate: "",
        lateFeePct: "",
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

  // Hooks must run before conditional return
  const monthOptions = useMemo(() => {
    const base = new Date();
    base.setDate(1);
    const out = [];
    for (let i = 0; i < 12; i++) {
      const d = new Date(base.getFullYear(), base.getMonth() + i, 1);
      out.push(d.toLocaleString("en-US", { month: "long", year: "numeric" }));
    }
    return out;
  }, []);

  // ✅ Stable building options:
  // - If using buildingsByFranchise: build a union from selected franchises
  // - Else: fall back to the flat 'buildings' prop (or [])
  const buildingOptions = useMemo(() => {
    if (buildingsByFranchise) {
      if (!form.franchises.length) return [];
      const set = new Set();
      form.franchises.forEach((f) =>
        (buildingsByFranchise[f] || []).forEach((b) => set.add(b))
      );
      return Array.from(set);
    }
    return Array.isArray(buildings) ? buildings : [];
  }, [buildingsByFranchise, form.franchises, buildings]);

  // ✅ Prune selected buildings ONLY when it actually changes to avoid loops
  useEffect(() => {
    setForm((s) => {
      const filtered = s.buildings.filter((b) => buildingOptions.includes(b));
      if (
        filtered.length === s.buildings.length &&
        filtered.every((v, i) => v === s.buildings[i])
      ) {
        return s; // no change -> no re-render
      }
      return { ...s, buildings: filtered };
    });
  }, [buildingOptions]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.franchises.length) return alert("Select at least one franchise.");
    if (!form.buildings.length) return alert("Please select at least one building.");
    if (!form.month) return alert("Month is required.");

    const unitPrice = parseFloat(form.unitPrice);
    if (isNaN(unitPrice) || unitPrice <= 0)
      return alert("Unit Price must be a positive number.");

    const sc =
      form.serviceChargePct.trim() === "" ? null : parseFloat(form.serviceChargePct);
    if (sc !== null && (isNaN(sc) || sc < 0))
      return alert("Service Charge must be a non-negative number.");

    const lfp = form.lateFeePct.trim() === "" ? null : parseFloat(form.lateFeePct);
    if (lfp !== null && (isNaN(lfp) || lfp < 0))
      return alert("Late Fee Amount (%) must be a non-negative number.");

    const payload = {
      franchises: form.franchises,
      buildings: form.buildings,
      month: form.month,
      unitPrice,
      serviceChargePct: sc,
      lateFeeDate: form.lateFeeDate || null,
      lateFeePct: lfp,
    };

    onSubmit?.(payload);
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
      aria-labelledby="unit-price-modal-title"
    >
      {/* Scroll wrapper */}
      <div className="h-full w-full overflow-y-auto p-0 sm:p-4" onClick={stop}>
        {/* Panel */}
        <div
          className="mx-auto w-full sm:max-w-xl bg-white shadow-xl rounded-none sm:rounded-xl h-full sm:h-auto flex flex-col"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {/* Header */}
          <div className="top-0 z-10 bg-white border-b px-5 py-3">
            <div className="flex items-center justify-between">
              <h2 id="unit-price-modal-title" className="text-slate-700 font-semibold">
                Add New Setup
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
              {/* Franchise(s) */}
              <SelectWithCheckboxes
                options={franchises}
                value={form.franchises}
                onChange={(arr) => setForm((s) => ({ ...s, franchises: arr }))}
                label="Franchise(s)"
                placeholder="Select franchise(s)"
              />

              {/* Building(s) */}
              <SelectWithCheckboxes
                options={buildingOptions}
                value={form.buildings}
                onChange={(arr) => setForm((s) => ({ ...s, buildings: arr }))}
                label="Building(s)"
                placeholder="Select building(s)"
                disabled={buildingsByFranchise ? form.franchises.length === 0 : false}
              />

              {/* Month */}
              <div>
                <L>Month</L>
                <select
                  name="month"
                  value={form.month}
                  onChange={handleChange}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none bg-white focus:ring-2 focus:ring-emerald-500"
                  required
                >
                  <option value="">Select option</option>
                  {monthOptions.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              {/* Unit Price */}
              <div>
                <L>Unit Price</L>
                <input
                  ref={firstRef}
                  name="unitPrice"
                  value={form.unitPrice}
                  onChange={handleChange}
                  type="number"
                  step="0.01"
                  min="0"
                  inputMode="decimal"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              {/* Service Charge (%) */}
              <div>
                <L>Service Charge (%)</L>
                <input
                  name="serviceChargePct"
                  value={form.serviceChargePct}
                  onChange={handleChange}
                  type="number"
                  step="0.01"
                  min="0"
                  inputMode="decimal"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Late Fee Date */}
              <div>
                <L>Late Fee Date</L>
                <input
                  name="lateFeeDate"
                  value={form.lateFeeDate}
                  onChange={handleChange}
                  type="date"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Late Fee (%) */}
              <div>
                <L>Late Fee Amount (%)</L>
                <input
                  name="lateFeePct"
                  value={form.lateFeePct}
                  onChange={handleChange}
                  type="number"
                  step="0.01"
                  min="0"
                  inputMode="decimal"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          </form>

          {/* Footer */}
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
