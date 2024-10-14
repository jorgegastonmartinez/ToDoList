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
      <h1 className='title-app'>¡AGREGA TU PRÓXIMA TAREA!</h1>
      <TaskForm
        newTask={newTask}
        setNewTask={setNewTask}
        handleTasks={handleTasks}
      />

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