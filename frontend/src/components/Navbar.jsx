"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Funkcja sprawdzająca, czy użytkownik jest zalogowany
  const checkLoginStatus = () => {
    const token = Cookies.get("token");
    setIsLoggedIn(!!token);
  };

  useEffect(() => {
    checkLoginStatus();
    checkLoginStatus();

    window.addEventListener("storage", checkLoginStatus);

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, [pathname]);

  const handleLogout = () => {
    Cookies.remove("token");
    setIsLoggedIn(false);
    router.push("/");
  };

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

        {isLoggedIn ? (
          <>
            <Link
              href="/tasks"
              className="hover:text-blue-400 transition-colors duration-200"
            >
              Tasks
            </Link>
            <button
              onClick={handleLogout}
              className="hover:text-blue-400 transition-colors duration-200 cursor-pointer"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            href="/login"
            className="hover:text-blue-400 transition-colors duration-200"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
