import { useEffect, useMemo, useRef, useState } from "react";

export default function SelectWithCheckboxes({
  options = [],
  value = [],               // array of selected strings
  onChange,                 // (nextArray) => void
  placeholder = "Select...",
  label = "Select",
  disabled = false,
}) {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const rootRef = useRef(null);

  // Close on outside click / ESC
  useEffect(() => {
    const onDoc = (e) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const filtered = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return options;
    return options.filter((o) => String(o).toLowerCase().includes(q));
  }, [options, filter]);

  const toggle = (opt) => {
    const set = new Set(value);
    set.has(opt) ? set.delete(opt) : set.add(opt);
    onChange(Array.from(set));
  };

  const selectAll = () => onChange([...options]);
  const clearAll = () => onChange([]);

  const triggerClasses =
    "w-full rounded-md border px-3 py-2 text-left bg-white focus:outline-none " +
    (disabled
      ? "border-slate-200 text-slate-400 cursor-not-allowed"
      : "border-slate-300 hover:bg-slate-50 focus:ring-2 focus:ring-emerald-500");

  return (
    <div className="relative" ref={rootRef}>
      {label && <label className="block text-sm text-slate-700 mb-1">{label}</label>}

      {/* Trigger (styled like a select) */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setOpen((s) => !s)}
        className={triggerClasses}
      >
        {value.length === 0 ? (
          <span className="text-slate-400">{placeholder}</span>
        ) : (
          <span className="text-slate-700">
            {value.length === 1 ? value[0] : `${value.length} selected`}
          </span>
        )}
        <span className="float-right opacity-60">▾</span>
      </button>

      {/* Dropdown */}
      {open && !disabled && (
        <div className="absolute z-[200] mt-1 w-full rounded-md border border-slate-200 bg-white shadow-lg">
          {/* Actions + Search */}
          <div className="p-2 border-b flex items-center gap-2">
            <button
              type="button"
              onClick={selectAll}
              className="text-xs px-2 py-1 rounded border border-slate-300 hover:bg-slate-50"
            >
              Select All
            </button>
            <button
              type="button"
              onClick={clearAll}
              className="text-xs px-2 py-1 rounded border border-slate-300 hover:bg-slate-50"
            >
              Clear
            </button>
            <input
              type="text"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Search…"
              className="ml-auto w-40 rounded border border-slate-300 px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Options (scrollable) */}
          <div className="max-h-56 overflow-y-auto p-2">
            {filtered.length === 0 && (
              <div className="text-sm text-slate-500 px-1 py-2">No options</div>
            )}
            {filtered.map((opt) => {
              const checked = value.includes(opt);
              return (
                <label
                  key={opt}
                  className="flex items-center gap-2 px-2 py-1 rounded hover:bg-slate-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="h-4 w-4"
                    checked={checked}
                    onChange={() => toggle(opt)}
                  />
                  <span className="text-sm text-slate-700">{opt}</span>
                </label>
              );
            })}
          </div>

          {/* Footer */}
          <div className="p-2 border-t text-xs text-slate-500">
            {value.length}/{options.length} selected
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="float-right text-emerald-700 hover:underline"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
