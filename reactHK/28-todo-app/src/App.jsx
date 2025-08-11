import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");

  // Load tasks from localStorage on first render
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add a new task
  const addTask = () => {
    if (task.trim() === "") return;
    setTasks([...tasks, { id: Date.now(), text: task, completed: false }]);
    setTask("");
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  // Toggle completed state
  const toggleComplete = (id) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  // Filtered tasks based on selected filter
  const filteredTasks = tasks.filter((t) => {
    if (filter === "Completed") return t.completed;
    if (filter === "Pending") return !t.completed;
    return true;
  });

  return (
    <div className="app">
      <h1>To-Do List</h1>

      {/* Input and Add button */}
      <div className="input-area">
        <input
          type="text"
          placeholder="Enter a task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>

      {/* Filter buttons */}
      <div className="filters">
        <button
          className={filter === "All" ? "active" : ""}
          onClick={() => setFilter("All")}
        >
          All
        </button>
        <button
          className={filter === "Completed" ? "active" : ""}
          onClick={() => setFilter("Completed")}
        >
          Completed
        </button>
        <button
          className={filter === "Pending" ? "active" : ""}
          onClick={() => setFilter("Pending")}
        >
          Pending
        </button>
      </div>

      {/* Task list */}
      <ul>
        {filteredTasks.length === 0 ? (
          <p>No tasks found.</p>
        ) : (
          filteredTasks.map((t) => (
            <li key={t.id} className={t.completed ? "completed" : ""}>
              <span onClick={() => toggleComplete(t.id)}>{t.text}</span>
              <button className="delete-btn" onClick={() => deleteTask(t.id)}>
                ❌
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;
