import { useState } from "react";
import TaskEditForm from "./TaskEditForm";
import TaskAddForm from "./TaskAddForm";

export default function TaskList({ tasks }) {
  const [editingTaskId, setEditingTaskId] = useState(null);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Task List</h2>

      {/* Add Task Form */}
      <div className="mb-4">
        <TaskAddForm />
      </div>

      {/* Task List */}
      <ul className="space-y-4">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`p-4 w-full cursor-pointer bg-white rounded-lg shadow-md flex flex-col sm:flex-row sm:justify-between sm:items-center ${
              editingTaskId === task.id ? "bg-gray-50" : "hover:bg-gray-100"
            }`}
            onClick={() =>
              setEditingTaskId(editingTaskId === task.id ? null : task.id)
            } // Toggle edit form on click
          >
            <div className="w-full">
              <div className="flex items-center">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {task.title}
                  </h3>
                  <p className="text-sm text-gray-600">{task.description}</p>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-4 flex items-center gap-4">
                  <span
                    className={`px-3 py-1 text-sm font-medium rounded-full ${
                      task.status === "DONE"
                        ? "bg-green-100 text-green-800"
                        : task.status === "IN_PROGRESS"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {task.status}
                  </span>
                  <span
                    className={`px-3 py-1 text-sm font-medium rounded-full ${
                      task.priority === "High"
                        ? "bg-red-100 text-red-800"
                        : task.priority === "Medium"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {task.priority}
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
                    }}
                    onCancel={() => setEditingTaskId(null)}
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
