import Cookies from "js-cookie";
import { useState } from "react";

export default function TaskAddForm({ onTaskAdded }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [status, setStatus] = useState("IN_PROGRESS");
  const [dueDate, setDueDate] = useState("");
  const [isLoadingPriority, setIsLoadingPriority] = useState(false);
  const [priorityError, setPriorityError] = useState(null);

  async function getPriority(taskDescription) {
    const url = "http://localhost:5001/api/priority";
    const payload = {
      task: taskDescription,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server error:", errorData);
        return { error: errorData.error };
      }

      const data = await response.json();
      console.log("Server response:", data);
      return data;
    } catch (error) {
      console.error("Network error:", error);
      return { error: "Network error" };
    }
  }

  const handleSuggestPriority = async (e) => {
    e.preventDefault();

    if (!description) {
      setPriorityError("Enter task description to get priority suggestion");
      return;
    }

    setIsLoadingPriority(true);
    setPriorityError(null);

    try {
      const result = await getPriority(description);

      if (result.priority) {
        const mappedPriority =
          result.priority.toUpperCase() === "HIGH"
            ? "HIGH"
            : result.priority.toUpperCase() === "LOW"
            ? "LOW"
            : "MEDIUM";
        setPriority(mappedPriority);
        console.log(`Suggested priority: ${mappedPriority}`);
      } else {
        setPriorityError(result.error || "Failed to get priority suggestion");
      }
    } catch (error) {
      console.error("Error while getting priority:", error);
      setPriorityError("Communication error with server");
    } finally {
      setIsLoadingPriority(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      title,
      description,
      priority,
      status,
      due_date: dueDate,
    };
    const token = Cookies.get("token");
    fetch("http://localhost:8080/api/tasks", {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    })
      .then((response) => {
        if (!response.ok) {
          console.log("Response status:", response.status);
          console.log("Response headers:", response.headers);
          throw new Error("Failed to create task");
        }

        return response.json();
      })
      .then((data) => {
        setTitle("");
        setDescription("");
        setPriority("MEDIUM");
        setStatus("IN_PROGRESS");
        setDueDate("");
        setPriorityError(null);
        onTaskAdded();
      })
      .catch((error) => {
        console.error("Error creating task:", error);
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full p-6 bg-white rounded-lg shadow-md space-y-4 text-black"
    >
      <h2 className="text-xl font-bold text-gray-800">Add New Task</h2>
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter task title"
          required
        />
      </div>
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter task description"
          rows="3"
          required
        ></textarea>
      </div>
      <div>
        <div className="flex justify-between items-center mb-1">
          <label
            htmlFor="priority"
            className="block text-sm font-medium text-gray-700"
          >
            Priority
          </label>
          <button
            type="button"
            onClick={handleSuggestPriority}
            disabled={isLoadingPriority}
            className={`text-sm px-3 py-1 rounded ${
              isLoadingPriority
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            {isLoadingPriority ? "Suggesting..." : "Suggest Priority"}
          </button>
        </div>
        {priorityError && (
          <p className="text-xs text-red-600 mb-1">{priorityError}</p>
        )}
        <select
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="HIGH">High</option>
          <option value="MEDIUM">Medium</option>
          <option value="LOW">Low</option>
        </select>
      </div>
      <div>
        <label
          htmlFor="status"
          className="block text-sm font-medium text-gray-700"
        >
          Status
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="TODO">To do</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="DONE">Completed</option>
        </select>
      </div>
      <div>
        <label
          htmlFor="due_date"
          className="block text-sm font-medium text-gray-700"
        >
          Due Date
        </label>
        <input
          type="date"
          id="due_date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Add Task
      </button>
    </form>
  );
}
