import taskModel from "../models/taskModel.js";
import mongoose from 'mongoose';

export const getTasks = async (req, res) => {
    try {
        const tasks = await taskModel.find();

        if (!tasks || tasks.length === 0) {
            return res.status(200).json([]);
        }

        res.json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error al intentar obtener las tareas",
            error: error.message,
        });
    }
}

export const createTask = async (req, res) => {
    try {
        const { task } = req.body;

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
};

export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Id incorrecto" });
        }

        const { task, completed } = req.body;

        if (!task && completed === undefined) {
            return res.status(400).json({ message: "Al menos uno de los campos 'task' o 'completed' es requerido" });
        }

        const updateData = {};
        if (task) updateData.task = task; 
        if (completed !== undefined) updateData.completed = completed; 
    
        const updatedTask = await taskModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: `Tarea con el id: ${id} no fue encontrada` });
        }

        res.json({ message: `Tarea ${id} actualizada`, updatedTask });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar la tarea" });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Id no válido" });
        }

        const deletedTask = await taskModel.findOneAndDelete({ _id: id });

        if (!deletedTask) {
            return res.status(404).json({ message: `Tarea con el Id ${id} no encontrada` });
        }

        res.json({ message: `Tarea con el Id ${id} eliminada correctamente` });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error al eliminar la tarea",
            error: error.message,
        });
    }
};