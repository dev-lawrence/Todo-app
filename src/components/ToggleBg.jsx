import bgDark from '../assets/bg-mobile-light.jpg';
import bgLight from '../assets/bg-mobile-dark.jpg';

const ToggleBg = ({ darkmode }) => {
  return (
    <>
      <div className="header__bg">
        <img src={darkmode ? bgDark : bgLight} alt="background" />
      </div>
    </>
  );
};

export default ToggleBg;
