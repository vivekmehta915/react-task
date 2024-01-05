import React from 'react';
import Task from './Task';

const TaskList = ({ tasks, onDelete, onToggleComplete, onEdit }) => {
  return (
    <div className='taskBox'>
      {tasks.map((task) => (
        <div key={task.id} className="task">
          <Task
            task={task}
            onDelete={onDelete}
            onToggleComplete={onToggleComplete}
          />
          <button className='editBtn' onClick={() => onEdit(task)}>Edit</button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
