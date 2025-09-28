export default function KPICard({
  title,
  value,
  icon: Icon,
  iconBg = "from-red-500 to-orange-500", // gradient tailwind classes
}) {
  return (
    <div className="flex items-center gap-3 bg-white rounded-2xl shadow-sm ring-1 ring-slate-100 px-4 py-3">
      {/* Icon tile */}
      <div
        className={`w-10 h-10 rounded-xl grid place-items-center 
                    bg-gradient-to-br ${iconBg} text-white shadow`}
      >
        {Icon && <Icon className="text-lg" />}
      </div>

      {/* Text */}
      <div>
        <div className="text-slate-800 font-semibold leading-5">{title}</div>
        <div className="text-sm text-emerald-600 font-medium">{value}</div>
      </div>
    </div>
  );
}


export function KPIGrid({ children }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {children}
    </div>
  );
}