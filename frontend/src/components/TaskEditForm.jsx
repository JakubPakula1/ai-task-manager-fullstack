import { useState } from "react";
import Cookies from "js-cookie"; // Import js-cookie to get the token

export default function TaskEditForm({
  task,
  onUpdateTask,
  onCancel,
  onDeleteTask,
}) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [priority, setPriority] = useState(task.priority);
  const [status, setStatus] = useState(task.status);
  const [dueDate, setDueDate] = useState(task.due_date || ""); // Dodaj stan dla due_date

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedTask = {
      title,
      description,
      priority,
      status,
      due_date: dueDate, // Dodaj due_date do obiektu zadania
    };

    const token = Cookies.get("token"); // Pobierz token z ciasteczek

    try {
      const response = await fetch(
        `http://localhost:8080/api/tasks/${task.id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`, // Dodaj token do nagłówka
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTask), // Prześlij tylko zmienione pola
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update task: ${response.status}`);
      }

      const data = await response.json();
      console.log("Task updated successfully:", data);
      onUpdateTask(data); // Przekaż zaktualizowane zadanie do komponentu nadrzędnego
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDelete = async () => {
    const token = Cookies.get("token"); // Pobierz token z ciasteczek

    try {
      const response = await fetch(
        `http://localhost:8080/api/tasks/${task.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`, // Dodaj token do nagłówka
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete task: ${response.status}`);
      }

      console.log("Task deleted successfully");
      onDeleteTask(task.id); // Przekaż ID usuniętego zadania do komponentu nadrzędnego
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      onClick={(e) => e.stopPropagation()} // Zapobiegaj propagacji kliknięcia
      className="w-full p-6 bg-white rounded-lg shadow-md space-y-4 text-black"
    >
      <h2 className="text-xl font-bold text-gray-800">Edit Task</h2>
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
        <label
          htmlFor="priority"
          className="block text-sm font-medium text-gray-700"
        >
          Priority
        </label>
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
          <option value="TODO">Pending</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="DONE">Completed</option>
          <option value="CANCELED">Canceled</option>
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
      <div className="flex justify-between gap-4">
        <button
          type="button"
          onClick={handleDelete} // Wywołaj funkcję usuwania
          className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Delete
        </button>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Save Changes
          </button>
        </div>
      </div>
    </form>
  );
}
