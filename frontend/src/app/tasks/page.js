"use client";
import { useEffect, useState } from "react";
import TaskList from "../../components/TaskList";
import Cookies from "js-cookie";

export default function TaskPage() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
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
          setTasks(result.data); // Ustaw dane z pola `data`
        } else {
          throw new Error(result.message || "Failed to fetch tasks");
        }
      } catch (err) {
        console.error("Failed to fetch tasks:", err);
        setError(err.message);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {error ? (
        <div className="text-red-500">Error: {error}</div>
      ) : (
        <TaskList tasks={tasks} />
      )}
    </div>
  );
}
