import { useState, useEffect } from "react";
import "./App.css";
import Task from "./Task";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  });
  const [editIndex, setEditIndex] = useState(null); // Track the index of the task being edited

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      try {
        const parsedTasks = JSON.parse(storedTasks);
        if (Array.isArray(parsedTasks)) {
          setTasks(parsedTasks);
        }
      } catch (error) {
        console.error("Error parsing tasks from localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addOrEditTask = () => {
    if (task.trim() === "") return;

    if (editIndex !== null) {
      // If editing, update the task
      const updatedTasks = tasks.map((t, i) => (i === editIndex ? task : t));
      setTasks(updatedTasks);
      setEditIndex(null); // Reset edit state
    } else {
      // If adding, append a new task
      setTasks([...tasks, task]);
    }

    setTask(""); // Clear the input field
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const startEditTask = (index) => {
    setTask(tasks[index]); // Set the task text in the input field
    setEditIndex(index); // Track which task is being edited
  };

  return (
    <div className="todo-container">
      <h1>To-Do List</h1>
      <input
        type="text"
        placeholder="Enter a new task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="todo-input"
      />
      <button onClick={addOrEditTask} className="todo-button">
        {editIndex !== null ? "Save Changes" : "Add Task"}
      </button>
      <div className="task-list">
        {tasks.map((task, index) => (
          <Task
            key={index}
            taskText={task}
            onDelete={() => deleteTask(index)}
            onEdit={() => startEditTask(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
