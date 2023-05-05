import { useState } from 'react';
import ToggleBg from './components/ToggleBg';
import Togglemode from './components/ToggleMode';
import './sass/main.scss';

function App() {
  const [darkmode, setDarkMode] = useState(false);
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
              <form className="form">
                <input
                  className="item"
                  type="text"
                  placeholder="Create a new todo..."
                />

                <input type="submit" value="+" className="plus" />
              </form>
            </div>

            {/* <!-- todos --> */}
            <ul className="todos"></ul>

            <div className="info">
              <div className="items-left">
                <span>0</span> items left
              </div>
              <span className="clear">Clear Completed</span>
            </div>

            <div className="filter-todo">
              <label>
                <input
                  type="radio"
                  name="filter"
                  className="all"
                  defaultChecked
                />
                <span>All</span>
              </label>
              <label>
                <input type="radio" name="filter" className="active" />
                <span>Active</span>
              </label>
              <label>
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
