import { MdKeyboardDoubleArrowDown } from "react-icons/md";

const Landing = () => {
  return (
    <div id="intro" className="full-page">
      <div>
        <h1>Welcome to Weather On Scroll. A minimal weather app.</h1>
      </div>
      <a href="#current-location">
        <MdKeyboardDoubleArrowDown className="scroller" />
      </a>
    </div>
  );
};

export default Landing;
