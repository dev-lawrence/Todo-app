import { useState, useRef, useEffect } from 'react';
import ToggleBg from './components/ToggleBg';
import Togglemode from './components/ToggleMode';
import TodoList from './components/TodoList';
import './sass/main.scss';

const LOCAL_STORAGE_KEY = 'mytodo.todos';

// load the data
const storedTodos = () => {
  let showStoredTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (showStoredTodos) {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  } else {
    return [];
  }
};

function App() {
  const [darkmode, setDarkMode] = useState(false);
  const [todos, setTodos] = useState(storedTodos());
  const [filter, setFilter] = useState('all');
  const todoNameRef = useRef();

  //  save the data when changes are made
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  // add todo
  const handleAddTodo = (e) => {
    e.preventDefault();
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

  // remove todo
  const handleRemoveTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // toggle todo
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

  const filterTodos = () => {
    if (filter === 'active') {
      return todos.filter((todo) => !todo.isComplete);
    } else if (filter === 'completed') {
      return todos.filter((todo) => todo.isComplete);
    } else {
      return todos;
    }
  };

  return (
    <>
      <header className="header">
        <ToggleBg darkmode={darkmode} />
      </header>

      <main className="main">
        <div className="main__container">
          <div className="main__title">
            <a className="logo" href="#">
              Todo
            </a>
            <Togglemode darkmode={darkmode} setDarkMode={setDarkMode} />
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

            {/* <!-- todos use todo as the classname --> */}
            <TodoList
              todos={todos}
              handleRemoveTodo={handleRemoveTodo}
              handleToggleTodo={handleToggleTodo}
              filterTodos={filterTodos}
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
