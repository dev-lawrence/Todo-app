import { useEffect } from 'react';
import iconMoon from '../assets/icon-moon.svg';
import iconSun from '../assets/icon-sun.svg';

const ToggleMode = ({ darkMode, setDarkMode }) => {
  const storedMode = localStorage.getItem('mode');

  // enable dark mode
  const enableDarkMode = () => {
    document.body.className = 'dark';
    localStorage.setItem('mode', 'dark');
  };

  // enable light mode
  const enableLightMode = () => {
    document.body.className = 'light';
    localStorage.setItem('mode', 'light');
  };

  // handle the media query mode from the system color settings
  const handleMediaQueryChange = (event) => {
    const isMediaMatched = event.matches;
    setDarkMode(isMediaMatched);

    if (event.matches) {
      enableDarkMode();
    } else {
      enableLightMode();
    }
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // Initial check
    handleMediaQueryChange(mediaQuery);

    // Add event listener
    mediaQuery.addEventListener('change', handleMediaQueryChange);

    // Clean up listener
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);

  useEffect(() => {
    const preferredScheme = window.matchMedia('(prefers-color-scheme: dark)')
      .matches
      ? 'dark'
      : 'light';

    if (storedMode === 'dark') {
      enableDarkMode();
      setDarkMode(true);
    } else if (storedMode === 'light') {
      enableLightMode();
      setDarkMode(false);
    } else {
      setDarkMode(preferredScheme === 'dark');
    }
  }, [storedMode]);

  const handleToggleMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (newMode) {
      enableDarkMode();
    } else {
      enableLightMode();
    }
  };

  return (
    <div onClick={handleToggleMode} className="toggle-switch">
      <img src={darkMode ? iconSun : iconMoon} alt="Mode button" />
    </div>
  );
};

export default ToggleMode;
