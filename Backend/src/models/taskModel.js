import mongoose from "mongoose";

const collection = "Task"

const taskSchema = new mongoose.Schema({
  task: {
    type: String,
    require: true,
  },
  createdAt: { type: Date, default: Date.now },
  completed: { type: Boolean, default: false },
});

const taskModel = mongoose.model(collection, taskSchema)

export default taskModel;