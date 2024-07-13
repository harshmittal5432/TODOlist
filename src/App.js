import { useState } from 'react';
import './App.css';
import Todo from './components/Todo';
import Showtodo from './components/Showtodo';

function App() {
  const [list,setlist]=useState([]);
  const addtodo=(text)=>{
    const newtodo=[...list,{text, timestamp: new Date() }];
    setlist(newtodo);

  }
  const removeTodo = (index) => {
    const newTodos = [...list];
    newTodos.splice(index, 1); // Remove the item at the given index
    setlist(newTodos);
  };

  const editTodo = (index, newText) => {
    const newTodos = [...list];
    newTodos[index].text = newText;
    newTodos[index].timestamp = new Date();
    setlist(newTodos);
  };
  const toggleComplete = (index) => {
    const newTodos = [...list];
    newTodos[index].completed = !newTodos[index].completed;
    setlist(newTodos);
  };
  
    return (
    <div className="container">
     
      <h1>TODO LIST</h1>
      <Todo addtodo={addtodo} />
      <Showtodo list={list} removeTodo={removeTodo} editTodo={editTodo} toggleComplete={toggleComplete}/>
      
     
     
    </div>
  );
}

export default App;
