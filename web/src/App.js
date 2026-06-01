import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [updatedTask, setUpdatedTask] = useState('');

  const API_URL = process.env.REACT_APP_API_URL || 'http://backend-service:5000';

  const fetchTodos = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/todos`);
      setTodos(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!newTask.trim()) return;
    await axios.post(`${API_URL}/api/todos`, { title: newTask });
    setNewTask('');
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API_URL}/api/todos/${id}`);
    fetchTodos();
  };

  const toggleComplete = async (todo) => {
    await axios.put(`${API_URL}/api/todos/${todo.id}`, {
      title: todo.title,
      completed: !todo.completed
    });
    fetchTodos();
  };

  const updateTodo = async (id) => {
    await axios.put(`${API_URL}/api/todos/${id}`, { title: updatedTask, completed: false });
    setEditingId(null);
    setUpdatedTask('');
    fetchTodos();
  };

  return (
    <div className="app-container">
      <h1>To-Do List</h1>
      <div className="input-container">
        <input
          type="text"
          value={newTask}
          placeholder="Add a new task..."
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            {editingId === todo.id ? (
              <>
                <input 
                  type="text" 
                  value={updatedTask} 
                  onChange={(e) => setUpdatedTask(e.target.value)} 
                />
                <button className="save-btn" onClick={() => updateTodo(todo.id)}>Save</button>
              </>
            ) : (
              <>
                <span onClick={() => toggleComplete(todo)} className="todo-title">
                  {todo.completed ? '✅ ' : '⬜ '} {todo.title}
                </span>
                <div className="actions">
                  <button onClick={() => { setEditingId(todo.id); setUpdatedTask(todo.title); }}>Edit</button>
                  <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;