import React from 'react';

const Task = ({ task, onDelete, onToggleComplete }) => {
  return (
    <div>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Due Date: {task.dueDate}</p>
      <p>Priority: {task.priority}</p>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggleComplete(task.id)}
      />
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </div>
  );
};
export default Task;
