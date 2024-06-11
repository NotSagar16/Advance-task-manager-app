import React from 'react';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { MdDelete } from "react-icons/md";

const App = () => {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [todo, setTodo] = useState([])
  const notify = () => toast.warn("Fields can't be empty",{
    theme:"colored"
  });
  const added = () => toast.success("Task added!",{
    theme:"colored"
  });
  const deleted = () => toast.error("Task deleted!",{
    theme:"colored",
    icon:<MdDelete />
  });
  const addTask = async (e) => {
    e.preventDefault();
    if (title !== '' && desc !== '') {
      try {
        await axios.post('http://localhost:3000/api/addtask', {
          title: title,
          description: desc
        });
        setTitle('');
        setDesc('');
        added();
        setTodo([...todo]);
        fetchTasks();
        
      } catch (error) {
        console.error('Error adding task:', error);
      }
    } else {
      notify();
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/deletetask/${id}`);
      setTodo(todo.filter(task => task._id !== id)); 
      deleted();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/tasks');
      setTodo(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks(); 
  }, []);

  
  return (
    <div className='main'>
      <div className="container">
        <div className="inputs">
          <input type="text" placeholder='Title' value={title} onChange={e=>setTitle(e.target.value)}/>
          <input type="text" placeholder='Description' value={desc} onChange={e=>setDesc(e.target.value)}/>
          <button onClick={addTask}>Add</button>
        </div>
        <div className="tasks">
          {todo.map(task => (
              <div key={task._id} className="task">
                <h3>Title:{task.title}</h3>
                <p>Description:{task.description}</p>
                <button className='delete' onClick={() => deleteTask(task._id)}><MdDelete /></button>
              </div>
            ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default App