import { useState, useEffect } from 'react';
import './App.css';
import Todo from './components/Todo';
import Showtodo from './components/Showtodo';

// Retrieve data from localStorage
const getLocalItems = () => {
  const items = localStorage.getItem('items');
  return items ? JSON.parse(items) : [];
}

function App() {
  const [list, setList] = useState(getLocalItems());
  const [filter, setFilter] = useState('all');

  const addTodo = (text) => {
    const newTodo = [...list, { text, timestamp: new Date(), completed: false }];
    setList(newTodo);
  }

  const removeTodo = (index) => {
    const newTodos = [...list];
    newTodos.splice(index, 1);
    setList(newTodos);
  };

  const editTodo = (index, newText) => {
    const newTodos = [...list];
    newTodos[index].text = newText;
    newTodos[index].timestamp = new Date();
    setList(newTodos);
  };

  const toggleComplete = (index) => {
    const newTodos = [...list];
    newTodos[index].completed = !newTodos[index].completed;
    setList(newTodos);
  };

  // Store data in localStorage
  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(list));
  }, [list]);

  const filterTodos = (todos, filter) => {
    const now = new Date();
    if (filter === 'today') {
      return todos.filter(todo => {
        const todoDate = new Date(todo.timestamp);
        return todoDate.toDateString() === now.toDateString();
      });
    } else if (filter === 'yesterday') {
      const yesterday = new Date(now);
      yesterday.setDate(now.getDate() - 1);
      return todos.filter(todo => {
        const todoDate = new Date(todo.timestamp);
        return todoDate.toDateString() === yesterday.toDateString();
      });
    }
    return todos;
  };

  const filteredList = filterTodos(list, filter);

  return (
    <div className="container">
      <h1>TODO LIST</h1>
      <div className="filter-container">
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="today">Today</option>
          <option value="yesterday">Yesterday</option>
        </select>
      </div>
      <Todo addTodo={addTodo} />
      <Showtodo list={filteredList} removeTodo={removeTodo} editTodo={editTodo} toggleComplete={toggleComplete} />
    </div>
  );
}

export default App;
