import { useState, useEffect } from 'react';
import iconMoon from '../assets/icon-moon.svg';
import iconSun from '../assets/icon-sun.svg';

const storeMode = localStorage.getItem('mode');

const Darkmode = () => {
  const [darkmode, setDarkMode] = useState(false);

  const handleToggleMode = () => {
    if (!darkmode) {
      enableDarkMode();
    } else {
      enableLightMode();
    }
  };

  const enableDarkMode = () => {
    localStorage.setItem('mode', 'dark');
    document.body.className = 'dark';
    setDarkMode(true);
  };

  const enableLightMode = () => {
    localStorage.setItem('mode', 'light');
    document.body.className = 'light';
    setDarkMode(false);
  };

  useEffect(() => {
    if (storeMode === 'dark') {
      enableDarkMode();
    } else if (storeMode === 'light') {
      enableLightMode();
    }
  }, []);

  return (
    <>
      <div onClick={handleToggleMode} className="toggle-switch">
        <img src={darkmode ? iconMoon : iconSun} alt="Mode button" />
      </div>
    </>
  );
};

export default Darkmode;
