import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="py-16 text-center space-y-3">
      <h1 className="text-2xl font-bold text-black">404</h1>
      <p className="text-xs text-zinc-500">Page not found.</p>
      <Link to="/" className="inline-block px-4 py-2 bg-black text-white text-xs font-medium">
        Go Home
      </Link>
    </div>
  );
}
