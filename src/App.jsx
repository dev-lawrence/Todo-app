import React, { useState, useRef, useEffect } from 'react';
import ToggleBg from './components/ToggleBg';
import Togglemode from './components/ToggleMode';
import TodoList from './components/TodoList';
import './sass/main.scss';

const LOCAL_STORAGE_KEY = 'mytodo.todos';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedTodos ? JSON.parse(storedTodos) : [];
  });
  const [filter, setFilter] = useState('all');
  const [draggedTodo, setDraggedTodo] = useState(null);
  const todoNameRef = useRef();
  const touchStartPositionRef = useRef(null);

  //  save the data when changes are made
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  // function to add todo
  const handleAddTodo = (event) => {
    event.preventDefault();
    const name = todoNameRef.current.value;
    if (!name) return;

    setTodos((prevTodos) => {
      return [
        ...prevTodos,
        {
          id: crypto.randomUUID(),
          name: name,
          isComplete: false,
        },
      ];
    });

    todoNameRef.current.value = null;
  };

  // function to remove todo
  const handleRemoveTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // function to toggle todo
  const handleToggleTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.isComplete = !todo.isComplete;
    setTodos(newTodos);
  };

  // clear completed todos
  const handleClearCompletedTodos = () => {
    setTodos(todos.filter((todo) => !todo.isComplete));
  };

  // function to filter todos
  const filterTodos = () => {
    if (filter === 'active') {
      return todos.filter((todo) => !todo.isComplete);
    } else if (filter === 'completed') {
      return todos.filter((todo) => todo.isComplete);
    } else {
      return todos;
    }
  };

  // handle drag start
  const handleDragStart = (event, todo) => {
    setDraggedTodo(todo);
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', JSON.stringify(todo));
  };

  // handle drag over
  const handleDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  // handle drop
  const handleDrop = (event, targetTodo) => {
    event.preventDefault();
    const data = JSON.parse(event.dataTransfer.getData('text/plain'));
    if (data.id !== targetTodo.id) {
      const targetIndex = todos.findIndex((t) => t.id === targetTodo.id);
      const draggedIndex = todos.findIndex((t) => t.id === data.id);
      const newTodos = [...todos];
      newTodos.splice(draggedIndex, 1);
      newTodos.splice(targetIndex, 0, data);
      setTodos(newTodos);
    }
  };

  // handle drag end
  const handleDragEnd = () => {
    setDraggedTodo(null);
  };

  // handle touch start
  const handleTouchStart = (event, todo) => {
    setDraggedTodo(todo);
    touchStartPositionRef.current = event.touches[0].clientY;
  };

  // handle touch move
  const handleTouchMove = (event) => {
    if (!draggedTodo) return;
    const touchPosition = event.touches[0].clientY;
    const touchDifference = touchPosition - touchStartPositionRef.current;
    const draggedIndex = todos.findIndex((t) => t.id === draggedTodo.id);
    const targetIndex = Math.max(
      0,
      Math.min(
        draggedIndex + Math.round(touchDifference / 60),
        todos.length - 1
      )
    );

    if (targetIndex !== draggedIndex) {
      const newTodos = [...todos];
      newTodos.splice(draggedIndex, 1);
      newTodos.splice(targetIndex, 0, draggedTodo);
      setTodos(newTodos);
    }
  };

  // handle touch end
  const handleTouchEnd = () => {
    setDraggedTodo(null);
    touchStartPositionRef.current = null;
  };

  return (
    <>
      <header className="header">
        <ToggleBg darkMode={darkMode} />
      </header>
      <main className="main">
        <div className="main__container">
          <div className="main__title">
            <a className="logo" href="#">
              Todo
            </a>
            <Togglemode darkMode={darkMode} setDarkMode={setDarkMode} />
          </div>

          <div className="main__content">
            <div className="place">
              <span className="circle"></span>
              <form onSubmit={handleAddTodo} className="form">
                <input
                  className="item"
                  type="text"
                  placeholder="Create a new todo..."
                  ref={todoNameRef}
                />

                <input
                  onClick={handleAddTodo}
                  type="submit"
                  value="+"
                  className="plus"
                />
              </form>
            </div>

            {/* <!-- todos use todo as the className --> */}
            <TodoList
              todos={todos}
              handleRemoveTodo={handleRemoveTodo}
              handleToggleTodo={handleToggleTodo}
              filterTodos={filterTodos}
              handleDragOver={handleDragOver}
              handleDrop={handleDrop}
              handleDragStart={handleDragStart}
              handleDragEnd={handleDragEnd}
              draggedTodo={draggedTodo}
              handleTouchStart={handleTouchStart}
              handleTouchMove={handleTouchMove}
              handleTouchEnd={handleTouchEnd}
            />

            <div className="info">
              <div className="items-left">
                <span>{todos.length}</span> items left
              </div>
              <span onClick={handleClearCompletedTodos} className="clear">
                Clear Completed
              </span>
            </div>

            <div className="filter-todo">
              <label onClick={() => setFilter('all')}>
                <input
                  type="radio"
                  name="filter"
                  className="all"
                  defaultChecked
                />
                <span>All</span>
              </label>
              <label onClick={() => setFilter('active')}>
                <input type="radio" name="filter" className="active" />
                <span>Active</span>
              </label>
              <label onClick={() => setFilter('completed')}>
                <input type="radio" name="filter" className="completed" />
                <span>Completed</span>
              </label>
            </div>

            <footer className="footer">
              <p>Drag and drop to reorder list</p>
            </footer>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
