import React, { useState, useEffect } from 'react';

const TaskForm = ({ onAddTask, editedTask, onEditTask, onCancel }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('Low');

    useEffect(() => {
        if (editedTask) {
            setTitle(editedTask.title || '');
            setDescription(editedTask.description || '');
            setDueDate(editedTask.dueDate || '');
            setPriority(editedTask.priority || 'Low');
        }
    }, [editedTask]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editedTask) {
            onEditTask({
                ...editedTask,
                title,
                description,
                dueDate,
                priority,
            });
        } else {
            const newTask = {
                id: new Date().getTime(),
                title,
                description,
                dueDate,
                priority,
                completed: false,
            };

            onAddTask(newTask);
        }

        setTitle('');
        setDescription('');
        setDueDate('');
        setPriority('Low');
    };

    return (
        <div className="taskForm">
            <form onSubmit={handleSubmit}>
                <div className="closeIcon" onClick={onCancel}>
                    &times;
                </div>
                <label>Title: </label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

                <label>Description: </label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />

                <label>Due Date: </label>
                <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />

                <label>Priority: </label>
                <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>

                <button type="submit">{editedTask ? 'Edit Task' : 'Add Task'}</button>
            </form>
        </div>
    );
};

export default TaskForm;