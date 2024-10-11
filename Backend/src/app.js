import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import taskModel from './models/taskModel.js';
dotenv.config();

const app = express()
const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("Conexión exitosa a MongoDB"))
  .catch((error) => console.log("Error en la conexión a MongoDB", error));

app.get('/tasks', async (req, res) => {
    try {
        const task = await taskModel.find();

        if (!task || task.length === 0) {
            return res.status(200).json([])
        }
        res.json(task)
    } catch (error) {
        console.error(error);
        res
          .status(500)
          .json({
            message: "Error al intentar obtener las tareas",
            error: error.nessage,
          });
    }
})

app.post("/tasks", async (req, res) => {
    try {
        const {task} = req.body

        if (!task || task.trim() === "") {
            return res.status(400).json({ message: "Debes agregar la tarea" });
        }

        const newTask = new taskModel({ task });

        const savedTask = await newTask.save();

        res.json(savedTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error al crear la tarea",
            error: error.message
        });
    }
})

app.put("/tasks/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Id incorrecto" });
        }

        const { task } = req.body;

        if(!task) {
            return res
              .status(400)
              .json({ message: "El campo tarea es requerido" });
        }
    
        const updatedTasks = await taskModel.findByIdAndUpdate(
          id,
          { task },
          { new: true }
        );

        if (!updatedTasks) {
            return res.status(404).json({message: `Tarea con el id: ${id} no fue encontrada`})
        }
        res.json({message: `Tarea ${id} actualizada`, updatedTasks})
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Error al actualizar la tarea"})
    }
})

app.delete("/tasks/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Id no válido" });
        }
        const deletedTask = await taskModel.findOneAndDelete(id);

        if(!deletedTask) {
            return res.status(404).json({message: `Tarea con el Id ${id} no encontrada`})
        }

        res.json({message: `Tarea con el Id ${id} eliminada correctamente`})
    } catch (error) {
        console.error(error);
        res
          .status(500)
          .json({
            message: "Error al eliminar la tarea",
            error: error.message,
          });
    }
})

app.listen(PORT), () => {
    console.log(`Server is running on port ${PORT}`);
}