import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100 px-4">
      <h1 className="text-7xl font-extrabold text-orange-500 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-slate-800 mb-2">
        Oops! Page not found
      </h2>
      <p className="text-slate-600 mb-6 text-center max-w-md">
        {error?.statusText || error?.message || "The page you are looking for doesn’t exist or has been moved."}
      </p>

      <Link
        to="/"
        className="px-6 py-2 rounded-lg bg-orange-500 text-white font-medium hover:bg-orange-600 transition"
      >
        Back to Home
      </Link>
    </div>
  );
}
