import { useState } from "react";
import TaskEditForm from "./TaskEditForm";
import TaskAddForm from "./TaskAddForm";

export default function TaskList({ tasks, refreshTasks }) {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [sortBy, setSortBy] = useState("none");

  const formatDate = (dateString) => {
    if (!dateString) return "Brak terminu";
    const date = new Date(dateString);
    return date.toLocaleDateString("pl-PL", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortBy === "priority") {
      const priorityMap = { HIGH: 3, MEDIUM: 2, LOW: 1 };
      return priorityMap[b.priority] - priorityMap[a.priority];
    } else if (sortBy === "dueDate") {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate) - new Date(b.dueDate);
    }
    return 0;
  });

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Task List</h2>

      {/* Add Task Form */}
      <div className="mb-4">
        <TaskAddForm onTaskAdded={refreshTasks} />
      </div>

      {/* Sorting Options */}
      <div className="mb-4 flex items-center space-x-4">
        <span className="text-gray-700">Sort by:</span>
        <div className="flex space-x-2">
          <button
            className={`px-3 py-1 rounded ${
              sortBy === "priority"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            }`}
            onClick={() => setSortBy("priority")}
          >
            Priority
          </button>
          <button
            className={`px-3 py-1 rounded ${
              sortBy === "dueDate"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            }`}
            onClick={() => setSortBy("dueDate")}
          >
            Due date
          </button>
          {sortBy !== "none" && (
            <button
              className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-700"
              onClick={() => setSortBy("none")}
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Task List */}
      <ul className="space-y-4">
        {sortedTasks.map((task) => (
          <li
            key={task.id}
            className={`p-4 w-full cursor-pointer bg-white rounded-lg shadow-md flex flex-col sm:flex-row sm:justify-between sm:items-center ${
              editingTaskId === task.id ? "bg-gray-50" : "hover:bg-gray-100"
            }`}
            onClick={() =>
              setEditingTaskId(editingTaskId === task.id ? null : task.id)
            }
          >
            <div className="w-full">
              <div className="flex items-center">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {task.title}
                  </h3>
                  <p className="text-sm text-gray-600">{task.description}</p>

                  {/* Wyświetlanie terminu wykonania */}
                  <p className="text-xs text-gray-500 mt-1">
                    Due date: {formatDate(task.dueDate)}
                  </p>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-4 flex items-center gap-4">
                  <span
                    className={`px-3 py-1 text-sm font-medium rounded-full ${
                      task.status === "DONE"
                        ? "bg-green-100 text-green-800"
                        : task.status === "IN_PROGRESS"
                        ? "bg-yellow-100 text-yellow-800"
                        : task.status === "CANCELED"
                        ? "bg-gray-100 text-gray-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {task.status === "TODO"
                      ? "To do"
                      : task.status === "IN_PROGRESS"
                      ? "In Progress"
                      : task.status === "DONE"
                      ? "Completed"
                      : task.status === "CANCELED"
                      ? "Canceled"
                      : task.status}
                  </span>
                  <span
                    className={`px-3 py-1 text-sm font-medium rounded-full ${
                      task.priority === "HIGH"
                        ? "bg-red-100 text-red-800"
                        : task.priority === "MEDIUM"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {task.priority === "HIGH"
                      ? "High"
                      : task.priority === "MEDIUM"
                      ? "Medium"
                      : task.priority === "LOW"
                      ? "Low"
                      : task.priority}
                  </span>
                </div>
              </div>

              {/* Edit Form */}
              {editingTaskId === task.id && (
                <div className="mt-4">
                  <TaskEditForm
                    task={task}
                    onUpdateTask={() => {
                      setEditingTaskId(null);
                      refreshTasks();
                    }}
                    onCancel={() => setEditingTaskId(null)}
                    onDeleteTask={() => {
                      setEditingTaskId(null);
                      refreshTasks();
                    }}
                  />
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
