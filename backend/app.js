const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/user');
const todoRoutes = require('./routes/todo'); 

dotenv.config();

const app = express();


app.use(express.json());
app.use(cors());


app.use('/api/v1', authRoutes); 
app.use('/api/v2', todoRoutes); 


mongoose
  .connect("mongodb+srv://Rishiv:1221@cluster0.wux8rdt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => console.error('MongoDB connection error:', err));

const PORT = 1000;

app.listen(PORT, () => {
  console.log("Server Started");
});
