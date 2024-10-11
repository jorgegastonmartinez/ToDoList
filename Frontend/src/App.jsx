import React, { useEffect, useState } from 'react'

const App = () => {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editTaskId, setEditTaskId] = useState(null);
  const [fetchDataTrigger, setFetchDataTrigger] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/tasks")

        if(!response.ok) {
          throw new Error("Error al obtener los datos desde MongoDB")
        }
        const data = await response.json()

        setTasks(data)
      } catch (error) {
        console.error("Error:", error);
      }
    }

    if (fetchDataTrigger) {
      fetchData()
      setFetchDataTrigger(false)
    }
  }, [fetchDataTrigger])

  const handleTasks = async (e) => {
    e.preventDefault()

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
        throw new Error("Error al enviar los datos")
      }

      const data = await response.json()

      setTasks([...tasks, data]);

      setNewTask("")
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const editTask = async (taskId) => {
    if (!taskId) {
      console.error("Id de la tarea no válido");
      return;
    }

    setEditTaskId(taskId)

    try {
      const updatedTaskContent = prompt(
        "Actualizar",
        tasks.find((t) => t._id === taskId)?.task
      );

      if (updatedTaskContent !== null && updatedTaskContent.trim() !== "") {
        const response = await fetch(`http://localhost:8080/tasks/${taskId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ task: updatedTaskContent }),
        });

        if (!response.ok) {
          throw new Error("Error al intentar actualizar la tarea")
        }

        setTasks(tasks.map(t => (t._id === taskId ? {...t, task: updatedTaskContent} : t)))

        setFetchDataTrigger(true)
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setEditTaskId(null)
    }
  }

  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:8080/tasks/${taskId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Error al intentar eliminar la tarea")
      }

      setTasks(tasks.filter(t => t._id !== taskId))
    } catch (error) {
      console.error("Error:", error);
    }
  }



  return (
    <div>
      <h1>Ingrese una nueva tarea</h1>
      <form method="post" onSubmit={handleTasks}>
        <input
          type="text"
          placeholder="Nueva tarea"
          onChange={(e) => setNewTask(e.target.value)}
          value={newTask}
        />
        <button type='submit'>Agregar tarea</button>
      </form>

      <h2>Lista de tareas</h2>
      <ul>
        {tasks.map((t) => {
          return (
            <li key={t._id}>
               {t.task} 

              <button onClick={() => editTask(t._id)}>Editar tarea</button>
              <button onClick={() => deleteTask(t._id)}>Eliminar tarea</button>
            </li>
          )
        })}
      </ul>
    </div>
  );
}

export default App