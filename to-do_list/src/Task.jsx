import React from "react";
import "./Task.css";

const Task = ({ taskText, onDelete, onEdit }) => {
  return (
    <div className="task">
      <p className="task_text">{taskText}</p>
      <button onClick={onEdit} className="edit-button">Edit</button>
      <button onClick={onDelete} className="delete-button">Delete</button>
    </div>
  );
};

export default Task;
