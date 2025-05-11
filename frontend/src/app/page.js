"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleGetStarted = (e) => {
    e.preventDefault();
    if (isLoggedIn) {
      router.push("/tasks");
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gray-100">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/ai-task-manager-logo.svg"
          alt="AI Task Manager Logo"
          width={180}
          height={38}
          priority
        />
        <h1 className="text-3xl font-bold text-center sm:text-left text-black">
          Manage your tasks with the help of AI
        </h1>
        <p className="text-lg text-center sm:text-left text-gray-600">
          Boost your productivity with an intelligent AI assistant that helps
          you organize, prioritize, and track your tasks.
        </p>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <button
            onClick={handleGetStarted}
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-blue-600 text-white gap-2 hover:bg-blue-700 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
          >
            Get Started Now
          </button>
          <a
            className="rounded-full text-black border border-solid border-gray-300 dark:border-gray-600 transition-colors flex items-center justify-center hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto"
            href="/about"
          >
            Learn More
          </a>
        </div>
      </main>
    </div>
  );
}
