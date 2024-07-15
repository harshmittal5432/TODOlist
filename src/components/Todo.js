import React, { useState } from 'react';
import './Todo.css';

function Todo({ addtodo }) {
  const [text, setText] = useState('');

  const handleClick = (e) => {
    e.preventDefault();
    if (!text) return;
    addtodo(text);
    setText('');
  }

  return (
    <div className="todo-input">
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Add new todo task" />
      <button onClick={handleClick} className="btn btn-info mx-2">+</button>
    </div>
  );
}

export default Todo;

