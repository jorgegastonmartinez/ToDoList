import mongoose from "mongoose";

const collection = "Task"
const taskSchema = new mongoose.Schema({
  task: {
    type: String,
    require: true,
  },
});

const taskModel = mongoose.model(collection, taskSchema)

export default taskModel;