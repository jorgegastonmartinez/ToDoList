import { useEffect, useState } from 'react';

const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);
  const [fetchDataTrigger, setFetchDataTrigger] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/tasks");
        if (!response.ok) {
          throw new Error("Error al obtener los datos desde MongoDB");
        }
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (fetchDataTrigger) {
      fetchData();
      setFetchDataTrigger(false);
    }
  }, [fetchDataTrigger]);

  const handleTasks = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) {
      alert("Debes ingresar la tarea");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task: newTask }),
      });

      if (!response.ok) {
        throw new Error("Error al enviar los datos");
      }

      const data = await response.json();
      setTasks([...tasks, data]);
      setNewTask("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const editTask = async (taskId) => {
    if (!taskId) {
      console.error("Id de la tarea no válido");
      return;
    }

    setEditTaskId(taskId);

    try {
      const updatedTaskContent = prompt("Actualizar", tasks.find((t) => t._id === taskId)?.task);

      if (updatedTaskContent !== null && updatedTaskContent.trim() !== "") {
        const response = await fetch(`http://localhost:8080/tasks/${taskId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ task: updatedTaskContent }),
        });

        if (!response.ok) {
          throw new Error("Error al intentar actualizar la tarea");
        }

        setTasks(tasks.map(t => (t._id === taskId ? { ...t, task: updatedTaskContent } : t)));
        setFetchDataTrigger(true);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setEditTaskId(null);
    }
  };

  const toggleTaskStatus = async (taskId) => {
    try {
        const taskToToggle = tasks.find(t => t._id === taskId);

        if (!taskToToggle) {
            console.error("Tarea no encontrada");
            return;
        }

        const response = await fetch(`http://localhost:8080/tasks/${taskId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ completed: !taskToToggle.completed }),
        });

        if (!response.ok) {
            throw new Error("Error al intentar actualizar el estado de la tarea");
        }

        const updatedTask = await response.json();
        setTasks(tasks.map(t => (t._id === taskId ? { ...t, completed: updatedTask.updatedTask.completed } : t)));
    } catch (error) {
        console.error("Error:", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:8080/tasks/${taskId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error al intentar eliminar la tarea");
      }

      setTasks(tasks.filter(t => t._id !== taskId));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return {
    tasks,
    newTask,
    setNewTask,
    handleTasks,
    editTask,
    deleteTask,
    toggleTaskStatus,
  };
};

export default useTasks;
