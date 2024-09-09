import React, { useState } from 'react';
import './App.css';
import { FaEdit, FaTrash, FaCheck } from 'react-icons/fa';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState('all');

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const editTask = (id, newText) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, text: newText } : task
    ));
    setEditId(null);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });

  return (
    <div className="app">
      <h1>Todo List</h1>

      <div className="task-input">
        <input 
          type="text" 
          value={newTask} 
          onChange={(e) => setNewTask(e.target.value)} 
          placeholder="Yeni görev ekle" 
        />
        <button onClick={addTask}>Ekle</button>
      </div>

      <div className="filters">
        <button onClick={() => setFilter('all')}>Tümü</button>
        <button onClick={() => setFilter('completed')}>Tamamlananlar</button>
        <button onClick={() => setFilter('incomplete')}>Tamamlanmayanlar</button>
      </div>

      <ul className="task-list">
        {filteredTasks.map(task => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            {editId === task.id ? (
              <input 
                type="text" 
                defaultValue={task.text} 
                onBlur={(e) => editTask(task.id, e.target.value)} 
              />
            ) : (
              <>
                <span onClick={() => toggleComplete(task.id)}>
                  {task.completed ? <FaCheck /> : ''}
                  {task.text}
                </span>
                <div className="actions">
                  <FaEdit onClick={() => setEditId(task.id)} />
                  <FaTrash onClick={() => deleteTask(task.id)} />
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
