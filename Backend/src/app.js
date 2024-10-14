import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config();
import taskRoutes from './routes/taskRoutes.js'; 

const app = express()
const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("Conexión exitosa a MongoDB"))
  .catch((error) => console.log("Error en la conexión a MongoDB", error));

  app.use('/', taskRoutes);

app.listen(PORT), () => {
    console.log(`Server is running on port ${PORT}`);
}