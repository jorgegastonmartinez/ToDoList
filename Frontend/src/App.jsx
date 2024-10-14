import React from 'react';
import './App.css';
import TaskCard from './components/TaskCard/TaskCard';
import TaskForm from './components/TaskForm/TaskForm';
import useTasks from './hooks/useTasks';

const App = () => {
  const {
    tasks,
    newTask,
    setNewTask,
    handleTasks,
    editTask,
    deleteTask,
    toggleTaskStatus,
  } = useTasks();

  return (
    <div className="App">
      <h1>Ingrese una nueva tarea</h1>
      <TaskForm
        newTask={newTask}
        setNewTask={setNewTask}
        handleTasks={handleTasks}
      />

      <h2>Lista de tareas</h2>
      <div className="task-card-container">
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onEdit={editTask}
            onDelete={deleteTask}
            onToggleStatus={toggleTaskStatus}
          />
        ))}
      </div>
    </div>
  );
}

export default App