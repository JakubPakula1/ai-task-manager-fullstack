"use client";
import { useEffect, useState } from "react";
import TaskList from "../../components/TaskList";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function TaskPage() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Sprawdź, czy token istnieje
    const token = Cookies.get("token");
    if (!token) {
      // Jeśli nie ma tokenu, przekieruj na stronę logowania
      router.push("/login");
      return;
    }

    // Jeśli token istnieje, pobierz zadania
    fetchTasks();
  }, [router]);

  const fetchTasks = async () => {
    const token = Cookies.get("token");
    try {
      const response = await fetch("http://localhost:8080/api/tasks", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const result = await response.json();

      if (result.status === "success") {
        setTasks(result.data);
      } else {
        throw new Error(result.message || "Failed to fetch tasks");
      }
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {error ? (
        <div className="text-red-500">Error: {error}</div>
      ) : (
        <TaskList tasks={tasks} refreshTasks={fetchTasks} />
      )}
    </div>
  );
}
