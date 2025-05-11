import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-4 py-3 bg-gray-800 text-white shadow-md mb-4">
      {/* Logo on the left */}
      <div className="flex items-center">
        <span className="ml-2 text-lg font-semibold">AI Task Manager</span>
      </div>

      {/* Links on the right */}
      <div className="flex items-center gap-6">
        <Link
          href="/"
          className="hover:text-blue-400 transition-colors duration-200"
        >
          Home
        </Link>
        <Link
          href="/tasks"
          className="hover:text-blue-400 transition-colors duration-200"
        >
          Tasks
        </Link>
        <Link
          href="/login"
          className="hover:text-blue-400 transition-colors duration-200"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}
