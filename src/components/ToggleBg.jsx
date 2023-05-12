import bgDark from '../assets/bg-mobile-light.jpg';
import bgLight from '../assets/bg-mobile-dark.jpg';

const ToggleBg = ({ darkMode }) => {
  return (
    <>
      <div className="header__bg">
        <img src={darkMode ? bgDark : bgLight} alt="background" />
      </div>
    </>
  );
};

export default ToggleBg;
