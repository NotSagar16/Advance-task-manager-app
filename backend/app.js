const express=require('express');
const app=express();
const cors=require('cors')
const taskModel=require('./Models/tasks');
app.use(cors());
app.use(express.json());

app.post('/api/addtask', async function (req, res) {
    try {
      const { title, description } = req.body;
      const task = await taskModel.create({ title, description });
      res.status(201).json(task); // Return the created task
    } catch (error) {
      console.error('Error adding task:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.get('/api/tasks', async function (req, res) {
    try {
      const tasks = await taskModel.find();
      res.status(200).json(tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.delete('/api/deletetask/:id', async function (req, res) {
    try {
      const { id } = req.params;
      await taskModel.findByIdAndDelete(id);
      res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
      console.error('Error deleting task:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.listen(3000,()=>{
    console.log("server started")
})