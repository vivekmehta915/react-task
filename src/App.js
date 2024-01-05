// App.js
import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Modal from 'react-modal';
import './styles.css';

Modal.setAppElement('#root');

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [completionFilter, setCompletionFilter] = useState('All');
  const [editedTask, setEditedTask] = useState(null);
  const [isAddFormVisible, setAddFormVisible] = useState(false);
  const [isEditFormVisible, setEditFormVisible] = useState(false);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
    setAddFormVisible(false);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const toggleComplete = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const editTask = (task) => {
    setEditedTask(task);
    setEditFormVisible(true);
  };

  const onEditTask = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setEditedTask(null);
    setEditFormVisible(false);
  };

  const filteredTasks = tasks.filter((task) => {
    const priorityCondition =
      priorityFilter === 'All' || task.priority === priorityFilter;
    const completionCondition =
      completionFilter === 'All' ||
      (completionFilter === 'Completed' ? task.completed : !task.completed);

    return (
      priorityCondition &&
      completionCondition &&
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const upcomingTasks = tasks.filter(
    (task) => !task.completed && new Date(task.dueDate) > new Date()
  );

  const overdueTasks = tasks.filter(
    (task) => !task.completed && new Date(task.dueDate) < new Date()
  );

  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <div className="container">
      <h1>Task Manager</h1>
      <div className='filterRow'>
        <div className="filterBox">
          <label>Search: </label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filterBox">
          <label>Priority Filter: </label>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div className="filterBox">
          <label>Completion Filter: </label>
          <select
            value={completionFilter}
            onChange={(e) => setCompletionFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Completed">Completed</option>
            <option value="NotCompleted">Not Completed</option>
          </select>
        </div>
      </div>
      <div className="addButton">
        <button onClick={() => setAddFormVisible(true)}>Add Task</button>
      </div>
      <div className='boxRow'>
        <div className="taskList">
          <h2>Upcoming Tasks</h2>
          <TaskList
            tasks={upcomingTasks.filter((task) => filteredTasks.includes(task))}
            onDelete={deleteTask}
            onToggleComplete={toggleComplete}
            onEdit={editTask}
          />
        </div>
        <div className="taskList">
          <h2>Overdue Tasks</h2>
          <TaskList
            tasks={overdueTasks.filter((task) => filteredTasks.includes(task))}
            onDelete={deleteTask}
            onToggleComplete={toggleComplete}
            onEdit={editTask}
          />
        </div>
        <div className="taskList">
          <h2>Completed Tasks</h2>
          <TaskList
            tasks={completedTasks.filter((task) => filteredTasks.includes(task))}
            onDelete={deleteTask}
            onToggleComplete={toggleComplete}
            onEdit={editTask}
          />
        </div>
      </div>


      <Modal
        isOpen={isAddFormVisible}
        onRequestClose={() => setAddFormVisible(false)}
        contentLabel="Add Task Modal"
        className="modal"
      >
        <TaskForm onAddTask={addTask} onCancel={() => setAddFormVisible(false)} />
      </Modal>

      <Modal
        isOpen={isEditFormVisible}
        onRequestClose={() => setEditFormVisible(false)}
        contentLabel="Edit Task Modal"
        className="modal"
      >
        <TaskForm
          onEditTask={onEditTask}
          editedTask={editedTask}
          onCancel={() => setEditFormVisible(false)}
        />
      </Modal>
    </div>
  );
};

export default App;
