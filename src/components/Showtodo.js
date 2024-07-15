import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Showtodo.css';
import {formatDate} from './formatDate.js'

function Showtodo({ list, removeTodo, editTodo,toggleComplete }) {
  const [isEditing, setIsEditing] = useState(null);
  const [newText, setNewText] = useState('');

  const handleEdit = (index, text) => {
    setIsEditing(index);
    setNewText(text);
  };

  const saveEdit = (index) => {
    editTodo(index, newText);
    setIsEditing(null);
    setNewText('');
  };

  return (
    <div className="todo-list">
      {list.map((l, index) => (
        <div key={index} className={`todo-item ${l.completed ? 'completed' : ''}`}>
          <input
            type="checkbox"
            checked={l.completed}
            onChange={() => toggleComplete(index)}
            className="mx-2"
          />
          {isEditing === index ? (
            <input
              type="text"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              onBlur={() => saveEdit(index)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  saveEdit(index);
                }
              }}
            />
          ) : (
            <div className="todo-text">
              <h3>{l.text}</h3>
            </div>
          )}
          <div className="todo-footer">
            <i
              onClick={() => handleEdit(index, l.text)}
              className="fas fa-edit text-primary mx-2 edit-icon"
            ></i>
            <i
              onClick={() => removeTodo(index)}
              className="fas fa-trash-alt text-danger mx-2 delete-icon"
            ></i>
            <span className="timestamp">{formatDate(l.timestamp)}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Showtodo;
